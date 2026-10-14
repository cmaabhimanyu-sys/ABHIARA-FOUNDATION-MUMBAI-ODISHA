import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  isAbhiaraHostedVideo,
  isApprovedVideoUrl,
  STORY_VIDEO_FOLDER,
} from "@shared/publicVideo";

const host = "https://cxjy0gqflcaufkda.public.blob.vercel-storage.com";
const own = `${host}/${STORY_VIDEO_FOLDER}2026-10-06T14-00-00-short.mp4`;

describe("reviewed public story videos", () => {
  it("accepts only hosted MP4s inside Abhiara's own media folder or YouTube", () => {
    expect(isAbhiaraHostedVideo(own)).toBe(true);
    expect(isApprovedVideoUrl(own)).toBe(true);
    expect(
      isApprovedVideoUrl("https://www.youtube.com/watch?v=abcdefghijk")
    ).toBe(true);
    for (const url of [
      "https://evil.example.com/abhiara-images/programme-videos/video.mp4",
      `${host}/private/video.mp4`,
      `${host}/${STORY_VIDEO_FOLDER}video.html`,
      `${own}?download=1`,
      "http://www.youtube.com/watch?v=abcdefghijk",
      "javascript:alert(1)",
    ]) {
      expect(isApprovedVideoUrl(url)).toBe(false);
    }
  });
  it("requires a reviewed MP4 upload through Admin and renders native click-to-play video on the public page", () => {
    const backend = readFileSync("server/cms-router.ts", "utf8");
    const owner = readFileSync("client/src/pages/Admin.tsx", "utf8");
    const publicPage = readFileSync("client/src/pages/PressMedia.tsx", "utf8");
    const impact = readFileSync("client/src/pages/StudentImpact.tsx", "utf8");
    expect(backend).toContain("uploadVideo: adminProcedure");
    expect(backend).toContain("consentConfirmed: z.literal(true)");
    expect(owner).toContain('accept="video/mp4,.mp4"');
    expect(publicPage).toContain("isAbhiaraHostedVideo(video.youtubeUrl)");
    expect(publicPage).toContain('preload="none"');
    expect(publicPage).toContain('id="public-videos"');
    expect(impact).toContain('href="/press-and-media#public-videos"');
  });
});
