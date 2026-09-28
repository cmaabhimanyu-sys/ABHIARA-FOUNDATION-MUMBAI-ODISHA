/**
 * Abhiara Foundation, Impact & Transparency Page (Bilingual + CSR PDF)
 * Sections: Hero, How Your Money is Spent, Impact Numbers, Transparency Pledge, CTA
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { PieChart, TrendingUp, FileText, ArrowRight, Users, GraduationCap, Heart, IndianRupee, Shield, CheckCircle, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Impact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { t } = useLanguage();

  const FUND_ALLOCATION = [
    { category: t("Education Programmes", "ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ"), percentage: 45, color: "#F5A623", description: t("Scholarships, study kits, digital learning centres", "ବୃତ୍ତି, ଅଧ୍ୟୟନ କିଟ୍, ଡିଜିଟାଲ ଶିକ୍ଷା କେନ୍ଦ୍ର") },
    { category: t("Elderly Care", "ବୟସ୍କ ସେବା"), percentage: 25, color: "#F5A623", description: t("Health camps, companion visits, wellness kits", "ସ୍ୱାସ୍ଥ୍ୟ ଶିବିର, ସାଥୀ ପରିଦର୍ଶନ, ସୁସ୍ଥତା କିଟ୍") },
    { category: t("Disaster Relief", "ବିପର୍ଯ୍ୟୟ ସହାୟତା"), percentage: 15, color: "#E65100", description: t("Emergency response, relief kits, rehabilitation", "ଜରୁରୀକାଳୀନ ପ୍ରତିକ୍ରିୟା, ସହାୟତା କିଟ୍, ପୁନର୍ବାସ") },
    { category: t("Operations & Admin", "ପରିଚାଳନା ଏବଂ ପ୍ରଶାସନ"), percentage: 10, color: "#6B7280", description: t("Staff, logistics, compliance, reporting", "କର୍ମଚାରୀ, ଲଜିଷ୍ଟିକ୍ସ, ଅନୁପାଳନ, ରିପୋର୍ଟିଂ") },
    { category: t("Reserve Fund", "ସଂରକ୍ଷିତ ପାଣ୍ଠି"), percentage: 5, color: "#374151", description: t("Emergency corpus for unforeseen needs", "ଅପ୍ରତ୍ୟାଶିତ ଆବଶ୍ୟକତା ପାଇଁ ଜରୁରୀକାଳୀନ ପାଣ୍ଠି") },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title="Impact and Transparency, Abhiara Foundation"
        description="See where your money goes. Fund breakdown, real numbers, and reports you can download."
        url="https://abhiarafoundation.org/impact"
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#111111]/95 to-[#111111]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23F57C00' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }} />
        <div className="relative z-10 container text-center pt-32 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-6"
          >
            {t("TRANSPARENCY · ACCOUNTABILITY · IMPACT", "ସ୍ୱଚ୍ଛତା · ଉତ୍ତରଦାୟିତ୍ୱ · ପ୍ରଭାବ")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif font-bold text-white leading-[1.1] mb-6"
            style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
          >
            {t("Impact &", "ପ୍ରଭାବ ଏବଂ")} <span className="text-[#F5A623]">{t("Transparency", "ସ୍ୱଚ୍ଛତା")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-[16px] text-[#555] max-w-[560px] mx-auto leading-relaxed"
          >
            {t(
              "We track every rupee and show you exactly where it goes. No hidden costs, no vague reports. Just honest numbers.",
              "ପ୍ରତ୍ୟେକ ଟଙ୍କାର ହିସାବ ରଖାଯାଏ। ପ୍ରତ୍ୟେକ ପ୍ରଭାବ ଦସ୍ତାବିଜ ହୁଏ। ଆମେ ସମ୍ପୂର୍ଣ୍ଣ ସ୍ୱଚ୍ଛତାରେ ବିଶ୍ୱାସ କରୁ, କାରଣ ବିଶ୍ୱାସ କାର୍ଯ୍ୟ ଦ୍ୱାରା ଅର୍ଜିତ ହୁଏ, ଶବ୍ଦ ଦ୍ୱାରା ନୁହେଁ।"
            )}
          </motion.p>
        </div>
      </section>

      {/* ===== HOW YOUR MONEY IS SPENT (LIGHT) ===== */}
      <section className="py-24 md:py-32 section-light">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-4">{t("FUND UTILISATION", "ପାଣ୍ଠି ବ୍ୟବହାର")}</p>
            <h2 className="heading-lg light-heading mb-4">
              {t("How Your", "ଆପଣଙ୍କ")} <span className="text-[#F5A623]">{t("Money is Spent", "ଟଙ୍କା କିପରି ଖର୍ଚ୍ଚ ହୁଏ")}</span>
            </h2>
            <p className="font-sans text-[17px] light-body max-w-lg mx-auto">
              {t(
                "A transparent breakdown of how every contribution is allocated across our programmes.",
                "ଆମ କାର୍ଯ୍ୟକ୍ରମ ମଧ୍ୟରେ ପ୍ରତ୍ୟେକ ଅବଦାନ କିପରି ବଣ୍ଟନ ହୁଏ ତାହାର ଏକ ସ୍ୱଚ୍ଛ ବିଭାଜନ।"
              )}
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {FUND_ALLOCATION.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="bg-white shadow-lg rounded-lg p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-sans text-sm font-semibold text-[#1A1A1A]">{item.category}</h3>
                        <p className="font-mono text-[11px] text-[#333]/60">{item.description}</p>
                      </div>
                      <span className="font-mono text-lg font-bold" style={{ color: item.color }}>{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#111111]/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.5}>
              <div className="mt-8 bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-lg p-6 text-center">
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#F5A623] mb-2">{t("OUR COMMITMENT", "ଆମ ପ୍ରତିଶ୍ରୁତି")}</p>
                <p className="font-sans text-[16px] text-[#1A1A1A]/70">
                  {t(
                    "90% of all funds go directly to programmes. Administrative costs are kept below 10% through volunteer-driven operations and lean management.",
                    "ସମସ୍ତ ପାଣ୍ଠିର ୯୦% ସିଧା କାର୍ଯ୍ୟକ୍ରମକୁ ଯାଏ। ସ୍ୱେଚ୍ଛାସେବୀ-ଚାଳିତ ପରିଚାଳନା ଏବଂ ସୁଚାରୁ ପ୍ରଶାସନ ମାଧ୍ୟମରେ ପ୍ରଶାସନିକ ଖର୍ଚ୍ଚ ୧୦% ତଳେ ରଖାଯାଏ।"
                  )}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== IMPACT NUMBERS (DARK) ===== */}
      <section className="py-24 md:py-32 bg-[#FAFAFA]">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-4">{t("IMPACT SO FAR", "ଏପର୍ଯ୍ୟନ୍ତ ପ୍ରଭାବ")}</p>
            <h2 className="heading-lg text-[#1A1A1A] mb-4">
              {t("Numbers That", "ସଂଖ୍ୟା ଯାହା")} <span className="text-[#F5A623]">{t("Matter", "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ")}</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: GraduationCap, value: "50+", label: t("Students Reached", "ଛାତ୍ର ପହଞ୍ଚିଲେ"), sub: t("Ongoing education support", "ଚାଲୁଥିବା ଶିକ୍ଷା ସହାୟତା") },
              { icon: Heart, value: "20+", label: t("Families Supported", "ସହାୟତା ପାଇଥିବା ପରିବାର"), sub: t("Emergency cases", "ଜରୁରୀ ପରିସ୍ଥିତି") },
              { icon: Users, value: "50+", label: t("Ground Activities", "କ୍ଷେତ୍ର କାର୍ଯ୍ୟକଳାପ"), sub: t("Across Odisha", "ସମଗ୍ର ଓଡ଼ିଶାରେ") },
              { icon: TrendingUp, value: "5+", label: t("Districts Reached", "ପହଞ୍ଚିଥିବା ଜିଲ୍ଲା"), sub: t("Across Odisha", "ସମଗ୍ର ଓଡ଼ିଶାରେ") },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="light-card p-6 text-center">
                  <item.icon size={24} className="text-[#F5A623] mx-auto mb-3" />
                  <p className="font-serif text-2xl md:text-3xl font-bold text-[#F5A623] mb-1">{item.value}</p>
                  <p className="font-sans text-sm font-semibold text-[#1A1A1A] mb-1">{item.label}</p>
                  <p className="font-mono text-[9px] tracking-wider text-[#888]">{item.sub}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRANSPARENCY PLEDGE (LIGHT) ===== */}
      <section className="py-24 md:py-32 section-light">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            <AnimatedSection direction="left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#F5A623]/10 flex items-center justify-center">
                  <Shield size={20} className="text-[#F5A623]" />
                </div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623]">
                  {t("GOVERNANCE", "ଶାସନ")}
                </p>
              </div>
              <h2 className="heading-lg light-heading mb-6">{t("Our Transparency Pledge", "ଆମ ସ୍ୱଚ୍ଛତା ପ୍ରତିଜ୍ଞା")}</h2>
              <p className="font-sans text-[17px] light-body leading-relaxed mb-6">
                {t(
                  "If you give us money, you have every right to know where it goes. We track every rupee and show you exactly what it paid for.",
                  "ଆମେ ବିଶ୍ୱାସ କରୁ ପ୍ରତ୍ୟେକ ଦାତା, ସହଭାଗୀ ଏବଂ ଅଂଶୀଦାରଙ୍କ ସେମାନଙ୍କ ଅବଦାନ କିପରି ବ୍ୟବହୃତ ହୁଏ ଜାଣିବାର ଅଧିକାର ଅଛି। ଆମ ଶାସନ ଢାଞ୍ଚା ସମ୍ପୂର୍ଣ୍ଣ ଉତ୍ତରଦାୟିତ୍ୱ ନିଶ୍ଚିତ କରେ।"
                )}
              </p>

              <ul className="space-y-3">
                {[
                  t("Quarterly audited financial statements", "ତ୍ରୈମାସିକ ଅଡିଟ୍ ହୋଇଥିବା ଆର୍ଥିକ ବିବରଣୀ"),
                  t("Monthly activity reports with photo documentation", "ଫଟୋ ଡକ୍ୟୁମେଣ୍ଟେସନ ସହ ମାସିକ କାର୍ଯ୍ୟକଳାପ ରିପୋର୍ଟ"),
                  t("Annual impact report published publicly", "ସାର୍ବଜନିକ ଭାବରେ ପ୍ରକାଶିତ ବାର୍ଷିକ ପ୍ରଭାବ ରିପୋର୍ଟ"),
                  t("CMA-led finance and compliance oversight", "CMA-ନେତୃତ୍ୱାଧୀନ ଆର୍ଥିକ ଏବଂ ଅନୁପାଳନ ତଦାରଖ"),
                  t("Board-approved budget for every programme", "ପ୍ରତ୍ୟେକ କାର୍ଯ୍ୟକ୍ରମ ପାଇଁ ବୋର୍ଡ-ଅନୁମୋଦିତ ବଜେଟ"),
                  t("Real-time activity updates on website and social media", "ୱେବସାଇଟ ଏବଂ ସୋସିଆଲ ମିଡିଆରେ ରିଅଲ-ଟାଇମ କାର୍ଯ୍ୟକଳାପ ଅପଡେଟ"),
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-[16px] light-body">
                    <CheckCircle size={16} className="text-[#F5A623] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white shadow-lg rounded-lg p-8">
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-6 text-center">{t("Reports & Documents", "ରିପୋର୍ଟ ଏବଂ ଡକ୍ୟୁମେଣ୍ଟ")}</h3>
                <div className="space-y-4">
                  <div className="border border-[#111111]/10 rounded-lg p-4 flex items-center gap-4">
                    <FileText size={24} className="text-[#F5A623] shrink-0" />
                    <div className="flex-1">
                      <p className="font-sans text-sm font-semibold text-[#1A1A1A]">{t("FY 2025-26 Impact Report", "FY ୨୦୨୫-୨୬ ପ୍ରଭାବ ରିପୋର୍ଟ")}</p>
                      <p className="font-mono text-[10px] text-[#1A1A1A]/50">{t("Coming Soon, First Annual Report", "ଶୀଘ୍ର ଆସୁଛି, ପ୍ରଥମ ବାର୍ଷିକ ରିପୋର୍ଟ")}</p>
                    </div>
                  </div>
                  <a
                    href="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/Abhiara_Foundation_CSR_Proposal_2922cddb.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#F5A623]/30 bg-[#1A1A1A]/5 rounded-lg p-4 flex items-center gap-4 hover:bg-[#1A1A1A]/10 transition-colors cursor-pointer block"
                  >
                    <Download size={24} className="text-[#F5A623] shrink-0" />
                    <div className="flex-1">
                      <p className="font-sans text-sm font-semibold text-[#1A1A1A]">{t("CSR Proposal Document", "CSR ପ୍ରସ୍ତାବ ଡକ୍ୟୁମେଣ୍ଟ")}</p>
                      <p className="font-mono text-[10px] text-[#F5A623]">{t("Download PDF, For Corporate Partners", "PDF ଡାଉନଲୋଡ୍, କର୍ପୋରେଟ ସହଭାଗୀଙ୍କ ପାଇଁ")}</p>
                    </div>
                    <ArrowRight size={16} className="text-[#F5A623]" />
                  </a>
                </div>
                <div className="mt-6 pt-4 border-t border-[#111111]/10 text-center">
                  <p className="font-mono text-[10px] tracking-wider uppercase text-[#1A1A1A]/40 mb-1">{t("GOVERNED BY", "ଶାସିତ")}</p>
                  <p className="font-mono text-[11px] text-[#F5A623]">Companies Act 2013 · Section 8 · Schedule VII</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== GOLD CTA ===== */}
      <section className="py-20 md:py-24 bg-[#F5A623]">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-serif font-bold text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              {t("Trust is built through transparency.", "ବିଶ୍ୱାସ ସ୍ୱଚ୍ଛତା ମାଧ୍ୟମରେ ଗଢ଼ା ଯାଏ।")}
            </h2>
            <p className="font-sans text-[17px] text-[#1A1A1A]/70 max-w-xl mx-auto mb-8">
              {t(
                "Have questions about our financials, governance, or impact? We are always open to conversations.",
                "ଆମ ଆର୍ଥିକ, ଶାସନ କିମ୍ବା ପ୍ରଭାବ ବିଷୟରେ ପ୍ରଶ୍ନ ଅଛି? ଆମେ ସର୍ବଦା ବାର୍ତ୍ତାଳାପ ପାଇଁ ପ୍ରସ୍ତୁତ।"
              )}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#111111] text-[#F5A623] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#111111] transition-colors"
            >
              {t("ASK US ANYTHING", "ଆମକୁ କିଛି ପଚାରନ୍ତୁ")} <ArrowRight size={12} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
