/**
 * StickyDonateBar. Appears after scrolling past the hero section
 * Shows a persistent Donate CTA at the bottom of the viewport
 * Inspired by Jindal Foundation's persistent call-to-action
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Heart, X } from "lucide-react";

export default function StickyDonateBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show on donate page itself
  if (location.startsWith("/donate")) return null;
  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] shadow-2xl transform transition-all duration-500 ease-out">
      <div className="container py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Message */}
          <div className="flex items-center gap-3 flex-1">
            <Heart size={16} className="text-[#F5A623] shrink-0" fill="#F5A623" />
            <span className="font-sans text-[13px] text-white/90 hidden sm:inline">
              Every contribution helps a child learn and an elder live with dignity.
            </span>
            <span className="font-sans text-[13px] text-white/90 sm:hidden">
              Support our mission
            </span>
          </div>

          {/* Right: CTA + Close */}
          <div className="flex items-center gap-3">
            <Link
              href="/donate"
              className="flex items-center gap-2 px-5 py-2 bg-[#F5A623] text-[#1A1A1A] font-mono text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-[#D4890A] transition-colors rounded-sm"
            >
              DONATE NOW
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 text-white/50 hover:text-white transition-colors"
              aria-label="Dismiss donate banner"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
