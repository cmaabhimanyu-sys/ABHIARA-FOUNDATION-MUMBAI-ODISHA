import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HEADER_NAV_GROUPS } from "./focusContent";

const privacy = readFileSync("client/src/pages/Privacy.tsx", "utf8");
const footer = readFileSync("client/src/components/Footer.tsx", "utf8");
const pressMedia = readFileSync("client/src/pages/PressMedia.tsx", "utf8");
const ownerGuide = readFileSync("OWNER_ADMIN_GUIDE.md", "utf8");

describe("privacy and safeguarding policy", () => {
  it("covers both children and elderly persons in English and Odia", () => {
    expect(privacy).toContain("Privacy of Children and Elderly Persons");
    expect(privacy).toContain("ଶିଶୁ ଓ ବୃଦ୍ଧ ବ୍ୟକ୍ତିଙ୍କ ଗୋପନୀୟତା");
    expect(privacy).toContain("Elderly Privacy and Dignity");
    expect(privacy).toContain("ବୃଦ୍ଧ ବ୍ୟକ୍ତିଙ୍କ ଗୋପନୀୟତା ଓ ମର୍ଯ୍ୟାଦା");
  });

  it("protects elderly autonomy, sensitive records, media and dignity", () => {
    expect(privacy).toContain(
      "Older age does not remove a person’s right to decide"
    );
    expect(privacy).toContain(
      "Permission from a family member, caregiver or institution does not replace the person’s own consent"
    );
    expect(privacy).toContain("identity documents, bank or pension details");
    expect(privacy).toContain("health or disability details, prescriptions");
    expect(privacy).toContain(
      "authorised representative’s permission and the Foundation’s safeguarding approval"
    );
    expect(privacy).toContain("broad locations and combined information");
    expect(privacy).toContain("Consent for future public use may be withdrawn");
  });

  it("uses a broad privacy and safeguarding label in navigation and footer", () => {
    const privacyItem = HEADER_NAV_GROUPS.flatMap(group => group.items).find(
      item => item.href === "/privacy"
    );
    expect(privacyItem).toMatchObject({
      en: "Privacy and Safeguarding",
      od: "ଗୋପନୀୟତା ଓ ସୁରକ୍ଷା",
    });
    expect(footer).toContain('en: "Privacy and Safeguarding"');
    expect(pressMedia).toContain('en: "Privacy and Safeguarding"');
    expect(`${footer}\n${pressMedia}`).not.toContain(
      "Privacy and Child Safeguarding"
    );
  });

  it("gives the owner matching elderly media safeguards", () => {
    expect(ownerGuide).toContain(
      "Family, caregiver or institution permission does not replace the person’s own consent"
    );
    expect(ownerGuide).toContain("bank or pension details");
    expect(ownerGuide).toContain(
      "If an elderly person cannot provide informed consent"
    );
    expect(ownerGuide).toContain("if consent is withdrawn");
  });
});
