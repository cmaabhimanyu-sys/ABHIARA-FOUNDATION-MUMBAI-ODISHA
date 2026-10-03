import { adminProcedure, publicProcedure, router } from "./_core/trpc.js";
import { z } from "zod";
import { storagePut } from "./storage.js";
import {
  deletePublicBlobImage,
  isBlobMediaConfigured,
  listPublicBlobImages,
  PUBLIC_IMAGE_FOLDERS,
  uploadPublicBlobImage,
} from "./blobMedia.js";
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  getGalleryPhotos,
  createGalleryPhoto,
  updateGalleryPhoto,
  moveGalleryPhoto,
  deleteGalleryPhoto,
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getYoutubeVideos,
  createYoutubeVideo,
  updateYoutubeVideo,
  deleteYoutubeVideo,
  getSocialLinks,
  upsertSocialLink,
  deleteSocialLink,
  getSiteSettings,
  getSiteSetting,
  upsertSiteSetting,
  deleteSiteSetting,
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  getBanners,
  getBannersByPage,
  createBanner,
  updateBanner,
  deleteBanner,
  getLeadershipMembers,
  createLeadershipMember,
  updateLeadershipMember,
  deleteLeadershipMember,
} from "./cms-db.js";

const PUBLIC_SETTING_KEYS = new Set([
  "stat_students_reached",
  "stat_elders_visited",
  "stat_families_supported",
  "stat_activities_completed",
  "stat_students_target",
  "stat_elders_target",
  "stat_activities_target",
  "stat_csr_target",
  "stat_districts",
  "hero_tagline",
  "fundraising_days_left",
  "fundraising_donors",
  "fundraising_goal",
  "fundraising_lives_impacted",
  "fundraising_raised",
  "vision_hero_desc",
  "vision_impact_targets",
  "vision_pillars",
  "vision_timeline",
  "whatsapp_number",
  "whatsapp_channel_url",
  "email_address",
]);

async function getPublicSiteSettings() {
  const settings = await getSiteSettings();
  return settings.filter(setting =>
    PUBLIC_SETTING_KEYS.has(setting.settingKey)
  );
}

// ===== FILE UPLOAD =====
const uploadProcedure = adminProcedure
  .input(
    z.object({
      fileName: z.string(),
      fileBase64: z.string().max(1_500_000),
      contentType: z.string(),
      folder: z.enum(PUBLIC_IMAGE_FOLDERS).default("general"),
      altText: z.string().max(180).optional(),
      consentConfirmed: z.boolean().default(false),
    })
  )
  .mutation(async ({ input }) => {
    if (input.contentType.startsWith("image/")) {
      return uploadPublicBlobImage({
        folder: input.folder,
        fileName: input.fileName,
        fileBase64: input.fileBase64,
        contentType: input.contentType,
        altText:
          input.altText ||
          input.fileName.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
        consentConfirmed: input.consentConfirmed,
      });
    }

    const buffer = Buffer.from(input.fileBase64, "base64");
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const ext = input.fileName.split(".").pop() || "jpg";
    const key = `cms/${Date.now()}-${randomSuffix}.${ext}`;
    const { url } = await storagePut(key, buffer, input.contentType);
    return { url };
  });

const mediaRouter = router({
  listFolder: adminProcedure
    .input(z.object({ folder: z.enum(PUBLIC_IMAGE_FOLDERS) }))
    .query(({ input }) => listPublicBlobImages(input.folder)),
  status: adminProcedure.query(() => ({
    configured: isBlobMediaConfigured(),
    root: "abhiara-images/",
    folders: PUBLIC_IMAGE_FOLDERS,
  })),
  upload: adminProcedure
    .input(
      z.object({
        folder: z.enum(PUBLIC_IMAGE_FOLDERS),
        fileName: z.string().min(1).max(120),
        fileBase64: z.string().min(1).max(1_500_000),
        contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
        altText: z.string().min(5).max(180),
        consentConfirmed: z.boolean().default(false),
      })
    )
    .mutation(({ input }) => uploadPublicBlobImage(input)),
  delete: adminProcedure
    .input(
      z.object({
        folder: z.enum(PUBLIC_IMAGE_FOLDERS),
        pathname: z.string().min(1),
      })
    )
    .mutation(({ input }) =>
      deletePublicBlobImage(input.folder, input.pathname)
    ),
});

