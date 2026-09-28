import { useEffect, type ComponentType } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CloudRain,
  FileCheck2,
  HeartPulse,
  Image as ImageIcon,
  PawPrint,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

export type SupportAreaKey = "disaster" | "medical" | "animal";

type BilingualText = { en: string; od: string };

type SupportAreaConfig = {
  galleryCategory: "disaster" | "medical" | "animals";
  path: string;
  donationCause: "disaster_relief" | "medical_emergency" | "animal_welfare";
  icon: ComponentType<{ size?: number; className?: string }>;
  eyebrow: BilingualText;
  title: BilingualText;
  introduction: BilingualText;
  examples: BilingualText[];
  privacy: BilingualText;
  urgentNote: BilingualText;
  empty: BilingualText;
};

export const SUPPORT_AREA_CONFIGS: Record<SupportAreaKey, SupportAreaConfig> = {
  disaster: {
    galleryCategory: "disaster",
    path: "/disaster-relief",
    donationCause: "disaster_relief",
    icon: CloudRain,
    eyebrow: {
      en: "Limited verified support",
      od: "ସୀମିତ ଯାଞ୍ଚ ହୋଇଥିବା ସହାୟତା",
    },
    title: { en: "Disaster Relief", od: "ବିପର୍ଯ୍ୟୟ ସହାୟତା" },
    introduction: {
      en: "Abhiara Foundation may provide limited immediate help after floods, cyclones, fires or another local disaster. Each request is checked on the ground and depends on available funds and an approved budget.",
      od: "ବନ୍ୟା, ବାତ୍ୟା, ଅଗ୍ନିକାଣ୍ଡ ବା ଅନ୍ୟ ସ୍ଥାନୀୟ ବିପର୍ଯ୍ୟୟ ପରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସୀମିତ ତତ୍କାଳ ସହାୟତା ଦେଇପାରେ। ପ୍ରତ୍ୟେକ ଅନୁରୋଧ କ୍ଷେତ୍ରରେ ଯାଞ୍ଚ କରାଯାଏ ଏବଂ ସହାୟତା ଉପଲବ୍ଧ ଅର୍ଥ ଓ ଅନୁମୋଦିତ ବଜେଟ ଉପରେ ନିର୍ଭର କରେ।",
    },
    examples: [
      {
        en: "Food, drinking water and basic household supplies",
        od: "ଖାଦ୍ୟ, ପାନୀୟ ଜଳ ଓ ମୌଳିକ ଘରୋଇ ସାମଗ୍ରୀ",
      },
      {
        en: "Clothing or other immediate essentials",
        od: "ପୋଷାକ ବା ଅନ୍ୟ ତତ୍କାଳ ଆବଶ୍ୟକ ସାମଗ୍ରୀ",
      },
      {
        en: "Local coordination after the need is checked",
        od: "ଆବଶ୍ୟକତା ଯାଞ୍ଚ ପରେ ସ୍ଥାନୀୟ ସମନ୍ୱୟ",
      },
    ],
    privacy: {
      en: "Names, home addresses, identity papers and private family details are not published. Photos appear only after permission and privacy review.",
      od: "ନାମ, ଘର ଠିକଣା, ପରିଚୟ ପତ୍ର ଓ ପରିବାରର ବ୍ୟକ୍ତିଗତ ବିବରଣୀ ପ୍ରକାଶ ହୁଏ ନାହିଁ। ଅନୁମତି ଓ ଗୋପନୀୟତା ଯାଞ୍ଚ ପରେ ମାତ୍ର ଫଟୋ ଦେଖାଯାଏ।",
    },
    urgentNote: {
      en: "Abhiara Foundation is not an emergency response service. Please contact the local authorities first when there is immediate danger.",
      od: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଜରୁରୀ ପ୍ରତିକ୍ରିୟା ସେବା ନୁହେଁ। ତତ୍କାଳ ବିପଦ ଥିଲେ ପ୍ରଥମେ ସ୍ଥାନୀୟ ପ୍ରଶାସନ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
    },
    empty: {
      en: "No disaster relief photo is available in this section yet.",
      od: "ଏହି ବିଭାଗରେ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ବିପର୍ଯ୍ୟୟ ସହାୟତା ଫଟୋ ନାହିଁ।",
    },
  },
  medical: {
    galleryCategory: "medical",
    path: "/medical-emergency-support",
    donationCause: "medical_emergency",
    icon: HeartPulse,
    eyebrow: {
      en: "Limited verified support",
      od: "ସୀମିତ ଯାଞ୍ଚ ହୋଇଥିବା ସହାୟତା",
    },
    title: { en: "Medical Emergency Help", od: "ଚିକିତ୍ସା ଜରୁରୀ ସହାୟତା" },
    introduction: {
      en: "A family in need may request limited help or referral support for a verified urgent medical need. Cancer and kidney treatment are examples, not the only cases considered. Help cannot be guaranteed and depends on verification, available funds and an approved budget.",
      od: "ଆବଶ୍ୟକତାରେ ଥିବା ପରିବାର ଯାଞ୍ଚ ହୋଇଥିବା ଜରୁରୀ ଚିକିତ୍ସା ପାଇଁ ସୀମିତ ସହାୟତା ବା ରେଫରାଲ ସହଯୋଗ ଅନୁରୋଧ କରିପାରନ୍ତି। କ୍ୟାନ୍ସର ଓ କିଡନି ଚିକିତ୍ସା କେବଳ ଉଦାହରଣ, ଏଗୁଡ଼ିକ ମାତ୍ର ବିଚାର ହୁଏ ନାହିଁ। ସହାୟତାର ନିଶ୍ଚିତତା ନାହିଁ ଏବଂ ଏହା ଯାଞ୍ଚ, ଉପଲବ୍ଧ ଅର୍ଥ ଓ ଅନୁମୋଦିତ ବଜେଟ ଉପରେ ନିର୍ଭର କରେ।",
    },
    examples: [
      {
        en: "A verified hospital estimate or treatment need",
        od: "ଯାଞ୍ଚ ହୋଇଥିବା ହସ୍ପିଟାଲ ଆନୁମାନିକ ଖର୍ଚ୍ଚ ବା ଚିକିତ୍ସା ଆବଶ୍ୟକତା",
      },
      {
        en: "Any urgent treatment request is reviewed case by case. Cancer and kidney treatment are examples.",
        od: "ପ୍ରତ୍ୟେକ ଜରୁରୀ ଚିକିତ୍ସା ଅନୁରୋଧ ମାମଲା ଭିତ୍ତିକ ଯାଞ୍ଚ ହୁଏ। କ୍ୟାନ୍ସର ଓ କିଡନି ଚିକିତ୍ସା କେବଳ ଉଦାହରଣ।",
      },
      {
        en: "Referral or coordination help when suitable",
        od: "ଉପଯୁକ୍ତ ହେଲେ ରେଫରାଲ ବା ସମନ୍ୱୟ ସହଯୋଗ",
      },
    ],
    privacy: {
      en: "Medical papers, diagnoses, patient names, phone numbers and family details are kept private. Public photos require clear written permission.",
      od: "ଚିକିତ୍ସା କାଗଜପତ୍ର, ରୋଗ ବିବରଣୀ, ରୋଗୀଙ୍କ ନାମ, ଫୋନ ନମ୍ବର ଓ ପରିବାର ବିବରଣୀ ଗୋପନୀୟ ରହେ। ସାର୍ବଜନିକ ଫଟୋ ପାଇଁ ସ୍ପଷ୍ଟ ଲିଖିତ ଅନୁମତି ଆବଶ୍ୟକ।",
    },
    urgentNote: {
      en: "Abhiara Foundation is not a hospital or ambulance service. For immediate medical danger, contact a hospital or local emergency service first.",
      od: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ହସ୍ପିଟାଲ ବା ଆମ୍ବୁଲାନ୍ସ ସେବା ନୁହେଁ। ତତ୍କାଳ ଚିକିତ୍ସା ବିପଦ ଥିଲେ ପ୍ରଥମେ ହସ୍ପିଟାଲ ବା ସ୍ଥାନୀୟ ଜରୁରୀ ସେବା ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
    },
    empty: {
      en: "No medical support photo is available in this section yet.",
      od: "ଏହି ବିଭାଗରେ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଚିକିତ୍ସା ସହାୟତା ଫଟୋ ନାହିଁ।",
    },
  },
  animal: {
    galleryCategory: "animals",
    path: "/animal-welfare-support",
    donationCause: "animal_welfare",
    icon: PawPrint,
    eyebrow: { en: "Limited compassion support", od: "ସୀମିତ ଦୟା ସହାୟତା" },
    title: { en: "Animal Welfare Support", od: "ପଶୁ କଲ୍ୟାଣ ସହାୟତା" },
    introduction: {
      en: "Within a small approved budget, Abhiara Foundation may consider urgent animal feeding, treatment help or coordination with local rescuers. This work remains secondary to children's education.",
      od: "ଏକ ଛୋଟ ଅନୁମୋଦିତ ବଜେଟ ମଧ୍ୟରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଜରୁରୀ ପଶୁ ଖାଦ୍ୟ, ଚିକିତ୍ସା ସହାୟତା ବା ସ୍ଥାନୀୟ ଉଦ୍ଧାରକାରୀଙ୍କ ସହ ସମନ୍ୱୟ ବିଚାର କରିପାରେ। ଏହି କାମ ଶିଶୁ ଶିକ୍ଷା ପରେ ଦ୍ୱିତୀୟ ସ୍ଥାନରେ ରହେ।",
    },
    examples: [
      {
        en: "Emergency feeding in a verified local need",
        od: "ଯାଞ୍ଚ ହୋଇଥିବା ସ୍ଥାନୀୟ ଆବଶ୍ୟକତାରେ ଜରୁରୀ ଖାଦ୍ୟ",
      },
      {
        en: "Limited treatment help when funds allow",
        od: "ଅର୍ଥ ଉପଲବ୍ଧ ଥିଲେ ସୀମିତ ଚିକିତ୍ସା ସହାୟତା",
      },
      {
        en: "Coordination with a local rescuer or veterinary service",
        od: "ସ୍ଥାନୀୟ ଉଦ୍ଧାରକାରୀ ବା ପଶୁ ଚିକିତ୍ସା ସେବା ସହ ସମନ୍ୱୟ",
      },
    ],
    privacy: {
      en: "We do not show a person's phone number, home address or private messages while reporting an animal case.",
      od: "ପଶୁ ସହାୟତା ମାମଲା ଦେଖାଇବାବେଳେ କାହାର ଫୋନ ନମ୍ବର, ଘର ଠିକଣା ବା ବ୍ୟକ୍ତିଗତ ସନ୍ଦେଶ ଦେଖାଯାଏ ନାହିଁ।",
    },
    urgentNote: {
      en: "Abhiara Foundation does not run an animal ambulance or rescue centre. Please contact a local veterinary or rescue service first when an animal is in immediate danger.",
      od: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ପଶୁ ଆମ୍ବୁଲାନ୍ସ ବା ଉଦ୍ଧାର କେନ୍ଦ୍ର ଚଳାଏ ନାହିଁ। ପଶୁ ତତ୍କାଳ ବିପଦରେ ଥିଲେ ପ୍ରଥମେ ସ୍ଥାନୀୟ ପଶୁ ଚିକିତ୍ସା ବା ଉଦ୍ଧାର ସେବା ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
    },
    empty: {
      en: "No animal welfare photo is available in this section yet.",
      od: "ଏହି ବିଭାଗରେ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ପଶୁ କଲ୍ୟାଣ ଫଟୋ ନାହିଁ।",
    },
  },
};

