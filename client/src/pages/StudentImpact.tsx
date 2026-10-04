import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, GraduationCap, LockKeyhole } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { MONTHLY_REPORT } from "@/data/focusContent";
import { parseVerifiedEducationCounts } from "@/data/verifiedEducationCounts";
import { trpc } from "@/lib/trpc";
import {
  EDUCATION_SNAPSHOT_KEY,
  formatEducationFigure,
  formatEducationSnapshotDate,
  parseEducationSnapshot,
} from "@shared/educationSnapshot";

export default function StudentImpact() {
  const { t, language } = useLanguage();
  const { data: publicSettings = [] } = trpc.cms.settings.listPublic.useQuery(
    undefined,
    { retry: false }
  );
  const savedCounts = publicSettings.find(
    (item: any) => item.settingKey === "stat_students_verified_monthly_counts"
  )?.settingValue;
  const counts = parseVerifiedEducationCounts(savedCounts);
  const snapshot = parseEducationSnapshot(
    publicSettings.find(
      (item: any) => item.settingKey === EDUCATION_SNAPSHOT_KEY
    )?.settingValue
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "Children's Education Impact | Abhiara Shiksha Sathi",
          "ଶିଶୁଙ୍କ ଶିକ୍ଷା ପ୍ରଭାବ | ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ"
        )}
        description={t(
          "Dated, privacy-safe education updates for orphaned children and children from underprivileged families.",
          "ଅନାଥ ଶିଶୁ ଓ ସୁବିଧାବଞ୍ଚିତ ପରିବାରର ଶିଶୁଙ୍କ ପାଇଁ ତାରିଖ ସହ ଗୋପନୀୟତା ସୁରକ୍ଷିତ ଶିକ୍ଷା ଅପଡେଟ।"
        )}
        url="https://www.abhiarafoundation.org/student-impact"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#FAF4E8] pb-20 pt-32 md:pt-40">
          <div className="container max-w-5xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9A6100]">
              {t("Aggregate public record", "ସାମୂହିକ ସାର୍ବଜନିକ ରେକର୍ଡ")}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-bold md:text-6xl">
              {t("Children's Education Impact", "ଶିଶୁଙ୍କ ଶିକ୍ଷା ପ୍ରଭାବ")}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-[#555]">
              {t(
                "We report progress without using a child's situation as publicity. Private names, addresses, school details and sensitive family records are not published.",
                "ଆମେ ଶିଶୁଙ୍କ ପରିସ୍ଥିତିକୁ ପ୍ରଚାର ପାଇଁ ବ୍ୟବହାର ନକରି ଅଗ୍ରଗତି ଦେଉଛୁ। ବ୍ୟକ୍ତିଗତ ନାମ, ଠିକଣା, ସ୍କୁଲ ବିବରଣୀ ଓ ସମ୍ବେଦନଶୀଳ ପରିବାରିକ ରେକର୍ଡ ପ୍ରକାଶ ହୁଏ ନାହିଁ।"
              )}
            </p>
          </div>
        </section>
        {snapshot && (
          <section className="border-b border-[#E8DCC6] bg-[#FFFDF8] py-14 md:py-20">
            <div className="container max-w-6xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9A6100]">
                {t("Foundation-reported figures", "ଫାଉଣ୍ଡେସନ ଦେଇଥିବା ସଂଖ୍ୟା")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-[#1A1A1A]">
                {t("Education work so far", "ଏପର୍ଯ୍ୟନ୍ତ ଶିକ୍ଷା କାମ")}
              </h2>
              <p className="mt-3 text-sm text-[#555]">
                {t(
                  "Reported by Abhiara Foundation on",
                  "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଦେଇଥିବା ତଥ୍ୟ, ତାରିଖ:"
                )}{" "}
                <time dateTime={snapshot.reportedOn}>
                  {formatEducationSnapshotDate(
                    snapshot.reportedOn,
                    language === "od"
                  )}
                </time>
              </p>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <article className="border border-[#E8DCC6] bg-white p-7">
                  <GraduationCap
                    size={26}
                    className="text-[#9A6100]"
                    aria-hidden="true"
                  />
                  <p className="mt-4 font-serif text-4xl font-bold text-[#1A1A1A]">
                    {formatEducationFigure(
                      snapshot.onboarded,
                      language === "od"
                    )}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-bold text-[#1A1A1A]">
                    {t(
                      "Children onboarded for education support",
                      "ଶିକ୍ଷା ସହାୟତା ପାଇଁ ନାମଲେଖା ହୋଇଥିବା ଶିଶୁ"
                    )}
                  </h3>
                  {snapshot.mostlyOrphaned && (
                    <p className="mt-3 text-sm leading-7 text-[#555]">
                      {t(
                        "The Foundation reports that most children in this group are orphaned.",
                        "ଏହି ଶିଶୁମାନଙ୍କ ମଧ୍ୟରୁ ଅଧିକାଂଶ ଅନାଥ ବୋଲି ଫାଉଣ୍ଡେସନ ଜଣାଇଛି।"
                      )}
                    </p>
                  )}
                </article>
                <article className="border border-[#E8DCC6] bg-white p-7">
                  <BookOpen
                    size={26}
                    className="text-[#9A6100]"
                    aria-hidden="true"
                  />
                  <p className="mt-4 font-serif text-4xl font-bold text-[#1A1A1A]">
                    {formatEducationFigure(
                      snapshot.materials,
                      language === "od"
                    )}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-bold text-[#1A1A1A]">
                    {t(
                      "School students who received learning materials",
                      "ପଢ଼ା ସାମଗ୍ରୀ ପାଇଥିବା ସ୍କୁଲ ଛାତ୍ରଛାତ୍ରୀ"
                    )}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#555]">
                    {t(
                      "Books, dictionaries, pens and other school materials were distributed.",
                      "ବହି, ଶବ୍ଦକୋଷ, କଲମ ଓ ଅନ୍ୟ ସ୍କୁଲ ସାମଗ୍ରୀ ବଣ୍ଟନ କରାଯାଇଛି।"
                    )}
                  </p>
                </article>
              </div>
              <p className="mt-5 text-sm leading-7 text-[#555]">
                {t(
                  "These are different activities. Some children may be in both groups, so the figures must not be added together. The figures are Foundation-reported programme milestones, not a monthly tuition count.",
                  "ଏହି ଦୁଇଟି ଅଲଗା କାମ। କେତେକ ଶିଶୁ ଉଭୟ ଗୋଷ୍ଠୀରେ ଥାଇପାରନ୍ତି, ତେଣୁ ସଂଖ୍ୟା ଦୁଇଟିକୁ ମିଶାଇ ମୋଟ ଦର୍ଶାଯିବ ନାହିଁ। ଏଗୁଡ଼ିକ ଫାଉଣ୍ଡେସନ ଦେଇଥିବା କାର୍ଯ୍ୟକ୍ରମ ତଥ୍ୟ, ମାସିକ ଟ୍ୟୁସନ ପାଇଥିବା ଶିଶୁଙ୍କ ସଂଖ୍ୟା ନୁହେଁ।"
                )}
              </p>
            </div>
          </section>
        )}
        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            <h2 className="font-serif text-3xl font-bold">
              {t(
                "Education support by reporting month",
                "ରିପୋର୍ଟ ମାସ ଅନୁସାରେ ଶିକ୍ଷା ସହାୟତା"
              )}
            </h2>
            {counts ? (
              <>
                <p className="mt-4 text-sm text-[#555]">
                  {t("Reporting month ended", "ରିପୋର୍ଟ ମାସର ଶେଷ ତାରିଖ")}:{" "}
                  <time dateTime={counts.month}>{counts.month}</time>
                </p>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {[
                    {
                      icon: GraduationCap,
                      value: counts.recurring,
                      titleEn: "Children receiving monthly tuition support",
                      titleOd: "ମାସିକ ଟ୍ୟୁସନ ସହାୟତା ପାଇଥିବା ଶିଶୁ",
                    },
                    {
                      icon: BookOpen,
                      value: counts.oneTime,
                      titleEn: "Children receiving one-time learning materials",
                      titleOd: "ଏକକାଳୀନ ପଢ଼ା ସାମଗ୍ରୀ ପାଇଥିବା ଶିଶୁ",
                    },
                  ].map(item => (
                    <article
                      key={item.titleEn}
                      className="border border-[#E8DCC6] bg-[#FFFDF8] p-7"
                    >
                      <item.icon size={25} className="text-[#9A6100]" />
                      <p className="mt-5 font-serif text-4xl font-bold">
                        {item.value}
                      </p>
                      <h3 className="mt-2 font-serif text-xl font-bold">
                        {t(item.titleEn, item.titleOd)}
                      </h3>
                    </article>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-[#555]">
                  {t(
                    "Each figure counts distinct children within its own support type for the stated month. A child may appear in both categories; these numbers must not be added into a combined total.",
                    "ପ୍ରତ୍ୟେକ ସଂଖ୍ୟା ଦର୍ଶାଇଥିବା ମାସର ନିଜ ନିଜ ସହାୟତା ପ୍ରକାରରେ ଭିନ୍ନ ଶିଶୁଙ୍କୁ ଗଣେ। ଜଣେ ଶିଶୁ ଦୁଇଟି ବର୍ଗରେ ଥାଇପାରନ୍ତି; ଏହି ସଂଖ୍ୟାକୁ ମିଶାଇ ମୋଟ ବୋଲି ଦେଖାଇବା ଉଚିତ ନୁହେଁ।"
                  )}
                </p>
              </>
            ) : (
              <p className="mt-7 border-l-4 border-[#B56A22] bg-[#FFFDF8] p-6 text-sm leading-7 text-[#555]">
                {t(
                  "A dated, checked breakdown of monthly tuition and one-time learning materials recipients has not yet been published. The Foundation-reported programme figures above are not a month-end breakdown.",
                  "ମାସିକ ଟ୍ୟୁସନ ଓ ଏକକାଳୀନ ପଢ଼ା ସାମଗ୍ରୀ ପାଇଥିବା ଶିଶୁଙ୍କର ତାରିଖ ସହିତ ଯାଞ୍ଚ ହୋଇଥିବା ଅଲଗା ସଂଖ୍ୟା ଏପର୍ଯ୍ୟନ୍ତ ପ୍ରକାଶିତ ହୋଇନାହିଁ। ଉପରେ ଫାଉଣ୍ଡେସନ ଦେଇଥିବା କାର୍ଯ୍ୟକ୍ରମ ସଂଖ୍ୟା ମାସ ଶେଷର ଅଲଗା ହିସାବ ନୁହେଁ।"
                )}
              </p>
            )}
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="bg-[#111111] p-8 text-white">
                <h2 className="font-serif text-2xl font-bold text-white">
                  {t("What support includes", "ସହାୟତାରେ କଣ ରହେ")}
                </h2>
                <p className="mt-4 font-sans text-sm leading-7 text-white/80">
                  {t(MONTHLY_REPORT.supportEn, MONTHLY_REPORT.supportOd)}
                </p>
              </article>
              <article className="border border-[#E8D6B2] bg-[#FFFDF8] p-8">
                <div className="flex items-center gap-3">
                  <LockKeyhole className="text-[#9A6100]" />
                  <h2 className="font-serif text-2xl font-bold">
                    {t("Safeguarding rule", "ସୁରକ୍ଷା ନିୟମ")}
                  </h2>
                </div>
                <p className="mt-4 font-sans text-sm leading-7 text-[#555]">
                  {t(MONTHLY_REPORT.mediaEn, MONTHLY_REPORT.mediaOd)}
                </p>
              </article>
            </div>
            <Link
              href="/monthly-reports"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#8A5700] underline underline-offset-4"
            >
              {t("Read monthly reports", "ମାସିକ ରିପୋର୍ଟ ପଢ଼ନ୍ତୁ")}{" "}
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
