import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  ExternalLink,
  FileText,
  Landmark,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { ODISHA_OPERATIONS } from "@/data/focusContent";
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

  return (
    <article className="overflow-hidden border border-[#E8DCC6] bg-white">
      {member.imageUrl && (
        <div className="flex h-64 items-center justify-center bg-[#F5EFE3] p-3">
          <img
            src={member.imageUrl}
            alt={`${name}, ${role}`}
            className="h-full w-full object-contain"
          />
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
  const advisors = leadershipMembers.filter(
    (member: any) => member.memberType === "advisor"
  );
  const records = [
    ["CIN", "U87300MH2026NPL471397"],
    ["NGO DARPAN", "MH/2026/1110513"],
    [
      t("Company status", "କମ୍ପାନୀ ସ୍ଥିତି"),
      t("Section 8 not-for-profit company", "ସେକ୍ସନ 8 ଲାଭବିହୀନ କମ୍ପାନୀ"),
    ],
    ["12AB and 80G", t("Applications pending", "ଆବେଦନ ବିଚାରାଧୀନ")],
    [
      t("Foreign contributions", "ବିଦେଶୀ ଅନୁଦାନ"),
      t("Not accepted at present", "ବର୍ତ୍ତମାନ ଗ୍ରହଣ କରାଯାଉ ନାହିଁ"),
    ],
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "Board and Transparency | Abhiara Foundation",
          "ବୋର୍ଡ ଓ ସ୍ୱଚ୍ଛତା | ଅଭିଆରା ଫାଉଣ୍ଡେସନ"
        )}
        description="Board, advisory members, statutory status, child verification, payment controls, safeguarding and grievance information."
        url="https://www.abhiarafoundation.org/board-and-transparency"
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-[#111111] pb-20 pt-32 text-white md:pt-40">
          <div className="container max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F5A623]">
              {t("Governance and public records", "ଶାସନ ଓ ସାର୍ବଜନିକ ରେକର୍ଡ")}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-bold md:text-6xl">
              {t("Board and Transparency", "ବୋର୍ଡ ଓ ସ୍ୱଚ୍ଛତା")}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/75">
              {t(
                "The Board oversees the Foundation. Advisors provide guidance but are listed separately from the Board of Directors.",
                "ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳ ଫାଉଣ୍ଡେସନକୁ ନିରୀକ୍ଷଣ କରେ। ପରାମର୍ଶଦାତାମାନେ ମାର୍ଗଦର୍ଶନ ଦିଅନ୍ତି କିନ୍ତୁ ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳରୁ ଅଲଗା ଭାବେ ଦର୍ଶାଯାନ୍ତି।"
              )}
            </p>
          </div>
        </section>

        <section className="bg-[#FFFDF8] py-16 md:py-24">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="font-serif text-3xl font-bold">
                  {t("Statutory record", "ଆଇନଗତ ରେକର୍ଡ")}
                </h2>
                <dl className="mt-6 divide-y divide-[#E8DCC6] border border-[#E8DCC6] bg-white">
                  {records.map(([key, value]) => (
                    <div
                      key={key}
                      className="grid gap-1 p-5 sm:grid-cols-[160px_1fr]"
                    >
                      <dt className="font-sans text-sm text-[#777]">{key}</dt>
                      <dd className="break-words font-sans text-sm font-semibold text-[#222]">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="space-y-12">
                <section id="board" className="scroll-mt-28">
                  <h2 className="font-serif text-3xl font-bold">
                    {t("Board of Directors", "ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳ")}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#666]">
                    {t(
                      "Only confirmed directors are listed in this section.",
                      "ଏହି ବିଭାଗରେ କେବଳ ନିଶ୍ଚିତ ନିର୍ଦ୍ଦେଶକମାନଙ୍କୁ ଦର୍ଶାଯାଇଛି।"
                    )}
                  </p>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {boardMembers.map((member: any) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        language={language}
                      />
                    ))}
                  </div>
                </section>

                <section id="advisors" className="scroll-mt-28">
                  <h2 className="font-serif text-3xl font-bold">
                    {t("Advisory Members", "ପରାମର୍ଶଦାତା ସଦସ୍ୟ")}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#666]">
                    {t(
                      "Advisors share knowledge and guidance. They are not shown as directors.",
                      "ପରାମର୍ଶଦାତାମାନେ ଜ୍ଞାନ ଓ ମାର୍ଗଦର୍ଶନ ଦିଅନ୍ତି। ସେମାନଙ୍କୁ ନିର୍ଦ୍ଦେଶକ ଭାବେ ଦର୍ଶାଯାଏ ନାହିଁ।"
                    )}
                  </p>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {advisors.map((member: any) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        language={language}
                      />
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="font-serif text-3xl font-bold">
                    {t("Odisha operations", "ଓଡ଼ିଶା ପରିଚାଳନା")}
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {ODISHA_OPERATIONS.map(member => (
                      <article
                        key={member.name}
                        className="border border-[#E8DCC6] bg-white p-6"
                      >
                        <p className="font-serif text-xl font-bold">
                          {member.name}
                        </p>
                        <p className="mt-1 font-sans text-sm text-[#9A6100]">
                          {t(member.roleEn, member.roleOd)}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              {t("How accountability works", "ଜବାବଦେହୀତା କିପରି କାମ କରେ")}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Users,
                  title: t("Student verification", "ଶିଶୁ ଯାଞ୍ଚ"),
                  body: t(
                    "A local team member checks each child’s need before support is approved.",
                    "ସହାୟତା ଅନୁମୋଦନ ପୂର୍ବରୁ ପ୍ରତ୍ୟେକ ଶିଶୁଙ୍କ ଆବଶ୍ୟକତା ଯାଞ୍ଚ କରାଯାଏ।"
                  ),
                },
                {
                  icon: ReceiptText,
                  title: t("Payment records", "ପେମେଣ୍ଟ ରେକର୍ଡ"),
                  body: t(
                    "We use official Foundation payment channels whenever possible and keep the records.",
                    "ସମ୍ଭବ ଥିଲେ ଅଧିକୃତ ଫାଉଣ୍ଡେସନ ପେମେଣ୍ଟ ମାଧ୍ୟମ ବ୍ୟବହାର କରି ରେକର୍ଡ ରଖାଯାଏ।"
                  ),
                },
                {
                  icon: FileText,
                  title: t("Monthly reporting", "ମାସିକ ରିପୋର୍ଟ"),
                  body: t(
                    "Monthly reports share combined progress figures without private child details.",
                    "ବ୍ୟକ୍ତିଗତ ଶିଶୁ ସୂଚନା ବିନା ସାମୂହିକ ଅଗ୍ରଗତି ପ୍ରକାଶ କରାଯାଏ।"
                  ),
                },
                {
                  icon: LockKeyhole,
                  title: t("Child safeguarding", "ଶିଶୁ ସୁରକ୍ଷା"),
                  body: t(
                    "A child photo is used only when guardian consent and a safety review are recorded. Identity and family records remain private.",
                    "ଅଭିଭାବକ ସମ୍ମତି ଓ ସୁରକ୍ଷା ସମୀକ୍ଷା ଥିଲେ ମାତ୍ର ଶିଶୁ ଫଟୋ ବ୍ୟବହାର ହୁଏ। ପରିଚୟ ଓ ପରିବାର ରେକର୍ଡ ଗୋପନ ରହେ।"
                  ),
                },
                {
                  icon: Landmark,
                  title: t("Donation policy", "ଦାନ ନୀତି"),
                  body: t(
                    "One time donations use official accounts or authorised payment channels. Refund requests follow the published policy.",
                    "ଏକକାଳୀନ ଦାନ ଅଧିକୃତ ଖାତା ବା ଅନୁମୋଦିତ ପେମେଣ୍ଟ ମାଧ୍ୟମରେ ହୁଏ। ରିଫଣ୍ଡ ଅନୁରୋଧ ପ୍ରକାଶିତ ନୀତି ଅନୁସାରେ ହୁଏ।"
                  ),
                },
                {
                  icon: ShieldCheck,
                  title: t("Grievance contact", "ଅଭିଯୋଗ ଯୋଗାଯୋଗ"),
                  body: "info@abhiarafoundation.org",
                },
              ].map(item => (
                <article
                  key={item.title}
                  className="border border-gray-200 p-6"
                >
                  <item.icon className="text-[#B56A22]" />
                  <h3 className="mt-5 font-serif text-xl font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-3 break-words font-sans text-sm leading-relaxed text-[#555]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/donation-and-refund-policy"
                className="inline-flex items-center gap-2 rounded bg-[#111111] px-5 py-3 font-sans text-sm font-bold text-white"
              >
                {t("Donation and refund policy", "ଦାନ ଓ ରିଫଣ୍ଡ ନୀତି")}
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 rounded border border-[#111111] px-5 py-3 font-sans text-sm font-bold"
              >
                {t("Privacy policy", "ଗୋପନୀୟତା ନୀତି")}
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
