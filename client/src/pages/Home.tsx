import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  Activity,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  CloudRain,
  FileText,
  Gift,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  HeartPulse,
  Images,
  MapPinned,
  Newspaper,
  Pause,
  PawPrint,
  Play,
  Quote,
  Scale,
  Search,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ACTIVE_SUPPORT,
  CORE_STATEMENT,
  CORE_STATEMENT_OD,
  FOUNDATION_PROMISE,
  HOME_WORK_AREAS,
  PUBLIC_TAGLINE,
  PUBLIC_TAGLINE_DESCRIPTION,
  PUBLIC_TAGLINE_DESCRIPTION_OD,
} from "@/data/focusContent";
import { trpc } from "@/lib/trpc";

const HOME_WORK_ICONS = {
  education: GraduationCap,
  rural: MapPinned,
  elder: HandHeart,
  medical: HeartPulse,
  wellness: Activity,
  disaster: CloudRain,
  animal: PawPrint,
  awareness: Scale,
  digital: BrainCircuit,
} as const;

const HOME_IMPACT_CATEGORIES: Record<
  string,
  { en: string; od: string; href: string }
> = {
  education: {
    en: "Education",
    od: "ଶିକ୍ଷା",
    href: "/shiksha-sathi",
  },
  elderly: {
    en: "Elder support",
    od: "ବୃଦ୍ଧ ସହାୟତା",
    href: "/elder-care-and-dignity",
  },
  medical: {
    en: "Medical help",
    od: "ଚିକିତ୍ସା ସହାୟତା",
    href: "/medical-emergencies",
  },
  disaster: {
    en: "Disaster relief",
    od: "ବିପର୍ଯ୍ୟୟ ସହାୟତା",
    href: "/natural-disaster",
  },
  animals: {
    en: "Animal welfare",
    od: "ପଶୁ କଲ୍ୟାଣ",
    href: "/animal-welfare",
  },
  events: {
    en: "Education event",
    od: "ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ",
    href: "/abhiara-pratibha-samman",
  },
  community: {
    en: "Community work",
    od: "ସମୁଦାୟ କାମ",
    href: "/impact-gallery",
  },
};

