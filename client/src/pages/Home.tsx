import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
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

const HERO_PHOTO_CATEGORIES: Record<string, string> = {
  education: "education",
  rural: "community",
  elder: "elderly",
  medical: "medical",
  disaster: "disaster",
  animal: "animals",
};

const HERO_DONATION_CAUSES: Record<string, string> = {
  education: "shiksha_sathi",
  rural: "shiksha_sathi",
  elder: "elderly_care",
  medical: "medical_emergency",
  disaster: "disaster_relief",
  animal: "animal_welfare",
};

export default function Home() {
  const { t, language } = useLanguage();
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
  const heroSlides = HOME_WORK_AREAS.map(area => ({
    ...area,
    photo:
      impactPhotos.find(
        (photo: any) => photo.category === HERO_PHOTO_CATEGORIES[area.key]
      ) || null,
  }));
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [activeImpactIndex, setActiveImpactIndex] = useState(0);
  const [impactPaused, setImpactPaused] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (heroSlides.length < 2 || heroPaused) return;
    const timer = window.setInterval(() => {
      setActiveHeroIndex(current => (current + 1) % heroSlides.length);
    }, 5600);
    return () => window.clearInterval(timer);
  }, [heroPaused, heroSlides.length]);
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
    const photosToPreload = [
      ...heroSlides.map(slide => slide.photo).filter(Boolean),
      impactPhotos[activeImpactIndex],
      impactPhotos[(activeImpactIndex + 1) % impactPhotos.length],
    ];
    for (const photo of photosToPreload) {
      if (!photo) continue;
      const image = new window.Image();
      image.src = photo.imageUrl;
    }
  }, [publishedImpactPhotos, activeImpactIndex]);

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
        <section
          className="relative overflow-hidden bg-[#111111] pt-28 text-white md:pt-36"
          aria-roledescription="carousel"
          aria-label={t(
            "Abhiara Foundation programmes",
            "ଅଭିଆରା ଫାଉଣ୍ଡେସନ କାର୍ଯ୍ୟକ୍ରମ"
          )}
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
          onFocusCapture={() => setHeroPaused(true)}
          onBlurCapture={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setHeroPaused(false);
            }
          }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #8A5418 0, transparent 34%), radial-gradient(circle at 85% 75%, #5A3513 0, transparent 30%)",
            }}
          />
          {heroSlides.map((slide, index) =>
            slide.photo ? (
              <img
                key={slide.key}
                src={slide.photo.imageUrl}
                alt=""
                aria-hidden="true"
                loading="eager"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  index === activeHeroIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ) : null
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

          <div className="container relative z-10 flex min-h-[650px] items-center py-16 md:min-h-[700px]">
            {heroSlides.map((slide, index) => {
              const Icon = HOME_WORK_ICONS[slide.key];
              const isActive = index === activeHeroIndex;
              return (
                <div
                  key={slide.key}
                  aria-hidden={!isActive}
                  aria-live={isActive ? "polite" : undefined}
                  className={isActive ? "max-w-4xl" : "hidden"}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F5A623] text-[#111111]">
                        <Icon size={20} />
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5A623]">
                        {t(slide.statusEn, slide.statusOd)}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(heroSlides.length).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mb-4 font-serif text-3xl font-bold text-[#F5A623] sm:text-4xl md:text-5xl">
                      {t("Abhiara Foundation", "ଅଭିଆରା ଫାଉଣ୍ଡେସନ")}
                    </p>
                    <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/75 sm:text-xs">
                      {t("Fearless Ray of Light", "ନିର୍ଭୀକ ଆଲୋକର କିରଣ")}
                    </p>
                    <h1 className="max-w-4xl font-serif text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                      {slide.key === "education"
                        ? t(PUBLIC_TAGLINE, "ଶିକ୍ଷା ପ୍ରଥମ। ଦୟା ସଦା।")
                        : t(slide.titleEn, slide.titleOd)}
                    </h1>
                    <p className="mt-6 max-w-2xl font-sans text-base leading-7 text-white/80 md:text-lg">
                      {slide.key === "education"
                        ? t(
                            PUBLIC_TAGLINE_DESCRIPTION,
                            PUBLIC_TAGLINE_DESCRIPTION_OD
                          )
                        : t(slide.bodyEn, slide.bodyOd)}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={slide.href}
                        className="inline-flex items-center justify-center gap-2 rounded bg-[#F5A623] px-6 py-3.5 font-sans text-sm font-bold text-[#1A1A1A] hover:bg-[#E8960E]"
                      >
                        {t("Explore this programme", "ଏହି କାର୍ଯ୍ୟକ୍ରମ ଦେଖନ୍ତୁ")}
                        <ArrowRight size={16} />
                      </Link>
                      <Link
                        href={`/donate?cause=${HERO_DONATION_CAUSES[slide.key]}`}
                        className="inline-flex items-center justify-center gap-2 rounded border border-white/50 bg-black/20 px-6 py-3.5 font-sans text-sm font-bold text-white backdrop-blur-sm hover:border-[#F5A623] hover:text-[#F5A623]"
                      >
                        {t("Donate for this work", "ଏହି କାମ ପାଇଁ ଦାନ")}
                      </Link>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() =>
              setActiveHeroIndex(
                current => (current - 1 + heroSlides.length) % heroSlides.length
              )
            }
            aria-label={t("Previous programme", "ପୂର୍ବ କାର୍ଯ୍ୟକ୍ରମ")}
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/40 text-white backdrop-blur-sm hover:border-[#F5A623] hover:text-[#F5A623] md:left-6"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveHeroIndex(current => (current + 1) % heroSlides.length)
            }
            aria-label={t("Next programme", "ପରବର୍ତ୍ତୀ କାର୍ଯ୍ୟକ୍ରମ")}
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/40 text-white backdrop-blur-sm hover:border-[#F5A623] hover:text-[#F5A623] md:right-6"
          >
            <ChevronRight size={22} />
          </button>

          <div className="absolute inset-x-0 bottom-4 z-20">
            <div className="container flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.key}
                    type="button"
                    onClick={() => setActiveHeroIndex(index)}
                    aria-label={t(
                      `Show ${slide.titleEn}`,
                      `${slide.titleOd} ଦେଖନ୍ତୁ`
                    )}
                    aria-current={
                      index === activeHeroIndex ? "true" : undefined
                    }
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeHeroIndex
                        ? "w-9 bg-[#F5A623]"
                        : "w-2.5 bg-white/45 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setHeroPaused(current => !current)}
                aria-label={
                  heroPaused
                    ? t("Play programme carousel", "କାର୍ଯ୍ୟକ୍ରମ ସ୍ଲାଇଡ ଚଳାନ୍ତୁ")
                    : t(
                        "Pause programme carousel",
                        "କାର୍ଯ୍ୟକ୍ରମ ସ୍ଲାଇଡ ବିରତ କରନ୍ତୁ"
                      )
                }
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 font-sans text-xs font-bold text-white backdrop-blur-sm hover:border-[#F5A623] hover:text-[#F5A623]"
              >
                {heroPaused ? <Play size={14} /> : <Pause size={14} />}
                {heroPaused ? t("Play", "ଚଳାନ୍ତୁ") : t("Pause", "ବିରତ")}
              </button>
            </div>
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
