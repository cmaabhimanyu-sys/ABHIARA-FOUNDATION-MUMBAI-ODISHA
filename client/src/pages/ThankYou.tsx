/*
 * Abhiara Foundation, Thank You Page
 * Shown after successful contact form, newsletter, or volunteer submission.
 * Warm, personal, on-brand. Encourages next steps (email, explore site).
 */
import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";


/* Contextual messages based on submission type */
const MESSAGES: Record<string, { heading: string; subheading: string; body: string }> = {
  contact: {
    heading: "Your message has been received.",
    subheading: "We will get back to you soon.",
    body: "Our team will review your message and reply by email when a response is needed.",
  },
  volunteer: {
    heading: "Your volunteer form has been received.",
    subheading: "Thank you for offering your time.",
    body: "Our team will review your form and contact you if there is a suitable way to help on the ground or remotely.",
  },
  newsletter: {
    heading: "You are subscribed.",
    subheading: "Thank you for subscribing.",
    body: "You will receive public updates about our work and ways to support it.",
  },
  default: {
    heading: "Thank you for reaching out.",
    subheading: "We received your submission.",
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
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title="Thank You, Abhiara Foundation"
        description="Thank you for contacting Abhiara Foundation. We will respond soon."
        url="https://abhiarafoundation.org/thank-you"
      />
      <Navbar />

      {/* ===== MAIN SECTION ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8E1] via-white to-[#FFF8E1]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#F5A623]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#1A1A1A]/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 container max-w-2xl text-center pt-24 pb-16 px-6">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: showCheck ? 1 : 0, opacity: showCheck ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-[#1A1A1A]/10 border border-[#F5A623]/20 flex items-center justify-center">
              <CheckCircle2 size={40} className="text-[#F5A623]" />
            </div>
          </motion.div>

          {/* Greeting */}
          {name && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-4"
            >
              {type === "volunteer" ? `WELCOME, ${name.toUpperCase()}` : `THANK YOU, ${name.toUpperCase()}`}
            </motion.p>
          )}

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-serif font-bold text-[#1A1A1A] mb-3 leading-tight"
            style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
          >
            {msg.heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="font-serif text-xl text-[#F5A623] mb-6"
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
            className="font-sans text-[17px] text-[#555] max-w-lg mx-auto leading-relaxed mb-10"
          >
            {msg.body}
          </motion.p>

          {/* Manifesto quote */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="max-w-md mx-auto mb-12 border-l-2 border-[#F5A623] pl-5 text-left"
          >
            <p className="font-serif italic text-[#F5A623] text-base leading-relaxed">
              "Every ray of light counts. Yours just made the path a little brighter."
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#888] mt-2">Abhiara Foundation
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
              href="mailto:info@abhiarafoundation.org"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg> EMAIL US
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3 border border-gray-300 text-[#555] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:border-[#F5A623] hover:text-[#F5A623] transition-colors"
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
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#888] mb-5">
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
                  className="px-4 py-2 bg-[#FAFAFA] border border-gray-200 text-[#555] font-mono text-[9px] tracking-wider uppercase hover:border-[#F5A623]/40 hover:text-[#F5A623] transition-colors"
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
            <Heart size={18} className="text-[#F5A623]/40 mx-auto" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
