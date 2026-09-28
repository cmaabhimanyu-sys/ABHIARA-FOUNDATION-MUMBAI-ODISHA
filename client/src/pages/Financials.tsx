/**
 * Abhiara Foundation, Financials & Annual Reports Page
 * Inspired by CRY.org financials section
 * Shows annual reports, certificates, FCRA reports, and transparency commitment
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { FileText, Download, Shield, Award, CheckCircle, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const CERTIFICATES = [
  {
    title: "Section 8 Company Registration",
    titleOd: "ଧାରା 8 କମ୍ପାନୀ ପଞ୍ଜୀକରଣ",
    status: "Active",
    statusOd: "ସକ୍ରିୟ",
    detail: "CIN: U87300MH2026NPL471397",
    detailOd: "CIN: U87300MH2026NPL471397",
    color: "#F5A623",
  },
  {
    title: "80G Application Status",
    titleOd: "80G ଆବେଦନ ସ୍ଥିତି",
    status: "In Process",
    statusOd: "ପ୍ରକ୍ରିୟାରେ",
    detail: "Application submitted to Income Tax Department",
    detailOd: "ଆୟକର ବିଭାଗରେ ଆବେଦନ ଦାଖଲ କରାଯାଇଛି",
    color: "#F5A623",
  },
  {
    title: "12A Registration",
    titleOd: "12A ପଞ୍ଜୀକରଣ",
    status: "In Process",
    statusOd: "ପ୍ରକ୍ରିୟାରେ",
    detail: "Required for tax exemption on income",
    detailOd: "ଆୟ ଉପରେ କର ଛାଡ଼ ପାଇଁ ଆବଶ୍ୟକ",
    color: "#F5A623",
  },
  {
    title: "FCRA Registration",
    titleOd: "FCRA ପଞ୍ଜୀକରଣ",
    status: "Planned",
    statusOd: "ଯୋଜନାରେ",
    detail: "For receiving foreign contributions",
    detailOd: "ବିଦେଶୀ ଅନୁଦାନ ପାଇଁ",
    color: "#888",
  },
];

const TRANSPARENCY_POINTS = [
  { en: "All donations are tracked and reported quarterly", od: "ସମସ୍ତ ଦାନ ତ୍ରୈମାସିକ ଟ୍ରାକ ଓ ରିପୋର୍ଟ ହୁଏ" },
  { en: "CMA (Cost & Management Accountant) led finance team", od: "CMA ନେତୃତ୍ୱାଧୀନ ଆର୍ଥିକ ଦଳ" },
  { en: "Annual audit by independent chartered accountants", od: "ସ୍ୱାଧୀନ ଚାର୍ଟାର୍ଡ ଏକାଉଣ୍ଟାଣ୍ଟଙ୍କ ଦ୍ୱାରା ବାର୍ଷିକ ଅଡିଟ" },
  { en: "Monthly utilisation statements for CSR partners", od: "CSR ସହଭାଗୀଙ୍କ ପାଇଁ ମାସିକ ବ୍ୟବହାର ବିବରଣୀ" },
  { en: "Board-approved budget allocation for every programme", od: "ପ୍ରତ୍ୟେକ କାର୍ଯ୍ୟକ୍ରମ ପାଇଁ ବୋର୍ଡ-ଅନୁମୋଦିତ ବଜେଟ" },
  { en: "Zero tolerance for fund misuse. Legally bound under Companies Act", od: "ତହବିଲ ଅପବ୍ୟବହାର ପ୍ରତି ଶୂନ୍ୟ ସହନଶୀଳତା, କମ୍ପାନୀ ଆଇନ ଅଧୀନରେ ଆଇନତଃ ବାଧ୍ୟ" },
];

export default function Financials() {
  const { t } = useLanguage();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title={t("Financials and Reports, Abhiara Foundation", "ଆର୍ଥିକ ଓ ରିପୋର୍ଟ, ଅଭିଆରା ଫାଉଣ୍ଡେସନ")}
        description={t(
          "Full transparency. View Abhiara Foundation's annual reports, certificates, and financial reports.",
          "ସମ୍ପୂର୍ଣ୍ଣ ସ୍ୱଚ୍ଛତା। ଅଭିଆରା ଫାଉଣ୍ଡେସନର ବାର୍ଷିକ ରିପୋର୍ଟ, ପ୍ରମାଣପତ୍ର ଓ ଆର୍ଥିକ ଜବାବଦେହୀ ଦେଖନ୍ତୁ।"
        )}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-28 pb-14 md:pt-32 md:pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23F57C00' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }} />
        <div className="container relative z-10 text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-4">
            {t("ACCOUNTABILITY & TRUST", "ଜବାବଦେହୀ ଓ ବିଶ୍ୱାସ")}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            {t("Our ", "ଆମର ")}<span className="text-[#F5A623]">{t("Financials", "ଆର୍ଥିକ ବିବରଣୀ")}</span>
          </h1>
          <p className="font-sans text-[16px] text-[#555] max-w-xl mx-auto leading-relaxed">
            {t(
              "We keep our books clean. Every rupee is tracked, audited, and reported.",
              "ଆମେ ସମ୍ପୂର୍ଣ୍ଣ ସ୍ୱଚ୍ଛତାରେ ବିଶ୍ୱାସ କରୁ। ଦାନ ହୋଇଥିବା ପ୍ରତ୍ୟେକ ଟଙ୍କାର ହିସାବ, ଅଡିଟ ଓ ରିପୋର୍ଟ ହୁଏ।"
            )}
          </p>
        </div>
      </section>

      {/* ===== CERTIFICATES & REGISTRATIONS ===== */}
      <section className="py-14 md:py-20 bg-[#FAFAFA]">
        <div className="container max-w-5xl">
          <AnimatedSection className="text-center mb-16">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
              {t("LEGAL STATUS", "ଆଇନଗତ ସ୍ଥିତି")}
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-3">
              {t("Registrations & Certificates", "ପଞ୍ଜୀକରଣ ଓ ପ୍ରମାଣପତ୍ର")}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#F5A623] to-[#1A1A1A] mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CERTIFICATES.map((cert, i) => (
              <AnimatedSection key={cert.title} delay={i * 0.08}>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${cert.color}15` }}>
                        <Shield size={18} style={{ color: cert.color }} />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">{t(cert.title, cert.titleOd)}</h3>
                    </div>
                    <span className="font-mono text-[9px] tracking-wider uppercase px-2 py-1 rounded-full" style={{
                      background: `${cert.color}15`,
                      color: cert.color,
                    }}>
                      {t(cert.status, cert.statusOd)}
                    </span>
                  </div>
                  <p className="font-sans text-[13px] text-[#555]">{t(cert.detail, cert.detailOd)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ANNUAL REPORTS ===== */}
      <section className="py-14 md:py-20 bg-[#FAFAFA]">
        <div className="container max-w-4xl">
          <AnimatedSection className="text-center mb-16">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
              {t("REPORTS & DOCUMENTS", "ରିପୋର୍ଟ ଓ ଦଲିଲ")}
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-3">
              {t("Annual Reports", "ବାର୍ଷିକ ରିପୋର୍ଟ")}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#F5A623] to-[#1A1A1A] mx-auto" />
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-[#FAFAFA] p-8 rounded-lg border border-gray-100 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F5A623]/10 flex items-center justify-center mx-auto mb-5">
                <FileText size={28} className="text-[#F5A623]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-2">
                {t("First Annual Report. Coming Soon", "ପ୍ରଥମ ବାର୍ଷିକ ରିପୋର୍ଟ, ଶୀଘ୍ର ଆସୁଛି")}
              </h3>
              <p className="font-sans text-[16px] text-[#555] max-w-lg mx-auto mb-5">
                {t(
                  "Our first annual report will be published after the financial year audit is complete.",
                  "ଆର୍ଥିକ ବର୍ଷର ଅଡିଟ ସମ୍ପୂର୍ଣ୍ଣ ହେବା ପରେ ଆମର ପ୍ରଥମ ବାର୍ଷିକ ରିପୋର୍ଟ ପ୍ରକାଶିତ ହେବ।"
                )}
              </p>
              <p className="font-mono text-[10px] tracking-wider uppercase text-[#F5A623]">
                {t("After the annual audit", "ବାର୍ଷିକ ଅଡିଟ ପରେ")}
              </p>
            </div>
          </AnimatedSection>

          {/* CSR Proposal Download */}
          <AnimatedSection delay={0.1} className="mt-8">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A]/10 flex items-center justify-center flex-shrink-0">
                  <Download size={20} className="text-[#F5A623]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                    {t("CSR Proposal Document", "CSR ପ୍ରସ୍ତାବ ଦଲିଲ")}
                  </h3>
                  <p className="font-sans text-[12px] text-[#555]">
                    {t("Detailed programme overview for corporate partners", "କର୍ପୋରେଟ ସହଭାଗୀଙ୍କ ପାଇଁ ବିସ୍ତୃତ କାର୍ଯ୍ୟକ୍ରମ ସମୀକ୍ଷା")}
                  </p>
                </div>
              </div>
              <a
                href="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/abhiara-csr-proposal-2026-gQNdVNdSqjJxVnqfNGPbSn.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-white font-mono text-[10px] tracking-[0.15em] uppercase font-bold rounded-lg hover:bg-[#111111] transition-colors"
              >
                <Download size={12} /> {t("DOWNLOAD PDF", "PDF ଡାଉନଲୋଡ")}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== TRANSPARENCY COMMITMENT ===== */}
      <section className="py-14 md:py-20 bg-[#FAFAFA]">
        <div className="container max-w-4xl">
          <AnimatedSection className="text-center mb-10">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
              {t("OUR PROMISE", "ଆମ ପ୍ରତିଶ୍ରୁତି")}
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-3">
              {t("Transparency Commitment", "ସ୍ୱଚ୍ଛତା ପ୍ରତିବଦ୍ଧତା")}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#F5A623] to-[#1A1A1A] mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRANSPARENCY_POINTS.map((point, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-4">
                  <CheckCircle size={18} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
                  <p className="font-sans text-[16px] text-[#333] leading-relaxed">{t(point.en, point.od)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-10 md:py-14 bg-[#FAFAFA]">
        <div className="container max-w-3xl text-center">
          <AnimatedSection>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-3">
              {t("Questions about our finances?", "ଆମ ଆର୍ଥିକ ବିଷୟରେ ପ୍ରଶ୍ନ?")}
            </h2>
            <p className="font-sans text-[16px] text-[#555] mb-6">
              {t(
                "We are happy to share any additional information. Reach out to our finance team.",
                "ଆମେ ଅତିରିକ୍ତ ସୂଚନା ସେୟାର କରିବାକୁ ଖୁସି। ଆମ ଆର୍ଥିକ ଦଳ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।"
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/impact"
                className="px-6 py-2.5 bg-[#F5A623] text-[#1A1A1A] font-mono text-[10px] font-bold tracking-[0.15em] uppercase rounded-lg hover:bg-[#E8960E] transition-colors"
              >
                {t("VIEW IMPACT REPORT", "ପ୍ରଭାବ ରିପୋର୍ଟ ଦେଖନ୍ତୁ")}
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2.5 border border-[#F5A623] text-[#F5A623] font-mono text-[10px] font-bold tracking-[0.15em] uppercase rounded-lg hover:bg-[#1A1A1A]/5 transition-colors"
              >
                {t("CONTACT FINANCE TEAM", "ଆର୍ଥିକ ଦଳ ସହ ଯୋଗାଯୋଗ")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
