import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = readFileSync("client/src/pages/Home.tsx", "utf8");
const admin = readFileSync("client/src/pages/Admin.tsx", "utf8");
const controlCentre = readFileSync(
  "client/src/components/AdminControlCentre.tsx",
  "utf8"
);
const cmsRouter = readFileSync("server/cms-router.ts", "utf8");
const schema = readFileSync("drizzle/schema.ts", "utf8");
const migration = readFileSync(
  "drizzle/0018_fluffy_thunderbolt_ross.sql",
  "utf8"
);
const ownerGuide = readFileSync("OWNER_ADMIN_GUIDE.md", "utf8");

const publicPhotoPages = [
  "client/src/pages/Home.tsx",
  "client/src/pages/ImpactGallery.tsx",
  "client/src/pages/PressMedia.tsx",
  "client/src/pages/OtherVerifiedSupport.tsx",
  "client/src/pages/SupportAreaPage.tsx",
  "client/src/pages/StudentImpact.tsx",
].map(path => readFileSync(path, "utf8"));

describe("owner-published impact photos", () => {
  it("starts the homepage hero with the selected education photo and then rotates all published programme photos", () => {
    expect(home).toContain("const FEATURED_HOME_PHOTO_ID = 30046");
    expect(home).toContain(
      'const FEATURED_HOME_PHOTO_PATH = "education-children-1.jpeg"'
    );
    expect(home).toContain("const orderedHeroPhotos");
    expect(home).toContain("orderedHeroPhotos.map");
    expect(home).toContain("HERO_AREA_BY_PHOTO_CATEGORY");
    expect(home).toContain("HERO_DONATION_CAUSES");
    expect(home).toContain("setActiveHeroIndex");
    expect(home).toContain("5600");
    expect(home).toContain("Abhiara Foundation programmes");
    expect(home).toContain("Explore this programme");
    expect(home).toContain("Donate for this work");
    expect(home).toContain("Pause programme carousel");
    expect(home).not.toContain(
      "Building Skills. Strengthening Rural Livelihoods."
    );
  });

  it("shows a rolling homepage section built only from published photo records", () => {
    expect(home).toContain("trpc.cms.gallery.listPublished.useQuery");
    expect(home).toMatch(/publishedImpactPhotos\s*\.filter/);
    expect(home).toContain("press|newspaper|certificate|clipping");
    expect(home).toContain("setInterval");
    expect(home).toContain("4200");
    expect(home).toContain('aria-live="polite"');
    expect(home).toContain('aria-roledescription="carousel"');
    expect(home).toContain("Our programmes in pictures");
    expect(home).toContain("object-contain");
    expect(home).toContain("HOME_IMPACT_CATEGORIES");
    expect(home).toContain("Read about this work");
    expect(home).toContain("Open Impact Gallery");
    expect(home).toContain("from-black/95 via-black/25 to-transparent");
    expect(home).toContain("from-black/70 via-black/30 to-transparent");
    expect(home).toContain("bg-black/70 p-5");
    expect(home).toContain("text-white md:text-base");
    expect(home.indexOf("HOME_WORK_AREAS.map")).toBeLessThan(
      home.indexOf("Our programmes in pictures")
    );
  });

  it("keeps raw Blob folder listings private to administrators", () => {
    expect(cmsRouter).toMatch(/listFolder:\s*adminProcedure/);
    for (const page of publicPhotoPages) {
      expect(page).not.toContain("trpc.cms.media.listFolder.useQuery");
      expect(page).toContain("trpc.cms.gallery.listPublished.useQuery");
    }
  });

  it("gives the owner one upload, caption and Publish workflow", () => {
    expect(admin).toContain("Public title");
    expect(admin).toContain("Short public caption");
    expect(admin).toContain("Publish after upload");
    expect(admin).toContain("Upload and Publish");
    expect(admin).toContain("Upload as Draft");
    expect(admin).toContain("isPublished: publishAfterUpload");
    expect(admin).toContain(
      "Add a public title and a short caption before uploading."
    );
    expect(admin).toContain("publicationMutation.mutate");
    expect(admin).toContain("Unpublish");
    expect(admin).toContain("Live on public pages");
    expect(admin).toContain("Draft");
    expect(admin).toContain('label: "Impact Photos"');
    expect(controlCentre).toContain('title: "Impact Photos"');
  });

  it("supports cause labels needed by the public filters", () => {
    for (const category of ["medical", "disaster", "animals"]) {
      expect(schema).toContain(`"${category}"`);
      expect(migration).toContain(`'${category}'`);
      expect(admin).toContain(`value: "${category}"`);
    }
  });

  it("documents that upload and publication are separate actions", () => {
    expect(ownerGuide).toContain("Publish after upload");
    expect(ownerGuide).toContain("Upload and Publish");
    expect(ownerGuide).toContain("Upload as Draft");
    expect(ownerGuide).toContain(
      "Uploading a file alone never makes it public"
    );
    expect(ownerGuide).toContain("Unpublish");
  });
});
