import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path, "utf8");

const publicSources = [
  "client/src/data/restoredPublicContent.ts",
  "client/src/data/blogStories.ts",
  "client/src/pages/OurStory.tsx",
  "client/src/pages/Home.tsx",
  "client/src/pages/Vision.tsx",
  "client/src/pages/DigitalLearningAI.tsx",
  "client/src/pages/Volunteer.tsx",
  "client/src/pages/Activities.tsx",
  "client/src/i18n/translations.ts",
]
  .map(read)
  .join("\n");

describe("institutional public voice", () => {
  it("does not present Foundation work as a founder's personal commitment or feeling", () => {
    expect(publicSources).not.toMatch(
      /Founder’s commitment|founder's commitment|founder wants|support he once received|Someone Once Extended a Hand|Someone once extended a hand to me|My journey was|I want to extend|I do not believe|I realised|I realized|What stayed with him|No one moves forward alone|simple belief|personal recognition|emotional experience|What struck us most|We want every visit|We want children/i
    );
  });

  it("uses programme standards, verification and accountability language", () => {
    expect(publicSources).toContain("Foundation programme standard");
    expect(publicSources).toContain("documented need");
    expect(publicSources).toContain("approved programme budget");
    expect(publicSources).toContain("privacy and dignity");
  });
});
