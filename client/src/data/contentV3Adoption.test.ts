import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path, "utf8");
const programme = read("client/src/pages/Programs.tsx");
const supportProcess = read("client/src/pages/HowWeSupportChild.tsx");
const reports = read("client/src/pages/MonthlyReports.tsx");
const contact = read("client/src/pages/Contact.tsx");
const founder = read("client/src/data/restoredPublicContent.ts");
const vision = read("client/src/pages/AbhiaraVidyapitha.tsx");
const governance = read("client/src/pages/Governance.tsx");
const footer = read("client/src/components/Footer.tsx");

const adoptedPublicCopy = [
  programme,
  supportProcess,
  reports,
  contact,
  founder,
  vision,
  governance,
  footer,
].join("\n");

describe("safe adoption of the supplied content proposal", () => {
  it("explains education support without promising an automatic package or a child home", () => {
    expect(programme).toContain("These are examples, not an automatic package");
    expect(programme).toContain(
      "available records, funds and programme capacity"
    );
    expect(supportProcess).toContain("Education support, not a child home");
    expect(supportProcess).toContain(
      "does not operate a residential child care home"
    );
    expect(supportProcess).toContain("Support is not automatic");
  });

  it("states what public reports show and what stays private", () => {
    expect(reports).toContain("What a public report can show");
    expect(reports).toContain("Shown after review");
    expect(reports).toContain("Kept private");
    for (const protectedField of [
      "exact address",
      "identity document",
      "bank paper",
      "medical record",
      "certificate number",
    ]) {
      expect(reports).toContain(protectedField);
    }
    expect(reports).toContain("stays unpublished");
  });

  it("warns people not to send private child records through the contact form", () => {
    expect(contact).toContain("Please do not send a child's full name");
    expect(contact).toContain(
      "Education support requests are accepted only by email"
    );
    expect(contact).not.toContain("within 48 hours");
    expect(contact).toContain("text-white/70");
  });

  it("keeps the approved founder, legal and future-plan facts", () => {
    expect(founder).toContain(
      "his home village of Raisar in Kendrapara district, Odisha"
    );
    expect(founder).toContain("built his career in Odisha");
    expect(founder).toContain("later moved to Mumbai");
    expect(governance).toContain("U87300MH2026NPL471397");
    expect(governance).toContain("MH/2026/1110513");
    expect(governance).toContain(
      "Application pending; approval is not claimed"
    );
    expect(governance).toContain("No document-backed status published");
    expect(footer).toContain("U87300MH2026NPL471397");
    expect(footer).toContain("MH/2026/1110513");
    expect(footer).toContain("12AB and 80G applications pending");
    expect(footer).toContain(
      "Foreign contributions are not accepted at present"
    );
    expect(vision).toContain("are not accepting enrolment or applications");
  });

  it("does not import placeholder identities or unsupported claims from the proposal", () => {
    expect(adoptedPublicCopy).not.toMatch(
      /Sumi Das|Ananya Das|Rameshwar Prasad|Priya Nair|Anil Joshi|Aditya Rao|Kavita Patel|Sanjay Kumar/i
    );
    expect(adoptedPublicCopy).not.toMatch(
      /1000\+ children supported|registered office address here|CSR Registration Number/i
    );
  });
});
