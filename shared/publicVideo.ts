export const STORY_VIDEO_FOLDER = "abhiara-images/programme-videos/";

export function isAbhiaraHostedVideo(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "cxjy0gqflcaufkda.public.blob.vercel-storage.com" &&
      url.pathname.startsWith(`/${STORY_VIDEO_FOLDER}`) &&
      /^\/[a-zA-Z0-9/_-]+\.mp4$/.test(url.pathname) &&
      !url.search &&
      !url.hash
    );
  } catch {
    return false;
  }
}

export function isApprovedVideoUrl(value: string): boolean {
  if (isAbhiaraHostedVideo(value)) return true;
  return /^https:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)[\w-]{11}(?:[?&/#]|$)/.test(
    value
  );
}
