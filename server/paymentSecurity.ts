import { createHmac, timingSafeEqual } from "node:crypto";

const HEX_SIGNATURE = /^[a-f0-9]{64}$/i;

export function verifyRazorpayPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  keySecret: string,
) {
  if (!HEX_SIGNATURE.test(signature)) return false;

  const expected = createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest();
  const received = Buffer.from(signature, "hex");

  return received.length === expected.length && timingSafeEqual(expected, received);
}

export function paymentOrderMatches(
  storedOrderId: string | null | undefined,
  submittedOrderId: string,
) {
  return Boolean(storedOrderId && storedOrderId === submittedOrderId);
}