// ===== ACTIVITIES ROUTER =====
const activitiesRouter = router({
  list: adminProcedure.query(() => getActivities(false)),
  listPublished: publicProcedure.query(() => getActivities(true)),
  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getActivityById(input.id)),
  create: adminProcedure
    .input(
      z.object({
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
      })
    )
    .mutation(({ input }) => createActivity(input)),
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.string().optional(),
        location: z.string().optional(),
        category: z
          .enum(["education", "elderly", "community", "csr"])
          .optional(),
        imageUrl: z.string().optional(),
        sdgTags: z.string().optional(),
        beneficiariesCount: z.string().optional(),
        isPublished: z.boolean().optional(),
        sortOrder: z.number().optional(),
      })
    )
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return updateActivity(id, data);
    }),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteActivity(input.id)),
});

// ===== GALLERY ROUTER =====
const galleryRouter = router({
  list: adminProcedure.query(() => getGalleryPhotos(false)),
  listPublished: publicProcedure.query(() => getGalleryPhotos(true)),
  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        imageUrl: z.string().min(1),
        mediaType: z.enum(["photo", "video"]).default("photo"),
        thumbnailUrl: z.string().optional(),
        category: z.enum([
          "education",
          "elderly",
          "medical",
          "disaster",
          "animals",
          "events",
          "community",
        ]),
        location: z.string().optional(),
        dateTaken: z.string().optional(),
        isPublished: z.boolean().default(true),
        isHomepageFeatured: z.boolean().default(false),
        sortOrder: z.number().int().min(0).max(9999).default(0),
      })
    )
    .mutation(({ input }) => createGalleryPhoto(input)),
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        mediaType: z.enum(["photo", "video"]).optional(),
        thumbnailUrl: z.string().optional(),
        category: z
          .enum([
            "education",
            "elderly",
            "medical",
            "disaster",
            "animals",
            "events",
            "community",
          ])
          .optional(),
        location: z.string().optional(),
        dateTaken: z.string().optional(),
        isPublished: z.boolean().optional(),
        isHomepageFeatured: z.boolean().optional(),
        sortOrder: z.number().int().min(0).max(9999).optional(),
      })
    )
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return updateGalleryPhoto(id, data);
    }),
  move: adminProcedure
    .input(z.object({ id: z.number(), direction: z.enum(["up", "down"]) }))
    .mutation(({ input }) => moveGalleryPhoto(input.id, input.direction)),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteGalleryPhoto(input.id)),
});

