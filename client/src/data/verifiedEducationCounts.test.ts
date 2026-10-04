import { describe, expect, it } from "vitest";
import { parseVerifiedEducationCounts } from "./verifiedEducationCounts";

const reviewedAt = Date.parse("2026-10-04T00:00:00Z");

describe("dated education-count publication", () => {
  it("accepts a valid complete month end without merging distinct support types", () => {
    expect(
      parseVerifiedEducationCounts(
        JSON.stringify({ month: "2026-09-30", recurring: 12, oneTime: 25 }),
        reviewedAt
      )
    ).toEqual({
      month: "2026-09-30",
      recurring: 12,
      oneTime: 25,
    });
    expect(
      parseVerifiedEducationCounts(
        JSON.stringify({ month: "2026-02-28", recurring: 0, oneTime: 0 }),
        reviewedAt
      )
    ).not.toBeNull();
    expect(
      parseVerifiedEducationCounts(
        JSON.stringify({ month: "2024-02-29", recurring: 1, oneTime: 2 }),
        reviewedAt
      )
    ).not.toBeNull();
  });

  it.each([
    null,
    "",
    "50+",
    "{}",
    JSON.stringify({ month: "2026-09-30", recurring: 12 }),
    JSON.stringify({ month: "2026-09-29", recurring: 12, oneTime: 25 }),
    JSON.stringify({ month: "2026-02-31", recurring: 12, oneTime: 25 }),
    JSON.stringify({ month: "2026-12-31", recurring: 12, oneTime: 25 }),
    JSON.stringify({ month: "2026-09-30", recurring: "12", oneTime: 25 }),
    JSON.stringify({ month: "2026-09-30", recurring: -1, oneTime: 25 }),
    JSON.stringify({ month: "2026-09-30", recurring: 1.5, oneTime: 25 }),
  ])("does not show incomplete or unsupported figures: %s", raw => {
    expect(parseVerifiedEducationCounts(raw, reviewedAt)).toBeNull();
  });
});
