/** Abhiara Foundation volunteer page. */
import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, CalendarDays, Camera, HeartHandshake, Mail, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Volunteer() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const waysToHelp = [
    {
      icon: BookOpen,
      title: t("Help children with studies", "ପିଲାମାନଙ୍କ ପାଠପଢ଼ାରେ ସାହାଯ୍ୟ କରନ୍ତୁ"),
      text: t(
        "When a study visit is planned, you can help children with reading, homework, or school activities.",
        "ପାଠପଢ଼ା ପାଇଁ ଯେତେବେଳେ ଭେଟ ହୁଏ, ଆପଣ ପିଲାମାନଙ୍କୁ ପଢ଼ିବା, ଘର କାମ କିମ୍ବା ସ୍କୁଲ କାମରେ ସାହାଯ୍ୟ କରିପାରିବେ।"
      ),
    },
    {
      icon: CalendarDays,
      title: t("Help prepare learning materials", "ପଢ଼ା ସାମଗ୍ରୀ ପ୍ରସ୍ତୁତିରେ ସାହାଯ୍ୟ କରନ୍ତୁ"),
      text: t(
        "You can help sort books, prepare study kits, or support an approved education activity.",
        "ଆପଣ ପୁସ୍ତକ ଛାଣିବା, ପଢ଼ା କିଟ ପ୍ରସ୍ତୁତି ବା ଅନୁମୋଦିତ ଶିକ୍ଷା କାର୍ଯ୍ୟରେ ସାହାଯ୍ୟ କରିପାରିବେ।"
      ),
    },
    {
      icon: MapPin,
      title: t("Help in your local area", "ଆପଣଙ୍କ ଅଞ୍ଚଳରେ ସାହାଯ୍ୟ କରନ୍ତୁ"),
      text: t(
        "You can share a child education referral or help the authorised team during a verification visit.",
        "ଆପଣ ଶିଶୁ ଶିକ୍ଷା ସୁପାରିଶ ଦେଇପାରିବେ ବା ଯାଞ୍ଚ ଭେଟରେ ଅନୁମୋଦିତ ଦଳକୁ ସାହାଯ୍ୟ କରିପାରିବେ।"
      ),
    },
    {
      icon: Camera,
      title: t("Help with photos or language", "ଫଟୋ କିମ୍ବା ଭାଷାରେ ସାହାଯ୍ୟ କରନ୍ତୁ"),
      text: t(
        "You can help translate between Odia and English. Photos of children may be taken only after guardian consent and Foundation approval.",
        "ଆପଣ ଓଡ଼ିଆ ଓ ଇଂରାଜୀ ଅନୁବାଦରେ ସାହାଯ୍ୟ କରିପାରିବେ। ଅଭିଭାବକ ସମ୍ମତି ଓ ଫାଉଣ୍ଡେସନ ଅନୁମୋଦନ ପରେ ମାତ୍ର ଶିଶୁଙ୍କ ଫଟୋ ନିଆଯାଇପାରିବ।"
      ),
    },
  ];

  const simpleGuidance = [
    t("Speak kindly and treat every person with respect.", "ଭଲ ଭାବରେ କଥା କହନ୍ତୁ ଏବଂ ସମସ୍ତଙ୍କୁ ସମ୍ମାନ ଦିଅନ୍ତୁ।"),
    t("Follow the local team's guidance during an activity.", "କାର୍ଯ୍ୟକ୍ରମ ସମୟରେ ସ୍ଥାନୀୟ ଦଳର କଥା ମାନନ୍ତୁ।"),
    t("Ask before taking a photo or sharing someone's story.", "କାହାର ଫଟୋ ନେବା କିମ୍ବା କଥା ସେୟାର କରିବା ପୂର୍ବରୁ ଅନୁମତି ନିଅନ୍ତୁ।"),
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title={t("Volunteer with Abhiara Foundation", "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସହ ସ୍ୱେଚ୍ଛାସେବୀ ହୁଅନ୍ତୁ")}
        description={t(
          "Give some time when you can. Help with studies, local activities, village visits, photos, or translation.",
          "ସମୟ ଥିଲେ କିଛି ସମୟ ଦିଅନ୍ତୁ। ପାଠପଢ଼ା, ସ୍ଥାନୀୟ କାର୍ଯ୍ୟକ୍ରମ, ଗାଁ ଭେଟ, ଫଟୋ କିମ୍ବା ଅନୁବାଦରେ ସାହାଯ୍ୟ କରନ୍ତୁ।"
        )}
        url="https://www.abhiarafoundation.org/volunteer"
      />
      <Navbar />

      <main>
        <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-[#111111]">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23F5A623' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="container relative z-10 pt-32 pb-16 text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F5A623]"
            >
              {t("GIVE SOME TIME WHEN YOU CAN", "ସମୟ ଥିଲେ କିଛି ସମୟ ଦିଅନ୍ତୁ")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-6 font-serif text-4xl font-bold leading-tight text-white md:text-6xl"
            >
              {t("Volunteer with ", "ସ୍ୱେଚ୍ଛାସେବୀ ଭାବେ ")}
              <span className="text-[#F5A623]">{t("Abhiara", "ଅଭିଆରା ସହ ଯୋଗ ଦିଅନ୍ତୁ")}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-2xl font-sans text-[17px] leading-8 text-white/75"
            >
              {t(
                "Tell us how you would like to help and when you are free. That is enough to start.",
                "ଆପଣ କିପରି ସାହାଯ୍ୟ କରିବାକୁ ଚାହୁଁଛନ୍ତି ଏବଂ କେବେ ସମୟ ଅଛି, ଆମକୁ କୁହନ୍ତୁ। ଆରମ୍ଭ ପାଇଁ ଏତିକି ଯଥେଷ୍ଟ।"
              )}
            </motion.p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container">
            <AnimatedSection className="mb-10 text-center">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F5A623]">
                {t("HOW YOU CAN HELP", "ଆପଣ କିପରି ସାହାଯ୍ୟ କରିପାରିବେ")}
              </p>
              <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] md:text-4xl">
                {t("Choose what feels right for you", "ଆପଣଙ୍କୁ ଯାହା ଭଲ ଲାଗେ ତାହା ବାଛନ୍ତୁ")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-[16px] leading-7 text-[#555]">
                {t(
                  "You can help once, sometimes, or whenever a nearby activity is planned.",
                  "ଆପଣ ଥରେ, କେବେ କେବେ କିମ୍ବା ନିକଟରେ କାର୍ଯ୍ୟକ୍ରମ ହେଲେ ସାହାଯ୍ୟ କରିପାରିବେ।"
                )}
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {waysToHelp.map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 0.05}>
                  <article className="h-full border border-[#E7E0D6] bg-white p-6 md:p-7">
                    <item.icon size={28} className="mb-4 text-[#F5A623]" aria-hidden="true" />
                    <h3 className="mb-3 font-serif text-xl font-bold text-[#1A1A1A]">{item.title}</h3>
                    <p className="font-sans text-[15px] leading-7 text-[#555]">{item.text}</p>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FFF7EA] py-14 md:py-16">
          <div className="container grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <AnimatedSection>
              <HeartHandshake size={34} className="mb-4 text-[#F5A623]" aria-hidden="true" />
              <h2 className="mb-4 font-serif text-3xl font-bold text-[#1A1A1A]">
                {t("A few simple things", "କିଛି ସରଳ କଥା")}
              </h2>
              <p className="font-sans text-[16px] leading-7 text-[#555]">
                {t(
                  "We want every visit to feel safe and respectful for the people we meet.",
                  "ଆମେ ଯେଉଁ ଲୋକଙ୍କୁ ଭେଟୁଛୁ, ସେମାନଙ୍କ ପାଇଁ ପ୍ରତ୍ୟେକ ଭେଟ ସୁରକ୍ଷିତ ଓ ସମ୍ମାନଜନକ ହେଉ ବୋଲି ଚାହୁଁଛୁ।"
                )}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <ul className="space-y-4">
                {simpleGuidance.map((item) => (
                  <li key={item} className="flex gap-3 bg-white p-4 font-sans text-[15px] leading-6 text-[#444]">
                    <Users size={18} className="mt-0.5 shrink-0 text-[#F5A623]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </section>

        <section className="bg-[#1A1A1A] py-16 md:py-20">
          <div className="container text-center">
            <AnimatedSection>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F5A623]">
                {t("READY TO HELP", "ସାହାଯ୍ୟ କରିବାକୁ ପ୍ରସ୍ତୁତ")}
              </p>
              <h2 className="mx-auto mb-5 max-w-2xl font-serif text-3xl font-bold text-white md:text-4xl">
                {t("Tell us how you would like to volunteer", "ଆପଣ କିପରି ସ୍ୱେଚ୍ଛାସେବୀ ହେବାକୁ ଚାହୁଁଛନ୍ତି ଆମକୁ କୁହନ୍ତୁ")}
              </h2>
              <p className="mx-auto mb-8 max-w-xl font-sans text-[16px] leading-7 text-white/70">
                {t(
                  "Write a short message. Just tell us your name, your area, and how you would like to help.",
                  "ଏକ ଛୋଟ ସନ୍ଦେଶ ଲେଖନ୍ତୁ। କେବଳ ଆପଣଙ୍କ ନାମ, ଅଞ୍ଚଳ ଏବଂ କିପରି ସାହାଯ୍ୟ କରିବାକୁ ଚାହୁଁଛନ୍ତି ଜଣାନ୍ତୁ।"
                )}
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#F5A623] px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#1A1A1A] hover:bg-[#E8960E]"
                >
                  {t("CONTACT US", "ଯୋଗାଯୋଗ କରନ୍ତୁ")} <ArrowRight size={14} />
                </Link>
                <a
                  href="mailto:info@abhiarafoundation.org?subject=I%20want%20to%20volunteer"
                  className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white hover:border-[#F5A623] hover:text-[#F5A623]"
                >
                  <Mail size={14} /> {t("SEND AN EMAIL", "ଇମେଲ ପଠାନ୍ତୁ")}
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
