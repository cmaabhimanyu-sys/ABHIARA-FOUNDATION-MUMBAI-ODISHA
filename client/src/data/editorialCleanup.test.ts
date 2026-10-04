import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { hasAnalyticsConsent } from "@/lib/analyticsConsent";

const read = (name: string) => readFileSync(name, "utf8");

const index = read("client/index.html");
const cookies = read("client/src/components/CookieConsent.tsx");
const privacy = read("client/src/pages/Privacy.tsx");
const home = read("client/src/pages/Home.tsx");
const limited = read("client/src/pages/LimitedVerifiedSupport.tsx");
const faq = read("client/src/pages/FAQ.tsx");
const volunteer = read("client/src/pages/Volunteer.tsx");
const terms = read("client/src/pages/Terms.tsx");
const contact = read("client/src/pages/Contact.tsx");

const analytics = read("client/src/lib/analyticsConsent.ts");

describe("education-first editorial cleanup", () => {
  it("does not request analytics before an explicit optional choice", () => {
    expect(index).not.toContain("googletagmanager.com");
    expect(index).not.toContain("%VITE_ANALYTICS_ENDPOINT%/umami");
    expect(hasAnalyticsConsent(null)).toBe(false);
    expect(hasAnalyticsConsent("invalid JSON")).toBe(false);
    expect(hasAnalyticsConsent(JSON.stringify({ accepted: "essential" }))).toBe(
      false
    );
    expect(hasAnalyticsConsent(JSON.stringify({ accepted: true }))).toBe(true);
    expect(analytics).toContain(
      "if (!hasAnalyticsConsent(window.localStorage.getItem(CONSENT_KEY))) return;"
    );
    expect(cookies).toContain("startOptionalAnalytics()");
    expect(cookies).toContain("stopOptionalAnalytics()");
    expect(privacy).toContain("Change cookie choice");
    expect(privacy).not.toContain(
      "We do not sell or share your details with anyone."
    );
  });

  it("keeps the homepage usable without photographs and bilingual while photographs rotate", () => {
    expect(home).toContain('key: "education-mission"');
    expect(home).toContain("CORE_STATEMENT_OD");
    expect(home).toContain("heroSlides.length > 1");
    expect(home).not.toContain("slide.photo.title ||");
    expect(home).not.toContain("slide.photo.description ||");
    expect(home).toContain("prefers-reduced-motion: reduce");
    expect(home).toContain("heroHoverPaused");
  });

  it("removes unverified allocation ranges and undated student totals from active public summaries", () => {
    const priorities = read("client/src/data/focusContent.ts");
    expect(priorities).not.toContain("BUDGET_PRIORITIES");
    expect(limited).not.toContain("Budget priorities");
    expect(limited).toContain("not a standing public programme");
    expect(faq).not.toMatch(
      /support more than 50 children|୫୦ ରୁ ଅଧିକ ଶିଶୁଙ୍କୁ/
    );
    expect(faq).toContain("Foundation-reported programme figures");
    expect(faq).toContain("any checked monthly counts");
  });

  it("retires duplicate legacy pages without losing their safe route redirects", () => {
    const routes = read("client/src/App.tsx");
    for (const page of ["Activities", "ImpactDashboard", "Media"]) {
      expect(existsSync(`client/src/pages/${page}.tsx`)).toBe(false);
    }
    expect(routes).toContain('path="/activities"');
    expect(routes).toContain('path="/media"');
    expect(routes).toContain('to="/press-and-media"');
  });

  it("states volunteer safety plainly and does not make an unverified response promise", () => {
    expect(volunteer).toContain("Do not contact a child privately");
    expect(volunteer).toContain("recorded guardian permission");
    expect(volunteer).not.toContain("Help with photos or language");
    expect(terms).not.toContain("Within 48 hours");
    expect(terms).not.toContain("makes no representations about the accuracy");
  });

  it("gives each contact form control its own accessible name", () => {
    expect(
      (contact.match(/aria-label=\{t\(/g) || []).length
    ).toBeGreaterThanOrEqual(5);
    for (const name of [
      "Your name",
      "Your email",
      "Reason for contact",
      "Subject, optional",
      "Your message",
    ]) {
      expect(contact).toContain(`aria-label={t("${name}"`);
    }
  });
});
