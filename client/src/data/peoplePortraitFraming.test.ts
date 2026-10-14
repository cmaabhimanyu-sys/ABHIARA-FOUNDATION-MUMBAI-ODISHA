import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  peoplePortraitObjectPosition,
  peoplePortraitTransform,
} from "./peoplePortraitFraming";

const source = readFileSync("client/src/data/peoplePortraitFraming.ts", "utf8");
const currentPhotos = [
  [1, "abhimanyu-mallik-maroon-blazer-800x1000-professional-800x100.webp"],
  [2, "2-people-portrait-800x1000.webp"],
  [3, "3-people-portrait-800x1000.webp"],
  [4, "4-people-portrait-800x1000.webp"],
  [30001, "30001-people-portrait-800x1000.webp"],
  [30002, "30002-people-portrait-800x1000.webp"],
  [30003, "30003-people-portrait-800x1000.webp"],
  [30004, "30004-people-portrait-800x1000.webp"],
  [30005, "30005-people-portrait-800x1000.webp"],
  [30006, "30006-people-portrait-800x1000.webp"],
  [30007, "30007-people-portrait-800x1000.webp"],
  [30011, "30011-people-portrait-800x1000.webp"],
  [60001, "kishore-kumar-parida-people-portrait-800x1000.webp"],
  [90001, "sonalika-das-people-portrait-800x1000.webp"],
  [91001, "subhasis-sahoo-people-portrait-800x1000-professional-800x100.webp"],
  [91002, "ashish-kumar-swain-people-portrait-800x1000-professional-800.webp"],
  [91003, "viky-sangoi-people-portrait-800x1000-professional-800x1000.webp"],
] as const;

describe("every published People portrait", () => {
  it("has a reviewed, source-specific face crop rather than leaving most images unaligned", () => {
    expect(currentPhotos).toHaveLength(17);
    expect(source.match(/fileName:/g) ?? []).toHaveLength(18); // includes the type definition
    for (const [id, filename] of currentPhotos) {
      const entry = source.match(
        new RegExp(`^  ${id}: \\{([\\s\\S]*?)^  \\},`, "m")
      )?.[0];
      expect(entry).toContain(filename);
      const reviewedFilename = entry?.match(/"([^"]+\.webp)"/)?.[1];
      const url = `https://example.org/abhiara-images/leadership/${reviewedFilename}`;
      const member = { id, imageUrl: url };
      expect(peoplePortraitObjectPosition(member)).toMatch(
        /^50% \d+(\.\d+)?%$/
      );
      expect(peoplePortraitTransform(member)).toMatch(
        /^(?:none|translate\(-?\d+(\.\d+)?%, -?\d+(\.\d+)?%\) scale\(\d+(\.\d+)?\))$/
      );
    }
  });

  it("preserves a centered, unzoomed fallback for auditor initials and replacement uploads", () => {
    expect(peoplePortraitTransform({ id: 91004, imageUrl: null })).toBe("none");
    for (const [id] of currentPhotos) {
      expect(
        peoplePortraitTransform({
          id,
          imageUrl: "https://example.org/new-photo.webp",
        })
      ).toBe("none");
      expect(
        peoplePortraitObjectPosition({
          id,
          imageUrl: "https://example.org/new-photo.webp",
        })
      ).toBe("50% 50%");
    }
  });

  it("never translates a zoomed image beyond the circular frame's safe coverage", () => {
    for (const [id] of currentPhotos) {
      const entry = source.match(
        new RegExp(`^  ${id}: \\{([\\s\\S]*?)^  \\},`, "m")
      )?.[0];
      const filename = entry?.match(/"([^"]+\.webp)"/)?.[1];
      const member = { id, imageUrl: `https://example.org/${filename}` };
      const transform = peoplePortraitTransform(member);
      if (transform === "none") continue;
      const [, x, y, zoom] =
        transform.match(
          /^translate\((-?\d+(?:\.\d+)?)%, (-?\d+(?:\.\d+)?)%\) scale\((\d+(?:\.\d+)?)\)$/
        ) ?? [];
      expect(Number.isFinite(Number(zoom))).toBe(true);
      expect(Math.abs(Number(x))).toBeLessThan((Number(zoom) - 1) * 50);
      expect(Math.abs(Number(y))).toBeLessThan((Number(zoom) - 1) * 50);
    }
    // The six portraits in the supplied screenshot must not expose an empty top band.
    const picturedPositions = new Map([
      [30007, "50% 0%"], // Farheen: shift photo pixels, not the circle's image box
      [30006, "50% 17.6%"], // Samiksha
      [30004, "50% 0%"], // Asis
      [30005, "50% 0.88%"], // Prasant
      [30011, "50% 22.77%"], // Gouranga: shift photo pixels, not the image box
      [90001, "50% 33.36%"], // Sonalika
    ]);
    for (const [id, expectedPosition] of picturedPositions) {
      const entry = source.match(
        new RegExp(`^  ${id}: \\{([\\s\\S]*?)^  \\},`, "m")
      )?.[0];
      const filename = entry?.match(/"([^"]+\.webp)"/)?.[1];
      const member = { id, imageUrl: `https://example.org/${filename}` };
      expect(peoplePortraitObjectPosition(member)).toBe(expectedPosition);
    }
  });

  it("puts Sujit and Subhasis in the same face-centered frame as the team", () => {
    expect(
      peoplePortraitTransform({
        id: 4,
        imageUrl: `https://example.org/2026-09-29T13-16-45-686Z-${currentPhotos[3][1]}`,
      })
    ).toBe("translate(10.29%, -12.4%) scale(1.26)");
    expect(
      peoplePortraitTransform({
        id: 91001,
        imageUrl: `https://example.org/2026-10-03T17-43-50-944Z-${currentPhotos[14][1]}`,
      })
    ).toBe("translate(0%, 86.9%) scale(2.75)");
  });
});
