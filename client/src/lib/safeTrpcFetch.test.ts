import { describe, expect, it, vi } from "vitest";
import { safeTrpcFetch } from "./safeTrpcFetch";

describe("safeTrpcFetch", () => {
  it("returns a valid tRPC error body when the server response is empty", async () => {
    const fetchImpl = vi.fn(async () => new Response("", { status: 200 }));

    const response = await safeTrpcFetch("/api/trpc/donation.createOrder", undefined, fetchImpl);
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body[0].error.json.message).toContain("did not respond");
  });

  it("returns a valid tRPC error body when the server returns HTML", async () => {
    const fetchImpl = vi.fn(async () =>
      new Response("<html><h1>Gateway error</h1></html>", {
        status: 502,
        headers: { "content-type": "text/html" },
      }),
    );

    const response = await safeTrpcFetch("/api/trpc/donation.createOrder", undefined, fetchImpl);
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body[0].error.json.message).toContain("could not reach");
  });

  it("passes through a valid JSON response", async () => {
    const original = new Response(JSON.stringify([{ result: { data: { json: { ok: true } } } }]), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
    const fetchImpl = vi.fn(async () => original);

    const response = await safeTrpcFetch("/api/trpc/health", undefined, fetchImpl);

    expect(response).toBe(original);
  });
});
