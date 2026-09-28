/**
 * Celebrate With Purpose. Public Donor Wall for Occasion Donations
 * Shows all donors who opted to display their occasion donations publicly.
 * Includes donor name, celebrant, occasion type, date, and wishing message.
 * Designed to inspire others to celebrate their special moments with purpose.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  Heart, Gift, Cake, PartyPopper, GraduationCap, Sparkles,
  ArrowRight, Calendar, Users, Star, Bell,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

/* ─── Helpers ─── */

function occasionIcon(occasion: string) {
  switch (occasion) {
    case "birthday": return Cake;
    case "anniversary": return Heart;
    case "wedding": return PartyPopper;
    case "graduation": return GraduationCap;
    case "promotion": return Star;
    case "diwali": return Sparkles;
    default: return Gift;
  }
}

function occasionLabel(occasion: string): string {
  switch (occasion) {
    case "birthday": return "Birthday";
    case "anniversary": return "Anniversary";
    case "wedding": return "Wedding";
    case "graduation": return "Graduation";
    case "promotion": return "Promotion";
    case "diwali": return "Diwali";
    default: return "Special Occasion";
  }
}

function occasionLabelOd(occasion: string): string {
  switch (occasion) {
    case "birthday": return "ଜନ୍ମଦିନ";
    case "anniversary": return "ବାର୍ଷିକୀ";
    case "wedding": return "ବିବାହ";
    case "graduation": return "ସ୍ନାତକ";
    case "promotion": return "ପଦୋନ୍ନତି";
    case "diwali": return "ଦୀପାବଳୀ";
    default: return "ବିଶେଷ ଅବସର";
  }
}

function causeLabel(cause: string): string {
  switch (cause) {
    case "education": return "Education";
    case "elderly_care": return "Elderly Care";
    case "vidyapeeth": return "Vidyapeeth";
    case "medical_emergency": return "Medical Emergency";
    default: return "General Fund";
  }
}

