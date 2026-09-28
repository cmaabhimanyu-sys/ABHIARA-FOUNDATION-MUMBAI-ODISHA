/**
 * Abhiara Foundation, Donate in Memory of Someone You Love
 * Donate in memory of a loved one
 * Emotional tribute page: Hero → Tribute Details → Amount → Donor Details → e-Card Preview → Submit
 */
import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import {
  Heart, BookOpen, Users, GraduationCap, Flame, ArrowRight,
  Check, Shield, Send, ChevronDown, User, Calendar, MessageCircle,
  Mail, Phone, Download, Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

/* ─── CDN Images ─── */
const HERO_IMG = "/images/hero-dawn.webp";
const CHILDREN_IMG = "/images/education-outdoor-session.jpeg";
const ELDERLY_IMG = "/images/elderly-care-meal.jpeg";

/* ─── Constants ─── */
const PRESET_AMOUNTS = [1000, 2500, 5000, 10000, 25000, 50000];

const CAUSES = [
  { id: "general" as const, label: "Where Most Needed", labelOd: "ଯେଉଁଠାରେ ସବୁଠାରୁ ଆବଶ୍ୟକ", icon: Heart, color: "#F5A623" },
  { id: "education" as const, label: "Education for Children", labelOd: "ଶିଶୁମାନଙ୍କ ପାଇଁ ଶିକ୍ଷା", icon: BookOpen, color: "#F5A623" },
  { id: "elderly_care" as const, label: "Elderly Care & Dignity", labelOd: "ବୟସ୍କ ସେବା ଓ ସମ୍ମାନ", icon: Users, color: "#F5A623" },
  { id: "vidyapeeth" as const, label: "Abhiara Vidyapeeth", labelOd: "ଅଭିଆରା ବିଦ୍ୟାପୀଠ", icon: GraduationCap, color: "#F5A623" },
];

const RELATIONSHIPS = [
  "Mother", "Father", "Grandmother", "Grandfather",
  "Spouse", "Sibling", "Child", "Friend", "Teacher", "Mentor", "Other",
];

function getImpactText(amount: number, lang: string): string {
  if (amount >= 50000) return lang === "od" ? "ଏକ ସମ୍ପୂର୍ଣ୍ଣ ଗ୍ରାମ ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ ପ୍ରାୟୋଜିତ କରନ୍ତୁ" : "Sponsor a complete village education programme";
  if (amount >= 25000) return lang === "od" ? "୨୫ ଜଣ ଶିଶୁଙ୍କୁ ଏକ ବର୍ଷ ପାଇଁ ପୁସ୍ତକ ଦିଅନ୍ତୁ" : "Provide books for 25 children for a year";
  if (amount >= 10000) return lang === "od" ? "୧୦ ଜଣ ବୟସ୍କଙ୍କୁ ଏକ ମାସ ପାଇଁ ଭୋଜନ ଦିଅନ୍ତୁ" : "Feed 10 elders for a month";
  if (amount >= 5000) return lang === "od" ? "୫ ଜଣ ଶିଶୁଙ୍କୁ ଏକ ବର୍ଷ ପାଇଁ ପୁସ୍ତକ ଦିଅନ୍ତୁ" : "Provide books for 5 children for a year";
  if (amount >= 2500) return lang === "od" ? "ଏକ ବୟସ୍କଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ଶିବିର ପ୍ରାୟୋଜିତ କରନ୍ତୁ" : "Sponsor one elder's health camp visit";
  return lang === "od" ? "ଏକ ଶିଶୁକୁ ଏକ ବର୍ଷ ପାଇଁ ପୁସ୍ତକ ଦିଅନ୍ତୁ" : "Provide books for 1 child for a year";
}

export default function DonateInMemory() {
  const { language, t } = useLanguage();
  const [, setLocation] = useLocation();
  const formRef = useRef<HTMLDivElement>(null);

  /* ─── Tribute Details ─── */
  const [honoreeName, setHonoreeName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [dateOfPassing, setDateOfPassing] = useState("");
  const [tributeMessage, setTributeMessage] = useState("");
  const [notifyFamily, setNotifyFamily] = useState(false);
  const [familyEmail, setFamilyEmail] = useState("");

  /* ─── Donation Details ─── */
  const [amount, setAmount] = useState(5000);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [cause, setCause] = useState<"general" | "education" | "elderly_care" | "vidyapeeth">("general");

  /* ─── Donor Details ─── */
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");

  /* ─── UI State ─── */
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const tributeCardRef = useRef<HTMLDivElement>(null);

  const effectiveAmount = isCustom ? (parseInt(customAmount) || 0) : amount;

  /* ─── Download Tribute Card as Image ─── */
  const downloadTributeCard = useCallback(async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 800, H = 1000;
    canvas.width = W;
    canvas.height = H;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#111111");
    grad.addColorStop(1, "#1A1A1A");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Gold border
    ctx.strokeStyle = "#F5A623";
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, W - 60, H - 60);

    // Inner decorative border
    ctx.strokeStyle = "rgba(201,168,76,0.3)";
    ctx.lineWidth = 1;
    ctx.strokeRect(45, 45, W - 90, H - 90);

    // Diya/flame symbol (drawn as simple triangle + circle)
    ctx.fillStyle = "#F5A623";
    ctx.beginPath();
    ctx.moveTo(W / 2, 100);
    ctx.lineTo(W / 2 - 15, 140);
    ctx.lineTo(W / 2 + 15, 140);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(W / 2, 145, 8, 0, Math.PI * 2);
    ctx.fill();

    // "IN LOVING MEMORY" text
    ctx.fillStyle = "#F5A623";
    ctx.font = "bold 12px monospace";
    ctx.textAlign = "center";
    ctx.letterSpacing = "4px";
    ctx.fillText("IN LOVING MEMORY", W / 2, 185);

    // Decorative line
    ctx.strokeStyle = "#F5A623";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 80, 200);
    ctx.lineTo(W / 2 + 80, 200);
    ctx.stroke();

    // Honoree name
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 42px Georgia, serif";
    ctx.fillText(honoreeName || "Your Loved One", W / 2, 270);

    // Relationship
    if (relationship) {
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "16px Georgia, serif";
      ctx.fillText(relationship, W / 2, 310);
    }

    // Decorative divider
    ctx.strokeStyle = "rgba(201,168,76,0.4)";
    ctx.beginPath();
    ctx.moveTo(W / 2 - 60, 340);
    ctx.lineTo(W / 2 + 60, 340);
    ctx.stroke();

    // Tribute message
    if (tributeMessage) {
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "italic 18px Georgia, serif";
      const words = tributeMessage.split(" ");
      let line = "";
      let y = 390;
      for (const word of words) {
        const test = line + word + " ";
        if (ctx.measureText(test).width > W - 160) {
          ctx.fillText(`\u201C${line.trim()}`, W / 2, y);
          line = word + " ";
          y += 28;
        } else {
          line = test;
        }
      }
      if (line.trim()) {
        ctx.fillText(y === 390 ? `\u201C${line.trim()}\u201D` : `${line.trim()}\u201D`, W / 2, y);
      }
    }

    // Impact text
    const impactY = tributeMessage ? 520 : 420;
    ctx.fillStyle = "#F5A623";
    ctx.font = "16px monospace";
    ctx.fillText(`₹${effectiveAmount.toLocaleString("en-IN")} donated`, W / 2, impactY);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "14px monospace";
    ctx.fillText(getImpactText(effectiveAmount, "en"), W / 2, impactY + 30);

    // Donor attribution
    const bottomY = H - 160;
    ctx.strokeStyle = "rgba(201,168,76,0.3)";
    ctx.beginPath();
    ctx.moveTo(W / 2 - 100, bottomY);
    ctx.lineTo(W / 2 + 100, bottomY);
    ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "11px monospace";
    ctx.fillText(`A tribute donation by ${donorName}`, W / 2, bottomY + 30);

    // Abhiara Foundation branding
    ctx.fillStyle = "#F5A623";
    ctx.font = "bold 14px monospace";
    ctx.fillText("ABHIARA FOUNDATION", W / 2, bottomY + 60);
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "10px monospace";
    ctx.fillText("Fearless Ray of Light", W / 2, bottomY + 80);
    ctx.fillText("www.abhiarafoundation.org", W / 2, bottomY + 100);

    // Download
    const link = document.createElement("a");
    link.download = `tribute-${honoreeName.replace(/\s+/g, "-").toLowerCase()}-abhiara.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [honoreeName, relationship, tributeMessage, donorName, effectiveAmount]);

  /* ─── Share Tribute Card via WhatsApp ─── */
  const shareTributeWhatsApp = useCallback(() => {
    const text = `🕯️ In loving memory of ${honoreeName}\n\n${tributeMessage ? `"${tributeMessage}"\n\n` : ""}A tribute donation of ₹${effectiveAmount.toLocaleString("en-IN")} has been made to Abhiara Foundation.\n\n${getImpactText(effectiveAmount, "en")}\n\nHonour a loved one: www.abhiarafoundation.org/donate-in-memory`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }, [honoreeName, tributeMessage, effectiveAmount]);

  const createMemorial = trpc.memorialDonation.create.useMutation();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const createOrderMutation = trpc.memorialDonation.createOrder.useMutation({
    onSuccess: (data) => {
      const options = {
        key: data.keyId,
        amount: data.amount * 100,
        currency: data.currency,
        name: "Abhiara Foundation",
        description: `In Memory of ${honoreeName}`,
        order_id: data.orderId,
        handler: function (response: any) {
          verifyPaymentMutation.mutate({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            donationId: data.donationId,
          });
        },
        prefill: { name: donorName, email: donorEmail, contact: donorPhone || undefined },
        theme: { color: "#F5A623" },
        modal: { ondismiss: () => { toast.error(t("Payment cancelled", "ଦାନ ବାତିଲ")); setIsSubmitting(false); } },
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    },
    onError: (error) => { toast.error(error.message || "Failed to create order"); setIsSubmitting(false); },
  });

  const verifyPaymentMutation = trpc.memorialDonation.verifyPayment.useMutation({
    onSuccess: () => { setIsSubmitted(true); toast.success(t("Payment successful! Your tribute has been recorded.", "ଦାନ ସଫଳ! ଆପଣଙ୍କ ଶ୍ରଦ୍ଧାଞ୍ଜଳି ରେକର୍ଡ ହୋଇଛି।")); setIsSubmitting(false); },
    onError: () => { toast.error(t("Payment verification failed", "ଦାନ ଯାଞ୍ଚ ବିଫଳ")); setIsSubmitting(false); },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!honoreeName.trim()) { toast.error(t("Please enter the name of your loved one", "ଦୟାକରି ଆପଣଙ୍କ ପ୍ରିୟଜନଙ୍କ ନାମ ଲେଖନ୍ତୁ")); return; }
    if (effectiveAmount < 100) { toast.error(t("Minimum donation is ₹100", "ସର୍ବନିମ୍ନ ଦାନ ₹୧୦୦")); return; }
    if (!donorName.trim()) { toast.error(t("Please enter your name", "ଦୟାକରି ଆପଣଙ୍କ ନାମ ଲେଖନ୍ତୁ")); return; }
    if (!donorEmail.trim()) { toast.error(t("Please enter your email", "ଦୟାକରି ଆପଣଙ୍କ ଇମେଲ୍ ଲେଖନ୍ତୁ")); return; }
    if (notifyFamily && !familyEmail.trim()) { toast.error(t("Please enter family member's email", "ଦୟାକରି ପରିବାର ସଦସ୍ୟଙ୍କ ଇମେଲ୍ ଲେଖନ୍ତୁ")); return; }

    setIsSubmitting(true);
    createOrderMutation.mutate({
      donorName: donorName.trim(),
      donorEmail: donorEmail.trim(),
      donorPhone: donorPhone.trim() || undefined,
      amount: effectiveAmount,
      cause,
      honoreeName: honoreeName.trim(),
      relationship: relationship || undefined,
      dateOfPassing: dateOfPassing || undefined,
      tributeMessage: tributeMessage.trim() || undefined,
      notifyFamily,
      familyEmail: notifyFamily ? familyEmail.trim() : undefined,
    });
  }

  /* ─── SUCCESS STATE ─── */
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <SEO
          title="Tribute Recorded, Abhiara Foundation"
          description="Your memorial donation tribute has been recorded."
        />
        <Navbar />
        <section className="pt-32 pb-16">
          <div className="container max-w-2xl text-center">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-[#1A1A1A]/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check size={40} className="text-[#F5A623]" />
            </motion.div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
              {t("Your Tribute Has Been Recorded", "ଆପଣଙ୍କ ଶ୍ରଦ୍ଧାଞ୍ଜଳି ରେକର୍ଡ ହୋଇଛି")}
            </h1>
            <p className="text-[#333]/70 text-lg mb-8">
              {t(
                `In loving memory of ${honoreeName}. Your donation of ₹${effectiveAmount.toLocaleString("en-IN")} will create lasting impact.`,
                `${honoreeName}ଙ୍କ ସ୍ମୃତିରେ। ₹${effectiveAmount.toLocaleString("en-IN")}ର ଆପଣଙ୍କ ଦାନ ସ୍ଥାୟୀ ପ୍ରଭାବ ସୃଷ୍ଟି କରିବ।`
              )}
            </p>

            {/* Tribute Card Preview */}
            <div className="bg-white border border-[#F5A623]/30 rounded-lg p-8 mb-8 text-left max-w-md mx-auto shadow-sm">
              <div className="text-center mb-4">
                <Flame size={28} className="text-[#F5A623] mx-auto mb-2" />
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#F5A623]">
                  {t("IN LOVING MEMORY", "ସ୍ନେହପୂର୍ଣ୍ଣ ସ୍ମୃତିରେ")}
                </p>
              </div>
              <h3 className="font-serif text-2xl text-center text-[#1A1A1A] mb-1">{honoreeName}</h3>
              {relationship && (
                <p className="text-center text-[#333]/50 text-sm mb-3">{relationship}</p>
              )}
              {tributeMessage && (
                <p className="font-serif italic text-[#333]/70 text-center text-sm leading-relaxed mb-4 border-t border-[#F5A623]/20 pt-4">
                  "{tributeMessage}"
                </p>
              )}
              <div className="border-t border-[#F5A623]/20 pt-3 text-center">
                <p className="text-[10px] text-[#333]/50 font-mono tracking-wider uppercase">
                  {t("A tribute donation by", "ଏକ ଶ୍ରଦ୍ଧାଞ୍ଜଳି ଦାନ")} {donorName}
                </p>
                <p className="text-[10px] text-[#F5A623] font-mono tracking-wider uppercase mt-1">
                  ABHIARA FOUNDATION
                </p>
              </div>
            </div>

            {/* Download & Share Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <button
                onClick={downloadTributeCard}
                className="px-6 py-3 bg-[#111111] text-white font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#111111] transition-colors flex items-center justify-center gap-2"
              >
                <Download size={14} /> {t("DOWNLOAD TRIBUTE CARD", "ଶ୍ରଦ୍ଧାଞ୍ଜଳି କାର୍ଡ ଡାଉନଲୋଡ୍")}
              </button>
              <button
                onClick={shareTributeWhatsApp}
                className="px-6 py-3 bg-[#25D366] text-white font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#1DA851] transition-colors flex items-center justify-center gap-2"
              >
                <Share2 size={14} /> {t("SHARE ON WHATSAPP", "ହ୍ୱାଟ୍ସଆପରେ ସେୟାର")}
              </button>
            </div>

            <p className="text-[#333]/50 text-sm mb-6">
              {t(
                "Your payment has been verified. Thank you for keeping their memory alive through kindness.",
                "ଆପଣଙ୍କ ପେମେଣ୍ଟ ଯାଞ୍ଚ ହୋଇଛି। ଦୟାଳୁତା ମାଧ୍ୟମରେ ସେମାନଙ୍କ ସ୍ମୃତି ଜୀବିତ ରଖିଥିବା ପାଇଁ ଧନ୍ୟବାଦ।"
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors"
              >
                {t("BACK TO HOME", "ମୂଳ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ")}
              </Link>
              <Link
                href="/donate"
                className="px-6 py-3 border border-[#F5A623] text-[#F5A623] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#1A1A1A]/5 transition-colors"
              >
                {t("MAKE ANOTHER DONATION", "ଅନ୍ୟ ଏକ ଦାନ କରନ୍ତୁ")}
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title={t("Donate in Memory, Abhiara Foundation", "ସ୍ମୃତିରେ ଦାନ, ଅଭିଆରା ଫାଉଣ୍ଡେସନ୍")}
        description={t(
          "Remember someone you loved by helping a child or an elder through Abhiara Foundation.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନ୍‌କୁ ଶ୍ରଦ୍ଧାଞ୍ଜଳି ଦାନ ସହ ଏକ ପ୍ରିୟଜନଙ୍କ ସ୍ମୃତିକୁ ସମ୍ମାନ କରନ୍ତୁ।"
        )}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-28 pb-14 md:pt-32 md:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#111111]/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/50 via-transparent to-[#111111]/80" />
        </div>
        <div className="relative z-10 container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Flame size={36} className="text-[#F5A623] mx-auto mb-4" />
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              {t("Donate in Memory of", "ସ୍ମୃତିରେ ଦାନ କରନ୍ତୁ")}{" "}
              <span className="text-[#F5A623]">{t("Someone You Love", "ଆପଣଙ୍କ ପ୍ରିୟଜନଙ୍କ")}</span>
            </h1>
            <p className="font-sans text-[#555] max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-6">
              {t(
                "Honouring the memory of a loved one is a beautiful way to keep their spirit alive. Each donation becomes a lasting tribute. Spreading kindness, hope, and opportunity in their name.",
                "ଏକ ପ୍ରିୟଜନଙ୍କ ସ୍ମୃତିକୁ ସମ୍ମାନ କରିବା ସେମାନଙ୍କ ଆତ୍ମାକୁ ଜୀବିତ ରଖିବାର ଏକ ସୁନ୍ଦର ଉପାୟ। ପ୍ରତ୍ୟେକ ଦାନ ଏକ ସ୍ଥାୟୀ ଶ୍ରଦ୍ଧାଞ୍ଜଳି ହୋଇଯାଏ।"
              )}
            </p>
            <p className="font-serif italic text-[#F5A623]/80 text-sm max-w-md mx-auto">
              "{t(
                "Those we love do not go away, they walk beside us every day.",
                "ଯାହାଙ୍କୁ ଆମେ ଭଲ ପାଉ ସେମାନେ ଚାଲିଯାନ୍ତି ନାହିଁ, ସେମାନେ ପ୍ରତିଦିନ ଆମ ପାଖରେ ଚାଲନ୍ତି।"
              )}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== MAIN FORM SECTION ===== */}
      <section className="py-10 md:py-14" ref={formRef}>
        <div className="container max-w-5xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

              {/* ─── LEFT: Form ─── */}
              <div className="lg:col-span-3 space-y-6">

                {/* STEP 1: Tribute Details */}
                <div className="bg-white rounded-lg border border-[#F5A623]/20 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full bg-[#F5A623] text-white flex items-center justify-center text-sm font-bold">1</div>
                    <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                      {t("In Memory Of", "ସ୍ମୃତିରେ")}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono tracking-wider uppercase text-[#333]/60 mb-1.5">
                        {t("Name of Your Loved One", "ଆପଣଙ୍କ ପ୍ରିୟଜନଙ୍କ ନାମ")} *
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5A623]" />
                        <input
                          type="text" value={honoreeName} onChange={e => setHonoreeName(e.target.value)}
                          placeholder={t("Enter their name", "ସେମାନଙ୍କ ନାମ ଲେଖନ୍ତୁ")}
                          className="w-full pl-10 pr-4 py-3 border border-[#F5A623]/20 rounded-md bg-[#FAFAFA] text-[#1A1A1A] placeholder:text-[#333]/30 focus:outline-none focus:border-[#F5A623] text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono tracking-wider uppercase text-[#333]/60 mb-1.5">
                        {t("Relationship", "ସମ୍ପର୍କ")}
                      </label>
                      <select
                        value={relationship} onChange={e => setRelationship(e.target.value)}
                        className="w-full px-4 py-3 border border-[#F5A623]/20 rounded-md bg-[#FAFAFA] text-[#1A1A1A] focus:outline-none focus:border-[#F5A623] text-sm"
                      >
                        <option value="">{t("Select", "ଚୟନ କରନ୍ତୁ")}</option>
                        {RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono tracking-wider uppercase text-[#333]/60 mb-1.5">
                        {t("Date of Passing", "ପ୍ରୟାଣ ତାରିଖ")}
                      </label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5A623]" />
                        <input
                          type="date" value={dateOfPassing} onChange={e => setDateOfPassing(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-[#F5A623]/20 rounded-md bg-[#FAFAFA] text-[#1A1A1A] focus:outline-none focus:border-[#F5A623] text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono tracking-wider uppercase text-[#333]/60 mb-1.5">
                        {t("Personal Tribute Message", "ବ୍ୟକ୍ତିଗତ ଶ୍ରଦ୍ଧାଞ୍ଜଳି ସନ୍ଦେଶ")}
                      </label>
                      <textarea
                        value={tributeMessage} onChange={e => setTributeMessage(e.target.value)}
                        placeholder={t(
                          "Share a memory, a wish, or words of love...",
                          "ଏକ ସ୍ମୃତି, ଏକ ଇଚ୍ଛା, କିମ୍ବା ସ୍ନେହର ଶବ୍ଦ ସେୟାର କରନ୍ତୁ..."
                        )}
                        rows={3}
                        className="w-full px-4 py-3 border border-[#F5A623]/20 rounded-md bg-[#FAFAFA] text-[#1A1A1A] placeholder:text-[#333]/30 focus:outline-none focus:border-[#F5A623] text-sm resize-none"
                      />
                    </div>

                    {/* Notify Family */}
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox" checked={notifyFamily} onChange={e => setNotifyFamily(e.target.checked)}
                          className="w-4 h-4 accent-[#F5A623]"
                        />
                        <span className="text-sm text-[#333]/70">
                          {t("Send tribute notification to a family member", "ଏକ ପରିବାର ସଦସ୍ୟଙ୍କୁ ଶ୍ରଦ୍ଧାଞ୍ଜଳି ବିଜ୍ଞପ୍ତି ପଠାନ୍ତୁ")}
                        </span>
                      </label>
                      <AnimatePresence>
                        {notifyFamily && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} className="overflow-hidden"
                          >
                            <div className="mt-3">
                              <div className="relative">
                                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5A623]" />
                                <input
                                  type="email" value={familyEmail} onChange={e => setFamilyEmail(e.target.value)}
                                  placeholder={t("Family member's email", "ପରିବାର ସଦସ୍ୟଙ୍କ ଇମେଲ୍")}
                                  className="w-full pl-10 pr-4 py-3 border border-[#F5A623]/20 rounded-md bg-[#FAFAFA] text-[#1A1A1A] placeholder:text-[#333]/30 focus:outline-none focus:border-[#F5A623] text-sm"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* STEP 2: Donation Amount */}
                <div className="bg-white rounded-lg border border-[#F5A623]/20 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full bg-[#F5A623] text-white flex items-center justify-center text-sm font-bold">2</div>
                    <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                      {t("Choose Donation Amount", "ଦାନ ରାଶି ଚୟନ କରନ୍ତୁ")}
                    </h2>
                  </div>

                  {/* Amount Buttons */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {PRESET_AMOUNTS.map(a => (
                      <button
                        key={a} type="button"
                        onClick={() => { setAmount(a); setIsCustom(false); }}
                        className={`py-3 rounded-md border text-sm font-bold transition-all ${
                          !isCustom && amount === a
                            ? "bg-[#F5A623] text-white border-[#F5A623] shadow-md"
                            : "bg-white text-[#1A1A1A] border-[#F5A623]/20 hover:border-[#F5A623]/50"
                        }`}
                      >
                        ₹{a.toLocaleString("en-IN")}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      type="button"
                      onClick={() => setIsCustom(true)}
                      className={`px-4 py-2 rounded-md border text-xs font-mono tracking-wider uppercase transition-all ${
                        isCustom ? "bg-[#1A1A1A] text-white border-[#F5A623]" : "bg-white text-[#333]/60 border-[#F5A623]/20 hover:border-[#F5A623]"
                      }`}
                    >
                      {t("CUSTOM AMOUNT", "ଅନ୍ୟ ରାଶି")}
                    </button>
                    {isCustom && (
                      <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5A623] font-bold">₹</span>
                        <input
                          type="number" value={customAmount} onChange={e => setCustomAmount(e.target.value)}
                          placeholder="Enter amount" min="100"
                          className="w-full pl-8 pr-4 py-2.5 border border-[#F5A623]/30 rounded-md bg-[#FAFAFA] text-[#1A1A1A] focus:outline-none focus:border-[#F5A623] text-sm"
                          autoFocus
                        />
                      </div>
                    )}
                  </div>

                  {/* Impact Preview */}
                  {effectiveAmount >= 100 && (
                    <div className="bg-[#1A1A1A]/5 border border-[#F5A623]/15 rounded-md p-3 flex items-start gap-3">
                      <Heart size={16} className="text-[#F5A623] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-[#F5A623]">
                        <span className="font-bold">₹{effectiveAmount.toLocaleString("en-IN")}</span>{" "}
                        {honoreeName ? (
                          <>{t("in memory of", "ସ୍ମୃତିରେ")} <span className="font-bold">{honoreeName}</span> {t("will", "")}{" "}</>
                        ) : (
                          <>{t("will", "")}{" "}</>
                        )}
                        {getImpactText(effectiveAmount, language).toLowerCase()}
                      </p>
                    </div>
                  )}

                  {/* Cause Selection */}
                  <div className="mt-4">
                    <p className="text-xs font-mono tracking-wider uppercase text-[#333]/60 mb-2">
                      {t("Dedicate to a Cause", "ଏକ କାରଣ ପାଇଁ ସମର୍ପିତ")}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {CAUSES.map(c => (
                        <button
                          key={c.id} type="button"
                          onClick={() => setCause(c.id)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-md border text-xs transition-all ${
                            cause === c.id
                              ? "border-[#F5A623] bg-[#F5A623]/5 text-[#1A1A1A]"
                              : "border-[#F5A623]/10 text-[#333]/60 hover:border-[#F5A623]/30"
                          }`}
                        >
                          <c.icon size={14} style={{ color: c.color }} />
                          <span>{language === "od" ? c.labelOd : c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* STEP 3: Donor Details */}
                <div className="bg-white rounded-lg border border-[#F5A623]/20 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full bg-[#F5A623] text-white flex items-center justify-center text-sm font-bold">3</div>
                    <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                      {t("Your Details", "ଆପଣଙ୍କ ବିବରଣୀ")}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono tracking-wider uppercase text-[#333]/60 mb-1.5">
                        {t("Your Full Name", "ଆପଣଙ୍କ ସମ୍ପୂର୍ଣ୍ଣ ନାମ")} *
                      </label>
                      <input
                        type="text" value={donorName} onChange={e => setDonorName(e.target.value)}
                        placeholder={t("Enter your name", "ଆପଣଙ୍କ ନାମ ଲେଖନ୍ତୁ")}
                        className="w-full px-4 py-3 border border-[#F5A623]/20 rounded-md bg-[#FAFAFA] text-[#1A1A1A] placeholder:text-[#333]/30 focus:outline-none focus:border-[#F5A623] text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono tracking-wider uppercase text-[#333]/60 mb-1.5">
                        {t("Email", "ଇମେଲ୍")} *
                      </label>
                      <input
                        type="email" value={donorEmail} onChange={e => setDonorEmail(e.target.value)}
                        placeholder={t("your@email.com", "ଆପଣଙ୍କ@ଇମେଲ୍.com")}
                        className="w-full px-4 py-3 border border-[#F5A623]/20 rounded-md bg-[#FAFAFA] text-[#1A1A1A] placeholder:text-[#333]/30 focus:outline-none focus:border-[#F5A623] text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono tracking-wider uppercase text-[#333]/60 mb-1.5">
                        {t("Phone (WhatsApp)", "ଫୋନ୍ (ହ୍ୱାଟ୍ସଆପ୍)")}
                      </label>
                      <input
                        type="tel" value={donorPhone} onChange={e => setDonorPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 border border-[#F5A623]/20 rounded-md bg-[#FAFAFA] text-[#1A1A1A] placeholder:text-[#333]/30 focus:outline-none focus:border-[#F5A623] text-sm"
                      />
                    </div>

                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || effectiveAmount < 100 || !honoreeName.trim() || !donorName.trim() || !donorEmail.trim()}
                    className="w-full mt-6 py-4 bg-[#F5A623] text-[#1A1A1A] font-mono text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-md"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Flame size={16} />
                        {t(
                          `PLEDGE ₹${effectiveAmount.toLocaleString("en-IN")} IN MEMORY OF ${(honoreeName || "YOUR LOVED ONE").toUpperCase()}`,
                          `₹${effectiveAmount.toLocaleString("en-IN")} ${(honoreeName || "ଆପଣଙ୍କ ପ୍ରିୟଜନ").toUpperCase()}ଙ୍କ ସ୍ମୃତିରେ ଦାନ କରନ୍ତୁ`
                        )}
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-[#333]/40 text-center mt-3 font-mono tracking-wider">
                    {t("SECURE · ONE TIME PAYMENT · 80G PENDING", "ସୁରକ୍ଷିତ · ଏକକାଳୀନ ପେମେଣ୍ଟ · 80G ବିଚାରାଧୀନ")}
                  </p>
                </div>
              </div>

              {/* ─── RIGHT: Tribute Card Preview + Info ─── */}
              <div className="lg:col-span-2 space-y-5">

                {/* Live Tribute Card Preview */}
                <div className="bg-white rounded-lg border border-[#F5A623]/30 p-6 shadow-sm sticky top-28">
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#F5A623] mb-4 text-center">
                    {t("TRIBUTE CARD PREVIEW", "ଶ୍ରଦ୍ଧାଞ୍ଜଳି କାର୍ଡ ପୂର୍ବାବଲୋକନ")}
                  </p>

                  {/* Card */}
                  <div className="border border-[#F5A623]/20 rounded-lg p-5 bg-gradient-to-b from-[#FFF8E1] to-white mb-4">
                    <div className="text-center">
                      <Flame size={24} className="text-[#F5A623] mx-auto mb-2" />
                      <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-[#F5A623]/70 mb-2">
                        {t("IN LOVING MEMORY", "ସ୍ନେହପୂର୍ଣ୍ଣ ସ୍ମୃତିରେ")}
                      </p>
                      <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-1">
                        {honoreeName || t("Your Loved One", "ଆପଣଙ୍କ ପ୍ରିୟଜନ")}
                      </h3>
                      {relationship && (
                        <p className="text-[#333]/50 text-xs mb-2">{relationship}</p>
                      )}
                      {dateOfPassing && (
                        <p className="text-[#333]/40 text-[10px] font-mono">{dateOfPassing}</p>
                      )}
                    </div>

                    {tributeMessage && (
                      <div className="border-t border-[#F5A623]/15 mt-3 pt-3">
                        <p className="font-serif italic text-[#333]/60 text-xs text-center leading-relaxed">
                          "{tributeMessage}"
                        </p>
                      </div>
                    )}

                    <div className="border-t border-[#F5A623]/15 mt-3 pt-3 text-center">
                      {effectiveAmount >= 100 && (
                        <p className="text-[#F5A623] text-xs font-bold mb-1">
                          ₹{effectiveAmount.toLocaleString("en-IN")} {t("donated", "ଦାନ")}
                        </p>
                      )}
                      <p className="text-[9px] text-[#333]/40 font-mono tracking-wider">
                        {t("A tribute by", "ଶ୍ରଦ୍ଧାଞ୍ଜଳି")} {donorName || t("You", "ଆପଣ")}
                      </p>
                      <p className="text-[8px] text-[#F5A623] font-mono tracking-[0.2em] mt-1">
                        ABHIARA FOUNDATION
                      </p>
                    </div>
                  </div>

                  {/* Impact Photos */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="relative rounded-md overflow-hidden h-24">
                      <img src={CHILDREN_IMG} alt="Education" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-[#111111]/40 flex items-end p-2">
                        <p className="text-white text-[9px] font-mono tracking-wider uppercase">{t("Education", "ଶିକ୍ଷା")}</p>
                      </div>
                    </div>
                    <div className="relative rounded-md overflow-hidden h-24">
                      <img src={ELDERLY_IMG} alt="Elderly Care" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-[#111111]/40 flex items-end p-2">
                        <p className="text-white text-[9px] font-mono tracking-wider uppercase">{t("Elderly Care", "ବୟସ୍କ ସେବା")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#333]/60">
                      <Shield size={14} className="text-[#F5A623]" />
                      <span>{t("Section 8 Not-for-Profit Company", "ଧାରା ୮ ଲାଭ-ନିରପେକ୍ଷ କମ୍ପାନୀ")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#333]/60">
                      <Check size={14} className="text-[#F5A623]" />
                      <span>{t("Donation Acknowledgement available on request", "ଅନୁରୋଧରେ ଦାନ ସ୍ୱୀକୃତି ପତ୍ର ମିଳିବ")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#333]/60">
                      <Check size={14} className="text-[#F5A623]" />
                      <span>{t("80G approval pending. No tax deduction yet", "80G ଅନୁମୋଦନ ବିଚାରାଧୀନ। ଏଯାବତ କର ରିହାତି ନାହିଁ")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#333]/60">
                      <Heart size={14} className="text-[#F5A623]" />
                      <span>{t("Tribute card sent to family", "ପରିବାରକୁ ଶ୍ରଦ୍ଧାଞ୍ଜଳି କାର୍ଡ ପଠାଯାଏ")}</span>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="border-t border-[#F5A623]/15 mt-4 pt-4">
                    <p className="font-serif italic text-[#333]/50 text-xs text-center leading-relaxed">
                      "{t(
                        "A donation in their name helps a child go to school or an elder get medical care.",
                        "ଅନ୍ୟମାନଙ୍କ ଜୀବନରେ ପରିବର୍ତ୍ତନ ଆଣିବାର ସର୍ବୋତ୍ତମ ଉପାୟ ହେଉଛି ସ୍ନେହରୁ ଆରମ୍ଭ କରିବା।"
                      )}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ===== QUOTE BANNER ===== */}
      <section className="py-10 bg-[#FAFAFA]">
        <div className="container text-center">
          <Flame size={24} className="text-[#F5A623] mx-auto mb-3" />
          <p className="font-serif italic text-[#555] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            "{t(
              "Honouring the memory of a loved one is a beautiful way to keep their spirit alive. Each donation becomes a lasting tribute, spreading kindness and hope in their memory.",
              "ଏକ ପ୍ରିୟଜନଙ୍କ ସ୍ମୃତିକୁ ସମ୍ମାନ କରିବା ସେମାନଙ୍କ ଆତ୍ମାକୁ ଜୀବିତ ରଖିବାର ଏକ ସୁନ୍ଦର ଉପାୟ।"
            )}"
          </p>
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#F5A623] mt-3">
           , {t("Abhiara Foundation · In Loving Memory", "ଅଭିଆରା ଫାଉଣ୍ଡେସନ · ପ୍ରିୟ ସ୍ମୃତିରେ")}
          </p>
        </div>
      </section>

      {/* ===== OTHER WAYS TO GIVE ===== */}
      <section className="py-10 bg-[#FAFAFA]">
        <div className="container max-w-3xl text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
            {t("OTHER WAYS TO GIVE", "ଦାନ କରିବାର ଅନ୍ୟ ଉପାୟ")}
          </p>
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6">
            {t("Continue Their Legacy", "ସେମାନଙ୍କ ଉତ୍ତରାଧିକାର ଜାରି ରଖନ୍ତୁ")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/donate" className="bg-white border border-[#F5A623]/20 rounded-lg p-5 hover:border-[#F5A623]/40 transition-colors text-center block">
              <Heart size={24} className="text-[#F5A623] mx-auto mb-2" />
              <h3 className="font-serif text-sm font-bold text-[#1A1A1A] mb-1">{t("Regular Donation", "ନିୟମିତ ଦାନ")}</h3>
              <p className="text-[11px] text-[#333]/50">{t("Monthly or one-time giving", "ମାସିକ କିମ୍ବା ଏକକାଳୀନ ଦାନ")}</p>
            </Link>
            <Link href="/csr-partners" className="bg-white border border-[#F5A623]/20 rounded-lg p-5 hover:border-[#F5A623]/40 transition-colors text-center block">
              <GraduationCap size={24} className="text-[#F5A623] mx-auto mb-2" />
              <h3 className="font-serif text-sm font-bold text-[#1A1A1A] mb-1">{t("CSR Partnership", "CSR ସାଝେଦାରୀ")}</h3>
              <p className="text-[11px] text-[#333]/50">{t("Corporate social responsibility", "କର୍ପୋରେଟ ସାମାଜିକ ଦାୟିତ୍ୱ")}</p>
            </Link>
            <Link href="/volunteer" className="bg-white border border-[#F5A623]/20 rounded-lg p-5 hover:border-[#F5A623]/40 transition-colors text-center block">
              <Users size={24} className="text-[#F5A623] mx-auto mb-2" />
              <h3 className="font-serif text-sm font-bold text-[#1A1A1A] mb-1">{t("Volunteer", "ସ୍ୱେଚ୍ଛାସେବୀ")}</h3>
              <p className="text-[11px] text-[#333]/50">{t("Give your time and skills", "ଆପଣଙ୍କ ସମୟ ଓ ଦକ୍ଷତା ଦିଅନ୍ତୁ")}</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
