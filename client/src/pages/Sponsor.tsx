/**
 * Abhiara Foundation, Sponsor a Child / Programme
 * Sponsorship tiers for children and programmes with impact tracking
 * Sections: Hero, Sponsorship Tiers, How It Works, Impact Stories, FAQ, CTA
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight, Heart, BookOpen, GraduationCap, Users, Check,
  Shield, Star, Clock, Gift, HeartHandshake, Building2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

/* ─── CDN Images ─── */
const HERO_IMG = "/images/education-outdoor-session.jpeg";
const CHILD_IMG = "/images/education-classroom-session.jpeg";
const ELDER_IMG = "/images/elderly-care-meal.jpeg";
const CLASSROOM_IMG = "/images/education-classroom-teaching.jpeg";

/* ─── Sponsorship Tiers ─── */
const TIERS = [
  {
    id: "child-basic",
    icon: BookOpen,
    nameEn: "Sponsor a Child's Education",
    nameOd: "ଏକ ଶିଶୁର ଶିକ୍ଷା ପ୍ରାୟୋଜିତ",
    amountMonthly: 1000,
    amountYearly: 12000,
    color: "#F5A623",
    impactEn: [
      "School supplies & stationery for 1 year",
      "Uniforms and school bag",
      "Monthly progress reports",
      "Direct connection with the child",
    ],
    impactOd: [
      "୧ ବର୍ଷ ପାଇଁ ବିଦ୍ୟାଳୟ ସାମଗ୍ରୀ",
      "ୟୁନିଫର୍ମ ଓ ସ୍କୁଲ ବ୍ୟାଗ",
      "ମାସିକ ଅଗ୍ରଗତି ରିପୋର୍ଟ",
      "ଶିଶୁ ସହ ସିଧା ସଂଯୋଗ",
    ],
    popular: false,
  },
  {
    id: "child-full",
    icon: GraduationCap,
    nameEn: "Full Child Sponsorship",
    nameOd: "ସମ୍ପୂର୍ଣ୍ଣ ଶିଶୁ ପ୍ରାୟୋଜନ",
    amountMonthly: 2500,
    amountYearly: 30000,
    color: "#F5A623",
    impactEn: [
      "Everything in Basic + Tuition fees",
      "Remedial classes & digital learning",
      "Health check-ups & nutrition support",
      "Annual family visit & photo update",
    ],
    impactOd: [
      "ମୌଳିକ + ଟ୍ୟୁସନ ଫି ସବୁକିଛି",
      "ଟ୍ୟୁସନ କ୍ଲାସ ଓ ଡିଜିଟାଲ ଶିକ୍ଷା",
      "ସ୍ୱାସ୍ଥ୍ୟ ପରୀକ୍ଷା ଓ ପୋଷଣ ସହାୟତା",
      "ବାର୍ଷିକ ପରିବାର ପରିଦର୍ଶନ ଓ ଫଟୋ",
    ],
    popular: true,
  },
  {
    id: "elder-care",
    icon: HeartHandshake,
    nameEn: "Sponsor an Elder's Care",
    nameOd: "ଏକ ବୟସ୍କଙ୍କ ସେବା ପ୍ରାୟୋଜିତ",
    amountMonthly: 2000,
    amountYearly: 24000,
    color: "#F5A623",
    impactEn: [
      "Monthly nutrition & essentials kit",
      "Quarterly health check-ups",
      "Companion visits & emotional support",
      "Legal aid for pension & property rights",
    ],
    impactOd: [
      "ମାସିକ ପୋଷଣ ଓ ଆବଶ୍ୟକୀୟ କିଟ",
      "ତ୍ରୈମାସିକ ସ୍ୱାସ୍ଥ୍ୟ ପରୀକ୍ଷା",
      "ସାଥୀ ପରିଦର୍ଶନ ଓ ଭାବନାତ୍ମକ ସହାୟତା",
      "ପେନସନ ଓ ସମ୍ପତ୍ତି ଅଧିକାର ପାଇଁ ଆଇନ ସହାୟତା",
    ],
    popular: false,
  },
  {
    id: "classroom",
    icon: Building2,
    nameEn: "Sponsor a Classroom",
    nameOd: "ଏକ ଶ୍ରେଣୀ ଗୃହ ପ୍ରାୟୋଜିତ",
    amountMonthly: 10000,
    amountYearly: 120000,
    color: "#F5A623",
    impactEn: [
      "Full classroom setup for 30 children",
      "Teaching materials & digital tools",
      "Trained volunteer teacher for 1 year",
      "Named classroom with your recognition",
    ],
    impactOd: [
      "୩୦ ଶିଶୁ ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ ଶ୍ରେଣୀ ସେଟଅପ",
      "ଶିକ୍ଷା ସାମଗ୍ରୀ ଓ ଡିଜିଟାଲ ଉପକରଣ",
      "୧ ବର୍ଷ ପାଇଁ ପ୍ରଶିକ୍ଷିତ ସ୍ୱେଚ୍ଛାସେବୀ ଶିକ୍ଷକ",
      "ଆପଣଙ୍କ ସ୍ୱୀକୃତି ସହ ନାମିତ ଶ୍ରେଣୀ",
    ],
    popular: false,
  },
];

