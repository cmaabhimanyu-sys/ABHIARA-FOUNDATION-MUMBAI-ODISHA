/**
 * Abhiara Foundation, Media Room Page (Bilingual)
 * Sections: Hero, Press Releases, News Coverage, Newsletter, Contact for Media
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { Newspaper, FileText, Mail, ArrowRight, ExternalLink, Download, Megaphone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Media() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { t } = useLanguage();

  const PRESS_RELEASES = [
    {
      date: t("March 2025", "ମାର୍ଚ୍ଚ ୨୦୨୫"),
      title: t("Abhiara Foundation Incorporated as Section 8 Company", "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଧାରା ୮ କମ୍ପାନୀ ଭାବରେ ପଞ୍ଜୀକୃତ"),
      summary: t(
        "Abhiara Foundation (Abhiara Ara Foundation) has been incorporated as a Section 8 Company under the Companies Act, 2013, with CIN U85300MH2025NPL422298. The foundation focuses on education, elderly care, and community development across Odisha.",
        "ଅଭିଆରା ଫାଉଣ୍ଡେସନ (ଅଭିଆରା ଆରା ଫାଉଣ୍ଡେସନ) କମ୍ପାନୀ ଆଇନ, ୨୦୧୩ ଅଧୀନରେ CIN U85300MH2025NPL422298 ସହ ଧାରା ୮ କମ୍ପାନୀ ଭାବରେ ପଞ୍ଜୀକୃତ ହୋଇଛି। ଫାଉଣ୍ଡେସନ ଓଡ଼ିଶାରେ ଶିକ୍ଷା, ବୟସ୍କ ସେବା ଏବଂ ସାମୁଦାୟିକ ବିକାଶ ଉପରେ ଧ୍ୟାନ ଦିଏ।"
      ),
      type: t("Announcement", "ଘୋଷଣା"),
    },
    {
      date: t("October 2025", "ଅକ୍ଟୋବର ୨୦୨୫"),
      title: t("First Elderly Care Visit, Hope is Life Old Age Home, Puri", "ପ୍ରଥମ ବୟସ୍କ ସେବା ପରିଦର୍ଶନ, ହୋପ ଇଜ୍ ଲାଇଫ ବୃଦ୍ଧାଶ୍ରମ, ପୁରୀ"),
      summary: t(
        "Abhiara Foundation conducted its first elderly care outreach at Hope is Life Old Age Home in Puri, Odisha. The team distributed essentials and spent quality time with 40+ elderly residents.",
        "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ପୁରୀ, ଓଡ଼ିଶାର ହୋପ ଇଜ୍ ଲାଇଫ ବୃଦ୍ଧାଶ୍ରମରେ ପ୍ରଥମ ବୟସ୍କ ସେବା ଅଭିଯାନ ପରିଚାଳନା କଲା। ଦଳ ୪୦+ ବୟସ୍କ ବାସିନ୍ଦାଙ୍କୁ ଆବଶ୍ୟକୀୟ ସାମଗ୍ରୀ ବିତରଣ କଲା ଏବଂ ଗୁଣାତ୍ମକ ସମୟ ବିତାଇଲା।"
      ),
      type: t("Activity Report", "କାର୍ଯ୍ୟକଳାପ ରିପୋର୍ଟ"),
    },
    {
      date: t("November 2025", "ନଭେମ୍ବର ୨୦୨୫"),
      title: t("Book Distribution Drive, Kendrapara, Odisha", "ପୁସ୍ତକ ବିତରଣ ଅଭିଯାନ, କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା"),
      summary: t(
        "Distributed books, notebooks, and study materials to 50+ tribal children in Kendrapara. Conducted open-air learning sessions alongside the distribution.",
        "କେନ୍ଦ୍ରାପଡ଼ାରେ ୫୦+ ଆଦିବାସୀ ଶିଶୁଙ୍କୁ ପୁସ୍ତକ, ନୋଟବୁକ ଏବଂ ଅଧ୍ୟୟନ ସାମଗ୍ରୀ ବିତରଣ କରାଗଲା। ବିତରଣ ସହ ଖୋଲା ଆକାଶ ତଳେ ଶିକ୍ଷା ସେସନ ପରିଚାଳନା କରାଗଲା।"
      ),
      type: t("Activity Report", "କାର୍ଯ୍ୟକଳାପ ରିପୋର୍ଟ"),
    },
  ];

  const NEWS_COVERAGE = [
    {
      source: t("Company Registration", "କମ୍ପାନୀ ପଞ୍ଜୀକରଣ"),
      title: t("Section 8 Company Registration, MCA Filing", "ଧାରା ୮ କମ୍ପାନୀ ପଞ୍ଜୀକରଣ, MCA ଫାଇಲିଂ"),
      description: t(
        "Official incorporation under Ministry of Corporate Affairs, Government of India. CIN: U85300MH2025NPL422298.",
        "ଭାରତ ସରକାରଙ୍କ କର୍ପୋରେଟ ବ୍ୟାପାର ମନ୍ତ୍ରଣାଳୟ ଅଧୀନରେ ଅଧିକୃତ ପଞ୍ଜୀକରଣ। CIN: U85300MH2025NPL422298।"
      ),
    },
    {
      source: t("SDG Alignment", "SDG ସମନ୍ୱୟ"),
      title: t("Aligned with UN Sustainable Development Goals 3, 4, 10, 11", "ଜାତିସଂଘ ସ୍ଥାୟୀ ବିକାଶ ଲକ୍ଷ୍ୟ ୩, ୪, ୧୦, ୧୧ ସହ ସମନ୍ୱିତ"),
      description: t(
        "Abhiara Foundation's programmes directly contribute to SDG 3 (Good Health), SDG 4 (Quality Education), SDG 10 (Reduced Inequalities), and SDG 11 (Sustainable Communities).",
        "ଅଭିଆରା ଫାଉଣ୍ଡେସନର କାର୍ଯ୍ୟକ୍ରମ ସିଧା SDG ୩ (ସୁସ୍ୱାସ୍ଥ୍ୟ), SDG ୪ (ଗୁଣାତ୍ମକ ଶିକ୍ଷା), SDG ୧୦ (ହ୍ରାସ ଅସମାନତା), ଏବଂ SDG ୧୧ (ସ୍ଥାୟୀ ସମ୍ପ୍ରଦାୟ) ରେ ଅବଦାନ ଦିଏ।"
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title="Media Room, Abhiara Foundation"
        description="Press releases, news coverage, and media resources from Abhiara Foundation."
        url="https://abhiarafoundation.org/media"
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
            {t("PRESS · NEWS · UPDATES", "ସମ୍ବାଦ · ଖବର · ଅପଡେଟ")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif font-bold text-white leading-[1.1] mb-6"
            style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
          >
            {t("Media", "ମିଡିଆ")} <span className="text-[#F5A623]">{t("Room", "ରୁମ୍")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-[16px] text-[#555] max-w-[560px] mx-auto leading-relaxed"
          >
            {t(
              "Official announcements, press releases, and news coverage. For media inquiries, reach out to info@abhiarafoundation.org.",
              "ଅଧିକୃତ ଘୋଷଣା, ସମ୍ବାଦ ବିଜ୍ଞପ୍ତି ଏବଂ ସମ୍ବାଦ କଭରେଜ। ମିଡିଆ ଅନୁସନ୍ଧାନ ପାଇଁ info@abhiarafoundation.org ରେ ଯୋଗାଯୋଗ କରନ୍ତୁ।"
            )}
          </motion.p>
        </div>
      </section>

      {/* ===== PRESS RELEASES (LIGHT) ===== */}
      <section className="py-24 md:py-32 section-light">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-4">{t("PRESS RELEASES", "ସମ୍ବାଦ ବିଜ୍ଞପ୍ତି")}</p>
            <h2 className="heading-lg light-heading mb-4">
              {t("Official", "ଅଧିକୃତ")} <span className="text-[#F5A623]">{t("Announcements", "ଘୋଷଣା")}</span>
            </h2>
            <p className="font-sans text-[17px] light-body max-w-lg mx-auto">
              {t(
                "Stay updated with our latest milestones, activities, and organisational developments.",
                "ଆମ ସର୍ବଶେଷ ମାଇଲଖୁଣ୍ଟ, କାର୍ଯ୍ୟକଳାପ ଏବଂ ସଂଗଠନାତ୍ମକ ବିକାଶ ସହ ଅପଡେଟ ରୁହନ୍ତୁ।"
              )}
            </p>
          </AnimatedSection>

          <div className="space-y-6 max-w-4xl mx-auto">
            {PRESS_RELEASES.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-4 md:gap-6">
                  <div className="shrink-0">
                    <span className="inline-block px-3 py-1 bg-[#F5A623]/10 text-[#F5A623] font-mono text-[10px] tracking-wider uppercase rounded-sm">
                      {item.type}
                    </span>
                    <p className="font-mono text-[11px] text-[#1A1A1A]/50 mt-2">{item.date}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                    <p className="font-sans text-[16px] text-[#333] leading-relaxed">{item.summary}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWS & RECOGNITION (DARK -> LIGHT) ===== */}
      <section className="py-24 md:py-32 bg-[#FAFAFA]">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-4">{t("NEWS & RECOGNITION", "ଖବର ଏବଂ ସ୍ୱୀକୃତି")}</p>
            <h2 className="heading-lg text-[#1A1A1A] mb-4">
              {t("Coverage &", "କଭରେଜ ଏବଂ")} <span className="text-[#F5A623]">{t("Milestones", "ମାଇଲଖୁଣ୍ଟ")}</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {NEWS_COVERAGE.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="light-card p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Newspaper size={16} className="text-[#F5A623]" />
                    <span className="font-mono text-[10px] tracking-wider uppercase text-[#F5A623]">{item.source}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                  <p className="font-sans text-[13px] text-[#555] leading-relaxed flex-1">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUARTERLY NEWSLETTER (LIGHT) ===== */}
      <section className="py-24 md:py-32 section-light">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            <AnimatedSection direction="left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#F5A623]/10 flex items-center justify-center">
                  <Mail size={20} className="text-[#F5A623]" />
                </div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623]">
                  {t("NEWSLETTER", "ନ୍ୟୁଜଲେଟର")}
                </p>
              </div>
              <h2 className="heading-lg light-heading mb-6">{t("Quarterly Impact Updates", "ତ୍ରୈମାସିକ ପ୍ରଭାବ ଅପଡେଟ")}</h2>
              <p className="font-sans text-[17px] light-body leading-relaxed mb-6">
                {t(
                  "Subscribe to our quarterly newsletter for impact stories, programme updates, financial transparency reports, and upcoming events. Delivered straight to your inbox.",
                  "ପ୍ରଭାବ କାହାଣୀ, କାର୍ଯ୍ୟକ୍ରମ ଅପଡେଟ, ଆର୍ଥିକ ସ୍ୱଚ୍ଛତା ରିପୋର୍ଟ ଏବଂ ଆଗାମୀ ଇଭେଣ୍ଟ ପାଇଁ ଆମ ତ୍ରୈମାସିକ ନ୍ୟୁଜଲେଟର ସବ୍ସକ୍ରାଇବ୍ କରନ୍ତୁ।"
                )}
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  t("Impact stories from the field", "ମାଠରୁ ପ୍ରଭାବ କାହାଣୀ"),
                  t("Financial transparency and fund utilisation", "ଆର୍ଥିକ ସ୍ୱଚ୍ଛତା ଏବଂ ପାଣ୍ଠି ବ୍ୟବହାର"),
                  t("Upcoming events and volunteer opportunities", "ଆଗାମୀ ଇଭେଣ୍ଟ ଏବଂ ସ୍ୱେଚ୍ଛାସେବୀ ସୁଯୋଗ"),
                  t("CSR partnership updates", "CSR ସହଭାଗିତା ଅପଡେଟ"),
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-[16px] light-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors"
              >
                {t("SUBSCRIBE", "ସବ୍ସକ୍ରାଇବ୍")} <ArrowRight size={12} />
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                <Megaphone size={48} className="text-[#F5A623] mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-3">{t("Media Inquiries", "ମିଡିଆ ଅନୁସନ୍ଧାନ")}</h3>
                <p className="font-sans text-[16px] text-[#333] leading-relaxed mb-6">
                  {t(
                    "For press inquiries, interview requests, or media partnerships, please contact our communications team.",
                    "ସମ୍ବାଦ ଅନୁସନ୍ଧାନ, ସାକ୍ଷାତକାର ଅନୁରୋଧ କିମ୍ବା ମିଡିଆ ସହଭାଗିତା ପାଇଁ ଆମ ଯୋଗାଯୋଗ ଦଳ ସହ ସମ୍ପର୍କ କରନ୍ତୁ।"
                  )}
                </p>
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <p className="font-mono text-[11px] tracking-wider text-[#F5A623]">info@abhiarafoundation.org</p>
                  <p className="font-mono text-[11px] tracking-wider text-[#1A1A1A]/50">founder@abhiarafoundation.org</p>
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
              {t("Tell Our Story. Amplify Our Impact.", "ଆମ କାହାଣୀ କୁହନ୍ତୁ। ଆମ ପ୍ରଭାବ ବଢ଼ାନ୍ତୁ।")}
            </h2>
            <p className="font-sans text-[17px] text-[#1A1A1A]/70 max-w-xl mx-auto mb-8">
              {t(
                "Partner with us to share stories from Odisha with a wider audience. Help more people know what's happening on the ground.",
                "ଓଡ଼ିଶାର ମୂଳସ୍ତରୀୟ କାହାଣୀ ବ୍ୟାପକ ଦର୍ଶକଙ୍କ ନିକଟରେ ଆଣିବା ପାଇଁ ଆମ ସହ ସହଭାଗୀ ହୁଅନ୍ତୁ। ଏକତ୍ର, ଆମେ ଅଧିକ ଲୋକଙ୍କୁ କାର୍ଯ୍ୟ କରିବାକୁ ପ୍ରେରିତ କରିପାରିବା।"
              )}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#111111] text-[#F5A623] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#111111] transition-colors"
            >
              {t("CONTACT US", "ଯୋଗାଯୋଗ କରନ୍ତୁ")} <ArrowRight size={12} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
