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
import ProgrammeAlbumCard from "@/components/ProgrammeAlbumCard";
import ProgrammeAlbumViewer, {
  type ProgrammeAlbumSelection,
} from "@/components/ProgrammeAlbumViewer";
import { groupProgrammePhotos } from "@/data/programmePhotoAlbums";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  IMPACT_COLLECTIONS,
  impactCollection,
  publishedImpactPhotos,
  type ImpactRecord,
  type ImpactCollection,
} from "@/data/impactPhotoCollections";
import { trpc } from "@/lib/trpc";

type PhotoCategory =
  | "education"
  | "medical"
  | "animals"
  | "elder"
  | "disaster"
  | "community";
type GalleryFilter = "all" | PhotoCategory;
type CollectionFilter = "all" | ImpactCollection;

type GalleryPhoto = ImpactRecord & {
  category: PhotoCategory;
  collection: ImpactCollection;
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
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("all");
  const [activeCollection, setActiveCollection] =
    useState<CollectionFilter>("all");
  const [selection, setSelection] = useState<ProgrammeAlbumSelection>(null);
  const { data: publishedMedia = [], isLoading } =
    trpc.cms.gallery.listPublished.useQuery(undefined, { retry: false });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const photos = useMemo<GalleryPhoto[]>(
    () =>
      publishedImpactPhotos(publishedMedia).map(item => ({
        ...item,
        category: publicCategory(item.category),
        collection: impactCollection(item),
      })),
    [publishedMedia]
  );
  const albums = useMemo(() => groupProgrammePhotos(photos), [photos]);

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

  const causePhotos = useMemo(
    () =>
      activeFilter === "all"
        ? photos
        : photos.filter(photo => photo.category === activeFilter),
    [activeFilter, photos]
  );

  const collections = useMemo(
    () =>
      IMPACT_COLLECTIONS.filter(collection =>
        causePhotos.some(photo => photo.collection === collection.key)
      ),
    [causePhotos]
  );

  const visiblePhotos = useMemo(
    () =>
      activeCollection === "all"
        ? causePhotos
        : causePhotos.filter(photo => photo.collection === activeCollection),
    [activeCollection, causePhotos]
  );
  const visibleGroups = useMemo(
    () =>
      collections
        .map(collection => ({
          ...collection,
          photos: visiblePhotos.filter(
            photo => photo.collection === collection.key
          ),
          albums: groupProgrammePhotos(
            visiblePhotos.filter(photo => photo.collection === collection.key)
          ),
        }))
        .filter(group => group.photos.length),
    [collections, visiblePhotos]
  );

  const activeLabel =
    FILTERS.find(item => item.key === activeFilter) || FILTERS[0];
  const selectedCollectionLabel = IMPACT_COLLECTIONS.find(
    item => item.key === activeCollection
  );

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <SEO
        title={t(
          "Impact Gallery | Abhiara Foundation",
          "ପ୍ରଭାବ ଫଟୋ ଭଣ୍ଡାର | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Browse published photographs of Abhiara Foundation's education and community work by cause and activity.",
          "କାରଣ ଓ କାର୍ଯ୍ୟକ୍ରମ ଅନୁଯାୟୀ ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଶିକ୍ଷା ଓ ସମୁଦାୟ କାମର ପ୍ରକାଶିତ ଫଟୋ ଦେଖନ୍ତୁ।"
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
                "Explore education, elder care and community work by programme. Each album shows a short activity story and selected photos; open it to see the complete photo set.",
                "କାର୍ଯ୍ୟକ୍ରମ ଅନୁଯାୟୀ ଶିକ୍ଷା, ବୃଦ୍ଧ ସେବା ଓ ସମୁଦାୟ କାମ ଦେଖନ୍ତୁ। ପ୍ରତ୍ୟେକ ଆଲବମରେ କାମର ସଂକ୍ଷିପ୍ତ ବିବରଣୀ ଓ ବଛା ଫଟୋ ଅଛି; ସମସ୍ତ ଫଟୋ ଦେଖିବା ପାଇଁ ଆଲବମ ଖୋଲନ୍ତୁ।"
              )}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-7xl">
            <div className="mb-8 flex max-w-3xl items-start gap-3 border border-[#E8DCC6] bg-[#FFFDF8] p-5">
              <ShieldCheck
                className="mt-0.5 shrink-0 text-[#B56A22]"
                aria-hidden="true"
              />
              <p className="text-sm leading-7 text-[#555]">
                {t(
                  "We do not show names, identity records, bank details or private family information in this gallery. Photos record an activity, not a measured change in learning or wellbeing.",
                  "ଏହି ଫଟୋ ଭଣ୍ଡାରରେ ନାମ, ପରିଚୟ ପତ୍ର, ବ୍ୟାଙ୍କ ବିବରଣୀ ବା ବ୍ୟକ୍ତିଗତ ପରିବାର ସୂଚନା ଦେଖାଯାଏ ନାହିଁ। ଫଟୋ କାମର ଦୃଶ୍ୟ ଦେଖାଏ, ପାଠପଢ଼ା ବା ସୁସ୍ଥତାର ମାପାଯାଇଥିବା ଫଳ ନୁହେଁ।"
                )}
              </p>
            </div>

            <div className="mb-10 border-y border-[#E8DCC6] py-6">
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
                      onClick={() => {
                        setActiveFilter(filter.key);
                        setActiveCollection("all");
                      }}
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

              {collections.length > 1 && (
                <div className="mt-7">
                  <p className="mb-3 text-sm font-bold text-[#5F3D00]">
                    {t("Browse by activity", "କାର୍ଯ୍ୟକ୍ରମ ଅନୁଯାୟୀ ଦେଖନ୍ତୁ")}
                  </p>
                  <div
                    className="flex flex-wrap gap-2"
                    role="group"
                    aria-label={t(
                      "Activity collections",
                      "କାର୍ଯ୍ୟକ୍ରମ ଫଟୋ ସମୂହ"
                    )}
                  >
                    {[
                      {
                        key: "all" as const,
                        en: "All activities",
                        od: "ସମସ୍ତ କାର୍ଯ୍ୟକ୍ରମ",
                      },
                      ...collections,
                    ].map(collection => (
                      <button
                        key={collection.key}
                        type="button"
                        aria-pressed={activeCollection === collection.key}
                        onClick={() => setActiveCollection(collection.key)}
                        className={`min-h-11 border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B56A22] focus-visible:ring-offset-2 ${
                          activeCollection === collection.key
                            ? "border-[#5F3D00] bg-[#5F3D00] text-white"
                            : "border-[#D8C7A5] bg-white text-[#5F3D00] hover:border-[#5F3D00]"
                        }`}
                      >
                        {t(collection.en, collection.od)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <p className="mt-5 text-sm text-[#666]" aria-live="polite">
                {selectedCollectionLabel
                  ? t(selectedCollectionLabel.en, selectedCollectionLabel.od)
                  : t(activeLabel.en, activeLabel.od)}
                : {visiblePhotos.length} {t("photos", "ଫଟୋ")}
              </p>
            </div>

            {isLoading ? (
              <p className="text-sm text-[#666]">
                {t("Loading photos...", "ଫଟୋ ଲୋଡ ହେଉଛି...")}
              </p>
            ) : visiblePhotos.length ? (
              <div className="space-y-14">
                {visibleGroups.map(group => (
                  <section key={group.key} aria-label={t(group.en, group.od)}>
                    <div className="mb-5 flex items-center justify-between gap-4 border-b border-[#E8DCC6] pb-3">
                      <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] md:text-3xl">
                        {t(group.en, group.od)}
                      </h2>
                      <span className="shrink-0 text-sm text-[#6F5D45]">
                        {group.albums.length.toLocaleString(
                          language === "od" ? "or-IN" : "en-IN"
                        )}{" "}
                        {t("albums", "ଆଲବମ")} ·{" "}
                        {group.photos.length.toLocaleString(
                          language === "od" ? "or-IN" : "en-IN"
                        )}{" "}
                        {t("photos", "ଫଟୋ")}
                      </span>
                    </div>
                    <div className="space-y-6">
                      {group.albums.map((album, index) => (
                        <ProgrammeAlbumCard
                          key={album.key}
                          album={album}
                          eager={index < 3}
                          onOpen={(key, index) => setSelection({ key, index })}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-[#D8C7A5] bg-[#FFFDF8] p-8">
                <ImageIcon className="text-[#B56A22]" aria-hidden="true" />
                <p className="mt-3 text-sm leading-7 text-[#666]">
                  {activeFilter === "all"
                    ? t(
                        "No published impact photo is available right now.",
                        "ବର୍ତ୍ତମାନ କୌଣସି ପ୍ରକାଶିତ ପ୍ରଭାବ ଫଟୋ ଉପଲବ୍ଧ ନାହିଁ।"
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

            <div className="mt-10 border-t border-[#E8DCC6] pt-6">
              <p className="text-sm leading-7 text-[#555]">
                {t(
                  "Newspaper coverage and other public records are kept separately from programme photographs.",
                  "ସମ୍ବାଦପତ୍ର ଖବର ଓ ଅନ୍ୟ ସାର୍ବଜନିକ ରେକର୍ଡ କାର୍ଯ୍ୟକ୍ରମ ଫଟୋରୁ ଅଲଗା ରଖାଯାଇଛି।"
                )}
              </p>
              <Link
                href="/press-and-media"
                className="mt-3 inline-flex items-center gap-2 font-bold text-[#8A5700]"
              >
                {t(
                  "See records and public videos",
                  "ରେକର୍ଡ ଓ ସାର୍ବଜନିକ ଭିଡିଓ ଦେଖନ୍ତୁ"
                )}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <ProgrammeAlbumViewer
        albums={albums}
        selection={selection}
        onSelectionChange={setSelection}
      />
      <Footer />
    </div>
  );
}
