export const ALBUM_DESTINATIONS = [
  { folder: "programmes", category: "education", label: "Education" },
  { folder: "disaster-relief", category: "disaster", label: "Disaster relief" },
  { folder: "elder-support", category: "elderly", label: "Elder support" },
  { folder: "medical-support", category: "medical", label: "Medical support" },
  { folder: "animal-welfare", category: "animals", label: "Animal welfare" },
] as const;
export type AlbumFile = { name: string; size: number; type: string };
export type AlbumResult = { url?: string; done?: boolean; error?: string };
export type AlbumDetails = {
  title: string;
  description: string;
  category: (typeof ALBUM_DESTINATIONS)[number]["category"];
  location: string;
  dateTaken: string;
  isPublished: boolean;
};

export function validateAlbumFiles(files: readonly AlbumFile[]): string | null {
  if (!files.length || files.length > 20)
    return "Choose between 1 and 20 photos.";
  if (new Set(files.map(file => file.name)).size !== files.length)
    return "Each selected file must have a different filename.";
  if (
    files.some(
      file =>
        !file.size ||
        file.size >= 1024 * 1024 ||
        file.name.length > 120 ||
        !["image/jpeg", "image/png", "image/webp"].includes(file.type)
    )
  )
    return "Choose JPEG, PNG or WebP files, each smaller than 1 MB with a filename under 120 characters.";
  return null;
}
export function validateAlbumDetails(
  details: AlbumDetails,
  consent: boolean
): string | null {
  if (!consent)
    return "Confirm recorded permissions and safeguarding review for every photo.";
  if (
    details.title.trim().length < 5 ||
    details.title.length > 120 ||
    details.description.trim().length < 8 ||
    details.description.length > 500 ||
    !details.location.trim() ||
    details.location.length > 160 ||
    !details.dateTaken.trim()
  )
    return "Complete the title, caption, date and broad location within the displayed limits.";
  if (
    /^(education|community|elder|elderly|medical|disaster|animal|programme|program)\s+(activity|photo|work)$/i.test(
      details.title.trim()
    )
  )
    return "Use a specific programme title rather than a generic photo label.";
  return null;
}

/** One Blob upload and one CMS record per photo; never creates activity or reach records. */
export async function runSequentialAlbum<T extends AlbumFile>(options: {
  files: readonly T[];
  results: Record<string, AlbumResult>;
  details: AlbumDetails;
  upload: (file: T) => Promise<string>;
  create: (
    details: AlbumDetails & { imageUrl: string; mediaType: "photo" }
  ) => Promise<unknown>;
  existingUrls: ReadonlySet<string>;
  progress: (name: string, result: AlbumResult) => void;
}): Promise<string | undefined> {
  for (const file of options.files) {
    const previous = options.results[file.name];
    if (previous?.done) continue;
    let url = previous?.url;
    try {
      if (!url) {
        url = await options.upload(file);
        options.progress(file.name, { url });
      }
      // A response may have been lost after a successful CMS save; reconcile before retry.
      if (!options.existingUrls.has(url))
        await options.create({
          ...options.details,
          imageUrl: url,
          mediaType: "photo",
        });
      options.progress(file.name, { url, done: true });
    } catch (error) {
      options.progress(file.name, {
        url,
        error: error instanceof Error ? error.message : "Upload failed",
      });
      return file.name;
    }
  }
  return undefined;
}
