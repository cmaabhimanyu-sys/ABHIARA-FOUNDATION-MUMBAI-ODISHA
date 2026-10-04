import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PRIMARY_NAV } from "./focusContent";

const read = (path: string) => readFileSync(path, "utf8");
const governance = read("client/src/pages/Governance.tsx");
const monthly = read("client/src/pages/MonthlyReports.tsx");
const student = read("client/src/pages/StudentImpact.tsx");
const footer = read("client/src/components/Footer.tsx");
const admin = read("client/src/pages/Admin.tsx");
const router = read("server/cms-router.ts");
const html = read("client/index.html");
const reviewedMigration = read("drizzle/0025_people_public_note_review.sql");

describe("public accountability update", () => {
  it("keeps a CMS-backed, grouped People roster with navigable sections but no numbering", () => {
    expect(governance).toContain("groupPublishedPeople(leadershipMembers)");
    expect(governance).toContain("PEOPLE_SECTIONS.map");
    expect(governance).toContain("#disclosures");
    expect(governance).toContain("id={`people-${section.type}`}");
    expect(governance).not.toContain("index + 1");
    expect(reviewedMigration).toContain("`bioIsPublic` = FALSE");
    expect(reviewedMigration).toContain("`id` = 2");
    expect(reviewedMigration).not.toContain("DELETE FROM");
  });

  it("shows the known public registration statuses without fabricating approvals or CSR eligibility", () => {
    for (const phrase of [
      "U87300MH2026NPL471397",
      "MH/2026/1110513",
      "12AB",
      "80G",
      "CSR-1",
      "Application pending; approval is not claimed",
      "No document-backed status published",
      "not a verification date for legal certificates",
    ]) {
      expect(governance).toContain(phrase);
    }
    expect(governance).not.toMatch(
      /CSR-1 registration approved|80G approval granted|CSR implementation partner/i
    );
    for (const href of [
      "/monthly-reports",
      "/privacy",
      "/donation-and-refund-policy",
      "/terms",
      "/contact",
    ]) {
      expect(governance).toContain(href);
    }
  });

  it("separates financial reports, programme updates and photos, without fake figures", () => {
    for (const id of [
      "financial-summaries",
      "programme-updates",
      "photo-archive",
    ]) {
      expect(monthly).toContain(`id="${id}"`);
    }
    expect(monthly).toContain(
      "No reconciled monthly financial summary has been published here yet."
    );
    expect(monthly).toContain(
      "A child's photo review does not hold up an anonymised financial summary."
    );
    expect(monthly).toContain(
      "labelled unaudited unless an independent audit has been completed"
    );
    expect(monthly).not.toMatch(
      /opening balance:\s*₹\s*0|closing balance:\s*₹\s*0/i
    );
    expect(admin).toContain("stat_students_verified_monthly_counts");
    expect(admin).toMatch(/All three fields publish in\s+one save\./);
    expect(student).toContain("parseVerifiedEducationCounts");
    expect(student).not.toContain('settingKey === "stat_students_reached"');
    expect(router).toContain('"stat_students_verified_monthly_counts"');
  });

  it("groups every public footer destination once and permits mobile zoom", () => {
    const grouped = footer
      .split("const FOOTER_GROUPS = [")[1]
      ?.split("] as const;")[0];
    expect(grouped).toBeDefined();
    const hrefs = [...(grouped || "").matchAll(/"(\/[a-z-]+)"/g)].map(
      match => match[1]
    );
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const item of PRIMARY_NAV.filter(item => item.href !== "/"))
      expect(hrefs).toContain(item.href);
    const secondary =
      footer.split("const SECONDARY = [")[1]?.split("] as const;")[0] || "";
    for (const match of secondary.matchAll(/href: "(\/[a-z-]+)"/g)) {
      expect(hrefs).toContain(match[1]);
    }
    for (const title of [
      "Education",
      "Impact and updates",
      "Governance",
      "Support and contact",
    ])
      expect(grouped).toContain(title);
    expect(html).not.toContain("maximum-scale=1");
    expect(html).not.toContain("More than 50 children are actively supported.");
  });
});
