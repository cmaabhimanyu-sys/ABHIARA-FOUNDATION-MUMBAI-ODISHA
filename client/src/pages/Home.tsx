/*
 * Abhiara Foundation — Home Page V2.0
 * 8 Sections: Hero, Trust Bar, Three Pillars,
 * ABHI+ARA Name, Founder Story Teaser, Vidyapeeth Teaser, Activities Preview, Contact CTA
 * NO donation buttons. All CTAs → Contact or relevant pages.
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { GraduationCap, HeartHandshake, Building2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import CounterAnimation from "@/components/CounterAnimation";
import { motion } from "framer-motion";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/hero-dawn-PUfjxrVLdG8a3bgPJiAovi.webp";
const EDUCATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-children-gGByyfoUfKLuHnK73a4QT3.webp";
const ELDERLY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-8YsBCUCCz6K32KEwPWvjgq.webp";
const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/community-impact-JqLQdk8SYBsopiModUvtKZ.webp";
const JOURNEY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/founder-journey-Xx6vnKWGMfZ6h3k4ufv5M9.webp";

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Navbar />

      {/* ===== S2: HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background: cinematic hero image with overlay */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0A1628]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/40 via-transparent to-[#0A1628]" />
        </div>

        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }} />

        <div className="relative z-10 container text-center pt-20 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-8"
          >
            SECTION 8 COMPANY &middot; NOT-FOR-PROFIT &middot; ODISHA &middot; PAN INDIA
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif font-bold leading-[1.1] mb-8"
            style={{ fontSize: "clamp(52px, 6vw, 76px)" }}
          >
            <span className="text-[#C9A84C]">Fearless.</span><br />
            <span className="text-white">Purposeful.</span><br />
            <span className="text-[#1A7F8E]">Rooted.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-sans text-[18px] text-white/60 max-w-[560px] mx-auto leading-relaxed mb-10"
          >
            Every child from a remote village deserves a fearless path.
            Every elder deserves dignity in their final years.
            We are building that path — village by village, district by district, life by life.
          </motion.p>

          {/* Manifesto Quote Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="max-w-xl mx-auto mb-12 border-l-2 border-[#1A7F8E] pl-6 text-left"
          >
            <p className="font-serif italic text-[#C9A84C] text-lg md:text-xl leading-relaxed">
              "Remote to Metro Mumbai was my journey. Abhiara Foundation is my promise — that the next child from the village has a path."
            </p>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/50 mt-3">
              — Abhimanyu Mallik &middot; Founder
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/our-story"
              className="px-8 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors flex items-center gap-2"
            >
              OUR STORY <ArrowRight size={12} />
            </Link>
            <Link
              href="/csr-partners"
              className="px-8 py-3 border border-white/20 text-white/80 font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors"
            >
              PARTNER WITH US
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { value: 500, suffix: "+", label: "Students Targeted" },
              { value: 200, suffix: "+", label: "Elders Supported" },
              { prefix: "₹", value: 30, suffix: "L", label: "CSR Target FY26" },
              { value: 30, suffix: "+", label: "Districts Across India" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4 text-center">
                <p className="font-serif text-2xl md:text-3xl font-bold text-[#C9A84C]">
                  <CounterAnimation end={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix} />
                </p>
                <p className="font-mono text-[9px] tracking-wider uppercase text-white/50 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-[#C9A84C] rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ===== S3: TRUST BAR ===== */}
      <section className="bg-[#06101F] py-4 overflow-hidden border-y border-white/[0.06]">
        <div className="flex animate-[scroll_40s_linear_infinite] whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-8">
              {[
                "Section 8 Company · Limited by Guarantee",
                "CMA-Led Finance & Compliance",
                "SDG 3 · 4 · 10 · 11",
                "Schedule VII CSR Implementation",
                "Founded March 2025 · Mumbai",
              ].map((text) => (
                <span key={text} className="font-mono text-[10px] tracking-wider uppercase text-white/40 flex items-center gap-3">
                  <span className="text-[#C9A84C]">✦</span> {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== S4: THREE PILLARS ===== */}
      <section className="py-20 md:py-28 bg-[#080F1C]">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label mb-4">WHAT WE DO</p>
            <h2 className="heading-xl text-white mb-4">
              Three Pillars. <span className="text-[#C9A84C]">One Promise.</span>
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-lg mx-auto">
              Covering all of Odisha and expanding across other states.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: GraduationCap,
                sdg: "SDG 4",
                title: "Education",
                data: "500 Children · All Odisha & Beyond · Year 1",
                body: "Digital learning centres, scholarship support for Class 8–12 students, and early childhood readiness programmes across all of Odisha and expanding to other states.",
                img: EDUCATION_IMG,
                cta: { label: "See Programme", href: "/programs" },
                accent: "gold",
              },
              {
                icon: HeartHandshake,
                sdg: "SDG 3",
                title: "Elderly Care",
                data: "200 Elders · Mumbai + Odisha & Beyond · Year 1",
                body: "Companion networks, quarterly health camps, and legal aid support for pension and property rights. Urban Mumbai outreach, rural Odisha village visits, and expanding to other states.",
                img: ELDERLY_IMG,
                cta: { label: "See Programme", href: "/programs" },
                accent: "teal",
              },
              {
                icon: Building2,
                sdg: "SDG 10 + 11",
                title: "CSR Implementation",
                data: "₹30L Target · Schedule VII · Year 1",
                body: "End-to-end CSR project implementation for corporates. Monthly impact reports, audited utilisation statements, and full documentation under Companies Act Schedule VII.",
                img: COMMUNITY_IMG,
                cta: { label: "Partner With Us", href: "/csr-partners" },
                accent: "gold",
              },
            ].map((pillar, i) => (
              <AnimatedSection key={pillar.title} delay={i * 0.08}>
                <div className={`glass-card${pillar.accent === "gold" ? "-gold" : ""} overflow-hidden h-full flex flex-col`}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img src={pillar.img} alt={pillar.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <pillar.icon size={18} className={pillar.accent === "gold" ? "text-[#C9A84C]" : "text-[#1A7F8E]"} />
                      <span className="font-serif text-lg font-bold text-white">{pillar.title}</span>
                    </div>
                    <span className="absolute top-3 right-3 font-mono text-[9px] tracking-wider uppercase bg-black/40 backdrop-blur-sm px-2 py-1 text-white/70 rounded-sm">
                      {pillar.sdg}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <p className="font-mono text-[10px] tracking-wider text-[#C9A84C] mb-3">{pillar.data}</p>
                    <p className="font-sans text-[14px] text-white/60 leading-relaxed mb-5 flex-1">{pillar.body}</p>
                    <Link
                      href={pillar.cta.href}
                      className={`font-mono text-[10px] tracking-[0.15em] uppercase flex items-center gap-2 ${
                        pillar.accent === "gold" ? "text-[#C9A84C] hover:text-[#B8942A]" : "text-[#1A7F8E] hover:text-[#145E6A]"
                      } transition-colors`}
                    >
                      {pillar.cta.label} <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== S5: ABHI + ARA NAME MEANING ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label mb-4">THE NAME</p>
            <h2 className="heading-xl text-white mb-4">ABHI + ARA</h2>
            <div className="gradient-rule mx-auto" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="max-w-4xl mx-auto glass-card-gold p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-6 items-start">
                {/* ABHI */}
                <div className="text-center md:text-left">
                  <h3 className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">ABHI</h3>
                  <p className="font-serif text-2xl text-[#C9A84C]/60 mb-3">अभि</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-3">
                    Fearless &middot; Brave &middot; Dauntless
                  </p>
                  <p className="font-mono text-[10px] tracking-wider uppercase text-white/40 mb-4">
                    From Abhimanyu — the founder
                  </p>
                  <p className="font-sans text-[14px] text-white/55 leading-relaxed">
                    It took fearlessness to leave the village. To walk into a city that did not know your name. To build something from nothing.
                  </p>
                </div>

                {/* Plus symbol */}
                <div className="hidden md:flex items-center justify-center self-center">
                  <span className="font-serif text-5xl font-bold text-[#C9A84C]">+</span>
                </div>
                <div className="md:hidden text-center">
                  <span className="font-serif text-4xl font-bold text-[#C9A84C]">+</span>
                </div>

                {/* ARA */}
                <div className="text-center md:text-right">
                  <h3 className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">ARA</h3>
                  <p className="font-serif text-2xl text-[#C9A84C]/60 mb-3">आरा</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-3">
                    Ray of Sacred Light
                  </p>
                  <p className="font-mono text-[10px] tracking-wider uppercase text-white/40 mb-4">
                    From Aradhana — the founder's daughter
                  </p>
                  <p className="font-sans text-[14px] text-white/55 leading-relaxed">
                    She is the reason this foundation exists. She will one day lead it.
                  </p>
                </div>
              </div>

              {/* Combined meaning */}
              <div className="mt-10 pt-8 border-t border-[#C9A84C]/15 text-center">
                <p className="font-serif text-xl md:text-2xl italic text-[#C9A84C] mb-3">
                  Together: A B H I A R A — A Fearless Ray of Light
                </p>
                <p className="font-serif text-lg italic text-white/50">
                  "Where a father's courage meets a daughter's devotion."
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== S6: FOUNDER'S STORY TEASER ===== */}
      <section className="py-20 md:py-28 bg-[#06101F]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection direction="left">
              <p className="section-label mb-4">THE FOUNDER'S STORY</p>
              <h2 className="heading-lg text-white mb-4">
                A village in Odisha.<br />
                <span className="text-[#C9A84C]">A city called Mumbai.</span>
              </h2>
              <div className="gradient-rule mb-8" />
              <p className="font-sans text-[15px] text-white/60 leading-relaxed mb-6">
                I grew up in a small village in Odisha — where electricity was uncertain and the nearest school was a long walk. Today I am a professional in Mumbai. That journey — remote to metro — was not luck. It was access.
              </p>
              <p className="font-sans text-[15px] text-white/60 leading-relaxed mb-8">
                Abhiara Foundation is my promise that the next child does not have to wait as long as I did.
              </p>

              {/* Info chips */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  "Founder: Abhimanyu Mallik",
                  "Section 8 · Limited by Guarantee",
                  "All Odisha & Other States",
                  "IFC-ready",
                ].map((chip) => (
                  <span key={chip} className="font-mono text-[9px] tracking-wider uppercase text-white/50 px-3 py-1.5 border border-white/10 rounded-sm">
                    {chip}
                  </span>
                ))}
              </div>

              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#1A7F8E]/50 text-[#1A7F8E] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#1A7F8E]/10 transition-colors"
              >
                READ THE FULL STORY <ArrowRight size={12} />
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              {/* Journey image + quote card */}
              <div className="relative">
                <div className="rounded-lg overflow-hidden border border-white/10">
                  <img src={JOURNEY_IMG} alt="Village to Mumbai journey" className="w-full h-auto" />
                </div>
                <p className="font-serif text-sm italic text-white/40 text-center mt-4">
                  Village to Mumbai. And back — through purpose.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== S7: ABHIARA VIDYAPEETH TEASER ===== */}
      <section className="py-20 md:py-28 bg-[#040C18]">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label mb-4">LONG-TERM VISION</p>
            <h2 className="heading-xl text-white mb-4">Abhiara Vidyapeeth</h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-lg mx-auto">
              A school in the heart of tribal Odisha
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Timeline */}
            <AnimatedSection direction="left">
              <div className="space-y-0">
                {[
                  { phase: "Phase 1", years: "Year 1–2", desc: "Build corpus · Register · Launch programme" },
                  { phase: "Phase 2", years: "Year 2–3", desc: "Land in Koraput / Kalahandi / Rayagada" },
                  { phase: "Phase 3", years: "Year 3–4", desc: "Construction begins · CBSE affiliation" },
                  { phase: "Phase 4", years: "Year 4–5", desc: "First batch enrolled" },
                  { phase: "Phase 5", years: "Year 5+", desc: "Aradhana becomes Trustee at age 18" },
                ].map((item, i) => (
                  <div key={item.phase} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-[#C9A84C]" : "bg-[#C9A84C]/30"} shrink-0`} />
                      {i < 4 && <div className="w-px h-full bg-[#C9A84C]/20 min-h-[60px]" />}
                    </div>
                    <div className="pb-8">
                      <p className="font-mono text-[10px] tracking-wider uppercase text-[#C9A84C] mb-1">{item.phase} &middot; {item.years}</p>
                      <p className="font-sans text-[14px] text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Quote card */}
            <AnimatedSection direction="right">
              <div className="glass-card-gold p-8 md:p-10">
                <p className="font-serif text-xl md:text-2xl italic text-white/80 leading-relaxed mb-6">
                  "The school does not exist yet. But every child we reach today is proof that it will."
                </p>
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]">
                  — Abhimanyu Mallik &middot; Founder
                </p>
                <div className="mt-8 pt-6 border-t border-[#C9A84C]/15">
                  <p className="font-sans text-[14px] text-white/50 italic">
                    "When Aradhana turns 18, she becomes the youngest trustee of Abhiara Foundation."
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-[#1A7F8E] hover:text-[#C9A84C] transition-colors"
                >
                  LEARN MORE <ArrowRight size={12} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== S8: ACTIVITIES PREVIEW ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">ON THE GROUND</p>
            <h2 className="heading-xl text-white mb-4">
              Our <span className="text-[#C9A84C]">Activities</span>
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-lg mx-auto">
              Real moments from the field — visiting old age homes, donating books to tribal students, and building connections that matter.
            </p>
          </AnimatedSection>

          {/* Photo Grid — 6 featured photos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-12">
            {[
              { img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/activity-01_e25fc6d2.jpeg", cat: "Elderly Care", caption: "Visiting Hope is Life Old Age Home" },
              { img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/activity-12_ce6cf0ec.jpeg", cat: "Education", caption: "Book donation to tribal students" },
              { img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/activity-03_c1b7e8f1.jpeg", cat: "Elderly Care", caption: "Care packages for senior citizens" },
              { img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/activity-14_07602990.jpeg", cat: "Education", caption: "Learning materials for tribal children" },
              { img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/activity-06_d47bcf53.jpeg", cat: "Elderly Care", caption: "Spending time with elderly residents" },
              { img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/activity-16_bfc24c7f.jpeg", cat: "Education", caption: "Community outreach with tribal families" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="group relative overflow-hidden rounded-lg border border-white/[0.06] aspect-[4/3]">
                  <img
                    src={item.img}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className={`inline-block font-mono text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm mb-2 ${item.cat === 'Elderly Care' ? 'bg-[#1A7F8E]/30 text-[#1A7F8E]' : 'bg-[#C9A84C]/20 text-[#C9A84C]'}`}>
                      {item.cat}
                    </span>
                    <p className="font-sans text-[13px] text-white/80 leading-snug">{item.caption}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA to full gallery */}
          <AnimatedSection className="text-center">
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 px-8 py-3 border border-[#C9A84C]/40 text-[#C9A84C] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#C9A84C]/10 transition-colors"
            >
              VIEW ALL 19 PHOTOS <ArrowRight size={12} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== S9: CONTACT CTA STRIP ===== */}
      <section className="py-16 md:py-20 bg-[#C9A84C]">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-serif font-bold text-[#0A1628] mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Ready to make an impact?
            </h2>
            <p className="font-sans text-[15px] text-[#0A1628]/70 max-w-2xl mx-auto leading-relaxed mb-8">
              Whether you are a corporate looking for a credible CSR implementation partner, an individual who believes geography should not be destiny, or an institution that wants to invest in Odisha and beyond — we want to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0A1628] text-[#C9A84C] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#06101F] transition-colors"
            >
              CONTACT US <ArrowRight size={12} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
