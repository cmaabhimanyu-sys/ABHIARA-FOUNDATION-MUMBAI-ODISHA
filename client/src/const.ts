export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

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
    const state = btoa(
      JSON.stringify({
        origin: window.location.origin,
        returnPath: returnPath || "/",
      })
    );

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
