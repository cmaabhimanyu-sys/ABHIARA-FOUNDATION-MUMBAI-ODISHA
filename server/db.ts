import { eq, desc } from "drizzle-orm";
import crypto from "crypto";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, newsletterSubscribers, contactInquiries, InsertContactInquiry, volunteerSubmissions, InsertVolunteerSubmission, coreMemberApplications, InsertCoreMemberApplication, donations, InsertDonation, memorialDonations, InsertMemorialDonation, occasionDonations, InsertOccasionDonation, fundraisingCampaigns, InsertFundraisingCampaign, campaignDonations, InsertCampaignDonation } from "../drizzle/schema.js";
import { ENV } from './_core/env.js';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ===== Newsletter Subscribers =====

export async function addNewsletterSubscriber(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.insert(newsletterSubscribers).values({ email }).onDuplicateKeyUpdate({
      set: { isActive: true },
    });
    return { success: true };
  } catch (error) {
    console.error("[Database] Failed to add newsletter subscriber:", error);
    throw error;
  }
}

// ===== Contact Inquiries =====

export async function createContactInquiry(inquiry: InsertContactInquiry) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.insert(contactInquiries).values(inquiry);
    return { success: true };
  } catch (error) {
    console.error("[Database] Failed to create contact inquiry:", error);
    throw error;
  }
}

export async function getContactInquiries() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(contactInquiries).orderBy(contactInquiries.createdAt);
}

export async function getNewsletterSubscribers() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(newsletterSubscribers).orderBy(newsletterSubscribers.subscribedAt);
}

// ===== Volunteer Submissions (Be The Change) =====

export async function createVolunteerSubmission(submission: InsertVolunteerSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.insert(volunteerSubmissions).values(submission);
    return { success: true };
  } catch (error) {
    console.error("[Database] Failed to create volunteer submission:", error);
    throw error;
  }
}

// ===== Core Member Applications (Join as Core Member) =====

export async function createCoreMemberApplication(application: InsertCoreMemberApplication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.insert(coreMemberApplications).values(application);
    return { success: true };
  } catch (error) {
    console.error("[Database] Failed to create core member application:", error);
    throw error;
  }
}

export async function getCoreMemberApplications() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(coreMemberApplications).orderBy(coreMemberApplications.createdAt);
}

export async function updateCoreMemberApplicationStatus(id: number, status: "pending" | "approved" | "rejected") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(coreMemberApplications)
    .set({ status, reviewedAt: new Date() })
    .where(eq(coreMemberApplications.id, id));
  return { success: true };
}

// ===== Donations =====

export async function createDonation(donation: InsertDonation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(donations).values(donation);
    return { success: true, id: result[0].insertId };
  } catch (error) {
    console.error("[Database] Failed to create donation:", error);
    throw error;
  }
}

export async function getDonations() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(donations).orderBy(donations.createdAt);
}

export async function getDonationPaymentRecord(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db
    .select({ id: donations.id, razorpayOrderId: donations.razorpayOrderId, status: donations.status })
    .from(donations)
    .where(eq(donations.id, id))
    .limit(1);
  return result[0];
}

export async function getMemorialDonationPaymentRecord(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db
    .select({ id: memorialDonations.id, razorpayOrderId: memorialDonations.razorpayOrderId, status: memorialDonations.status })
    .from(memorialDonations)
    .where(eq(memorialDonations.id, id))
    .limit(1);
  return result[0];
}

export async function getOccasionDonationPaymentRecord(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db
    .select({ id: occasionDonations.id, razorpayOrderId: occasionDonations.razorpayOrderId, status: occasionDonations.status })
    .from(occasionDonations)
    .where(eq(occasionDonations.id, id))
    .limit(1);
  return result[0];
}

export async function updateMemorialDonationStatus(id: number, status: "pending" | "completed" | "failed" | "cancelled", paymentId?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: Record<string, unknown> = { status };
  if (paymentId) updateData.razorpayPaymentId = paymentId;
  await db.update(memorialDonations).set(updateData).where(eq(memorialDonations.id, id));
  return { success: true };
}

export async function updateOccasionDonationStatus(id: number, status: "pending" | "completed" | "failed" | "cancelled", paymentId?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: Record<string, unknown> = { status };
  if (paymentId) updateData.razorpayPaymentId = paymentId;
  await db.update(occasionDonations).set(updateData).where(eq(occasionDonations.id, id));
  return { success: true };
}

