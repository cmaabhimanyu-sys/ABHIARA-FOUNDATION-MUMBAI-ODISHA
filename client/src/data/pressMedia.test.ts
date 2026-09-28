import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path, "utf8");
const app = read("client/src/App.tsx");
const press = read("client/src/pages/PressMedia.tsx");
const footer = read("client/src/components/Footer.tsx");
const home = read("client/src/pages/Home.tsx");
const contact = read("client/src/pages/Contact.tsx");
const faq = read("client/src/pages/FAQ.tsx");
const focusContent = read("client/src/data/focusContent.ts");
const social = read("client/src/data/socialPlatforms.ts");
const sitemap = read("client/public/sitemap.xml");
const vercel = JSON.parse(read("vercel.json")) as {
  redirects: Array<{ source: string; destination: string; permanent: boolean }>;
};

const allPublicRoutes = [
  "/",
  "/shiksha-sathi",
  "/how-we-support-a-child",
  "/student-impact",
  "/impact-gallery",
  "/monthly-reports",
  "/limited-verified-support",
  "/other-verified-support",
  "/abhiara-vidyapitha",
  "/digital-learning-ai",
  "/wellness-and-wellbeing",
  "/partners-and-supporters",
  "/board-and-transparency",
  "/our-story",
  "/birthday-with-purpose",
  "/press-and-media",
  "/disaster-relief",
  "/medical-emergency-support",
  "/animal-welfare-support",
  "/donate",
  "/volunteer",
  "/contact",
  "/faq",
  "/privacy",
  "/donation-and-refund-policy",
  "/terms",
];

describe("Press and Media public evidence library", () => {
  it("publishes one canonical secondary route and retires legacy media aliases", () => {
    expect(app).toContain(
      '<Route path="/press-and-media" component={PressMedia} />'
    );
    expect(app).toMatch(
      /<Route path="\/media">\s*<Redirect to="\/press-and-media" \/>\s*<\/Route>/
    );
    expect(footer).toContain('href: "/press-and-media"');
    expect(home).toContain('href="/press-and-media"');
    const flatPrimaryNavigation =
      focusContent
        .split("export const PRIMARY_NAV")[1]
        ?.split("export const HEADER_NAV_GROUPS")[0] ?? "";
    expect(flatPrimaryNavigation).not.toContain('href: "/press-and-media"');
    expect(focusContent).toContain('href: "/press-and-media"');
    expect(sitemap).toContain(
      "https://www.abhiarafoundation.org/press-and-media"
    );
    expect(vercel.redirects).toContainEqual({
      source: "/media",
      destination: "/press-and-media",
      permanent: true,
    });
  });

  it("links every current public section from the complete website guide", () => {
    for (const route of allPublicRoutes) {
      expect(press).toContain(`href: "${route}"`);
    }
  });

  it("keeps press evidence inside reviewed boundaries", () => {
    expect(press).toContain("trpc.cms.gallery.listPublished.useQuery");
    expect(press).not.toContain("trpc.cms.media.listFolder.useQuery");
    expect(press).not.toContain("owner has checked");
    expect(press).not.toContain("from Admin");
    expect(press.replace(/\s+/g, " ")).toContain(
      "Find activity records, programme photos, public videos and official social links in one place."
    );
    expect(press).toContain('["education", "community"].includes');
    expect(press).toContain("RTI and human rights classes");
    expect(press).toContain(
      "certificate numbers and participant details are not published"
    );
    expect(press).toContain('record.id !== "kankili-fire-relief-2026"');
    expect(press).toContain('["education", "documentary"]');
    expect(press).not.toContain("<iframe");
    expect(press).toContain("No public video has completed review yet");
    expect(press).toContain("identity records, bank documents, phone numbers");
  });

  it("uses owner-managed links only when they match the four requested social hosts", () => {
    for (const platform of ["Facebook", "YouTube", "LinkedIn", "Instagram"]) {
      expect(social).toContain(platform);
    }
    expect(social).toContain("isExpectedSocialUrl");
    expect(social).toContain("EXPECTED_HOSTS");
    expect(footer).toContain("resolvePublicSocialLinks");
    expect(contact).toContain("resolvePublicSocialLinks");
    expect(press).toContain("resolvePublicSocialLinks");
    expect(social).toContain("https://www.facebook.com/abhiarafoundation");
    expect(social).toContain("https://www.instagram.com/abhiarafoundation/");
    expect(social).toContain("https://youtube.com/@abhiarafoundation");
    expect(social).toContain(
      "https://www.linkedin.com/company/abhiara-foundation/"
    );
    expect(social).toContain("https://www.linkedin.com/in/abhimanyu-mallik");
    expect(footer).toContain("FOUNDER_LINKEDIN_URL");
    expect(contact).toContain("FOUNDER_LINKEDIN_URL");
    expect(press).toContain("FOUNDER_LINKEDIN_URL");
  });

  it("makes FAQ discoverable on the official domain and uses the general donation route", () => {
    expect(footer).toContain('href: "/faq"');
    expect(sitemap).toContain("https://www.abhiarafoundation.org/faq");
    expect(faq).toContain('url="https://www.abhiarafoundation.org/faq"');
    expect(faq).toContain('href="/donate"');
    expect(faq).toContain('<main id="main-content">');
  });
});
