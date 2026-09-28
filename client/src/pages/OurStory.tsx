import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, HeartHandshake, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { FOUNDER_STORY } from "@/data/restoredPublicContent";

export default function OurStory() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#1A1A1A]">
      <SEO
        title={t(
          "Our Story | Abhiara Foundation",
          "ଆମ କାହାଣୀ | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "The founder journey and the simple purpose behind Abhiara Foundation.",
          "ପ୍ରତିଷ୍ଠାତାଙ୍କ ଯାତ୍ରା ଓ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ପଛର ସରଳ ଉଦ୍ଦେଶ୍ୟ।"
        )}
        url="https://www.abhiarafoundation.org/our-story"
      />
      <Navbar />

      <main id="main-content">
        <section className="relative overflow-hidden bg-[#111111] pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 25%, #F5A623 0, transparent 30%), radial-gradient(circle at 82% 70%, #7A4B12 0, transparent 28%)",
            }}
          />
          <div className="container relative z-10 max-w-5xl">
            <AnimatedSection>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F5A623]">
                {t(FOUNDER_STORY.eyebrow.en, FOUNDER_STORY.eyebrow.od)}
              </p>
              <h1 className="mt-5 max-w-4xl font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
                {t(FOUNDER_STORY.title.en, FOUNDER_STORY.title.od)}
              </h1>
              <p className="mt-7 max-w-3xl font-sans text-lg leading-relaxed text-white/75">
                {t(
                  FOUNDER_STORY.introduction.en,
                  FOUNDER_STORY.introduction.od
                )}
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container max-w-6xl">
            <AnimatedSection className="mb-10 max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                {t("The journey", "ଯାତ୍ରା")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
                {t(
                  "From a rural village to a shared purpose",
                  "ଗ୍ରାମରୁ ଏକ ସାମୂହିକ ଉଦ୍ଦେଶ୍ୟ ପର୍ଯ୍ୟନ୍ତ"
                )}
              </h2>
            </AnimatedSection>

            <div className="grid gap-5 lg:grid-cols-3">
              {FOUNDER_STORY.chapters.map((chapter, index) => (
                <AnimatedSection key={chapter.title.en} delay={index * 0.06}>
                  <article className="h-full border border-[#E8DCC6] bg-[#FFFDF8] p-7">
                    <div className="flex items-center justify-between gap-4">
                      <MapPin size={21} className="text-[#B56A22]" />
                      <span className="font-serif text-3xl font-bold text-[#F5A623]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-[#9A6100]">
                      {t(chapter.label.en, chapter.label.od)}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-bold">
                      {t(chapter.title.en, chapter.title.od)}
                    </h3>
                    <p className="mt-4 font-sans text-sm leading-7 text-[#555]">
                      {t(chapter.body.en, chapter.body.od)}
                    </p>
                  </article>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="mt-10">
              <div className="bg-[#111111] p-7 text-white md:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F5A623]">
                  {t("The turning point", "ପରିବର୍ତ୍ତନର ମୁହୂର୍ତ୍ତ")}
                </p>
                <h3 className="mt-3 font-serif text-3xl font-bold">
                  {t(
                    FOUNDER_STORY.turningPoint.title.en,
                    FOUNDER_STORY.turningPoint.title.od
                  )}
                </h3>
                <p className="mt-4 max-w-4xl font-sans text-base leading-8 text-white/75">
                  {t(
                    FOUNDER_STORY.turningPoint.body.en,
                    FOUNDER_STORY.turningPoint.body.od
                  )}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className="mt-10">
              <div className="border-l-4 border-[#F5A623] bg-[#FAF4E8] p-7 md:p-9">
                <h3 className="font-serif text-2xl font-bold">
                  {t(
                    FOUNDER_STORY.sharedBeginning.title.en,
                    FOUNDER_STORY.sharedBeginning.title.od
                  )}
                </h3>
                <p className="mt-4 max-w-4xl font-sans text-sm leading-7 text-[#555]">
                  {t(
                    FOUNDER_STORY.sharedBeginning.body.en,
                    FOUNDER_STORY.sharedBeginning.body.od
                  )}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="bg-[#FAF4E8] py-16 md:py-24">
          <div className="container max-w-6xl">
            <AnimatedSection className="mx-auto mb-12 max-w-3xl text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                {t("Why Abhiara", "ଅଭିଆରା କାହିଁକି")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
                {t("What guides our work", "ଆମ କାମର ଦିଗ")}
              </h2>
            </AnimatedSection>

            <div className="grid gap-5 md:grid-cols-3">
              {FOUNDER_STORY.why.map((item, index) => {
                const Icon =
                  [HeartHandshake, BookOpen, ArrowRight][index] ??
                  HeartHandshake;
                return (
                  <AnimatedSection key={item.title.en} delay={index * 0.05}>
                    <article className="h-full bg-white p-7 shadow-[0_16px_45px_rgba(73,48,15,0.08)]">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5A623] text-[#1A1A1A]">
                        <Icon size={21} />
                      </span>
                      <h3 className="mt-5 font-serif text-xl font-bold">
                        {t(item.title.en, item.title.od)}
                      </h3>
                      <p className="mt-3 font-sans text-sm leading-7 text-[#555]">
                        {t(item.body.en, item.body.od)}
                      </p>
                    </article>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container max-w-4xl">
            <AnimatedSection>
              <div className="border-l-4 border-[#F5A623] bg-[#111111] p-8 text-white md:p-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5A623]">
                  {t(
                    "Foundation programme standard",
                    "ଫାଉଣ୍ଡେସନ କାର୍ଯ୍ୟକ୍ରମ ମାନଦଣ୍ଡ"
                  )}
                </p>
                <p className="mt-4 font-serif text-2xl font-bold leading-relaxed text-white md:text-4xl">
                  {t(FOUNDER_STORY.quote.en, FOUNDER_STORY.quote.od)}
                </p>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5A623]">
                  {t(
                    FOUNDER_STORY.attribution.en,
                    FOUNDER_STORY.attribution.od
                  )}
                </p>
              </div>
            </AnimatedSection>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shiksha-sathi"
                className="inline-flex items-center justify-center gap-2 rounded bg-[#F5A623] px-6 py-3.5 font-sans text-sm font-bold text-[#1A1A1A]"
              >
                {t("See our education work", "ଆମ ଶିକ୍ଷା କାମ ଦେଖନ୍ତୁ")}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/monthly-reports"
                className="inline-flex items-center justify-center gap-2 rounded border border-[#B99455] px-6 py-3.5 font-sans text-sm font-bold text-[#6F4300]"
              >
                {t("Read public records", "ସାର୍ବଜନିକ ରେକର୍ଡ ପଢ଼ନ୍ତୁ")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
