/*
 * Abhiara Foundation — Activities Page
 * Activity log with category filters — no external images
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Heart, BookOpen, Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

type Category = "all" | "elderly" | "education";

interface Activity {
  category: "elderly" | "education";
  title: string;
  description: string;
  date: string;
  location: string;
}

const activities: Activity[] = [
  {
    category: "elderly",
    title: "Old Age Home Visit — Hope is Life",
    description:
      "Distributed essentials and spent quality time with elderly residents. Provided care packages including daily necessities, hygiene products, and comfort items.",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    category: "elderly",
    title: "Companion Network Launch",
    description:
      "Initiated our companion network programme — pairing volunteers with elderly residents for regular visits, conversations, and emotional support.",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    category: "elderly",
    title: "Senior Citizen Health Awareness",
    description:
      "Organised an awareness session on health and wellness for elderly residents, covering nutrition, mobility exercises, and mental well-being.",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    category: "elderly",
    title: "Donation Drive — Essentials for Elders",
    description:
      "Collected and distributed blankets, medicines, and personal care items to elderly residents across multiple old age homes.",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    category: "elderly",
    title: "Intergenerational Connect Programme",
    description:
      "Building connections across generations — young volunteers spent time listening to stories and sharing moments of warmth with senior citizens.",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    category: "education",
    title: "Book Donation to Tribal Students",
    description:
      "Distributed books, notebooks, and study materials to tribal children in rural Odisha. Open-air learning sessions conducted alongside the distribution.",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
  {
    category: "education",
    title: "Learning Materials for Underprivileged Children",
    description:
      "Provided educational kits including textbooks, stationery, and learning aids to children from underserved tribal communities.",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
  {
    category: "education",
    title: "Community Outreach — Tribal Families",
    description:
      "Engaged with tribal families to understand educational needs, barriers to schooling, and how Abhiara Foundation can bridge the gap.",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
  {
    category: "education",
    title: "Student Empowerment Drive",
    description:
      "Every book donated is a step towards a brighter future. Empowered young minds through education materials and motivational interactions.",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
  {
    category: "education",
    title: "Digital Literacy Awareness",
    description:
      "Introduced basic digital literacy concepts to tribal students, preparing them for a technology-enabled future while respecting their cultural roots.",
    date: "March 2025",
    location: "Kalahandi District, Odisha",
  },
];

export default function Activities() {
  const [filter, setFilter] = useState<Category>("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered =
    filter === "all" ? activities : activities.filter((a) => a.category === filter);

  const elderlyCount = activities.filter((a) => a.category === "elderly").length;
  const educationCount = activities.filter((a) => a.category === "education").length;

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
              to tribal students, and building connections that matter. Every activity here is a
              testament to our commitment to action over words.
            </p>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <div className="glass-card px-6 py-4 flex items-center gap-3">
                <Heart size={20} className="text-[#C9A84C]" />
                <div className="text-left">
                  <p className="font-serif text-2xl font-bold text-[#C9A84C]">
                    {elderlyCount}
                  </p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/50">
                    Elderly Care Activities
                  </p>
                </div>
              </div>
              <div className="glass-card px-6 py-4 flex items-center gap-3">
                <BookOpen size={20} className="text-[#1A7F8E]" />
                <div className="text-left">
                  <p className="font-serif text-2xl font-bold text-[#1A7F8E]">
                    {educationCount}
                  </p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/50">
                    Education Activities
                  </p>
                </div>
              </div>
              <div className="glass-card px-6 py-4 flex items-center gap-3">
                <span className="text-[#C9A84C] text-lg">✦</span>
                <div className="text-left">
                  <p className="font-serif text-2xl font-bold text-white">
                    {activities.length}
                  </p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/50">
                    Total Activities
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
          {(
            [
              { key: "all", label: "All Activities", count: activities.length },
              { key: "elderly", label: "Elderly Care", count: elderlyCount },
              { key: "education", label: "Education", count: educationCount },
            ] as { key: Category; label: string; count: number }[]
          ).map((tab) => (
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

      {/* ===== ACTIVITY LIST ===== */}
      <section className="py-16 md:py-24 bg-[#080F1C]">
        <div className="container max-w-4xl">
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
                      : "Education — Tribal Student Support"}
                  </h2>
                  <p className="font-sans text-[14px] text-white/55 leading-relaxed">
                    {filter === "elderly"
                      ? "Our team regularly visits old age homes to provide essentials, companionship, and dignity to elderly residents who need it most. Every visit is a reminder that no one should age alone."
                      : "We travel to tribal villages across Odisha to donate books, notebooks, and learning materials to children who deserve the same opportunities as everyone else. Education is the bridge from remote to remarkable."}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Activity Cards */}
          <div className="space-y-5">
            {filtered.map((activity, idx) => (
              <AnimatedSection key={`${activity.title}-${idx}`} delay={Math.min(idx * 0.05, 0.3)}>
                <div
                  className={`glass-card${activity.category === "elderly" ? "-gold" : ""} p-6 md:p-8 hover:border-${activity.category === "elderly" ? "[#C9A84C]" : "[#1A7F8E]"}/30 transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                        activity.category === "elderly"
                          ? "bg-[#C9A84C]/10"
                          : "bg-[#1A7F8E]/10"
                      }`}
                    >
                      {activity.category === "elderly" ? (
                        <Heart
                          size={22}
                          className="text-[#C9A84C]"
                        />
                      ) : (
                        <BookOpen
                          size={22}
                          className="text-[#1A7F8E]"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm ${
                            activity.category === "elderly"
                              ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                              : "bg-[#1A7F8E]/10 text-[#1A7F8E]"
                          }`}
                        >
                          {activity.category === "elderly" ? "Elderly Care" : "Education"}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg md:text-xl font-bold text-white mb-2">
                        {activity.title}
                      </h3>

                      <p className="font-sans text-[14px] text-white/55 leading-relaxed mb-4">
                        {activity.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase text-white/40">
                          <Calendar size={12} />
                          {activity.date}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase text-white/40">
                          <MapPin size={12} />
                          {activity.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-sans text-white/40">No activities in this category yet.</p>
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
    </div>
  );
}
