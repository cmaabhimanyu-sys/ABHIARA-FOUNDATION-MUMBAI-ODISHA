import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
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
        url="https://abhiarafoundation.org/donate"
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

      {/* ===== 80G & REGISTRATION STATUS (DARK) ===== */}
      <section className="py-12 bg-[#080F1C]">
        <div className="container max-w-3xl">
          <AnimatedSection>
            <div className="border border-[#C9A84C]/30 rounded-sm p-6 md:p-8">
              <div className="text-center mb-6">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">REGISTRATION STATUS</p>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-white">
                  80G &amp; Tax Exemption — <span className="text-[#C9A84C]">In Process</span>
                </h3>
              </div>
              <p className="font-sans text-[14px] text-white/60 leading-relaxed text-center mb-6">
                Abhiara Foundation's 80G and 12A registration under the Income Tax Act, 1961 is currently in process. Once approved, donors will be eligible for tax deduction on their contributions. This page will be updated with certificate numbers upon approval.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: "Section 8", value: "Registration in Process", active: false },
                  { label: "CIN", value: "In Process", active: false },
                  { label: "80G", value: "In Process", active: false },
                  { label: "12A", value: "In Process", active: false },
                  { label: "FCRA", value: "In Process", active: false },
                  { label: "PAN", value: "In Process", active: false },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 bg-white/[0.03] border border-white/[0.08] rounded-sm">
                    <p className="font-mono text-[8px] tracking-[0.15em] uppercase text-white/40 mb-1">{item.label}</p>
                    <p className={`font-mono text-[10px] tracking-wider uppercase font-bold ${item.active ? "text-[#1A7F8E]" : "text-[#C9A84C]"}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-center text-white/30 text-[10px] font-mono tracking-wider mt-4">
                All registrations are in process. This section will be updated with CIN, 80G certificate number, and other details upon approval.
              </p>
            </div>
          </AnimatedSection>
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
            <div className="max-w-lg mx-auto mb-12">
              <ContactForm
                defaultPurpose="donation"
                pageSource="Donate Page"
                title="I Want to Donate"
                showPurpose={false}
                variant="light"
              />

              <div className="bg-white/5 border border-[#0A1628]/10 rounded-2xl p-6 text-center mt-6">
                <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-3">Bank Transfer Details</p>
                <p className="text-[#0A1628]/60 text-sm leading-relaxed">
                  Bank transfer details will be published once Section 8 registration and PAN are confirmed.
                  Please use the form above or email us at{" "}
                  <span className="text-[#C9A84C]">info@abhiarafoundation.org</span>{" "}
                  to arrange a donation in the interim.
                </p>
              </div>
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
                  Anyone approaching you claiming to represent Abhiara Foundation for cash collection is <strong className="text-white">not authorised</strong>. Please report such instances directly to us via LinkedIn or email at info@abhiarafoundation.org.
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
              As a Section 8 Company under the Companies Act, 2013, no property, asset, or income of Abhiara Foundation can be personally claimed — by the founder, family, or any individual. Your donation is legally protected and mission-bound.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="text-[#0A1628]/40 font-mono text-[9px] tracking-wider uppercase">
              Abhiara Foundation · Section 8 Company · Not-for-Profit · Companies Act 2013 · Odisha · Pan India
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
            <p className="text-[#0A1628]/50 text-sm text-center italic mb-4">
              Every contribution matters — from ₹500 to ₹50,00,000. No donation is too small when it reaches the right child.
            </p>
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
