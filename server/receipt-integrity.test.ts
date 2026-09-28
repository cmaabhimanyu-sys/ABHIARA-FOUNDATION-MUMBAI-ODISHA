import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");

function read(relativePath: string) {
  return readFileSync(resolve(projectRoot, relativePath), "utf8");
}

const publicDonationFiles = [
  "client/src/App.tsx",
  "client/src/pages/Donate.tsx",
  "client/src/pages/DonateForOccasion.tsx",
  "client/src/pages/DonateInMemory.tsx",
  "client/src/pages/FAQ.tsx",
  "client/src/pages/Financials.tsx",
  "client/src/pages/Home.tsx",
  "client/src/pages/Privacy.tsx",
];

describe("donation acknowledgement integrity", () => {
  it("does not publish unsupported receipt or automatic 80G promises", () => {
    const source = publicDonationFiles.map(read).join("\n");
    const forbidden = [
      "All donations to Abhiara Foundation are eligible for 50% tax deduction",
      "80G receipts are generated automatically",
      "Receipts are available for download within 48 hours",
      "PAN (for 80G receipt)",
      "PAN Number (for 80G receipt)",
      "official donation receipt within 24 hours",
      "download 80G receipts",
      "manage your monthly subscriptions",
    ];

    for (const claim of forbidden) {
      expect(source).not.toContain(claim);
    }
  });

  it("keeps the accurate acknowledgement and pending 80G disclosure", () => {
    const donate = read("client/src/pages/Donate.tsx");
    expect(donate).toContain("Donation Acknowledgement");
    expect(donate).toContain("80G approval is under process");
    expect(donate).toContain("not eligible for an 80G tax deduction");
  });

  it("uses the approved neutral UPI QR without public payment provider branding", () => {
    const donate = read("client/src/pages/Donate.tsx");
    const registry = read("client/public/images/images.json");

    expect(donate).toContain("/images/donate-upi-qr.jpeg");
    expect(registry).toContain('"file": "donate-upi-qr.jpeg"');
    expect(`${donate}\n${registry}`).not.toContain("donate-qr-code.jpeg");
    expect(donate).not.toContain("received through Razorpay");
    expect(registry).not.toContain("SmartHub Vyapar");
  });

  it("retires the inactive donor dashboard and its fake access-link API", () => {
    const app = read("client/src/App.tsx");
    const router = read("server/routers.ts");
    expect(app).not.toContain('lazy(() => import("./pages/DonorDashboard"))');
    expect(app).not.toContain('lazy(() => import("./pages/DonorWall"))');
    expect(app).toMatch(
      /<Route path="\/donor-wall">\s*<Redirect to="\/board-and-transparency" \/>\s*<\/Route>/
    );
    expect(app).toMatch(
      /<Route path="\/donor-dashboard">\s*<Redirect to="\/board-and-transparency" \/>\s*<\/Route>/
    );
    expect(router).not.toContain("donorDashboard: router(");
    expect(router).not.toContain("an access link has been sent to your email");
    expect(router).toContain("getEntries: adminProcedure.query");
  });

  it("retires the standalone page that contained placeholder bank details", () => {
    const app = read("client/src/App.tsx");
    expect(app).not.toContain('lazy(() => import("./pages/BankTransfer"))');
    expect(app).toMatch(
      /<Route path="\/bank-transfer">\s*<Redirect to="\/donate" \/>\s*<\/Route>/
    );
  });
});
