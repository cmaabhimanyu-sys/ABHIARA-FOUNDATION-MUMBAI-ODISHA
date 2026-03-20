/*
 * Abhiara Foundation — Our Story Page
 * Design: "Dawn Breaking" — Narrative-driven editorial layout
 * The founding story told as an emotional journey
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { useEffect } from "react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/founder-journey-Xx6vnKWGMfZ6h3k4ufv5M9.webp";

export default function OurStory() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="The journey from village to Mumbai" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/95" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold/6 blur-[100px] pointer-events-none" />

        <div className="relative z-10 container text-center pt-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xs tracking-[0.4em] uppercase text-teal mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
          >
            Where Fearlessness<br />
            Meets <span className="text-gold">Light</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-serif italic text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
          >
            The official founding narrative of Abhiara Foundation
          </motion.p>
        </div>
      </section>

      {/* The Name */}
      <section className="py-20 md:py-28 bg-navy">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-teal mb-4">
                The Name
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-8">
                <span className="text-gold">ABHI</span> + <span className="text-teal">ARA</span> = Fearless Ray of Light
              </h2>
              <div className="space-y-6 font-sans text-white/70 leading-relaxed text-lg">
                <p>
                  Abhiara Foundation takes its name from two people who define its purpose.
                </p>
                <p>
                  <strong className="text-gold font-bold">ABHI</strong> — from Abhimanyu, the founder. Fearlessness. The courage it took to leave the village, to walk into the unknown, to build something from nothing in a city that does not wait for anyone.
                </p>
                <p>
                  <strong className="text-teal font-bold">ARA</strong> — from Aradhana, his daughter. A ray of sacred light. The devotion that illuminates every step forward, the reason this foundation exists.
                </p>
                <p className="text-white/90 font-medium text-xl font-serif italic border-l-2 border-gold pl-6">
                  Together: Fearless Ray of Light.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-navy to-[#0d1f38]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-4">
                The Story
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-10">
                From a Village in Odisha
              </h2>
            </AnimatedSection>

            <div className="space-y-8 font-sans text-white/70 leading-relaxed text-lg">
              <AnimatedSection delay={0.1}>
                <p>
                  Abhimanyu Mallik grew up in a small village in Odisha. No metro connections. No established network. No roadmap. Just a mother who believed education was everything, and a dream that refused to go quiet.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p>
                  He packed that dream and came to Mumbai. The city tested him, humbled him, and ultimately shaped him. He made it.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <p>
                  But that journey left him with a question that would not go away: <em className="text-white/90">what about the children still in that village?</em> The ones who are just as capable, just as curious — but who have no scholarship, no mentor, no one to show them the road exists.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <p>
                  And what about the elders in remote Odisha — whose children moved to cities and never came back enough. Sitting alone. No care. No warmth. No dignity.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.5}>
                <p className="text-white/90 font-medium text-xl">
                  In 2025, Abhimanyu stopped just thinking and started building.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.6}>
                <p>
                  He named the foundation after two people who define his purpose. <strong className="text-gold">ABHI</strong> — from his own name, Abhimanyu — the fearlessness it took to leave the village. <strong className="text-teal">ARA</strong> — from his daughter Aradhana's name — the ray of sacred light he wants to carry back.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.7}>
                <div className="my-12 p-8 bg-white/5 border border-gold/20 rounded-lg">
                  <p className="font-serif italic text-xl md:text-2xl text-white/90 text-center leading-relaxed">
                    "Aradhana does not yet fully understand what this means. But one day she will read about it. And when she does, her father wants her to know that her name — her light — was the reason this foundation exists."
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* The Mission */}
      <section className="py-20 md:py-28 bg-[#0d1f38]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-teal mb-4">
                Our Mission
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-8">
                Breaking the Cycle
              </h2>
              <p className="font-sans text-white/70 leading-relaxed text-lg mb-10">
                To break the cycle of disadvantage for underprivileged children and the elderly through education, care, and credible CSR-led community impact — rooted in Odisha, scalable across India and globally.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-4">
                Our Vision
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-8">
                Where Geography Is Not Destiny
              </h2>
              <p className="font-sans text-white/70 leading-relaxed text-lg">
                A future where every child from every village has a path — and every elder who helped build that future is cared for with dignity. Where geography is not destiny.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Promise */}
      <section className="py-20 md:py-28 bg-[#0d1f38] overflow-hidden">
        <div className="container">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-0.5 bg-gold mx-auto mb-8" />
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-teal mb-6">
              The Promise
            </p>
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight mb-8">
              "Remote to Metro Mumbai was my journey. Abhiara Foundation is my promise — that the next child from the village has a path."
            </blockquote>
            <p className="font-sans text-sm tracking-widest uppercase text-gold">
              Abhimanyu Mallik &middot; Founder &middot; CMA
            </p>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-8" />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-[#0d1f38] to-cream">
        <div className="container text-center">
          <AnimatedSection>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">
              Join Our Mission
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/programs"
                className="px-8 py-3.5 bg-teal text-white font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-teal-dark transition-colors"
              >
                View Programs <ArrowRight size={16} className="inline ml-2" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-gold text-navy font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-gold-light transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
