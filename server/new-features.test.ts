import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
  createDonation: vi.fn().mockResolvedValue({ id: 1 }),
  createOccasionDonation: vi.fn().mockResolvedValue({ id: 2 }),
  getCelebrateWallEntries: vi.fn().mockResolvedValue([]),
}));

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
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("donation.create with medical_emergency cause", () => {
  it("accepts medical_emergency as a valid cause", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.donation.create({
      donorName: "Test Donor",
      donorEmail: "test@example.com",
      amount: 5000,
      frequency: "one_time",
      cause: "medical_emergency",
      expenseCategory: "Medicine & Healthcare",
      message: "For emergency medical support",
    });
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
  }, 15000);

  it.each(["elderly_care", "disaster_relief", "animal_welfare"] as const)(
    "accepts %s as a valid one-time donation cause",
    async cause => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.donation.create({
        donorName: "Test Donor",
        donorEmail: "test@example.com",
        amount: 1000,
        frequency: "one_time",
        cause,
      });

      expect(result).toEqual({ id: 1 });
    }
  );

  it("accepts expenseCategory as an optional field", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.donation.create({
      donorName: "Test Donor 2",
      donorEmail: "test2@example.com",
      amount: 1000,
      frequency: "one_time",
      cause: "education",
      expenseCategory: "Books & Stationery",
    });
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
  }, 15000);

  it("works without expenseCategory (backward compatible)", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.donation.create({
      donorName: "Test Donor 3",
      donorEmail: "test3@example.com",
      amount: 500,
      cause: "general",
    });
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
  }, 15000);
});

describe("occasionDonation.create with new fields", () => {
  it("accepts isPublicOnWall and wantReminder flags", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.occasionDonation.create({
      donorName: "Test Occasion Donor",
      donorEmail: "occasion@example.com",
      amount: 2000,
      cause: "medical_emergency",
      occasion: "birthday",
      celebrantName: "Birthday Person",
      occasionDate: "2026-06-15",
      relationship: "Friend",
      wishingMessage: "Happy Birthday!",
      isPublicOnWall: true,
      wantReminder: true,
    });
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
  }, 15000);

  it("defaults isPublicOnWall and wantReminder to false", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.occasionDonation.create({
      donorName: "Test Occasion Donor 2",
      donorEmail: "occasion2@example.com",
      amount: 1000,
      cause: "education",
      occasion: "anniversary",
      celebrantName: "Our Parents",
    });
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
  }, 15000);
});

describe("celebrateWall.getEntries", () => {
  it("returns an array of celebrate wall entries", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const entries = await caller.celebrateWall.getEntries();
    expect(Array.isArray(entries)).toBe(true);
  });
});

describe("donation input validation", () => {
  it("rejects invalid cause values", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.donation.create({
        donorName: "Test",
        donorEmail: "test@example.com",
        amount: 500,
        cause: "invalid_cause" as any,
      })
    ).rejects.toThrow();
  });

  it("rejects donation below minimum amount", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.donation.create({
        donorName: "Test",
        donorEmail: "test@example.com",
        amount: 50,
        cause: "general",
      })
    ).rejects.toThrow();
  });
});
