import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Camera,
  ExternalLink,
  FileText,
  HeartHandshake,
  Instagram,
  MapPin,
  PlayCircle,
  Printer,
  ShieldCheck,
  Video,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  collectReportMedia,
  INSTAGRAM_UPDATES,
  MONTHLY_IMPACT_REPORTS,
  resolveRegistryImageSrc,
  type ImageRegistry,
  type LocalizedText,
  type MonthlyImpactReport,
} from "@/data/monthlyImpact";

const EMPTY_REGISTRY: ImageRegistry = { images: [], videos: [] };

function useImageRegistry() {
  const [registry, setRegistry] = useState<ImageRegistry>(EMPTY_REGISTRY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/images/images.json")
      .then(response => {
        if (!response.ok) throw new Error("Image registry could not be loaded");
        return response.json();
      })
      .then(data => {
        if (active) setRegistry({ images: data.images ?? [], videos: data.videos ?? [] });
      })
      .catch(() => {
        if (active) setRegistry(EMPTY_REGISTRY);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { registry, loading };
}

function Copy({ value }: { value: LocalizedText }) {
  const { language } = useLanguage();
  return <>{language === "od" ? value.od : value.en}</>;
}

function MonthlyReport({ report, registry, index }: {
  report: MonthlyImpactReport;
  registry: ImageRegistry;
  index: number;
}) {
  const { t, language } = useLanguage();
  const media = useMemo(() => collectReportMedia(registry, report), [registry, report]);

  return (
    <article id={report.id} className={index % 2 === 0 ? "bg-white" : "bg-[#FAF7F1]"}>
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-14 items-start">
          <AnimatedSection>
            <div className="lg:sticky lg:top-44">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#9A6100] bg-[#FFF3D6] px-3 py-1.5 rounded-full">
                  <Copy value={report.period} />
                </span>
                <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#666]">
                  <Copy value={report.programme} />
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-5">
                <Copy value={report.title} />
              </h2>
              <p className="font-sans text-[16px] text-[#555] leading-relaxed mb-5">
                <Copy value={report.summary} />
              </p>
              <div className="flex items-start gap-2 text-[#666] mb-7">
                <MapPin size={17} className="text-[#C77700] mt-0.5 shrink-0" />
                <span className="font-sans text-[13px] leading-relaxed">
                  <Copy value={report.locations} />
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 mb-7">
                {report.results.map(result => (
                  <div key={result.value.en} className="border-t border-[#E8D6B2] pt-3">
                    <p className="font-serif text-xl font-bold text-[#9A6100]">
                      <Copy value={result.value} />
                    </p>
                    <p className="font-sans text-[12px] text-[#777] mt-1">
                      <Copy value={result.label} />
                    </p>
                  </div>
                ))}
              </div>

              <ul className="space-y-3">
                {report.notes.map(note => (
                  <li key={note.en} className="flex items-start gap-3 font-sans text-[13px] text-[#555] leading-relaxed">
                    <ShieldCheck size={16} className="text-[#C77700] mt-0.5 shrink-0" />
                    <Copy value={note} />
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <details open={index === 0} className="group border-t border-[#E7DED0]">
              <summary className="cursor-pointer list-none py-5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#9A6100] mb-1">
                    {t("PHOTO AND VIDEO RECORD", "ଫଟୋ ଓ ଭିଡିଓ ରେକର୍ଡ")}
                  </p>
                  <p className="font-sans text-[14px] text-[#555]">
                    {media.length} {t("registered media items", "ରେଜିଷ୍ଟର ମିଡିଆ")}
                  </p>
                </div>
                <span className="font-mono text-[9px] tracking-wider uppercase text-[#9A6100] group-open:hidden">
                  {t("Open", "ଖୋଲନ୍ତୁ")}
                </span>
                <span className="font-mono text-[9px] tracking-wider uppercase text-[#9A6100] hidden group-open:inline">
                  {t("Close", "ବନ୍ଦ କରନ୍ତୁ")}
                </span>
              </summary>

              {media.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                  {media.map((item, mediaIndex) => (
                    <figure
                      key={`${item.type}-${item.src}`}
                      className={mediaIndex === 0 ? "sm:col-span-2" : ""}
                    >
                      <div className={`relative bg-[#111] overflow-hidden ${mediaIndex === 0 ? "h-[250px] md:h-[420px]" : "h-[230px]"}`}>
                        {item.type === "image" ? (
                          <img
                            src={item.src}
                            alt={language === "od" ? report.title.od : item.alt}
                            className="w-full h-full object-contain bg-[#111]"
                            loading="lazy"
                          />
                        ) : (
                          <video
                            controls
                            playsInline
                            preload="metadata"
                            poster={item.poster}
                            className="w-full h-full object-contain bg-black"
                            aria-label={item.alt}
                          >
                            <source src={item.src} />
                            {t("Your browser cannot play this video.", "ଆପଣଙ୍କ ବ୍ରାଉଜର ଏହି ଭିଡିଓ ଚଲାଇ ପାରୁନାହିଁ।")}
                          </video>
                        )}
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-black/70 text-white px-2.5 py-1 font-mono text-[8px] tracking-wider uppercase">
                          {item.type === "image" ? <Camera size={12} /> : <Video size={12} />}
                          {item.type === "image" ? t("Photo", "ଫଟୋ") : t("Video", "ଭିଡିଓ")}
                        </span>
                      </div>
                      <figcaption className="font-sans text-[11px] text-[#777] leading-relaxed pt-2">
                        {item.caption}
                        {item.location ? ` · ${item.location}` : ""}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-[#D8C8A7] p-6 mb-4 text-center">
                  <Camera size={22} className="text-[#C77700] mx-auto mb-2" />
                  <p className="font-sans text-[13px] text-[#777]">
                    {t("The media record is being checked.", "ମିଡିଆ ରେକର୍ଡ ଯାଞ୍ଚ ହେଉଛି।")}
                  </p>
                </div>
              )}
            </details>
          </AnimatedSection>
        </div>
      </div>
    </article>
  );
}

export default function ImpactDashboard() {
  const { t } = useLanguage();
  const { registry, loading } = useImageRegistry();
  const shikshaPhotos = useMemo(() => registry.images
    .filter(image => image.category === "shiksha-sathi")
    .flatMap(image => {
      const src = resolveRegistryImageSrc(image);
      return src ? [{ src, alt: image.alt || "Shiksha Sathi student support record", caption: image.caption || "" }] : [];
    }), [registry]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title={t("Monthly Impact Reports, Abhiara Foundation", "ମାସିକ ପ୍ରଭାବ ରିପୋର୍ଟ, ଅଭିଆରା ଫାଉଣ୍ଡେସନ")}
        description={t(
          "Public monthly reports with verified activities, locations, photos, videos, and results from Abhiara Foundation.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଯାଞ୍ଚ ହୋଇଥିବା କାମ, ସ୍ଥାନ, ଫଟୋ, ଭିଡିଓ ଓ ଫଳାଫଳ ସହ ସାର୍ବଜନୀନ ମାସିକ ରିପୋର୍ଟ।",
        )}
        url="https://abhiarafoundation.org/impact"
      />
      <Navbar />

      <main>
        <section className="relative bg-[#111111] text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,#F5A623_0,transparent_35%),radial-gradient(circle_at_80%_80%,#1A7F8E_0,transparent_30%)]" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-5">
                {t("PUBLIC MONTHLY REPORTS", "ସାର୍ବଜନୀନ ମାସିକ ରିପୋର୍ଟ")}
              </p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold leading-[1.06] mb-6">
                {t("See the work. Check the record.", "କାମ ଦେଖନ୍ତୁ। ରେକର୍ଡ ଯାଞ୍ଚ କରନ୍ତୁ।")}
              </h1>
              <p className="font-sans text-[16px] md:text-[18px] text-white/70 leading-relaxed max-w-2xl mb-8">
                {t(
                  "Each report brings the month’s verified activities, locations, photos, videos, and results together in one public place.",
                  "ପ୍ରତ୍ୟେକ ରିପୋର୍ଟରେ ମାସର ଯାଞ୍ଚ ହୋଇଥିବା କାମ, ସ୍ଥାନ, ଫଟୋ, ଭିଡିଓ ଓ ଫଳାଫଳ ଏକ ସାର୍ବଜନୀନ ସ୍ଥାନରେ ରହିଛି।",
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#monthly-reports"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[10px] font-bold tracking-[0.14em] uppercase"
                >
                  {t("View Monthly Reports", "ମାସିକ ରିପୋର୍ଟ ଦେଖନ୍ତୁ")} <ArrowRight size={14} />
                </a>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/25 text-white font-mono text-[10px] font-bold tracking-[0.14em] uppercase"
                >
                  <Printer size={14} /> {t("Print or Save", "ପ୍ରିଣ୍ଟ କିମ୍ବା ସେଭ କରନ୍ତୁ")}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border-b border-gray-100">
          <div className="container py-10 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {[
                {
                  icon: BookOpen,
                  value: t("50+ students", "୫୦+ ଛାତ୍ରଛାତ୍ରୀ"),
                  label: t("enrolled for monthly tuition, school bags and learning materials", "ମାସିକ ଟ୍ୟୁସନ, ସ୍କୁଲ ବ୍ୟାଗ ଓ ପଢ଼ା ସାମଗ୍ରୀ ପାଇଁ ଯୋଡ଼ା ହୋଇଛନ୍ତି"),
                },
                {
                  icon: HeartHandshake,
                  value: t("57 students", "୫୭ ଛାତ୍ରଛାତ୍ରୀ"),
                  label: t("honoured at Pratibha Samman 2026", "ପ୍ରତିଭା ସମ୍ମାନ ୨୦୨୬ରେ ସମ୍ମାନିତ"),
                },
                {
                  icon: FileText,
                  value: t("5 public records", "୫ ସାର୍ବଜନୀନ ରେକର୍ଡ"),
                  label: t("published with registered media", "ରେଜିଷ୍ଟର ମିଡିଆ ସହ ପ୍ରକାଶିତ"),
                },
              ].map(item => (
                <div key={item.value} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#FFF3D6] flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-[#C77700]" />
                  </div>
                  <div>
                    <p className="font-serif text-xl font-bold text-[#1A1A1A]">{item.value}</p>
                    <p className="font-sans text-[12px] text-[#777] leading-relaxed mt-1">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="monthly-reports" className="bg-[#FAFAFA] py-14 md:py-16 border-b border-gray-100 scroll-mt-40">
          <div className="container">
            <AnimatedSection>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#9A6100] mb-3">
                    {t("REPORT ARCHIVE", "ରିପୋର୍ଟ ତାଲିକା")}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
                    {t("Month by month", "ମାସ ଅନୁସାରେ")}
                  </h2>
                </div>
                <p className="font-sans text-[13px] text-[#777] max-w-xl leading-relaxed">
                  {t(
                    "A report is added only after its date, place, activity, and media are checked. Social posts are shown separately and are not counted as field results.",
                    "ତାରିଖ, ସ୍ଥାନ, କାମ ଓ ମିଡିଆ ଯାଞ୍ଚ ହେବା ପରେ ରିପୋର୍ଟ ଯୋଡ଼ାଯାଏ। ସୋସିଆଲ ପୋଷ୍ଟ ଅଲଗା ଦେଖାଯାଏ ଏବଂ କ୍ଷେତ୍ର ଫଳାଫଳ ଭାବେ ଗଣାଯାଏ ନାହିଁ।",
                  )}
                </p>
              </div>
              <nav className="grid grid-cols-2 lg:grid-cols-5 gap-3" aria-label={t("Monthly impact reports", "ମାସିକ ପ୍ରଭାବ ରିପୋର୍ଟ")}>
                {MONTHLY_IMPACT_REPORTS.map(report => (
                  <a
                    key={report.id}
                    href={`#${report.id}`}
                    className="bg-white border border-gray-100 p-4 hover:border-[#F5A623] transition-colors"
                  >
                    <CalendarDays size={17} className="text-[#C77700] mb-3" />
                    <p className="font-serif text-base font-bold text-[#1A1A1A]"><Copy value={report.period} /></p>
                    <p className="font-sans text-[11px] text-[#777] mt-1"><Copy value={report.programme} /></p>
                  </a>
                ))}
              </nav>
              {loading && (
                <p className="font-sans text-[12px] text-[#888] mt-4">
                  {t("Loading the registered photo and video record…", "ରେଜିଷ୍ଟର ଫଟୋ ଓ ଭିଡିଓ ରେକର୍ଡ ଲୋଡ ହେଉଛି…")}
                </p>
              )}
            </AnimatedSection>
          </div>
        </section>

        {MONTHLY_IMPACT_REPORTS.map((report, index) => (
          <MonthlyReport key={report.id} report={report} registry={registry} index={index} />
        ))}

        <section className="py-16 md:py-20 bg-[#111111] text-white">
          <div className="container">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#F5A623] mb-4">
                    {t("ONGOING EDUCATION SUPPORT", "ଚାଲୁଥିବା ଶିକ୍ଷା ସହାୟତା")}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-5">
                    {t("Shiksha Sathi continues every month", "ଶିକ୍ଷା ସାଥୀ ପ୍ରତି ମାସ ଚାଲିଛି")}
                  </h2>
                  <p className="font-sans text-[16px] text-white/70 leading-relaxed mb-7">
                    {t(
                      "More than 50 students are now enrolled. Each student has lost one or both parents. Support includes monthly tuition fees, school bags and learning materials. This ongoing help is reported separately from one-day activities.",
                      "୫୦ ରୁ ଅଧିକ ଛାତ୍ରଛାତ୍ରୀ ବର୍ତ୍ତମାନ ଯୋଡ଼ା ହୋଇଛନ୍ତି। ପ୍ରତ୍ୟେକ ପିଲା ଜଣେ କିମ୍ବା ଉଭୟ ମାତାପିତାଙ୍କୁ ହରାଇଛନ୍ତି। ସେମାନଙ୍କୁ ମାସିକ ଟ୍ୟୁସନ ଫି, ସ୍କୁଲ ବ୍ୟାଗ ଓ ପଢ଼ା ସାମଗ୍ରୀ ଦିଆଯାଉଛି। ଏହି ଚାଲୁଥିବା ସହାୟତାକୁ ଏକ ଦିନର କାର୍ଯ୍ୟକ୍ରମରୁ ଅଲଗା ଭାବେ ରିପୋର୍ଟ କରାଯାଏ।",
                    )}
                  </p>
                  <Link href="/programs#education" className="inline-flex items-center gap-2 text-[#F5A623] font-mono text-[10px] font-bold tracking-[0.14em] uppercase">
                    {t("Read about Shiksha Sathi", "ଶିକ୍ଷା ସାଥୀ ବିଷୟରେ ପଢ଼ନ୍ତୁ")} <ArrowRight size={13} />
                  </Link>
                </div>
                <details open className="group border-t border-white/20 pt-5">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#F5A623]">
                      {t(`${shikshaPhotos.length} registered ground photos`, `${shikshaPhotos.length} ରେଜିଷ୍ଟର କ୍ଷେତ୍ର ଫଟୋ`)}
                    </span>
                    <span className="font-mono text-[9px] tracking-wider uppercase text-white/60 group-open:hidden">{t("Open", "ଖୋଲନ୍ତୁ")}</span>
                    <span className="font-mono text-[9px] tracking-wider uppercase text-white/60 hidden group-open:inline">{t("Close", "ବନ୍ଦ କରନ୍ତୁ")}</span>
                  </summary>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {shikshaPhotos.map((photo, index) => (
                      <figure key={photo.src} className={index === 0 ? "md:col-span-2" : ""}>
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className={`w-full object-contain bg-[#F4F0E8] ${index === 0 ? "h-64" : "h-44"}`}
                          loading="lazy"
                        />
                        {photo.caption && <figcaption className="font-sans text-[10px] text-white/55 leading-relaxed mt-2">{photo.caption}</figcaption>}
                      </figure>
                    ))}
                  </div>
                </details>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="container">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-5">
                <Instagram size={21} className="text-[#C77700]" />
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#9A6100]">
                  {t("INSTAGRAM UPDATES", "ଇନ୍ଷ୍ଟାଗ୍ରାମ ଅପଡେଟ")}
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-8 lg:gap-12 items-start">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-5">
                    {t("Public information from our official account", "ଆମ ଅଧିକୃତ ଖାତାର ସାର୍ବଜନୀନ ସୂଚନା")}
                  </h2>
                  <p className="font-sans text-[14px] text-[#666] leading-relaxed mb-6">
                    {t(
                      "Instagram posts are shown here as public updates. Only posts linked to a verified activity are included in monthly field results.",
                      "ଇନ୍ଷ୍ଟାଗ୍ରାମ ପୋଷ୍ଟଗୁଡ଼ିକୁ ସାର୍ବଜନୀନ ଅପଡେଟ ଭାବେ ଦେଖାଯାଏ। ଯାଞ୍ଚ ହୋଇଥିବା କାମ ସହ ଯୋଡ଼ିତ ପୋଷ୍ଟକୁ ମାତ୍ର ମାସିକ କ୍ଷେତ୍ର ଫଳାଫଳରେ ରଖାଯାଏ।",
                    )}
                  </p>
                  <a
                    href="https://www.instagram.com/abhiarafoundation/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[#9A6100] font-mono text-[10px] font-bold tracking-[0.14em] uppercase"
                  >
                    @abhiarafoundation <ExternalLink size={13} />
                  </a>
                </div>

                <div className="space-y-6">
                  {INSTAGRAM_UPDATES.map(update => (
                    <article key={update.id} className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-6 border-t border-gray-200 pt-6">
                      <div className="w-full max-w-[340px] mx-auto md:mx-0">
                        <iframe
                          src={update.embedUrl}
                          title={update.title.en}
                          className="w-full min-h-[530px] border border-gray-200 bg-white"
                          loading="lazy"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />
                      </div>
                      <div className="md:pt-5">
                        <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#9A6100] mb-3"><Copy value={update.period} /></p>
                        <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4"><Copy value={update.title} /></h3>
                        <p className="font-sans text-[14px] text-[#666] leading-relaxed mb-6"><Copy value={update.description} /></p>
                        <a
                          href={update.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[9px] font-bold tracking-[0.13em] uppercase"
                        >
                          <PlayCircle size={14} /> {t("Watch on Instagram", "ଇନ୍ଷ୍ଟାଗ୍ରାମରେ ଦେଖନ୍ତୁ")}
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-14 md:py-16 bg-[#F5A623]">
          <div className="container flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-2">
                {t("See the full activity archive", "ସମ୍ପୂର୍ଣ୍ଣ କାର୍ଯ୍ୟ ତାଲିକା ଦେଖନ୍ତୁ")}
              </h2>
              <p className="font-sans text-[14px] text-[#1A1A1A]/70">
                {t("Browse activity notes, gallery photos, videos, and updates.", "କାର୍ଯ୍ୟ ବିବରଣୀ, ଗ୍ୟାଲେରୀ ଫଟୋ, ଭିଡିଓ ଓ ଅପଡେଟ ଦେଖନ୍ତୁ।")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/activities" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#111111] text-white font-mono text-[10px] font-bold tracking-[0.14em] uppercase">
                {t("Activities and Gallery", "କାର୍ଯ୍ୟ ଓ ଗ୍ୟାଲେରୀ")} <ArrowRight size={13} />
              </Link>
              <Link href="/donate" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#1A1A1A]/30 text-[#1A1A1A] font-mono text-[10px] font-bold tracking-[0.14em] uppercase">
                {t("❤️🙏 Donation", "❤️🙏 ଦାନ")} <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
