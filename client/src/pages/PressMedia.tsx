import { useEffect, type ComponentType } from "react";
import { Link } from "wouter";
import {
  Archive,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Facebook,
  FileCheck2,
  Image as ImageIcon,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Newspaper,
  Play,
  Scale,
  ShieldCheck,
  Youtube,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  REVIEWED_EDUCATION_ARCHIVE,
  REVIEWED_SUPPORT_ARCHIVE,
} from "@/data/restoredPublicContent";
import {
  FOUNDER_LINKEDIN_URL,
  resolvePublicSocialLinks,
  SOCIAL_FOLLOW_MESSAGE,
  SOCIAL_PLATFORM_FALLBACKS,
} from "@/data/socialPlatforms";
import { trpc } from "@/lib/trpc";

const SOCIAL_ICONS: Record<
  (typeof SOCIAL_PLATFORM_FALLBACKS)[number]["platform"],
  ComponentType<{ size?: number; className?: string }>
> = {
  Facebook,
  YouTube: Youtube,
  LinkedIn: Linkedin,
  Instagram,
};

const PUBLIC_DIRECTORY = [
  {
    title: { en: "Education", od: "ଶିକ୍ଷା" },
    links: [
      {
        href: "/shiksha-sathi",
        en: "Abhiara Shiksha Sathi",
        od: "ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ",
      },
      {
        href: "/how-we-support-a-child",
        en: "How We Support a Child",
        od: "ଆମେ ଶିଶୁଙ୍କୁ କିପରି ସହାୟତା କରୁ",
      },
      {
        href: "/rural-area-transformation",
        en: "Rural Area Transformation",
        od: "ଗ୍ରାମୀଣ ଅଞ୍ଚଳ ପରିବର୍ତ୍ତନ",
      },
      {
        href: "/abhiara-pratibha-samman",
        en: "Abhiara Pratibha Samman",
        od: "ଅଭିଆରା ପ୍ରତିଭା ସମ୍ମାନ",
      },
      {
        href: "/digital-learning-ai",
        en: "Digital Learning and AI Basics",
        od: "ଡିଜିଟାଲ ଶିକ୍ଷା ଓ AI ମୂଳ ଜ୍ଞାନ",
      },
      {
        href: "/rti-human-rights-awareness",
        en: "RTI and Human Rights Awareness",
        od: "RTI ଓ ମାନବାଧିକାର ସଚେତନତା",
      },
      {
        href: "/student-impact",
        en: "Student Impact",
        od: "ଛାତ୍ର ପ୍ରଭାବ",
      },
      {
        href: "/impact-gallery",
        en: "Impact Gallery",
        od: "ପ୍ରଭାବ ଫଟୋ ଭଣ୍ଡାର",
      },
      {
        href: "/monthly-reports",
        en: "Monthly Reports",
        od: "ମାସିକ ରିପୋର୍ଟ",
      },
    ],
  },
  {
    title: { en: "Compassion and future", od: "ସହାନୁଭୂତି ଓ ଭବିଷ୍ୟତ" },
    links: [
      {
        href: "/limited-verified-support",
        en: "Limited Verified Support",
        od: "ସୀମିତ ଯାଞ୍ଚ ହୋଇଥିବା ସହାୟତା",
      },
      {
        href: "/other-verified-support",
        en: "Past Verified Support",
        od: "ଗତ ଯାଞ୍ଚ ହୋଇଥିବା ସହାୟତା",
      },
      {
        href: "/elder-care-and-dignity",
        en: "Elder Care and Dignity",
        od: "ବୃଦ୍ଧ ସେବା ଓ ସମ୍ମାନ",
      },
      {
        href: "/disaster-relief",
        en: "Disaster Relief",
        od: "ବିପର୍ଯ୍ୟୟ ସହାୟତା",
      },
      {
        href: "/medical-emergency-support",
        en: "Medical Emergency Help",
        od: "ଚିକିତ୍ସା ଜରୁରୀ ସହାୟତା",
      },
      {
        href: "/animal-welfare-support",
        en: "Animal Welfare Support",
        od: "ପଶୁ କଲ୍ୟାଣ ସହାୟତା",
      },
      {
        href: "/abhiara-vidyapitha",
        en: "Vision and Upcoming Initiatives",
        od: "ଦୃଷ୍ଟିକୋଣ ଓ ଆଗାମୀ ପରିକଳ୍ପନା",
      },
      {
        href: "/wellness-and-wellbeing",
        en: "Wellness and Wellbeing",
        od: "ସ୍ୱାସ୍ଥ୍ୟ ଓ ସୁସ୍ଥତା",
      },
    ],
  },
  {
    title: { en: "Trust and organisation", od: "ବିଶ୍ୱାସ ଓ ସଂଗଠନ" },
    links: [
      { href: "/", en: "Home", od: "ମୁଖ୍ୟ ପୃଷ୍ଠା" },
      { href: "/our-story", en: "Our Story", od: "ଆମ କାହାଣୀ" },
      {
        href: "/partners-and-supporters",
        en: "Partners and Supporters",
        od: "ସହଯୋଗୀ ଓ ସମର୍ଥକ",
      },
      {
        href: "/board-and-transparency",
        en: "Board and Transparency",
        od: "ବୋର୍ଡ ଓ ସ୍ୱଚ୍ଛତା",
      },
      {
        href: "/press-and-media",
        en: "Press and Media",
        od: "ପ୍ରେସ ଓ ମିଡିଆ",
      },
    ],
  },
  {
    title: { en: "Take part", od: "ଯୋଗ ଦିଅନ୍ତୁ" },
    links: [
      {
        href: "/donate",
        en: "Donate",
        od: "ଦାନ",
      },
      {
        href: "/birthday-with-purpose",
        en: "Birthday with Purpose",
        od: "ଉଦ୍ଦେଶ୍ୟ ସହ ଜନ୍ମଦିନ",
      },
      { href: "/volunteer", en: "Volunteer", od: "ସ୍ୱେଚ୍ଛାସେବୀ" },
      { href: "/contact", en: "Contact", od: "ଯୋଗାଯୋଗ" },
    ],
  },
  {
    title: { en: "Public information", od: "ସାର୍ବଜନିକ ସୂଚନା" },
    links: [
      { href: "/faq", en: "Frequently Asked Questions", od: "ସାଧାରଣ ପ୍ରଶ୍ନ" },
      {
        href: "/privacy",
        en: "Privacy and Child Safeguarding",
        od: "ଗୋପନୀୟତା ଓ ଶିଶୁ ସୁରକ୍ଷା",
      },
      {
        href: "/donation-and-refund-policy",
        en: "Donation and Refund Policy",
        od: "ଦାନ ଓ ଫେରସ୍ତ ନୀତି",
      },
      { href: "/terms", en: "Terms", od: "ନିୟମ" },
    ],
  },
] as const;

