export const COOKIE_NAME = "app_session_id";
export const OAUTH_STATE_COOKIE = "__Host-oauth_state";
export const ADMIN_RELAY_COOKIE = "__Host-admin_relay";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = "Please login (10001)";
export const NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

export type OAuthState = {
  redirectUri?: string;
  nonce?: string;
  returnPath?: string;
};

export function encodeOAuthState(state: Required<OAuthState>): string {
  return globalThis.btoa(JSON.stringify(state));
}

export function decodeOAuthState(state: string): OAuthState {
  try {
    const parsed = JSON.parse(globalThis.atob(state)) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const value = parsed as Record<string, unknown>;
    return {
      redirectUri:
        typeof value.redirectUri === "string" ? value.redirectUri : undefined,
      nonce: typeof value.nonce === "string" ? value.nonce : undefined,
      returnPath:
        typeof value.returnPath === "string" ? value.returnPath : undefined,
    };
  } catch {
    return {};
  }
}
