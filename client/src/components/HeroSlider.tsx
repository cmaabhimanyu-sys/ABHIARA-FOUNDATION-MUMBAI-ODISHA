/**
 * HeroSlider. Full-width image slider with auto-rotation
 * Light amber nature-positive aesthetic with soft overlays
 * Pulls slides from CMS (admin panel). Falls back to defaults if no DB slides exist.
 */
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { trpc } from "@/lib/trpc";

/* ── Default Slide Data (used when no DB slides exist) ── */
const FOUNDER_JOURNEY_IMG = "/images/founder-journey.webp";
const EDUCATION_IMG = "/images/education-village-session.jpeg";
const ELDERLY_IMG = "/images/elderly-care-visit-1.jpeg";

interface SlideData {
  image: string;
  titleEn: string;
  titleOd: string;
  subtitleEn: string;
  subtitleOd: string;
  ctaEn: string;
  ctaOd: string;
  ctaHref: string;
  accent: string;
}

const DEFAULT_SLIDES: SlideData[] = [
  {
    image: FOUNDER_JOURNEY_IMG,
    titleEn: "Fearless. Purposeful. Rooted.",
    titleOd: "ନିର୍ଭୟ। ଉଦ୍ଦେଶ୍ୟପୂର୍ଣ୍ଣ। ମୂଳଭୂତ।",
    subtitleEn: "Abhiara Foundation stands for education, dignity and timely support. Every practical step can protect someone's hope.",
    subtitleOd: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଶିକ୍ଷା, ସମ୍ମାନ ଓ ସମୟୋପଯୋଗୀ ସହାୟତା ପାଇଁ ଦୃଢ଼ ଭାବେ ଠିଆ ହୁଏ। ପ୍ରତ୍ୟେକ ବ୍ୟବହାରିକ ପଦକ୍ଷେପ କାହାରି ଆଶାକୁ ସୁରକ୍ଷିତ ରଖିପାରେ।",
    ctaEn: "OUR STORY",
    ctaOd: "ଆମ କାହାଣୀ",
    ctaHref: "/our-story",
    accent: "#F5A623",
  },
  {
    image: EDUCATION_IMG,
    titleEn: "Education That Reaches the Village",
    titleOd: "ଜ୍ଞାନର ପଥ ଆଲୋକିତ କରୁ",
    subtitleEn: "Monthly tuition support, school bags, books, and learning materials for students who need help across Odisha.",
    subtitleOd: "ଓଡ଼ିଶାରେ ସହାୟତା ଆବଶ୍ୟକ ଥିବା ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ମାସିକ ଟ୍ୟୁସନ ସହାୟତା, ସ୍କୁଲ ବ୍ୟାଗ, ବହି ଓ ପଢ଼ା ସାମଗ୍ରୀ।",
    ctaEn: "SEE PROGRAMMES",
    ctaOd: "କାର୍ଯ୍ୟକ୍ରମ ଦେଖନ୍ତୁ",
    ctaHref: "/programs",
    accent: "#F5A623",
  },
  {
    image: ELDERLY_IMG,
    titleEn: "Caring for Our Elders",
    titleOd: "ଜୀବନର ପ୍ରତ୍ୟେକ ଋତୁରେ ମର୍ଯ୍ୟାଦା",
    subtitleEn: "We visit elders in old age homes and villages. health check-ups, companionship, and help with things they cannot do alone.",
    subtitleOd: "ମୁମ୍ବାଇ ଓ ଓଡ଼ିଶାରେ ବୟସ୍କଙ୍କ ପାଇଁ ସାଥୀ ନେଟୱାର୍କ, ସ୍ୱାସ୍ଥ୍ୟ ଶିବିର ଓ ଆଇନ ସହାୟତା।",
    ctaEn: "ELDERLY CARE",
    ctaOd: "ବୟସ୍କ ସେବା",
    ctaHref: "/programs#elderly",
    accent: "#F5A623",
  },
];

