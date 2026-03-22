/*
 * Abhiara Foundation — Activities Page
 * Activity log with category filters — no external images
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Heart, BookOpen, Calendar, MapPin } from "lucide-react";
// WhatsApp number for form submissions
const WHATSAPP_NUMBER = "919938938321";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";

type Category = "all" | "elderly" | "education";

interface Activity {
  category: "elderly" | "education";
  title: string;
  description: string;
  date: string;
  location: string;
  highlight?: boolean;
}

const activities: Activity[] = [
  {
    category: "elderly",
    title: "Old Age Home Visit — Hope is Life",
    description:
      "Distributed essentials and spent quality time with elderly residents. Provided care packages including daily necessities, hygiene products, and comfort items.",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
    highlight: true,
  },
  {
    category: "elderly",
    title: "Companion Network Launch",
    description:
      "Initiated our companion network programme — pairing volunteers with elderly residents for regular visits, conversations, and emotional support.",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    category: "elderly",
    title: "Senior Citizen Health Awareness",
    description:
      "Organised an awareness session on health and wellness for elderly residents, covering nutrition, mobility exercises, and mental well-being.",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    category: "elderly",
    title: "Donation Drive — Essentials for Elders",
    description:
      "Collected and distributed blankets, medicines, and personal care items to elderly residents across multiple old age homes.",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    category: "elderly",
    title: "Intergenerational Connect Programme",
    description:
      "Building connections across generations — young volunteers spent time listening to stories and sharing moments of warmth with senior citizens.",
    date: "March 2025",
    location: "Mumbai, Maharashtra",
  },
  {
    category: "education",
    title: "Book Donation to Tribal Students",
    description:
      "Distributed books, notebooks, and study materials to tribal children in rural Odisha. Open-air learning sessions conducted alongside the distribution.",
    date: "March 2025",
    location: "Koraput District, Odisha",
    highlight: true,
  },
  {
    category: "education",
    title: "Learning Materials for Underprivileged Children",
    description:
      "Provided educational kits including textbooks, stationery, and learning aids to children from underserved tribal communities.",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
  {
    category: "education",
    title: "Community Outreach — Tribal Families",
    description:
      "Engaged with tribal families to understand educational needs, barriers to schooling, and how Abhiara Foundation can bridge the gap.",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
  {
    category: "education",
    title: "Student Empowerment Drive",
    description:
      "Every book donated is a step towards a brighter future. Empowered young minds through education materials and motivational interactions.",
    date: "March 2025",
    location: "Koraput District, Odisha",
  },
  {
    category: "education",
    title: "Digital Literacy Awareness",
    description:
      "Introduced basic digital literacy concepts to tribal students, preparing them for a technology-enabled future while respecting their cultural roots.",
    date: "March 2025",
    location: "Kalahandi District, Odisha",
  },
];

export default function Activities() {
  const [filter, setFilter] = useState<Category>("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered =
    filter === "all" ? activities : activities.filter((a) => a.category === filter);

  const elderlyCount = activities.filter((a) => a.category === "elderly").length;
  const educationCount = activities.filter((a) => a.category === "education").length;

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Activities — Abhiara Foundation"
        description="Real activities from the field — elderly care visits, education sessions, health camps, and community outreach across Odisha and Mumbai."
        url="https://abhiarafoundation.com/activities"
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#06101F] to-[#0A1628]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 container text-center">
          <AnimatedSection>
            <p className="section-label mb-4">ON THE GROUND</p>
            <h1
              className="font-serif font-bold text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              Our <span className="text-[#C9A84C]">Activities</span>
            </h1>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-2xl mx-auto leading-relaxed">
              Real moments from the field — visiting old age homes, donating books and materials
              to tribal students, and building connections that matter. Every activity here is a
              testament to our commitment to action over words.
            </p>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <div className="glass-card px-6 py-4 flex items-center gap-3">
                <Heart size={20} className="text-[#C9A84C]" />
                <div className="text-left">
                  <p className="font-serif text-2xl font-bold text-[#C9A84C]">
                    {elderlyCount}
                  </p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/50">
                    Elderly Care Activities
                  </p>
                </div>
              </div>
              <div className="glass-card px-6 py-4 flex items-center gap-3">
                <BookOpen size={20} className="text-[#1A7F8E]" />
                <div className="text-left">
                  <p className="font-serif text-2xl font-bold text-[#1A7F8E]">
                    {educationCount}
                  </p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/50">
                    Education Activities
                  </p>
                </div>
              </div>
              <div className="glass-card px-6 py-4 flex items-center gap-3">
                <span className="text-[#C9A84C] text-lg">✦</span>
                <div className="text-left">
                  <p className="font-serif text-2xl font-bold text-white">
                    {activities.length}
                  </p>
                  <p className="font-mono text-[9px] tracking-wider uppercase text-white/50">
                    Total Activities
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== PHOTO GALLERY ===== */}
      <section className="py-12 md:py-16 bg-[#06101F]">
        <div className="container">
          <AnimatedSection className="text-center mb-10">
            <p className="section-label mb-3">FROM THE FIELD</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
              Moments That <span className="text-[#C9A84C]">Matter</span>
            </h2>
            <div className="gradient-rule mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-1_c836b920.jpeg",
                alt: "Visiting Hope is Life Old Age Home",
                caption: "Old Age Home Visit — Hope is Life",
                cat: "Elderly Care",
              },
              {
                src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-2_76a48a25.jpeg",
                alt: "Distributing essentials to elderly residents",
                caption: "Distributing Essentials to Elders",
                cat: "Elderly Care",
              },
              {
                src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-children-1_48cccd6f.jpeg",
                alt: "Book donation to tribal children in Odisha",
                caption: "Book Donation — Tribal Children, Odisha",
                cat: "Education",
              },
            ].map((photo, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-lg border border-white/[0.06]">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 bg-[#0A1628]/80 backdrop-blur-sm">
                    <span
                      className={`inline-block font-mono text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm mb-2 ${
                        photo.cat === "Elderly Care"
                          ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                          : "bg-[#1A7F8E]/10 text-[#1A7F8E]"
                      }`}
                    >
                      {photo.cat}
                    </span>
                    <p className="font-sans text-[13px] text-white/70 leading-snug">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FILTER TABS ===== */}
      <section className="py-4 bg-[#06101F] border-y border-white/[0.06] sticky top-16 md:top-20 z-30">
        <div className="container flex items-center justify-center gap-3 md:gap-4">
          {(
            [
              { key: "all", label: "All Activities", count: activities.length },
              { key: "elderly", label: "Elderly Care", count: elderlyCount },
              { key: "education", label: "Education", count: educationCount },
            ] as { key: Category; label: string; count: number }[]
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 md:px-6 py-2 font-mono text-[9px] md:text-[10px] tracking-[0.15em] uppercase transition-all duration-300 border ${
                filter === tab.key
                  ? "bg-[#C9A84C] text-[#0A1628] border-[#C9A84C] font-bold"
                  : "bg-transparent text-white/60 border-white/10 hover:border-[#C9A84C]/40 hover:text-white"
              }`}
            >
              {tab.label}{" "}
              <span className={filter === tab.key ? "text-[#0A1628]/60" : "text-white/30"}>
                ({tab.count})
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ===== ACTIVITY LIST ===== */}
      <section className="py-16 md:py-24 bg-[#080F1C]">
        <div className="container max-w-4xl">
          {/* Category Header */}
          {filter !== "all" && (
            <AnimatedSection className="mb-12">
              <div className="glass-card p-6 md:p-8 flex items-start gap-4">
                {filter === "elderly" ? (
                  <Heart size={28} className="text-[#C9A84C] shrink-0 mt-1" />
                ) : (
                  <BookOpen size={28} className="text-[#1A7F8E] shrink-0 mt-1" />
                )}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white mb-2">
                    {filter === "elderly"
                      ? "Elderly Care — Old Age Home Visits"
                      : "Education — Tribal Student Support"}
                  </h2>
                  <p className="font-sans text-[14px] text-white/55 leading-relaxed">
                    {filter === "elderly"
                      ? "Our team regularly visits old age homes to provide essentials, companionship, and dignity to elderly residents who need it most. Every visit is a reminder that no one should age alone."
                      : "We travel to tribal villages across Odisha to donate books, notebooks, and learning materials to children who deserve the same opportunities as everyone else. Education is the bridge from remote to remarkable."}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Activity Cards */}
          <div className="space-y-5">
            {filtered.map((activity, idx) => (
              <AnimatedSection key={`${activity.title}-${idx}`} delay={Math.min(idx * 0.05, 0.3)}>
                <div
                  className={`glass-card${activity.category === "elderly" ? "-gold" : ""} p-6 md:p-8 transition-all duration-300 ${activity.highlight ? "ring-1 ring-white/[0.06]" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Timeline dot + line */}
                    <div className="hidden md:flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full shrink-0 ${
                        activity.category === "elderly" ? "bg-[#C9A84C]" : "bg-[#1A7F8E]"
                      }`} />
                      <div className="w-px h-full bg-white/10 min-h-[40px]" />
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                        activity.category === "elderly"
                          ? "bg-[#C9A84C]/10"
                          : "bg-[#1A7F8E]/10"
                      }`}
                    >
                      {activity.category === "elderly" ? (
                        <Heart
                          size={22}
                          className="text-[#C9A84C]"
                        />
                      ) : (
                        <BookOpen
                          size={22}
                          className="text-[#1A7F8E]"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm ${
                            activity.category === "elderly"
                              ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                              : "bg-[#1A7F8E]/10 text-[#1A7F8E]"
                          }`}
                        >
                          {activity.category === "elderly" ? "Elderly Care" : "Education"}
                        </span>
                        {activity.highlight && (
                          <span className="font-mono text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-sm bg-white/5 text-white/40">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-lg md:text-xl font-bold text-white mb-2">
                        {activity.title}
                      </h3>

                      <p className="font-sans text-[14px] text-white/55 leading-relaxed mb-4">
                        {activity.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase text-white/40">
                          <Calendar size={12} />
                          {activity.date}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase text-white/40">
                          <MapPin size={12} />
                          {activity.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-sans text-white/40">No activities in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-20 bg-[#C9A84C]">
        <div className="container text-center">
          <AnimatedSection>
            <h2
              className="font-serif font-bold text-[#0A1628] mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Want to be part of the next activity?
            </h2>
            <p className="font-sans text-[15px] text-[#0A1628]/70 max-w-2xl mx-auto leading-relaxed mb-8">
              Whether you want to volunteer, sponsor an activity, or partner with us for CSR
              implementation — every contribution creates real impact on the ground.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0A1628] text-[#C9A84C] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#06101F] transition-colors"
            >
              GET IN TOUCH <ArrowRight size={12} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== BE THE CHANGE — JOIN OUR TEAM ===== */}
      <BeTheChangeSection />

      {/* ===== BIRTHDAY WITH PURPOSE ===== */}
      <BirthdayWithPurposeSection />

      <Footer />
    </div>
  );
}

/* ===== BE THE CHANGE FORM SECTION ===== */
function BeTheChangeSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    qualification: "",
    email: "",
    socialProfile: "",
    areaOfInterest: "" as "" | "education" | "eldercare" | "csr" | "finance" | "technology" | "fieldwork" | "other",
  });
  const [submitted, setSubmitted] = useState(false);

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.areaOfInterest) return;

    const areaLabels: Record<string, string> = {
      education: "Education and Teaching",
      eldercare: "Elderly Care",
      csr: "CSR and Fundraising",
      finance: "Finance and Compliance",
      technology: "Technology and Digital",
      fieldwork: "Field Work and Community",
      other: "Other",
    };

    const message = [
      `*Be The Change — Volunteer Application*`,
      ``,
      `*Name:* ${formData.fullName}`,
      `*Qualification:* ${formData.qualification}`,
      `*Email:* ${formData.email}`,
      `*Social Profile:* ${formData.socialProfile}`,
      `*Area of Interest:* ${areaLabels[formData.areaOfInterest] || formData.areaOfInterest}`,
      ``,
      `_Sent from abhiarafoundation.org_`,
    ].join("%0a");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
    setFormData({ fullName: "", qualification: "", email: "", socialProfile: "", areaOfInterest: "" });
    toast.success("Redirecting to WhatsApp...");
  };

  return (
    <section className="py-16 bg-[#0D2B2B]">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <p className="text-[#1A7F8E] uppercase tracking-widest text-sm font-semibold mb-4">
          Join Our Team from Day 1
        </p>
        <h2 className="text-4xl font-bold text-white mb-4">
          Be The <span className="text-[#C9A84C]">Change</span>
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-[#C9A84C] to-[#1A7F8E] mx-auto mb-6" />
        <p className="text-white/70 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
          We are looking for passionate individuals who believe that geography should not decide
          destiny. Contribute your skills, time, or expertise to Abhiara Foundation — from anywhere in India.
        </p>

        {submitted ? (
          <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-2xl p-8 text-center">
            <p className="text-3xl mb-4">✨</p>
            <h3 className="text-[#C9A84C] text-2xl font-bold mb-3">Thank You for Joining!</h3>
            <p className="text-white/70 text-base leading-relaxed">
              Your submission has been received. The Abhiara Foundation team will connect with you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/5 border border-[#C9A84C]/30 rounded-2xl p-8 text-left">
            <div className="mb-6">
              <label className="text-white/70 text-sm font-medium mb-2 block">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C] transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="text-white/70 text-sm font-medium mb-2 block">Qualification *</label>
              <input
                type="text"
                required
                placeholder="e.g. B.Com, CMA, MBA, Teaching, Social Work"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C] transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="text-white/70 text-sm font-medium mb-2 block">Email Address *</label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C] transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="text-white/70 text-sm font-medium mb-2 block">LinkedIn or Social Media Profile *</label>
              <input
                type="url"
                required
                placeholder="linkedin.com/in/yourname or @yourinstagram"
                value={formData.socialProfile}
                onChange={(e) => setFormData({ ...formData, socialProfile: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C] transition-all"
              />
              <p className="text-white/30 text-xs mt-2">
                Share your LinkedIn, Instagram, Facebook, or any public profile. This helps us understand your background and connect with you directly.
              </p>
            </div>

            <div className="mb-8">
              <label className="text-white/70 text-sm font-medium mb-2 block">Area of Interest *</label>
              <select
                required
                value={formData.areaOfInterest}
                onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value as typeof formData.areaOfInterest })}
                className="w-full bg-[#0A1628] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C] transition-all"
              >
                <option value="">Select your area</option>
                <option value="education">Education and Teaching</option>
                <option value="eldercare">Elderly Care</option>
                <option value="csr">CSR and Fundraising</option>
                <option value="finance">Finance and Compliance</option>
                <option value="technology">Technology and Digital</option>
                <option value="fieldwork">Field Work and Community</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#C9A84C] hover:bg-[#B8943E] text-[#0A1628] font-bold py-4 rounded-xl transition-all duration-300 text-base uppercase tracking-wider disabled:opacity-50"
            >
              Be The Change via WhatsApp \u2192
            </button>
          </form>
        )}

        <p className="text-white/30 text-xs mt-6 leading-relaxed max-w-xl mx-auto">
          Your information will never be shared publicly or with third parties. Used only by Abhiara Foundation team to connect with you.
        </p>
      </div>
    </section>
  );
}

/* ===== BIRTHDAY WITH PURPOSE SECTION ===== */
function BirthdayWithPurposeSection() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to register my birthday with Abhiara Foundation's #BirthdayWithPurpose movement. Please share the details.")}`;

  return (
    <section className="py-16 bg-[#0A1628]">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <p className="text-[#1A7F8E] uppercase tracking-widest text-sm font-semibold mb-4">
          #BirthdayWithPurpose
        </p>
        <h2 className="text-4xl font-bold text-white mb-4">
          Blow Out the Candles.<br />
          <span className="text-[#C9A84C]">Light Up a Life.</span>
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-[#C9A84C] to-[#1A7F8E] mx-auto mb-8" />
        <p className="text-white font-semibold text-2xl leading-relaxed mb-4 max-w-2xl mx-auto">
          Your birthday celebration. <span className="text-[#C9A84C]">Someone's future.</span>
        </p>
        <p className="text-white/60 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
          A big party is forgotten in a week. A child you helped is remembered forever.
          This year — spend your birthday with underprivileged students, visit the elderly,
          or lead a community activity. Skip the alcohol. Choose impact instead.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 border border-[#C9A84C]/30 rounded-2xl p-6">
            <div className="text-3xl mb-3">{"\uD83D\uDCDA"}</div>
            <h3 className="text-[#C9A84C] font-semibold mb-3">With Students</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Visit a school. Bring books. Teach one thing. Leave a lasting memory.
            </p>
          </div>
          <div className="bg-white/5 border border-[#C9A84C]/30 rounded-2xl p-6">
            <div className="text-3xl mb-3">{"\uD83E\uDD1D"}</div>
            <h3 className="text-[#C9A84C] font-semibold mb-3">With The Elderly</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Visit an old age home. Sit. Listen. Be present. Give the gift of time.
            </p>
          </div>
          <div className="bg-white/5 border border-[#C9A84C]/30 rounded-2xl p-6">
            <div className="text-3xl mb-3">{"\uD83C\uDF31"}</div>
            <h3 className="text-[#C9A84C] font-semibold mb-3">In The Community</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Plant trees. Clean a space. Fund a child's education. Your birthday. Your legacy.
            </p>
          </div>
        </div>

        <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-2xl p-8 mb-10">
          <p className="text-white font-semibold text-xl italic leading-relaxed mb-2">
            "Your birthday celebration.
          </p>
          <p className="text-[#C9A84C] font-bold text-xl italic leading-relaxed mb-4">
            Someone's future."
          </p>
          <p className="text-white/50 text-sm">
            Celebrate your birthday by lighting up someone else's life.
          </p>
          <p className="text-[#C9A84C] text-xs mt-3 font-semibold">
            — Abhiara Foundation · #BirthdayWithPurpose
          </p>
        </div>

        {/* ===== WHATSAPP REGISTER BUTTON ===== */}
        <div className="mb-10">
          <p className="text-white/70 text-base mb-6">
            Ready to celebrate your birthday with purpose? Reach out to us on WhatsApp!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg viewBox="0 0 32 32" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.907 15.907 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.342 22.616c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.974-7.826-6.81-8.064-7.124-.23-.314-1.928-2.566-1.928-4.894 0-2.328 1.22-3.47 1.654-3.944.39-.428 1.036-.624 1.654-.624.2 0 .38.01.54.018.474.02.712.048 1.024.792.39.93 1.338 3.258 1.454 3.496.118.238.236.556.078.87-.15.322-.282.466-.52.738-.238.272-.464.48-.702.774-.218.258-.464.534-.196 1.008.268.466 1.192 1.966 2.56 3.184 1.758 1.564 3.24 2.05 3.7 2.278.474.238.75.198 1.024-.118.282-.324 1.204-1.4 1.526-1.882.314-.474.636-.394 1.072-.236.44.158 2.762 1.302 3.236 1.54.474.238.788.354.906.554.116.2.116 1.16-.274 2.26z"/>
            </svg>
            Register My Birthday on WhatsApp
          </a>
        </div>

        <p className="text-white/30 text-sm leading-relaxed">
          Share your celebration with the world<br />
          <span className="text-[#C9A84C] font-semibold">
            #BirthdayWithPurpose · #YourBirthdaySomeoneFuture · #AbhiaraFoundation · #FearlessRayOfLight
          </span>
        </p>
      </div>
    </section>
  );
}
