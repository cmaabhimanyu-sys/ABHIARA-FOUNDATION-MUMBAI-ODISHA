import { useEffect, type ComponentType } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  HandHeart,
  Handshake,
  Heart,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

type LocalText = {
  en: string;
  od: string;
};

type MissionItem = {
  icon: ComponentType<{ size?: number; className?: string }>;
  number: string;
  title: LocalText;
  body: LocalText;
};

type ValueItem = {
  title: LocalText;
  body: LocalText;
  image: string;
  imageAlt: LocalText;
};

type PeopleGroup = {
  title: LocalText;
  label: LocalText;
  count: LocalText;
  body: LocalText;
  image: string;
  imageAlt: LocalText;
  href: string;
};

const MISSION_ITEMS: MissionItem[] = [
  {
    icon: BookOpen,
    number: "01",
    title: {
      en: "Help children continue learning",
      od: "ପିଲାମାନଙ୍କ ପଢ଼ା ଜାରି ରଖିବା",
    },
    body: {
      en: "Support verified students with tuition fees, school bags, books and learning materials according to need.",
      od: "ଯାଞ୍ଚ ହୋଇଥିବା ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ଆବଶ୍ୟକତା ଅନୁସାରେ ଟ୍ୟୁସନ ଫି, ସ୍କୁଲ ବ୍ୟାଗ, ବହି ଓ ପଢ଼ା ସାମଗ୍ରୀ ଦେବା।",
    },
  },
  {
    icon: HandHeart,
    number: "02",
    title: {
      en: "Stand beside families in difficult times",
      od: "କଷ୍ଟ ସମୟରେ ପରିବାର ପାଖରେ ରହିବା",
    },
    body: {
      en: "Provide verified support during medical emergencies, a death in the family, disasters and other urgent situations.",
      od: "ଚିକିତ୍ସା ଜରୁରୀ ସ୍ଥିତି, ପରିବାରରେ ମୃତ୍ୟୁ, ବିପର୍ଯ୍ୟୟ ଓ ଅନ୍ୟ ତୁରନ୍ତ ଆବଶ୍ୟକ ସମୟରେ ଯାଞ୍ଚ ହୋଇଥିବା ସହାୟତା ଦେବା।",
    },
  },
  {
    icon: Users,
    number: "03",
    title: { en: "Work with communities", od: "ସମୁଦାୟ ସହ ମିଶି କାମ କରିବା" },
    body: {
      en: "Listen to local people, understand the need and carry out practical activities with regular follow up.",
      od: "ସ୍ଥାନୀୟ ଲୋକଙ୍କ କଥା ଶୁଣିବା, ଆବଶ୍ୟକତା ବୁଝିବା ଓ ନିୟମିତ ଅନୁସରଣ ସହ ବ୍ୟବହାରିକ କାମ କରିବା।",
    },
  },
  {
    icon: ClipboardCheck,
    number: "04",
    title: {
      en: "Keep the work open and accountable",
      od: "କାମକୁ ସ୍ପଷ୍ଟ ଓ ଦାୟିତ୍ୱପୂର୍ଣ୍ଣ ରଖିବା",
    },
    body: {
      en: "Maintain activity records, protect personal information and share public impact updates with supporters and partners.",
      od: "କାର୍ଯ୍ୟକଳାପର ରେକର୍ଡ ରଖିବା, ବ୍ୟକ୍ତିଗତ ସୂଚନା ସୁରକ୍ଷିତ ରଖିବା ଓ ସହଯୋଗୀମାନଙ୍କ ସହ ସାର୍ବଜନୀନ ପ୍ରଭାବ ତଥ୍ୟ ଭାଗ କରିବା।",
    },
  },
];

