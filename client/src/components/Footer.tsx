/*
 * Abhiara Foundation — Footer V3.0 (Simplified + Dynamic)
 * Background: #040C18 (darkest)
 * 3-column layout: Brand | Navigate | Connect
 * Manifesto quote + legal line
 */
import { Link } from "wouter";
import { Linkedin, Instagram, Twitter, Youtube, Facebook, Globe, Mail } from "lucide-react";
import { trpc } from "@/lib/trpc";

const PLATFORM_ICONS: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  "Twitter/X": Twitter,
  YouTube: Youtube,
  Facebook: Facebook,
  Website: Globe,
  Email: Mail,
};

// Fallback social links (used when CMS has no data)
const FALLBACK_SOCIAL = [
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/abhimanyu-mallik/", label: "Abhimanyu Mallik — Founder" },
  { platform: "Twitter/X", url: "https://x.com/abhimanyumalli7?s=11", label: "" },
  { platform: "Instagram", url: "https://www.instagram.com/cma.abhimanyu?igsh=MTVsaXNic2VqeDVicg%3D%3D&utm_source=qr", label: "" },
];

export default function Footer() {
  const { data: cmsSocial = [] } = trpc.cms.social.listActive.useQuery();
  const { data: cmsSettings = [] } = trpc.cms.settings.list.useQuery();

  const socialLinks = cmsSocial.length > 0
    ? cmsSocial.map((s: any) => ({ platform: s.platform, url: s.url, label: s.label || "" }))
    : FALLBACK_SOCIAL;

  const getSetting = (key: string, fallback: string) => {
    const setting = cmsSettings.find((s: any) => s.settingKey === key);
    return setting ? setting.settingValue : fallback;
  };

  const email = getSetting("email_address", "info@abhiarafoundation.org");
  const whatsapp = getSetting("whatsapp_number", "919938938321");

  return (
    <footer className="bg-[#040C18] text-white/60" role="contentinfo" aria-label="Site footer">
      <div className="container py-16 md:py-20">
        {/* Top Row — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/aaf-logo-concept-3-DYGWPrtD3n9D2RUbi4xCrD.png"
                alt="Abhiara Foundation Logo"
                className="h-12 w-auto"
                loading="lazy"
              />
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-[0.15em] text-white">
                  ABHIARA
                </h3>
                <p className="font-mono text-[9px] tracking-[0.25em] text-[#C9A84C] font-bold uppercase">
                  FOUNDATION
                </p>
              </div>
            </div>
            <p className="font-sans text-sm text-white/50 mb-1">
              Fearless Ray of Light
            </p>
            <p className="font-sans text-[13px] text-white/35 leading-relaxed mb-5">
              Education for children. Dignity for the elderly. Built from the village up.
            </p>
            <div className="flex gap-3">
              {socialLinks.filter((s: any) => s.platform !== "WhatsApp" && s.platform !== "Email").map((social: any, i: number) => {
                const Icon = PLATFORM_ICONS[social.platform] || Globe;
                return (
                  <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`Follow us on ${social.platform}`} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors">
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigate — merged with Our Work */}
          <div>
            <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A7F8E] mb-5">
              Navigate
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/our-story", label: "Our Story" },
                { href: "/vision", label: "Vision" },
                { href: "/programs", label: "Programs" },
                { href: "/csr-partners", label: "CSR Partners" },
                { href: "/activities", label: "Activities" },
                { href: "/team", label: "Team" },
                { href: "/donate", label: "Donate" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="font-sans text-sm text-white/50 hover:text-[#C9A84C] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect — Dynamic */}
          <div>
            <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A7F8E] mb-5">
              Connect
            </h4>
            <ul className="space-y-4">
              {socialLinks.filter((s: any) => s.platform === "LinkedIn").slice(0, 1).map((social: any, i: number) => (
                <li key={i}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-sans text-sm text-white/50 hover:text-[#C9A84C] transition-colors">
                    <Linkedin size={16} className="shrink-0" />
                    <span>{social.label || "LinkedIn"}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${email}`} className="flex items-center gap-3 font-sans text-sm text-white/50 hover:text-[#C9A84C] transition-colors">
                  <Mail size={16} className="shrink-0" />
                  <span>{email}</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-sans text-sm text-white/50 hover:text-[#25D366] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>+91 {whatsapp.replace(/^91/, '').replace(/(\d{5})(\d{5})/, '$1 $2')}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Manifesto Quote */}
        <div className="mt-14 mb-10 text-center">
          <p className="font-serif text-xl md:text-2xl italic text-[#C9A84C] max-w-2xl mx-auto">
            "Raisar to Mumbai. And back — through purpose."
          </p>
        </div>

        {/* Governance Trust Line */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/30 text-xs leading-relaxed max-w-2xl mx-auto">
            Abhiara Foundation is a Section 8 Not-for-Profit Company (registration pending). No property, asset, or income can be personally claimed by the founder, family, or any individual. Every contribution will be legally protected and mission-bound.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/[0.06] text-center">
          <p className="font-mono text-[9px] tracking-wider text-white/35">
            <span className="text-[#C9A84C] mr-1">{"\u2295"}</span> &copy; {new Date().getFullYear()} Abhiara Foundation &middot; Section 8 (Registration Pending) &middot; Raisar, Tulasi Kshetra, Kendrapara, Odisha &middot; Pan India
          </p>
        </div>

        {/* Vibe Coding Credit */}
        <p className="text-center text-[#C9A84C] text-xs mt-4 font-mono tracking-widest">
          BUILT WITH VIBE CODING BY ABHIMANYU MALLIK
        </p>
      </div>
    </footer>
  );
}
