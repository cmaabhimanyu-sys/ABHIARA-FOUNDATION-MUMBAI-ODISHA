import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/91XXXXXXXXXX"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float group"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        style={{ animation: "pulse-ring 2s ease-out infinite" }}
      />
      <MessageCircle size={26} className="text-white relative z-10 fill-white" />
    </a>
  );
}
