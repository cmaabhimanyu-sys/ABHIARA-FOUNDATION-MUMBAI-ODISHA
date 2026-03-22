/*
 * Abhiara Foundation — Footer V2.0
 * Background: #040C18 (darkest)
 * 3-column layout + manifesto quote + legal line
 */
import { Link } from "wouter";
import { Linkedin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#040C18] text-white/60">
      <div className="container py-16 md:py-20">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/aaf-logo-concept-3-DYGWPrtD3n9D2RUbi4xCrD.png"
                alt="Abhiara Foundation Logo"
                className="h-12 w-auto"
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
            <p className="font-sans text-[12px] text-white/35 leading-relaxed">
              Education for children. Dignity for the elderly. Built from the village up.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://www.linkedin.com/in/abhimanyu-mallik/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors">
                <Linkedin size={15} />
              </a>
              <a href="https://x.com/abhimanyumalli7?s=11" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors">
                <Twitter size={15} />
              </a>
              <a href="https://www.instagram.com/cma.abhimanyu?igsh=MTVsaXNic2VqeDVicg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors">
                <Instagram size={15} />
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A7F8E] mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/our-story", label: "Our Story" },
                { href: "/vision", label: "Vision" },
                { href: "/programs", label: "Programs" },
                { href: "/csr-partners", label: "CSR Partners" },
                { href: "/activities", label: "Activities" },
                { href: "/impact-gallery", label: "Impact Gallery" },
                { href: "/blog", label: "Blog & Updates" },
                { href: "/team", label: "Team" },
                { href: "/contact", label: "Get In Touch" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-sm text-white/50 hover:text-[#C9A84C] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Work */}
          <div>
            <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A7F8E] mb-5">
              Our Work
            </h4>
            <ul className="space-y-3">
              <li className="font-sans text-sm text-white/50">Education</li>
              <li className="font-sans text-sm text-white/50">Elderly Care</li>
              <li className="font-sans text-sm text-white/50">CSR Impact</li>
              <li className="font-sans text-sm text-white/50">Abhiara Vidyapeeth</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A7F8E] mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="https://www.linkedin.com/in/abhimanyu-mallik/" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-white/50 hover:text-[#C9A84C] transition-colors">
                  LinkedIn — Abhimanyu Mallik
                </a>
              </li>
              <li className="font-sans text-sm text-white/50">
                @abhiarafoundation
              </li>
            </ul>
          </div>
        </div>

        {/* Manifesto Quote */}
        <div className="mt-16 mb-12 text-center">
          <p className="font-serif text-xl md:text-2xl italic text-[#C9A84C] max-w-2xl mx-auto">
            "Raisar to Mumbai. And back — through purpose."
          </p>
        </div>

        {/* Governance Trust Line */}
        <div className="border-t border-white/10 pt-4 mt-4 text-center">
          <p className="text-white/30 text-xs leading-relaxed max-w-2xl mx-auto">
            Abhiara Foundation is a Section 8 Not-for-Profit Company. No property, asset, or income can be personally claimed by the founder, family, or any individual. Every contribution is legally protected and mission-bound.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/[0.06] text-center">
          <p className="font-mono text-[9px] tracking-wider text-white/35">
            <span className="text-[#C9A84C] mr-1">⊕</span> &copy; {new Date().getFullYear()} Abhiara Foundation &middot; Section 8 Company &middot; Raisar, Tulasi Kshetra, Kendrapara, Odisha &middot; Pan India
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
