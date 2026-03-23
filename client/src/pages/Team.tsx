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
import SEO from "@/components/SEO";

export default function Team() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Our Team — Abhiara Foundation"
        description="Meet the people behind Abhiara Foundation — Founder Abhimanyu Mallik, Legal Advisor Advocate Sujit Sahu, and the team building a fearless path."
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/founder-abhimanyu-mallik_cfb3b1d3.png"
        url="https://abhiarafoundation.com/team"
      />
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
      <section className="py-20 md:py-28 section-light">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">LEADERSHIP</p>
            <h2 className="heading-xl light-heading mb-4">
              Board of <span className="text-[#C9A84C]">Directors</span>
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] light-body max-w-lg mx-auto">
              Section 8 Company governance with CMA-led compliance and dual-director structure.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Abhimanyu Mallik */}
            <AnimatedSection delay={0}>
              <div className="light-card-gold p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#C9A84C]/30">
                    <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/founder-abhimanyu-mallik_cfb3b1d3.png" alt="Abhimanyu Mallik" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold light-heading">
                      Abhimanyu Mallik
                    </h3>
                    <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]">
                      Founder & Managing Director · CMA
                    </p>
                  </div>
                </div>

                <p className="font-sans text-[14px] light-body leading-relaxed mb-6">
                  Born in Raisar, Kendrapara, Odisha — Abhimanyu's journey from a farming family to leading finance for one of India's most ambitious technology companies is the origin story of Abhiara Foundation itself. A Cost and Management Accountant by qualification, he brings institutional rigour, financial discipline, and strategic clarity to every aspect of the foundation's governance, compliance, and long-term vision. He believes that systems change lives — and that the most powerful thing a person can do with success is build the bridge they once needed.
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    "CMA · Cost and Management Accountant",
                    "Section 8 Compliance Lead",
                    "MCA & IT Filings",
                    "Raisar, Odisha → Mumbai",
                  ].map((tag) => (
                    <span key={tag} className="font-mono text-[9px] tracking-wider uppercase bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C]/70 px-3 py-1 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Sujit Sahu */}
            <AnimatedSection delay={0.1}>
              <div className="light-card p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#1A7F8E]/30">
                    <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/advocate-sujit-sahu_c5e63d2b.png" alt="Advocate Sujit Sahu" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold light-heading">
                      Sujit Sahu
                    </h3>
                    <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#1A7F8E]">
                      Independent Director
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={14} className="text-[#C9A84C] shrink-0" />
                    <span className="font-mono text-[10px] tracking-wider uppercase light-muted">
                      LLB, MBA
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scale size={14} className="text-[#C9A84C] shrink-0" />
                    <span className="font-mono text-[10px] tracking-wider uppercase light-muted">
                      Advocate, High Court of Odisha
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-[#C9A84C] shrink-0" />
                    <span className="font-mono text-[10px] tracking-wider uppercase light-muted">
                      Odisha Human Rights Commission Office
                    </span>
                  </div>
                </div>

                <p className="font-sans text-[14px] light-body leading-relaxed">
                  A legal professional with deep expertise in constitutional law, human rights, and
                  corporate governance. Mr. Sahu brings independent oversight and legal counsel to
                  ensure the foundation operates with the highest standards of compliance and
                  accountability.
                </p>
              </div>
            </AnimatedSection>

            {/* Biswajita Mallik */}
            <AnimatedSection delay={0.2}>
              <div className="light-card p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#1A7F8E]/30">
                    <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/biswajita_founder_style_maroon_6bcbce2c.webp" alt="Biswajita Mallik" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold light-heading">
                      Biswajita Mallik
                    </h3>
                    <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#1A7F8E]">
                      Co-Founder &middot; Family & Community Pillar
                    </p>
                  </div>
                </div>

                <p className="font-sans text-[14px] light-body leading-relaxed mb-6">
                  The steady and unshakeable strength behind every chapter of the Abhiara journey. Biswajita's quiet conviction and unwavering support through every challenge is woven into the foundation's DNA.
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Co-Founder",
                    "Odisha",
                  ].map((tag) => (
                    <span key={tag} className="font-mono text-[9px] tracking-wider uppercase bg-[#1A7F8E]/10 border border-[#1A7F8E]/20 text-[#1A7F8E]/70 px-3 py-1 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== ADVISORY BOARD ===== */}
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
                initials: "SJ",
                name: "Sagar Jena",
                role: "Education Advisor",
                desc: "Founder of Ama Chatasali and rights activist. Mr. Jena brings grassroots advocacy experience and a deep commitment to educational equity and accountability in public institutions.",
                icon: GraduationCap,
                accent: "teal",
                announced: true,
                tagline: "Ama Chatasali · Rights Activist",
              },
              {
                initials: "BP",
                name: "Bharat Panigrahy",
                role: "CSR & Compliance Advisor",
                desc: "XLRI MBA with expertise in HR business partnering, governance, and strategic planning. Mr. Panigrahy brings corporate compliance rigour and institutional governance experience to Abhiara Foundation.",
                icon: Shield,
                accent: "gold",
                announced: true,
                tagline: "XLRI · HR Business Partner",
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
                  <h3 className={`font-serif text-lg font-bold mb-1 ${(advisor as any).announced ? 'text-white' : 'text-white/30'}`}>
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
                  {!(advisor as any).announced && (
                    <p className="font-mono text-[9px] tracking-wider uppercase text-white/25 mt-4">
                      Name to be announced
                    </p>
                  )}
                  {(advisor as any).announced && (advisor as any).tagline && (
                    <p className={`font-mono text-[9px] tracking-wider uppercase mt-4 ${
                      advisor.accent === "gold" ? "text-[#C9A84C]/60" : "text-[#1A7F8E]/60"
                    }`}>
                      {(advisor as any).tagline}
                    </p>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OPERATIONS ON THE GROUND ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">OPERATIONS</p>
            <h2 className="heading-xl text-white mb-4">
              On the <span className="text-[#C9A84C]">Ground</span>
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-lg mx-auto">
              The people who turn vision into action — on the ground, in the villages, every day.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Manoj Kumar Mallik */}
            <AnimatedSection delay={0}>
              <div className="glass-card-gold p-6 h-full text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center bg-[#C9A84C]/15">
                  <span className="font-serif text-2xl font-bold text-[#C9A84C]">MK</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-1">
                  Manoj Kumar Mallik
                </h3>
                <p className="font-mono text-[9px] tracking-[0.15em] uppercase mb-4 text-[#C9A84C]">
                  Operations &middot; On the Ground
                </p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <GraduationCap size={14} className="text-[#1A7F8E] shrink-0" />
                  <span className="font-mono text-[10px] tracking-wider uppercase text-white/50">
                    MBA in Finance
                  </span>
                </div>
                <p className="font-sans text-[13px] text-white/45 leading-relaxed">
                  The foundation's presence on the ground in Odisha. Manoj Kumar Mallik leads field operations — coordinating with local communities, overseeing programme delivery, and ensuring that every initiative reaches the people it was built for.
                </p>
                <p className="font-mono text-[9px] tracking-wider uppercase text-[#C9A84C]/60 mt-4">
                  MBA in Finance &middot; Field Operations &middot; Odisha
                </p>
              </div>
            </AnimatedSection>

            {/* Amit Kumar Jena */}
            <AnimatedSection delay={0.1}>
              <div className="glass-card p-6 h-full text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center bg-[#C9A84C]/10">
                  <Users size={24} className="text-[#C9A84C]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-1">
                  Amit Kumar Jena
                </h3>
                <p className="font-mono text-[9px] tracking-[0.15em] uppercase mb-4 text-[#C9A84C]">
                  Volunteer &middot; CSR Global Operation
                </p>
                <p className="font-sans text-[13px] text-white/45 leading-relaxed">
                  A committed volunteer and operations lead who supports Abhiara Foundation's on-ground activities, community coordination, and programme execution across global.
                </p>
                <p className="font-mono text-[9px] tracking-wider uppercase text-[#C9A84C]/60 mt-4">
                  Member &middot; Abhiara Foundation
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
                Future Trustee · By 2037
              </p>
              <div className="gradient-rule mx-auto mb-8" />

              <p className="font-sans text-[15px] text-white/60 leading-relaxed mb-6">
                Aradhana is the reason this foundation exists. Her name — ARA — means "ray of
                sacred light." When she turns 18, she will be offered the first right of
                appointment as Director of Abhiara Foundation, becoming its youngest trustee.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[
                  "Born 2019",
                  "Foundation Named After Her",
                  "AoA Succession Clause",
                  "Trustee at 18 · By 2037",
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

      {/* ===== GOVERNANCE ===== */}
      <section className="py-20 md:py-28 section-light">
        <div className="container max-w-4xl">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">INSTITUTIONAL GOVERNANCE</p>
            <h2 className="heading-xl light-heading mb-4">
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
                <div className="light-card p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold light-heading mb-2">
                        {item.title}
                      </h3>
                      <p className="font-sans text-[13px] light-body leading-relaxed">
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

      {/* ===== ARADHANA PROMISE ===== */}
      <section className="py-20 md:py-28 bg-[#C9A84C]/10 border-y border-[#C9A84C]/30">
        <div className="container max-w-3xl text-center">
          <AnimatedSection>
            <p
              className="font-serif font-bold text-white leading-[1.4]"
              style={{ fontSize: "clamp(22px, 2.8vw, 34px)" }}
            >
              By 2037, Aradhana Mallik — daughter of Abhimanyu and Biswajita — turns 18 and becomes the youngest trustee of Abhiara Foundation.
            </p>
            <p
              className="font-serif italic text-[#C9A84C] mt-6"
              style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
            >
              That is not a plan. That is a promise.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
