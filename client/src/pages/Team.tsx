import { useEffect, type ComponentType } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  HandHeart,
  Linkedin,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

type LocalText = {
  en: string;
  od: string;
};

type PersonProfile = {
  initials: string;
  name: LocalText;
  role: LocalText;
  qualification?: LocalText;
  photo?: string;
  photoAlt?: LocalText;
  bio: LocalText;
  responsibilities?: LocalText[];
  profileUrl?: string;
};

type HierarchyLevel = {
  icon: ComponentType<{ size?: number; className?: string }>;
  level: LocalText;
  title: LocalText;
  body: LocalText;
  scope: LocalText;
};

const BOARD_MEMBERS: PersonProfile[] = [
  {
    initials: "AM",
    name: {
      en: "Abhimanyu Mallik",
      od: "ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ",
    },
    role: {
      en: "Founder and Director",
      od: "ପ୍ରତିଷ୍ଠାତା ଓ ନିର୍ଦ୍ଦେଶକ",
    },
    qualification: {
      en: "Cost and Management Accountant",
      od: "କଷ୍ଟ ଏବଂ ମ୍ୟାନେଜମେଣ୍ଟ ଆକାଉଣ୍ଟାଣ୍ଟ",
    },
    photo: "/images/team-abhimanyu-mallik.png",
    photoAlt: {
      en: "Abhimanyu Mallik, Founder and Director of Abhiara Foundation",
      od: "ଅଭିଆରା ଫାଉଣ୍ଡେସନର ପ୍ରତିଷ୍ଠାତା ଓ ନିର୍ଦ୍ଦେଶକ ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ",
    },
    bio: {
      en: "Abhimanyu looks after finance, statutory compliance, programme planning and public reporting. He works to keep decisions, records and use of funds clear and accountable.",
      od: "ଅଭିମନ୍ୟୁ ଆର୍ଥିକ ପରିଚାଳନା, ଆଇନଗତ ଅନୁପାଳନ, କାର୍ଯ୍ୟକ୍ରମ ଯୋଜନା ଓ ସାର୍ବଜନୀନ ରିପୋର୍ଟିଂ ଦେଖନ୍ତି। ନିଷ୍ପତ୍ତି, ରେକର୍ଡ ଓ ଅର୍ଥ ବ୍ୟବହାର ସ୍ପଷ୍ଟ ଓ ଦାୟିତ୍ୱପୂର୍ଣ୍ଣ ରହିବାକୁ ସେ କାମ କରନ୍ତି।",
    },
    responsibilities: [
      { en: "Finance and compliance", od: "ଆର୍ଥିକ ପରିଚାଳନା ଓ ଅନୁପାଳନ" },
      { en: "Programme planning", od: "କାର୍ଯ୍ୟକ୍ରମ ଯୋଜନା" },
      { en: "Public reporting", od: "ସାର୍ବଜନୀନ ରିପୋର୍ଟିଂ" },
    ],
    profileUrl: "https://www.linkedin.com/in/abhimanyu-mallik/",
  },
  {
    initials: "BM",
    name: {
      en: "Biswajita Mallik",
      od: "ବିଶ୍ୱଜିତା ମଲ୍ଲିକ",
    },
    role: {
      en: "Director",
      od: "ନିର୍ଦ୍ଦେଶକ",
    },
    qualification: {
      en: "MBA in Human Resource",
      od: "ମାନବ ସମ୍ବଳରେ MBA",
    },
    bio: {
      en: "Biswajita supports community relations, family programme coordination and regular follow up with field teams. Her work helps the Foundation stay connected with the people it serves.",
      od: "ବିଶ୍ୱଜିତା ସମୁଦାୟ ସମ୍ପର୍କ, ପରିବାର ସହାୟତା କାର୍ଯ୍ୟକ୍ରମ ଓ କ୍ଷେତ୍ର ଦଳ ସହ ନିୟମିତ ସମନ୍ୱୟରେ ସାହାଯ୍ୟ କରନ୍ତି। ତାଙ୍କ କାମ ଫାଉଣ୍ଡେସନକୁ ଲୋକମାନଙ୍କ ସହ ଯୋଡ଼ି ରଖେ।",
    },
    responsibilities: [
      { en: "Community relations", od: "ସମୁଦାୟ ସମ୍ପର୍କ" },
      { en: "Family programme coordination", od: "ପରିବାର ସହାୟତା ସମନ୍ୱୟ" },
      { en: "Field follow up", od: "କ୍ଷେତ୍ର କାମର ଅନୁସରଣ" },
    ],
  },
];

