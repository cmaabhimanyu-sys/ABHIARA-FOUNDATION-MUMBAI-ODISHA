import {
  ADMIN_RELAY_COOKIE,
  COOKIE_NAME,
  decodeOAuthState,
  OAUTH_STATE_COOKIE,
  ONE_YEAR_MS,
} from "../../shared/const.js";
import { parse as parseCookieHeader } from "cookie";
import type { Express, Request, Response } from "express";
import * as db from "../db.js";
import { getSessionCookieOptions } from "./cookies.js";
import { sdk } from "./sdk.js";

const OAUTH_SUPPORTED_ORIGIN = "https://abhiara-ngo-hv6lgfne.manus.space";

type AdminRelayPayload = {
  openId: string;
  nonce: string;
  returnPath: string;
};

function isAdminRelayPayload(value: unknown): value is AdminRelayPayload {
  if (!value || typeof value !== "object") return false;
  const relay = value as Record<string, unknown>;
  return (
    typeof relay.openId === "string" &&
    relay.openId.length > 0 &&
    typeof relay.nonce === "string" &&
    relay.nonce.length >= 16 &&
    typeof relay.returnPath === "string" &&
    relay.returnPath.startsWith("/admin") &&
    !relay.returnPath.startsWith("//")
  );
}

export async function verifyAdminRelayWithIssuer(
  relayToken: string,
  fetchImpl: typeof fetch = fetch
): Promise<AdminRelayPayload | null> {
  if (!relayToken || relayToken.length > 4096) return null;
  try {
    const response = await fetchImpl(
      `${OAUTH_SUPPORTED_ORIGIN}/api/oauth/admin-relay/verify`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ relayToken }),
        signal: AbortSignal.timeout(5000),
      }
    );
    if (!response.ok) return null;
    const data = (await response.json()) as { relay?: unknown };
    return isAdminRelayPayload(data.relay) ? data.relay : null;
  } catch {
    return null;
  }
}

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

function safeReturnPath(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/admin-relay", (_req: Request, res: Response) => {
    res.redirect(303, "/admin?relayError=1");
  });

  app.post(
    "/api/oauth/admin-relay/verify",
    async (req: Request, res: Response) => {
      const relayToken =
        typeof req.body?.relayToken === "string"
          ? req.body.relayToken
          : undefined;
      if (!relayToken || relayToken.length > 4096) {
        res.status(403).json({ error: "invalid admin relay" });
        return;
      }
      const relay = await sdk.verifyAdminRelayToken(relayToken);
      if (!relay) {
        res.status(403).json({ error: "invalid admin relay" });
        return;
      }
      res.setHeader("Cache-Control", "no-store");
      res.json({ relay });
    }
  );

  app.post("/api/oauth/admin-relay", async (req: Request, res: Response) => {
    const relayToken =
      typeof req.body?.relayToken === "string"
        ? req.body.relayToken
        : undefined;
    const expectedNonce = parseCookieHeader(req.headers.cookie ?? "")[
      ADMIN_RELAY_COOKIE
    ];

    if (!relayToken || !expectedNonce) {
      res.clearCookie(ADMIN_RELAY_COOKIE, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      res.redirect(303, "/admin?relayError=1");
      return;
    }

    const relay =
      (await sdk.verifyAdminRelayToken(relayToken)) ||
      (await verifyAdminRelayWithIssuer(relayToken));
    if (!relay || relay.nonce !== expectedNonce) {
      res.clearCookie(ADMIN_RELAY_COOKIE, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      res.redirect(303, "/admin?relayError=1");
      return;
    }

    const user = await db.getUserByOpenId(relay.openId);
    if (!user || user.role !== "admin") {
      res.status(403).json({ error: "admin access required" });
      return;
    }

    const sessionToken = await sdk.createSessionToken(user.openId, {
      name: user.name || "Abhiara Foundation Owner",
      expiresInMs: ONE_YEAR_MS,
    });
    res.clearCookie(ADMIN_RELAY_COOKIE, {
      path: "/",
      secure: true,
      sameSite: "none",
    });
    res.cookie(COOKIE_NAME, sessionToken, {
      ...getSessionCookieOptions(req),
      maxAge: ONE_YEAR_MS,
    });
    res.redirect(303, safeReturnPath(relay.returnPath));
  });

  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      const oauthState = decodeOAuthState(state);
      const expectedNonce = parseCookieHeader(req.headers.cookie ?? "")[
        OAUTH_STATE_COOKIE
      ];
      if (!oauthState.nonce || oauthState.nonce !== expectedNonce) {
        res.status(403).json({ error: "invalid oauth state" });
        return;
      }
      res.clearCookie(OAUTH_STATE_COOKIE, {
        path: "/",
        secure: true,
        sameSite: "none",
      });

      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      // Auto-promote specific admin emails
      const ADMIN_EMAILS = [
        "abhiarafoundation@gmail.com",
        "cma.abhimanyu@gmail.com",
        "info@abhiarafoundation.org",
        "abhimanyumallik@gofynd.com",
      ];
      const isAdmin =
        userInfo.email && ADMIN_EMAILS.includes(userInfo.email.toLowerCase());

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: new Date(),
        ...(isAdmin ? { role: "admin" as const } : {}),
      });

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, {
        ...cookieOptions,
        maxAge: ONE_YEAR_MS,
      });

      res.redirect(302, safeReturnPath(oauthState.returnPath));
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