export default function Home() {
  const { t, language } = useLanguage();
  const { data: publicSettings = [] } = trpc.cms.settings.listPublic.useQuery(
    undefined,
    { retry: false }
  );
  const { data: publishedImpactPhotos = [] } =
    trpc.cms.gallery.listPublished.useQuery(undefined, { retry: false });
  const impactPhotos = publishedImpactPhotos
    .filter(
      (photo: any) =>
        (!photo.mediaType || photo.mediaType === "photo") && photo.imageUrl
    )
    .filter(
      (photo: any) =>
        !/press|newspaper|certificate|clipping/i.test(photo.title || "")
    );
  const [activeImpactIndex, setActiveImpactIndex] = useState(0);
  const [impactPaused, setImpactPaused] = useState(false);
  const studentsSupported =
    publicSettings.find(
      (item: any) => item.settingKey === "stat_students_reached"
    )?.settingValue || "50+";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (impactPhotos.length < 2 || impactPaused) return;
    const timer = window.setInterval(() => {
      setActiveImpactIndex(current => (current + 1) % impactPhotos.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [impactPaused, impactPhotos.length]);
  useEffect(() => {
    if (activeImpactIndex >= impactPhotos.length) {
      setActiveImpactIndex(0);
    }
  }, [activeImpactIndex, impactPhotos.length]);
  useEffect(() => {
    for (const photo of impactPhotos) {
      const image = new window.Image();
      image.src = photo.imageUrl;
    }
  }, [publishedImpactPhotos]);

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#1A1A1A]">
      <SEO
        title={t(
          "Abhiara Foundation | Education first. Compassion always.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନ | ଶିକ୍ଷା ପ୍ରଥମ। ଦୟା ସଦା।"
        )}
        description={CORE_STATEMENT}
        url="https://www.abhiarafoundation.org/"
      />
      <Navbar />
      <main id="main-content">
        <section className="relative overflow-hidden bg-[#111111] pt-28 text-white md:pt-36">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 10%, #F5A623 0, transparent 28%), radial-gradient(circle at 90% 70%, #B56A22 0, transparent 24%)",
            }}
          />
          <div className="container relative z-10 grid min-h-[650px] items-center gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr]">
            <AnimatedSection>
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#F5A623]">
                {t("Abhiara Shiksha Sathi", "ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ")}
              </p>
              <p className="mb-5 max-w-4xl font-serif text-4xl font-bold leading-tight text-[#F5A623] md:text-5xl lg:text-6xl">
                {t("Abhiara Foundation", "ଅଭିଆରା ଫାଉଣ୍ଡେସନ")}
              </p>
              <h1 className="max-w-5xl font-serif text-5xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl">
                {t(PUBLIC_TAGLINE, "ଶିକ୍ଷା ପ୍ରଥମ। ଦୟା ସଦା।")}
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-white/75">
                {t(PUBLIC_TAGLINE_DESCRIPTION, PUBLIC_TAGLINE_DESCRIPTION_OD)}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/shiksha-sathi"
                  className="inline-flex items-center justify-center gap-2 rounded bg-[#F5A623] px-6 py-3.5 font-sans text-sm font-bold text-[#1A1A1A] hover:bg-[#E8960E]"
                >
                  {t("See the programme", "କାର୍ଯ୍ୟକ୍ରମ ଦେଖନ୍ତୁ")}{" "}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center gap-2 rounded border border-white/35 px-6 py-3.5 font-sans text-sm font-bold text-white hover:border-[#F5A623] hover:text-[#F5A623]"
                >
                  {t("Donate once", "ଏକକାଳୀନ ଦାନ")}
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="border border-white/15 bg-white/5 p-6 backdrop-blur-sm md:p-8">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5A623] text-[#1A1A1A]">
                    <GraduationCap size={25} />
                  </div>
                  <div>
                    <p className="font-serif text-3xl font-bold">
                      {studentsSupported}
                    </p>
                    <p className="font-sans text-sm text-white/65">
                      {t("children actively supported", "ଶିଶୁ ସକ୍ରିୟ ସହାୟତାରେ")}
                    </p>
                  </div>
                </div>
                <div className="space-y-4 border-t border-white/10 pt-6">
                  {[
                    t(
                      "Ground verification before approval",
                      "ଅନୁମୋଦନ ପୂର୍ବରୁ କ୍ଷେତ୍ର ଯାଞ୍ଚ"
                    ),
                    t(
                      "Need-based tuition and learning support",
                      "ଆବଶ୍ୟକତା ଭିତ୍ତିକ ଟ୍ୟୁସନ ଓ ପଢ଼ା ସହାୟତା"
                    ),
                    t(
                      "Documented follow-up and monthly reporting",
                      "ରେକର୍ଡ ଭିତ୍ତିକ ଅନୁସରଣ ଓ ମାସିକ ରିପୋର୍ଟ"
                    ),
                  ].map((text, index) => {
                    const Icon = [Search, BookOpen, FileText][index];
                    return (
                      <div key={text} className="flex gap-3">
                        <Icon
                          size={18}
                          className="mt-0.5 shrink-0 text-[#F5A623]"
                        />
                        <p className="font-sans text-sm leading-relaxed text-white/75">
                          {text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container">
            <AnimatedSection className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                {t("Our focus", "ଆମର ପ୍ରମୁଖ ଲକ୍ଷ୍ୟ")}
              </p>
              <h2 className="font-serif text-3xl font-bold md:text-5xl">
                {t("Education is our main work.", "ଶିକ୍ଷା ଆମର ମୁଖ୍ୟ କାମ।")}
              </h2>
              <p className="mt-5 font-sans text-base leading-relaxed text-[#555]">
                {language === "od" ? CORE_STATEMENT_OD : CORE_STATEMENT}
              </p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#6B5A42]">
                {t(
                  FOUNDATION_PROMISE,
                  "ଶିକ୍ଷା ସହିତ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଅସହାୟ ବୃଦ୍ଧ, ପଶୁ କଲ୍ୟାଣ, ଚିକିତ୍ସା ଜରୁରୀ ସ୍ଥିତି ଓ ବିପର୍ଯ୍ୟୟ ସହାୟତା ପାଇଁ ସୀମିତ ସହାୟତା ଦେଇପାରେ। ଏହା ଉପଲବ୍ଧ ଅର୍ଥ, କ୍ଷେତ୍ର ଯାଞ୍ଚ ଓ ଅନୁମୋଦିତ ବଜେଟ ଉପରେ ନିର୍ଭର କରେ।"
                )}
              </p>
            </AnimatedSection>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {ACTIVE_SUPPORT.map((item, index) => (
                <AnimatedSection key={item.titleEn} delay={index * 0.04}>
                  <article className="h-full border border-[#E8DCC6] bg-[#FFFDF8] p-6">
                    <span className="font-serif text-3xl font-bold text-[#F5A623]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 font-serif text-xl font-bold">
                      {t(item.titleEn, item.titleOd)}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-[#555]">
                      {t(item.bodyEn, item.bodyOd)}
                    </p>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FAF4E8] py-16 md:py-24">
          <div className="container">
            <AnimatedSection className="mx-auto mb-10 max-w-3xl text-center">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                {t("Explore our work", "ଆମ କାମ ଦେଖନ୍ତୁ")}
              </p>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                {t(
                  "One clear place to find every area of work.",
                  "ପ୍ରତ୍ୟେକ କାମର ବିଭାଗ ଏକ ସ୍ପଷ୍ଟ ସ୍ଥାନରେ।"
                )}
              </h2>
              <p className="mt-4 font-sans text-sm leading-7 text-[#655845]">
                {t(
                  "Each card shows whether the work is active, case based, completed in the past or planned for the future.",
                  "ପ୍ରତ୍ୟେକ କାର୍ଡରେ କାମଟି ବର୍ତ୍ତମାନ ଚାଲିଛି, ଆବଶ୍ୟକତା ଅନୁଯାୟୀ ହୁଏ, ପୂର୍ବରୁ ସମ୍ପୂର୍ଣ୍ଣ ହୋଇଛି ବା ଭବିଷ୍ୟତ ପାଇଁ ପରିକଳ୍ପିତ ବୋଲି ଦିଆଯାଇଛି।"
                )}
              </p>
            </AnimatedSection>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {HOME_WORK_AREAS.map((item, index) => {
                const Icon = HOME_WORK_ICONS[item.key];
                const featured = index === 0;
                return (
                  <AnimatedSection
                    key={item.key}
                    delay={index * 0.03}
                    className={featured ? "md:col-span-2 lg:col-span-1" : ""}
                  >
                    <Link
                      href={item.href}
                      className={`group flex h-full flex-col border p-6 transition-colors ${
                        featured
                          ? "border-[#111111] bg-[#111111] text-white hover:border-[#F5A623]"
                          : "border-[#E8D6B2] bg-white text-[#1A1A1A] hover:border-[#F5A623]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5A623] text-[#1A1A1A]">
                          <Icon size={22} aria-hidden="true" />
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-right font-mono text-[8px] font-bold uppercase tracking-[0.12em] ${
                            featured
                              ? "bg-white/10 text-[#F5A623]"
                              : "bg-[#FFF3D8] text-[#7A4B00]"
                          }`}
                        >
                          {t(item.statusEn, item.statusOd)}
                        </span>
                      </div>
                      <h3
                        className={`mt-6 font-serif text-2xl font-bold ${featured ? "text-white" : ""}`}
                      >
                        {t(item.titleEn, item.titleOd)}
                      </h3>
                      <p
                        className={`mt-3 flex-1 font-sans text-sm leading-7 ${featured ? "text-white/70" : "text-[#555]"}`}
                      >
                        {t(item.bodyEn, item.bodyOd)}
                      </p>
                      <span
                        className={`mt-6 inline-flex items-center gap-2 font-sans text-xs font-bold ${featured ? "text-[#F5A623]" : "text-[#8A5700]"}`}
                      >
                        {t("Open section", "ବିଭାଗ ଖୋଲନ୍ତୁ")}
                        <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/limited-verified-support"
                className="inline-flex items-center gap-2 font-sans text-sm font-bold text-[#9A6100]"
              >
                {t(
                  "Read how limited support works",
                  "ସୀମିତ ସହାୟତା କିପରି ହୁଏ ପଢ଼ନ୍ତୁ"
                )}{" "}
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {impactPhotos.length > 0 && (
          <section
            className="bg-[#111111] py-14 text-white md:py-20"
            data-owner-published-impact-carousel
          >
            <div className="container mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5A623]">
                  {t("Our programmes in pictures", "ଫଟୋରେ ଆମ କାର୍ଯ୍ୟକ୍ରମ")}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-white md:text-5xl">
                  {t(
                    "See the work, one photo at a time.",
                    "ଗୋଟିଏ ପରେ ଗୋଟିଏ ଫଟୋରେ କାମ ଦେଖନ୍ତୁ।"
                  )}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/70">
                  {t(
                    "Programme photos move automatically from one activity to the next. Names and private personal details are not shown.",
                    "କାର୍ଯ୍ୟକ୍ରମ ଫଟୋଗୁଡ଼ିକ ଗୋଟିଏ କାମରୁ ଆଉ ଗୋଟିଏ କାମକୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ ବଦଳେ। ନାମ ଓ ବ୍ୟକ୍ତିଗତ ବିବରଣୀ ଦେଖାଯାଏ ନାହିଁ।"
                  )}
                </p>
              </div>
              <Link
                href="/impact-gallery"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#F5A623]"
              >
                {t("Open Impact Gallery", "ପ୍ରଭାବ ଫଟୋ ଭଣ୍ଡାର ଖୋଲନ୍ତୁ")}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>

            {(() => {
              const photo = impactPhotos[activeImpactIndex] as any;
              const category =
                HOME_IMPACT_CATEGORIES[photo.category] ||
                HOME_IMPACT_CATEGORIES.community;
              return (
                <div
                  className="relative isolate min-h-[590px] overflow-hidden border-y border-white/15 bg-black md:min-h-[680px]"
                  role="region"
                  aria-roledescription="carousel"
                  aria-label={t(
                    "Abhiara Foundation programme photos",
                    "ଅଭିଆରା ଫାଉଣ୍ଡେସନ କାର୍ଯ୍ୟକ୍ରମ ଫଟୋ"
                  )}
                >
                  <img
                    src={photo.imageUrl}
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-2xl"
                  />
                  <div className="absolute inset-0 bg-black/45" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="eager"
                    className="absolute inset-0 h-full w-full object-contain p-3 md:p-6"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setActiveImpactIndex(current =>
                        current === 0 ? impactPhotos.length - 1 : current - 1
                      )
                    }
                    className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-black/55 text-white backdrop-blur-sm hover:border-[#F5A623] hover:text-[#F5A623] md:left-6"
                    aria-label={t("Previous photo", "ପୂର୍ବ ଫଟୋ")}
                  >
                    <ChevronLeft size={24} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImpactIndex(
                        current => (current + 1) % impactPhotos.length
                      )
                    }
                    className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-black/55 text-white backdrop-blur-sm hover:border-[#F5A623] hover:text-[#F5A623] md:right-6"
                    aria-label={t("Next photo", "ପରବର୍ତ୍ତୀ ଫଟୋ")}
                  >
                    <ChevronRight size={24} aria-hidden="true" />
                  </button>

                  <div className="absolute right-4 top-4 z-20 rounded-full border border-white/30 bg-black/60 px-3 py-1.5 font-mono text-[10px] font-bold text-white backdrop-blur-sm md:right-7 md:top-7">
                    {activeImpactIndex + 1} / {impactPhotos.length}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-10">
                    <div className="container flex flex-col gap-5 pb-7 pt-28 md:flex-row md:items-end md:justify-between md:pb-10">
                      <div className="max-w-3xl" aria-live="polite">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5A623]">
                          {t(category.en, category.od)}
                        </p>
                        <h3 className="mt-3 font-serif text-3xl font-bold leading-tight text-white md:text-5xl">
                          {photo.title}
                        </h3>
                        {photo.description && (
                          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
                            {photo.description}
                          </p>
                        )}
                        {(photo.location || photo.dateTaken) && (
                          <p className="mt-3 text-xs leading-6 text-white/65">
                            {[photo.location, photo.dateTaken]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        )}
                        <div className="mt-5 flex flex-wrap gap-3">
                          <Link
                            href={category.href}
                            className="inline-flex items-center gap-2 rounded border border-white/55 bg-black/35 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm hover:border-[#F5A623] hover:text-[#F5A623]"
                          >
                            {t(
                              "Read about this work",
                              "ଏହି କାମ ବିଷୟରେ ପଢ଼ନ୍ତୁ"
                            )}
                            <ArrowRight size={15} aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                      {impactPhotos.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setImpactPaused(current => !current)}
                          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-white/35 bg-black/45 px-4 text-xs font-bold text-white backdrop-blur-sm hover:border-[#F5A623] hover:text-[#F5A623] md:self-end"
                          aria-label={t(
                            impactPaused
                              ? "Play photo carousel"
                              : "Pause photo carousel",
                            impactPaused ? "ଫଟୋ ଚଳାନ୍ତୁ" : "ଫଟୋ ବନ୍ଦ କରନ୍ତୁ"
                          )}
                        >
                          {impactPaused ? (
                            <Play size={16} aria-hidden="true" />
                          ) : (
                            <Pause size={16} aria-hidden="true" />
                          )}
                          {t(
                            impactPaused ? "Play" : "Pause",
                            impactPaused ? "ଚଳାନ୍ତୁ" : "ବନ୍ଦ"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </section>
        )}

        <section className="bg-white py-16 md:py-24">
          <div className="container grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Images,
                title: t("Impact Gallery", "ପ୍ରଭାବ ଫଟୋ ଭଣ୍ଡାର"),
                body: t(
                  "See permission-checked photographs from education and verified ground activities.",
                  "ଶିକ୍ଷା ଓ ଯାଞ୍ଚ ହୋଇଥିବା କ୍ଷେତ୍ର କାମର ଅନୁମତି ଯାଞ୍ଚ ହୋଇଥିବା ଫଟୋ ଦେଖନ୍ତୁ।"
                ),
                href: "/impact-gallery",
              },
              {
                icon: FileText,
                title: t("Monthly public record", "ମାସିକ ସାର୍ବଜନିକ ରେକର୍ଡ"),
                body: t(
                  "Reports share aggregate progress without exposing private child details.",
                  "ରିପୋର୍ଟରେ ବ୍ୟକ୍ତିଗତ ଶିଶୁ ବିବରଣୀ ବିନା ସାମୂହିକ ଅଗ୍ରଗତି ଦିଆଯାଏ।"
                ),
                href: "/monthly-reports",
              },
              {
                icon: HeartHandshake,
                title: t(
                  "Vision and upcoming initiatives",
                  "ଦୃଷ୍ଟିକୋଣ ଓ ଆଗାମୀ ପରିକଳ୍ପନା"
                ),
                body: t(
                  "Future plans bring together a school, an elder care home, a livelihood centre, digital learning with AI basics, and partner-led wellness activities.",
                  "ଭବିଷ୍ୟତ ପରିକଳ୍ପନାରେ ସ୍କୁଲ, ବୃଦ୍ଧ ସେବା ଗୃହ, ଜୀବିକା କେନ୍ଦ୍ର, AI ମୂଳ ଜ୍ଞାନ ସହ ଡିଜିଟାଲ ଶିକ୍ଷା ଓ ସୁସ୍ଥତା କାମ ରହିଛି।"
                ),
                href: "/abhiara-vidyapitha",
              },
            ].map(card => (
              <Link
                key={card.href}
                href={card.href}
                className="group border border-gray-200 p-7 hover:border-[#F5A623]"
              >
                <card.icon className="text-[#B56A22]" size={25} />
                <h3 className="mt-5 font-serif text-xl font-bold">
                  {card.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#555]">
                  {card.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-sans text-xs font-bold text-[#9A6100]">
                  {t("Read more", "ଅଧିକ ପଢ଼ନ୍ତୁ")} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#111111] py-16 text-white md:py-24">
          <div className="container max-w-6xl">
            <AnimatedSection className="mb-10 max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5A623]">
                {t("The human purpose", "ମାନବିକ ଉଦ୍ଦେଶ୍ୟ")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-white md:text-5xl">
                {t(
                  "A story to understand. A simple way to take part.",
                  "ବୁଝିବା ପାଇଁ ଏକ କାହାଣୀ। ଯୋଗ ଦେବାର ଏକ ସରଳ ଉପାୟ।"
                )}
              </h2>
            </AnimatedSection>

            <div className="grid gap-6 lg:grid-cols-3">
              <AnimatedSection>
                <Link
                  href="/our-story"
                  className="group block h-full border border-white/15 bg-white/5 p-7 hover:border-[#F5A623]"
                >
                  <Quote size={27} className="text-[#F5A623]" />
                  <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-[#F5A623]">
                    {t("Why Abhiara", "ଅଭିଆରା କାହିଁକି")}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-white">
                    {t("Our Founder Story", "ଆମ ପ୍ରତିଷ୍ଠାତାଙ୍କ କାହାଣୀ")}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-7 text-white/70">
                    {t(
                      "Abhimanyu Mallik grew up in Raisar, a small rural village in Kendrapara district, Odisha. He built his career in Odisha and later moved to Mumbai. The help he received along the way led him and a few friends to help children stay in school.",
                      "ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ ଓଡ଼ିଶାର କେନ୍ଦ୍ରାପଡ଼ା ଜିଲ୍ଲାର ଛୋଟ ଗ୍ରାମ ରାଇସରରେ ବଢ଼ିଥିଲେ। ସେ ଓଡ଼ିଶାରେ ନିଜ କାର୍ଯ୍ୟଜୀବନ ଗଢ଼ିଥିଲେ ଏବଂ ପରେ ମୁମ୍ବାଇ ଯାଇଥିଲେ। ସେ ପାଇଥିବା ସହାୟତା ତାଙ୍କୁ ଓ କିଛି ସାଙ୍ଗଙ୍କୁ ଶିଶୁଙ୍କ ପଢ଼ା ଜାରି ରଖିବାରେ ସହାୟତା କରିବାକୁ ପ୍ରେରଣା ଦେଲା।"
                    )}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-bold text-[#F5A623]">
                    {t("Read our story", "ଆମ କାହାଣୀ ପଢ଼ନ୍ତୁ")}
                    <ArrowRight size={15} />
                  </span>
                </Link>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <Link
                  href="/birthday-with-purpose"
                  className="group block h-full border border-white/15 bg-white/5 p-7 hover:border-[#F5A623]"
                >
                  <Gift size={27} className="text-[#F5A623]" />
                  <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-[#F5A623]">
                    {t("Share your joy", "ଆପଣଙ୍କ ଖୁସି ବାଣ୍ଟନ୍ତୁ")}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-white">
                    {t("Birthday with Purpose", "ଉଦ୍ଦେଶ୍ୟ ସହ ଜନ୍ମଦିନ")}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-7 text-white/70">
                    {t(
                      "A birthday can become a simple one time gift for education. There is no birthday registration, public listing or separate collection page.",
                      "ଜନ୍ମଦିନ ଶିକ୍ଷା ପାଇଁ ଏକ ସରଳ ଏକଥର ଦାନ ହୋଇପାରେ। ଜନ୍ମଦିନ ପଞ୍ଜୀକରଣ, ସାର୍ବଜନିକ ତାଲିକା ବା ଅଲଗା ସଂଗ୍ରହ ପୃଷ୍ଠା ନାହିଁ।"
                    )}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-bold text-[#F5A623]">
                    {t("See the simple option", "ସରଳ ବିକଳ୍ପ ଦେଖନ୍ତୁ")}
                    <ArrowRight size={15} />
                  </span>
                </Link>
              </AnimatedSection>

              <AnimatedSection>
                <Link
                  href="/press-and-media"
                  className="group block h-full border border-white/15 bg-white/5 p-7 hover:border-[#F5A623]"
                >
                  <Newspaper size={27} className="text-[#F5A623]" />
                  <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-[#F5A623]">
                    {t("See the record", "ରେକର୍ଡ ଦେଖନ୍ତୁ")}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-white">
                    {t("Press and Media", "ପ୍ରେସ ଓ ମିଡିଆ")}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-7 text-white/70">
                    {t(
                      "Activity records, programme photos, public videos and official social links are kept together here.",
                      "କାର୍ଯ୍ୟକଳାପ ରେକର୍ଡ, କାର୍ଯ୍ୟକ୍ରମ ଫଟୋ, ସାର୍ବଜନିକ ଭିଡିଓ ଓ ଅଧିକୃତ ସୋସିଆଲ ଲିଙ୍କ ଏଠାରେ ଏକ ସ୍ଥାନରେ ରହିଛି।"
                    )}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-bold text-[#F5A623]">
                    {t("See public records", "ପ୍ରମାଣ ଭଣ୍ଡାର ଖୋଲନ୍ତୁ")}
                    <ArrowRight size={15} />
                  </span>
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="bg-[#F5A623] py-14">
          <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6F4300]">
                {t("One time donation", "ଏକକାଳୀନ ଦାନ")}
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
                {t(
                  "Support Abhiara Foundation’s verified work.",
                  "ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଯାଞ୍ଚ ହୋଇଥିବା କାମକୁ ସହାୟତା କରନ୍ତୁ।"
                )}
              </h2>
            </div>
            <Link
              href="/donate"
              className="inline-flex shrink-0 items-center gap-2 rounded bg-[#111111] px-7 py-3.5 font-sans text-sm font-bold text-white"
            >
              {t("Choose where to help", "କେଉଁଠି ସହାୟତା କରିବେ ବାଛନ୍ତୁ")}{" "}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