const ADVISORS: PersonProfile[] = [
  {
    initials: "AJ",
    name: { en: "Amit Kumar Jena", od: "ଅମିତ କୁମାର ଜେନା" },
    role: {
      en: "Founding Patron and Strategic Advisor",
      od: "ପ୍ରତିଷ୍ଠାକାଳୀନ ପୃଷ୍ଠପୋଷକ ଓ ରଣନୀତିକ ପରାମର୍ଶଦାତା",
    },
    photo: "/images/team-amit-kumar-jena.jpeg",
    photoAlt: {
      en: "Amit Kumar Jena, Founding Patron and Strategic Advisor",
      od: "ଅମିତ କୁମାର ଜେନା, ପ୍ରତିଷ୍ଠାକାଳୀନ ପୃଷ୍ଠପୋଷକ ଓ ରଣନୀତିକ ପରାମର୍ଶଦାତା",
    },
    bio: {
      en: "Amit supports the Foundation with strategic guidance and helps the team review priorities, partnerships and future direction.",
      od: "ଅମିତ ଫାଉଣ୍ଡେସନକୁ ରଣନୀତିକ ମାର୍ଗଦର୍ଶନ ଦିଅନ୍ତି ଏବଂ ପ୍ରାଥମିକତା, ସହଭାଗିତା ଓ ଭବିଷ୍ୟତ ଦିଗର ସମୀକ୍ଷାରେ ଦଳକୁ ସହଯୋଗ କରନ୍ତି।",
    },
  },
  {
    initials: "SS",
    name: { en: "Sujit Sahu", od: "ସୁଜିତ ସାହୁ" },
    role: { en: "Legal Advisor", od: "ଆଇନ ପରାମର୍ଶଦାତା" },
    qualification: { en: "LLB, MBA", od: "LLB, MBA" },
    photo: "/images/team-advocate-sujit-sahu.png",
    photoAlt: { en: "Sujit Sahu", od: "ସୁଜିତ ସାହୁ" },
    bio: {
      en: "Sujit supports the Foundation on legal matters, compliance and governance.",
      od: "ସୁଜିତ ଫାଉଣ୍ଡେସନକୁ ଆଇନଗତ ବିଷୟ, ଅନୁପାଳନ ଓ ପରିଚାଳନାରେ ପରାମର୍ଶ ଦିଅନ୍ତି।",
    },
  },
  {
    initials: "SJ",
    name: { en: "Sagar Jena", od: "ସାଗର ଜେନା" },
    role: { en: "Education Advisor", od: "ଶିକ୍ଷା ପରାମର୍ଶଦାତା" },
    qualification: {
      en: "Ama Chatasali and rights work",
      od: "ଆମ ଚାଟଶାଳୀ ଓ ଅଧିକାର କାର୍ଯ୍ୟ",
    },
    photo: "/images/team-sagar-jena.png",
    photoAlt: { en: "Sagar Jena", od: "ସାଗର ଜେନା" },
    bio: {
      en: "Sagar shares practical guidance from village level education work and helps the team understand local learning needs.",
      od: "ସାଗର ଗ୍ରାମ ସ୍ତରର ଶିକ୍ଷା କାମରୁ ବ୍ୟବହାରିକ ପରାମର୍ଶ ଦିଅନ୍ତି ଓ ସ୍ଥାନୀୟ ଶିକ୍ଷା ଆବଶ୍ୟକତା ବୁଝିବାରେ ଦଳକୁ ସାହାଯ୍ୟ କରନ୍ତି।",
    },
  },
  {
    initials: "BP",
    name: { en: "Bharat Panigrahy", od: "ଭରତ ପାଣିଗ୍ରାହୀ" },
    role: {
      en: "CSR and Compliance Advisor",
      od: "CSR ଓ ଅନୁପାଳନ ପରାମର୍ଶଦାତା",
    },
    qualification: { en: "XLRI, HR professional", od: "XLRI, HR ପେଶାଜୀବୀ" },
    photo: "/images/team-bharat-panigrahy.png",
    photoAlt: { en: "Bharat Panigrahy", od: "ଭରତ ପାଣିଗ୍ରାହୀ" },
    bio: {
      en: "Bharat advises the Foundation on responsible systems, CSR readiness and organisational compliance.",
      od: "ଭରତ ଦାୟିତ୍ୱପୂର୍ଣ୍ଣ ବ୍ୟବସ୍ଥା, CSR ପ୍ରସ୍ତୁତି ଓ ସଂଗଠନୀୟ ଅନୁପାଳନ ବିଷୟରେ ପରାମର୍ଶ ଦିଅନ୍ତି।",
    },
  },
];