const STEPS = [
  { icon: Gift, titleEn: "Choose a Plan", titleOd: "ଏକ ଯୋଜନା ବାଛନ୍ତୁ", descEn: "Select a sponsorship tier that matches your giving capacity.", descOd: "ଆପଣଙ୍କ ଦାନ କ୍ଷମତା ସହ ମେଳ ଖାଉଥିବା ଏକ ପ୍ରାୟୋଜନ ସ୍ତର ବାଛନ୍ତୁ।" },
  { icon: Heart, titleEn: "We Match You", titleOd: "ଆମେ ଆପଣଙ୍କୁ ମେଳ କରୁ", descEn: "We connect you with a child or elder who needs your support the most.", descOd: "ଆମେ ଆପଣଙ୍କୁ ସବୁଠାରୁ ଅଧିକ ସହାୟତା ଆବଶ୍ୟକ କରୁଥିବା ଶିଶୁ ବା ବୟସ୍କଙ୍କ ସହ ସଂଯୋଗ କରୁ।" },
  { icon: Clock, titleEn: "Regular Updates", titleOd: "ନିୟମିତ ଅପଡେଟ", descEn: "Receive monthly progress reports, photos, and milestone updates.", descOd: "ମାସିକ ଅଗ୍ରଗତି ରିପୋର୍ଟ, ଫଟୋ, ଓ ମାଇଲଖୁଣ୍ଟ ଅପଡେଟ ପାଆନ୍ତୁ।" },
  { icon: Star, titleEn: "See the Impact", titleOd: "ପ୍ରଭାବ ଦେଖନ୍ତୁ", descEn: "Watch your sponsored child grow or your elder thrive with dignity.", descOd: "ଆପଣଙ୍କ ପ୍ରାୟୋଜିତ ଶିଶୁର ବୃଦ୍ଧି ବା ବୟସ୍କଙ୍କ ସମ୍ମାନଜନକ ଜୀବନ ଦେଖନ୍ତୁ।" },
];

