import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module to avoid real database calls
vi.mock("./db", () => ({
  addNewsletterSubscriber: vi.fn(),
  createContactInquiry: vi.fn(),
  createVolunteerSubmission: vi.fn().mockResolvedValue({ success: true }),
}));

// Mock notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("volunteer.submit", () => {
  it("accepts a valid volunteer submission and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.volunteer.submit({
      fullName: "Test Volunteer",
      qualification: "MBA",
      email: "test@example.com",
      socialProfile: "https://linkedin.com/in/testvolunteer",
      areaOfInterest: "education",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.volunteer.submit({
        fullName: "Test Volunteer",
        qualification: "MBA",
        email: "not-an-email",
        socialProfile: "https://linkedin.com/in/testvolunteer",
        areaOfInterest: "education",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with empty full name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.volunteer.submit({
        fullName: "",
        qualification: "MBA",
        email: "test@example.com",
        socialProfile: "https://linkedin.com/in/testvolunteer",
        areaOfInterest: "education",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with invalid area of interest", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.volunteer.submit({
        fullName: "Test Volunteer",
        qualification: "MBA",
        email: "test@example.com",
        socialProfile: "https://linkedin.com/in/testvolunteer",
        areaOfInterest: "invalid_area" as any,
      })
    ).rejects.toThrow();
  });

  it("accepts all valid area of interest values", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const areas = ["education", "eldercare", "csr", "finance", "technology", "fieldwork", "other"] as const;

    for (const area of areas) {
      const result = await caller.volunteer.submit({
        fullName: "Test Volunteer",
        qualification: "B.Com",
        email: "test@example.com",
        socialProfile: "https://linkedin.com/in/test",
        areaOfInterest: area,
      });
      expect(result).toEqual({ success: true });
    }
  });
});
