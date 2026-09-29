import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const teamPage = readFileSync(
  new URL("../pages/Team.tsx", import.meta.url),
  "utf8"
);

const navbar = readFileSync(
  new URL("../components/Navbar.tsx", import.meta.url),
  "utf8"
);

const footer = readFileSync(
  new URL("../components/Footer.tsx", import.meta.url),
  "utf8"
);

const focusContent = readFileSync(
  new URL("./focusContent.ts", import.meta.url),
  "utf8"
);

const governancePage = readFileSync(
  new URL("../pages/Governance.tsx", import.meta.url),
  "utf8"
);

const CURRENT_PUBLIC_TEAM = [
  "Abhimanyu Mallik",
  "Biswajita Mallik",
  "Rajkumar Mallik",
  "Gouranga Charan Sahoo",
  "Alok Behera",
  "Ashish (Rocky)",
  "Sujit Sahu",
  "Sagar Jena",
  "Bharat Panigrahy",
  "Amit Kumar Jena",
  "Manoj Kumar Mallik",
];

const BOARD_DIRECTORS = ["Abhimanyu Mallik", "Biswajita Mallik"];
const NON_DIRECTORS = CURRENT_PUBLIC_TEAM.filter(
  name => !BOARD_DIRECTORS.includes(name)
);

describe("public board and leadership roster", () => {
  it("keeps every verified director, advisor and ground-team name on the page", () => {
    for (const name of CURRENT_PUBLIC_TEAM) {
      expect(teamPage).toContain(name);
    }
  });

  it("keeps only the two confirmed directors in the Board of Directors data", () => {
    const boardData =
      teamPage.split("const BOARD_MEMBERS")[1]?.split("const ADVISORS")[0] ??
      "";

    for (const director of BOARD_DIRECTORS) {
      expect(boardData).toContain(director);
    }
    for (const nonDirector of NON_DIRECTORS) {
      expect(boardData).not.toContain(nonDirector);
    }
  });

  it("does not invent chairperson, secretary or treasurer titles", () => {
    expect(teamPage).not.toMatch(/role:\s*\{[^}]*Chairperson/i);
    expect(teamPage).not.toMatch(/role:\s*\{[^}]*Secretary/i);
    expect(teamPage).not.toMatch(/role:\s*\{[^}]*Treasurer/i);
    expect(governancePage).not.toMatch(/Chairman|Chairperson/i);
  });

  it("keeps Ashish (Rocky) in the ground team without adding an unsupported formal title", () => {
    const groundTeamData =
      teamPage
        .split("const GROUND_TEAM")[1]
        ?.split("const ORGANISATION_HIERARCHY")[0] ?? "";
    const ashishProfile =
      groundTeamData
        .split('name: { en: "Ashish (Rocky)"')[1]
        ?.split("},\n  {")[0] ?? "";

    expect(ashishProfile).toContain("Core Team Member");
    expect(ashishProfile).not.toContain("Director");
    expect(ashishProfile).not.toContain("Advisor");
  });

  it("keeps Amit Kumar Jena in Advisory Support and outside the Board of Directors", () => {
    const boardData =
      teamPage.split("const BOARD_MEMBERS")[1]?.split("const ADVISORS")[0] ??
      "";
    const advisorData =
      teamPage.split("const ADVISORS")[1]?.split("const GROUND_TEAM")[0] ?? "";
    const amitProfile =
      advisorData
        .split('name: { en: "Amit Kumar Jena"')[1]
        ?.split("},\n  {")[0] ?? "";

    expect(boardData).not.toContain("Amit Kumar Jena");
    expect(amitProfile).toContain("Founding Patron and Strategic Advisor");
    expect(amitProfile).toContain("team-amit-kumar-jena.jpeg");
    expect(amitProfile).not.toContain("separate from the Board of Directors");
  });

  it("is bilingual and keeps leadership photographs full frame", () => {
    expect(teamPage).toContain("useLanguage");
    expect(teamPage).toContain("ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳ");
    expect(teamPage).toContain('className="w-full h-full object-contain"');
    expect(teamPage).not.toContain('className="w-full h-full object-cover"');
  });

  it("removes the old core-member application and keeps volunteering as the only public join path", () => {
    expect(teamPage).not.toContain("CoreMemberForm");
    expect(teamPage).not.toContain("Submit Application");
    expect(teamPage).not.toContain("trpc.coreMember.submit");
    expect(teamPage).toContain('href="/volunteer"');
  });

  it("keeps the public people page as a direct main navigation section", () => {
    expect(focusContent).toContain('key: "people"');
    expect(focusContent).toContain('en: "Board & Presence"');
    expect(focusContent).toContain('href: "/board-and-transparency"');
    expect(navbar).toContain("HEADER_NAV_GROUPS.map");
    expect(navbar).toContain("DropdownMenu");
    expect(navbar).not.toContain("PRIMARY_NAV.map");
    expect(footer).toContain("PRIMARY_NAV.filter");
  });

  it("shows a clear four-level Section 8 public hierarchy", () => {
    const hierarchy =
      teamPage
        .split("const ORGANISATION_HIERARCHY")[1]
        ?.split("function InitialPortrait")[0] ?? "";

    const expectedOrder = [
      "Board of Directors",
      "Advisory Support",
      "Programme and Field Team",
      "Volunteers",
    ];

    let previousPosition = -1;
    for (const level of expectedOrder) {
      const position = hierarchy.indexOf(level);
      expect(position).toBeGreaterThan(previousPosition);
      previousPosition = position;
    }

    expect(hierarchy).toContain("not shown as directors");
    expect(hierarchy).toContain(
      "does not create a job, board position or authority"
    );
    expect(teamPage).toContain("SECTION 8 ORGANISATION HIERARCHY");
  });
});
