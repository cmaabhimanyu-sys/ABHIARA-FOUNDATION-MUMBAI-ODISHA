import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";

export default function Donate() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Donate — Abhiara Foundation"
        description="Support Abhiara Foundation's mission — education for children, dignity for the elderly. Every contribution is legally protected and mission-bound."
        url="https://abhiarafoundation.com/donate"
      />
      <Navbar />

      {/* ===== HERO (DARK — matches all other pages) ===== */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0d1f38] to-[#0A1628]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#C9A84C]/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 container text-center pt-24 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-6"
          >
            SUPPORT OUR MISSION
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="heading-xl text-white mb-4"
          >
            Help Us Build a<br />
            <span className="text-[#C9A84C]">Fearless</span> Future
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
            className="font-sans text-[15px] text-white/60 max-w-xl mx-auto"
          >
            Every contribution to Abhiara Foundation goes directly towards
            education for underprivileged children and dignity for the elderly —
            village by village, life by life.
          </motion.p>
        </div>
      </section>

      {/* ===== CONTACT TO DONATE (LIGHT) ===== */}
      <section className="py-20 md:py-28 section-light">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-4">HOW TO CONTRIBUTE</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0A1628] mb-4">
              To Donate, Please <span className="text-[#C9A84C]">Contact Us Directly</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#C9A84C] to-[#1A7F8E] mx-auto" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex flex-col items-center gap-4 mb-12">
              <a
                href="https://www.linkedin.com/in/abhimanyu-mallik/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#0A66C2] hover:bg-[#004182] text-white px-8 py-4 rounded-sm font-mono text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300 w-full max-w-sm justify-center"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn — Abhimanyu Mallik
              </a>
              <a
                href="https://wa.me/919938938321"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white px-8 py-4 rounded-sm font-mono text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300 w-full max-w-sm justify-center"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp — +91 99389 38321
              </a>
              <p className="text-[#0A1628]/50 text-sm text-center mt-2">Founder & Director · Abhiara Foundation</p>
            </div>
          </AnimatedSection>

          {/* ===== TRUTH OF LIFE ===== */}
          <AnimatedSection delay={0.15}>
            <div className="light-card p-8 text-center mb-8">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-6">Truth of Life</p>
              <p className="font-serif text-2xl md:text-3xl text-[#0A1628] font-bold italic leading-relaxed mb-2">"Help someone today who needs it.</p>
              <p className="font-serif text-2xl md:text-3xl text-[#0A1628] font-bold italic leading-relaxed mb-2">It returns to you.</p>
              <p className="font-serif text-2xl md:text-3xl text-[#C9A84C] font-bold italic leading-relaxed mb-6">Always. But another way."</p>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto my-4" />
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]">— Abhiara Foundation</p>
              <p className="font-mono text-[9px] tracking-wider uppercase text-[#0A1628]/40 mt-1">Written by Abhimanyu Mallik</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== IMPORTANT NOTICE (DARK) ===== */}
      <section className="py-20 md:py-28 bg-[#080F1C]">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSection className="text-center mb-10">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-red-400 mb-4">IMPORTANT NOTICE</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Transparency & <span className="text-[#C9A84C]">Accountability</span>
            </h2>
            <div className="gradient-rule mx-auto" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="glass-card-gold p-8 space-y-5">
              <div className="flex gap-3">
                <span className="text-red-400 mt-0.5 flex-shrink-0 font-bold">✦</span>
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Abhiara Foundation does not accept cash donations.</strong> All contributions must be made through proper banking channels — NEFT, RTGS, cheque, or online transfer — to ensure full transparency and accountability.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-red-400 mt-0.5 flex-shrink-0 font-bold">✦</span>
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">We do not work with agents or intermediaries.</strong> Abhiara Foundation does not authorise any individual or organisation to collect donations on our behalf or pay any commission in exchange for donations.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-red-400 mt-0.5 flex-shrink-0 font-bold">✦</span>
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Do not expect cash back against your donation</strong> to claim income tax benefits. Donations must be made transparently through banking channels to qualify for 80G deduction under the Income Tax Act.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-red-400 mt-0.5 flex-shrink-0 font-bold">✦</span>
                <p className="text-white/70 text-sm leading-relaxed">
                  Anyone approaching you claiming to represent Abhiara Foundation for cash collection is <strong className="text-white">not authorised</strong>. Please report such instances directly to us via LinkedIn.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== GOVERNANCE PROMISE (LIGHT) ===== */}
      <section className="py-20 md:py-28 section-light">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <AnimatedSection>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-4">GOVERNANCE PROMISE</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0A1628] mb-6">
              Trust the <span className="text-[#C9A84C]">Structure</span>, Not Just the Founder
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#C9A84C] to-[#1A7F8E] mx-auto mb-8" />
            <p className="text-[#0A1628]/70 text-base leading-relaxed max-w-xl mx-auto mb-8">
              As a Section 8 Company (registration pending), no property, asset, or income of Abhiara Foundation can be personally claimed — by the founder, family, or any individual. Your donation will be legally protected and mission-bound.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="text-[#0A1628]/40 font-mono text-[9px] tracking-wider uppercase">
              Abhiara Foundation · Section 8 Company (Registration Pending) · Not-for-Profit · Odisha · Pan India
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CTA (GOLD — matches all other pages) ===== */}
      <section className="py-16 md:py-20 bg-[#C9A84C]">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0A1628] mb-4">
              Every contribution builds the bridge.
            </h2>
            <p className="font-sans text-[14px] text-[#0A1628]/70 max-w-lg mx-auto mb-8">
              Whether you are a corporate, an individual, or an institution — your support creates real impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3 bg-[#0A1628] text-white font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#0A1628]/90 transition-colors flex items-center gap-2"
              >
                CONTACT US <ArrowRight size={12} />
              </Link>
              <Link
                href="/programs"
                className="px-8 py-3 border border-[#0A1628]/30 text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#0A1628]/10 transition-colors"
              >
                VIEW PROGRAMS
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
