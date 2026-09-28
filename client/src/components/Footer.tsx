import { Link } from "wouter";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Youtube,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  PRIMARY_NAV,
  PUBLIC_TAGLINE,
  PUBLIC_TAGLINE_DESCRIPTION,
  PUBLIC_TAGLINE_DESCRIPTION_OD,
} from "@/data/focusContent";
import {
  FOUNDER_LINKEDIN_URL,
  resolvePublicSocialLinks,
  SOCIAL_FOLLOW_MESSAGE,
} from "@/data/socialPlatforms";
import { trpc } from "@/lib/trpc";

const SECONDARY = [
  { href: "/our-story", en: "Founder Story", od: "ପ୍ରତିଷ୍ଠାତାଙ୍କ କାହାଣୀ" },
  {
    href: "/rural-area-transformation",
    en: "Rural Area Transformation",
    od: "ଗ୍ରାମୀଣ ଅଞ୍ଚଳ ପରିବର୍ତ୍ତନ",
  },
  {
    href: "/abhiara-pratibha-samman",
    en: "Abhiara Pratibha Samman",
    od: "ଅଭିଆରା ପ୍ରତିଭା ସମ୍ମାନ",
  },
  {
    href: "/elder-care-and-dignity",
    en: "Elder Care and Dignity",
    od: "ବୃଦ୍ଧ ସେବା ଓ ସମ୍ମାନ",
  },
  { href: "/press-and-media", en: "Press and Media", od: "ପ୍ରେସ ଓ ମିଡିଆ" },
  { href: "/impact-gallery", en: "Impact Gallery", od: "ପ୍ରଭାବ ଫଟୋ ଭଣ୍ଡାର" },
  {
    href: "/birthday-with-purpose",
    en: "Birthday with Purpose",
    od: "ଉଦ୍ଦେଶ୍ୟ ସହ ଜନ୍ମଦିନ",
  },
  {
    href: "/other-verified-support",
    en: "Other Verified Support",
    od: "ଅନ୍ୟ ଯାଞ୍ଚ ହୋଇଥିବା ସହାୟତା",
  },
  { href: "/disaster-relief", en: "Disaster Relief", od: "ବିପର୍ଯ୍ୟୟ ସହାୟତା" },
  {
    href: "/medical-emergency-support",
    en: "Medical Emergency Help",
    od: "ଚିକିତ୍ସା ଜରୁରୀ ସହାୟତା",
  },
  {
    href: "/animal-welfare-support",
    en: "Animal Welfare Support",
    od: "ପଶୁ କଲ୍ୟାଣ ସହାୟତା",
  },
  {
    href: "/digital-learning-ai",
    en: "Digital Learning and AI Basics",
    od: "ଡିଜିଟାଲ ଶିକ୍ଷା ଓ AI ମୂଳ ଜ୍ଞାନ",
  },
  {
    href: "/rti-human-rights-awareness",
    en: "RTI and Human Rights Awareness",
    od: "RTI ଓ ମାନବାଧିକାର ସଚେତନତା",
  },
  {
    href: "/wellness-and-wellbeing",
    en: "Wellness and Wellbeing",
    od: "ସ୍ୱାସ୍ଥ୍ୟ ଓ ସୁସ୍ଥତା",
  },
  {
    href: "/privacy",
    en: "Privacy and Child Safeguarding",
    od: "ଗୋପନୀୟତା ଓ ଶିଶୁ ସୁରକ୍ଷା",
  },
  { href: "/terms", en: "Terms", od: "ନିୟମ" },
  { href: "/faq", en: "Frequently Asked Questions", od: "ସାଧାରଣ ପ୍ରଶ୍ନ" },
  {
    href: "/donation-and-refund-policy",
    en: "Donation and Refund Policy",
    od: "ଦାନ ଓ ଫେରସ୍ତ ନୀତି",
  },
  { href: "/admin", en: "Owner Login", od: "ମାଲିକ ଲଗଇନ୍" },
] as const;

