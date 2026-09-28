import { useEffect, type ComponentType } from "react";
import { Link } from "wouter";
import {
  Archive,
  ArrowRight,
  CloudRain,
  FileCheck2,
  HandHeart,
  HeartPulse,
  Image as ImageIcon,
  MapPin,
  PawPrint,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { REVIEWED_SUPPORT_ARCHIVE } from "@/data/restoredPublicContent";
import { trpc } from "@/lib/trpc";

function isReviewedBlob(url?: string | null) {
  if (!url) return true;
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      parsed.hostname.endsWith(".public.blob.vercel-storage.com") &&
      parsed.pathname.includes("/abhiara-images/")
    );
  } catch {
    return false;
  }
}

type SupportPhotoSection = {
  key: string;
  href?: string;
  title: { en: string; od: string };
  body: { en: string; od: string };
  empty: { en: string; od: string };
  icon: ComponentType<{ size?: number; className?: string }>;
  media:
    | {
        images: Array<{
          id: number;
          imageUrl: string;
          title: string;
          description?: string | null;
        }>;
      }
    | undefined;
  loading: boolean;
};

export default function OtherVerifiedSupport() {
  const { t } = useLanguage();
  const { data: activities = [], isLoading } =
    trpc.cms.activities.listPublished.useQuery(undefined, { retry: false });
  const { data: publishedMedia = [], isLoading: mediaLoading } =
    trpc.cms.gallery.listPublished.useQuery(undefined, { retry: false });
  const ownerRecords = activities.filter(
    (item: any) =>
      item.category !== "education" && isReviewedBlob(item.imageUrl)
  );
  const publishedPhotos = publishedMedia.filter(
    (item: any) =>
      (!item.mediaType || item.mediaType === "photo") && item.imageUrl
  );
  const photosByCategory = (category: string) =>
    publishedPhotos.filter((item: any) => item.category === category);

  const supportPhotoSections: SupportPhotoSection[] = [
    {
      key: "elder-support",
      title: { en: "Elder support", od: "ବୃଦ୍ଧ ସହାୟତା" },
      body: {
        en: "Photos from past visits and limited help for elders. This is separate from the planned Abhiara Vidyapitha elder home.",
        od: "ପୂର୍ବ ବୃଦ୍ଧ ପରିଦର୍ଶନ ଓ ସୀମିତ ସହାୟତାର ଫଟୋ। ଏହା ପରିକଳ୍ପିତ ଅଭିଆରା ବିଦ୍ୟାପୀଠ ବୃଦ୍ଧ ସେବା ଗୃହଠାରୁ ଅଲଗା।",
      },
      empty: {
        en: "No elder support photo is available here yet.",
        od: "ଏଠାରେ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ବୃଦ୍ଧ ସହାୟତା ଫଟୋ ନାହିଁ।",
      },
      icon: HandHeart,
      media: { images: photosByCategory("elderly") },
      loading: mediaLoading,
    },
    {
      key: "disaster-relief",
      href: "/disaster-relief",
      title: { en: "Disaster relief", od: "ବିପର୍ଯ୍ୟୟ ସହାୟତା" },
      body: {
        en: "Photos from local disaster relief work. Help depends on need, available funds and the Foundation budget.",
        od: "ସ୍ଥାନୀୟ ବିପର୍ଯ୍ୟୟ ସହାୟତା କାମର ଫଟୋ। ସହାୟତା ଆବଶ୍ୟକତା, ଉପଲବ୍ଧ ଅର୍ଥ ଓ ଫାଉଣ୍ଡେସନ ବଜେଟ ଉପରେ ନିର୍ଭର କରେ।",
      },
      empty: {
        en: "No disaster relief photo is available here yet.",
        od: "ଏଠାରେ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ବିପର୍ଯ୍ୟୟ ସହାୟତା ଫଟୋ ନାହିଁ।",
      },
      icon: CloudRain,
      media: { images: photosByCategory("disaster") },
      loading: mediaLoading,
    },
    {
      key: "medical-support",
      href: "/medical-emergency-support",
      title: { en: "Medical emergency help", od: "ଚିକିତ୍ସା ଜରୁରୀ ସହାୟତା" },
      body: {
        en: "Medical papers, diagnoses and private family details are not shown with these photos.",
        od: "ଏହି ଫଟୋ ସହ ଚିକିତ୍ସା କାଗଜପତ୍ର, ରୋଗ ବିବରଣୀ ବା ପରିବାରର ବ୍ୟକ୍ତିଗତ କଥା ଦେଖାଯାଏ ନାହିଁ।",
      },
      empty: {
        en: "No medical emergency support photo is available here yet.",
        od: "ଏଠାରେ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଚିକିତ୍ସା ଜରୁରୀ ସହାୟତା ଫଟୋ ନାହିଁ।",
      },
      icon: HeartPulse,
      media: { images: photosByCategory("medical") },
      loading: mediaLoading,
    },
    {
      key: "animal-welfare",
      href: "/animal-welfare-support",
      title: { en: "Animal welfare", od: "ପଶୁ କଲ୍ୟାଣ" },
      body: {
        en: "Photos from animal feeding, treatment help or rescue coordination.",
        od: "ପଶୁ ଖାଦ୍ୟ, ଚିକିତ୍ସା ସହାୟତା ବା ଉଦ୍ଧାର ସମନ୍ୱୟର ଫଟୋ।",
      },
      empty: {
        en: "No animal welfare photo is available here yet.",
        od: "ଏଠାରେ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ପଶୁ କଲ୍ୟାଣ ଫଟୋ ନାହିଁ।",
      },
      icon: PawPrint,
      media: { images: photosByCategory("animals") },
      loading: mediaLoading,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "Other Verified Support | Abhiara Foundation",
          "ଅନ୍ୟ ଯାଞ୍ଚ ହୋଇଥିବା ସହାୟତା | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Reviewed records and approved photos from limited support beyond the Foundation's main education programme.",
          "ଫାଉଣ୍ଡେସନର ମୁଖ୍ୟ ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ ବାହାରେ ସୀମିତ ସହାୟତାର ସମୀକ୍ଷା ରେକର୍ଡ ଓ ଅନୁମୋଦିତ ଫଟୋ।"
        )}
        url="https://www.abhiarafoundation.org/other-verified-support"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#FAF4E8] pb-20 pt-32 md:pt-40">
          <div className="container max-w-5xl">
            <Archive className="text-[#B56A22]" />
            <h1 className="mt-5 font-serif text-4xl font-bold md:text-6xl">
              {t("Other Verified Support", "ଅନ୍ୟ ଯାଞ୍ଚ ହୋଇଥିବା ସହାୟତା")}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-[#555]">
              {t(
                "This page records reviewed support beyond Abhiara Shiksha Sathi. It covers help given in the past or for a particular need, not regular Foundation programmes.",
                "ଏହି ପୃଷ୍ଠାରେ ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ ବାହାରର ସମୀକ୍ଷା ହୋଇଥିବା ସହାୟତା ରେକର୍ଡ ଅଛି। ଏଥିରେ ପୂର୍ବରୁ ଦିଆଯାଇଥିବା ବା କୌଣସି ବିଶେଷ ଆବଶ୍ୟକତା ପାଇଁ ଦିଆଯାଇଥିବା ସହାୟତା ରହିଛି, ନିୟମିତ ଫାଉଣ୍ଡେସନ କାର୍ଯ୍ୟକ୍ରମ ନୁହେଁ।"
              )}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="border-l-4 border-[#F5A623] bg-[#FFFDF8] p-7">
              <div className="flex gap-3">
                <ShieldCheck className="shrink-0 text-[#B56A22]" />
                <p className="font-sans text-sm leading-relaxed text-[#555]">
                  {t(
                    "We show only the date, place, support provided and a short result. Names, portraits and private hardship details are not shown unless the person has clearly agreed and there is a good reason to publish them.",
                    "ଆମେ କେବଳ ତାରିଖ, ସ୍ଥାନ, ଦିଆଯାଇଥିବା ସହାୟତା ଓ ସଂକ୍ଷିପ୍ତ ଫଳାଫଳ ଦେଖାଉ। ବ୍ୟକ୍ତିଙ୍କ ସ୍ପଷ୍ଟ ସମ୍ମତି ଓ ପ୍ରକାଶ କରିବାର ଭଲ କାରଣ ନଥିଲେ ନାମ, ଫଟୋ ଓ ବ୍ୟକ୍ତିଗତ କଷ୍ଟର ବିବରଣୀ ଦେଖାଯାଏ ନାହିଁ।"
                  )}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                {t("Past verified records", "ଗତ ଯାଞ୍ଚ ହୋଇଥିବା ରେକର୍ଡ")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
                {t("Past support records", "ପୂର୍ବର ସହାୟତା ରେକର୍ଡ")}
              </h2>
              <div className="mt-7 grid gap-6 lg:grid-cols-2">
                {REVIEWED_SUPPORT_ARCHIVE.map(record => (
                  <article
                    key={record.id}
                    className="border border-[#E8DCC6] bg-[#FFFDF8] p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9A6100]">
                          {t("Historical record", "ପୁରୁଣା ରେକର୍ଡ")}
                        </p>
                        <p className="mt-2 font-sans text-sm font-bold text-[#6F4300]">
                          {t(record.date.en, record.date.od)}
                        </p>
                      </div>
                      <Archive size={22} className="shrink-0 text-[#B56A22]" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-bold">
                      {t(record.title.en, record.title.od)}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-7 text-[#555]">
                      {t(record.summary.en, record.summary.od)}
                    </p>
                    <div className="mt-5 grid gap-2 text-xs text-[#555] sm:grid-cols-2">
                      <span className="inline-flex items-start gap-2 bg-white px-3 py-2">
                        <MapPin size={14} className="mt-0.5 shrink-0" />
                        {t(record.location.en, record.location.od)}
                      </span>
                      <span className="inline-flex items-start gap-2 bg-white px-3 py-2">
                        <FileCheck2 size={14} className="mt-0.5 shrink-0" />
                        {t(record.result.en, record.result.od)}
                      </span>
                    </div>
                    <p className="mt-5 border-t border-[#E8DCC6] pt-4 font-sans text-xs leading-6 text-[#6B6258]">
                      {t(record.reviewNote.en, record.reviewNote.od)}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-16 border-t border-[#E8DCC6] pt-12">
              <div className="max-w-3xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                  {t("Ground work photos", "କ୍ଷେତ୍ର କାମର ଫଟୋ")}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
                  {t("Photos by type of help", "ସହାୟତା ପ୍ରକାର ଅନୁସାରେ ଫଟୋ")}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#555]">
                  {t(
                    "Each type of help has its own section and its own photo gallery.",
                    "ପ୍ରତ୍ୟେକ ସହାୟତା ପ୍ରକାରର ନିଜସ୍ୱ ବିଭାଗ ଓ ଅଲଗା ଫଟୋ ଭଣ୍ଡାର ଅଛି।"
                  )}
                </p>
              </div>

              <div className="mt-8 space-y-10">
                {supportPhotoSections.map(section => {
                  const Icon = section.icon;
                  const images = section.media?.images ?? [];
                  return (
                    <section
                      key={section.key}
                      className="border border-[#E8DCC6] bg-[#FFFDF8] p-6 md:p-8"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5A623] text-[#1A1A1A]">
                          <Icon size={23} />
                        </span>
                        <div>
                          <h3 className="font-serif text-2xl font-bold">
                            {t(section.title.en, section.title.od)}
                          </h3>
                          <p className="mt-2 max-w-3xl text-sm leading-7 text-[#555]">
                            {t(section.body.en, section.body.od)}
                          </p>
                        </div>
                      </div>

                      {section.loading ? (
                        <p className="mt-6 text-sm text-[#666]">
                          {t("Loading photos…", "ଫଟୋ ଲୋଡ ହେଉଛି…")}
                        </p>
                      ) : images.length ? (
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {images.map(image => (
                            <figure
                              key={image.id}
                              className="overflow-hidden border border-[#E8DCC6] bg-white"
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
                        <p className="mt-6 flex items-center gap-2 border border-dashed border-[#D8C7A5] bg-white p-5 text-sm text-[#666]">
                          <ImageIcon size={18} className="shrink-0" />
                          {t(section.empty.en, section.empty.od)}
                        </p>
                      )}
                      {section.href && (
                        <Link
                          href={section.href}
                          className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-bold text-[#8A5700]"
                        >
                          {t("Open this section", "ଏହି ବିଭାଗ ଖୋଲନ୍ତୁ")}
                          <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                      )}
                    </section>
                  );
                })}
              </div>
            </div>

            <div className="mt-14 border-t border-[#E8DCC6] pt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                {t("Additional activity records", "ଅନ୍ୟ କାର୍ଯ୍ୟକଳାପ ରେକର୍ଡ")}
              </p>
              {isLoading ? (
                <p className="mt-5 text-sm text-[#666]">
                  {t("Loading records…", "ରେକର୍ଡ ଲୋଡ ହେଉଛି…")}
                </p>
              ) : ownerRecords.length ? (
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {ownerRecords.map((record: any) => (
                    <article
                      key={record.id}
                      className="border border-gray-200 bg-white p-6"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9A6100]">
                        {record.date}
                      </p>
                      <h2 className="mt-3 font-serif text-2xl font-bold">
                        {record.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-[#555]">
                        {record.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2 text-xs text-[#555]">
                        {record.location && (
                          <span className="inline-flex items-center gap-1 bg-[#FAF4E8] px-3 py-1.5">
                            <MapPin size={13} /> {record.location}
                          </span>
                        )}
                        {record.beneficiariesCount && (
                          <span className="inline-flex items-center gap-1 bg-[#FAF4E8] px-3 py-1.5">
                            <FileCheck2 size={13} /> {record.beneficiariesCount}
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="mt-5 border border-dashed border-[#D8C7A5] bg-[#FFFDF8] p-7 text-sm text-[#666]">
                  {t(
                    "No additional activity record is available here yet.",
                    "ଏଠାରେ ଏପର୍ଯ୍ୟନ୍ତ ଅନ୍ୟ କୌଣସି କାର୍ଯ୍ୟକଳାପ ରେକର୍ଡ ନାହିଁ।"
                  )}
                </p>
              )}
            </div>

            <Link
              href="/limited-verified-support"
              className="mt-10 inline-flex items-center gap-2 font-sans text-sm font-bold text-[#9A6100]"
            >
              {t(
                "Read the current support limits",
                "ବର୍ତ୍ତମାନ ସହାୟତା ସୀମା ପଢ଼ନ୍ତୁ"
              )}
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
