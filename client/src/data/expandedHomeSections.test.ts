import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path, "utf8");
const app = read("client/src/App.tsx");
const gallery = read("client/src/pages/ImpactGallery.tsx");
const wellness = read("client/src/pages/WellnessWellbeing.tsx");
const donate = read("client/src/pages/Donate.tsx");
const navbar = read("client/src/components/Navbar.tsx");
const footer = read("client/src/components/Footer.tsx");
const home = read("client/src/pages/Home.tsx");
const sitemap = read("client/public/sitemap.xml");
const vercel = JSON.parse(read("vercel.json")) as {
  redirects?: Array<{ source: string; destination: string }>;
};

describe("expanded homepage discovery and general giving", () => {
  it("publishes Impact Gallery from owner-published photo records only", () => {
    expect(app).toContain(
      '<Route path="/impact-gallery" component={ImpactGallery} />'
    );
    expect(gallery).toContain("trpc.cms.gallery.listPublished.useQuery");
    expect(gallery).not.toContain("trpc.cms.media.listFolder.useQuery");
    expect(gallery).not.toContain("owner has checked");
    expect(gallery).not.toContain("from Admin");
    expect(gallery).toContain(
      "We do not show names, identity records, bank details or private family information"
    );
    expect(gallery).toContain("object-contain");
    expect(sitemap).toContain(
      "https://www.abhiarafoundation.org/impact-gallery"
    );
    expect(footer).toContain('href: "/impact-gallery"');
    expect(home).toContain('href: "/impact-gallery"');
  });

  it("lets visitors filter reviewed photographs by cause", () => {
    for (const filter of [
      "All photos",
      "Education",
      "Medical",
      "Animals",
      "Elder care",
      "Disaster",
      "Community",
    ]) {
      expect(gallery).toContain(filter);
    }
    expect(gallery).toContain("Filter by cause");
    expect(gallery).toContain('role="group"');
    expect(gallery).toContain("aria-pressed={active}");
    expect(gallery).toContain("counts[filter.key]");
    expect(gallery).toContain("visiblePhotos.length");
    expect(gallery).toContain("data-category={photo.category}");
    expect(gallery).toContain(
      "No ${activeLabel.en.toLowerCase()} photo is available yet."
    );
    expect(gallery).toContain("Read about this work");
    expect(gallery).toContain("publicCategory");
  });

  it("publishes Wellness as a clearly future-only, partner-led page", () => {
    expect(app).toContain(
      '<Route path="/wellness-and-wellbeing" component={WellnessWellbeing} />'
    );
    expect(wellness).toContain("Future plan");
    expect(wellness).toContain("qualified and authorised medical partners");
    expect(wellness).toContain("Not a treatment service");
    expect(wellness).not.toMatch(
      /book an appointment|meet our doctors|we run an active clinic/i
    );
    expect(sitemap).toContain(
      "https://www.abhiarafoundation.org/wellness-and-wellbeing"
    );
  });

  it("makes general one-time giving canonical while retaining the education choice", () => {
    expect(app).toContain('<Route path="/donate" component={Donate} />');
    expect(app).toContain(
      '<Route path="/donate-for-education" component={Donate} />'
    );
    for (const cause of [
      "general",
      "shiksha_sathi",
      "elderly_care",
      "medical_emergency",
      "disaster_relief",
      "animal_welfare",
    ]) {
      expect(donate).toContain(`| "${cause}"`);
    }
    for (const label of [
      "Abhiara Foundation General Fund",
      "Abhiara Shiksha Sathi",
      "Elder Support",
      "Medical Emergency Help",
      "Disaster Relief",
      "Animal Welfare",
    ]) {
      expect(donate).toContain(label);
    }
    expect(donate).toContain('return "general"');
    expect(navbar).toContain('href="/donate"');
    expect(home).toContain('href="/donate"');
    expect(sitemap).toContain("https://www.abhiarafoundation.org/donate");
    expect(vercel.redirects?.some(item => item.source === "/donate")).toBe(
      false
    );
    expect(donate).not.toMatch(
      /subscription|autopay|auto.?debit|monthly donation/i
    );
    expect(donate).toContain(
      "A cause-specific donation is used only for verified needs and programme costs within that selected cause."
    );
    expect(donate).toContain(
      "Education donations stay with education. The same rule applies to elder support, medical help, disaster relief and animal welfare."
    );
    expect(donate).toContain(
      "Your General Fund donation may be used across any approved Abhiara programme"
    );
    expect(donate).toContain("It will not be moved to another cause.");
    expect(donate).toContain(
      "Otherwise it is recorded as a General Fund donation."
    );
  });
});
