import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { rollingImpactPhotos } from "./rollingImpactPhotos";

const read = (path: string) => readFileSync(path, "utf8");
const ribbon = read("client/src/components/ImpactRibbon.tsx");
const footer = read("client/src/components/Footer.tsx");
const navbar = read("client/src/components/Navbar.tsx");
const home = read("client/src/pages/Home.tsx");
const admin = read("client/src/pages/Admin.tsx");

describe("site-wide rolling impact photographs", () => {
  it("uses only publicly published photographs, excluding videos and documents", () => {
    const photos = [
      {
        id: 1,
        title: "Learning materials",
        category: "education",
        imageUrl: "https://example.org/a.webp",
        mediaType: "photo",
        isPublished: true,
      },
      {
        id: 2,
        title: "Old age home visit",
        category: "elderly",
        imageUrl: "https://example.org/b.webp",
        mediaType: "photo",
        isPublished: true,
      },
      {
        id: 3,
        title: "Pratibha Samman press coverage",
        category: "education",
        imageUrl: "https://example.org/c.webp",
        mediaType: "photo",
        isPublished: true,
      },
      {
        id: 4,
        title: "A video",
        category: "community",
        imageUrl: "https://example.org/d.mp4",
        mediaType: "video",
        isPublished: true,
      },
      {
        id: 5,
        title: "Private photo",
        category: "community",
        imageUrl: "https://example.org/e.webp",
        mediaType: "photo",
        isPublished: false,
      },
      {
        id: 6,
        title: "Missing file",
        category: "education",
        imageUrl: "",
        mediaType: "photo",
        isPublished: true,
      },
    ];
    expect(rollingImpactPhotos(photos).map(photo => photo.id)).toEqual([1, 2]);
  });

  it("appears near the top of public pages instead of before the footer and does not repeat Home's impact carousel", () => {
    expect(navbar).toContain("<ImpactRibbon compact />");
    expect(navbar).toContain('location !== "/"');
    expect(footer).not.toContain("<ImpactRibbon");
    expect(home).toContain("trpc.cms.gallery.listPublished.useQuery");
    expect(home).toContain("setActiveImpactIndex");
    expect(admin).not.toContain("<Footer");
  });

  it("is bilingual, full-frame, keyboard controllable and respectful of reduced motion", () => {
    expect(ribbon).toContain("trpc.cms.gallery.listPublished.useQuery");
    expect(ribbon).toContain("trpc.cms.youtube.listPublished.useQuery");
    expect(ribbon).toContain("object-contain");
    expect(ribbon).toContain("md:grid-cols-[minmax(0,3fr)_minmax(220px,1fr)]");
    expect(ribbon).toContain("md:h-[470px]");
    expect(ribbon).toContain("md:h-[560px]");
    expect(ribbon).not.toContain("md:h-[195px]");
    expect(ribbon).toContain("const slide = photos[activeIndex] ?? photos[0]");
    expect(ribbon).toContain('href="/press-and-media#public-videos"');
    expect(ribbon).toContain("videos.length > 0");
    expect(ribbon).not.toContain('type: "video" as const');
    expect(ribbon).toContain('aria-roledescription="carousel"');
    expect(ribbon).toContain("(prefers-reduced-motion: reduce)");
    expect(ribbon).toContain("document.hidden");
    expect(ribbon).toContain("IntersectionObserver");
    expect(ribbon).toContain('loading="eager"');
    expect(ribbon).toContain('fetchPriority="low"');
    expect(ribbon).toContain("onFocusCapture");
    expect(ribbon).toContain('href="/impact-gallery"');
    expect(ribbon).toContain("ଫଟୋରେ ଆମ କାମ");
    expect(ribbon).toContain("ଫଟୋ ଚଳାନ୍ତୁ");
    expect(ribbon).not.toMatch(
      /Aadhaar number|bank passbook image|child identity/i
    );
  });
});