// ===== BOARD AND ADVISORY MEMBERS ROUTER =====
const leadershipRouter = router({
  list: adminProcedure.query(() => getLeadershipMembers(false)),
  listPublished: publicProcedure.query(() => getLeadershipMembers(true)),
  create: adminProcedure
    .input(
      z.object({
        memberType: z.enum(["board", "auditor", "advisor", "odisha", "member"]),
        nameEn: z.string().min(2).max(255),
        nameOd: z.string().max(255).optional(),
        roleEn: z.string().min(2).max(255),
        roleOd: z.string().max(255).optional(),
        qualificationEn: z.string().max(500).optional(),
        qualificationOd: z.string().max(500).optional(),
        bioEn: z.string().max(2000).optional(),
        bioOd: z.string().max(2000).optional(),
        bioIsPublic: z.boolean().default(false),
        imageUrl: z.string().max(2000).optional(),
        profileUrl: z
          .string()
          .url()
          .refine(
            value => value.startsWith("https://"),
            "Use a secure HTTPS profile link."
          )
          .optional(),
        isPublished: z.boolean().default(false),
        sortOrder: z.number().int().min(0).max(999).default(0),
      })
    )
    .mutation(({ input }) => createLeadershipMember(input)),
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        memberType: z
          .enum(["board", "auditor", "advisor", "odisha", "member"])
          .optional(),
        nameEn: z.string().min(2).max(255).optional(),
        nameOd: z.string().max(255).optional(),
        roleEn: z.string().min(2).max(255).optional(),
        roleOd: z.string().max(255).optional(),
        qualificationEn: z.string().max(500).optional(),
        qualificationOd: z.string().max(500).optional(),
        bioEn: z.string().max(2000).optional(),
        bioOd: z.string().max(2000).optional(),
        bioIsPublic: z.boolean().optional(),
        imageUrl: z.string().max(2000).optional(),
        profileUrl: z
          .string()
          .url()
          .refine(
            value => value.startsWith("https://"),
            "Use a secure HTTPS profile link."
          )
          .optional(),
        isPublished: z.boolean().optional(),
        sortOrder: z.number().int().min(0).max(999).optional(),
      })
    )
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return updateLeadershipMember(id, data);
    }),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteLeadershipMember(input.id)),
});

// ===== BLOG ROUTER =====
const blogRouter = router({
  list: adminProcedure.query(() => getBlogPosts(false)),
  listPublished: publicProcedure.query(() => getBlogPosts(true)),
  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getBlogPostById(input.id)),
  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        excerpt: z.string().min(1),
        content: z.string().min(1),
        imageUrl: z.string().optional(),
        author: z.string().default("Abhimanyu Mallik"),
        category: z.enum([
          "education",
          "elderly",
          "csr",
          "announcement",
          "event",
        ]),
        tags: z.string().optional(),
        isPublished: z.boolean().default(true),
      })
    )
    .mutation(({ input }) => createBlogPost(input)),
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        imageUrl: z.string().optional(),
        author: z.string().optional(),
        category: z
          .enum(["education", "elderly", "csr", "announcement", "event"])
          .optional(),
        tags: z.string().optional(),
        isPublished: z.boolean().optional(),
      })
    )
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return updateBlogPost(id, data);
    }),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteBlogPost(input.id)),
});

// ===== YOUTUBE ROUTER =====
const youtubeRouter = router({
  list: adminProcedure.query(() => getYoutubeVideos(false)),
  listPublished: publicProcedure.query(() => getYoutubeVideos(true)),
  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        youtubeUrl: z.string().min(1),
        description: z.string().optional(),
        category: z.enum([
          "education",
          "elderly",
          "event",
          "documentary",
          "other",
        ]),
        isPublished: z.boolean().default(true),
        sortOrder: z.number().default(0),
      })
    )
    .mutation(({ input }) => createYoutubeVideo(input)),
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        youtubeUrl: z.string().optional(),
        description: z.string().optional(),
        category: z
          .enum(["education", "elderly", "event", "documentary", "other"])
          .optional(),
        isPublished: z.boolean().optional(),
        sortOrder: z.number().optional(),
      })
    )
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return updateYoutubeVideo(id, data);
    }),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteYoutubeVideo(input.id)),
});

// ===== SOCIAL LINKS ROUTER =====
const socialRouter = router({
  list: adminProcedure.query(() => getSocialLinks(false)),
  listActive: publicProcedure.query(() => getSocialLinks(true)),
  upsert: adminProcedure
    .input(
      z.object({
        platform: z.string().min(1),
        url: z
          .string()
          .url()
          .refine(
            value => value.startsWith("https://"),
            "Use a secure HTTPS link."
          ),
        label: z.string().optional(),
        isActive: z.boolean().default(true),
        sortOrder: z.number().default(0),
      })
    )
    .mutation(({ input }) => upsertSocialLink(input)),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteSocialLink(input.id)),
});