function getYoutubeId(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([^?&]+)/
  );
  return match?.[1] || "";
}

export default function PressMedia() {
  const { language, t } = useLanguage();
  const { data: activities = [], isLoading: activitiesLoading } =
    trpc.cms.activities.listPublished.useQuery(undefined, { retry: false });
  const { data: videos = [], isLoading: videosLoading } =
    trpc.cms.youtube.listPublished.useQuery(undefined, { retry: false });
  const { data: activeSocialLinks = [] } = trpc.cms.social.listActive.useQuery(
    undefined,
    { retry: false }
  );
  const { data: publishedMedia = [], isLoading: mediaLoading } =
    trpc.cms.gallery.listPublished.useQuery(undefined, { retry: false });
  const { data: publicSettings = [] } = trpc.cms.settings.listPublic.useQuery(
    undefined,
    { retry: false }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const reviewedRecords = [
    ...REVIEWED_EDUCATION_ARCHIVE,
    ...REVIEWED_SUPPORT_ARCHIVE.filter(
      record => record.id !== "kankili-fire-relief-2026"
    ),
  ];
  const ownerPublicRecords = activities.filter((record: any) =>
    ["education", "community"].includes(record.category)
  );
  const publicPhotos = publishedMedia.filter(
    (item: any) =>
      (!item.mediaType || item.mediaType === "photo") && item.imageUrl
  );
  const publicVideos = videos
    .map((item: any) => ({ ...item, youtubeId: getYoutubeId(item.youtubeUrl) }))
    .filter(
      (item: any) =>
        item.youtubeId && ["education", "documentary"].includes(item.category)
    );
  const socialLinks = resolvePublicSocialLinks(activeSocialLinks);
  const publicEmail =
    publicSettings.find((item: any) => item.settingKey === "email_address")
      ?.settingValue || "info@abhiarafoundation.org";

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <SEO
        title={t(
          "Press and Media | Abhiara Foundation",
          "ପ୍ରେସ ଓ ମିଡିଆ | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Activity records, programme photos, public videos and official social media links from Abhiara Foundation.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନର କାର୍ଯ୍ୟକଳାପ ରେକର୍ଡ, କାର୍ଯ୍ୟକ୍ରମ ଫଟୋ, ସାର୍ବଜନିକ ଭିଡିଓ ଓ ଅଧିକୃତ ସୋସିଆଲ ମିଡିଆ ଲିଙ୍କ।"
        )}
        url="https://www.abhiarafoundation.org/press-and-media"
      />
      <Navbar />

      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <div className="container grid max-w-6xl gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5A623]">
                {t("Public records and media", "ସାର୍ବଜନିକ ପ୍ରମାଣ ଭଣ୍ଡାର")}
              </p>
              <h1 className="mt-5 font-serif text-5xl font-bold text-white md:text-7xl">
                {t("Press and Media", "ପ୍ରେସ ଓ ମିଡିଆ")}
              </h1>
              <p className="mt-6 max-w-3xl font-sans text-lg leading-8 text-white/75">
                {t(
                  "Find activity records, programme photos, public videos and official social links in one place.",
                  "କାର୍ଯ୍ୟକଳାପ ରେକର୍ଡ, କାର୍ଯ୍ୟକ୍ରମ ଫଟୋ, ସାର୍ବଜନିକ ଭିଡିଓ ଓ ଅଧିକୃତ ସୋସିଆଲ ଲିଙ୍କ ଏକ ସ୍ଥାନରେ ଦେଖନ୍ତୁ।"
                )}
              </p>
            </div>
            <div className="border border-white/15 bg-white/5 p-6">
              <ShieldCheck className="text-[#F5A623]" size={26} />
              <h2 className="mt-4 font-serif text-2xl font-bold text-white">
                {t("What we do not publish", "ସତର୍କତା ସହ ପ୍ରକାଶିତ")}
              </h2>
              <p className="mt-3 font-sans text-sm leading-7 text-white/70">
                {t(
                  "We do not publish private child details, identity records, bank documents, phone numbers or unverified claims.",
                  "ଶିଶୁଙ୍କ ବ୍ୟକ୍ତିଗତ ବିବରଣୀ, ପରିଚୟ ପତ୍ର, ବ୍ୟାଙ୍କ କାଗଜପତ୍ର, ଫୋନ ନମ୍ବର ଓ ଯାଞ୍ଚ ହୋଇନଥିବା ଦାବି ଏହି ସାର୍ବଜନିକ ଭଣ୍ଡାରର ଅଂଶ ନୁହେଁ।"
                )}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#FFFDF8] py-16 md:py-24">
          <div className="container max-w-6xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
              {t("Reviewed records", "ସମୀକ୍ଷା ହୋଇଥିବା ରେକର୍ଡ")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
              {t(
                "A clear record of public work",
                "ସାର୍ବଜନିକ କାମର ସ୍ପଷ୍ଟ ରେକର୍ଡ"
              )}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {reviewedRecords.map(record => (
                <article
                  key={record.id}
                  className="border border-[#E8DCC6] bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A6100]">
                      {t("Reviewed archive", "ସମୀକ୍ଷା ଆର୍କାଇଭ")}
                    </p>
                    <Archive size={18} className="text-[#B56A22]" />
                  </div>
                  <p className="mt-3 text-xs font-bold text-[#6F4300]">
                    {t(record.date.en, record.date.od)}
                  </p>
                  <h3 className="mt-3 font-serif text-xl font-bold">
                    {t(record.title.en, record.title.od)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#555]">
                    {t(record.summary.en, record.summary.od)}
                  </p>
                  <p className="mt-4 flex items-start gap-2 text-xs text-[#666]">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    {t(record.location.en, record.location.od)}
                  </p>
                </article>
              ))}
              {ownerPublicRecords.map((record: any) => (
                <article
                  key={`owner-${record.id}`}
                  className="border border-[#E8DCC6] bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A6100]">
                      {t("Public record", "ସାର୍ବଜନିକ ରେକର୍ଡ")}
                    </p>
                    <FileCheck2 size={18} className="text-[#B56A22]" />
                  </div>
                  <p className="mt-3 text-xs font-bold text-[#6F4300]">
                    {record.date}
                  </p>
                  <h3 className="mt-3 font-serif text-xl font-bold">
                    {record.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#555]">
                    {record.description}
                  </p>
                  {record.location && (
                    <p className="mt-4 flex items-start gap-2 text-xs text-[#666]">
                      <MapPin size={14} className="mt-0.5 shrink-0" />
                      {record.location}
                    </p>
                  )}
                </article>
              ))}
            </div>
            {activitiesLoading && (
              <p className="mt-6 text-sm text-[#666]">
                {t(
                  "Loading public records...",
                  "ସାର୍ବଜନିକ ରେକର୍ଡ ଲୋଡ ହେଉଛି..."
                )}
              </p>
            )}
          </div>
        </section>

        <section
          id="public-awareness"
          className="border-y border-[#E8DCC6] bg-white py-16 md:py-24"
        >
          <div className="container max-w-6xl">
            <div className="grid gap-8 border border-[#E8DCC6] bg-[#FFFDF8] p-7 md:p-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5A623] text-[#1A1A1A]">
                  <Scale size={26} aria-hidden="true" />
                </span>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                  {t(
                    "Past public awareness work",
                    "ପୂର୍ବ ସାର୍ବଜନିକ ସଚେତନତା କାମ"
                  )}
                </p>
              </div>
              <div>
                <h2 className="font-serif text-3xl font-bold md:text-4xl">
                  {t("RTI and human rights classes", "RTI ଓ ମାନବାଧିକାର ଶ୍ରେଣୀ")}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#555]">
                  {t(
                    "Abhiara Foundation has held public awareness classes on the Right to Information and human rights. Participation certificates were issued in some completed sessions. Dates, places and attendance totals will be added only after the records are checked.",
                    "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସୂଚନା ଅଧିକାର ଓ ମାନବାଧିକାର ବିଷୟରେ ସାର୍ବଜନିକ ସଚେତନତା ଶ୍ରେଣୀ କରିଛି। କିଛି ସମାପ୍ତ ଅଧିବେଶନରେ ଅଂଶଗ୍ରହଣ ପ୍ରମାଣପତ୍ର ଦିଆଯାଇଥିଲା। ରେକର୍ଡ ଯାଞ୍ଚ ପରେ ମାତ୍ର ତାରିଖ, ସ୍ଥାନ ଓ ଅଂଶଗ୍ରହଣ ସଂଖ୍ୟା ଯୋଡ଼ାଯିବ।"
                  )}
                </p>
                <p className="mt-5 border-l-4 border-[#F5A623] bg-white p-4 text-xs leading-6 text-[#655845]">
                  {t(
                    "Individual certificate copies, certificate numbers and participant details are not published. Redacted programme proof may be added after review.",
                    "ବ୍ୟକ୍ତିଗତ ପ୍ରମାଣପତ୍ର କପି, ପ୍ରମାଣପତ୍ର ନମ୍ବର ଓ ଅଂଶଗ୍ରହଣକାରୀଙ୍କ ବିବରଣୀ ପ୍ରକାଶ ହୁଏ ନାହିଁ। ଯାଞ୍ଚ ପରେ ଗୋପନୀୟ ବିବରଣୀ ଢାକି ଦିଆଯାଇଥିବା କାର୍ଯ୍ୟକ୍ରମ ପ୍ରମାଣ ଯୋଡ଼ାଯାଇପାରେ।"
                  )}
                </p>
                <Link
                  href="/rti-human-rights-awareness"
                  className="mt-5 inline-flex items-center gap-2 rounded bg-[#111111] px-5 py-3 text-sm font-bold text-white"
                >
                  {t("Open the awareness section", "ସଚେତନତା ବିଭାଗ ଖୋଲନ୍ତୁ")}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                  {t("Work in pictures", "ଫଟୋରେ କାମ")}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
                  {t("Photos and documents", "ଫଟୋ ଓ ଦଲିଲ")}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#666]">
                {t(
                  "This section brings together photographs and public documents from Abhiara Foundation's work. Private personal details are not shown.",
                  "ଏହି ବିଭାଗରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନର କାମର ଫଟୋ ଓ ସାର୍ବଜନିକ ଦଲିଲ ଏକାଠି ଅଛି। ବ୍ୟକ୍ତିଗତ ବିବରଣୀ ଦେଖାଯାଏ ନାହିଁ।"
                )}
              </p>
            </div>

            {mediaLoading ? (
              <p className="mt-8 text-sm text-[#666]">
                {t("Loading photos...", "ଫଟୋ ଲୋଡ ହେଉଛି...")}
              </p>
            ) : publicPhotos.length ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {publicPhotos.map(photo => (
                  <article
                    key={photo.id}
                    className="overflow-hidden border border-[#E8DCC6] bg-[#FFFDF8]"
                  >
                    <div className="flex aspect-[4/3] items-center justify-center bg-[#F5EFE3] p-2">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <p className="font-serif text-lg font-bold">
                        {photo.title}
                      </p>
                      {photo.description && (
                        <p className="mt-2 text-xs leading-6 text-[#666]">
                          {photo.description}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-8 border border-dashed border-[#D8C7A5] bg-[#FFFDF8] p-8">
                <ImageIcon className="text-[#B56A22]" />
                <p className="mt-3 text-sm leading-7 text-[#666]">
                  {t(
                    "No programme or press photo has completed the public review yet.",
                    "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି କାର୍ଯ୍ୟକ୍ରମ ବା ପ୍ରେସ ଫଟୋ ସାର୍ବଜନିକ ସମୀକ୍ଷା ସମ୍ପୂର୍ଣ୍ଣ କରିନାହିଁ।"
                  )}
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-[#111111] py-16 text-white md:py-24">
          <div className="container max-w-6xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5A623]">
              {t("Public videos", "ସାର୍ବଜନିକ ଭିଡିଓ")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white md:text-5xl">
              {t("Programme and field videos", "କାର୍ଯ୍ୟକ୍ରମ ଓ କ୍ଷେତ୍ର ଭିଡିଓ")}
            </h2>
            {videosLoading ? (
              <p className="mt-8 text-sm text-white/65">
                {t("Loading videos...", "ଭିଡିଓ ଲୋଡ ହେଉଛି...")}
              </p>
            ) : publicVideos.length ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {publicVideos.map((video: any) => (
                  <article
                    key={video.id}
                    className="overflow-hidden border border-white/15 bg-white/5"
                  >
                    <div className="p-6">
                      <Youtube size={24} className="text-[#F5A623]" />
                      <h3 className="font-serif text-xl font-bold text-white">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="mt-2 text-sm leading-7 text-white/65">
                          {video.description}
                        </p>
                      )}
                      <a
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#F5A623]"
                      >
                        {t("Watch on YouTube", "ୟୁଟ୍ୟୁବରେ ଦେଖନ୍ତୁ")}
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-8 border border-dashed border-white/20 bg-white/5 p-8">
                <Play className="text-[#F5A623]" />
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {t(
                    "No public video has completed review yet.",
                    "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ସାର୍ବଜନିକ ଭିଡିଓ ସମୀକ୍ଷା ସମ୍ପୂର୍ଣ୍ଣ କରିନାହିଁ।"
                  )}
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-[#FAF4E8] py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <Newspaper className="text-[#B56A22]" size={28} />
                <h2 className="mt-5 font-serif text-3xl font-bold">
                  {t("Official social media", "ଅଧିକୃତ ସୋସିଆଲ ମିଡିଆ")}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#555]">
                  {t(SOCIAL_FOLLOW_MESSAGE.en, SOCIAL_FOLLOW_MESSAGE.od)}
                </p>
                <a
                  href={`mailto:${publicEmail}`}
                  className="mt-6 inline-flex items-center gap-2 font-bold text-[#7A4B00]"
                >
                  <Mail size={16} /> {publicEmail}
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {socialLinks.map(item => {
                  const Icon = SOCIAL_ICONS[item.platform];
                  return (
                    <a
                      key={item.platform}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between border border-[#E8DCC6] bg-white p-5 hover:border-[#F5A623]"
                    >
                      <span className="flex items-center gap-3 font-bold">
                        <Icon size={20} className="text-[#B56A22]" />
                        {item.platform}
                      </span>
                      <ExternalLink
                        size={16}
                        className="text-[#888] group-hover:text-[#B56A22]"
                      />
                    </a>
                  );
                })}
                <a
                  href={FOUNDER_LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border border-[#E8DCC6] bg-white p-5 hover:border-[#F5A623]"
                >
                  <span className="flex items-center gap-3 font-bold">
                    <Linkedin size={20} className="text-[#B56A22]" />
                    {t(
                      "Founder Abhimanyu Mallik on LinkedIn",
                      "ଲିଙ୍କଡଇନରେ ପ୍ରତିଷ୍ଠାତା ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ"
                    )}
                  </span>
                  <ExternalLink
                    size={16}
                    className="text-[#888] group-hover:text-[#B56A22]"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                {t("Complete website guide", "ସମ୍ପୂର୍ଣ୍ଣ ୱେବସାଇଟ ମାର୍ଗଦର୍ଶିକା")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
                {t(
                  "Find every public section",
                  "ପ୍ରତ୍ୟେକ ସାର୍ବଜନିକ ବିଭାଗ ଦେଖନ୍ତୁ"
                )}
              </h2>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {PUBLIC_DIRECTORY.map(group => (
                <article
                  key={group.title.en}
                  className="border border-[#E8DCC6] bg-[#FFFDF8] p-6"
                >
                  <BookOpen size={20} className="text-[#B56A22]" />
                  <h3 className="mt-4 font-serif text-xl font-bold">
                    {t(group.title.en, group.title.od)}
                  </h3>
                  <div className="mt-4 space-y-2">
                    {group.links.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center justify-between gap-3 py-1 text-sm text-[#555] hover:text-[#9A6100]"
                      >
                        {language === "od" ? link.od : link.en}
                        <ArrowRight size={14} className="shrink-0" />
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
