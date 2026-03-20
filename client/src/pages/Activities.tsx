/*
 * Abhiara Foundation — Activities Page
 * Real photos from old age home visits and tribal student book donations
 * Masonry-style gallery with lightbox, category filter, and scroll animations
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, X, ChevronLeft, ChevronRight, Heart, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW";

type Category = "all" | "elderly" | "education";

interface ActivityPhoto {
  src: string;
  category: "elderly" | "education";
  caption: string;
  date?: string;
  location?: string;
}

const photos: ActivityPhoto[] = [
  // Old Age Home Visit Photos
  {
    src: `${CDN}/activity-01_e25fc6d2.jpeg`,
    category: "elderly",
    caption: "Visiting Hope is Life Old Age Home — distributing essentials and spending time with elderly residents",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    src: `${CDN}/activity-02_5546d5ec.jpeg`,
    category: "elderly",
    caption: "Interacting with elderly residents during our old age home outreach visit",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    src: `${CDN}/activity-03_c1b7e8f1.jpeg`,
    category: "elderly",
    caption: "Providing care packages and daily essentials to senior citizens",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    src: `${CDN}/activity-04_5a933f56.jpeg`,
    category: "elderly",
    caption: "Sharing moments of warmth and companionship with the elders",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    src: `${CDN}/activity-05_3bfcad32.jpeg`,
    category: "elderly",
    caption: "Donation drive at the old age home — every elder deserves dignity",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    src: `${CDN}/activity-06_d47bcf53.jpeg`,
    category: "elderly",
    caption: "Group interaction with elderly residents — listening to their stories",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    src: `${CDN}/activity-07_b065e8cc.jpeg`,
    category: "elderly",
    caption: "Distributing supplies and spending quality time with the residents",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    src: `${CDN}/activity-08_c67457a2.jpeg`,
    category: "elderly",
    caption: "Building connections across generations at the old age home",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    src: `${CDN}/activity-09_360e5337.jpeg`,
    category: "elderly",
    caption: "Providing comfort and care to elderly residents in need",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    src: `${CDN}/activity-10_7f041a80.jpeg`,
    category: "elderly",
    caption: "Our team engaging with the elderly community during the visit",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    src: `${CDN}/activity-11_c184ce63.jpeg`,
    category: "elderly",
    caption: "Ensuring every elder feels valued — our commitment to elderly care",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  // Tribal Student Education Photos
  {
    src: `${CDN}/activity-12_ce6cf0ec.jpeg`,
    category: "education",
    caption: "Open-air learning session with tribal children — distributing books and study materials",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
  {
    src: `${CDN}/activity-13_7ac6b2c6.jpeg`,
    category: "education",
    caption: "Donating educational materials to tribal students in rural Odisha",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
  {
    src: `${CDN}/activity-14_07602990.jpeg`,
    category: "education",
    caption: "Children receiving books and learning materials for their studies",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
  {
    src: `${CDN}/activity-15_a05a7e08.jpeg`,
    category: "education",
    caption: "Engaging with tribal students and understanding their educational needs",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
  {
    src: `${CDN}/activity-16_bfc24c7f.jpeg`,
    category: "education",
    caption: "Book distribution drive — empowering young minds through education",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
  {
    src: `${CDN}/activity-17_2962c3c0.jpeg`,
    category: "education",
    caption: "Providing study materials to children in underserved tribal communities",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
  {
    src: `${CDN}/activity-18_37044a93.jpeg`,
    category: "education",
    caption: "Community outreach — connecting with tribal families and their children",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
  {
    src: `${CDN}/activity-19_79e2fbd0.jpeg`,
    category: "education",
    caption: "Every book donated is a step towards a brighter future for tribal children",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
];

export default function Activities() {
  const [filter, setFilter] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = filter === "all" ? photos : photos.filter((p) => p.category === filter);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };
  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, filtered.length]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const elderlyCount = photos.filter((p) => p.category === "elderly").length;
  const educationCount = photos.filter((p) => p.category === "education").length;

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#06101F] to-[#0A1628]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 container text-center">
          <AnimatedSection>
            <p className="section-label mb-4">ON THE GROUND</p>
            <h1
              className="font-serif font-bold text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              Our <span className="text-[#C9A84C]">Activities</span>
            </h1>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-2xl mx-auto leading-relaxed">
              Real moments from the field — visiting old age homes, donating books and materials
              to tribal students, and building connections that matter. Every photo here is a
              testament to our commitment to action over words.
            </p>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <div className="glass-card px-6 py-4 flex items-center gap-3">
                <Heart size={20} className="text-[#C9A84C]" />
                <div className="text-left">
                  <p className="font-serif text-2xl font-bold text-[#C9A84C]">{elderlyCount}</p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/50">
                    Elderly Care Photos
                  </p>
                </div>
              </div>
              <div className="glass-card px-6 py-4 flex items-center gap-3">
                <BookOpen size={20} className="text-[#1A7F8E]" />
                <div className="text-left">
                  <p className="font-serif text-2xl font-bold text-[#1A7F8E]">{educationCount}</p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/50">
                    Education Photos
                  </p>
                </div>
              </div>
              <div className="glass-card px-6 py-4 flex items-center gap-3">
                <span className="text-[#C9A84C] text-lg">✦</span>
                <div className="text-left">
                  <p className="font-serif text-2xl font-bold text-white">{photos.length}</p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/50">
                    Total Moments
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FILTER TABS ===== */}
      <section className="py-4 bg-[#06101F] border-y border-white/[0.06] sticky top-16 md:top-20 z-30">
        <div className="container flex items-center justify-center gap-3 md:gap-4">
          {([
            { key: "all", label: "All Activities", count: photos.length },
            { key: "elderly", label: "Elderly Care", count: elderlyCount },
            { key: "education", label: "Education", count: educationCount },
          ] as { key: Category; label: string; count: number }[]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 md:px-6 py-2 font-mono text-[9px] md:text-[10px] tracking-[0.15em] uppercase transition-all duration-300 border ${
                filter === tab.key
                  ? "bg-[#C9A84C] text-[#0A1628] border-[#C9A84C] font-bold"
                  : "bg-transparent text-white/60 border-white/10 hover:border-[#C9A84C]/40 hover:text-white"
              }`}
            >
              {tab.label}{" "}
              <span className={filter === tab.key ? "text-[#0A1628]/60" : "text-white/30"}>
                ({tab.count})
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ===== PHOTO GALLERY ===== */}
      <section className="py-16 md:py-24 bg-[#080F1C]">
        <div className="container">
          {/* Category Header */}
          {filter !== "all" && (
            <AnimatedSection className="mb-12">
              <div className="glass-card p-6 md:p-8 flex items-start gap-4">
                {filter === "elderly" ? (
                  <Heart size={28} className="text-[#C9A84C] shrink-0 mt-1" />
                ) : (
                  <BookOpen size={28} className="text-[#1A7F8E] shrink-0 mt-1" />
                )}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white mb-2">
                    {filter === "elderly"
                      ? "Elderly Care — Old Age Home Visits"
                      : "Education — Tribal Student Book Donations"}
                  </h2>
                  <p className="font-sans text-[14px] text-white/55 leading-relaxed">
                    {filter === "elderly"
                      ? "Our team regularly visits old age homes to provide essentials, companionship, and dignity to elderly residents who need it most. Every visit is a reminder that no one should age alone."
                      : "We travel to tribal villages in Odisha to donate books, notebooks, and learning materials to children who deserve the same opportunities as everyone else. Education is the bridge from remote to remarkable."}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5">
            {filtered.map((photo, idx) => (
              <AnimatedSection key={photo.src} delay={Math.min(idx * 0.04, 0.4)}>
                <div
                  className="break-inside-avoid mb-4 md:mb-5 group cursor-pointer relative overflow-hidden rounded-lg border border-white/[0.06]"
                  onClick={() => openLightbox(idx)}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span
                      className={`font-mono text-[9px] tracking-wider uppercase mb-2 ${
                        photo.category === "elderly" ? "text-[#C9A84C]" : "text-[#1A7F8E]"
                      }`}
                    >
                      {photo.category === "elderly" ? "✦ Elderly Care" : "✦ Education"}
                    </span>
                    <p className="font-sans text-[13px] text-white/80 leading-relaxed line-clamp-2">
                      {photo.caption}
                    </p>
                    {(photo.date || photo.location) && (
                      <p className="font-mono text-[8px] tracking-wider uppercase text-white/40 mt-2">
                        {photo.date}{photo.date && photo.location && " \u00B7 "}{photo.location}
                      </p>
                    )}
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`font-mono text-[8px] tracking-wider uppercase px-2 py-1 backdrop-blur-sm rounded-sm ${
                        photo.category === "elderly"
                          ? "bg-[#C9A84C]/20 text-[#C9A84C]"
                          : "bg-[#1A7F8E]/20 text-[#1A7F8E]"
                      }`}
                    >
                      {photo.category === "elderly" ? "Elderly Care" : "Education"}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-sans text-white/40">No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-20 bg-[#C9A84C]">
        <div className="container text-center">
          <AnimatedSection>
            <h2
              className="font-serif font-bold text-[#0A1628] mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Want to be part of the next activity?
            </h2>
            <p className="font-sans text-[15px] text-[#0A1628]/70 max-w-2xl mx-auto leading-relaxed mb-8">
              Whether you want to volunteer, sponsor an activity, or partner with us for CSR
              implementation — every contribution creates real impact on the ground.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0A1628] text-[#C9A84C] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#06101F] transition-colors"
            >
              GET IN TOUCH <ArrowRight size={12} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#0A1628]/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Previous */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/50 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/50 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all z-10"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90vw] max-h-[80vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].caption}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center max-w-xl">
                <span
                  className={`font-mono text-[9px] tracking-wider uppercase ${
                    filtered[lightboxIndex].category === "elderly"
                      ? "text-[#C9A84C]"
                      : "text-[#1A7F8E]"
                  }`}
                >
                  {filtered[lightboxIndex].category === "elderly"
                    ? "✦ Elderly Care"
                    : "✦ Education"}
                </span>
                <p className="font-sans text-[14px] text-white/70 leading-relaxed mt-2">
                  {filtered[lightboxIndex].caption}
                </p>
                {(filtered[lightboxIndex].date || filtered[lightboxIndex].location) && (
                  <p className="font-mono text-[9px] text-white/40 mt-2">
                    {filtered[lightboxIndex].date}{filtered[lightboxIndex].date && filtered[lightboxIndex].location && " \u00B7 "}{filtered[lightboxIndex].location}
                  </p>
                )}
                <p className="font-mono text-[9px] text-white/30 mt-2">
                  {lightboxIndex + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
