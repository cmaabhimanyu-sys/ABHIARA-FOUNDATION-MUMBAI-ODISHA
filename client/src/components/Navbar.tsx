/*
 * Abhiara Foundation — Navbar
 * Design: "Dawn Breaking" — Light Emerging from Darkness
 * Navy background with gold accents, Playfair Display wordmark
 * Transparent on hero, solid on scroll
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/programs", label: "Programs" },
  { href: "/csr-partners", label: "CSR Partners" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-lg shadow-navy/20"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-18 md:h-20">
        {/* Logo / Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <span
              className="font-serif text-xl md:text-2xl font-bold tracking-[0.15em] text-white"
            >
              ABHIARA
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.25em] text-gold font-sans font-bold uppercase -mt-1">
              FOUNDATION
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative font-sans text-sm tracking-wide uppercase transition-colors duration-300 ${
                location === link.href
                  ? "text-gold"
                  : "text-white/80 hover:text-gold"
              }`}
            >
              {link.label}
              {location === link.href && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-4 px-5 py-2 bg-gold text-navy font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-gold-light transition-colors duration-300"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-navy/98 backdrop-blur-lg border-t border-white/10 overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-base tracking-wide py-2 transition-colors ${
                    location === link.href
                      ? "text-gold"
                      : "text-white/80 hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 px-5 py-3 bg-gold text-navy font-sans font-bold text-sm tracking-wide uppercase rounded-sm text-center hover:bg-gold-light transition-colors"
              >
                Donate Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
