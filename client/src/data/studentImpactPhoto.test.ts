import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  publicPhotoText,
  selectStudentImpactPhoto,
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

  it("renders the caption in the selected language without losing text that has no translation", () => {
    const text = "School bags | ସ୍କୁଲ ବ୍ୟାଗ";
    expect(publicPhotoText(text, false)).toBe("School bags");
    expect(publicPhotoText(text, true)).toBe("ସ୍କୁଲ ବ୍ୟାଗ");
    expect(publicPhotoText("School bags", true)).toBe("School bags");
  });

  it("uses one CMS-backed selector in Student Impact and Admin, with no hardcoded image", () => {
    const student = readFileSync("client/src/pages/StudentImpact.tsx", "utf8");
    const admin = readFileSync("client/src/pages/Admin.tsx", "utf8");
    expect(student).toContain("cms.gallery.listPublished.useQuery");
    expect(student).toContain("selectStudentImpactPhoto(gallery)");
    expect(student).toContain("object-contain");
    expect(student).toContain("does not measure changes in learning");
    expect(student).not.toContain(
      "education-support-materials-fynd-approved.webp"
    );
    expect(admin).toContain("selectStudentImpactPhoto(galleryItems)");
    expect(admin).toContain("studentImpactPhoto?.imageUrl === image.url");
    expect(admin).not.toContain('folder === "beneficiaries" && index === 0');
  });
});
