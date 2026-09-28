import { donations, memorialDonations, occasionDonations } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies.js";
import { systemRouter } from "./_core/systemRouter.js";
import { adminProcedure, publicProcedure, router } from "./_core/trpc.js";
import { addNewsletterSubscriber, createContactInquiry, createVolunteerSubmission, createCoreMemberApplication, getCoreMemberApplications, updateCoreMemberApplicationStatus, createDonation, getDonations, updateDonationStatus, updateMemorialDonationStatus, updateOccasionDonationStatus, createMemorialDonation, getMemorialDonations, createOccasionDonation, getOccasionDonations, createFundraisingCampaign, getFundraisingCampaigns, getFundraisingCampaignBySlug, createCampaignDonation, getCampaignDonations, updateCampaignRaisedAmount, getDonorWallEntries, getDonationStats, getActiveTestimonials, getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, getCelebrateWallEntries, getDb, getDonationPaymentRecord, getMemorialDonationPaymentRecord, getOccasionDonationPaymentRecord } from "./db.js";
import { notifyOwner } from "./_core/notification.js";
import { cmsRouter } from "./cms-router.js";
import { paymentOrderMatches, verifyRazorpayPaymentSignature } from "./paymentSecurity.js";
import { sdk } from "./_core/sdk.js";
import { z } from "zod";
import { DONATION_CAUSE_LABELS, DONATION_CAUSE_VALUES } from "../shared/donationCauses.js";

const donationCauseSchema = z.enum(DONATION_CAUSE_VALUES);

