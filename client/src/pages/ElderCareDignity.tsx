import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CalendarDays,
  HandHeart,
  Home,
  Image as ImageIcon,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { REVIEWED_SUPPORT_ARCHIVE } from "@/data/restoredPublicContent";
import { trpc } from "@/lib/trpc";

export default function ElderCareDignity() {
  const { t } = useLanguage();
  const elderRecord = REVIEWED_SUPPORT_ARCHIVE.find(
    record => record.id === "puri-elder-visit-2025"
  );
  const { data: publicMedia = [], isLoading } =
    trpc.cms.gallery.listPublished.useQuery(undefined, { retry: false });
  const elderPhotos = publicMedia.filter(
    (item: any) =>
      (!item.mediaType || item.mediaType === "photo") &&
      item.category === "elderly"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <SEO
        title={t(
          "Elder Care and Dignity | Abhiara Foundation",
          "ବୃଦ୍ଧ ସେବା ଓ ସମ୍ମାନ | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "A record of Abhiara Foundation's elder home visit, limited case based elder help and future elder care home vision.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନର ବୃଦ୍ଧାଶ୍ରମ ପରିଦର୍ଶନ, ସୀମିତ ମାମଲା ଭିତ୍ତିକ ବୃଦ୍ଧ ସହାୟତା ଓ ଭବିଷ୍ୟତ ବୃଦ୍ଧ ସେବା ଗୃହର ଦୃଷ୍ଟିକୋଣ।"
        )}
        url="https://www.abhiarafoundation.org/elder-care-and-dignity"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#FAF4E8] pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="container max-w-6xl">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5A623]">
              <HandHeart size={26} aria-hidden="true" />
            </span>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
              {t(
                "Respect, time and practical help",
                "ସମ୍ମାନ, ସମୟ ଓ ବ୍ୟବହାରିକ ସହାୟତା"
              )}
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold md:text-7xl">
              {t("Elder Care and Dignity", "ବୃଦ୍ଧ ସେବା ଓ ସମ୍ମାନ")}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#555]">
              {t(
                "Abhiara Foundation has a checked record of an elder home visit and may consider limited help in exceptional cases. A permanent Abhiara Elder Care Home remains a future plan.",
                "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ପାଖରେ ଏକ ଯାଞ୍ଚ ହୋଇଥିବା ବୃଦ୍ଧାଶ୍ରମ ପରିଦର୍ଶନ ରେକର୍ଡ ଅଛି ଏବଂ ବିଶେଷ ମାମଲାରେ ସୀମିତ ସହାୟତା ବିଚାର କରିପାରେ। ସ୍ଥାୟୀ ଅଭିଆରା ବୃଦ୍ଧ ସେବା ଗୃହ ଏକ ଭବିଷ୍ୟତ ଯୋଜନା।"
              )}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              {elderRecord && (
                <article className="border border-[#E8DCC6] bg-[#FFFDF8] p-7 md:p-9">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                    {t("Past visit record", "ପୂର୍ବ ପରିଦର୍ଶନ ରେକର୍ଡ")}
                  </p>
                  <h2 className="mt-4 font-serif text-3xl font-bold">
                    {t(elderRecord.title.en, elderRecord.title.od)}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#555]">
                    {t(elderRecord.summary.en, elderRecord.summary.od)}
                  </p>
                  <div className="mt-6 grid gap-3 text-sm text-[#655845] sm:grid-cols-2">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={16} aria-hidden="true" />
                      {t(elderRecord.date.en, elderRecord.date.od)}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={16} aria-hidden="true" />
                      {t(elderRecord.location.en, elderRecord.location.od)}
                    </p>
                  </div>
                  <p className="mt-5 font-serif text-xl font-bold text-[#8A5700]">
                    {t(elderRecord.result.en, elderRecord.result.od)}
                  </p>
                </article>
              )}

              <aside className="border-l-4 border-[#F5A623] bg-[#111111] p-7 text-white">
                <ShieldCheck className="text-[#F5A623]" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-3xl font-bold text-white">
                  {t("Limited help today", "ଆଜି ସୀମିତ ସହାୟତା")}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  {t(
                    "Food, medicine or emergency help may be considered for a vulnerable elder after the need is checked. Help depends on available funds and cannot be promised in advance.",
                    "ଆବଶ୍ୟକତା ଯାଞ୍ଚ ପରେ ଅସହାୟ ବୃଦ୍ଧଙ୍କ ପାଇଁ ଖାଦ୍ୟ, ଔଷଧ ବା ଜରୁରୀ ସହାୟତା ବିଚାର କରାଯାଇପାରେ। ସହାୟତା ଉପଲବ୍ଧ ଅର୍ଥ ଉପରେ ନିର୍ଭର କରେ ଏବଂ ପୂର୍ବରୁ ପ୍ରତିଶ୍ରୁତି ଦିଆଯାଇପାରେ ନାହିଁ।"
                  )}
                </p>
              </aside>
            </div>

            <div className="mt-10 border border-amber-200 bg-amber-50 p-7">
              <Home className="text-[#9A6100]" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-3xl font-bold text-[#5E4300]">
                {t("Future elder care home", "ଭବିଷ୍ୟତ ବୃଦ୍ଧ ସେବା ଗୃହ")}
              </h2>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-[#6B5314]">
                {t(
                  "The Abhiara Elder Care Home will begin only when steady funding, suitable premises, trained caregivers and required approvals are ready. It is not open for admission today.",
                  "ସ୍ଥାୟୀ ଅର୍ଥ, ଉପଯୁକ୍ତ ସ୍ଥାନ, ପ୍ରଶିକ୍ଷିତ ସେବାକାରୀ ଓ ଆବଶ୍ୟକ ଅନୁମୋଦନ ପ୍ରସ୍ତୁତ ହେଲେ ମାତ୍ର ଅଭିଆରା ବୃଦ୍ଧ ସେବା ଗୃହ ଆରମ୍ଭ ହେବ। ଆଜି ଏଠାରେ ଭର୍ତ୍ତି ଖୋଲା ନାହିଁ।"
                )}
              </p>
              <Link
                href="/abhiara-vidyapitha"
                className="mt-5 inline-flex items-center gap-2 font-bold text-[#6F4300]"
              >
                {t("Read the future vision", "ଭବିଷ୍ୟତ ଦୃଷ୍ଟିକୋଣ ପଢ଼ନ୍ତୁ")}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-[#E8DCC6] bg-[#FFFDF8] py-16 md:py-24">
          <div className="container max-w-6xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
              {t("Work in pictures", "ଫଟୋରେ କାମ")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
              {t("Elder home visit", "ବୃଦ୍ଧାଶ୍ରମ ପରିଦର୍ଶନ")}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#555]">
              {t(
                "Photographs from the visit are shown with simple captions. Private personal details are not shown.",
                "ପରିଦର୍ଶନର ଫଟୋ ସରଳ ବିବରଣୀ ସହ ଦେଖାଯାଏ। ବ୍ୟକ୍ତିଗତ ବିବରଣୀ ଦେଖାଯାଏ ନାହିଁ।"
              )}
            </p>
            {isLoading ? (
              <p className="mt-7 text-sm text-[#666]">
                {t("Loading photos...", "ଫଟୋ ଲୋଡ ହେଉଛି...")}
              </p>
            ) : elderPhotos.length ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {elderPhotos.map((photo: any) => (
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
                  "No elder visit photograph is available in this section yet.",
                  "ଏହି ବିଭାଗରେ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ବୃଦ୍ଧ ପରିଦର୍ଶନ ଫଟୋ ନାହିଁ।"
                )}
              </p>
            )}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/donate?cause=elderly_care"
                className="inline-flex items-center justify-center gap-2 rounded bg-[#F5A623] px-6 py-3 text-sm font-bold"
              >
                {t("Make a one time donation", "ଏକକାଳୀନ ଦାନ କରନ୍ତୁ")}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded border border-[#B99455] px-6 py-3 text-sm font-bold text-[#6F4300]"
              >
                {t("Contact the Foundation", "ଫାଉଣ୍ଡେସନ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
