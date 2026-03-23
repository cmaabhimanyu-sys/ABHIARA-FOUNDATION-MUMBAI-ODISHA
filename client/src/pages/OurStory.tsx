/*
 * Abhiara Foundation — Our Story V3.1 (Dynamic CMS)
 * Sections: Hero, Name Meaning, Founding Narrative (chapters from CMS), Google Maps, Governance, CTA
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
  "Independent Board": Users,
};

// Fallback data
const FALLBACK_CHAPTERS = [
  { label: "The Beginning", text: "I was born in Raisar, a small village in Kendrapara district \u2014 Tulasi Kshetra, one of the five sacred sites of Odisha, as holy as Puri itself \u2014 754134. Electricity was uncertain. The nearest college was a long walk and a financial stretch. The idea of career guidance did not exist. There were only two mentors \u2014 my father and my mother. No internet. No one else to tell you what was possible." },
  { label: "The Struggle", text: "What we had was a family that never gave up. When I completed my 10th class, submitting a college admission form became a crisis. The city college was out of reach. I joined a local college instead \u2014 not by choice, but by circumstance. Some called it a limitation. My parents called it a beginning." },
  { label: "The Distance", text: "I studied. I stretched. I cleared one of India\u2019s most rigorous professional examinations \u2014 the CMA, Cost and Management Accountant. I built a career in finance from the ground up, city by city, challenge by challenge. Through every difficult chapter, my wife Biswajita stood beside me \u2014 steady, silent, and unshakeable. The kind of support that does not announce itself but never disappears. I moved to Mumbai \u2014 the city that does not care where you come from, only whether you can keep up." },
  { label: "The Belief", text: "Today I lead finance for one of India\u2019s most ambitious technology companies. I understand budgets, audits, compliance, and strategy. But I also understand what it means to grow up without access \u2014 without books, without guidance, without anyone telling you that you matter. That understanding is not a footnote in my story. It is the headline." },
  { label: "The Foundation", text: "Abhiara Foundation is not charity. It is a structural intervention. It is the bridge I wish someone had built for me. It is the school I wish had existed in Raisar. It is the elder care programme I wish my family had access to. The name carries my fearlessness and my daughter\u2019s light \u2014 Abhi for courage, Ara for Aradhana, my ray of sacred light born in 2019." },
  { label: "The Plan", text: "Our plan is clear \u2014 support underprivileged children through education, care for the elderly with dignity, implement CSR projects that create real and measurable impact, and build Abhiara Vidyapeeth \u2014 a full school in Odisha \u2014 within 5 years. By 2037, when Aradhana turns 18, she becomes the youngest trustee of this foundation." },
  { label: "", text: "That is not a dream. That is a deadline.", highlight: true },
  { label: "The Scale", text: "We start in Raisar. We build in Mumbai. We think at the scale of the world." },
];

const FALLBACK_GOVERNANCE = [
  { title: "Section 8 Company", desc: "Registration pending under Companies Act 2013. Limited by Guarantee. All compliance documentation prepared." },
  { title: "Audited Reports", desc: "Annual audited financial statements. Quarterly utilisation reports for CSR partners." },
  { title: "Schedule VII", desc: "All programmes aligned to Companies Act Schedule VII for CSR compliance." },
  { title: "Independent Board", desc: "Governance structure with independent directors and advisory council." },
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
        url="https://abhiarafoundation.com/our-story"
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
                  <p className="font-serif text-xl text-[#C9A84C]/60 mb-2">अभि</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-3">
                    Fearless &middot; Brave &middot; Dauntless
                  </p>
                  <p className="font-sans text-[14px] light-body leading-relaxed">
                    <span className="text-[#C9A84C] font-semibold">ABHI</span> {abhiDesc.replace(/^ABHI\s*—?\s*/, "— ")}
                  </p>
                </div>
                <div className="light-card p-6">
                  <h3 className="font-serif text-3xl font-bold light-heading mb-1">ARA</h3>
                  <p className="font-serif text-xl text-[#C9A84C]/60 mb-2">आरा</p>
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

      {/* ===== S3: FOUNDING NARRATIVE (from CMS) ===== */}
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

          <div className="space-y-8">
            {narrativeChapters.map((block: any, i: number) => (
              <AnimatedSection key={block.label || `block-${i}`} delay={i * 0.08}>
                {block.highlight ? (
                  <div className="pl-6">
                    <p className="font-serif text-xl md:text-2xl italic text-[#C9A84C] leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                ) : (
                  <div className="border-l-2 border-[#C9A84C]/30 pl-6 hover:border-[#C9A84C] transition-colors">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">{block.label}</p>
                    <p className="font-sans text-[15px] text-white/80 leading-relaxed">{block.text}</p>
                  </div>
                )}
              </AnimatedSection>
            ))}
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

      {/* ===== TRUTH OF LIFE (LIGHT) ===== */}
      <section className="py-12 section-light">
        <div className="container">
          <div className="light-card-gold p-8 text-center my-12 max-w-3xl mx-auto">
            <p className="text-[#B8942A] text-xs uppercase tracking-widest mb-6">Truth of Life</p>
            <p className="text-2xl md:text-3xl light-heading font-bold italic leading-relaxed mb-2">"Who help today who needed.</p>
            <p className="text-2xl md:text-3xl light-heading font-bold italic leading-relaxed mb-2">It returns to him.</p>
            <p className="text-2xl md:text-3xl text-[#B8942A] font-bold italic leading-relaxed mb-6">Always but other way."</p>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto my-4" />
            <p className="text-[#B8942A] text-sm uppercase tracking-widest font-semibold">— Abhiara Foundation</p>
          </div>
        </div>
      </section>

      {/* ===== S4: GOVERNANCE (LIGHT) ===== */}
      <section className="py-20 md:py-28 section-light-alt">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label-light mb-4">GOVERNANCE</p>
            <h2 className="heading-lg light-heading mb-4">
              Built on <span className="text-[#C9A84C]">Transparency</span>
            </h2>
            <div className="gradient-rule-light mx-auto mb-6" />
            <p className="font-sans text-[15px] light-body max-w-lg mx-auto">
              Every rupee tracked. Every impact measured. Every report published.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
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
