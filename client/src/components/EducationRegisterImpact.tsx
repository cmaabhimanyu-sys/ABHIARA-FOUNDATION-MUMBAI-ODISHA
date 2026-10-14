import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  type EducationRegisterSnapshot,
  registerDistrictName,
} from "@shared/educationRegister";
import {
  type EducationSnapshot,
  formatEducationFigure,
  formatEducationSnapshotDate,
} from "@shared/educationSnapshot";

export default function EducationRegisterImpact({
  snapshot,
  compact = false,
  materialsSnapshot,
}: {
  snapshot: EducationRegisterSnapshot | null;
  compact?: boolean;
  materialsSnapshot?: EducationSnapshot | null;
}) {
  const { t, language } = useLanguage();
  if (!snapshot?.isPublished) return null;
  const odia = language === "od";
  const students = formatEducationFigure(String(snapshot.students), odia);
  const districtCount = formatEducationFigure(
    String(snapshot.districts.length),
    odia
  );
  const districts = snapshot.districts.map(district =>
    registerDistrictName(district, odia)
  );
  return (
    <section
      id="education-register-impact"
      className={`border border-[#E8DCC6] bg-[#FFFDF8] ${compact ? "mb-12 p-6 md:p-8" : "mx-auto my-12 max-w-6xl p-6 md:my-16 md:p-10"}`}
      aria-labelledby="education-register-heading"
    >
      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#8A5700]">
            {t("Our main impact · Education", "ଆମର ପ୍ରମୁଖ ପ୍ରଭାବ · ଶିକ୍ଷା")}
          </p>
          <h2
            id="education-register-heading"
            className="mt-3 font-serif text-3xl font-bold leading-tight text-[#1A1A1A] md:text-4xl"
          >
            {t(
              "Education Support Across Odisha",
              "ଓଡ଼ିଶାର ବିଭିନ୍ନ ଜିଲ୍ଲାରେ ଶିକ୍ଷା ସହାୟତା"
            )}
          </h2>
          <p className="mt-5 text-base leading-8 text-[#444]">
            {t(
              `Abhiara Foundation’s current student register lists ${snapshot.students} students. The recorded addresses represent ${snapshot.districts.length} districts in Odisha: ${districts.join(", ")}.`,
              `ଅଭିଆରା ଫାଉଣ୍ଡେସନର ବର୍ତ୍ତମାନ ଛାତ୍ରଛାତ୍ରୀ ରେଜିଷ୍ଟରରେ ${students} ଜଣଙ୍କ ନାମ ରହିଛି। ରେଜିଷ୍ଟରରେ ଥିବା ଠିକଣା ଅନୁସାରେ ଓଡ଼ିଶାର ${districtCount}ଟି ଜିଲ୍ଲାର ପ୍ରତିନିଧିତ୍ୱ ରହିଛି: ${districts.join(", ")}।`
            )}
          </p>
          <p className="mt-3 text-base leading-8 text-[#444]">
            {t(
              "Through Abhiara Shiksha Sathi, the Foundation aims to help students who need education support continue their studies and work towards their goals.",
              "ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ ମାଧ୍ୟମରେ ଫାଉଣ୍ଡେସନ ଶିକ୍ଷା ସହାୟତା ଆବଶ୍ୟକ କରୁଥିବା ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ପଢ଼ା ଜାରି ରଖିବା ଓ ନିଜ ଲକ୍ଷ୍ୟ ପାଇଁ ଆଗକୁ ବଢ଼ିବାରେ ସହଯୋଗ କରିବାକୁ ଚେଷ୍ଟା କରେ।"
            )}
          </p>
          <p className="mt-4 text-xs leading-6 text-[#65594D]">
            {t(
              "Update shared by the Foundation on",
              "ଫାଉଣ୍ଡେସନ ଦେଇଥିବା ଅପଡେଟ, ତାରିଖ:"
            )}{" "}
            <time dateTime={snapshot.reportedOn}>
              {formatEducationSnapshotDate(snapshot.reportedOn, odia)}
            </time>
          </p>
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
            {t("Impact at a glance", "ପ୍ରଭାବ ଏକ ନଜରରେ")}
          </h3>
          <dl className="mt-5 grid grid-cols-2 gap-4">
            <div className="border border-[#E8DCC6] bg-white p-5">
              <dt className="text-sm leading-6 text-[#555]">
                {t(
                  "Students listed in the current register",
                  "ବର୍ତ୍ତମାନ ରେଜିଷ୍ଟରରେ ଥିବା ଛାତ୍ରଛାତ୍ରୀ"
                )}
              </dt>
              <dd className="mt-3 font-serif text-5xl font-bold text-[#8A5700]">
                {students}
              </dd>
            </div>
            <div className="border border-[#E8DCC6] bg-white p-5">
              <dt className="text-sm leading-6 text-[#555]">
                {t(
                  "Districts represented in recorded addresses",
                  "ରେକର୍ଡ ଠିକଣାରେ ପ୍ରତିନିଧିତ୍ୱ ଥିବା ଜିଲ୍ଲା"
                )}
              </dt>
              <dd className="mt-3 font-serif text-5xl font-bold text-[#8A5700]">
                {districtCount}
              </dd>
            </div>
          </dl>
          <ul
            className="mt-4 flex flex-wrap gap-2"
            aria-label={t(
              "Districts in the student register",
              "ଛାତ୍ରଛାତ୍ରୀ ରେଜିଷ୍ଟରରେ ଥିବା ଜିଲ୍ଲା"
            )}
          >
            {districts.map(district => (
              <li
                key={district}
                className="rounded-full border border-[#E8DCC6] bg-white px-3 py-1.5 text-sm leading-6 text-[#444]"
              >
                {district}
              </li>
            ))}
          </ul>
          {compact && materialsSnapshot && (
            <p className="mt-5 border-t border-[#E8DCC6] pt-4 text-sm leading-7 text-[#555]">
              {t("Separate programme milestone:", "ଅଲଗା କାର୍ଯ୍ୟକ୍ରମ ତଥ୍ୟ:")}{" "}
              <strong>
                {formatEducationFigure(materialsSnapshot.materials, odia)}
              </strong>{" "}
              {t(
                "school students received books and learning materials, reported",
                "ସ୍କୁଲ ଛାତ୍ରଛାତ୍ରୀ ବହି ଓ ପଢ଼ା ସାମଗ୍ରୀ ପାଇଛନ୍ତି; ତଥ୍ୟ ଦିଆଯାଇଥିବା ତାରିଖ:"
              )}{" "}
              {formatEducationSnapshotDate(materialsSnapshot.reportedOn, odia)}.
            </p>
          )}
        </div>
      </div>
      <p className="mt-7 border-t border-[#E8DCC6] pt-5 text-sm leading-7 text-[#555]">
        {t(
          "These figures describe registration and district representation—not monthly tuition payments or measured learning outcomes. A student may also be included in the learning-materials figure; the totals are not added together. Names, full addresses and personal records remain private.",
          "ଏହି ସଂଖ୍ୟା ରେଜିଷ୍ଟରରେ ଥିବା ନାମ ଓ ଜିଲ୍ଲାର ପ୍ରତିନିଧିତ୍ୱକୁ ଦର୍ଶାଏ; ଏହା ମାସିକ ଟ୍ୟୁସନ ଦେୟ ବା ପଢ଼ାର ଫଳାଫଳର ହିସାବ ନୁହେଁ। ଜଣେ ଛାତ୍ର ବା ଛାତ୍ରୀ ପଢ଼ା ସାମଗ୍ରୀ ପାଇଥିବା ଗୋଷ୍ଠୀରେ ମଧ୍ୟ ଥାଇପାରନ୍ତି; ସଂଖ୍ୟା ମିଶାଯାଏ ନାହିଁ। ନାମ, ପୂର୍ଣ୍ଣ ଠିକଣା ଓ ବ୍ୟକ୍ତିଗତ ରେକର୍ଡ ଗୋପନୀୟ ରହେ।"
        )}
      </p>
      {!compact && (
        <p className="mt-3 text-sm leading-7 text-[#555]">
          {t(
            "This update describes the Odisha register, not an Odisha-only eligibility rule. Families from any Indian state may email an education request for case-by-case review, subject to verification and available funds.",
            "ଏହି ଅପଡେଟ ଓଡ଼ିଶାର ରେଜିଷ୍ଟର ବିଷୟରେ; ଶିକ୍ଷା ସହାୟତା କେବଳ ଓଡ଼ିଶା ପାଇଁ ବୋଲି ଏହା ଦର୍ଶାଏ ନାହିଁ। ଭାରତର ଯେକୌଣସି ରାଜ୍ୟର ପରିବାର ଶିକ୍ଷା ସହାୟତା ପାଇଁ ଇମେଲ କରିପାରିବେ। ପ୍ରତ୍ୟେକ ଅନୁରୋଧ ଯାଞ୍ଚ ଓ ଉପଲବ୍ଧ ଅର୍ଥ ଅନୁସାରେ ଅଲଗା ଭାବେ ବିଚାର କରାଯାଏ।"
          )}
        </p>
      )}
      <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
        <Link
          href="/donate?cause=shiksha_sathi"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#8A5700] underline underline-offset-4"
        >
          {t(
            "Support a student’s education",
            "ଜଣେ ଛାତ୍ର ବା ଛାତ୍ରୀଙ୍କ ଶିକ୍ଷାକୁ ସହଯୋଗ କରନ୍ତୁ"
          )}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <Link
          href={compact ? "/student-impact" : "/how-we-support-a-child"}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#1A1A1A] underline underline-offset-4"
        >
          {compact
            ? t(
                "Read the education impact update",
                "ଶିକ୍ଷା ପ୍ରଭାବ ଅପଡେଟ ପଢ଼ନ୍ତୁ"
              )
            : t("How education support works", "ଶିକ୍ଷା ସହାୟତା କିପରି ହୁଏ")}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
