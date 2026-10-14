import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
} from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  rollingImpactPhotos,
  rollingImpactVideos,
} from "@/data/rollingImpactPhotos";
import { trpc } from "@/lib/trpc";
import { impactProgrammeContext } from "@/data/impactProgrammeContext";

export default function ImpactRibbon({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { data: published = [] } = trpc.cms.gallery.listPublished.useQuery(
    undefined,
    { retry: false }
  );
  const { data: publishedVideos = [] } =
    trpc.cms.youtube.listPublished.useQuery(undefined, { retry: false });
  const photos = useMemo(() => rollingImpactPhotos(published), [published]);
  const videos = useMemo(
    () => rollingImpactVideos(publishedVideos),
    [publishedVideos]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [isInteracting, setIsInteracting] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [photos.length]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stopForReducedMotion = () => {
      if (preference.matches) setPaused(true);
    };
    preference.addEventListener("change", stopForReducedMotion);
    return () => preference.removeEventListener("change", stopForReducedMotion);
  }, []);
  useEffect(() => {
    if (activeIndex >= photos.length) setActiveIndex(0);
  }, [activeIndex, photos.length]);
  useEffect(() => {
    if (paused || isInteracting || !inView || photos.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setActiveIndex(current => (current + 1) % photos.length);
      }
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, isInteracting, inView, photos.length]);

  const slide = photos[activeIndex] ?? photos[0];
  if (!slide) return null;
  const context = impactProgrammeContext(slide, language);
  const step = (delta: number) =>
    setActiveIndex(
      current => (current + delta + photos.length) % photos.length
    );

  return (
    <section
      ref={sectionRef}
      className={
        compact
          ? "border-b border-[#E8DCC6] bg-[#F8F3E9] pb-5 pt-28 min-[1440px]:pt-32 md:pb-6"
          : "border-t border-[#E8DCC6] bg-[#F8F3E9] py-10 md:py-14"
      }
      role="region"
      aria-roledescription="carousel"
      aria-label={t(
        "Abhiara Foundation impact photographs",
        "ଅଭିଆରା ଫାଉଣ୍ଡେସନର କାମର ଫଟୋ"
      )}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsInteracting(false);
        }
      }}
    >
      <div className="container max-w-7xl">
        <div
          className={`${compact ? "mb-3" : "mb-6"} flex flex-wrap items-end justify-between gap-4`}
        >
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#895A0B]">
              {t("On the ground", "କ୍ଷେତ୍ର କାମ")}
            </p>
            <h2
              className={`mt-1 font-serif font-bold text-[#1A1A1A] ${compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"}`}
            >
              {t("Our work in pictures", "ଫଟୋରେ ଆମ କାମ")}
            </h2>
          </div>
          <Link
            href="/impact-gallery"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#704708] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#704708]"
          >
            {t("See all photos", "ସମସ୍ତ ଫଟୋ ଦେଖନ୍ତୁ")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid overflow-hidden rounded-xl border border-[#E8DCC6] bg-white shadow-[0_12px_36px_rgba(58,42,21,0.06)] md:grid-cols-[minmax(0,3fr)_minmax(220px,1fr)]">
          <div
            className={`relative isolate flex items-center justify-center overflow-hidden bg-[#EDE8DE] ${compact ? "h-[320px] sm:h-[440px] md:h-[470px]" : "h-[360px] sm:h-[500px] md:h-[560px]"}`}
          >
            <img
              src={slide.imageUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-2xl"
              loading="lazy"
            />
            <img
              key={slide.id}
              src={slide.imageUrl}
              alt={context.title}
              className="relative z-10 h-full w-full object-contain p-1 sm:p-2"
              loading="eager"
              fetchPriority="low"
              decoding="async"
            />
          </div>
          <div className="flex flex-col justify-between gap-4 border-t border-[#E8DCC6] p-4 sm:p-5 md:border-l md:border-t-0 md:p-6">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#895A0B]">
                {context.programme}
              </p>
              <h3 className="mt-2 font-serif text-base font-bold leading-snug text-[#1A1A1A] sm:text-lg">
                {context.title}
              </h3>
              {!context.hasActivityDescription && (
                <p className="mt-3 text-xs font-semibold text-[#6B5840]">
                  {t("About this programme", "ଏହି କାର୍ଯ୍ୟକ୍ରମ ବିଷୟରେ")}
                </p>
              )}
              <p className="mt-3 text-sm leading-6 text-[#555]">
                {context.description}
              </p>
              {(context.location || context.date) && (
                <dl className="mt-3 space-y-1 text-xs leading-5 text-[#6B5840]">
                  {context.location && (
                    <div>
                      <dt className="inline font-semibold">
                        {t("Place", "ସ୍ଥାନ")}:{" "}
                      </dt>
                      <dd className="inline">{context.location}</dd>
                    </div>
                  )}
                  {context.date && (
                    <div>
                      <dt className="inline font-semibold">
                        {t("Date", "ତାରିଖ")}:{" "}
                      </dt>
                      <dd className="inline">{context.date}</dd>
                    </div>
                  )}
                </dl>
              )}
              <Link
                href={context.href}
                className="mt-3 inline-flex min-h-10 items-center gap-2 text-xs font-bold text-[#704708] underline underline-offset-4"
              >
                {t("Read about this work", "ଏହି କାମ ବିଷୟରେ ପଢ଼ନ୍ତୁ")}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              {videos.length > 0 && (
                <Link
                  href="/press-and-media#public-videos"
                  className="mt-3 inline-flex min-h-10 items-center gap-2 text-xs font-bold text-[#704708] underline underline-offset-4"
                >
                  <Play size={14} aria-hidden="true" />
                  {t("Watch our story videos", "ଆମ କାହାଣୀ ଭିଡିଓ ଦେଖନ୍ତୁ")}
                </Link>
              )}
            </div>
            {photos.length > 1 && (
              <div className="flex flex-wrap items-center gap-2 border-t border-[#E8DCC6] pt-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={t("Previous impact photo", "ପୂର୍ବ କାମର ଫଟୋ")}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D6C6A8] text-[#4B3B23] hover:bg-[#FFF2DB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#704708]"
                >
                  <ChevronLeft size={19} aria-hidden="true" />
                </button>
                <span className="min-w-16 text-center text-xs font-semibold tabular-nums text-[#6B5840]">
                  {activeIndex + 1} / {photos.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={t("Next impact photo", "ପରବର୍ତ୍ତୀ କାମର ଫଟୋ")}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D6C6A8] text-[#4B3B23] hover:bg-[#FFF2DB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#704708]"
                >
                  <ChevronRight size={19} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setPaused(current => !current)}
                  aria-label={t(
                    paused ? "Play impact photos" : "Pause impact photos",
                    paused ? "ଫଟୋ ଚଳାନ୍ତୁ" : "ଫଟୋ ବନ୍ଦ କରନ୍ତୁ"
                  )}
                  aria-pressed={paused}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[#D6C6A8] px-4 text-xs font-bold text-[#4B3B23] hover:bg-[#FFF2DB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#704708]"
                >
                  {paused ? (
                    <Play size={16} aria-hidden="true" />
                  ) : (
                    <Pause size={16} aria-hidden="true" />
                  )}
                  {t(paused ? "Play" : "Pause", paused ? "ଚଳାନ୍ତୁ" : "ବନ୍ଦ")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