export async function updateDonationStatus(id: number, status: "pending" | "completed" | "failed" | "cancelled", paymentId?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: Record<string, unknown> = { status };
  if (paymentId) updateData.razorpayPaymentId = paymentId;

  await db.update(donations).set(updateData).where(eq(donations.id, id));
  return { success: true };
}

// ===== Memorial / Tribute Donations =====

export async function createMemorialDonation(donation: InsertMemorialDonation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(memorialDonations).values(donation);
    return { success: true, id: result[0].insertId };
  } catch (error) {
    console.error("[Database] Failed to create memorial donation:", error);
    throw error;
  }
}

export async function getMemorialDonations() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(memorialDonations).orderBy(memorialDonations.createdAt);
}

/* ─── Occasion Donations (Birthday / Special Occasion) ─── */
export async function createOccasionDonation(data: InsertOccasionDonation) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  try {
    const result = await db.insert(occasionDonations).values(data);
    return { success: true, id: result[0].insertId };
  } catch (error) {
    console.error("[Database] Failed to create occasion donation:", error);
    throw error;
  }
}

export async function getOccasionDonations() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(occasionDonations).orderBy(occasionDonations.createdAt);
}

// ===== Fundraising Campaigns =====

export async function createFundraisingCampaign(campaign: InsertFundraisingCampaign) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(fundraisingCampaigns).values(campaign);
    return { success: true, id: result[0].insertId };
  } catch (error) {
    console.error("[Database] Failed to create fundraising campaign:", error);
    throw error;
  }
}

export async function getFundraisingCampaigns(onlyApproved = true) {
  const db = await getDb();
  if (!db) return [];

  if (onlyApproved) {
    return db.select().from(fundraisingCampaigns)
      .where(eq(fundraisingCampaigns.isApproved, true))
      .orderBy(fundraisingCampaigns.createdAt);
  }
  return db.select().from(fundraisingCampaigns).orderBy(fundraisingCampaigns.createdAt);
}

export async function getFundraisingCampaignBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;

  const results = await db.select().from(fundraisingCampaigns)
    .where(eq(fundraisingCampaigns.slug, slug));
  return results[0] || null;
}

export async function updateCampaignRaisedAmount(campaignId: number, additionalAmount: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const campaign = await db.select().from(fundraisingCampaigns).where(eq(fundraisingCampaigns.id, campaignId));
  if (!campaign[0]) throw new Error("Campaign not found");

  await db.update(fundraisingCampaigns)
    .set({
      raisedAmount: campaign[0].raisedAmount + additionalAmount,
      donorCount: campaign[0].donorCount + 1,
    })
    .where(eq(fundraisingCampaigns.id, campaignId));
  return { success: true };
}

// ===== Campaign Donations =====

export async function createCampaignDonation(donation: InsertCampaignDonation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(campaignDonations).values(donation);
    return { success: true, id: result[0].insertId };
  } catch (error) {
    console.error("[Database] Failed to create campaign donation:", error);
    throw error;
  }
}

export async function getCampaignDonations(campaignId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(campaignDonations)
    .where(eq(campaignDonations.campaignId, campaignId))
    .orderBy(campaignDonations.createdAt);
}

// ===== Donor Wall — aggregates all completed donations for public display =====

export async function getDonorWallEntries(limit = 50) {
  const db = await getDb();
  if (!db) return [];

  // Get recent completed donations (anonymized)
  const recentDonations = await db.select({
    donorName: donations.donorName,
    amount: donations.amount,
    cause: donations.cause,
    createdAt: donations.createdAt,
  }).from(donations)
    .where(eq(donations.status, "completed"))
    .orderBy(donations.createdAt)
    .limit(limit);

  return recentDonations;
}

export async function getDonationStats() {
  const db = await getDb();
  if (!db) return { totalDonors: 0, totalAmount: 0, totalCampaigns: 0 };

  const allDonations = await db.select({
    amount: donations.amount,
    status: donations.status,
  }).from(donations);

  const completed = allDonations.filter(d => d.status === "completed");
  const pending = allDonations.filter(d => d.status === "pending");
  const all = [...completed, ...pending];

  return {
    totalDonors: all.length,
    totalAmount: all.reduce((sum, d) => sum + d.amount, 0),
    totalCampaigns: 0,
  };
}


