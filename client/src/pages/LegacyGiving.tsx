/**
 * Abhiara Foundation, Legacy Giving Page
 * Inspired by CRY.org legacy giving section
 * Information about will/bequest donations and planned giving
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { Heart, Shield, BookOpen, Users, Mail, Phone, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const WAYS_TO_GIVE = [
  {
    icon: Heart,
    title: "Bequest in Your Will",
    titleOd: "ଆପଣଙ୍କ ଉଇଲରେ ଦାନ",
    desc: "Include Abhiara Foundation as a beneficiary in your will. A percentage or specific amount can be designated for education or elderly care.",
    descOd: "ଆପଣଙ୍କ ଉଇଲରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନକୁ ଲାଭଭୋଗୀ ଭାବରେ ଅନ୍ତର୍ଭୁକ୍ତ କରନ୍ତୁ।",
  },
  {
    icon: Shield,
    title: "Life Insurance Beneficiary",
    titleOd: "ଜୀବନ ବୀମା ଲାଭଭୋଗୀ",
    desc: "Name Abhiara Foundation as a beneficiary of your life insurance policy. This costs nothing during your lifetime.",
    descOd: "ଆପଣଙ୍କ ଜୀବନ ବୀମା ପଲିସିର ଲାଭଭୋଗୀ ଭାବରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନକୁ ନାମାଙ୍କିତ କରନ୍ତୁ।",
  },
  {
    icon: BookOpen,
    title: "Fixed Deposit / Endowment",
    titleOd: "ସ୍ଥିର ଜମା / ଏଣ୍ଡାଉମେଣ୍ଟ",
    desc: "Create an endowment or fixed deposit in the foundation's name. The interest funds programmes while the principal remains intact.",
    descOd: "ଫାଉଣ୍ଡେସନ ନାମରେ ଏକ ଏଣ୍ଡାଉମେଣ୍ଟ ବା ସ୍ଥିର ଜମା ସୃଷ୍ଟି କରନ୍ତୁ।",
  },
  {
    icon: Users,
    title: "Property / Asset Donation",
    titleOd: "ସମ୍ପତ୍ତି / ସମ୍ପଦ ଦାନ",
    desc: "Donate property, land, or other assets to support our long-term mission of building Abhiara Vidyapeeth.",
    descOd: "ଅଭିଆରା ବିଦ୍ୟାପୀଠ ନିର୍ମାଣର ଆମ ଦୀର୍ଘକାଳୀନ ମିଶନକୁ ସମର୍ଥନ ପାଇଁ ସମ୍ପତ୍ତି, ଜମି ବା ଅନ୍ୟ ସମ୍ପଦ ଦାନ କରନ୍ତୁ।",
  },
];

export default function LegacyGiving() {
  const { t } = useLanguage();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title={t("Legacy Giving, Abhiara Foundation", "ଉତ୍ତରାଧିକାର ଦାନ, ଅଭିଆରା ଫାଉଣ୍ଡେସନ")}
        description={t(
          "Leave a lasting legacy. Include Abhiara Foundation in your will or planned giving to support education and elderly care for generations.",
          "ଏକ ସ୍ଥାୟୀ ଉତ୍ତରାଧିକାର ଛାଡ଼ନ୍ତୁ। ପିଢ଼ି ପିଢ଼ି ଶିକ୍ଷା ଓ ବୟସ୍କ ସେବାକୁ ସମର୍ଥନ ପାଇଁ ଆପଣଙ୍କ ଉଇଲରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନକୁ ଅନ୍ତର୍ଭୁକ୍ତ କରନ୍ତୁ।"
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
            {t("PLANNED GIVING", "ଯୋଜନାବଦ୍ଧ ଦାନ")}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            {t("Leave a Lasting ", "ଏକ ସ୍ଥାୟୀ ")}<span className="text-[#F5A623]">{t("Legacy", "ଉତ୍ତରାଧିକାର ଛାଡ଼ନ୍ତୁ")}</span>
          </h1>
          <p className="font-sans text-[16px] text-[#555] max-w-xl mx-auto leading-relaxed">
            {t(
              "Your legacy can ensure that children receive education and elders receive dignity. for generations to come.",
              "ଆପଣଙ୍କ ଉତ୍ତରାଧିକାର ସୁନିଶ୍ଚିତ କରିପାରିବ ଯେ ଶିଶୁମାନେ ଶିକ୍ଷା ଓ ବୟସ୍କମାନେ ମର୍ଯ୍ୟାଦା ପାଇବେ, ଆସନ୍ତା ପିଢ଼ି ପାଇଁ।"
            )}
          </p>
        </div>
      </section>

      {/* ===== QUOTE ===== */}
      <section className="py-10 md:py-12 bg-[#FAFAFA]">
        <div className="container max-w-3xl text-center">
          <p className="font-serif text-xl md:text-2xl italic text-[#1A1A1A]/80 leading-relaxed">
            {t(
              "\"The greatest use of a life is to spend it for something that will outlast it.\"",
              "\"ଜୀବନର ସର୍ବଶ୍ରେଷ୍ଠ ବ୍ୟବହାର ହେଉଛି ଏହାକୁ ଏପରି କିଛି ପାଇଁ ବ୍ୟୟ କରିବା ଯାହା ଏହାଠାରୁ ଅଧିକ ସମୟ ରହିବ।\""
            )}
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mt-3">
           . William James
          </p>
        </div>
      </section>

      {/* ===== WAYS TO GIVE ===== */}
      <section className="py-14 md:py-20 bg-[#FAFAFA]">
        <div className="container max-w-5xl">
          <AnimatedSection className="text-center mb-16">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
              {t("OPTIONS", "ବିକଳ୍ପ")}
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-3">
              {t("Ways to Leave Your Legacy", "ଆପଣଙ୍କ ଉତ୍ତରାଧିକାର ଛାଡ଼ିବାର ଉପାୟ")}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#F5A623] to-[#1A1A1A] mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WAYS_TO_GIVE.map((way, i) => (
              <AnimatedSection key={way.title} delay={i * 0.08}>
                <div className="bg-[#FAFAFA] p-6 rounded-lg border border-gray-100 h-full">
                  <div className="w-12 h-12 rounded-full bg-[#F5A623]/10 flex items-center justify-center mb-4">
                    <way.icon size={22} className="text-[#F5A623]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-2">{t(way.title, way.titleOd)}</h3>
                  <p className="font-sans text-[16px] text-[#555] leading-relaxed">{t(way.desc, way.descOd)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-14 md:py-20 bg-[#FAFAFA]">
        <div className="container max-w-4xl">
          <AnimatedSection className="text-center mb-10">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
              {t("PROCESS", "ପ୍ରକ୍ରିୟା")}
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-3">
              {t("How Legacy Giving Works", "ଉତ୍ତରାଧିକାର ଦାନ କିପରି କାର୍ଯ୍ୟ କରେ")}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#F5A623] to-[#1A1A1A] mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: t("Express Interest", "ଆଗ୍ରହ ପ୍ରକାଶ"), desc: t("Contact us to discuss your intentions and preferred giving method.", "ଆପଣଙ୍କ ଉଦ୍ଦେଶ୍ୟ ଓ ପସନ୍ଦିତ ଦାନ ପଦ୍ଧତି ବିଷୟରେ ଆମ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।") },
              { step: "02", title: t("Consult Advisor", "ପରାମର୍ଶଦାତାଙ୍କ ସହ ପରାମର୍ଶ"), desc: t("Work with your legal/financial advisor to structure the gift.", "ଦାନ ସଂରଚନା ପାଇଁ ଆପଣଙ୍କ ଆଇନ/ଆର୍ଥିକ ପରାମର୍ଶଦାତାଙ୍କ ସହ କାର୍ଯ୍ୟ କରନ୍ତୁ।") },
              { step: "03", title: t("Formalize", "ଆନୁଷ୍ଠାନିକ"), desc: t("Complete the legal documentation with our support team.", "ଆମ ସହାୟତା ଦଳ ସହ ଆଇନଗତ ଦଲିଲ ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ।") },
              { step: "04", title: t("Your Legacy Lives", "ଆପଣଙ୍କ ଉତ୍ତରାଧିକାର ବଞ୍ଚେ"), desc: t("Your gift creates impact for generations, in your name, forever.", "ଆପଣଙ୍କ ଦାନ ପିଢ଼ି ପିଢ଼ି ପ୍ରଭାବ ସୃଷ୍ଟି କରେ, ଆପଣଙ୍କ ନାಮରେ, ସର୍ବଦା।") },
            ].map((s) => (
              <AnimatedSection key={s.step}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F5A623]/20 flex items-center justify-center mx-auto mb-3">
                    <span className="font-mono text-[16px] font-bold text-[#F5A623]">{s.step}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-1">{s.title}</h3>
                  <p className="font-sans text-[12px] text-[#555] leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="py-14 md:py-20 bg-[#FAFAFA]">
        <div className="container max-w-3xl text-center">
          <AnimatedSection>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4">
              {t("Ready to Discuss Your Legacy?", "ଆପଣଙ୍କ ଉତ୍ତରାଧିକାର ବିଷୟରେ ଆଲୋଚନା ପାଇଁ ପ୍ରସ୍ତୁତ?")}
            </h2>
            <p className="font-sans text-[16px] text-[#555] mb-8 max-w-lg mx-auto">
              {t(
                "Our founder personally handles all legacy giving conversations. Everything is confidential and there is absolutely no obligation.",
                "ଆମ ପ୍ରତିଷ୍ଠାତା ବ୍ୟକ୍ତିଗତ ଭାବରେ ସମସ୍ତ ଉତ୍ତରାଧିକାର ଦାନ ବାର୍ତ୍ତାଳାପ ପରିଚାଳନା କରନ୍ତି। ସବୁକିଛି ଗୋପନୀୟ ଓ କୌଣସି ବାଧ୍ୟବାଧକତା ନାହିଁ।"
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:info@abhiarafoundation.org?subject=Legacy Giving Inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[11px] tracking-[0.15em] uppercase font-bold rounded-lg hover:bg-[#E8960E] transition-colors"
              >
                <Mail size={14} /> {t("EMAIL US", "ଇମେଲ କରନ୍ତୁ")}
              </a>
              <a
                href="https://wa.me/919938938321?text=I'm interested in legacy giving to Abhiara Foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#F5A623] text-[#F5A623] font-mono text-[11px] tracking-[0.15em] uppercase font-bold rounded-lg hover:bg-[#1A1A1A]/5 transition-colors"
              >
                <Phone size={14} /> {t("WHATSAPP", "ୱାଟ୍ସଆପ")}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== OTHER WAYS ===== */}
      <section className="py-10 md:py-12 bg-[#FAFAFA]">
        <div className="container max-w-4xl text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#888] mb-4">
            {t("OTHER WAYS TO SUPPORT", "ସମର୍ଥନର ଅନ୍ୟ ଉପାୟ")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/donate" className="px-5 py-2 border border-gray-200 text-[#555] font-mono text-[10px] tracking-wider uppercase rounded-lg hover:border-[#F5A623] hover:text-[#F5A623] transition-colors">
              {t("Donate Now", "ଏବେ ଦାନ")}
            </Link>
            <Link href="/sponsor" className="px-5 py-2 border border-gray-200 text-[#555] font-mono text-[10px] tracking-wider uppercase rounded-lg hover:border-[#F5A623] hover:text-[#F5A623] transition-colors">
              {t("Sponsor a Child", "ଶିଶୁ ପ୍ରାୟୋଜନ")}
            </Link>
            <Link href="/donate-in-memory" className="px-5 py-2 border border-gray-200 text-[#555] font-mono text-[10px] tracking-wider uppercase rounded-lg hover:border-[#F5A623] hover:text-[#F5A623] transition-colors">
              {t("Donate in Memory", "ସ୍ମୃତିରେ ଦାନ")}
            </Link>
            <Link href="/csr-partners" className="px-5 py-2 border border-gray-200 text-[#555] font-mono text-[10px] tracking-wider uppercase rounded-lg hover:border-[#F5A623] hover:text-[#F5A623] transition-colors">
              {t("CSR Partnership", "CSR ସହଭାଗିତା")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
