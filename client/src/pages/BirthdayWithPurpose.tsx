import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CakeSlice,
  Check,
  Clipboard,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { BIRTHDAY_WITH_PURPOSE } from "@/data/restoredPublicContent";

export default function BirthdayWithPurpose() {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const shareMessage =
    language === "od"
      ? BIRTHDAY_WITH_PURPOSE.shareMessage.od
      : BIRTHDAY_WITH_PURPOSE.shareMessage.en;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const copyShareMessage = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#1A1A1A]">
      <SEO
        title={t(
          "Birthday with Purpose | Abhiara Foundation",
          "ଉଦ୍ଦେଶ୍ୟ ସହ ଜନ୍ମଦିନ | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Mark a birthday with a one-time education gift for orphaned children and children from underprivileged families.",
          "ଅନାଥ ଶିଶୁ ଓ ସୁବିଧାବଞ୍ଚିତ ପରିବାରର ଶିଶୁଙ୍କ ଶିକ୍ଷା ପାଇଁ ଏକ ସରଳ ଏକଥର ଦାନ ସହ ଜନ୍ମଦିନ ପାଳନ କରନ୍ତୁ।"
        )}
        url="https://www.abhiarafoundation.org/birthday-with-purpose"
      />
      <Navbar />

      <main id="main-content">
        <section className="relative overflow-hidden bg-[#111111] pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 24% 25%, #F5A623 0, transparent 30%), radial-gradient(circle at 78% 75%, #8B5318 0, transparent 26%)",
            }}
          />
          <div className="container relative z-10 grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <AnimatedSection>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F5A623]">
                {t("A simple way to share joy", "ଖୁସି ବାଣ୍ଟିବାର ସରଳ ଉପାୟ")}
              </p>
              <h1 className="mt-5 max-w-4xl font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
                {t(
                  BIRTHDAY_WITH_PURPOSE.title.en,
                  BIRTHDAY_WITH_PURPOSE.title.od
                )}
              </h1>
              <p className="mt-7 max-w-3xl font-sans text-lg leading-relaxed text-white/75">
                {t(
                  BIRTHDAY_WITH_PURPOSE.introduction.en,
                  BIRTHDAY_WITH_PURPOSE.introduction.od
                )}
              </p>
              <Link
                href="/donate-for-education"
                className="mt-9 inline-flex items-center justify-center gap-2 rounded bg-[#F5A623] px-6 py-3.5 font-sans text-sm font-bold text-[#1A1A1A]"
              >
                {t(
                  "Make a one time education gift",
                  "ଶିକ୍ଷା ପାଇଁ ଏକଥର ଦାନ କରନ୍ତୁ"
                )}
                <ArrowRight size={16} />
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="border border-white/15 bg-white/5 p-7 backdrop-blur-sm">
                <CakeSlice size={34} className="text-[#F5A623]" />
                <h2 className="mt-5 font-serif text-2xl font-bold text-white">
                  {t("What this page does", "ଏହି ପୃଷ୍ଠା କଣ କରେ")}
                </h2>
                <div className="mt-6 space-y-4">
                  {[
                    t(
                      "Lets you support the Foundation’s education work on your birthday",
                      "ଆପଣଙ୍କ ଜନ୍ମଦିନର ଇଚ୍ଛାକୁ ଫାଉଣ୍ଡେସନର ପ୍ରମୁଖ ଶିକ୍ଷା ଲକ୍ଷ୍ୟ ସହ ଯୋଡ଼େ"
                    ),
                    t(
                      "Takes you to the Foundation’s one-time donation page",
                      "ଫାଉଣ୍ଡେସନର ମାନକ ଏକଥର ଦାନ ପୃଷ୍ଠା ବ୍ୟବହାର କରେ"
                    ),
                    t(
                      "Lets you copy a simple message for family and friends",
                      "ପରିବାର ଓ ସାଙ୍ଗମାନଙ୍କ ପାଇଁ ସରଳ ସନ୍ଦେଶ କପି କରିବାକୁ ଦିଏ"
                    ),
                  ].map(item => (
                    <p
                      key={item}
                      className="flex gap-3 font-sans text-sm leading-relaxed text-white/75"
                    >
                      <Check
                        size={17}
                        className="mt-0.5 shrink-0 text-[#F5A623]"
                      />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container grid max-w-6xl gap-6 md:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: t("Education first", "ଶିକ୍ଷା ପ୍ରଥମ"),
                body: t(
                  "Your gift goes through the same education donation page used for Abhiara Shiksha Sathi.",
                  "ଆପଣଙ୍କ ଦାନ ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ ପାଇଁ ବ୍ୟବହୃତ ସେହି ଶିକ୍ଷା ଦାନ ପୃଷ୍ଠା ମାଧ୍ୟମରେ ଯାଏ।"
                ),
              },
              {
                icon: ShieldCheck,
                title: t("Private by default", "ଗୋପନୀୟତା ପ୍ରଥମ"),
                body: t(
                  "We do not ask you to register a birthday, create a public profile or list your name on this page.",
                  "ଆମେ ଆପଣଙ୍କୁ ଜନ୍ମଦିନ ପଞ୍ଜୀକରଣ, ସାର୍ବଜନିକ ପ୍ରୋଫାଇଲ ତିଆରି ବା ଏହି ପୃଷ୍ଠାରେ ନାମ ପ୍ରକାଶ କରିବାକୁ କହୁ ନାହିଁ।"
                ),
              },
              {
                icon: CakeSlice,
                title: t("No separate campaign", "ଅଲଗା ଅଭିଯାନ ନାହିଁ"),
                body: t(
                  "There is no public birthday list, personal collection page or separate payment process.",
                  "କୌଣସି ସାର୍ବଜନିକ ଜନ୍ମଦିନ ତାଲିକା, ବ୍ୟକ୍ତିଗତ ସଂଗ୍ରହ ପୃଷ୍ଠା ବା ଅଲଗା ଦାନ ପ୍ରକ୍ରିୟା ନାହିଁ।"
                ),
              },
            ].map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.05}>
                <article className="h-full border border-[#E8DCC6] bg-[#FFFDF8] p-7">
                  <item.icon size={24} className="text-[#B56A22]" />
                  <h2 className="mt-5 font-serif text-xl font-bold">
                    {item.title}
                  </h2>
                  <p className="mt-3 font-sans text-sm leading-7 text-[#555]">
                    {item.body}
                  </p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <section className="bg-[#FAF4E8] py-16 md:py-24">
          <div className="container max-w-4xl">
            <AnimatedSection>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                {t("A message you can share", "ଆପଣ ସେୟାର କରିପାରିବା ସନ୍ଦେଶ")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
                {t(
                  "Invite people without sharing personal details",
                  "ବ୍ୟକ୍ତିଗତ ବିବରଣୀ ଦେଇନାହିଁ ସମସ୍ତଙ୍କୁ ଯୋଡ଼ନ୍ତୁ"
                )}
              </h2>
              <div className="mt-7 border border-[#E0C99E] bg-white p-7">
                <p className="font-sans text-base leading-8 text-[#444]">
                  {shareMessage}
                </p>
                <button
                  type="button"
                  onClick={copyShareMessage}
                  className="mt-6 inline-flex items-center gap-2 rounded bg-[#111111] px-5 py-3 font-sans text-sm font-bold text-white active:scale-[0.97]"
                >
                  {copied ? <Check size={16} /> : <Clipboard size={16} />}
                  {copied
                    ? t("Message copied", "ସନ୍ଦେଶ କପି ହେଲା")
                    : t("Copy message", "ସନ୍ଦେଶ କପି କରନ୍ତୁ")}
                </button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
