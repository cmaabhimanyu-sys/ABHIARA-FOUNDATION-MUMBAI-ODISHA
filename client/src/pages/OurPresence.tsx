import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";

const PRESENCE_AREAS = [
  {
    key: "mumbai",
    icon: Building2,
    labelEn: "Registered office",
    labelOd: "ପଞ୍ଜିକୃତ କାର୍ଯ୍ୟାଳୟ",
    titleEn: "Mumbai, Maharashtra",
    titleOd: "ମୁମ୍ବାଇ, ମହାରାଷ୍ଟ୍ର",
    bodyEn:
      "Abhiara Foundation is a Section 8 nonprofit company with its registered office in Mumbai.",
    bodyOd:
      "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଏକ ସେକ୍ସନ ୮ ଅଲାଭକାରୀ କମ୍ପାନୀ ଏବଂ ଏହାର ପଞ୍ଜିକୃତ କାର୍ଯ୍ୟାଳୟ ମୁମ୍ବାଇରେ ଅଛି।",
  },
  {
    key: "odisha",
    icon: MapPinned,
    labelEn: "Ground work",
    labelOd: "କ୍ଷେତ୍ର କାମ",
    titleEn: "Odisha",
    titleOd: "ଓଡ଼ିଶା",
    bodyEn:
      "The Foundation’s ground activities and local coordination are mainly organised in Odisha. Public activity pages name a place only when it has been checked.",
    bodyOd:
      "ଫାଉଣ୍ଡେସନର କ୍ଷେତ୍ର କାମ ଓ ସ୍ଥାନୀୟ ସମନ୍ୱୟ ମୁଖ୍ୟତଃ ଓଡ଼ିଶାରେ ହୁଏ। ସ୍ଥାନ ଯାଞ୍ଚ ହେବା ପରେ ମାତ୍ର ସାର୍ବଜନୀନ କାର୍ଯ୍ୟକ୍ରମ ପୃଷ୍ଠାରେ ତାହାର ନାମ ଦିଆଯାଏ।",
  },
  {
    key: "india",
    icon: GraduationCap,
    labelEn: "Education requests",
    labelOd: "ଶିକ୍ଷା ଅନୁରୋଧ",
    titleEn: "Different parts of India",
    titleOd: "ଭାରତର ବିଭିନ୍ନ ସ୍ଥାନ",
    bodyEn:
      "Education requests for orphaned and underprivileged children may be considered from different parts of India. Every request is checked before support is approved.",
    bodyOd:
      "ଭାରତର ବିଭିନ୍ନ ସ୍ଥାନର ଅନାଥ ଓ ସୁବିଧାବଞ୍ଚିତ ଶିଶୁଙ୍କ ଶିକ୍ଷା ଅନୁରୋଧ ବିଚାର କରାଯାଇପାରେ। ସହାୟତା ଅନୁମୋଦନ ପୂର୍ବରୁ ପ୍ରତ୍ୟେକ ଅନୁରୋଧ ଯାଞ୍ଚ ହୁଏ।",
  },
] as const;

export default function OurPresence() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "Our Presence | Abhiara Foundation",
          "ଆମର କାର୍ଯ୍ୟ ଉପସ୍ଥିତି | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Abhiara Foundation is registered in Mumbai, organises ground work mainly in Odisha, and may consider checked education requests from different parts of India.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ମୁମ୍ବାଇରେ ପଞ୍ଜିକୃତ, ମୁଖ୍ୟତଃ ଓଡ଼ିଶାରେ କ୍ଷେତ୍ର କାମ କରେ ଏବଂ ଭାରତର ବିଭିନ୍ନ ସ୍ଥାନର ଯାଞ୍ଚ ହୋଇଥିବା ଶିକ୍ଷା ଅନୁରୋଧ ବିଚାର କରିପାରେ।"
        )}
        url="https://www.abhiarafoundation.org/our-presence"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pt-40">
          <div className="container max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F5A623]">
              {t("Where we work", "ଆମେ କେଉଁଠି କାମ କରୁ")}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-bold text-white md:text-6xl">
              {t("Our Presence", "ଆମର କାର୍ଯ୍ୟ ଉପସ୍ଥିତି")}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/75">
              {t(
                "Our presence is explained through three facts: where the Foundation is registered, where ground work is organised, and where education requests may be considered.",
                "ଆମର କାର୍ଯ୍ୟ ଉପସ୍ଥିତିକୁ ତିନୋଟି ତଥ୍ୟରେ ବୁଝାଯାଇଛି: ଫାଉଣ୍ଡେସନ କେଉଁଠି ପଞ୍ଜିକୃତ, କ୍ଷେତ୍ର କାମ କେଉଁଠି ହୁଏ ଏବଂ କେଉଁଠାରୁ ଶିକ୍ଷା ଅନୁରୋଧ ବିଚାର କରାଯାଇପାରେ।"
              )}
            </p>
          </div>
        </section>

        <section className="bg-[#FFFDF8] py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-5 lg:grid-cols-3">
              {PRESENCE_AREAS.map((area, index) => {
                const Icon = area.icon;
                return (
                  <AnimatedSection key={area.key} delay={index * 0.05}>
                    <article className="h-full border border-[#E8DCC6] bg-white p-7">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF1D3] text-[#8A5700]">
                        <Icon size={23} aria-hidden="true" />
                      </span>
                      <p className="mt-6 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A6100]">
                        {t(area.labelEn, area.labelOd)}
                      </p>
                      <h2 className="mt-2 font-serif text-2xl font-bold text-[#1A1A1A]">
                        {t(area.titleEn, area.titleOd)}
                      </h2>
                      <p className="mt-4 font-sans text-sm leading-7 text-[#555]">
                        {t(area.bodyEn, area.bodyOd)}
                      </p>
                    </article>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection className="mt-10 border-l-4 border-[#1A7F8E] bg-white p-7">
              <div className="flex gap-4">
                <ShieldCheck
                  className="mt-1 shrink-0 text-[#1A7F8E]"
                  size={24}
                />
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                    {t("Clear public meaning", "ସ୍ପଷ୍ଟ ସାର୍ବଜନୀନ ଅର୍ଥ")}
                  </h2>
                  <p className="mt-3 font-sans text-sm leading-7 text-[#555]">
                    {t(
                      "This page does not claim that Abhiara Foundation has an office or an active programme in every state. Support depends on the programme scope, verification, available funds and an approved budget.",
                      "ଏହି ପୃଷ୍ଠାରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନର ପ୍ରତ୍ୟେକ ରାଜ୍ୟରେ କାର୍ଯ୍ୟାଳୟ ବା ସକ୍ରିୟ କାର୍ଯ୍ୟକ୍ରମ ଅଛି ବୋଲି କୁହାଯାଉନାହିଁ। ସହାୟତା କାର୍ଯ୍ୟକ୍ରମର ସୀମା, ଯାଞ୍ଚ, ଉପଲବ୍ଧ ଅର୍ଥ ଓ ଅନୁମୋଦିତ ବଜେଟ ଉପରେ ନିର୍ଭର କରେ।"
                    )}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/shiksha-sathi"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#F5A623] px-6 py-3 font-sans text-sm font-bold text-[#1A1A1A]"
              >
                {t("Education work", "ଶିକ୍ଷା କାମ")}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                href="/impact-gallery"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#C9A96E] px-6 py-3 font-sans text-sm font-bold text-[#8A5700]"
              >
                {t(
                  "See public activity records",
                  "ସାର୍ବଜନୀନ କାର୍ଯ୍ୟ ରେକର୍ଡ ଦେଖନ୍ତୁ"
                )}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
