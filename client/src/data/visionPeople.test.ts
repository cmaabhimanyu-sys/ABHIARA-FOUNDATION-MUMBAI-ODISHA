import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const visionPage = readFileSync(
  new URL("../pages/Vision.tsx", import.meta.url),
  "utf8"
);

const teamPage = readFileSync(
  new URL("../pages/Team.tsx", import.meta.url),
  "utf8"
);

const registryPath = new URL(
  "../../public/images/images.json",
  import.meta.url
);
const imageRoot = new URL("../../public/images/", import.meta.url);
const registry = JSON.parse(readFileSync(registryPath, "utf8")) as {
  images: Array<{ file?: string; filename?: string }>;
};

const visionImages = Array.from(
  visionPage.matchAll(/(?:src:|image:)\s*"\/images\/([^"]+)"/g),
  match => match[1]
);

const registeredFiles = new Set(
  registry.images.map(item => item.file ?? item.filename).filter(Boolean)
);

describe("vision, mission, values and people page", () => {
  it("uses a clear bilingual vision, mission, values and people structure", () => {
    expect(visionPage).toContain("useLanguage");
    expect(visionPage).toContain("Our Vision");
    expect(visionPage).toContain("Our Mission");
    expect(visionPage).toContain("Our Values");
    expect(visionPage).toContain("Our People");
    expect(visionPage).toContain("ଆମ ଦୃଷ୍ଟି");
    expect(visionPage).toContain("ଆମ ଲକ୍ଷ୍ୟ");
    expect(visionPage).toContain("ଆମ ମୂଲ୍ୟବୋଧ");
    expect(visionPage).toContain("ଆମ ଲୋକମାନେ");
  });

  it("keeps the people section aligned with the verified public hierarchy", () => {
    expect(visionPage).toContain("2 confirmed directors");
    expect(visionPage).toContain("4 confirmed advisors");
    expect(visionPage).toContain("5 core and field members");
    expect(visionPage).toContain("/board-and-transparency#board");
    expect(visionPage).toContain("/board-and-transparency#advisors");
    expect(visionPage).toContain("/team#ground-team");
    expect(visionPage).toContain("trpc.cms.leadership.listPublished.useQuery");
    expect(visionPage).toContain("publishedBoardCount");
    expect(visionPage).toContain("publishedAdvisorCount");
    expect(teamPage).toContain("Board of Directors");
    expect(teamPage).toContain("Advisory Support");
    expect(teamPage).toContain("Programme and Field Team");
    expect(visionPage).toContain("team-amit-kumar-jena.jpeg");
  });

  it("removes unsupported future targets and fixed institutional promises", () => {
    const unsupportedClaims = [
      "10,000+",
      "1,000+",
      "₹5 Cr+",
      "CBSE affiliation secured",
      "national NGO",
      "built within 5 years",
      "Vidyapeeth Opens",
    ];

    for (const claim of unsupportedClaims) {
      expect(visionPage).not.toContain(claim);
    }
  });

  it("uses only registered local images and keeps every photograph full frame", () => {
    expect(visionImages.length).toBeGreaterThanOrEqual(8);

    for (const file of visionImages) {
      expect(registeredFiles.has(file)).toBe(true);
      expect(existsSync(new URL(file, imageRoot))).toBe(true);
    }

    expect(visionPage).toContain("object-contain");
    expect(visionPage).not.toContain("object-cover");
    expect(visionPage).not.toMatch(
      /https?:\/\/[^\s"']+\.(?:jpg|jpeg|png|webp)/i
    );
  });

  it("uses the approved primary domain and does not depend on unrestricted CMS text", () => {
    expect(visionPage).toContain(
      'url="https://www.abhiarafoundation.com/vision"'
    );
    expect(visionPage).not.toContain("trpc.cms.settings");
    expect(visionPage).not.toContain("vision_impact_targets");
    expect(visionPage).not.toContain("vision_timeline");
  });
});
