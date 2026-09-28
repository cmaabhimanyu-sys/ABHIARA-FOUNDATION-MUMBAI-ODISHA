import { describe, expect, it } from "vitest";
import { sdk } from "./_core/sdk";
import { verifyAdminRelayWithIssuer } from "./_core/oauth";

describe("official admin session relay", () => {
  it("accepts only an untampered short-lived relay created for the same browser nonce", async () => {
    const nonce = "browser-bound-nonce-1234567890";
    const token = await sdk.createAdminRelayToken(
      "owner-open-id",
      nonce,
      "/admin#press"
    );

    await expect(sdk.verifyAdminRelayToken(token)).resolves.toEqual({
      openId: "owner-open-id",
      nonce,
      returnPath: "/admin#press",
    });
    const tokenParts = token.split(".");
    tokenParts[2] = `${tokenParts[2]?.startsWith("a") ? "b" : "a"}${tokenParts[2]?.slice(1)}`;
    await expect(
      sdk.verifyAdminRelayToken(tokenParts.join("."))
    ).resolves.toBeNull();
  });

  it("accepts a valid relay verified by the fixed OAuth issuer host", async () => {
    const fetchImpl = async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        "https://abhiara-ngo-hv6lgfne.manus.space/api/oauth/admin-relay/verify"
      );
      return new Response(
        JSON.stringify({
          relay: {
            openId: "owner-open-id",
            nonce: "browser-bound-nonce-1234567890",
            returnPath: "/admin",
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    };

    await expect(
      verifyAdminRelayWithIssuer(
        "issuer-signed-token",
        fetchImpl as typeof fetch
      )
    ).resolves.toEqual({
      openId: "owner-open-id",
      nonce: "browser-bound-nonce-1234567890",
      returnPath: "/admin",
    });
  });

  it("rejects a malformed issuer response", async () => {
    const fetchImpl = async () =>
      new Response(JSON.stringify({ relay: { openId: "owner-open-id" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });

    await expect(
      verifyAdminRelayWithIssuer(
        "issuer-signed-token",
        fetchImpl as typeof fetch
      )
    ).resolves.toBeNull();
  });
});
