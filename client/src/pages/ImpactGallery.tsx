import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Filter,
  Image as ImageIcon,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

type PhotoCategory =
  | "education"
  | "medical"
  | "animals"
  | "elder"
  | "disaster"
  | "community";
type GalleryFilter = "all" | PhotoCategory;

type GalleryPhoto = {
  id: number;
  url: string;
  title: string;
  description?: string | null;
  location?: string | null;
  dateTaken?: string | null;
  category: PhotoCategory;
};

const FILTERS: Array<{ key: GalleryFilter; en: string; od: string }> = [
  { key: "all", en: "All photos", od: "ସମସ୍ତ ଫଟୋ" },
  { key: "education", en: "Education", od: "ଶିକ୍ଷା" },
  { key: "medical", en: "Medical", od: "ଚିକିତ୍ସା" },
  { key: "animals", en: "Animals", od: "ପଶୁ କଲ୍ୟାଣ" },
  { key: "elder", en: "Elder care", od: "ବୃଦ୍ଧ ସେବା" },
  { key: "disaster", en: "Disaster", od: "ବିପର୍ଯ୍ୟୟ" },
  { key: "community", en: "Community", od: "ସମୁଦାୟ" },
];

const CATEGORY_LINKS: Record<PhotoCategory, string> = {
  education: "/shiksha-sathi",
  medical: "/medical-emergency-support",
  animals: "/animal-welfare-support",
  elder: "/other-verified-support",
  disaster: "/disaster-relief",
  community: "/press-and-media",
};

function publicCategory(category: string): PhotoCategory {
  if (category === "elderly") return "elder";
  if (
    category === "education" ||
    category === "medical" ||
    category === "animals" ||
    category === "disaster"
  ) {
    return category;
  }
  return "community";
}

