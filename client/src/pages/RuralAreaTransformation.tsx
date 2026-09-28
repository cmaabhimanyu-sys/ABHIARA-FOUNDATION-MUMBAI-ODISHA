import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  GraduationCap,
  Image as ImageIcon,
  MapPinned,
  School,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

const CURRENT_RURAL_WORK = [
  {
    icon: BookOpen,
    title: { en: "Village learning activities", od: "ଗ୍ରାମରେ ପଢ଼ା କାମ" },
    body: {
      en: "Learning sessions and education materials help children take part in regular study.",
      od: "ପଢ଼ା ଅଧିବେଶନ ଓ ଶିକ୍ଷା ସାମଗ୍ରୀ ଶିଶୁମାନଙ୍କୁ ନିୟମିତ ପଢ଼ାରେ ଯୋଗ ଦେବାକୁ ସହାୟତା କରେ।",
    },
  },
  {
    icon: GraduationCap,
    title: { en: "Student recognition", od: "ଛାତ୍ରଛାତ୍ରୀ ସମ୍ମାନ" },
    body: {
      en: "Abhiara Pratibha Samman recognises student effort and encourages children to continue their education.",
      od: "ଅଭିଆରା ପ୍ରତିଭା ସମ୍ମାନ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପରିଶ୍ରମକୁ ସମ୍ମାନ ଦେଇ ପଢ଼ା ଜାରି ରଖିବାକୁ ଉତ୍ସାହିତ କରେ।",
    },
  },
  {
    icon: School,
    title: { en: "Education materials", od: "ଶିକ୍ଷା ସାମଗ୍ରୀ" },
    body: {
      en: "Books, dictionaries and other learning materials may be provided through checked education activities.",
      od: "ଯାଞ୍ଚ ହୋଇଥିବା ଶିକ୍ଷା କାମ ମାଧ୍ୟମରେ ବହି, ଶବ୍ଦକୋଷ ଓ ଅନ୍ୟ ପଢ଼ା ସାମଗ୍ରୀ ଦିଆଯାଇପାରେ।",
    },
  },
] as const;

