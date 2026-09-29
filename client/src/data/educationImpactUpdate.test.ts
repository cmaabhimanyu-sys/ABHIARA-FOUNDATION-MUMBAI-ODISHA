import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { MONTHLY_IMPACT_REPORTS } from "./monthlyImpact";
import {
  BUDGET_PRIORITIES,
  CORE_STATEMENT,
  EDUCATION_REQUEST_BODY,
  EDUCATION_REQUEST_EMAIL,
  EDUCATION_REQUEST_MAILTO,
  FLAGSHIP_DESCRIPTION,
  FOUNDATION_PROMISE,
  FUTURE_INITIATIVES,
  HEADER_NAV_GROUPS,
  PRIMARY_CHILD_FOCUS,
  PRIMARY_NAV,
  PUBLIC_PRIORITY_ORDER,
  PUBLIC_TAGLINE,
  PUBLIC_TAGLINE_DESCRIPTION,
} from "./focusContent";

type RegistryImage = {
  file?: string;
  filename?: string;
  category: string;
  location?: string;
  alt?: string;
  caption?: string;
};

type Registry = {
  images: RegistryImage[];
  videos: Array<{ category: string; url: string }>;
};

const registry = JSON.parse(
  readFileSync("client/public/images/images.json", "utf8")
) as Registry;
const filename = (image: RegistryImage) => image.file ?? image.filename ?? "";

const focusedPublicFiles = [
  "client/src/components/Navbar.tsx",
  "client/src/components/Footer.tsx",
  "client/src/pages/Home.tsx",
  "client/src/pages/Programs.tsx",
  "client/src/pages/HowWeSupportChild.tsx",
  "client/src/pages/StudentImpact.tsx",
  "client/src/pages/MonthlyReports.tsx",
  "client/src/pages/LimitedVerifiedSupport.tsx",
  "client/src/pages/AbhiaraVidyapitha.tsx",
  "client/src/pages/CSRPartners.tsx",
  "client/src/pages/Governance.tsx",
  "client/src/pages/Donate.tsx",
  "client/src/pages/Volunteer.tsx",
  "client/src/pages/Contact.tsx",
]
  .map(path => readFileSync(path, "utf8"))
  .join("\n");

