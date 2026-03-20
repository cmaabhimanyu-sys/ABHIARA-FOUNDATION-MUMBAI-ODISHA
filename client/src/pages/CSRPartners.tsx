/*
 * Abhiara Foundation — CSR Partners V2.0
 * 7 Sections: Hero, Why Partner, Budget Transparency, Schedule VII,
 * Target Companies, Transparency Pledge, CTA
 */
import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight, Shield, FileText, BarChart3, Building2,
  CheckCircle2, Eye, Clock, Users, Briefcase, Award, FileCheck, Download
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

function BudgetBar({ label, amount, pct, color }: { label: string; amount: string; pct: number; color: string }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="font-sans text-[13px] text-white/70">{label}</span>
        <span className="font-mono text-[11px] text-white/50">{amount}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

export default function CSRPartners() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Navbar />

      {/* ===== S1: HERO ===== */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0d1f38] to-[#0A1628]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-[#C9A84C]/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 container text-center pt-24 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-6"
          >
            CSR PARTNERSHIP
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="heading-xl text-white mb-4"
          >
            Your CSR. <span className="text-[#C9A84C]">Our Ground.</span>
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
            End-to-end CSR implementation. Schedule VII compliant. Monthly reporting. Audited utilisation. Real impact — documented, verified, and co-branded.
          </motion.p>
        </div>
      </section>

      {/* ===== S2: WHY PARTNER WITH US ===== */}
      <section className="py-20 md:py-28 bg-[#080F1C]">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">WHY ABHIARA</p>
            <h2 className="heading-lg text-white mb-4">
              Why Partner <span className="text-[#C9A84C]">With Us</span>
            </h2>
            <div className="gradient-rule mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Section 8 Company", desc: "Registered under Companies Act 2013. Limited by Guarantee. CIN in progress." },
              { icon: FileCheck, title: "Schedule VII Aligned", desc: "All programmes map directly to Schedule VII categories for CSR compliance." },
              { icon: BarChart3, title: "Monthly Reports", desc: "Detailed progress reports with photo documentation and beneficiary data." },
              { icon: Eye, title: "Full Transparency", desc: "Audited utilisation statements. Open books. No hidden costs." },
              { icon: Award, title: "CMA-Led Finance", desc: "Founder is a qualified Cost & Management Accountant. Finance-first governance." },
              { icon: Users, title: "Ground Presence", desc: "Direct operations across all of Odisha and expanding to other states across India." },
            ].map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.08}>
                <div className="glass-card p-6 h-full">
                  <div className="w-10 h-10 mb-4 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
                    <card.icon size={20} className="text-[#C9A84C]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="font-sans text-[13px] text-white/50 leading-relaxed">{card.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== S3: BUDGET TRANSPARENCY ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <AnimatedSection direction="left">
              <p className="section-label mb-4">BUDGET TRANSPARENCY</p>
              <h2 className="heading-lg text-white mb-4">
                Year 1 Budget: <span className="text-[#C9A84C]">₹30,00,000</span>
              </h2>
              <div className="gradient-rule mb-8" />
              <p className="font-sans text-[15px] text-white/60 leading-relaxed mb-8">
                Every rupee is accounted for. Our budget is public, audited, and available for review by any CSR partner.
              </p>

              <BudgetBar label="Education Programme" amount="₹12,00,000" pct={40} color="#C9A84C" />
              <BudgetBar label="Elderly Care Programme" amount="₹6,00,000" pct={20} color="#1A7F8E" />
              <BudgetBar label="Operations & Admin" amount="₹4,50,000" pct={15} color="#C9A84C" />
              <BudgetBar label="Vidyapeeth Corpus" amount="₹4,50,000" pct={15} color="#1A7F8E" />
              <BudgetBar label="Emergency & Contingency" amount="₹3,00,000" pct={10} color="#C9A84C" />
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="glass-card-gold p-8">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-4">CSR DELIVERABLES</p>
                <ul className="space-y-4">
                  {[
                    "Project proposal with detailed budget and timeline",
                    "Monthly progress reports with photo documentation",
                    "Quarterly audited utilisation statements",
                    "Annual impact report with beneficiary data",
                    "Co-branded CSR documentation for annual reports",
                    "Site visits arranged for CSR team verification",
                    "Named programme options (e.g., 'XYZ Corp Scholarship')",
                    "Board-level presentation of impact outcomes",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#C9A84C] mt-0.5 shrink-0" />
                      <span className="font-sans text-[14px] text-white/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== S4: SCHEDULE VII ALIGNMENT ===== */}
      <section className="py-20 md:py-28 bg-[#06101F]">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">COMPLIANCE</p>
            <h2 className="heading-lg text-white mb-4">
              Schedule VII <span className="text-[#C9A84C]">Alignment</span>
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-lg mx-auto">
              Every programme maps directly to Companies Act Schedule VII categories.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="font-mono text-[10px] tracking-wider uppercase text-[#1A7F8E] py-3 pr-4">Programme</th>
                    <th className="font-mono text-[10px] tracking-wider uppercase text-[#1A7F8E] py-3 pr-4">Schedule VII Category</th>
                    <th className="font-mono text-[10px] tracking-wider uppercase text-[#1A7F8E] py-3 pr-4">SDG</th>
                    <th className="font-mono text-[10px] tracking-wider uppercase text-[#1A7F8E] py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { prog: "Education", cat: "(ii) Promoting education", sdg: "SDG 4", status: "Active" },
                    { prog: "Elderly Care", cat: "(i) Eradicating hunger, poverty", sdg: "SDG 3", status: "Active" },
                    { prog: "CSR Impact", cat: "(x) Rural development", sdg: "SDG 10, 11", status: "Active" },
                    { prog: "Vidyapeeth", cat: "(ii) Promoting education", sdg: "SDG 4", status: "Planned" },
                  ].map((row) => (
                    <tr key={row.prog} className="border-b border-white/[0.06]">
                      <td className="font-sans text-[14px] text-white/70 py-4 pr-4">{row.prog}</td>
                      <td className="font-sans text-[13px] text-white/50 py-4 pr-4">{row.cat}</td>
                      <td className="py-4 pr-4">
                        <span className="font-mono text-[9px] tracking-wider uppercase bg-[#1A7F8E]/15 text-[#1A7F8E] px-2 py-1 rounded-sm">{row.sdg}</span>
                      </td>
                      <td className="py-4">
                        <span className={`font-mono text-[9px] tracking-wider uppercase px-2 py-1 rounded-sm ${
                          row.status === "Active" ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "bg-white/10 text-white/40"
                        }`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== S5: TARGET COMPANIES ===== */}
      <section className="py-20 md:py-28 bg-[#080F1C]">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">PARTNERSHIP TARGETS</p>
            <h2 className="heading-lg text-white mb-4">
              Companies We <span className="text-[#C9A84C]">Want to Work With</span>
            </h2>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-lg mx-auto">
              We are actively seeking CSR partnerships with companies that share our vision for Odisha and beyond.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {[
              "Tata Group", "Infosys", "Wipro", "HDFC Bank", "Reliance",
              "Mahindra", "Adani Foundation", "JSW", "Vedanta", "NTPC",
            ].map((company, i) => (
              <AnimatedSection key={company} delay={i * 0.04}>
                <div className="glass-card p-4 text-center hover:border-[#C9A84C]/30 transition-colors">
                  <Building2 size={20} className="text-[#C9A84C]/40 mx-auto mb-2" />
                  <p className="font-sans text-[13px] text-white/60">{company}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.5} className="mt-8 text-center">
            <p className="font-sans text-[13px] text-white/40 italic">
              These are aspirational targets. We welcome partnerships with companies of all sizes.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== S6: TRANSPARENCY PLEDGE ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628]">
        <div className="container max-w-3xl">
          <AnimatedSection className="text-center mb-14">
            <p className="section-label mb-4">OUR PLEDGE</p>
            <h2 className="heading-lg text-white mb-4">
              Transparency <span className="text-[#C9A84C]">Pledge</span>
            </h2>
            <div className="gradient-rule mx-auto" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="glass-card-gold p-8 md:p-10 text-center">
              <p className="font-serif text-xl md:text-2xl italic text-white/80 leading-relaxed mb-8">
                "Every rupee you invest through Abhiara Foundation will be tracked, documented, and reported. We do not believe in black boxes. We believe in open books."
              </p>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#C9A84C] mb-8">
                — Abhimanyu Mallik &middot; Founder
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#C9A84C]/15">
                {[
                  { icon: Eye, label: "Open Books", desc: "Full financial transparency" },
                  { icon: Clock, label: "Monthly Reports", desc: "Regular progress updates" },
                  { icon: Shield, label: "Audited Accounts", desc: "Independent audit trail" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <item.icon size={24} className="text-[#C9A84C] mx-auto mb-2" />
                    <p className="font-sans text-sm font-semibold text-white">{item.label}</p>
                    <p className="font-mono text-[9px] tracking-wider text-white/40">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== S7: CTA ===== */}
      <section className="py-16 md:py-20 bg-[#C9A84C]">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-serif font-bold text-[#0A1628] mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              Let's build impact together.
            </h2>
            <p className="font-sans text-[15px] text-[#0A1628]/70 max-w-xl mx-auto mb-8">
              Reach out to discuss how your CSR budget can create measurable, documented impact in tribal Odisha.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#0A1628] text-[#C9A84C] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#06101F] transition-colors"
              >
                CONTACT US <ArrowRight size={12} />
              </Link>
              <a
                href="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/Abhiara_Foundation_CSR_Proposal_2025_763a1de5.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 border border-[#0A1628]/30 text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#0A1628]/10 transition-colors"
              >
                <Download size={12} /> DOWNLOAD CSR PROPOSAL
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
