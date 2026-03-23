import { eq, desc, asc } from "drizzle-orm";
import { getDb } from "./db";
import {
  activities, InsertActivity,
  galleryPhotos, InsertGalleryPhoto,
  blogPosts, InsertBlogPost,
  youtubeVideos, InsertYoutubeVideo,
  socialLinks, InsertSocialLink,
  siteSettings, InsertSiteSetting,
} from "../drizzle/schema";

// ===== ACTIVITIES =====

export async function getActivities(publishedOnly = false) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(activities).orderBy(desc(activities.createdAt));
  if (publishedOnly) {
    return query.where(eq(activities.isPublished, true));
  }
  return query;
}

export async function getActivityById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(activities).where(eq(activities.id, id)).limit(1);
  return result[0];
}

export async function createActivity(data: InsertActivity) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(activities).values(data);
  return { success: true };
}

export async function updateActivity(id: number, data: Partial<InsertActivity>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(activities).set(data).where(eq(activities.id, id));
  return { success: true };
}

export async function deleteActivity(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(activities).where(eq(activities.id, id));
  return { success: true };
}

// ===== GALLERY PHOTOS =====

export async function getGalleryPhotos(publishedOnly = false) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(galleryPhotos).orderBy(desc(galleryPhotos.createdAt));
  if (publishedOnly) {
    return query.where(eq(galleryPhotos.isPublished, true));
  }
  return query;
}

export async function createGalleryPhoto(data: InsertGalleryPhoto) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(galleryPhotos).values(data);
  return { success: true };
}

export async function updateGalleryPhoto(id: number, data: Partial<InsertGalleryPhoto>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(galleryPhotos).set(data).where(eq(galleryPhotos.id, id));
  return { success: true };
}

export async function deleteGalleryPhoto(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(galleryPhotos).where(eq(galleryPhotos.id, id));
  return { success: true };
}

// ===== BLOG POSTS =====

export async function getBlogPosts(publishedOnly = false) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  if (publishedOnly) {
    return query.where(eq(blogPosts.isPublished, true));
  }
  return query;
}

export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result[0];
}

export async function createBlogPost(data: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(blogPosts).values(data);
  return { success: true };
}

export async function updateBlogPost(id: number, data: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
  return { success: true };
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  return { success: true };
}

// ===== YOUTUBE VIDEOS =====

export async function getYoutubeVideos(publishedOnly = false) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(youtubeVideos).orderBy(desc(youtubeVideos.createdAt));
  if (publishedOnly) {
    return query.where(eq(youtubeVideos.isPublished, true));
  }
  return query;
}

export async function createYoutubeVideo(data: InsertYoutubeVideo) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(youtubeVideos).values(data);
  return { success: true };
}

export async function updateYoutubeVideo(id: number, data: Partial<InsertYoutubeVideo>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(youtubeVideos).set(data).where(eq(youtubeVideos.id, id));
  return { success: true };
}

export async function deleteYoutubeVideo(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(youtubeVideos).where(eq(youtubeVideos.id, id));
  return { success: true };
}

// ===== SOCIAL LINKS =====

export async function getSocialLinks(activeOnly = false) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(socialLinks).orderBy(asc(socialLinks.sortOrder));
  if (activeOnly) {
    return query.where(eq(socialLinks.isActive, true));
  }
  return query;
}

export async function upsertSocialLink(data: InsertSocialLink) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(socialLinks).values(data).onDuplicateKeyUpdate({
    set: { url: data.url, label: data.label, isActive: data.isActive ?? true, sortOrder: data.sortOrder ?? 0 },
  });
  return { success: true };
}

export async function deleteSocialLink(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(socialLinks).where(eq(socialLinks.id, id));
  return { success: true };
}

// ===== SITE SETTINGS =====

export async function getSiteSettings(category?: string) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(siteSettings);
  if (category) {
    return query.where(eq(siteSettings.category, category));
  }
  return query;
}

export async function getSiteSetting(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, key)).limit(1);
  return result[0];
}

export async function upsertSiteSetting(data: InsertSiteSetting) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(siteSettings).values(data).onDuplicateKeyUpdate({
    set: { settingValue: data.settingValue, label: data.label, category: data.category ?? "general" },
  });
  return { success: true };
}

export async function deleteSiteSetting(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(siteSettings).where(eq(siteSettings.id, id));
  return { success: true };
}
