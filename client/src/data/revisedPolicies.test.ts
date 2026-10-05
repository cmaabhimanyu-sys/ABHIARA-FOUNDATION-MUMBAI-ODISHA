import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const donation = readFileSync("client/src/pages/DonationPolicy.tsx", "utf8");
const terms = readFileSync("client/src/pages/Terms.tsx", "utf8");
const faq = readFileSync("client/src/pages/FAQ.tsx", "utf8");
const ownerGuide = readFileSync("OWNER_ADMIN_GUIDE.md", "utf8");

function allText() {
  return `${donation}\n${terms}`;
}

describe("owner-revised donation and website policies", () => {
  it("publishes the complete donation policy in English and Odia with real contact details", () => {
    expect(donation.match(/heading:\s*\{/g)).toHaveLength(9);
    expect(donation).toContain("Official payment channels");
    expect(donation).toContain("How donations are used");
    expect(donation).toContain("Tax status and acknowledgements");
    expect(donation).toContain("General refund position");
    expect(donation).toContain("How to request a refund");
    expect(donation).toContain("How approved refunds are paid");
    expect(donation).toContain("Failed or pending payments");
    expect(donation).toContain("Lawful donations");
    expect(donation).toContain("Changes and contact");
    expect(donation).toContain("ଶେଷ ଅଦ୍ୟତନ: ୫ ଅକ୍ଟୋବର ୨୦୨୬");
    expect(donation).toContain("info@abhiarafoundation.org");
    expect(donation).toContain(
      "https://www.abhiarafoundation.org/donation-and-refund-policy"
    );
  });

  it("preserves donor intent, transparent refund handling and payment security", () => {
    for (const phrase of [
      "without the donor's consent",
      "it remains recorded for that cause",
      "agree on another lawful use or a refund",
      "verified duplicate payment",
      "our error will be refunded",
      "within 7 days of discovering an issue",
      "still review a later request",
      "within 3 working days",
      "within 10 working days",
      "card PIN, password or one-time password",
      "original payment method",
      "will not deduct payment charges",
      "non-recoverable payment-provider charge",
      "Do not pay again",
      "not an 80G certificate",
    ]) {
      expect(donation).toContain(phrase);
    }
    expect(donation).toContain("one-time only");
    expect(donation).toContain(
      "We do not accept foreign contributions at present"
    );
    expect(donation).toContain(
      "We will explain a decision to decline a refund"
    );
    expect(donation).toContain(
      "ଆମ ତ୍ରୁଟି ଯୋଗୁଁ ଆଦାୟ ହୋଇଥିବା ରାଶି ଫେରସ୍ତ କରିବୁ"
    );
    expect(faq).toContain(
      "We will not move it to another cause without your consent"
    );
    expect(ownerGuide).toContain(
      "within **10 working days after sufficient verification information is received**"
    );
    expect(ownerGuide).toContain(
      "Never request a card PIN, password or one-time password"
    );
  });

  it("publishes complete Terms of Use and cross-links privacy and refund policies", () => {
    expect(terms.match(/heading:\s*\{/g)).toHaveLength(11);
    for (const heading of [
      "About us",
      "Use of the website",
      "Donations",
      "Website information",
      "Website content",
      "Privacy and safeguarding",
      "Other websites",
      "Questions and grievances",
      "Changes to these terms",
      "Governing law",
      "Contact",
    ]) {
      expect(terms).toContain(`en: "${heading}"`);
    }
    expect(terms).toContain('href="/donation-and-refund-policy"');
    expect(terms).toContain('href="/privacy"');
    expect(terms).toContain("subject=Urgent%20safeguarding%20concern");
    expect(terms).toContain("not retrospectively alter");
    expect(terms).toContain("Subject to applicable law");
    expect(terms).toContain("from any Indian state for case-by-case review");
    expect(terms).toContain("ଶେଷ ଅଦ୍ୟତନ: ୫ ଅକ୍ଟୋବର ୨୦୨୬");
  });

  it("does not invent office contact facts, 80G approval, recurring payments or public child records", () => {
    expect(allText()).not.toMatch(
      /\[full registered office address\]|\[telephone number\]|\[name or role\]|Last updated: ___/i
    );
    expect(allText()).not.toMatch(
      /80G approval granted|FCRA approval granted|recurring donation available|Razorpay/
    );
    expect(terms).toContain("Do not post anyone's private details publicly");
    expect(terms).toContain("12AB and 80G applications are pending");
    expect(donation).toContain("12AB and 80G applications are pending");
    expect(terms).toContain("Registered office: Mumbai, Maharashtra");
  });
});