const GROUND_TEAM: PersonProfile[] = [
  {
    initials: "RM",
    name: { en: "Rajkumar Mallik", od: "ରାଜକୁମାର ମଲ୍ଲିକ" },
    role: { en: "Core Team Member", od: "ମୁଖ୍ୟ ଦଳ ସଦସ୍ୟ" },
    bio: {
      en: "Supports community service and education activities.",
      od: "ସମୁଦାୟ ସେବା ଓ ଶିକ୍ଷା କାର୍ଯ୍ୟରେ ସହଯୋଗ କରନ୍ତି।",
    },
  },
  {
    initials: "GS",
    name: { en: "Gouranga Charan Sahoo", od: "ଗୌରାଙ୍ଗ ଚରଣ ସାହୁ" },
    role: { en: "Core Team Member", od: "ମୁଖ୍ୟ ଦଳ ସଦସ୍ୟ" },
    bio: {
      en: "Supports community service and field coordination.",
      od: "ସମୁଦାୟ ସେବା ଓ କ୍ଷେତ୍ର ସମନ୍ୱୟରେ ସହଯୋଗ କରନ୍ତି।",
    },
  },
  {
    initials: "AB",
    name: { en: "Alok Behera", od: "ଆଲୋକ ବେହେରା" },
    role: { en: "Core Team Member", od: "ମୁଖ୍ୟ ଦଳ ସଦସ୍ୟ" },
    bio: {
      en: "Supports education and community activities.",
      od: "ଶିକ୍ଷା ଓ ସମୁଦାୟ କାର୍ଯ୍ୟରେ ସହଯୋଗ କରନ୍ତି।",
    },
  },
  {
    initials: "AR",
    name: { en: "Ashish (Rocky)", od: "ଆଶିଷ (ରକି)" },
    role: { en: "Core Team Member", od: "ମୁଖ୍ୟ ଦଳ ସଦସ୍ୟ" },
    bio: {
      en: "Supports community service and ground level activities.",
      od: "ସମୁଦାୟ ସେବା ଓ କ୍ଷେତ୍ର କାର୍ଯ୍ୟରେ ସହଯୋଗ କରନ୍ତି।",
    },
  },
  {
    initials: "MM",
    name: { en: "Manoj Kumar Mallik", od: "ମନୋଜ କୁମାର ମଲ୍ଲିକ" },
    role: {
      en: "Head of Verification and Field Coordination, Odisha",
      od: "ଓଡ଼ିଶା ଯାଞ୍ଚ ଓ କ୍ଷେତ୍ର ସମନ୍ୱୟ ମୁଖ୍ୟ",
    },
    qualification: { en: "MBA in Finance", od: "ଫାଇନାନ୍ସରେ MBA" },
    photo: "/images/team-manoj-kumar-mallik.jpeg",
    photoAlt: { en: "Manoj Kumar Mallik", od: "ମନୋଜ କୁମାର ମଲ୍ଲିକ" },
    bio: {
      en: "Coordinates field activities and programme follow up in Odisha.",
      od: "ଓଡ଼ିଶାରେ କ୍ଷେତ୍ର କାର୍ଯ୍ୟ ଓ କାର୍ଯ୍ୟକ୍ରମ ଅନୁସରଣରେ ସମନ୍ୱୟ କରନ୍ତି।",
    },
  },
];

