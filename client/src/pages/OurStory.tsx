/*
 * Abhiara Foundation — Our Story V4.0 (Improved Flow + Registration Details)
 * Sections: Hero, Name Meaning, Founding Narrative (smooth timeline), Google Maps, Governance + Registration, CTA
 */
import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, Shield, BookOpen, Scale, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { trpc } from "@/lib/trpc";

const JOURNEY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/founder-journey-Xx6vnKWGMfZ6h3k4ufv5M9.webp";

// Icon map for governance cards
const GOVERNANCE_ICONS: Record<string, any> = {
  "Section 8 Company": Shield,
  "Audited Reports": BookOpen,
  "Schedule VII": Scale,
  "Governance Structure": Users,
};

// Fallback data — improved with transition lines for better flow
const FALLBACK_CHAPTERS = [
  {
    label: "The Beginning",
    text: "I was born in Raisar, a small village in Kendrapara district — Tulasi Kshetra, one of the five sacred sites of Odisha, as holy as Puri itself. Electricity was uncertain. The nearest college was a long walk and a financial stretch. The idea of career guidance did not exist. There were only two mentors — my father and my mother. No internet. No one else to tell you what was possible.",
    transition: "But even in that silence, a spark was lit.",
  },
  {
    label: "The Struggle",
    text: "What we had was a family that never gave up. When I completed my 10th class, submitting a college admission form became a crisis. The city college was out of reach. I joined a local college instead — not by choice, but by circumstance. Some called it a limitation. My parents called it a beginning.",
    transition: "That beginning became a journey no one in the village had taken before.",
  },
  {
    label: "The Distance",
    text: "I studied. I stretched. I cleared one of India\u2019s most rigorous professional examinations — the CMA, Cost and Management Accountant. I built a career in finance from the ground up, city by city, challenge by challenge. Through every difficult chapter, my wife Biswajita stood beside me — steady, silent, and unshakeable. The kind of support that does not announce itself but never disappears. I moved to Mumbai — the city that does not care where you come from, only whether you can keep up.",
    transition: "Mumbai tested me. But it also showed me what was possible.",
  },
  {
    label: "The Belief",
    text: "Today I lead finance for one of India\u2019s most ambitious technology companies. I understand budgets, audits, compliance, and strategy. But I also understand what it means to grow up without access — without books, without guidance, without anyone telling you that you matter. That understanding is not a footnote in my story. It is the headline.",
    transition: "And that headline demanded action — not someday, but now.",
  },
  {
    label: "The Foundation",
    text: "Abhiara Foundation is not charity. It is a structural intervention. It is the bridge I wish someone had built for me. It is the school I wish had existed in Raisar. It is the elder care programme I wish my family had access to. The name carries my fearlessness and my daughter\u2019s light \u2014 Abhi for courage, Ara for Aradhana, my ray of sacred light.",
    transition: "The name was chosen. The mission was clear. Now came the plan.",
  },
  {
    label: "The Plan",
    text: "Our plan is clear \u2014 support underprivileged children through education, care for the elderly with dignity, implement CSR projects that create real and measurable impact, and build Abhiara Vidyapeeth \u2014 a full school in Odisha.",
  },
  { label: "", text: "That is not a dream. That is a deadline.", highlight: true },
  {
    label: "The Scale",
    text: "We start in Raisar. We build in Mumbai. We think at the scale of the world.",
  },
];

const FALLBACK_GOVERNANCE = [
  { title: "Section 8 Company", desc: "Registered under Companies Act 2013. Limited by Guarantee. Full compliance documentation maintained." },
  { title: "Audited Reports", desc: "Annual audited financial statements will be published from March 2027 covering FY 2026-27. Quarterly utilisation reports will be provided to all CSR partners from Q1 2026." },
  { title: "Schedule VII", desc: "All programmes aligned to Companies Act Schedule VII for CSR compliance." },
  { title: "Governance Structure", desc: "Section 8 Company governed by CMA-qualified founder with full statutory compliance. Independent board being constituted." },
];