const VALUES: ValueItem[] = [
  {
    title: { en: "Dignity", od: "ମର୍ଯ୍ୟାଦା" },
    body: {
      en: "Every person must be treated with respect. Help should never take away someone’s privacy or self respect.",
      od: "ପ୍ରତ୍ୟେକ ଲୋକଙ୍କୁ ସମ୍ମାନ ଦେବା ଦରକାର। ସହାୟତା କେବେ ମଧ୍ୟ କାହାର ବ୍ୟକ୍ତିଗତ ଗୋପନୀୟତା କିମ୍ବା ଆତ୍ମସମ୍ମାନ କମାଇବା ଉଚିତ ନୁହେଁ।",
    },
    image: "/images/elderly-care-visit-3.jpeg",
    imageAlt: {
      en: "Abhiara team spending time with elders",
      od: "ବୟସ୍କମାନଙ୍କ ସହ ସମୟ ବିତାଉଥିବା ଅଭିଆରା ଦଳ",
    },
  },
  {
    title: { en: "Care", od: "ଯତ୍ନ" },
    body: {
      en: "We listen before we act and give support according to the real need of the child, family or community.",
      od: "କାମ କରିବା ପୂର୍ବରୁ ଆମେ କଥା ଶୁଣୁ ଏବଂ ପିଲା, ପରିବାର କିମ୍ବା ସମୁଦାୟର ପ୍ରକୃତ ଆବଶ୍ୟକତା ଅନୁସାରେ ସହାୟତା କରୁ।",
    },
    image: "/images/shiksha-sathi-children-siblings.jpeg",
    imageAlt: {
      en: "Children supported through Shiksha Sathi",
      od: "ଶିକ୍ଷା ସାଥୀ ମାଧ୍ୟମରେ ସହାୟତା ପାଉଥିବା ପିଲାମାନେ",
    },
  },
  {
    title: { en: "Accountability", od: "ଜବାବଦେହୀତା" },
    body: {
      en: "We keep records, review the work and explain how support is used. Public claims must be backed by verified field information.",
      od: "ଆମେ ରେକର୍ଡ ରଖୁ, କାମର ସମୀକ୍ଷା କରୁ ଓ ସହାୟତା କିପରି ବ୍ୟବହାର ହେଲା ସେଥିରେ ସ୍ପଷ୍ଟତା ରଖୁ। ସାର୍ବଜନୀନ ତଥ୍ୟ କ୍ଷେତ୍ର ରେକର୍ଡ ଦ୍ୱାରା ଯାଞ୍ଚ ହେବା ଦରକାର।",
    },
    image: "/images/disaster-relief-team-village.jpeg",
    imageAlt: {
      en: "Abhiara team with community members during a relief visit",
      od: "ସହାୟତା ପରିଦର୍ଶନ ସମୟରେ ସମୁଦାୟ ସଦସ୍ୟଙ୍କ ସହ ଅଭିଆରା ଦଳ",
    },
  },
  {
    title: { en: "Participation", od: "ସହଭାଗିତା" },
    body: {
      en: "Students, families, teachers and community members should have a voice in the work that concerns them.",
      od: "ଛାତ୍ରଛାତ୍ରୀ, ପରିବାର, ଶିକ୍ଷକ ଓ ସମୁଦାୟ ସଦସ୍ୟଙ୍କ ସହ ସମ୍ପର୍କିତ କାମରେ ସେମାନଙ୍କ ମତ ରହିବା ଦରକାର।",
    },
    image: "/images/pratibha-samman-group.jpeg",
    imageAlt: {
      en: "Students, teachers and community members at Pratibha Samman",
      od: "ପ୍ରତିଭା ସମ୍ମାନରେ ଛାତ୍ରଛାତ୍ରୀ, ଶିକ୍ଷକ ଓ ସମୁଦାୟ ସଦସ୍ୟ",
    },
  },
  {
    title: { en: "Working Together", od: "ମିଶି କାମ କରିବା" },
    body: {
      en: "Lasting work needs volunteers, community members, donors and responsible partners to stand together.",
      od: "ଦୀର୍ଘସ୍ଥାୟୀ କାମ ପାଇଁ ସ୍ୱେଚ୍ଛାସେବୀ, ସମୁଦାୟ ସଦସ୍ୟ, ଦାତା ଓ ଦାୟିତ୍ୱପୂର୍ଣ୍ଣ ସହଯୋଗୀମାନେ ମିଶି ରହିବା ଦରକାର।",
    },
    image: "/images/water-camp-serving.jpeg",
    imageAlt: {
      en: "Volunteers serving water at a community camp",
      od: "ସମୁଦାୟ ଶିବିରରେ ପାଣି ବଣ୍ଟନ କରୁଥିବା ସ୍ୱେଚ୍ଛାସେବୀ",
    },
  },
];

