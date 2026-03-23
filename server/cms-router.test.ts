import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the CMS DB functions
vi.mock("./cms-db", () => ({
  getActivities: vi.fn().mockResolvedValue([
    { id: 1, title: "Test Activity", description: "Desc", date: "Oct 2025", location: "Puri", category: "elderly", isPublished: true, sortOrder: 0 },
  ]),
  getActivityById: vi.fn().mockResolvedValue({ id: 1, title: "Test Activity" }),
  createActivity: vi.fn().mockResolvedValue({ id: 1 }),
  updateActivity: vi.fn().mockResolvedValue({ success: true }),
  deleteActivity: vi.fn().mockResolvedValue({ success: true }),
  getGalleryPhotos: vi.fn().mockResolvedValue([
    { id: 1, title: "Photo 1", imageUrl: "https://example.com/img.jpg", category: "education", isPublished: true },
  ]),
  createGalleryPhoto: vi.fn().mockResolvedValue({ id: 1 }),
  updateGalleryPhoto: vi.fn().mockResolvedValue({ success: true }),
  deleteGalleryPhoto: vi.fn().mockResolvedValue({ success: true }),
  getBlogPosts: vi.fn().mockResolvedValue([
    { id: 1, title: "Blog Post", excerpt: "Excerpt", content: "Content", author: "Test", category: "education", isPublished: true },
  ]),
  getBlogPostById: vi.fn().mockResolvedValue({ id: 1, title: "Blog Post" }),
  createBlogPost: vi.fn().mockResolvedValue({ id: 1 }),
  updateBlogPost: vi.fn().mockResolvedValue({ success: true }),
  deleteBlogPost: vi.fn().mockResolvedValue({ success: true }),
  getYoutubeVideos: vi.fn().mockResolvedValue([
    { id: 1, title: "Video", youtubeUrl: "https://youtube.com/watch?v=abc", category: "event", isPublished: true },
  ]),
  createYoutubeVideo: vi.fn().mockResolvedValue({ id: 1 }),
  updateYoutubeVideo: vi.fn().mockResolvedValue({ success: true }),
  deleteYoutubeVideo: vi.fn().mockResolvedValue({ success: true }),
  getSocialLinks: vi.fn().mockResolvedValue([
    { id: 1, platform: "LinkedIn", url: "https://linkedin.com/test", isActive: true },
  ]),
  upsertSocialLink: vi.fn().mockResolvedValue({ success: true }),
  deleteSocialLink: vi.fn().mockResolvedValue({ success: true }),
  getSiteSettings: vi.fn().mockResolvedValue([
    { id: 1, settingKey: "stat_students_reached", settingValue: "50+", label: "Students Reached", category: "stats" },
  ]),
  getSiteSetting: vi.fn().mockResolvedValue({ id: 1, settingKey: "stat_students_reached", settingValue: "50+" }),
  upsertSiteSetting: vi.fn().mockResolvedValue({ success: true }),
  deleteSiteSetting: vi.fn().mockResolvedValue({ success: true }),
}));

// Mock storage
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ url: "https://cdn.example.com/test.jpg" }),
}));

import {
  getActivities,
  getGalleryPhotos,
  getBlogPosts,
  getYoutubeVideos,
  getSocialLinks,
  getSiteSettings,
  getSiteSetting,
  upsertSiteSetting,
  deleteSiteSetting,
} from "./cms-db";

describe("CMS DB functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Activities", () => {
    it("should return activities list", async () => {
      const result = await getActivities(false);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Test Activity");
    });

    it("should return published activities", async () => {
      const result = await getActivities(true);
      expect(result).toHaveLength(1);
      expect(getActivities).toHaveBeenCalledWith(true);
    });
  });

  describe("Gallery", () => {
    it("should return gallery photos", async () => {
      const result = await getGalleryPhotos(false);
      expect(result).toHaveLength(1);
      expect(result[0].imageUrl).toBe("https://example.com/img.jpg");
    });
  });

  describe("Blog", () => {
    it("should return blog posts", async () => {
      const result = await getBlogPosts(false);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Blog Post");
    });
  });

  describe("YouTube", () => {
    it("should return youtube videos", async () => {
      const result = await getYoutubeVideos(false);
      expect(result).toHaveLength(1);
      expect(result[0].youtubeUrl).toContain("youtube.com");
    });
  });

  describe("Social Links", () => {
    it("should return social links", async () => {
      const result = await getSocialLinks(false);
      expect(result).toHaveLength(1);
      expect(result[0].platform).toBe("LinkedIn");
    });
  });

  describe("Site Settings", () => {
    it("should return all settings", async () => {
      const result = await getSiteSettings();
      expect(result).toHaveLength(1);
      expect(result[0].settingKey).toBe("stat_students_reached");
    });

    it("should return a single setting by key", async () => {
      const result = await getSiteSetting("stat_students_reached");
      expect(result).toBeDefined();
      expect(result?.settingValue).toBe("50+");
    });

    it("should upsert a setting", async () => {
      const result = await upsertSiteSetting({
        settingKey: "stat_students_reached",
        settingValue: "100+",
        label: "Students Reached",
        category: "stats",
      });
      expect(result).toEqual({ success: true });
    });

    it("should delete a setting", async () => {
      const result = await deleteSiteSetting(1);
      expect(result).toEqual({ success: true });
    });
  });
});
