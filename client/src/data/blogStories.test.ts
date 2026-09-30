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
    expect(BLOG_STORIES.length).toBe(6);
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
        [
          "/our-story",
          "/partners-and-supporters",
          "/abhiara-pratibha-samman",
          "/disaster-relief",
          "/impact-gallery",
          "/elder-care-and-dignity",
        ].includes(story.evidenceHref)
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

  it("keeps the founder history factual, privacy-safe and institution-led", () => {
    const founderStory = BLOG_STORIES.find(
      story => story.category === "founder"
    );
    expect(founderStory?.slug).toBe("someone-once-extended-a-hand");
    expect(founderStory?.author?.en).toBe("Abhiara Foundation");
    expect(founderStory?.authorRole?.en).toBe("Public information");
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
    expect(founderCopy).not.toMatch(
      /someone once extended|my journey|i want|i believe|i realised|i realized|i saw|personal recognition|our aim|we want/
    );
    expect(founderCopy).toContain("documented need");
    expect(founderCopy).toContain("approved programme budget");
  });

  it("records Fynd Foundation only as an institutional education supporter", () => {
    const story = BLOG_STORIES.find(
      item => item.slug === "fynd-foundation-supports-education-programme"
    );
    expect(story?.category).toBe("supporters");
    expect(story?.image).toBe("/images/csr-fynd-foundation-mumbai.png");
    expect(story?.evidenceHref).toBe("/partners-and-supporters");
    const publicCopy = JSON.stringify(story).toLowerCase();
    expect(publicCopy).toContain("institutional support");
    expect(publicCopy).toContain("education programme in odisha");
    expect(publicCopy).toContain("not represent it as csr expenditure");
    expect(publicCopy).not.toContain("csr partner");
    expect(publicCopy).not.toContain("csr success");
    expect(publicCopy).not.toMatch(/₹|amount|donor data|child name:/);
  });

  it("publishes the restored Blog and every factual story on the official domain", () => {
    const sitemap = readFileSync("client/public/sitemap.xml", "utf8");
    const app = readFileSync("client/src/App.tsx", "utf8");
    const blog = readFileSync("client/src/pages/Blog.tsx", "utf8");
    const article = readFileSync("client/src/pages/BlogArticle.tsx", "utf8");
    expect(
      sitemap.trimStart().startsWith('<?xml version="1.0" encoding="UTF-8"?>')
    ).toBe(true);
    expect(sitemap.trimEnd().endsWith("</urlset>")).toBe(true);
    expect(sitemap).not.toContain("https://abhiarafoundation.org/");
    expect(sitemap).toContain(
      "https://www.abhiarafoundation.org/monthly-reports</loc>"
    );
    expect(sitemap).toContain("https://www.abhiarafoundation.org/blog</loc>");
    for (const story of BLOG_STORIES) {
      expect(sitemap).toContain(
        `https://www.abhiarafoundation.org/blog/${story.slug}</loc>`
      );
    }
    expect(app).toContain('const Blog = lazy(() => import("./pages/Blog"))');
    expect(app).toContain(
      'const BlogArticle = lazy(() => import("./pages/BlogArticle"))'
    );
    expect(app).toContain('<Route path="/blog" component={Blog} />');
    expect(app).toContain(
      '<Route path="/blog/:slug" component={BlogArticle} />'
    );
    expect(app).not.toMatch(/path="\/blog[^\n]*Redirect/);
    expect(`${blog}\n${article}`).toContain(
      "https://www.abhiarafoundation.org/blog"
    );
    expect(`${blog}\n${article}`).not.toContain("abhiarafoundation.com");
  });
});
