import { useEffect } from "react";
import {
  Archive,
  CalendarDays,
  ExternalLink,
  FileCheck2,
  MapPin,
  ReceiptText,
  ShieldCheck,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { MONTHLY_REPORT } from "@/data/focusContent";
import { REVIEWED_EDUCATION_ARCHIVE } from "@/data/restoredPublicContent";
import { trpc } from "@/lib/trpc";

function isConsentReviewedBlob(url?: string | null) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      parsed.hostname.endsWith(".public.blob.vercel-storage.com") &&
      parsed.pathname.includes("/abhiara-images/")
    );
  } catch {
    return false;
  }
}

export default function MonthlyReports() {
  const { t } = useLanguage();
  const { data: activities = [], isLoading } =
    trpc.cms.activities.listPublished.useQuery(undefined, { retry: false });
  const { data: gallery = [] } = trpc.cms.gallery.listPublished.useQuery(
    undefined,
    { retry: false }
  );
  const { data: videos = [] } = trpc.cms.youtube.listPublished.useQuery(
    undefined,
    { retry: false }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const educationReports = activities.filter(
    (item: any) =>
      item.category === "education" &&
      (!item.imageUrl || isConsentReviewedBlob(item.imageUrl))
  );
  const educationPhotos = gallery.filter(
    (item: any) =>
      item.category === "education" &&
      item.mediaType !== "video" &&
      isConsentReviewedBlob(item.imageUrl)
  );
  const educationVideos = videos.filter(
    (item: any) =>
      item.category === "education" || item.category === "documentary"
  );
  const fields = [
    [
      CalendarDays,
      t("Report period", "ରିପୋର୍ଟ ସମୟ"),
      t(MONTHLY_REPORT.periodEn, MONTHLY_REPORT.periodOd),
    ],
    [
      Users,
      t("Children supported", "ସହାୟତା ପାଇଥିବା ଶିଶୁ"),
      t(MONTHLY_REPORT.childrenEn, MONTHLY_REPORT.childrenOd),
    ],
    [
      MapPin,
      t("Districts and locations", "ଜିଲ୍ଲା ଓ ସ୍ଥାନ"),
      t(MONTHLY_REPORT.districtsEn, MONTHLY_REPORT.districtsOd),
    ],
    [
      FileCheck2,
      t("Support provided", "ଦିଆଯାଇଥିବା ସହାୟତା"),
      t(MONTHLY_REPORT.supportEn, MONTHLY_REPORT.supportOd),
    ],
    [
      ReceiptText,
      t("Amount spent", "ଖର୍ଚ୍ଚ ରାଶି"),
      t(MONTHLY_REPORT.amountEn, MONTHLY_REPORT.amountOd),
    ],
    [
      ShieldCheck,
      t("Progress and media", "ଅଗ୍ରଗତି ଓ ମିଡିଆ"),
      `${t(MONTHLY_REPORT.progressEn, MONTHLY_REPORT.progressOd)} ${t(
        MONTHLY_REPORT.mediaEn,
        MONTHLY_REPORT.mediaOd
      )}`,
    ],
  ] as const;

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      <SEO
        title={t(
          "Monthly Reports | Abhiara Foundation",
          "ମାସିକ ରିପୋର୍ଟ | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description="Monthly aggregate reporting and reviewed historical education records for Abhiara Shiksha Sathi."
        url="https://www.abhiarafoundation.org/monthly-reports"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pt-40">
          <div className="container max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F5A623]">
              {t("Public accountability", "ସାର୍ବଜନିକ ଜବାବଦେହୀତା")}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-bold text-white md:text-6xl">
              {t("Monthly Reports", "ମାସିକ ରିପୋର୍ଟ")}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/75">
              {t(
                "Each report clearly shows what was approved, given and reviewed, while keeping children's private information safe.",
                "ପ୍ରତ୍ୟେକ ସାର୍ବଜନିକ ରିପୋର୍ଟ ଏକେ ଧରଣର ଢାଞ୍ଚା ଅନୁସରେ, ଯାହାଦ୍ୱାରା ବ୍ୟକ୍ତିଗତ ଶିଶୁ ସୂଚନା ପ୍ରକାଶ ବିନା କଣ ଅନୁମୋଦିତ, ଦିଆଯାଇଥିଲା ଓ ସମୀକ୍ଷା ହୋଇଥିଲା ବୁଝିହେବ।"
              )}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="mb-9">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                {t(
                  "Published by the Foundation",
                  "ମାଲିକ ନିୟନ୍ତ୍ରଣ କେନ୍ଦ୍ରରୁ ପ୍ରକାଶିତ"
                )}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
                {t("Verified field reports", "ଯାଞ୍ଚ ହୋଇଥିବା କ୍ଷେତ୍ର ରିପୋର୍ଟ")}
              </h2>
            </div>
            {isLoading ? (
              <p className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-[#666]">
                {t("Loading published reports…", "ପ୍ରକାଶିତ ରିପୋର୍ଟ ଲୋଡ ହେଉଛି…")}
              </p>
            ) : educationReports.length ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {educationReports.map((report: any) => (
                  <article
                    key={report.id}
                    className="overflow-hidden rounded-xl border border-[#E8DCC6] bg-white"
                  >
                    {isConsentReviewedBlob(report.imageUrl) && (
                      <div className="flex min-h-64 items-center justify-center bg-[#F5EFE3] p-3">
                        <img
                          src={report.imageUrl}
                          alt={report.title}
                          className="max-h-[430px] w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9A6100]">
                        {report.date}
                      </p>
                      <h3 className="mt-3 font-serif text-2xl font-bold">
                        {report.title}
                      </h3>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-[#555]">
                        {report.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2 text-xs text-[#555]">
                        {report.location && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#FAF4E8] px-3 py-1.5">
                            <MapPin size={13} /> {report.location}
                          </span>
                        )}
                        {report.beneficiariesCount && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#FAF4E8] px-3 py-1.5">
                            <Users size={13} /> {report.beneficiariesCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-[#D8C7A5] bg-white p-7 text-sm text-[#666]">
                {t(
                  "No current education report published by the Foundation has completed public media review. Reviewed earlier education records are below.",
                  "ବର୍ତ୍ତମାନ କୌଣସି ମାଲିକ ପ୍ରକାଶିତ ଶିକ୍ଷା ରିପୋର୍ଟ ସାର୍ବଜନିକ ମିଡିଆ ସମୀକ୍ଷା ସମ୍ପୂର୍ଣ୍ଣ କରିନାହିଁ। ସମୀକ୍ଷା ହୋଇଥିବା ପୁରୁଣା ଶିକ୍ଷା ରେକର୍ଡ ତଳେ ଦିଆଯାଇଛି।"
                )}
              </p>
            )}
          </div>
        </section>

        <section className="bg-[#FAF4E8] py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                {t("Archive", "ଆର୍କାଇଭ")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
                {t("Historical education records", "ପୁରୁଣା ଶିକ୍ଷା ରେକର୍ଡ")}
              </h2>
              <p className="mt-4 font-sans text-sm leading-7 text-[#555]">
                {t(
                  "Earlier education work is kept here in clear text. Historic photographs appear only when public consent and privacy review are confirmed.",
                  "ଏହି ସମୀକ୍ଷା ହୋଇଥିବା କାର୍ଡଗୁଡ଼ିକ ପୂର୍ବ ଶିକ୍ଷା କାମକୁ ସ୍ପଷ୍ଟ ଲେଖା ଆକାରରେ ରଖେ। ସାର୍ବଜନିକ ସମ୍ମତି ଓ ଗୋପନୀୟତା ସମୀକ୍ଷା ନିଶ୍ଚିତ ନହେଉଯାଏ ପୁରୁଣା ଫଟୋ ଏହି ଭାଗରେ ଦେଖାଯାଏ ନାହିଁ।"
                )}
              </p>
            </div>

            <div className="mt-9 grid gap-6 lg:grid-cols-2">
              {REVIEWED_EDUCATION_ARCHIVE.map(record => (
                <article
                  key={record.id}
                  className="border border-[#DFC89D] bg-white p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9A6100]">
                        {t(
                          "Historical education record",
                          "ପୁରୁଣା ଶିକ୍ଷା ରେକର୍ଡ"
                        )}
                      </p>
                      <p className="mt-2 font-sans text-sm font-bold text-[#6F4300]">
                        {t(record.date.en, record.date.od)}
                      </p>
                    </div>
                    <Archive size={22} className="shrink-0 text-[#B56A22]" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-bold">
                    {t(record.title.en, record.title.od)}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-7 text-[#555]">
                    {t(record.summary.en, record.summary.od)}
                  </p>
                  <div className="mt-5 grid gap-2 text-xs text-[#555] sm:grid-cols-2">
                    <span className="inline-flex items-start gap-2 bg-[#FFF8EB] px-3 py-2">
                      <MapPin size={14} className="mt-0.5 shrink-0" />
                      {t(record.location.en, record.location.od)}
                    </span>
                    <span className="inline-flex items-start gap-2 bg-[#FFF8EB] px-3 py-2">
                      <FileCheck2 size={14} className="mt-0.5 shrink-0" />
                      {t(record.result.en, record.result.od)}
                    </span>
                  </div>
                  <p className="mt-5 border-t border-[#EFE2CB] pt-4 font-sans text-xs leading-6 text-[#6B6258]">
                    {t(record.reviewNote.en, record.reviewNote.od)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {(educationPhotos.length > 0 || educationVideos.length > 0) && (
          <section className="bg-white py-16">
            <div className="container max-w-6xl">
              <h2 className="font-serif text-3xl font-bold">
                {t("Supporting media", "ସହାୟକ ମିଡିଆ")}
              </h2>
              {educationPhotos.length > 0 && (
                <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {educationPhotos.map((item: any) => (
                    <figure
                      key={item.id}
                      className="overflow-hidden rounded-xl border border-gray-200 bg-[#F5EFE3]"
                    >
                      <div className="flex min-h-64 items-center">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="max-h-[420px] w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <figcaption className="bg-white p-4">
                        <p className="font-serif font-bold">{item.title}</p>
                        {item.description && (
                          <p className="mt-1 text-xs leading-relaxed text-[#666]">
                            {item.description}
                          </p>
                        )}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
              {educationVideos.length > 0 && (
                <div className="mt-7 grid gap-3 md:grid-cols-2">
                  {educationVideos.map((item: any) => (
                    <a
                      key={item.id}
                      href={item.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 p-5 font-sans text-sm font-bold hover:border-[#F5A623]"
                    >
                      {item.title}
                      <ExternalLink size={16} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section className="bg-[#111111] py-16 text-white md:py-20">
          <div className="container max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5A623]">
              {t(
                "Public and private information",
                "ସାର୍ବଜନିକ ଓ ବ୍ୟକ୍ତିଗତ ସୂଚନା"
              )}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white md:text-4xl">
              {t(
                "What a public report can show",
                "ସାର୍ବଜନିକ ରିପୋର୍ଟରେ କଣ ଦେଖାଯାଇପାରେ"
              )}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="border border-white/15 bg-white/5 p-7">
                <FileCheck2 className="text-[#F5A623]" size={24} />
                <h3 className="mt-5 font-serif text-2xl font-bold text-white">
                  {t("Shown after review", "ସମୀକ୍ଷା ପରେ ଦେଖାଯାଏ")}
                </h3>
                <p className="mt-3 font-sans text-sm leading-7 text-white/75">
                  {t(
                    "Report period, broad location, support provided, a checked combined result and a reviewed amount when available.",
                    "ରିପୋର୍ଟ ସମୟ, ବ୍ୟାପକ ସ୍ଥାନ, ଦିଆଯାଇଥିବା ସହାୟତା, ଯାଞ୍ଚ ହୋଇଥିବା ସାମୂହିକ ଫଳାଫଳ ଏବଂ ଉପଲବ୍ଧ ଥିଲେ ସମୀକ୍ଷା ହୋଇଥିବା ରାଶି।"
                  )}
                </p>
              </article>
              <article className="border border-white/15 bg-white/5 p-7">
                <ShieldCheck className="text-[#F5A623]" size={24} />
                <h3 className="mt-5 font-serif text-2xl font-bold text-white">
                  {t("Kept private", "ଗୋପନୀୟ ରଖାଯାଏ")}
                </h3>
                <p className="mt-3 font-sans text-sm leading-7 text-white/75">
                  {t(
                    "A child's full name, exact address, school record, identity document, bank paper, medical record, certificate number and private family history.",
                    "ଶିଶୁର ପୂର୍ଣ୍ଣ ନାମ, ଠିକଣା, ସ୍କୁଲ ରେକର୍ଡ, ପରିଚୟ ପତ୍ର, ବ୍ୟାଙ୍କ କାଗଜ, ଚିକିତ୍ସା ରେକର୍ଡ, ପ୍ରମାଣପତ୍ର ନମ୍ବର ଓ ବ୍ୟକ୍ତିଗତ ପରିବାରିକ ବିବରଣୀ।"
                  )}
                </p>
              </article>
            </div>
            <p className="mt-6 font-sans text-sm leading-7 text-white/65">
              {t(
                "If the date, location, result or permission has not been checked, the record or photo stays unpublished.",
                "ତାରିଖ, ସ୍ଥାନ, ଫଳାଫଳ ବା ଅନୁମତି ଯାଞ୍ଚ ହୋଇନଥିଲେ ରେକର୍ଡ ବା ଫଟୋ ପ୍ରକାଶ ହୁଏ ନାହିଁ।"
              )}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
              {t("Standard public format", "ମାନକ ସାର୍ବଜନିକ ଢାଞ୍ଚା")}
            </p>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {fields.map(([Icon, title, body]) => (
                <article
                  key={title}
                  className="border border-[#E8DCC6] bg-white p-7"
                >
                  <Icon className="text-[#B56A22]" size={24} />
                  <h2 className="mt-5 font-serif text-xl font-bold">{title}</h2>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-[#555]">
                    {body}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-10 border-l-4 border-[#F5A623] bg-white p-7">
              <h2 className="font-serif text-2xl font-bold">
                {t("Finance publication rule", "ଆର୍ଥିକ ପ୍ରକାଶ ନିୟମ")}
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#555]">
                {t(
                  "We publish an amount only after the related monthly record has been reviewed and reconciled. This keeps estimates from being shown as confirmed spending.",
                  "ସମ୍ପର୍କିତ ମାସିକ ରେକର୍ଡ ସମୀକ୍ଷା ଓ ମେଳ ହେବା ପରେ ମାତ୍ର ରାଶି ପ୍ରକାଶ ହୁଏ। ଏହା ଅନୁମାନକୁ ନିଶ୍ଚିତ ଖର୍ଚ୍ଚ ଭାବେ ଦେଖାଇବାକୁ ବାରଣ କରେ।"
                )}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
