/**
 * Blog / Updates — Event recaps, field visit reports, and foundation news
 * Static blog posts based on real Abhiara Foundation activities
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Tag,
  Clock,
  Search,
  HeartHandshake,
  GraduationCap,
  Building2,
  Newspaper,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

/* ── Types ── */
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

/* ── Blog Data — Real Activities ── */
const BLOG_POSTS: BlogPost[] = [
  {
    id: "hope-is-life-old-age-home-visit",
    title: "A Day of Warmth at Hope is Life Old Age Home",
    excerpt:
      "Our first elderly care visit in Puri, Odisha — spending time with residents, listening to their stories, and understanding the gaps in elderly support systems.",
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
      "Collecting and distributing textbooks, notebooks, and learning kits to tribal students across three districts in Odisha.",
    content: [
      "Education without materials is like a river without water — the path exists, but nothing flows. Our first education material drive was designed to address the most basic barrier to learning in tribal Odisha: the lack of books, notebooks, and writing instruments.",
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
    tags: ["Education", "Material Drive", "Tribal Students", "SDG 4"],
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
      "Organising a health screening camp at an old age home — blood pressure checks, basic diagnostics, and connecting residents with follow-up care.",
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

/* ── Category Config ── */
const CATEGORY_CONFIG: Record<
  BlogCategory,
  { label: string; icon: typeof HeartHandshake; color: string }
> = {
  "elderly-care": { label: "Elderly Care", icon: HeartHandshake, color: "#1A7F8E" },
  education: { label: "Education", icon: GraduationCap, color: "#C9A84C" },
  csr: { label: "CSR Partnership", icon: Building2, color: "#1A7F8E" },
  news: { label: "Foundation News", icon: Newspaper, color: "#C9A84C" },
};

/* ── Helpers ── */
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<"all" | BlogCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Blog & Updates — Abhiara Foundation"
        description="Event recaps, field visit reports, and news from Abhiara Foundation. Real stories from our education and elderly care work across Odisha."
        url="https://abhiarafoundation.com/blog"
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-[#0A1628] via-[#0C1A30] to-[#080F1C]">
        <div className="container text-center">
          <AnimatedSection>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-4">
              FROM THE FIELD
            </p>
            <h1
              className="font-serif font-bold text-white leading-[1.15] mb-4"
              style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
            >
              Blog & <span className="text-[#C9A84C]">Updates</span>
            </h1>
            <div className="w-16 h-0.5 bg-[#1A7F8E] mx-auto mb-6" />
            <p className="font-sans text-[15px] text-white/60 max-w-lg mx-auto leading-relaxed">
              Real stories from the ground — event recaps, field visit reports, programme updates,
              and foundation news. Every post is a chapter in our journey.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FEATURED POSTS ===== */}
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
                const catConfig = CATEGORY_CONFIG[post.category];
                const CatIcon = catConfig.icon;
                return (
                  <AnimatedSection key={post.id} delay={i * 0.08}>
                    <div className="glass-card overflow-hidden h-full flex flex-col group cursor-pointer"
                      onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
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
                          <span className="font-mono text-[9px] text-white/40">{post.readTime}</span>
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

      {/* ===== FILTER BAR ===== */}
      <section className="py-8 bg-[#0A1628] border-y border-white/[0.06]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
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

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
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

      {/* ===== ALL POSTS ===== */}
      <section className="py-16 bg-[#080F1C]">
        <div className="container">
          <AnimatedSection>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-2">
              {activeCategory === "all" ? "ALL UPDATES" : CATEGORY_CONFIG[activeCategory].label.toUpperCase()}
            </p>
            <p className="font-mono text-[10px] text-white/40 mb-8">
              {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} found
            </p>
          </AnimatedSection>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-sans text-white/40 text-lg">No posts found matching your criteria.</p>
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
                const catConfig = CATEGORY_CONFIG[post.category];
                const CatIcon = catConfig.icon;
                const isExpanded = expandedPost === post.id;

                return (
                  <AnimatedSection key={post.id} delay={i * 0.05}>
                    <motion.article
                      layout
                      className="glass-card overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="relative w-full md:w-72 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A1628]/60 hidden md:block" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent md:hidden" />
                        </div>

                        {/* Content */}
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

                          {/* Expanded Content */}
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

                          {/* Tags */}
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

                          {/* Read More / Less */}
                          <button
                            onClick={() =>
                              setExpandedPost(isExpanded ? null : post.id)
                            }
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

      {/* ===== CTA ===== */}
      <section className="py-16 bg-[#080F1C]">
        <div className="container text-center">
          <AnimatedSection>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-4">
              BE PART OF THE STORY
            </p>
            <h2
              className="font-serif font-bold text-white leading-[1.15] mb-4"
              style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
            >
              Every Update is a <span className="text-[#C9A84C]">Promise Kept</span>
            </h2>
            <p className="font-sans text-[15px] text-white/55 max-w-lg mx-auto mb-8 leading-relaxed">
              Follow our journey from the villages of Odisha to the streets of Mumbai. Partner with
              us, volunteer with us, or simply stay informed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors flex items-center gap-2"
              >
                GET IN TOUCH <ArrowRight size={12} />
              </Link>
              <Link
                href="/activities"
                className="px-8 py-3 border border-white/20 text-white/80 font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors"
              >
                VIEW ACTIVITIES
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