export default function ImpactGallery() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("all");
  const { data: publishedMedia = [], isLoading } =
    trpc.cms.gallery.listPublished.useQuery(undefined, { retry: false });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const photos = useMemo<GalleryPhoto[]>(
    () =>
      publishedMedia
        .filter(
          (item: any) =>
            (!item.mediaType || item.mediaType === "photo") && item.imageUrl
        )
        .map((item: any) => ({
          id: item.id,
          url: item.imageUrl,
          title: item.title,
          description: item.description,
          location: item.location,
          dateTaken: item.dateTaken,
          category: publicCategory(item.category),
        })),
    [publishedMedia]
  );

  const counts = useMemo(() => {
    const next: Record<GalleryFilter, number> = {
      all: photos.length,
      education: 0,
      medical: 0,
      animals: 0,
      elder: 0,
      disaster: 0,
      community: 0,
    };
    for (const photo of photos) next[photo.category] += 1;
    return next;
  }, [photos]);

  const visiblePhotos = useMemo(
    () =>
      activeFilter === "all"
        ? photos
        : photos.filter(photo => photo.category === activeFilter),
    [activeFilter, photos]
  );

  const activeLabel =
    FILTERS.find(item => item.key === activeFilter) || FILTERS[0];

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <SEO
        title={t(
          "Impact Gallery | Abhiara Foundation",
          "ପ୍ରଭାବ ଫଟୋ ଭଣ୍ଡାର | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Browse photographs from Abhiara Foundation's education and community work by cause.",
          "କାରଣ ଅନୁଯାୟୀ ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଶିକ୍ଷା ଓ ସମୁଦାୟ କାମର ଫଟୋ ଦେଖନ୍ତୁ।"
        )}
        url="https://www.abhiarafoundation.org/impact-gallery"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <div className="container max-w-6xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5A623]">
              {t("Our work in pictures", "ଫଟୋରେ ଆମ କାମ")}
            </p>
            <h1 className="mt-4 font-serif text-5xl font-bold text-white md:text-7xl">
              {t("Impact Gallery", "ପ୍ରଭାବ ଫଟୋ ଭଣ୍ଡାର")}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
              {t(
                "Choose a cause to see education and community work. Names and private personal details are not shown.",
                "ଶିକ୍ଷା ଓ ସମୁଦାୟ କାମ ଦେଖିବା ପାଇଁ ଗୋଟିଏ କାରଣ ବାଛନ୍ତୁ। ନାମ ଓ ବ୍ୟକ୍ତିଗତ ବିବରଣୀ ଦେଖାଯାଏ ନାହିଁ।"
              )}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-7xl">
            <div className="mb-8 flex max-w-3xl items-start gap-3 border border-[#E8DCC6] bg-[#FFFDF8] p-5">
              <ShieldCheck className="mt-0.5 shrink-0 text-[#B56A22]" />
              <p className="text-sm leading-7 text-[#555]">
                {t(
                  "We do not show names, identity records, bank details or private family information in this gallery.",
                  "ଏହି ଫଟୋ ଭଣ୍ଡାରରେ ନାମ, ପରିଚୟ ପତ୍ର, ବ୍ୟାଙ୍କ ବିବରଣୀ ବା ବ୍ୟକ୍ତିଗତ ପରିବାର ସୂଚନା ଦେଖାଯାଏ ନାହିଁ।"
                )}
              </p>
            </div>

            <div className="mb-9 border-y border-[#E8DCC6] py-6">
              <div className="mb-4 flex items-center gap-2 text-sm font-bold text-[#5F3D00]">
                <Filter size={17} aria-hidden="true" />
                {t("Filter by cause", "କାରଣ ଅନୁଯାୟୀ ଫଟୋ ବାଛନ୍ତୁ")}
              </div>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label={t("Gallery cause filters", "ଗ୍ୟାଲେରୀ କାରଣ ଫିଲ୍ଟର")}
              >
                {FILTERS.map(filter => {
                  const active = activeFilter === filter.key;
                  return (
                    <button
                      key={filter.key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setActiveFilter(filter.key)}
                      className={`inline-flex min-h-11 items-center gap-2 border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B56A22] focus-visible:ring-offset-2 ${
                        active
                          ? "border-[#B56A22] bg-[#B56A22] text-white"
                          : "border-[#D8C7A5] bg-white text-[#5F3D00] hover:border-[#B56A22] hover:bg-[#FFF8EA]"
                      }`}
                    >
                      <span>{t(filter.en, filter.od)}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-[#F5EFE3] text-[#6E4A0B]"
                        }`}
                      >
                        {counts[filter.key]}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-[#666]" aria-live="polite">
                {t(activeLabel.en, activeLabel.od)}: {visiblePhotos.length}{" "}
                {t("photos", "ଫଟୋ")}
              </p>
            </div>

            {isLoading ? (
              <p className="text-sm text-[#666]">
                {t("Loading photos...", "ଫଟୋ ଲୋଡ ହେଉଛି...")}
              </p>
            ) : visiblePhotos.length ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visiblePhotos.map(photo => (
                  <article
                    key={photo.id}
                    data-category={photo.category}
                    className="overflow-hidden border border-[#E8DCC6] bg-[#FFFDF8]"
                  >
                    <div className="flex aspect-[4/3] items-center justify-center bg-[#F5EFE3] p-2">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="font-serif text-base font-bold">
                        {photo.title}
                      </h2>
                      {photo.description && (
                        <p className="mt-2 text-xs leading-6 text-[#666]">
                          {photo.description}
                        </p>
                      )}
                      {(photo.location || photo.dateTaken) && (
                        <p className="mt-2 text-[11px] text-[#7A6A54]">
                          {[photo.location, photo.dateTaken]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-[#D8C7A5] bg-[#FFFDF8] p-8">
                <ImageIcon className="text-[#B56A22]" />
                <p className="mt-3 text-sm leading-7 text-[#666]">
                  {activeFilter === "all"
                    ? t(
                        "No impact photo is available right now.",
                        "ବର୍ତ୍ତମାନ କୌଣସି ପ୍ରଭାବ ଫଟୋ ଉପଲବ୍ଧ ନାହିଁ।"
                      )
                    : t(
                        `No ${activeLabel.en.toLowerCase()} photo is available yet.`,
                        `${activeLabel.od} ପାଇଁ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଫଟୋ ଉପଲବ୍ଧ ନାହିଁ।`
                      )}
                </p>
                {activeFilter !== "all" && (
                  <Link
                    href={CATEGORY_LINKS[activeFilter]}
                    className="mt-5 inline-flex items-center gap-2 font-bold text-[#8A5700]"
                  >
                    {t("Read about this work", "ଏହି କାମ ବିଷୟରେ ପଢ଼ନ୍ତୁ")}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                )}
              </div>
            )}

            <Link
              href="/press-and-media"
              className="mt-10 inline-flex items-center gap-2 font-bold text-[#8A5700]"
            >
              {t(
                "See records and public videos",
                "ରେକର୍ଡ ଓ ସାର୍ବଜନିକ ଭିଡିଓ ଦେଖନ୍ତୁ"
              )}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
