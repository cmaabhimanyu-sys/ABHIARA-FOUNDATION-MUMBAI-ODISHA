import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Newsletter subscribers — captures email signups from the website.
 */
export const newsletterSubscribers = mysqlTable("newsletter_subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  isActive: boolean("isActive").default(true).notNull(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber =
  typeof newsletterSubscribers.$inferInsert;

/**
 * Contact inquiries — captures messages from the contact page.
 */
export const contactInquiries = mysqlTable("contact_inquiries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 500 }),
  message: text("message").notNull(),
  type: mysqlEnum("type", [
    "general",
    "csr_partnership",
    "volunteer",
    "media",
    "donation",
    "birthday",
    "team",
    "other",
  ])
    .default("general")
    .notNull(),
  pageSource: varchar("pageSource", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  isRead: boolean("isRead").default(false).notNull(),
});

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertContactInquiry = typeof contactInquiries.$inferInsert;

/**
 * Be The Change — volunteer form submissions from the Activities page.
 */
export const volunteerSubmissions = mysqlTable("volunteer_submissions", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  qualification: varchar("qualification", { length: 500 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  socialProfile: varchar("socialProfile", { length: 500 }).notNull(),
  areaOfInterest: mysqlEnum("areaOfInterest", [
    "education",
    "eldercare",
    "csr",
    "finance",
    "technology",
    "fieldwork",
    "other",
  ]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type VolunteerSubmission = typeof volunteerSubmissions.$inferSelect;
export type InsertVolunteerSubmission =
  typeof volunteerSubmissions.$inferInsert;

// ===== CMS CONTENT TABLES =====

/**
 * Activities — managed from admin dashboard, displayed on public Activities page.
 */
export const activities = mysqlTable("activities", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description").notNull(),
  date: varchar("date", { length: 100 }).notNull(),
  location: varchar("location", { length: 500 }).notNull(),
  category: mysqlEnum("category", [
    "education",
    "elderly",
    "community",
    "csr",
  ]).notNull(),
  imageUrl: text("imageUrl"),
  sdgTags: varchar("sdgTags", { length: 255 }),
  beneficiariesCount: varchar("beneficiariesCount", { length: 100 }),
  isPublished: boolean("isPublished").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = typeof activities.$inferInsert;

/**
 * Gallery Photos — managed from admin dashboard, displayed on Gallery tab.
 */
export const galleryPhotos = mysqlTable("gallery_photos", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  imageUrl: text("imageUrl").notNull(),
  /** mediaType: photo or video — determines how the item is rendered on the gallery */
  mediaType: mysqlEnum("mediaType", ["photo", "video"])
    .default("photo")
    .notNull(),
  /** For videos: optional thumbnail image URL */
  thumbnailUrl: text("thumbnailUrl"),
  category: mysqlEnum("category", [
    "education",
    "elderly",
    "medical",
    "disaster",
    "animals",
    "events",
    "community",
  ]).notNull(),
  location: varchar("location", { length: 500 }),
  dateTaken: varchar("dateTaken", { length: 100 }),
  isPublished: boolean("isPublished").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GalleryPhoto = typeof galleryPhotos.$inferSelect;
export type InsertGalleryPhoto = typeof galleryPhotos.$inferInsert;

/**
 * Leadership members — owner-managed Board and Advisory profiles.
 * Board membership must match the Foundation's official company records.
 */
export const leadershipMembers = mysqlTable("leadership_members", {
  id: int("id").autoincrement().primaryKey(),
  memberType: mysqlEnum("memberType", ["board", "advisor"]).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameOd: varchar("nameOd", { length: 255 }),
  roleEn: varchar("roleEn", { length: 255 }).notNull(),
  roleOd: varchar("roleOd", { length: 255 }),
  qualificationEn: varchar("qualificationEn", { length: 500 }),
  qualificationOd: varchar("qualificationOd", { length: 500 }),
  bioEn: text("bioEn"),
  bioOd: text("bioOd"),
  imageUrl: text("imageUrl"),
  profileUrl: text("profileUrl"),
  isPublished: boolean("isPublished").default(false).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LeadershipMember = typeof leadershipMembers.$inferSelect;
export type InsertLeadershipMember = typeof leadershipMembers.$inferInsert;

/**
 * Blog Posts — managed from admin dashboard, displayed on Updates tab.
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("imageUrl"),
  author: varchar("author", { length: 255 })
    .default("Abhimanyu Mallik")
    .notNull(),
  category: mysqlEnum("category", [
    "education",
    "elderly",
    "csr",
    "announcement",
    "event",
  ]).notNull(),
  tags: varchar("tags", { length: 500 }),
  isPublished: boolean("isPublished").default(true).notNull(),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * YouTube Videos — paste link from admin, auto-embed on public site.
 */
export const youtubeVideos = mysqlTable("youtube_videos", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  youtubeUrl: text("youtubeUrl").notNull(),
  description: text("description"),
  category: mysqlEnum("category", [
    "education",
    "elderly",
    "event",
    "documentary",
    "other",
  ]).notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type YoutubeVideo = typeof youtubeVideos.$inferSelect;
export type InsertYoutubeVideo = typeof youtubeVideos.$inferInsert;

/**
 * Social Media Links — managed from admin, displayed in footer/contact.
 */
export const socialLinks = mysqlTable("social_links", {
  id: int("id").autoincrement().primaryKey(),
  platform: varchar("platform", { length: 100 }).notNull().unique(),
  url: text("url").notNull(),
  label: varchar("label", { length: 255 }),
  isActive: boolean("isActive").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SocialLink = typeof socialLinks.$inferSelect;
export type InsertSocialLink = typeof socialLinks.$inferInsert;

/**
 * Site Settings — key-value store for homepage stats, text snippets, etc.
 * Managed from admin dashboard.
 */
export const siteSettings = mysqlTable("site_settings", {
  id: int("id").autoincrement().primaryKey(),
  settingKey: varchar("settingKey", { length: 255 }).notNull().unique(),
  settingValue: text("settingValue").notNull(),
  label: varchar("label", { length: 500 }),
  category: varchar("category", { length: 100 }).default("general").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;

/**
 * Core Member Applications — people who voluntarily join as core members via the platform.
 */
export const coreMemberApplications = mysqlTable("core_member_applications", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  location: varchar("location", { length: 500 }).notNull(),
  district: varchar("district", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).default("Odisha").notNull(),
  occupation: varchar("occupation", { length: 255 }),
  motivation: text("motivation").notNull(),
  areaOfInterest: mysqlEnum("areaOfInterest", [
    "education",
    "eldercare",
    "community",
    "health",
    "fundraising",
    "technology",
    "fieldwork",
    "other",
  ]).notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected"])
    .default("pending")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  reviewedAt: timestamp("reviewedAt"),
});

export type CoreMemberApplication = typeof coreMemberApplications.$inferSelect;
export type InsertCoreMemberApplication =
  typeof coreMemberApplications.$inferInsert;

/**
 * Donations — tracks donation pledges/payments from the Donate page.
 * When Razorpay is connected, razorpayOrderId and razorpayPaymentId will be populated.
 */
export const donations = mysqlTable("donations", {
  id: int("id").autoincrement().primaryKey(),
  /** Donor's full name */
  donorName: varchar("donorName", { length: 255 }).notNull(),
  /** Donor's email */
  donorEmail: varchar("donorEmail", { length: 320 }).notNull(),
  /** Donor's phone (optional) */
  donorPhone: varchar("donorPhone", { length: 20 }),
  /** Amount in INR (paise for Razorpay, rupees for display) */
  amount: int("amount").notNull(),
  /** Currency code */
  currency: varchar("currency", { length: 10 }).default("INR").notNull(),
  /** Frequency: one-time or monthly */
  frequency: mysqlEnum("frequency", ["one_time", "monthly"])
    .default("one_time")
    .notNull(),
  /** Cause the donor wants to support */
  cause: mysqlEnum("cause", [
    "education",
    "elderly_care",
    "general",
    "vidyapeeth",
    "shiksha_sathi",
    "medical_emergency",
    "disaster_relief",
    "animal_welfare",
  ])
    .default("general")
    .notNull(),
  /** Donor-specified expense category (e.g., Books, Meals, Medicine, Uniforms, etc.) */
  expenseCategory: varchar("expenseCategory", { length: 255 }),
  /** Payment status */
  status: mysqlEnum("donationStatus", [
    "pending",
    "completed",
    "failed",
    "cancelled",
  ])
    .default("pending")
    .notNull(),
  /** Razorpay Order ID (populated when payment gateway is connected) */
  razorpayOrderId: varchar("razorpayOrderId", { length: 255 }),
  /** Razorpay Payment ID (populated after successful payment) */
  razorpayPaymentId: varchar("razorpayPaymentId", { length: 255 }),
  /** Razorpay Subscription ID (for monthly recurring) */
  razorpaySubscriptionId: varchar("razorpaySubscriptionId", { length: 255 }),
  /** Optional message from donor */
  message: text("message"),
  /** PAN number retained only for legacy donor records (optional) */
  panNumber: varchar("panNumber", { length: 20 }),
  /** Whether donor wants to hide their donation amount publicly */
  isAmountAnonymous: boolean("isAmountAnonymous").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Donation = typeof donations.$inferSelect;
export type InsertDonation = typeof donations.$inferInsert;

/**
 * Memorial / Tribute Donations — "Donate in Memory of Someone You Love"
 * Honor loved ones with a meaningful tribute donation.
 * Stores both donor details and honoree (tribute) details.
 */
export const memorialDonations = mysqlTable("memorial_donations", {
  id: int("id").autoincrement().primaryKey(),
  /** Donor's full name */
  donorName: varchar("donorName", { length: 255 }).notNull(),
  /** Donor's email */
  donorEmail: varchar("donorEmail", { length: 320 }).notNull(),
  /** Donor's phone (optional) */
  donorPhone: varchar("donorPhone", { length: 20 }),
  /** Amount in INR */
  amount: int("amount").notNull(),
  /** Currency code */
  currency: varchar("currency", { length: 10 }).default("INR").notNull(),
  /** Cause the donor wants to support */
  cause: mysqlEnum("memorialCause", [
    "education",
    "elderly_care",
    "general",
    "vidyapeeth",
    "shiksha_sathi",
    "medical_emergency",
  ])
    .default("general")
    .notNull(),
  /** Payment status */
  status: mysqlEnum("memorialStatus", [
    "pending",
    "completed",
    "failed",
    "cancelled",
  ])
    .default("pending")
    .notNull(),
  /** Razorpay Order ID (populated when payment gateway is connected) */
  razorpayOrderId: varchar("memRazorpayOrderId", { length: 255 }),
  /** Razorpay Payment ID */
  razorpayPaymentId: varchar("memRazorpayPaymentId", { length: 255 }),
  /** ─── Honoree / Tribute Details ─── */
  /** Name of the person being remembered */
  honoreeName: varchar("honoreeName", { length: 255 }).notNull(),
  /** Relationship of the donor to the honoree */
  relationship: varchar("relationship", { length: 100 }),
  /** Date of passing (optional) */
  dateOfPassing: varchar("dateOfPassing", { length: 20 }),
  /** Personal tribute message */
  tributeMessage: text("tributeMessage"),
  /** Whether to send tribute notification to a family member */
  notifyFamily: boolean("notifyFamily").default(false),
  /** Family member's email (if notifyFamily is true) */
  familyEmail: varchar("familyEmail", { length: 320 }),
  /** PAN number retained only for legacy donor records (optional) */
  panNumber: varchar("panNumber", { length: 20 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MemorialDonation = typeof memorialDonations.$inferSelect;
export type InsertMemorialDonation = typeof memorialDonations.$inferInsert;

/**
 * Occasion Donations — Donate for Birthday / Special Occasion
 * Stores donor details, occasion info, and honoree (celebrant) details.
 */
export const occasionDonations = mysqlTable("occasion_donations", {
  id: int("id").autoincrement().primaryKey(),
  donorName: varchar("donorName", { length: 255 }).notNull(),
  donorEmail: varchar("donorEmail", { length: 320 }).notNull(),
  donorPhone: varchar("donorPhone", { length: 20 }),
  amount: int("amount").notNull(),
  currency: varchar("currency", { length: 10 }).default("INR").notNull(),
  cause: mysqlEnum("occasionCause", [
    "education",
    "elderly_care",
    "general",
    "vidyapeeth",
    "shiksha_sathi",
    "medical_emergency",
  ])
    .default("general")
    .notNull(),
  status: mysqlEnum("occasionStatus", [
    "pending",
    "completed",
    "failed",
    "cancelled",
  ])
    .default("pending")
    .notNull(),
  razorpayOrderId: varchar("occRazorpayOrderId", { length: 255 }),
  razorpayPaymentId: varchar("occRazorpayPaymentId", { length: 255 }),
  /** Occasion type */
  occasion: mysqlEnum("occasion", [
    "birthday",
    "anniversary",
    "wedding",
    "diwali",
    "promotion",
    "graduation",
    "other",
  ])
    .default("birthday")
    .notNull(),
  /** Name of the person being celebrated */
  celebrantName: varchar("celebrantName", { length: 255 }).notNull(),
  /** Occasion date */
  occasionDate: varchar("occasionDate", { length: 20 }),
  /** Relationship to celebrant */
  relationship: varchar("occRelationship", { length: 100 }),
  /** Celebrant's email (to send e-card) */
  celebrantEmail: varchar("celebrantEmail", { length: 320 }),
  /** Celebrant's phone (to send e-card via WhatsApp) */
  celebrantPhone: varchar("celebrantPhone", { length: 20 }),
  /** Personal wishing message */
  wishingMessage: text("wishingMessage"),
  /** PAN number retained only for legacy donor records (optional) */
  panNumber: varchar("occPanNumber", { length: 20 }),
  /** Whether donor wants their occasion shown on the public Celebrate wall */
  isPublicOnWall: boolean("isPublicOnWall").default(false).notNull(),
  /** Whether donor wants an annual reminder for this occasion */
  wantReminder: boolean("wantReminder").default(false).notNull(),
  /** Whether donor wants to hide their donation amount publicly */
  isAmountAnonymous: boolean("isAmountAnonymous").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type OccasionDonation = typeof occasionDonations.$inferSelect;
export type InsertOccasionDonation = typeof occasionDonations.$inferInsert;

/**
 * Fundraising Campaigns — peer-to-peer fundraising.
 * Supporters create their own campaigns (birthday fundraisers, marathon pledges, etc.)
 * and share them to collect donations from friends/family.
 */
export const fundraisingCampaigns = mysqlTable("fundraising_campaigns", {
  id: int("id").autoincrement().primaryKey(),
  /** Campaign creator's name */
  creatorName: varchar("creatorName", { length: 255 }).notNull(),
  /** Campaign creator's email */
  creatorEmail: varchar("creatorEmail", { length: 320 }).notNull(),
  /** Campaign creator's phone */
  creatorPhone: varchar("creatorPhone", { length: 20 }),
  /** Campaign title */
  title: varchar("title", { length: 500 }).notNull(),
  /** Campaign description / story */
  description: text("description").notNull(),
  /** Campaign type */
  campaignType: mysqlEnum("campaignType", [
    "birthday",
    "marathon",
    "wedding",
    "memorial",
    "corporate",
    "school",
    "festival",
    "other",
  ])
    .default("birthday")
    .notNull(),
  /** Cause to support */
  cause: mysqlEnum("campaignCause", [
    "education",
    "elderly_care",
    "general",
    "vidyapeeth",
    "shiksha_sathi",
    "medical_emergency",
  ])
    .default("general")
    .notNull(),
  /** Fundraising goal amount in INR */
  goalAmount: int("goalAmount").notNull(),
  /** Amount raised so far */
  raisedAmount: int("raisedAmount").default(0).notNull(),
  /** Number of donors */
  donorCount: int("donorCount").default(0).notNull(),
  /** Campaign end date */
  endDate: varchar("endDate", { length: 20 }),
  /** Unique slug for shareable URL */
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  /** Campaign status */
  status: mysqlEnum("campaignStatus", ["active", "completed", "cancelled"])
    .default("active")
    .notNull(),
  /** Whether campaign is approved by admin */
  isApproved: boolean("isApproved").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FundraisingCampaign = typeof fundraisingCampaigns.$inferSelect;
export type InsertFundraisingCampaign =
  typeof fundraisingCampaigns.$inferInsert;

/**
 * Campaign Donations — donations made to specific fundraising campaigns.
 */
export const campaignDonations = mysqlTable("campaign_donations", {
  id: int("id").autoincrement().primaryKey(),
  /** Reference to the campaign */
  campaignId: int("campaignId").notNull(),
  /** Donor's name */
  donorName: varchar("campDonorName", { length: 255 }).notNull(),
  /** Donor's email */
  donorEmail: varchar("campDonorEmail", { length: 320 }).notNull(),
  /** Amount in INR */
  amount: int("campDonorAmount").notNull(),
  /** Optional message */
  message: text("campDonorMessage"),
  /** Whether to show on donor wall */
  isAnonymous: boolean("isAnonymous").default(false).notNull(),
  /** Payment status */
  status: mysqlEnum("campDonationStatus", ["pending", "completed", "failed"])
    .default("pending")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CampaignDonation = typeof campaignDonations.$inferSelect;
export type InsertCampaignDonation = typeof campaignDonations.$inferInsert;

/**
 * Donor Profiles — stores donor information for dashboard access.
 * Created automatically when a donor makes their first donation.
 */
export const donorProfiles = mysqlTable("donor_profiles", {
  id: int("id").autoincrement().primaryKey(),
  /** Donor's full name */
  name: varchar("name", { length: 255 }).notNull(),
  /** Donor's email (unique identifier for login) */
  email: varchar("email", { length: 320 }).notNull().unique(),
  /** Donor's phone */
  phone: varchar("phone", { length: 20 }),
  /** PAN number retained only for legacy donor records */
  panNumber: varchar("panNumber", { length: 20 }),
  /** Total amount donated (lifetime) in INR */
  totalDonated: int("totalDonated").default(0).notNull(),
  /** Number of donations made */
  donationCount: int("donationCount").default(0).notNull(),
  /** Access token for dashboard (sent via email) */
  accessToken: varchar("accessToken", { length: 128 }),
  /** Whether the donor has an active monthly subscription */
  isMonthlyDonor: boolean("isMonthlyDonor").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DonorProfile = typeof donorProfiles.$inferSelect;
export type InsertDonorProfile = typeof donorProfiles.$inferInsert;

/**
 * Donor Subscriptions — tracks monthly recurring donation subscriptions.
 */
export const donorSubscriptions = mysqlTable("donor_subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  /** Reference to donor profile */
  donorProfileId: int("donorProfileId").notNull(),
  /** Monthly amount in INR */
  amount: int("amount").notNull(),
  /** Cause for the subscription */
  cause: mysqlEnum("subsCause", [
    "education",
    "elderly_care",
    "general",
    "vidyapeeth",
    "shiksha_sathi",
    "medical_emergency",
  ])
    .default("general")
    .notNull(),
  /** Subscription status */
  status: mysqlEnum("subsStatus", ["active", "paused", "cancelled"])
    .default("active")
    .notNull(),
  /** Razorpay Subscription ID (when connected) */
  razorpaySubscriptionId: varchar("razorpaySubsId", { length: 255 }),
  /** Next billing date */
  nextBillingDate: timestamp("nextBillingDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DonorSubscription = typeof donorSubscriptions.$inferSelect;
export type InsertDonorSubscription = typeof donorSubscriptions.$inferInsert;

/**
 * Testimonials — stores donor/beneficiary/partner testimonials for homepage.
 */
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  /** Name of the person giving testimonial */
  name: varchar("name", { length: 255 }).notNull(),
  /** Role/designation */
  role: varchar("role", { length: 255 }),
  /** Testimonial text */
  content: text("content").notNull(),
  /** Category: donor, beneficiary, partner, volunteer */
  category: mysqlEnum("testimonialCategory", [
    "donor",
    "beneficiary",
    "partner",
    "volunteer",
  ])
    .default("donor")
    .notNull(),
  /** Photo URL (optional) */
  photoUrl: text("photoUrl"),
  /** Rating out of 5 (optional) */
  rating: int("rating").default(5),
  /** Whether to display on homepage */
  isActive: boolean("isActive").default(true).notNull(),
  /** Display order */
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

/**
 * Hero Slides — managed from Data Hub admin, auto-displayed on Home page hero slider.
 * Supports bilingual (English + Odia) titles and subtitles.
 */
export const heroSlides = mysqlTable("hero_slides", {
  id: int("id").autoincrement().primaryKey(),
  /** English title */
  titleEn: varchar("titleEn", { length: 500 }).notNull(),
  /** Odia title */
  titleOd: varchar("titleOd", { length: 500 }),
  /** English subtitle */
  subtitleEn: text("subtitleEn"),
  /** Odia subtitle */
  subtitleOd: text("subtitleOd"),
  /** Background image URL */
  imageUrl: text("imageUrl").notNull(),
  /** CTA button text (English) */
  ctaTextEn: varchar("ctaTextEn", { length: 100 }),
  /** CTA button text (Odia) */
  ctaTextOd: varchar("ctaTextOd", { length: 100 }),
  /** CTA button link */
  ctaHref: varchar("ctaHref", { length: 500 }),
  /** Accent color for this slide (hex) */
  accentColor: varchar("accentColor", { length: 20 }).default("#C9A84C"),
  /** Display order (lower = first) */
  sortOrder: int("sortOrder").default(0).notNull(),
  /** Whether this slide is active */
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HeroSlide = typeof heroSlides.$inferSelect;
export type InsertHeroSlide = typeof heroSlides.$inferInsert;

/**
 * Banners — promotional/announcement banners that can be placed on specific pages.
 * Managed from Data Hub admin, auto-displayed on assigned pages.
 */
export const banners = mysqlTable("banners", {
  id: int("id").autoincrement().primaryKey(),
  /** Banner title (internal reference) */
  title: varchar("title", { length: 500 }).notNull(),
  /** Banner image URL */
  imageUrl: text("imageUrl").notNull(),
  /** Optional link when banner is clicked */
  linkUrl: text("linkUrl"),
  /** Which page(s) to show this banner on (comma-separated: home, donate, programs, all) */
  pagePlacement: varchar("pagePlacement", { length: 500 })
    .default("home")
    .notNull(),
  /** Position on page: top (below navbar), middle (between sections), bottom (above footer) */
  position: mysqlEnum("bannerPosition", ["top", "middle", "bottom"])
    .default("top")
    .notNull(),
  /** Whether this banner is active */
  isActive: boolean("isActive").default(true).notNull(),
  /** Start date for time-limited banners (null = always show) */
  startDate: timestamp("startDate"),
  /** End date for time-limited banners (null = no end) */
  endDate: timestamp("endDate"),
  /** Display order */
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Banner = typeof banners.$inferSelect;
export type InsertBanner = typeof banners.$inferInsert;

/**
 * Site Images — single flat media library for all website images.
 * Every image on the website is fetched from this table.
 * Categories help the website know where to display each image.
 * The "slot" field allows specific placement (e.g. "hero-slide-1", "founder-photo").
 */
export const siteImages = mysqlTable("site_images", {
  id: int("id").autoincrement().primaryKey(),
  /** CDN URL of the image */
  url: text("url").notNull(),
  /** Human-readable filename or title */
  title: varchar("title", { length: 500 }).notNull(),
  /** Alt text for accessibility */
  alt: varchar("alt", { length: 500 }).default("").notNull(),
  /** Category tag: hero, education, elderly-care, team, gallery, brand, news, animal-welfare, child-home, csr, health, environment, arts-culture, disaster-relief */
  category: varchar("category", { length: 100 }).notNull(),
  /** Optional page-specific slot for precise placement (e.g. "home-hero-1", "team-abhimanyu", "programs-education-main") */
  slot: varchar("slot", { length: 200 }),
  /** Optional caption or description */
  caption: text("caption"),
  /** Optional attribution/credit */
  attribution: varchar("attribution", { length: 500 }),
  /** Optional location info */
  location: varchar("location", { length: 500 }),
  /** Media type: image or video */
  mediaType: mysqlEnum("mediaType", ["image", "video"])
    .default("image")
    .notNull(),
  /** For videos: thumbnail URL */
  thumbnailUrl: text("thumbnailUrl"),
  /** Display order within category */
  sortOrder: int("sortOrder").default(0).notNull(),
  /** Whether this image is active/visible */
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type SiteImage = typeof siteImages.$inferSelect;
export type InsertSiteImage = typeof siteImages.$inferInsert;
