import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const admin = readFileSync("client/src/pages/Admin.tsx", "utf8");
const controlCentre = readFileSync(
  "client/src/components/AdminControlCentre.tsx",
  "utf8"
);
const dashboard = readFileSync(
  "client/src/components/DashboardLayout.tsx",
  "utf8"
);
const monthlyReports = readFileSync(
  "client/src/pages/MonthlyReports.tsx",
  "utf8"
);
const otherSupport = readFileSync(
  "client/src/pages/OtherVerifiedSupport.tsx",
  "utf8"
);
const studentImpact = readFileSync(
  "client/src/pages/StudentImpact.tsx",
  "utf8"
);
const home = readFileSync("client/src/pages/Home.tsx", "utf8");
const footer = readFileSync("client/src/components/Footer.tsx", "utf8");
const cmsRouter = readFileSync("server/cms-router.ts", "utf8");
const app = readFileSync("client/src/App.tsx", "utf8");
const pressMedia = readFileSync("client/src/pages/PressMedia.tsx", "utf8");
const ownerGuide = readFileSync("OWNER_ADMIN_GUIDE.md", "utf8");

const allAdminSource = `${admin}\n${controlCentre}\n${dashboard}`;
const normalizedControlCentre = controlCentre.replace(/\s+/g, " ");

