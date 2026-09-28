import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  BookOpen,
  Building2,
  Check,
  CloudRain,
  HeartPulse,
  HeartHandshake,
  PawPrint,
  Shield,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import Confetti from "@/components/Confetti";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];

type DonationCause =
  | "general"
  | "shiksha_sathi"
  | "elderly_care"
  | "medical_emergency"
  | "disaster_relief"
  | "animal_welfare";

const CAUSES: Array<{
  id: DonationCause;
  label: string;
  labelOd: string;
  description: string;
  descriptionOd: string;
  icon: typeof BookOpen;
}> = [
  {
    id: "general",
    label: "Abhiara Foundation General Fund",
    labelOd: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସାଧାରଣ ପାଣ୍ଠି",
    description: "Approved charitable work where help is most needed.",
    descriptionOd: "ଯେଉଁଠି ସହାୟତାର ଆବଶ୍ୟକତା ଅଧିକ, ସେଠାରେ ଅନୁମୋଦିତ ଜନହିତକର କାମ।",
    icon: HeartHandshake,
  },
  {
    id: "shiksha_sathi",
    label: "Abhiara Shiksha Sathi",
    labelOd: "ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ",
    description: "Verified tuition, books, school supplies and learning needs.",
    descriptionOd:
      "ଯାଞ୍ଚ ହୋଇଥିବା ଟ୍ୟୁସନ, ପୁସ୍ତକ, ସ୍କୁଲ ସାମଗ୍ରୀ ଓ ପଢ଼ା ଆବଶ୍ୟକତା।",
    icon: BookOpen,
  },
  {
    id: "elderly_care",
    label: "Elder Support",
    labelOd: "ବୟସ୍କ ସହାୟତା",
    description: "Food, medicines and urgent essentials in verified cases.",
    descriptionOd: "ଯାଞ୍ଚ ହୋଇଥିବା ମାମଲାରେ ଖାଦ୍ୟ, ଔଷଧ ଓ ଜରୁରୀ ସାମଗ୍ରୀ।",
    icon: Users,
  },
  {
    id: "medical_emergency",
    label: "Medical Emergency Help",
    labelOd: "ଚିକିତ୍ସା ଜରୁରୀ ସହାୟତା",
    description: "Verified urgent treatment needs for families in need.",
    descriptionOd:
      "ଆବଶ୍ୟକତାରେ ଥିବା ପରିବାରର ଯାଞ୍ଚ ହୋଇଥିବା ଜରୁରୀ ଚିକିତ୍ସା ଆବଶ୍ୟକତା।",
    icon: HeartPulse,
  },
  {
    id: "disaster_relief",
    label: "Disaster Relief",
    labelOd: "ବିପର୍ଯ୍ୟୟ ସହାୟତା",
    description:
      "Immediate supplies after floods, cyclones, fires or other local disasters.",
    descriptionOd:
      "ବନ୍ୟା, ବାତ୍ୟା, ଅଗ୍ନିକାଣ୍ଡ ବା ଅନ୍ୟ ସ୍ଥାନୀୟ ବିପର୍ଯ୍ୟୟ ପରେ ଜରୁରୀ ସାମଗ୍ରୀ।",
    icon: CloudRain,
  },
  {
    id: "animal_welfare",
    label: "Animal Welfare",
    labelOd: "ପଶୁ କଲ୍ୟାଣ",
    description: "Urgent feeding, treatment help and rescue coordination.",
    descriptionOd: "ଜରୁରୀ ଖାଦ୍ୟ, ଚିକିତ୍ସା ସହାୟତା ଓ ଉଦ୍ଧାର ସମନ୍ୱୟ।",
    icon: PawPrint,
  },
];

function getInitialAmount() {
  if (typeof window === "undefined") return 1000;
  const value = Number(
    new URLSearchParams(window.location.search).get("amount")
  );
  return Number.isFinite(value) && value >= 100 ? value : 1000;
}

function getInitialCause(): DonationCause {
  if (typeof window === "undefined") return "general";
  const value = new URLSearchParams(window.location.search).get("cause");
  if (CAUSES.some(item => item.id === value)) return value as DonationCause;
  return window.location.pathname === "/donate-for-education"
    ? "shiksha_sathi"
    : "general";
}

