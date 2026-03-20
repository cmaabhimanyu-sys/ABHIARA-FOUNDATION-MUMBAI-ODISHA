import { Link } from "wouter";
import { Home, ArrowLeft } from "lucide-react";
import AbhiaraLogo from "@/components/AbhiaraLogo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#0A1628" }}>
      <AbhiaraLogo className="mb-10" />
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 700, color: "#C9A84C", lineHeight: 1 }}>
        404
      </h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.50)", marginTop: "1rem", marginBottom: "2rem" }}>
        This page does not exist.
      </p>
      <Link href="/">
        <span
          className="inline-flex items-center gap-2 px-6 py-3 transition-colors"
          style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", background: "#C9A84C", color: "#0A1628", borderRadius: "3px", cursor: "pointer" }}
        >
          <ArrowLeft size={14} /> Return Home
        </span>
      </Link>
    </div>
  );
}