// ===== SITE SETTINGS ROUTER =====
const settingsRouter = router({
  list: adminProcedure.query(() => getSiteSettings()),
  listPublic: publicProcedure.query(() => getPublicSiteSettings()),
  listByCategory: adminProcedure
    .input(z.object({ category: z.string() }))
    .query(({ input }) => getSiteSettings(input.category)),
  get: adminProcedure
    .input(z.object({ key: z.string() }))
    .query(({ input }) => getSiteSetting(input.key)),
  upsert: adminProcedure
    .input(
      z.object({
        settingKey: z.string().min(1),
        settingValue: z.string(),
        label: z.string().optional(),
        category: z.string().default("general"),
      })
    )
    .mutation(({ input }) => upsertSiteSetting(input)),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteSiteSetting(input.id)),
});

// ===== HERO SLIDES ROUTER =====
const heroSlidesRouter = router({
  list: adminProcedure.query(() => getHeroSlides(false)),
  listActive: publicProcedure.query(() => getHeroSlides(true)),
  create: adminProcedure
    .input(
      z.object({
        titleEn: z.string().min(1),
        titleOd: z.string().optional(),
        subtitleEn: z.string().optional(),
        subtitleOd: z.string().optional(),
        imageUrl: z.string().min(1),
        ctaTextEn: z.string().optional(),
        ctaTextOd: z.string().optional(),
        ctaHref: z.string().optional(),
        accentColor: z.string().default("#C9A84C"),
        sortOrder: z.number().default(0),
        isActive: z.boolean().default(true),
      })
    )
    .mutation(({ input }) => createHeroSlide(input)),
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        titleEn: z.string().optional(),
        titleOd: z.string().optional(),
        subtitleEn: z.string().optional(),
        subtitleOd: z.string().optional(),
        imageUrl: z.string().optional(),
        ctaTextEn: z.string().optional(),
        ctaTextOd: z.string().optional(),
        ctaHref: z.string().optional(),
        accentColor: z.string().optional(),
        sortOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return updateHeroSlide(id, data);
    }),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteHeroSlide(input.id)),
});

// ===== BANNERS ROUTER =====
const bannersRouter = router({
  list: adminProcedure.query(() => getBanners(false)),
  listActive: publicProcedure.query(() => getBanners(true)),
  getByPage: publicProcedure
    .input(z.object({ page: z.string() }))
    .query(({ input }) => getBannersByPage(input.page)),
  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        imageUrl: z.string().min(1),
        linkUrl: z.string().optional(),
        pagePlacement: z.string().default("home"),
        position: z.enum(["top", "middle", "bottom"]).default("top"),
        isActive: z.boolean().default(true),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        sortOrder: z.number().default(0),
      })
    )
    .mutation(({ input }) => {
      const { startDate, endDate, ...rest } = input;
      return createBanner({
        ...rest,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      });
    }),
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        imageUrl: z.string().optional(),
        linkUrl: z.string().optional(),
        pagePlacement: z.string().optional(),
        position: z.enum(["top", "middle", "bottom"]).optional(),
        isActive: z.boolean().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        sortOrder: z.number().optional(),
      })
    )
    .mutation(({ input }) => {
      const { id, startDate, endDate, ...rest } = input;
      return updateBanner(id, {
        ...rest,
        ...(startDate !== undefined
          ? { startDate: startDate ? new Date(startDate) : null }
          : {}),
        ...(endDate !== undefined
          ? { endDate: endDate ? new Date(endDate) : null }
          : {}),
      });
    }),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteBanner(input.id)),
});

// ===== COMBINED CMS ROUTER =====
export const cmsRouter = router({
  upload: uploadProcedure,
  media: mediaRouter,
  activities: activitiesRouter,
  gallery: galleryRouter,
  leadership: leadershipRouter,
  blog: blogRouter,
  youtube: youtubeRouter,
  social: socialRouter,
  settings: settingsRouter,
  heroSlides: heroSlidesRouter,
  banners: bannersRouter,
});
