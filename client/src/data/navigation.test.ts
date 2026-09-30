import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HEADER_NAV_GROUPS, PRIMARY_NAV } from "./focusContent";

const navbar = readFileSync("client/src/components/Navbar.tsx", "utf8");
const footer = readFileSync("client/src/components/Footer.tsx", "utf8");
const home = readFileSync("client/src/pages/Home.tsx", "utf8");

describe("compact public navigation", () => {
  it("uses six clear sections plus separate Home and Donate actions", () => {
    expect(HEADER_NAV_GROUPS.map(group => group.en)).toEqual([
      "About",
      "Education & Learning",
      "Other Activities",
      "Impact & Transparency",
      "Board & Presence",
      "CSR & Support",
    ]);
    expect(HEADER_NAV_GROUPS).toHaveLength(6);
    for (const group of HEADER_NAV_GROUPS) {
      if (group.key === "people") {
        expect(group.items).toHaveLength(2);
        continue;
      }
      expect(group.items.length).toBeGreaterThanOrEqual(3);
      expect(group.items.length).toBeLessThanOrEqual(8);
    }
    expect(navbar).toContain("aria-label={t(");
    expect(navbar).toContain('"Abhiara Foundation home"');
    expect(navbar).toContain('href="/donate"');
    expect(navbar).toContain('t("Donate once", "ଏକକ ଦାନ")');
    expect(navbar).not.toContain("PRIMARY_NAV.map");
  });

  it("keeps every established primary route available inside the grouped header", () => {
    const groupedRoutes = HEADER_NAV_GROUPS.flatMap(group => [
      group.href,
      ...group.items.map(item => item.href),
    ]);
    for (const item of PRIMARY_NAV.filter(
      item =>
        item.href !== "/" &&
        item.href !== "/donate" &&
        item.href !== "/limited-verified-support"
    )) {
      expect(groupedRoutes).toContain(item.href);
    }
    expect(footer).toContain("PRIMARY_NAV.filter");
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
    expect(home).toContain('"Fearless Ray of Light"');
    expect(home).toContain('"ନିର୍ଭୀକ ଆଲୋକର କିରଣ"');
    expect(home).toContain(
      "text-3xl font-bold text-[#F5A623] sm:text-4xl md:text-5xl"
    );
    expect(home).toContain(
      "text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl"
    );
    expect(footer).toContain('src="/abhiara-mark.png"');
    expect(footer).toContain('t("Fearless Ray of Light"');
    expect(footer).toContain("text-[#F5A623]");
    expect(footer).not.toContain("rounded bg-white p-1");
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

  it("keeps all secondary support inside one Other Activities menu", () => {
    const other = HEADER_NAV_GROUPS.find(group => group.key === "other");
    expect(other?.href).toBe("/limited-verified-support");
    expect(other?.items.map(item => item.href)).toEqual(
      expect.arrayContaining([
        "/elder-care-and-dignity",
        "/medical-emergency-support",
        "/disaster-relief",
        "/animal-welfare-support",
      ])
    );
  });

  it("keeps trust, privacy, and future plans discoverable without crowding the top line", () => {
    const allGroupedRoutes = HEADER_NAV_GROUPS.flatMap(group =>
      group.items.map(item => item.href)
    );
    expect(allGroupedRoutes).toContain("/privacy");
    expect(HEADER_NAV_GROUPS.find(group => group.key === "people")?.href).toBe(
      "/board-and-transparency"
    );
    expect(
      HEADER_NAV_GROUPS.find(group => group.key === "people")?.items.map(
        item => item.href
      )
    ).toEqual(["/board-and-transparency", "/our-presence"]);
    expect(allGroupedRoutes).toContain("/abhiara-vidyapitha");
    expect(allGroupedRoutes).toContain("/blog");
    expect(allGroupedRoutes).toContain("/contact");
    expect(navbar).toContain("Donation policy");
  });

  it("makes CSR support, the Fynd story and Blog visible in main navigation and Home", () => {
    const support = HEADER_NAV_GROUPS.find(group => group.key === "support");
    expect(support?.href).toBe("/partners-and-supporters");
    expect(support?.items.map(item => item.href)).toEqual([
      "/partners-and-supporters",
      "/blog/fynd-foundation-supports-education-programme",
      "/volunteer",
      "/contact",
    ]);
    expect(
      HEADER_NAV_GROUPS.find(group => group.key === "impact")?.items.map(
        item => item.href
      )
    ).toContain("/blog");
    expect(home).toContain('t("CSR & Support", "CSR ଓ ସହାୟତା")');
    expect(home).toContain("Fynd Foundation, Mumbai");
    expect(home).toContain(
      'href="/blog/fynd-foundation-supports-education-programme"'
    );
    expect(home).toContain('href="/blog"');
  });
});
