import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  publicPhotoText,
  selectStudentImpactPhoto,
  selectStudentImpactPhotos,
} from "./studentImpactPhoto";

const photos = [
  {
    id: 11,
    category: "education",
    imageUrl: "https://example.org/old.webp",
    mediaType: "photo",
    isPublished: true,
    title: "Earlier education photo",
  },
  {
    id: 20,
    category: "medical",
    imageUrl: "https://example.org/medical.webp",
    mediaType: "photo",
    isPublished: true,
    title: "Different cause",
  },
  {
    id: 21,
    category: "education",
    imageUrl: "https://example.org/draft.webp",
    mediaType: "photo",
    isPublished: false,
    title: "Unpublished photo",
  },
  {
    id: 18,
    category: "education",
    imageUrl: "https://example.org/new.webp",
    mediaType: "photo",
    isPublished: true,
    title: "Newest published education photo",
  },
];

describe("Student Impact public education photo", () => {
  it("uses the newest published education image even when the CMS returns a different sort order", () => {
    expect(selectStudentImpactPhoto(photos)?.id).toBe(18);
    expect(selectStudentImpactPhoto(photos.slice(0, 3))?.id).toBe(11);
    expect(
      selectStudentImpactPhoto(photos.map(p => ({ ...p, isPublished: false })))
    ).toBeUndefined();
  });

  it("does not use a video or an empty image URL", () => {
    expect(
      selectStudentImpactPhoto([
        ...photos,
        { ...photos[0], id: 99, mediaType: "video" },
        { ...photos[0], id: 100, imageUrl: "" },
      ])?.id
    ).toBe(18);
  });

  it("shows a varied set of published education photos without press proofs or duplicate files", () => {
    const entries = [
      ...photos,
      {
        id: 23,
        category: "education",
        imageUrl: "https://example.org/books.webp",
        mediaType: "photo",
        isPublished: true,
        title: "Books and dictionary distribution",
      },
      {
        id: 22,
        category: "education",
        imageUrl: "https://example.org/classroom.webp",
        mediaType: "photo",
        isPublished: true,
        title: "Classroom teaching",
      },
      {
        id: 19,
        category: "education",
        imageUrl: "https://example.org/awards.webp",
        mediaType: "photo",
        isPublished: true,
        title: "Pratibha Samman",
      },
      {
        id: 24,
        category: "education",
        imageUrl: "https://example.org/press.webp",
        mediaType: "photo",
        isPublished: true,
        title: "Newspaper press clipping",
      },
      {
        id: 25,
        category: "education",
        imageUrl: "https://example.org/books.webp",
        mediaType: "photo",
        isPublished: true,
        title: "Duplicate book photo",
      },
      {
        id: 26,
        category: "education",
        imageUrl: "https://example.org/video.mp4",
        mediaType: "video",
        isPublished: true,
        title: "Video",
      },
    ];
    expect(selectStudentImpactPhotos(entries).map(item => item.id)).toEqual([
      25, 22, 19, 18, 11,
    ]);
    expect(selectStudentImpactPhotos(entries, 2)).toHaveLength(2);
    expect(selectStudentImpactPhotos(entries, 0)).toEqual([]);
  });

  it("renders the caption in the selected language without losing text that has no translation", () => {
    const text = "School bags | ସ୍କୁଲ ବ୍ୟାଗ";
    expect(publicPhotoText(text, false)).toBe("School bags");
    expect(publicPhotoText(text, true)).toBe("ସ୍କୁଲ ବ୍ୟାଗ");
    expect(publicPhotoText("School bags", true)).toBe("School bags");
  });

  it("uses the same CMS gallery in Student Impact and Admin, with no hardcoded child image", () => {
    const student = readFileSync("client/src/pages/StudentImpact.tsx", "utf8");
    const admin = readFileSync("client/src/pages/Admin.tsx", "utf8");
    expect(student).toContain("cms.gallery.listPublished.useQuery");
    expect(student).toContain("selectStudentImpactPhotos(gallery)");
    expect(student).toContain("object-contain");
    expect(student).toContain(
      "Photos show activities, not measured learning outcomes."
    );
    expect(student).not.toContain(
      "education-support-materials-fynd-approved.webp"
    );
    expect(admin).toContain("selectStudentImpactPhoto(galleryItems)");
    expect(admin).toContain("studentImpactPhoto?.imageUrl === image.url");
    expect(admin).not.toContain('folder === "beneficiaries" && index === 0');
  });

  it("puts a public photo gallery before programme figures, with only a link to the full process", () => {
    const student = readFileSync("client/src/pages/StudentImpact.tsx", "utf8");
    expect(student.indexOf("{educationPhotos.length > 0 && (")).toBeLessThan(
      student.indexOf("{snapshot && (")
    );
    expect(student).toContain("educationPhotos.map(");
    expect(student).not.toContain('t("Our process", "ଆମ ପ୍ରକ୍ରିୟା")');
    expect(student).toContain('href="/how-we-support-a-child"');
    expect(student).toContain('href="/press-and-media#public-videos"');
    expect(student).toContain("isAbhiaraHostedVideo(video.youtubeUrl)");
    expect(student).toContain("educationVideos.map(");
    expect(student).toContain('preload="none"');
    expect(student).not.toContain("autoPlay");
  });
});
