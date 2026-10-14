import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import EducationRegisterImpact from "@/components/EducationRegisterImpact";
import { publishedEducationRegister } from "@shared/educationRegister";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  publicPhotoText,
  selectStudentImpactPhotos,
} from "@/data/studentImpactPhoto";
import { parseVerifiedEducationCounts } from "@/data/verifiedEducationCounts";
import { rollingImpactVideos } from "@/data/rollingImpactPhotos";
import { trpc } from "@/lib/trpc";
import {
  EDUCATION_SNAPSHOT_KEY,
  formatEducationFigure,
  formatEducationSnapshotDate,
  parseEducationSnapshot,
} from "@shared/educationSnapshot";
import { isAbhiaraHostedVideo } from "@shared/publicVideo";

export default function StudentImpact() {
  const { t, language } = useLanguage();
  const { data: publicSettings = [] } = trpc.cms.settings.listPublic.useQuery(
    undefined,
    { retry: false }
  );
  const educationRegister = publishedEducationRegister(publicSettings);
  const savedCounts = publicSettings.find(
    (item: any) => item.settingKey === "stat_students_verified_monthly_counts"
  )?.settingValue;
  const counts = parseVerifiedEducationCounts(savedCounts);
  const snapshot = parseEducationSnapshot(
    publicSettings.find(
      (item: any) => item.settingKey === EDUCATION_SNAPSHOT_KEY
    )?.settingValue
  );
  const { data: gallery = [] } = trpc.cms.gallery.listPublished.useQuery(
    undefined,
    { retry: false }
  );
  const educationPhotos = selectStudentImpactPhotos(gallery);
  const { data: publishedVideos = [] } =
    trpc.cms.youtube.listPublished.useQuery(undefined, { retry: false });
  const educationVideos = rollingImpactVideos(publishedVideos).filter(
    video =>
      video.category === "education" && isAbhiaraHostedVideo(video.youtubeUrl)
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
        <section className="bg-[#FAF4E8] pb-12 pt-32 md:pt-40">
          <div className="container max-w-5xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9A6100]">
              {t("Aggregate public record", "ସାମୂହିକ ସାର୍ବଜନିକ ରେକର୍ଡ")}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-bold md:text-6xl">
              {t("Children's Education Impact", "ଶିଶୁଙ୍କ ଶିକ୍ଷା ପ୍ରଭାବ")}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-[#555]">
              {t(
                "A look at our education work through published photographs and dated programme figures.",
                "ପ୍ରକାଶିତ ଫଟୋ ଓ ତାରିଖ ସହ କାର୍ଯ୍ୟକ୍ରମ ସଂଖ୍ୟାରେ ଆମ ଶିକ୍ଷା କାମକୁ ଦେଖନ୍ତୁ।"
              )}
            </p>
          </div>
        </section>
        <div className="container max-w-6xl">
          <EducationRegisterImpact snapshot={educationRegister} />
        </div>
        {educationPhotos.length > 0 && (
          <section className="border-b border-[#E8DCC6] bg-white py-12 md:py-16">
            <div className="container max-w-6xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9A6100]">
                {t("Education work in pictures", "ଫଟୋରେ ଶିକ୍ଷା କାମ")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-[#1A1A1A]">
                {t("From our programmes", "ଆମ କାର୍ଯ୍ୟକ୍ରମରୁ")}
              </h2>
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {educationPhotos.map((photo, index) => (
                  <figure
                    key={photo.id}
                    className={`flex flex-col overflow-hidden border border-[#E8DCC6] bg-[#FAF4E8] ${index === 0 ? "sm:col-span-2 lg:row-span-2" : ""}`}
                  >
                    <div
                      className={`flex items-center justify-center bg-[#F4EFE6] p-2 ${index === 0 ? "min-h-72 flex-1" : "h-52"}`}
                    >
                      <img
                        src={photo.imageUrl}
                        alt={publicPhotoText(photo.title, language === "od")}
                        loading="eager"
                        className={`w-full object-contain ${index === 0 ? "max-h-[38rem]" : "max-h-48"}`}
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-sm font-semibold leading-6 text-[#28221B]">
                      {publicPhotoText(photo.title, language === "od")}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
                <Link
                  href="/impact-gallery"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#8A5700] underline underline-offset-4"
                >
                  {t("All education photos", "ସମସ୍ତ ଶିକ୍ଷା ଫଟୋ")}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-4 text-xs leading-6 text-[#65594D]">
                {t(
                  "Photos show activities, not measured learning outcomes. Children's private details are not published.",
                  "ଫଟୋ କାର୍ଯ୍ୟକ୍ରମକୁ ଦେଖାଏ, ପଢ଼ାର ଫଳ ମାପେ ନାହିଁ। ଶିଶୁଙ୍କ ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ପ୍ରକାଶ କରାଯାଏ ନାହିଁ।"
                )}
              </p>
              {educationVideos.length > 0 && (
                <div className="mt-12 border-t border-[#E8DCC6] pt-9">
                  <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                    {t("Stories in video", "ଭିଡିଓରେ ଆମ କାମ")}
                  </h2>
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    {educationVideos.map(video => (
                      <figure
                        key={video.id}
                        className="overflow-hidden border border-[#E8DCC6] bg-[#FFFDF8]"
                      >
                        <video
                          className="aspect-video w-full bg-[#1A1A1A] object-contain"
                          controls
                          playsInline
                          preload="none"
                          aria-label={publicPhotoText(
                            video.title,
                            language === "od"
                          )}
                        >
                          <source src={video.youtubeUrl} type="video/mp4" />
                          {t(
                            "Your browser cannot play this video.",
                            "ଆପଣଙ୍କ ବ୍ରାଉଜର ଏହି ଭିଡିଓ ଚଳାଇପାରୁ ନାହିଁ।"
                          )}
                        </video>
                        <figcaption className="p-4 text-sm font-semibold leading-6 text-[#28221B]">
                          {publicPhotoText(video.title, language === "od")}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                  <Link
                    href="/press-and-media#public-videos"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8A5700] underline underline-offset-4"
                  >
                    {t(
                      "See all public videos",
                      "ସମସ୍ତ ସାର୍ବଜନିକ ଭିଡିଓ ଦେଖନ୍ତୁ"
                    )}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}
        {snapshot && (
          <section className="border-b border-[#E8DCC6] bg-[#FFFDF8] py-14 md:py-20">
            <div className="container max-w-6xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9A6100]">
                {t("Foundation-reported figures", "ଫାଉଣ୍ଡେସନ ଦେଇଥିବା ସଂଖ୍ୟା")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-[#1A1A1A]">
                {educationRegister &&
                educationRegister.reportedOn > snapshot.reportedOn
                  ? t(
                      "Earlier programme milestones",
                      "ପୂର୍ବରୁ ଦିଆଯାଇଥିବା କାର୍ଯ୍ୟକ୍ରମ ତଥ୍ୟ"
                    )
                  : t("Education work so far", "ଏପର୍ଯ୍ୟନ୍ତ ଶିକ୍ଷା କାମ")}
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
                  "Foundation-reported programme figures, not monthly tuition counts. The groups may overlap; do not add them together.",
                  "ଏଗୁଡ଼ିକ ଫାଉଣ୍ଡେସନ ଦେଇଥିବା କାର୍ଯ୍ୟକ୍ରମ ସଂଖ୍ୟା, ମାସିକ ଟ୍ୟୁସନ ସଂଖ୍ୟା ନୁହେଁ। କେତେକ ଶିଶୁ ଉଭୟ ଗୋଷ୍ଠୀରେ ଥାଇପାରନ୍ତି; ସଂଖ୍ୟା ମିଶାନ୍ତୁ ନାହିଁ।"
                )}
              </p>
            </div>
          </section>
        )}
        <section className="py-12 md:py-16">
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
                    "These are separate counts for the stated month. A child may appear in both; do not add them together.",
                    "ଏହା ଦର୍ଶାଇଥିବା ମାସର ଅଲଗା ସଂଖ୍ୟା। ଜଣେ ଶିଶୁ ଉଭୟରେ ଥାଇପାରନ୍ତି; ସଂଖ୍ୟା ମିଶାନ୍ତୁ ନାହିଁ।"
                  )}
                </p>
              </>
            ) : (
              <p className="mt-5 text-sm leading-7 text-[#555]">
                {t(
                  "A checked monthly breakdown has not yet been published. The figures above are programme milestones, not month-end counts.",
                  "ଯାଞ୍ଚ ହୋଇଥିବା ମାସିକ ଅଲଗା ସଂଖ୍ୟା ଏପର୍ଯ୍ୟନ୍ତ ପ୍ରକାଶିତ ହୋଇନାହିଁ। ଉପର ସଂଖ୍ୟା କାର୍ଯ୍ୟକ୍ରମ ତଥ୍ୟ, ମାସ ଶେଷର ହିସାବ ନୁହେଁ।"
                )}
              </p>
            )}
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
              <Link
                href="/monthly-reports"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#8A5700] underline underline-offset-4"
              >
                {t("Read monthly reports", "ମାସିକ ରିପୋର୍ଟ ପଢ଼ନ୍ତୁ")}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                href="/how-we-support-a-child"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#8A5700] underline underline-offset-4"
              >
                {t(
                  "How to request education support",
                  "ଶିକ୍ଷା ସହାୟତା କିପରି ମାଗିବେ"
                )}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
