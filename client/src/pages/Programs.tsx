/*
 * Abhiara Foundation — Programs V2.0
 * 5 Sections: Hero, Education, Elderly Care, CSR Impact, CTA
 * SDG badges, metrics cards, progress bars, glass-morphism
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { BookOpen, Heart, Handshake, GraduationCap, Users, Building2, ArrowRight, Target, Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const EDUCATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-children-gGByyfoUfKLuHnK73a4QT3.webp";
const ELDERLY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-8YsBCUCCz6K32KEwPWvjgq.webp";
const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/community-impact-JqLQdk8SYBsopiModUvtKZ.webp";

function TargetBar({ label, status, color }: { label: string; status: string; color: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      <span className="font-mono text-[9px] tracking-wider uppercase text-white/50">{label}</span>
      <span className="font-mono text-[9px] tracking-wider uppercase ml-auto" style={{ color }}>{status}</span>
    </div>
  );
}

export default function Programs() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Programs — Abhiara Foundation"
        description="Education for underprivileged children, elderly care and companion networks, and CSR implementation under Schedule VII. Three pillars, one promise."
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-children-gGByyfoUfKLuHnK73a4QT3.webp"
        url="https://abhiarafoundation.com/programs"
      />
      <Navbar />

      {/* ===== S1: HERO ===== */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0d1f38] to-[#0A1628]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#1A7F8E]/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#C9A84C]/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 container text-center pt-24 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-6"
          >
            WHAT WE DO
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="heading-xl text-white mb-4"
          >
            Our <span className="text-[#C9A84C]">Programs</span>
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
            Three pillars of impact — Education, Elderly Care, and CSR-led Community Impact. Rooted in Odisha, scalable across India.
          </motion.p>
        </div>
      </section>

      {/* ===== S2: EDUCATION ===== */}
      <section className="py-20 md:py-28 bg-[#080F1C]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden">
                  <img src={EDUCATION_IMG} alt="Education program" className="w-full h-auto" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 to-transparent" />
                  <span className="absolute top-3 right-3 font-mono text-[9px] tracking-wider uppercase bg-black/40 backdrop-blur-sm px-2 py-1 text-white/70 rounded-sm">
                    SDG 4
                  </span>
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-village-session_60ea6065.jpeg" alt="Abhiara Foundation education session with village children in Odisha" className="w-full h-auto" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/80 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-sm inline-block">
                      ON THE GROUND · VILLAGE EDUCATION SESSION
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
                  <BookOpen size={20} className="text-[#C9A84C]" />
                </div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]">
                  PILLAR ONE
                </p>
              </div>
              <h2 className="heading-lg text-white mb-6">Education</h2>
              <p className="font-sans text-[15px] text-white/60 leading-relaxed mb-6">
                Scholarships, digital learning centres, and study kits for poor and underprivileged students from tribal and rural families. We believe no child should be denied education because of geography or poverty. Covering all of Odisha and expanding across India.
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: GraduationCap, label: "500 Students", sub: "Year 1 Target" },
                  { icon: Building2, label: "3 Centres", sub: "Digital Learning" },
                  { icon: MapPin, label: "Pan India", sub: "Odisha & Beyond" },
                  { icon: Target, label: "₹12L", sub: "Scholarship Fund" },
                ].map((item) => (
                  <div key={item.label} className="glass-card-gold p-3">
                    <item.icon size={16} className="text-[#C9A84C] mb-1.5" />
                    <p className="font-sans text-sm font-semibold text-white">{item.label}</p>
                    <p className="font-mono text-[9px] tracking-wider text-white/40">{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* What We Provide */}
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-3">WHAT WE PROVIDE</p>
              <ul className="space-y-2 mb-6">
                {[
                  "Full and partial scholarships for poor and underprivileged Class 8–12 students",
                  "Digital learning centres with tablets and internet",
                  "Study kits — books, stationery, school bags",
                  "After-school tutoring and mentorship",
                  "Early childhood readiness programmes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-[14px] text-white/55">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Progress */}
              <TargetBar label="Scholarship Fund" status="Year 1 Target" color="#C9A84C" />
              <TargetBar label="Centre Setup" status="Planning Phase" color="#1A7F8E" />

              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors"
              >
                SUPPORT EDUCATION <ArrowRight size={12} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== S3: ELDERLY CARE ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection direction="left" className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#1A7F8E]/10 flex items-center justify-center">
                  <Heart size={20} className="text-[#1A7F8E]" />
                </div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E]">
                  PILLAR TWO
                </p>
              </div>
              <h2 className="heading-lg text-white mb-6">Elderly Care</h2>
              <p className="font-sans text-[15px] text-white/60 leading-relaxed mb-6">
                Companion networks, quarterly health camps, and wellness support for isolated senior citizens in rural and urban Odisha. Restoring dignity to those who built our communities.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: Users, label: "200 Elders", sub: "Year 1 Target" },
                  { icon: Calendar, label: "4 Camps", sub: "Quarterly Health" },
                  { icon: Heart, label: "Companion", sub: "Support Network" },
                  { icon: Target, label: "₹6L", sub: "Care Budget" },
                ].map((item) => (
                  <div key={item.label} className="glass-card-teal p-3">
                    <item.icon size={16} className="text-[#1A7F8E] mb-1.5" />
                    <p className="font-sans text-sm font-semibold text-white">{item.label}</p>
                    <p className="font-mono text-[9px] tracking-wider text-white/40">{item.sub}</p>
                  </div>
                ))}
              </div>

              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-3">WHAT WE PROVIDE</p>
              <ul className="space-y-2 mb-6">
                {[
                  "Regular companion visits and emotional support",
                  "Quarterly health camps with medical professionals",
                  "Wellness kits — medicines and nutrition",
                  "Legal aid for pension and property rights",
                  "Community engagement and social events",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-[14px] text-white/55">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A7F8E] mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <TargetBar label="Elder Enrolment" status="Year 1 Target" color="#1A7F8E" />
              <TargetBar label="Health Camp Planning" status="Quarterly" color="#C9A84C" />

              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 border border-[#1A7F8E]/50 text-[#1A7F8E] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#1A7F8E]/10 transition-colors"
              >
                SUPPORT ELDERLY CARE <ArrowRight size={12} />
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right" className="order-1 lg:order-2">
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden">
                  <img src={ELDERLY_IMG} alt="Elderly care program" className="w-full h-auto" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 to-transparent" />
                  <span className="absolute top-3 right-3 font-mono text-[9px] tracking-wider uppercase bg-black/40 backdrop-blur-sm px-2 py-1 text-white/70 rounded-sm">
                    SDG 3
                  </span>
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit_cbe9834b.jpeg" alt="Abhiara Foundation elderly care visit at Hope is Life Old Age Home" className="w-full h-auto" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                   <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/80 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-sm inline-block">
                       Abhiara Foundation's first elder care visit — Hope is Life Old Age Home, Puri, Odisha · February 2025
                     </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== S4: CSR IMPACT ===== */}
      <section className="py-20 md:py-28 bg-[#06101F]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative rounded-lg overflow-hidden">
                <img src={COMMUNITY_IMG} alt="CSR community impact" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 to-transparent" />
                <span className="absolute top-3 right-3 font-mono text-[9px] tracking-wider uppercase bg-black/40 backdrop-blur-sm px-2 py-1 text-white/70 rounded-sm">
                  SDG 10 + 11
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
                  <Handshake size={20} className="text-[#C9A84C]" />
                </div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]">
                  PILLAR THREE
                </p>
              </div>
              <h2 className="heading-lg text-white mb-6">CSR Implementation</h2>
              <p className="font-sans text-[15px] text-white/60 leading-relaxed mb-6">
                End-to-end CSR project implementation for corporates. Schedule VII compliant with monthly reporting, audited utilisation statements, and co-branded impact documentation.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: Handshake, label: "2 Projects", sub: "Year 1 Target" },
                  { icon: Target, label: "₹30L", sub: "Total Mobilised" },
                  { icon: Building2, label: "Schedule VII", sub: "Fully Compliant" },
                  { icon: Calendar, label: "Monthly", sub: "Impact Reports" },
                ].map((item) => (
                  <div key={item.label} className="glass-card-gold p-3">
                    <item.icon size={16} className="text-[#C9A84C] mb-1.5" />
                    <p className="font-sans text-sm font-semibold text-white">{item.label}</p>
                    <p className="font-mono text-[9px] tracking-wider text-white/40">{item.sub}</p>
                  </div>
                ))}
              </div>

              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-3">WHAT WE DELIVER</p>
              <ul className="space-y-2 mb-6">
                {[
                  "Project proposal with budget and timeline",
                  "Monthly progress reports with photo documentation",
                  "Quarterly audited utilisation statements",
                  "Annual impact report with beneficiary data",
                  "Co-branded CSR documentation for your annual report",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-[14px] text-white/55">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/csr-partners"
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors"
              >
                BECOME A CSR PARTNER <ArrowRight size={12} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== S5: CTA ===== */}
      <section className="py-16 md:py-20 bg-[#C9A84C]">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-serif font-bold text-[#0A1628] mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              Every programme begins with a conversation.
            </h2>
            <p className="font-sans text-[15px] text-[#0A1628]/70 max-w-xl mx-auto mb-8">
              Whether you want to sponsor a child, support an elder, or partner as a corporate — reach out to us.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0A1628] text-[#C9A84C] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#06101F] transition-colors"
            >
              CONTACT US <ArrowRight size={12} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
