/*
 * Abhiara Foundation — Thank You Page
 * Shown after successful contact form, newsletter, or volunteer submission.
 * Warm, personal, on-brand. Encourages next steps (WhatsApp, explore site).
 */
import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

/* WhatsApp SVG icon */
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* Contextual messages based on submission type */
const MESSAGES: Record<string, { heading: string; subheading: string; body: string }> = {
  contact: {
    heading: "Your message has been received.",
    subheading: "We will get back to you soon.",
    body: "Our founder Abhimanyu Mallik personally reviews every inquiry. Expect a response within 24–48 hours via email or WhatsApp.",
  },
  volunteer: {
    heading: "Welcome to the Abhiara family.",
    subheading: "Your willingness to serve means the world to us.",
    body: "We have received your volunteer application. Our team will reach out shortly to discuss how you can contribute — whether on the ground in Odisha or remotely.",
  },
  newsletter: {
    heading: "You are now part of the journey.",
    subheading: "Thank you for subscribing.",
    body: "You will receive quarterly updates on our programmes, impact stories, and partnership opportunities. No spam — only meaningful updates.",
  },
  default: {
    heading: "Thank you for reaching out.",
    subheading: "Every connection matters.",
    body: "Your submission has been received. We will respond as soon as possible.",
  },
};

export default function ThankYou() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const search = useSearch();
  const params = new URLSearchParams(search);
  const type = params.get("type") || "default";
  const name = params.get("name") || "";

  const msg = MESSAGES[type] || MESSAGES.default;

  /* Animated checkmark state */
  const [showCheck, setShowCheck] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowCheck(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Thank You — Abhiara Foundation"
        description="Thank you for contacting Abhiara Foundation. We will respond soon."
        url="https://abhiarafoundation.org/thank-you"
      />
      <Navbar />

      {/* ===== MAIN SECTION ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0d1f38] to-[#0A1628]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C9A84C]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#1A7F8E]/5 blur-[100px] pointer-events-none" />

        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }} />

        <div className="relative z-10 container max-w-2xl text-center pt-24 pb-16 px-6">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: showCheck ? 1 : 0, opacity: showCheck ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-[#1A7F8E]/15 border border-[#1A7F8E]/30 flex items-center justify-center">
              <CheckCircle2 size={40} className="text-[#1A7F8E]" />
            </div>
          </motion.div>

          {/* Greeting */}
          {name && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-4"
            >
              {type === "volunteer" ? `WELCOME, ${name.toUpperCase()}` : `THANK YOU, ${name.toUpperCase()}`}
            </motion.p>
          )}

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-serif font-bold text-white mb-3 leading-tight"
            style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
          >
            {msg.heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="font-serif text-xl text-[#C9A84C] mb-6"
          >
            {msg.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="gradient-rule mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="font-sans text-[15px] text-white/55 max-w-lg mx-auto leading-relaxed mb-10"
          >
            {msg.body}
          </motion.p>

          {/* Manifesto quote */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="max-w-md mx-auto mb-12 border-l-2 border-[#1A7F8E] pl-5 text-left"
          >
            <p className="font-serif italic text-[#C9A84C]/80 text-base leading-relaxed">
              "Every ray of light counts. Yours just made the path a little brighter."
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/35 mt-2">
              — Abhiara Foundation
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a
              href="https://wa.me/919938938321?text=Hello%20Abhiara%20Foundation%2C%20I%20just%20submitted%20a%20form%20on%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#25D366] text-white font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#1DA851] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" /> CONNECT ON WHATSAPP
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3 border border-white/20 text-white/70 font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors"
            >
              BACK TO HOME <ArrowRight size={12} />
            </Link>
          </motion.div>

          {/* Explore more */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6 }}
          >
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 mb-5">
              WHILE YOU ARE HERE, EXPLORE
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: "Our Story", href: "/our-story" },
                { label: "Programmes", href: "/programs" },
                { label: "Activities", href: "/activities" },
                { label: "Partner With Us", href: "/csr-partners" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] text-white/50 font-mono text-[9px] tracking-wider uppercase hover:border-[#C9A84C]/30 hover:text-[#C9A84C] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Heart icon at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-16"
          >
            <Heart size={18} className="text-[#C9A84C]/30 mx-auto" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