const PEOPLE_GROUPS: PeopleGroup[] = [
  {
    title: {
      en: "People of Abhiara Foundation",
      od: "ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଲୋକମାନେ",
    },
    label: { en: "Five public sections", od: "ପାଞ୍ଚଟି ସାର୍ବଜନୀନ ବିଭାଗ" },
    count: { en: "Public profiles", od: "ସାର୍ବଜନୀନ ପ୍ରୋଫାଇଲ" },
    body: {
      en: "Meet the directors, independent statutory auditor, advisors, Odisha Division leaders and Core Members associated with the Foundation.",
      od: "ଫାଉଣ୍ଡେସନ ସହ ଜଡ଼ିତ ନିର୍ଦ୍ଦେଶକ, ସ୍ୱାଧୀନ ବୈଧାନିକ ଲେଖାପରୀକ୍ଷକ, ପରାମର୍ଶଦାତା, ଓଡ଼ିଶା ବିଭାଗର ନେତୃତ୍ୱ ଓ ମୁଖ୍ୟ ସଦସ୍ୟମାନଙ୍କୁ ଜାଣନ୍ତୁ।",
    },
    image: "/images/team-bhubaneswar.jpeg",
    imageAlt: {
      en: "Abhiara Foundation team during field work",
      od: "କ୍ଷେତ୍ର କାମ ସମୟରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଦଳ",
    },
    href: "/board-and-transparency#people",
  },
];

