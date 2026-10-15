import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  MUSTAFAPUR_ACTIVITY_ID,
  activityPublicText,
  mustafapurActivity,
  type PublicActivityStory,
} from "./mustafapurActivity";

const record: PublicActivityStory = {
  id: MUSTAFAPUR_ACTIVITY_ID,
  title: "Owner title | ମାଲିକଙ୍କ ଶୀର୍ଷକ",
  description: "Owner description | ମାଲିକଙ୍କ ବିବରଣୀ",
  date: "August 2026 | ଅଗଷ୍ଟ ୨୦୨୬",
  location: "Mustafapur | ମୁସ୍ତାଫାପୁର",
  category: "community",
  isPublished: true,
};

describe("Mustafapur flood-relief programme story", () => {
  it("uses the one published CMS record and follows owner edits", () => {
    expect(mustafapurActivity([record])).toEqual(record);
    expect(
      mustafapurActivity([{ ...record, title: "Updated owner title" }])?.title
    ).toBe("Updated owner title");
    expect(
      mustafapurActivity([{ ...record, isPublished: false }])
    ).toBeUndefined();
    expect(mustafapurActivity([{ ...record, id: 2 }])).toBeUndefined();
    expect(
      mustafapurActivity([{ ...record, category: "education" }])
    ).toBeUndefined();
  });
  it("renders only the selected language", () => {
    expect(activityPublicText(record.date, "en")).toBe("August 2026");
    expect(activityPublicText(record.date, "od")).toBe("ଅଗଷ୍ଟ ୨୦୨୬");
    expect(activityPublicText(record.location, "od")).toBe("ମୁସ୍ତାଫାପୁର");
    expect(activityPublicText(null, "en")).toBe("");
  });
  it("records the owner-confirmed approximate scope without a fabricated day, CSR claim or public image", () => {
    const sql = readFileSync(
      "drizzle/0027_mustafapur_food_support.sql",
      "utf8"
    );
    for (const text of [
      "August 2026",
      "Mustafapur Panchayat, Dhamnagar, Bhadrak, Odisha",
      "around 100 people",
      "one flood-affected village",
      "snacks and food",
      "ପ୍ରାୟ ୧୦୦",
      "ଜଳଖିଆ ଓ ଖାଦ୍ୟ",
      "WHERE NOT EXISTS",
    ])
      expect(sql).toContain(text);
    expect(sql).toContain("'community', NULL");
    expect(sql).not.toMatch(/Fynd|CSR|audited|[0-9]{2} August|https?:\/\//);
  });
  it("shows a compact homepage entry and full disaster story without uploading photos through rendering", () => {
    const story = readFileSync(
      "client/src/components/MustafapurImpactStory.tsx",
      "utf8"
    );
    const home = readFileSync("client/src/pages/Home.tsx", "utf8");
    const page = readFileSync("client/src/pages/SupportAreaPage.tsx", "utf8");
    const card = readFileSync(
      "client/src/components/ProgrammeAlbumCard.tsx",
      "utf8"
    );
    expect(story).toContain("trpc.cms.activities.listPublished.useQuery");
    expect(story).toContain("if (!story) return null");
    expect(story).toContain("activityPublicText");
    expect(home).toContain("<MustafapurImpactStory compact />");
    expect(page).toContain('area === "disaster" && <MustafapurImpactStory />');
    expect(page).toContain("ProgrammeAlbumCard");
    expect(card).toContain("object-contain");
    expect(story).not.toContain("<img");
    expect(story).not.toContain(".reduce(");
  });
});
