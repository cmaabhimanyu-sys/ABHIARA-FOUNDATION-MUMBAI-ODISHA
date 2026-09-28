import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SUPPORT_AREA_CONFIGS } from "@/pages/SupportAreaPage";

const app = readFileSync("client/src/App.tsx", "utf8");
const footer = readFileSync("client/src/components/Footer.tsx", "utf8");
const sitemap = readFileSync("client/public/sitemap.xml", "utf8");
const supportPage = readFileSync(
  "client/src/pages/SupportAreaPage.tsx",
  "utf8"
);
const supportHub = readFileSync(
  "client/src/pages/OtherVerifiedSupport.tsx",
  "utf8"
);
const limitedSupport = readFileSync(
  "client/src/pages/LimitedVerifiedSupport.tsx",
  "utf8"
);
const admin = readFileSync("client/src/pages/Admin.tsx", "utf8");
const blobMedia = readFileSync("server/blobMedia.ts", "utf8");
const ownerGuide = readFileSync("OWNER_ADMIN_GUIDE.md", "utf8");

describe("separate limited support sections", () => {
  const routes = [
    "/disaster-relief",
    "/medical-emergency-support",
    "/animal-welfare-support",
  ];

  it("publishes three bilingual pages without adding more top-level navigation", () => {
    for (const route of routes) {
      expect(app).toContain(`path="${route}"`);
      expect(footer).toContain(`href: "${route}"`);
      expect(sitemap).toContain(`https://www.abhiarafoundation.org${route}`);
      expect(limitedSupport).toContain(`"${route}"`);
    }
    expect(supportPage).toContain("useLanguage");
    expect(supportPage).toContain("config.title.od");
    expect(supportPage).toContain("Only photos that have passed permission");
  });

  it("accepts any verified urgent medical need and uses cancer and kidney treatment only as examples", () => {
    const medical = SUPPORT_AREA_CONFIGS.medical;
    expect(medical.title.en).toBe("Medical Emergency Help");
    expect(medical.introduction.en).toContain("verified urgent medical need");
    expect(medical.introduction.en).toContain(
      "Cancer and kidney treatment are examples, not the only cases considered"
    );
    expect(medical.introduction.en).toContain("Help cannot be guaranteed");
    expect(medical.privacy.en).toMatch(
      /medical papers, diagnoses, patient names, phone numbers and family details/i
    );
    expect(supportPage).not.toMatch(
      /medical receipt|medical certificate upload/i
    );
  });

  it("keeps disaster and animal work limited, verified and secondary to education", () => {
    expect(SUPPORT_AREA_CONFIGS.disaster.introduction.en).toMatch(
      /floods, cyclones, fires/i
    );
    expect(SUPPORT_AREA_CONFIGS.disaster.introduction.en).toMatch(
      /available funds and an approved budget/i
    );
    expect(SUPPORT_AREA_CONFIGS.animal.introduction.en).toContain(
      "secondary to children's education"
    );
    expect(SUPPORT_AREA_CONFIGS.animal.urgentNote.en).toContain(
      "does not run an animal ambulance or rescue centre"
    );
  });

  it("preselects the matching one-time donation cause from each support page", () => {
    expect(SUPPORT_AREA_CONFIGS.disaster.donationCause).toBe("disaster_relief");
    expect(SUPPORT_AREA_CONFIGS.medical.donationCause).toBe(
      "medical_emergency"
    );
    expect(SUPPORT_AREA_CONFIGS.animal.donationCause).toBe("animal_welfare");
    expect(supportPage).toContain(
      "href={`/donate?cause=${config.donationCause}`}"
    );
    expect(supportPage).toContain("Make a one time donation");
  });

  it("uses consent-protected upload folders and owner-published public records", () => {
    const folders = ["disaster-relief", "medical-support", "animal-welfare"];
    for (const folder of folders) {
      expect(blobMedia).toContain(`"${folder}"`);
      expect(admin).toContain(`<option value="${folder}">`);
    }
    expect(supportPage).toContain("trpc.cms.gallery.listPublished.useQuery");
    expect(supportHub).toContain("trpc.cms.gallery.listPublished.useQuery");
    expect(supportPage).not.toContain("trpc.cms.media.listFolder.useQuery");
    expect(supportHub).not.toContain("trpc.cms.media.listFolder.useQuery");
    expect(admin).toContain("permission for public use is recorded");
  });

  it("keeps the owner login instructions explicit without storing a password", () => {
    expect(ownerGuide).toContain("https://www.abhiarafoundation.org/admin");
    expect(ownerGuide).toContain("abhiarafoundation@gmail.com");
    expect(ownerGuide).toContain("cma.abhimanyu@gmail.com");
    expect(ownerGuide).not.toMatch(/password\s*[:=]/i);
  });
});
