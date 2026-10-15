import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  impactCollection,
  impactPublicText,
  isPressProof,
  publishedImpactPhotos,
  type ImpactRecord,
} from "./impactPhotoCollections";
import { rollingImpactVideos } from "./rollingImpactPhotos";

const read = (path: string) => readFileSync(path, "utf8");

const sample: ImpactRecord[] = [
  {
    id: 1,
    title: "Books and dictionary distribution",
    category: "education",
    mediaType: "photo",
    imageUrl: "https://example.org/books.webp",
    isPublished: true,
  },
  {
    id: 2,
    title: "Pratibha Samman press coverage",
    category: "education",
    mediaType: "photo",
    imageUrl: "https://example.org/news.webp",
    isPublished: true,
  },
  {
    id: 3,
    title: "Elder home visit",
    category: "elderly",
    mediaType: "photo",
    imageUrl: "https://example.org/elder.webp",
    isPublished: false,
  },
  {
    id: 4,
    title: "Open Air Learning Session",
    category: "education",
    mediaType: "photo",
    imageUrl: "https://example.org/learning.webp",
    isPublished: true,
  },
  {
    id: 5,
    title: "Video",
    category: "education",
    mediaType: "video",
    imageUrl: "https://example.org/video.mp4",
    isPublished: true,
  },
];

describe("published impact-photo collections", () => {
  it("groups published programmes but keeps press proofs and unpublished media out", () => {
    expect(publishedImpactPhotos(sample).map(photo => photo.id)).toEqual([
      1, 4,
    ]);
    expect(impactCollection(sample[0])).toBe("materials");
    expect(impactCollection(sample[3])).toBe("learning");
    expect(isPressProof(sample[1])).toBe(true);
  });

  it("shows bilingual CMS text and factual legacy labels in the selected language", () => {
    expect(impactPublicText("School bags | ସ୍କୁଲ ବ୍ୟାଗ", "od", "title")).toBe(
      "ସ୍କୁଲ ବ୍ୟାଗ"
    );
    expect(impactPublicText("School bags | ସ୍କୁଲ ବ୍ୟାଗ", "en", "title")).toBe(
      "School bags"
    );
    expect(
      impactPublicText("Books and dictionary distribution", "od", "title")
    ).toBe("ପୁସ୍ତକ ଓ ଅଭିଧାନ ବଣ୍ଟନ");
    expect(impactPublicText("Unknown future event", "od", "title")).toBe(
      "Unknown future event"
    );
  });

  it("only adds approved education or documentary video links, without automatic embeds", () => {
    const videos = [
      {
        id: 1,
        title: "Education",
        category: "education",
        youtubeUrl: "https://www.youtube.com/watch?v=abcdefghijk",
        isPublished: true,
      },
      {
        id: 2,
        title: "Private",
        category: "education",
        youtubeUrl: "https://youtu.be/abcdefghijk",
        isPublished: false,
      },
      {
        id: 3,
        title: "Other",
        category: "other",
        youtubeUrl: "https://youtu.be/abcdefghijk",
        isPublished: true,
      },
      {
        id: 4,
        title: "Unsafe",
        category: "education",
        youtubeUrl: "https://example.org/video",
        isPublished: true,
      },
    ];
    expect(rollingImpactVideos(videos).map(item => item.id)).toEqual([1]);
    expect(read("client/src/components/ImpactRibbon.tsx")).not.toContain(
      "<iframe"
    );
  });

  it("moves rolling media near the main header without duplicating the footer", () => {
    const navbar = read("client/src/components/Navbar.tsx");
    const footer = read("client/src/components/Footer.tsx");
    const ribbon = read("client/src/components/ImpactRibbon.tsx");
    expect(navbar).toContain("<ImpactRibbon compact />");
    expect(navbar).toContain('location !== "/"');
    expect(footer).not.toContain("<ImpactRibbon");
    expect(ribbon).toContain("rollingImpactVideos(publishedVideos)");
    expect(ribbon).toContain("(prefers-reduced-motion: reduce)");
  });

  it("opens complete programme photos with an accessible viewer", () => {
    const gallery = read("client/src/pages/ImpactGallery.tsx");
    const card = read("client/src/components/ProgrammeAlbumCard.tsx");
    const viewer = read("client/src/components/ProgrammeAlbumViewer.tsx");
    expect(gallery).toContain("publishedImpactPhotos(publishedMedia)");
    expect(gallery).toContain("groupProgrammePhotos");
    expect(gallery).toContain("ProgrammeAlbumCard");
    expect(gallery).toContain("ProgrammeAlbumViewer");
    expect(card).toContain('impactPublicText(albumTitle, language, "title")');
    expect(card).toContain("photos.slice(0, 5)");
    expect(card).toContain("object-contain");
    expect(viewer).toContain("DialogContent");
    expect(viewer).toContain("object-contain");
    expect(viewer).toContain("Next album photo");
    expect(viewer).toContain("Previous album photo");
    expect(viewer).toContain("ArrowLeft");
    expect(viewer).not.toContain("autoPlay");
    expect(gallery).toContain('href="/press-and-media"');
  });

  it("keeps two plausible AI illustrations explicitly separate from real impact photos on Donate", () => {
    const donate = read("client/src/pages/Donate.tsx");
    expect(donate).toContain("/illustrations/donate-learning-under-tree.webp");
    expect(donate).toContain("/illustrations/donate-rural-classroom.webp");
    expect(donate).toContain("AI illustrations of learning, not photographs");
    expect(donate).not.toContain("donationEducationPhotos");
  });
});
