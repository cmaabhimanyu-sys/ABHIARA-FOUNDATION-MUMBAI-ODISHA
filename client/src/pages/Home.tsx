/*
 * Abhiara Foundation — Home Page V3.0 "Game-Changer"
 * Cinematic scroll-driven experience with dramatic animations.
 * Sections: Hero, Trust Bar, Impact Counter, Truth of Life,
 * Three Pillars, Vidyapeeth, Activities, Social Proof + Logos Marquee, CTA
 * NO donation buttons. All CTAs → Contact or relevant pages.
 */
import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "wouter";
import {
  GraduationCap, HeartHandshake, Building2, ArrowRight, Shield, Award,
  MapPin, Briefcase, CheckCircle, Quote, FileCheck, BadgeCheck,
  Mail, Linkedin,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import CounterAnimation from "@/components/CounterAnimation";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import SEO from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

/* ─── CDN Images ─── */
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/hero-dawn-PUfjxrVLdG8a3bgPJiAovi.webp";
const EDUCATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-village-session_60ea6065.jpeg";
const ELDERLY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-1_c836b920.jpeg";
const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-2_76a48a25.jpeg";
const FOUNDER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/abhimanyu-mallik-photo_f9777f21.png";



/* ─── Staggered Text Reveal ─── */
function HeroWord({ text, delay, className }: { text: string; delay: number; className: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 60, rotateX: -40 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-block ${className}`}
      style={{ perspective: "800px" }}
    >
      {text}
    </motion.span>
  );
}

/* ─── Parallax Section Wrapper ─── */
function ParallaxSection({ children, className = "", speed = 0.15 }: { children: React.ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function Home() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();
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
    { value: getSettingNum("stat_students_target", 500), suffix: "+", label: "Students · Target 2026" },
  ], [cmsSettings]);

  // Dynamic activities preview from CMS
  const activityPreviews = useMemo(() => {
    if (cmsActivities.length > 0) {
      return cmsActivities.slice(0, 2).map((a: any) => ({
        cat: a.category === "elderly" ? "Elderly Care" : "Education",
        title: `${a.title} — ${a.date}`,
        desc: a.description.length > 200 ? a.description.slice(0, 200) + "..." : a.description,
      }));
    }
    return [
      { cat: "Elderly Care", title: "Old Age Home Visit — March 2026", desc: "Visited Hope is Life Old Age Home in Puri, Odisha. Distributed essentials and spent quality time with 40+ elderly residents." },
      { cat: "Education", title: "Book Distribution — March 2026", desc: "Distributed books and study materials to 50+ tribal children in Kendrapara, Odisha. Spent time with students and families." },
    ];
  }, [cmsActivities]);

  /* Hero parallax ref */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.5], [1, 1.1]);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Abhiara Foundation — Fearless Ray of Light"
        description="Education for every child. Dignity for every elder. Founded by Abhimanyu Mallik in Raisar, Kendrapara, Odisha. Section 8 Not-for-Profit."
        image={HERO_IMG}
        url="https://abhiarafoundation.org/"
      />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
          S1: CINEMATIC HERO — Parallax Image + Staggered Text
      ═══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        id="main-content"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        role="banner"
        aria-label="Hero section"
      >
        {/* Parallax Background Image */}
        <motion.div className="absolute inset-0" style={{ y: heroImgY, scale: heroScale }}>
          <img src={HERO_IMG} alt="Dawn breaking over the green fields of Odisha, India" className="w-full h-full object-cover" fetchPriority="high" />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-[#0A1628]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/50 via-transparent to-[#0A1628]" />

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }} />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#C9A84C]/30 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          ))}
        </div>

        <motion.div className="relative z-10 container text-center pt-24 pb-20" style={{ opacity: heroOpacity }}>
          {/* Dramatic staggered headline */}
          <h1 className="font-serif font-bold leading-[1.05] mb-8" style={{ fontSize: "clamp(56px, 8vw, 96px)" }}>
            <HeroWord text="Fearless." delay={0.4} className="text-[#C9A84C]" />
            <br />
            <HeroWord text="Purposeful." delay={0.7} className="text-white" />
            <br />
            <HeroWord text="Rooted." delay={1.0} className="text-[#1A7F8E]" />
          </h1>

          {/* Subtitle with reveal */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-lg md:text-xl text-white/70 max-w-[520px] mx-auto leading-relaxed mb-14"
          >
            Education for every child. Dignity for every elder.
            Built from the village up.
          </motion.p>

          {/* CTA Buttons with stagger */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/our-story"
              className="group px-10 py-4 bg-[#C9A84C] text-[#0A1628] font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-all duration-300 flex items-center gap-2"
            >
              OUR STORY <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/csr-partners"
              className="px-10 py-4 border border-white/30 text-white font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
            >
              PARTNER WITH US
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-5 h-9 border border-white/20 rounded-full flex items-start justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 bg-[#C9A84C] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          S2: STATS BAR — Compact Trust Indicators
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-6 bg-[#06101F] border-y border-white/[0.06]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {heroStats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.08}>
                <div className="text-center">
                  <p className="font-serif text-3xl md:text-4xl font-bold text-[#C9A84C]">
                    <CounterAnimation end={stat.value} prefix="" suffix={stat.suffix} />
                  </p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/50 mt-1">
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          S3: IMPACT COUNTER — Dramatic Large Numbers
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 section-light relative overflow-hidden">
        <div className="container relative z-10">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label-light mb-4">EARLY IMPACT</p>
            <h2 className="heading-xl light-heading mb-4">
              Small Numbers. <span className="text-[#C9A84C]">Real Lives.</span>
            </h2>
            <div className="gradient-rule-light mx-auto mb-6" />
            <p className="font-sans text-[16px] light-body max-w-lg mx-auto">
              We are in our founding year. Every number here is a real child, a real elder, a real family.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto mb-12">
            <AnimatedSection delay={0}>
              <div className="text-center py-10 md:py-14 md:border-r border-[#0A1628]/[0.08]">
                <p className="font-serif font-bold text-[#C9A84C] mb-3" style={{ fontSize: "clamp(56px, 7vw, 88px)", lineHeight: 1 }}>
                  <CounterAnimation end={getSettingNum("stat_students_reached", 50)} suffix="+" />
                </p>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#0A1628]/70 mb-3">Students Supported</p>
                <p className="font-sans text-[13px] text-[#333]/60 leading-relaxed max-w-[240px] mx-auto">
                  Children from remote villages in Odisha receiving educational support
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.12}>
              <div className="text-center py-10 md:py-14 md:border-r border-[#0A1628]/[0.08]">
                <p className="font-serif font-bold text-[#1A7F8E] mb-3" style={{ fontSize: "clamp(56px, 7vw, 88px)", lineHeight: 1 }}>
                  <CounterAnimation end={getSettingNum("stat_elders_visited", 25)} suffix="+" />
                </p>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#0A1628]/70 mb-3">Elderly Families Enrolled</p>
                <p className="font-sans text-[13px] text-[#333]/60 leading-relaxed max-w-[240px] mx-auto">
                  Senior citizens receiving companion support and health camps
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.24}>
              <div className="text-center py-10 md:py-14 relative">
                <div className="absolute top-4 right-4">
                  <span className="font-mono text-[8px] tracking-wider uppercase bg-[#C9A84C]/15 text-[#B8942A] px-2 py-1">TARGET 2026</span>
                </div>
                <p className="font-serif font-bold text-[#C9A84C] mb-3" style={{ fontSize: "clamp(56px, 7vw, 88px)", lineHeight: 1 }}>
                  <CounterAnimation end={getSettingNum("stat_students_target", 500)} suffix="+" />
                </p>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#0A1628]/70 mb-3">Students · Goal</p>
                <p className="font-sans text-[13px] text-[#333]/60 leading-relaxed max-w-[240px] mx-auto">
                  Digital learning centres and scholarship support across Odisha
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3} className="text-center">
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#0A1628]/30">
              We don't inflate numbers. We earn them — one village at a time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          S4: TRUTH OF LIFE — Dramatic Quote
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-[#0A1628] relative">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center relative">
              {/* Large decorative quote marks */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#C9A84C]/10 font-serif" style={{ fontSize: "120px", lineHeight: 1 }}>"</div>
              <div className="relative z-10 bg-[#C9A84C]/[0.06] border border-[#C9A84C]/20 rounded-2xl p-10 md:p-14">
                <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-8">Truth of Life</p>
                <p className="text-2xl md:text-3xl lg:text-4xl text-white font-bold italic leading-relaxed mb-2 font-serif">"Help someone today who needs it.</p>
                <p className="text-2xl md:text-3xl lg:text-4xl text-white font-bold italic leading-relaxed mb-2 font-serif">It returns to you.</p>
                <p className="text-2xl md:text-3xl lg:text-4xl text-[#C9A84C] font-bold italic leading-relaxed mb-8 font-serif">Always. But another way."</p>
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#C9A84C] to-[#1A7F8E] mx-auto mb-6" />
                <p className="text-[#C9A84C] text-sm uppercase tracking-widest font-semibold">— Abhiara Foundation</p>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-1">Written by Abhimanyu Mallik</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Smooth transition: dark → light */}
      <div className="section-divider-dark-to-light" />

      {/* ═══════════════════════════════════════════════════════════
          S5: THREE PILLARS — Enhanced Cards with Hover Effects
      ═══════════════════════════════════════════════════════════ */}
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
                data: "50+ Students Reached · Target: 500+ by December 2026",
                body: "50+ students reached in our founding year. We distributed books and study materials to tribal children in Kendrapara, Odisha. Target: 500+ by December 2026.",
                img: EDUCATION_IMG,
                cta: { label: "See Programme", href: "/programs" },
                accent: "gold",
              },
              {
                icon: HeartHandshake,
                sdg: "SDG 3",
                title: "Elderly Care",
                data: "40+ Elders Visited · Target: 200+ by December 2026",
                body: "40+ elders visited in our founding year at Hope is Life Old Age Home in Puri, Odisha. Target: 200+ elders across Odisha by December 2026.",
                img: ELDERLY_IMG,
                cta: { label: "See Programme", href: "/programs" },
                accent: "teal",
              },
              {
                icon: Building2,
                sdg: "SDG 10 + 11",
                title: "CSR Implementation",
                data: "Not Started Yet · Planned for 2026",
                body: "We are planning end-to-end CSR project implementation for corporates under Schedule VII. This programme has not started yet — we are actively seeking partners.",
                img: COMMUNITY_IMG,
                cta: { label: "Partner With Us", href: "/csr-partners" },
                accent: "gold",
              },
            ].map((pillar, i) => (
              <AnimatedSection key={pillar.title} delay={i * 0.1}>
                <div className="group light-card overflow-hidden h-full flex flex-col">
                  {/* Image with zoom on hover */}
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <img
                      src={pillar.img}
                      alt={pillar.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <pillar.icon size={18} className={pillar.accent === "gold" ? "text-[#C9A84C]" : "text-[#1A7F8E]"} />
                      <span className="font-serif text-lg font-bold text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>{pillar.title}</span>
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
                      className={`group/link font-mono text-[10px] tracking-[0.15em] uppercase flex items-center gap-2 ${
                        pillar.accent === "gold" ? "text-[#B8942A] hover:text-[#9A7A1E]" : "text-[#1A7F8E] hover:text-[#145E6A]"
                      } transition-colors`}
                    >
                      {pillar.cta.label} <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
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

      {/* ═══════════════════════════════════════════════════════════
          S6: ABHIARA VIDYAPEETH — Timeline with Parallax
      ═══════════════════════════════════════════════════════════ */}
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
                  { phase: "Phase 1", years: "2026", desc: "Build corpus · Register · Launch education & elderly care programmes" },
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
                      <p className="font-mono text-[10px] tracking-wider uppercase text-[#C9A84C] mb-1">{item.phase} · {item.years}</p>
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
                  — Abhimanyu Mallik · Founder
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href="/programs"
                  className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-[#1A7F8E] hover:text-[#C9A84C] transition-colors"
                >
                  LEARN MORE <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Smooth transition: dark → light */}
      <div className="section-divider-dark-to-light" />

      {/* ═══════════════════════════════════════════════════════════
          S7: ACTIVITIES PREVIEW — From CMS (Light)
      ═══════════════════════════════════════════════════════════ */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {activityPreviews.map((item: any, i: number) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="light-card p-6 h-full">
                  <span className={`inline-block font-mono text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm mb-3 ${item.cat === 'Elderly Care' ? 'bg-[#1A7F8E]/10 text-[#1A7F8E]' : 'bg-[#C9A84C]/10 text-[#B8942A]'}`}>
                    {item.cat}
                  </span>
                  <h3 className="font-serif text-lg font-bold light-heading mb-2">{item.title}</h3>
                  <p className="font-sans text-[13px] light-body leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center">
            <Link
              href="/activities"
              className="group inline-flex items-center gap-2 px-8 py-3 border border-[#B8942A]/40 text-[#B8942A] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#C9A84C]/10 transition-colors"
            >
              VIEW ALL ACTIVITIES <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Smooth transition: light → dark */}
      <div className="section-divider-light-to-dark" />

      {/* ═══════════════════════════════════════════════════════════
          S8: SOCIAL PROOF — Founder + Badges + Testimonials + Logo Marquee
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#0A1628] relative overflow-hidden">
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

          {/* Certification Badges */}
          <AnimatedSection className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: BadgeCheck, label: "CMA Qualified", sub: "ICMAI Certified", color: "text-[#C9A84C]" },
                { icon: Shield, label: "Section 8 Company", sub: "Companies Act 2013", color: "text-[#1A7F8E]" },
                { icon: FileCheck, label: "Schedule VII", sub: "CSR Compliant", color: "text-[#C9A84C]" },
                { icon: CheckCircle, label: "SDG Aligned", sub: "Goals 3 · 4 · 10 · 11", color: "text-[#1A7F8E]" },
              ].map((badge) => (
                <div key={badge.label} className="text-center p-4 border border-white/[0.08] rounded-sm hover:border-[#C9A84C]/20 transition-colors">
                  <badge.icon size={28} className={`${badge.color} mx-auto mb-2`} />
                  <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white font-bold">{badge.label}</p>
                  <p className="font-mono text-[8px] tracking-wider uppercase text-white/40 mt-1">{badge.sub}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Founder + Credibility Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-14 items-start">
            <AnimatedSection direction="left">
              <div className="text-center lg:text-left">
                <div className="w-48 h-48 md:w-56 md:h-56 mx-auto lg:mx-0 rounded-full overflow-hidden border-2 border-[#C9A84C]/30 mb-6">
                  <img src={FOUNDER_IMG} alt="Abhimanyu Mallik - Founder, CMA" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-1">Abhimanyu Mallik</h3>
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#C9A84C] mb-2">FOUNDER · DIRECTOR</p>
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#1A7F8E]">CMA (Cost &amp; Management Accountant)</p>
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/40 mt-1 flex items-center justify-center lg:justify-start gap-1">
                  <MapPin size={10} /> Mumbai, Maharashtra
                </p>
                <div className="flex flex-col gap-2 mt-4">
                  <a href="mailto:info@abhiarafoundation.org" className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/50 hover:text-[#C9A84C] transition-colors flex items-center justify-center lg:justify-start gap-2">
                    <Mail size={10} /> info@abhiarafoundation.org
                  </a>
                  <a href="https://www.linkedin.com/in/abhimanyu-mallik/" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/50 hover:text-[#C9A84C] transition-colors flex items-center justify-center lg:justify-start gap-2">
                    <Linkedin size={10} /> LinkedIn — Abhimanyu Mallik
                  </a>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: Award, title: "CMA-Qualified Governance", desc: "The Institute of Cost Accountants of India (ICMAI) qualification ensures every rupee is tracked, reported, and audited to the highest professional standards.", color: "text-[#C9A84C]" },
                  { icon: Briefcase, title: "Corporate Finance Background", desc: "Years of experience in corporate finance, budgeting, and compliance — now applied to transparent NGO operations and CSR fund management.", color: "text-[#1A7F8E]" },
                  { icon: Shield, title: "Schedule VII Compliant", desc: "Full compliance with Companies Act 2013, Schedule VII. Monthly impact reports, audited utilisation certificates, and complete documentation for CSR partners.", color: "text-[#C9A84C]" },
                  { icon: MapPin, title: "Village to Metro Mumbai", desc: "From a remote village in Odisha to professional life in Mumbai — the founder's own journey is the foundation's deepest motivation and proof of what is possible.", color: "text-[#1A7F8E]" },
                ].map((card) => (
                  <div key={card.title} className="glass-card p-6">
                    <card.icon size={20} className={`${card.color} mb-3`} />
                    <h4 className="font-serif text-base font-bold text-white mb-2">{card.title}</h4>
                    <p className="font-sans text-[13px] text-white/55 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/team" className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-[#C9A84C] hover:text-[#B8942A] transition-colors">
                  MEET THE FULL TEAM <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/csr-partners" className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-[#1A7F8E] hover:text-[#C9A84C] transition-colors">
                  CSR PARTNERSHIP DETAILS <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Testimonials */}
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
                  role: "Kendrapara District, Odisha",
                  accent: "border-[#C9A84C]/30",
                },
              ].map((t, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className={`glass-card p-6 border-l-2 ${t.accent} h-full`}>
                    <Quote size={18} className="text-[#C9A84C]/40 mb-3" />
                    <p className="font-serif text-[14px] italic text-white/70 leading-relaxed mb-4">
                      "{t.quote}"
                    </p>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white font-bold">{t.name}</p>
                      <p className="font-mono text-[8px] tracking-wider uppercase text-white/40">{t.role}</p>
                      <p className="font-mono text-[8px] tracking-wider uppercase text-white/25 mt-1">Shared during our March 2026 visit</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* CSR Partnership — Generic Text */}
          <AnimatedSection className="mt-20">
            <div className="text-center mb-6">
              <p className="section-label mb-4">CSR PARTNERSHIP TARGETS</p>
              <p className="font-sans text-[15px] text-white/60 max-w-xl mx-auto mt-3 leading-relaxed">
                We are actively pursuing CSR partnerships with India's leading corporates across Technology, Banking, Infrastructure, and Energy.
              </p>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/csr-partners"
                className="group inline-flex items-center gap-2 px-8 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors"
              >
                EXPLORE CSR PARTNERSHIP <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          S9: GOLD CTA — Full-Width Dramatic Close
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-[#C9A84C] relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%230A1628' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }} />
        <div className="container text-center relative z-10">
          <AnimatedSection>
            <h2 className="font-serif font-bold text-[#0A1628] mb-6" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
              Ready to make an impact?
            </h2>
            <p className="font-sans text-[16px] text-[#0A1628]/70 max-w-2xl mx-auto leading-relaxed mb-10">
              Whether you are a corporate looking for a credible CSR implementation partner, an individual who believes geography should not be destiny, or an institution that wants to invest in Odisha and beyond — we want to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/our-story"
                className="group inline-flex items-center gap-2 px-10 py-4 bg-[#0A1628] text-[#C9A84C] font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#06101F] transition-colors"
              >
                OUR STORY <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/csr-partners"
                className="group inline-flex items-center gap-2 px-10 py-4 border-2 border-[#0A1628]/30 text-[#0A1628] font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#0A1628]/10 transition-colors"
              >
                PARTNER WITH US <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