export default function Footer() {
  const { language, t } = useLanguage();
  const { data: publicSettings = [] } = trpc.cms.settings.listPublic.useQuery(
    undefined,
    { retry: false }
  );
  const { data: activeSocialLinks = [] } = trpc.cms.social.listActive.useQuery(
    undefined,
    { retry: false }
  );
  const links = PRIMARY_NAV.filter(item => item.href !== "/");
  const setting = (key: string, fallback: string) =>
    publicSettings.find((item: any) => item.settingKey === key)?.settingValue ||
    fallback;
  const publicEmail = setting("email_address", "info@abhiarafoundation.org");
  const whatsappChannel = setting(
    "whatsapp_channel_url",
    "https://whatsapp.com/channel/0029Vb86xwaAe5VjYZTEwO1i"
  );
  const socialIcons = {
    Facebook,
    YouTube: Youtube,
    LinkedIn: Linkedin,
    Instagram,
  };
  const socialLinks = resolvePublicSocialLinks(activeSocialLinks).map(item => ({
    ...item,
    icon: socialIcons[item.platform],
  }));

  return (
    <footer
      className="border-t border-gray-200 bg-[#111111] text-white"
      role="contentinfo"
    >
      <div className="container py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.5fr_1fr]">
          <div>
            <img
              src="/abhiara-logo.png"
              alt="Abhiara Foundation"
              className="mb-5 h-20 w-auto rounded bg-white p-1 md:h-24"
              loading="lazy"
            />
            <p className="max-w-sm font-serif text-lg font-bold text-white">
              {t(PUBLIC_TAGLINE, "ଶିକ୍ଷା ପ୍ରଥମ। ଦୟା ସଦା।")}
            </p>
            <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-white/70">
              {t(PUBLIC_TAGLINE_DESCRIPTION, PUBLIC_TAGLINE_DESCRIPTION_OD)}
            </p>
            <p className="mt-5 max-w-sm font-sans text-xs leading-relaxed text-white/60">
              {t(SOCIAL_FOLLOW_MESSAGE.en, SOCIAL_FOLLOW_MESSAGE.od)}
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map(item => (
                <a
                  key={item.platform}
                  aria-label={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 p-2 hover:border-[#F5A623] hover:text-[#F5A623]"
                >
                  <item.icon size={16} />
                </a>
              ))}
              <a
                aria-label={t(
                  "Founder Abhimanyu Mallik on LinkedIn",
                  "ଲିଙ୍କଡଇନରେ ପ୍ରତିଷ୍ଠାତା ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ"
                )}
                href={FOUNDER_LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 p-2 hover:border-[#F5A623] hover:text-[#F5A623]"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5A623]">
              {t("Explore", "ଦେଖନ୍ତୁ")}
            </p>
            <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {links.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-1 font-sans text-[13px] text-white/70 hover:text-[#F5A623]"
                >
                  {language === "od" ? item.od : item.en}
                </Link>
              ))}
              {SECONDARY.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-1 font-sans text-[13px] text-white/70 hover:text-[#F5A623]"
                >
                  {language === "od" ? item.od : item.en}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5A623]">
              {t("Public information", "ସାର୍ବଜନିକ ସୂଚନା")}
            </p>
            <div className="space-y-2 font-sans text-[13px] text-white/70">
              <p>
                {t(
                  "Section 8 not-for-profit company",
                  "ଧାରା ୮ ଅଣଲାଭକାରୀ କମ୍ପାନୀ"
                )}
              </p>
              <p>CIN U87300MH2026NPL471397</p>
              <p>NGO DARPAN MH/2026/1110513</p>
              <p>
                {t(
                  "12AB and 80G applications pending",
                  "12AB ଓ 80G ଆବେଦନ ବିଚାରାଧୀନ"
                )}
              </p>
              <p>
                {t(
                  "Foreign contributions are not accepted at present",
                  "ବର୍ତ୍ତମାନ ବିଦେଶୀ ଅନୁଦାନ ଗ୍ରହଣ କରାଯାଉ ନାହିଁ"
                )}
              </p>
              <a
                href={`mailto:${publicEmail}`}
                className="flex items-center gap-2 pt-2 text-white hover:text-[#F5A623]"
              >
                <Mail size={15} /> {publicEmail}
              </a>
              <a
                href={whatsappChannel}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white hover:text-[#25D366]"
              >
                <MessageCircle size={15} />{" "}
                {t("WhatsApp Channel", "ହ୍ୱାଟସଆପ ଚ୍ୟାନେଲ")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 font-sans text-[11px] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Abhiara Foundation.{" "}
            {t("All rights reserved.", "ସର୍ବ ସ୍ୱତ୍ୱ ସଂରକ୍ଷିତ।")}
          </p>
          <p>
            {t(
              "Registered office: Mumbai. Programme operations: Odisha.",
              "ପଞ୍ଜୀକୃତ କାର୍ଯ୍ୟାଳୟ: ମୁମ୍ବାଇ। କାର୍ଯ୍ୟକ୍ରମ ପରିଚାଳନା: ଓଡ଼ିଶା।"
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
