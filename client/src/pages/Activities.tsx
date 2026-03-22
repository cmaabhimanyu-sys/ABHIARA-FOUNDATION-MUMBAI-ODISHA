/*
 * Abhiara Foundation — Activities (Unified Page)
 * Merges: Activities + Impact Gallery + Blog into one tabbed experience
 * Three tabs: Activities, Gallery, Updates
 * All locations, dates, and content corrected per audit
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  Heart,
  BookOpen,
  Calendar,
  MapPin,
  Camera,
  GraduationCap,
  HeartHandshake,
  Users,
  X,
  Clock,
  Tag,
  Newspaper,
  Building2,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "919938938321";

/* ══════════════════════════════════════════════════════════
   TAB 1 — ACTIVITIES DATA (corrected locations & dates)
   ══════════════════════════════════════════════════════════ */
type ActivityCategory = "all" | "elderly" | "education";

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
    date: "February 2025",
    location: "Puri, Odisha",
    highlight: true,
  },
  {
    category: "elderly",
    title: "Companion Network Launch",
    description:
      "Initiated our companion network programme — pairing volunteers with elderly residents for regular visits, conversations, and emotional support.",
    date: "April 2025",
    location: "Puri, Odisha",
  },
  {
    category: "elderly",
    title: "Senior Citizen Health Awareness",
    description:
      "Organised an awareness session on health and wellness for elderly residents, covering nutrition, mobility exercises, and mental well-being.",
    date: "May 2025",
    location: "Puri, Odisha",
  },
  {
    category: "elderly",
    title: "Donation Drive — Essentials for Elders",
    description:
      "Collected and distributed blankets, medicines, and personal care items to elderly residents across old age homes in Puri.",
    date: "January 2025",
    location: "Puri, Odisha",
  },
  {
    category: "elderly",
    title: "Intergenerational Connect Programme",
    description:
      "Building connections across generations — young volunteers spent time listening to stories and sharing moments of warmth with senior citizens.",
    date: "April 2025",
    location: "Puri, Odisha",
  },
  {
    category: "education",
    title: "Book Donation to Tribal Students",
    description:
      "Distributed books, notebooks, and study materials to tribal children in rural Odisha. Open-air learning sessions conducted alongside the distribution.",
    date: "October 2025",
    location: "Kendrapara, Odisha",
    highlight: true,
  },
  {
    category: "education",
    title: "Learning Materials for Underprivileged Children",
    description:
      "Provided educational kits including textbooks, stationery, and learning aids to children from underserved tribal communities.",
    date: "November 2025",
    location: "Kendrapara, Odisha",
  },
  {
    category: "education",
    title: "Community Outreach — Tribal Families",
    description:
      "Engaged with tribal families to understand educational needs, barriers to schooling, and how Abhiara Foundation can bridge the gap.",
    date: "December 2025",
    location: "Kendrapara, Odisha",
  },
  {
    category: "education",
    title: "Student Empowerment Drive",
    description:
      "Every book donated is a step towards a brighter future. Empowered young minds through education materials and motivational interactions.",
    date: "January 2026",
    location: "Kendrapara, Odisha",
  },
  {
    category: "education",
    title: "Digital Literacy Awareness",
    description:
      "Introduced basic digital literacy concepts to tribal students, preparing them for a technology-enabled future while respecting their cultural roots.",
    date: "February 2026",
    location: "Kendrapara, Odisha",
  },
];

/* ══════════════════════════════════════════════════════════
   TAB 2 — GALLERY DATA (corrected locations)
   ══════════════════════════════════════════════════════════ */
type GalleryImage = {
  src: string;
  alt: string;
  category: "education" | "elderly" | "community";
  caption: string;
  location: string;
};

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-village-session_60ea6065.jpeg",
    alt: "Abhiara Foundation education session with village children in Odisha",
    category: "education",
    caption:
      "Book donation and open-air learning session with tribal children — because education should not wait for four walls.",
    location: "Kendrapara, Odisha",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-children-1_48cccd6f.jpeg",
    alt: "Book donation to tribal children in Odisha",
    category: "education",
    caption:
      "Every book donated is a step towards a brighter future. Empowering young minds through education materials.",
    location: "Kendrapara, Odisha",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit_cbe9834b.jpeg",
    alt: "Abhiara Foundation elderly care visit at Hope is Life Old Age Home",
    category: "elderly",
    caption:
      "Our first elder care visit — Hope is Life Old Age Home. Listening, learning, and lending a hand.",
    location: "Puri, Odisha",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-1_c836b920.jpeg",
    alt: "Distributing essentials to elderly residents",
    category: "elderly",
    caption:
      "Distributing essentials and spending quality time with elders who have no one else to visit them.",
    location: "Puri, Odisha",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-2_76a48a25.jpeg",
    alt: "Elderly care visit — sharing warmth and care",
    category: "elderly",
    caption:
      "Warmth is not a luxury. It is a human need. We bring it, one visit at a time.",
    location: "Puri, Odisha",
  },
];