export const appRouter = router({
  system: systemRouter,
  cms: cmsRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    createAdminRelay: adminProcedure
      .input(
        z.object({
          nonce: z.string().min(16).max(128),
          returnPath: z.string().startsWith("/admin").max(160),
        })
      )
      .mutation(async ({ ctx, input }) => ({
        relayToken: await sdk.createAdminRelayToken(
          ctx.user.openId,
          input.nonce,
          input.returnPath
        ),
        finalizeUrl: "https://www.abhiarafoundation.org/api/oauth/admin-relay",
      })),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        const result = await addNewsletterSubscriber(input.email);
        // Notify owner about new subscriber
        await notifyOwner({
          title: "New Newsletter Subscriber",
          content: `New email subscription: ${input.email}`,
        }).catch(() => {}); // Don't fail if notification fails
        return result;
      }),
  }),

  volunteer: router({
    submit: publicProcedure
      .input(
        z.object({
          fullName: z.string().min(1, "Full name is required"),
          qualification: z.string().min(1, "Qualification is required"),
          email: z.string().email("Valid email is required"),
          socialProfile: z.string().min(1, "Social profile is required"),
          areaOfInterest: z.enum(["education", "eldercare", "csr", "finance", "technology", "fieldwork", "other"]),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createVolunteerSubmission(input);
        // Notify owner about new volunteer submission
        await notifyOwner({
          title: "New Volunteer — Be The Change",
          content: `Name: ${input.fullName}\nQualification: ${input.qualification}\nEmail: ${input.email}\nSocial Profile: ${input.socialProfile}\nArea of Interest: ${input.areaOfInterest}\nSubmitted: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
        }).catch(() => {});
        return result;
      }),
  }),

  coreMember: router({
    list: adminProcedure.query(async () => {
      return getCoreMemberApplications();
    }),
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "approved", "rejected"]),
      }))
      .mutation(async ({ input }) => {
        return updateCoreMemberApplicationStatus(input.id, input.status);
      }),
    submit: publicProcedure
      .input(
        z.object({
          fullName: z.string().min(1, "Full name is required"),
          email: z.string().email("Valid email is required"),
          phone: z.string().min(1, "Phone number is required"),
          location: z.string().min(1, "Location is required"),
          state: z.string().min(1, "State is required"),
          district: z.string().min(1, "District is required"),
          occupation: z.string().optional(),
          motivation: z.string().min(10, "Please share your motivation"),
          areaOfInterest: z.enum(["education", "eldercare", "community", "health", "fundraising", "technology", "fieldwork", "other"]),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createCoreMemberApplication(input);
        await notifyOwner({
          title: "New Core Member Application",
          content: `Name: ${input.fullName}\nEmail: ${input.email}\nPhone: ${input.phone}\nLocation: ${input.location}, ${input.district}, ${input.state}\nOccupation: ${input.occupation || "N/A"}\nArea: ${input.areaOfInterest}\nMotivation: ${input.motivation}\nTime: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
        }).catch(() => {});
        return result;
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Valid email is required"),
          subject: z.string().optional(),
          message: z.string().min(1, "Message is required"),
          type: z.enum(["general", "csr_partnership", "volunteer", "media", "donation", "birthday", "team", "other"]).default("general"),
          pageSource: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createContactInquiry(input);
        // Notify owner about new inquiry
        await notifyOwner({
          title: `New Contact: ${input.type === "csr_partnership" ? "CSR Partnership" : input.type}`,
          content: `From: ${input.name} (${input.email})\nType: ${input.type}\nPage: ${input.pageSource || "N/A"}\nSubject: ${input.subject || "N/A"}\nMessage: ${input.message}\nTime: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
        }).catch(() => {});
        return result;
      }),
  }),

  donation: router({
    create: publicProcedure
      .input(
        z.object({
          donorName: z.string().min(1, "Name is required"),
          donorEmail: z.string().email("Valid email is required"),
          donorPhone: z.string().optional(),
          amount: z.number().min(100, "Minimum donation is ₹100"),
          frequency: z.enum(["one_time", "monthly"]).default("one_time"),
          cause: donationCauseSchema.default("general"),
          expenseCategory: z.string().optional(),
          message: z.string().optional(),
          panNumber: z.string().optional(),
          isAmountAnonymous: z.boolean().default(false),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createDonation(input);
        // Notify owner about new donation pledge
        const frequencyLabel = input.frequency === "monthly" ? "Monthly" : "One-Time";
        const causeLabel = DONATION_CAUSE_LABELS[input.cause];
        await notifyOwner({
          title: `New Donation Pledge — ₹${input.amount.toLocaleString("en-IN")} (${frequencyLabel})`,
          content: `Donor: ${input.donorName}\nEmail: ${input.donorEmail}\nPhone: ${input.donorPhone || "N/A"}\nAmount: ₹${input.amount.toLocaleString("en-IN")}\nFrequency: ${frequencyLabel}\nCause: ${causeLabel}\nPAN: ${input.panNumber || "N/A"}\nMessage: ${input.message || "N/A"}\nTime: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
        }).catch(() => {});
        return result;
      }),
    list: adminProcedure.query(async () => {
      return getDonations();
    }),
    stats: publicProcedure.query(async () => {
      const donations = await getDonations();
      const totalAmount = donations.reduce((sum: number, d: any) => sum + (d.amount || 0), 0);
      const uniqueEmails = new Set(donations.map((d: any) => d.donorEmail));
      return { totalAmount, totalDonors: uniqueEmails.size, totalDonations: donations.length };
    }),
    createOrder: publicProcedure
      .input(
        z.object({
          amount: z.number().min(100, "Minimum donation is ₹100"),
          donorName: z.string().min(1),
          donorEmail: z.string().email(),
          donorPhone: z.string().optional(),
          cause: donationCauseSchema.default("general"),
          frequency: z.literal("one_time").default("one_time"),
          message: z.string().optional(),
          isAmountAnonymous: z.boolean().default(false),
          expenseCategory: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keyId || !keySecret) throw new Error("Razorpay not configured");

        // Create donation record first (status: pending)
        const donationResult = await createDonation({
          ...input,
          status: "pending" as any,
        });

        // Create Razorpay order
        const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
          },
          body: JSON.stringify({
            amount: input.amount * 100, // Razorpay expects paise
            currency: "INR",
            receipt: `donation_${donationResult.id}`,
            notes: {
              donorName: input.donorName,
              donorEmail: input.donorEmail,
              cause: input.cause,
              donationId: String(donationResult.id),
            },
          }),
        });

        if (!orderRes.ok) {
          const err = await orderRes.text();
          console.error("[Razorpay] Order creation failed:", err);
          throw new Error("Failed to create payment order");
        }

        const order = await orderRes.json();

        // Update donation with Razorpay order ID
        const db = await getDb();
        if (db) {
          await db.update(donations).set({ razorpayOrderId: order.id }).where(eq(donations.id, donationResult.id));
        }

        return {
          orderId: order.id,
          donationId: donationResult.id,
          amount: input.amount,
          currency: "INR",
          keyId,
        };
      }),
    verifyPayment: publicProcedure
      .input(
        z.object({
          razorpay_order_id: z.string(),
          razorpay_payment_id: z.string(),
          razorpay_signature: z.string(),
          donationId: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keySecret) throw new Error("Razorpay not configured");

        const donation = await getDonationPaymentRecord(input.donationId);
        if (!donation || !paymentOrderMatches(donation.razorpayOrderId, input.razorpay_order_id)) {
          throw new Error("Payment verification failed");
        }

        if (!verifyRazorpayPaymentSignature(input.razorpay_order_id, input.razorpay_payment_id, input.razorpay_signature, keySecret)) {
          throw new Error("Payment verification failed");
        }

        // Mark donation as completed
        await updateDonationStatus(input.donationId, "completed", input.razorpay_payment_id);

        // Notify owner
        await notifyOwner({
          title: `Payment Received — ₹ (Razorpay)`,
          content: `Donation #${input.donationId} payment confirmed.\nRazorpay Payment ID: ${input.razorpay_payment_id}\nOrder ID: ${input.razorpay_order_id}\nTime: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
        }).catch(() => {});

        return { success: true, paymentId: input.razorpay_payment_id };
      }),
  }),

  memorialDonation: router({
    create: publicProcedure
      .input(
        z.object({
          donorName: z.string().min(1, "Name is required"),
          donorEmail: z.string().email("Valid email is required"),
          donorPhone: z.string().optional(),
          amount: z.number().min(100, "Minimum donation is \u20B9100"),
          cause: z.enum(["education", "elderly_care", "general", "vidyapeeth", "shiksha_sathi", "medical_emergency"]).default("general"),
          honoreeName: z.string().min(1, "Honoree name is required"),
          relationship: z.string().optional(),
          dateOfPassing: z.string().optional(),
          tributeMessage: z.string().optional(),
          notifyFamily: z.boolean().default(false),
          familyEmail: z.string().email().optional(),
          panNumber: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createMemorialDonation(input);
        const causeLabel = input.cause === "education" ? "Education" : input.cause === "elderly_care" ? "Elderly Care" : input.cause === "vidyapeeth" ? "Vidyapeeth" : "General";
        await notifyOwner({
          title: `Memorial Donation \u2014 \u20B9${input.amount.toLocaleString("en-IN")} in memory of ${input.honoreeName}`,
          content: `TRIBUTE DONATION\n\nIn Memory of: ${input.honoreeName}\nRelationship: ${input.relationship || "N/A"}\nDate of Passing: ${input.dateOfPassing || "N/A"}\nTribute Message: ${input.tributeMessage || "N/A"}\n\nDonor: ${input.donorName}\nEmail: ${input.donorEmail}\nPhone: ${input.donorPhone || "N/A"}\nAmount: \u20B9${input.amount.toLocaleString("en-IN")}\nCause: ${causeLabel}\nPAN: ${input.panNumber || "N/A"}\nNotify Family: ${input.notifyFamily ? "Yes (" + input.familyEmail + ")" : "No"}\nTime: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
        }).catch(() => {});
        return result;
      }),
    list: adminProcedure.query(async () => {
      return getMemorialDonations();
    }),
    createOrder: publicProcedure
      .input(z.object({
        donorName: z.string().min(1),
        donorEmail: z.string().email(),
        donorPhone: z.string().optional(),
        amount: z.number().min(100),
        cause: z.enum(["education", "elderly_care", "general", "vidyapeeth", "shiksha_sathi", "medical_emergency"]).default("general"),
        honoreeName: z.string().min(1),
        relationship: z.string().optional(),
        dateOfPassing: z.string().optional(),
        tributeMessage: z.string().optional(),
        notifyFamily: z.boolean().default(false),
        familyEmail: z.string().optional(),
        panNumber: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keyId || !keySecret) throw new Error("Razorpay not configured");
        const result = await createMemorialDonation(input);
        const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64") },
          body: JSON.stringify({ amount: input.amount * 100, currency: "INR", receipt: `memorial_${result.id}`, notes: { type: "memorial", honoreeName: input.honoreeName, donorName: input.donorName } }),
        });
        if (!orderRes.ok) throw new Error("Failed to create payment order");
        const order = await orderRes.json();
        const db = await getDb();
        if (db) await db.update(memorialDonations).set({ razorpayOrderId: order.id }).where(eq(memorialDonations.id, result.id));
        return { orderId: order.id, donationId: result.id, amount: input.amount, currency: "INR", keyId };
      }),
    verifyPayment: publicProcedure
      .input(z.object({ razorpay_order_id: z.string(), razorpay_payment_id: z.string(), razorpay_signature: z.string(), donationId: z.number() }))
      .mutation(async ({ input }) => {
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keySecret) throw new Error("Razorpay not configured");
        const donation = await getMemorialDonationPaymentRecord(input.donationId);
        if (!donation || !paymentOrderMatches(donation.razorpayOrderId, input.razorpay_order_id)) throw new Error("Payment verification failed");
        if (!verifyRazorpayPaymentSignature(input.razorpay_order_id, input.razorpay_payment_id, input.razorpay_signature, keySecret)) throw new Error("Payment verification failed");
        await updateMemorialDonationStatus(input.donationId, "completed", input.razorpay_payment_id);
        await notifyOwner({ title: "Memorial Donation Payment Received", content: `Memorial Donation #${input.donationId} confirmed. Payment ID: ${input.razorpay_payment_id}` }).catch(() => {});
        return { success: true, paymentId: input.razorpay_payment_id };
      }),
  }),

  occasionDonation: router({
    create: publicProcedure
      .input(
        z.object({
          donorName: z.string().min(1, "Name is required"),
          donorEmail: z.string().email("Valid email is required"),
          donorPhone: z.string().optional(),
          amount: z.number().min(100, "Minimum donation is ₹100"),
          cause: z.enum(["education", "elderly_care", "general", "vidyapeeth", "shiksha_sathi", "medical_emergency"]).default("general"),
          occasion: z.enum(["birthday", "anniversary", "wedding", "diwali", "promotion", "graduation", "other"]).default("birthday"),
          celebrantName: z.string().min(1, "Celebrant name is required"),
          occasionDate: z.string().optional(),
          relationship: z.string().optional(),
          celebrantEmail: z.string().email().optional().or(z.literal('')),
          celebrantPhone: z.string().optional(),
          wishingMessage: z.string().optional(),
          panNumber: z.string().optional(),
          isPublicOnWall: z.boolean().default(false),
          wantReminder: z.boolean().default(false),
          isAmountAnonymous: z.boolean().default(false),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createOccasionDonation(input);
        const causeLabel = input.cause === "education" ? "Education" : input.cause === "elderly_care" ? "Elderly Care" : input.cause === "vidyapeeth" ? "Vidyapeeth" : input.cause === "medical_emergency" ? "Medical Emergency" : "General";
        const occasionLabel = input.occasion.charAt(0).toUpperCase() + input.occasion.slice(1);
        await notifyOwner({
          title: `Occasion Donation — ₹${input.amount.toLocaleString("en-IN")} for ${input.celebrantName}'s ${occasionLabel}`,
          content: `OCCASION DONATION\n\nOccasion: ${occasionLabel}\nCelebrant: ${input.celebrantName}\nOccasion Date: ${input.occasionDate || "N/A"}\nRelationship: ${input.relationship || "N/A"}\nWishing Message: ${input.wishingMessage || "N/A"}\nCelebrant Email: ${input.celebrantEmail || "N/A"}\nCelebrant Phone: ${input.celebrantPhone || "N/A"}\n\nDonor: ${input.donorName}\nEmail: ${input.donorEmail}\nPhone: ${input.donorPhone || "N/A"}\nAmount: ₹${input.amount.toLocaleString("en-IN")}\nCause: ${causeLabel}\nPAN: ${input.panNumber || "N/A"}\nTime: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
        }).catch(() => {});
        return result;
      }),
    list: adminProcedure.query(async () => {
      return getOccasionDonations();
    }),
    createOrder: publicProcedure
      .input(z.object({
        donorName: z.string().min(1),
        donorEmail: z.string().email(),
        donorPhone: z.string().optional(),
        amount: z.number().min(100),
        cause: z.enum(["education", "elderly_care", "general", "vidyapeeth", "shiksha_sathi", "medical_emergency"]).default("general"),
        occasion: z.enum(["birthday", "anniversary", "wedding", "diwali", "promotion", "graduation", "other"]).default("birthday"),
        celebrantName: z.string().min(1),
        occasionDate: z.string().optional(),
        relationship: z.string().optional(),
        celebrantEmail: z.string().optional(),
        celebrantPhone: z.string().optional(),
        wishingMessage: z.string().optional(),
        panNumber: z.string().optional(),
        isPublicOnWall: z.boolean().default(false),
        wantReminder: z.boolean().default(false),
        isAmountAnonymous: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keyId || !keySecret) throw new Error("Razorpay not configured");
        const result = await createOccasionDonation(input);
        const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64") },
          body: JSON.stringify({ amount: input.amount * 100, currency: "INR", receipt: `occasion_${result.id}`, notes: { type: "occasion", occasion: input.occasion, celebrantName: input.celebrantName, donorName: input.donorName } }),
        });
        if (!orderRes.ok) throw new Error("Failed to create payment order");
        const order = await orderRes.json();
        const db = await getDb();
        if (db) await db.update(occasionDonations).set({ razorpayOrderId: order.id }).where(eq(occasionDonations.id, result.id));
        return { orderId: order.id, donationId: result.id, amount: input.amount, currency: "INR", keyId };
      }),
    verifyPayment: publicProcedure
      .input(z.object({ razorpay_order_id: z.string(), razorpay_payment_id: z.string(), razorpay_signature: z.string(), donationId: z.number() }))
      .mutation(async ({ input }) => {
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keySecret) throw new Error("Razorpay not configured");
        const donation = await getOccasionDonationPaymentRecord(input.donationId);
        if (!donation || !paymentOrderMatches(donation.razorpayOrderId, input.razorpay_order_id)) throw new Error("Payment verification failed");
        if (!verifyRazorpayPaymentSignature(input.razorpay_order_id, input.razorpay_payment_id, input.razorpay_signature, keySecret)) throw new Error("Payment verification failed");
        await updateOccasionDonationStatus(input.donationId, "completed", input.razorpay_payment_id);
        await notifyOwner({ title: "Occasion Donation Payment Received", content: `Occasion Donation #${input.donationId} confirmed. Payment ID: ${input.razorpay_payment_id}` }).catch(() => {});
        return { success: true, paymentId: input.razorpay_payment_id };
      }),
  }),

  // ===== Fundraising Campaigns (Peer-to-Peer) =====
  campaign: router({
    create: publicProcedure
      .input(
        z.object({
          creatorName: z.string().min(1, "Name is required"),
          creatorEmail: z.string().email("Valid email is required"),
          creatorPhone: z.string().optional(),
          title: z.string().min(5, "Campaign title must be at least 5 characters"),
          description: z.string().min(20, "Please describe your campaign in at least 20 characters"),
          campaignType: z.enum(["birthday", "marathon", "wedding", "memorial", "corporate", "school", "festival", "other"]).default("birthday"),
          cause: z.enum(["education", "elderly_care", "general", "vidyapeeth", "shiksha_sathi", "medical_emergency"]).default("general"),
          goalAmount: z.number().min(1000, "Minimum goal is ₹1,000"),
          endDate: z.string().optional(),
          slug: z.string().min(3).max(100),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createFundraisingCampaign(input);
        await notifyOwner({
          title: `New Fundraising Campaign — ${input.title}`,
          content: `NEW CAMPAIGN CREATED\n\nTitle: ${input.title}\nType: ${input.campaignType}\nGoal: ₹${input.goalAmount.toLocaleString("en-IN")}\nCause: ${input.cause}\nCreator: ${input.creatorName}\nEmail: ${input.creatorEmail}\nPhone: ${input.creatorPhone || "N/A"}\nEnd Date: ${input.endDate || "No end date"}\nSlug: ${input.slug}\n\nPlease review and approve this campaign from the admin panel.`,
        }).catch(() => {});
        return result;
      }),
    list: publicProcedure.query(async () => {
      const campaigns = await getFundraisingCampaigns(true);
      return campaigns.map(({ creatorEmail: _creatorEmail, creatorPhone: _creatorPhone, ...campaign }) => campaign);
    }),
    listAll: adminProcedure.query(async () => {
      return getFundraisingCampaigns(false);
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const campaign = await getFundraisingCampaignBySlug(input.slug);
        if (!campaign || !campaign.isApproved) return null;
        const { creatorEmail: _creatorEmail, creatorPhone: _creatorPhone, ...publicCampaign } = campaign;
        return publicCampaign;
      }),
    donate: publicProcedure
      .input(
        z.object({
          campaignId: z.number(),
          donorName: z.string().min(1, "Name is required"),
          donorEmail: z.string().email("Valid email is required"),
          amount: z.number().min(100, "Minimum donation is ₹100"),
          message: z.string().optional(),
          isAnonymous: z.boolean().default(false),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createCampaignDonation(input);
        await updateCampaignRaisedAmount(input.campaignId, input.amount);
        await notifyOwner({
          title: `Campaign Donation — ₹${input.amount.toLocaleString("en-IN")}`,
          content: `CAMPAIGN DONATION\n\nCampaign ID: ${input.campaignId}\nDonor: ${input.isAnonymous ? "Anonymous" : input.donorName}\nEmail: ${input.donorEmail}\nAmount: ₹${input.amount.toLocaleString("en-IN")}\nMessage: ${input.message || "N/A"}\nTime: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
        }).catch(() => {});
        return result;
      }),
    getDonations: publicProcedure
      .input(z.object({ campaignId: z.number() }))
      .query(async ({ input }) => {
        const donations = await getCampaignDonations(input.campaignId);
        return donations
          .filter(donation => donation.status === "completed")
          .map(donation => ({
            id: donation.id,
            campaignId: donation.campaignId,
            amount: donation.amount,
            status: donation.status,
            createdAt: donation.createdAt,
          }));
      }),
  }),

  // ===== Donor Wall =====
  donorWall: router({
    getEntries: adminProcedure.query(async () => {
      return getDonorWallEntries(50);
    }),
    getStats: publicProcedure.query(async () => {
      return getDonationStats();
    }),
  }),

  // ===== Celebrate With Purpose Wall =====
  celebrateWall: router({
    getEntries: publicProcedure.query(async () => {
      return getCelebrateWallEntries(50);
    }),
  }),

  // ===== Testimonials =====
  testimonials: router({
    getActive: publicProcedure.query(async () => {
      return getActiveTestimonials();
    }),
    getAll: adminProcedure.query(async () => {
      return getAllTestimonials();
    }),
    create: adminProcedure
      .input(z.object({
        name: z.string().min(1),
        role: z.string().optional(),
        content: z.string().min(1),
        category: z.enum(["donor", "beneficiary", "partner", "volunteer"]).default("donor"),
        photoUrl: z.string().optional(),
        rating: z.number().min(1).max(5).default(5),
        isActive: z.boolean().default(true),
        sortOrder: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        await createTestimonial(input);
        return { success: true };
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        role: z.string().optional(),
        content: z.string().optional(),
        category: z.enum(["donor", "beneficiary", "partner", "volunteer"]).optional(),
        photoUrl: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        isActive: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateTestimonial(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteTestimonial(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
