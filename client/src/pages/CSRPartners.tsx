/*
 * Abhiara Foundation — CSR Partners Page
 * Design: "Dawn Breaking" — Institutional credibility with warm gold accents
 * Schedule VII alignment, credentials, partnership model
 */
import { Link } from "wouter";
import { Shield, FileCheck, BarChart3, Users, CheckCircle2, ArrowRight, Building2, Award, Briefcase, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function CSRPartners() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0d1f38] to-navy" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 container text-center pt-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-4"
          >
            CSR Partnership
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
          >
            Your CSR Spend —<br />
            <span className="text-gold">Accountable &amp; Impactful</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-sans text-lg text-white/60 max-w-2xl mx-auto"
          >
            We are not asking for charity. We offer a CSR delivery engine — compliant, credible, accountable.
          </motion.p>
        </div>
      </section>

      {/* Why Trust Abhiara */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-navy to-[#0d1f38]">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-teal mb-4">
              Credentials
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Trust <span className="text-gold">Abhiara</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Section 8 Company",
                description: "Limited by Guarantee under Companies Act, 2013. No profit distribution. Institutional governance.",
                color: "text-gold",
                bg: "bg-gold/10",
                border: "border-gold/20",
              },
              {
                icon: FileCheck,
                title: "12A + 80G Registered",
                description: "Income tax exemptions for the foundation and tax benefits for donors. Fully compliant.",
                color: "text-teal",
                bg: "bg-teal/10",
                border: "border-teal/20",
              },
              {
                icon: Award,
                title: "Qualified Founder",
                description: "Abhimanyu Mallik brings professional financial expertise. All filings self-managed.",
                color: "text-gold",
                bg: "bg-gold/10",
                border: "border-gold/20",
              },
              {
                icon: BarChart3,
                title: "Monthly Reporting",
                description: "Transparent impact reports with site visits, co-branded documentation, and social media recognition.",
                color: "text-teal",
                bg: "bg-teal/10",
                border: "border-teal/20",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className={`p-6 rounded-lg border ${item.border} bg-white/5 backdrop-blur-sm h-full hover:bg-white/8 transition-colors`}>
                  <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center mb-4`}>
                    <item.icon size={22} className={item.color} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="font-sans text-sm text-white/60 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule VII Alignment */}
      <section className="py-20 md:py-28 bg-[#0d1f38]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <AnimatedSection direction="left">
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-4">
                Compliance
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
                Schedule VII <span className="text-teal">Alignment</span>
              </h2>
              <p className="font-sans text-white/70 leading-relaxed mb-8">
                Every programme at Abhiara Foundation is mapped to Schedule VII of the Companies Act, 2013. This ensures your CSR spend is fully compliant and eligible for reporting.
              </p>

              <div className="space-y-4">
                {[
                  { clause: "Clause (i)", desc: "Eradicating hunger, poverty — promoting education", program: "Education Pillar" },
                  { clause: "Clause (ii)", desc: "Promoting healthcare including preventive healthcare", program: "Elderly Care Pillar" },
                  { clause: "Clause (x)", desc: "Rural development projects", program: "All Pillars" },
                  { clause: "Clause (xi)", desc: "Slum area development", program: "Community Impact" },
                ].map((item) => (
                  <div key={item.clause} className="flex items-start gap-4 p-4 bg-white/5 border border-gold/10 rounded-lg">
                    <CheckCircle2 size={18} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-sm font-bold text-white">{item.clause}: <span className="font-normal text-white/70">{item.desc}</span></p>
                      <p className="font-sans text-xs text-teal mt-1">Mapped to: {item.program}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-teal mb-4">
                Partnership Model
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
                How We <span className="text-gold">Work Together</span>
              </h2>

              <div className="space-y-6">
                {[
                  { step: "01", title: "Discovery Meeting", desc: "We understand your CSR goals, budget, and preferred focus areas." },
                  { step: "02", title: "Project Design", desc: "We design a custom CSR project aligned with Schedule VII and your brand." },
                  { step: "03", title: "Implementation", desc: "On-ground execution with local teams, regular site visits, and photo documentation." },
                  { step: "04", title: "Monthly Reports", desc: "Detailed impact reports with metrics, photos, beneficiary stories, and compliance documentation." },
                  { step: "05", title: "Co-Branded Impact", desc: "Social media recognition, co-branded reports, and annual impact documentation for your stakeholders." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-5">
                    <span className="font-serif text-3xl font-bold text-gold/30 shrink-0 leading-none">{item.step}</span>
                    <div>
                      <h4 className="font-sans text-sm font-bold text-white mb-1">{item.title}</h4>
                      <p className="font-sans text-sm text-white/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Ask */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#0d1f38] to-[#0f2540] overflow-hidden">
        <div className="container">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-0.5 bg-gold mx-auto mb-8" />
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-teal mb-6">The Ask</p>
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed italic mb-8">
              "We are not asking for charity. We offer a CSR delivery engine — compliant, credible, accountable."
            </blockquote>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-8" />
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="max-w-3xl mx-auto">
            <div className="p-8 bg-white/5 border border-gold/20 rounded-lg">
              <h3 className="font-serif text-2xl font-bold text-white mb-6 text-center">
                Year 1 CSR Ask: <span className="text-gold">Rs 30,00,000</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Briefcase, label: "Education", amount: "Rs 12L (40%)" },
                  { icon: Building2, label: "Digital Centres", amount: "Rs 9L (30%)" },
                  { icon: Users, label: "Elderly Care", amount: "Rs 6L (20%)" },
                  { icon: FileText, label: "Operations", amount: "Rs 3L (10%)" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <item.icon size={18} className="text-gold shrink-0" />
                    <div>
                      <p className="font-sans text-sm font-bold text-white">{item.label}</p>
                      <p className="font-sans text-xs text-white/50">{item.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Target Companies */}
      <section className="py-16 md:py-20 bg-[#0f2540]">
        <div className="container">
          <AnimatedSection className="text-center mb-10">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-teal mb-4">Target Partners</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              CSR Leaders in <span className="text-gold">Odisha</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {["NALCO", "ONGC", "Tata Steel", "Coal India"].map((company) => (
                <div key={company} className="px-8 py-4 border border-white/10 rounded-lg bg-white/5">
                  <p className="font-sans text-lg font-bold text-white/60 tracking-wider">{company}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#0f2540] to-cream overflow-hidden">
        <div className="container text-center">
          <AnimatedSection>
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-white/90 italic max-w-3xl mx-auto mb-8 leading-relaxed">
              "When you partner with us, you are not writing a cheque. You are lighting a ray of hope in a child's eye."
            </blockquote>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-gold text-navy font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-gold-light transition-colors"
              >
                Book a Meeting <ArrowRight size={14} className="inline ml-2" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 border border-teal/50 text-teal font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-teal/10 transition-colors"
              >
                Download CSR Deck
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
