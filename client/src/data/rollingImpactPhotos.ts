import { isApprovedVideoUrl } from "@shared/publicVideo";
import { programmePreviewPhotos } from "./programmePhotoAlbums";

export type RibbonPhoto = {
  id: number;
  imageUrl: string;
  title: string;
  category: string;
  mediaType?: string | null;
  isPublished?: boolean | null;
};

/** Use public, published programme photographs only. Documents belong in the gallery. */
export function rollingImpactPhotos<T extends RibbonPhoto>(
  items: readonly T[]
): T[] {
  return programmePreviewPhotos(
    items.filter(
      photo =>
        photo.isPublished !== false &&
        Boolean(photo.imageUrl) &&
        (!photo.mediaType || photo.mediaType === "photo") &&
        !/press|newspaper|certificate|clipping|passbook|aadhaar/i.test(
          photo.title
        )
    ),
    1
  );
}

export type RibbonVideo = {
  id: number;
  title: string;
  youtubeUrl: string;
  category: string;
  isPublished?: boolean | null;
};

/** Display only reviewed video links; never autoplay or embed on page view. */
export function rollingImpactVideos<T extends RibbonVideo>(
  items: readonly T[]
): T[] {
  return items.filter(
    video =>
      video.isPublished !== false &&
      ["education", "documentary"].includes(video.category) &&
      isApprovedVideoUrl(video.youtubeUrl)
  );
}
