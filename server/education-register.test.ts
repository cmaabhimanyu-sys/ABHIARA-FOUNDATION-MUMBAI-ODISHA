import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";
const { getSiteSettings, upsertSiteSetting } = vi.hoisted(() => ({
  getSiteSettings: vi.fn(),
  upsertSiteSetting: vi.fn(),
}));
vi.mock("./cms-db", () => ({ getSiteSettings, upsertSiteSetting }));
import { cmsRouter } from "./cms-router";
import {
  EDUCATION_REGISTER_KEY,
  EDUCATION_REGISTER_LABEL,
} from "../shared/educationRegister";
const snapshot = {
  reportedOn: "2026-10-14",
  students: 51,
  districts: ["Kendrapara", "Dhenkanal", "Keonjhar", "Jajpur", "Mayurbhanj"],
  isPublished: true,
};
const context = (admin = false): TrpcContext => ({
  user: admin
    ? {
        id: 1,
        openId: "test-owner",
        name: "Test Owner",
        email: "owner@example.invalid",
        loginMethod: "google",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      }
    : null,
  req: { protocol: "https", headers: {} } as TrpcContext["req"],
  res: { clearCookie: () => {} } as TrpcContext["res"],
});
const setting = (value = snapshot) => ({
  id: 1,
  settingKey: EDUCATION_REGISTER_KEY,
  settingValue: JSON.stringify(value),
  label: "Private name must never become a public label",
  category: "private",
  updatedAt: new Date(),
});
describe("public education-register boundary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    upsertSiteSetting.mockResolvedValue({ success: true });
  });
  it("publishes only the approved aggregate fields with a fixed public label", async () => {
    getSiteSettings.mockResolvedValue([
      setting(),
      {
        id: 2,
        settingKey: "private_student_register",
        settingValue: "private names and addresses",
      },
    ]);
    const rows = await cmsRouter.createCaller(context()).settings.listPublic();
    expect(rows).toHaveLength(1);
    expect(rows[0].label).toBe(EDUCATION_REGISTER_LABEL);
    expect(rows[0].category).toBe("stats");
    expect(JSON.parse(rows[0].settingValue)).toEqual(snapshot);
    expect(JSON.stringify(rows)).not.toContain("Private name");
  });
  it("excludes unpublished, malformed and personally identifying records", async () => {
    for (const value of [
      { ...snapshot, isPublished: false },
      { ...snapshot, names: ["Private child"] },
      { ...snapshot, districts: ["Private full address"] },
    ]) {
      getSiteSettings.mockResolvedValue([setting(value as typeof snapshot)]);
      expect(
        await cmsRouter.createCaller(context()).settings.listPublic()
      ).toEqual([]);
    }
  });
  it("normalizes owner saves and allows a reversible unpublish", async () => {
    const caller = cmsRouter.createCaller(context(true));
    await caller.settings.upsert({
      settingKey: EDUCATION_REGISTER_KEY,
      settingValue: JSON.stringify({ ...snapshot, isPublished: false }),
      label: "Private metadata",
      category: "private",
    });
    expect(upsertSiteSetting).toHaveBeenCalledWith({
      settingKey: EDUCATION_REGISTER_KEY,
      settingValue: JSON.stringify({ ...snapshot, isPublished: false }),
      label: EDUCATION_REGISTER_LABEL,
      category: "stats",
    });
  });
  it("rejects invalid register payloads and anonymous writes", async () => {
    const input = {
      settingKey: EDUCATION_REGISTER_KEY,
      settingValue: JSON.stringify({
        ...snapshot,
        addresses: ["private address"],
      }),
    };
    await expect(
      cmsRouter.createCaller(context(true)).settings.upsert(input)
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(
      cmsRouter
        .createCaller(context())
        .settings.upsert({ ...input, settingValue: JSON.stringify(snapshot) })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(upsertSiteSetting).not.toHaveBeenCalled();
  });
});
