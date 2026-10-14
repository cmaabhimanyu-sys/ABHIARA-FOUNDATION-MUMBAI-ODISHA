import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const read = (path: string) => readFileSync(path, "utf8");
describe("main education-register impact publication", () => {
  it("seeds exactly the owner-reported 51-student register and its five districts", () => {
    const sql = read("drizzle/0029_education_student_register.sql");
    expect(sql).toContain('"students":51');
    expect(sql).toContain(
      '["Kendrapara","Dhenkanal","Keonjhar","Jajpur","Mayurbhanj"]'
    );
    expect(sql).toContain('"reportedOn":"2026-10-14"');
    expect(sql).toContain("INSERT IGNORE");
    expect(sql).not.toMatch(
      /Fynd|monthlyRecipients|phoneNumber|studentsNames|CSR expenditure/
    );
  });
  it("uses owner-managed data and places the new impact before Student Impact photos", () => {
    const home = read("client/src/pages/Home.tsx");
    const student = read("client/src/pages/StudentImpact.tsx");
    expect(home).toContain("publishedEducationRegister(publicSettings)");
    expect(home).toContain("educationSnapshot && !educationRegister");
    expect(home).toContain("materialsSnapshot={educationSnapshot}");
    expect(student.indexOf("<EducationRegisterImpact")).toBeLessThan(
      student.indexOf("{educationPhotos.length > 0")
    );
    expect(student).toContain("Earlier programme milestones");
    expect(student).toContain(
      "The groups may overlap; do not add them together."
    );
  });
  it("provides bilingual register facts without unsupported tuition, orphan or donor claims", () => {
    const component = read("client/src/components/EducationRegisterImpact.tsx");
    expect(component).toContain("Education Support Across Odisha");
    expect(component).toContain("ଓଡ଼ିଶାର ବିଭିନ୍ନ ଜିଲ୍ଲାରେ ଶିକ୍ଷା ସହାୟତା");
    expect(component).toContain("snapshot.students");
    expect(component).toContain("snapshot.districts.length");
    expect(component).toContain(
      "Names, full addresses and personal records remain private"
    );
    expect(component).toContain("not an Odisha-only eligibility rule");
    expect(component).toContain("/donate?cause=shiksha_sathi");
    expect(component).not.toMatch(
      /51|Fynd|all students receive|mostlyOrphaned|audited impact/
    );
  });
  it("makes register updates, reviewed publication and unpublishing available in Admin", () => {
    const admin = read("client/src/pages/Admin.tsx");
    const editor = read("client/src/components/EducationRegisterEditor.tsx");
    expect(admin).toContain("<EducationRegisterEditor />");
    expect(editor).toContain("parseEducationRegister(");
    expect(editor).toContain("utils.cms.settings.listPublic.invalidate()");
    expect(editor).toContain("(isPublished && !reviewed)");
    expect(editor).toContain("Uncheck and save to hide it");
    expect(editor).not.toContain('type="file"');
  });
});
