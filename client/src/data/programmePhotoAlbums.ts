import {
  publishedImpactPhotos,
  type ImpactRecord,
} from "./impactPhotoCollections";

export type ProgrammePhotoAlbum<T extends ImpactRecord = ImpactRecord> = {
  key: string;
  cover: T;
  photos: T[];
};

const normalize = (value?: string | null) =>
  (value || "")
    .split(/\s+\|\s+/)[0]
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

/** Known views of one recognition programme; dates and places must still match before grouping. */
export function programmeAlbumTitle(photo: ImpactRecord): string {
  if (
    photo.category === "education" &&
    [
      "pratibha samman organising team",
      "pratibha samman organizing team",
      "pratibha samman programme",
    ].includes(normalize(photo.title))
  ) {
    return "Pratibha Samman | ପ୍ରତିଭା ସମ୍ମାନ";
  }
  return photo.title;
}

/** Group only a complete matching programme/date/place/category; never infer missing event identity. */
export function programmePhotoKey(photo: ImpactRecord): string {
  const title = normalize(programmeAlbumTitle(photo));
  const date = normalize(photo.dateTaken);
  const place = normalize(photo.location);
  if (!title || !date || !place) return `photo:${photo.id}`;
  return JSON.stringify([normalize(photo.category), title, date, place]);
}

/** Keep all unique approved photos inside their album, in the owner's existing display order. */
export function groupProgrammePhotos<T extends ImpactRecord>(
  items: readonly T[]
): ProgrammePhotoAlbum<T>[] {
  const groups = new Map<string, ProgrammePhotoAlbum<T>>();
  for (const photo of publishedImpactPhotos(items)) {
    const key = programmePhotoKey(photo);
    const album = groups.get(key);
    if (!album) groups.set(key, { key, cover: photo, photos: [photo] });
    else if (
      !album.photos.some(existing => existing.imageUrl === photo.imageUrl)
    )
      album.photos.push(photo);
  }
  return Array.from(groups.values());
}

/** Previews are a presentation limit, not a change to publication or impact totals. */
export function programmePreviewPhotos<T extends ImpactRecord>(
  items: readonly T[],
  perAlbum = 1
): T[] {
  const limit = Math.max(0, Math.min(5, Math.floor(perAlbum)));
  return groupProgrammePhotos(items).flatMap(album =>
    album.photos.slice(0, limit)
  );
}
