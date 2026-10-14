import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { impactProgrammeContext } from "./impactProgrammeContext";
import type { ImpactRecord } from "./impactPhotoCollections";
const photo = (fields: Partial<ImpactRecord> = {}): ImpactRecord => ({
  id: 1,
  imageUrl: "https://example.org/published.webp",
  category: "education",
  title: "Children With School Supplies Outdoors",
  ...fields,
});

describe("programme content beside impact photos", () => {
  it("identifies the programme, actual activity, place and date in Odia", () => {
    const context = impactProgrammeContext(
      photo({
        title: "Books and dictionary distribution",
        description:
          "Books and dictionaries were distributed to students in Raisar, Kendrapara on 15 August 2026.",
        location: "Raisar, Kendrapara",
        dateTaken: "15 August 2026",
      }),
      "od"
    );
    expect(context.programme).toBe("ପୁସ୍ତକ ଓ ସ୍କୁଲ ସାମଗ୍ରୀ ବଣ୍ଟନ");
    expect(context.title).toBe("ପୁସ୍ତକ ଓ ଅଭିଧାନ ବଣ୍ଟନ");
    expect(context.description).toContain("ବଣ୍ଟନ କରାଯାଇଥିଲା");
    expect(context.location).toBe("ରାଇସର, କେନ୍ଦ୍ରାପଡ଼ା");
    expect(context.date).toBe("୧୫ ଅଗଷ୍ଟ ୨୦୨୬");
    expect(context.hasActivityDescription).toBe(true);
  });
  it("uses owner-edited bilingual captions without displaying both languages together", () => {
    const item = photo({
      title: "School bags | ସ୍କୁଲ ବ୍ୟାଗ",
      description: "School bags were given. | ସ୍କୁଲ ବ୍ୟାଗ ଦିଆଯାଇଥିଲା।",
      location: "Bhadrak | ଭଦ୍ରକ",
    });
    expect(impactProgrammeContext(item, "en").description).toBe(
      "School bags were given."
    );
    expect(impactProgrammeContext(item, "od").description).toBe(
      "ସ୍କୁଲ ବ୍ୟାଗ ଦିଆଯାଇଥିଲା।"
    );
    expect(impactProgrammeContext(item, "od").location).toBe("ଭଦ୍ରକ");
  });
  it("separates recognition and water service from generic photo titles", () => {
    expect(
      impactProgrammeContext(
        photo({ title: "Pratibha Samman programme" }),
        "en"
      ).href
    ).toBe("/abhiara-pratibha-samman");
    expect(
      impactProgrammeContext(
        photo({
          title: "Pana Sankranti drinking water service",
          category: "community",
        }),
        "od"
      ).programme
    ).toBe("ପଣା ସଂକ୍ରାନ୍ତି ପାନୀୟ ଜଳ ସେବା");
    expect(
      impactProgrammeContext(
        photo({ title: "Books and Learning Materials Outdoors" }),
        "en"
      ).programme
    ).toBe("Books and school materials");
  });
  it("never infers event dates, locations, outcomes or Fynd funding from an image", () => {
    const context = impactProgrammeContext(
      photo({ title: "Education activity" }),
      "en"
    );
    expect(context.hasActivityDescription).toBe(false);
    expect(context.location).toBe("");
    expect(context.date).toBe("");
    expect(context.description).not.toMatch(/Fynd|50|300|audited|CSR/);
  });
  it("replaces old marketing prose with a factual activity caption", () => {
    const context = impactProgrammeContext(
      photo({
        description:
          "Every book donated is a step towards a brighter future. Empowering young minds through education materials.",
      }),
      "en"
    );
    expect(context.description).toBe(
      "Books and learning materials were distributed to children."
    );
  });
  it("targets live canonical routes for every existing cause", () => {
    const app = readFileSync("client/src/App.tsx", "utf8");
    for (const category of [
      "education",
      "elderly",
      "medical",
      "disaster",
      "animals",
      "community",
    ]) {
      const context = impactProgrammeContext(
        photo({ category, title: "Programme activity" }),
        "en"
      );
      expect(app).toContain(`path="${context.href}"`);
    }
  });
  it("renders the same complete context in both large-photo side panels", () => {
    for (const path of [
      "client/src/components/ImpactRibbon.tsx",
      "client/src/pages/Home.tsx",
    ]) {
      const source = readFileSync(path, "utf8");
      expect(source).toContain("impactProgrammeContext");
      for (const field of [
        "programme",
        "title",
        "description",
        "location",
        "date",
        "href",
      ])
        expect(source).toContain(`context.${field}`);
      expect(source).toContain("About this programme");
      expect(source).toContain("object-contain");
      expect(source).not.toContain('photo.description && language !== "od"');
    }
  });
});
