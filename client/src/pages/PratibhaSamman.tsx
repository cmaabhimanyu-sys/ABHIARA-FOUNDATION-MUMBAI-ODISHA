import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Image as ImageIcon,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { REVIEWED_EDUCATION_ARCHIVE } from "@/data/restoredPublicContent";
import { trpc } from "@/lib/trpc";

export default function PratibhaSamman() {
  const { t } = useLanguage();
  const record = REVIEWED_EDUCATION_ARCHIVE.find(
    item => item.id === "pratibha-samman-2026"
  );
  const { data: publicMedia = [], isLoading } =
    trpc.cms.gallery.listPublished.useQuery(undefined, { retry: false });
  const photos = publicMedia.filter(
    (item: any) =>
      (!item.mediaType || item.mediaType === "photo") &&
      item.category === "education" &&
      /Pratibha Samman/i.test(`${item.title || ""} ${item.description || ""}`)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <SEO
        title={t(
          "Abhiara Pratibha Samman | Student Recognition",
          "ଅଭିଆରା ପ୍ରତିଭା ସମ୍ମାନ | ଛାତ୍ରଛାତ୍ରୀ ସମ୍ମାନ"
        )}
        description={t(
          "A checked record of Abhiara Pratibha Samman held on 4 June 2026 at Raisar Kharisan High School in Kendrapara.",
          "୪ ଜୁନ ୨୦୨୬ରେ କେନ୍ଦ୍ରାପଡ଼ାର ରାଇସର ଖରିସାନ ଉଚ୍ଚ ବିଦ୍ୟାଳୟରେ ହୋଇଥିବା ଅଭିଆରା ପ୍ରତିଭା ସମ୍ମାନର ଯାଞ୍ଚ ହୋଇଥିବା ରେକର୍ଡ।"
        )}
        url="https://www.abhiarafoundation.org/abhiara-pratibha-samman"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <div className="container max-w-6xl">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5A623] text-[#1A1A1A]">
              <Award size={28} aria-hidden="true" />
            </span>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5A623]">
              {t("Student recognition", "ଛାତ୍ରଛାତ୍ରୀ ସମ୍ମାନ")}
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold text-white md:text-7xl">
              {t("Abhiara Pratibha Samman", "ଅଭିଆରା ପ୍ରତିଭା ସମ୍ମାନ")}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
              {t(
                "This education activity recognises talented and hardworking students and encourages them to continue their studies.",
                "ଏହି ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ ପ୍ରତିଭାଶାଳୀ ଓ ପରିଶ୍ରମୀ ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ସମ୍ମାନ ଦେଇ ପଢ଼ା ଜାରି ରଖିବାକୁ ଉତ୍ସାହିତ କରେ।"
              )}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            {record && (
              <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                <article className="border border-[#E8DCC6] bg-[#FFFDF8] p-7 md:p-9">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                    {t(
                      "Checked activity record",
                      "ଯାଞ୍ଚ ହୋଇଥିବା କାର୍ଯ୍ୟକ୍ରମ ରେକର୍ଡ"
                    )}
                  </p>
                  <h2 className="mt-4 font-serif text-3xl font-bold">
                    {t(record.title.en, record.title.od)}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#555]">
                    {t(record.summary.en, record.summary.od)}
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="border border-[#E8DCC6] bg-white p-4">
                      <CalendarDays size={18} className="text-[#B56A22]" />
                      <p className="mt-3 text-sm font-bold">
                        {t(record.date.en, record.date.od)}
                      </p>
                    </div>
                    <div className="border border-[#E8DCC6] bg-white p-4">
                      <MapPin size={18} className="text-[#B56A22]" />
                      <p className="mt-3 text-sm font-bold">
                        {t(record.location.en, record.location.od)}
                      </p>
                    </div>
                    <div className="border border-[#E8DCC6] bg-white p-4">
                      <Users size={18} className="text-[#B56A22]" />
                      <p className="mt-3 text-sm font-bold">
                        {t(record.result.en, record.result.od)}
                      </p>
                    </div>
                  </div>
                </article>

                <aside className="border-l-4 border-[#F5A623] bg-[#111111] p-7 text-white">
                  <ShieldCheck className="text-[#F5A623]" aria-hidden="true" />
                  <h2 className="mt-4 font-serif text-3xl font-bold text-white">
                    {t("A simple purpose", "ସରଳ ଉଦ୍ଦେଶ୍ୟ")}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/75">
                    {t(
                      "The programme honours student effort. It does not publish marks, home addresses or private family details. Future award activities will be recorded only after their facts are checked.",
                      "ଏହି କାର୍ଯ୍ୟକ୍ରମ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପରିଶ୍ରମକୁ ସମ୍ମାନ ଦେଉଛି। ମାର୍କ, ଘର ଠିକଣା ବା ବ୍ୟକ୍ତିଗତ ପରିବାର ବିବରଣୀ ପ୍ରକାଶ ହୁଏ ନାହିଁ। ଭବିଷ୍ୟତ ସମ୍ମାନ କାମର ତଥ୍ୟ ଯାଞ୍ଚ ପରେ ମାତ୍ର ରେକର୍ଡ କରାଯିବ।"
                    )}
                  </p>
                </aside>
              </div>
            )}
          </div>
        </section>

        <section className="border-y border-[#E8DCC6] bg-[#FFFDF8] py-16 md:py-24">
          <div className="container max-w-6xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
              {t("Work in pictures", "ଫଟୋରେ କାମ")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
              {t("Pratibha Samman record", "ପ୍ରତିଭା ସମ୍ମାନ ରେକର୍ଡ")}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#555]">
              {t(
                "The photo record includes the school programme, organising team and published news coverage.",
                "ଫଟୋ ରେକର୍ଡରେ ବିଦ୍ୟାଳୟ କାର୍ଯ୍ୟକ୍ରମ, ଆୟୋଜକ ଦଳ ଓ ପ୍ରକାଶିତ ଖବର ରହିଛି।"
              )}
            </p>
            {isLoading ? (
              <p className="mt-7 text-sm text-[#666]">
                {t("Loading photos...", "ଫଟୋ ଲୋଡ ହେଉଛି...")}
              </p>
            ) : photos.length ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {photos.map((photo: any) => (
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
                  "No Pratibha Samman photograph is available in this section yet.",
                  "ଏହି ବିଭାଗରେ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ପ୍ରତିଭା ସମ୍ମାନ ଫଟୋ ନାହିଁ।"
                )}
              </p>
            )}
            <Link
              href="/donate-for-education"
              className="mt-10 inline-flex items-center gap-2 rounded bg-[#F5A623] px-6 py-3 text-sm font-bold"
            >
              {t("Support education", "ଶିକ୍ଷାକୁ ସହାୟତା କରନ୍ତୁ")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