export default function Vision() {
  const { t } = useLanguage();
  const { data: leadershipMembers = [] } =
    trpc.cms.leadership.listPublished.useQuery(undefined, { retry: false });
  const publishedPeopleCount = leadershipMembers.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "Vision, Mission and People, Abhiara Foundation",
          "ଦୃଷ୍ଟି, ଲକ୍ଷ୍ୟ ଓ ଲୋକମାନେ, ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Read Abhiara Foundation's vision, mission, values and public people structure.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଦୃଷ୍ଟି, ଲକ୍ଷ୍ୟ, ମୂଲ୍ୟବୋଧ ଓ ସାର୍ବଜନୀନ ଦଳ ଗଠନ ବିଷୟରେ ପଢ଼ନ୍ତୁ।"
        )}
        image="/images/pratibha-samman-group.jpeg"
        url="https://www.abhiarafoundation.org/vision"
      />
      <Navbar />

      <main id="main-content">
        <section className="relative overflow-hidden bg-[#F8F6EF] pt-20 pb-20 md:pt-28 md:pb-28">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute -top-28 -right-16 h-80 w-80 rounded-full bg-[#C9A84C]/12 blur-3xl" />
            <div className="absolute -bottom-36 -left-24 h-96 w-96 rounded-full bg-[#1A7F8E]/10 blur-3xl" />
          </div>

          <div className="container relative grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#1A7F8E] mb-5">
                {t(
                  "Vision, mission, values and people",
                  "ଦୃଷ୍ଟି, ଲକ୍ଷ୍ୟ, ମୂଲ୍ୟବୋଧ ଓ ଲୋକମାନେ"
                )}
              </p>
              <h1
                className="font-serif font-bold text-[#191919] leading-[1.05] mb-6"
                style={{ fontSize: "clamp(42px, 6vw, 76px)" }}
              >
                {t("What guides", "ଆମ କାମକୁ")}
                <br />
                <span className="text-[#C9A84C]">
                  {t("our work", "କଣ ଦିଗ ଦେଉଛି")}
                </span>
              </h1>
              <p className="font-sans text-[17px] text-[#555] max-w-xl leading-8 mb-8">
                {t(
                  "The vision sets the Foundation's long term direction. The mission defines its current work. The values guide conduct, decisions and accountability.",
                  "ଦୃଷ୍ଟି ଫାଉଣ୍ଡେସନର ଦୀର୍ଘମିଆଦୀ ଦିଗ ନିର୍ଦ୍ଧାରଣ କରେ। ଲକ୍ଷ୍ୟ ବର୍ତ୍ତମାନର କାମକୁ ସ୍ପଷ୍ଟ କରେ। ମୂଲ୍ୟବୋଧ ଆଚରଣ, ନିଷ୍ପତ୍ତି ଓ ଉତ୍ତରଦାୟିତ୍ୱକୁ ଦିଗ ଦେଉଛି।"
                )}
              </p>
              <nav
                className="flex flex-wrap gap-3"
                aria-label={t("Page sections", "ପୃଷ୍ଠା ବିଭାଗ")}
              >
                {[
                  { href: "#vision", en: "Vision", od: "ଦୃଷ୍ଟି" },
                  { href: "#mission", en: "Mission", od: "ଲକ୍ଷ୍ୟ" },
                  { href: "#values", en: "Values", od: "ମୂଲ୍ୟବୋଧ" },
                  { href: "#people", en: "Our People", od: "ଆମ ଲୋକମାନେ" },
                ].map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2.5 bg-white border border-[#DED5C2] text-[#333] font-sans text-[13px] font-semibold hover:border-[#C9A84C] hover:text-[#8B6914] transition-colors active:scale-[0.97]"
                  >
                    {t(item.en, item.od)}
                  </a>
                ))}
              </nav>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <figure className="bg-white border border-[#E8E1D1] p-3 shadow-[0_24px_60px_rgba(26,32,28,0.12)]">
                <img
                  src="/images/pratibha-samman-group.jpeg"
                  alt={t(
                    "Students, teachers and Abhiara Foundation team at Pratibha Samman 2026",
                    "ପ୍ରତିଭା ସମ୍ମାନ ୨୦୨୬ରେ ଛାତ୍ରଛାତ୍ରୀ, ଶିକ୍ଷକ ଓ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଦଳ"
                  )}
                  className="w-full h-[320px] md:h-[390px] object-contain bg-[#F6F2E8]"
                  loading="eager"
                />
                <figcaption className="font-sans text-[12px] text-[#777] px-3 pt-3 pb-1">
                  {t(
                    "Students, teachers and community members at Pratibha Samman 2026",
                    "ପ୍ରତିଭା ସମ୍ମାନ ୨୦୨୬ରେ ଛାତ୍ରଛାତ୍ରୀ, ଶିକ୍ଷକ ଓ ସମୁଦାୟ ସଦସ୍ୟ"
                  )}
                </figcaption>
              </figure>
            </AnimatedSection>
          </div>
        </section>

        <section id="vision" className="scroll-mt-24 py-20 md:py-28 bg-white">
          <div className="container">
            <AnimatedSection className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14 items-start">
                <div>
                  <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#1A7F8E] mb-4">
                    {t("Our Vision", "ଆମ ଦୃଷ୍ଟି")}
                  </p>
                  <div className="h-px w-20 bg-[#C9A84C]" />
                </div>
                <blockquote className="border-l-4 border-[#C9A84C] pl-7 md:pl-10">
                  <p className="font-serif text-3xl md:text-5xl text-[#191919] leading-tight">
                    {t(
                      "A society where every person, especially children and families facing hardship, can live with dignity, continue learning and find timely support when it matters most.",
                      "ଏମିତି ଏକ ସମାଜ, ଯେଉଁଠାରେ ପ୍ରତ୍ୟେକ ଲୋକ, ବିଶେଷ କରି କଷ୍ଟରେ ଥିବା ପିଲା ଓ ପରିବାର, ସମ୍ମାନ ସହ ବଞ୍ଚିପାରିବେ, ପଢ଼ା ଜାରି ରଖିପାରିବେ ଓ ଆବଶ୍ୟକ ସମୟରେ ସହାୟତା ପାଇପାରିବେ।"
                    )}
                  </p>
                </blockquote>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section
          id="mission"
          className="scroll-mt-24 py-20 md:py-28 bg-[#F8F6EF]"
        >
          <div className="container">
            <AnimatedSection className="text-center mb-12 md:mb-16">
              <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B6914] mb-4">
                {t("Our Mission", "ଆମ ଲକ୍ଷ୍ୟ")}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#191919] mb-5">
                {t("Simple work that matters", "ସରଳ କିନ୍ତୁ ଜରୁରୀ କାମ")}
              </h2>
              <p className="font-sans text-[16px] text-[#555] max-w-2xl mx-auto leading-7">
                {t(
                  "We focus on practical support that can be verified, followed up and explained clearly.",
                  "ଆମେ ଏମିତି ବ୍ୟବହାରିକ ସହାୟତାରେ ଧ୍ୟାନ ଦେଉ ଯାହାକୁ ଯାଞ୍ଚ, ଅନୁସରଣ ଓ ସ୍ପଷ୍ଟ ଭାବେ ବୁଝାଇ ହେବ।"
                )}
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {MISSION_ITEMS.map((item, index) => (
                <AnimatedSection key={item.number} delay={index * 0.06}>
                  <article className="h-full bg-white border border-[#E8E1D1] p-7 md:p-8 shadow-[0_10px_35px_rgba(26,32,28,0.05)]">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-[#1A7F8E]/10 text-[#1A7F8E] flex items-center justify-center">
                        <item.icon size={23} />
                      </div>
                      <span className="font-serif text-3xl text-[#C9A84C]/65">
                        {item.number}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#191919] mb-3">
                      {t(item.title.en, item.title.od)}
                    </h3>
                    <p className="font-sans text-[15px] text-[#555] leading-7">
                      {t(item.body.en, item.body.od)}
                    </p>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section id="values" className="scroll-mt-24 py-20 md:py-28 bg-white">
          <div className="container">
            <AnimatedSection className="max-w-3xl mb-12 md:mb-16">
              <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#1A7F8E] mb-4">
                {t("Our Values", "ଆମ ମୂଲ୍ୟବୋଧ")}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#191919] mb-5">
                {t("How we work with people", "ଆମେ ଲୋକଙ୍କ ସହ କିପରି କାମ କରୁ")}
              </h2>
              <p className="font-sans text-[16px] text-[#555] leading-7">
                {t(
                  "These values guide decisions in the field, use of funds, public communication and partnerships.",
                  "ଏହି ମୂଲ୍ୟବୋଧ କ୍ଷେତ୍ର କାମ, ଅର୍ଥ ବ୍ୟବହାର, ସାର୍ବଜନୀନ ସୂଚନା ଓ ସହଭାଗିତାରେ ଆମ ନିଷ୍ପତ୍ତିକୁ ଦିଗ ଦେଉଛି।"
                )}
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {VALUES.map((value, index) => (
                <AnimatedSection
                  key={value.title.en}
                  delay={(index % 3) * 0.06}
                  className={
                    index < 3
                      ? "lg:col-span-2"
                      : index === 3
                        ? "lg:col-start-2 lg:col-span-2"
                        : "lg:col-span-2"
                  }
                >
                  <article className="h-full bg-[#F8F6EF] border border-[#E8E1D1] overflow-hidden">
                    <div className="h-52 bg-white border-b border-[#E8E1D1] flex items-center justify-center">
                      <img
                        src={value.image}
                        alt={t(value.imageAlt.en, value.imageAlt.od)}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-bold text-[#191919] mb-3">
                        {t(value.title.en, value.title.od)}
                      </h3>
                      <p className="font-sans text-[14px] text-[#555] leading-6">
                        {t(value.body.en, value.body.od)}
                      </p>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section
          id="people"
          className="scroll-mt-24 py-20 md:py-28 bg-[#F8F6EF]"
        >
          <div className="container">
            <AnimatedSection className="text-center mb-12 md:mb-16">
              <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B6914] mb-4">
                {t("Our People", "ଆମ ଲୋକମାନେ")}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#191919] mb-5">
                {t("People behind the work", "କାମ ପଛରେ ଥିବା ଲୋକମାନେ")}
              </h2>
              <p className="font-sans text-[16px] text-[#555] max-w-2xl mx-auto leading-7">
                {t(
                  "Everyone associated with Abhiara Foundation appears together in one public sequence with their current role.",
                  "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସହ ଜଡିତ ସମସ୍ତ ବ୍ୟକ୍ତିଙ୍କୁ ସେମାନଙ୍କ ବର୍ତ୍ତମାନ ଭୂମିକା ସହ ଗୋଟିଏ ସାର୍ବଜନୀନ କ୍ରମରେ ଦର୍ଶାଯାଇଛି।"
                )}
              </p>
            </AnimatedSection>

            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6">
              {PEOPLE_GROUPS.map((group, index) => (
                <AnimatedSection key={group.title.en} delay={index * 0.08}>
                  <article className="h-full bg-white border border-[#E8E1D1] overflow-hidden shadow-[0_12px_38px_rgba(26,32,28,0.06)] flex flex-col">
                    <div className="h-64 bg-[#F6F2E8] flex items-center justify-center border-b border-[#E8E1D1]">
                      <img
                        src={group.image}
                        alt={t(group.imageAlt.en, group.imageAlt.od)}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-7 flex flex-col flex-1">
                      <p className="font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-[#1A7F8E] mb-3">
                        {t(group.label.en, group.label.od)}
                      </p>
                      <h3 className="font-serif text-2xl font-bold text-[#191919] mb-2">
                        {t(group.title.en, group.title.od)}
                      </h3>
                      <p className="font-sans text-[13px] font-semibold text-[#8B6914] mb-4">
                        {publishedPeopleCount > 0
                          ? t(
                              `${publishedPeopleCount} public profiles`,
                              `${publishedPeopleCount} ଜଣଙ୍କ ସାର୍ବଜନୀନ ପ୍ରୋଫାଇଲ`
                            )
                          : t(group.count.en, group.count.od)}
                      </p>
                      <p className="font-sans text-[14px] text-[#555] leading-6 mb-6 flex-1">
                        {t(group.body.en, group.body.od)}
                      </p>
                      <Link
                        href={group.href}
                        className="inline-flex items-center gap-2 font-sans text-[13px] font-bold text-[#1A7F8E] hover:text-[#11636F] transition-colors active:scale-[0.97]"
                      >
                        {t("See all profiles", "ସମସ୍ତ ପ୍ରୋଫାଇଲ ଦେଖନ୍ତୁ")}{" "}
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-[#1A7F8E]">
          <div className="container max-w-3xl text-center">
            <AnimatedSection>
              <Heart size={34} className="text-[#F6D77A] mx-auto mb-5" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                {t(
                  "Stand with work you can see",
                  "ଦେଖିପାରୁଥିବା କାମ ସହ ଠିଆ ହୁଅନ୍ତୁ"
                )}
              </h2>
              <p className="font-sans text-[16px] text-white/85 leading-7 mb-8">
                {t(
                  "Read our public activity records, ask questions and choose how you would like to support the work.",
                  "ଆମ ସାର୍ବଜନୀନ କାର୍ଯ୍ୟ ରେକର୍ଡ ପଢ଼ନ୍ତୁ, ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ ଓ କାମକୁ କିପରି ସହଯୋଗ କରିବେ ତାହା ଚୟନ କରନ୍ତୁ।"
                )}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/impact"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-[#C9A84C] text-[#191919] font-sans text-[13px] font-bold hover:bg-[#D7B95F] transition-colors active:scale-[0.97]"
                >
                  {t("See Monthly Impact", "ମାସିକ ପ୍ରଭାବ ଦେଖନ୍ତୁ")}{" "}
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/volunteer"
                  className="inline-flex items-center gap-2 px-7 py-3 border border-white/45 text-white font-sans text-[13px] font-bold hover:bg-white/10 transition-colors active:scale-[0.97]"
                >
                  <Handshake size={16} />{" "}
                  {t("Volunteer with Abhiara", "ଅଭିଆରା ସହ ସ୍ୱେଚ୍ଛାସେବା କରନ୍ତୁ")}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