const GALLERY_CATEGORIES = [
  { key: "all", label: "All", icon: Camera },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "elderly", label: "Elderly Care", icon: HeartHandshake },
] as const;

/* ══════════════════════════════════════════════════════════
   TAB 3 — BLOG DATA (corrected locations, dates, distinct images)
   ══════════════════════════════════════════════════════════ */
type BlogCategory = "elderly-care" | "education" | "csr" | "news";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  category: BlogCategory;
  location: string;
  readTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "hope-is-life-old-age-home-visit",
    title: "A Day of Warmth at Hope is Life Old Age Home",
    excerpt:
      "Our first elderly care visit in Puri — spending time with residents, listening to their stories, and understanding the gaps in elderly support systems.",
    content: [
      "On a warm afternoon in Puri, Odisha, the Abhiara Foundation team visited Hope is Life Old Age Home — our first formal elderly care outreach. What began as a planned visit quickly became an emotional experience that reinforced why this work matters.",
      "We spent hours with the residents, many of whom had been living there for years. Some had families who visited occasionally; others had none. The common thread was loneliness — a quiet, persistent companion that no amount of physical care could address.",
      "Our team distributed essential supplies, sat with residents for extended conversations, and documented the specific needs of the facility. The visit revealed critical gaps in companionship, legal awareness about pension rights, and access to regular health check-ups.",
      "This visit has directly shaped our elderly care programme design — we are now building a companion network model that pairs regular volunteers with specific residents for sustained, meaningful relationships rather than one-time visits.",
    ],
    date: "2025-02-15",
    category: "elderly-care",
    location: "Puri, Odisha",
    readTime: "4 min read",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit_cbe9834b.jpeg",
    tags: ["Elderly Care", "Puri", "Field Visit", "SDG 3"],
    featured: true,
  },
  {
    id: "kendrapara-education-session",
    title: "Books, Dreams, and Open Skies in Kendrapara",
    excerpt:
      "Our education team conducted an open-air learning session with tribal children in Kendrapara district — donating books and materials to students who walk miles to study.",
    content: [
      "The Kendrapara district of Odisha has pockets of educationally underserved communities. When our team arrived at the village, we were greeted by children who had walked over 3 kilometres from neighbouring hamlets, eager to learn.",
      "We conducted an open-air session under the shade of a large banyan tree — there were no classrooms, no desks, no digital screens. Just books, notebooks, pencils, and the boundless curiosity of children who refuse to let geography define their future.",
      "The team distributed educational materials including textbooks, notebooks, geometry sets, and storybooks in both Odia and English. We also conducted interactive sessions on basic science concepts using everyday objects — making learning tangible and exciting.",
      "What struck us most was the determination of these children. Many of them are first-generation learners in their families. Their parents — farmers, daily wage workers — understand that education is the only bridge to a different life. This visit confirmed our commitment to establishing permanent learning centres in the region.",
    ],
    date: "2025-10-20",
    category: "education",
    location: "Kendrapara, Odisha",
    readTime: "5 min read",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-village-session_60ea6065.jpeg",
    tags: ["Education", "Kendrapara", "Tribal Children", "SDG 4"],
    featured: true,
  },
  {
    id: "elderly-care-companion-programme",
    title: "Building Companion Networks for the Elderly",
    excerpt:
      "Moving beyond one-time visits — our companion network model pairs volunteers with elderly residents for sustained, meaningful relationships.",
    content: [
      "After our initial visits to old age homes in Puri, one insight became overwhelmingly clear: the elderly do not just need supplies or medical check-ups. They need consistent human connection — someone who shows up, listens, and remembers their name.",
      "The Abhiara Companion Network is our answer to this need. We are building a structured programme that pairs trained volunteers with specific elderly residents. Each volunteer commits to at least two visits per month, maintaining a relationship log and flagging any health or emotional concerns to our coordination team.",
      "The programme is currently in its pilot phase with old age homes in Puri, Odisha. Early feedback from both residents and volunteers has been deeply encouraging — residents report feeling 'seen' again, while volunteers describe the experience as transformative.",
      "Our goal is to scale this model to 200 elders across Odisha by the end of Year 1, with quarterly health camps and legal aid support integrated into the companion visits.",
    ],
    date: "2025-03-01",
    category: "elderly-care",
    location: "Puri, Odisha",
    readTime: "4 min read",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-1_c836b920.jpeg",
    tags: ["Elderly Care", "Companion Network", "Volunteer", "SDG 3"],
  },
  {
    id: "section-8-registration-journey",
    title: "From Idea to Institution: Our Section 8 Registration",
    excerpt:
      "The story behind Abhiara Foundation's formal registration as a Section 8 Company — what it means, why it matters, and how it protects every contribution.",
    content: [
      "In March 2025, Abhiara Foundation was formally incorporated as a Section 8 Company under the Companies Act, 2013. This was not just a legal formality — it was a deliberate choice that reflects our commitment to transparency, accountability, and the protection of every rupee contributed to our mission.",
      "A Section 8 Company is a not-for-profit entity where no property, asset, or income can be personally claimed by the founder, family, or any individual. Profits must be reinvested into the organisation's objectives. This structure provides the highest level of governance and donor protection available under Indian law.",
      "The registration process involved months of documentation, legal consultations, and compliance work. As a CMA (Cost and Management Accountant), our founder Abhimanyu Mallik personally oversaw the financial structuring to ensure every compliance requirement was met from day one.",
      "With this registration complete, Abhiara Foundation is now eligible to receive CSR funds under Schedule VII of the Companies Act, accept domestic and international donations, and issue tax exemption certificates under Section 80G (application in progress).",
    ],
    date: "2025-03-15",
    category: "news",
    location: "Mumbai, Maharashtra",
    readTime: "3 min read",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/community-impact-JqLQdk8SYBsopiModUvtKZ.webp",
    tags: ["Section 8", "Registration", "Governance", "Compliance"],
    featured: true,
  },
  {
    id: "education-materials-donation-drive",
    title: "Equipping Classrooms: Our First Education Material Drive",
    excerpt:
      "Collecting and distributing textbooks, notebooks, and learning kits to tribal students in Kendrapara, Odisha.",
    content: [
      "Education without materials is like a river without water — the path exists, but nothing flows. Our first education material drive was designed to address the most basic barrier to learning in rural Odisha: the lack of books, notebooks, and writing instruments.",
      "Working with local community leaders and school teachers in Kendrapara district, we identified over 200 students in Classes 5 through 10 who were studying with shared textbooks or, in some cases, no textbooks at all.",
      "The drive collected and distributed over 500 textbooks, 1,000 notebooks, geometry sets, colour pencils, and storybooks. Each student received a personalised learning kit packed by our volunteer team.",
      "Beyond materials, we also conducted brief orientation sessions with parents — explaining the importance of consistent attendance, the scholarship opportunities available for Class 8+ students, and how to reach our team for ongoing support.",
    ],
    date: "2025-10-01",
    category: "education",
    location: "Kendrapara, Odisha",
    readTime: "4 min read",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-children-1_48cccd6f.jpeg",
    tags: ["Education", "Material Drive", "Kendrapara", "SDG 4"],
  },
  {
    id: "csr-partnership-model-launch",
    title: "Launching Our CSR Partnership Model",
    excerpt:
      "How Abhiara Foundation is building a transparent, impact-verified CSR implementation framework for corporate partners under Schedule VII.",
    content: [
      "Corporate Social Responsibility is not charity — it is a strategic investment in the communities that sustain business ecosystems. At Abhiara Foundation, we have designed our CSR partnership model to treat every corporate partner as a co-creator of impact, not just a funder.",
      "Our model offers end-to-end CSR project implementation: from needs assessment and programme design to execution, monitoring, and audited utilisation statements. Every project is mapped to specific SDG targets and Companies Act Schedule VII categories.",
      "Key differentiators of our approach include monthly impact reports with photographic evidence, quarterly financial utilisation statements audited by our CMA-led finance team, co-branded impact documentation for partner CSR reports, and direct field visit opportunities for partner teams.",
      "We are targeting ₹30 lakh in CSR partnerships for FY 2025-26, with projects spanning education infrastructure, elderly care programmes, and community development initiatives across Odisha.",
    ],
    date: "2025-03-10",
    category: "csr",
    location: "Pan India",
    readTime: "4 min read",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/hero-dawn-PUfjxrVLdG8a3bgPJiAovi.webp",
    tags: ["CSR", "Partnership", "Schedule VII", "SDG 10"],
  },
  {
    id: "elderly-care-health-camp-puri",
    title: "First Health Camp for Elderly Residents in Puri",
    excerpt:
      "Organising a health screening camp at an old age home in Puri — blood pressure checks, basic diagnostics, and connecting residents with follow-up care.",
    content: [
      "Health is often the first thing that deteriorates in institutional elderly care — not because of neglect, but because of limited resources and the sheer volume of needs. Our first health camp was designed to bridge this gap with targeted, actionable health interventions.",
      "Working with volunteer medical professionals, we conducted blood pressure screenings, basic blood sugar tests, vision checks, and mobility assessments for 35 elderly residents at an old age home in Puri, Odisha.",
      "The results were eye-opening: over 60% of residents had unmanaged hypertension, nearly half had undiagnosed vision impairment, and several needed immediate referrals for specialist care. We coordinated with local hospitals to ensure follow-up appointments were scheduled.",
      "This camp has become the template for our quarterly health intervention model. We aim to conduct four such camps per year at each partner facility, building a longitudinal health record for every resident we serve.",
    ],
    date: "2025-02-20",
    category: "elderly-care",
    location: "Puri, Odisha",
    readTime: "4 min read",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-2_76a48a25.jpeg",
    tags: ["Elderly Care", "Health Camp", "Puri", "SDG 3"],
  },
];

