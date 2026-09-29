import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Award,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Mail,
  MapPinned,
  Scale,
  School,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ACTIVE_SUPPORT,
  CORE_STATEMENT,
  CORE_STATEMENT_OD,
  EDUCATION_REQUEST_EMAIL,
  EDUCATION_REQUEST_MAILTO,
  FLAGSHIP_DESCRIPTION,
  FLAGSHIP_DESCRIPTION_OD,
} from "@/data/focusContent";
import { trpc } from "@/lib/trpc";

const EDUCATION_SECTIONS = [
  {
    href: "/how-we-support-a-child",
    icon: ClipboardCheck,
    status: { en: "Current programme", od: "ବର୍ତ୍ତମାନର କାର୍ଯ୍ୟକ୍ରମ" },
    title: {
      en: "How We Support a Child",
      od: "ଆମେ ଶିଶୁଙ୍କୁ କିପରି ସହାୟତା କରୁ",
    },
    body: {
      en: "A simple explanation of checking education needs, deciding support and protecting child privacy.",
      od: "ଶିକ୍ଷା ଆବଶ୍ୟକତା ଯାଞ୍ଚ, ସହାୟତା ନିଷ୍ପତ୍ତି ଓ ଶିଶୁ ଗୋପନୀୟତା ସୁରକ୍ଷାର ସରଳ ବିବରଣୀ।",
    },
  },
  {
    href: "/rural-area-transformation",
    icon: MapPinned,
    status: {
      en: "Education led rural work",
      od: "ଶିକ୍ଷା ଭିତ୍ତିକ ଗ୍ରାମୀଣ କାମ",
    },
    title: { en: "Rural Area Transformation", od: "ଗ୍ରାମୀଣ ଅଞ୍ଚଳ ପରିବର୍ତ୍ତନ" },
    body: {
      en: "Village learning, education materials, student recognition and careful future plans.",
      od: "ଗ୍ରାମରେ ପଢ଼ା, ଶିକ୍ଷା ସାମଗ୍ରୀ, ଛାତ୍ର ସମ୍ମାନ ଓ ସତର୍କ ଭବିଷ୍ୟତ ଯୋଜନା।",
    },
  },
  {
    href: "/abhiara-pratibha-samman",
    icon: Award,
    status: { en: "Checked activity record", od: "ଯାଞ୍ଚ ହୋଇଥିବା କାମ" },
    title: { en: "Abhiara Pratibha Samman", od: "ଅଭିଆରା ପ୍ରତିଭା ସମ୍ମାନ" },
    body: {
      en: "Recognition for talented and hardworking students, with the 4 June 2026 programme record.",
      od: "ପ୍ରତିଭାଶାଳୀ ଓ ପରିଶ୍ରମୀ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ସମ୍ମାନ, ୪ ଜୁନ ୨୦୨୬ କାର୍ଯ୍ୟକ୍ରମ ରେକର୍ଡ ସହ।",
    },
  },
  {
    href: "/digital-learning-ai",
    icon: BrainCircuit,
    status: { en: "Future plan", od: "ଭବିଷ୍ୟତ ଯୋଜନା" },
    title: {
      en: "Digital Learning and AI Basics",
      od: "ଡିଜିଟାଲ ଶିକ୍ଷା ଓ AI ମୂଳ ଜ୍ଞାନ",
    },
    body: {
      en: "A future plan for safe computer use, useful digital skills and basic AI awareness.",
      od: "ସୁରକ୍ଷିତ କମ୍ପ୍ୟୁଟର ବ୍ୟବହାର, ଉପଯୋଗୀ ଡିଜିଟାଲ କୌଶଳ ଓ AI ମୂଳ ସଚେତନତା ପାଇଁ ଭବିଷ୍ୟତ ଯୋଜନା।",
    },
  },
  {
    href: "/rti-human-rights-awareness",
    icon: Scale,
    status: { en: "Past awareness work", od: "ପୂର୍ବ ସଚେତନତା କାମ" },
    title: {
      en: "RTI and Human Rights Awareness",
      od: "RTI ଓ ମାନବାଧିକାର ସଚେତନତା",
    },
    body: {
      en: "Public awareness classes and participation certificates from completed sessions.",
      od: "ସମାପ୍ତ ଅଧିବେଶନର ସାର୍ବଜନିକ ସଚେତନତା ଶ୍ରେଣୀ ଓ ଅଂଶଗ୍ରହଣ ପ୍ରମାଣପତ୍ର।",
    },
  },
] as const;

