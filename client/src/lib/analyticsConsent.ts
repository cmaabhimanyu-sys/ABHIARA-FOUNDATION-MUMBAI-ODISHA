export const CONSENT_KEY = "abhiara_cookie_consent";
const GA_ID = "G-PMZFM1Q315";
const GA_DISABLE_KEY = `ga-disable-${GA_ID}`;

let analyticsStarted = false;

export function hasAnalyticsConsent(value: string | null): boolean {
  if (!value) return false;
  try {
    return JSON.parse(value)?.accepted === true;
  } catch {
    return false;
  }
}

export function startOptionalAnalytics(): void {
  if (typeof window === "undefined" || analyticsStarted) return;
  if (!hasAnalyticsConsent(window.localStorage.getItem(CONSENT_KEY))) return;
  analyticsStarted = true;

  // This identifier is public and not a secret. No tracker is requested until consent.
  (window as any)[GA_DISABLE_KEY] = false;
  (window as any).dataLayer = (window as any).dataLayer || [];
  const gtag = (...args: unknown[]) => (window as any).dataLayer.push(args);
  gtag("js", new Date());
  gtag("config", GA_ID);
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  gaScript.dataset.abhiaraAnalytics = "google";
  document.head.appendChild(gaScript);

  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT as
    | string
    | undefined;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID as
    | string
    | undefined;
  if (!endpoint || !websiteId) return;
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:" && url.hostname !== "localhost") return;
    const umamiScript = document.createElement("script");
    umamiScript.async = true;
    umamiScript.src = `${url.origin}${url.pathname.replace(/\/$/, "")}/umami`;
    umamiScript.dataset.websiteId = websiteId;
    umamiScript.dataset.abhiaraAnalytics = "umami";
    document.head.appendChild(umamiScript);
  } catch {
    // Invalid or absent analytics configuration must not affect the site.
  }
}

export function stopOptionalAnalytics(): void {
  if (typeof window === "undefined") return;
  (window as any)[GA_DISABLE_KEY] = true;
  document
    .querySelectorAll("script[data-abhiara-analytics]")
    .forEach(node => node.remove());
  analyticsStarted = false;
}
