/*
 * Abhiara Foundation — Our Story V2.0
 * 5 Sections: Hero, Name Meaning, Founding Narrative, Governance, CTA
 * NO donation buttons. All CTAs → Contact or Programs.
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Shield, BookOpen, Scale, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const JOURNEY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/founder-journey-Xx6vnKWGMfZ6h3k4ufv5M9.webp";

export default function OurStory() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Navbar />

      {/* ===== S1: HERO ===== */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={JOURNEY_IMG} alt="" className="w-full h-full object-cover" />
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

      {/* ===== S2: THE NAME ===== */}
      <section className="py-20 md:py-28 bg-[#080F1C]">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label mb-4">THE NAME</p>
            <h2 className="heading-lg text-white mb-4">
              ABHI + ARA = <span className="italic text-[#C9A84C]">Fearless Ray of Light</span>
            </h2>
            <div className="gradient-rule mx-auto" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <p className="font-sans text-[15px] text-white/60 leading-relaxed mb-8">
                Abhiara Foundation takes its name from two people who define its purpose.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glass-card-gold p-6">
                  <h3 className="font-serif text-3xl font-bold text-white mb-1">ABHI</h3>
                  <p className="font-serif text-xl text-[#C9A84C]/60 mb-2">अभि</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-3">
                    Fearless &middot; Brave &middot; Dauntless
                  </p>
                  <p className="font-sans text-[14px] text-white/55 leading-relaxed">
                    <span className="text-[#C9A84C] font-semibold">ABHI</span> — from Abhimanyu, the founder. Fearlessness. The courage it took to leave the village, to walk into the unknown, to build something from nothing.
                  </p>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-serif text-3xl font-bold text-white mb-1">ARA</h3>
                  <p className="font-serif text-xl text-[#C9A84C]/60 mb-2">आरा</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-3">
                    Ray of Sacred Light
                  </p>
                  <p className="font-sans text-[14px] text-white/55 leading-relaxed">
                    <span className="text-[#1A7F8E] font-semibold">ARA</span> — from Aradhana, his daughter. A ray of sacred light. The devotion that illuminates every step forward.
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

      {/* ===== S3: FOUNDING NARRATIVE ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container max-w-3xl">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">THE JOURNEY</p>
            <h2 className="heading-lg text-white mb-4">
              From a Village in Odisha<br />
              <span className="text-[#C9A84C]">to the Heart of Mumbai</span>
            </h2>
            <div className="gradient-rule mx-auto" />
          </AnimatedSection>

          <div className="space-y-8">
            {[
              {
                label: "The Beginning",
                text: "I grew up in a small village in Odisha — where electricity was uncertain, the nearest school was a long walk, and the idea of 'career guidance' did not exist. There were no mentors. No internet. No one to tell you what was possible.",
              },
              {
                label: "The Walk",
                text: "What I had was a mother who believed education was the only way out, and a stubbornness that refused to accept that geography should decide destiny.",
              },
              {
                label: "The City",
                text: "I walked out of that village. I studied. I failed. I studied again. I cleared national-level exams. I became a Cost & Management Accountant. I moved to Mumbai — the city that does not care where you come from, only whether you can keep up.",
              },
              {
                label: "The Promise",
                text: "Today I work in corporate finance. I understand budgets, audits, compliance, and reporting. But I also understand what it means to grow up without access — without books, without guidance, without anyone telling you that you matter.",
              },
              {
                label: "The Foundation",
                text: "Abhiara Foundation is not charity. It is a structural intervention. It is the bridge I wish someone had built for me. It is the school I wish existed in my village. It is the elder care programme I wish my grandparents had access to.",
              },
            ].map((block, i) => (
              <AnimatedSection key={block.label} delay={i * 0.08}>
                <div className="border-l-2 border-[#C9A84C]/30 pl-6 hover:border-[#C9A84C] transition-colors">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-2">{block.label}</p>
                  <p className="font-sans text-[15px] text-white/60 leading-relaxed">{block.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4} className="mt-12">
            <div className="glass-card-gold p-8 text-center">
              <p className="font-serif text-xl md:text-2xl italic text-white/80 leading-relaxed mb-4">
                "Remote to Metro Mumbai was my journey. Abhiara Foundation is my promise — that the next child from the village has a path."
              </p>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]">
                — Abhimanyu Mallik &middot; Founder
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5} className="mt-8">
            <div className="glass-card p-8 text-center">
              <p className="font-serif text-lg italic text-white/60 leading-relaxed">
                "Aradhana does not yet fully understand what this means. But one day she will read about it. And when she does, her father wants her to know that her name — her light — was the reason this foundation exists."
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== S4: GOVERNANCE ===== */}
      <section className="py-20 md:py-28 bg-[#06101F]">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">GOVERNANCE</p>
            <h2 className="heading-lg text-white mb-4">
              Built on <span className="text-[#C9A84C]">Transparency</span>
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-lg mx-auto">
              Every rupee tracked. Every impact measured. Every report published.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Section 8 Company", desc: "Limited by Guarantee under Companies Act 2013. CIN registration in progress." },
              { icon: BookOpen, title: "Audited Reports", desc: "Annual audited financial statements. Quarterly utilisation reports for CSR partners." },
              { icon: Scale, title: "Schedule VII", desc: "All programmes aligned to Companies Act Schedule VII for CSR compliance." },
              { icon: Users, title: "Independent Board", desc: "Governance structure with independent directors and advisory council." },
            ].map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.08}>
                <div className="glass-card p-6 h-full text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
                    <card.icon size={22} className="text-[#C9A84C]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="font-sans text-[13px] text-white/50 leading-relaxed">{card.desc}</p>
                </div>
              </AnimatedSection>
            ))}
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
