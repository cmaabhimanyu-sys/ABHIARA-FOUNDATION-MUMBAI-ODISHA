import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { groupPublishedPeople, PEOPLE_SECTIONS } from "@/data/peopleSections";
import { peoplePortraitFraming } from "@/data/peoplePortraitFraming";
import { trpc } from "@/lib/trpc";

const publicStatuses = [
  {
    labelEn: "Section 8 company",
    labelOd: "ଧାରା ୮ କମ୍ପାନୀ",
    statusEn: "Registered; CIN U87300MH2026NPL471397",
    statusOd: "ପଞ୍ଜୀକୃତ; CIN U87300MH2026NPL471397",
  },
  {
    labelEn: "NGO DARPAN",
    labelOd: "NGO ଦର୍ପଣ",
    statusEn: "Public reference: MH/2026/1110513",
    statusOd: "ସାର୍ବଜନିକ ସନ୍ଦର୍ଭ: MH/2026/1110513",
  },
  {
    labelEn: "12AB",
    labelOd: "12AB",
    statusEn: "Application pending; approval is not claimed",
    statusOd: "ଆବେଦନ ବିଚାରାଧୀନ; ଅନୁମୋଦନ ଦାବି କରାଯାଉ ନାହିଁ",
  },
  {
    labelEn: "80G",
    labelOd: "80G",
    statusEn:
      "Application pending; donations do not qualify for an 80G deduction",
    statusOd: "ଆବେଦନ ବିଚାରାଧୀନ; ବର୍ତ୍ତମାନର ଦାନରେ 80G କର ରିହାତି ମିଳେ ନାହିଁ",
  },
  {
    labelEn: "CSR-1",
    labelOd: "CSR-1",
    statusEn:
      "No document-backed status published; registration or eligibility is not claimed",
    statusOd:
      "ଦଲିଲ ଆଧାରିତ ସ୍ଥିତି ପ୍ରକାଶିତ ନାହିଁ; ପଞ୍ଜୀକରଣ ବା ଯୋଗ୍ୟତା ଦାବି କରାଯାଉ ନାହିଁ",
  },
] as const;

const supportSteps = [
  ["Request or referral", "ଅନୁରୋଧ ବା ସୁପାରିଶ"],
  ["Ground verification", "କ୍ଷେତ୍ର ଯାଞ୍ଚ"],
  ["Need and capacity review", "ଆବଶ୍ୟକତା ଓ କ୍ଷମତା ସମୀକ୍ଷା"],
  ["Recorded approval", "ଲିପିବଦ୍ଧ ଅନୁମୋଦନ"],
  ["Traceable payment or support", "ହିସାବଯୋଗ୍ୟ ଦେୟ ବା ସହାୟତା"],
  ["Follow-up", "ପରବର୍ତ୍ତୀ ଖବର ନେବା"],
] as const;

