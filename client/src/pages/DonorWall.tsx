/**
 * Donor Wall / Thank You Page
 * Shows recent supporters (anonymized), live donation counter,
 * and social proof to encourage more giving.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Heart, Users, Target, TrendingUp, ArrowRight, MessageSquare, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import CounterAnimation from "@/components/CounterAnimation";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

const EDUCATION_IMG = "/images/education-village-session.jpeg";
const ELDERLY_IMG = "/images/elderly-care-visit-1.jpeg";

function anonymizeName(name: string): string {
  if (!name || name.length < 3) return "A Supporter";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1][0]}.`;
  }
  return `${name.slice(0, 3)}***`;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

function causeLabel(cause: string): string {
  switch (cause) {
    case "education": return "Education";
    case "elderly_care": return "Elderly Care";
    case "vidyapeeth": return "Vidyapeeth";
    default: return "General Fund";
  }
}

function causeColor(cause: string): string {
  switch (cause) {
    case "education": return "bg-blue-100 text-blue-700";
    case "elderly_care": return "bg-purple-100 text-purple-700";
    case "vidyapeeth": return "bg-teal-100 text-teal-700";
    default: return "bg-amber-100 text-amber-700";
  }
}

export default function DonorWall() {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { data: entries } = trpc.donorWall.getEntries.useQuery();
  const { data: stats } = trpc.donorWall.getStats.useQuery();

  // Only show real donations from the database. no fake/sample data
  const displayDonors = (entries && entries.length > 0) ? entries : [];
  const visibleDonors = showAll ? displayDonors : displayDonors.slice(0, 8);

  const totalAmount = stats?.totalAmount || 0;
  const totalDonors = stats?.totalDonors || 0;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title={t("Donor Wall, Abhiara Foundation", "ଦାତା ଦେୱାଲ, ଅଭିଆରା ଫାଉଣ୍ଡେସନ")}
        description="See the generous supporters who are making a difference. Every donation counts."
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-white pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={EDUCATION_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/90 to-[#111111]" />
        <div className="relative z-10 container text-center">
          <p className="section-label text-[#F5A623] mb-3">{t("THANK YOU", "ଧନ୍ୟବାଦ")}</p>
          <h1 className="heading-xl text-[#1A1A1A] mb-4">
            {t("Our Wall of Gratitude", "ଆମର କୃତଜ୍ଞତା ଦେୱାଲ")}
          </h1>
          <p className="font-sans text-[17px] text-[#555] max-w-lg mx-auto leading-relaxed">
            {t(
              "Every name here is someone who chose to help. Thank you.",
              "ଏଠାରେ ପ୍ରତ୍ୟେକ ନାମ ଏକ ହୃଦୟକୁ ପ୍ରତିନିଧିତ୍ୱ କରେ ଯାହା ପରିବର୍ତ୍ତନ ଆଣିବାକୁ ବାଛିଲା।"
            )}
          </p>
        </div>
      </section>

      {/* Live Stats Counter */}
      <section className="py-12 bg-[#FAFAFA] border-b border-gray-100">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#F5A623]/10 flex items-center justify-center">
                <Users size={22} className="text-[#F5A623]" />
              </div>
              <p className="font-serif text-3xl font-bold text-[#1A1A1A]">
                <CounterAnimation end={totalDonors} suffix="+" />
              </p>
              <p className="font-mono text-[10px] tracking-wider uppercase text-gray-500 mt-1">
                {t("Total Donors", "ମୋଟ ଦାତା")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#1A1A1A]/10 flex items-center justify-center">
                <Heart size={22} className="text-[#F5A623]" />
              </div>
              <p className="font-serif text-3xl font-bold text-[#1A1A1A]">
                ₹<CounterAnimation end={Math.round(totalAmount / 1000)} suffix="K" />
              </p>
              <p className="font-mono text-[10px] tracking-wider uppercase text-gray-500 mt-1">
                {t("Total Raised", "ମୋଟ ସଂଗ୍ରହ")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-100 flex items-center justify-center">
                <Target size={22} className="text-amber-600" />
              </div>
              <p className="font-serif text-3xl font-bold text-[#1A1A1A]">
                <CounterAnimation end={500} suffix="+" />
              </p>
              <p className="font-mono text-[10px] tracking-wider uppercase text-gray-500 mt-1">
                {t("Lives Impacted", "ପ୍ରଭାବିତ ଜୀବନ")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp size={22} className="text-purple-600" />
              </div>
              <p className="font-serif text-3xl font-bold text-[#1A1A1A]">
                <CounterAnimation end={3} suffix="" />
              </p>
              <p className="font-mono text-[10px] tracking-wider uppercase text-gray-500 mt-1">
                {t("Districts Covered", "ଜିଲ୍ଲା ଆଚ୍ଛାଦିତ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Wall Grid */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="container">
          <AnimatedSection className="text-center mb-10">
            <h2 className="heading-lg text-[#1A1A1A] mb-2">
              {t("Recent Supporters", "ସାମ୍ପ୍ରତିକ ସମର୍ଥକ")}
            </h2>
            <p className="font-sans text-[16px] text-gray-600">
              {t("Names are partially anonymized to protect donor privacy", "ଦାତାଙ୍କ ଗୋପନୀୟତା ସୁରକ୍ଷା ପାଇଁ ନାମ ଆଂଶିକ ଭାବରେ ଲୁକ୍କାୟିତ")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {visibleDonors.map((donor, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5A623]/20 to-[#1A1A1A]/20 flex items-center justify-center">
                      <Heart size={16} className="text-[#F5A623]" />
                    </div>
                    <span className="font-mono text-[9px] text-gray-400">
                      {timeAgo(String(donor.createdAt))}
                    </span>
                  </div>
                  <p className="font-serif text-[17px] font-semibold text-[#1A1A1A] mb-1">
                    {anonymizeName(donor.donorName)}
                  </p>
                  <p className="font-serif text-lg font-bold text-[#F5A623] mb-2">
                    ₹{donor.amount.toLocaleString("en-IN")}
                  </p>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider ${causeColor(donor.cause)}`}>
                    {causeLabel(donor.cause)}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {displayDonors.length > 8 && !showAll && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="font-mono text-[11px] tracking-wider uppercase text-[#F5A623] hover:text-[#1A1A1A] transition-colors"
              >
                VIEW ALL {displayDonors.length} SUPPORTERS →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Impact Quote */}
      <section className="py-12 bg-[#FAFAFA]">
        <div className="container text-center">
          <AnimatedSection>
            <p className="font-serif italic text-xl md:text-2xl text-[#F5A623] max-w-2xl mx-auto leading-relaxed">
              {t(
                "\"No act of kindness, no matter how small, is ever wasted.\"",
                "\"କୌଣସି ଦୟାର କାର୍ଯ୍ୟ, ଯେତେ ଛୋଟ ହେଉ ନା କାହିଁକି, କେବେ ବ୍ୟର୍ଥ ହୁଏ ନାହିଁ।\""
              )}
            </p>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#666] mt-4">
             . Aesop
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* How Your Donation Helps */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="container">
          <AnimatedSection className="text-center mb-10">
            <h2 className="heading-lg text-[#1A1A1A] mb-2">
              {t("Where Your Money Goes", "ଆପଣଙ୍କ ଟଙ୍କା କେଉଁଠି ଯାଏ")}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <AnimatedSection delay={0.05}>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                  <img src={EDUCATION_IMG} alt="Education" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-2">Education</h3>
                <p className="font-sans text-[13px] text-gray-600 leading-relaxed">
                  Digital learning centres, scholarships, and school supplies for children in Kendrapara, Koraput & Kalahandi districts.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                  <img src={ELDERLY_IMG} alt="Elderly Care" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-2">Elderly Care</h3>
                <p className="font-sans text-[13px] text-gray-600 leading-relaxed">
                  Companion visits, health camps, legal aid, and dignity support for abandoned elders in Mumbai & Odisha.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-[#1A1A1A]/10 flex items-center justify-center">
                  <Target size={28} className="text-[#F5A623]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-2">Community</h3>
                <p className="font-sans text-[13px] text-gray-600 leading-relaxed">
                  Water camps, health awareness drives, and infrastructure development across rural Odisha villages.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#F5A623] to-[#E65100]">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              {t("Join Our Wall of Gratitude", "ଆମର କୃତଜ୍ଞତା ଦେୱାଲରେ ଯୋଗ ଦିଅନ୍ତୁ")}
            </h2>
            <p className="font-sans text-[17px] text-[#1A1A1A]/70 max-w-lg mx-auto mb-8">
              {t(
                "Whether you want to partner, volunteer, or simply learn more. we would love to hear from you.",
                "ଆପଣ ସହଭାଗୀ ହେବାକୁ, ସ୍ୱେଚ୍ଛାସେବୀ ହେବାକୁ, କିମ୍ବା କେବଳ ଅଧିକ ଜାଣିବାକୁ ଚାହାନ୍ତି, ଆମେ ଆପଣଙ୍କ ଠାରୁ ଶୁଣିବାକୁ ଭଲ ପାଇବୁ।"
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/donate"
                className="px-8 py-3 bg-[#111111] text-white font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#111111]/90 transition-colors flex items-center gap-2"
              >
                DONATE NOW <ArrowRight size={14} />
              </Link>
              <a
                href="mailto:info@abhiarafoundation.org"
                className="px-8 py-3 border-2 border-[#111111] text-[#1A1A1A] font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#111111] hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail size={14} /> EMAIL US
              </a>
              <a
                href="https://wa.me/919938938321?text=Hi%20Abhiara%20Foundation%2C%20I%20would%20like%20to%20know%20more%20about%20your%20work."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-[#111111] text-[#1A1A1A] font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-colors flex items-center gap-2"
              >
                <MessageSquare size={14} /> WHATSAPP
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
