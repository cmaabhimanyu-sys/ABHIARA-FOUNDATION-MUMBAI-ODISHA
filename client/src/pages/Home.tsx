/*
 * Abhiara Foundation — Home Page
 * Design: "Dawn Breaking" — Light Emerging from Darkness
 * Deep navy hero transitioning to warm gold/teal sections
 * Atmospheric gradients, organic wave dividers, glowing accents
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, Heart, Handshake, ArrowRight, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import CounterAnimation from "@/components/CounterAnimation";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/hero-dawn-PUfjxrVLdG8a3bgPJiAovi.webp";
const EDUCATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-children-gGByyfoUfKLuHnK73a4QT3.webp";
const ELDERLY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-8YsBCUCCz6K32KEwPWvjgq.webp";
const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/community-impact-JqLQdk8SYBsopiModUvtKZ.webp";

const pillars = [
  {
    icon: BookOpen,
    title: "Education",
    description: "Scholarships, digital learning centres, and study kits for underprivileged students across tribal districts of Odisha.",
    stat: "500",
    statLabel: "Students Targeted",
    color: "text-gold",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/30",
    image: EDUCATION_IMG,
  },
  {
    icon: Heart,
    title: "Elderly Care",
    description: "Companion networks, quarterly health camps, and wellness support for isolated senior citizens in rural and urban Odisha.",
    stat: "200",
    statLabel: "Elders Supported",
    color: "text-teal",
    bgColor: "bg-teal/10",
    borderColor: "border-teal/30",
    image: ELDERLY_IMG,
  },
  {
    icon: Handshake,
    title: "CSR Impact",
    description: "End-to-end CSR project implementation for corporates. Schedule VII compliant with monthly reporting and co-branded impact documentation.",
    stat: "30L",
    statLabel: "Year 1 Target",
    color: "text-gold",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/30",
    image: COMMUNITY_IMG,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Dawn breaking over rural Odisha"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
        </div>

        {/* Glowing orb behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/8 blur-[120px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 container text-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-gold mb-6">
              Abhiara Foundation
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
          >
            Fearless Ray<br />
            <span className="text-gold">of Light</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-serif italic text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            "A small village in Odisha. A big city called Mumbai.<br className="hidden md:block" />
            And a promise — that the next child from the village has a path."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/csr-partners"
              className="px-8 py-3.5 bg-gold text-navy font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              Partner With Us
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border border-white/30 text-white font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-white/10 transition-all duration-300"
            >
              Donate Now
            </Link>
            <Link
              href="/our-story"
              className="px-8 py-3.5 text-teal-light font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:text-gold transition-colors duration-300 flex items-center gap-2"
            >
              Our Story <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={28} />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== MANIFESTO SECTION ===== */}
      <section className="relative bg-navy py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal/5 blur-[100px] pointer-events-none" />
        <div className="container">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-0.5 bg-gold mx-auto mb-8" />
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed italic mb-8">
              "Remote to Metro Mumbai was my journey. Abhiara Foundation is my promise — that the next child from the village has a path."
            </blockquote>
            <p className="font-sans text-sm tracking-widest uppercase text-gold">
              Abhimanyu Mallik &middot; Founder
            </p>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-8" />
          </AnimatedSection>
        </div>
      </section>

      {/* ===== THREE PILLARS SECTION ===== */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-navy via-[#0d1f38] to-[#0f2540]">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-teal mb-4">
              What We Do
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Three Pillars of <span className="text-gold">Impact</span>
            </h2>
            <p className="font-sans text-white/60 max-w-2xl mx-auto leading-relaxed">
              Rooted in Odisha, scalable across India — our work spans education, elderly care, and credible CSR-led community impact.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <AnimatedSection key={pillar.title} delay={i * 0.15}>
                <div className={`group relative rounded-lg overflow-hidden border ${pillar.borderColor} bg-white/5 backdrop-blur-sm hover:bg-white/8 transition-all duration-500 h-full`}>
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                    <div className={`absolute bottom-4 left-5 flex items-center gap-3`}>
                      <div className={`w-10 h-10 rounded-full ${pillar.bgColor} flex items-center justify-center`}>
                        <pillar.icon size={20} className={pillar.color} />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className={`font-serif text-3xl font-bold ${pillar.color}`}>
                          {pillar.stat}
                        </p>
                        <p className="font-sans text-xs text-white/40 uppercase tracking-wider">
                          {pillar.statLabel}
                        </p>
                      </div>
                      <Link
                        href="/programs"
                        className={`${pillar.color} hover:underline font-sans text-sm flex items-center gap-1 transition-colors`}
                      >
                        Learn More <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMPACT NUMBERS ===== */}
      <section className="relative py-20 md:py-24 bg-[#0f2540] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-teal/5 pointer-events-none" />
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { value: 500, suffix: "+", label: "Students Targeted", sub: "Year 1" },
              { value: 200, suffix: "+", label: "Elders Supported", sub: "Year 1" },
              { value: 3, suffix: "", label: "Digital Learning Centres", sub: "Odisha" },
              { value: 30, suffix: "L", label: "CSR Mobilised", sub: "Rs Target", prefix: "Rs " },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1} className="text-center">
                <p className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gold mb-2">
                  <CounterAnimation end={stat.value} suffix={stat.suffix} prefix={stat.prefix || ""} />
                </p>
                <p className="font-sans text-sm md:text-base text-white/80 font-medium">
                  {stat.label}
                </p>
                <p className="font-sans text-xs text-teal mt-1">
                  {stat.sub}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE NAME SECTION ===== */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#0f2540] to-[#102a48] overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection direction="left">
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-teal mb-4">
                The Name
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                <span className="text-gold">ABHI</span> + <span className="text-teal">ARA</span>
              </h2>
              <div className="space-y-4 text-white/70 font-sans leading-relaxed">
                <p>
                  <strong className="text-gold">ABHI</strong> — from Abhimanyu, the founder. Fearlessness. The courage it took to leave the village, to walk into the unknown, to build something from nothing.
                </p>
                <p>
                  <strong className="text-teal">ARA</strong> — from Aradhana, his daughter. A ray of sacred light. The devotion that illuminates every step forward.
                </p>
                <p className="text-white/90 font-medium">
                  Together: <span className="text-gold italic font-serif text-lg">Fearless Ray of Light.</span>
                </p>
              </div>
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 mt-8 font-sans text-sm font-bold tracking-wide uppercase text-gold hover:text-gold-light transition-colors"
              >
                Read the Full Story <ArrowRight size={16} />
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right" className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl shadow-navy/30">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/founder-journey-Xx6vnKWGMfZ6h3k4ufv5M9.webp"
                  alt="The journey from village to Mumbai"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              </div>
              <p className="text-center mt-4 font-sans text-xs text-white/40 italic">
                Village to Mumbai. And back — through purpose.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== FUTURE VISION ===== */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#102a48] to-cream overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-teal/5 blur-[100px] pointer-events-none" />
        <div className="container">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-teal mb-4">
              Year 5+ Vision
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Abhiara <span className="text-teal">Vidyapeeth</span>
            </h2>
            <p className="font-sans text-white/70 leading-relaxed mb-6">
              A full school in Koraput or Kalahandi district, Odisha. Free education for tribal children. Cross-subsidy fee model. CBSE or BSE Odisha affiliation. Residential option for remote students.
            </p>
            <p className="font-serif italic text-lg text-white/80 mb-8">
              "Where every child finds their path."
            </p>
            <div className="inline-block px-6 py-3 border border-teal/30 rounded-sm bg-teal/10">
              <p className="font-sans text-sm text-teal-light">
                When Aradhana turns 18 — she becomes the youngest trustee.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-20 md:py-28 bg-navy overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/6 blur-[120px] pointer-events-none" />
        </div>
        {/* Wave divider at top */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 md:h-16" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#0A1628" />
          </svg>
        </div>

        <div className="relative container text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Every Ray of Light <span className="text-gold">Counts</span>
            </h2>
            <p className="font-sans text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
              Whether you are a corporate CSR partner, an individual donor, or someone who believes that geography should not be destiny — there is a place for you in this journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/csr-partners"
                className="px-8 py-3.5 bg-gold text-navy font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
              >
                CSR Partnership
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 border border-teal/50 text-teal-light font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-teal/10 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