const ORGANISATION_HIERARCHY: HierarchyLevel[] = [
  {
    icon: ShieldCheck,
    level: { en: "Level 1", od: "ସ୍ତର ୧" },
    title: { en: "Board of Directors", od: "ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳ" },
    body: {
      en: "The statutory governing body. It oversees the Foundation's purpose, policies, compliance, finances and major programme decisions.",
      od: "ଏହା ଆଇନଗତ ପରିଚାଳନା ମଣ୍ଡଳ। ଫାଉଣ୍ଡେସନର ଉଦ୍ଦେଶ୍ୟ, ନୀତି, ଅନୁପାଳନ, ଆର୍ଥିକ ବ୍ୟବସ୍ଥା ଓ ମୁଖ୍ୟ କାର୍ଯ୍ୟକ୍ରମ ନିଷ୍ପତ୍ତି ଦେଖେ।",
    },
    scope: {
      en: "Directors: Abhimanyu Mallik and Biswajita Mallik",
      od: "ନିର୍ଦ୍ଦେଶକ: ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ ଓ ବିଶ୍ୱଜିତା ମଲ୍ଲିକ",
    },
  },
  {
    icon: Scale,
    level: { en: "Level 2", od: "ସ୍ତର ୨" },
    title: { en: "Advisory Support", od: "ପରାମର୍ଶ ସହାୟତା" },
    body: {
      en: "Advisors share strategic, legal, education, CSR and compliance knowledge. They guide the organisation but are not shown as directors.",
      od: "ପରାମର୍ଶଦାତାମାନେ ରଣନୀତି, ଆଇନ, ଶିକ୍ଷା, CSR ଓ ଅନୁପାଳନ ବିଷୟରେ ଜ୍ଞାନ ଦିଅନ୍ତି। ସେମାନେ ସଂଗଠନକୁ ପରାମର୍ଶ ଦିଅନ୍ତି, କିନ୍ତୁ ନିର୍ଦ୍ଦେଶକ ଭାବେ ଦର୍ଶାଯାଇନାହାନ୍ତି।",
    },
    scope: {
      en: "Strategy, legal, education, CSR and compliance guidance",
      od: "ରଣନୀତି, ଆଇନ, ଶିକ୍ଷା, CSR ଓ ଅନୁପାଳନ ପରାମର୍ଶ",
    },
  },
  {
    icon: Users,
    level: { en: "Level 3", od: "ସ୍ତର ୩" },
    title: { en: "Programme and Field Team", od: "କାର୍ଯ୍ୟକ୍ରମ ଓ କ୍ଷେତ୍ର ଦଳ" },
    body: {
      en: "The core and ground team carries out visits, coordinates activities, keeps field records and follows up on programme needs.",
      od: "ମୁଖ୍ୟ ଓ କ୍ଷେତ୍ର ଦଳ ପରିଦର୍ଶନ କରେ, କାର୍ଯ୍ୟକଳାପ ସମନ୍ୱୟ କରେ, କ୍ଷେତ୍ର ରେକର୍ଡ ରଖେ ଓ କାର୍ଯ୍ୟକ୍ରମ ଆବଶ୍ୟକତାର ଅନୁସରଣ କରେ।",
    },
    scope: {
      en: "Programme delivery, documentation and community coordination",
      od: "କାର୍ଯ୍ୟକ୍ରମ ପରିଚାଳନା, ରେକର୍ଡ ଓ ସମୁଦାୟ ସମନ୍ୱୟ",
    },
  },
  {
    icon: HandHeart,
    level: { en: "Level 4", od: "ସ୍ତର ୪" },
    title: { en: "Volunteers", od: "ସ୍ୱେଚ୍ଛାସେବୀ" },
    body: {
      en: "Volunteers give time and skills for approved activities. Volunteering does not create a job, board position or authority to act for the Foundation.",
      od: "ସ୍ୱେଚ୍ଛାସେବୀମାନେ ଅନୁମୋଦିତ କାର୍ଯ୍ୟ ପାଇଁ ସମୟ ଓ ଦକ୍ଷତା ଦିଅନ୍ତି। ସ୍ୱେଚ୍ଛାସେବା ଚାକିରି, ମଣ୍ଡଳ ପଦବୀ କିମ୍ବା ଫାଉଣ୍ଡେସନ ପକ୍ଷରୁ ଅଧିକାର ସୃଷ୍ଟି କରେନାହିଁ।",
    },
    scope: {
      en: "Time bound support under team coordination",
      od: "ଦଳୀୟ ସମନ୍ୱୟ ଅଧୀନରେ ସମୟଭିତ୍ତିକ ସହଯୋଗ",
    },
  },
];

