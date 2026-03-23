/*
 * Abhiara Foundation — Navbar V3.0
 * Consolidated nav: 6 items + Donate CTA + Contact CTA
 * Sticky, frosted glass on scroll. Space Mono nav items.
 * Mobile: hamburger → full-screen dark overlay
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/activities", label: "Activities" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

// Sub-pages that should highlight "About" in nav
const aboutSubPages = ["/our-story", "/vision"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/our-story") {
      return aboutSubPages.includes(location);
    }
    return location === href;
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A1628]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/aaf-logo-concept-3-DYGWPrtD3n9D2RUbi4xCrD.png"
              alt="Abhiara Foundation Logo"
              className="h-10 md:h-12 w-auto"
            />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg md:text-xl font-bold tracking-[0.15em] text-white group-hover:text-[#C9A84C] transition-colors">
                ABHIARA
              </span>
              <span className="font-mono text-[7px] md:text-[8px] tracking-[0.25em] text-[#C9A84C] font-bold uppercase">
                FOUNDATION
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-[10px] tracking-[0.15em] uppercase transition-colors ${
                  isActive(link.href)
                    ? "text-[#C9A84C] border-b border-[#C9A84C] pb-0.5"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Prominent Donate CTA */}
            <Link
              href="/donate"
              className="ml-2 px-5 py-2 border border-[#C9A84C] text-[#C9A84C] font-mono text-[9px] font-bold tracking-[0.15em] uppercase hover:bg-[#C9A84C] hover:text-[#0A1628] transition-all flex items-center gap-2"
            >
              DONATE <Heart size={11} />
            </Link>
            {/* CSR / Get in Touch CTA */}
            <Link
              href="/csr-partners"
              className="px-5 py-2 bg-[#C9A84C] text-[#0A1628] font-mono text-[9px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors flex items-center gap-2"
            >
              CSR PARTNERS <ArrowRight size={12} />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden ml-auto w-10 h-10 flex items-center justify-center text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A1628]/98 backdrop-blur-xl flex flex-col items-center justify-center"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`font-mono text-sm tracking-[0.2em] uppercase transition-colors ${
                      isActive(link.href) ? "text-[#C9A84C]" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {/* Mobile Donate */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <Link
                  href="/donate"
                  className="px-8 py-3 border border-[#C9A84C] text-[#C9A84C] font-mono text-[10px] font-bold tracking-[0.15em] uppercase flex items-center gap-2"
                >
                  DONATE <Heart size={12} />
                </Link>
              </motion.div>
              {/* Mobile CSR Partners */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
              >
                <Link
                  href="/csr-partners"
                  className="px-8 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase flex items-center gap-2"
                >
                  CSR PARTNERS <ArrowRight size={12} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
