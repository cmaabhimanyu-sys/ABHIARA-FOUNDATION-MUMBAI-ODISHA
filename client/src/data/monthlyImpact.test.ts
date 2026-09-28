import { describe, expect, it } from "vitest";
import {
  collectReportMedia,
  INSTAGRAM_UPDATES,
  MONTHLY_IMPACT_REPORTS,
  resolveRegistryVideoSrc,
  type ImageRegistry,
} from "./monthlyImpact";

describe("monthly impact public data", () => {
  it("keeps reports unique and ordered from newest to oldest", () => {
    const ids = MONTHLY_IMPACT_REPORTS.map(report => report.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(["august-2026-education", "august-2026", "june-2026", "april-2026", "october-2025"]);
  });

  it("requires every report to have bilingual copy and media categories", () => {
    for (const report of MONTHLY_IMPACT_REPORTS) {
      expect(report.period.en).toBeTruthy();
      expect(report.period.od).toBeTruthy();
      expect(report.title.en).toBeTruthy();
      expect(report.title.od).toBeTruthy();
      expect(report.summary.en).toBeTruthy();
      expect(report.summary.od).toBeTruthy();
      expect(report.imageCategories.length + report.videoCategories.length).toBeGreaterThan(0);
    }
  });

  it("uses only the approved public Instagram Reel", () => {
    expect(INSTAGRAM_UPDATES).toHaveLength(1);
    expect(INSTAGRAM_UPDATES[0]?.url).toBe("https://www.instagram.com/reel/Dc6oZSqN1_6/");
    expect(INSTAGRAM_UPDATES[0]?.embedUrl).toBe("https://www.instagram.com/reel/Dc6oZSqN1_6/embed/");
  });

  it("keeps the Independence Day education record factual and does not invent a student total", () => {
    const report = MONTHLY_IMPACT_REPORTS.find(item => item.id === "august-2026-education");
    expect(report).toBeDefined();
    expect(report?.period.en).toBe("15 August 2026");
    expect(report?.summary.en).toContain("School books and dictionaries");
    expect(report?.locations.en).toBe("Raisar, Kendrapara district, Odisha");
    expect(report?.imageCategories).toEqual(["independence-day-books"]);
    expect(report?.notes.some(note => note.en.includes("No student count"))).toBe(true);
  });

  it("makes Manus-hosted videos playable from external deployments", () => {
    expect(resolveRegistryVideoSrc("/manus-storage/example.mp4")).toBe(
      "https://abhiara-ngo-hv6lgfne.manus.space/manus-storage/example.mp4",
    );
    expect(resolveRegistryVideoSrc("https://cdn.example.org/video.mp4")).toBe(
      "https://cdn.example.org/video.mp4",
    );
  });

  it("collects every registered photo and video for a report category", () => {
    const registry: ImageRegistry = {
      images: [
        { file: "one.jpg", category: "fire-relief", alt: "One" },
        { filename: "two.jpg", category: "fire-relief", alt: "Two" },
        { file: "skip.jpg", category: "brand", alt: "Skip" },
      ],
      videos: [
        { url: "/manus-storage/one.mp4", category: "fire-relief", alt: "Video" },
      ],
    };
    const report = MONTHLY_IMPACT_REPORTS.find(item => item.id === "june-2026");
    expect(report).toBeDefined();
    const media = collectReportMedia(registry, report!);
    expect(media.map(item => item.src)).toEqual([
      "/images/one.jpg",
      "/images/two.jpg",
      "https://abhiara-ngo-hv6lgfne.manus.space/manus-storage/one.mp4",
    ]);
  });
});
