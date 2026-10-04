import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import type { TrpcContext } from "./_core/context";

const {
  mockGetFundraisingCampaigns,
  mockGetFundraisingCampaignBySlug,
  mockGetCampaignDonations,
  mockGetDonorWallEntries,
  mockGetSiteSettings,
} = vi.hoisted(() => ({
  mockGetFundraisingCampaigns: vi.fn(),
  mockGetFundraisingCampaignBySlug: vi.fn(),
  mockGetCampaignDonations: vi.fn(),
  mockGetDonorWallEntries: vi.fn(),
  mockGetSiteSettings: vi.fn(),
}));

vi.mock("./db", () => ({
  getFundraisingCampaigns: mockGetFundraisingCampaigns,
  getFundraisingCampaignBySlug: mockGetFundraisingCampaignBySlug,
  getCampaignDonations: mockGetCampaignDonations,
  getDonorWallEntries: mockGetDonorWallEntries,
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

vi.mock("./cms-db", () => ({
  getSiteSettings: mockGetSiteSettings,
}));

import { appRouter } from "./routers";

function publicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as TrpcContext["res"],
  };
}

const approvedCampaign = {
  id: 4,
  creatorName: "Public Campaign Organiser",
  creatorEmail: "private@example.com",
  creatorPhone: "9000000000",
  title: "Support education",
  description: "A verified campaign supporting education materials.",
  campaignType: "school" as const,
  cause: "education" as const,
  goalAmount: 50000,
  raisedAmount: 10000,
  donorCount: 3,
  endDate: null,
  slug: "support-education",
  status: "active" as const,
  isApproved: true,
  createdAt: new Date("2026-09-01T00:00:00Z"),
  updatedAt: new Date("2026-09-01T00:00:00Z"),
};

describe("public privacy boundaries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetFundraisingCampaigns.mockResolvedValue([approvedCampaign]);
    mockGetFundraisingCampaignBySlug.mockResolvedValue(approvedCampaign);
    mockGetCampaignDonations.mockResolvedValue([
      {
        id: 9,
        campaignId: 4,
        donorName: "Private Donor",
        donorEmail: "donor@example.com",
        amount: 1000,
        message: "Private message",
        isAnonymous: false,
        status: "completed",
        createdAt: new Date("2026-09-02T00:00:00Z"),
      },
      {
        id: 10,
        campaignId: 4,
        donorName: "Pending Donor",
        donorEmail: "pending@example.com",
        amount: 500,
        message: null,
        isAnonymous: false,
        status: "pending",
        createdAt: new Date("2026-09-03T00:00:00Z"),
      },
    ]);
    mockGetSiteSettings.mockResolvedValue([
      {
        id: 1,
        settingKey: "stat_students_reached",
        settingValue: "50+",
        category: "stats",
      },
      {
        id: 2,
        settingKey: "email_address",
        settingValue: "info@example.org",
        category: "contact",
      },
      {
        id: 3,
        settingKey: "ourstory_narrative_chapters",
        settingValue: "private biography",
        category: "ourstory",
      },
      {
        id: 4,
        settingKey: "database_password",
        settingValue: "never-public",
        category: "internal",
      },
      {
        id: 5,
        settingKey: "stat_students_verified_monthly_counts",
        settingValue: '{"month":"2026-09-30","recurring":12,"oneTime":25}',
        category: "stats",
      },
    ]);
  });

  it("removes organiser email and phone from public campaign responses", async () => {
    const caller = appRouter.createCaller(publicContext());
    const campaigns = await caller.campaign.list();
    const campaign = await caller.campaign.getBySlug({
      slug: approvedCampaign.slug,
    });

    expect(campaigns).toHaveLength(1);
    expect(campaigns[0]).not.toHaveProperty("creatorEmail");
    expect(campaigns[0]).not.toHaveProperty("creatorPhone");
    expect(campaign).not.toHaveProperty("creatorEmail");
    expect(campaign).not.toHaveProperty("creatorPhone");
  });

  it("returns only completed campaign amounts and dates without donor identity", async () => {
    const caller = appRouter.createCaller(publicContext());
    const donations = await caller.campaign.getDonations({ campaignId: 4 });

    expect(donations).toHaveLength(1);
    expect(donations[0]).toMatchObject({
      id: 9,
      campaignId: 4,
      amount: 1000,
      status: "completed",
    });
    expect(donations[0]).not.toHaveProperty("donorName");
    expect(donations[0]).not.toHaveProperty("donorEmail");
    expect(donations[0]).not.toHaveProperty("message");
  });

  it("does not allow public access to donor-level wall records", async () => {
    const caller = appRouter.createCaller(publicContext());
    await expect(caller.donorWall.getEntries()).rejects.toThrow();
    expect(mockGetDonorWallEntries).not.toHaveBeenCalled();
  });

  it("returns only reviewed public settings and keeps CMS inventories admin-only", async () => {
    const caller = appRouter.createCaller(publicContext());
    const settings = await caller.cms.settings.listPublic();

    expect(settings.map(setting => setting.settingKey)).toEqual([
      "email_address",
      "stat_students_verified_monthly_counts",
    ]);
    await expect(caller.cms.settings.list()).rejects.toThrow();
    await expect(caller.cms.activities.list()).rejects.toThrow();
    await expect(caller.cms.gallery.list()).rejects.toThrow();
    await expect(caller.cms.blog.list()).rejects.toThrow();
  });

  it("keeps private family and beneficiary details out of public pages", () => {
    const publicCopy = [
      "client/index.html",
      "client/src/pages/OurStory.tsx",
      "client/src/pages/FAQ.tsx",
      "client/src/pages/Home.tsx",
      "client/src/pages/Activities.tsx",
      "client/src/pages/Team.tsx",
    ]
      .map(path => readFileSync(path, "utf8"))
      .join("\n");
    const app = readFileSync("client/src/App.tsx", "utf8");

    expect(publicCopy).not.toMatch(
      /Aradhana|Jitu Munda|skeletal remains|major tech company|farming family/i
    );
    expect(app).not.toContain('lazy(() => import("./pages/DonorWall"))');
    expect(app).toMatch(
      /<Route path="\/donor-wall">\s*<Redirect to="\/board-and-transparency" \/>\s*<\/Route>/
    );
  });
});