function causeColor(cause: string): string {
  switch (cause) {
    case "education": return "bg-blue-100 text-blue-700";
    case "elderly_care": return "bg-purple-100 text-purple-700";
    case "vidyapeeth": return "bg-teal-100 text-teal-700";
    case "medical_emergency": return "bg-red-100 text-red-700";
    default: return "bg-amber-100 text-amber-700";
  }
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
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

/* ─── No fake/sample data. only real celebrations from database ─── */
const sampleCelebrations: any[] = [];

export default function CelebrateWithPurpose() {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { data: entries } = trpc.celebrateWall.getEntries.useQuery();

  const celebrations = entries && entries.length > 0 ? entries : sampleCelebrations;
  const isSample = !entries || entries.length === 0;

  const filtered = filter === "all" ? celebrations : celebrations.filter((c: any) => c.occasion === filter);
  const displayed = showAll ? filtered : filtered.slice(0, 6);

  const totalAmount = celebrations.reduce((sum: number, c: any) => sum + (c.isAmountAnonymous ? 0 : (c.amount || 0)), 0);
  const uniqueDonors = new Set(celebrations.map((c: any) => c.donorName)).size;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title={t("Celebrate With Purpose, Abhiara Foundation", "ଉଦ୍ଦେଶ୍ୟ ସହ ଉତ୍ସବ, ଅଭିଆରା ଫାଉଣ୍ଡେସନ")}
        description={t(
          "People who donated on their birthdays, anniversaries, and other special days. Their celebration helped a child or an elder.",
          "ଲୋକମାନେ କିପରି ସେମାନଙ୍କ ବିଶେଷ ମୁହୂର୍ତ୍ତକୁ ଦୟାର କାର୍ଯ୍ୟରେ ପରିଣତ କରୁଛନ୍ତି ଦେଖନ୍ତୁ।"
        )}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23F57C00' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }} />
        <div className="relative z-10 container text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
            {t("CELEBRATE WITH PURPOSE", "ଉଦ୍ଦେଶ୍ୟ ସହ ଉତ୍ସବ")}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {t("Every Celebration", "ପ୍ରତ୍ୟେକ ଉତ୍ସବ")}{" "}
            <span className="text-[#F5A623]">{t("Can Help Someone", "ଆଶାର ଉପହାର ହୁଏ")}</span>
          </h1>
          <p className="font-sans text-[17px] text-[#555] max-w-lg mx-auto mb-8">
            {t(
              "These people celebrated their birthdays, anniversaries, and milestones by donating to education and elderly care. Here are their names and stories.",
              "ଏହି ଉଦାର ଆତ୍ମାମାନେ ସେମାନଙ୍କ ଜନ୍ମଦିନ, ବାର୍ଷିକୀ ଓ ମାଇଲଖୁଣ୍ଟ ଶିକ୍ଷା, ସେବା ଓ ମର୍ଯ୍ୟାଦାର ଉପହାର ଦେଇ ଉତ୍ସବ ପାଳନ କରିବାକୁ ବାଛିଲେ।"
            )}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-12">
            <div className="text-center">
              <p className="font-serif text-2xl md:text-3xl font-bold text-[#F5A623]">
                {celebrations.length}
              </p>
              <p className="font-mono text-[9px] tracking-wider uppercase text-[#666] mt-1">
                {t("Celebrations", "ଉତ୍ସବ")}
              </p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="font-serif text-2xl md:text-3xl font-bold text-[#F5A623]">
                {uniqueDonors}
              </p>
              <p className="font-mono text-[9px] tracking-wider uppercase text-[#666] mt-1">
                {t("Donors", "ଦାତା")}
              </p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="font-serif text-2xl md:text-3xl font-bold text-[#F5A623]">
                ₹{totalAmount.toLocaleString("en-IN")}
              </p>
              <p className="font-mono text-[9px] tracking-wider uppercase text-[#666] mt-1">
                {t("Raised", "ସଂଗ୍ରହ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FILTER BAR ===== */}
      <section className="py-4 bg-[#FAFAFA] border-b border-gray-100 sticky top-[132px] lg:top-[152px] z-20">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All", labelOd: "ସବୁ" },
              { id: "birthday", label: "Birthdays", labelOd: "ଜନ୍ମଦିନ" },
              { id: "anniversary", label: "Anniversaries", labelOd: "ବାର୍ଷିକୀ" },
              { id: "wedding", label: "Weddings", labelOd: "ବିବାହ" },
              { id: "graduation", label: "Graduations", labelOd: "ସ୍ନାତକ" },
              { id: "diwali", label: "Festivals", labelOd: "ଉତ୍ସବ" },
              { id: "other", label: "Other", labelOd: "ଅନ୍ୟ" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => { setFilter(f.id); setShowAll(false); }}
                className={`px-4 py-2 rounded-full font-mono text-[10px] tracking-wider uppercase font-bold transition-all ${
                  filter === f.id
                    ? "bg-[#F5A623] text-[#1A1A1A] shadow-md"
                    : "bg-white text-[#555] border border-gray-200 hover:border-[#F5A623]/50"
                }`}
              >
                {t(f.label, f.labelOd)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CELEBRATIONS GRID ===== */}
      <section className="py-10 md:py-14 bg-[#FAFAFA]">
        <div className="container">
          {isSample && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-6 py-8 mb-6 text-center">
              <p className="font-sans text-[14px] text-amber-800">
                {t(
                  "No celebrations yet. Be the first to celebrate a special occasion with purpose!",
                  "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଉତ୍ସବ ନାହିଁ୤ ଉଦ୍ଦେଶ୍ୟ ସହ ଏକ ବିଶେଷ ଅବସର ଉଦଯାପନ କରିବା ପାଇଁ ପ୍ରଥମ ହୁଅନ୍ତୁ!"
                )}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayed.map((celebration: any, i: number) => {
              const OccIcon = occasionIcon(celebration.occasion);
              return (
                <AnimatedSection key={celebration.id || i} delay={i * 0.05}>
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                    {/* Card Header. Occasion badge */}
                    <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-[#F5A623]/10 flex items-center justify-center">
                          <OccIcon size={18} className="text-[#F5A623]" />
                        </div>
                        <div>
                          <p className="font-serif text-[17px] font-bold text-[#1A1A1A]">
                            {celebration.celebrantName}
                          </p>
                          <p className="font-mono text-[9px] tracking-wider uppercase text-[#888]">
                            {t(occasionLabel(celebration.occasion), occasionLabelOd(celebration.occasion))}
                            {celebration.occasionDate && ` · ${formatDate(celebration.occasionDate)}`}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full font-mono text-[8px] tracking-wider uppercase ${causeColor(celebration.cause)}`}>
                        {causeLabel(celebration.cause)}
                      </span>
                    </div>

                    {/* Wishing Message */}
                    {celebration.wishingMessage && (
                      <div className="px-5 pb-3">
                        <p className="font-serif text-[16px] italic text-[#555] leading-relaxed line-clamp-3">
                          "{celebration.wishingMessage}"
                        </p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="mt-auto px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="font-sans text-[12px] font-medium text-[#333]">
                          {celebration.donorName}
                        </p>
                        {celebration.relationship && (
                          <p className="font-mono text-[9px] text-[#888]">
                            {celebration.relationship}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-serif text-[17px] font-bold text-[#F5A623]">
                          {celebration.isAmountAnonymous ? t("Amount Private", "ରାଶି ଗୋପନୀୟ") : `₹${celebration.amount.toLocaleString("en-IN")}`}
                        </p>
                        <p className="font-mono text-[8px] text-[#aaa]">
                          {timeAgo(celebration.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Show More */}
          {filtered.length > 6 && !showAll && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="px-6 py-2.5 bg-white border border-gray-200 rounded-lg font-mono text-[10px] tracking-wider uppercase font-bold text-[#555] hover:border-[#F5A623] hover:text-[#F5A623] transition-all"
              >
                {t("Show All Celebrations", "ସମସ୍ତ ଉତ୍ସବ ଦେଖନ୍ତୁ")} ({filtered.length})
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA. Celebrate Your Occasion ===== */}
      <section className="py-14 md:py-20 bg-[#FAFAFA]">
        <div className="container text-center">
          <AnimatedSection>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
              {t("YOUR TURN", "ଆପଣଙ୍କ ପାଳି")}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              {t("Celebrate Your Next Milestone", "ଆପଣଙ୍କ ପରବର୍ତ୍ତୀ ମାଇଲଖୁଣ୍ଟ ଉତ୍ସବ ପାଳନ କରନ୍ତୁ")}{" "}
              <span className="text-[#F5A623]">{t("With Purpose", "ଉଦ୍ଦେଶ୍ୟ ସହ")}</span>
            </h2>
            <p className="font-sans text-[17px] text-[#555] max-w-lg mx-auto mb-8">
              {t(
                "Instead of gifts, give the gift of education, care, and dignity. Register your birthday, anniversary, or any special occasion and make it count.",
                "ଉପହାର ବଦଳରେ ଶିକ୍ଷା, ସେବା ଓ ମର୍ଯ୍ୟାଦାର ଉପହାର ଦିଅନ୍ତୁ। ଆପଣଙ୍କ ଜନ୍ମଦିନ, ବାର୍ଷିକୀ ବା ଯେକୌଣସି ବିଶେଷ ଅବସର ପଞ୍ଜୀକରଣ କରନ୍ତୁ।"
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/donate-for-occasion"
                className="px-8 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors flex items-center gap-2"
              >
                {t("CELEBRATE & GIVE", "ଉତ୍ସବ ପାଳନ ଓ ଦାନ")} <ArrowRight size={12} />
              </Link>
              <Link
                href="/donate"
                className="px-8 py-3 border border-white/20 text-[#333] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:border-[#F5A623]/50 hover:text-[#F5A623] transition-colors"
              >
                {t("DONATE DIRECTLY", "ସିଧାସଳଖ ଦାନ")}
              </Link>
            </div>
          </AnimatedSection>

          {/* Reminder Feature Highlight */}
          <AnimatedSection delay={0.1}>
            <div className="mt-12 max-w-md mx-auto bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#F5A623]/20 flex items-center justify-center">
                  <Bell size={20} className="text-[#F5A623]" />
                </div>
                <div className="text-left">
                  <p className="font-serif text-[17px] font-bold text-white">
                    {t("Auto-Reminder", "ସ୍ୱୟଂ-ସ୍ମାରକ")}
                  </p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-[#666]">
                    {t("Never miss a celebration", "କୌଣସି ଉତ୍ସବ ମିସ୍ କରନ୍ତୁ ନାହିଁ")}
                  </p>
                </div>
              </div>
              <p className="font-sans text-[13px] text-[#666] leading-relaxed">
                {t(
                  "When you donate for an occasion, opt-in for annual reminders. We'll remind you before the next birthday or anniversary so you can celebrate with purpose every year.",
                  "ଯେତେବେଳେ ଆପଣ ଏକ ଅବସର ପାଇଁ ଦାନ କରନ୍ତି, ବାର୍ଷିକ ସ୍ମାରକ ପାଇଁ ଅପ୍ଟ-ଇନ କରନ୍ତୁ। ଆମେ ଆପଣଙ୍କୁ ପରବର୍ତ୍ତୀ ଜନ୍ମଦିନ ବା ବାର୍ଷିକୀ ପୂର୍ବରୁ ସ୍ମରଣ କରାଇବୁ।"
                )}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
