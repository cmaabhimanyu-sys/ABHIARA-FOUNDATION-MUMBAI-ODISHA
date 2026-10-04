import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { groupPublishedPeople, PEOPLE_SECTIONS } from "./peopleSections";

const read = (path: string) => readFileSync(path, "utf8");
const schema = read("drizzle/schema.ts");
const earlierMigration = read("drizzle/0021_previous_masked_marvel.sql");
const rosterMigration = read("drizzle/0022_lush_microchip.sql");
const bioMigration = read("drizzle/0023_magenta_changeling.sql");
const auditorMigration = read("drizzle/0024_old_sally_floyd.sql");
const noteReviewMigration = read("drizzle/0025_people_public_note_review.sql");
const cmsDb = read("server/cms-db.ts");
const cmsRouter = read("server/cms-router.ts");
const admin = read("client/src/pages/Admin.tsx");
const governance = read("client/src/pages/Governance.tsx");
const ownerGuide = read("OWNER_ADMIN_GUIDE.md");

const publishedRoster = [
  [1, "board", "Mr. Abhimanyu Mallik"],
  [2, "board", "Ms. Biswajita Mallik"],
  [91004, "auditor", "R B R & Associates"],
  [4, "advisor", "Mr. Sujit Sahu"],
  [91001, "advisor", "Mr. Subhasis Sahoo, CMA"],
  [3, "advisor", "Mr. Amit Kumar Jena"],
  [30001, "odisha", "Mr. Umakanta Mahanta"],
  [30011, "odisha", "Mr. Manoj Kumar Mallik"],
  [30003, "member", "Mr. Gurpreetsingh Nebhrani"],
  [30007, "member", "Ms. Farheen Ansari"],
  [30006, "member", "Ms. Samiksha Parekh"],
  [30004, "member", "Mr. Asis Kumar Samal"],
  [30005, "member", "Mr. Prasant Behera"],
  [30002, "member", "Mr. Gouranga Charan Sahoo"],
  [60001, "member", "Mr. Kishore Kumar Parida"],
  [90001, "member", "Ms. Sonalika Das"],
  [91002, "member", "Mr. Ashish Kumar Swain"],
  [91003, "member", "Mr. Viky Sangoi"],
] as const;

