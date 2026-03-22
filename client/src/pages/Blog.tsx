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
      "Our first elderly care visit in Puri, Odisha — spending time with 40+ residents, listening to their stories, and understanding the gaps in elderly support systems.",
    content: [
      "In October 2025, the Abhiara Foundation team visited Hope is Life Old Age Home in Puri, Odisha — our first formal elderly care outreach. What began as a planned visit quickly became an emotional experience that reinforced why this work matters.",
      "We spent hours with over 40 residents, many of whom had been living there for years. Some had families who visited occasionally; others had none. The common thread was loneliness — a quiet, persistent companion that no amount of physical care could address.",
      "Our team distributed essential supplies, sat with residents for extended conversations, and documented the specific needs of the facility. The visit revealed critical gaps in companionship, legal awareness about pension rights, and access to regular health check-ups.",
      "This visit has directly shaped our elderly care programme design — we are now planning a companion network model that pairs regular volunteers with specific residents for sustained, meaningful relationships rather than one-time visits.",
    ],
    date: "2025-10-15",
    category: "elderly-care",
    location: "Puri, Odisha",
    readTime: "4 min read",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit_cbe9834b.jpeg",
    tags: ["Elderly Care", "Puri", "Field Visit", "SDG 3"],
    featured: true,
  },
  {
    id: "kendrapara-book-distribution",
    title: "Books, Dreams, and Open Skies in Kendrapara",
    excerpt:
      "Our team distributed books and study materials to 50+ tribal children in Kendrapara district — and spent time with students who walk miles to study.",
    content: [
      "In November 2025, the Abhiara Foundation team travelled to Kendrapara district in Odisha to distribute books and educational materials to tribal children in underserved communities.",
      "When we arrived at the village, we were greeted by children who had walked over 3 kilometres from neighbouring hamlets, eager to learn. We conducted an open-air session under the shade of a large banyan tree — there were no classrooms, no desks, no digital screens. Just books, notebooks, pencils, and the boundless curiosity of children who refuse to let geography define their future.",
      "The team distributed educational materials including textbooks, notebooks, geometry sets, and storybooks in both Odia and English to over 50 students. We also conducted interactive sessions on basic science concepts using everyday objects — making learning tangible and exciting.",
      "What struck us most was the determination of these children. Many of them are first-generation learners in their families. Their parents — farmers, daily wage workers — understand that education is the only bridge to a different life. This visit confirmed our commitment to establishing permanent learning centres in the region.",
    ],
    date: "2025-11-10",
    category: "education",
    location: "Kendrapara, Odisha",
    readTime: "5 min read",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-village-session_60ea6065.jpeg",
    tags: ["Education", "Kendrapara", "Tribal Children", "SDG 4"],
    featured: true,
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
