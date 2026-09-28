import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CalendarDays,
  ExternalLink,
  FileCheck2,
  FileText,
  MapPin,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { INSTAGRAM_UPDATES } from "@/data/monthlyImpact";
import { trpc } from "@/lib/trpc";

const CLASS_AREAS = [
  {
    icon: FileText,
    title: { en: "Right to Information basics", od: "ସୂଚନା ଅଧିକାରର ମୂଳ କଥା" },
    body: {
      en: "Simple awareness about the purpose of RTI and how people can seek public information through the proper process.",
      od: "RTI ର ଉଦ୍ଦେଶ୍ୟ ଓ ଠିକ ପ୍ରକ୍ରିୟାରେ ସାର୍ବଜନିକ ସୂଚନା କିପରି ମାଗିପାରିବେ ସେ ବିଷୟରେ ସରଳ ସଚେତନତା।",
    },
  },
  {
    icon: Scale,
    title: { en: "Human rights awareness", od: "ମାନବାଧିକାର ସଚେତନତା" },
    body: {
      en: "Plain language sessions about dignity, equal treatment, public duties and where people may seek qualified help.",
      od: "ମର୍ଯ୍ୟାଦା, ସମାନ ବ୍ୟବହାର, ସାର୍ବଜନିକ ଦାୟିତ୍ୱ ଓ ଯୋଗ୍ୟ ସହାୟତା କେଉଁଠାରୁ ମିଳିପାରେ ସେ ବିଷୟରେ ସରଳ ଶ୍ରେଣୀ।",
    },
  },
  {
    icon: Users,
    title: { en: "Public participation", od: "ସାର୍ବଜନିକ ଅଂଶଗ୍ରହଣ" },
    body: {
      en: "Open learning sessions that help people ask questions, understand public processes and use information responsibly.",
      od: "ଲୋକମାନେ ପ୍ରଶ୍ନ ପଚାରିବା, ସାର୍ବଜନିକ ପ୍ରକ୍ରିୟା ବୁଝିବା ଓ ସୂଚନାକୁ ଦାୟିତ୍ୱ ସହ ବ୍ୟବହାର କରିବା ପାଇଁ ଖୋଲା ଶିକ୍ଷା ଅଧିବେଶନ।",
    },
  },
] as const;

