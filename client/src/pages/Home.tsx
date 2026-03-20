/*
 * Abhiara Foundation — World-Class Single-Page Website
 * Design: Dark premium, glass-morphism, Cormorant Garamond + Space Mono + DM Sans
 * 15 Sections: Announcement → Navigation → Hero → Trust → Impact Numbers →
 *   About → Three Pillars → Impact Stories → CSR → Donate → School Vision →
 *   Transparency → Newsletter → Contact → Footer
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { useCountUp } from "@/hooks/useScrollAnimation";
import FadeIn from "@/components/FadeIn";
import AbhiaraLogo from "@/components/AbhiaraLogo";
import {
  GraduationCap, Heart, Building2, ArrowRight, Menu, X,
  Mail, MapPin, Phone, Linkedin, Instagram, Facebook,
  Shield, FileCheck, BarChart3, Users, Calendar, Target,
  Handshake, Scale, BookOpen, ChevronDown
} from "lucide-react";

/* ─── COUNTER COMPONENT ─── */
function Counter({ end, prefix = "", suffix = "", label }: { end: number; prefix?: string; suffix?: string; label: string }) {
  const { ref, count } = useCountUp(end, 2000);
  const formatted = end >= 100000
    ? `${prefix}${(count / 100000).toFixed(count >= end ? 0 : 1)}L`
    : `${prefix}${count.toLocaleString("en-IN")}${suffix}`;
  return (
    <div ref={ref} className="text-center">
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 700, color: "#C9A84C", lineHeight: 1.1 }}>
        {formatted}
      </p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.60)", marginTop: "8px" }}>
        {label}
      </p>
    </div>
  );
}

/* ─── BUDGET BAR ─── */
function BudgetBar({ label, percent, amount, color, delay }: { label: string; percent: number; amount: string; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setWidth(percent), delay * 1000); obs.unobserve(el); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [percent, delay]);
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.70)" }}>{label}</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#C9A84C" }}>{amount} · {percent}%</span>
      </div>
      <div className="w-full h-2 rounded-sm" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="h-full rounded-sm"
          style={{ width: `${width}%`, background: color, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </div>
    </div>
  );
}

/* ─── DONATE SECTION ─── */
const impactMessages: Record<number, string> = {
  500: "Funds learning materials for 1 child for 1 month",
  1000: "Funds 1 month of learning materials for 2 children",
  5000: "Sponsors a full month of one elder's companion visits",
  10000: "Covers one full health camp in a tribal district",
  25000: "Sponsors an entire digital learning session for 50 students",
  50000: "Co-funds one month of operations in a Koraput village",
};

function getImpactMessage(amount: number): string {
  if (amount <= 0) return "";
  if (amount < 500) return "Every rupee counts toward building a brighter future";
  if (amount < 1000) return impactMessages[500];
  if (amount < 5000) return impactMessages[1000];
  if (amount < 10000) return impactMessages[5000];
  if (amount < 25000) return impactMessages[10000];
  if (amount < 50000) return impactMessages[25000];
  return impactMessages[50000];
}

