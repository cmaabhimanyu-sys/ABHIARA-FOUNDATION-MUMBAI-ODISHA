import { describe, it, expect } from "vitest";

describe("Razorpay API Key Validation", () => {
  it("should have RAZORPAY_KEY_ID set", () => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    expect(keyId).toBeDefined();
    expect(keyId).toMatch(/^rzp_(live|test)_/);
  });

  it("should have RAZORPAY_KEY_SECRET set", () => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    expect(keySecret).toBeDefined();
    expect(keySecret!.length).toBeGreaterThan(10);
  });

  it("should authenticate with Razorpay API", async () => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Call Razorpay API to verify credentials - fetch payments (limit 1)
    const response = await fetch("https://api.razorpay.com/v1/payments?count=1", {
      signal: AbortSignal.timeout(12_000),
      headers: {
        Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
      },
    });

    // 200 means credentials are valid
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("items");
  }, 15_000);
});