function InitialPortrait({ initials, large = false }: { initials: string; large?: boolean }) {
  return (
    <div
      className={`${large ? "h-52" : "h-28"} w-full bg-[#F6F2E8] flex items-center justify-center`}
      aria-hidden="true"
    >
      <div className={`${large ? "w-28 h-28 text-4xl" : "w-20 h-20 text-2xl"} rounded-full bg-white border border-[#C9A84C]/40 shadow-sm flex items-center justify-center font-serif font-bold text-[#1A7F8E]`}>
        {initials}
      </div>
    </div>
  );
}

function BoardMemberCard({ member }: { member: PersonProfile }) {
  const { t } = useLanguage();

  return (
    <article className="bg-white border border-[#E8E1D1] shadow-[0_18px_50px_rgba(26,32,28,0.08)] overflow-hidden h-full">
      <div className="h-64 md:h-72 bg-[#F6F2E8] flex items-center justify-center border-b border-[#E8E1D1]">
        {member.photo ? (
          <img
            src={member.photo}
            alt={t(member.photoAlt?.en ?? member.name.en, member.photoAlt?.od ?? member.name.od)}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          <InitialPortrait initials={member.initials} large />
        )}
      </div>
      <div className="p-7 md:p-9">
        <p className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase text-[#1A7F8E] mb-3">
          {t(member.role.en, member.role.od)}
        </p>
        <h3 className="font-serif text-3xl font-bold text-[#191919] mb-2">
          {t(member.name.en, member.name.od)}
        </h3>
        {member.qualification && (
          <p className="font-sans text-[13px] font-medium text-[#8B6914] mb-5">
            {t(member.qualification.en, member.qualification.od)}
          </p>
        )}
        <p className="font-sans text-[16px] text-[#555] leading-7">
          {t(member.bio.en, member.bio.od)}
        </p>

        {member.responsibilities && (
          <ul className="mt-6 pt-5 border-t border-[#E8E1D1] space-y-3">
            {member.responsibilities.map((item) => (
              <li key={item.en} className="flex items-start gap-3 font-sans text-[14px] text-[#444]">
                <CheckCircle2 size={17} className="text-[#C9A84C] shrink-0 mt-0.5" />
                <span>{t(item.en, item.od)}</span>
              </li>
            ))}
          </ul>
        )}

        {member.profileUrl && (
          <a
            href={member.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 font-sans text-[13px] font-semibold text-[#1A7F8E] hover:text-[#11636F] transition-colors"
          >
            <Linkedin size={16} /> {t("Public profile", "ସାର୍ବଜନୀନ ପ୍ରୋଫାଇଲ")}
          </a>
        )}
      </div>
    </article>
  );
}

function SupportingProfileCard({ person, accent = "teal" }: { person: PersonProfile; accent?: "teal" | "gold" }) {
  const { t } = useLanguage();
  const accentClass = accent === "gold" ? "text-[#8B6914]" : "text-[#1A7F8E]";

  return (
    <article className="bg-white border border-[#E8E1D1] p-6 h-full shadow-[0_10px_35px_rgba(26,32,28,0.05)]">
      <div className="h-32 mb-5 bg-[#F6F2E8] flex items-center justify-center overflow-hidden">
        {person.photo ? (
          <img
            src={person.photo}
            alt={t(person.photoAlt?.en ?? person.name.en, person.photoAlt?.od ?? person.name.od)}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          <InitialPortrait initials={person.initials} />
        )}
      </div>
      <p className={`font-sans text-[10px] font-bold tracking-[0.16em] uppercase mb-2 ${accentClass}`}>
        {t(person.role.en, person.role.od)}
      </p>
      <h3 className="font-serif text-xl font-bold text-[#191919] mb-2">
        {t(person.name.en, person.name.od)}
      </h3>
      {person.qualification && (
        <p className="font-sans text-[12px] text-[#8B6914] mb-3">
          {t(person.qualification.en, person.qualification.od)}
        </p>
      )}
      <p className="font-sans text-[14px] text-[#5A5A5A] leading-6">
        {t(person.bio.en, person.bio.od)}
      </p>
    </article>
  );
}

export default function Team() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(
          "Board and Leadership, Abhiara Foundation",
          "ପରିଚାଳନା ମଣ୍ଡଳ ଓ ନେତୃତ୍ୱ, ଅଭିଆରା ଫାଉଣ୍ଡେସନ",
        )}
        description={t(
          "Meet the people associated with Abhiara Foundation.",
          "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସହ ଜଡିତ ଲୋକମାନଙ୍କୁ ଜାଣନ୍ତୁ।",
        )}
        image="/images/team-abhimanyu-mallik.png"
        url="https://www.abhiarafoundation.com/team"
      />
      <Navbar />

      <main id="main-content">
        <section className="relative overflow-hidden bg-[#F8F6EF] pt-20 pb-20 md:pt-28 md:pb-28">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-28 -right-20 h-80 w-80 rounded-full bg-[#C9A84C]/10 blur-3xl" />
            <div className="absolute -bottom-36 -left-24 h-96 w-96 rounded-full bg-[#1A7F8E]/10 blur-3xl" />
          </div>
          <div className="container relative grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#1A7F8E] mb-5">
                {t("Governance, people, responsibility", "ପରିଚାଳନା, ଲୋକ ଓ ଦାୟିତ୍ୱ")}
              </p>
              <h1 className="font-serif font-bold text-[#191919] leading-[1.05] mb-6" style={{ fontSize: "clamp(42px, 6vw, 76px)" }}>
                {t("Board and", "ପରିଚାଳନା ମଣ୍ଡଳ ଓ")}<br />
                <span className="text-[#C9A84C]">{t("Leadership", "ନେତୃତ୍ୱ")}</span>
              </h1>
              <p className="font-sans text-[17px] text-[#555] max-w-xl leading-8 mb-8">
                {t(
                  "Meet the people associated with Abhiara Foundation and read their current roles.",
                  "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସହ ଜଡିତ ଲୋକମାନେ ଓ ସେମାନଙ୍କ ବର୍ତ୍ତମାନ ଭୂମିକା ବିଷୟରେ ଜାଣନ୍ତୁ।",
                )}
              </p>
              <div className="flex flex-wrap gap-3" aria-label={t("Page sections", "ପୃଷ୍ଠା ବିଭାଗ")}>
                {[
                  { href: "#board", en: "Board of Directors", od: "ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳ" },
                  { href: "#advisors", en: "Advisors", od: "ପରାମର୍ଶଦାତା" },
                  { href: "#ground-team", en: "Ground Team", od: "କ୍ଷେତ୍ର ଦଳ" },
                ].map((item) => (
                  <a key={item.href} href={item.href} className="px-4 py-2.5 bg-white border border-[#DED5C2] text-[#333] font-sans text-[13px] font-semibold hover:border-[#C9A84C] hover:text-[#8B6914] transition-colors">
                    {t(item.en, item.od)}
                  </a>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="bg-white border border-[#E8E1D1] p-3 shadow-[0_24px_60px_rgba(26,32,28,0.12)]">
                <img
                  src="/images/team-bhubaneswar.jpeg"
                  alt={t("Abhiara Foundation team during field work", "କ୍ଷେତ୍ର କାମ ସମୟରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଦଳ")}
                  className="w-full h-[320px] md:h-[390px] object-contain bg-[#F6F2E8]"
                  loading="eager"
                />
                <p className="font-sans text-[12px] text-[#777] px-3 pt-3 pb-1">
                  {t("Abhiara Foundation team, public field record", "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଦଳ, ସାର୍ବଜନୀନ କ୍ଷେତ୍ର ରେକର୍ଡ")}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ===== BOARD OF DIRECTORS ===== */}
        <section id="board" className="scroll-mt-24 py-20 md:py-28 bg-white">
          <div className="container">
            <AnimatedSection className="max-w-3xl mb-12 md:mb-16">
              <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#1A7F8E] mb-4">
                {t("Official governance", "ଅଧିକୃତ ପରିଚାଳନା")}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#191919] mb-5">
                {t("Board of Directors", "ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳ")}
              </h2>
              <p className="font-sans text-[17px] text-[#555] leading-8">
                {t(
                  "Abhiara Foundation is a Section 8 company with two directors. They are responsible for governance, compliance, use of funds and programme review.",
                  "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଦୁଇ ଜଣ ନିର୍ଦ୍ଦେଶକଙ୍କ ସହ ଏକ ସେକ୍ସନ 8 କମ୍ପାନୀ। ସେମାନେ ପରିଚାଳନା, ଅନୁପାଳନ, ଅର୍ଥ ବ୍ୟବହାର ଓ କାର୍ଯ୍ୟକ୍ରମ ଯାଞ୍ଚ ପାଇଁ ଦାୟୀ।",
                )}
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {BOARD_MEMBERS.map((member, index) => (
                <AnimatedSection key={member.name.en} delay={index * 0.08}>
                  <BoardMemberCard member={member} />
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="mt-10 max-w-5xl mx-auto">
              <div className="border-l-4 border-[#1A7F8E] bg-[#F4FAF9] px-6 py-5">
                <p className="font-sans text-[14px] text-[#3F5653] leading-6">
                  {t(
                    "Roles shown on this page follow the Foundation's public records.",
                    "ଏହି ପୃଷ୍ଠାରେ ଦର୍ଶାଯାଇଥିବା ଭୂମିକାଗୁଡ଼ିକ ଫାଉଣ୍ଡେସନର ସାର୍ବଜନୀନ ରେକର୍ଡ ଅନୁସରଣ କରେ।",
                  )}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ===== SECTION 8 ORGANISATION HIERARCHY ===== */}
        <section className="py-20 md:py-24 bg-[#F8F6EF]">
          <div className="container">
            <AnimatedSection className="text-center mb-12">
              <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B6914] mb-4">
                {t("Section 8 organisation structure", "ସେକ୍ସନ 8 ସଂଗଠନ ଗଠନ")}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#191919]">
                {t("How Abhiara is organised", "ଅଭିଆରା କିପରି ସଂଗଠିତ")}
              </h2>
              <p className="font-sans text-[15px] text-[#5A5A5A] max-w-2xl mx-auto leading-7 mt-4">
                {t(
                  "This public hierarchy keeps statutory governance separate from advice, programme delivery and volunteering.",
                  "ଏହି ସାର୍ବଜନୀନ ଗଠନ ଆଇନଗତ ପରିଚାଳନାକୁ ପରାମର୍ଶ, କାର୍ଯ୍ୟକ୍ରମ ପରିଚାଳନା ଓ ସ୍ୱେଚ୍ଛାସେବାରୁ ଅଲଗା ରଖେ।",
                )}
              </p>
            </AnimatedSection>
            <div className="max-w-5xl mx-auto space-y-4">
              {ORGANISATION_HIERARCHY.map((item, index) => (
                <AnimatedSection key={item.title.en} delay={index * 0.08}>
                  <article className="relative grid grid-cols-[56px_1fr] md:grid-cols-[86px_1fr] gap-4 md:gap-6 items-stretch">
                    <div className="relative flex flex-col items-center" aria-hidden="true">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#1A7F8E] text-white flex items-center justify-center shadow-sm z-10">
                        <item.icon size={22} />
                      </div>
                      {index < ORGANISATION_HIERARCHY.length - 1 && (
                        <div className="w-px flex-1 bg-[#C9A84C]/60 mt-2" />
                      )}
                    </div>
                    <div className="bg-white border border-[#E8E1D1] p-6 md:p-7 mb-1 shadow-[0_8px_28px_rgba(26,32,28,0.04)]">
                      <p className="font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-[#8B6914] mb-2">
                        {t(item.level.en, item.level.od)}
                      </p>
                      <h3 className="font-serif text-2xl font-bold text-[#191919] mb-3">
                        {t(item.title.en, item.title.od)}
                      </h3>
                      <p className="font-sans text-[14px] text-[#5A5A5A] leading-6 mb-4">
                        {t(item.body.en, item.body.od)}
                      </p>
                      <p className="font-sans text-[12px] font-semibold text-[#1A7F8E]">
                        {t(item.scope.en, item.scope.od)}
                      </p>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection className="max-w-5xl mx-auto mt-8">
              <p className="font-sans text-[12px] text-[#777] leading-6 border-t border-[#DED5C2] pt-5">
                {t(
                  "Public organisation chart only. Any statutory appointment or change in authority must follow the Companies Act, the Foundation's governing documents and formal records.",
                  "ଏହା କେବଳ ସାର୍ବଜନୀନ ସଂଗଠନ ଚିତ୍ର। କୌଣସି ଆଇନଗତ ନିଯୁକ୍ତି କିମ୍ବା ଅଧିକାର ପରିବର୍ତ୍ତନ କମ୍ପାନୀ ଆଇନ, ଫାଉଣ୍ଡେସନର ପରିଚାଳନା ଦଲିଲ ଓ ଔପଚାରିକ ରେକର୍ଡ ଅନୁସାରେ ହେବା ଦରକାର।",
                )}
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ===== ADVISORS ===== */}
        <section id="advisors" className="scroll-mt-24 py-20 md:py-28 bg-white">
          <div className="container">
            <AnimatedSection className="text-center mb-12">
              <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#1A7F8E] mb-4">
                {t("Guidance", "ପରାମର୍ଶ")}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#191919] mb-5">
                {t("Advisors", "ପରାମର୍ଶଦାତା")}
              </h2>
              <p className="font-sans text-[16px] text-[#555] max-w-2xl mx-auto leading-7">
                {t(
                  "The Founding Patron and other advisors share strategic and practical guidance.",
                  "ପ୍ରତିଷ୍ଠାକାଳୀନ ପୃଷ୍ଠପୋଷକ ଓ ଅନ୍ୟ ପରାମର୍ଶଦାତାମାନେ ରଣନୀତିକ ଏବଂ ବ୍ୟବହାରିକ ପରାମର୍ଶ ଦିଅନ୍ତି।",
                )}
              </p>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {ADVISORS.map((person, index) => (
                <AnimatedSection key={person.name.en} delay={index * 0.08}>
                  <SupportingProfileCard person={person} accent={index === 1 ? "gold" : "teal"} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ===== GROUND TEAM ===== */}
        <section id="ground-team" className="scroll-mt-24 py-20 md:py-28 bg-[#F8F6EF]">
          <div className="container">
            <AnimatedSection className="text-center mb-12">
              <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B6914] mb-4">
                {t("Field work", "କ୍ଷେତ୍ର କାମ")}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#191919] mb-5">
                {t("Core and Ground Team", "ମୁଖ୍ୟ ଓ କ୍ଷେତ୍ର ଦଳ")}
              </h2>
              <p className="font-sans text-[16px] text-[#555] max-w-2xl mx-auto leading-7">
                {t(
                  "These members support community visits, education activities and programme follow up.",
                  "ଏହି ସଦସ୍ୟମାନେ ସମୁଦାୟ ପରିଦର୍ଶନ, ଶିକ୍ଷା କାର୍ଯ୍ୟ ଓ କାର୍ଯ୍ୟକ୍ରମ ଅନୁସରଣରେ ସହଯୋଗ କରନ୍ତି।",
                )}
              </p>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {GROUND_TEAM.map((person, index) => (
                <AnimatedSection key={person.name.en} delay={(index % 5) * 0.06}>
                  <SupportingProfileCard person={person} accent={index % 2 === 0 ? "gold" : "teal"} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-[#1A7F8E]">
          <div className="container text-center max-w-3xl">
            <AnimatedSection>
              <HandHeart size={34} className="text-[#F6D77A] mx-auto mb-5" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                {t("Want to serve with us?", "ଆମ ସହ ସେବା କରିବାକୁ ଚାହୁଁଛନ୍ତି କି?")}
              </h2>
              <p className="font-sans text-[16px] text-white/85 leading-7 mb-8">
                {t(
                  "Abhiara does not offer full time jobs. You can join our public work as a volunteer and support activities according to your time and skills.",
                  "ଅଭିଆରା ପୂର୍ଣ୍ଣକାଳୀନ ଚାକିରି ଦେଉନାହିଁ। ଆପଣ ସ୍ୱେଚ୍ଛାସେବୀ ଭାବେ ଯୋଗ ଦେଇ ନିଜ ସମୟ ଓ ଦକ୍ଷତା ଅନୁସାରେ କାର୍ଯ୍ୟରେ ସହଯୋଗ କରିପାରିବେ।",
                )}
              </p>
              <Link href="/volunteer" className="inline-flex items-center gap-2 px-7 py-3 bg-[#C9A84C] text-[#191919] font-sans text-[13px] font-bold hover:bg-[#D7B95F] transition-colors">
                {t("Volunteer with Abhiara", "ଅଭିଆରା ସହ ସ୍ୱେଚ୍ଛାସେବା କରନ୍ତୁ")} <ArrowRight size={15} />
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
