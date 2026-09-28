import { createHmac } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { paymentOrderMatches, verifyRazorpayPaymentSignature } from "./paymentSecurity";

const root = resolve(import.meta.dirname, "..");

describe("payment security", () => {
  it("accepts a valid payment signature and rejects changed payment data", () => {
    const secret = "local-test-secret-not-a-real-key";
    const orderId = "order_test_123";
    const paymentId = "pay_test_456";
    const signature = createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    expect(verifyRazorpayPaymentSignature(orderId, paymentId, signature, secret)).toBe(true);
    expect(verifyRazorpayPaymentSignature(orderId, "pay_changed", signature, secret)).toBe(false);
    expect(verifyRazorpayPaymentSignature(orderId, paymentId, "not-a-signature", secret)).toBe(false);
  });

  it("requires the submitted order to match the order stored for that donation", () => {
    expect(paymentOrderMatches("order_123", "order_123")).toBe(true);
    expect(paymentOrderMatches("order_123", "order_999")).toBe(false);
    expect(paymentOrderMatches(null, "order_123")).toBe(false);
  });

  it("keeps payment secrets out of client source and ignores local project configuration", () => {
    const donate = readFileSync(resolve(root, "client/src/pages/Donate.tsx"), "utf8");
    const gitignore = readFileSync(resolve(root, ".gitignore"), "utf8");
    expect(donate).not.toContain("RAZORPAY_KEY_SECRET");
    expect(donate).not.toContain("Razorpay Secure Payment");
    expect(gitignore).toContain(".project-config.json");
  });

  it("binds verification to stored order IDs and never marks a record failed from an untrusted signature", () => {
    const router = readFileSync(resolve(root, "server/routers.ts"), "utf8");
    expect(router).toContain("getDonationPaymentRecord(input.donationId)");
    expect(router).toContain("getMemorialDonationPaymentRecord(input.donationId)");
    expect(router).toContain("getOccasionDonationPaymentRecord(input.donationId)");
    expect(router).toContain("paymentOrderMatches(donation.razorpayOrderId, input.razorpay_order_id)");
    expect(router).not.toContain('updateDonationStatus(input.donationId, "failed")');
    expect(router).not.toContain('updateMemorialDonationStatus(input.donationId, "failed")');
    expect(router).not.toContain('updateOccasionDonationStatus(input.donationId, "failed")');
  });
});