/* ─── MAIN COMPONENT ─── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donateAmount, setDonateAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const presetAmounts = [500, 1000, 5000, 10000];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Mission", href: "#mission" },
    { label: "CSR", href: "#csr" },
    { label: "School", href: "#school" },
    { label: "Donate", href: "#donate" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = useCallback((href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>

      {/* ═══════ S1 — ANNOUNCEMENT BAR ═══════ */}
      <div style={{ background: "#C9A84C", padding: "8px 0" }}>
        <div className="container text-center">
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#0A1628" }}>
            ✦ Section 8 Company Registration in Progress · 12A &amp; 80G Application Filing Shortly · <a href="#contact" className="underline hover:no-underline">Learn More →</a>
          </p>
        </div>
      </div>

      {/* ═══════ S2 — NAVIGATION ═══════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,22,40,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.25)" : "1px solid transparent",
          marginTop: scrolled ? 0 : 32,
        }}
      >
        <div className="container flex items-center justify-between" style={{ height: "64px" }}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <AbhiaraLogo />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.60)" }}
                className="hover:!text-[#C9A84C] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#csr"
            onClick={(e) => { e.preventDefault(); handleNavClick("#csr"); }}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 transition-colors"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", background: "#C9A84C", color: "#0A1628", borderRadius: "3px" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#B8942A")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#C9A84C")}
          >
            Partner With Us →
          </a>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8" style={{ background: "rgba(4,12,24,0.98)" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 600, color: "#FFFFFF" }}
              className="hover:!text-[#C9A84C] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#csr"
            onClick={(e) => { e.preventDefault(); handleNavClick("#csr"); }}
            className="mt-4 px-8 py-3"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", background: "#C9A84C", color: "#0A1628", borderRadius: "3px" }}
          >
            Partner With Us →
          </a>
        </div>
      )}

      {/* ═══════ S3 — HERO ═══════ */}
      <section className="relative flex flex-col justify-center" style={{ minHeight: "100vh", background: "#0A1628", paddingTop: "96px" }}>
        {/* Radial gradient */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(26,127,142,0.12) 0%, transparent 60%)" }} />
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 52H0z' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3C/svg%3E\")", backgroundSize: "60px 60px" }} />

        <div className="relative container">
          <FadeIn>
            <p className="section-label mb-6">Section 8 Company · NGO · Odisha · India</p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 700, lineHeight: 1.05, marginBottom: "1.5rem" }}>
              <span style={{ color: "#C9A84C" }}>Fearless.</span><br />
              <span style={{ color: "#FFFFFF" }}>Purposeful.</span><br />
              <span style={{ color: "#FFFFFF" }}>Rooted.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", color: "rgba(255,255,255,0.60)", maxWidth: "600px", lineHeight: 1.8, marginBottom: "2rem" }}>
              Every child from a remote village deserves a fearless path.<br />
              Every elder deserves dignity in their final years.<br />
              We are building that path — village by village.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#donate"
                onClick={(e) => { e.preventDefault(); handleNavClick("#donate"); }}
                className="inline-flex items-center gap-2 px-7 py-3 transition-colors"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", background: "#C9A84C", color: "#0A1628", borderRadius: "3px" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#B8942A")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#C9A84C")}
              >
                Join Our Mission <ArrowRight size={14} />
              </a>
              <a
                href="#csr"
                onClick={(e) => { e.preventDefault(); handleNavClick("#csr"); }}
                className="inline-flex items-center gap-2 px-7 py-3 transition-colors"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.80)", borderRadius: "3px" }}
              >
                Partner With Us
              </a>
            </div>
          </FadeIn>

          {/* Manifesto quote */}
          <FadeIn delay={0.32}>
            <div className="mb-12" style={{ borderLeft: "3px solid #1A7F8E", paddingLeft: "1.5rem", maxWidth: "640px" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 2vw, 22px)", fontStyle: "italic", color: "#C9A84C", lineHeight: 1.6 }}>
                "Remote to Metro Mumbai was my journey. Abhiara Foundation is my promise — that the next child from the village has a path."
              </p>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,0.40)", marginTop: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                — Abhimanyu Mallik · Founder
              </p>
            </div>
          </FadeIn>

          {/* Impact stats grid */}
          <FadeIn delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "500+", label: "Students Reached" },
                { value: "200+", label: "Elders Supported" },
                { value: "₹30L", label: "CSR Target FY26" },
                { value: "3", label: "Districts in Odisha" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-5 text-center">
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 700, color: "#C9A84C" }}>{stat.value}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.50)", marginTop: "4px" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-12">
            <a href="#trust" onClick={(e) => { e.preventDefault(); handleNavClick("#trust"); }} className="animate-bounce">
              <ChevronDown size={24} style={{ color: "rgba(255,255,255,0.30)" }} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ S4 — TRUST BAR ═══════ */}
      <section id="trust" style={{ background: "#080F1C", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container py-5 overflow-x-auto">
          <div className="flex items-center gap-8 whitespace-nowrap" style={{ minWidth: "max-content" }}>
            {[
              "Section 8 Company",
              "CMA-Led Finance",
              "12A Application Pending",
              "SDG 3 · 4 · 10 · 11",
              "Schedule VII CSR",
              "Founded 2025",
            ].map((badge) => (
              <span key={badge} style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)" }}>
                ✦ {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ S5 — IMPACT NUMBERS ═══════ */}
      <section style={{ background: "#080F1C", padding: "6rem 0" }}>
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="section-label mb-4">Impact</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.8vw, 52px)", fontWeight: 700, color: "#FFFFFF" }}>
                Numbers that <span style={{ color: "#C9A84C" }}>matter.</span>
              </h2>
              <div className="gradient-rule mx-auto" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter end={500} suffix="+" label="Children reached with learning resources" />
            <Counter end={200} suffix="+" label="Elders supported through companion network" />
            <Counter end={3000000} prefix="₹" label="Target CSR mobilisation in Year 1" />
            <Counter end={3} label="Tribal districts in Odisha in programme scope" />
          </div>
        </div>
      </section>

      {/* ═══════ S6 — ABOUT ═══════ */}
      <section id="about" style={{ background: "#0A1628", padding: "6rem 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Left: Story */}
            <FadeIn direction="left">
              <p className="section-label mb-4">The Founder's Story</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.8vw, 48px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "0.5rem" }}>
                A village in Odisha.<br />
                <span style={{ color: "#C9A84C" }}>A city called Mumbai.</span>
              </h2>
              <div className="gradient-rule" />

              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.60)", lineHeight: 1.85 }} className="space-y-5 mt-6">
                <p>
                  I grew up in a small village in Odisha — where the nearest school was a long walk, where electricity was uncertain, and where the concept of a career in finance was simply unknown. Today, I am Director of Finance at Fynd, a CMA, and a builder of AI-native financial systems.
                </p>
                <p>
                  That journey — remote to metro — was not luck. It was access. And that access is still missing for hundreds of thousands of children like me who are growing up in the same villages today.
                </p>
                <p>
                  Abhiara Foundation is my promise that the next child does not have to wait as long as I did. The name combines my own name — <strong style={{ color: "#C9A84C" }}>ABHI</strong>, meaning fearless — and my daughter Aradhana's name — <strong style={{ color: "#1A7F8E" }}>ARA</strong>, meaning ray of sacred light. She is the reason I build this, and she will one day lead it.
                </p>
                <p>
                  We are building three things: educational pathways for tribal district children in Odisha, dignity infrastructure for elderly communities, and a trusted implementation channel for CSR partners who want their rupee to truly matter.
                </p>
              </div>

              <a
                href="#mission"
                onClick={(e) => { e.preventDefault(); handleNavClick("#mission"); }}
                className="inline-flex items-center gap-2 mt-8 px-6 py-2.5 transition-colors"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", border: "1px solid #1A7F8E", color: "#1A7F8E", borderRadius: "3px" }}
              >
                Read the Full Story <ArrowRight size={12} />
              </a>
            </FadeIn>

            {/* Right: Cards */}
            <div>
              <FadeIn direction="right">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Founder", value: "Abhimanyu Mallik · CMA · Director of Finance" },
                    { label: "Structure", value: "Section 8 Company · Limited by Guarantee" },
                    { label: "Focus Area", value: "Odisha — Koraput, Kalahandi, Rayagada Districts" },
                    { label: "Compliance", value: "CMA-Led · IFC Ready · 100% Utilisation Target" },
                  ].map((card) => (
                    <div key={card.label} className="glass-card-gold p-5">
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A84C", marginBottom: "8px" }}>{card.label}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{card.value}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Name meaning card */}
              <FadeIn delay={0.16} direction="right">
                <div className="p-6" style={{ background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.30)", borderRadius: "6px", borderImage: "linear-gradient(135deg, rgba(201,168,76,0.40), rgba(26,127,142,0.30)) 1" }}>
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <div>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 700, color: "#C9A84C" }}>ABHI · अभि</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.50)" }}>Fearless, Brave, Dauntless</p>
                      </div>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", color: "rgba(255,255,255,0.20)" }}>+</span>
                      <div>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 700, color: "#1A7F8E" }}>ARA · आरा</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.50)" }}>Ray of Sacred Light</p>
                      </div>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", color: "rgba(255,255,255,0.20)" }}>=</span>
                      <div>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 700, color: "#FFFFFF" }}>ABHIARA</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.50)" }}>A Fearless Ray of Light</p>
                      </div>
                    </div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontStyle: "italic", color: "rgba(255,255,255,0.45)", marginTop: "12px" }}>
                      "Named for a father's fearlessness and a daughter's sacred light."
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ S7 — THREE PILLARS ═══════ */}
      <section id="mission" style={{ background: "#06101F", padding: "6rem 0" }}>
        <div className="container">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="section-label mb-4">Our Work</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.8vw, 52px)", fontWeight: 700, color: "#FFFFFF" }}>
                Three Pillars. <span style={{ color: "#C9A84C" }}>One Promise.</span>
              </h2>
              <div className="gradient-rule mx-auto" />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.55)", maxWidth: "640px", margin: "1rem auto 0" }}>
                Every programme we run is rooted in measurable impact, statutory compliance, and complete financial accountability.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Pillar 1 — Education */}
            <FadeIn delay={0}>
              <div className="glass-card p-7 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(201,168,76,0.12)" }}>
                    <GraduationCap size={20} style={{ color: "#C9A84C" }} />
                  </div>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#1A7F8E", background: "rgba(26,127,142,0.12)", padding: "3px 8px", borderRadius: "3px" }}>
                    SDG 4 — Quality Education
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px" }}>Education</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#C9A84C", marginBottom: "12px" }}>Pathways for underprivileged children</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, flex: 1 }}>
                  Digital learning centres in tribal districts. Scholarship support for Class 8–12 girls. School readiness camps for early childhood. Focus districts: Koraput, Kalahandi, Rayagada.
                </p>
                <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {["500 children in Year 1", "3 learning centres", "60% girls in programme"].map((t) => (
                    <div key={t} className="flex items-center gap-2 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A84C" }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.50)" }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Pillar 2 — Elderly Care */}
            <FadeIn delay={0.12}>
              <div className="glass-card p-7 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(26,127,142,0.12)" }}>
                    <Heart size={20} style={{ color: "#1A7F8E" }} />
                  </div>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#1A7F8E", background: "rgba(26,127,142,0.12)", padding: "3px 8px", borderRadius: "3px" }}>
                    SDG 3 — Good Health &amp; Wellbeing
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px" }}>Elderly Care</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1A7F8E", marginBottom: "12px" }}>Dignity for India's forgotten generation</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, flex: 1 }}>
                  Companion networks for isolated elders. Monthly health camps. Legal aid support for pension and property rights. Urban Mumbai outreach + rural Odisha village visits.
                </p>
                <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {["200 elders supported Year 1", "Monthly health camps", "Legal aid partnerships"].map((t) => (
                    <div key={t} className="flex items-center gap-2 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#1A7F8E" }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.50)" }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Pillar 3 — CSR Impact */}
            <FadeIn delay={0.24}>
              <div className="glass-card p-7 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(201,168,76,0.12)" }}>
                    <Building2 size={20} style={{ color: "#C9A84C" }} />
                  </div>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#1A7F8E", background: "rgba(26,127,142,0.12)", padding: "3px 8px", borderRadius: "3px" }}>
                    SDG 10 &amp; 11 — Reduced Inequality
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px" }}>CSR-led Community Impact</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#C9A84C", marginBottom: "12px" }}>Implementation partner for corporate India</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, flex: 1 }}>
                  Turnkey CSR implementation under Companies Act Schedule VII. Complete project reports, audited utilisation statements, and impact dashboards for every partner. CA/CMA-led financial management.
                </p>
                <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {["₹30L Year 1 CSR target", "Schedule VII clauses (i)(ii)(x)(xi)", "100% audited utilisation"].map((t) => (
                    <div key={t} className="flex items-center gap-2 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A84C" }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.50)" }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════ S8 — IMPACT STORIES ═══════ */}
      <section style={{ background: "#040C18", padding: "6rem 0" }}>
        <div className="container">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="section-label mb-4">Voices</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.8vw, 52px)", fontWeight: 700, color: "#FFFFFF" }}>
                Voices that <span style={{ color: "#C9A84C" }}>light the way.</span>
              </h2>
              <div className="gradient-rule mx-auto" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                quote: "I did not know what a career could look like until someone showed me one. Abhiara is building the road I never had.",
                author: "Abhimanyu Mallik · Founder · Mumbai",
                borderColor: "#C9A84C",
              },
              {
                quote: "When Aradhana is 18, she will inherit a foundation with roots deep in Odisha and a mandate to serve every child who looks like her father did — a boy from a village with a big dream.",
                author: "The Founder · On Abhiara Vidyapeeth",
                borderColor: "#1A7F8E",
              },
              {
                quote: "We do not just need more NGOs. We need NGOs that treat every rupee like a fiduciary responsibility. That is what Abhiara is being built to be.",
                author: "Finance & Governance Mandate · Abhiara Foundation",
                borderColor: "rgba(255,255,255,0.20)",
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="glass-card p-7 h-full" style={{ borderLeft: `3px solid ${card.borderColor}` }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontStyle: "italic", color: "rgba(255,255,255,0.80)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    "{card.quote}"
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)" }}>
                    — {card.author}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ S9 — CSR PARTNERSHIP ═══════ */}
      <section id="csr" style={{ background: "#080F1C", padding: "6rem 0" }}>
        <div className="container">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="section-label mb-4">Corporate Partnership</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.8vw, 52px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15 }}>
                Your CSR spend.<br />
                <span style={{ color: "#C9A84C" }}>Our accountability.</span>
              </h2>
              <div className="gradient-rule mx-auto" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Left: Text + Table */}
            <FadeIn direction="left">
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.60)", lineHeight: 1.85, marginBottom: "2rem" }}>
                We are a Schedule VII compliant implementation partner. For every rupee you invest, you receive: a formal project agreement, quarterly impact reports, audited utilisation statements, and full Board-level documentation for your annual report.
              </p>

              {/* Schedule VII Table */}
              <div className="glass-card overflow-hidden mb-6">
                <table className="w-full" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "rgba(201,168,76,0.08)" }}>
                      <th className="text-left p-3" style={{ color: "#C9A84C", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Clause</th>
                      <th className="text-left p-3" style={{ color: "#C9A84C", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Activity</th>
                      <th className="text-left p-3" style={{ color: "#C9A84C", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}>SDG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { clause: "(i)", activity: "Education — scholarship, learning centres", sdg: "SDG 4" },
                      { clause: "(ii)", activity: "Health — elderly medical camps", sdg: "SDG 3" },
                      { clause: "(x)", activity: "Rural development", sdg: "SDG 10" },
                      { clause: "(xi)", activity: "Slum development / resettlement", sdg: "SDG 11" },
                    ].map((row) => (
                      <tr key={row.clause} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <td className="p-3" style={{ color: "#1A7F8E", fontFamily: "'Space Mono', monospace", fontSize: "12px" }}>{row.clause}</td>
                        <td className="p-3" style={{ color: "rgba(255,255,255,0.60)" }}>{row.activity}</td>
                        <td className="p-3" style={{ color: "rgba(255,255,255,0.45)" }}>{row.sdg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3">
                {["CMA-led financial management", "Statutory audit every year", "FCRA application in progress", "80G tax benefit for donors (pending)"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <Shield size={14} style={{ color: "#C9A84C", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.50)" }}>{badge}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Right: Budget bars */}
            <FadeIn direction="right">
              <div className="glass-card-gold p-7">
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#C9A84C", marginBottom: "4px" }}>Year 1 Budget</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 700, color: "#FFFFFF", marginBottom: "1.5rem" }}>₹30,00,000 Breakdown</h3>

                <BudgetBar label="Education Programmes" percent={45} amount="₹13,50,000" color="#C9A84C" delay={0} />
                <BudgetBar label="Elderly Care" percent={30} amount="₹9,00,000" color="#1A7F8E" delay={0.15} />
                <BudgetBar label="Infrastructure / Capex" percent={15} amount="₹4,50,000" color="#1e3a5f" delay={0.3} />
                <BudgetBar label="Admin / Compliance" percent={10} amount="₹3,00,000" color="#4a5568" delay={0.45} />

                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)", marginTop: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Administrative costs capped at 10% — CMA-certified.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Partner targets */}
          <FadeIn delay={0.2}>
            <div className="mt-14">
              <p className="text-center mb-6" style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#1A7F8E" }}>
                Year 1 CSR Targets — Odisha's Largest Spenders
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {["NALCO", "ONGC", "Tata Steel", "Coal India", "NTPC Odisha", "SAIL", "Vedanta", "POSCO", "Hindalco", "MCL"].map((company) => (
                  <div key={company} className="glass-card px-5 py-3">
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "rgba(255,255,255,0.50)", letterSpacing: "0.1em" }}>{company}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                  className="inline-flex items-center gap-2 px-7 py-3 transition-colors"
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", background: "#C9A84C", color: "#0A1628", borderRadius: "3px" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#B8942A")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#C9A84C")}
                >
                  Download CSR Proposal <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ S10 — DONATE ═══════ */}
      <section id="donate" style={{ background: "#0A1628", padding: "6rem 0" }}>
        <div className="container max-w-2xl mx-auto text-center">
          <FadeIn>
            <p className="section-label mb-4">Support Us</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.8vw, 52px)", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>
              Light up a life <span style={{ color: "#C9A84C" }}>today.</span>
            </h2>
            <div className="gradient-rule mx-auto" />
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="mt-10">
              {/* Preset buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setDonateAmount(amt); setCustomAmount(""); }}
                    className="px-6 py-3 transition-all"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "13px",
                      borderRadius: "3px",
                      border: donateAmount === amt && !customAmount ? "1px solid #C9A84C" : "1px solid rgba(255,255,255,0.12)",
                      background: donateAmount === amt && !customAmount ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
                      color: donateAmount === amt && !customAmount ? "#C9A84C" : "rgba(255,255,255,0.60)",
                    }}
                  >
                    ₹{amt.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ fontFamily: "'Space Mono', monospace", fontSize: "14px", color: "rgba(255,255,255,0.40)" }}>₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val > 0) setDonateAmount(val);
                    }}
                    className="pl-8 pr-4 py-3 w-48 outline-none"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "14px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "4px",
                      color: "#FFFFFF",
                    }}
                  />
                </div>
              </div>

              {/* Impact message */}
              <div className="glass-card-gold p-5 mb-8 mx-auto" style={{ maxWidth: "480px" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#C9A84C", lineHeight: 1.6 }}>
                  {getImpactMessage(donateAmount)}
                </p>
              </div>

              {/* CTA */}
              <a
                href="mailto:info@abhiarafoundation.org?subject=Donation%20Inquiry"
                className="inline-flex items-center gap-2 px-8 py-3.5 transition-colors"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", background: "#C9A84C", color: "#0A1628", borderRadius: "3px" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#B8942A")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#C9A84C")}
              >
                Proceed to Donate <ArrowRight size={14} />
              </a>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "1rem" }}>
                80G tax benefit available on registration (pending). UPI and bank transfer details available on request.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ S11 — SCHOOL VISION ═══════ */}
      <section id="school" style={{ background: "#06101F", padding: "6rem 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <FadeIn direction="left">
              <p className="section-label mb-4">Long-Term Vision</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.8vw, 52px)", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>
                Abhiara <span style={{ color: "#C9A84C" }}>Vidyapeeth</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#1A7F8E", marginBottom: "1rem" }}>A residential school in the heart of tribal Odisha</p>
              <div className="gradient-rule" />

              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.60)", lineHeight: 1.85 }} className="space-y-5 mt-6">
                <p>
                  Our long-term vision — funded through compounding CSR partnerships and corpus investments — is to build a full residential school in Koraput, Kalahandi, or Rayagada district of Odisha. A school that any child from any village can attend on full scholarship. A school named for purpose, not prestige.
                </p>
                <p>
                  When Aradhana Mallik turns 18, she will become a Trustee of Abhiara Foundation. By then, we hope the first brick of Abhiara Vidyapeeth has already been laid.
                </p>
              </div>

              {/* Quote block */}
              <div className="mt-8" style={{ borderLeft: "3px solid #C9A84C", paddingLeft: "1.5rem" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontStyle: "italic", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                  "The school does not exist yet. But every child we reach today is proof that it will."
                </p>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)", marginTop: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                  — Abhimanyu Mallik
                </p>
              </div>
            </FadeIn>

            {/* 5-Phase Roadmap */}
            <FadeIn direction="right">
              <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-3 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, #C9A84C, #1A7F8E)" }} />

                {[
                  { phase: "Phase 1", years: "Year 1–2", desc: "Build corpus · Register Foundation · Launch education programme" },
                  { phase: "Phase 2", years: "Year 2–3", desc: "Land identification in Koraput / Kalahandi / Rayagada" },
                  { phase: "Phase 3", years: "Year 3–4", desc: "Construction begins · CBSE/ICSE affiliation application" },
                  { phase: "Phase 4", years: "Year 4–5", desc: "School recognition · First batch enrolled" },
                  { phase: "Phase 5", years: "Year 5+", desc: "Full operations · Aradhana becomes Trustee at 18" },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="relative mb-10 last:mb-0">
                      {/* Gold dot */}
                      <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full" style={{ background: "#C9A84C", border: "2px solid #06101F" }} />
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#C9A84C", marginBottom: "2px" }}>
                        {item.phase} <span style={{ color: "rgba(255,255,255,0.30)" }}>· {item.years}</span>
                      </p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.60)", lineHeight: 1.7 }}>
                        {item.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════ S12 — TRANSPARENCY ═══════ */}
      <section style={{ background: "#040C18", padding: "6rem 0" }}>
        <div className="container">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.8vw, 52px)", fontWeight: 700, color: "#FFFFFF" }}>
                Built to be <span style={{ color: "#C9A84C" }}>trusted.</span>
              </h2>
              <div className="gradient-rule mx-auto" />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.55)", maxWidth: "600px", margin: "1rem auto 0" }}>
                We believe the greatest asset an NGO can have is a clean utilisation record. Here is how we protect yours.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            <FadeIn delay={0}>
              <div className="glass-card-gold p-7 text-center h-full">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 700, color: "#C9A84C" }}>₹0 Surplus</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.55)", marginTop: "8px" }}>100% programme utilisation target</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="glass-card-teal p-7 text-center h-full">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 700, color: "#1A7F8E" }}>CMA-Led</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.55)", marginTop: "8px" }}>Cost &amp; Management Accountant in charge of all financial controls</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.24}>
              <div className="glass-card p-7 text-center h-full">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 700, color: "#FFFFFF" }}>IFC-Ready</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.55)", marginTop: "8px" }}>Internal Financial Controls framework from Day 1</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
                Registered as Section 8 Company (Limited by Guarantee) under Companies Act 2013. No share capital. No profit distribution. Annual statutory audit mandatory.
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
                Form 10A (12A) filing: Month 2 post-incorporation. Form 10G (80G) filing: Month 3 post-incorporation. FCRA application: After 3 years of operations (pending Section 276C tax compounding resolution).
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ S13 — NEWSLETTER ═══════ */}
      <section style={{ background: "linear-gradient(135deg, rgba(26,127,142,0.08) 0%, rgba(201,168,76,0.06) 100%), #0A1628", padding: "5rem 0" }}>
        <div className="container max-w-xl mx-auto text-center">
          <FadeIn>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>
              Get our impact <span style={{ color: "#C9A84C" }}>updates.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.50)", marginBottom: "2rem" }}>
              Monthly stories. Quarterly impact reports. Annual accounts. Delivered to your inbox. No spam, ever.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); }} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 flex-1 outline-none"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "4px",
                  color: "#FFFFFF",
                }}
              />
              <button
                type="submit"
                className="px-6 py-3 transition-colors"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", background: "#C9A84C", color: "#0A1628", borderRadius: "3px", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#B8942A")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#C9A84C")}
              >
                Subscribe →
              </button>
            </form>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: "rgba(255,255,255,0.25)", marginTop: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Your data is never sold or shared. Unsubscribe any time.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ S14 — CONTACT ═══════ */}
      <section id="contact" style={{ background: "#06101F", padding: "6rem 0" }}>
        <div className="container">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="section-label mb-4">Reach Us</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.8vw, 52px)", fontWeight: 700, color: "#FFFFFF" }}>
                Every ray of light <span style={{ color: "#C9A84C" }}>counts.</span>
              </h2>
              <div className="gradient-rule mx-auto" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Left: Founder + General */}
            <FadeIn direction="left">
              <div className="glass-card-gold p-7 mb-6">
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A84C", marginBottom: "12px" }}>Founder</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px" }}>Abhimanyu Mallik</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.50)", marginBottom: "16px" }}>Founder · CMA · Director of Finance</p>
                <div className="space-y-3">
                  <a href="mailto:founder@abhiarafoundation.org" className="flex items-center gap-3 transition-colors hover:!text-[#C9A84C]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.60)" }}>
                    <Mail size={15} style={{ color: "#1A7F8E", flexShrink: 0 }} /> founder@abhiarafoundation.org
                  </a>
                  <a href="https://linkedin.com/in/abhimanyu-mallik" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:!text-[#C9A84C]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.60)" }}>
                    <Linkedin size={15} style={{ color: "#1A7F8E", flexShrink: 0 }} /> linkedin.com/in/abhimanyu-mallik
                  </a>
                  <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:!text-[#C9A84C]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.60)" }}>
                    <Phone size={15} style={{ color: "#1A7F8E", flexShrink: 0 }} /> WhatsApp
                  </a>
                </div>
              </div>

              <div className="glass-card p-7">
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#1A7F8E", marginBottom: "12px" }}>General Contact</p>
                <div className="space-y-3">
                  <a href="mailto:info@abhiarafoundation.org" className="flex items-center gap-3 transition-colors hover:!text-[#C9A84C]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.60)" }}>
                    <Mail size={15} style={{ color: "#1A7F8E", flexShrink: 0 }} /> info@abhiarafoundation.org
                  </a>
                  <a href="https://instagram.com/abhiarafoundation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:!text-[#C9A84C]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.60)" }}>
                    <Instagram size={15} style={{ color: "#1A7F8E", flexShrink: 0 }} /> @abhiarafoundation
                  </a>
                  <a href="https://facebook.com/abhiarafoundation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:!text-[#C9A84C]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.60)" }}>
                    <Facebook size={15} style={{ color: "#1A7F8E", flexShrink: 0 }} /> @abhiarafoundation
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Right: Location cards */}
            <FadeIn direction="right">
              <div className="space-y-6">
                <div className="glass-card p-7">
                  <div className="flex items-start gap-4">
                    <MapPin size={20} style={{ color: "#C9A84C", flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A84C", marginBottom: "8px" }}>Registered Office</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.70)" }}>Mumbai, Maharashtra</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.40)", marginTop: "4px" }}>Exact address to be updated post-registration</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-7">
                  <div className="flex items-start gap-4">
                    <MapPin size={20} style={{ color: "#1A7F8E", flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#1A7F8E", marginBottom: "8px" }}>Programme Area</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.70)" }}>Odisha, India</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.40)", marginTop: "4px" }}>Koraput · Kalahandi · Rayagada</p>
                    </div>
                  </div>
                </div>

                {/* Gold CTA block */}
                <div className="p-7 text-center" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.22)", borderRadius: "6px" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.70)", marginBottom: "1rem" }}>
                    Ready to partner, donate, or volunteer? Write to us.
                  </p>
                  <a
                    href="mailto:info@abhiarafoundation.org"
                    className="inline-flex items-center gap-2 px-7 py-3 transition-colors"
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", background: "#C9A84C", color: "#0A1628", borderRadius: "3px" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#B8942A")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#C9A84C")}
                  >
                    Write to Us <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════ S15 — FOOTER ═══════ */}
      <footer style={{ background: "#040C18", padding: "4rem 0 2rem" }}>
        <div className="container">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
            <div className="md:col-span-1">
              <AbhiaraLogo />
            </div>
            {[
              { title: "About", links: ["Founder's Story", "Name Meaning", "Mission & Vision"] },
              { title: "Mission & Work", links: ["Education", "Elderly Care", "CSR Impact"] },
              { title: "CSR Partnership", links: ["Schedule VII", "Budget Breakdown", "Partner Targets"] },
              { title: "Legal & Docs", links: ["Section 8 Registration", "12A & 80G Status", "Annual Reports"] },
            ].map((col) => (
              <div key={col.title}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A84C", marginBottom: "12px" }}>{col.title}</p>
                <div className="space-y-2">
                  {col.links.map((link) => (
                    <p key={link}>
                      <a href="#" className="transition-colors hover:!text-[#C9A84C]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.40)" }}>{link}</a>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <div className="text-center py-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontStyle: "italic", color: "rgba(255,255,255,0.30)" }}>
              "Fearless Ray of Light — Village to Mumbai. And back, through purpose."
            </p>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              © 2025 Abhiara Foundation · Section 8 Company under Companies Act 2013 · CIN: [Pending] · 80G: [Pending]
            </p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              abhiarafoundation.org · abhiarafoundation.com
            </p>
          </div>
        </div>
      </footer>

      {/* ═══════ WHATSAPP FLOATING BUTTON ═══════ */}
      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "#25D366", animation: "pulse-wa 2s infinite" }}
        title="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* WhatsApp pulse animation */}
      <style>{`
        @keyframes pulse-wa {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
          70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
      `}</style>
    </div>
  );
}
