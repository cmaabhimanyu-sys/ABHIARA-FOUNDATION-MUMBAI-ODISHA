import { useState } from "react";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/formSubmit";

type Purpose = "general" | "csr_partnership" | "volunteer" | "media" | "donation" | "birthday" | "team" | "other";

interface ContactFormProps {
  /** Default purpose pre-selected in dropdown */
  defaultPurpose?: Purpose;
  /** Page source for tracking where the form was submitted from */
  pageSource: string;
  /** Optional title override */
  title?: string;
  /** Whether to show the purpose dropdown (hide if purpose is fixed) */
  showPurpose?: boolean;
  /** Light theme variant for light-background sections */
  variant?: "dark" | "light";
}

const PURPOSE_OPTIONS: { value: Purpose; label: string }[] = [
  { value: "general", label: "General Enquiry" },
  { value: "donation", label: "I want to donate" },
  { value: "csr_partnership", label: "CSR Partnership" },
  { value: "volunteer", label: "I want to volunteer" },
  { value: "birthday", label: "Birthday With Purpose" },
  { value: "team", label: "Join the Team" },
  { value: "media", label: "Media / Press" },
  { value: "other", label: "Other" },
];

export default function ContactForm({
  defaultPurpose = "general",
  pageSource,
  title = "Get In Touch",
  showPurpose = true,
  variant = "dark",
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState<Purpose>(defaultPurpose);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const purposeLabel = PURPOSE_OPTIONS.find((p) => p.value === purpose)?.label || purpose;

      const result = await submitContactForm({
        name: name.trim(),
        email: email.trim(),
        type: purposeLabel,
        subject: `${purposeLabel} from ${name.trim()} (via ${pageSource})`,
        message: message.trim(),
      });

      if (result.success) {
        setSubmitted(true);
        toast.success("Thank you. We will respond within 48 hours.");
      } else {
        toast.error("Something went wrong. Please email us directly at info@abhiarafoundation.org");
      }
    } catch {
      toast.error("Something went wrong. Please email us directly at info@abhiarafoundation.org");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = variant === "dark";
  const inputClasses = isDark
    ? "w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C] transition-all"
    : "w-full bg-white border border-[#0A1628]/15 rounded-xl px-4 py-3 text-[#0A1628] placeholder-[#0A1628]/30 focus:outline-none focus:border-[#C9A84C] transition-all";
  const labelClasses = isDark
    ? "text-white/70 text-sm font-medium mb-2 block"
    : "text-[#0A1628]/70 text-sm font-medium mb-2 block";
  const selectBg = isDark ? "bg-[#0A1628]" : "bg-white";

  if (submitted) {
    return (
      <div className={`${isDark ? "bg-white/5 border border-[#C9A84C]/30" : "bg-[#0A1628]/5 border border-[#C9A84C]/30"} rounded-2xl p-8 text-center`}>
        <div className="text-4xl mb-4">🙏</div>
        <h3 className={`${isDark ? "text-[#C9A84C]" : "text-[#C9A84C]"} text-lg font-semibold mb-2`}>
          Thank you!
        </h3>
        <p className={`${isDark ? "text-white/60" : "text-[#0A1628]/60"} text-sm`}>
          We will respond within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${isDark ? "bg-white/5 border border-[#C9A84C]/30" : "bg-[#0A1628]/5 border border-[#C9A84C]/30"} rounded-2xl p-8 text-left`}
    >
      <h3 className="text-[#C9A84C] text-lg font-semibold text-center mb-6">
        {title}
      </h3>

      <div className="mb-4">
        <label className={labelClasses}>Your Name *</label>
        <input
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClasses}
          required
        />
      </div>

      <div className="mb-4">
        <label className={labelClasses}>Your Email *</label>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
          required
        />
      </div>

      {showPurpose && (
        <div className="mb-4">
          <label className={labelClasses}>Purpose *</label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value as Purpose)}
            className={`${inputClasses} ${selectBg}`}
            required
          >
            {PURPOSE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-6">
        <label className={labelClasses}>Message *</label>
        <textarea
          rows={4}
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClasses} resize-none`}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#C9A84C] hover:bg-[#B8943E] text-[#0A1628] font-bold py-4 rounded-xl transition-all duration-300 text-base uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}