export default function RTIHumanRightsAwareness() {
  const { t } = useLanguage();
  const { data: activities = [], isLoading } =
    trpc.cms.activities.listPublished.useQuery(undefined, { retry: false });
  const publicRecords = activities.filter(
    (record: any) => record.category === "community"
  );
  const socialUpdate = INSTAGRAM_UPDATES.find(
    update => update.id === "rti-public-information"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <SEO
        title={t(
          "RTI and Human Rights Awareness | Abhiara Foundation",
          "RTI ଓ ମାନବାଧିକାର ସଚେତନତା | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Past Abhiara Foundation public awareness classes on the Right to Information and human rights, with checked records and privacy-safe reporting.",
          "ସୂଚନା ଅଧିକାର ଓ ମାନବାଧିକାର ବିଷୟରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନର ପୂର୍ବ ସାର୍ବଜନିକ ସଚେତନତା ଶ୍ରେଣୀ, ଯାଞ୍ଚ ହୋଇଥିବା ରେକର୍ଡ ଓ ଗୋପନୀୟତା ସୁରକ୍ଷିତ ରିପୋର୍ଟ।"
        )}
        url="https://www.abhiarafoundation.org/rti-human-rights-awareness"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <div className="container max-w-6xl">
            <span className="inline-flex rounded-full bg-[#F5A623] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A1A1A]">
              {t("Past awareness work", "ପୂର୍ବ ସଚେତନତା କାମ")}
            </span>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-bold text-white md:text-7xl">
              {t("RTI and Human Rights Awareness", "RTI ଓ ମାନବାଧିକାର ସଚେତନତା")}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
              {t(
                "Abhiara Foundation has held public classes on the Right to Information and human rights. Some completed sessions included participation certificates. We publish only information that has been checked.",
                "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସୂଚନା ଅଧିକାର ଓ ମାନବାଧିକାର ବିଷୟରେ ସାର୍ବଜନିକ ଶ୍ରେଣୀ କରିଛି। କିଛି ସମାପ୍ତ ଅଧିବେଶନରେ ଅଂଶଗ୍ରହଣ ପ୍ରମାଣପତ୍ର ଦିଆଯାଇଥିଲା। ଯାଞ୍ଚ ହୋଇଥିବା ସୂଚନା ମାତ୍ର ଆମେ ପ୍ରକାଶ କରୁ।"
              )}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="grid gap-6 md:grid-cols-3">
              {CLASS_AREAS.map(item => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title.en}
                    className="border border-[#E8DCC6] bg-[#FFFDF8] p-7"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5A623]">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h2 className="mt-5 font-serif text-2xl font-bold">
                      {t(item.title.en, item.title.od)}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#555]">
                      {t(item.body.en, item.body.od)}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="border-l-4 border-[#F5A623] bg-[#111111] p-7 text-white">
                <ShieldCheck className="text-[#F5A623]" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-3xl font-bold text-white">
                  {t("Public awareness only", "କେବଳ ସାର୍ବଜନିକ ସଚେତନତା")}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  {t(
                    "These classes provide general awareness. They are not legal advice, legal representation or a government service. People who need case-specific help should contact a qualified professional or the proper public authority.",
                    "ଏହି ଶ୍ରେଣୀ ସାଧାରଣ ସଚେତନତା ପାଇଁ। ଏହା ଆଇନଗତ ପରାମର୍ଶ, ଆଇନଗତ ପ୍ରତିନିଧିତ୍ୱ ବା ସରକାରୀ ସେବା ନୁହେଁ। ନିର୍ଦ୍ଦିଷ୍ଟ ମାମଲାର ସହାୟତା ଆବଶ୍ୟକ ହେଲେ ଯୋଗ୍ୟ ବିଶେଷଜ୍ଞ ବା ଉଚିତ ସାର୍ବଜନିକ କର୍ତ୍ତୃପକ୍ଷଙ୍କୁ ଯୋଗାଯୋଗ କରନ୍ତୁ।"
                  )}
                </p>
              </div>
              <div className="border border-amber-200 bg-amber-50 p-7">
                <FileCheck2 className="text-[#9A6100]" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-3xl font-bold text-[#5E4300]">
                  {t("Certificate privacy", "ପ୍ରମାଣପତ୍ର ଗୋପନୀୟତା")}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#6B5314]">
                  {t(
                    "Individual certificate copies, certificate numbers and participant details are not published. Redacted programme proof may be added after review.",
                    "ବ୍ୟକ୍ତିଗତ ପ୍ରମାଣପତ୍ର କପି, ପ୍ରମାଣପତ୍ର ନମ୍ବର ଓ ଅଂଶଗ୍ରହଣକାରୀଙ୍କ ବିବରଣୀ ପ୍ରକାଶ ହୁଏ ନାହିଁ। ଯାଞ୍ଚ ପରେ ଗୋପନୀୟ ତଥ୍ୟ ଢାକିଥିବା କାର୍ଯ୍ୟକ୍ରମ ପ୍ରମାଣ ଯୋଡ଼ାଯାଇପାରେ।"
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#E8DCC6] bg-[#FFFDF8] py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A6100]">
                  {t(
                    "Checked public records",
                    "ଯାଞ୍ଚ ହୋଇଥିବା ସାର୍ବଜନିକ ରେକର୍ଡ"
                  )}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
                  {t("Awareness class record", "ସଚେତନତା ଶ୍ରେଣୀ ରେକର୍ଡ")}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#666]">
                {t(
                  "Dates, broad places, subjects and combined attendance are shown only after they are checked by the Foundation.",
                  "ତାରିଖ, ସାଧାରଣ ସ୍ଥାନ, ବିଷୟ ଓ ମୋଟ ଉପସ୍ଥିତି ଫାଉଣ୍ଡେସନ ଯାଞ୍ଚ କରିବା ପରେ ମାତ୍ର ଦେଖାଯାଏ।"
                )}
              </p>
            </div>

            {isLoading ? (
              <p className="mt-8 text-sm text-[#666]">
                {t("Loading checked records...", "ଯାଞ୍ଚ ରେକର୍ଡ ଲୋଡ ହେଉଛି...")}
              </p>
            ) : publicRecords.length ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {publicRecords.map((record: any) => (
                  <article
                    key={record.id}
                    className="border border-[#E8DCC6] bg-white p-6"
                  >
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A6100]">
                      {t("Public record", "ସାର୍ବଜନିକ ରେକର୍ଡ")}
                    </p>
                    <h3 className="mt-3 font-serif text-xl font-bold">
                      {record.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#555]">
                      {record.description}
                    </p>
                    <div className="mt-4 space-y-2 text-xs text-[#666]">
                      {record.date && (
                        <p className="flex items-center gap-2">
                          <CalendarDays size={14} aria-hidden="true" />
                          {record.date}
                        </p>
                      )}
                      {record.location && (
                        <p className="flex items-center gap-2">
                          <MapPin size={14} aria-hidden="true" />
                          {record.location}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-8 border border-[#E8DCC6] bg-white p-7">
                <p className="text-sm leading-7 text-[#555]">
                  {t(
                    "No complete class record is ready for publication yet. A record will be added after its date, broad place, subject and total attendance are checked.",
                    "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ସମ୍ପୂର୍ଣ୍ଣ ଶ୍ରେଣୀ ରେକର୍ଡ ପ୍ରକାଶ ପାଇଁ ପ୍ରସ୍ତୁତ ନାହିଁ। ତାରିଖ, ସାଧାରଣ ସ୍ଥାନ, ବିଷୟ ଓ ମୋଟ ଉପସ୍ଥିତି ଯାଞ୍ଚ ପରେ ରେକର୍ଡ ଯୋଡ଼ାଯିବ।"
                  )}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {socialUpdate && (
                <a
                  href={socialUpdate.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded bg-[#111111] px-6 py-3 text-sm font-bold text-white"
                >
                  {t(
                    "See the public RTI update",
                    "ସାର୍ବଜନିକ RTI ଅପଡେଟ ଦେଖନ୍ତୁ"
                  )}
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              )}
              <Link
                href="/press-and-media"
                className="inline-flex items-center justify-center gap-2 rounded border border-[#B99455] px-6 py-3 text-sm font-bold text-[#6F4300]"
              >
                {t("Open Press and Media", "ପ୍ରେସ ଓ ମିଡିଆ ଖୋଲନ୍ତୁ")}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
