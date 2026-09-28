import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  decodeOAuthState,
  encodeOAuthState,
  OAUTH_STATE_COOKIE,
} from "../shared/const";

const frontendAuth = readFileSync("client/src/const.ts", "utf8");
const callback = readFileSync("server/_core/oauth.ts", "utf8");
const sdk = readFileSync("server/_core/sdk.ts", "utf8");
const routers = readFileSync("server/routers.ts", "utf8");
const admin = readFileSync("client/src/pages/Admin.tsx", "utf8");
const ownerGuide = readFileSync("OWNER_ADMIN_GUIDE.md", "utf8");

describe("owner OAuth flow", () => {
  it("round trips the callback URI, nonce and safe return path", () => {
    const state = {
      redirectUri:
        "https://abhiara-ngo-hv6lgfne.manus.space/api/oauth/callback",
      nonce: "one-time-browser-nonce",
      returnPath: "/admin",
    };

    expect(decodeOAuthState(encodeOAuthState(state))).toEqual(state);
    expect(decodeOAuthState("not-valid-base64-json")).toEqual({});
  });

  it("binds the callback state to a one-time host-only browser cookie", () => {
    expect(OAUTH_STATE_COOKIE).toBe("__Host-oauth_state");
    expect(frontendAuth).toContain("crypto.randomUUID()");
    expect(frontendAuth).toContain("SameSite=None; Secure");
    expect(frontendAuth).toContain("redirectUri");
    expect(callback).toContain("invalid oauth state");
    expect(callback).toContain("parseCookieHeader");
    expect(callback).toContain("safeReturnPath(oauthState.returnPath)");
    expect(sdk).toContain("decodeOAuthState(state)");
  });

  it("authorizes the exact Foundation Gmail account confirmed by the owner", () => {
    expect(callback).toContain('"abhiarafoundation@gmail.com"');
    expect(callback).toContain('"cma.abhimanyu@gmail.com"');
    expect(ownerGuide).toContain("**abhiarafoundation@gmail.com**");
    expect(ownerGuide).toContain("**cma.abhimanyu@gmail.com**");
  });

  it("relays an authenticated administrator back to the official domain", () => {
    expect(frontendAuth).toContain(
      'OFFICIAL_PUBLIC_ORIGIN = "https://www.abhiarafoundation.org"'
    );
    expect(frontendAuth).toContain(
      'OAUTH_SUPPORTED_ORIGIN =\n  "https://abhiara-ngo-hv6lgfne.manus.space"'
    );
    expect(frontendAuth).toContain("ADMIN_RELAY_COOKIE");
    expect(frontendAuth).toContain('relayUrl.searchParams.set("relayNonce"');
    expect(routers).toContain("createAdminRelay: adminProcedure");
    expect(routers).toContain("sdk.createAdminRelayToken");
    expect(sdk).toContain('purpose: "admin-relay"');
    expect(sdk).toContain("verifyAdminRelayToken");
    expect(callback).toContain('app.post("/api/oauth/admin-relay"');
    expect(callback).toContain(
      'app.post(\n    "/api/oauth/admin-relay/verify"'
    );
    expect(callback).toContain("verifyAdminRelayWithIssuer");
    expect(callback).toContain('res.redirect(303, "/admin?relayError=1")');
    expect(callback).toContain("relay.nonce !== expectedNonce");
    expect(callback).toContain('user.role !== "admin"');
    expect(admin).toContain("getOwnerLoginUrl");
    expect(admin).toContain("createAdminRelay({");
    expect(admin).toContain("form.submit()");
    expect(admin).toContain('relayParams.get("relayError") === "1"');
    expect(admin).toContain("The previous sign in link expired");
  });
});