const BLOG_CATEGORY_CONFIG: Record<
  BlogCategory,
  { label: string; icon: typeof HeartHandshake; color: string }
> = {
  "elderly-care": { label: "Elderly Care", icon: HeartHandshake, color: "#1A7F8E" },
  education: { label: "Education", icon: GraduationCap, color: "#C9A84C" },
  csr: { label: "CSR Partnership", icon: Building2, color: "#1A7F8E" },
  news: { label: "Foundation News", icon: Newspaper, color: "#C9A84C" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════ */
type MainTab = "activities" | "gallery" | "updates";

export default function Activities() {
  const [location] = useLocation();
  const [mainTab, setMainTab] = useState<MainTab>("activities");

  // Support deep-linking: /activities?tab=gallery or /activities?tab=updates
  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab === "gallery") setMainTab("gallery");
    else if (tab === "updates") setMainTab("updates");
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Activities — Abhiara Foundation"
        description="Real activities from the field — elderly care visits in Puri, education sessions in Kendrapara, health camps, and community outreach across Odisha."
        url="https://abhiarafoundation.org/activities"
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
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
              Real moments from the field — visiting old age homes in Puri, donating books to
              students in Kendrapara, and building connections that matter. Every activity here
              is a testament to our commitment to action over words.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== MAIN TABS ===== */}
      <section className="bg-[#06101F] border-y border-white/[0.06] sticky top-16 md:top-20 z-30">
        <div className="container flex items-center justify-center gap-2 md:gap-4 py-3">
          {(
            [
              { key: "activities", label: "Activities", icon: Heart },
              { key: "gallery", label: "Gallery", icon: Camera },
              { key: "updates", label: "Updates", icon: Newspaper },
            ] as { key: MainTab; label: string; icon: typeof Heart }[]
          ).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setMainTab(tab.key)}
                className={`flex items-center gap-2 px-5 md:px-8 py-2.5 font-mono text-[10px] md:text-[11px] tracking-[0.12em] uppercase transition-all cursor-pointer border ${
                  mainTab === tab.key
                    ? "bg-[#C9A84C] text-[#0A1628] border-[#C9A84C] font-bold shadow-lg shadow-[#C9A84C]/20"
                    : "bg-transparent text-white/60 border-white/10 hover:border-[#C9A84C]/40 hover:text-white"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ===== TAB CONTENT ===== */}
      {mainTab === "activities" && <ActivitiesTab />}
      {mainTab === "gallery" && <GalleryTab />}
      {mainTab === "updates" && <UpdatesTab />}

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

      {/* ===== BE THE CHANGE ===== */}
      <BeTheChangeSection />

      {/* ===== BIRTHDAY WITH PURPOSE ===== */}
      <BirthdayWithPurposeSection />

      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 1: ACTIVITIES LIST
   ══════════════════════════════════════════════════════════ */
function ActivitiesTab() {
  const [filter, setFilter] = useState<ActivityCategory>("all");

  const filtered =
    filter === "all" ? activities : activities.filter((a) => a.category === filter);
  const elderlyCount = activities.filter((a) => a.category === "elderly").length;
  const educationCount = activities.filter((a) => a.category === "education").length;

  return (
    <>
      {/* Stats */}
      <section className="py-8 bg-[#080F1C]">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="glass-card px-6 py-4 flex items-center gap-3">
              <Heart size={20} className="text-[#C9A84C]" />
              <div className="text-left">
                <p className="font-serif text-2xl font-bold text-[#C9A84C]">{elderlyCount}</p>
                <p className="font-mono text-[9px] tracking-wider uppercase text-white/50">
                  Elderly Care Activities
                </p>
              </div>
            </div>
            <div className="glass-card px-6 py-4 flex items-center gap-3">
              <BookOpen size={20} className="text-[#1A7F8E]" />
              <div className="text-left">
                <p className="font-serif text-2xl font-bold text-[#1A7F8E]">{educationCount}</p>
                <p className="font-mono text-[9px] tracking-wider uppercase text-white/50">
                  Education Activities
                </p>
              </div>
            </div>
            <div className="glass-card px-6 py-4 flex items-center gap-3">
              <span className="text-[#C9A84C] text-lg">✦</span>
              <div className="text-left">
                <p className="font-serif text-2xl font-bold text-white">{activities.length}</p>
                <p className="font-mono text-[9px] tracking-wider uppercase text-white/50">
                  Total Activities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-4 bg-[#080F1C] border-b border-white/[0.06]">
        <div className="container flex items-center justify-center gap-3 md:gap-4">
          {(
            [
              { key: "all", label: "All Activities", count: activities.length },
              { key: "elderly", label: "Elderly Care", count: elderlyCount },
              { key: "education", label: "Education", count: educationCount },
            ] as { key: ActivityCategory; label: string; count: number }[]
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

      {/* Activity Cards */}
      <section className="py-16 md:py-24 bg-[#080F1C]">
        <div className="container max-w-4xl">
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
                      : "Education — Student Support"}
                  </h2>
                  <p className="font-sans text-[14px] text-white/55 leading-relaxed">
                    {filter === "elderly"
                      ? "Our team regularly visits old age homes in Puri, Odisha to provide essentials, companionship, and dignity to elderly residents who need it most. Every visit is a reminder that no one should age alone."
                      : "We travel to villages in Kendrapara and other districts across Odisha to donate books, notebooks, and learning materials to children who deserve the same opportunities as everyone else. Education is the bridge from remote to remarkable."}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          )}

          <div className="space-y-5">
            {filtered.map((activity, idx) => (
              <AnimatedSection
                key={`${activity.title}-${idx}`}
                delay={Math.min(idx * 0.05, 0.3)}
              >
                <div
                  className={`glass-card${activity.category === "elderly" ? "-gold" : ""} p-6 md:p-8 transition-all duration-300 ${activity.highlight ? "ring-1 ring-white/[0.06]" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="hidden md:flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full shrink-0 ${
                          activity.category === "elderly" ? "bg-[#C9A84C]" : "bg-[#1A7F8E]"
                        }`}
                      />
                      <div className="w-px h-full bg-white/10 min-h-[40px]" />
                    </div>

                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                        activity.category === "elderly" ? "bg-[#C9A84C]/10" : "bg-[#1A7F8E]/10"
                      }`}
                    >
                      {activity.category === "elderly" ? (
                        <Heart size={22} className="text-[#C9A84C]" />
                      ) : (
                        <BookOpen size={22} className="text-[#1A7F8E]" />
                      )}
                    </div>

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
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 2: GALLERY
   ══════════════════════════════════════════════════════════ */
function GalleryTab() {
  const [filter, setFilter] = useState<"all" | "education" | "elderly" | "community">("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered =
    filter === "all" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === filter);

  return (
    <>
      {/* Stats Bar */}
      <section className="bg-[#080F1C] py-6 border-b border-white/[0.06]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "500+", label: "Children Targeted · Year 1" },
              { value: "200+", label: "Elders Targeted · Year 1" },
              { value: "3", label: "Districts · Odisha" },
              { value: "10", label: "Activities Completed" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl font-bold text-[#C9A84C]">{stat.value}</p>
                <p className="font-mono text-[9px] tracking-wider uppercase text-white/40 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-[#080F1C]">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {GALLERY_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = filter === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setFilter(cat.key as typeof filter)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[10px] tracking-[0.12em] uppercase transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#C9A84C] text-[#0A1628] shadow-lg shadow-[#C9A84C]/20"
                      : "bg-white/[0.04] text-white/50 border border-white/10 hover:border-[#C9A84C]/30 hover:text-[#C9A84C]"
                  }`}
                >
                  <Icon size={14} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-20 bg-[#080F1C]">
        <div className="container">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setLightbox(GALLERY_IMAGES.indexOf(img))}
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span
                      className={`inline-block w-fit px-2 py-0.5 rounded-sm font-mono text-[8px] tracking-wider uppercase mb-2 ${
                        img.category === "education"
                          ? "bg-[#1A7F8E]/30 text-[#1A7F8E]"
                          : img.category === "elderly"
                            ? "bg-[#C9A84C]/30 text-[#C9A84C]"
                            : "bg-white/10 text-white/70"
                      }`}
                    >
                      {img.category}
                    </span>
                    <p className="font-sans text-[13px] text-white/90 leading-relaxed">
                      {img.caption}
                    </p>
                    <p className="font-mono text-[9px] tracking-wider uppercase text-white/40 mt-2">
                      {img.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Camera size={40} className="text-white/20 mx-auto mb-4" />
              <p className="font-sans text-white/40">No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10 cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_IMAGES[lightbox].src}
                alt={GALLERY_IMAGES[lightbox].alt}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <p className="font-sans text-[15px] text-white/80 leading-relaxed max-w-2xl mx-auto">
                  {GALLERY_IMAGES[lightbox].caption}
                </p>
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#C9A84C] mt-2">
                  {GALLERY_IMAGES[lightbox].location}
                </p>
              </div>

              <div className="flex items-center justify-center gap-6 mt-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : GALLERY_IMAGES.length - 1,
                    );
                  }}
                  className="px-4 py-2 border border-white/20 text-white/60 font-mono text-[10px] tracking-wider uppercase hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors cursor-pointer"
                >
                  Previous
                </button>
                <span className="font-mono text-[10px] text-white/30">
                  {lightbox + 1} / {GALLERY_IMAGES.length}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((prev) =>
                      prev !== null && prev < GALLERY_IMAGES.length - 1 ? prev + 1 : 0,
                    );
                  }}
                  className="px-4 py-2 border border-white/20 text-white/60 font-mono text-[10px] tracking-wider uppercase hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 3: UPDATES (Blog)
   ══════════════════════════════════════════════════════════ */
function UpdatesTab() {
  const [activeCategory, setActiveCategory] = useState<"all" | BlogCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const featuredPosts = BLOG_POSTS.filter((p) => p.featured).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      {/* Featured Posts */}
      {activeCategory === "all" && searchQuery === "" && (
        <section className="py-12 bg-[#080F1C]">
          <div className="container">
            <AnimatedSection>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-6">
                FEATURED STORIES
              </p>
            </AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredPosts.slice(0, 3).map((post, i) => {
                const catConfig = BLOG_CATEGORY_CONFIG[post.category];
                const CatIcon = catConfig.icon;
                return (
                  <AnimatedSection key={post.id} delay={i * 0.08}>
                    <div
                      className="glass-card overflow-hidden h-full flex flex-col group cursor-pointer"
                      onClick={() =>
                        setExpandedPost(expandedPost === post.id ? null : post.id)
                      }
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent" />
                        <span
                          className="absolute top-3 left-3 font-mono text-[9px] tracking-wider uppercase px-2 py-1 rounded-sm backdrop-blur-sm flex items-center gap-1"
                          style={{
                            backgroundColor: `${catConfig.color}20`,
                            color: catConfig.color,
                            border: `1px solid ${catConfig.color}40`,
                          }}
                        >
                          <CatIcon size={10} /> {catConfig.label}
                        </span>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-[9px] text-white/40 flex items-center gap-1">
                            <Calendar size={10} /> {formatDate(post.date)}
                          </span>
                          <span className="font-mono text-[9px] text-white/40 flex items-center gap-1">
                            <MapPin size={10} /> {post.location}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-[#C9A84C] transition-colors">
                          {post.title}
                        </h3>
                        <p className="font-sans text-[13px] text-white/55 leading-relaxed flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-4">
                          <Clock size={10} className="text-white/40" />
                          <span className="font-mono text-[9px] text-white/40">
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <section className="py-8 bg-[#0A1628] border-y border-white/[0.06]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { key: "all", label: "All Posts" },
                  { key: "elderly-care", label: "Elderly Care" },
                  { key: "education", label: "Education" },
                  { key: "csr", label: "CSR" },
                  { key: "news", label: "News" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key)}
                  className={`font-mono text-[10px] tracking-wider uppercase px-4 py-2 transition-all ${
                    activeCategory === tab.key
                      ? "bg-[#C9A84C] text-[#0A1628] font-bold"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 text-white/80 font-mono text-xs placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C]/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 bg-[#080F1C]">
        <div className="container">
          <AnimatedSection>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-2">
              {activeCategory === "all"
                ? "ALL UPDATES"
                : BLOG_CATEGORY_CONFIG[activeCategory].label.toUpperCase()}
            </p>
            <p className="font-mono text-[10px] text-white/40 mb-8">
              {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} found
            </p>
          </AnimatedSection>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-sans text-white/40 text-lg">
                No posts found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 font-mono text-[10px] tracking-wider uppercase text-[#C9A84C] hover:text-[#B8942A] transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post, i) => {
                const catConfig = BLOG_CATEGORY_CONFIG[post.category];
                const CatIcon = catConfig.icon;
                const isExpanded = expandedPost === post.id;

                return (
                  <AnimatedSection key={post.id} delay={i * 0.05}>
                    <motion.article layout className="glass-card overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-72 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A1628]/60 hidden md:block" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent md:hidden" />
                        </div>

                        <div className="p-6 flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span
                              className="font-mono text-[9px] tracking-wider uppercase px-2 py-1 rounded-sm flex items-center gap-1"
                              style={{
                                backgroundColor: `${catConfig.color}15`,
                                color: catConfig.color,
                                border: `1px solid ${catConfig.color}30`,
                              }}
                            >
                              <CatIcon size={10} /> {catConfig.label}
                            </span>
                            <span className="font-mono text-[9px] text-white/40 flex items-center gap-1">
                              <Calendar size={10} /> {formatDate(post.date)}
                            </span>
                            <span className="font-mono text-[9px] text-white/40 flex items-center gap-1">
                              <MapPin size={10} /> {post.location}
                            </span>
                            <span className="font-mono text-[9px] text-white/40 flex items-center gap-1">
                              <Clock size={10} /> {post.readTime}
                            </span>
                          </div>

                          <h2 className="font-serif text-xl md:text-2xl font-bold text-white mb-3">
                            {post.title}
                          </h2>

                          <p className="font-sans text-[14px] text-white/55 leading-relaxed mb-4">
                            {post.excerpt}
                          </p>

                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mb-4 space-y-4"
                            >
                              {post.content.map((para, pi) => (
                                <p
                                  key={pi}
                                  className="font-sans text-[14px] text-white/50 leading-relaxed"
                                >
                                  {para}
                                </p>
                              ))}
                            </motion.div>
                          )}

                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="font-mono text-[8px] tracking-wider uppercase px-2 py-0.5 bg-white/5 text-white/40 border border-white/10 flex items-center gap-1"
                              >
                                <Tag size={8} /> {tag}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                            className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#C9A84C] hover:text-[#B8942A] transition-colors flex items-center gap-2"
                          >
                            {isExpanded ? "READ LESS" : "READ FULL STORY"}{" "}
                            <ArrowRight
                              size={12}
                              className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
                            />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  </AnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   BE THE CHANGE FORM SECTION
   ══════════════════════════════════════════════════════════ */
function BeTheChangeSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    qualification: "",
    email: "",
    socialProfile: "",
    areaOfInterest: "" as
      | ""
      | "education"
      | "eldercare"
      | "csr"
      | "finance"
      | "technology"
      | "fieldwork"
      | "other",
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
    setFormData({
      fullName: "",
      qualification: "",
      email: "",
      socialProfile: "",
      areaOfInterest: "",
    });
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
          destiny. Contribute your skills, time, or expertise to Abhiara Foundation — from anywhere
          in India.
        </p>

        {submitted ? (
          <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-2xl p-8 text-center">
            <p className="text-3xl mb-4">✨</p>
            <h3 className="text-[#C9A84C] text-2xl font-bold mb-3">Thank You for Joining!</h3>
            <p className="text-white/70 text-base leading-relaxed">
              Your submission has been received. The Abhiara Foundation team will connect with you
              soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-[#C9A84C]/30 rounded-2xl p-8 text-left"
          >
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
              <label className="text-white/70 text-sm font-medium mb-2 block">
                Qualification *
              </label>
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
              <label className="text-white/70 text-sm font-medium mb-2 block">
                Email Address *
              </label>
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
              <label className="text-white/70 text-sm font-medium mb-2 block">
                LinkedIn or Social Media Profile *
              </label>
              <input
                type="url"
                required
                placeholder="linkedin.com/in/yourname or @yourinstagram"
                value={formData.socialProfile}
                onChange={(e) => setFormData({ ...formData, socialProfile: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C] transition-all"
              />
              <p className="text-white/30 text-xs mt-2">
                Share your LinkedIn, Instagram, Facebook, or any public profile. This helps us
                understand your background and connect with you directly.
              </p>
            </div>

            <div className="mb-8">
              <label className="text-white/70 text-sm font-medium mb-2 block">
                Area of Interest *
              </label>
              <select
                required
                value={formData.areaOfInterest}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    areaOfInterest: e.target.value as typeof formData.areaOfInterest,
                  })
                }
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
              Be The Change via WhatsApp →
            </button>
          </form>
        )}

        <p className="text-white/30 text-xs mt-6 leading-relaxed max-w-xl mx-auto">
          Your information will never be shared publicly or with third parties. Used only by Abhiara
          Foundation team to connect with you.
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   BIRTHDAY WITH PURPOSE SECTION
   ══════════════════════════════════════════════════════════ */
function BirthdayWithPurposeSection() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to register my birthday with Abhiara Foundation's #BirthdayWithPurpose movement. Please share the details.")}`;

  return (
    <section className="py-16 bg-[#0A1628]">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <p className="text-[#1A7F8E] uppercase tracking-widest text-sm font-semibold mb-4">
          #BirthdayWithPurpose
        </p>
        <h2 className="text-4xl font-bold text-white mb-4">
          Blow Out the Candles.
          <br />
          <span className="text-[#C9A84C]">Light Up a Life.</span>
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-[#C9A84C] to-[#1A7F8E] mx-auto mb-8" />
        <p className="text-white font-semibold text-2xl leading-relaxed mb-4 max-w-2xl mx-auto">
          Your birthday celebration. <span className="text-[#C9A84C]">Someone's future.</span>
        </p>
        <p className="text-white/60 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
          A big party is forgotten in a week. A child you helped is remembered forever. This year —
          spend your birthday with underprivileged students, visit the elderly, or lead a community
          activity. Skip the alcohol. Choose impact instead.
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
            <svg
              viewBox="0 0 32 32"
              className="w-7 h-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.907 15.907 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.342 22.616c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.974-7.826-6.81-8.064-7.124-.23-.314-1.928-2.566-1.928-4.894 0-2.328 1.22-3.47 1.654-3.944.39-.428 1.036-.624 1.654-.624.2 0 .38.01.54.018.474.02.712.048 1.024.792.39.93 1.338 3.258 1.454 3.496.118.238.236.556.078.87-.15.322-.282.466-.52.738-.238.272-.464.48-.702.774-.218.258-.464.534-.196 1.008.268.466 1.192 1.966 2.56 3.184 1.758 1.564 3.24 2.05 3.7 2.278.474.238.75.198 1.024-.118.282-.324 1.204-1.4 1.526-1.882.314-.474.636-.394 1.072-.236.44.158 2.762 1.302 3.236 1.54.474.238.788.354.906.554.116.2.116 1.16-.274 2.26z" />
            </svg>
            Register My Birthday on WhatsApp
          </a>
        </div>

        <p className="text-white/30 text-sm leading-relaxed">
          Share your celebration with the world
          <br />
          <span className="text-[#C9A84C] font-semibold">
            #BirthdayWithPurpose · #YourBirthdaySomeoneFuture · #AbhiaraFoundation ·
            #FearlessRayOfLight
          </span>
        </p>
      </div>
    </section>
  );
}