export default function SupportAreaPage({ area }: { area: SupportAreaKey }) {
  const { t } = useLanguage();
  const config = SUPPORT_AREA_CONFIGS[area];
  const Icon = config.icon;
  const { data: publishedMedia = [], isLoading } =
    trpc.cms.gallery.listPublished.useQuery(undefined, { retry: false });
  const images = publishedMedia.filter(
    (item: any) =>
      (!item.mediaType || item.mediaType === "photo") &&
      item.category === config.galleryCategory
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <SEO
        title={`${t(config.title.en, config.title.od)} | Abhiara Foundation`}
        description={t(config.introduction.en, config.introduction.od)}
        url={`https://www.abhiarafoundation.org${config.path}`}
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#FAF4E8] pb-20 pt-32 md:pt-40">
          <div className="container max-w-5xl">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5A623]">
              <Icon size={26} aria-hidden="true" />
            </span>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
              {t(config.eyebrow.en, config.eyebrow.od)}
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold md:text-6xl">
              {t(config.title.en, config.title.od)}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-[#555]">
              {t(config.introduction.en, config.introduction.od)}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                  {t("What may be considered", "କଣ ବିଚାର କରାଯାଇପାରେ")}
                </p>
                <div className="mt-5 grid gap-4">
                  {config.examples.map((item, index) => (
                    <article
                      key={item.en}
                      className="flex gap-4 border border-[#E8DCC6] bg-[#FFFDF8] p-5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5A623] font-sans text-sm font-bold">
                        {index + 1}
                      </span>
                      <p className="pt-1 text-sm leading-7 text-[#444]">
                        {t(item.en, item.od)}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="space-y-4">
                <div className="border-l-4 border-[#F5A623] bg-[#111111] p-6 text-white">
                  <ShieldCheck className="text-[#F5A623]" aria-hidden="true" />
                  <h2 className="mt-4 font-serif text-2xl font-bold text-white">
                    {t("Privacy comes first", "ଗୋପନୀୟତା ପ୍ରଥମ")}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/75">
                    {t(config.privacy.en, config.privacy.od)}
                  </p>
                </div>
                <div className="border border-amber-200 bg-amber-50 p-6">
                  <FileCheck2 className="text-[#9A6100]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#5E4300]">
                    {t(config.urgentNote.en, config.urgentNote.od)}
                  </p>
                </div>
              </aside>
            </div>

            <div className="mt-16 border-t border-[#E8DCC6] pt-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                {t("Work in pictures", "ଫଟୋରେ କାମ")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
                {t("Photos from this work", "ଏହି କାମର ଫଟୋ")}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#555]">
                {t(
                  "Only photos that have passed permission and privacy checks appear here.",
                  "ଅନୁମତି ଓ ଗୋପନୀୟତା ଯାଞ୍ଚ ସମ୍ପୂର୍ଣ୍ଣ କରିଥିବା ଫଟୋ ମାତ୍ର ଏଠାରେ ଦେଖାଯାଏ।"
                )}
              </p>

              {isLoading ? (
                <p className="mt-7 text-sm text-[#666]">
                  {t("Loading photos…", "ଫଟୋ ଲୋଡ ହେଉଛି…")}
                </p>
              ) : images.length ? (
                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {images.map((image: any) => (
                    <figure
                      key={image.id}
                      className="overflow-hidden border border-[#E8DCC6] bg-[#FFFDF8]"
                    >
                      <div className="aspect-[4/3] bg-[#F5F0E8] p-2">
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <figcaption className="p-4">
                        <p className="font-serif text-base font-bold">
                          {image.title}
                        </p>
                        {image.description && (
                          <p className="mt-2 text-xs leading-6 text-[#666]">
                            {image.description}
                          </p>
                        )}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <p className="mt-7 flex items-center gap-2 border border-dashed border-[#D8C7A5] bg-[#FFFDF8] p-6 text-sm text-[#666]">
                  <ImageIcon
                    size={18}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  {t(config.empty.en, config.empty.od)}
                </p>
              )}
            </div>

            <div className="mt-12 flex flex-col gap-3 border-t border-[#E8DCC6] pt-8 sm:flex-row">
              <Link
                href={`/donate?cause=${config.donationCause}`}
                className="inline-flex items-center justify-center gap-2 rounded bg-[#F5A623] px-6 py-3 font-sans text-sm font-bold text-[#1A1A1A]"
              >
                {t("Make a one time donation", "ଏକକାଳୀନ ଦାନ କରନ୍ତୁ")}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded border border-[#B99455] px-6 py-3 font-sans text-sm font-bold text-[#6F4300]"
              >
                {t("Contact the Foundation", "ଫାଉଣ୍ଡେସନ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ")}
              </Link>
              <Link
                href="/limited-verified-support"
                className="inline-flex items-center justify-center rounded border border-[#B99455] px-6 py-3 font-sans text-sm font-bold text-[#6F4300]"
              >
                {t("Read all support limits", "ସମସ୍ତ ସହାୟତା ସୀମା ପଢ଼ନ୍ତୁ")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
