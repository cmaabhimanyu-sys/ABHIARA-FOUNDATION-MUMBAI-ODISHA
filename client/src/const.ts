import {
  ADMIN_RELAY_COOKIE,
  encodeOAuthState,
  OAUTH_STATE_COOKIE,
} from "@shared/const";

export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const OFFICIAL_PUBLIC_ORIGIN = "https://www.abhiarafoundation.org";
export const OAUTH_SUPPORTED_ORIGIN =
  "https://abhiara-ngo-hv6lgfne.manus.space";

function safeReturnPath(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/admin";
  }
  return value;
}

// Generate login URL at runtime so redirect URI reflects the current origin.
// Graceful fallback: if env vars are missing (e.g. on Vercel without backend),
// return "#" instead of crashing.
export const getLoginUrl = (returnPath?: string) => {
  try {
    const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
    const appId = import.meta.env.VITE_APP_ID;

    if (!oauthPortalUrl || !appId) {
      console.warn("[Auth] OAuth env vars not configured. Login disabled.");
      return "#";
    }

    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const nonce = crypto.randomUUID();
    document.cookie = `${OAUTH_STATE_COOKIE}=${encodeURIComponent(nonce)}; Path=/; Max-Age=600; SameSite=None; Secure`;
    const state = encodeOAuthState({
      redirectUri,
      nonce,
      returnPath: returnPath || "/",
    });

    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");

    return url.toString();
  } catch (e) {
    console.warn("[Auth] Failed to generate login URL:", e);
    return "#";
  }
};

export const getOwnerLoginUrl = (returnPath = "/admin") => {
  if (typeof window === "undefined") return "#";

  if (window.location.origin === OFFICIAL_PUBLIC_ORIGIN) {
    const nonce = crypto.randomUUID();
    document.cookie = `${ADMIN_RELAY_COOKIE}=${encodeURIComponent(nonce)}; Path=/; Max-Age=600; SameSite=None; Secure`;
    const relayUrl = new URL("/admin", OAUTH_SUPPORTED_ORIGIN);
    relayUrl.searchParams.set("relayNonce", nonce);
    relayUrl.searchParams.set("returnPath", safeReturnPath(returnPath));
    return relayUrl.toString();
  }

  const currentPath = `${window.location.pathname}${window.location.search}`;
  return getLoginUrl(currentPath);
};
