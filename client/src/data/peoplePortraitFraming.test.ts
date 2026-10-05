import { describe, expect, it } from "vitest";
import { peoplePortraitFraming } from "./peoplePortraitFraming";

describe("public People portrait framing", () => {
  it("centers ordinary published portraits and unpublished photo replacements", () => {
    expect(
      peoplePortraitFraming({
        id: 2,
        imageUrl: "https://example.org/biswajita.webp",
      })
    ).toBe("object-center");
    expect(peoplePortraitFraming({ id: 91004, imageUrl: null })).toBe(
      "object-center"
    );
    expect(
      peoplePortraitFraming({
        id: 4,
        imageUrl: "https://example.org/new-sujit.webp",
      })
    ).toBe("object-center");
    expect(
      peoplePortraitFraming({
        id: 91001,
        imageUrl: "https://example.org/new-subhasis.webp",
      })
    ).toBe("object-center");
    expect(
      peoplePortraitFraming({
        id: 1,
        imageUrl: "https://example.org/new-founder.webp",
      })
    ).toBe("object-center");
  });

  it("moves the low Sujit face to the middle of its circle without cropping the head", () => {
    expect(
      peoplePortraitFraming({
        id: 4,
        imageUrl: "https://cdn.example.org/4-people-portrait-800x1000.webp",
      })
    ).toBe("scale-[1.4] object-bottom origin-center");
  });

  it("shows Subhasis's face rather than a full-length body inside the circle", () => {
    expect(
      peoplePortraitFraming({
        id: 91001,
        imageUrl:
          "https://cdn.example.org/subhasis-sahoo-people-portrait-800x1000-professional-800x100.webp",
      })
    ).toBe("scale-[2.2] object-top origin-top");
  });

  it("preserves the reviewed founder framing only for his current portrait", () => {
    expect(
      peoplePortraitFraming({
        id: 1,
        imageUrl:
          "https://cdn.example.org/abhimanyu-mallik-maroon-blazer-800x1000.webp",
      })
    ).toBe("scale-[2] object-[center_25%] origin-[50%_25%]");
  });
});
