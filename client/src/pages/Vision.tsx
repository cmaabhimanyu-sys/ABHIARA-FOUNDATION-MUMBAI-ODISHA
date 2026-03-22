/*
 * Abhiara Foundation — Vision Page
 * The founder's complete plan: Education, Elderly Care, CSR Implementation,
 * Abhiara Vidyapeeth within 5 years, Aradhana becomes Trustee at age 18 by 2037.
 */
import { useEffect } from "react";
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
  BookOpen,
  Heart,
  Landmark,
  Crown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

export default function Vision() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Vision 2037 — Abhiara Foundation"
        description="Abhiara Foundation's 12-year roadmap to transform education and elderly care across India. By 2037, Aradhana becomes the youngest trustee."
        url="https://abhiarafoundation.com/vision"
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background glow */}
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
              A clear, time-bound plan to support poor and underprivileged
              students, care for the elderly, implement CSR projects at scale,
              build Abhiara Vidyapeeth within 5 years, and pass the torch to
              Aradhana by 2037.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FIVE PILLARS OF THE PLAN ===== */}
      <section className="py-20 md:py-28 bg-[#080F1C]">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label mb-4">THE PLAN</p>
            <h2 className="heading-xl text-white mb-4">
              Five Pillars. <span className="text-[#C9A84C]">One Mission.</span>
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-xl mx-auto">
              Every pillar is interconnected. Together, they form the foundation
              of lasting change.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Support Underprivileged Students",
                desc: "Scholarships, study materials, digital learning centres, and mentorship for children from poor and tribal families who cannot afford quality education.",
                sdg: "SDG 4",
                accent: "gold",
              },
              {
                icon: GraduationCap,
                title: "Education at Scale",
                desc: "Class 8–12 scholarship programmes, early childhood readiness, and career guidance across all of Odisha and expanding to other states across India.",
                sdg: "SDG 4",
                accent: "teal",
              },
              {
                icon: HeartHandshake,
                title: "Elderly Care",
                desc: "Companion networks, quarterly health camps, legal aid for pension and property rights. Old age home visits in Puri and rural Odisha village outreach.",
                sdg: "SDG 3",
                accent: "gold",
              },
              {
                icon: Building2,
                title: "CSR Implementation",
                desc: "End-to-end CSR project execution for corporates. Monthly impact reports, audited utilisation statements, and Schedule VII compliance.",
                sdg: "SDG 10 + 11",
                accent: "teal",
              },
              {
                icon: School,
                title: "Abhiara Vidyapeeth",
                desc: "A full-fledged school in the heart of tribal Odisha — CBSE affiliated, built within 5 years. The flagship dream of the foundation.",
                sdg: "SDG 4",
                accent: "gold",
              },
              {
                icon: Crown,
                title: "Aradhana — Future Trustee",
                desc: "By 2037, Aradhana turns 18 and becomes the youngest trustee of Abhiara Foundation — carrying forward the legacy of fearless light.",
                sdg: "2037",
                accent: "teal",
              },
            ].map((pillar, i) => (
              <AnimatedSection key={pillar.title} delay={i * 0.06}>
                <div
                  className={`glass-card${pillar.accent === "gold" ? "-gold" : ""} p-6 h-full flex flex-col`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <pillar.icon
                      size={28}
                      className={
                        pillar.accent === "gold"
                          ? "text-[#C9A84C]"
                          : "text-[#1A7F8E]"
                      }
                    />
                    <span className="font-mono text-[9px] tracking-wider uppercase bg-white/5 px-2 py-1 text-white/50 rounded-sm">
                      {pillar.sdg}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-[14px] text-white/55 leading-relaxed flex-1">
                    {pillar.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MASTER TIMELINE ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label mb-4">MASTER TIMELINE</p>
            <h2 className="heading-xl text-white mb-4">
              2025 <span className="text-[#C9A84C]">→</span> 2037
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-xl mx-auto">
              From foundation to legacy — every year has a purpose.
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            {[
              {
                year: "2025",
                title: "Foundation Year",
                icon: Landmark,
                items: [
                  "Section 8 Company registration \u2014 pending",
                  "Old Age Home visit \u2014 40+ elders visited in Puri (October 2025)",
                  "Book distribution \u2014 50+ students reached in Kendrapara (November 2025)",
                  "2 activities completed on the ground",
                  "Operations begun in Kendrapara and Puri, Odisha",
                ],
                active: true,
              },
              {
                year: "2026",
                title: "Scale & Strengthen",
                icon: Users,
                items: [
                  "Complete Section 8 registration",
                  "Reach 500+ students across Odisha",
                  "Reach 200+ elders with companion visits",
                  "Launch CSR partnerships \u2014 \u20b930L target",
                  "10 activities completed across Odisha",
                ],
                active: false,
              },
              {
                year: "2027",
                title: "Land & Plan",
                icon: MapPin,
                items: [
                  "Acquire land for Abhiara Vidyapeeth in tribal Odisha",
                  "Begin architectural planning and CBSE affiliation process",
                  "Expand to neighbouring states (Chhattisgarh, Jharkhand)",
                  "2,000+ students supported across programmes",
                  "CSR portfolio reaches ₹1 Cr+",
                ],
                active: false,
              },
              {
                year: "2028",
                title: "Build the School",
                icon: School,
                items: [
                  "Construction of Abhiara Vidyapeeth begins",
                  "Recruit founding faculty and staff",
                  "CBSE affiliation secured",
                  "Pan-India CSR implementation partnerships",
                  "5,000+ students impacted across all programmes",
                ],
                active: false,
              },
              {
                year: "2029–2030",
                title: "Vidyapeeth Opens",
                icon: GraduationCap,
                items: [
                  "First batch of students enrolled at Abhiara Vidyapeeth",
                  "Residential school with free education for tribal children",
                  "Digital learning infrastructure fully operational",
                  "Abhiara Foundation becomes a recognised national NGO",
                  "10,000+ lives impacted across India",
                ],
                active: false,
              },
              {
                year: "2037",
                title: "Aradhana Becomes Trustee",
                icon: Crown,
                items: [
                  "Aradhana turns 18 — becomes the youngest trustee",
                  "Abhiara Vidyapeeth is a thriving institution",
                  "Foundation operates across multiple states",
                  "The legacy of fearless light is passed forward",
                  "A father's promise fulfilled — a daughter's journey begins",
                ],
                active: false,
              },
            ].map((phase, i) => (
              <AnimatedSection key={phase.year} delay={i * 0.05}>
                <div className="flex gap-4 md:gap-6 mb-2">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 ${
                        phase.active
                          ? "bg-[#C9A84C] text-[#0A1628]"
                          : "bg-[#C9A84C]/10 text-[#C9A84C]"
                      }`}
                    >
                      <phase.icon size={18} />
                    </div>
                    {i < 5 && (
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
                    <h3 className="font-serif text-xl font-bold text-white mb-3">
                      {phase.title}
                    </h3>
                    <ul className="space-y-2">
                      {phase.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 font-sans text-[14px] text-white/55 leading-relaxed"
                        >
                          <span className="text-[#1A7F8E] mt-1 shrink-0">
                            ▸
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ARADHANA 2037 HIGHLIGHT ===== */}
      <section className="py-20 md:py-28 bg-[#06101F]">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto glass-card-gold p-8 md:p-12 text-center">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-6">
                THE PROMISE &middot; 2037
              </p>
              <Crown size={40} className="text-[#C9A84C] mx-auto mb-6" />
              <h2
                className="font-serif font-bold text-white mb-6"
                style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
              >
                Aradhana Becomes{" "}
                <span className="text-[#C9A84C]">Trustee</span>
              </h2>
              <p className="font-sans text-[16px] text-white/60 leading-relaxed mb-8 max-w-xl mx-auto">
                When Aradhana turns 18 in 2037, she becomes the youngest trustee
                of Abhiara Foundation. The foundation that bears her name — ARA,
                a ray of sacred light — will be hers to lead. A father's courage
                meets a daughter's destiny.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="glass-card p-4 text-center">
                  <p className="font-serif text-2xl font-bold text-[#C9A84C]">
                    2019
                  </p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/50 mt-1">
                    Aradhana Born
                  </p>
                </div>
                <div className="glass-card p-4 text-center">
                  <p className="font-serif text-2xl font-bold text-[#C9A84C]">
                    2025
                  </p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/50 mt-1">
                    Foundation Started
                  </p>
                </div>
                <div className="glass-card p-4 text-center">
                  <p className="font-serif text-2xl font-bold text-[#C9A84C]">
                    2037
                  </p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/50 mt-1">
                    Becomes Trustee
                  </p>
                </div>
              </div>
              <p className="font-serif text-lg italic text-[#C9A84C]/80">
                "Every child we educate today is a seed planted for the world
                Aradhana will inherit."
              </p>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/40 mt-3">
                — Abhimanyu Mallik &middot; Founder
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== IMPACT TARGETS ===== */}
      <section className="py-20 md:py-28 bg-[#040C18]">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label mb-4">IMPACT TARGETS</p>
            <h2 className="heading-xl text-white mb-4">
              What We Aim to{" "}
              <span className="text-[#C9A84C]">Achieve</span>
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                value: "10,000+",
                label: "Students Supported",
                sub: "By 2030",
              },
              {
                value: "1,000+",
                label: "Elders Cared For",
                sub: "By 2030",
              },
              {
                value: "₹5 Cr+",
                label: "CSR Implemented",
                sub: "By 2030",
              },
              {
                value: "1",
                label: "School Built",
                sub: "Abhiara Vidyapeeth",
              },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.08}>
                <div className="glass-card p-6 text-center">
                  <p className="font-serif text-3xl md:text-4xl font-bold text-[#C9A84C] mb-2">
                    {stat.value}
                  </p>
                  <p className="font-sans text-[14px] text-white/70 mb-1">
                    {stat.label}
                  </p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/40">
                    {stat.sub}
                  </p>
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
              Whether you want to fund a scholarship, partner on CSR, or simply
              spread the word — every action brings us closer to the school, the
              students, and the future we are building.
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