export default function Donate() {
  const { t } = useLanguage();
  const initialAmount = getInitialAmount();
  const [selectedAmount, setSelectedAmount] = useState(initialAmount);
  const [customAmount, setCustomAmount] = useState(
    PRESET_AMOUNTS.includes(initialAmount) ? "" : String(initialAmount)
  );
  const [isCustom, setIsCustom] = useState(
    !PRESET_AMOUNTS.includes(initialAmount)
  );
  const [cause, setCause] = useState<DonationCause>(getInitialCause);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [isAmountAnonymous, setIsAmountAnonymous] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const finalAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;
  const selectedCause = CAUSES.find(item => item.id === cause) ?? CAUSES[0];

  const getPaymentErrorMessage = (error: unknown) => {
    const message = error instanceof Error ? error.message : "";
    if (
      /Unexpected end of JSON|empty response|did not respond|non JSON/i.test(
        message
      )
    ) {
      return t(
        "The payment service did not respond. Please wait a moment and try again.",
        "ଦାନ ସେବାରୁ ଉତ୍ତର ମିଳିଲା ନାହିଁ। ଦୟାକରି କିଛି ସମୟ ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।"
      );
    }
    return t(
      "We could not start the payment. Please try again.",
      "ଦାନ ପ୍ରକ୍ରିୟା ଆରମ୍ଭ ହୋଇପାରିଲା ନାହିଁ। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।"
    );
  };

  const verifyPaymentMutation = trpc.donation.verifyPayment.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setShowConfetti(true);
      toast.success(t("Payment successful. Thank you.", "ଦାନ ସଫଳ। ଧନ୍ୟବାଦ।"));
    },
    onError: error => {
      toast.error(
        error.message || t("Payment verification failed.", "ଦାନ ଯାଞ୍ଚ ବିଫଳ।")
      );
    },
  });

  const createOrderMutation = trpc.donation.createOrder.useMutation({
    onSuccess: data => {
      const Razorpay = (
        window as typeof window & {
          Razorpay?: new (options: unknown) => {
            open: () => void;
            on: (event: string, callback: (response: any) => void) => void;
          };
        }
      ).Razorpay;
      if (!Razorpay) {
        toast.error(
          t(
            "The payment window did not load. Please refresh and try again.",
            "ଦାନ ୱିଣ୍ଡୋ ଖୋଲିଲା ନାହିଁ। ପୃଷ୍ଠା ପୁଣି ଖୋଲି ଚେଷ୍ଟା କରନ୍ତୁ।"
          )
        );
        return;
      }

      const razorpay = new Razorpay({
        key: data.keyId,
        amount: data.amount * 100,
        currency: data.currency,
        name: "Abhiara Foundation",
        description: `Donation for ${selectedCause.label}`,
        order_id: data.orderId,
        handler: (response: any) => {
          verifyPaymentMutation.mutate({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            donationId: data.donationId,
          });
        },
        prefill: {
          name: donorName,
          email: donorEmail,
          contact: donorPhone || undefined,
        },
        theme: { color: "#F5A623" },
        modal: {
          ondismiss: () =>
            toast.error(t("Payment cancelled.", "ଦାନ ବାତିଲ ହୋଇଛି।")),
        },
      });

      razorpay.on("payment.failed", (response: any) => {
        toast.error(
          response?.error?.description ||
            t(
              "The payment failed. Please try another payment method.",
              "ଦାନ ବିଫଳ ହେଲା। ଦୟାକରି ଅନ୍ୟ ଦାନ ପଦ୍ଧତି ଚେଷ୍ଟା କରନ୍ତୁ।"
            )
        );
      });
      razorpay.open();
    },
    onError: error => toast.error(getPaymentErrorMessage(error)),
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (finalAmount < 100) {
      toast.error(t("Minimum donation is ₹100.", "ସର୍ବନିମ୍ନ ଦାନ ₹100।"));
      return;
    }
    if (!donorName.trim() || !donorEmail.trim()) {
      toast.error(
        t("Please enter your name and email.", "ଦୟାକରି ନାମ ଓ ଇମେଲ ଲେଖନ୍ତୁ।")
      );
      return;
    }
    if (!consentChecked) {
      toast.error(
        t(
          "Please confirm the donor declaration.",
          "ଦୟାକରି ଦାତା ଘୋଷଣା ନିଶ୍ଚିତ କରନ୍ତୁ।"
        )
      );
      return;
    }

    createOrderMutation.mutate({
      amount: finalAmount,
      frequency: "one_time",
      cause,
      donorName: donorName.trim(),
      donorEmail: donorEmail.trim(),
      donorPhone: donorPhone.trim() || undefined,
      isAmountAnonymous,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Confetti trigger={showConfetti} />
      <SEO
        title={t("Donate | Abhiara Foundation", "ଦାନ | ଅଭିଆରା ଫାଉଣ୍ଡେସନ")}
        description={t(
          "Make a secure one-time donation to Abhiara Foundation's general fund or a cause within our approved work.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନର ସାଧାରଣ ପାଣ୍ଠି ବା ଆମ ଅନୁମୋଦିତ କାମର କୌଣସି କ୍ଷେତ୍ର ପାଇଁ ସୁରକ୍ଷିତ ଏକକାଳୀନ ଦାନ କରନ୍ତୁ।"
        )}
        url="https://www.abhiarafoundation.org/donate"
      />
      <Navbar />

      <section className="relative pt-28 pb-9 md:pt-32 md:pb-11 overflow-hidden bg-[#111111]">
        <div className="relative z-10 container text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
            {t("❤️🙏 DONATION", "❤️🙏 ଦାନ କରନ୍ତୁ")}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
            {t(
              "Support Abhiara Foundation",
              "ଅଭିଆରା ଫାଉଣ୍ଡେସନକୁ ସହାୟତା କରନ୍ତୁ"
            )}
          </h1>
          <p className="font-sans text-[15px] md:text-[16px] text-white/75 max-w-2xl mx-auto mb-5">
            {t(
              "Choose a specific cause to keep your donation within that cause. Choose General Fund to support any approved Abhiara programme.",
              "ଆପଣଙ୍କ ଦାନକୁ ସେହି କ୍ଷେତ୍ରରେ ରଖିବା ପାଇଁ ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ କାରଣ ବାଛନ୍ତୁ। ଯେକୌଣସି ଅନୁମୋଦିତ ଅଭିଆରା କାର୍ଯ୍ୟକ୍ରମକୁ ସହାୟତା ପାଇଁ ସାଧାରଣ ପାଣ୍ଠି ବାଛନ୍ତୁ।"
            )}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/70">
            <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase">
              <Shield size={12} className="text-[#F5A623]" />{" "}
              {t("Section 8 Company", "ସେକ୍ସନ 8 କମ୍ପାନୀ")}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase">
              <Check size={12} className="text-[#F5A623]" />{" "}
              {t("Secure One Time Payment", "ସୁରକ୍ଷିତ ଏକକାଳୀନ ପେମେଣ୍ଟ")}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase">
              <Building2 size={12} className="text-[#F5A623]" />{" "}
              {t("80G Under Process", "80G ପ୍ରକ୍ରିୟାରେ ଅଛି")}
            </span>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-[#FAFAFA]">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-7 lg:gap-10 items-start">
            <AnimatedSection direction="left">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-5 md:p-6">
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#F5A623] mb-2">
                    {t("YOUR SUPPORT HELPS", "ଆପଣଙ୍କ ସହାୟତା")}
                  </p>
                  <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
                    {t(
                      "Choose where your donation can help.",
                      "ଆପଣଙ୍କ ଦାନ କେଉଁଠି ସହାୟତା କରିପାରେ ବାଛନ୍ତୁ।"
                    )}
                  </h2>
                  <div className="space-y-3">
                    {[
                      t(
                        "General Fund donations may support any approved Abhiara programme and the necessary costs of carrying out that work.",
                        "ସାଧାରଣ ପାଣ୍ଠିର ଦାନ ଯେକୌଣସି ଅନୁମୋଦିତ ଅଭିଆରା କାର୍ଯ୍ୟକ୍ରମ ଏବଂ ସେହି କାମ କରିବା ପାଇଁ ଆବଶ୍ୟକ ଖର୍ଚ୍ଚକୁ ସହାୟତା କରିପାରେ।"
                      ),
                      t(
                        "A cause-specific donation is used only for verified needs and programme costs within that selected cause.",
                        "ନିର୍ଦ୍ଦିଷ୍ଟ କାରଣର ଦାନ କେବଳ ବାଛିଥିବା ସେହି କ୍ଷେତ୍ରର ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଓ କାର୍ଯ୍ୟକ୍ରମ ଖର୍ଚ୍ଚରେ ବ୍ୟବହୃତ ହୁଏ।"
                      ),
                      t(
                        "Education donations stay with education. The same rule applies to elder support, medical help, disaster relief and animal welfare.",
                        "ଶିକ୍ଷା ପାଇଁ ଦାନ ଶିକ୍ଷାରେ ହିଁ ବ୍ୟବହୃତ ହୁଏ। ବୟସ୍କ ସହାୟତା, ଚିକିତ୍ସା ସହାୟତା, ବିପର୍ଯ୍ୟୟ ସହାୟତା ଓ ପଶୁ କଲ୍ୟାଣ ପାଇଁ ମଧ୍ୟ ସେହି ନିୟମ ଲାଗୁ ହୁଏ।"
                      ),
                    ].map(item => (
                      <div key={item} className="flex items-start gap-3">
                        <Check
                          size={16}
                          className="text-[#F5A623] mt-0.5 flex-shrink-0"
                        />
                        <p className="font-sans text-[14px] text-[#555] leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="font-sans text-[12px] text-[#777] mt-5 pt-4 border-t border-gray-100">
                    {t(
                      "We currently accept donations only from Indian citizens using Indian funds. Foreign contributions are not accepted at present.",
                      "ବର୍ତ୍ତମାନ ଆମେ କେବଳ ଭାରତୀୟ ନାଗରିକଙ୍କ ଭାରତୀୟ ଧନରୁ ଦାନ ଗ୍ରହଣ କରୁଛୁ। ବିଦେଶୀ ଅନୁଦାନ ବର୍ତ୍ତମାନ ଗ୍ରହଣ କରାଯାଉ ନାହିଁ।"
                    )}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white border border-gray-200 rounded-xl p-5 md:p-7"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                      <div>
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                          {t("Make a one time donation", "ଏକକାଳୀନ ଦାନ କରନ୍ତୁ")}
                        </h2>
                        <p className="font-sans text-[13px] text-[#777] mt-1">
                          {t(
                            "Choose an amount, select a cause, and pay securely.",
                            "ରାଶି ଓ କାରଣ ବାଛି ସୁରକ୍ଷିତ ଭାବେ ଦାନ କରନ୍ତୁ।"
                          )}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 bg-[#F5A623]/10 text-[#9A6100] rounded-full px-3 py-1.5 font-mono text-[9px] tracking-wider uppercase">
                        <Shield size={11} /> {t("ONE TIME", "ଏକକାଳୀନ")}
                      </span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#9A6100] mb-2">
                          {t("CHOOSE AMOUNT", "ରାଶି ବାଛନ୍ତୁ")}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                          {PRESET_AMOUNTS.map(amount => (
                            <button
                              key={amount}
                              type="button"
                              onClick={() => {
                                setSelectedAmount(amount);
                                setIsCustom(false);
                                setCustomAmount("");
                              }}
                              className={`py-3 rounded-lg font-serif text-lg font-bold border-2 transition-colors ${
                                !isCustom && selectedAmount === amount
                                  ? "border-[#F5A623] bg-[#F5A623]/10 text-[#1A1A1A]"
                                  : "border-gray-200 text-[#333] hover:border-[#F5A623]/60"
                              }`}
                            >
                              ₹{amount.toLocaleString("en-IN")}
                            </button>
                          ))}
                        </div>
                        <div
                          className={`flex items-center gap-2 border-2 rounded-lg px-3 py-2.5 ${isCustom ? "border-[#F5A623]" : "border-gray-200"}`}
                        >
                          <span className="font-serif text-lg font-bold text-[#1A1A1A]">
                            ₹
                          </span>
                          <input
                            type="number"
                            min="100"
                            inputMode="numeric"
                            value={customAmount}
                            onFocus={() => setIsCustom(true)}
                            onChange={event => {
                              setCustomAmount(event.target.value);
                              setIsCustom(true);
                            }}
                            placeholder={t(
                              "Enter another amount",
                              "ଅନ୍ୟ ରାଶି ଲେଖନ୍ତୁ"
                            )}
                            className="w-full bg-transparent border-none outline-none font-sans text-[14px] text-[#1A1A1A]"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#9A6100] mb-2">
                          {t("CHOOSE CAUSE", "କାରଣ ବାଛନ୍ତୁ")}
                        </p>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {CAUSES.map(item => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setCause(item.id)}
                              aria-pressed={cause === item.id}
                              className={`flex min-h-20 items-start gap-3 rounded-lg border-2 px-3 py-3 text-left transition-colors ${
                                cause === item.id
                                  ? "border-[#F5A623] bg-[#F5A623]/8"
                                  : "border-gray-200 hover:border-[#F5A623]/50"
                              }`}
                            >
                              <item.icon
                                size={18}
                                className="mt-0.5 flex-shrink-0 text-[#F5A623]"
                              />
                              <span>
                                <span className="block font-sans text-[13px] font-semibold text-[#333]">
                                  {t(item.label, item.labelOd)}
                                </span>
                                <span className="mt-1 block font-sans text-[11px] leading-5 text-[#777]">
                                  {t(item.description, item.descriptionOd)}
                                </span>
                              </span>
                            </button>
                          ))}
                        </div>
                        <div
                          role="status"
                          className="mt-3 rounded-lg border border-[#F5A623]/40 bg-[#FFF8E8] px-4 py-3"
                        >
                          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#9A6100]">
                            {t(
                              "Fund use for your selection",
                              "ଆପଣଙ୍କ ବାଛିଥିବା ପାଣ୍ଠିର ବ୍ୟବହାର"
                            )}
                          </p>
                          <p className="mt-1 font-sans text-[12px] leading-5 text-[#555]">
                            {cause === "general"
                              ? t(
                                  "Your General Fund donation may be used across any approved Abhiara programme, based on verified need and an approved budget.",
                                  "ଆପଣଙ୍କ ସାଧାରଣ ପାଣ୍ଠି ଦାନ ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଓ ଅନୁମୋଦିତ ବଜେଟ ଅନୁଯାୟୀ ଯେକୌଣସି ଅନୁମୋଦିତ ଅଭିଆରା କାର୍ଯ୍ୟକ୍ରମରେ ବ୍ୟବହୃତ ହୋଇପାରେ।"
                                )
                              : t(
                                  `Your ${selectedCause.label} donation will be used only for verified needs and programme costs within ${selectedCause.label}. It will not be moved to another cause.`,
                                  `ଆପଣଙ୍କ ${selectedCause.labelOd} ଦାନ କେବଳ ${selectedCause.labelOd} କ୍ଷେତ୍ରର ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଓ କାର୍ଯ୍ୟକ୍ରମ ଖର୍ଚ୍ଚରେ ବ୍ୟବହୃତ ହେବ। ଏହା ଅନ୍ୟ କାରଣକୁ ସ୍ଥାନାନ୍ତର ହେବ ନାହିଁ।`
                                )}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#9A6100] mb-2">
                          {t("YOUR DETAILS", "ଆପଣଙ୍କ ବିବରଣୀ")}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-sans text-[11px] font-medium text-[#555] mb-1">
                              {t("Full Name", "ସମ୍ପୂର୍ଣ୍ଣ ନାମ")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              autoComplete="name"
                              value={donorName}
                              onChange={event =>
                                setDonorName(event.target.value)
                              }
                              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none"
                            />
                          </div>
                          <div>
                            <label className="block font-sans text-[11px] font-medium text-[#555] mb-1">
                              {t("Email", "ଇମେଲ")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              autoComplete="email"
                              value={donorEmail}
                              onChange={event =>
                                setDonorEmail(event.target.value)
                              }
                              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none"
                            />
                          </div>
                        </div>
                        <div className="mt-3">
                          <label className="block font-sans text-[11px] font-medium text-[#555] mb-1">
                            {t("Phone", "ଫୋନ")}{" "}
                            <span className="text-[#999]">
                              ({t("optional", "ଐଚ୍ଛିକ")})
                            </span>
                          </label>
                          <input
                            type="tel"
                            autoComplete="tel"
                            value={donorPhone}
                            onChange={event =>
                              setDonorPhone(event.target.value)
                            }
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none"
                          />
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5">
                        <p className="font-sans text-[11px] text-blue-800 leading-relaxed">
                          {t(
                            "80G approval is under process. Donations made now are not eligible for an 80G tax deduction. We can provide a Donation Acknowledgement.",
                            "80G ଅନୁମୋଦନ ପ୍ରକ୍ରିୟାରେ ଅଛି। ବର୍ତ୍ତମାନର ଦାନ 80G କର ରିହାତି ପାଇଁ ଯୋଗ୍ୟ ନୁହେଁ। ଆମେ ଦାନ ସ୍ୱୀକୃତି ପତ୍ର ଦେଇପାରିବୁ।"
                          )}
                        </p>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
                        <p className="font-sans text-[11px] text-amber-900 leading-relaxed">
                          {t(
                            "Please donate only to official Abhiara Foundation bank accounts or authorised payment channels. The Foundation never asks supporters to transfer programme funds to personal accounts.",
                            "ଦୟାକରି କେବଳ ଅଧିକୃତ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ବ୍ୟାଙ୍କ ଖାତା ବା ଅନୁମୋଦିତ ପେମେଣ୍ଟ ମାଧ୍ୟମରେ ଦାନ କରନ୍ତୁ। ଫାଉଣ୍ଡେସନ କେବେ ବି ବ୍ୟକ୍ତିଗତ ଖାତାକୁ କାର୍ଯ୍ୟକ୍ରମ ଧନ ପଠାଇବାକୁ କୁହେ ନାହିଁ।"
                          )}
                        </p>
                      </div>

                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isAmountAnonymous}
                          onChange={event =>
                            setIsAmountAnonymous(event.target.checked)
                          }
                          className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#F5A623] focus:ring-[#F5A623]"
                        />
                        <span className="font-sans text-[12px] text-[#555] leading-relaxed">
                          {t(
                            "Keep my donation amount private.",
                            "ମୋ ଦାନ ରାଶି ଗୋପନୀୟ ରଖନ୍ତୁ।"
                          )}
                        </span>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer rounded-lg bg-gray-50 p-3">
                        <input
                          type="checkbox"
                          checked={consentChecked}
                          onChange={event =>
                            setConsentChecked(event.target.checked)
                          }
                          className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#F5A623] focus:ring-[#F5A623]"
                        />
                        <span className="font-sans text-[11px] text-[#555] leading-relaxed">
                          {t(
                            cause === "general"
                              ? "I confirm that I am an Indian citizen donating from my own Indian funds. I agree that this General Fund donation may support any approved Abhiara programme and that a payment record may be sent to me by email."
                              : `I confirm that I am an Indian citizen donating from my own Indian funds. I agree that this donation will be used only for ${selectedCause.label} and that a payment record may be sent to me by email.`,
                            cause === "general"
                              ? "ମୁଁ ନିଶ୍ଚିତ କରୁଛି ଯେ ମୁଁ ଜଣେ ଭାରତୀୟ ନାଗରିକ ଏବଂ ମୋର ନିଜ ଭାରତୀୟ ଧନରୁ ଦାନ କରୁଛି। ଏହି ସାଧାରଣ ପାଣ୍ଠି ଦାନ ଯେକୌଣସି ଅନୁମୋଦିତ ଅଭିଆରା କାର୍ଯ୍ୟକ୍ରମକୁ ସହାୟତା କରିପାରିବ ଏବଂ ମୋତେ ଇମେଲରେ ଦାନ ରେକର୍ଡ ପଠାଯାଇପାରିବ ବୋଲି ମୁଁ ସମ୍ମତ।"
                              : `ମୁଁ ନିଶ୍ଚିତ କରୁଛି ଯେ ମୁଁ ଜଣେ ଭାରତୀୟ ନାଗରିକ ଏବଂ ମୋର ନିଜ ଭାରତୀୟ ଧନରୁ ଦାନ କରୁଛି। ଏହି ଦାନ କେବଳ ${selectedCause.labelOd} ପାଇଁ ବ୍ୟବହୃତ ହେବ ଏବଂ ମୋତେ ଇମେଲରେ ଦାନ ରେକର୍ଡ ପଠାଯାଇପାରିବ ବୋଲି ମୁଁ ସମ୍ମତ।`
                          )}
                        </span>
                      </label>

                      <button
                        type="submit"
                        disabled={
                          createOrderMutation.isPending ||
                          verifyPaymentMutation.isPending ||
                          !consentChecked
                        }
                        className="w-full py-3.5 bg-[#F5A623] text-[#1A1A1A] font-mono text-[11px] tracking-[0.15em] uppercase font-bold rounded-lg hover:bg-[#E8960E] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {createOrderMutation.isPending ||
                        verifyPaymentMutation.isPending
                          ? t("PLEASE WAIT", "ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ")
                          : `${t("PAY SECURELY", "ସୁରକ୍ଷିତ ଦାନ")} ₹${finalAmount.toLocaleString("en-IN")}`}
                      </button>
                      <p className="text-center font-sans text-[10px] text-[#999]">
                        {t(
                          "Secure one time payment.",
                          "ସୁରକ୍ଷିତ ଏକକାଳୀନ ପେମେଣ୍ଟ।"
                        )}
                      </p>
                      <p className="text-center font-sans text-[10px] text-[#777]">
                        <Link
                          href="/donation-and-refund-policy"
                          className="underline underline-offset-2"
                        >
                          {t("Donation and refund policy", "ଦାନ ଓ ରିଫଣ୍ଡ ନୀତି")}
                        </Link>
                      </p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-[#F5A623]/40 rounded-xl p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-[#F5A623]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                      <Check size={32} className="text-[#F5A623]" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">
                      {t("Thank you", "ଧନ୍ୟବାଦ")}
                    </h2>
                    <p className="font-sans text-[15px] text-[#555] mb-5">
                      {t(
                        `Your payment of ₹${finalAmount.toLocaleString("en-IN")} was successful and has been recorded.`,
                        `ଆପଣଙ୍କ ₹${finalAmount.toLocaleString("en-IN")} ଦାନ ସଫଳ ହୋଇଛି ଏବଂ ରେକର୍ଡ କରାଯାଇଛି।`
                      )}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Link
                        href="/"
                        className="px-6 py-2.5 bg-[#F5A623] text-[#1A1A1A] font-mono text-[10px] font-bold tracking-[0.12em] uppercase rounded-lg"
                      >
                        {t("BACK TO HOME", "ମୂଳ ପୃଷ୍ଠା")}
                      </Link>
                      <Link
                        href="/student-impact"
                        className="px-6 py-2.5 border border-gray-300 text-[#333] font-mono text-[10px] font-bold tracking-[0.12em] uppercase rounded-lg"
                      >
                        {t("SEE STUDENT IMPACT", "ଛାତ୍ର ପ୍ରଭାବ ଦେଖନ୍ତୁ")}
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-white border-y border-gray-100">
        <div className="container max-w-5xl">
          <AnimatedSection className="text-center mb-7">
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#9A6100] mb-2">
              {t("OTHER WAYS TO DONATE", "ଦାନର ଅନ୍ୟ ଉପାୟ")}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A]">
              {t("UPI or bank transfer", "UPI କିମ୍ବା ବ୍ୟାଙ୍କ ଟ୍ରାନ୍ସଫର")}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-6 items-stretch">
            <AnimatedSection direction="left">
              <div className="h-full border border-gray-200 rounded-xl p-5 text-center bg-[#FAFAFA]">
                <div className="w-72 max-w-full mx-auto rounded-lg overflow-hidden bg-white">
                  <img
                    src="/images/donate-upi-qr.jpeg"
                    alt="Abhiara Foundation UPI QR code. Scan with any UPI app"
                    className="block w-full"
                  />
                </div>
                <p className="font-sans text-[13px] text-[#555] mt-4">
                  {t("Scan with any UPI app", "ଯେକୌଣସି UPI ଆପରେ ସ୍କାନ କରନ୍ତୁ")}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="h-full border border-gray-200 rounded-xl p-5 md:p-6 bg-[#FAFAFA]">
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-4">
                  {t("Bank details", "ବ୍ୟାଙ୍କ ବିବରଣୀ")}
                </h3>
                <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-3 text-[13px]">
                  <dt className="font-sans text-[#777]">
                    {t("Account Name", "ଖାତା ନାମ")}
                  </dt>
                  <dd className="font-sans font-semibold text-[#1A1A1A]">
                    ABHIARA FOUNDATION
                  </dd>
                  <dt className="font-sans text-[#777]">
                    {t("Account No.", "ଖାତା ନଂ.")}
                  </dt>
                  <dd className="font-sans font-semibold text-[#1A1A1A]">
                    50200122835102
                  </dd>
                  <dt className="font-sans text-[#777]">IFSC</dt>
                  <dd className="font-sans font-semibold text-[#1A1A1A]">
                    HDFC0000079
                  </dd>
                  <dt className="font-sans text-[#777]">
                    {t("Bank", "ବ୍ୟାଙ୍କ")}
                  </dt>
                  <dd className="font-sans text-[#333]">HDFC Bank</dd>
                  <dt className="font-sans text-[#777]">
                    {t("Branch", "ଶାଖା")}
                  </dt>
                  <dd className="font-sans text-[#333]">
                    Santacruz West, Mumbai 400054
                  </dd>
                  <dt className="font-sans text-[#777]">
                    {t("Account Type", "ଖାତା ପ୍ରକାର")}
                  </dt>
                  <dd className="font-sans text-[#333]">
                    {t("Current Account", "ଚଳିତ ଖାତା")}
                  </dd>
                </dl>
                <p className="font-sans text-[11px] text-[#777] mt-5 pt-4 border-t border-gray-200 leading-relaxed">
                  {t(
                    "To reserve a direct UPI or bank transfer for a specific cause, email the payment reference and cause to info@abhiarafoundation.org. Otherwise it is recorded as a General Fund donation. You may also request a Donation Acknowledgement in the same email.",
                    "ସିଧା UPI କିମ୍ବା ବ୍ୟାଙ୍କ ଟ୍ରାନ୍ସଫରକୁ ନିର୍ଦ୍ଦିଷ୍ଟ କାରଣ ପାଇଁ ରଖିବାକୁ ପେମେଣ୍ଟ ରେଫରେନ୍ସ ଓ କାରଣ info@abhiarafoundation.org କୁ ଇମେଲ କରନ୍ତୁ। ନହେଲେ ଏହା ସାଧାରଣ ପାଣ୍ଠିର ଦାନ ଭାବେ ରେକର୍ଡ ହେବ। ସେହି ଇମେଲରେ ଆପଣ ଦାନ ସ୍ୱୀକୃତି ପତ୍ର ମଧ୍ୟ ମାଗିପାରିବେ।"
                  )}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-[#FAFAFA]">
        <div className="container max-w-3xl">
          <AnimatedSection className="text-center mb-6">
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#9A6100] mb-2">
              {t("COMMON QUESTIONS", "ସାଧାରଣ ପ୍ରଶ୍ନ")}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A]">
              {t("Before you donate", "ଦାନ ପୂର୍ବରୁ")}
            </h2>
          </AnimatedSection>
          <Accordion
            type="single"
            collapsible
            className="bg-white border border-gray-200 rounded-xl px-5"
          >
            {[
              {
                q: t("How is my donation used?", "ମୋ ଦାନ କିପରି ବ୍ୟବହୃତ ହୁଏ?"),
                a: t(
                  "A cause-specific donation is used only within that cause. An education donation stays with education, and the same rule applies to every other cause. A General Fund donation may support any approved Abhiara programme. Every payment is recorded under its selected cause in our accounts.",
                  "ନିର୍ଦ୍ଦିଷ୍ଟ କାରଣର ଦାନ କେବଳ ସେହି କାରଣରେ ବ୍ୟବହୃତ ହୁଏ। ଶିକ୍ଷା ଦାନ ଶିକ୍ଷାରେ ରହେ ଏବଂ ଅନ୍ୟ ପ୍ରତ୍ୟେକ କାରଣ ପାଇଁ ମଧ୍ୟ ସେହି ନିୟମ ଲାଗୁ ହୁଏ। ସାଧାରଣ ପାଣ୍ଠିର ଦାନ ଯେକୌଣସି ଅନୁମୋଦିତ ଅଭିଆରା କାର୍ଯ୍ୟକ୍ରମକୁ ସହାୟତା କରିପାରେ। ପ୍ରତ୍ୟେକ ଦାନ ଆମ ହିସାବରେ ବାଛିଥିବା କାରଣ ଅଧୀନରେ ରେକର୍ଡ ହୁଏ।"
                ),
              },
              {
                q: t(
                  "Is an 80G tax deduction available?",
                  "80G କର ରିହାତି ମିଳିବ କି?"
                ),
                a: t(
                  "Not yet. Our 80G approval is under process. Donations made now are not eligible for an 80G tax deduction. We can provide a Donation Acknowledgement.",
                  "ଏଯାବତ ନୁହେଁ। ଆମ 80G ଅନୁମୋଦନ ପ୍ରକ୍ରିୟାରେ ଅଛି। ବର୍ତ୍ତମାନର ଦାନ 80G କର ରିହାତି ପାଇଁ ଯୋଗ୍ୟ ନୁହେଁ। ଆମେ ଦାନ ସ୍ୱୀକୃତି ପତ୍ର ଦେଇପାରିବୁ।"
                ),
              },
              {
                q: t(
                  "Can I pay by UPI or bank transfer?",
                  "ମୁଁ UPI କିମ୍ବା ବ୍ୟାଙ୍କ ଟ୍ରାନ୍ସଫରରେ ଦାନ କରିପାରିବି କି?"
                ),
                a: t(
                  "Yes. Use the QR code or bank details shown above. We do not accept cash and we do not use agents to collect donations.",
                  "ହଁ। ଉପରେ ଥିବା QR କୋଡ କିମ୍ବା ବ୍ୟାଙ୍କ ବିବରଣୀ ବ୍ୟବହାର କରନ୍ତୁ। ଆମେ ନଗଦ ଦାନ ନେଉନାହୁଁ ଏବଂ ଦାନ ସଂଗ୍ରହ ପାଇଁ ଏଜେଣ୍ଟ ବ୍ୟବହାର କରୁନାହୁଁ।"
                ),
              },
            ].map((item, index) => (
              <AccordionItem
                key={item.q}
                value={`faq-${index}`}
                className="border-gray-200"
              >
                <AccordionTrigger className="font-sans text-[15px] font-medium text-[#1A1A1A] hover:no-underline text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-[13px] text-[#555] leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-mono text-[9px] tracking-wider uppercase text-[#9A6100]">
                Section 8 Company
              </p>
              <p className="font-sans text-[12px] text-[#555] mt-1">
                CIN U87300MH2026NPL471397
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-mono text-[9px] tracking-wider uppercase text-[#9A6100]">
                NGO Darpan
              </p>
              <p className="font-sans text-[12px] text-[#555] mt-1">
                MH/2026/1110513
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
