import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

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

describe("newsletter.subscribe", () => {
  it("accepts a valid email and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.newsletter.subscribe({ email: "test@example.com" });
    expect(result).toEqual({ success: true });
  });

  it("rejects an invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.newsletter.subscribe({ email: "not-an-email" })
    ).rejects.toThrow();
  });
});

describe("contact.submit", () => {
  it("accepts a valid contact submission and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Test User",
      email: "test@example.com",
      message: "Hello, I want to learn more about Abhiara Foundation.",
      type: "general",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "",
        email: "test@example.com",
        message: "Hello",
        type: "general",
      })
    ).rejects.toThrow();
  });

  it("rejects empty message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Test",
        email: "test@example.com",
        message: "",
        type: "general",
      })
    ).rejects.toThrow();
  });

  it("accepts csr_partnership type", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Corporate Partner",
      email: "csr@company.com",
      subject: "CSR Partnership",
      message: "We want to partner with Abhiara Foundation for CSR.",
      type: "csr_partnership",
    });
    expect(result).toEqual({ success: true });
  });
});
