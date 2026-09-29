import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HEADER_NAV_GROUPS, HOME_WORK_AREAS } from "./focusContent";

const home = readFileSync("client/src/pages/Home.tsx", "utf8");
const app = readFileSync("client/src/App.tsx", "utf8");
const digital = readFileSync("client/src/pages/DigitalLearningAI.tsx", "utf8");
const wellness = readFileSync("client/src/pages/WellnessWellbeing.tsx", "utf8");
const limitedSupport = readFileSync(
  "client/src/pages/LimitedVerifiedSupport.tsx",
  "utf8"
);
const sitemap = readFileSync("client/public/sitemap.xml", "utf8");
const footer = readFileSync("client/src/components/Footer.tsx", "utf8");
const admin = readFileSync("client/src/pages/Admin.tsx", "utf8");
const ownerGuide = readFileSync("OWNER_ADMIN_GUIDE.md", "utf8");

describe("homepage programme panels and future digital learning", () => {
  it("shows six separate programme panels without the rejected priority heading", () => {
    expect(HOME_WORK_AREAS.map(item => item.key)).toEqual([
      "education",
      "rural",
      "elder",
      "medical",
      "disaster",
      "animal",
    ]);
    expect(home).toContain("HOME_WORK_AREAS.map");
    expect(home).toContain("Explore our work");
    expect(home).not.toContain("Our priority order");
    expect(home).not.toContain(
      "Education comes first. Other support is limited."
    );
    expect(limitedSupport).not.toContain("PUBLIC_PRIORITY_ORDER");
  });

  it("keeps medical help open to any checked urgent family need", () => {
    const medical = HOME_WORK_AREAS.find(item => item.key === "medical");
    expect(medical?.bodyEn).toContain("checked urgent medical need");
    expect(medical?.bodyEn).toContain(
      "Cancer and kidney treatment are examples, not the only cases considered"
    );
  });

  it("publishes wellness as a future partner-led plan rather than an active clinic", () => {
    expect(HOME_WORK_AREAS.some(item => item.key === "wellness")).toBe(false);
    expect(app).toContain(
      '<Route path="/wellness-and-wellbeing" component={WellnessWellbeing} />'
    );
    expect(wellness).toContain("Basic health check-up days");
    expect(wellness).toContain("not an active clinic or medical service");
    expect(wellness).toContain("does not diagnose illness");
  });

  it("publishes a separate bilingual future-only digital learning page", () => {
    expect(app).toContain(
      '<Route path="/digital-learning-ai" component={DigitalLearningAI} />'
    );
    expect(sitemap).toContain(
      "https://www.abhiarafoundation.org/digital-learning-ai"
    );
    expect(footer).toContain('href: "/digital-learning-ai"');
    expect(digital).toContain("Computer Lab and AI Basics");
    expect(digital).toContain("Competitive Exam Support");
    expect(digital).toContain("They are not active classes today");
    expect(digital).toContain(
      "No enrolment, training application or certificate is available"
    );
    expect(digital).toContain("child safety rules");
  });

  it("keeps the header compact while making digital learning discoverable", () => {
    expect(HEADER_NAV_GROUPS).toHaveLength(6);
    expect(
      HEADER_NAV_GROUPS.find(group => group.key === "education")?.items.map(
        item => item.href
      )
    ).toEqual(
      expect.arrayContaining([
        "/digital-learning-ai#computer-lab",
        "/digital-learning-ai#competitive-exams",
      ])
    );
  });

  it("keeps RTI and human rights records factual and certificate details private", () => {
    expect(admin).toContain("choose Community archive");
    expect(admin).toMatch(
      /Do\s+not enter participant names or certificate numbers/
    );
    expect(ownerGuide).toContain("completed RTI or human rights class");
    expect(ownerGuide).toContain("unredacted certificate copies");
  });
});
