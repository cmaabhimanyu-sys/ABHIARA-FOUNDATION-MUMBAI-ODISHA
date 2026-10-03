import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { groupPublishedPeople } from "@/data/peopleSections";
import { trpc } from "@/lib/trpc";

function MemberCard({
  member,
  language,
  number,
}: {
  member: any;
  language: "en" | "od";
  number: number;
}) {
  const name =
    language === "od" ? member.nameOd || member.nameEn : member.nameEn;
  const role =
    language === "od" ? member.roleOd || member.roleEn : member.roleEn;
  const qualification =
    language === "od"
      ? member.qualificationOd || member.qualificationEn
      : member.qualificationEn;
  const bio = language === "od" ? member.bioOd || member.bioEn : member.bioEn;
  const initials = String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join("");

  return (
    <article className="flex h-full min-h-[390px] flex-col bg-white px-6 pb-7 pt-8 text-center shadow-[0_14px_38px_rgba(58,42,21,0.09)] transition-transform duration-200 ease-out hover:-translate-y-1">
      <div className="mx-auto flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F5EFE3] ring-4 ring-white outline outline-1 outline-[#E5D8C2] md:h-44 md:w-44">
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={name}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover ${member.id === 1 ? "scale-[2] object-[center_25%] origin-[50%_25%]" : "object-center"}`}
          />
        ) : (
          <span className="font-serif text-4xl font-bold text-[#9A6100]">
            {initials}
          </span>
        )}
      </div>
      <div className="mt-7 flex flex-1 flex-col">
        <p className="mb-2 font-mono text-xs text-[#8A5700]">
          {String(number).padStart(2, "0")}
        </p>
        <h3 className="font-sans text-lg font-extrabold leading-snug text-[#B04A2B]">
          {name}
        </h3>
        <p className="mt-2 font-sans text-sm font-semibold leading-6 text-[#333]">
          {role}
        </p>
        {qualification && (
          <p className="mt-1 font-sans text-sm leading-6 text-[#555]">
            {qualification}
          </p>
        )}
        {member.bioIsPublic && bio && (
          <p className="mt-4 border-t border-[#E8DCC6] pt-4 font-sans text-sm leading-6 text-[#555]">
            {bio}
          </p>
        )}
        {member.profileUrl && (
          <a
            href={member.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 pt-4 text-sm font-bold text-[#8A5700] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
          >
            {language === "od" ? "ସାର୍ବଜନୀନ ପ୍ରୋଫାଇଲ" : "Public profile"}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

export default function Governance() {
  const { t, language } = useLanguage();
  const { data: leadershipMembers = [] } =
    trpc.cms.leadership.listPublished.useQuery(undefined, { retry: false });
  const sections = groupPublishedPeople(leadershipMembers);
  let displayed = 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "Board, Members & Advisors",
          "ନିର୍ଦ୍ଦେଶକ, ସଦସ୍ୟ ଓ ପରାମର୍ଶଦାତା"
        )}
        description={t(
          "Meet the Board of Directors, independent statutory auditor, advisors, Odisha Division leaders and Core Members of Abhiara Foundation.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନର ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳୀ, ସ୍ୱାଧୀନ ବୈଧାନିକ ଲେଖାପରୀକ୍ଷକ, ପରାମର୍ଶଦାତା, ଓଡ଼ିଶା ବିଭାଗର ନେତୃତ୍ୱ ଓ ମୁଖ୍ୟ ସଦସ୍ୟମାନଙ୍କୁ ଜାଣନ୍ତୁ।"
        )}
        url="https://www.abhiarafoundation.org/board-and-transparency"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pt-40">
          <div className="container max-w-5xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F5A623]">
              {t("People of Abhiara Foundation", "ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଲୋକମାନେ")}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-bold text-white md:text-6xl">
              {t(
                "Board, Members & Advisors",
                "ନିର୍ଦ୍ଦେଶକ, ସଦସ୍ୟ ଓ ପରାମର୍ଶଦାତା"
              )}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/80">
              {t(
                "The Board of Directors provides statutory oversight. The statutory auditor serves independently. Advisors, Odisha Division leaders and Core Members support the Foundation’s mission and operations.",
                "ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳୀ ଆଇନଗତ ତଦାରଖ କରେ। ବୈଧାନିକ ଲେଖାପରୀକ୍ଷକ ସ୍ୱାଧୀନ ଭାବେ କାର୍ଯ୍ୟ କରନ୍ତି। ପରାମର୍ଶଦାତା, ଓଡ଼ିଶା ବିଭାଗର ନେତୃତ୍ୱ ଓ ମୁଖ୍ୟ ସଦସ୍ୟମାନେ ଫାଉଣ୍ଡେସନର ଉଦ୍ଦେଶ୍ୟ ଓ କାର୍ଯ୍ୟରେ ସହଯୋଗ କରନ୍ତି।"
              )}
            </p>
          </div>
        </section>

        <div id="people" className="scroll-mt-28 bg-[#FFFDF8] py-16 md:py-24">
          <div className="container max-w-6xl space-y-16 md:space-y-20">
            {sections.length > 0 ? (
              sections.map(section => (
                <section
                  key={section.type}
                  aria-labelledby={`people-${section.type}`}
                >
                  <div className="mb-7 flex items-center gap-4 border-b border-[#E8DCC6] pb-4">
                    <h2
                      id={`people-${section.type}`}
                      className="font-serif text-2xl font-bold text-[#1A1A1A] md:text-3xl"
                    >
                      {language === "od" ? section.titleOd : section.titleEn}
                    </h2>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {section.members.map(member => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        language={language}
                        number={++displayed}
                      />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <p className="border border-[#E8DCC6] bg-white p-6 text-sm text-[#666]">
                {t(
                  "No people profiles are published at present.",
                  "ବର୍ତ୍ତମାନ କୌଣସି ବ୍ୟକ୍ତିଙ୍କ ପ୍ରୋଫାଇଲ ପ୍ରକାଶିତ ହୋଇନାହିଁ।"
                )}
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
