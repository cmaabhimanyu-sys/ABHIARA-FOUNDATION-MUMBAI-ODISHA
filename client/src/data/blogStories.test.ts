import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { BLOG_STORIES, STORY_CATEGORY_LABELS } from "./blogStories";

describe("verified public blog stories", () => {
  const registry = JSON.parse(
    readFileSync("client/public/images/images.json", "utf8")
  ) as { images: Array<{ file?: string; filename?: string }> };
  const registeredImages = new Set(
    registry.images.map(image => image.file ?? image.filename).filter(Boolean)
  );

  it("uses unique slugs and only active verified categories", () => {
    expect(new Set(BLOG_STORIES.map(story => story.slug)).size).toBe(
      BLOG_STORIES.length
    );
    expect(BLOG_STORIES.length).toBe(5);
    for (const story of BLOG_STORIES) {
      expect(STORY_CATEGORY_LABELS[story.category]).toBeDefined();
    }
  });

  it("uses only registered local images and approved internal evidence links", () => {
    for (const story of BLOG_STORIES) {
      expect(story.image.startsWith("/images/")).toBe(true);
      expect(registeredImages.has(story.image.replace("/images/", ""))).toBe(
        true
      );
      expect(
        story.evidenceHref.startsWith("/impact#") ||
          story.evidenceHref === "/our-story"
      ).toBe(true);
    }
  });

  it("contains complete English and Odia public fields", () => {
    for (const story of BLOG_STORIES) {
      expect(story.title.en.length).toBeGreaterThan(10);
      expect(story.title.od.length).toBeGreaterThan(5);
      expect(story.excerpt.en.length).toBeGreaterThan(20);
      expect(story.excerpt.od.length).toBeGreaterThan(10);
      expect(story.paragraphs.length).toBeGreaterThanOrEqual(3);
      expect(story.result.en.length).toBeGreaterThan(5);
      expect(story.result.od.length).toBeGreaterThan(3);
    }
  });

  it("does not publish the unverified suggested topics or old fallback claims", () => {
    const publicCopy = JSON.stringify(BLOG_STORIES).toLowerCase();
    const blockedClaims = [
      "digital learning centre",
      "permanent learning centre",
      "scholarship",
      "health camp",
      "csr success",
      "walked over 3 kilometres",
      "first-generation learners",
      "pension rights",
    ];
    for (const claim of blockedClaims) {
      expect(publicCopy).not.toContain(claim);
    }
  });

  it("keeps the founder story warm, privacy-safe, and consistent with the verified public role", () => {
    const founderStory = BLOG_STORIES.find(
      story => story.category === "founder"
    );
    expect(founderStory?.slug).toBe("someone-once-extended-a-hand");
    expect(founderStory?.authorRole?.en).toBe("Founder and Director");
    const founderCopy = JSON.stringify(founderStory).toLowerCase();
    for (const privateDetail of [
      "earring",
      "pension",
      "2017",
      "bereavement",
      "bathroom",
      "phone number",
    ]) {
      expect(founderCopy).not.toContain(privateDetail);
    }
    expect(founderCopy).not.toContain("managing director");
  });

  it("keeps the retired blog out of the focused sitemap and redirects it to public reports", () => {
    const sitemap = readFileSync("client/public/sitemap.xml", "utf8");
    const app = readFileSync("client/src/App.tsx", "utf8");
    expect(
      sitemap.trimStart().startsWith('<?xml version="1.0" encoding="UTF-8"?>')
    ).toBe(true);
    expect(sitemap.trimEnd().endsWith("</urlset>")).toBe(true);
    expect(sitemap).not.toContain("https://abhiarafoundation.org/");
    expect(sitemap).toContain(
      "https://www.abhiarafoundation.org/monthly-reports</loc>"
    );
    expect(sitemap).not.toContain("/blog</loc>");
    for (const story of BLOG_STORIES) {
      expect(sitemap).not.toContain(`/blog/${story.slug}`);
    }
    expect(app).toMatch(
      /<Route path="\/blog\/:slug">\s*<Redirect to="\/monthly-reports" \/>\s*<\/Route>/
    );
    expect(app).toMatch(
      /<Route path="\/blog">\s*<Redirect to="\/monthly-reports" \/>\s*<\/Route>/
    );
  });
});
