/*
 * Abhiara Foundation — Team Page
 * Board of Directors, Advisory Board, and Future Leadership
 */
import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Shield,
  GraduationCap,
  Briefcase,
  Heart,
  Star,
  Users,
  Scale,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

export default function Team() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#06101F] to-[#0A1628]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 container text-center">
          <AnimatedSection>
            <p className="section-label mb-4">THE PEOPLE BEHIND THE PURPOSE</p>
            <h1
              className="font-serif font-bold text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              Our <span className="text-[#C9A84C]">Team</span>
            </h1>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-2xl mx-auto leading-relaxed">
              Abhiara Foundation is led by professionals who believe that geography should not be
              destiny. Our governance is structured for perpetual succession, institutional
              credibility, and transparent accountability.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== BOARD OF DIRECTORS ===== */}
      <section className="py-20 md:py-28 bg-[#080F1C]">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">LEADERSHIP</p>
            <h2 className="heading-xl text-white mb-4">
              Board of <span className="text-[#C9A84C]">Directors</span>
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-lg mx-auto">
              Section 8 Company governance with CMA-led compliance and dual-director structure.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Abhimanyu Mallik */}
            <AnimatedSection delay={0}>
              <div className="glass-card-gold p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#C9A84C]/15 flex items-center justify-center shrink-0">
                    <span className="font-serif text-2xl font-bold text-[#C9A84C]">AM</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">
                      Abhimanyu Mallik
                    </h3>
                    <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]">
                      Founder & Managing Director
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={14} className="text-[#1A7F8E] shrink-0" />
                    <span className="font-mono text-[10px] tracking-wider uppercase text-white/50">
                      CMA (Cost & Management Accountant)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-[#1A7F8E] shrink-0" />
                    <span className="font-mono text-[10px] tracking-wider uppercase text-white/50">
                      Self-manages all MCA & IT filings
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scale size={14} className="text-[#1A7F8E] shrink-0" />
                    <span className="font-mono text-[10px] tracking-wider uppercase text-white/50">
                      Section 8 Compliance Lead
                    </span>
                  </div>
                </div>

                <p className="font-sans text-[14px] text-white/55 leading-relaxed">
                  From a small village in Odisha to professional life in Mumbai — Abhimanyu's
                  journey is the foundation's origin story. As a CMA-qualified professional, he
                  brings institutional rigour to every aspect of governance, compliance, and
                  financial accountability.
                </p>
              </div>
            </AnimatedSection>

            {/* Biswajita Mallik */}
            <AnimatedSection delay={0.1}>
              <div className="glass-card p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#1A7F8E]/15 flex items-center justify-center shrink-0">
                    <span className="font-serif text-2xl font-bold text-[#1A7F8E]">BM</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">
                      Biswajita Mallik
                    </h3>
                    <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#1A7F8E]">
                      Co-Director
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-[#C9A84C] shrink-0" />
                    <span className="font-mono text-[10px] tracking-wider uppercase text-white/50">
                      Dual-Director Governance
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-[#C9A84C] shrink-0" />
                    <span className="font-mono text-[10px] tracking-wider uppercase text-white/50">
                      Succession Layer — Continuity Assurance
                    </span>
                  </div>
                </div>

                <p className="font-sans text-[14px] text-white/55 leading-relaxed">
                  Appointed as Co-Director at incorporation to ensure the foundation never
                  becomes headless. Biswajita is integral to the dual-signature mandate and
                  governance continuity of Abhiara Foundation.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== FUTURE LEADERSHIP ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container max-w-3xl">
          <AnimatedSection>
            <div className="glass-card-gold p-8 md:p-12 text-center">
              <p className="section-label mb-4">FUTURE LEADERSHIP</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                Aradhana Mallik
              </h2>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#C9A84C] mb-6">
                Future Trustee · By 2039
              </p>
              <div className="gradient-rule mx-auto mb-8" />

              <p className="font-sans text-[15px] text-white/60 leading-relaxed mb-6">
                Aradhana is the reason this foundation exists. Her name — ARA — means "ray of
                sacred light." When she turns 18, she will be offered the first right of
                appointment as Director of Abhiara Foundation, becoming its youngest trustee.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[
                  "Born 2021",
                  "Foundation Named After Her",
                  "AoA Succession Clause",
                  "Trustee at 18 · By 2039",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] tracking-wider uppercase text-white/50 px-3 py-1.5 border border-[#C9A84C]/20 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="font-serif text-lg italic text-[#C9A84C]">
                "Where a father's courage meets a daughter's devotion."
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== ADVISORY BOARD (Placeholders) ===== */}
      <section className="py-20 md:py-28 bg-[#06101F]">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">ADVISORY BOARD</p>
            <h2 className="heading-xl text-white mb-4">
              Advisors & <span className="text-[#C9A84C]">Mentors</span>
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-lg mx-auto">
              Industry professionals and domain experts who guide our programmes, compliance, and
              growth strategy.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                initials: "—",
                name: "Advisory Member",
                role: "Education Advisor",
                desc: "Guiding our education programmes, scholarship design, and Abhiara Vidyapeeth school vision.",
                icon: GraduationCap,
                accent: "teal",
              },
              {
                initials: "—",
                name: "Advisory Member",
                role: "CSR & Compliance Advisor",
                desc: "Supporting Schedule VII compliance, CSR partner engagement, and institutional governance.",
                icon: Shield,
                accent: "gold",
              },
              {
                initials: "—",
                name: "Advisory Member",
                role: "Community & Welfare Advisor",
                desc: "Advising on elderly care programmes, community outreach, and grassroots impact measurement.",
                icon: Heart,
                accent: "teal",
              },
            ].map((advisor, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="glass-card p-6 h-full text-center">
                  <div
                    className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      advisor.accent === "gold"
                        ? "bg-[#C9A84C]/10"
                        : "bg-[#1A7F8E]/10"
                    }`}
                  >
                    <advisor.icon
                      size={24}
                      className={
                        advisor.accent === "gold"
                          ? "text-[#C9A84C]"
                          : "text-[#1A7F8E]"
                      }
                    />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white/30 mb-1">
                    {advisor.name}
                  </h3>
                  <p
                    className={`font-mono text-[9px] tracking-[0.15em] uppercase mb-4 ${
                      advisor.accent === "gold"
                        ? "text-[#C9A84C]"
                        : "text-[#1A7F8E]"
                    }`}
                  >
                    {advisor.role}
                  </p>
                  <p className="font-sans text-[13px] text-white/45 leading-relaxed">
                    {advisor.desc}
                  </p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/25 mt-4">
                    Name to be announced
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GOVERNANCE ===== */}
      <section className="py-20 md:py-28 bg-[#080F1C]">
        <div className="container max-w-4xl">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">INSTITUTIONAL GOVERNANCE</p>
            <h2 className="heading-xl text-white mb-4">
              Built for <span className="text-[#C9A84C]">Perpetuity</span>
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Shield,
                title: "Section 8 Company",
                desc: "Limited by Guarantee, without share capital. Governed under Companies Act 2013 — the highest standard of NGO credibility in India.",
              },
              {
                icon: Users,
                title: "Dual-Director Structure",
                desc: "Two directors at all times. Dual-signature mandate for transactions above Rs 25,000. Foundation never becomes headless.",
              },
              {
                icon: Scale,
                title: "CMA-Led Compliance",
                desc: "All MCA filings, IT returns, 12A/80G renewals, and statutory audits managed by CMA-qualified founder. Only external cost: statutory audit fee.",
              },
              {
                icon: Star,
                title: "Four-Layer Succession",
                desc: "Dual directors, AoA succession clause, personal will directive, and Aradhana clause — ensuring the foundation outlives any individual.",
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="glass-card p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="font-sans text-[13px] text-white/55 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-20 bg-[#C9A84C]">
        <div className="container text-center">
          <AnimatedSection>
            <h2
              className="font-serif font-bold text-[#0A1628] mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Want to join our mission?
            </h2>
            <p className="font-sans text-[15px] text-[#0A1628]/70 max-w-2xl mx-auto leading-relaxed mb-8">
              We are always looking for passionate individuals — volunteers, advisors, and CSR
              partners — who believe that geography should not be destiny.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0A1628] text-[#C9A84C] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#06101F] transition-colors"
            >
              GET IN TOUCH <ArrowRight size={12} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