export default function OurStory() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Fetch CMS settings
  const { data: cmsSettings = [] } = trpc.cms.settings.list.useQuery();

  const getSetting = (key: string, fallback: string) => {
    const s = cmsSettings.find((x: any) => x.settingKey === key);
    return s ? s.settingValue : fallback;
  };

  // Parse JSON settings with fallback
  const narrativeChapters = useMemo(() => {
    try {
      const raw = getSetting("ourstory_narrative_chapters", "");
      return raw ? JSON.parse(raw) : FALLBACK_CHAPTERS;
    } catch { return FALLBACK_CHAPTERS; }
  }, [cmsSettings]);

  const governanceCards = useMemo(() => {
    try {
      const raw = getSetting("ourstory_governance_cards", "");
      return raw ? JSON.parse(raw) : FALLBACK_GOVERNANCE;
    } catch { return FALLBACK_GOVERNANCE; }
  }, [cmsSettings]);

  const abhiDesc = getSetting("ourstory_abhi_desc", "ABHI \u2014 from Abhimanyu, the founder. Fearlessness. The courage it took to leave the village, to walk into the unknown, to build something from nothing.");
  const araDesc = getSetting("ourstory_ara_desc", "ARA \u2014 from Aradhana, his daughter. A ray of sacred light. The devotion that illuminates every step forward.");
  const commitmentText = getSetting("ourstory_commitment_text", "Rooted in the sacred land of Odisha. Built for every child. Built for every elder. Regardless of community, religion, or background.");
  const closingQuote = getSetting("ourstory_closing_quote", "Raisar to Mumbai. And back \u2014 through purpose.");

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Our Story — Abhiara Foundation"
        description="From Raisar village to Mumbai — the journey of Abhimanyu Mallik and how Abhiara Foundation was born. ABHI (Fearless) + ARA (Ray of Light)."
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/founder-journey-Xx6vnKWGMfZ6h3k4ufv5M9.webp"
        url="https://abhiarafoundation.org/our-story"
      />
      <Navbar />

      {/* ===== S1: HERO ===== */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={JOURNEY_IMG} alt="Founder journey from rural Odisha to Mumbai" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[#0A1628]/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/50 via-transparent to-[#0A1628]" />
        </div>
        <div className="relative z-10 container text-center pt-24 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-6"
          >
            OUR STORY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="heading-xl text-white mb-4"
          >
            Where Fearlessness<br />Meets <span className="text-[#C9A84C] italic">Light</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="gradient-rule mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-serif text-lg italic text-white/60 max-w-xl mx-auto"
          >
            The official founding narrative of Abhiara Foundation
          </motion.p>
        </div>
      </section>

      {/* ===== S2: THE NAME (LIGHT) ===== */}
      <section className="py-20 md:py-28 section-light">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label-light mb-4">THE NAME</p>
            <h2 className="heading-lg light-heading mb-4">
              ABHI + ARA = <span className="italic text-[#C9A84C]">Fearless Ray of Light</span>
            </h2>
            <div className="gradient-rule-light mx-auto" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <p className="font-sans text-[15px] light-body leading-relaxed mb-8">
                Abhiara Foundation takes its name from two people who define its purpose.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="light-card-gold p-6">
                  <h3 className="font-serif text-3xl font-bold light-heading mb-1">ABHI</h3>
                  <p className="font-serif text-xl text-[#8B6914] mb-2">अभि</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-3">
                    Fearless &middot; Brave &middot; Dauntless
                  </p>
                  <p className="font-sans text-[14px] light-body leading-relaxed">
                    <span className="text-[#C9A84C] font-semibold">ABHI</span> {abhiDesc.replace(/^ABHI\s*—?\s*/, "— ")}
                  </p>
                </div>
                <div className="light-card p-6">
                  <h3 className="font-serif text-3xl font-bold light-heading mb-1">ARA</h3>
                  <p className="font-serif text-xl text-[#8B6914] mb-2">आरा</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-3">
                    Ray of Sacred Light
                  </p>
                  <p className="font-sans text-[14px] light-body leading-relaxed">
                    <span className="text-[#1A7F8E] font-semibold">ARA</span> {araDesc.replace(/^ARA\s*—?\s*/, "— ")}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p className="font-serif text-xl italic text-[#C9A84C]">
                  Together: <span className="font-bold">Fearless Ray of Light.</span>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== S3: FOUNDING NARRATIVE — TIMELINE WITH FLOW ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container max-w-3xl">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">THE JOURNEY</p>
            <h2 className="heading-lg text-white mb-4">
              From Raisar, Odisha<br />
              <span className="text-[#C9A84C]">to the Heart of Mumbai</span>
            </h2>
            <div className="gradient-rule mx-auto" />
          </AnimatedSection>

          {/* Timeline narrative with connecting flow */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[15px] md:left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A84C]/60 via-[#1A7F8E]/40 to-[#C9A84C]/60" />

            <div className="space-y-0">
              {(() => {
                let chapterNum = 0;
                return narrativeChapters.map((block: any, i: number) => {
                  if (!block.highlight) chapterNum++;
                  return (
                <div key={block.label || `block-${i}`}>
                  <AnimatedSection delay={i * 0.08}>
                    {block.highlight ? (
                      <div className="pl-12 md:pl-14 py-6">
                        <p className="font-serif text-xl md:text-2xl italic text-[#C9A84C] leading-relaxed">
                          {block.text}
                        </p>
                      </div>
                    ) : (
                      <div className="flex gap-4 md:gap-6 py-4">
                        {/* Timeline dot */}
                        <div className="relative flex-shrink-0">
                          <div className="w-[31px] h-[31px] md:w-[39px] md:h-[39px] rounded-full border-2 border-[#C9A84C]/50 bg-[#0A1628] flex items-center justify-center z-10 relative">
                            <span className="font-mono text-[10px] text-[#C9A84C] font-bold">{String(chapterNum).padStart(2, '0')}</span>
                          </div>
                        </div>
                        {/* Content */}
                        <div className="pb-2">
                          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">{block.label}</p>
                          <p className="font-sans text-[15px] text-white/80 leading-relaxed">{block.text}</p>
                        </div>
                      </div>
                    )}
                  </AnimatedSection>

                  {/* Transition line — bridges chapters for narrative flow */}
                  {block.transition && (
                    <AnimatedSection delay={i * 0.08 + 0.04}>
                      <div className="pl-12 md:pl-14 py-3">
                        <p className="font-serif text-[15px] italic text-[#1A7F8E]/80 leading-relaxed">
                          {block.transition}
                        </p>
                      </div>
                    </AnimatedSection>
                  )}
                </div>
                  );
                });
              })()}
            </div>
          </div>

          {/* Our Commitment (from CMS) */}
          <AnimatedSection delay={0.15} className="mt-12 mb-8">
            <div className="text-center mt-12 mb-8">
              <p className="text-[#C9A84C] text-sm uppercase tracking-widest mb-3">
                Our Commitment
              </p>
              <p className="text-white/70 text-lg leading-relaxed italic">
                {commitmentText}
              </p>
            </div>
          </AnimatedSection>

          {/* Attribution (from CMS) */}
          <AnimatedSection delay={0.4} className="mt-12">
            <div className="glass-card-gold p-8 text-center">
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#C9A84C] mb-4">
                Raisar, Kendrapara, Odisha &rarr; Mumbai
              </p>
              <p className="font-serif text-xl md:text-2xl italic text-white/80 leading-relaxed mb-4">
                "{closingQuote}"
              </p>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#C9A84C] mt-2">
                — Abhimanyu Mallik, Founder &middot; Abhiara Foundation
              </p>
            </div>
          </AnimatedSection>

          {/* Raisar Village Map */}
          <AnimatedSection delay={0.45} className="mt-12">
            <div className="rounded-xl overflow-hidden border border-[#C9A84C]/30">
              <div className="p-4 border-b border-white/[0.06]">
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#1A7F8E] mb-1">WHERE IT ALL BEGAN</p>
                <p className="font-sans text-[14px] text-white/50">Raisar, Kendrapara District, Odisha — 754134</p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.5!2d86.3110516!3d20.3858855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1bd426cc0e27c7%3A0xf7f6df102495b18c!2sRaisar%2C+Odisha+754134!5e0!3m2!1sen!2sin!4v1711000000000!5m2!1sen!2sin"
                className="w-full border-0"
                style={{ height: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Raisar Village, Kendrapara, Odisha"
              />
              <div className="p-3 text-center">
                <a
                  href="https://maps.app.goo.gl/MG5242vj4tw5qEBu6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#C9A84C] hover:text-[#B8942A] transition-colors"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== TRUTH OF LIFE (DARK) ===== */}
      <section className="py-12 bg-[#0A1628]">
        <div className="container">
          <div className="glass-card-gold p-8 text-center my-12 max-w-3xl mx-auto">
            <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-6">Truth of Life</p>
            <p className="text-2xl md:text-3xl text-white font-bold italic leading-relaxed mb-2">"Help someone today who needs it.</p>
            <p className="text-2xl md:text-3xl text-white font-bold italic leading-relaxed mb-2">It returns to you.</p>
            <p className="text-2xl md:text-3xl text-[#C9A84C] font-bold italic leading-relaxed mb-6">Always. But another way."</p>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto my-4" />
            <p className="text-[#C9A84C] text-sm uppercase tracking-widest font-semibold">— Abhiara Foundation</p>
          </div>
        </div>
      </section>

      {/* ===== S4: GOVERNANCE + REGISTRATION (LIGHT) ===== */}
      <section className="py-20 md:py-28 section-light-alt">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label-light mb-4">GOVERNANCE &amp; REGISTRATION</p>
            <h2 className="heading-lg light-heading mb-4">
              Built on <span className="text-[#C9A84C]">Transparency</span>
            </h2>
            <div className="gradient-rule-light mx-auto mb-6" />
            <p className="font-sans text-[15px] light-body max-w-lg mx-auto">
              Every rupee tracked. Every impact measured. Every report published.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {governanceCards.map((card: any, i: number) => {
              const IconComp = GOVERNANCE_ICONS[card.title] || Shield;
              return (
                <AnimatedSection key={card.title} delay={i * 0.08}>
                  <div className="light-card p-6 h-full text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
                      <IconComp size={22} className="text-[#C9A84C]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold light-heading mb-2">{card.title}</h3>
                    <p className="font-sans text-[13px] light-muted leading-relaxed">{card.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Registration Status Grid */}
          <AnimatedSection delay={0.2}>
            <div className="max-w-3xl mx-auto">
              <h3 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#C9A84C] mb-5 text-center">
                Registration Status
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: "Section 8", value: "Registration in Process", active: false },
                  { label: "CIN", value: "In Process", active: false },
                  { label: "80G", value: "In Process", active: false },
                  { label: "12A", value: "In Process", active: false },
                  { label: "FCRA", value: "In Process", active: false },
                  { label: "PAN", value: "In Process", active: false },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 bg-[#0A1628]/5 border border-[#0A1628]/10 rounded-sm">
                    <p className="font-mono text-[8px] tracking-[0.15em] uppercase text-[#0A1628]/40 mb-1">{item.label}</p>
                    <p className={`font-mono text-[10px] tracking-wider uppercase font-bold ${item.active ? "text-[#1A7F8E]" : "text-[#C9A84C]"}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-center text-[#0A1628]/35 text-[10px] font-mono tracking-wider mt-3">
                All registrations are in process. Details will be updated upon approval.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== S5: CTA ===== */}
      <section className="py-16 md:py-20 bg-[#C9A84C]">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-serif font-bold text-[#0A1628] mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              Be part of the story.
            </h2>
            <p className="font-sans text-[15px] text-[#0A1628]/70 max-w-xl mx-auto mb-8">
              Whether you are a corporate, an individual, or an institution — your support builds the bridge.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#0A1628] text-[#C9A84C] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#06101F] transition-colors"
              >
                CONTACT US <ArrowRight size={12} />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-8 py-3 border border-[#0A1628]/30 text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#0A1628]/10 transition-colors"
              >
                VIEW PROGRAMS <ArrowRight size={12} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
