/*
 * Abhiara Foundation — Contact Page
 * Design: "Dawn Breaking" — Warm, inviting contact section
 * Contact form, founder info, donation CTA
 */
import { useState } from "react";
import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Send, Heart, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for reaching out! We will get back to you soon.", {
      description: "Your message has been received by Abhiara Foundation.",
    });
    setFormData({ name: "", email: "", subject: "", message: "", type: "general" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0d1f38] to-navy" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 container text-center pt-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xs tracking-[0.4em] uppercase text-teal mb-4"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
          >
            Every Ray of Light<br />
            <span className="text-gold">Counts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-sans text-lg text-white/60 max-w-2xl mx-auto"
          >
            Whether you want to donate, partner, volunteer, or simply learn more — we would love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-navy to-[#0d1f38]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form */}
            <AnimatedSection direction="left" className="lg:col-span-3">
              <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
                  Send Us a Message
                </h2>
                <p className="font-sans text-sm text-white/50 mb-8">
                  Fill out the form below and we will respond within 48 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block font-sans text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                      I am interested in
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: "general", label: "General Inquiry" },
                        { value: "donate", label: "Donation" },
                        { value: "csr", label: "CSR Partnership" },
                        { value: "volunteer", label: "Volunteering" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: option.value })}
                          className={`px-4 py-2 text-sm rounded-sm border transition-all ${
                            formData.type === option.value
                              ? "bg-gold text-navy border-gold font-bold"
                              : "bg-transparent text-white/60 border-white/20 hover:border-gold/50"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-white font-sans text-sm placeholder:text-white/30 focus:border-gold/50 focus:outline-none transition-colors"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-white font-sans text-sm placeholder:text-white/30 focus:border-gold/50 focus:outline-none transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-white font-sans text-sm placeholder:text-white/30 focus:border-gold/50 focus:outline-none transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-white font-sans text-sm placeholder:text-white/30 focus:border-gold/50 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us more about your interest..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-gold text-navy font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-2"
                  >
                    <Send size={16} /> Send Message
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Info Sidebar */}
            <AnimatedSection direction="right" className="lg:col-span-2">
              <div className="space-y-8">
                {/* Founder Card */}
                <div className="p-6 bg-white/5 border border-gold/20 rounded-lg">
                  <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-3">Founder</p>
                  <h3 className="font-serif text-xl font-bold text-white mb-1">Abhimanyu Mallik</h3>
                  <p className="font-sans text-sm text-white/50 mb-4">Mumbai, Maharashtra</p>
                  <div className="space-y-3">
                    <a href="mailto:founder@abhiarafoundation.org" className="flex items-center gap-3 text-sm text-white/60 hover:text-gold transition-colors">
                      <Mail size={16} className="text-teal shrink-0" />
                      founder@abhiarafoundation.org
                    </a>
                    <a href="mailto:info@abhiarafoundation.org" className="flex items-center gap-3 text-sm text-white/60 hover:text-gold transition-colors">
                      <Mail size={16} className="text-teal shrink-0" />
                      info@abhiarafoundation.org
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                  <p className="font-sans text-xs tracking-[0.3em] uppercase text-teal mb-3">Location</p>
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin size={16} className="text-teal mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-sm text-white/80 font-medium">Registered Office</p>
                      <p className="font-sans text-sm text-white/50">Mumbai, Maharashtra, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-sm text-white/80 font-medium">Operations</p>
                      <p className="font-sans text-sm text-white/50">Odisha, India<br />Koraput &middot; Kalahandi &middot; Rayagada</p>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                  <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-3">Connect</p>
                  <div className="flex gap-3">
                    <a href="https://www.linkedin.com/in/abhimanyu-mallik/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-colors">
                      <Linkedin size={18} />
                    </a>
                    <a href="https://x.com/abhimanyumalli7?s=11" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-colors">
                      <Twitter size={18} />
                    </a>
                    <a href="https://www.instagram.com/cma.abhimanyu?igsh=MTVsaXNic2VqeDVicg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-colors">
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>

                {/* Legal */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                  <p className="font-sans text-xs tracking-[0.3em] uppercase text-teal mb-3">Legal</p>
                  <ul className="space-y-2 font-sans text-sm text-white/50">
                    <li>Section 8 Company</li>
                    <li>Limited by Guarantee</li>
                    <li>12A &amp; 80G Registered</li>
                    <li>Est. March 2025</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#0d1f38] to-cream overflow-hidden">
        <div className="container">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <Heart size={24} className="text-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Make a <span className="text-gold">Donation</span>
            </h2>
            <p className="font-sans text-white/60 leading-relaxed mb-4">
              Your contribution is eligible for tax deduction under Section 80G of the Income Tax Act. Every donation, no matter how small, lights a ray of hope.
            </p>
            <p className="font-sans text-sm text-teal mb-8">
              80G Certificate available for all donations
            </p>
            <div className="inline-block p-8 bg-white/5 border border-gold/20 rounded-lg mb-8">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4">Bank Transfer Details</p>
              <div className="space-y-2 text-left">
                <p className="font-sans text-sm text-white/70"><span className="text-white/40 w-24 inline-block">Account:</span> Abhiara Foundation</p>
                <p className="font-sans text-sm text-white/70"><span className="text-white/40 w-24 inline-block">Type:</span> Current Account</p>
                <p className="font-sans text-sm text-white/50 italic mt-3">Full bank details will be shared upon request.</p>
              </div>
            </div>
            <div>
              <a
                href="mailto:founder@abhiarafoundation.org?subject=Donation Inquiry"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-navy font-sans font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
              >
                Donate Now <ArrowRight size={14} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