export default function RuralAreaTransformation() {
  const { t } = useLanguage();
  const { data: publicMedia = [], isLoading } =
    trpc.cms.gallery.listPublished.useQuery(undefined, { retry: false });
  const ruralPhotos = publicMedia
    .filter(
      (item: any) =>
        (!item.mediaType || item.mediaType === "photo") &&
        item.category === "education" &&
        /village|tribal|book|dictionary|learning|classroom|outdoor/i.test(
          `${item.title || ""} ${item.description || ""}`
        )
    )
    .slice(0, 12);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <SEO
        title={t(
          "Rural Area Transformation | Abhiara Foundation",
          "ଗ୍ରାମୀଣ ଅଞ୍ଚଳ ପରିବର୍ତ୍ତନ | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Education led rural work through village learning, books, student recognition and careful future plans.",
          "ଗ୍ରାମରେ ପଢ଼ା, ବହି, ଛାତ୍ର ସମ୍ମାନ ଓ ସତର୍କ ଭବିଷ୍ୟତ ଯୋଜନା ମାଧ୍ୟମରେ ଶିକ୍ଷା ଭିତ୍ତିକ ଗ୍ରାମୀଣ କାମ।"
        )}
        url="https://www.abhiarafoundation.org/rural-area-transformation"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <div className="container max-w-6xl">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5A623] text-[#1A1A1A]">
              <MapPinned size={26} aria-hidden="true" />
            </span>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5A623]">
              {t("Education led rural work", "ଶିକ୍ଷା ଭିତ୍ତିକ ଗ୍ରାମୀଣ କାମ")}
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold text-white md:text-7xl">
              {t("Rural Area Transformation", "ଗ୍ରାମୀଣ ଅଞ୍ଚଳ ପରିବର୍ତ୍ତନ")}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
              {t(
                "Our present rural work is centred on education. We bring village learning activities, education materials and student recognition together so children have more reasons to continue their studies.",
                "ଆମର ବର୍ତ୍ତମାନ ଗ୍ରାମୀଣ କାମ ଶିକ୍ଷାକୁ କେନ୍ଦ୍ର କରିଛି। ଶିଶୁମାନେ ପଢ଼ା ଜାରି ରଖିବା ପାଇଁ ଆମେ ଗ୍ରାମରେ ପଢ଼ା କାମ, ଶିକ୍ଷା ସାମଗ୍ରୀ ଓ ଛାତ୍ର ସମ୍ମାନକୁ ଏକାଠି କରୁଛୁ।"
              )}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
              {t("Current education work", "ବର୍ତ୍ତମାନର ଶିକ୍ଷା କାମ")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
              {t("What rural work means today", "ଆଜି ଗ୍ରାମୀଣ କାମର ଅର୍ଥ")}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {CURRENT_RURAL_WORK.map(item => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title.en}
                    className="border border-[#E8DCC6] bg-[#FFFDF8] p-7"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5A623]">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-serif text-2xl font-bold">
                      {t(item.title.en, item.title.od)}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#555]">
                      {t(item.body.en, item.body.od)}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 border-l-4 border-[#F5A623] bg-[#111111] p-7 text-white">
              <BrainCircuit className="text-[#F5A623]" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-3xl font-bold text-white">
                {t("Future learning plans", "ଭବିଷ୍ୟତ ପଢ଼ା ଯୋଜନା")}
              </h2>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-white/75">
                {t(
                  "Digital Learning and AI Basics and the Abhiara Vidyapitha School are future plans. Wider rural development work will begin only when local partners, trained people, child safety measures and steady funding are ready.",
                  "ଡିଜିଟାଲ ଶିକ୍ଷା ଓ AI ମୂଳ ଜ୍ଞାନ ଏବଂ ଅଭିଆରା ବିଦ୍ୟାପୀଠ ସ୍କୁଲ ଭବିଷ୍ୟତ ଯୋଜନା। ସ୍ଥାନୀୟ ସହଯୋଗୀ, ପ୍ରଶିକ୍ଷିତ ଲୋକ, ଶିଶୁ ସୁରକ୍ଷା ବ୍ୟବସ୍ଥା ଓ ସ୍ଥାୟୀ ଅର୍ଥ ପ୍ରସ୍ତୁତ ହେଲେ ମାତ୍ର ବ୍ୟାପକ ଗ୍ରାମୀଣ ବିକାଶ କାମ ଆରମ୍ଭ ହେବ।"
                )}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/digital-learning-ai"
                  className="inline-flex items-center justify-center gap-2 rounded bg-[#F5A623] px-5 py-3 text-sm font-bold text-[#1A1A1A]"
                >
                  {t("Digital learning plan", "ଡିଜିଟାଲ ଶିକ୍ଷା ଯୋଜନା")}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/abhiara-vidyapitha"
                  className="inline-flex items-center justify-center rounded border border-white/30 px-5 py-3 text-sm font-bold text-white"
                >
                  {t("Vision and Upcoming", "ଦୃଷ୍ଟିକୋଣ ଓ ଆଗାମୀ")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#E8DCC6] bg-[#FFFDF8] py-16 md:py-24">
          <div className="container max-w-6xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
              {t("Work in pictures", "ଫଟୋରେ କାମ")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
              {t("Rural education activities", "ଗ୍ରାମୀଣ ଶିକ୍ଷା କାମ")}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#555]">
              {t(
                "These photographs show education activities and materials. Names and private child details are not shown.",
                "ଏହି ଫଟୋଗୁଡ଼ିକରେ ଶିକ୍ଷା କାମ ଓ ପଢ଼ା ସାମଗ୍ରୀ ଦେଖାଯାଏ। ନାମ ଓ ଶିଶୁଙ୍କ ବ୍ୟକ୍ତିଗତ ବିବରଣୀ ଦେଖାଯାଏ ନାହିଁ।"
              )}
            </p>
            {isLoading ? (
              <p className="mt-7 text-sm text-[#666]">
                {t("Loading photos...", "ଫଟୋ ଲୋଡ ହେଉଛି...")}
              </p>
            ) : ruralPhotos.length ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {ruralPhotos.map((photo: any) => (
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
                  "No rural education photograph is available in this section yet.",
                  "ଏହି ବିଭାଗରେ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଗ୍ରାମୀଣ ଶିକ୍ଷା ଫଟୋ ନାହିଁ।"
                )}
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
