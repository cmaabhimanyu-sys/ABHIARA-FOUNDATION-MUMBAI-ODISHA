import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path, "utf8");
const migration = read("drizzle/0026_owner_education_milestones.sql");
const home = read("client/src/pages/Home.tsx");
const student = read("client/src/pages/StudentImpact.tsx");
const admin = read("client/src/pages/Admin.tsx");
const router = read("server/cms-router.ts");

describe("Foundation-reported education milestones", () => {
  it("seeds only the two owner-reported approximate figures with their reported date", () => {
    for (const fact of [
      '"reportedOn":"2026-10-04"',
      '"onboarded":"50+"',
      '"materials":"300+"',
      '"mostlyOrphaned":true',
    ]) {
      expect(migration).toContain(fact);
    }
    expect(migration).toContain("INSERT IGNORE INTO `site_settings`");
    expect(migration).not.toMatch(/350\+|all.{0,15}orphaned|CSR expenditure/i);
  });

  it("renders two separate bilingual programme figures and an overlap warning", () => {
    expect(home).toContain("parseEducationSnapshot(");
    expect(home).toMatch(
      /formatEducationFigure\(\s*educationSnapshot\.onboarded/
    );
    expect(home).toMatch(
      /formatEducationFigure\(\s*educationSnapshot\.materials/
    );
    expect(home).toContain('href="/student-impact"');
    expect(student).toContain(
      "The Foundation reports that most children in this group are orphaned."
    );
    expect(student).toContain(
      "Books, dictionaries, pens and other school materials were distributed."
    );
    expect(student).toContain("the figures must not be added together");
    expect(student).toContain("not a monthly tuition count");
    expect(student).toContain("ଅଧିକାଂଶ ଅନାଥ");
  });

  it("keeps future owner updates atomic and refuses invalid public snapshots", () => {
    expect(admin).toContain("Publish education programme milestones");
    expect(admin).toContain("mostlyOrphaned: educationSnapshot.mostlyOrphaned");
    expect(admin).toContain("parseEducationSnapshot(");
    expect(router).toContain("EDUCATION_SNAPSHOT_KEY");
    expect(router).toContain(
      "parseEducationSnapshot(setting.settingValue) !== null"
    );
  });
});
