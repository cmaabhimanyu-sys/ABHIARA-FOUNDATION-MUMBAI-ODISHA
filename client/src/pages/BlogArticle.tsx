import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BLOG_STORIES,
  STORY_CATEGORY_LABELS,
  getStoryBySlug,
} from "@/data/blogStories";

export default function BlogArticle() {
  const { language, t } = useLanguage();
  const [, params] = useRoute("/blog/:slug");
  const story = params?.slug ? getStoryBySlug(params.slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.slug]);

  if (!story) return <NotFound />;

  const related = BLOG_STORIES.filter(item => item.slug !== story.slug).slice(
    0,
    3
  );
  const title = language === "en" ? story.title.en : story.title.od;
  const excerpt = language === "en" ? story.excerpt.en : story.excerpt.od;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title={`${title} | Abhiara Foundation`}
        description={excerpt}
        image={story.image}
        url={`https://www.abhiarafoundation.org/blog/${story.slug}`}
        type="article"
      />
      <Navbar />

      <main>
        <article>
          <header className="pt-32 pb-12 md:pt-40 md:pb-16 bg-[#111111]">
            <div className="container max-w-5xl">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-white/60 hover:text-[#F5A623] transition-colors mb-9"
              >
                <ArrowLeft size={13} />{" "}
                {t("BACK TO ALL STORIES", "ସମସ୍ତ କାହାଣୀକୁ ଫେରନ୍ତୁ")}
              </Link>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-5">
                {language === "en"
                  ? STORY_CATEGORY_LABELS[story.category].en
                  : STORY_CATEGORY_LABELS[story.category].od}
              </p>
              <h1
                className="font-serif font-bold text-white leading-[1.08] mb-7 max-w-4xl"
                style={{ fontSize: "clamp(36px, 5vw, 66px)" }}
              >
                {title}
              </h1>
              <p className="font-sans text-[18px] text-white/72 leading-relaxed max-w-3xl mb-8">
                {excerpt}
              </p>
              <div className="flex flex-wrap gap-x-7 gap-y-3 text-white/55">
                <span className="flex items-center gap-2 font-mono text-[10px]">
                  <Calendar size={14} className="text-[#F5A623]" />
                  {language === "en" ? story.date.en : story.date.od}
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px]">
                  <MapPin size={14} className="text-[#F5A623]" />
                  {language === "en" ? story.location.en : story.location.od}
                </span>
              </div>
            </div>
          </header>

          <div className="container max-w-6xl -mt-1">
            <div className="h-[320px] md:h-[560px] overflow-hidden bg-gray-100">
              <img
                src={story.image}
                alt={language === "en" ? story.imageAlt.en : story.imageAlt.od}
                className="w-full h-full object-contain bg-[#F4F0E8]"
              />
            </div>
          </div>

          <section className="py-14 md:py-20 bg-white">
            <div className="container max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
              <div>
                {story.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-sans text-[17px] md:text-[18px] text-[#3F3F3F] leading-[1.85] mb-7"
                  >
                    {language === "en" ? paragraph.en : paragraph.od}
                  </p>
                ))}
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#777] mt-10">
                  {story.author && story.authorRole
                    ? `${language === "en" ? story.author.en : story.author.od}, ${language === "en" ? story.authorRole.en : story.authorRole.od}`
                    : t(
                        "Published by Abhiara Foundation",
                        "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଦ୍ୱାରା ପ୍ରକାଶିତ"
                      )}
                </p>
              </div>

              <aside className="lg:border-l lg:border-gray-200 lg:pl-8">
                <div className="border-t-4 border-[#F5A623] bg-[#FAFAFA] p-6 sticky top-[170px]">
                  <CheckCircle2 size={24} className="text-[#F5A623] mb-4" />
                  <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-3">
                    {story.resultLabel
                      ? language === "en"
                        ? story.resultLabel.en
                        : story.resultLabel.od
                      : t("Public record", "ସାର୍ବଜନୀନ ରେକର୍ଡ")}
                  </h2>
                  <p className="font-sans text-[14px] text-[#555] leading-relaxed mb-5">
                    {language === "en" ? story.result.en : story.result.od}
                  </p>
                  <Link
                    href={story.evidenceHref}
                    className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.12em] uppercase text-[#1A1A1A] hover:text-[#C77800] transition-colors"
                  >
                    {story.evidenceLabel
                      ? language === "en"
                        ? story.evidenceLabel.en
                        : story.evidenceLabel.od
                      : t("SEE PHOTOS AND VIDEOS", "ଫଟୋ ଓ ଭିଡିଓ ଦେଖନ୍ତୁ")}{" "}
                    <ArrowRight size={13} className="text-[#F5A623]" />
                  </Link>
                </div>
              </aside>
            </div>
          </section>
        </article>

        <section className="py-16 md:py-22 bg-[#FAFAFA] border-t border-gray-200">
          <div className="container">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
              {t("MORE FROM THE FIELD", "କ୍ଷେତ୍ରରୁ ଆହୁରି")}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-9">
              {t("Read another story", "ଆଉ ଏକ କାହାଣୀ ପଢ଼ନ୍ତୁ")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {related.map(item => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group block border-b border-gray-200 pb-6"
                >
                  <div className="h-48 overflow-hidden bg-gray-100 mb-5">
                    <img
                      src={item.image}
                      alt={
                        language === "en" ? item.imageAlt.en : item.imageAlt.od
                      }
                      className="w-full h-full object-contain bg-[#F4F0E8]"
                    />
                  </div>
                  <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#F5A623] mb-2">
                    {language === "en"
                      ? STORY_CATEGORY_LABELS[item.category].en
                      : STORY_CATEGORY_LABELS[item.category].od}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A] leading-tight group-hover:text-[#C77800] transition-colors">
                    {language === "en" ? item.title.en : item.title.od}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