interface HeroSliderProps {
  language: string;
  t: (en: string, od: string) => string;
}

export default function HeroSlider({ language }: HeroSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  // Fetch slides from CMS. falls back to defaults if empty
  const { data: dbSlides } = trpc.cms.heroSlides.listActive.useQuery();

  const slides: SlideData[] = useMemo(() => {
    if (!dbSlides || dbSlides.length === 0) return DEFAULT_SLIDES;
    return dbSlides.map((s) => ({
      image: s.imageUrl,
      titleEn: s.titleEn,
      titleOd: s.titleOd || s.titleEn,
      subtitleEn: s.subtitleEn || "",
      subtitleOd: s.subtitleOd || s.subtitleEn || "",
      ctaEn: s.ctaTextEn || "",
      ctaOd: s.ctaTextOd || s.ctaTextEn || "",
      ctaHref: s.ctaHref || "/",
      accent: s.accentColor || "#F5A623",
    }));
  }, [dbSlides]);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <section className="relative w-full" id="main-content" role="banner">
      <Carousel
        opts={{ loop: true, align: "start" }}
        plugins={[autoplayRef.current]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0 basis-full">
              <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
                {/* Background Image */}
                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                {/* Light nature-positive overlay. softer, brighter feel */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/75 via-[#1A1A1A]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/50 via-transparent to-[#FFF8E1]/20" />

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="container">
                    <div className="max-w-2xl">
                      <AnimatePresence mode="wait">
                        {current === index && (
                          <motion.div
                            key={`slide-${index}`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {/* Tagline above title */}
                            <p className="font-sans text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-[#F5A623] mb-4 font-semibold">
                              Fearless Ray of Light
                            </p>

                            {/* Accent line */}
                            <div
                              className="w-16 h-1 mb-6 rounded-full"
                              style={{ backgroundColor: slide.accent }}
                            />

                            {/* Title */}
                            <h1
                              className="font-serif font-bold text-white leading-[1.1] mb-5 drop-shadow-lg"
                              style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
                            >
                              {language === "od" ? slide.titleOd : slide.titleEn}
                            </h1>

                            {/* Subtitle */}
                            <p className="font-sans text-[17px] md:text-[19px] text-white/80 leading-relaxed mb-8 max-w-lg">
                              {language === "od" ? slide.subtitleOd : slide.subtitleEn}
                            </p>

                            {/* CTA Button */}
                            {slide.ctaEn && (
                              <Link
                                href={slide.ctaHref}
                                className="group inline-flex items-center gap-2 px-8 py-3.5 font-sans text-[13px] font-semibold tracking-wide uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                                style={{
                                  backgroundColor: slide.accent,
                                  color: "#fff",
                                }}
                              >
                                {language === "od" ? slide.ctaOd : slide.ctaEn}
                                <ArrowRight
                                  size={14}
                                  className="group-hover:translate-x-1 transition-transform"
                                />
                              </Link>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation Arrows. lighter, more visible */}
        <button
          onClick={scrollPrev}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors rounded-full border border-white/30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors rounded-full border border-white/30"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      </Carousel>

      {/* Dot Indicators */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`transition-all duration-300 rounded-full ${
              current === index
                ? "w-8 h-2.5 bg-[#F5A623]"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Rolling Programme Vision Bar. lighter, semi-transparent dark */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#111111]/60 backdrop-blur-md py-3 overflow-hidden border-t border-white/10">
        <div
          className="flex animate-[marquee_60s_linear_infinite] hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 mx-6">
              {[
                "SDG 3 · Health & Well-being",
                "SDG 4 · Quality Education",
                "SDG 10 · Reduced Inequalities",
                "SDG 11 · Sustainable Communities",
                "Schedule VII CSR Implementation",
                "Section 8 Company · Limited by Guarantee",
              ].map((text) => (
                <span
                  key={text}
                  className="font-sans text-[10px] tracking-wider uppercase text-white/60 flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="text-[#F5A623]">✦</span> {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
