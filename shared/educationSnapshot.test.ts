import { describe, expect, it } from "vitest";
import {
  EDUCATION_SNAPSHOT_KEY,
  formatEducationFigure,
  formatEducationSnapshotDate,
  parseEducationSnapshot,
} from "./educationSnapshot";

const snapshot = JSON.stringify({
  reportedOn: "2026-10-04",
  onboarded: "50+",
  materials: "300+",
  mostlyOrphaned: true,
});

describe("owner-reported programme milestones", () => {
  it("parses the dated owner statement without converting either figure into an exact count", () => {
    expect(EDUCATION_SNAPSHOT_KEY).toBe("stat_education_programme_snapshot");
    expect(parseEducationSnapshot(snapshot, Date.UTC(2026, 9, 4))).toEqual({
      reportedOn: "2026-10-04",
      onboarded: "50+",
      materials: "300+",
      mostlyOrphaned: true,
    });
    expect(formatEducationFigure("300+", true)).toBe("୩୦୦+");
    expect(formatEducationFigure("50+", false)).toBe("50+");
    expect(formatEducationSnapshotDate("2026-10-04", true)).toBe(
      "୪ ଅକ୍ଟୋବର ୨୦୨୬"
    );
    expect(formatEducationSnapshotDate("2026-10-04", false)).toBe(
      "4 October 2026"
    );
  });

  it("rejects undated, exact, future, unbounded, and malformed claims", () => {
    for (const raw of [
      undefined,
      "{}",
      "not JSON",
      JSON.stringify({ ...JSON.parse(snapshot), reportedOn: "2026-02-31" }),
      JSON.stringify({ ...JSON.parse(snapshot), reportedOn: "2026-12-01" }),
      JSON.stringify({ ...JSON.parse(snapshot), onboarded: "50" }),
      JSON.stringify({ ...JSON.parse(snapshot), materials: "3000 children" }),
      JSON.stringify({ ...JSON.parse(snapshot), materials: "0+" }),
      JSON.stringify({ ...JSON.parse(snapshot), mostlyOrphaned: "all" }),
    ]) {
      expect(parseEducationSnapshot(raw, Date.UTC(2026, 9, 4))).toBeNull();
    }
  });
});