describe("education-first public website update", () => {
  it("keeps verified historic media registered while removing identity and banking documents", () => {
    const studentImages = registry.images.filter(image =>
      filename(image).startsWith("shiksha-sathi-supported-student-")
    );
    const independenceImages = registry.images.filter(
      image => image.category === "independence-day-books"
    );
    const pressImages = registry.images.filter(image =>
      filename(image).startsWith("pratibha-samman-press-coverage-")
    );
    const partnerLogo = registry.images.find(
      image => filename(image) === "csr-fynd-foundation-mumbai.png"
    );

    expect(studentImages).toHaveLength(11);
    expect(independenceImages).toHaveLength(29);
    expect(pressImages).toHaveLength(6);
    expect(partnerLogo).toBeDefined();

    const removedFiles = [
      "education-books-independence-day-03.jpeg",
      "education-books-independence-day-05.jpeg",
      "reference-impact-location-layout.webp",
    ];
    for (const sensitiveFile of removedFiles) {
      expect(
        registry.images.some(image => filename(image) === sensitiveFile)
      ).toBe(false);
      expect(existsSync(`client/public/images/${sensitiveFile}`)).toBe(false);
    }

    for (const image of [
      ...studentImages,
      ...independenceImages,
      ...pressImages,
      partnerLogo!,
    ]) {
      expect(existsSync(`client/public/images/${filename(image)}`)).toBe(true);
    }
  });

  it("keeps multi-state student locations private and uses Raisar only for the 15 August record", () => {
    const studentRecords = registry.images.filter(
      image => image.category === "shiksha-sathi"
    );
    const independenceRecords = registry.images.filter(
      image => image.category === "independence-day-books"
    );

    expect(studentRecords.length).toBeGreaterThanOrEqual(15);
    expect(studentRecords.every(image => !image.location)).toBe(true);
    expect(
      independenceRecords.every(
        image => image.location === "Raisar, Kendrapara district, Odisha"
      )
    ).toBe(true);
  });

  it("publishes the consent-approved higher-education photograph without personal identity details", () => {
    const record = registry.images.find(
      image => filename(image) === "education-higher-study-support.jpeg"
    );
    const studentImpact = readFileSync(
      "client/src/pages/StudentImpact.tsx",
      "utf8"
    );

    expect(record).toBeDefined();
    expect(
      existsSync("client/public/images/education-higher-study-support.jpeg")
    ).toBe(true);
    expect(record?.caption).toContain("Consent-approved photograph");
    expect(record?.location).toBeUndefined();
    expect(studentImpact).toContain("trpc.cms.gallery.listPublished.useQuery");
    expect(studentImpact).not.toContain("trpc.cms.media.listFolder.useQuery");
    expect(studentImpact).toMatch(
      /data-media-source=\{\s*publishedHigherEducationPhoto\s*\?\s*"published-gallery"\s*:\s*"local-fallback"\s*\}/
    );
    expect(studentImpact).toContain(
      "/images/education-higher-study-support.jpeg"
    );
    expect(studentImpact).toContain("object-contain");
    expect(`${JSON.stringify(record)}\n${studentImpact}`).not.toMatch(
      /Subhransu|Sekhar Prusty|M\.Sc|IIT Delhi/i
    );
  });

  it("keeps the verified 15 August report and Pratibha Samman video in the internal evidence archive", () => {
    expect(
      registry.videos.some(video => video.category === "pratibha-samman")
    ).toBe(true);
    const report = MONTHLY_IMPACT_REPORTS.find(
      item => item.id === "august-2026-education"
    );
    expect(report?.locations.en).toBe("Raisar, Kendrapara district, Odisha");
    expect(
      report?.notes.some(note => note.en.includes("No student count"))
    ).toBe(true);
  });

  it("uses the exact focused navigation and one primary education programme", () => {
    expect(PRIMARY_NAV).toHaveLength(13);
    expect(PRIMARY_NAV.map(item => item.href)).toEqual([
      "/",
      "/shiksha-sathi",
      "/how-we-support-a-child",
      "/student-impact",
      "/monthly-reports",
      "/limited-verified-support",
      "/abhiara-vidyapitha",
      "/partners-and-supporters",
      "/board-and-transparency",
      "/our-presence",
      "/donate",
      "/volunteer",
      "/contact",
    ]);
    expect(HEADER_NAV_GROUPS.map(group => group.en)).toEqual([
      "About",
      "Education & Learning",
      "Other Activities",
      "Impact & Transparency",
      "Board & Presence",
      "Get Involved",
    ]);
    const groupedRoutes = HEADER_NAV_GROUPS.flatMap(group => [
      group.href,
      ...group.items.map(item => item.href),
    ]);
    for (const item of PRIMARY_NAV.filter(
      item => item.href !== "/" && item.href !== "/donate"
    )) {
      expect(groupedRoutes).toContain(item.href);
    }
    expect(focusedPublicFiles).toContain("Education is our main work.");
    expect(focusedPublicFiles).toContain("Abhiara Shiksha Sathi");
    expect(focusedPublicFiles).not.toMatch(
      /Elderly Care|Health & Wellness|Youth & Sports|Culture & Heritage/i
    );
  });

  it("keeps education first and other verified support tightly limited", () => {
    expect(PRIMARY_CHILD_FOCUS).toEqual({
      en: "orphaned children and children from underprivileged families",
      od: "ଅନାଥ ଶିଶୁ ଓ ସୁବିଧାବଞ୍ଚିତ ପରିବାରର ଶିଶୁ",
    });
    expect(CORE_STATEMENT).toBe(
      "Education is our main work. Through Abhiara Shiksha Sathi, we help orphaned children and children from underprivileged families stay in school."
    );
    expect(FOUNDATION_PROMISE).toBe(
      "Along with education, Abhiara Foundation may give limited help to vulnerable elders, animal welfare, medical emergencies and disaster relief. This depends on available funds, ground verification and an approved budget."
    );
    expect(PUBLIC_TAGLINE).toBe("Education first. Compassion always.");
    expect(PUBLIC_TAGLINE_DESCRIPTION).toBe(
      "We help orphaned children and children from underprivileged families stay in school. Education requests may be emailed from every Indian state and are reviewed case by case."
    );
    expect(PUBLIC_PRIORITY_ORDER.map(item => item.titleEn)).toEqual([
      "Education for orphaned and underprivileged children",
      "Old-age home and elder dignity",
      "Medical cases and disaster relief",
      "Animal feeding, treatment and rescue coordination",
    ]);
    expect(PUBLIC_PRIORITY_ORDER[1].bodyEn).toContain(
      "not a current programme"
    );
    expect(FLAGSHIP_DESCRIPTION).toContain(
      "Education requests may be emailed from every Indian state for case by case review"
    );
    expect(EDUCATION_REQUEST_EMAIL).toBe("info@abhiarafoundation.org");
    expect(EDUCATION_REQUEST_MAILTO).toMatch(/^mailto:/);
    expect(EDUCATION_REQUEST_BODY).toContain("Child's initials only");
    expect(EDUCATION_REQUEST_BODY).toContain("Please do not attach Aadhaar");
    expect(EDUCATION_REQUEST_BODY).not.toContain("Child's full name");
    expect(BUDGET_PRIORITIES[0].share).toBe("70 to 75%");
    expect(BUDGET_PRIORITIES[1].share).toBe("20 to 25%");
    expect(BUDGET_PRIORITIES[2].share).toBe("5 to 10%");
    expect(focusedPublicFiles).toContain("Limited Verified Support");
    expect(focusedPublicFiles).toContain("not a standing public programme");
    expect(focusedPublicFiles).not.toMatch(
      /recurring donation|monthly giving|auto.?debit/i
    );
  });

  it("keeps Fynd Foundation as an institutional supporter without CSR claims", () => {
    const partners = readFileSync("client/src/pages/CSRPartners.tsx", "utf8");
    expect(partners).toContain("Fynd Foundation, Mumbai");
    expect(partners).toContain("/images/csr-fynd-foundation-mumbai.png");
    expect(partners).toContain("not represented as CSR expenditure");
    expect(partners).not.toContain("CSR implementation partner");
  });

  it("keeps five future initiatives together and clearly marked as upcoming", () => {
    const vision = readFileSync(
      "client/src/pages/AbhiaraVidyapitha.tsx",
      "utf8"
    );
    expect(
      PRIMARY_NAV.find(item => item.href === "/abhiara-vidyapitha")?.en
    ).toBe("Vision and Upcoming");
    expect(vision).toContain("Vision and Upcoming Initiatives");
    expect(vision).toContain("Future plans under one vision");
    expect(vision).toContain("FUTURE_INITIATIVES.map");
    expect(vision).toContain("Status: future plan");
    expect(vision).toContain("are not accepting enrolment or applications");
    expect(FUTURE_INITIATIVES.map(item => item.titleEn)).toEqual([
      "Abhiara Vidyapitha School",
      "Abhiara Elder Care Home",
      "Abhiara Livelihood Centre",
      "Computer Lab and AI Basics",
      "Competitive Exam Support",
      "Wellness and Wellbeing",
    ]);
  });

  it("uses the official www dot org domain and redirects retired public paths", () => {
    const sitemap = readFileSync("client/public/sitemap.xml", "utf8");
    const robots = readFileSync("client/public/robots.txt", "utf8");
    const app = readFileSync("client/src/App.tsx", "utf8");
    const seo = readFileSync("client/src/components/SEO.tsx", "utf8");

    expect(sitemap).toContain("https://www.abhiarafoundation.org/");
    expect(sitemap).not.toContain("abhiarafoundation.com");
    expect(robots).toContain("https://www.abhiarafoundation.org/sitemap.xml");
    expect(seo).toContain("https://www.abhiarafoundation.org");
    expect(app).toMatch(
      /<Route path="\/programs">\s*<Redirect to="\/shiksha-sathi" \/>\s*<\/Route>/
    );
    expect(app).toContain('<Route path="/donate" component={Donate} />');
    expect(app).toMatch(
      /<Route path="\/blog">\s*<Redirect to="\/monthly-reports" \/>\s*<\/Route>/
    );
  });
});