export default function Programs() {
  const { t } = useLanguage();
  const { data: publicMedia = [], isLoading } =
    trpc.cms.gallery.listPublished.useQuery(undefined, { retry: false });
  const educationPhotos = publicMedia
    .filter(
      (item: any) =>
        (!item.mediaType || item.mediaType === "photo") &&
        item.category === "education" &&
        !/Pratibha Samman/i.test(
          `${item.title || ""} ${item.description || ""}`
        )
    )
    .slice(0, 12);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const icons = [
    ClipboardCheck,
    GraduationCap,
    BookOpen,
    FileText,
    ShieldCheck,
    School,
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "Abhiara Shiksha Sathi | Education support",
          "ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ | ଶିକ୍ଷା ସହାୟତା"
        )}
        description={FLAGSHIP_DESCRIPTION}
        url="https://www.abhiarafoundation.org/shiksha-sathi"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pt-32 pb-20 text-white md:pt-40">
          <div className="container max-w-5xl">
            <AnimatedSection>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F5A623]">
                {t("Primary programme", "ପ୍ରମୁଖ କାର୍ଯ୍ୟକ୍ରମ")}
              </p>
              <h1 className="mt-5 max-w-4xl font-serif text-4xl font-bold text-white md:text-6xl">
                Abhiara Shiksha Sathi
              </h1>
              <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/80">
                {t(CORE_STATEMENT, CORE_STATEMENT_OD)}
              </p>
              <p className="mt-4 max-w-3xl font-sans text-sm leading-relaxed text-white/65">
                {t(FLAGSHIP_DESCRIPTION, FLAGSHIP_DESCRIPTION_OD)}
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="bg-[#FFFDF8] py-16 md:py-24">
          <div className="container">
            <AnimatedSection className="mx-auto mb-12 max-w-3xl text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                {t("Current activities", "ବର୍ତ୍ତମାନ କାମ")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
                {t("What the programme provides", "କାର୍ଯ୍ୟକ୍ରମ କଣ ଦେଉଛି")}
              </h2>
            </AnimatedSection>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {ACTIVE_SUPPORT.map((item, index) => {
                const Icon = icons[index];
                return (
                  <article
                    key={item.titleEn}
                    className="border border-[#E8DCC6] bg-white p-7"
                  >
                    <Icon size={24} className="text-[#B56A22]" />
                    <h3 className="mt-5 font-serif text-xl font-bold">
                      {t(item.titleEn, item.titleOd)}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-[#555]">
                      {t(item.bodyEn, item.bodyOd)}
                    </p>
                  </article>
                );
              })}
            </div>
            <p className="mx-auto mt-8 max-w-3xl border-l-4 border-[#F5A623] bg-white p-5 font-sans text-sm leading-7 text-[#555]">
              {t(
                "These are examples, not an automatic package. Support for each child is decided after review and may vary with the education need, available records, funds and programme capacity.",
                "ଏଗୁଡ଼ିକ ଉଦାହରଣ, ସ୍ୱୟଂଚାଳିତ ସହାୟତା ପ୍ୟାକେଜ ନୁହେଁ। ପ୍ରତ୍ୟେକ ଶିଶୁ ପାଇଁ ସହାୟତା ଯାଞ୍ଚ ପରେ ନିଷ୍ପତ୍ତି ହୁଏ ଏବଂ ଶିକ୍ଷା ଆବଶ୍ୟକତା, ଉପଲବ୍ଧ ରେକର୍ଡ, ଅର୍ଥ ଓ କାର୍ଯ୍ୟକ୍ରମ କ୍ଷମତା ଅନୁସାରେ ଭିନ୍ନ ହୋଇପାରେ।"
              )}
            </p>
          </div>
        </section>

        <section className="border-y border-[#E8DCC6] bg-white py-16 md:py-24">
          <div className="container">
            <AnimatedSection className="mx-auto mb-12 max-w-3xl text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                {t("Education sections", "ଶିକ୍ଷା ବିଭାଗ")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
                {t(
                  "Each education activity has its own place",
                  "ପ୍ରତ୍ୟେକ ଶିକ୍ଷା କାମର ନିଜସ୍ୱ ସ୍ଥାନ"
                )}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#555]">
                {t(
                  "Open one section at a time to see its purpose, status, records and photographs.",
                  "ଉଦ୍ଦେଶ୍ୟ, ସ୍ଥିତି, ରେକର୍ଡ ଓ ଫଟୋ ଦେଖିବା ପାଇଁ ଗୋଟିଏ ସମୟରେ ଗୋଟିଏ ବିଭାଗ ଖୋଲନ୍ତୁ।"
                )}
              </p>
            </AnimatedSection>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {EDUCATION_SECTIONS.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex h-full flex-col border border-[#E8DCC6] bg-[#FFFDF8] p-7 transition-colors hover:border-[#F5A623]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5A623]">
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-right font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-[#7A4B00]">
                        {t(item.status.en, item.status.od)}
                      </span>
                    </div>
                    <h3 className="mt-6 font-serif text-2xl font-bold">
                      {t(item.title.en, item.title.od)}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-[#555]">
                      {t(item.body.en, item.body.od)}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#8A5700]">
                      {t("Open section", "ବିଭାଗ ଖୋଲନ୍ତୁ")}
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container grid gap-10 lg:grid-cols-2">
            <AnimatedSection>
              <h2 className="font-serif text-3xl font-bold">
                {t("Who the programme is for", "ଏହି କାର୍ଯ୍ୟକ୍ରମ କାହା ପାଇଁ")}
              </h2>
              <p className="mt-5 font-sans text-base leading-relaxed text-[#555]">
                {t(
                  "The programme mainly helps orphaned children and children from underprivileged families whose schooling may be interrupted. An adult may email an education request from any Indian state. Every request is reviewed case by case. Support is approved only after verification and when funds, programme capacity and local follow-up make it possible.",
                  "ଯେଉଁ ଅନାଥ ଶିଶୁ ଓ ସୁବିଧାବଞ୍ଚିତ ପରିବାରର ଶିଶୁଙ୍କ ପଢ଼ା ବନ୍ଦ ହେବାର ଆଶଙ୍କା ଅଛି, ଏହି କାର୍ଯ୍ୟକ୍ରମ ମୁଖ୍ୟତଃ ସେମାନଙ୍କୁ ସହାୟତା କରେ। ଜଣେ ବୟସ୍କ ବ୍ୟକ୍ତି ଭାରତର ଯେକୌଣସି ରାଜ୍ୟରୁ ଇମେଲ ମାଧ୍ୟମରେ ଶିକ୍ଷା ଅନୁରୋଧ ପଠାଇପାରିବେ। ପ୍ରତ୍ୟେକ ଅନୁରୋଧ ଅଲଗା ଭାବେ ସମୀକ୍ଷା ହୁଏ। ଯାଞ୍ଚ ପରେ ଏବଂ ଅର୍ଥ, କାର୍ଯ୍ୟକ୍ରମ କ୍ଷମତା ଓ ସ୍ଥାନୀୟ ଅନୁସରଣ ସମ୍ଭବ ହେଲେ ମାତ୍ର ସହାୟତା ଅନୁମୋଦିତ ହୁଏ।"
                )}
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="border-l-4 border-[#F5A623] bg-[#FAF4E8] p-7">
                <h3 className="font-serif text-2xl font-bold">
                  {t("Privacy comes first", "ଗୋପନୀୟତା ପ୍ରଥମ")}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#555]">
                  {t(
                    "We do not publish a child’s full name, exact address, school details, bank details, sensitive family-loss details or photograph without guardian consent and safeguarding review.",
                    "ଅଭିଭାବକ ସମ୍ମତି ଓ ସୁରକ୍ଷା ସମୀକ୍ଷା ବିନା ଆମେ ଶିଶୁର ପୂର୍ଣ୍ଣ ନାମ, ଠିକଣା, ସ୍କୁଲ ବିବରଣୀ, ବ୍ୟାଙ୍କ ବିବରଣୀ, ସମ୍ବେଦନଶୀଳ ପରିବାରିକ ଘଟଣା ବା ଫଟୋ ପ୍ରକାଶ କରୁ ନାହୁଁ।"
                  )}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className="lg:col-span-2">
              <div className="grid gap-6 border border-[#E8DCC6] bg-[#FFFDF8] p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A6100]">
                    {t(
                      "Education requests across India",
                      "ସମଗ୍ର ଭାରତରୁ ଶିକ୍ଷା ଅନୁରୋଧ"
                    )}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-bold text-[#1A1A1A]">
                    {t(
                      "Send the first request by email",
                      "ପ୍ରଥମ ଅନୁରୋଧ ଇମେଲରେ ପଠାନ୍ତୁ"
                    )}
                  </h3>
                  <p className="mt-3 max-w-3xl font-sans text-sm leading-7 text-[#555]">
                    {t(
                      "The email opens with a simple checklist. Use the child’s initials only. Do not attach Aadhaar, bank details, certificates, exact address, photographs or sensitive family records in the first email. Sending an email does not guarantee support.",
                      "ଇମେଲଟି ଏକ ସରଳ ତାଲିକା ସହ ଖୋଲିବ। କେବଳ ଶିଶୁର ନାମର ପ୍ରଥମ ଅକ୍ଷର ଲେଖନ୍ତୁ। ପ୍ରଥମ ଇମେଲରେ ଆଧାର, ବ୍ୟାଙ୍କ ବିବରଣୀ, ସାର୍ଟିଫିକେଟ, ସଠିକ ଠିକଣା, ଫଟୋ ବା ସମ୍ବେଦନଶୀଳ ପରିବାରିକ ରେକର୍ଡ ଯୋଡ଼ନ୍ତୁ ନାହିଁ। ଇମେଲ ପଠାଇବା ସହାୟତାର ନିଶ୍ଚୟତା ନୁହେଁ।"
                    )}
                  </p>
                  <p className="mt-2 font-sans text-xs text-[#777]">
                    {EDUCATION_REQUEST_EMAIL}
                  </p>
                </div>
                <a
                  href={EDUCATION_REQUEST_MAILTO}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#F5A623] px-6 py-3 font-sans text-sm font-bold text-[#1A1A1A] transition-transform active:scale-[0.97]"
                >
                  <Mail size={17} aria-hidden="true" />
                  {t("Email education request", "ଶିକ୍ଷା ଅନୁରୋଧ ଇମେଲ କରନ୍ତୁ")}
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="border-y border-[#E8DCC6] bg-[#FFFDF8] py-16 md:py-24">
          <div className="container">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
              {t("Education gallery", "ଶିକ୍ଷା ଫଟୋ ଭଣ୍ଡାର")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
              {t(
                "Shiksha Sathi and learning activities",
                "ଶିକ୍ଷା ସାଥୀ ଓ ପଢ଼ା କାମ"
              )}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#555]">
              {t(
                "This gallery is only for education support and learning activities. Pratibha Samman has its own separate page and gallery.",
                "ଏହି ଫଟୋ ଭଣ୍ଡାର କେବଳ ଶିକ୍ଷା ସହାୟତା ଓ ପଢ଼ା କାମ ପାଇଁ। ପ୍ରତିଭା ସମ୍ମାନର ନିଜସ୍ୱ ଅଲଗା ପୃଷ୍ଠା ଓ ଫଟୋ ଭଣ୍ଡାର ଅଛି।"
              )}
            </p>
            {isLoading ? (
              <p className="mt-7 text-sm text-[#666]">
                {t("Loading photos...", "ଫଟୋ ଲୋଡ ହେଉଛି...")}
              </p>
            ) : educationPhotos.length ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {educationPhotos.map((photo: any) => (
                  <figure
                    key={photo.id}
                    className="overflow-hidden border border-[#E8DCC6] bg-white"
                  >
                    <div className="aspect-[4/3] bg-[#F5F0E8] p-2">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="p-5">
                      <p className="font-serif text-lg font-bold">
                        {photo.title}
                      </p>
                      {photo.description && (
                        <p className="mt-2 text-xs leading-6 text-[#666]">
                          {photo.description}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <p className="mt-7 flex items-center gap-2 border border-dashed border-[#D8C7A5] bg-white p-6 text-sm text-[#666]">
                <ImageIcon size={18} aria-hidden="true" />
                {t(
                  "No education photograph is available in this section yet.",
                  "ଏହି ବିଭାଗରେ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଶିକ୍ଷା ଫଟୋ ନାହିଁ।"
                )}
              </p>
            )}
          </div>
        </section>

        <section className="bg-[#F5A623] py-14">
          <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold">
                {t(
                  "Support verified education needs",
                  "ଯାଞ୍ଚ ହୋଇଥିବା ଶିକ୍ଷା ଆବଶ୍ୟକତାକୁ ସହାୟତା କରନ୍ତୁ"
                )}
              </h2>
              <p className="mt-2 font-sans text-sm text-[#5F3B00]">
                {t(
                  "Payments are recorded through official Foundation channels.",
                  "ପେମେଣ୍ଟ ଅଧିକୃତ ଫାଉଣ୍ଡେସନ ମାଧ୍ୟମରେ ରେକର୍ଡ ହୁଏ।"
                )}
              </p>
            </div>
            <Link
              href="/donate-for-education"
              className="inline-flex items-center gap-2 rounded bg-[#111111] px-7 py-3.5 font-sans text-sm font-bold text-white"
            >
              {t("Donate for education", "ଶିକ୍ଷା ପାଇଁ ଦାନ")}{" "}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
