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
    expect(memberMigration).not.toMatch(/DROP TABLE|DROP COLUMN|TRUNCATE/i);
  });

  it("preserves the six approved profiles as published seed records", () => {
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
    expect(admin).toContain(
      "Show this person on the public Board, Members and Advisors page"
    );
    expect(admin).toContain("Unpublish");
  });

  it("shows only published board and advisory profiles on the public page", () => {
    expect(governance).toContain("trpc.cms.leadership.listPublished.useQuery");
    expect(governance).toContain('member.memberType === "board"');
    expect(governance).toContain('member.memberType === "advisor"');
    expect(governance).toContain('member.memberType === "member"');
    expect(governance).toContain('id="board"');
    expect(governance).toContain('id="members"');
    expect(governance).toContain('id="advisors"');
    expect(governance).toContain("object-contain");
    expect(governance).toContain(
      "Advisors provide professional or programme guidance"
    );
    expect(governance).not.toContain("Statutory record");
    expect(governance).not.toContain("How accountability works");
    expect(footer).toContain("CIN U87300MH2026NPL471397");
    expect(footer).toContain("NGO DARPAN MH/2026/1110513");
    expect(ownerGuide).toContain("Board, Members and Advisors");
    expect(ownerGuide).toContain("official company records");
  });
});
