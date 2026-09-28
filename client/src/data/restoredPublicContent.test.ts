import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  BIRTHDAY_WITH_PURPOSE,
  FOUNDER_STORY,
  REVIEWED_EDUCATION_ARCHIVE,
  REVIEWED_SUPPORT_ARCHIVE,
} from "./restoredPublicContent";

const read = (path: string) => readFileSync(path, "utf8");

const app = read("client/src/App.tsx");
const footer = read("client/src/components/Footer.tsx");
const home = read("client/src/pages/Home.tsx");
const storyPage = read("client/src/pages/OurStory.tsx");
const birthdayPage = read("client/src/pages/BirthdayWithPurpose.tsx");
const monthlyReports = read("client/src/pages/MonthlyReports.tsx");
const supportArchive = read("client/src/pages/OtherVerifiedSupport.tsx");
const sitemap = read("client/public/sitemap.xml");
const vercelConfig = JSON.parse(read("vercel.json")) as {
  redirects: Array<{
    source: string;
    destination: string;
    permanent: boolean;
  }>;
};
const restoredSource = read("client/src/data/restoredPublicContent.ts");

const founderCopy = JSON.stringify(FOUNDER_STORY);
const birthdayCopy = JSON.stringify(BIRTHDAY_WITH_PURPOSE);
const reviewedArchiveCopy = JSON.stringify([
  ...REVIEWED_EDUCATION_ARCHIVE,
  ...REVIEWED_SUPPORT_ARCHIVE,
]);

describe("restored purpose and reviewed history", () => {
  it("publishes only the founder facts approved for the public story", () => {
    expect(founderCopy).toContain("Abhimanyu Mallik");
    expect(founderCopy).toContain("Raisar");
    expect(founderCopy).toContain("Kendrapara");
    expect(founderCopy).toContain("built his career in Odisha");
    expect(founderCopy).toContain("moved to Mumbai");
    expect(founderCopy).toContain("structured education support");
    expect(founderCopy).toContain(
      "Directors, advisors, volunteers and supporters"
    );
    expect(founderCopy).toContain("rather than private personal stories");
    expect(founderCopy).toContain("programme standard");
    expect(founderCopy).toContain(
      "From Raisar, a small rural village in Kendrapara district, Odisha, to Mumbai"
    );
    expect(founderCopy).toContain(
      "Raisar village, Kendrapara district, Odisha"
    );
    expect(founderCopy).toContain("From background to programme focus");
    expect(founderCopy).toContain("documented need");
    expect(founderCopy).toContain("orphaned and underprivileged children");
    expect(storyPage).toContain("FOUNDER_STORY.turningPoint.body.en");
    expect(storyPage).not.toContain("<blockquote");
    expect(storyPage).toContain(
      'url="https://www.abhiarafoundation.org/our-story"'
    );
    expect(storyPage).not.toContain("trpc.cms.settings");
    expect(`${founderCopy}\n${storyPage}`).not.toMatch(
      /Managing Director|Licence No\.|FCRA|Schedule VII|Audited Reports|every rupee|CMA · Founder/i
    );
    expect(`${founderCopy}\n${storyPage}`).not.toMatch(
      /Founder’s commitment|founder wants|support he once received|simple belief|what stayed with him|no one moves forward alone|personal recognition|my journey|I want|I believe/i
    );
  });

  it("provides a simple birthday route without personal campaign machinery", () => {
    expect(app).toContain(
      '<Route path="/birthday-with-purpose" component={BirthdayWithPurpose} />'
    );
    expect(app).toMatch(
      /<Route path="\/donate-for-occasion">\s*<Redirect to="\/birthday-with-purpose" \/>\s*<\/Route>/
    );
    expect(app).not.toContain('import("./pages/DonateForOccasion")');
    expect(footer).toContain('href: "/birthday-with-purpose"');
    expect(home).toContain('href="/birthday-with-purpose"');
    expect(sitemap).toContain(
      "https://www.abhiarafoundation.org/birthday-with-purpose"
    );
    expect(vercelConfig.redirects).toContainEqual({
      source: "/donate-for-occasion",
      destination: "/birthday-with-purpose",
      permanent: true,
    });
    expect(birthdayCopy).toContain(
      "https://www.abhiarafoundation.org/donate-for-education"
    );
    expect(birthdayPage).toContain('href="/donate-for-education"');
    expect(`${birthdayCopy}\n${birthdayPage}`).not.toMatch(
      /donor wall|birthday registry|celebrant|guest list|reminder|e.?card|campaign target|subscription|recurring|auto.?debit|occasion api/i
    );
  });

  it("restores only the two reviewed education records with narrow evidence notes", () => {
    expect(REVIEWED_EDUCATION_ARCHIVE).toHaveLength(2);
    expect(REVIEWED_EDUCATION_ARCHIVE.map(record => record.id)).toEqual([
      "pratibha-samman-2026",
      "independence-day-books-2026",
    ]);
    expect(REVIEWED_EDUCATION_ARCHIVE[0]?.result.en).toBe(
      "57 students honoured"
    );
    expect(REVIEWED_EDUCATION_ARCHIVE[1]?.date.en).toBe("15 August 2026");
    expect(REVIEWED_EDUCATION_ARCHIVE[1]?.reviewNote.en).toContain(
      "verified total is not available"
    );
    expect(monthlyReports).toContain("REVIEWED_EDUCATION_ARCHIVE");
    expect(monthlyReports).toContain("Historical education record");
    expect(monthlyReports).not.toContain("MONTHLY_IMPACT_REPORTS");
    expect(monthlyReports).toContain("isConsentReviewedBlob(item.imageUrl)");
  });

  it("keeps bounded past support separate from current flagship work", () => {
    expect(REVIEWED_SUPPORT_ARCHIVE).toHaveLength(3);
    expect(REVIEWED_SUPPORT_ARCHIVE.map(record => record.id)).toEqual([
      "pana-sankranti-water-2026",
      "kankili-fire-relief-2026",
      "puri-elder-visit-2025",
    ]);
    expect(reviewedArchiveCopy).toContain("3 locations");
    expect(reviewedArchiveCopy).toContain("1 verified family supported");
    expect(reviewedArchiveCopy).toContain("40+ elder residents visited");
    expect(supportArchive).toContain("REVIEWED_SUPPORT_ARCHIVE");
    expect(supportArchive).toContain("Historical record");
    expect(supportArchive).not.toContain("stat_activities_completed");
    expect(supportArchive).not.toContain("stat_families_supported");
    expect(supportArchive).not.toContain("stat_districts");
  });

  it("does not publish unsupported medical, flood or bereavement records", () => {
    expect(reviewedArchiveCopy).not.toMatch(
      /medical support|medical case|flood relief|parental loss|bereavement|death support|financial support/i
    );
    expect(restoredSource).not.toMatch(/[—–]/);
  });

  it("keeps the new routes secondary and fixes the former broken archive link", () => {
    expect(footer).toContain('href: "/our-story"');
    expect(footer).toContain('href: "/other-verified-support"');
    expect(footer).not.toContain("/other-verified-community-support");
    expect(sitemap).toContain("https://www.abhiarafoundation.org/our-story");
    expect(home).toContain("Our Founder Story");
    expect(home).toContain("Birthday with Purpose");
  });
});
