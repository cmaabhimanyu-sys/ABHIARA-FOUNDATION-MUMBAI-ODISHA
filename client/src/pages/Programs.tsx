/*
 * Abhiara Foundation — Programs Page
 * Design: "Dawn Breaking" — Warm, hopeful sections for each pillar
 * Education, Elderly Care, CSR Impact with detailed program info
 */
import { Link } from "wouter";
import { BookOpen, Heart, Handshake, GraduationCap, Users, Building2, ArrowRight, Target, Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { useEffect } from "react";

const EDUCATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-children-gGByyfoUfKLuHnK73a4QT3.webp";
const ELDERLY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-8YsBCUCCz6K32KEwPWvjgq.webp";
const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/community-impact-JqLQdk8SYBsopiModUvtKZ.webp";

export default function Programs() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0d1f38] to-navy" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-teal/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 container text-center pt-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xs tracking-[0.4em] uppercase text-teal mb-4"
          >
            What We Do
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
          >
            Our <span className="text-gold">Programs</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-sans text-lg text-white/60 max-w-2xl mx-auto"
          >
            Three pillars of impact — Education, Elderly Care, and CSR-led Community Impact. Rooted in Odisha, scalable across India.
          </motion.p>
        </div>
      </section>

      {/* ===== EDUCATION PILLAR ===== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-navy to-[#0d1f38]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img src={EDUCATION_IMG} alt="Education program" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <BookOpen size={20} className="text-gold" />
                </div>
                <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold">
                  Pillar One &middot; SDG 4
                </p>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
                Education
              </h2>
              <p className="font-sans text-white/70 leading-relaxed mb-8">
                Scholarships, digital learning centres, and study kits for underprivileged students. Focus: tribal districts of Odisha — Koraput, Kalahandi, and Rayagada.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: GraduationCap, label: "500 Students", sub: "Year 1 Target" },
                  { icon: Building2, label: "3 Centres", sub: "Digital Learning" },
                  { icon: MapPin, label: "Tribal Odisha", sub: "Koraput · Kalahandi" },
                  { icon: Target, label: "Rs 12L", sub: "Scholarship Fund" },
                ].map((item) => (
                  <div key={item.label} className="p-4 bg-white/5 border border-gold/15 rounded-lg">
                    <item.icon size={18} className="text-gold mb-2" />
                    <p className="font-sans text-sm font-bold text-white">{item.label}</p>
                    <p className="font-sans text-xs text-white/50">{item.sub}</p>
                  </div>
                ))}
              </div>

              <h4 className="font-sans text-sm font-bold text-gold uppercase tracking-wider mb-3">What We Provide</h4>
              <ul className="space-y-2 mb-6">
                {[
                  "Full and partial scholarships for underprivileged students",
                  "Digital learning centres with tablets and internet access",
                  "Study kits including books, stationery, and school bags",
                  "After-school tutoring and mentorship programs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-gold-light transition-colors"
              >
                Sponsor a Child <ArrowRight size={14} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== ELDERLY CARE PILLAR ===== */}
      <section className="py-20 md:py-28 bg-[#0d1f38]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection direction="left" className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                  <Heart size={20} className="text-teal" />
                </div>
                <p className="font-sans text-xs tracking-[0.4em] uppercase text-teal">
                  Pillar Two &middot; SDG 3
                </p>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
                Elderly Care
              </h2>
              <p className="font-sans text-white/70 leading-relaxed mb-8">
                Companion networks, quarterly health camps, and wellness support for isolated senior citizens in rural and urban Odisha. Restoring dignity to those who built our communities.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Users, label: "200 Elders", sub: "Year 1 Target" },
                  { icon: Calendar, label: "4 Camps", sub: "Quarterly Health" },
                  { icon: Heart, label: "Companion", sub: "Support Network" },
                  { icon: Target, label: "Rs 6L", sub: "Care Budget" },
                ].map((item) => (
                  <div key={item.label} className="p-4 bg-white/5 border border-teal/15 rounded-lg">
                    <item.icon size={18} className="text-teal mb-2" />
                    <p className="font-sans text-sm font-bold text-white">{item.label}</p>
                    <p className="font-sans text-xs text-white/50">{item.sub}</p>
                  </div>
                ))}
              </div>

              <h4 className="font-sans text-sm font-bold text-teal uppercase tracking-wider mb-3">What We Provide</h4>
              <ul className="space-y-2 mb-6">
                {[
                  "Regular companion visits and emotional support",
                  "Quarterly health camps with medical professionals",
                  "Wellness kits with essential medicines and nutrition",
                  "Community engagement activities and social events",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-teal-dark transition-colors"
              >
                Support an Elder <ArrowRight size={14} />
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right" className="order-1 lg:order-2">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img src={ELDERLY_IMG} alt="Elderly care program" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== CSR IMPACT PILLAR ===== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#0d1f38] to-[#0f2540]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img src={COMMUNITY_IMG} alt="CSR community impact" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Handshake size={20} className="text-gold" />
                </div>
                <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold">
                  Pillar Three &middot; SDG 10, 11, 17
                </p>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
                CSR Impact
              </h2>
              <p className="font-sans text-white/70 leading-relaxed mb-8">
                End-to-end CSR project implementation for corporates. Schedule VII compliant. Monthly reporting. Co-branded impact documentation. Your CSR spend — accountable and impactful.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Handshake, label: "2 Projects", sub: "Year 1 Target" },
                  { icon: Target, label: "Rs 30L", sub: "Total Mobilised" },
                  { icon: Building2, label: "Schedule VII", sub: "Fully Compliant" },
                  { icon: Calendar, label: "Monthly", sub: "Impact Reports" },
                ].map((item) => (
                  <div key={item.label} className="p-4 bg-white/5 border border-gold/15 rounded-lg">
                    <item.icon size={18} className="text-gold mb-2" />
                    <p className="font-sans text-sm font-bold text-white">{item.label}</p>
                    <p className="font-sans text-xs text-white/50">{item.sub}</p>
                  </div>
                ))}
              </div>

              <h4 className="font-sans text-sm font-bold text-gold uppercase tracking-wider mb-3">What We Offer</h4>
              <ul className="space-y-2 mb-6">
                {[
                  "Complete CSR project design and implementation",
                  "Schedule VII compliance and documentation",
                  "Monthly progress reports with impact metrics",
                  "Co-branded impact documentation and social media recognition",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/csr-partners"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-gold-light transition-colors"
              >
                CSR Partnership <ArrowRight size={14} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Budget Overview */}
      <section className="py-20 md:py-24 bg-[#0f2540]">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-teal mb-4">Year 1 Budget</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
              Rs 30,00,000 — <span className="text-gold">Transparent Allocation</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="max-w-2xl mx-auto space-y-6">
              {[
                { label: "Scholarship + Learning Materials", amount: "Rs 12,00,000", pct: 40, color: "bg-gold" },
                { label: "3 Digital Learning Centres", amount: "Rs 9,00,000", pct: 30, color: "bg-teal" },
                { label: "Elder Care Network + Health Camps", amount: "Rs 6,00,000", pct: 20, color: "bg-gold-dark" },
                { label: "Operations + Compliance + Reporting", amount: "Rs 3,00,000", pct: 10, color: "bg-teal-dark" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-end mb-2">
                    <p className="font-sans text-sm text-white/80">{item.label}</p>
                    <p className="font-sans text-sm font-bold text-white">{item.amount} ({item.pct}%)</p>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-[#0f2540] to-cream">
        <div className="container text-center">
          <AnimatedSection>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">
              Be Part of the Change
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-gold text-navy font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-gold-light transition-colors"
              >
                Donate Now
              </Link>
              <Link
                href="/csr-partners"
                className="px-8 py-3.5 border border-teal/50 text-teal font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-teal/10 transition-colors"
              >
                CSR Partnership
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
