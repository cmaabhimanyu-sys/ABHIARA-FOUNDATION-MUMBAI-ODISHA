import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type Rewrite = {
  source: string;
  destination: string;
};

type VercelConfig = {
  buildCommand?: string;
  functions?: Record<string, unknown>;
  redirects?: Array<Rewrite & { permanent?: boolean }>;
  rewrites?: Rewrite[];
};

const config = JSON.parse(
  readFileSync(resolve(process.cwd(), "vercel.json"), "utf8")
) as VercelConfig;
const apiEntry = readFileSync(resolve(process.cwd(), "api/index.ts"), "utf8");

describe("Vercel payment API routing", () => {
  it("deploys the serverless API handler", () => {
    expect(config.buildCommand).toBe("pnpm run build");
    expect(config.functions?.["api/index.ts"]).toBeDefined();
  });

  it("routes tRPC requests to the API before the SPA fallback", () => {
    expect(config.rewrites?.[0]).toEqual({
      source: "/api/health",
      destination: "/api",
    });
    expect(config.rewrites?.[1]).toEqual({
      source: "/api/trpc/:path*",
      destination: "/api",
    });
    expect(config.rewrites?.at(-1)).toEqual({
      source: "/((?!api|manus-storage).*)",
      destination: "/index.html",
    });
  });

  it("keeps the official admin path on the official domain", () => {
    expect(config.redirects?.some(item => item.source === "/admin")).toBe(
      false
    );
    expect(config.rewrites?.at(-1)).toEqual({
      source: "/((?!api|manus-storage).*)",
      destination: "/index.html",
    });
  });

  it("does not leave a public one-time migration route in production", () => {
    expect(
      config.rewrites?.some(item => item.source.includes("/internal/"))
    ).toBe(false);
    expect(apiEntry).not.toContain("seed-reviewed-press");
    expect(apiEntry).not.toContain("pressArchiveSeed");
  });
});
