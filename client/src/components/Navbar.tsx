/*
 * Abhiara Foundation — Navbar V4.0
 * Layout: Logo+Name left | Nav links center | GET IN TOUCH right
 * Announcement bar integrated below nav
 * Compact — no big gap between logo and navigation
 * Mobile: hamburger → full-screen dark overlay
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/vision", label: "Vision" },
  { href: "/programs", label: "Programs" },
  { href: "/csr-partners", label: "CSR Partners" },
  { href: "/activities", label: "Activities" },
  { href: "/team", label: "Team" },
  { href: "/donate", label: "Donate" },
];

// Sub-pages that should highlight "Our Story" in nav
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
            ? "bg-[#0A1628]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
            : "bg-[#0A1628]/80 backdrop-blur-md"
        }`}
      >
        {/* Main Nav Row */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center h-14 md:h-16">
          {/* Logo — compact, no big gap */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/aaf-logo-concept-3-DYGWPrtD3n9D2RUbi4xCrD.png"
              alt="Abhiara Foundation Logo"
              className="h-9 md:h-10 w-auto"
            />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-base md:text-lg font-bold tracking-[0.12em] text-white group-hover:text-[#C9A84C] transition-colors">
                ABHIARA
              </span>
              <span className="font-mono text-[6px] md:text-[7px] tracking-[0.2em] text-[#C9A84C] font-bold uppercase">
                FOUNDATION
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links — centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-5 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-[9px] xl:text-[10px] tracking-[0.12em] uppercase whitespace-nowrap transition-colors ${
                  isActive(link.href)
                    ? "text-[#C9A84C] border-b border-[#C9A84C] pb-0.5"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* GET IN TOUCH CTA — right */}
          <Link
            href="/contact"
            className="hidden lg:flex items-center gap-2 shrink-0 ml-4 px-5 py-2 bg-[#C9A84C] text-[#0A1628] font-mono text-[9px] font-bold tracking-[0.12em] uppercase hover:bg-[#B8942A] transition-colors"
          >
            GET IN TOUCH <ArrowRight size={11} />
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden ml-auto w-10 h-10 flex items-center justify-center text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
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
            <div className="flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
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
              {/* Mobile GET IN TOUCH */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase flex items-center gap-2"
                >
                  GET IN TOUCH <ArrowRight size={12} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
