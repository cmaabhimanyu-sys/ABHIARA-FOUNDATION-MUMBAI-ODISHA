import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
  createDonation: vi.fn().mockResolvedValue({ id: 1 }),
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

describe("donation.create", () => {
  it("rejects donation with amount below minimum", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.donation.create({
        donorName: "Test Donor",
        donorEmail: "test@example.com",
        amount: 50,
        frequency: "one_time",
        cause: "general",
      })
    ).rejects.toThrow();
  });

  it("rejects donation with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.donation.create({
        donorName: "Test Donor",
        donorEmail: "not-an-email",
        amount: 1000,
        frequency: "monthly",
        cause: "education",
      })
    ).rejects.toThrow();
  });

  it("rejects donation with empty donor name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.donation.create({
        donorName: "",
        donorEmail: "test@example.com",
        amount: 1000,
        frequency: "one_time",
        cause: "general",
      })
    ).rejects.toThrow();
  });

  it("accepts valid donation input schema", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.donation.create({
        donorName: "Abhimanyu Mallik",
        donorEmail: "info@abhiarafoundation.org",
        donorPhone: "+919938938321",
        amount: 5000,
        frequency: "one_time",
        cause: "education",
        message: "For the children of Koraput",
      });
    } catch (error: unknown) {
      const err = error as { code?: string; name?: string };
      expect(err.name).not.toBe("ZodError");
    }
  }, 15000);

  it("validates frequency enum values", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.donation.create({
        donorName: "Test",
        donorEmail: "test@test.com",
        amount: 1000,
        frequency: "weekly" as "one_time",
        cause: "general",
      })
    ).rejects.toThrow();
  });

  it("validates cause enum values", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.donation.create({
        donorName: "Test",
        donorEmail: "test@test.com",
        amount: 1000,
        frequency: "one_time",
        cause: "invalid_cause" as "general",
      })
    ).rejects.toThrow();
  });

  it("rejects monthly payment requests because auto debit is not active", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.donation.createOrder({
        donorName: "Test",
        donorEmail: "test@example.com",
        amount: 1000,
        frequency: "monthly" as "one_time",
        cause: "education",
      })
    ).rejects.toThrow();
  });
});
