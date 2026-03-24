/*
 * Abhiara Foundation — Vision Page V2.0 (Dynamic CMS)
 * The founder's complete plan: Education, Elderly Care, CSR Implementation,
 * Abhiara Vidyapeeth within 5 years.
 * All content fetched from CMS with hardcoded fallback.
 */
import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import {
  GraduationCap,
  HeartHandshake,
  Building2,
  School,
  Star,
  ArrowRight,
  Target,
  Calendar,
  MapPin,
  Users,
  Landmark,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { trpc } from "@/lib/trpc";

// Icon map for pillars and timeline
const PILLAR_ICONS: Record<string, any> = {
  "Education": GraduationCap,
  "Elderly Care": HeartHandshake,
  "CSR Implementation": Building2,
  "Abhiara Vidyapeeth": School,
};

const TIMELINE_ICONS: Record<string, any> = {
  "Build Corpus · Register · Launch": Landmark,
  "Acquire Land · Begin Affiliation": MapPin,
  "Construction · Recruit Faculty": School,
  "Vidyapeeth Opens": GraduationCap,
};

// Fallback data
const FALLBACK_PILLARS = [
  { title: "Education", desc: "Scholarships, study materials, digital learning centres, career guidance and mentorship for children from poor and tribal families across all of Odisha and expanding to other states across India.", sdg: "SDG 4", accent: "gold" },
  { title: "Elderly Care", desc: "Companion networks, quarterly health camps, legal aid for pension and property rights. Old age home visits in Puri and rural Odisha village outreach.", sdg: "SDG 3", accent: "gold" },
  { title: "CSR Implementation", desc: "End-to-end CSR project execution for corporates. Monthly impact reports, audited utilisation statements, and Schedule VII compliance.", sdg: "SDG 10 + 11", accent: "teal" },
  { title: "Abhiara Vidyapeeth", desc: "A full-fledged school in the heart of tribal Odisha \u2014 CBSE affiliated, built within 5 years. The flagship dream of the foundation.", sdg: "SDG 4", accent: "gold" },
];

const FALLBACK_TIMELINE = [
  { year: "2026\u20132030", title: "Build Corpus \u00b7 Register \u00b7 Launch", items: ["Section 8 Company \u2014 Registration in process", "Build corpus and establish financial foundation", "Launch education and elderly care programmes across Odisha", "Reach 500+ students and 200+ elders", "Launch CSR partnerships and complete 10+ activities"], active: true },
  { year: "2030", title: "Acquire Land \u00b7 Begin Affiliation", items: ["Acquire land for Abhiara Vidyapeeth in tribal Odisha", "Begin CBSE affiliation process", "Architectural planning and site development", "Expand programmes to neighbouring states"], active: false },
  { year: "2032", title: "Construction \u00b7 Recruit Faculty", items: ["Construction of Abhiara Vidyapeeth begins", "Recruit founding faculty and staff", "CBSE affiliation secured", "Infrastructure and digital learning systems built"], active: false },
  { year: "2035", title: "Vidyapeeth Opens", items: ["First batch of students enrolled at Abhiara Vidyapeeth", "Residential school with free education for tribal children", "Digital learning infrastructure fully operational", "Abhiara Foundation becomes a recognised national NGO"], active: false },
];

const FALLBACK_TARGETS = [
  { value: "10,000+", label: "Students Supported", sub: "By 2035" },
  { value: "1,000+", label: "Elders Cared For", sub: "By 2035" },
  { value: "\u20b95 Cr+", label: "CSR Implemented", sub: "By 2035" },
  { value: "1", label: "School Built", sub: "Abhiara Vidyapeeth · 2035" },
];

export default function Vision() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Fetch CMS settings
  const { data: cmsSettings = [] } = trpc.cms.settings.list.useQuery();

  const getSetting = (key: string, fallback: string) => {
    const s = cmsSettings.find((x: any) => x.settingKey === key);
    return s ? s.settingValue : fallback;
  };

  // Parse JSON settings with fallback
  const pillars = useMemo(() => {
    try {
      const raw = getSetting("vision_pillars", "");
      return raw ? JSON.parse(raw) : FALLBACK_PILLARS;
    } catch { return FALLBACK_PILLARS; }
  }, [cmsSettings]);

  const timeline = useMemo(() => {
    try {
      const raw = getSetting("vision_timeline", "");
      return raw ? JSON.parse(raw) : FALLBACK_TIMELINE;
    } catch { return FALLBACK_TIMELINE; }
  }, [cmsSettings]);

  const impactTargets = useMemo(() => {
    try {
      const raw = getSetting("vision_impact_targets", "");
      return raw ? JSON.parse(raw) : FALLBACK_TARGETS;
    } catch { return FALLBACK_TARGETS; }
  }, [cmsSettings]);

  const heroDesc = getSetting("vision_hero_desc", "A clear, time-bound plan to support poor and underprivileged students, care for the elderly, implement CSR projects at scale, and build Abhiara Vidyapeeth within 5 years.");


  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Vision — Abhiara Foundation"
        description="Abhiara Foundation's roadmap to transform education and elderly care across India. Building Abhiara Vidyapeeth within 5 years."
        url="https://abhiarafoundation.org/vision"
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#C9A84C]/5 blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#1A7F8E]/5 blur-[150px] pointer-events-none" />

        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <p className="section-label mb-4">OUR VISION</p>
            <h1
              className="font-serif font-bold text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              The <span className="text-[#C9A84C]">Roadmap</span> to Impact
            </h1>
            <div className="gradient-rule mx-auto mb-8" />
            <p className="font-sans text-[17px] text-white/60 max-w-2xl mx-auto leading-relaxed">
              {heroDesc}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FIVE PILLARS OF THE PLAN (LIGHT) ===== */}
      <section className="py-20 md:py-28 section-light">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label-light mb-4">THE PLAN</p>
            <h2 className="heading-xl light-heading mb-4">
              Four Pillars. <span className="text-[#C9A84C]">One Mission.</span>
            </h2>
            <div className="gradient-rule-light mx-auto mb-6" />
            <p className="font-sans text-[15px] light-body max-w-xl mx-auto">
              Every pillar is interconnected. Together, they form the foundation of lasting change.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar: any, i: number) => {
              const IconComp = PILLAR_ICONS[pillar.title] || Star;
              return (
                <AnimatedSection key={pillar.title} delay={i * 0.06}>
                  <div className={`${pillar.accent === "gold" ? "light-card-gold" : "light-card"} p-6 h-full flex flex-col`}>
                    <div className="flex items-center justify-between mb-4">
                      <IconComp
                        size={28}
                        className={pillar.accent === "gold" ? "text-[#C9A84C]" : "text-[#1A7F8E]"}
                      />
                      <span className="font-mono text-[9px] tracking-wider uppercase bg-[#0A1628]/5 px-2 py-1 light-muted rounded-sm">
                        {pillar.sdg}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold light-heading mb-3">{pillar.title}</h3>
                    <p className="font-sans text-[14px] light-body leading-relaxed flex-1">{pillar.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== MASTER TIMELINE (from CMS) ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label mb-4">MASTER TIMELINE</p>
            <h2 className="heading-xl text-white mb-4">
              2026 <span className="text-[#C9A84C]">&rarr;</span> 2035
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-xl mx-auto">
              From foundation to impact — every year has a purpose.
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            {timeline.map((phase: any, i: number) => {
              const IconComp = TIMELINE_ICONS[phase.title] || Calendar;
              return (
                <AnimatedSection key={phase.year} delay={i * 0.05}>
                  <div className="flex gap-4 md:gap-6 mb-2">
                    {/* Timeline line + icon */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 ${
                          phase.active
                            ? "bg-[#C9A84C] text-[#0A1628]"
                            : "bg-[#C9A84C]/10 text-[#C9A84C]"
                        }`}
                      >
                        <IconComp size={18} />
                      </div>
                      {i < timeline.length - 1 && (
                        <div className="w-px flex-1 bg-[#C9A84C]/20 min-h-[40px]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-10">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-[11px] tracking-[0.15em] uppercase font-bold text-[#C9A84C]">
                          {phase.year}
                        </span>
                        {phase.active && (
                          <span className="font-mono text-[8px] tracking-wider uppercase bg-[#C9A84C] text-[#0A1628] px-2 py-0.5 font-bold">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white mb-3">{phase.title}</h3>
                      <ul className="space-y-2">
                        {phase.items.map((item: string, j: number) => (
                          <li key={j} className="flex items-start gap-2 font-sans text-[14px] text-white/55 leading-relaxed">
                            <span className="text-[#1A7F8E] mt-1 shrink-0">&#9656;</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>



      {/* ===== IMPACT TARGETS (LIGHT) ===== */}
      <section className="py-20 md:py-28 section-light">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label-light mb-4">IMPACT TARGETS</p>
            <h2 className="heading-xl light-heading mb-4">
              What We Aim to <span className="text-[#C9A84C]">Achieve</span>
            </h2>
            <div className="gradient-rule-light mx-auto mb-6" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {impactTargets.map((stat: any, i: number) => (
              <AnimatedSection key={stat.label} delay={i * 0.08}>
                <div className="light-card p-6 text-center">
                  <p className="font-serif text-3xl md:text-4xl font-bold text-[#C9A84C] mb-2">{stat.value}</p>
                  <p className="font-sans text-[14px] light-heading mb-1">{stat.label}</p>
                  <p className="font-mono text-[9px] tracking-wider uppercase light-muted">{stat.sub}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
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
              Be part of the vision.
            </h2>
            <p className="font-sans text-[15px] text-[#0A1628]/70 max-w-2xl mx-auto leading-relaxed mb-8">
              Whether you want to fund a scholarship, partner on CSR, or simply spread the word — every action brings us closer to the school, the students, and the future we are building.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#0A1628] text-[#C9A84C] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#06101F] transition-colors"
              >
                GET IN TOUCH <ArrowRight size={12} />
              </Link>
              <Link
                href="/csr-partners"
                className="inline-flex items-center gap-2 px-8 py-3 border border-[#0A1628]/30 text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#0A1628]/10 transition-colors"
              >
                CSR PARTNERSHIP <ArrowRight size={12} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
