import { Mail } from "lucide-react";

export default function EmailButton() {
  return (
    <a
      href="mailto:info@abhiarafoundation.org"
      className="whatsapp-float group"
      aria-label="Email Abhiara Foundation"
      title="Email Abhiara Foundation"
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full bg-[#C9A84C]"
        style={{ animation: "pulse-ring 2s ease-out infinite" }}
      />
      <Mail size={26} className="text-white relative z-10" />
    </a>
  );
}
