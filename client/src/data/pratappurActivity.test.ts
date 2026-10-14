import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { pratappurActivity, PRATAPPUR_ACTIVITY_ID } from "./pratappurActivity";
import { mustafapurActivity, activityPublicText } from "./mustafapurActivity";

const story = {
  id: PRATAPPUR_ACTIVITY_ID,
  title: "Food relief | ଖାଦ୍ୟ ସହାୟତା",
  description: "Food packets and snacks | ଖାଦ୍ୟ ପ୍ୟାକେଟ ଓ ଜଳଖିଆ",
  date: "August 2026 | ଅଗଷ୍ଟ ୨୦୨୬",
  location: "Pratappur, Bari, Jajpur, Odisha | ପ୍ରତାପପୁର, ବରୀ, ଯାଜପୁର, ଓଡ଼ିଶା",
  category: "community",
  isPublished: true,
};
describe("Pratappur separate August programme", () => {
  it("selects only the owner-published event and remains separate from Mustafapur", () => {
    expect(pratappurActivity([story])).toEqual(story);
    expect(mustafapurActivity([story])).toBeUndefined();
    expect(pratappurActivity([{ ...story, id: 93001 }])).toBeUndefined();
    expect(
      pratappurActivity([{ ...story, isPublished: false }])
    ).toBeUndefined();
    expect(
      pratappurActivity([{ ...story, category: "education" }])
    ).toBeUndefined();
    expect(pratappurActivity([{ ...story, title: "Owner edit" }])?.title).toBe(
      "Owner edit"
    );
  });
  it("localizes month and broad place without deriving a day from filenames", () => {
    expect(activityPublicText(story.date, "od")).toBe("ଅଗଷ୍ଟ ୨୦୨୬");
    expect(activityPublicText(story.location, "en")).toBe(
      "Pratappur, Bari, Jajpur, Odisha"
    );
  });
  it("records approximate village reach with no invented headcount, funding or image", () => {
    const sql = readFileSync("drizzle/0028_pratappur_food_relief.sql", "utf8");
    expect(sql).toContain("SELECT 93002");
    expect(sql).toContain("nearly six villages");
    expect(sql).toContain("food packets and snacks");
    expect(sql).toContain("ପ୍ରାୟ ୬ଟି ଗାଁ");
    expect(sql).toContain("'community', NULL");
    expect(sql).toContain("WHERE NOT EXISTS");
    expect(sql).not.toMatch(/100|Fynd|CSR|audited|[0-9]{2} August|https?:\/\//);
  });
  it("shows full and compact CMS stories without image auto-publication", () => {
    const component = readFileSync(
      "client/src/components/PratappurImpactStory.tsx",
      "utf8"
    );
    expect(component).toContain("trpc.cms.activities.listPublished.useQuery");
    expect(component).toContain("if (!story) return null");
    expect(component).not.toContain("<img");
    expect(readFileSync("client/src/pages/Home.tsx", "utf8")).toContain(
      "<PratappurImpactStory compact />"
    );
    expect(
      readFileSync("client/src/pages/SupportAreaPage.tsx", "utf8")
    ).toContain('area === "disaster" && <PratappurImpactStory />');
  });
});
