import { eq, desc, asc } from "drizzle-orm";
import { getDb } from "./db.js";
import {
  activities,
  InsertActivity,
  galleryPhotos,
  InsertGalleryPhoto,
  blogPosts,
  InsertBlogPost,
  youtubeVideos,
  InsertYoutubeVideo,
  socialLinks,
  InsertSocialLink,
  siteSettings,
  InsertSiteSetting,
  heroSlides,
  InsertHeroSlide,
  banners,
  InsertBanner,
  leadershipMembers,
  InsertLeadershipMember,
} from "../drizzle/schema.js";

// ===== ACTIVITIES =====

export async function getActivities(publishedOnly = false) {
  const db = await getDb();
  if (!db) return [];
  const query = db
    .select()
    .from(activities)
    .orderBy(desc(activities.createdAt));
  if (publishedOnly) {
    return query.where(eq(activities.isPublished, true));
  }
  return query;
}

export async function getActivityById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(activities)
    .where(eq(activities.id, id))
    .limit(1);
  return result[0];
}

export async function createActivity(data: InsertActivity) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(activities).values(data);
  return { success: true };
}

export async function updateActivity(
  id: number,
  data: Partial<InsertActivity>
) {
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
  const query = db
    .select()
    .from(galleryPhotos)
    .orderBy(desc(galleryPhotos.createdAt));
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

export async function updateGalleryPhoto(
  id: number,
  data: Partial<InsertGalleryPhoto>
) {
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

// ===== BOARD AND ADVISORY MEMBERS =====

export async function getLeadershipMembers(publishedOnly = false) {
  const db = await getDb();
  if (!db) return [];
  const query = db
    .select()
    .from(leadershipMembers)
    .orderBy(asc(leadershipMembers.sortOrder), asc(leadershipMembers.id));
  if (publishedOnly) {
    return query.where(eq(leadershipMembers.isPublished, true));
  }
  return query;
}

export async function createLeadershipMember(data: InsertLeadershipMember) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(leadershipMembers).values(data);
  return { success: true };
}

export async function updateLeadershipMember(
  id: number,
  data: Partial<InsertLeadershipMember>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(leadershipMembers)
    .set(data)
    .where(eq(leadershipMembers.id, id));
  return { success: true };
}

export async function deleteLeadershipMember(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(leadershipMembers).where(eq(leadershipMembers.id, id));
  return { success: true };
}

// ===== BLOG POSTS =====

export async function getBlogPosts(publishedOnly = false) {
  const db = await getDb();
  if (!db) return [];
  const query = db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.publishedAt));
  if (publishedOnly) {
    return query.where(eq(blogPosts.isPublished, true));
  }
  return query;
}

export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);
  return result[0];
}

export async function createBlogPost(data: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(blogPosts).values(data);
  return { success: true };
}

export async function updateBlogPost(
  id: number,
  data: Partial<InsertBlogPost>
) {
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
  const query = db
    .select()
    .from(youtubeVideos)
    .orderBy(desc(youtubeVideos.createdAt));
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

export async function updateYoutubeVideo(
  id: number,
  data: Partial<InsertYoutubeVideo>
) {
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
  const query = db
    .select()
    .from(socialLinks)
    .orderBy(asc(socialLinks.sortOrder));
  if (activeOnly) {
    return query.where(eq(socialLinks.isActive, true));
  }
  return query;
}

export async function upsertSocialLink(data: InsertSocialLink) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .insert(socialLinks)
    .values(data)
    .onDuplicateKeyUpdate({
      set: {
        url: data.url,
        label: data.label,
        isActive: data.isActive ?? true,
        sortOrder: data.sortOrder ?? 0,
      },
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
  const result = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.settingKey, key))
    .limit(1);
  return result[0];
}

export async function upsertSiteSetting(data: InsertSiteSetting) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .insert(siteSettings)
    .values(data)
    .onDuplicateKeyUpdate({
      set: {
        settingValue: data.settingValue,
        label: data.label,
        category: data.category ?? "general",
      },
    });
  return { success: true };
}

export async function deleteSiteSetting(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(siteSettings).where(eq(siteSettings.id, id));
  return { success: true };
}

// ===== HERO SLIDES =====

export async function getHeroSlides(activeOnly = false) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(heroSlides).orderBy(asc(heroSlides.sortOrder));
  if (activeOnly) {
    return query.where(eq(heroSlides.isActive, true));
  }
  return query;
}

export async function createHeroSlide(data: InsertHeroSlide) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(heroSlides).values(data);
  return { success: true };
}

export async function updateHeroSlide(
  id: number,
  data: Partial<InsertHeroSlide>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(heroSlides).set(data).where(eq(heroSlides.id, id));
  return { success: true };
}

export async function deleteHeroSlide(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(heroSlides).where(eq(heroSlides.id, id));
  return { success: true };
}

// ===== BANNERS =====

export async function getBanners(activeOnly = false) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(banners).orderBy(asc(banners.sortOrder));
  if (activeOnly) {
    return query.where(eq(banners.isActive, true));
  }
  return query;
}

export async function getBannersByPage(page: string) {
  const db = await getDb();
  if (!db) return [];
  // Get banners where pagePlacement contains the page name or "all"
  const allBanners = await db
    .select()
    .from(banners)
    .where(eq(banners.isActive, true))
    .orderBy(asc(banners.sortOrder));
  // Filter by page placement (comma-separated field)
  const now = new Date();
  return allBanners.filter(b => {
    const pages = b.pagePlacement.split(",").map(p => p.trim());
    const matchesPage = pages.includes(page) || pages.includes("all");
    const afterStart = !b.startDate || new Date(b.startDate) <= now;
    const beforeEnd = !b.endDate || new Date(b.endDate) >= now;
    return matchesPage && afterStart && beforeEnd;
  });
}

export async function createBanner(data: InsertBanner) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(banners).values(data);
  return { success: true };
}

export async function updateBanner(id: number, data: Partial<InsertBanner>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(banners).set(data).where(eq(banners.id, id));
  return { success: true };
}

export async function deleteBanner(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(banners).where(eq(banners.id, id));
  return { success: true };
}
