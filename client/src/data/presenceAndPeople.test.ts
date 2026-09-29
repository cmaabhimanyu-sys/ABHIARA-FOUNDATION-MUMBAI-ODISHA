import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HEADER_NAV_GROUPS, PRIMARY_NAV } from "./focusContent";

const read = (path: string) => readFileSync(path, "utf8");
const app = read("client/src/App.tsx");
const home = read("client/src/pages/Home.tsx");
const people = read("client/src/pages/Governance.tsx");
const presence = read("client/src/pages/OurPresence.tsx");
const sitemap = read("client/public/sitemap.xml");

describe("board, people, and public presence", () => {
  it("keeps Board and Presence visible in the main navigation", () => {
    const group = HEADER_NAV_GROUPS.find(item => item.key === "people");
    expect(group?.en).toBe("Board & Presence");
    expect(group?.href).toBe("/board-and-transparency");
    expect(group?.items.map(item => item.href)).toEqual([
      "/board-and-transparency",
      "/our-presence",
    ]);
    expect(PRIMARY_NAV.some(item => item.href === "/our-presence")).toBe(true);
  });

  it("adds a compact homepage introduction to the Foundation", () => {
    for (const label of [
      "Know Abhiara",
      "Who We Are",
      "What We Do",
      "Board and People",
      "Our Presence",
    ]) {
      expect(home).toContain(label);
    }
    expect(home).toContain('href: "/our-presence"');
    expect(home).toContain('href: "/board-and-transparency"');
  });

  it("publishes a factual bilingual presence page without overstating reach", () => {
    expect(app).toContain(
      '<Route path="/our-presence" component={OurPresence} />'
    );
    expect(presence).toContain("Mumbai, Maharashtra");
    expect(presence).toContain("Odisha");
    expect(presence).toContain("Different parts of India");
    expect(presence).toContain(
      "does not claim that Abhiara Foundation has an office or an active programme in every state"
    );
    expect(presence).toContain("ଓଡ଼ିଶା");
    expect(sitemap).toContain("https://www.abhiarafoundation.org/our-presence");
  });

  it("keeps every published person in one sequence with expandable details", () => {
    expect(people).toContain("leadershipMembers.map");
    expect(people).toContain("<details");
    expect(people).toContain("View details");
    expect(people).toContain("Close details");
    expect(people).not.toContain('member.memberType === "board"');
    expect(people).not.toContain("managed by the Foundation owner in Admin");
  });
});
