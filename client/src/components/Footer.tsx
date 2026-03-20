/*
 * Abhiara Foundation — Footer
 * Design: "Dawn Breaking" — Deep navy base with gold accents
 * Institutional credibility with warm human touch
 */
import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      {/* Wave divider */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 md:h-16" preserveAspectRatio="none">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#0A1628" />
        </svg>
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h3 className="font-serif text-2xl font-bold tracking-[0.15em] text-white">
                ABHIARA
              </h3>
              <p className="text-xs tracking-[0.25em] text-gold font-bold uppercase -mt-0.5">
                FOUNDATION
              </p>
            </div>
            <p className="text-sm leading-relaxed text-white/60 mb-4">
              Fearless Ray of Light
            </p>
            <p className="text-sm leading-relaxed text-white/50 italic font-serif">
              "Where a father's courage meets a daughter's devotion."
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://www.linkedin.com/in/abhimanyu-mallik/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="https://x.com/abhimanyumalli7?s=11" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-colors">
                <Twitter size={16} />
              </a>
              <a href="https://www.instagram.com/cma.abhimanyu?igsh=MTVsaXNic2VqeDVicg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-sm font-bold tracking-widest uppercase text-gold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/our-story", label: "Our Story" },
                { href: "/programs", label: "Programs" },
                { href: "/csr-partners", label: "CSR Partners" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Pillars */}
          <div>
            <h4 className="font-sans text-sm font-bold tracking-widest uppercase text-gold mb-5">
              Our Pillars
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-white/60">Education &amp; Scholarships</li>
              <li className="text-sm text-white/60">Elderly Care &amp; Wellness</li>
              <li className="text-sm text-white/60">CSR-led Community Impact</li>
              <li className="text-sm text-white/60">Abhiara Vidyapeeth (Future)</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-sans text-sm font-bold tracking-widest uppercase text-gold mb-5">
              Reach Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Mail size={16} className="mt-0.5 shrink-0 text-teal" />
                <span>info@abhiarafoundation.org</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Phone size={16} className="mt-0.5 shrink-0 text-teal" />
                <span>founder@abhiarafoundation.org</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0 text-teal" />
                <span>Mumbai, Maharashtra<br />Operations: Odisha, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Abhiara Foundation. Section 8 Company &middot; Limited by Guarantee &middot; Est. March 2025
          </p>
          <p className="text-xs text-white/40">
            abhiarafoundation.org &middot; abhiarafoundation.com
          </p>
        </div>
      </div>
    </footer>
  );
}
