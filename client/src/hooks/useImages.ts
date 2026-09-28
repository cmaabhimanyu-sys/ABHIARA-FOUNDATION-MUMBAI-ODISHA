/**
 * useImages. Central hook for all website images.
 * Reads from /images/images.json (the single master registry).
 * All pages use this hook instead of hardcoded CDN URLs.
 *
 * Usage:
 *   const { getImage, getImages, getVideo, getVideos } = useImages();
 *   const heroImg = getImage("hero-slide-1"); // returns "/images/hero-dawn.webp"
 *   const educationPhotos = getImages("education"); // returns array of image objects
 */

import { useState, useEffect, useMemo } from "react";

export interface ImageEntry {
  file: string;
  category: string;
  slot: string;
  alt: string;
  caption?: string;
  location?: string;
}

export interface VideoEntry {
  url: string;
  category: string;
  slot: string;
  alt: string;
  thumbnail: string;
}

interface ImagesData {
  images: ImageEntry[];
  videos: VideoEntry[];
}

const BASE_PATH = "/images";

let cachedData: ImagesData | null = null;
let fetchPromise: Promise<ImagesData> | null = null;

function fetchImagesData(): Promise<ImagesData> {
  if (cachedData) return Promise.resolve(cachedData);
  if (fetchPromise) return fetchPromise;
  fetchPromise = fetch(`${BASE_PATH}/images.json`)
    .then((res) => res.json())
    .then((data) => {
      cachedData = { images: data.images || [], videos: data.videos || [] };
      return cachedData;
    })
    .catch(() => {
      cachedData = { images: [], videos: [] };
      return cachedData;
    });
  return fetchPromise;
}

export function useImages() {
  const [data, setData] = useState<ImagesData>(cachedData || { images: [], videos: [] });

  useEffect(() => {
    fetchImagesData().then(setData);
  }, []);

  return useMemo(() => ({
    /** Get a single image URL by its slot name */
    getImage(slot: string): string {
      const entry = data.images.find((img) => img.slot === slot);
      return entry ? `${BASE_PATH}/${entry.file}` : "";
    },

    /** Get a single image entry (with alt, caption, etc.) by slot */
    getImageEntry(slot: string): ImageEntry | undefined {
      return data.images.find((img) => img.slot === slot);
    },

    /** Get all images in a category */
    getImages(category: string): (ImageEntry & { src: string })[] {
      return data.images
        .filter((img) => img.category === category)
        .map((img) => ({ ...img, src: `${BASE_PATH}/${img.file}` }));
    },

    /** Get image URL by filename directly */
    getByFile(filename: string): string {
      return `${BASE_PATH}/${filename}`;
    },

    /** Get a video entry by slot */
    getVideo(slot: string): VideoEntry | undefined {
      return data.videos.find((v) => v.slot === slot);
    },

    /** Get all videos in a category */
    getVideos(category: string): (VideoEntry & { thumbnailSrc: string })[] {
      return data.videos
        .filter((v) => v.category === category)
        .map((v) => ({ ...v, thumbnailSrc: `${BASE_PATH}/${v.thumbnail}` }));
    },

    /** Get all images (flat list with src) */
    allImages: data.images.map((img) => ({ ...img, src: `${BASE_PATH}/${img.file}` })),

    /** Get all videos */
    allVideos: data.videos.map((v) => ({ ...v, thumbnailSrc: `${BASE_PATH}/${v.thumbnail}` })),

    /** Check if data is loaded */
    isLoaded: data.images.length > 0,
  }), [data]);
}

/**
 * Static helper for non-hook contexts (e.g. constants outside components).
 * Use this when you need image paths at module level.
 */
export const img = (filename: string) => `${BASE_PATH}/${filename}`;
