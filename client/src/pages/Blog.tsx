import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Calendar, MapPin, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BLOG_STORIES,
  STORY_CATEGORY_LABELS,
  type StoryCategory,
} from "@/data/blogStories";

type StoryFilter = "all" | StoryCategory;

export default function Blog() {
  const { language, t } = useLanguage();
  const [category, setCategory] = useState<StoryFilter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stories = useMemo(() => {
    const query = search.trim().toLowerCase();
    return BLOG_STORIES
      .filter(story => category === "all" || story.category === category)
      .filter(story => {
        if (!query) return true;
        const text = [
          story.title.en,
          story.title.od,
          story.excerpt.en,
          story.excerpt.od,
          story.location.en,
          story.location.od,
        ].join(" ").toLowerCase();
        return text.includes(query);
      })
      .sort((a, b) => b.dateISO.localeCompare(a.dateISO));
  }, [category, search]);

  const featured = BLOG_STORIES.find(story => story.featured) ?? BLOG_STORIES[0];
  const categories: StoryFilter[] = ["all", "founder", "education", "jeevan-sathi", "relief", "events"];

  const categoryLabel = (value: StoryFilter) => {
    if (value === "all") return t("All stories", "ସମସ୍ତ ଲେଖା");
    const label = STORY_CATEGORY_LABELS[value];
    return language === "en" ? label.en : label.od;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title={t(
          "Stories, Insights and Impact | Abhiara Foundation",
          "କାହାଣୀ, ତଥ୍ୟ ଓ ପ୍ରଭାବ | ଅଭିଆରା ଫାଉଣ୍ଡେସନ",
        )}
        description={t(
          "Founder reflections and verified field stories from Abhiara Foundation's education support, Jeevan Sathi, emergency relief, and community activities.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନର ପ୍ରତିଷ୍ଠାତାଙ୍କ ଭାବନା ଏବଂ ଶିକ୍ଷା ସହାୟତା, ଜୀବନ ସାଥୀ, ଜରୁରୀ ସହାୟତା ଓ ସମାଜ ସେବାର ଯାଞ୍ଚ ହୋଇଥିବା କ୍ଷେତ୍ର କାହାଣୀ।",
        )}
        image={featured.image}
        url="https://www.abhiarafoundation.com/blog"
      />
      <Navbar />

      <main>
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[#111111] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #F5A623 0, transparent 34%), radial-gradient(circle at 80% 80%, #F5A623 0, transparent 28%)" }} />
          <div className="relative container">
            <AnimatedSection className="max-w-4xl">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#F5A623] mb-5">
                {t("PUBLIC FIELD RECORD", "ସାର୍ବଜନୀନ କ୍ଷେତ୍ର ରେକର୍ଡ")}
              </p>
              <h1 className="font-serif font-bold text-white leading-[1.05] mb-6" style={{ fontSize: "clamp(38px, 5.5vw, 72px)" }}>
                {t("Stories, Insights ", "କାହାଣୀ, ତଥ୍ୟ ")}
                <span className="text-[#F5A623]">{t("and Impact", "ଓ ପ୍ରଭାବ")}</span>
              </h1>
              <p className="font-sans text-[17px] md:text-[19px] text-white/72 leading-relaxed max-w-3xl">
                {t(
                  "Read the founder's reflections and verified accounts of work that Abhiara has actually done.",
                  "ପ୍ରତିଷ୍ଠାତାଙ୍କ ଭାବନା ଏବଂ ଅଭିଆରା ପ୍ରକୃତରେ କରିଥିବା କାମର ଯାଞ୍ଚ ହୋଇଥିବା କାହାଣୀ ପଢ଼ନ୍ତୁ।",
                )}
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white border-b border-gray-200">
          <div className="container">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] border border-gray-200 bg-[#FAFAFA]">
                <div className="h-[300px] md:h-[430px] overflow-hidden bg-[#F4F0E8]">
                  <img
                    src={featured.image}
                    alt={language === "en" ? featured.imageAlt.en : featured.imageAlt.od}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-7 md:p-12 flex flex-col justify-center">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-4">
                    {t("FEATURED STORY", "ବିଶେଷ କାହାଣୀ")}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-4">
                    {language === "en" ? featured.title.en : featured.title.od}
                  </h2>
                  <p className="font-sans text-[16px] text-[#555] leading-relaxed mb-6">
                    {language === "en" ? featured.excerpt.en : featured.excerpt.od}
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 mb-7 text-[#777]">
                    <span className="flex items-center gap-2 font-mono text-[10px]"><Calendar size={13} />{language === "en" ? featured.date.en : featured.date.od}</span>
                    <span className="flex items-center gap-2 font-mono text-[10px]"><MapPin size={13} />{language === "en" ? featured.location.en : featured.location.od}</span>
                  </div>
                  <Link href={`/blog/${featured.slug}`} className="inline-flex w-fit items-center gap-2 bg-[#F5A623] text-[#1A1A1A] px-6 py-3 font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors">
                    {t("READ THE STORY", "କାହାଣୀ ପଢ଼ନ୍ତୁ")} <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-8 bg-[#FAFAFA] border-b border-gray-200">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div className="flex flex-wrap gap-2">
                {categories.map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`px-4 py-2.5 font-mono text-[10px] tracking-[0.1em] uppercase border transition-colors ${
                      category === item
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : "bg-white text-[#555] border-gray-200 hover:border-[#F5A623] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {categoryLabel(item)}
                  </button>
                ))}
              </div>
              <label className="relative block w-full lg:w-80">
                <span className="sr-only">{t("Search stories", "କାହାଣୀ ଖୋଜନ୍ତୁ")}</span>
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
                <input
                  type="search"
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                  placeholder={t("Search stories", "କାହାଣୀ ଖୋଜନ୍ତୁ")}
                  className="w-full bg-white border border-gray-200 py-3 pl-11 pr-4 text-sm text-[#333] outline-none focus:border-[#F5A623]"
                />
              </label>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-[#FAFAFA]">
          <div className="container">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
                  {t("FROM THE FIELD", "କ୍ଷେତ୍ରରୁ")}
                </p>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A]">
                  {categoryLabel(category)}
                </h2>
              </div>
              <p className="hidden md:block font-mono text-[10px] text-[#777]">
                {stories.length} {stories.length === 1 ? t("story", "କାହାଣୀ") : t("stories", "କାହାଣୀ")}
              </p>
            </div>

            {stories.length === 0 ? (
              <div className="border border-gray-200 bg-white py-20 px-6 text-center">
                <BookOpen size={34} className="mx-auto text-[#F5A623] mb-4" />
                <p className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">{t("No story found", "କୌଣସି କାହାଣୀ ମିଳିଲା ନାହିଁ")}</p>
                <p className="font-sans text-[#666]">{t("Try another category or search word.", "ଅନ୍ୟ ବିଭାଗ କିମ୍ବା ଶବ୍ଦ ଦେଇ ଖୋଜନ୍ତୁ।")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {stories.map((story, index) => (
                  <AnimatedSection key={story.slug} delay={Math.min(index * 0.06, 0.24)}>
                    <article className="h-full border-b border-gray-200 pb-9">
                      <Link href={`/blog/${story.slug}`} className="group block">
                        <div className="h-[260px] md:h-[320px] overflow-hidden bg-gray-100 mb-6">
                          <img
                            src={story.image}
                            alt={language === "en" ? story.imageAlt.en : story.imageAlt.od}
                            className="w-full h-full object-contain bg-[#F4F0E8]"
                          />
                        </div>
                        <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#F5A623] mb-3">
                          {language === "en" ? STORY_CATEGORY_LABELS[story.category].en : STORY_CATEGORY_LABELS[story.category].od}
                        </p>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-tight mb-3 group-hover:text-[#C77800] transition-colors">
                          {language === "en" ? story.title.en : story.title.od}
                        </h3>
                        <p className="font-sans text-[16px] text-[#555] leading-relaxed mb-5 line-clamp-3">
                          {language === "en" ? story.excerpt.en : story.excerpt.od}
                        </p>
                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[#777] mb-5">
                          <span className="flex items-center gap-2 font-mono text-[10px]"><Calendar size={13} />{language === "en" ? story.date.en : story.date.od}</span>
                          <span className="flex items-center gap-2 font-mono text-[10px]"><MapPin size={13} />{language === "en" ? story.location.en : story.location.od}</span>
                        </div>
                        <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-[#1A1A1A]">
                          {t("READ MORE", "ଅଧିକ ପଢ଼ନ୍ତୁ")} <ArrowRight size={13} className="text-[#F5A623]" />
                        </span>
                      </Link>
                    </article>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-14 md:py-18 bg-[#111111]">
          <div className="container flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">{t("See the full public record", "ସମ୍ପୂର୍ଣ୍ଣ ସାର୍ବଜନୀନ ରେକର୍ଡ ଦେଖନ୍ତୁ")}</h2>
              <p className="font-sans text-[16px] text-white/65 leading-relaxed">{t("Monthly Impact brings the dates, locations, results, photos, and videos together by month.", "ମାସିକ ପ୍ରଭାବ ରିପୋର୍ଟରେ ତାରିଖ, ସ୍ଥାନ, ଫଳାଫଳ, ଫଟୋ ଓ ଭିଡିଓ ମାସ ଅନୁଯାୟୀ ଏକାଠି ରହିଛି।")}</p>
            </div>
            <Link href="/impact" className="inline-flex shrink-0 items-center gap-2 bg-[#F5A623] text-[#1A1A1A] px-7 py-3.5 font-mono text-[10px] font-bold tracking-[0.14em] uppercase hover:bg-[#E8960E] transition-colors">
              {t("VIEW MONTHLY IMPACT", "ମାସିକ ପ୍ରଭାବ ଦେଖନ୍ତୁ")} <ArrowRight size={13} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