const publicLinks = [
  { href: "/monthly-reports", en: "Monthly reports", od: "ମାସିକ ରିପୋର୍ଟ" },
  {
    href: "/privacy",
    en: "Privacy and safeguarding",
    od: "ଗୋପନୀୟତା ଓ ସୁରକ୍ଷା",
  },
  {
    href: "/donation-and-refund-policy",
    en: "Donation and refund policy",
    od: "ଦାନ ଓ ଫେରସ୍ତ ନୀତି",
  },
  { href: "/terms", en: "Terms", od: "ନିୟମ" },
  {
    href: "/contact",
    en: "Ask a question or report a concern",
    od: "ପ୍ରଶ୍ନ କରନ୍ତୁ ବା ଅଭିଯୋଗ ଜଣାନ୍ତୁ",
  },
] as const;

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
  const initials =
    member.memberType === "auditor"
      ? "RBR"
      : String(name)
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map(part => part[0]?.toUpperCase())
          .join("");

  return (
    <article className="flex h-full min-h-[370px] flex-col bg-white px-6 pb-7 pt-8 text-center shadow-[0_14px_38px_rgba(58,42,21,0.09)] transition-transform duration-200 ease-out hover:-translate-y-1">
      <div className="mx-auto flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F5EFE3] ring-4 ring-white outline outline-1 outline-[#E5D8C2] md:h-44 md:w-44">
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={name}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover ${peoplePortraitFraming(member)}`}
          />
        ) : (
          <span
            className="font-serif text-3xl font-bold text-[#9A6100]"
            aria-hidden="true"
          >
            {initials}
          </span>
        )}
      </div>
      <div className="mt-7 flex flex-1 flex-col">
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "Leadership, Governance & Transparency | Abhiara Foundation",
          "ନେତୃତ୍ୱ, ଶାସନ ଓ ସ୍ୱଚ୍ଛତା | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description={t(
          "Meet the Board, independent auditor, advisors and members. Read Abhiara Foundation's published registration status and reporting information.",
          "ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳୀ, ସ୍ୱାଧୀନ ଲେଖାପରୀକ୍ଷକ, ପରାମର୍ଶଦାତା ଓ ସଦସ୍ୟମାନଙ୍କୁ ଜାଣନ୍ତୁ। ପଞ୍ଜୀକରଣ ଓ ରିପୋର୍ଟ ସମ୍ପର୍କିତ ସାର୍ବଜନିକ ସୂଚନା ପଢ଼ନ୍ତୁ।"
        )}
        url="https://www.abhiarafoundation.org/board-and-transparency"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pb-16 pt-32 text-white md:pt-40">
          <div className="container max-w-5xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F5A623]">
              {t("People and public information", "ଲୋକମାନେ ଓ ସାର୍ବଜନିକ ସୂଚନା")}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-bold text-white md:text-6xl">
              {t(
                "Leadership, Governance & Transparency",
                "ନେତୃତ୍ୱ, ଶାସନ ଓ ସ୍ୱଚ୍ଛତା"
              )}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/80">
              {t(
                "The Board of Directors provides statutory oversight. The statutory auditor serves independently. Advisors, Odisha Division leaders and Core Members support the Foundation's work. Our public reporting and policy information is below.",
                "ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳୀ ଆଇନଗତ ତଦାରଖ କରେ। ବୈଧାନିକ ଲେଖାପରୀକ୍ଷକ ସ୍ୱାଧୀନ ଭାବେ କାର୍ଯ୍ୟ କରନ୍ତି। ପରାମର୍ଶଦାତା, ଓଡ଼ିଶା ବିଭାଗର ନେତୃତ୍ୱ ଓ ମୁଖ୍ୟ ସଦସ୍ୟମାନେ ଫାଉଣ୍ଡେସନର କାର୍ଯ୍ୟରେ ସହଯୋଗ କରନ୍ତି। ସାର୍ବଜନିକ ରିପୋର୍ଟ ଓ ନୀତି ସୂଚନା ତଳେ ଅଛି।"
              )}
            </p>
            <p className="mt-5 text-sm text-white/65">
              {t(
                "Page reviewed: 4 October 2026. This is the website review date, not a verification date for legal certificates.",
                "ପୃଷ୍ଠା ସମୀକ୍ଷା: ୪ ଅକ୍ଟୋବର ୨୦୨୬। ଏହା ୱେବସାଇଟ ସମୀକ୍ଷା ତାରିଖ, ଆଇନଗତ ପ୍ରମାଣପତ୍ର ଯାଞ୍ଚ ତାରିଖ ନୁହେଁ।"
              )}
            </p>
            <nav
              aria-label={t("On this page", "ଏହି ପୃଷ୍ଠାରେ")}
              className="mt-8 flex flex-wrap gap-2"
            >
              {PEOPLE_SECTIONS.map(section => (
                <a
                  key={section.type}
                  href={`#people-${section.type}`}
                  className="rounded-full border border-white/35 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                >
                  {language === "od" ? section.titleOd : section.titleEn}
                </a>
              ))}
              <a
                href="#disclosures"
                className="rounded-full border border-[#F5A623] bg-[#F5A623]/15 px-4 py-2 text-sm font-bold text-white hover:bg-[#F5A623]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {t("Disclosures", "ସାର୍ବଜନିକ ସୂଚନା")}
              </a>
            </nav>
          </div>
        </section>

        <div id="people" className="bg-[#FFFDF8] py-16 md:py-24">
          <div className="container max-w-6xl space-y-16 md:space-y-20">
            {sections.length > 0 ? (
              sections.map(section => (
                <section
                  key={section.type}
                  id={`people-${section.type}`}
                  aria-labelledby={`people-${section.type}-heading`}
                  className="scroll-mt-28"
                >
                  <div className="mb-7 flex items-center gap-4 border-b border-[#E8DCC6] pb-4">
                    <h2
                      id={`people-${section.type}-heading`}
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

        <section
          id="disclosures"
          className="scroll-mt-28 border-t border-[#E8DCC6] bg-white py-16 md:py-24"
          aria-labelledby="disclosures-title"
        >
          <div className="container max-w-5xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9A6100]">
              {t("Public accountability", "ସାର୍ବଜନିକ ଜବାବଦେହୀତା")}
            </p>
            <h2
              id="disclosures-title"
              className="mt-3 font-serif text-3xl font-bold text-[#1A1A1A] md:text-4xl"
            >
              {t("Registration and reporting", "ପଞ୍ଜୀକରଣ ଓ ରିପୋର୍ଟ")}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#555]">
              {t(
                "These are the statuses currently described on our website. We publish an approval or a dated financial figure only after checking the underlying record. Contact us if you need a copy of an available public document.",
                "ଏଗୁଡ଼ିକ ଆମ ୱେବସାଇଟରେ ବର୍ତ୍ତମାନ ଦିଆଯାଇଥିବା ସ୍ଥିତି। ମୂଳ ରେକର୍ଡ ଯାଞ୍ଚ ପରେ ମାତ୍ର ଅନୁମୋଦନ ବା ତାରିଖ ସହ ଆର୍ଥିକ ରାଶି ପ୍ରକାଶ କରୁ। ଉପଲବ୍ଧ ସାର୍ବଜନିକ ଦଲିଲର ନକଲ ଦରକାର ହେଲେ ଯୋଗାଯୋଗ କରନ୍ତୁ।"
              )}
            </p>
            <div className="mt-8 overflow-x-auto rounded-xl border border-[#E8DCC6]">
              <table className="w-full min-w-[540px] border-collapse text-left text-sm">
                <thead className="bg-[#FAF4E8] text-[#1A1A1A]">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold">
                      {t("Item", "ବିଷୟ")}
                    </th>
                    <th scope="col" className="px-5 py-4 font-bold">
                      {t("Public status", "ସାର୍ବଜନିକ ସ୍ଥିତି")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {publicStatuses.map(item => (
                    <tr
                      key={item.labelEn}
                      className="border-t border-[#EEE3D0]"
                    >
                      <th
                        scope="row"
                        className="px-5 py-4 font-semibold text-[#333]"
                      >
                        {t(item.labelEn, item.labelOd)}
                      </th>
                      <td className="px-5 py-4 leading-6 text-[#555]">
                        {t(item.statusEn, item.statusOd)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#555]">
              {t(
                "Registered office: Mumbai, Maharashtra. A full office address, incorporation date and Section 8 licence details are not shown here without a checked public record. Fynd Foundation's support for education in Odisha is institutional support; we do not describe it as CSR expenditure or CSR implementation.",
                "ପଞ୍ଜୀକୃତ କାର୍ଯ୍ୟାଳୟ: ମୁମ୍ବାଇ, ମହାରାଷ୍ଟ୍ର। ଯାଞ୍ଚ ହୋଇଥିବା ସାର୍ବଜନିକ ରେକର୍ଡ ବିନା ସମ୍ପୂର୍ଣ୍ଣ ଠିକଣା, ନିଗମନ ତାରିଖ ଓ ଧାରା ୮ ଲାଇସେନ୍ସ ବିବରଣୀ ଏଠାରେ ଦିଆଯାଇନାହିଁ। ଓଡ଼ିଶାର ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ ପାଇଁ Fynd Foundation ର ସହାୟତା ଏକ ସଂସ୍ଥାଗତ ସହାୟତା; ଏହାକୁ CSR ଖର୍ଚ୍ଚ ବା CSR କାର୍ଯ୍ୟାନ୍ୱୟନ ବୋଲି ଦର୍ଶାଉ ନାହୁଁ।"
              )}
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <article className="border border-[#E8DCC6] bg-[#FFFDF8] p-7">
                <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                  {t("Financial reporting", "ଆର୍ଥିକ ରିପୋର୍ଟ")}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#555]">
                  {t(
                    "No reconciled monthly financial summary or audited annual accounts have been published on this website yet. Programme updates and photographs are not financial statements. Monthly figures can be released after the records are reconciled; audited accounts will be labelled separately when available.",
                    "ଏହି ୱେବସାଇଟରେ ଏପର୍ଯ୍ୟନ୍ତ ମେଳ ହୋଇଥିବା ମାସିକ ଆର୍ଥିକ ସାରାଂଶ ବା ଅଡିଟ ହୋଇଥିବା ବାର୍ଷିକ ହିସାବ ପ୍ରକାଶିତ ହୋଇନାହିଁ। କାର୍ଯ୍ୟକ୍ରମ ଅପଡେଟ ଓ ଫଟୋ ଆର୍ଥିକ ବିବରଣୀ ନୁହେଁ। ରେକର୍ଡ ମେଳ ପରେ ମାସିକ ରାଶି ପ୍ରକାଶ କରାଯାଇପାରେ; ବାର୍ଷିକ ଅଡିଟ ହିସାବ ଉପଲବ୍ଧ ହେଲେ ଅଲଗା ଭାବେ ଦର୍ଶାଯିବ।"
                  )}
                </p>
                <Link
                  href="/monthly-reports"
                  className="mt-5 inline-block text-sm font-bold text-[#8A5700] underline underline-offset-4"
                >
                  {t(
                    "View programme and reporting updates",
                    "କାର୍ଯ୍ୟକ୍ରମ ଓ ରିପୋର୍ଟ ଅପଡେଟ ଦେଖନ୍ତୁ"
                  )}
                </Link>
              </article>
              <article className="border border-[#E8DCC6] bg-[#FFFDF8] p-7">
                <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                  {t("How support is decided", "ସହାୟତା କିପରି ନିଷ୍ପତ୍ତି ହୁଏ")}
                </h3>
                <ol className="mt-4 list-inside list-decimal space-y-2 text-sm leading-7 text-[#555]">
                  {supportSteps.map(([en, od]) => (
                    <li key={en}>{t(en, od)}</li>
                  ))}
                </ol>
                <p className="mt-4 text-sm leading-7 text-[#555]">
                  {t(
                    "Support depends on verified need, available funds and an approved programme budget. We do not publish private case papers or individual donor details.",
                    "ସହାୟତା ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା, ଉପଲବ୍ଧ ଅର୍ଥ ଓ ଅନୁମୋଦିତ କାର୍ଯ୍ୟକ୍ରମ ବଜେଟ ଉପରେ ନିର୍ଭର କରେ। ବ୍ୟକ୍ତିଗତ ମାମଲା କାଗଜ ବା ଦାତାଙ୍କ ବ୍ୟକ୍ତିଗତ ସୂଚନା ଆମେ ପ୍ରକାଶ କରୁ ନାହୁଁ।"
                  )}
                </p>
              </article>
            </div>
            <h3 className="mt-12 font-serif text-2xl font-bold text-[#1A1A1A]">
              {t("Reports, policies and concerns", "ରିପୋର୍ଟ, ନୀତି ଓ ଅଭିଯୋଗ")}
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {publicLinks.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-[#D8C7A5] bg-white px-4 py-3 text-sm font-semibold text-[#60401C] hover:bg-[#FAF4E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A6100]"
                >
                  {t(item.en, item.od)}
                </Link>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[#555]">
              {t(
                "Please use the contact page to ask for a correction or raise a concern. We will not publish personal case records in response.",
                "କୌଣସି ସଂଶୋଧନ ପାଇଁ ଅନୁରୋଧ ବା ଅଭିଯୋଗ ଜଣାଇବାକୁ ଯୋଗାଯୋଗ ପୃଷ୍ଠା ବ୍ୟବହାର କରନ୍ତୁ। ଏହାର ଉତ୍ତରରେ ବ୍ୟକ୍ତିଗତ ମାମଲା ରେକର୍ଡ ପ୍ରକାଶ କରିବୁ ନାହିଁ।"
              )}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
