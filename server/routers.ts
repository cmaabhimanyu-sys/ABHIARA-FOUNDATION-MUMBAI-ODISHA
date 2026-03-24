import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { addNewsletterSubscriber, createContactInquiry, createVolunteerSubmission } from "./db";
import { notifyOwner } from "./_core/notification";
import { cmsRouter } from "./cms-router";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  cms: cmsRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
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
});

export type AppRouter = typeof appRouter;
