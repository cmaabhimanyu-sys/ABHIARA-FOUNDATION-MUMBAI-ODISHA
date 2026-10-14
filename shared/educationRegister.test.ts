import { describe, expect, it } from "vitest";
import {
  EDUCATION_REGISTER_KEY,
  parseEducationRegister,
  publishedEducationRegister,
  registerDistrictName,
} from "./educationRegister";
const reported = {
  reportedOn: "2026-10-14",
  students: 51,
  districts: ["Kendrapara", "Dhenkanal", "Keonjhar", "Jajpur", "Mayurbhanj"],
  isPublished: true,
};
const now = Date.UTC(2026, 9, 14);
const raw = JSON.stringify(reported);
describe("aggregate student register", () => {
  it("preserves the exact owner-reported register count and derives five distinct districts", () => {
    expect(EDUCATION_REGISTER_KEY).toBe("stat_education_student_register");
    const result = parseEducationRegister(raw, now);
    expect(result).toEqual(reported);
    expect(result?.districts).toHaveLength(5);
    expect(result).not.toHaveProperty("tuitionRecipients");
    expect(result).not.toHaveProperty("mostlyOrphaned");
    expect(result).not.toHaveProperty("districtCount");
  });
  it("provides the five accurate Odia district labels", () => {
    const result = parseEducationRegister(raw, now)!;
    expect(
      result.districts.map(name => registerDistrictName(name, true))
    ).toEqual(["କେନ୍ଦ୍ରାପଡ଼ା", "ଢେଙ୍କାନାଳ", "କେନ୍ଦୁଝର", "ଯାଜପୁର", "ମୟୂରଭଞ୍ଜ"]);
    expect(
      result.districts.map(name => registerDistrictName(name, false))
    ).toEqual(reported.districts);
  });
  it("rejects invalid dates, approximate counts, duplicate districts and private fields", () => {
    for (const value of [
      null,
      [],
      {},
      { ...reported, reportedOn: "2026-02-31" },
      { ...reported, reportedOn: "2026-10-15" },
      { ...reported, students: "51" },
      { ...reported, students: "51+" },
      { ...reported, students: 1.5 },
      { ...reported, students: 0 },
      { ...reported, students: 1000000 },
      { ...reported, students: 1 },
      { ...reported, districts: [] },
      { ...reported, districts: ["Kendrapara", "Kendrapara"] },
      { ...reported, districts: ["Private home address"] },
      { ...reported, isPublished: "true" },
      { ...reported, names: ["Private student"] },
      { ...reported, addresses: ["Private address"] },
      { ...reported, districtCount: 6 },
    ]) {
      expect(parseEducationRegister(JSON.stringify(value), now)).toBeNull();
    }
    expect(parseEducationRegister("not JSON", now)).toBeNull();
    expect(parseEducationRegister(undefined, now)).toBeNull();
  });
  it("hides unpublished, missing and malformed settings without fabricated fallback figures", () => {
    expect(publishedEducationRegister([])).toBeNull();
    expect(
      publishedEducationRegister([
        {
          settingKey: EDUCATION_REGISTER_KEY,
          settingValue: JSON.stringify({ ...reported, isPublished: false }),
        },
      ])
    ).toBeNull();
    expect(
      publishedEducationRegister([
        { settingKey: EDUCATION_REGISTER_KEY, settingValue: "{}" },
      ])
    ).toBeNull();
    expect(
      publishedEducationRegister([
        { settingKey: EDUCATION_REGISTER_KEY, settingValue: raw },
      ])
    ).toEqual(reported);
  });
});
