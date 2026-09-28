/**
 * Fundraise for Us. Peer-to-Peer Campaign Page
 * Let supporters create their own fundraising campaigns
 * (birthday fundraisers, marathon pledges, wedding gifts, etc.)
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  Cake, Trophy, Heart, Gift, Building2, GraduationCap, Sparkles, Users,
  ArrowRight, CheckCircle, Share2, Target, MessageSquare, Mail,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const HERO_IMG = "/images/education-children-1.jpeg";

const CAMPAIGN_TYPES = [
  { id: "birthday", label: "Birthday Fundraiser", icon: Cake, desc: "Ask friends to donate instead of gifts" },
  { id: "marathon", label: "Marathon / Sports", icon: Trophy, desc: "Run for a cause and get sponsors" },
  { id: "wedding", label: "Wedding Gift", icon: Heart, desc: "Request donations as wedding blessings" },
  { id: "memorial", label: "In Memory", icon: Sparkles, desc: "Honour a loved one's legacy" },
  { id: "corporate", label: "Corporate Challenge", icon: Building2, desc: "Team fundraising for CSR goals" },
  { id: "school", label: "School / College", icon: GraduationCap, desc: "Student-led campaigns for change" },
  { id: "festival", label: "Festival Giving", icon: Gift, desc: "Celebrate festivals with purpose" },
  { id: "other", label: "Other", icon: Users, desc: "Any creative fundraising idea" },
] as const;

const CAUSES = [
  { id: "education", label: "Education for Children" },
  { id: "elderly_care", label: "Elderly Care & Dignity" },
  { id: "vidyapeeth", label: "Abhiara Vidyapeeth" },
  { id: "general", label: "Where Most Needed" },
] as const;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80)
    + "-" + Math.random().toString(36).slice(2, 7);
}

export default function FundraiseForUs() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [campaignType, setCampaignType] = useState<string>("birthday");
  const [cause, setCause] = useState<string>("general");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState(10000);
  const [endDate, setEndDate] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [creatorEmail, setCreatorEmail] = useState("");
  const [creatorPhone, setCreatorPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const createCampaign = trpc.campaign.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Campaign submitted for review!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create campaign. Please try again.");
    },
  });

  const handleSubmit = () => {
    if (!creatorName || !creatorEmail || !title || description.length < 20) {
      toast.error("Please fill all required fields.");
      return;
    }
    createCampaign.mutate({
      creatorName,
      creatorEmail,
      creatorPhone: creatorPhone || undefined,
      title,
      description,
      campaignType: campaignType as any,
      cause: cause as any,
      goalAmount,
      endDate: endDate || undefined,
      slug: generateSlug(title),
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <Navbar />
        <section className="pt-32 pb-20">
          <div className="container text-center max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
              <CheckCircle size={40} className="text-amber-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-4">
              {t("Campaign Submitted!", "ଅଭିଯାନ ଦାଖଲ ହୋଇଛି!")}
            </h1>
            <p className="font-sans text-[17px] text-gray-600 mb-6 leading-relaxed">
              {t(
                "Your fundraising campaign has been submitted for review. We'll approve it within 24 hours and send you a shareable link.",
                "ଆପଣଙ୍କ ଅଭିଯାନ ସମୀକ୍ଷା ପାଇଁ ଦାଖଲ ହୋଇଛି। ଆମେ ୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ଏହାକୁ ଅନୁମୋଦନ କରିବୁ।"
              )}
            </p>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-left mb-8">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-2">{title}</h3>
              <p className="font-mono text-[10px] tracking-wider text-[#F5A623] mb-2">
                GOAL: ₹{goalAmount.toLocaleString("en-IN")} · {campaignType.toUpperCase()}
              </p>
              <p className="font-sans text-[13px] text-gray-600">{description.slice(0, 150)}...</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/activities" className="px-6 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors flex items-center gap-2">
                VIEW OUR ACTIVITIES <ArrowRight size={12} />
              </Link>
              <Link href="/" className="px-6 py-3 border border-gray-300 text-gray-700 font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:border-[#F5A623] transition-colors">
                BACK TO HOME
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
        title={t("Fundraise for Us, Abhiara Foundation", "ଆମ ପାଇଁ ତହବିଲ ସଂଗ୍ରହ, ଅଭିଆରା ଫାଉଣ୍ଡେସନ")}
        description="Create your own fundraising campaign for Abhiara Foundation. Birthday fundraisers, marathon pledges, and more."
      />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-white pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/90 to-[#111111]" />
        <div className="relative z-10 container text-center">
          <p className="section-label text-[#F5A623] mb-3">{t("PEER-TO-PEER GIVING", "ସହଯୋଗୀ ଦାନ")}</p>
          <h1 className="heading-xl text-[#1A1A1A] mb-4">
            {t("Fundraise for Abhiara", "ଅଭିଆରା ପାଇଁ ତହବିଲ ସଂଗ୍ରହ")}
          </h1>
          <p className="font-sans text-[17px] text-[#555] max-w-lg mx-auto leading-relaxed">
            {t(
              "Turn your birthday, marathon, wedding, or any occasion into a force for good. Create a campaign and invite friends to donate.",
              "ଆପଣଙ୍କ ଜନ୍ମଦିନ, ମାରାଥନ, ବିବାହ କିମ୍ବା ଯେକୌଣସି ଅବସରରେ ଏକ ଅଭିଯାନ ସୃଷ୍ଟି କରନ୍ତୁ।"
            )}
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 bg-[#FAFAFA] border-b border-gray-100">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {[
              { num: "1", title: t("Choose Type", "ପ୍ରକାର ବାଛନ୍ତୁ"), desc: t("Pick your campaign style", "ଅଭିଯାନ ଶୈଳୀ ବାଛନ୍ତୁ") },
              { num: "2", title: t("Set Goal", "ଲକ୍ଷ୍ୟ ସେଟ୍ କରନ୍ତୁ"), desc: t("Define your fundraising target", "ତହବିଲ ଲକ୍ଷ୍ୟ ନିର୍ଧାରଣ") },
              { num: "3", title: t("Share Link", "ଲିଙ୍କ ସେୟାର"), desc: t("Invite friends & family", "ବନ୍ଧୁ ଓ ପରିବାରକୁ ଆମନ୍ତ୍ରଣ") },
              { num: "4", title: t("Track Impact", "ପ୍ରଭାବ ଟ୍ରାକ"), desc: t("Watch your impact grow", "ଆପଣଙ୍କ ପ୍ରଭାବ ବଢ଼ୁଥିବା ଦେଖନ୍ତୁ") },
            ].map((s) => (
              <div key={s.num}>
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#F5A623] text-[#1A1A1A] font-serif font-bold text-lg flex items-center justify-center">
                  {s.num}
                </div>
                <h3 className="font-serif text-[17px] font-bold text-[#1A1A1A] mb-1">{s.title}</h3>
                <p className="font-sans text-[12px] text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Form */}
      <section className="py-14 bg-[#FAFAFA]">
        <div className="container max-w-4xl mx-auto">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-bold ${
                  step >= s ? "bg-[#F5A623] text-[#1A1A1A]" : "bg-gray-200 text-gray-500"
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-[#F5A623]" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Campaign Type */}
          {step === 1 && (
            <AnimatedSection>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] text-center mb-2">
                {t("What type of campaign?", "କେଉଁ ପ୍ରକାରର ଅଭିଯାନ?")}
              </h2>
              <p className="font-sans text-[16px] text-gray-600 text-center mb-8">
                {t("Choose the occasion that best fits your fundraiser", "ଆପଣଙ୍କ ଅଭିଯାନ ପାଇଁ ଉପଯୁକ୍ତ ଅବସର ବାଛନ୍ତୁ")}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {CAMPAIGN_TYPES.map((ct) => {
                  const Icon = ct.icon;
                  return (
                    <button
                      key={ct.id}
                      onClick={() => setCampaignType(ct.id)}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        campaignType === ct.id
                          ? "border-[#F5A623] bg-[#F5A623]/5 shadow-sm"
                          : "border-gray-200 bg-white hover:border-[#F5A623]/50"
                      }`}
                    >
                      <Icon size={24} className={campaignType === ct.id ? "text-[#F5A623] mx-auto mb-2" : "text-gray-400 mx-auto mb-2"} />
                      <p className="font-serif text-[13px] font-semibold text-[#1A1A1A] mb-1">{ct.label}</p>
                      <p className="font-sans text-[10px] text-gray-500">{ct.desc}</p>
                    </button>
                  );
                })}
              </div>

              <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-3">
                {t("Which cause?", "କେଉଁ କାରଣ?")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {CAUSES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCause(c.id)}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      cause === c.id
                        ? "border-[#F5A623] bg-[#1A1A1A]/5"
                        : "border-gray-200 bg-white hover:border-[#F5A623]/50"
                    }`}
                  >
                    <p className="font-serif text-[13px] font-semibold text-[#1A1A1A]">{c.label}</p>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors"
                >
                  CONTINUE →
                </button>
              </div>
            </AnimatedSection>
          )}

          {/* Step 2: Campaign Details */}
          {step === 2 && (
            <AnimatedSection>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] text-center mb-2">
                {t("Campaign Details", "ଅଭିଯାନ ବିବରଣୀ")}
              </h2>
              <p className="font-sans text-[16px] text-gray-600 text-center mb-8">
                {t("Tell supporters what you are raising funds for", "ସମର୍ଥକଙ୍କୁ କୁହନ୍ତୁ ଆପଣ କାହିଁକି ତହବିଲ ସଂଗ୍ରହ କରୁଛନ୍ତି")}
              </p>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 max-w-2xl mx-auto space-y-5">
                <div>
                  <label className="font-mono text-[10px] tracking-wider uppercase text-gray-500 mb-1 block">
                    {t("Campaign Title *", "ଅଭିଯାନ ଶୀର୍ଷକ *")}
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., My 30th Birthday Fundraiser for Education"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[16px] focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] tracking-wider uppercase text-gray-500 mb-1 block">
                    {t("Description * (min 20 chars)", "ବିବରଣ * (ସର୍ବନିମ୍ନ ୨୦ ଅକ୍ଷର)")}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Tell your story. why this cause matters to you and what you hope to achieve..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[16px] focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none resize-none"
                  />
                  <p className="font-mono text-[9px] text-gray-400 mt-1">{description.length}/20 min characters</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] tracking-wider uppercase text-gray-500 mb-1 block">
                      {t("Fundraising Goal (₹) *", "ତହବିଲ ଲକ୍ଷ୍ୟ (₹) *")}
                    </label>
                    <input
                      type="number"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(Number(e.target.value))}
                      min={1000}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[16px] focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none"
                    />
                    <p className="font-mono text-[9px] text-gray-400 mt-1">Minimum ₹1,000</p>
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-wider uppercase text-gray-500 mb-1 block">
                      {t("End Date (optional)", "ସମାପ୍ତି ତାରିଖ (ଐଚ୍ଛିକ)")}
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[16px] focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="font-mono text-[11px] tracking-wider uppercase text-gray-500 hover:text-[#1A1A1A] transition-colors"
                  >
                    ← BACK
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!title || description.length < 20 || goalAmount < 1000}
                    className="px-8 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    CONTINUE →
                  </button>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Step 3: Your Details */}
          {step === 3 && (
            <AnimatedSection>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] text-center mb-2">
                {t("Your Details", "ଆପଣଙ୍କ ବିବରଣୀ")}
              </h2>
              <p className="font-sans text-[16px] text-gray-600 text-center mb-8">
                {t("We'll use this to manage your campaign and send updates", "ଆମେ ଆପଣଙ୍କ ଅଭିଯାନ ପରିଚାଳନା ପାଇଁ ଏହା ବ୍ୟବହାର କରିବୁ")}
              </p>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 max-w-2xl mx-auto space-y-5">
                <div>
                  <label className="font-mono text-[10px] tracking-wider uppercase text-gray-500 mb-1 block">
                    {t("Your Name *", "ଆପଣଙ୍କ ନାମ *")}
                  </label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[16px] focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] tracking-wider uppercase text-gray-500 mb-1 block">
                      {t("Email *", "ଇମେଲ *")}
                    </label>
                    <input
                      type="email"
                      value={creatorEmail}
                      onChange={(e) => setCreatorEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[16px] focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-wider uppercase text-gray-500 mb-1 block">
                      {t("Phone (optional)", "ଫୋନ (ଐଚ୍ଛିକ)")}
                    </label>
                    <input
                      type="tel"
                      value={creatorPhone}
                      onChange={(e) => setCreatorPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[16px] focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none"
                    />
                  </div>
                </div>

                {/* Campaign Preview */}
                <div className="bg-[#FAFAFA] rounded-lg p-4 border border-[#F5A623]/20 mt-4">
                  <p className="font-mono text-[9px] tracking-wider uppercase text-[#F5A623] mb-2">CAMPAIGN PREVIEW</p>
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-1">{title || "Your Campaign Title"}</h3>
                  <p className="font-sans text-[12px] text-gray-600 mb-2">{description.slice(0, 100) || "Your campaign description..."}</p>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-[#F5A623]">GOAL: ₹{goalAmount.toLocaleString("en-IN")}</span>
                    <span className="font-mono text-[10px] text-gray-400">{campaignType.toUpperCase()}</span>
                    <span className="font-mono text-[10px] text-gray-400">{cause.toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="font-mono text-[11px] tracking-wider uppercase text-gray-500 hover:text-[#1A1A1A] transition-colors"
                  >
                    ← BACK
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!creatorName || !creatorEmail || createCampaign.isPending}
                    className="px-8 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {createCampaign.isPending ? "SUBMITTING..." : "LAUNCH CAMPAIGN"} <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Social Proof / Why Fundraise */}
      <section className="py-12 bg-[#FAFAFA] border-t border-gray-100">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">
              {t("Why Fundraise with Abhiara?", "ଅଭିଆରା ସହ କାହିଁକି ତହବିଲ ସଂଗ୍ରହ?")}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-5">
              <Share2 size={28} className="text-[#F5A623] mx-auto mb-3" />
              <h3 className="font-serif text-[17px] font-bold text-[#1A1A1A] mb-2">Easy to Share</h3>
              <p className="font-sans text-[13px] text-gray-600">Get a unique campaign link to share on WhatsApp, Instagram, and email.</p>
            </div>
            <div className="text-center p-5">
              <Target size={28} className="text-[#F5A623] mx-auto mb-3" />
              <h3 className="font-serif text-[17px] font-bold text-[#1A1A1A] mb-2">100% Transparent</h3>
              <p className="font-sans text-[13px] text-gray-600">Track every rupee raised. We provide monthly impact reports to all campaigners.</p>
            </div>
            <div className="text-center p-5">
              <Heart size={28} className="text-red-500 mx-auto mb-3" />
              <h3 className="font-serif text-[17px] font-bold text-[#1A1A1A] mb-2">Real Impact</h3>
              <p className="font-sans text-[13px] text-gray-600">Your campaign directly funds education, elderly care, and community development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#FAFAFA]">
        <div className="container text-center">
          <AnimatedSection>
            <p className="font-serif italic text-xl text-[#F5A623] max-w-2xl mx-auto mb-4">
              {t(
                "\"Whether you want to partner, volunteer, or simply learn more. we would love to hear from you.\"",
                "\"ଆପଣ ସହଭାଗୀ ହେବାକୁ, ସ୍ୱେଚ୍ଛାସେବୀ ହେବାକୁ, କିମ୍ବା କେବଳ ଅଧିକ ଜାଣିବାକୁ ଚାହାନ୍ତି, ଆମେ ଆପଣଙ୍କ ଠାରୁ ଶୁଣିବାକୁ ଭଲ ପାଇବୁ।\""
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <a
                href="mailto:info@abhiarafoundation.org"
                className="px-6 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors flex items-center gap-2"
              >
                <Mail size={14} /> EMAIL US
              </a>
              <a
                href="https://wa.me/919938938321?text=Hi%20Abhiara%20Foundation%2C%20I%20want%20to%20start%20a%20fundraising%20campaign."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] text-white font-mono text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#1DA851] transition-colors flex items-center gap-2"
              >
                <MessageSquare size={14} /> WHATSAPP US
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
