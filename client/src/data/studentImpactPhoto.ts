type EducationPhoto = {
  id: number;
  category: string;
  imageUrl: string;
  mediaType?: string | null;
  isPublished: boolean;
};

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
