import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Laptop, ShieldCheck, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const LEARNING_AREAS = [
  {
    id: "computer-lab",
    icon: Laptop,
    title: {
      en: "Computer Lab and AI Basics",
      od: "କମ୍ପ୍ୟୁଟର ଲ୍ୟାବ ଓ AI ମୂଳ ଜ୍ଞାନ",
    },
    body: {
      en: "A planned supervised space for basic computer use, documents, online search, common digital tools and a simple introduction to AI.",
      od: "କମ୍ପ୍ୟୁଟରର ମୂଳ ବ୍ୟବହାର, ଡକ୍ୟୁମେଣ୍ଟ, ଅନଲାଇନ ସନ୍ଧାନ, ସାଧାରଣ ଡିଜିଟାଲ ଉପକରଣ ଓ AI ର ସରଳ ପରିଚୟ ପାଇଁ ଏକ ପରିକଳ୍ପିତ ତତ୍ତ୍ୱାବଧାନ ଥିବା ସ୍ଥାନ।",
    },
  },
  {
    id: "online-safety",
    icon: ShieldCheck,
    title: { en: "Online safety", od: "ଅନଲାଇନ ସୁରକ୍ଷା" },
    body: {
      en: "Privacy, strong passwords, false information, scams and safe online behaviour.",
      od: "ଗୋପନୀୟତା, ଶକ୍ତିଶାଳୀ ପାସୱାର୍ଡ, ଭୁଲ ସୂଚନା, ଠକେଇ ଓ ସୁରକ୍ଷିତ ଅନଲାଇନ ବ୍ୟବହାର।",
    },
  },
  {
    id: "competitive-exams",
    icon: BookOpen,
    title: {
      en: "Competitive Exam Support",
      od: "ପ୍ରତିଯୋଗିତାମୂଳକ ପରୀକ୍ଷା ସହାୟତା",
    },
    body: {
      en: "A future plan for preparation books, basic digital practice and guidance for eligible older students. No coaching enrolment is open at present.",
      od: "ଯୋଗ୍ୟ ବୟସ୍କ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ ପ୍ରସ୍ତୁତି ପୁସ୍ତକ, ମୂଳ ଡିଜିଟାଲ ଅଭ୍ୟାସ ଓ ମାର୍ଗଦର୍ଶନର ଭବିଷ୍ୟତ ଯୋଜନା। ବର୍ତ୍ତମାନ କୌଣସି କୋଚିଂ ନାମଲେଖା ଖୋଲା ନାହିଁ।",
    },
  },
  {
    id: "guided-learning",
    icon: Users,
    title: { en: "Learning with guidance", od: "ମାର୍ଗଦର୍ଶନ ସହ ଶିକ୍ଷା" },
    body: {
      en: "Sessions led by trained people, with age suitable material and child safety rules.",
      od: "ପ୍ରଶିକ୍ଷିତ ବ୍ୟକ୍ତିଙ୍କ ମାର୍ଗଦର୍ଶନ, ବୟସ ଅନୁଯାୟୀ ପାଠ୍ୟ ସାମଗ୍ରୀ ଓ ଶିଶୁ ସୁରକ୍ଷା ନିୟମ ସହ ଅଧିବେଶନ।",
    },
  },
] as const;

