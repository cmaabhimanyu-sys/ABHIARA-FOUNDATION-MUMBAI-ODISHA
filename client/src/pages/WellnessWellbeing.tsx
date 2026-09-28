import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const POSSIBLE_AREAS = [
  {
    icon: Stethoscope,
    title: { en: "Basic health check-up days", od: "ମୂଳ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ଦିବସ" },
    body: {
      en: "Possible local check-up days led by qualified and authorised medical partners.",
      od: "ଯୋଗ୍ୟ ଓ ଅନୁମୋଦିତ ଚିକିତ୍ସା ସହଯୋଗୀଙ୍କ ଦ୍ୱାରା ସମ୍ଭାବ୍ୟ ସ୍ଥାନୀୟ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ଦିବସ।",
    },
  },
  {
    icon: HeartPulse,
    title: { en: "Health awareness", od: "ସ୍ୱାସ୍ଥ୍ୟ ସଚେତନତା" },
    body: {
      en: "Simple sessions on hygiene, nutrition, prevention and when to seek professional care.",
      od: "ପରିଚ୍ଛନ୍ନତା, ପୋଷଣ, ପ୍ରତିରୋଧ ଓ କେବେ ବିଶେଷଜ୍ଞ ଚିକିତ୍ସା ନେବା ଉଚିତ ସେ ବିଷୟରେ ସରଳ ଅଧିବେଶନ।",
    },
  },
  {
    icon: Users,
    title: { en: "Wellbeing guidance", od: "ସୁସ୍ଥତା ମାର୍ଗଦର୍ଶନ" },
    body: {
      en: "Age suitable wellbeing information and referral to qualified services when needed.",
      od: "ବୟସ ଅନୁଯାୟୀ ସୁସ୍ଥତା ସୂଚନା ଏବଂ ଆବଶ୍ୟକ ହେଲେ ଯୋଗ୍ୟ ସେବାକୁ ପଠାଇବା।",
    },
  },
] as const;

export default function WellnessWellbeing() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <SEO
        title={t(
          "Wellness and Wellbeing | Future Plan | Abhiara Foundation",
          "ସ୍ୱାସ୍ଥ୍ୟ ଓ ସୁସ୍ଥତା | ଭବିଷ୍ୟତ ପରିକଳ୍ପନା | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "A future partner-led plan for basic health check-up days, health awareness and wellbeing guidance.",
          "ମୂଳ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ଦିବସ, ସ୍ୱାସ୍ଥ୍ୟ ସଚେତନତା ଓ ସୁସ୍ଥତା ମାର୍ଗଦର୍ଶନ ପାଇଁ ଭବିଷ୍ୟତ ସହଯୋଗୀ ଭିତ୍ତିକ ପରିକଳ୍ପନା।"
        )}
        url="https://www.abhiarafoundation.org/wellness-and-wellbeing"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <div className="container max-w-6xl">
            <span className="inline-flex rounded-full bg-[#F5A623] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A1A1A]">
              {t("Future plan", "ଭବିଷ୍ୟତ ପରିକଳ୍ପନା")}
            </span>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-bold text-white md:text-7xl">
              {t("Wellness and Wellbeing", "ସ୍ୱାସ୍ଥ୍ୟ ଓ ସୁସ୍ଥତା")}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
              {t(
                "We are considering simple health awareness and basic check-up activities with qualified partners. This is a future plan and is not an active clinic or medical service.",
                "ଯୋଗ୍ୟ ସହଯୋଗୀଙ୍କ ସହ ସରଳ ସ୍ୱାସ୍ଥ୍ୟ ସଚେତନତା ଓ ମୂଳ ଯାଞ୍ଚ କାର୍ଯ୍ୟକଳାପ ବିଚାର କରାଯାଉଛି। ଏହା ଭବିଷ୍ୟତ ପରିକଳ୍ପନା, ସକ୍ରିୟ କ୍ଲିନିକ ବା ଚିକିତ୍ସା ସେବା ନୁହେଁ।"
              )}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-6 md:grid-cols-3">
              {POSSIBLE_AREAS.map(item => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title.en}
                    className="border border-[#E8DCC6] bg-[#FFFDF8] p-7"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5A623]">
                      <Icon size={22} aria-hidden="true" />
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

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="border-l-4 border-[#F5A623] bg-[#111111] p-7 text-white">
                <ShieldCheck className="text-[#F5A623]" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-3xl font-bold text-white">
                  {t(
                    "What must be ready first",
                    "ପ୍ରଥମେ କଣ ପ୍ରସ୍ତୁତ ହେବା ଆବଶ୍ୟକ"
                  )}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  {t(
                    "A qualified medical partner, written roles, consent, privacy controls, referral steps, records and approved funding must be ready before any activity starts.",
                    "କୌଣସି କାର୍ଯ୍ୟ ଆରମ୍ଭ ପୂର୍ବରୁ ଯୋଗ୍ୟ ଚିକିତ୍ସା ସହଯୋଗୀ, ଲିଖିତ ଦାୟିତ୍ୱ, ସମ୍ମତି, ଗୋପନୀୟତା ନିୟମ, ରେଫରାଲ ପଦକ୍ଷେପ, ରେକର୍ଡ ଓ ଅନୁମୋଦିତ ଅର୍ଥ ପ୍ରସ୍ତୁତ ହେବା ଆବଶ୍ୟକ।"
                  )}
                </p>
              </div>
              <div className="border border-amber-200 bg-amber-50 p-7">
                <h2 className="font-serif text-2xl font-bold text-[#5E4300]">
                  {t("Not a treatment service", "ଏହା ଚିକିତ୍ସା ସେବା ନୁହେଁ")}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#6B5314]">
                  {t(
                    "Abhiara Foundation does not diagnose illness, prescribe medicine or promise treatment. Urgent medical requests continue to be considered separately, case by case and subject to funds and verification.",
                    "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ରୋଗ ନିର୍ଣ୍ଣୟ, ଔଷଧ ଲେଖିବା ବା ଚିକିତ୍ସାର ପ୍ରତିଶ୍ରୁତି ଦେଉନାହିଁ। ଜରୁରୀ ଚିକିତ୍ସା ଅନୁରୋଧ ଅଲଗା ଭାବେ, ମାମଲା ଅନୁଯାୟୀ, ଅର୍ଥ ଓ ଯାଞ୍ଚ ଉପରେ ନିର୍ଭର କରି ବିଚାର କରାଯାଏ।"
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
                href="/medical-emergency-support"
                className="inline-flex items-center justify-center rounded border border-[#B99455] px-6 py-3 text-sm font-bold text-[#6F4300]"
              >
                {t(
                  "Read about urgent medical requests",
                  "ଜରୁରୀ ଚିକିତ୍ସା ଅନୁରୋଧ ବିଷୟରେ ପଢ଼ନ୍ତୁ"
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