describe("owner-managed People roster", () => {
  it("models five bilingual groups without dropping earlier records", () => {
    expect(schema).toContain('"odisha"');
    expect(rosterMigration).toContain(
      "enum('board','advisor','odisha','member')"
    );
    expect(rosterMigration).not.toMatch(/DROP TABLE|DROP COLUMN|TRUNCATE/i);
    expect(rosterMigration).toContain(
      "Unpublished historical records remain untouched"
    );
    expect(earlierMigration).toContain(
      "SET `isPublished` = false WHERE `id` IN (5, 6)"
    );
    expect(earlierMigration).toContain("`id` IN (30008, 30009, 30010)");
    expect(PEOPLE_SECTIONS.map(section => section.titleEn)).toEqual([
      "Board of Directors",
      "Independent Statutory Auditor",
      "Guiding Patron & Advisors",
      "Odisha Division Leadership",
      "Core Members",
    ]);
    expect(PEOPLE_SECTIONS.every(section => section.titleOd.length > 0)).toBe(
      true
    );
  });

  it("keeps the approved 18 records and stated qualifications and duties", () => {
    const historicalAndCurrent =
      earlierMigration + rosterMigration + auditorMigration;
    expect(publishedRoster).toHaveLength(18);
    for (const [id, section, name] of publishedRoster) {
      expect(Number(id)).toBeGreaterThan(0);
      expect(["board", "auditor", "advisor", "odisha", "member"]).toContain(
        section
      );
      expect(historicalAndCurrent).toContain(name);
    }
    for (const exactText of [
      "Co-Founder & Director",
      "Guiding Patron & Legal Advisor",
      "Senior Advisor, Education & Community Engagement",
      "President, Odisha Division",
      "B.A., Diploma in Community Development, PG Diploma in Psychological Counselling",
      "More than 25 years of experience in community development, child welfare and field operations across Odisha and Karnataka.",
      "Vice President, Odisha Division",
      "Leads verification and field coordination; supports the President in Odisha operations.",
      "CS and LLB",
      "WHEN 90001 THEN 'Graduation'",
      "M.S. Pharm",
      "MBA in Finance",
      "Advocate, LLB, LLM (IPR)",
    ])
      expect(historicalAndCurrent).toContain(exactText);
    expect(rosterMigration).not.toContain("Consultant, Mumbai");
    expect(rosterMigration).not.toContain("CSR readiness");
    expect(rosterMigration).not.toContain("Rotary Club of Bhubaneswar North");
    expect(noteReviewMigration).toContain("`id` = 2");
    expect(noteReviewMigration).toContain("`bioIsPublic` = FALSE");
  });

  it("groups ordered people without assuming hardcoded individual cards", () => {
    const sample = publishedRoster.map(([id, memberType, name], index) => ({
      id,
      memberType,
      name,
      sortOrder: (index + 1) * 10,
    }));
    const groups = groupPublishedPeople([...sample].reverse());
    expect(groups.map(group => group.members.length)).toEqual([2, 1, 3, 2, 10]);
    expect(
      groups.flatMap(group => group.members.map(member => member.name))
    ).toEqual(publishedRoster.map(([, , name]) => name));
    expect(groups[4]?.members[9]?.name).toBe("Mr. Viky Sangoi");
  });

  it("separates public reading from protected owner mutations", () => {
    expect(cmsDb).toContain("getLeadershipMembers");
    expect(cmsDb).toContain("createLeadershipMember");
    expect(cmsDb).toContain("updateLeadershipMember");
    expect(cmsRouter).toMatch(/list:\s*adminProcedure/);
    expect(cmsRouter).toMatch(/listPublished:\s*publicProcedure/);
    expect(cmsRouter).toContain(
      '"board", "auditor", "advisor", "odisha", "member"'
    );
    for (const option of [
      'value="board"',
      'value="auditor"',
      'value="advisor"',
      'value="odisha"',
      'value="member"',
    ]) {
      expect(admin).toContain(option);
    }
    expect(admin).toContain('folder: "leadership"');
    expect(admin).toContain("trpc.cms.media.upload.useMutation");
    expect(admin).toContain("canvas.width = 800");
    expect(admin).toContain("canvas.height = 1000");
    expect(ownerGuide).toContain("abhiara-images/leadership/");
  });

  it("shows the correct role, qualification and optional note in every public section", () => {
    expect(governance).toContain("groupPublishedPeople(leadershipMembers)");
    expect(governance).toContain("section.members.map");
    expect(governance).toContain("member.roleEn");
    expect(governance).toContain("member.roleOd");
    expect(governance).toContain("member.qualificationEn");
    expect(governance).toContain("{member.bioIsPublic && bio && (");
    expect(governance).toContain("rounded-full");
    expect(governance).toContain("object-center");
    expect(governance).toContain(
      'member.id === 1 ? "scale-[2] object-[center_25%] origin-[50%_25%]"'
    );
    expect(governance).toContain("xl:grid-cols-4");
    expect(governance).not.toContain("Aadhaar");
    expect(governance).not.toContain("Bombay High Court");
    expect(bioMigration).toContain("`id` IN (2, 30001, 30011)");
    expect(cmsDb).toContain(
      "row.bioIsPublic ? row : { ...row, bioEn: null, bioOd: null }"
    );
    expect(admin).toContain("Show this approved short biography");
    expect(ownerGuide).toContain("other saved biographies remain in Admin");
  });

  it("separates the auditor and does not expose the signed consent or invent a filing number", () => {
    expect(auditorMigration).toContain("Appointed Statutory Auditor");
    expect(auditorMigration).toContain("138415W");
    expect(auditorMigration).toContain("CA Sandeep Gurav, Partner");
    expect(auditorMigration).toContain("independent of the Board");
    expect(auditorMigration).toContain(
      "WHEN 91003 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/"
    );
    expect(auditorMigration).not.toContain("WHEN 91004 THEN");
    expect(auditorMigration).not.toContain("profileUrl");
    expect(admin).toContain("Written consent from the audit firm is required");
    expect(admin).toContain("auditorMediaApproved");
    expect(governance).not.toContain("AuditorConsent.pdf");
    expect(auditorMigration).not.toMatch(
      /ADT-1|SRN|114697|9930031099|rbroffice@/
    );
  });
});