export default function DigitalLearningAI() {
  const { t } = useLanguage();

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    const frame = window.requestAnimationFrame(() => {
      if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({ block: "start" });
      } else {
        window.scrollTo(0, 0);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <SEO
        title={t(
          "Digital Learning, Computer Lab and Competitive Exam Support | Abhiara Foundation",
          "ଡିଜିଟାଲ ଶିକ୍ଷା, କମ୍ପ୍ୟୁଟର ଲ୍ୟାବ ଓ ପ୍ରତିଯୋଗିତାମୂଳକ ପରୀକ୍ଷା ସହାୟତା | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Future Abhiara Foundation plans for a supervised computer lab, basic AI learning, online safety and competitive exam support.",
          "ତତ୍ତ୍ୱାବଧାନ ଥିବା କମ୍ପ୍ୟୁଟର ଲ୍ୟାବ, AI ର ମୂଳ ଶିକ୍ଷା, ଅନଲାଇନ ସୁରକ୍ଷା ଓ ପ୍ରତିଯୋଗିତାମୂଳକ ପରୀକ୍ଷା ସହାୟତା ପାଇଁ ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଭବିଷ୍ୟତ ଯୋଜନା।"
        )}
        url="https://www.abhiarafoundation.org/digital-learning-ai"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <div className="container max-w-6xl">
            <span className="inline-flex items-center rounded-full bg-[#F5A623] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A1A1A]">
              {t("Future plan", "ଭବିଷ୍ୟତ ପରିକଳ୍ପନା")}
            </span>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-bold text-white md:text-7xl">
              {t(
                "Digital Learning and Future Skills",
                "ଡିଜିଟାଲ ଶିକ୍ଷା ଓ ଭବିଷ୍ୟତ କୌଶଳ"
              )}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
              {t(
                "These planned education pathways cover a supervised computer lab, safe digital skills, basic AI learning and support for eligible students preparing for competitive examinations. They are not active classes today.",
                "ଏହି ପରିକଳ୍ପିତ ଶିକ୍ଷା ପଥରେ ତତ୍ତ୍ୱାବଧାନ ଥିବା କମ୍ପ୍ୟୁଟର ଲ୍ୟାବ, ସୁରକ୍ଷିତ ଡିଜିଟାଲ କୌଶଳ, AI ର ମୂଳ ଶିକ୍ଷା ଓ ପ୍ରତିଯୋଗିତାମୂଳକ ପରୀକ୍ଷା ପ୍ରସ୍ତୁତି କରୁଥିବା ଯୋଗ୍ୟ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ ସହାୟତା ରହିଛି। ବର୍ତ୍ତମାନ ଏହି ଶ୍ରେଣୀଗୁଡ଼ିକ ସକ୍ରିୟ ନୁହେଁ।"
              )}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2">
              {LEARNING_AREAS.map(item => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title.en}
                    id={item.id}
                    className="scroll-mt-32 border border-[#E8DCC6] bg-[#FFFDF8] p-7"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5A623]">
                      <Icon size={23} aria-hidden="true" />
                    </span>
                    <h2 className="mt-5 font-serif text-2xl font-bold">
                      {t(item.title.en, item.title.od)}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#555]">
                      {t(item.body.en, item.body.od)}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="border-l-4 border-[#F5A623] bg-[#111111] p-7 text-white">
                <BookOpen className="text-[#F5A623]" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-3xl font-bold text-white">
                  {t(
                    "What must be ready first",
                    "ପ୍ରଥମେ କଣ ପ୍ରସ୍ତୁତ ହେବା ଆବଶ୍ୟକ"
                  )}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  {t(
                    "The plan will start only when trained facilitators, suitable devices, safe internet access, child safety rules and steady funding are available.",
                    "ପ୍ରଶିକ୍ଷିତ ଶିକ୍ଷକ, ଉପଯୁକ୍ତ ଉପକରଣ, ସୁରକ୍ଷିତ ଇଣ୍ଟରନେଟ, ଶିଶୁ ସୁରକ୍ଷା ନିୟମ ଓ ସ୍ଥାୟୀ ଅର୍ଥ ଉପଲବ୍ଧ ହେଲେ ମାତ୍ର ଏହି ପରିକଳ୍ପନା ଆରମ୍ଭ ହେବ।"
                  )}
                </p>
              </div>
              <div className="border border-amber-200 bg-amber-50 p-7">
                <h2 className="font-serif text-2xl font-bold text-[#5E4300]">
                  {t("Not open yet", "ଏପର୍ଯ୍ୟନ୍ତ ଆରମ୍ଭ ହୋଇନାହିଁ")}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#6B5314]">
                  {t(
                    "No enrolment, training application or certificate is available for this future plan at present.",
                    "ବର୍ତ୍ତମାନ ଏହି ଭବିଷ୍ୟତ ପରିକଳ୍ପନା ପାଇଁ ନାମଲେଖା, ପ୍ରଶିକ୍ଷଣ ଆବେଦନ ବା ପ୍ରମାଣପତ୍ର ଉପଲବ୍ଧ ନାହିଁ।"
                  )}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/abhiara-vidyapitha"
                className="inline-flex items-center justify-center gap-2 rounded bg-[#F5A623] px-6 py-3 text-sm font-bold text-[#1A1A1A]"
              >
                {t("See all future plans", "ସମସ୍ତ ଭବିଷ୍ୟତ ପରିକଳ୍ପନା ଦେଖନ୍ତୁ")}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/shiksha-sathi"
                className="inline-flex items-center justify-center rounded border border-[#B99455] px-6 py-3 text-sm font-bold text-[#6F4300]"
              >
                {t(
                  "See our active education work",
                  "ଆମ ସକ୍ରିୟ ଶିକ୍ଷା କାମ ଦେଖନ୍ତୁ"
                )}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
