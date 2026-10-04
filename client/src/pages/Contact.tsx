/*
 * Abhiara Foundation, Contact V4.0
 * Email as primary contact. Contact form uses FormSubmit.co (no backend needed).
 * 3 Sections: Hero, Contact Grid (Email Prompt Boxes + Form + Info), CTA
 */
import { useState, useEffect, type ComponentType } from "react";
import {
  Mail,
  MapPin,
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
  Send,
  Loader2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/formSubmit";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  EDUCATION_REQUEST_MAILTO,
  EDUCATION_REQUEST_SUBJECT,
} from "@/data/focusContent";
import {
  FOUNDER_LINKEDIN_URL,
  resolvePublicSocialLinks,
  SOCIAL_FOLLOW_MESSAGE,
  SOCIAL_PLATFORM_FALLBACKS,
} from "@/data/socialPlatforms";
import { trpc } from "@/lib/trpc";

const SOCIAL_ICONS: Record<
  (typeof SOCIAL_PLATFORM_FALLBACKS)[number]["platform"],
  ComponentType<{ size?: number; className?: string }>
> = {
  Facebook,
  YouTube: Youtube,
  LinkedIn: Linkedin,
  Instagram,
};

export default function Contact() {
  const { t } = useLanguage();
  const { data: activeSocialLinks = [] } = trpc.cms.social.listActive.useQuery(
    undefined,
    { retry: false }
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const infoEmail = "info@abhiarafoundation.org";
  const socialLinks = resolvePublicSocialLinks(activeSocialLinks);
  const linkedInUrl =
    socialLinks.find(item => item.platform === "LinkedIn")?.url || "";

  /* Contact form via FormSubmit.co */
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general" as
      | "general"
      | "institutional_support"
      | "volunteer"
      | "media",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !contactForm.name.trim() ||
      !contactForm.email.trim() ||
      !contactForm.message.trim()
    )
      return;

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
        toast.success(
          t(
            "Thank you. Your message has been sent.",
            "ଧନ୍ୟବାଦ। ଆପଣଙ୍କ ସନ୍ଦେଶ ପଠାଯାଇଛି।"
          )
        );
      } else {
        toast.error(
          t("The message could not be sent", "ସନ୍ଦେଶ ପଠାଯାଇ ପାରିଲା ନାହିଁ"),
          {
            description: t(
              "Please email us at info@abhiarafoundation.org.",
              "ଦୟାକରି info@abhiarafoundation.org କୁ ଇମେଲ କରନ୍ତୁ।"
            ),
          }
        );
      }
    } catch {
      toast.error(
        t("The message could not be sent", "ସନ୍ଦେଶ ପଠାଯାଇ ପାରିଲା ନାହିଁ"),
        {
          description: t(
            "Please email us at info@abhiarafoundation.org.",
            "ଦୟାକରି info@abhiarafoundation.org କୁ ଇମେଲ କରନ୍ତୁ।"
          ),
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title={t("Contact Abhiara Foundation", "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସହ ଯୋଗାଯୋଗ")}
        description={t(
          "Contact Abhiara Foundation about education support, institutional support, volunteering, safeguarding or a grievance.",
          "ଶିକ୍ଷା ସହାୟତା, ସଂସ୍ଥାଗତ ସହାୟତା, ସ୍ୱେଚ୍ଛାସେବା, ସୁରକ୍ଷା ବା ଅଭିଯୋଗ ବିଷୟରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।"
        )}
        url="https://www.abhiarafoundation.org/contact"
      />
      <Navbar />

      <main id="main-content">
        {/* ===== S1: HERO ===== */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#111111] to-[#111111]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#F5A623]/5 blur-[100px] pointer-events-none" />

          <div className="relative z-10 container text-center pt-24 pb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-6"
            >
              {t("GET IN TOUCH", "ଯୋଗାଯୋଗ କରନ୍ତୁ")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="heading-xl text-white mb-4"
            >
              {t("Get in ", "ଆମ ସହ ")}
              <span className="text-[#F5A623]">{t("Touch", "ଯୋଗାଯୋଗ")}</span>
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
              className="font-sans text-[17px] text-white/70 max-w-xl mx-auto mb-8"
            >
              {t(
                "Write to us about a partnership, volunteering, support, or any question.",
                "ସହଭାଗିତା, ସ୍ୱେଚ୍ଛାସେବା, ସହାୟତା କିମ୍ବା କୌଣସି ପ୍ରଶ୍ନ ପାଇଁ ଆମକୁ ଲେଖନ୍ତୁ।"
              )}
            </motion.p>

            {/* Primary Email CTA */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              href={`mailto:${infoEmail}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#F5A623] text-[#1A1A1A] font-mono text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors rounded-sm"
            >
              <Mail size={20} />
              {t("EMAIL US", "ଇମେଲ କରନ୍ତୁ")}
            </motion.a>
          </div>
        </section>

        {/* ===== S2: CONTACT GRID (LIGHT) ===== */}
        <section className="py-24 md:py-32 section-light">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Left: Quick Connect + Contact Form */}
              <AnimatedSection direction="left" className="lg:col-span-3">
                <p className="section-label-light mb-4">
                  {t("QUICK EMAIL CONTACT", "ଇମେଲରେ ଶୀଘ୍ର ଯୋଗାଯୋଗ")}
                </p>
                <h2 className="heading-md light-heading mb-8">
                  {t("Send us an ", "ଆମକୁ ଏକ ")}
                  <span className="text-[#F5A623]">
                    {t("email", "ଇମେଲ ପଠାନ୍ତୁ")}
                  </span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    {
                      title: t(
                        "Education Support Request",
                        "ଶିକ୍ଷା ସହାୟତା ଅନୁରୋଧ"
                      ),
                      desc: t(
                        "Email an education request from any Indian state for case by case review.",
                        "ଭାରତର ଯେକୌଣସି ରାଜ୍ୟରୁ ଅଲଗା ସମୀକ୍ଷା ପାଇଁ ଶିକ୍ଷା ଅନୁରୋଧ ଇମେଲ କରନ୍ତୁ।"
                      ),
                      subject: EDUCATION_REQUEST_SUBJECT,
                      href: EDUCATION_REQUEST_MAILTO,
                    },
                    {
                      title: t("Institutional Support", "ସଂସ୍ଥାଗତ ସହାୟତା"),
                      desc: t(
                        "Talk to us about helping children continue their education after their needs are verified.",
                        "ଯାଞ୍ଚ ହୋଇଥିବା ଶିକ୍ଷା ଜାରି ରଖିବାକୁ ସମର୍ଥନ ବିଷୟରେ କଥା ହୁଅନ୍ତୁ।"
                      ),
                      subject: "Institutional Support Inquiry",
                      href: `mailto:${infoEmail}?subject=${encodeURIComponent("Institutional Support Inquiry")}`,
                    },
                    {
                      title: t("General Question", "ସାଧାରଣ ପ୍ରଶ୍ନ"),
                      desc: t(
                        "Ask about our work or how you can join us.",
                        "ଆମ କାମ କିମ୍ବା ଆମ ସହ କିପରି ଯୋଡ଼ି ହେବେ ତାହା ପଚାରନ୍ତୁ।"
                      ),
                      subject: "General Inquiry",
                      href: `mailto:${infoEmail}?subject=${encodeURIComponent("General Inquiry")}`,
                    },
                    {
                      title: t("Volunteering", "ସ୍ୱେଚ୍ଛାସେବା"),
                      desc: t(
                        "Help us in Odisha or support us from where you live.",
                        "ଓଡ଼ିଶାରେ ଆମକୁ ସାହାଯ୍ୟ କରନ୍ତୁ କିମ୍ବା ନିଜ ସ୍ଥାନରୁ ସହଯୋଗ କରନ୍ତୁ।"
                      ),
                      subject: "Volunteering Interest",
                      href: `mailto:${infoEmail}?subject=${encodeURIComponent("Volunteering Interest")}`,
                    },
                    {
                      title: t("Media and Press", "ମିଡିଆ ଓ ସମ୍ବାଦ"),
                      desc: t(
                        "Write to us for an interview or news request.",
                        "ସାକ୍ଷାତକାର କିମ୍ବା ସମ୍ବାଦ ପାଇଁ ଆମକୁ ଲେଖନ୍ତୁ।"
                      ),
                      subject: "Media & Press Inquiry",
                      href: `mailto:${infoEmail}?subject=${encodeURIComponent("Media & Press Inquiry")}`,
                    },
                  ].map(box => (
                    <a
                      key={box.title}
                      href={box.href}
                      className="light-card p-6 group hover:border-[#F5A623]/30 transition-all block"
                    >
                      <h3 className="font-serif text-lg font-bold light-heading mb-2 group-hover:text-[#F5A623] transition-colors">
                        {box.title}
                      </h3>
                      <p className="font-sans text-[13px] light-muted leading-relaxed mb-3">
                        {box.desc}
                      </p>
                      <span className="font-mono text-[9px] tracking-wider uppercase text-[#F5A623] flex items-center gap-2">
                        <Mail size={14} />
                        {t("EMAIL US", "ଇମେଲ କରନ୍ତୁ")}
                      </span>
                    </a>
                  ))}
                </div>

                {/* Contact Form (sends via FormSubmit.co) */}
                <div id="form" className="light-card-gold p-6 md:p-8">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-2">
                    {t("OR SEND A MESSAGE", "କିମ୍ବା ସନ୍ଦେଶ ପଠାନ୍ତୁ")}
                  </p>
                  <p className="font-sans text-[12px] light-muted mb-4">
                    {t(
                      "We will read your message and reply when we can.",
                      "ଆମେ ଆପଣଙ୍କ ସନ୍ଦେଶ ପଢ଼ି ସମ୍ଭବ ହେଲେ ଉତ୍ତର ଦେବୁ।"
                    )}
                  </p>
                  <div className="mb-5 flex gap-3 border border-amber-200 bg-amber-50 p-4 text-amber-950">
                    <ShieldCheck className="mt-0.5 shrink-0" size={18} />
                    <p className="font-sans text-xs leading-6">
                      {t(
                        "Education support requests are accepted only by email. Please do not send a child's full name, exact address, identity document, bank paper, medical record or school record in this general contact form.",
                        "ଶିକ୍ଷା ସହାୟତା ଅନୁରୋଧ କେବଳ ଇମେଲ ମାଧ୍ୟମରେ ଗ୍ରହଣ କରାଯାଏ। ଏହି ସାଧାରଣ ଯୋଗାଯୋଗ ଫର୍ମରେ ଶିଶୁର ପୂର୍ଣ୍ଣ ନାମ, ସଠିକ ଠିକଣା, ପରିଚୟ ପତ୍ର, ବ୍ୟାଙ୍କ କାଗଜ, ଚିକିତ୍ସା ରେକର୍ଡ ବା ସ୍କୁଲ ରେକର୍ଡ ପଠାନ୍ତୁ ନାହିଁ।"
                      )}
                    </p>
                  </div>

                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🙏</div>
                      <h3 className="font-serif text-xl font-bold text-[#F5A623] mb-2">
                        {t("Thank you", "ଧନ୍ୟବାଦ")}
                      </h3>
                      <p className="font-sans text-[16px] light-muted">
                        {t(
                          "Your message has been sent. We will reply when we can.",
                          "ଆପଣଙ୍କ ସନ୍ଦେଶ ପଠାଯାଇଛି। ସମ୍ଭବ ହେଲେ ଆମେ ଉତ୍ତର ଦେବୁ।"
                        )}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          aria-label={t("Your name", "ଆପଣଙ୍କ ନାମ")}
                          required
                          value={contactForm.name}
                          onChange={e =>
                            setContactForm(prev => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-sm text-[#333] font-sans text-sm placeholder:text-[#888] focus:border-[#F5A623]/50 focus:outline-none transition-colors"
                          placeholder={t("Your name", "ଆପଣଙ୍କ ନାମ")}
                        />
                        <input
                          type="email"
                          aria-label={t("Your email", "ଆପଣଙ୍କ ଇମେଲ")}
                          required
                          value={contactForm.email}
                          onChange={e =>
                            setContactForm(prev => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-sm text-[#333] font-sans text-sm placeholder:text-[#888] focus:border-[#F5A623]/50 focus:outline-none transition-colors"
                          placeholder={t("Your email", "ଆପଣଙ୍କ ଇମେଲ")}
                        />
                      </div>
                      <select
                        aria-label={t("Reason for contact", "ଯୋଗାଯୋଗର କାରଣ")}
                        value={contactForm.type}
                        onChange={e =>
                          setContactForm(prev => ({
                            ...prev,
                            type: e.target.value as typeof contactForm.type,
                          }))
                        }
                        className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-sm text-[#333] font-sans text-sm focus:border-[#F5A623]/50 focus:outline-none transition-colors"
                      >
                        <option value="general">
                          {t("General question", "ସାଧାରଣ ପ୍ରଶ୍ନ")}
                        </option>
                        <option value="institutional_support">
                          {t("Institutional support", "ସଂସ୍ଥାଗତ ସହାୟତା")}
                        </option>
                        <option value="volunteer">
                          {t("Volunteering", "ସ୍ୱେଚ୍ଛାସେବା")}
                        </option>
                        <option value="media">
                          {t("Media and press", "ମିଡିଆ ଓ ସମ୍ବାଦ")}
                        </option>
                      </select>
                      <input
                        type="text"
                        aria-label={t("Subject, optional", "ବିଷୟ, ଇଚ୍ଛାଧୀନ")}
                        value={contactForm.subject}
                        onChange={e =>
                          setContactForm(prev => ({
                            ...prev,
                            subject: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-sm text-[#333] font-sans text-sm placeholder:text-[#888] focus:border-[#F5A623]/50 focus:outline-none transition-colors"
                        placeholder={t("Subject, optional", "ବିଷୟ, ଇଚ୍ଛାଧୀନ")}
                      />
                      <textarea
                        aria-label={t("Your message", "ଆପଣଙ୍କ ସନ୍ଦେଶ")}
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={e =>
                          setContactForm(prev => ({
                            ...prev,
                            message: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-sm text-[#333] font-sans text-sm placeholder:text-[#888] focus:border-[#F5A623]/50 focus:outline-none transition-colors resize-none"
                        placeholder={t("Your message", "ଆପଣଙ୍କ ସନ୍ଦେଶ")}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={12} className="animate-spin" />{" "}
                            {t("SENDING", "ପଠାଯାଉଛି")}
                          </>
                        ) : (
                          <>
                            <Send size={12} />{" "}
                            {t("SEND MESSAGE", "ସନ୍ଦେଶ ପଠାନ୍ତୁ")}
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>

              {/* Contact Info Sidebar */}
              <AnimatedSection direction="right" className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Foundation Contact Card */}
                  <div className="light-card-gold p-6">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
                      {t("FOUNDATION CONTACT", "ଫାଉଣ୍ଡେସନ ଯୋଗାଯୋଗ")}
                    </p>
                    <h3 className="font-serif text-xl font-bold light-heading mb-1">
                      Abhiara Foundation
                    </h3>
                    <p className="font-sans text-[13px] light-muted mb-4">
                      {t(
                        "Registered office in Mumbai. Programme operations in Odisha.",
                        "ନିବନ୍ଧିତ କାର୍ଯ୍ୟାଳୟ ମୁମ୍ବାଇରେ। କାର୍ଯ୍ୟକ୍ରମ ପରିଚାଳନା ଓଡ଼ିଶାରେ।"
                      )}
                    </p>
                    <div className="space-y-3">
                      {/* Email */}
                      <a
                        href={`mailto:${infoEmail}`}
                        className="flex items-center gap-3 text-[13px] text-[#F5A623] hover:text-[#E65100] transition-colors font-semibold"
                      >
                        <Mail size={14} className="shrink-0" />
                        {infoEmail}
                      </a>
                      {/* LinkedIn */}
                      <a
                        href={linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-[13px] light-body hover:text-[#F5A623] transition-colors"
                      >
                        <Linkedin
                          size={14}
                          className="text-[#F5A623] shrink-0"
                        />
                        LinkedIn. Abhiara Foundation
                      </a>
                    </div>
                  </div>

                  {/* Email Quick Message */}
                  <a
                    href={`mailto:${infoEmail}`}
                    className="block light-card p-6 group hover:border-[#F5A623]/30 transition-all text-center"
                  >
                    <Mail size={40} className="text-[#F5A623] mx-auto mb-3" />
                    <p className="font-serif text-lg font-bold light-heading mb-1 group-hover:text-[#F5A623] transition-colors">
                      {t("Fastest Way to Reach Us", "ଆମ ସହ ଶୀଘ୍ର ଯୋଗାଯୋଗ")}
                    </p>
                    <p className="font-sans text-[13px] light-muted mb-3">
                      {t(
                        "Email us directly. We will read your message and reply when we can.",
                        "ଆମକୁ ସିଧାସଳଖ ଇମେଲ କରନ୍ତୁ। ଆମେ ସନ୍ଦେଶ ପଢ଼ି ସମ୍ଭବ ହେଲେ ଉତ୍ତର ଦେବୁ।"
                      )}
                    </p>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-[#F5A623] flex items-center justify-center gap-2">
                      <Mail size={12} /> {t("EMAIL US", "ଇମେଲ କରନ୍ତୁ")}
                    </span>
                  </a>

                  {/* Location */}
                  <div className="light-card p-6">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
                      {t("LOCATIONS", "ସ୍ଥାନ")}
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin
                          size={14}
                          className="text-[#F5A623] mt-0.5 shrink-0"
                        />
                        <div>
                          <p className="font-sans text-sm font-semibold light-heading">
                            {t("Registered Office", "ପଞ୍ଜୀକୃତ କାର୍ଯ୍ୟାଳୟ")}
                          </p>
                          <p className="font-sans text-[13px] light-muted">
                            {t(
                              "Mumbai, Maharashtra, India",
                              "ମୁମ୍ବାଇ, ମହାରାଷ୍ଟ୍ର, ଭାରତ"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin
                          size={14}
                          className="text-[#F5A623] mt-0.5 shrink-0"
                        />
                        <div>
                          <p className="font-sans text-sm font-semibold light-heading">
                            {t("Field Work", "କ୍ଷେତ୍ର କାମ")}
                          </p>
                          <p className="font-sans text-[13px] light-muted">
                            {t(
                              "Odisha and other states in India",
                              "ଓଡ଼ିଶା ଏବଂ ଭାରତର ଅନ୍ୟ ରାଜ୍ୟ"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social */}
                  <div className="light-card p-6">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-3">
                      {t("CONNECT", "ଯୋଡ଼ି ହୁଅନ୍ତୁ")}
                    </p>
                    <p className="mb-4 font-sans text-sm leading-6 text-[#666]">
                      {t(SOCIAL_FOLLOW_MESSAGE.en, SOCIAL_FOLLOW_MESSAGE.od)}
                    </p>
                    <div className="flex gap-3">
                      <a
                        href={`mailto:${infoEmail}`}
                        aria-label={t(
                          "Email Abhiara Foundation",
                          "ଅଭିଆରା ଫାଉଣ୍ଡେସନକୁ ଇମେଲ କରନ୍ତୁ"
                        )}
                        className="w-10 h-10 rounded-full border border-[#F5A623]/30 bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623] hover:bg-[#F5A623]/20 hover:border-[#F5A623]/50 transition-colors"
                      >
                        <Mail size={18} />
                      </a>
                      {socialLinks.map(item => {
                        const Icon = SOCIAL_ICONS[item.platform];
                        return (
                          <a
                            key={item.platform}
                            href={item.url}
                            aria-label={`Follow Abhiara Foundation on ${item.platform}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#666] hover:text-[#F5A623] hover:border-[#F5A623]/50 transition-colors"
                          >
                            <Icon size={18} />
                          </a>
                        );
                      })}
                      <a
                        href={FOUNDER_LINKEDIN_URL}
                        aria-label={t(
                          "Founder Abhimanyu Mallik on LinkedIn",
                          "ଲିଙ୍କଡଇନରେ ପ୍ରତିଷ୍ଠାତା ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ"
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#666] hover:text-[#F5A623] hover:border-[#F5A623]/50 transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                      <a
                        href="https://whatsapp.com/channel/0029Vb86xwaAe5VjYZTEwO1i"
                        aria-label={t(
                          "Follow the Abhiara Foundation WhatsApp channel",
                          "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ହ୍ୱାଟସଆପ ଚ୍ୟାନେଲ ଦେଖନ୍ତୁ"
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-colors"
                      >
                        <MessageCircle size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ===== S3: CTA. Email ===== */}
        <section className="py-20 md:py-24 bg-gradient-to-br from-[#1A1A1A] to-[#111111]">
          <div className="container text-center">
            <AnimatedSection>
              <h2
                className="font-serif font-bold text-white mb-4"
                style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
              >
                {t("Write to us.", "ଆସନ୍ତୁ କଥା ହେବା।")}
              </h2>
              <p className="mx-auto mb-8 max-w-xl font-sans text-[17px] text-white/70">
                {t(
                  "Write to us about a partnership, volunteering, or any question.",
                  "ସହଭାଗିତା, ସ୍ୱେଚ୍ଛାସେବା କିମ୍ବା କୌଣସି ପ୍ରଶ୍ନ ପାଇଁ ଆମକୁ ଲେଖନ୍ତୁ।"
                )}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`mailto:${infoEmail}`}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#F5A623] text-[#1A1A1A] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#E8960E] transition-colors"
                >
                  <Mail size={14} /> {t("EMAIL US", "ଇମେଲ କରନ୍ତୁ")}
                </a>
                <a
                  href="/contact#form"
                  className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
                >
                  <Mail size={12} /> {t("SEND A MESSAGE", "ସନ୍ଦେଶ ପଠାନ୍ତୁ")}
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
