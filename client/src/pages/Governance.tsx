import { useEffect } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
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
        <div className="aspect-[4/5] overflow-hidden bg-[#F5EFE3]">
          <img
            src={member.imageUrl}
            alt={`${name}, ${role}`}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[4/5] items-center justify-center bg-[#F5EFE3]">
          <span className="font-serif text-5xl font-bold text-[#9A6100]">
            {initials}
          </span>
        </div>
      )}
      <div className="p-6">
        <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">{name}</h2>
        <p className="mt-1 font-sans text-sm font-bold text-[#9A6100]">
          {role}
        </p>
        {(qualification || bio || member.profileUrl) && (
          <details className="group mt-5 border-t border-[#E8DCC6] pt-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-sans text-sm font-bold text-[#8A5700] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]">
              <span className="group-open:hidden">
                {language === "od" ? "ବିବରଣୀ ଦେଖନ୍ତୁ" : "View details"}
              </span>
              <span className="hidden group-open:inline">
                {language === "od" ? "ବିବରଣୀ ବନ୍ଦ କରନ୍ତୁ" : "Close details"}
              </span>
              <ChevronDown
                size={17}
                aria-hidden="true"
                className="shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="pb-1 pt-2">
              {qualification && (
                <p className="font-sans text-xs font-semibold text-[#666]">
                  {qualification}
                </p>
              )}
              {bio && (
                <p className="mt-3 font-sans text-sm leading-7 text-[#555]">
                  {bio}
                </p>
              )}
              {member.profileUrl && (
                <a
                  href={member.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#8A5700]"
                >
                  {language === "od" ? "ସାର୍ବଜନୀନ ପ୍ରୋଫାଇଲ" : "Public profile"}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </details>
        )}
      </div>
    </article>
  );
}

export default function Governance() {
  const { t, language } = useLanguage();
  const { data: leadershipMembers = [] } =
    trpc.cms.leadership.listPublished.useQuery(undefined, { retry: false });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t("People of Abhiara Foundation", "ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଲୋକମାନେ")}
        description={t(
          "Public profiles of people associated with Abhiara Foundation, shown in one clear sequence.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସହ ଜଡିତ ଲୋକମାନଙ୍କ ସାର୍ବଜନୀନ ପ୍ରୋଫାଇଲ ଗୋଟିଏ ସ୍ପଷ୍ଟ କ୍ରମରେ ଦର୍ଶାଯାଇଛି।"
        )}
        url="https://www.abhiarafoundation.org/board-and-transparency"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pt-40">
          <div className="container max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F5A623]">
              {t("Our people", "ଆମ ଲୋକମାନେ")}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-bold text-white md:text-6xl">
              {t("People of Abhiara Foundation", "ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଲୋକମାନେ")}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/75">
              {t(
                "Everyone associated with Abhiara Foundation is shown together in one sequence with their current role and public profile details.",
                "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସହ ଜଡିତ ସମସ୍ତ ପ୍ରକାଶିତ ବ୍ୟକ୍ତିଙ୍କୁ ସେମାନଙ୍କର ବର୍ତ୍ତମାନ ଭୂମିକା ଓ ସାର୍ବଜନୀନ ପ୍ରୋଫାଇଲ ବିବରଣୀ ସହ ଗୋଟିଏ କ୍ରମରେ ଦର୍ଶାଯାଇଛି।"
              )}
            </p>
          </div>
        </section>

        <section
          id="people"
          className="scroll-mt-28 bg-[#FFFDF8] py-16 md:py-24"
        >
          <div className="container max-w-6xl">
            <div className="max-w-3xl">
              <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] md:text-4xl">
                {t("People associated with Abhiara", "ଅଭିଆରା ସହ ଜଡିତ ଲୋକମାନେ")}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#666]">
                {t(
                  "Each profile shows the person’s current public role. Open the details to read more.",
                  "ପ୍ରତ୍ୟେକ ପ୍ରୋଫାଇଲରେ ବ୍ୟକ୍ତିଙ୍କ ବର୍ତ୍ତମାନ ସାର୍ବଜନୀନ ଭୂମିକା ଦିଆଯାଇଛି। ଅଧିକ ପଢ଼ିବା ପାଇଁ ବିବରଣୀ ଖୋଲନ୍ତୁ।"
                )}
              </p>
            </div>

            {leadershipMembers.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {leadershipMembers.map((member: any) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    language={language}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-8 border border-[#E8DCC6] bg-white p-6 text-sm text-[#666]">
                {t(
                  "No people profiles are published at present.",
                  "ବର୍ତ୍ତମାନ କୌଣସି ବ୍ୟକ୍ତିଙ୍କ ପ୍ରୋଫାଇଲ ପ୍ରକାଶିତ ହୋଇନାହିଁ।"
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
