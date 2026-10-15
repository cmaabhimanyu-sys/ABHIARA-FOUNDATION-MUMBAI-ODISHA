import { describe, expect, it } from "vitest";
import {
  groupProgrammePhotos,
  programmePhotoKey,
  programmePreviewPhotos,
} from "./programmePhotoAlbums";
import { rollingImpactPhotos } from "./rollingImpactPhotos";
import { selectStudentImpactPhotos } from "./studentImpactPhoto";
import { type ImpactRecord } from "./impactPhotoCollections";
const photo = (id: number, changes: Partial<ImpactRecord> = {}) => ({
  id,
  title: "Books and dictionary distribution",
  category: "education",
  imageUrl: `https://example.invalid/${id}.webp`,
  dateTaken: "15 August 2026",
  location: "Raisar, Kendrapara",
  mediaType: "photo",
  isPublished: true,
  ...changes,
});

describe("programme album presentation", () => {
  it("keeps all 18 event photographs in one album with up to five programme previews", () => {
    const records = Array.from({ length: 18 }, (_, i) => photo(i + 1));
    const albums = groupProgrammePhotos(records);
    expect(albums).toHaveLength(1);
    expect(albums[0].photos).toHaveLength(18);
    expect(programmePreviewPhotos(records).map(p => p.id)).toEqual([1]);
    expect(programmePreviewPhotos(records, 2).map(p => p.id)).toEqual([1, 2]);
    expect(programmePreviewPhotos(records, 5).map(p => p.id)).toEqual([
      1, 2, 3, 4, 5,
    ]);
    expect(programmePreviewPhotos(records, 20)).toHaveLength(5);
    expect(programmePreviewPhotos(records.slice(0, 2), 5)).toHaveLength(2);
    expect(programmePreviewPhotos(records, 0)).toEqual([]);
    expect(programmePreviewPhotos(records, -1)).toEqual([]);
    expect(records).toHaveLength(18);
  });
  it("never joins different titles, causes, dates or places into one event", () => {
    const original = photo(1);
    const variants = [
      photo(2, { title: "Different event" }),
      photo(3, { category: "disaster" }),
      photo(4, { dateTaken: "16 August 2026" }),
      photo(5, { location: "Another district" }),
    ];
    expect(groupProgrammePhotos([original, ...variants])).toHaveLength(5);
  });
  it("groups the two known recognition views only when their date, place and cause match", () => {
    const team = photo(1, {
      title: "Pratibha Samman organising team",
      dateTaken: "4 June 2026",
      location: "Raisar, Garadpur, Kendrapara",
    });
    const group = {
      ...team,
      id: 2,
      imageUrl: "https://example.invalid/group.webp",
      title: "Pratibha Samman programme",
    };
    expect(groupProgrammePhotos([team, group])[0].photos).toHaveLength(2);
    expect(
      groupProgrammePhotos([team, { ...group, dateTaken: "5 June 2026" }])
    ).toHaveLength(2);
    expect(
      groupProgrammePhotos([team, { ...group, location: "Another place" }])
    ).toHaveLength(2);
    expect(
      groupProgrammePhotos([team, { ...group, category: "community" }])
    ).toHaveLength(2);
  });
  it("does not infer event identity when any required field is absent", () => {
    for (const field of ["title", "dateTaken", "location"] as const) {
      expect(
        groupProgrammePhotos([
          photo(1, { [field]: "" }),
          photo(2, { [field]: "" }),
        ])
      ).toHaveLength(2);
    }
  });
  it("groups bilingual common metadata independently of viewing language and normalizes whitespace", () => {
    const en = photo(1);
    const bilingual = photo(2, {
      title: " Books and dictionary distribution | ପୁସ୍ତକ ଓ ଅଭିଧାନ ବଣ୍ଟନ",
      dateTaken: "15 August 2026 | ୧୫ ଅଗଷ୍ଟ ୨୦୨୬",
      location: "Raisar, Kendrapara | ରାଇସର, କେନ୍ଦ୍ରାପଡ଼ା",
    });
    expect(programmePhotoKey(en)).toBe(programmePhotoKey(bilingual));
    expect(groupProgrammePhotos([en, bilingual])).toHaveLength(1);
  });
  it("excludes drafts, press records, videos and empty files; deduplicates an album file URL", () => {
    const one = photo(1);
    expect(
      groupProgrammePhotos([
        one,
        photo(2, { imageUrl: one.imageUrl }),
        photo(3, { isPublished: false }),
        photo(4, { title: "Newspaper press clipping" }),
        photo(5, { mediaType: "video" }),
        photo(6, { imageUrl: "" }),
      ])[0].photos
    ).toEqual([one]);
  });
  it("preserves owner order and a featured member can become the album cover", () => {
    const entries = [photo(9), photo(2), photo(1)];
    expect(groupProgrammePhotos(entries)[0].photos.map(p => p.id)).toEqual([
      9, 2, 1,
    ]);
    expect(
      groupProgrammePhotos([entries[1], entries[0], entries[2]])[0].cover.id
    ).toBe(2);
  });
  it("keeps the ten Mustafapur photos as one separate album without multiplying people counts", () => {
    const entries = Array.from({ length: 10 }, (_, i) =>
      photo(i + 100, {
        category: "disaster",
        title: "Food support in Mustafapur | ମୁସ୍ତାଫାପୁରରେ ଖାଦ୍ୟ ସହାୟତା",
        location: "Mustafapur Panchayat, Dhamnagar, Bhadrak, Odisha",
        dateTaken: "August 2026",
      })
    );
    const result = groupProgrammePhotos([...entries, photo(1)]);
    expect(result.map(a => a.photos.length)).toEqual([10, 1]);
    expect(Object.keys(result[0])).toEqual(["key", "cover", "photos"]);
  });
  it("shows one ribbon slide per event and at most two from an event in Student Impact", () => {
    const entries = Array.from({ length: 18 }, (_, i) => photo(i + 1));
    expect(rollingImpactPhotos(entries).map(p => p.id)).toEqual([1]);
    expect(selectStudentImpactPhotos(entries).map(p => p.id)).toEqual([18, 17]);
    expect(groupProgrammePhotos(entries)[0].photos).toHaveLength(18);
  });
});
