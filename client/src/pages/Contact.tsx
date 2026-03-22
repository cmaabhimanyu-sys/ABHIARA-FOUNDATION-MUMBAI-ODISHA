/*
 * Abhiara Foundation — Contact V3.0
 * WhatsApp as primary contact. Contact form uses tRPC backend.
 * 4 Sections: Hero, Contact Grid (WhatsApp Prompt Boxes + Form + Info), Newsletter, CTA
 */
import { useState, useEffect } from "react";
import { Mail, MapPin, Linkedin, Instagram, Twitter, Send, ArrowRight, Loader2, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

/* WhatsApp SVG icon component */
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [email, setEmail] = useState("");

  /* Newsletter via tRPC */
  const newsletterMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      toast.success("Thank you for subscribing!", {
        description: "You will receive updates from Abhiara Foundation.",
      });
      setEmail("");
    },
    onError: () => {
      toast.error("Subscription failed", {
        description: "Please try again later.",
      });
    },
  });

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    newsletterMutation.mutate({ email: email.trim() });
  };

  /* Contact form via tRPC */
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general" as "general" | "csr_partnership" | "volunteer" | "media",
  });

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("Message sent!", {
        description: "We will get back to you soon via WhatsApp or email.",
      });
      setContactForm({ name: "", email: "", subject: "", message: "", type: "general" });
    },
    onError: () => {
      toast.error("Failed to send message", {
        description: "Please try WhatsApp instead — it's the fastest way to reach us.",
      });
    },
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) return;
    contactMutation.mutate(contactForm);
  };

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <SEO
        title="Contact — Abhiara Foundation"
        description="Get in touch with Abhiara Foundation. Reach our founder Abhimanyu Mallik for partnerships, volunteering, or support. Based in Mumbai, operating across Odisha."
        url="https://abhiarafoundation.com/contact"
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

          {/* Primary WhatsApp CTA */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            href="https://wa.me/919938938321?text=Hello%20Abhiara%20Foundation%2C%20I%20would%20like%20to%20connect."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-mono text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#1DA851] transition-colors rounded-sm"
          >
            <WhatsAppIcon className="w-5 h-5" />
            MESSAGE US ON WHATSAPP
          </motion.a>
        </div>
      </section>

      {/* ===== S2: CONTACT GRID ===== */}
      <section className="py-20 md:py-28 bg-[#080F1C]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: WhatsApp Quick Prompts + Contact Form */}
            <AnimatedSection direction="left" className="lg:col-span-3">
              <p className="section-label mb-4">QUICK CONNECT VIA WHATSAPP</p>
              <h2 className="heading-md text-white mb-8">
                Choose your <span className="text-[#25D366]">conversation</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    title: "CSR Partnership",
                    desc: "Discuss how your CSR budget can create measurable impact in tribal Odisha.",
                    message: "Hello Abhiara Foundation, I am interested in CSR Partnership.",
                  },
                  {
                    title: "General Inquiry",
                    desc: "Questions about our programmes, governance, or how to get involved.",
                    message: "Hello Abhiara Foundation, I have a general inquiry.",
                  },
                  {
                    title: "Volunteering",
                    desc: "Join our ground team in Odisha or support remotely from anywhere.",
                    message: "Hello Abhiara Foundation, I am interested in volunteering.",
                  },
                  {
                    title: "Media & Press",
                    desc: "Press inquiries, interviews, or coverage requests about Abhiara Foundation.",
                    message: "Hello Abhiara Foundation, I have a media/press inquiry.",
                  },
                ].map((box) => (
                  <a
                    key={box.title}
                    href={`https://wa.me/919938938321?text=${encodeURIComponent(box.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-6 group hover:border-[#25D366]/30 transition-all block"
                  >
                    <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-[#25D366] transition-colors">{box.title}</h3>
                    <p className="font-sans text-[13px] text-white/50 leading-relaxed mb-3">{box.desc}</p>
                    <span className="font-mono text-[9px] tracking-wider uppercase text-[#25D366] flex items-center gap-2">
                      <WhatsAppIcon className="w-4 h-4" />
                      CHAT ON WHATSAPP
                    </span>
                  </a>
                ))}
              </div>

              {/* Contact Form (saves to database) */}
              <div className="glass-card-gold p-6 md:p-8">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-2">OR SEND US A MESSAGE</p>
                <p className="font-sans text-[12px] text-white/40 mb-4">Your message is saved and we will respond via WhatsApp or email.</p>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      className="px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-white font-sans text-sm placeholder:text-white/30 focus:border-[#C9A84C]/50 focus:outline-none transition-colors"
                      placeholder="Your Name"
                    />
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      className="px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-white font-sans text-sm placeholder:text-white/30 focus:border-[#C9A84C]/50 focus:outline-none transition-colors"
                      placeholder="Your Email"
                    />
                  </div>
                  <select
                    value={contactForm.type}
                    onChange={(e) => setContactForm(prev => ({ ...prev, type: e.target.value as typeof contactForm.type }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-white font-sans text-sm focus:border-[#C9A84C]/50 focus:outline-none transition-colors"
                  >
                    <option value="general" className="bg-[#0A1628]">General Inquiry</option>
                    <option value="csr_partnership" className="bg-[#0A1628]">CSR Partnership</option>
                    <option value="volunteer" className="bg-[#0A1628]">Volunteering</option>
                    <option value="media" className="bg-[#0A1628]">Media & Press</option>
                  </select>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-white font-sans text-sm placeholder:text-white/30 focus:border-[#C9A84C]/50 focus:outline-none transition-colors"
                    placeholder="Subject (optional)"
                  />
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-white font-sans text-sm placeholder:text-white/30 focus:border-[#C9A84C]/50 focus:outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                  <button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="px-8 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {contactMutation.isPending ? (
                      <><Loader2 size={12} className="animate-spin" /> SENDING...</>
                    ) : (
                      <><Send size={12} /> SEND MESSAGE</>
                    )}
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Info Sidebar */}
            <AnimatedSection direction="right" className="lg:col-span-2">
              <div className="space-y-6">
                {/* Founder Card */}
                <div className="glass-card-gold p-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-3">FOUNDER</p>
                  <h3 className="font-serif text-xl font-bold text-white mb-1">Abhimanyu Mallik</h3>
                  <p className="font-sans text-[13px] text-white/40 mb-4">CMA · Mumbai, Maharashtra</p>
                  <div className="space-y-3">
                    {/* WhatsApp — Primary */}
                    <a href="https://wa.me/919938938321" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] text-[#25D366] hover:text-[#1DA851] transition-colors font-semibold">
                      <WhatsAppIcon className="w-4 h-4 shrink-0" />
                      +91 99389 38321
                    </a>
                    {/* Email */}
                    <a href="mailto:info@abhiarafoundation.org" className="flex items-center gap-3 text-[13px] text-white/60 hover:text-[#C9A84C] transition-colors">
                      <Mail size={14} className="text-[#1A7F8E] shrink-0" />
                      info@abhiarafoundation.org
                    </a>
                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/in/abhimanyu-mallik/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] text-white/60 hover:text-[#C9A84C] transition-colors">
                      <Linkedin size={14} className="text-[#1A7F8E] shrink-0" />
                      LinkedIn — Abhimanyu Mallik
                    </a>
                  </div>
                </div>

                {/* WhatsApp Quick Message */}
                <a
                  href="https://wa.me/919938938321?text=Hello%20Abhiara%20Foundation%2C%20I%20would%20like%20to%20connect."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block glass-card p-6 group hover:border-[#25D366]/30 transition-all text-center"
                >
                  <WhatsAppIcon className="w-10 h-10 text-[#25D366] mx-auto mb-3" />
                  <p className="font-serif text-lg font-bold text-white mb-1 group-hover:text-[#25D366] transition-colors">
                    Fastest Way to Reach Us
                  </p>
                  <p className="font-sans text-[13px] text-white/50 mb-3">
                    Tap to open WhatsApp and message us directly. We typically respond within 24 hours.
                  </p>
                  <span className="font-mono text-[10px] tracking-wider uppercase text-[#25D366] flex items-center justify-center gap-2">
                    <Phone size={12} /> OPEN WHATSAPP
                  </span>
                </a>

                {/* Location */}
                <div className="glass-card p-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A7F8E] mb-3">LOCATIONS</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-[#C9A84C] mt-0.5 shrink-0" />
                      <div>
                        <p className="font-sans text-sm font-semibold text-white">Registered Office</p>
                        <p className="font-sans text-[13px] text-white/40">Mumbai, Maharashtra, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-[#1A7F8E] mt-0.5 shrink-0" />
                      <div>
                        <p className="font-sans text-sm font-semibold text-white">Operations</p>
                        <p className="font-sans text-[13px] text-white/40">All of Odisha & Other States<br />Expanding Across India</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="glass-card p-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-3">CONNECT</p>
                  <div className="flex gap-3">
                    <a href="https://wa.me/919938938321" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-colors">
                      <WhatsAppIcon className="w-[18px] h-[18px]" />
                    </a>
                    <a href="https://www.linkedin.com/in/abhimanyu-mallik/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-colors">
                      <Linkedin size={18} />
                    </a>
                    <a href="https://x.com/abhimanyumalli7?s=11" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-colors">
                      <Twitter size={18} />
                    </a>
                    <a href="https://www.instagram.com/cma.abhimanyu?igsh=MTVsaXNic2VqeDVicg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-colors">
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== S3: NEWSLETTER ===== */}
      <section className="py-16 md:py-20 bg-[#0A1628]">
        <div className="container max-w-2xl text-center">
          <AnimatedSection>
            <p className="section-label mb-4">STAY UPDATED</p>
            <h2 className="heading-md text-white mb-4">
              Join the <span className="text-[#C9A84C]">Newsletter</span>
            </h2>
            <p className="font-sans text-[15px] text-white/50 mb-8">
              Quarterly updates on our programmes, impact stories, and partnership opportunities. No spam. Unsubscribe anytime.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-white font-sans text-sm placeholder:text-white/30 focus:border-[#C9A84C]/50 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
              <button
                type="submit"
                disabled={newsletterMutation.isPending}
                className="px-6 py-3 bg-[#C9A84C] text-[#0A1628] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B8942A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {newsletterMutation.isPending ? (
                  <><Loader2 size={12} className="animate-spin" /> SUBSCRIBING...</>
                ) : (
                  <><Send size={12} /> SUBSCRIBE</>
                )}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== S4: CTA — WhatsApp ===== */}
      <section className="py-16 md:py-20 bg-[#25D366]">
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
                href="https://wa.me/919938938321?text=Hello%20Abhiara%20Foundation%2C%20I%20would%20like%20to%20connect."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#25D366] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" /> MESSAGE ON WHATSAPP
              </a>
              <a
                href="mailto:info@abhiarafoundation.org"
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
              >
                <Mail size={12} /> EMAIL US
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
