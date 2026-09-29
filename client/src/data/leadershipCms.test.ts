import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const schema = readFileSync("drizzle/schema.ts", "utf8");
const migration = readFileSync("drizzle/0019_blue_darwin.sql", "utf8");
const memberMigration = readFileSync(
  "drizzle/0021_previous_masked_marvel.sql",
  "utf8"
);
const cmsDb = readFileSync("server/cms-db.ts", "utf8");
const cmsRouter = readFileSync("server/cms-router.ts", "utf8");
const admin = readFileSync("client/src/pages/Admin.tsx", "utf8");
const controlCentre = readFileSync(
  "client/src/components/AdminControlCentre.tsx",
  "utf8"
);
const governance = readFileSync("client/src/pages/Governance.tsx", "utf8");
const team = readFileSync("client/src/pages/Team.tsx", "utf8");
const footer = readFileSync("client/src/components/Footer.tsx", "utf8");
const ownerGuide = readFileSync("OWNER_ADMIN_GUIDE.md", "utf8");

describe("owner managed board and advisory members", () => {
  it("uses a dedicated additive leadership table with bilingual public fields", () => {
    expect(schema).toContain('mysqlTable("leadership_members"');
    expect(schema).toContain('"member"');
    for (const field of [
      "nameEn",
      "nameOd",
      "roleEn",
      "roleOd",
      "qualificationEn",
      "qualificationOd",
      "bioEn",
      "bioOd",
      "imageUrl",
      "profileUrl",
      "isPublished",
      "sortOrder",
    ]) {
      expect(schema).toContain(field);
    }
    expect(migration).toContain("CREATE TABLE `leadership_members`");
    expect(migration).not.toMatch(/DROP TABLE|DROP COLUMN|TRUNCATE/i);
    expect(memberMigration).toContain("enum('board','member','advisor')");
    expect(memberMigration).toContain("people-portrait-800x1000.webp");
    expect(memberMigration).toContain("30011-manoj-kumar-mallik");
    expect(memberMigration).not.toMatch(/DROP TABLE|DROP COLUMN|TRUNCATE/i);
  });

  it("preserves the original profiles and records requested public removals", () => {
    for (const name of [
      "Abhimanyu Mallik",
      "Biswajita Mallik",
      "Amit Kumar Jena",
      "Sujit Sahu",
      "Sagar Jena",
      "Bharat Panigrahy",
    ]) {
      expect(migration).toContain(name);
    }
    expect(migration).toContain("Founding Patron and Strategic Advisor");
    expect(migration).toContain("Founder and Director");
    expect(migration).not.toContain(
      "This is an advisory role, separate from the Board of Directors."
    );
    expect(team).not.toContain(
      "This is an advisory role, separate from the Board of Directors."
    );
    expect(memberMigration).toContain(
      "SET `isPublished` = false WHERE `id` IN (5, 6)"
    );
    expect(memberMigration).toContain("More than 25 years of experience");
    expect(memberMigration).toContain("`qualificationEn` = NULL");
    expect(memberMigration).toContain("`qualificationOd` = NULL");
    expect(memberMigration).toContain(
      "community development, child welfare and field operations"
    );
    expect(memberMigration).not.toContain("9437903009");
    expect(memberMigration).not.toContain("ukmazad@gmail.com");
    expect(memberMigration).not.toContain("Marital status");
    expect(memberMigration).toContain(
      "Head of Verification and Field Coordination, Odisha"
    );
    expect(memberMigration).toContain("ଓଡ଼ିଶା ଯାଞ୍ଚ ଓ କ୍ଷେତ୍ର ସମନ୍ୱୟ ମୁଖ୍ୟ");
    const requestedOrder = [
      "WHEN 1 THEN 10",
      "WHEN 2 THEN 20",
      "WHEN 3 THEN 30",
      "WHEN 4 THEN 40",
      "WHEN 30001 THEN 50",
      "WHEN 30011 THEN 60",
    ];
    let previousIndex = -1;
    for (const marker of requestedOrder) {
      const markerIndex = memberMigration.indexOf(marker);
      expect(markerIndex).toBeGreaterThan(previousIndex);
      previousIndex = markerIndex;
    }
    expect(memberMigration).toContain("`id` IN (30008, 30009, 30010)");
    expect(memberMigration).toContain(
      "'Rajkumar Mallik', 'Alok Behera', 'Ashish (Rocky)'"
    );
    expect(memberMigration).toContain("Mr. Gurpreetsingh Nebhrani");
    expect(memberMigration).toContain("Ms. Biswajita Mallik");
    expect(memberMigration).toContain("Ms. Samiksha Parekh");
    expect(memberMigration).toContain("Ms. Farheen Ansari");
    expect(memberMigration).toContain("CS (Company Secretary) and LLB");
    expect(memberMigration).toContain(
      "Supports the Foundation with secretarial and legal work."
    );
    expect(memberMigration).not.toContain("Comany secreatary");
    expect(memberMigration).not.toContain("CA Gurpreetsingh Nebhrani");
    expect(memberMigration).toContain("Mr. Kishore Kumar Parida");
    expect(memberMigration).toContain("'B.Com, MBA'");
    expect(memberMigration).toContain(
      "kishore-kumar-parida-people-portrait-800x1000.webp"
    );
  });

  it("keeps public reads separate from protected Admin changes", () => {
    expect(cmsDb).toContain("getLeadershipMembers");
    expect(cmsDb).toContain("createLeadershipMember");
    expect(cmsDb).toContain("updateLeadershipMember");
    expect(cmsDb).toContain("deleteLeadershipMember");
    expect(cmsRouter).toMatch(/list:\s*adminProcedure/);
    expect(cmsRouter).toMatch(/listPublished:\s*publicProcedure/);
    expect(cmsRouter).toContain("leadership: leadershipRouter");
  });

  it("gives the owner complete member controls with legal role guidance", () => {
    expect(controlCentre).toContain("Board, Members and Advisors");
    expect(admin).toContain('label: "Board, Members and Advisors"');
    expect(admin).toContain("trpc.cms.leadership.create.useMutation");
    expect(admin).toContain("trpc.cms.leadership.update.useMutation");
    expect(admin).toContain("trpc.cms.leadership.delete.useMutation");
    expect(admin).toContain("Board members must match");
    expect(admin).toContain("Advisory roles must stay separate");
    expect(admin).toContain('<option value="member">Members</option>');
    expect(admin).toContain("Display order");
    expect(admin).toContain("Use Mr., Ms. or Mrs. as confirmed by the person");
    expect(admin).toContain("Keep CA,");
    expect(admin).toContain(
      "Show this person on the public Board, Members and Advisors page"
    );
    expect(admin).toContain("Unpublish");
    expect(admin).toContain("standardizeLeadershipPortrait");
    expect(admin).toContain("canvas.width = 800");
    expect(admin).toContain("canvas.height = 1000");
    expect(admin).toContain('"image/webp"');
    expect(admin).toContain("const scale = Math.max");
    expect(admin).toContain("may crop the outer edges");
  });

  it("shows every published person in one Admin-controlled public sequence", () => {
    expect(governance).toContain("trpc.cms.leadership.listPublished.useQuery");
    expect(governance).toContain("leadershipMembers.map");
    expect(governance).toContain('id="people"');
    expect(governance).toContain("one sequence");
    expect(governance).not.toContain('member.memberType === "board"');
    expect(governance).not.toContain('id="board"');
    expect(governance).not.toContain('id="members"');
    expect(governance).not.toContain('id="advisors"');
    expect(governance).not.toContain("Only confirmed directors");
    expect(governance).not.toContain("separate groups");
    expect(governance).toContain("aspect-[4/5]");
    expect(governance).toContain("object-cover");
    expect(governance).toContain("width={800}");
    expect(governance).toContain("height={1000}");
    expect(governance).toContain('loading="lazy"');
    expect(governance).toContain("<details");
    expect(governance).toContain("View details");
    expect(governance).toContain("Close details");
    expect(governance).not.toContain(
      "managed by the Foundation owner in Admin"
    );
    expect(governance).not.toContain("Statutory record");
    expect(governance).not.toContain("How accountability works");
    expect(footer).toContain("CIN U87300MH2026NPL471397");
    expect(footer).toContain("NGO DARPAN MH/2026/1110513");
    expect(ownerGuide).toContain("Board, Members and Advisors");
    expect(ownerGuide).toContain("official company records");
  });
});
