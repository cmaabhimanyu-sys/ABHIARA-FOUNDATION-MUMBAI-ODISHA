type EducationPhoto = {
  id: number;
  category: string;
  imageUrl: string;
  mediaType?: string | null;
  isPublished: boolean;
};

/** Feature the latest published education photo, then show a varied set of reviewed programme photos. */
export function selectStudentImpactPhotos<
  T extends EducationPhoto & { title: string },
>(photos: readonly T[], limit = 7): T[] {
  if (limit < 1) return [];
  const eligible = photos
    .filter(
      photo =>
        photo.isPublished &&
        photo.category === "education" &&
        Boolean(photo.imageUrl) &&
        (!photo.mediaType || photo.mediaType === "photo") &&
        !/press coverage|newspaper|press clipping|certificate/i.test(
          photo.title
        )
    )
    .sort((a, b) => b.id - a.id);
  const used = new Set<string>();
  const unique = eligible.filter(photo => {
    if (used.has(photo.imageUrl)) return false;
    used.add(photo.imageUrl);
    return true;
  });
  if (!unique.length) return [];
  const result = [unique[0]];
  const chosen = new Set([unique[0].id]);
  const groups = [
    /book|dictionary|school supplies|material/i,
    /classroom|learning|teaching|open air|outdoor/i,
    /pratibha samman|recognition/i,
  ];
  for (const group of groups) {
    const photo = unique.find(
      item => !chosen.has(item.id) && group.test(item.title)
    );
    if (photo && result.length < limit) {
      result.push(photo);
      chosen.add(photo.id);
    }
  }
  for (const photo of unique) {
    if (result.length >= limit) break;
    if (!chosen.has(photo.id)) {
      result.push(photo);
      chosen.add(photo.id);
    }
  }
  return result;
}

/** Select the most recently added, published education photo for Student Impact. */
export function selectStudentImpactPhoto<T extends EducationPhoto>(
  photos: readonly T[]
): T | undefined {
  return photos
    .filter(
      photo =>
        photo.isPublished &&
        photo.category === "education" &&
        photo.imageUrl &&
        (!photo.mediaType || photo.mediaType === "photo")
    )
    .reduce<
      T | undefined
    >((latest, photo) => (!latest || photo.id > latest.id ? photo : latest), undefined);
}

/** Gallery captions may contain an English and Odia half separated by a pipe. */
export function publicPhotoText(
  value: string | null | undefined,
  odia: boolean
): string {
  const text = value?.trim() || "";
  const separator = " | ";
  if (!text.includes(separator)) return text;
  const [english, ...odiaParts] = text.split(separator);
  const translated = odiaParts.join(separator).trim();
  return odia ? translated || english.trim() : english.trim();
}
