import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

function MemberCard({
  member,
  language,
}: {
  member: any;
  language: "en" | "od";
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
    <article className="overflow-hidden border border-[#E8DCC6] bg-white">
      {member.imageUrl ? (
        <div className="flex h-72 items-center justify-center bg-[#F5EFE3] p-4">
          <img
            src={member.imageUrl}
            alt={`${name}, ${role}`}
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <div className="flex h-72 items-center justify-center bg-[#F5EFE3]">
          <span className="font-serif text-5xl font-bold text-[#9A6100]">
            {initials}
          </span>
        </div>
      )}
      <div className="p-6">
        <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">{name}</h3>
        <p className="mt-1 font-sans text-sm font-bold text-[#9A6100]">
          {role}
        </p>
        {qualification && (
          <p className="mt-2 font-sans text-xs font-semibold text-[#666]">
            {qualification}
          </p>
        )}
        {bio && (
          <p className="mt-4 font-sans text-sm leading-7 text-[#555]">{bio}</p>
        )}
        {member.profileUrl && (
          <a
            href={member.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8A5700]"
          >
            {language === "od" ? "ସାର୍ବଜନୀନ ପ୍ରୋଫାଇଲ" : "Public profile"}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

function EmptyPeopleMessage({ text }: { text: string }) {
  return (
    <p className="mt-6 border border-[#E8DCC6] bg-white p-6 text-sm text-[#666]">
      {text}
    </p>
  );
}

export default function Governance() {
  const { t, language } = useLanguage();
  const { data: leadershipMembers = [] } =
    trpc.cms.leadership.listPublished.useQuery(undefined, { retry: false });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const boardMembers = leadershipMembers.filter(
    (member: any) => member.memberType === "board"
  );
  const members = leadershipMembers.filter(
    (member: any) => member.memberType === "member"
  );
  const advisors = leadershipMembers.filter(
    (member: any) => member.memberType === "advisor"
  );

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "Board, Members and Advisors | Abhiara Foundation",
          "ବୋର୍ଡ, ସଦସ୍ୟ ଓ ପରାମର୍ଶଦାତା | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description="Confirmed Directors, Members and Advisory Members of Abhiara Foundation."
        url="https://www.abhiarafoundation.org/board-and-transparency"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pt-40">
          <div className="container max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F5A623]">
              {t("Our people", "ଆମ ସଦସ୍ୟ")}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-bold text-white md:text-6xl">
              {t("Board, Members and Advisors", "ବୋର୍ଡ, ସଦସ୍ୟ ଓ ପରାମର୍ଶଦାତା")}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/75">
              {t(
                "Confirmed Directors, Members and Advisory Members are shown in separate groups so every approved Abhiara role remains clear.",
                "ପ୍ରତ୍ୟେକ ଅନୁମୋଦିତ ଅଭିଆରା ଭୂମିକା ସ୍ପଷ୍ଟ ରହିବା ପାଇଁ ନିଶ୍ଚିତ ନିର୍ଦ୍ଦେଶକ, ସଦସ୍ୟ ଓ ପରାମର୍ଶଦାତାଙ୍କୁ ଅଲଗା ଗୋଷ୍ଠୀରେ ଦର୍ଶାଯାଇଛି।"
              )}
            </p>
          </div>
        </section>

        <section className="bg-[#FFFDF8] py-16 md:py-24">
          <div className="container max-w-6xl space-y-16">
            <section id="board" className="scroll-mt-28">
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                {t("Board of Directors", "ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳ")}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#666]">
                {t(
                  "Only confirmed directors are listed in this section.",
                  "ଏହି ବିଭାଗରେ କେବଳ ନିଶ୍ଚିତ ନିର୍ଦ୍ଦେଶକମାନଙ୍କୁ ଦର୍ଶାଯାଇଛି।"
                )}
              </p>
              {boardMembers.length > 0 ? (
                <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {boardMembers.map((member: any) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      language={language}
                    />
                  ))}
                </div>
              ) : (
                <EmptyPeopleMessage
                  text={t(
                    "No Board profiles are published at present.",
                    "ବର୍ତ୍ତମାନ କୌଣସି ବୋର୍ଡ ପ୍ରୋଫାଇଲ ପ୍ରକାଶିତ ହୋଇନାହିଁ।"
                  )}
                />
              )}
            </section>

            <section id="members" className="scroll-mt-28">
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                {t("Members", "ସଦସ୍ୟ")}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#666]">
                {t(
                  "Foundation members who support programme and organisational work are listed separately from Directors and Advisors.",
                  "କାର୍ଯ୍ୟକ୍ରମ ଓ ସଂଗଠନ କାମରେ ସହଯୋଗ କରୁଥିବା ଫାଉଣ୍ଡେସନ ସଦସ୍ୟମାନଙ୍କୁ ନିର୍ଦ୍ଦେଶକ ଓ ପରାମର୍ଶଦାତାଙ୍କଠାରୁ ଅଲଗା ଭାବେ ଦର୍ଶାଯାଇଛି।"
                )}
              </p>
              {members.length > 0 ? (
                <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {members.map((member: any) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      language={language}
                    />
                  ))}
                </div>
              ) : (
                <EmptyPeopleMessage
                  text={t(
                    "No Member profiles are published at present.",
                    "ବର୍ତ୍ତମାନ କୌଣସି ସଦସ୍ୟ ପ୍ରୋଫାଇଲ ପ୍ରକାଶିତ ହୋଇନାହିଁ।"
                  )}
                />
              )}
            </section>

            <section id="advisors" className="scroll-mt-28">
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                {t("Advisory Members", "ପରାମର୍ଶଦାତା ସଦସ୍ୟ")}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#666]">
                {t(
                  "Advisors provide professional or programme guidance. They are not listed as directors.",
                  "ପରାମର୍ଶଦାତାମାନେ ପେଶାଗତ କିମ୍ବା କାର୍ଯ୍ୟକ୍ରମ ମାର୍ଗଦର୍ଶନ ଦିଅନ୍ତି। ସେମାନଙ୍କୁ ନିର୍ଦ୍ଦେଶକ ଭାବେ ଦର୍ଶାଯାଏ ନାହିଁ।"
                )}
              </p>
              {advisors.length > 0 ? (
                <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {advisors.map((member: any) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      language={language}
                    />
                  ))}
                </div>
              ) : (
                <EmptyPeopleMessage
                  text={t(
                    "No advisory profiles are published at present.",
                    "ବର୍ତ୍ତମାନ କୌଣସି ପରାମର୍ଶଦାତା ପ୍ରୋଫାଇଲ ପ୍ରକାଶିତ ହୋଇନାହିଁ।"
                  )}
                />
              )}
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
