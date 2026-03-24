/*
 * Abhiara Foundation — Contact V4.0
 * Email as primary contact. Contact form uses FormSubmit.co (no backend needed).
 * 3 Sections: Hero, Contact Grid (Email Prompt Boxes + Form + Info), CTA
 */
import { useState, useEffect } from "react";
import { Mail, MapPin, Linkedin, Instagram, Twitter, Send, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/formSubmit";


export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const infoEmail = "info@abhiarafoundation.org";
  const linkedInUrl = "https://www.linkedin.com/in/abhimanyu-mallik/";
  const twitterUrl = "https://x.com/abhimanyumalli7?s=11";
  const instagramUrl = "https://www.instagram.com/cma.abhimanyu";

  /* Contact form via FormSubmit.co */
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general" as "general" | "csr_partnership" | "volunteer" | "media",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await submitContactForm({
        name: contactForm.name.trim(),
        email: contactForm.email.trim(),
        type: contactForm.type,
        subject: contactForm.subject.trim() || undefined,
        message: contactForm.message.trim(),
      });

      if (result.success) {
        setIsSubmitted(true);
        toast.success("Thank you! We will respond within 48 hours.");
      } else {
        toast.error("Failed to send message", {
          description: "Please try emailing us at info@abhiarafoundation.org instead.",
        });
      }
    } catch {
      toast.error("Failed to send message", {
        description: "Please try emailing us at info@abhiarafoundation.org instead.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Contact — Abhiara Foundation"
        description="Get in touch with Abhiara Foundation. Reach our founder Abhimanyu Mallik for partnerships, volunteering, or support. Based in Mumbai, operating across Odisha."
        url="https://abhiarafoundation.org/contact"
      />
      <Navbar />

      {/* ===== S1: HERO ===== */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0d1f38] to-[#0A1628]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#C9A84C]/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 container text-center pt-24 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-6"
          >
            GET IN TOUCH
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="heading-xl text-white mb-4"
          >
            Every Conversation<br />
            <span className="text-[#C9A84C]">Starts Here</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="gradient-rule mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-sans text-[15px] text-white/60 max-w-xl mx-auto mb-8"
          >
            Whether you want to partner, volunteer, or simply learn more — we would love to hear from you.
          </motion.p>

          {/* Primary Email CTA */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            href={`mailto:${infoEmail}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A84C] text-[#0A1628] font-mono text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors rounded-sm"
          >
            <Mail size={20} />
            EMAIL US
          </motion.a>
        </div>
      </section>

      {/* ===== S2: CONTACT GRID (LIGHT) ===== */}
      <section className="py-20 md:py-28 section-light">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: Quick Connect + Contact Form */}
            <AnimatedSection direction="left" className="lg:col-span-3">
              <p className="section-label-light mb-4">QUICK CONNECT VIA EMAIL</p>
              <h2 className="heading-md light-heading mb-8">
                Choose your <span className="text-[#C9A84C]">conversation</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    title: "CSR Partnership",
                    desc: "Discuss how your CSR budget can create measurable impact in tribal Odisha.",
                    subject: "CSR Partnership Inquiry",
                  },
                  {
                    title: "General Inquiry",
                    desc: "Questions about our programmes, governance, or how to get involved.",
                    subject: "General Inquiry",
                  },
                  {
                    title: "Volunteering",
                    desc: "Join our ground team in Odisha or support remotely from anywhere.",
                    subject: "Volunteering Interest",
                  },
                  {
                    title: "Media & Press",
                    desc: "Press inquiries, interviews, or coverage requests about Abhiara Foundation.",
                    subject: "Media & Press Inquiry",
                  },
                ].map((box) => (
                  <a
                    key={box.title}
                    href={`mailto:${infoEmail}?subject=${encodeURIComponent(box.subject)}`}
                    className="light-card p-6 group hover:border-[#C9A84C]/30 transition-all block"
                  >
                    <h3 className="font-serif text-lg font-bold light-heading mb-2 group-hover:text-[#C9A84C] transition-colors">{box.title}</h3>
                    <p className="font-sans text-[13px] light-muted leading-relaxed mb-3">{box.desc}</p>
                    <span className="font-mono text-[9px] tracking-wider uppercase text-[#C9A84C] flex items-center gap-2">
                      <Mail size={14} />
                      EMAIL US
                    </span>
                  </a>
                ))}
              </div>

              {/* Contact Form (sends via FormSubmit.co) */}
              <div id="form" className="light-card-gold p-6 md:p-8">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-2">OR SEND US A MESSAGE</p>
                <p className="font-sans text-[12px] light-muted mb-4">Your message will be delivered to our team. We respond within 48 hours.</p>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🙏</div>
                    <h3 className="font-serif text-xl font-bold text-[#C9A84C] mb-2">Thank You!</h3>
                    <p className="font-sans text-[14px] light-muted">
                      Your message has been sent. We will respond within 48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="px-4 py-3 bg-[#0A1628]/5 border border-[#0A1628]/15 rounded-sm text-[#1A2B42] font-sans text-sm placeholder:text-[#0A1628]/30 focus:border-[#C9A84C]/50 focus:outline-none transition-colors"
                        placeholder="Your Name"
                      />
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="px-4 py-3 bg-[#0A1628]/5 border border-[#0A1628]/15 rounded-sm text-[#1A2B42] font-sans text-sm placeholder:text-[#0A1628]/30 focus:border-[#C9A84C]/50 focus:outline-none transition-colors"
                        placeholder="Your Email"
                      />
                    </div>
                    <select
                      value={contactForm.type}
                      onChange={(e) => setContactForm(prev => ({ ...prev, type: e.target.value as typeof contactForm.type }))}
                      className="w-full px-4 py-3 bg-[#0A1628]/5 border border-[#0A1628]/15 rounded-sm text-[#1A2B42] font-sans text-sm focus:border-[#C9A84C]/50 focus:outline-none transition-colors"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="csr_partnership">CSR Partnership</option>
                      <option value="volunteer">Volunteering</option>
                      <option value="media">Media & Press</option>
                    </select>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#0A1628]/5 border border-[#0A1628]/15 rounded-sm text-[#1A2B42] font-sans text-sm placeholder:text-[#0A1628]/30 focus:border-[#C9A84C]/50 focus:outline-none transition-colors"
                      placeholder="Subject (optional)"
                    />
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#0A1628]/5 border border-[#0A1628]/15 rounded-sm text-[#1A2B42] font-sans text-sm placeholder:text-[#0A1628]/30 focus:border-[#C9A84C]/50 focus:outline-none transition-colors resize-none"
                      placeholder="Your message..."
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <><Loader2 size={12} className="animate-spin" /> SENDING...</>
                      ) : (
                        <><Send size={12} /> SEND MESSAGE</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Contact Info Sidebar */}
            <AnimatedSection direction="right" className="lg:col-span-2">
              <div className="space-y-6">
                {/* Founder Card */}
                <div className="light-card-gold p-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-3">FOUNDER</p>
                  <h3 className="font-serif text-xl font-bold light-heading mb-1">Abhimanyu Mallik</h3>
                  <p className="font-sans text-[13px] light-muted mb-4">CMA · Mumbai, Maharashtra</p>
                  <div className="space-y-3">
                    {/* Email */}
                    <a href={`mailto:${infoEmail}`} className="flex items-center gap-3 text-[13px] text-[#C9A84C] hover:text-[#B8942A] transition-colors font-semibold">
                      <Mail size={14} className="shrink-0" />
                      {infoEmail}
                    </a>
                    {/* LinkedIn */}
                    <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] light-body hover:text-[#C9A84C] transition-colors">
                      <Linkedin size={14} className="text-[#1A7F8E] shrink-0" />
                      LinkedIn — Abhimanyu Mallik
                    </a>
                  </div>
                </div>

                {/* Email Quick Message */}
                <a
                  href={`mailto:${infoEmail}`}
                  className="block light-card p-6 group hover:border-[#C9A84C]/30 transition-all text-center"
                >
                  <Mail size={40} className="text-[#C9A84C] mx-auto mb-3" />
                  <p className="font-serif text-lg font-bold light-heading mb-1 group-hover:text-[#C9A84C] transition-colors">
                    Fastest Way to Reach Us
                  </p>
                  <p className="font-sans text-[13px] light-muted mb-3">
                    Email us directly. We typically respond within 48 hours.
                  </p>
                  <span className="font-mono text-[10px] tracking-wider uppercase text-[#C9A84C] flex items-center justify-center gap-2">
                    <Mail size={12} /> EMAIL US
                  </span>
                </a>

                {/* Location */}
                <div className="light-card p-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-3">LOCATIONS</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-[#C9A84C] mt-0.5 shrink-0" />
                      <div>
                        <p className="font-sans text-sm font-semibold light-heading">Registered Office</p>
                        <p className="font-sans text-[13px] light-muted">Mumbai, Maharashtra, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-[#1A7F8E] mt-0.5 shrink-0" />
                      <div>
                        <p className="font-sans text-sm font-semibold light-heading">Operations</p>
                        <p className="font-sans text-[13px] light-muted">All of Odisha & Other States<br />Expanding Across India</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="light-card p-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-3">CONNECT</p>
                  <div className="flex gap-3">
                    <a href={`mailto:${infoEmail}`} className="w-10 h-10 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C]/20 hover:border-[#C9A84C]/50 transition-colors">
                      <Mail size={18} />
                    </a>
                    <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#0A1628]/15 flex items-center justify-center text-[#0A1628]/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-colors">
                      <Linkedin size={18} />
                    </a>
                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#0A1628]/15 flex items-center justify-center text-[#0A1628]/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-colors">
                      <Twitter size={18} />
                    </a>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#0A1628]/15 flex items-center justify-center text-[#0A1628]/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-colors">
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== S3: CTA — Email ===== */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#1A7F8E] to-[#145E6A]">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              Every ray of light counts.
            </h2>
            <p className="font-sans text-[15px] text-white/80 max-w-xl mx-auto mb-8">
              Your partnership, your time, your voice — it all matters. Let's build something meaningful together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${infoEmail}`}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors"
              >
                <Mail size={14} /> EMAIL US
              </a>
              <a
                href="/contact#form"
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
              >
                <Mail size={12} /> SEND A MESSAGE
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
