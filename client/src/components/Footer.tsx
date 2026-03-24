/*
 * Abhiara Foundation — Footer V4.0 (Simplified + Dynamic + Registration Details)
 * Background: #040C18 (darkest)
 * 3-column layout: Brand | Navigate | Connect
 * Legal & Registration Details + Manifesto quote + legal line
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
            </ul>
          </div>
        </div>

        {/* Manifesto Quote */}
        <div className="mt-14 mb-10 text-center">
          <p className="font-serif text-xl md:text-2xl italic text-[#C9A84C] max-w-2xl mx-auto">
            "Raisar to Mumbai. And back — through purpose."
          </p>
        </div>

        {/* ===== LEGAL & REGISTRATION DETAILS ===== */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#C9A84C] mb-5 text-center">
            Legal &amp; Registration Details
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { label: "Section 8", value: "Registration in Process", status: "pending" },
              { label: "CIN", value: "In Process", status: "pending" },
              { label: "80G", value: "In Process", status: "pending" },
              { label: "12A", value: "In Process", status: "pending" },
              { label: "FCRA", value: "In Process", status: "pending" },
              { label: "PAN", value: "In Process", status: "pending" },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 border border-white/[0.08] rounded-sm">
                <p className="font-mono text-[8px] tracking-[0.15em] uppercase text-white/40 mb-1">{item.label}</p>
                <p className={`font-mono text-[10px] tracking-wider uppercase font-bold ${item.status === "pending" ? "text-[#C9A84C]" : "text-[#1A7F8E]"}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-white/25 text-[10px] font-mono tracking-wider mt-4">
            All registrations are in process. Details will be updated upon approval.
          </p>
        </div>

        {/* Governance Trust Line */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/30 text-xs leading-relaxed max-w-2xl mx-auto">
            Abhiara Foundation is a Section 8 Not-for-Profit Company under the Companies Act, 2013. No property, asset, or income can be personally claimed by the founder, family, or any individual. Every contribution is legally protected and mission-bound.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/[0.06] text-center">
          <p className="font-mono text-[9px] tracking-wider text-white/35">
            <span className="text-[#C9A84C] mr-1">{"\u2295"}</span> &copy; {new Date().getFullYear()} Abhiara Foundation &middot; Section 8 Company &middot; Mumbai Registered &middot; CSR Impact in Tribal Odisha &middot; Pan India
          </p>
        </div>


      </div>
    </footer>
  );
}