// ===== Donor Profiles =====
import { donorProfiles, InsertDonorProfile, donorSubscriptions, InsertDonorSubscription, testimonials, InsertTestimonial } from "../drizzle/schema.js";

export async function getOrCreateDonorProfile(data: { name: string; email: string; phone?: string; panNumber?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if profile exists
  const existing = await db.select().from(donorProfiles).where(eq(donorProfiles.email, data.email)).limit(1);
  if (existing.length > 0) {
    return existing[0];
  }

  // Create new profile with access token
  const accessToken = crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
  await db.insert(donorProfiles).values({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    panNumber: data.panNumber || null,
    accessToken,
  });

  const created = await db.select().from(donorProfiles).where(eq(donorProfiles.email, data.email)).limit(1);
  return created[0];
}

export async function getDonorProfileByToken(token: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(donorProfiles).where(eq(donorProfiles.accessToken, token)).limit(1);
  return result[0] || null;
}

export async function getDonorProfileByEmail(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(donorProfiles).where(eq(donorProfiles.email, email)).limit(1);
  return result[0] || null;
}

export async function updateDonorProfileStats(email: string, amount: number) {
  const db = await getDb();
  if (!db) return;
  const profile = await getDonorProfileByEmail(email);
  if (profile) {
    await db.update(donorProfiles)
      .set({
        totalDonated: profile.totalDonated + amount,
        donationCount: profile.donationCount + 1,
      })
      .where(eq(donorProfiles.email, email));
  }
}

export async function getDonorDonations(email: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(donations).where(eq(donations.donorEmail, email)).orderBy(desc(donations.createdAt));
}

export async function getDonorSubscriptions(donorProfileId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(donorSubscriptions).where(eq(donorSubscriptions.donorProfileId, donorProfileId));
}

export async function createDonorSubscription(data: { donorProfileId: number; amount: number; cause: "education" | "elderly_care" | "general" | "vidyapeeth" | "medical_emergency" }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(donorSubscriptions).values({
    donorProfileId: data.donorProfileId,
    amount: data.amount,
    cause: data.cause,
  });
  // Update donor profile to mark as monthly donor
  await db.update(donorProfiles)
    .set({ isMonthlyDonor: true })
    .where(eq(donorProfiles.id, data.donorProfileId));
}

export async function cancelDonorSubscription(subscriptionId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(donorSubscriptions)
    .set({ status: "cancelled" })
    .where(eq(donorSubscriptions.id, subscriptionId));
}

// ===== Testimonials =====
export async function getActiveTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).where(eq(testimonials.isActive, true)).orderBy(testimonials.sortOrder);
}

export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
}

export async function createTestimonial(data: Omit<InsertTestimonial, "id" | "createdAt">) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(testimonials).values(data);
}

export async function updateTestimonial(id: number, data: Partial<InsertTestimonial>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(testimonials).set(data).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

// ===== Celebrate With Purpose — Public Wall =====

export async function getCelebrateWallEntries(limit = 50) {
  const db = await getDb();
  if (!db) return [];

  // Get occasion donations that opted into the public wall
  return db.select({
    id: occasionDonations.id,
    donorName: occasionDonations.donorName,
    amount: occasionDonations.amount,
    isAmountAnonymous: occasionDonations.isAmountAnonymous,
    cause: occasionDonations.cause,
    occasion: occasionDonations.occasion,
    celebrantName: occasionDonations.celebrantName,
    occasionDate: occasionDonations.occasionDate,
    relationship: occasionDonations.relationship,
    wishingMessage: occasionDonations.wishingMessage,
    createdAt: occasionDonations.createdAt,
  }).from(occasionDonations)
    .where(eq(occasionDonations.isPublicOnWall, true))
    .orderBy(desc(occasionDonations.createdAt))
    .limit(limit);
}

// ===== Occasion Reminders — get upcoming reminders for notification =====

export async function getUpcomingOccasionReminders() {
  const db = await getDb();
  if (!db) return [];

  // Get all occasion donations that opted into reminders
  return db.select({
    id: occasionDonations.id,
    donorName: occasionDonations.donorName,
    donorEmail: occasionDonations.donorEmail,
    celebrantName: occasionDonations.celebrantName,
    occasion: occasionDonations.occasion,
    occasionDate: occasionDonations.occasionDate,
    amount: occasionDonations.amount,
    cause: occasionDonations.cause,
  }).from(occasionDonations)
    .where(eq(occasionDonations.wantReminder, true));
}
