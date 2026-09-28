import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HEADER_NAV_GROUPS, PRIMARY_NAV } from "./focusContent";

const navbar = readFileSync("client/src/components/Navbar.tsx", "utf8");
const footer = readFileSync("client/src/components/Footer.tsx", "utf8");
const home = readFileSync("client/src/pages/Home.tsx", "utf8");

describe("compact public navigation", () => {
  it("uses seven clear sections plus separate Home and Donate actions", () => {
    expect(HEADER_NAV_GROUPS.map(group => group.en)).toEqual([
      "About",
      "Education & Learning",
      "Natural Disaster",
      "Animal Welfare",
      "Medical Emergencies",
      "Impact & Media",
      "Wellbeing & Relief",
    ]);
    expect(HEADER_NAV_GROUPS).toHaveLength(7);
    for (const group of HEADER_NAV_GROUPS.filter(
      item => !["disaster", "animals", "medical"].includes(item.key)
    )) {
      expect(group.items.length).toBeGreaterThanOrEqual(3);
      expect(group.items.length).toBeLessThanOrEqual(6);
    }
    for (const key of ["disaster", "animals", "medical"]) {
      expect(HEADER_NAV_GROUPS.find(group => group.key === key)?.items).toEqual(
        []
      );
    }
    expect(navbar).toContain("aria-label={t(");
    expect(navbar).toContain('"Abhiara Foundation home"');
    expect(navbar).toContain('href="/donate"');
    expect(navbar).toContain('t("Donate once", "ଏକକ ଦାନ")');
    expect(navbar).not.toContain("PRIMARY_NAV.map");
  });

  it("keeps every established primary route available inside the grouped header", () => {
    const groupedRoutes = HEADER_NAV_GROUPS.flatMap(group =>
      group.items.map(item => item.href)
    );
    for (const item of PRIMARY_NAV.filter(
      item => item.href !== "/" && item.href !== "/donate"
    )) {
      expect(groupedRoutes).toContain(item.href);
    }
  });

  it("keeps parent pages usable beside distinct disclosure controls", () => {
    expect(navbar).toContain("href={group.href}");
    expect(navbar).toContain("<DropdownMenuTrigger asChild>");
    expect(navbar).toContain("aria-current=");
    expect(navbar).toContain("aria-expanded={expanded}");
    expect(navbar).toContain("aria-controls={`mobile-group-${group.key}`}");
  });

  it("keeps the Abhiara Foundation logo clearly visible", () => {
    expect(navbar).toContain(
      'className="h-16 w-auto md:h-20 min-[1440px]:h-24"'
    );
    expect(navbar).toContain(
      'className="mx-auto flex h-24 max-w-[1540px] items-center px-4 md:px-6 min-[1440px]:h-28"'
    );
    expect(home).toContain('t("Abhiara Foundation", "ଅଭିଆରା ଫାଉଣ୍ଡେସନ")');
    expect(home).toContain("text-[#F5A623] md:text-5xl lg:text-6xl");
    expect(home).toContain(
      "text-5xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl"
    );
    expect(footer).toContain(
      'className="mb-5 h-20 w-auto rounded bg-white p-1 md:h-24"'
    );
  });

  it("uses one accessible mobile dialog with Escape, focus return, and large targets", () => {
    expect(navbar).toContain('role="dialog"');
    expect(navbar).toContain('aria-modal="true"');
    expect(navbar).toContain('event.key === "Escape"');
    expect(navbar).toContain("previousFocus.focus()");
    expect(navbar).toContain('document.body.style.overflow = "hidden"');
    expect(navbar).toContain("h-11 w-11");
    expect(navbar).toContain("min-h-11");
    expect(navbar).toContain("min-[1440px]:flex");
    expect(navbar).toContain("min-[1440px]:hidden");
    expect(navbar).not.toContain("lg:flex");
  });

  it("gives disaster, animal welfare and medical emergencies their own top-level links", () => {
    expect(
      HEADER_NAV_GROUPS.find(group => group.key === "disaster")?.href
    ).toBe("/disaster-relief");
    expect(HEADER_NAV_GROUPS.find(group => group.key === "animals")?.href).toBe(
      "/animal-welfare-support"
    );
    expect(HEADER_NAV_GROUPS.find(group => group.key === "medical")?.href).toBe(
      "/medical-emergency-support"
    );
    expect(navbar).toContain("if (!group.items.length)");
  });

  it("keeps trust, privacy, and future plans discoverable without crowding the top line", () => {
    const allGroupedRoutes = HEADER_NAV_GROUPS.flatMap(group =>
      group.items.map(item => item.href)
    );
    expect(allGroupedRoutes).toContain("/privacy");
    expect(allGroupedRoutes).toContain("/board-and-transparency");
    expect(allGroupedRoutes).toContain("/abhiara-vidyapitha");
    expect(allGroupedRoutes).toContain("/contact");
    expect(navbar).toContain("Donation policy");
  });
});
