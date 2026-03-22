/*
 * Impact Gallery — Visual stories from the field
 * Education sessions, elderly care visits, and community development
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { X, ArrowRight, GraduationCap, HeartHandshake, Users, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";

/* ── Image Data ── */
type GalleryImage = {
  src: string;
  alt: string;
  category: "education" | "elderly" | "community";
  caption: string;
  location: string;
};

const GALLERY_IMAGES: GalleryImage[] = [
  /* Education — Real Photos */
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-village-session_60ea6065.jpeg",
    alt: "Abhiara Foundation education session with village children in Odisha",
    category: "education",
    caption: "Book donation and open-air learning session with tribal children — because education should not wait for four walls.",
    location: "Kendrapara, Odisha",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-children-1_48cccd6f.jpeg",
    alt: "Book donation to tribal children in Odisha",
    category: "education",
    caption: "Every book donated is a step towards a brighter future. Empowering young minds through education materials.",
    location: "Kendrapara, Odisha",
  },
  /* Elderly Care — Real Photos */
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit_cbe9834b.jpeg",
    alt: "Abhiara Foundation elderly care visit at Hope is Life Old Age Home",
    category: "elderly",
    caption: "Our first elder care visit — Hope is Life Old Age Home. Listening, learning, and lending a hand.",
    location: "Puri, Odisha",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-1_c836b920.jpeg",
    alt: "Distributing essentials to elderly residents",
    category: "elderly",
    caption: "Distributing essentials and spending quality time with elders who have no one else to visit them.",
    location: "Puri, Odisha",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-2_76a48a25.jpeg",
    alt: "Elderly care visit — sharing warmth and care",
    category: "elderly",
    caption: "Warmth is not a luxury. It is a human need. We bring it, one visit at a time.",
    location: "Puri, Odisha",
  },
];

const CATEGORIES = [
  { key: "all", label: "All", icon: Camera },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "elderly", label: "Elderly Care", icon: HeartHandshake },
  { key: "community", label: "Community", icon: Users },
] as const;

export default function ImpactGallery() {
  const [filter, setFilter] = useState<"all" | "education" | "elderly" | "community">("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Close lightbox on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = filter === "all" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === filter);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Impact Gallery — Abhiara Foundation"
        description="Visual stories from the field — real photos from education sessions, elderly care visits, and community development across Odisha."
        url="https://abhiarafoundation.com/impact-gallery"
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0D1B2E] to-[#080F1C]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }} />

        <div className="relative z-10 container text-center">
          <AnimatedSection>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-6">
              FROM THE FIELD
            </p>
            <h1 className="font-serif font-bold text-white leading-[1.1] mb-6" style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>
              Impact <span className="text-[#C9A84C]">Gallery</span>
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-[#C9A84C] to-[#1A7F8E] mx-auto mb-6" />
            <p className="font-sans text-[16px] text-white/60 max-w-xl mx-auto leading-relaxed">
              Visual stories from our education sessions, elderly care visits, and community development work across Odisha.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-[#06101F] py-6 border-y border-white/[0.06]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "500+", label: "Children Targeted · Year 1" },
              { value: "200+", label: "Elders Targeted · Year 1" },
              { value: "3", label: "Districts · Odisha" },
              { value: "10", label: "Activities Completed" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl font-bold text-[#C9A84C]">{stat.value}</p>
                <p className="font-mono text-[9px] tracking-wider uppercase text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FILTER TABS ===== */}
      <section className="py-8 bg-[#080F1C]">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = filter === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setFilter(cat.key as typeof filter)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[10px] tracking-[0.12em] uppercase transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#C9A84C] text-[#0A1628] shadow-lg shadow-[#C9A84C]/20"
                      : "bg-white/[0.04] text-white/50 border border-white/10 hover:border-[#C9A84C]/30 hover:text-[#C9A84C]"
                  }`}
                >
                  <Icon size={14} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== GALLERY GRID ===== */}
      <section className="py-12 md:py-20 bg-[#080F1C]">
        <div className="container">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setLightbox(GALLERY_IMAGES.indexOf(img))}
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className={`inline-block w-fit px-2 py-0.5 rounded-sm font-mono text-[8px] tracking-wider uppercase mb-2 ${
                      img.category === "education" ? "bg-[#1A7F8E]/30 text-[#1A7F8E]" :
                      img.category === "elderly" ? "bg-[#C9A84C]/30 text-[#C9A84C]" :
                      "bg-white/10 text-white/70"
                    }`}>
                      {img.category}
                    </span>
                    <p className="font-sans text-[13px] text-white/90 leading-relaxed">{img.caption}</p>
                    <p className="font-mono text-[9px] tracking-wider uppercase text-white/40 mt-2">{img.location}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Camera size={40} className="text-white/20 mx-auto mb-4" />
              <p className="font-sans text-white/40">No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 bg-[#080F1C]">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Be Part of the <span className="text-[#C9A84C]">Story</span>
            </h2>
            <p className="font-sans text-[15px] text-white/50 max-w-md mx-auto mb-8">
              Every image here represents a life touched. Partner with us to create more of these moments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/csr-partners"
                className="px-8 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors flex items-center gap-2"
              >
                PARTNER WITH US <ArrowRight size={12} />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border border-white/20 text-white/80 font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors"
              >
                GET IN TOUCH
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10 cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_IMAGES[lightbox].src}
                alt={GALLERY_IMAGES[lightbox].alt}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <p className="font-sans text-[15px] text-white/80 leading-relaxed max-w-2xl mx-auto">
                  {GALLERY_IMAGES[lightbox].caption}
                </p>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#C9A84C] mt-2">
                  {GALLERY_IMAGES[lightbox].location}
                </p>
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((prev) => (prev !== null && prev > 0 ? prev - 1 : GALLERY_IMAGES.length - 1));
                  }}
                  className="px-4 py-2 border border-white/20 text-white/60 font-mono text-[10px] tracking-wider uppercase hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors cursor-pointer"
                >
                  Previous
                </button>
                <span className="font-mono text-[10px] text-white/30">
                  {lightbox + 1} / {GALLERY_IMAGES.length}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((prev) => (prev !== null && prev < GALLERY_IMAGES.length - 1 ? prev + 1 : 0));
                  }}
                  className="px-4 py-2 border border-white/20 text-white/60 font-mono text-[10px] tracking-wider uppercase hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
