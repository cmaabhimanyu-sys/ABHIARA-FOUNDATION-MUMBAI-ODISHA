import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BookOpen,
  Laptop,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const LEARNING_AREAS = [
  {
    icon: Laptop,
    title: { en: "Safe computer use", od: "ସୁରକ୍ଷିତ କମ୍ପ୍ୟୁଟର ବ୍ୟବହାର" },
    body: {
      en: "Basic use of computers, documents, online search and common digital tools.",
      od: "କମ୍ପ୍ୟୁଟର, ଡକ୍ୟୁମେଣ୍ଟ, ଅନଲାଇନ ସନ୍ଧାନ ଓ ସାଧାରଣ ଡିଜିଟାଲ ଉପକରଣର ମୂଳ ବ୍ୟବହାର।",
    },
  },
  {
    icon: ShieldCheck,
    title: { en: "Online safety", od: "ଅନଲାଇନ ସୁରକ୍ଷା" },
    body: {
      en: "Privacy, strong passwords, false information, scams and safe online behaviour.",
      od: "ଗୋପନୀୟତା, ଶକ୍ତିଶାଳୀ ପାସୱାର୍ଡ, ଭୁଲ ସୂଚନା, ଠକେଇ ଓ ସୁରକ୍ଷିତ ଅନଲାଇନ ବ୍ୟବହାର।",
    },
  },
  {
    icon: Sparkles,
    title: { en: "AI basics", od: "AI ର ମୂଳ ଜ୍ଞାନ" },
    body: {
      en: "A simple introduction to what AI can do, what it cannot do and why people must check its answers.",
      od: "AI କଣ କରିପାରେ, କଣ କରିପାରେ ନାହିଁ ଏବଂ ଏହାର ଉତ୍ତର କାହିଁକି ଯାଞ୍ଚ କରିବା ଆବଶ୍ୟକ ତାହାର ସରଳ ପରିଚୟ।",
    },
  },
  {
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
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <SEO
        title={t(
          "Digital Learning and AI Basics | Abhiara Foundation",
          "ଡିଜିଟାଲ ଶିକ୍ଷା ଓ AI ମୂଳ ଜ୍ଞାନ | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "A future Abhiara Foundation learning plan for practical digital skills, online safety and basic AI awareness.",
          "ବ୍ୟବହାରିକ ଡିଜିଟାଲ କୌଶଳ, ଅନଲାଇନ ସୁରକ୍ଷା ଓ AI ର ମୂଳ ଜ୍ଞାନ ପାଇଁ ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଭବିଷ୍ୟତ ଶିକ୍ଷା ପରିକଳ୍ପନା।"
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
                "Digital Learning and AI Basics",
                "ଡିଜିଟାଲ ଶିକ୍ଷା ଓ AI ମୂଳ ଜ୍ଞାନ"
              )}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
              {t(
                "This planned programme would introduce safe use of digital tools and explain AI in simple language for children and young people. It is not an active class today.",
                "ଏହି ପରିକଳ୍ପିତ କାର୍ଯ୍ୟକ୍ରମରେ ଶିଶୁ ଓ ଯୁବମାନଙ୍କୁ ଡିଜିଟାଲ ଉପକରଣର ସୁରକ୍ଷିତ ବ୍ୟବହାର ଏବଂ ସରଳ ଭାଷାରେ AI ବିଷୟରେ ପରିଚୟ ଦିଆଯିବ। ଏହା ବର୍ତ୍ତମାନ ସକ୍ରିୟ ଶ୍ରେଣୀ ନୁହେଁ।"
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
                    className="border border-[#E8DCC6] bg-[#FFFDF8] p-7"
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