describe("beginner-friendly owner control centre", () => {
  it("keeps the admin route protected and presents a task-based owner home", () => {
    expect(app).toContain('<Route path="/admin" component={Admin} />');
    expect(admin).toContain("<AdminControlCentre");
    expect(admin).toContain("<DashboardLayout");
    expect(controlCentre).toContain("What do you want to do?");
    expect(controlCentre).toContain("Use this page to update the website.");
    expect(controlCentre).toContain("publish only verified information");
    expect(allAdminSource).toContain("Secure admin");
  });

  it("offers only routine owner tasks and keeps protected changes outside the dashboard", () => {
    for (const label of [
      "Monthly Reports",
      "Press and Media",
      "Photo Library",
      "Public Details",
      "Social Links",
      "Board, Members and Advisors",
      "Successful Donations",
      "Volunteer Applications",
    ]) {
      expect(allAdminSource).toContain(label);
    }
    for (const lockedItem of [
      "Legal registrations",
      "payment keys",
      "bank details",
      "the QR code",
      "website design are locked",
    ]) {
      expect(normalizedControlCentre).toContain(lockedItem);
    }
    expect(admin).not.toContain("Record Donation");
    expect(admin).not.toContain("Add Donation");
    expect(admin).toContain("trpc.cms.leadership.list.useQuery");
    expect(admin).toContain("Board members must match");
    expect(controlCentre).toContain("official company documents");
  });

  it("shows only verified successful payment records and cannot create manual donation rows", () => {
    expect(admin).toContain(
      'donation.status === "completed" && Boolean(donation.razorpayPaymentId)'
    );
    expect(admin).toContain("Manual");
    expect(admin).toContain("donation entries are disabled");
    expect(admin).not.toContain("trpc.donation.create.useMutation");
  });

  it("requires photo permission and blocks common sensitive document types", () => {
    expect(admin).toContain(
      "confirm that you have permission to publish this photo"
    );
    expect(admin).toContain(
      "Aadhaar, a bank passbook, an address, a phone number, school records or payment details"
    );
    expect(admin).toContain("consentConfirmed: isImage");
    expect(admin).toContain("permission for public use is recorded");
    expect(admin).toContain("The photo must be smaller than 1 MB");
    expect(admin).toContain(
      '<option value="press">Press and media proofs</option>'
    );
    for (const folder of [
      "beneficiaries",
      "programmes",
      "press",
      "elder-support",
      "disaster-relief",
      "medical-support",
      "animal-welfare",
    ]) {
      expect(admin).toContain(`"${folder}"`);
    }
  });

  it("lets the owner route every impact photo with complete public details", () => {
    for (const label of [
      "Public title",
      "Public description",
      "Website category",
      "District or broad location",
      "Activity date",
    ]) {
      expect(admin).toContain(label);
    }

    for (const category of [
      "education",
      "elderly",
      "medical",
      "disaster",
      "animals",
      "events",
      "community",
    ]) {
      expect(admin).toContain(`value: "${category}"`);
    }

    expect(admin).toContain("category: impactCategory");
    expect(admin).toContain("location: publicLocation.trim() || undefined");
    expect(admin).toContain("dateTaken: publicDateTaken || undefined");
    expect(admin).toContain("This photo will appear in");
    expect(admin).toContain("First homepage photo");
    expect(admin).toContain("Display order");
    expect(admin).toContain("aria-label={`Move ${item.title} earlier`}");
    expect(admin).toContain("aria-label={`Move ${item.title} later`}");
    expect(admin).toContain("isGenericImpactTitle");
    expect(admin).toContain(
      "Replace the generic title with a clear description of this activity."
    );
    expect(admin).toContain("Delete record");
    expect(admin).toContain(
      "Use Photo Library to permanently delete the stored file."
    );
    expect(admin).toContain(
      "Permanently delete this stored photo and its website record?"
    );
    expect(ownerGuide).toContain("Choose the **Website category**");
    expect(ownerGuide).toContain(
      "title, description, category, location, date"
    );
    expect(ownerGuide).toContain("**First on homepage**");
    expect(ownerGuide).toContain("**Earlier** and **Later**");
  });

  it("gives the owner one guided place for reports, photos, videos, content and social links", () => {
    expect(controlCentre).toContain("Manage Press and Media");
    expect(admin).toContain("<PressMediaManager onOpen={openTab} />");
    expect(admin).toContain("Upload reviewed public photos");
    expect(admin).toContain("Add a public video");
    expect(admin).toContain(
      'const PLATFORMS = ["Facebook", "YouTube", "LinkedIn", "Instagram"]'
    );
    expect(ownerGuide).toContain("https://www.abhiarafoundation.org/admin");
    expect(ownerGuide).toContain("https://www.abhiarafoundation.org/admin");
    expect(ownerGuide).toContain("abhiarafoundation@gmail.com");
    expect(pressMedia).toContain("trpc.cms.activities.listPublished.useQuery");
    expect(pressMedia).toContain("trpc.cms.youtube.listPublished.useQuery");
    expect(pressMedia).toContain("trpc.cms.social.listActive.useQuery");
  });

  it("publishes owner-managed reports and approved media to the correct public records", () => {
    expect(monthlyReports).toContain(
      "trpc.cms.activities.listPublished.useQuery"
    );
    expect(monthlyReports).toContain("trpc.cms.gallery.listPublished.useQuery");
    expect(monthlyReports).toContain("trpc.cms.youtube.listPublished.useQuery");
    expect(monthlyReports).toContain('item.category === "education"');
    expect(monthlyReports).toContain("isConsentReviewedBlob");
    expect(monthlyReports).toContain(".public.blob.vercel-storage.com");
    expect(monthlyReports).toContain("/abhiara-images/");
    expect(otherSupport).toContain(
      "trpc.cms.activities.listPublished.useQuery"
    );
    expect(otherSupport).toContain('item.category !== "education"');
    expect(monthlyReports).toContain("object-contain");
    expect(otherSupport).toContain("isReviewedBlob");
    expect(otherSupport).toContain("REVIEWED_SUPPORT_ARCHIVE");
    expect(otherSupport).toContain("object-contain");
    expect(otherSupport).toContain("trpc.cms.gallery.listPublished.useQuery");
    expect(otherSupport).not.toContain("trpc.cms.media.listFolder.useQuery");
    for (const folder of [
      "elder-support",
      "disaster-relief",
      "medical-support",
      "animal-welfare",
    ]) {
      expect(admin).toContain(`<option value="${folder}">`);
    }
    expect(otherSupport).not.toContain("/kankili-");
  });

  it("keeps reviewed public settings narrow and removes unsupported broad archive counters", () => {
    expect(home).not.toContain("stat_students_reached");
    expect(studentImpact).toContain("stat_students_reached");
    expect(otherSupport).not.toContain("stat_activities_completed");
    expect(otherSupport).not.toContain("stat_families_supported");
    expect(otherSupport).not.toContain("stat_districts");
    expect(footer).toContain("email_address");
    expect(footer).toContain("whatsapp_channel_url");
    expect(footer).toContain("trpc.cms.social.listActive.useQuery");
    expect(cmsRouter).toContain('"whatsapp_channel_url"');
    expect(cmsRouter).toContain("getPublicSiteSettings");
    expect(cmsRouter).toContain("Use a secure HTTPS link.");
  });
});
