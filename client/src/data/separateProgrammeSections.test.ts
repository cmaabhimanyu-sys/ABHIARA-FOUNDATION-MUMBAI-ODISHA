import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HEADER_NAV_GROUPS, HOME_WORK_AREAS } from "./focusContent";

const read = (path: string) => readFileSync(path, "utf8");
const app = read("client/src/App.tsx");
const home = read("client/src/pages/Home.tsx");
const education = read("client/src/pages/Programs.tsx");
const rural = read("client/src/pages/RuralAreaTransformation.tsx");
const elder = read("client/src/pages/ElderCareDignity.tsx");
const pratibha = read("client/src/pages/PratibhaSamman.tsx");
const support = read("client/src/pages/SupportAreaPage.tsx");
const otherSupport = read("client/src/pages/OtherVerifiedSupport.tsx");
const press = read("client/src/pages/PressMedia.tsx");
const gallery = read("client/src/pages/ImpactGallery.tsx");
const footer = read("client/src/components/Footer.tsx");
const sitemap = read("client/public/sitemap.xml");

const newRoutes = [
  "/rural-area-transformation",
  "/elder-care-and-dignity",
  "/abhiara-pratibha-samman",
];

describe("separate programme panels and galleries", () => {
  it("keeps six distinct programme panels on the homepage", () => {
    expect(HOME_WORK_AREAS.map(item => item.key)).toEqual([
      "education",
      "rural",
      "elder",
      "medical",
      "disaster",
      "animal",
    ]);
    expect(new Set(HOME_WORK_AREAS.map(item => item.href)).size).toBe(6);
    expect(home).toContain("HOME_WORK_AREAS.map");
    expect(home).toContain("One clear place to find every area of work");
  });

  it("registers and publishes separate rural, elder and Pratibha pages", () => {
    for (const route of newRoutes) {
      expect(app).toContain(`path="${route}"`);
      expect(footer).toContain(`href: "${route}"`);
      expect(sitemap).toContain(`https://www.abhiarafoundation.org${route}`);
      expect(press).toContain(`href: "${route}"`);
    }
  });

  it("keeps education subsections separate and discoverable", () => {
    for (const route of [
      "/how-we-support-a-child",
      "/rural-area-transformation",
      "/abhiara-pratibha-samman",
      "/digital-learning-ai",
      "/rti-human-rights-awareness",
    ]) {
      expect(education).toContain(`href: "${route}"`);
    }
    const educationMenu = HEADER_NAV_GROUPS.find(
      group => group.key === "education"
    );
    expect(educationMenu?.items.map(item => item.href)).toContain(
      "/rural-area-transformation"
    );
    expect(educationMenu?.items.map(item => item.href)).toContain(
      "/abhiara-pratibha-samman"
    );
  });

  it("uses a separate gallery query and cause filter on every programme page", () => {
    for (const page of [education, rural, elder, pratibha, support]) {
      expect(page).toContain("trpc.cms.gallery.listPublished.useQuery");
      expect(page).toContain("object-contain");
    }
    expect(education).toContain('item.category === "education"');
    expect(education).toContain("!/Pratibha Samman/i.test");
    expect(rural).toContain('item.category === "education"');
    expect(rural).toContain(
      "village|tribal|book|dictionary|learning|classroom|outdoor"
    );
    expect(elder).toContain('item.category === "elderly"');
    expect(pratibha).toContain("/Pratibha Samman/i.test");
    expect(support).toContain('galleryCategory: "medical"');
    expect(support).toContain('galleryCategory: "disaster"');
    expect(support).toContain('galleryCategory: "animals"');
  });

  it("keeps disaster, animal welfare and medical emergencies as separate top-level sections", () => {
    expect(
      HEADER_NAV_GROUPS.find(group => group.key === "disaster")?.href
    ).toBe("/disaster-relief");
    expect(HEADER_NAV_GROUPS.find(group => group.key === "animals")?.href).toBe(
      "/animal-welfare-support"
    );
    expect(HEADER_NAV_GROUPS.find(group => group.key === "medical")?.href).toBe(
      "/medical-emergency-support"
    );
    expect(
      HEADER_NAV_GROUPS.find(group => group.key === "governance")?.href
    ).toBe("/board-and-transparency");
    expect(
      HEADER_NAV_GROUPS.find(group => group.key === "governance")?.items
    ).toEqual([]);
  });

  it("does not expose internal owner, Admin or website-folder instructions publicly", () => {
    const publicPages = [
      home,
      education,
      rural,
      elder,
      pratibha,
      support,
      otherSupport,
      press,
      gallery,
    ].join("\n");
    for (const phrase of [
      "Approved public photographs",
      "We show only photos that the owner has checked",
      "owner has checked and published from Admin",
      "kept in a separate website folder",
    ]) {
      expect(publicPages).not.toContain(phrase);
    }
  });
});
