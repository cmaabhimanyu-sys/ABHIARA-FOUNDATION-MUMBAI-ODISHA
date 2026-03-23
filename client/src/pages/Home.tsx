/*
 * Abhiara Foundation — Home Page V2.0
 * Sections: Hero, Trust Bar, Truth of Life, Three Pillars,
 * Vidyapeeth Teaser, Activities Preview, Contact CTA
 * NO donation buttons. All CTAs → Contact or relevant pages.
 */
import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "wouter";
import { GraduationCap, HeartHandshake, Building2, ArrowRight, Shield, Award, MapPin, Briefcase, CheckCircle, Quote, Users, FileCheck, BadgeCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import CounterAnimation from "@/components/CounterAnimation";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { trpc } from "@/lib/trpc";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/hero-dawn-PUfjxrVLdG8a3bgPJiAovi.webp";
const EDUCATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-village-session_60ea6065.jpeg";
const ELDERLY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-1_c836b920.jpeg";
const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-2_76a48a25.jpeg";

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Fetch CMS settings and activities for dynamic content
  const { data: cmsSettings = [] } = trpc.cms.settings.list.useQuery();
  const { data: cmsActivities = [] } = trpc.cms.activities.listPublished.useQuery();

  const getSetting = (key: string, fallback: string) => {
    const setting = cmsSettings.find((s: any) => s.settingKey === key);
    return setting ? setting.settingValue : fallback;
  };

  const getSettingNum = (key: string, fallback: number) => {
    const setting = cmsSettings.find((s: any) => s.settingKey === key);
    if (!setting) return fallback;
    const num = parseInt(setting.settingValue.replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? fallback : num;
  };

  // Dynamic stats from CMS
  const heroStats = useMemo(() => [
    { value: getSettingNum("stat_students_reached", 50), suffix: "+", label: "Students Reached" },
    { value: getSettingNum("stat_elders_visited", 40), suffix: "+", label: "Elders Visited" },
    { value: getSettingNum("stat_activities_completed", 2), suffix: "", label: "Activities Completed" },
    { value: getSettingNum("stat_students_target", 500), suffix: "+", label: "Students \u00b7 Target 2026" },
  ], [cmsSettings]);

  // Dynamic activities preview from CMS
  const activityPreviews = useMemo(() => {
    if (cmsActivities.length > 0) {
      return cmsActivities.slice(0, 2).map((a: any) => ({
        cat: a.category === "elderly" ? "Elderly Care" : "Education",
        title: `${a.title} \u2014 ${a.date}`,
        desc: a.description.length > 200 ? a.description.slice(0, 200) + "..." : a.description,
      }));
    }
    return [
      { cat: "Elderly Care", title: "Old Age Home Visit \u2014 March 2026", desc: "Visited Hope is Life Old Age Home in Puri, Odisha. Distributed essentials and spent quality time with 40+ elderly residents." },
      { cat: "Education", title: "Book Distribution \u2014 March 2026", desc: "Distributed books and study materials to 50+ tribal children in Kendrapara, Odisha. Spent time with students and families." },
    ];
  }, [cmsActivities]);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Abhiara Foundation — Fearless Ray of Light"
        description="Education for every child. Dignity for every elder. Founded by Abhimanyu Mallik in Raisar, Kendrapara, Odisha. Section 8 Not-for-Profit."
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/hero-dawn-PUfjxrVLdG8a3bgPJiAovi.webp"
        url="https://abhiarafoundation.com/"
      />
      <Navbar />

      {/* ===== S2: HERO ===== */}
      <section id="main-content" className="relative min-h-screen flex items-center justify-center overflow-hidden" role="banner" aria-label="Hero section">
        {/* Background: cinematic hero image with overlay */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Dawn breaking over the green fields of Odisha, India" className="w-full h-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-[#0A1628]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/40 via-transparent to-[#0A1628]" />
        </div>

        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }} />

        <div className="relative z-10 container text-center pt-24 pb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#1A7F8E] mb-10"
          >
            SECTION 8 COMPANY &middot; NOT-FOR-PROFIT &middot; ODISHA &middot; PAN INDIA
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif font-bold leading-[1.05] mb-6"
            style={{ fontSize: "clamp(56px, 7vw, 84px)" }}
          >
            <span className="text-[#C9A84C]">Fearless.</span><br />
            <span className="text-white">Purposeful.</span><br />
            <span className="text-[#1A7F8E]">Rooted.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-sans text-lg md:text-xl text-white/70 max-w-[520px] mx-auto leading-relaxed mb-12"
          >
            Education for every child. Dignity for every elder.
            Built from the village up.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/our-story"
              className="px-10 py-4 bg-[#C9A84C] text-[#0A1628] font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors flex items-center gap-2"
            >
              OUR STORY <ArrowRight size={14} />
            </Link>
            <Link
              href="/csr-partners"
              className="px-10 py-4 border border-white/30 text-white font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              PARTNER WITH US
            </Link>
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



      {/* ===== STATS BAR ===== */}
      <section className="py-6 bg-[#06101F] border-y border-white/[0.06]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl md:text-4xl font-bold text-[#C9A84C]">
                  <CounterAnimation end={stat.value} prefix="" suffix={stat.suffix} />
                </p>
                <p className="font-mono text-[9px] tracking-wider uppercase text-white/50 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMPACT COUNTER ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628] relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }} />
        <div className="container relative z-10">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label mb-4">EARLY IMPACT</p>
            <h2 className="heading-xl text-white mb-4">
              Small Numbers. <span className="text-[#C9A84C]">Real Lives.</span>
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[16px] text-white/60 max-w-lg mx-auto">
              We are in our founding year. Every number here is a real child, a real elder, a real family.
            </p>
          </AnimatedSection>

          {/* Big Impact Numbers — Horizontal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto mb-12">
            {/* Students Supported */}
            <AnimatedSection delay={0}>
              <div className="text-center py-10 md:py-14 md:border-r border-white/[0.08]">
                <p className="font-serif font-bold text-[#C9A84C] mb-3" style={{ fontSize: "clamp(56px, 7vw, 88px)", lineHeight: 1 }}>
                  <CounterAnimation end={getSettingNum("stat_students_reached", 50)} suffix="+" />
                </p>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/70 mb-3">
                  Students Supported
                </p>
                <p className="font-sans text-[13px] text-white/40 leading-relaxed max-w-[240px] mx-auto">
                  Children from remote villages in Odisha receiving educational support
                </p>
              </div>
            </AnimatedSection>

            {/* Elderly Families */}
            <AnimatedSection delay={0.12}>
              <div className="text-center py-10 md:py-14 md:border-r border-white/[0.08]">
                <p className="font-serif font-bold text-[#1A7F8E] mb-3" style={{ fontSize: "clamp(56px, 7vw, 88px)", lineHeight: 1 }}>
                  <CounterAnimation end={getSettingNum("stat_elders_visited", 25)} suffix="+" />
                </p>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/70 mb-3">
                  Elderly Families Enrolled
                </p>
                <p className="font-sans text-[13px] text-white/40 leading-relaxed max-w-[240px] mx-auto">
                  Senior citizens receiving companion support and health camps
                </p>
              </div>
            </AnimatedSection>

            {/* 2026 Target */}
            <AnimatedSection delay={0.24}>
              <div className="text-center py-10 md:py-14 relative">
                <div className="absolute top-4 right-4">
                  <span className="font-mono text-[8px] tracking-wider uppercase bg-[#C9A84C]/15 text-[#C9A84C] px-2 py-1">TARGET 2026</span>
                </div>
                <p className="font-serif font-bold text-[#C9A84C] mb-3" style={{ fontSize: "clamp(56px, 7vw, 88px)", lineHeight: 1 }}>
                  <CounterAnimation end={getSettingNum("stat_students_target", 500)} suffix="+" />
                </p>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/70 mb-3">
                  Students · Goal
                </p>
                <p className="font-sans text-[13px] text-white/40 leading-relaxed max-w-[240px] mx-auto">
                  Digital learning centres and scholarship support across Odisha
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3} className="text-center">
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/30">
              We don't inflate numbers. We earn them — one village at a time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== ABHIARA PROMISE ===== */}
      <section className="py-12 bg-[#0A1628]">
        <div className="container">
          <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-2xl p-8 text-center my-12 max-w-3xl mx-auto">
            <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-6">Truth of Life</p>
            <p className="text-2xl md:text-3xl text-white font-bold italic leading-relaxed mb-2">"Help someone today who needs it.</p>
            <p className="text-2xl md:text-3xl text-white font-bold italic leading-relaxed mb-2">It returns to you.</p>
            <p className="text-2xl md:text-3xl text-[#C9A84C] font-bold italic leading-relaxed mb-6">Always. But another way."</p>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto my-4" />
            <p className="text-[#C9A84C] text-sm uppercase tracking-widest font-semibold">— Abhiara Foundation</p>
            <p className="text-white/50 text-xs uppercase tracking-widest mt-1">Written by Abhimanyu Mallik</p>
          </div>
        </div>
      </section>

      {/* Smooth transition: dark → light */}
      <div className="section-divider-dark-to-light" />

      {/* ===== S4: THREE PILLARS (LIGHT) ===== */}
      <section className="py-20 md:py-28 section-light">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label-light mb-4">WHAT WE DO</p>
            <h2 className="heading-xl light-heading mb-4">
              Three Pillars. <span className="text-[#C9A84C]">One Promise.</span>
            </h2>
            <div className="gradient-rule-light mx-auto mb-6" />
            <p className="font-sans text-[15px] light-body max-w-lg mx-auto">
              Covering all of Odisha and expanding across other states.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: GraduationCap,
                sdg: "SDG 4",
                title: "Education",
                data: "50+ Students Reached \u00b7 Target: 500+ in 2026",
                body: "We distributed books and study materials to 50+ tribal children in Kendrapara, Odisha. Our goal is to reach 500+ students across the state.",
                img: EDUCATION_IMG,
                cta: { label: "See Programme", href: "/programs" },
                accent: "gold",
              },
              {
                icon: HeartHandshake,
                sdg: "SDG 3",
                title: "Elderly Care",
                data: "40+ Elders Visited \u00b7 Target: 200+ in 2026",
                body: "We visited Hope is Life Old Age Home in Puri, spending time with 40+ elderly residents. Our goal is to reach 200+ elders across Odisha.",
                img: ELDERLY_IMG,
                cta: { label: "See Programme", href: "/programs" },
                accent: "teal",
              },
              {
                icon: Building2,
                sdg: "SDG 10 + 11",
                title: "CSR Implementation",
                data: "Not Started Yet \u00b7 Planned for 2026",
                body: "We are planning end-to-end CSR project implementation for corporates under Schedule VII. This programme has not started yet \u2014 we are actively seeking partners.",
                img: COMMUNITY_IMG,
                cta: { label: "Partner With Us", href: "/csr-partners" },
                accent: "gold",
              },
            ].map((pillar, i) => (
              <AnimatedSection key={pillar.title} delay={i * 0.08}>
                <div className="group light-card overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <img src={pillar.img} alt={pillar.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <pillar.icon size={18} className={pillar.accent === "gold" ? "text-[#C9A84C]" : "text-[#1A7F8E]"} />
                      <span className="font-serif text-lg font-bold text-white drop-shadow-md">{pillar.title}</span>
                    </div>
                    <span className="absolute top-3 right-3 font-mono text-[9px] tracking-wider uppercase bg-black/40 backdrop-blur-sm px-2 py-1 text-white/70 rounded-sm">
                      {pillar.sdg}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <p className="font-mono text-[10px] tracking-wider text-[#B8942A] mb-3">{pillar.data}</p>
                    <p className="font-sans text-[14px] light-body leading-relaxed mb-5 flex-1">{pillar.body}</p>
                    <Link
                      href={pillar.cta.href}
                      className={`font-mono text-[10px] tracking-[0.15em] uppercase flex items-center gap-2 ${
                        pillar.accent === "gold" ? "text-[#B8942A] hover:text-[#9A7A1E]" : "text-[#1A7F8E] hover:text-[#145E6A]"
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

      {/* Smooth transition: light → dark */}
      <div className="section-divider-light-to-dark" />

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
                  { phase: "Phase 1", years: "2025–2026", desc: "Build corpus · Register · Launch education & elderly care programmes" },
                  { phase: "Phase 2", years: "2027", desc: "Acquire land in tribal Odisha · Begin CBSE affiliation" },
                  { phase: "Phase 3", years: "2028", desc: "Construction begins · Recruit founding faculty" },
                  { phase: "Phase 4", years: "2029–2030", desc: "Abhiara Vidyapeeth opens · First batch enrolled" },
                ].map((item, i) => (
                  <div key={item.phase} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-[#C9A84C]" : "bg-[#C9A84C]/30"} shrink-0`} />
                      {i < 3 && <div className="w-px h-full bg-[#C9A84C]/20 min-h-[60px]" />}
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

      {/* Smooth transition: dark → light */}
      <div className="section-divider-dark-to-light" />

      {/* ===== S8: ACTIVITIES PREVIEW (LIGHT) ===== */}
      <section className="py-20 md:py-28 section-light">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label-light mb-4">ON THE GROUND</p>
            <h2 className="heading-xl light-heading mb-4">
              Our <span className="text-[#C9A84C]">Activities</span>
            </h2>
            <div className="gradient-rule-light mx-auto mb-6" />
            <p className="font-sans text-[15px] light-body max-w-lg mx-auto">
              Real moments from the field — visiting old age homes, donating books to tribal students, and building connections that matter.
            </p>
          </AnimatedSection>

          {/* Activity Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {activityPreviews.map((item: any, i: number) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="light-card p-6 h-full">
                  <span className={`inline-block font-mono text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm mb-3 ${item.cat === 'Elderly Care' ? 'bg-[#C9A84C]/15 text-[#B8942A]' : 'bg-[#1A7F8E]/15 text-[#1A7F8E]'}`}>
                    {item.cat}
                  </span>
                  <h3 className="font-serif text-lg font-bold light-heading mb-2">{item.title}</h3>
                  <p className="font-sans text-[13px] light-body leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA to activities page */}
          <AnimatedSection className="text-center">
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 px-8 py-3 border border-[#B8942A]/40 text-[#B8942A] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#C9A84C]/10 transition-colors"
            >
              VIEW ALL ACTIVITIES <ArrowRight size={12} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Smooth transition: light → dark */}
      <div className="section-divider-light-to-dark" />

      {/* ===== SOCIAL PROOF / FOUNDER CREDIBILITY ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628] relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }} />

        <div className="container relative z-10">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">WHY TRUST ABHIARA</p>
            <h2 className="heading-xl text-white mb-4">
              Led by <span className="text-[#C9A84C]">Professionals.</span> Driven by <span className="text-[#1A7F8E]">Purpose.</span>
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-xl mx-auto">
              Abhiara Foundation is not just another NGO. It is built on professional governance, financial accountability, and a deeply personal commitment to change.
            </p>
          </AnimatedSection>

          {/* ---- CERTIFICATION BADGES ---- */}
          <AnimatedSection className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: BadgeCheck, label: "CMA Qualified", sub: "ICMAI Certified", color: "text-[#C9A84C]" },
                { icon: Shield, label: "Section 8 Company", sub: "Companies Act 2013", color: "text-[#1A7F8E]" },
                { icon: FileCheck, label: "Schedule VII", sub: "CSR Compliant", color: "text-[#C9A84C]" },
                { icon: CheckCircle, label: "SDG Aligned", sub: "Goals 3 · 4 · 10 · 11", color: "text-[#1A7F8E]" },
              ].map((badge) => (
                <div key={badge.label} className="text-center p-4 border border-white/[0.08] rounded-sm">
                  <badge.icon size={28} className={`${badge.color} mx-auto mb-2`} />
                  <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white font-bold">{badge.label}</p>
                  <p className="font-mono text-[8px] tracking-wider uppercase text-white/40 mt-1">{badge.sub}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-14 items-start">
            {/* Founder Photo + Quick Bio */}
            <AnimatedSection direction="left">
              <div className="text-center lg:text-left">
                <div className="w-48 h-48 md:w-56 md:h-56 mx-auto lg:mx-0 rounded-full overflow-hidden border-2 border-[#C9A84C]/30 mb-6">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/abhimanyu-mallik-photo_f9777f21.png"
                    alt="Abhimanyu Mallik - Founder, CMA"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-1">Abhimanyu Mallik</h3>
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#C9A84C] mb-2">FOUNDER &middot; DIRECTOR</p>
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#1A7F8E]">
                  CMA (Cost &amp; Management Accountant)
                </p>
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/40 mt-1 flex items-center justify-center lg:justify-start gap-1">
                  <MapPin size={10} /> Mumbai, Maharashtra
                </p>
              </div>
            </AnimatedSection>

            {/* Credibility Grid */}
            <AnimatedSection direction="right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="glass-card p-6">
                  <Award size={20} className="text-[#C9A84C] mb-3" />
                  <h4 className="font-serif text-base font-bold text-white mb-2">CMA-Qualified Governance</h4>
                  <p className="font-sans text-[13px] text-white/55 leading-relaxed">
                    The Institute of Cost Accountants of India (ICMAI) qualification ensures every rupee is tracked, reported, and audited to the highest professional standards.
                  </p>
                </div>
                <div className="glass-card p-6">
                  <Briefcase size={20} className="text-[#1A7F8E] mb-3" />
                  <h4 className="font-serif text-base font-bold text-white mb-2">Corporate Finance Background</h4>
                  <p className="font-sans text-[13px] text-white/55 leading-relaxed">
                    Years of experience in corporate finance, budgeting, and compliance — now applied to transparent NGO operations and CSR fund management.
                  </p>
                </div>
                <div className="glass-card p-6">
                  <Shield size={20} className="text-[#C9A84C] mb-3" />
                  <h4 className="font-serif text-base font-bold text-white mb-2">Schedule VII Compliant</h4>
                  <p className="font-sans text-[13px] text-white/55 leading-relaxed">
                    Full compliance with Companies Act 2013, Schedule VII. Monthly impact reports, audited utilisation certificates, and complete documentation for CSR partners.
                  </p>
                </div>
                <div className="glass-card p-6">
                  <MapPin size={20} className="text-[#1A7F8E] mb-3" />
                  <h4 className="font-serif text-base font-bold text-white mb-2">Village to Metro Mumbai</h4>
                  <p className="font-sans text-[13px] text-white/55 leading-relaxed">
                    From a remote village in Odisha to professional life in Mumbai — the founder's own journey is the foundation's deepest motivation and proof of what is possible.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-[#C9A84C] hover:text-[#B8942A] transition-colors"
                >
                  MEET THE FULL TEAM <ArrowRight size={12} />
                </Link>
                <Link
                  href="/csr-partners"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-[#1A7F8E] hover:text-[#C9A84C] transition-colors"
                >
                  CSR PARTNERSHIP DETAILS <ArrowRight size={12} />
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* ---- TESTIMONIALS ---- */}
          <AnimatedSection className="mt-20">
            <div className="text-center mb-10">
              <p className="section-label mb-4">VOICES FROM THE GROUND</p>
              <div className="gradient-rule mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  quote: "When Abhiara volunteers came to our old age home in Puri, the elders felt seen for the first time in years. They did not just visit — they listened.",
                  name: "Caretaker",
                  role: "Old Age Home, Puri, Odisha",
                  accent: "border-[#C9A84C]/30",
                },
                {
                  quote: "The books and stationery they distributed to our students in Kendrapara were not charity — they were a bridge. These children now believe education is for them too.",
                  name: "School Teacher",
                  role: "Government School, Kendrapara, Odisha",
                  accent: "border-[#1A7F8E]/30",
                },
                {
                  quote: "What sets Abhiara apart is the founder's personal connection to rural Odisha. This is not a corporate CSR checkbox — it is someone giving back to where they came from.",
                  name: "Community Elder",
                  role: "Koraput District, Odisha",
                  accent: "border-[#C9A84C]/30",
                },
              ].map((t, i) => (
                <div key={i} className={`glass-card p-6 border-l-2 ${t.accent}`}>
                  <Quote size={18} className="text-[#C9A84C]/40 mb-3" />
                  <p className="font-serif text-[14px] italic text-white/70 leading-relaxed mb-4">
                    "{t.quote}"
                  </p>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white font-bold">{t.name}</p>
                    <p className="font-mono text-[8px] tracking-wider uppercase text-white/40">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* ---- CSR TARGET COMPANIES WITH LOGOS ---- */}
          <AnimatedSection className="mt-20">
            <div className="text-center mb-10">
              <p className="section-label mb-4">CSR PARTNERSHIP TARGETS</p>
              <p className="font-sans text-[14px] text-white/50 max-w-xl mx-auto mt-3">
                We are actively pursuing CSR partnerships with India's leading corporates for Schedule VII implementation in education and elderly care.
              </p>
              <div className="gradient-rule mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto mb-10">
              {[
                { name: "Tata Group", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/tata-group_88854430.jpg", url: "https://www.tata.com/community" },
                { name: "Infosys", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/infosys_f98fac0e.png", url: "https://www.infosys.com/infosys-foundation.html" },
                { name: "Wipro", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/wipro_c9152541.png", url: "https://www.wipro.com/content/nexus/en/wipro-foundation.html" },
                { name: "HDFC Bank", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/hdfc-bank_9e33582f.png", url: "https://www.hdfcbank.com/personal/about-us/csr" },
                { name: "Reliance", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/reliance_db35516d.png", url: "https://www.reliancefoundation.org/" },
                { name: "Mahindra", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/mahindra_62339d77.png", url: "https://www.mahindra.com/our-impact" },
                { name: "Adani Foundation", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/adani-foundation_94f29839.jpg", url: "https://www.adanifoundation.org/" },
                { name: "JSW", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/jsw_fc295f62.png", url: "https://www.jswfoundation.org/" },
                { name: "Vedanta", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/vedanta_815e72d1.png", url: "https://www.vedantalimited.com/sustainability/social" },
                { name: "NTPC", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/ntpc_ab405914.png", url: "https://www.ntpc.co.in/en/corporate-citizenship/csr" },
              ].map((company) => (
                <a
                  key={company.name}
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-[#C9A84C]/30 rounded-sm p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300"
                >
                  <div className="w-full h-12 flex items-center justify-center">
                    <img src={company.logo} alt={company.name} className="max-h-12 max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" loading="lazy" />
                  </div>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/50 group-hover:text-[#C9A84C] transition-colors">{company.name}</p>
                </a>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/csr-partners"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors"
              >
                EXPLORE CSR PARTNERSHIP <ArrowRight size={12} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Smooth transition: dark → gold CTA */}

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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#0A1628] text-[#C9A84C] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#06101F] transition-colors"
              >
                OUR STORY <ArrowRight size={12} />
              </Link>
              <Link
                href="/csr-partners"
                className="inline-flex items-center gap-2 px-8 py-3 border border-[#0A1628]/30 text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#0A1628]/10 transition-colors"
              >
                PARTNER WITH US <ArrowRight size={12} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
