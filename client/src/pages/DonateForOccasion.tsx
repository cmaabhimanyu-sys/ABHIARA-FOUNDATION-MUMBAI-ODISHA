/**
 * Abhiara Foundation, Donate for a Birthday / Special Occasion
 * Celebrate occasions with purpose. Donate in someone's name
 * Occasion selector → Celebrant details → Amount → Donor details → e-Card preview → Submit
 */
import { useEffect, useState, useCallback } from "react";
import { Link } from "wouter";
import {
  Heart, BookOpen, Users, GraduationCap, Gift, Cake, Star,
  ArrowRight, Check, Shield, Send, User, Calendar, MessageCircle,
  Mail, Phone, Download, Share2, PartyPopper, Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import Confetti from "@/components/Confetti";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

/* ─── CDN Images ─── */
const HERO_IMG = "/images/education-outdoor-session.jpeg";
const CHILDREN_IMG = "/images/education-children-hero.webp";

/* ─── Constants ─── */
const PRESET_AMOUNTS = [1000, 2500, 5000, 10000, 25000, 50000];

const OCCASIONS = [
  { id: "birthday" as const, label: "Birthday", labelOd: "ଜନ୍ମଦିନ", icon: Cake, emoji: "🎂" },
  { id: "anniversary" as const, label: "Anniversary", labelOd: "ବାର୍ଷିକୀ", icon: Heart, emoji: "💍" },
  { id: "wedding" as const, label: "Wedding", labelOd: "ବିବାହ", icon: Sparkles, emoji: "💒" },
  { id: "diwali" as const, label: "Diwali / Festival", labelOd: "ଦୀପାବଳି / ପର୍ବ", icon: Star, emoji: "🪔" },
  { id: "promotion" as const, label: "Promotion / Achievement", labelOd: "ପଦୋନ୍ନତି / ସଫଳତା", icon: PartyPopper, emoji: "🎉" },
  { id: "graduation" as const, label: "Graduation", labelOd: "ସ୍ନାତକ", icon: GraduationCap, emoji: "🎓" },
  { id: "other" as const, label: "Other Occasion", labelOd: "ଅନ୍ୟ ଅବସର", icon: Gift, emoji: "🎁" },
];

const CAUSES = [
  { id: "general" as const, label: "Where Most Needed", labelOd: "ଯେଉଁଠାରେ ସବୁଠାରୁ ଆବଶ୍ୟକ", icon: Heart, color: "#F5A623" },
  { id: "education" as const, label: "Education for Children", labelOd: "ଶିଶୁମାନଙ୍କ ପାଇଁ ଶିକ୍ଷା", icon: BookOpen, color: "#F5A623" },
  { id: "elderly_care" as const, label: "Elderly Care & Dignity", labelOd: "ବୟସ୍କ ସେବା ଓ ସମ୍ମାନ", icon: Users, color: "#F5A623" },
  { id: "vidyapeeth" as const, label: "Abhiara Vidyapeeth", labelOd: "ଅଭିଆରା ବିଦ୍ୟାପୀଠ", icon: GraduationCap, color: "#F5A623" },
  { id: "medical_emergency" as const, label: "Medical Emergency", labelOd: "ଡାକ୍ତରୀ ଜରୁରୀକାଳୀନ", icon: Heart, color: "#DC2626" },
];

const RELATIONSHIPS = [
  "Mother", "Father", "Spouse", "Sibling", "Child", "Friend",
  "Colleague", "Teacher", "Mentor", "Boss", "Other",
];

function getImpactText(amount: number, lang: string): string {
  if (amount >= 50000) return lang === "od" ? "ଏକ ସମ୍ପୂର୍ଣ୍ଣ ଗ୍ରାମ ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ ପ୍ରାୟୋଜିତ କରନ୍ତୁ" : "Sponsor a complete village education programme";
  if (amount >= 25000) return lang === "od" ? "୨୫ ଜଣ ଶିଶୁଙ୍କୁ ଏକ ବର୍ଷ ପାଇଁ ପୁସ୍ତକ ଦିଅନ୍ତୁ" : "Provide books for 25 children for a year";
  if (amount >= 10000) return lang === "od" ? "୧୦ ଜଣ ବୟସ୍କଙ୍କୁ ଏକ ମାସ ପାଇଁ ଭୋଜନ ଦିଅନ୍ତୁ" : "Feed 10 elders for a month";
  if (amount >= 5000) return lang === "od" ? "୫ ଜଣ ଶିଶୁଙ୍କୁ ଏକ ବର୍ଷ ପାଇଁ ପୁସ୍ତକ ଦିଅନ୍ତୁ" : "Provide books for 5 children for a year";
  if (amount >= 2500) return lang === "od" ? "ବୟସ୍କ, ଶିକ୍ଷା ଓ ଡାକ୍ତରୀ ସେବା ସହାୟତା" : "Supporting elders, education & medical care";
  return lang === "od" ? "ଏକ ଶିଶୁକୁ ଏକ ବର୍ଷ ପାଇଁ ପୁସ୍ତକ ଦିଅନ୍ତୁ" : "Provide books for 1 child for a year";
}

export default function DonateForOccasion() {
  const { language, t } = useLanguage();

  /* ─── Occasion Details ─── */
  const [occasion, setOccasion] = useState<"birthday" | "anniversary" | "wedding" | "diwali" | "promotion" | "graduation" | "other">("birthday");
  const [celebrantName, setCelebrantName] = useState("");
  const [occasionDate, setOccasionDate] = useState("");
  const [relationship, setRelationship] = useState("");
  const [celebrantEmail, setCelebrantEmail] = useState("");
  const [celebrantPhone, setCelebrantPhone] = useState("");
  const [wishingMessage, setWishingMessage] = useState("");

  /* ─── Donation Details ─── */
  const [amount, setAmount] = useState(5000);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [cause, setCause] = useState<"general" | "education" | "elderly_care" | "vidyapeeth" | "medical_emergency">("education");

  /* ─── Public Wall & Reminder ─── */
  const [isPublicOnWall, setIsPublicOnWall] = useState(false);
  const [wantReminder, setWantReminder] = useState(false);
  const [isAmountAnonymous, setIsAmountAnonymous] = useState(false);

  /* ─── Donor Details ─── */
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");

  /* ─── (Contribution matching removed. card shows only donor's gift) ─── */

  /* ─── UI State ─── */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const effectiveAmount = isCustom ? (parseInt(customAmount) || 0) : amount;
  const totalImpact = effectiveAmount;
  const selectedOccasion = OCCASIONS.find(o => o.id === occasion);

  const createOccasion = trpc.occasionDonation.create.useMutation();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* ─── Download e-Card as PDF ─── */
  const downloadECard = useCallback(async () => {
    const W = 800;

    // Ensure Playfair Display is loaded before drawing
    try {
      await document.fonts.load("bold 42px 'Playfair Display'");
      await document.fonts.load("italic 18px 'Playfair Display'");
      await document.fonts.load("bold 28px 'Playfair Display'");
    } catch { /* fallback to Georgia if font fails */ }

    const SERIF = "'Playfair Display', Georgia, serif";

    // We'll calculate H dynamically based on content
    const tmpCanvas = document.createElement("canvas");
    const tmpCtx = tmpCanvas.getContext("2d");
    if (!tmpCtx) return;
    tmpCanvas.width = W;
    tmpCanvas.height = 2000; // temp large canvas for measurement

    // --- Measure content height first ---
    let curY = 80; // top padding

    // Emoji
    curY += 60; // emoji height ~130

    // "HAPPY [OCCASION]"
    curY += 30;

    // Decorative line
    curY += 25;

    // Celebrant name
    curY += 55;

    // Relationship
    if (relationship) curY += 35;

    // Divider
    curY += 30;

    // Wishing message. measure wrapped lines
    let msgLines = 0;
    if (wishingMessage) {
      tmpCtx.font = `italic 18px ${SERIF}`;
      const words = wishingMessage.split(" ");
      let line = "";
      for (const word of words) {
        const test = line + word + " ";
        if (tmpCtx.measureText(test).width > W - 160) {
          msgLines++;
          line = word + " ";
        } else {
          line = test;
        }
      }
      if (line.trim()) msgLines++;
      curY += msgLines * 28 + 40;
    }

    // Donation amount + impact
    curY += 80;

    // Quote
    curY += 60;

    // Footer (divider + donor name + branding)
    curY += 140;

    // Bottom padding
    curY += 50;

    const H = Math.max(curY, 650); // minimum height

    // --- Now draw the actual card ---
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = W;
    canvas.height = H;

    // Background gradient. warm gold
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#FFF8E1");
    grad.addColorStop(1, "#F0E8D8");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Gold border
    ctx.strokeStyle = "#F5A623";
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, W - 60, H - 60);

    // Inner border
    ctx.strokeStyle = "rgba(201,168,76,0.3)";
    ctx.lineWidth = 1;
    ctx.strokeRect(45, 45, W - 90, H - 90);

    // Occasion emoji (text)
    ctx.font = "60px serif";
    ctx.textAlign = "center";
    ctx.fillText(selectedOccasion?.emoji || "\uD83C\uDF81", W / 2, 130);

    // "HAPPY [OCCASION]" text
    ctx.fillStyle = "#F5A623";
    ctx.font = "bold 14px monospace";
    ctx.fillText(`HAPPY ${(selectedOccasion?.label || "OCCASION").toUpperCase()}`, W / 2, 158);

    // Decorative line
    ctx.strokeStyle = "#F5A623";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 80, 178);
    ctx.lineTo(W / 2 + 80, 178);
    ctx.stroke();

    // Celebrant name
    ctx.fillStyle = "#111111";
    ctx.font = `bold 42px ${SERIF}`;
    ctx.fillText(celebrantName || "Your Loved One", W / 2, 240);

    // Relationship
    let nextY = 280;
    if (relationship) {
      ctx.fillStyle = "rgba(27,94,32,0.5)";
      ctx.font = `16px ${SERIF}`;
      ctx.fillText(relationship, W / 2, nextY);
      nextY += 30;
    }

    // Divider
    ctx.strokeStyle = "rgba(201,168,76,0.4)";
    ctx.beginPath();
    ctx.moveTo(W / 2 - 60, nextY + 5);
    ctx.lineTo(W / 2 + 60, nextY + 5);
    ctx.stroke();
    nextY += 40;

    // Wishing message. properly wrapped with quotes only at start and end
    let msgEndY = nextY;
    if (wishingMessage) {
      ctx.fillStyle = "rgba(27,94,32,0.7)";
      ctx.font = `italic 18px ${SERIF}`;
      const words = wishingMessage.split(" ");
      const lines: string[] = [];
      let line = "";
      for (const word of words) {
        const test = line + word + " ";
        if (ctx.measureText(test).width > W - 160) {
          lines.push(line.trim());
          line = word + " ";
        } else {
          line = test;
        }
      }
      if (line.trim()) lines.push(line.trim());

      // Draw lines with open quote on first line, close quote on last
      for (let i = 0; i < lines.length; i++) {
        let text = lines[i];
        if (i === 0 && lines.length === 1) text = `\u201C${text}\u201D`;
        else if (i === 0) text = `\u201C${text}`;
        else if (i === lines.length - 1) text = `${text}\u201D`;
        ctx.fillText(text, W / 2, msgEndY);
        msgEndY += 28;
      }
      msgEndY += 20;
    }

    // === DONATION AMOUNT & IMPACT ===
    const contribY = msgEndY + 20;
    ctx.fillStyle = "#F5A623";
    ctx.font = `bold 28px ${SERIF}`;
    ctx.fillText(isAmountAnonymous ? "A generous donation" : `\u20B9${effectiveAmount.toLocaleString("en-IN")} donated`, W / 2, contribY);

    ctx.fillStyle = "rgba(27,94,32,0.5)";
    ctx.font = "14px monospace";
    ctx.fillText("Supporting elders, education & medical care", W / 2, contribY + 32);

    // Quote
    const quoteY = contribY + 75;
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(27,94,32,0.35)";
    ctx.font = `italic 14px ${SERIF}`;
    ctx.fillText("\u201CEvery milestone carries a joy that\u2019s meant to be shared.\u201D", W / 2, quoteY);

    // === FOOTER. positioned relative to content, not fixed at bottom ===
    const footerY = quoteY + 50;

    // Divider line
    ctx.strokeStyle = "rgba(201,168,76,0.3)";
    ctx.beginPath();
    ctx.moveTo(W / 2 - 100, footerY);
    ctx.lineTo(W / 2 + 100, footerY);
    ctx.stroke();

    // Donor name
    ctx.fillStyle = "rgba(27,94,32,0.5)";
    ctx.font = "11px monospace";
    ctx.fillText(`With love from ${donorName}`, W / 2, footerY + 28);

    // Abhiara Foundation branding
    ctx.fillStyle = "#F5A623";
    ctx.font = "bold 14px monospace";
    ctx.fillText("ABHIARA FOUNDATION", W / 2, footerY + 48);
    ctx.fillStyle = "rgba(27,94,32,0.3)";
    ctx.font = "10px monospace";
    ctx.fillText("Fearless Ray of Light", W / 2, footerY + 68);
    ctx.fillText("www.abhiarafoundation.org", W / 2, footerY + 86);

    // Convert canvas to PDF using jsPDF. use actual content height
    const finalH = footerY + 120; // footer content + bottom padding
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [W, finalH] });
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, W, finalH);
    pdf.save(`${occasion}-${celebrantName.replace(/\s+/g, "-").toLowerCase()}-abhiara-card.pdf`);
  }, [celebrantName, relationship, wishingMessage, donorName, effectiveAmount, occasion, selectedOccasion, isAmountAnonymous]);

  /* ─── Share via WhatsApp ─── */
  const shareWhatsApp = useCallback(() => {
    const amountText = isAmountAnonymous ? "A generous gift" : `A gift of ₹${effectiveAmount.toLocaleString("en-IN")}`;
    const text = `${selectedOccasion?.emoji} Happy ${selectedOccasion?.label}${celebrantName ? `, ${celebrantName}` : ""}!\n\n${wishingMessage ? `"${wishingMessage}"\n\n` : ""}${amountText} has been donated to Abhiara Foundation in your honour.\n\n${getImpactText(effectiveAmount, "en")}\n\nCelebrate with purpose: www.abhiarafoundation.org/donate-for-occasion`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }, [celebrantName, wishingMessage, effectiveAmount, selectedOccasion, isAmountAnonymous]);

  const createOrderMutation = trpc.occasionDonation.createOrder.useMutation({
    onSuccess: (data) => {
      const options = {
        key: data.keyId,
        amount: data.amount * 100,
        currency: data.currency,
        name: "Abhiara Foundation",
        description: `Occasion Donation for ${celebrantName}`,
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

  const verifyPaymentMutation = trpc.occasionDonation.verifyPayment.useMutation({
    onSuccess: () => { setIsSubmitted(true); setShowConfetti(true); toast.success(t("Payment successful!", "ଦାନ ସଫଳ!")); setIsSubmitting(false); },
    onError: () => { toast.error(t("Payment verification failed", "ଦାନ ଯାଞ୍ଚ ବିଫଳ")); setIsSubmitting(false); },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!celebrantName.trim()) { toast.error(t("Please enter the celebrant's name", "ଦୟାକରି ଉତ୍ସବକାରୀଙ୍କ ନାମ ଲେଖନ୍ତୁ")); return; }
    if (effectiveAmount < 100) { toast.error(t("Minimum donation is ₹100", "ସର୍ବନିମ୍ନ ଦାନ ₹୧୦୦")); return; }
    if (!donorName.trim()) { toast.error(t("Please enter your name", "ଦୟାକରି ଆପଣଙ୍କ ନାମ ଲେଖନ୍ତୁ")); return; }
    if (!donorEmail.trim()) { toast.error(t("Please enter your email", "ଦୟାକରି ଆପଣଙ୍କ ଇମେଲ୍ ଲେଖନ୍ତୁ")); return; }

    setIsSubmitting(true);
    createOrderMutation.mutate({
      donorName: donorName.trim(),
      donorEmail: donorEmail.trim(),
      donorPhone: donorPhone.trim() || undefined,
      amount: effectiveAmount,
      cause,
      occasion,
      celebrantName: celebrantName.trim(),
      occasionDate: occasionDate || undefined,
      relationship: relationship || undefined,
      celebrantEmail: celebrantEmail.trim() || undefined,
      celebrantPhone: celebrantPhone.trim() || undefined,
      wishingMessage: wishingMessage.trim() || undefined,
      isPublicOnWall,
      wantReminder,
      isAmountAnonymous,
    });
  }

  /* ─── SUCCESS STATE ─── */
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <Confetti trigger={showConfetti} />
        <SEO title="Occasion Donation Recorded, Abhiara Foundation" description="Your occasion donation has been recorded." />
        <Navbar />
        <section className="pt-32 pb-16">
          <div className="container max-w-2xl text-center">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-[#F5A623]/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check size={40} className="text-[#F5A623]" />
            </motion.div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
              {t("Your Gift Has Been Recorded!", "ଆପଣଙ୍କ ଉପହାର ରେକର୍ଡ ହୋଇଛି!")}
            </h1>
            <p className="text-[#333]/70 text-lg mb-8">
              {t(
                `A donation of ₹${effectiveAmount.toLocaleString("en-IN")} in honour of ${celebrantName}'s ${selectedOccasion?.label || "occasion"}.`,
                `${celebrantName}ଙ୍କ ${selectedOccasion?.labelOd || "ଅବସର"} ସମ୍ମାନରେ ₹${effectiveAmount.toLocaleString("en-IN")}ର ଦାନ।`
              )}
            </p>

            {/* e-Card Preview */}
            <div className="bg-white border border-[#F5A623]/30 rounded-lg p-8 mb-8 text-left max-w-md mx-auto shadow-sm">
              <div className="text-center mb-4">
                <span className="text-4xl">{selectedOccasion?.emoji}</span>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#F5A623] mt-2">
                  HAPPY {(selectedOccasion?.label || "OCCASION").toUpperCase()}
                </p>
              </div>
              <h3 className="font-serif text-2xl text-center text-[#1A1A1A] mb-1">{celebrantName}</h3>
              {relationship && <p className="text-center text-[#333]/50 text-sm mb-3">{relationship}</p>}
              {wishingMessage && (
                <p className="font-serif italic text-[#333]/70 text-center text-sm leading-relaxed mb-4 border-t border-[#F5A623]/20 pt-4">
                  &ldquo;{wishingMessage}&rdquo;
                </p>
              )}
              <div className="border-t border-[#F5A623]/20 pt-3 text-center">
                <p className="text-[#F5A623] font-bold text-lg mb-1">{isAmountAnonymous ? "A generous donation" : `₹${effectiveAmount.toLocaleString("en-IN")} donated`}</p>
                <p className="text-[10px] text-[#F5A623] font-medium mb-2">{getImpactText(effectiveAmount, language)}</p>
                <p className="text-[10px] text-[#333]/50 font-mono tracking-wider uppercase mt-2">
                  WITH LOVE FROM {donorName.toUpperCase()}
                </p>
                <p className="text-[10px] text-[#F5A623] font-mono font-bold tracking-wider uppercase mt-2">
                  ABHIARA FOUNDATION
                </p>
              </div>
            </div>

            {/* Download & Share */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <button
                onClick={downloadECard}
                className="px-6 py-3 bg-[#111111] text-white font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#111111] transition-colors flex items-center justify-center gap-2"
              >
                <Download size={14} /> {t("DOWNLOAD PDF CARD", "PDF କାର୍ଡ ଡାଉନଲୋଡ୍")}
              </button>
              <button
                onClick={shareWhatsApp}
                className="px-6 py-3 bg-[#25D366] text-white font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#1DA851] transition-colors flex items-center justify-center gap-2"
              >
                <Share2 size={14} /> {t("SHARE ON WHATSAPP", "ହ୍ୱାଟ୍ସଆପରେ ସେୟାର")}
              </button>
            </div>

            <p className="text-[#333]/50 text-sm mb-6">
              {t(
                "Your payment has been verified. Thank you for celebrating with purpose!",
                "ଆପଣଙ୍କ ପେମେଣ୍ଟ ଯାଞ୍ଚ ହୋଇଛି। ଉଦ୍ଦେଶ୍ୟ ସହ ଉତ୍ସବ ପାଳନ କରିଥିବା ପାଇଁ ଧନ୍ୟବାଦ!"
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="px-6 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors">
                {t("BACK TO HOME", "ମୂଳ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ")}
              </Link>
              <Link href="/donate" className="px-6 py-3 border border-[#F5A623] text-[#F5A623] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#1A1A1A]/5 transition-colors">
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
        title={t("Donate for a Special Occasion, Abhiara Foundation", "ବିଶେଷ ଅବସର ପାଇଁ ଦାନ, ଅଭିଆରା ଫାଉଣ୍ଡେସନ୍")}
        description={t(
          "Celebrate birthdays, anniversaries, and special days with a donation to Abhiara Foundation.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନ୍‌କୁ ଅର୍ଥପୂର୍ଣ୍ଣ ଦାନ ସହ ଜନ୍ମଦିନ, ବାର୍ଷିକୀ ଓ ମାଇଲଖୁଣ୍ଟ ଉତ୍ସବ ପାଳନ କରନ୍ତୁ।"
        )}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-28 pb-12 md:pt-32 md:pb-14 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#111111]/75" />
        </div>
        <div className="relative z-10 container text-center">
          <span className="text-5xl mb-4 block">{selectedOccasion?.emoji || "🎁"}</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3">
            {t("Celebrate With Purpose", "ଉଦ୍ଦେଶ୍ୟ ସହ ଉତ୍ସବ ପାଳନ କରନ୍ତୁ")}
          </h1>
          <p className="font-sans text-white/70 text-lg max-w-xl mx-auto">
            {t(
              "Every milestone\u2014be it a birthday, anniversary, promotion, or festival\u2014carries a joy that's meant to be shared. Gift a child's education. Gift an elder's dignity.",
              "ପ୍ରତ୍ୟେକ ମାଇଲଖୁଣ୍ଟ\u2014ଜନ୍ମଦିନ, ବାର୍ଷିକୀ, ପଦୋନ୍ନତି, କିମ୍ବା ପର୍ବ\u2014ଏକ ଆନନ୍ଦ ବହନ କରେ ଯାହା ଅଂଶୀଦାର ହେବା ପାଇଁ ଅର୍ଥପୂର୍ଣ୍ଣ।"
            )}
          </p>
        </div>
      </section>

      {/* ===== MAIN FORM ===== */}
      <section className="py-10 md:py-14">
        <div className="container max-w-6xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">

              {/* LEFT: Form */}
              <div className="space-y-8">

                {/* Step 1: Choose Occasion */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 bg-[#F5A623] rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                    <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                      {t("Choose the Occasion", "ଅବସର ବାଛନ୍ତୁ")}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {OCCASIONS.map((occ) => (
                      <button
                        key={occ.id}
                        type="button"
                        onClick={() => setOccasion(occ.id)}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          occasion === occ.id
                            ? "border-[#F5A623] bg-[#F5A623]/5 shadow-sm"
                            : "border-gray-200 hover:border-[#F5A623]/40"
                        }`}
                      >
                        <span className="text-2xl block mb-1">{occ.emoji}</span>
                        <p className="text-xs font-medium text-[#1A1A1A]">{language === "od" ? occ.labelOd : occ.label}</p>
                      </button>
                    ))}
                  </div>

                  {/* Celebrant Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#333]/70 mb-1">
                        <User size={12} className="inline mr-1" />
                        {t("Celebrant's Name *", "ଉତ୍ସବକାରୀଙ୍କ ନାମ *")}
                      </label>
                      <input
                        type="text"
                        value={celebrantName}
                        onChange={(e) => setCelebrantName(e.target.value)}
                        placeholder={t("Who are you celebrating?", "ଆପଣ କାହାକୁ ଉତ୍ସବ ପାଳନ କରୁଛନ୍ତି?")}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]/30 outline-none bg-white text-[#1A1A1A]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#333]/70 mb-1">
                        <Calendar size={12} className="inline mr-1" />
                        {t("Occasion Date", "ଅବସର ତାରିଖ")}
                      </label>
                      <input
                        type="date"
                        value={occasionDate}
                        onChange={(e) => setOccasionDate(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]/30 outline-none bg-white text-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#333]/70 mb-1">{t("Relationship", "ସମ୍ପର୍କ")}</label>
                      <select
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]/30 outline-none bg-white text-[#1A1A1A]"
                      >
                        <option value="">{t("Select relationship", "ସମ୍ପର୍କ ବାଛନ୍ତୁ")}</option>
                        {RELATIONSHIPS.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#333]/70 mb-1">
                        <Mail size={12} className="inline mr-1" />
                        {t("Celebrant's Email (to send e-card)", "ଉତ୍ସବକାରୀଙ୍କ ଇମେଲ୍")}
                      </label>
                      <input
                        type="email"
                        value={celebrantEmail}
                        onChange={(e) => setCelebrantEmail(e.target.value)}
                        placeholder="celebrant@email.com"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]/30 outline-none bg-white text-[#1A1A1A]"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-medium text-[#333]/70 mb-1">
                      <MessageCircle size={12} className="inline mr-1" />
                      {t("Your Wishing Message", "ଆପଣଙ୍କ ଶୁଭେଚ୍ଛା ବାର୍ତ୍ତା")}
                    </label>
                    <textarea
                      value={wishingMessage}
                      onChange={(e) => setWishingMessage(e.target.value)}
                      rows={3}
                      placeholder={t("Write a heartfelt message for the celebrant...", "ଉତ୍ସବକାରୀଙ୍କ ପାଇଁ ଏକ ହୃଦୟସ୍ପର୍ଶୀ ବାର୍ତ୍ତା ଲେଖନ୍ତୁ...")}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]/30 outline-none resize-none bg-white text-[#1A1A1A]"
                    />
                  </div>
                </div>

                {/* Step 2: Choose Amount */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 bg-[#F5A623] rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                    <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                      {t("Choose Gift Amount", "ଉପହାର ରାଶି ବାଛନ୍ତୁ")}
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {PRESET_AMOUNTS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => { setAmount(a); setIsCustom(false); }}
                        className={`py-3 rounded-lg border text-center font-bold transition-all ${
                          !isCustom && amount === a
                            ? "border-[#F5A623] bg-[#F5A623] text-[#1A1A1A] shadow-md"
                            : "border-gray-200 text-[#1A1A1A] hover:border-[#F5A623]/40"
                        }`}
                      >
                        ₹{a.toLocaleString("en-IN")}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <button
                      type="button"
                      onClick={() => setIsCustom(true)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        isCustom ? "border-[#F5A623] bg-[#F5A623]/5 text-[#F5A623]" : "border-gray-200 text-[#333]/60 hover:border-[#F5A623]/40"
                      }`}
                    >
                      {t("Custom Amount", "ଇଚ୍ଛାମୂଳକ ରାଶି")}
                    </button>
                    {isCustom && (
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="₹"
                        min={100}
                        className="flex-1 px-3 py-2 border border-[#F5A623]/40 rounded-lg text-sm focus:ring-1 focus:ring-[#F5A623]/30 outline-none bg-white text-[#1A1A1A]"
                      />
                    )}
                  </div>

                  {effectiveAmount >= 100 && (
                    <div className="bg-[#1A1A1A]/5 border border-[#F5A623]/20 rounded-lg p-3 text-center">
                      <p className="text-[#F5A623] text-sm font-medium">
                        {selectedOccasion?.emoji} {t("Your gift of", "ଆପଣଙ୍କ ଉପହାର")} ₹{effectiveAmount.toLocaleString("en-IN")} {t("will", "ହେବ")} {getImpactText(effectiveAmount, language)}
                      </p>
                    </div>
                  )}



                  {/* Cause Selection */}
                  <div className="mt-4">
                    <p className="text-xs font-medium text-[#333]/70 mb-2">{t("Direct this gift towards:", "ଏହି ଉପହାର ଏଥିପାଇଁ:")}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {CAUSES.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCause(c.id)}
                          className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all text-xs ${
                            cause === c.id
                              ? "border-[#F5A623] bg-[#F5A623]/5"
                              : "border-gray-200 hover:border-[#F5A623]/40"
                          }`}
                        >
                          <c.icon size={14} style={{ color: c.color }} />
                          <span className="font-medium text-[#1A1A1A]">{language === "od" ? c.labelOd : c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 3: Your Details */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 bg-[#F5A623] rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                    <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                      {t("Your Details", "ଆପଣଙ୍କ ବିବରଣୀ")}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#333]/70 mb-1">{t("Your Name *", "ଆପଣଙ୍କ ନାମ *")}</label>
                      <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} required
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]/30 outline-none bg-white text-[#1A1A1A]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#333]/70 mb-1">{t("Your Email *", "ଆପଣଙ୍କ ଇମେଲ୍ *")}</label>
                      <input type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} required
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]/30 outline-none bg-white text-[#1A1A1A]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#333]/70 mb-1">{t("Phone", "ଫୋନ୍")}</label>
                      <input type="tel" value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]/30 outline-none bg-white text-[#1A1A1A]" />
                    </div>
                  </div>
                </div>

                {/* Step 4: Share & Remind */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 bg-[#F5A623] rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                    <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                      {t("Share & Remember", "ଅଂଶୀଦାର କରନ୍ତୁ ଓ ମନେ ରଖନ୍ତୁ")}
                    </h2>
                  </div>

                  {/* Show on Celebrate With Purpose wall */}
                  <label className="flex items-start gap-3 mb-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={isPublicOnWall}
                      onChange={(e) => setIsPublicOnWall(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#F5A623] focus:ring-[#F5A623]"
                    />
                    <div>
                      <p className="font-sans text-[13px] font-medium text-[#1A1A1A] group-hover:text-[#F5A623] transition-colors">
                        {t("Show on Celebrate With Purpose Wall", "ଉଦ୍ଦେଶ୍ୟ ସହ ଉତ୍ସବ ଦେୱାଳରେ ଦେଖାନ୍ତୁ")}
                      </p>
                      <p className="font-sans text-[11px] text-[#888]">
                        {t(
                          "Your name, celebrant name, occasion, and wishing message will be visible to inspire others.",
                          "ଆପଣଙ୍କ ନାମ, ଉତ୍ସବକାରୀଙ୍କ ନାମ, ଅବସର, ଓ ଶୁଭେଚ୍ଛା ବାର୍ତ୍ତା ଅନ୍ୟମାନଙ୍କୁ ଅନୁପ୍ରାଣିତ କରିବା ପାଇଁ ଦୃଶ୍ୟମାନ ହେବ।"
                        )}
                      </p>
                    </div>
                  </label>

                  {/* Auto-reminder for next year */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={wantReminder}
                      onChange={(e) => setWantReminder(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#F5A623] focus:ring-[#F5A623]"
                    />
                    <div>
                      <p className="font-sans text-[13px] font-medium text-[#1A1A1A] group-hover:text-[#F5A623] transition-colors">
                        {t("Remind me next year", "ଆସନ୍ତା ବର୍ଷ ମନେ ପକାଇବା")}
                      </p>
                      <p className="font-sans text-[11px] text-[#888]">
                        {t(
                          "We\u2019ll send you an email reminder before this occasion next year so you can celebrate with purpose again.",
                          "ଆମେ ଆପଣଙ୍କୁ ଆସନ୍ତା ବର୍ଷ ଏହି ଅବସର ପୂର୍ବରୁ ଏକ ଇମେଲ ସ୍ମାରକ ପଠାଇବୁ୤"
                        )}
                      </p>
                    </div>
                  </label>

                  {/* Keep Amount Anonymous */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={isAmountAnonymous}
                      onChange={(e) => setIsAmountAnonymous(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#F5A623] focus:ring-[#F5A623]"
                    />
                    <div>
                      <p className="font-sans text-[13px] font-medium text-[#1A1A1A] group-hover:text-[#F5A623] transition-colors">
                        {t("Keep my amount private", "ମୋ ରାଶି ଗୋପନୀୟ ରଖନ୍ତୁ")}
                      </p>
                      <p className="font-sans text-[11px] text-[#888]">
                        {t(
                          "Your donation amount won\u2019t be shown on the public Celebrate Wall or e-card.",
                          "ଆପଣଙ୍କ ଦାନ ରାଶି ସାର୍ବଜନିକ ସେଲିବ୍ରେଟ ଓୟାଲ ବା ଇ-କାର୍ଡରେ ଦେଖାଯିବ ନାହିଁ୤"
                        )}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || effectiveAmount < 100 || !celebrantName.trim() || !donorName.trim() || !donorEmail.trim()}
                  className="w-full py-4 bg-[#F5A623] text-[#1A1A1A] font-mono text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-lg shadow-lg"
                >
                  {isSubmitting ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> {t("PROCESSING...", "ପ୍ରକ୍ରିୟା ଚାଲିଛି...")}</>
                  ) : (
                    <><Send size={16} /> {t(`GIFT ₹${effectiveAmount.toLocaleString("en-IN")} FOR ${(selectedOccasion?.label || "OCCASION").toUpperCase()}`, `${(selectedOccasion?.labelOd || "ଅବସର")} ପାଇଁ ₹${effectiveAmount.toLocaleString("en-IN")} ଉପହାର ଦିଅନ୍ତୁ`)}</>
                  )}
                </button>
              </div>

              {/* RIGHT: Live e-Card Preview */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-white border border-[#F5A623]/30 rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-[#F5A623]/10 px-4 py-3 border-b border-[#F5A623]/20">
                    <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#F5A623] font-bold text-center">
                      {t("LIVE E-CARD PREVIEW", "ଲାଇଭ ଇ-କାର୍ଡ ପ୍ରିଭ୍ୟୁ")}
                    </p>
                  </div>
                  <div className="p-6 text-center">
                    <span className="text-4xl block mb-3">{selectedOccasion?.emoji || "🎁"}</span>
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
                      HAPPY {(selectedOccasion?.label || "OCCASION").toUpperCase()}
                    </p>
                    <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-1">
                      {celebrantName || t("Celebrant's Name", "ଉତ୍ସବକାରୀଙ୍କ ନାମ")}
                    </h3>
                    {relationship && <p className="text-[#333]/50 text-xs mb-2">{relationship}</p>}
                    {wishingMessage && (
                      <p className="font-serif italic text-[#333]/60 text-sm leading-relaxed mb-3 border-t border-[#F5A623]/20 pt-3 mt-3">
                        &ldquo;{wishingMessage}&rdquo;
                      </p>
                    )}
                    {effectiveAmount >= 100 && (
                      <div className="border-t border-[#F5A623]/20 pt-3 mt-3">
                        <p className="text-[#F5A623] font-bold text-sm">{isAmountAnonymous ? "A generous donation" : `₹${effectiveAmount.toLocaleString("en-IN")} donated`}</p>
                        <p className="text-[10px] text-[#F5A623] font-medium mt-1">{getImpactText(effectiveAmount, language)}</p>
                      </div>
                    )}
                    <div className="border-t border-[#F5A623]/20 pt-3 mt-3">
                      <p className="text-[10px] text-[#333]/40 font-mono tracking-wider uppercase">
                        {donorName ? `With love from ${donorName}` : t("Your name will appear here", "ଆପଣଙ୍କ ନାମ ଏଠାରେ ଦେଖାଯିବ")}
                      </p>
                      <p className="text-[10px] text-[#F5A623] font-mono tracking-wider uppercase mt-1">
                        ABHIARA FOUNDATION
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-4 bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={14} className="text-[#F5A623]" />
                    <p className="text-xs font-bold text-[#1A1A1A]">{t("100% Secure", "୧୦୦% ସୁରକ୍ଷିତ")}</p>
                  </div>
                  <p className="text-[10px] text-[#333]/50 leading-relaxed">
                    {t(
                      "Section 8 Company · CIN: U87300MH2026NPL471397 · 80G approval is pending. This payment is not eligible for an 80G tax deduction.",
                      "ଧାରା ୮ କମ୍ପାନୀ · CIN: U87300MH2026NPL471397 · 80G ଅନୁମୋଦନ ବିଚାରାଧୀନ। ଏହି ପେମେଣ୍ଟ 80G କର ରିହାତି ପାଇଁ ଯୋଗ୍ୟ ନୁହେଁ।"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ===== AKSHAYA PATRA QUOTE ===== */}
      <section className="py-8 bg-[#FAFAFA]">
        <div className="container max-w-3xl text-center">
          <p className="font-serif italic text-[#F5A623] text-lg md:text-xl leading-relaxed">
            &ldquo;{t(
              "Every milestone\u2014be it a birthday, anniversary, promotion, or festival\u2014carries a joy that\u2019s meant to be shared.",
              "ପ୍ରତ୍ୟେକ ମାଇଲଖୁଣ୍ଟ\u2014ଜନ୍ମଦିନ, ବାର୍ଷିକୀ, ପଦୋନ୍ନତି, କିମ୍ବା ପର୍ବ\u2014ଏକ ଆନନ୍ଦ ବହନ କରେ ଯାହା ଅଂଶୀଦାର ହେବା ପାଇଁ ଅର୍ଥପୂର୍ଣ୍ଣ।"
            )}&rdquo;
          </p>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#888] mt-3">
            {t("Abhiara Foundation · Celebrate With Purpose", "ଅଭିଆରା ଫାଉଣ୍ଡେସନ · ଉଦ୍ଦେଶ୍ୟ ସହ ଉତ୍ସବ")}
          </p>
        </div>
      </section>

      {/* ===== OTHER WAYS TO GIVE ===== */}
      <AnimatedSection>
        <section className="py-10 bg-[#FAFAFA]">
          <div className="container max-w-4xl">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] text-center mb-6">
              {t("Other Ways to Give", "ଦାନ କରିବାର ଅନ୍ୟ ଉପାୟ")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/donate" className="bg-white border border-gray-100 rounded-lg p-5 text-center hover:shadow-md transition-shadow group">
                <Heart size={24} className="text-[#F5A623] mx-auto mb-2" />
                <h3 className="font-serif font-bold text-[#1A1A1A] mb-1">{t("Regular Donation", "ନିୟମିତ ଦାନ")}</h3>
                <p className="text-xs text-[#333]/60">{t("Monthly or one-time giving", "ମାସିକ କିମ୍ବା ଏକକାଳୀନ ଦାନ")}</p>
                <span className="text-[#F5A623] text-xs font-mono tracking-wider uppercase mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t("DONATE", "ଦାନ କରନ୍ତୁ")} <ArrowRight size={10} />
                </span>
              </Link>
              <Link href="/donate-in-memory" className="bg-white border border-gray-100 rounded-lg p-5 text-center hover:shadow-md transition-shadow group">
                <Star size={24} className="text-[#F5A623] mx-auto mb-2" />
                <h3 className="font-serif font-bold text-[#1A1A1A] mb-1">{t("In Memory", "ସ୍ମୃତିରେ")}</h3>
                <p className="text-xs text-[#333]/60">{t("Honour a loved one's memory", "ଏକ ପ୍ରିୟଜନଙ୍କ ସ୍ମୃତିକୁ ସମ୍ମାନ")}</p>
                <span className="text-[#F5A623] text-xs font-mono tracking-wider uppercase mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t("TRIBUTE", "ଶ୍ରଦ୍ଧାଞ୍ଜଳି")} <ArrowRight size={10} />
                </span>
              </Link>
              <Link href="/csr-partners" className="bg-white border border-gray-100 rounded-lg p-5 text-center hover:shadow-md transition-shadow group">
                <Shield size={24} className="text-[#F5A623] mx-auto mb-2" />
                <h3 className="font-serif font-bold text-[#1A1A1A] mb-1">{t("CSR Partnership", "CSR ସହଭାଗିତା")}</h3>
                <p className="text-xs text-[#333]/60">{t("Corporate social responsibility", "କର୍ପୋରେଟ ସାମାଜିକ ଦାୟିତ୍ୱ")}</p>
                <span className="text-[#F5A623] text-xs font-mono tracking-wider uppercase mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t("PARTNER", "ସହଭାଗୀ")} <ArrowRight size={10} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
