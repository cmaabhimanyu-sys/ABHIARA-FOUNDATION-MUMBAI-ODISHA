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
            <div className="mb-5">
              <h3 className="font-serif text-2xl font-bold tracking-[0.15em] text-white">
                ABHIARA
              </h3>
              <p className="font-mono text-[9px] tracking-[0.25em] text-[#C9A84C] font-bold uppercase">
                FOUNDATION
              </p>
            </div>
            <p className="font-sans text-sm text-white/50 mb-2">
              Fearless Ray of Light
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
                { href: "/programs", label: "Programs" },
                { href: "/csr-partners", label: "CSR Partners" },
                { href: "/contact", label: "Contact" },
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
                <a href="mailto:founder@abhiarafoundation.org" className="font-sans text-sm text-white/50 hover:text-[#C9A84C] transition-colors">
                  founder@abhiarafoundation.org
                </a>
              </li>
              <li>
                <a href="mailto:info@abhiarafoundation.org" className="font-sans text-sm text-white/50 hover:text-[#C9A84C] transition-colors">
                  info@abhiarafoundation.org
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
          <p className="font-serif text-xl md:text-2xl italic text-white/40 max-w-2xl mx-auto">
            "Village to Mumbai. And back — through purpose."
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[9px] tracking-wider text-white/35">
            &copy; {new Date().getFullYear()} Abhiara Foundation &middot; Section 8 Company &middot; Limited by Guarantee &middot; Companies Act 2013 &middot; CIN: Pending
          </p>
          <p className="font-mono text-[9px] tracking-wider text-white/35">
            abhiarafoundation.org &middot; abhiarafoundation.com
          </p>
        </div>
      </div>
    </footer>
  );
}