export default function Sponsor() {
  const { language, t } = useLanguage();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title="Sponsor a Child, Abhiara Foundation"
        description="Sponsor a child's education, an elder's care, or an entire classroom. Your monthly support creates lasting change."
        url="https://abhiarafoundation.org/sponsor"
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-28 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#111111]/75" />
        </div>
        <div className="relative z-10 container text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-4">
            {t("CHANGE A LIFE FOREVER", "ଏକ ଜୀବନ ସଦାପାଇଁ ବଦଳାନ୍ତୁ")}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t("Sponsor a Child. Sponsor Hope.", "ଏକ ଶିଶୁକୁ ପ୍ରାୟୋଜିତ କରନ୍ତୁ। ଆଶା ପ୍ରାୟୋଜିତ କରନ୍ତୁ।")}
          </h1>
          <p className="font-sans text-white/70 text-lg max-w-xl mx-auto mb-6">
            {t(
              "Your monthly support gives a child education, an elder dignity, and a community hope. Start from just ₹1,000/month.",
              "ଆପଣଙ୍କ ମାସିକ ସହାୟତା ଏକ ଶିଶୁକୁ ଶିକ୍ଷା, ଏକ ବୟସ୍କଙ୍କୁ ସମ୍ମାନ, ଓ ଏକ ସମ୍ପ୍ରଦାୟକୁ ଆଶା ଦିଏ। ମାତ୍ର ₹୧,୦୦୦/ମାସରୁ ଆରମ୍ଭ କରନ୍ତୁ।"
            )}
          </p>
          <a
            href="#tiers"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors"
          >
            {t("VIEW SPONSORSHIP PLANS", "ପ୍ରାୟୋଜନ ଯୋଜନା ଦେଖନ୍ତୁ")} <ArrowRight size={12} />
          </a>
        </div>
      </section>

      {/* ===== SPONSORSHIP TIERS ===== */}
      <section id="tiers" className="py-14 md:py-18 bg-[#FAFAFA]">
        <div className="container max-w-6xl">
          <AnimatedSection className="text-center mb-10">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
              {t("SPONSORSHIP PLANS", "ପ୍ରାୟୋଜନ ଯୋଜନା")}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              {t("Choose How You Want to Help", "ଆପଣ କିପରି ସାହାଯ୍ୟ କରିବାକୁ ଚାହାନ୍ତି ବାଛନ୍ତୁ")}
            </h2>
            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 bg-white rounded-full p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all ${
                  billing === "monthly" ? "bg-[#111111] text-white" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t("MONTHLY", "ମାସିକ")}
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all ${
                  billing === "yearly" ? "bg-[#111111] text-white" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t("YEARLY", "ବାର୍ଷିକ")} <span className="text-amber-600 ml-1">{t("Save 2 months", "୨ ମାସ ସଞ୍ଚୟ")}</span>
              </button>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TIERS.map((tier) => {
              const Icon = tier.icon;
              const amount = billing === "monthly" ? tier.amountMonthly : tier.amountYearly;
              const impacts = language === "od" ? tier.impactOd : tier.impactEn;
              return (
                <AnimatedSection key={tier.id}>
                  <div className={`relative bg-white rounded-lg p-6 shadow-sm border h-full flex flex-col ${
                    tier.popular ? "border-[#F5A623] ring-2 ring-[#F5A623]/20" : "border-gray-200"
                  }`}>
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
                        {t("MOST POPULAR", "ସର୍ବାଧିକ ଲୋକପ୍ରିୟ")}
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${tier.color}15` }}>
                        <Icon size={20} style={{ color: tier.color }} />
                      </div>
                      <h3 className="font-serif text-base font-bold text-[#1A1A1A]">
                        {language === "od" ? tier.nameOd : tier.nameEn}
                      </h3>
                    </div>
                    <div className="mb-4">
                      <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        ₹{amount.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-gray-500">/{billing === "monthly" ? t("month", "ମାସ") : t("year", "ବର୍ଷ")}</span>
                    </div>
                    <ul className="space-y-2 mb-6 flex-1">
                      {impacts.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/donate?amount=${amount}&cause=${tier.id.includes("elder") ? "elderly_care" : "shiksha_sathi"}`}
                      className={`w-full py-3 rounded-md text-center font-mono text-[10px] font-bold tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2 ${
                        tier.popular
                          ? "bg-[#1A1A1A] text-white hover:bg-[#111111]"
                          : "bg-[#111111] text-white hover:bg-[#111111]/90"
                      }`}
                    >
                      {t("SPONSOR NOW", "ଏବେ ପ୍ରାୟୋଜିତ କରନ୍ତୁ")} <ArrowRight size={12} />
                    </Link>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-14 md:py-18 bg-[#FAFAFA]">
        <div className="container max-w-5xl">
          <AnimatedSection className="text-center mb-10">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
              {t("HOW IT WORKS", "ଏହା କିପରି କାମ କରେ")}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              {t("Four Simple Steps", "ଚାରି ସରଳ ପଦକ୍ଷେପ")}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#FAFAFA] flex items-center justify-center relative">
                      <Icon size={24} className="text-[#F5A623]" />
                      <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#F5A623] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-2">
                      {language === "od" ? step.titleOd : step.titleEn}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {language === "od" ? step.descOd : step.descEn}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== IMPACT PHOTO STRIP ===== */}
      <section className="py-10 bg-[#FAFAFA]">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { img: CHILD_IMG, captionEn: "Education programme at Raisar, Kendrapara", captionOd: "ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ, ରାଏସର, କେନ୍ଦ୍ରାପଡ଼ା" },
              { img: ELDER_IMG, captionEn: "Elderly care at Hope is Life Old Age Home, Puri", captionOd: "ବୟସ୍କ ସେବା, ହୋପ ଇଜ୍ ଲାଇଫ୍, ପୁରୀ" },
              { img: CLASSROOM_IMG, captionEn: "Classroom session at Kendrapara, Odisha", captionOd: "ଶ୍ରେଣୀ ଗୃହ, କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="relative overflow-hidden rounded-md group">
                  <img src={item.img} alt="" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 font-mono text-[9px] tracking-wider uppercase text-[#333]">
                    {language === "od" ? item.captionOd : item.captionEn}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AKSHAYA PATRA QUOTE ===== */}
      <section className="py-10 bg-[#FAFAFA]">
        <div className="container max-w-3xl text-center">
          <blockquote className="font-serif italic text-xl md:text-2xl text-[#1A1A1A]/80 leading-relaxed mb-3">
            {t(
              '"No child in India shall be deprived of education because of hunger."',
              '"ଭାରତରେ କୌଣସି ଶିଶୁ କ୍ଷୁଧା ଯୋଗୁଁ ଶିକ୍ଷାରୁ ବଞ୍ଚିତ ହେବ ନାହିଁ।"'
            )}
          </blockquote>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#F5A623]">
            {t("INSPIRED BY AKSHAYA PATRA FOUNDATION", "ଅକ୍ଷୟ ପାତ୍ର ଫାଉଣ୍ଡେସନ ଦ୍ୱାରା ଅନୁପ୍ରାଣିତ")}
          </p>
        </div>
      </section>

      {/* ===== TRUST & TRANSPARENCY ===== */}
      <section className="py-10 bg-[#FAFAFA]">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Shield, labelEn: "Section 8 Company", labelOd: "ଧାରା ୮ କମ୍ପାନୀ" },
                { icon: Check, labelEn: "80G Tax Exemption (In Process)", labelOd: "80G ଟ୍ୟାକ୍ସ ଛାଡ଼ (ପ୍ରକ୍ରିୟାରେ)" },
                { icon: Users, labelEn: "Monthly Impact Reports", labelOd: "ମାସିକ ପ୍ରଭାବ ରିପୋର୍ଟ" },
                { icon: Heart, labelEn: "100% Mission-Bound", labelOd: "100% ମିସନ-ବାଧ୍ୟ" },
              ].map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div key={i} className="text-center p-4 rounded-lg bg-[#FAFAFA]">
                    <Icon size={20} className="text-[#F5A623] mx-auto mb-2" />
                    <p className="font-mono text-[9px] tracking-wider uppercase text-[#1A1A1A]/70">
                      {language === "od" ? badge.labelOd : badge.labelEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== GOLD CTA ===== */}
      <section className="py-14 md:py-18 bg-[#FAFAFA]">
        <div className="container max-w-3xl text-center">
          <AnimatedSection>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-4">
              {t("READY TO CHANGE A LIFE?", "ଏକ ଜୀବନ ବଦଳାଇବାକୁ ପ୍ରସ୍ତୁତ?")}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              {t("Every Child Deserves a Champion", "ପ୍ରତ୍ୟେକ ଶିଶୁ ଏକ ଚାମ୍ପିଅନ୍ ପାଇବା ଯୋଗ୍ୟ")}
            </h2>
            <p className="font-sans text-[#555] mb-8 max-w-lg mx-auto">
              {t(
                "Be the reason a child in Odisha goes to school tomorrow. Be the reason an elder smiles today.",
                "ଓଡ଼ିଶାର ଏକ ଶିଶୁ ଆସନ୍ତାକାଲି ସ୍କୁଲ ଯିବାର କାରଣ ହୁଅନ୍ତୁ। ଏକ ବୟସ୍କ ଆଜି ହସିବାର କାରଣ ହୁଅନ୍ତୁ।"
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#tiers"
                className="px-8 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors flex items-center gap-2"
              >
                {t("START SPONSORING", "ପ୍ରାୟୋଜନ ଆରମ୍ଭ କରନ୍ତୁ")} <Heart size={12} />
              </a>
              <Link
                href="/contact"
                className="px-8 py-3 border border-white/20 text-[#333] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:border-[#F5A623]/50 hover:text-[#F5A623] transition-colors"
              >
                {t("TALK TO US", "ଆମ ସହ କଥା ହୁଅନ୍ତୁ")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
