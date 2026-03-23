import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { storagePut } from "./storage";
import {
  getActivities, getActivityById, createActivity, updateActivity, deleteActivity,
  getGalleryPhotos, createGalleryPhoto, updateGalleryPhoto, deleteGalleryPhoto,
  getBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost,
  getYoutubeVideos, createYoutubeVideo, updateYoutubeVideo, deleteYoutubeVideo,
  getSocialLinks, upsertSocialLink, deleteSocialLink,
  getSiteSettings, getSiteSetting, upsertSiteSetting, deleteSiteSetting,
} from "./cms-db";

// ===== FILE UPLOAD =====
const uploadProcedure = adminProcedure
  .input(z.object({
    fileName: z.string(),
    fileBase64: z.string(),
    contentType: z.string(),
  }))
  .mutation(async ({ input }) => {
    const buffer = Buffer.from(input.fileBase64, "base64");
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const ext = input.fileName.split(".").pop() || "jpg";
    const key = `cms/${Date.now()}-${randomSuffix}.${ext}`;
    const { url } = await storagePut(key, buffer, input.contentType);
    return { url };
  });

// ===== ACTIVITIES ROUTER =====
const activitiesRouter = router({
  list: publicProcedure.query(() => getActivities(false)),
  listPublished: publicProcedure.query(() => getActivities(true)),
  getById: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => getActivityById(input.id)),
  create: adminProcedure.input(z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.string().min(1),
    location: z.string().min(1),
    category: z.enum(["education", "elderly", "community", "csr"]),
    imageUrl: z.string().optional(),
    sdgTags: z.string().optional(),
    beneficiariesCount: z.string().optional(),
    isPublished: z.boolean().default(true),
    sortOrder: z.number().default(0),
  })).mutation(({ input }) => createActivity(input)),
  update: adminProcedure.input(z.object({
    id: z.number(),
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    location: z.string().optional(),
    category: z.enum(["education", "elderly", "community", "csr"]).optional(),
    imageUrl: z.string().optional(),
    sdgTags: z.string().optional(),
    beneficiariesCount: z.string().optional(),
    isPublished: z.boolean().optional(),
    sortOrder: z.number().optional(),
  })).mutation(({ input }) => {
    const { id, ...data } = input;
    return updateActivity(id, data);
  }),
  delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteActivity(input.id)),
});

// ===== GALLERY ROUTER =====
const galleryRouter = router({
  list: publicProcedure.query(() => getGalleryPhotos(false)),
  listPublished: publicProcedure.query(() => getGalleryPhotos(true)),
  create: adminProcedure.input(z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    imageUrl: z.string().min(1),
    category: z.enum(["education", "elderly", "events", "community"]),
    location: z.string().optional(),
    dateTaken: z.string().optional(),
    isPublished: z.boolean().default(true),
    sortOrder: z.number().default(0),
  })).mutation(({ input }) => createGalleryPhoto(input)),
  update: adminProcedure.input(z.object({
    id: z.number(),
    title: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    category: z.enum(["education", "elderly", "events", "community"]).optional(),
    location: z.string().optional(),
    dateTaken: z.string().optional(),
    isPublished: z.boolean().optional(),
    sortOrder: z.number().optional(),
  })).mutation(({ input }) => {
    const { id, ...data } = input;
    return updateGalleryPhoto(id, data);
  }),
  delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteGalleryPhoto(input.id)),
});

// ===== BLOG ROUTER =====
const blogRouter = router({
  list: publicProcedure.query(() => getBlogPosts(false)),
  listPublished: publicProcedure.query(() => getBlogPosts(true)),
  getById: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => getBlogPostById(input.id)),
  create: adminProcedure.input(z.object({
    title: z.string().min(1),
    excerpt: z.string().min(1),
    content: z.string().min(1),
    imageUrl: z.string().optional(),
    author: z.string().default("Abhimanyu Mallik"),
    category: z.enum(["education", "elderly", "csr", "announcement", "event"]),
    tags: z.string().optional(),
    isPublished: z.boolean().default(true),
  })).mutation(({ input }) => createBlogPost(input)),
  update: adminProcedure.input(z.object({
    id: z.number(),
    title: z.string().optional(),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    imageUrl: z.string().optional(),
    author: z.string().optional(),
    category: z.enum(["education", "elderly", "csr", "announcement", "event"]).optional(),
    tags: z.string().optional(),
    isPublished: z.boolean().optional(),
  })).mutation(({ input }) => {
    const { id, ...data } = input;
    return updateBlogPost(id, data);
  }),
  delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteBlogPost(input.id)),
});

// ===== YOUTUBE ROUTER =====
const youtubeRouter = router({
  list: publicProcedure.query(() => getYoutubeVideos(false)),
  listPublished: publicProcedure.query(() => getYoutubeVideos(true)),
  create: adminProcedure.input(z.object({
    title: z.string().min(1),
    youtubeUrl: z.string().min(1),
    description: z.string().optional(),
    category: z.enum(["education", "elderly", "event", "documentary", "other"]),
    isPublished: z.boolean().default(true),
    sortOrder: z.number().default(0),
  })).mutation(({ input }) => createYoutubeVideo(input)),
  update: adminProcedure.input(z.object({
    id: z.number(),
    title: z.string().optional(),
    youtubeUrl: z.string().optional(),
    description: z.string().optional(),
    category: z.enum(["education", "elderly", "event", "documentary", "other"]).optional(),
    isPublished: z.boolean().optional(),
    sortOrder: z.number().optional(),
  })).mutation(({ input }) => {
    const { id, ...data } = input;
    return updateYoutubeVideo(id, data);
  }),
  delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteYoutubeVideo(input.id)),
});

// ===== SOCIAL LINKS ROUTER =====
const socialRouter = router({
  list: publicProcedure.query(() => getSocialLinks(false)),
  listActive: publicProcedure.query(() => getSocialLinks(true)),
  upsert: adminProcedure.input(z.object({
    platform: z.string().min(1),
    url: z.string().min(1),
    label: z.string().optional(),
    isActive: z.boolean().default(true),
    sortOrder: z.number().default(0),
  })).mutation(({ input }) => upsertSocialLink(input)),
  delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteSocialLink(input.id)),
});

// ===== SITE SETTINGS ROUTER =====
const settingsRouter = router({
  list: publicProcedure.query(() => getSiteSettings()),
  listByCategory: publicProcedure.input(z.object({ category: z.string() })).query(({ input }) => getSiteSettings(input.category)),
  get: publicProcedure.input(z.object({ key: z.string() })).query(({ input }) => getSiteSetting(input.key)),
  upsert: adminProcedure.input(z.object({
    settingKey: z.string().min(1),
    settingValue: z.string(),
    label: z.string().optional(),
    category: z.string().default("general"),
  })).mutation(({ input }) => upsertSiteSetting(input)),
  delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteSiteSetting(input.id)),
});

// ===== COMBINED CMS ROUTER =====
export const cmsRouter = router({
  upload: uploadProcedure,
  activities: activitiesRouter,
  gallery: galleryRouter,
  blog: blogRouter,
  youtube: youtubeRouter,
  social: socialRouter,
  settings: settingsRouter,
});
