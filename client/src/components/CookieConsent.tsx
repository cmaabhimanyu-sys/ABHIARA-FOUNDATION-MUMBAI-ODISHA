/**
 * Optional analytics preference banner. Required website functions remain available.
 * Stores the choice locally and never loads optional trackers before permission.
 * Bilingual: English + Odia
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Cookie, X } from "lucide-react";
import {
  CONSENT_KEY,
  hasAnalyticsConsent,
  startOptionalAnalytics,
  stopOptionalAnalytics,
} from "@/lib/analyticsConsent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (hasAnalyticsConsent(consent)) startOptionalAnalytics();
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      const reopen = () => setVisible(true);
      window.addEventListener("abhiara:cookie-settings", reopen);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("abhiara:cookie-settings", reopen);
      };
    }
    const reopen = () => setVisible(true);
    window.addEventListener("abhiara:cookie-settings", reopen);
    return () => window.removeEventListener("abhiara:cookie-settings", reopen);
  }, []);

  const acceptAll = () => {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ accepted: true, date: new Date().toISOString() })
    );
    startOptionalAnalytics();
    setVisible(false);
  };

  const acceptEssential = () => {
    const alreadyRunning = document.querySelector(
      "script[data-abhiara-analytics]"
    );
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ accepted: "essential", date: new Date().toISOString() })
    );
    stopOptionalAnalytics();
    setVisible(false);
    // Unload trackers already active in the page when a visitor changes their choice.
    if (alreadyRunning) window.location.reload();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 animate-[slideUp_0.4s_ease-out]">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-2xl shadow-black/10 p-5 md:p-6">
        <div className="flex items-start gap-4">
          {/* Cookie Icon */}
          <div className="hidden sm:flex w-10 h-10 rounded-full bg-[#F5A623]/10 items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie size={20} className="text-[#F5A623]" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-serif text-base font-bold text-[#1A1A1A] mb-2">
              {t("Cookie settings", "କୁକି ସେଟିଂ")}
            </h3>
            <p className="font-sans text-[13px] text-[#555] leading-relaxed mb-4">
              {t(
                "We use required cookies for basic website functions. If you allow all cookies, we may also use analytics to understand how the website is used.",
                "ୱେବସାଇଟର ମୂଳ କାମ ପାଇଁ ଆମେ ଆବଶ୍ୟକ କୁକି ବ୍ୟବହାର କରୁ। ଆପଣ ସମସ୍ତ କୁକିକୁ ଅନୁମତି ଦେଲେ, ୱେବସାଇଟ କିପରି ବ୍ୟବହାର ହେଉଛି ବୁଝିବା ପାଇଁ ଆମେ ବିଶ୍ଳେଷଣ କୁକି ମଧ୍ୟ ବ୍ୟବହାର କରିପାରୁ।"
              )}{" "}
              <Link
                href="/privacy"
                className="text-[#F5A623] hover:text-[#F5A623] underline transition-colors"
              >
                {t("Privacy Policy", "ଗୋପନୀୟତା ନୀତି")}
              </Link>
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={acceptAll}
                className="px-5 py-2.5 bg-[#1A1A1A] text-white font-mono text-[10px] font-bold tracking-[0.12em] uppercase hover:bg-[#111111] transition-colors rounded-md"
              >
                {t("Allow all", "ସମସ୍ତକୁ ଅନୁମତି ଦିଅନ୍ତୁ")}
              </button>
              <button
                onClick={acceptEssential}
                className="px-5 py-2.5 border border-gray-300 text-[#555] font-mono text-[10px] font-bold tracking-[0.12em] uppercase hover:border-[#F5A623] hover:text-[#F5A623] transition-colors rounded-md"
              >
                {t("Required only", "କେବଳ ଆବଶ୍ୟକ")}
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={acceptEssential}
            className="text-gray-400 hover:text-[#1A1A1A] transition-colors flex-shrink-0"
            aria-label={t(
              "Close and use required cookies only",
              "ବନ୍ଦ କରି କେବଳ ଆବଶ୍ୟକ କୁକି ବ୍ୟବହାର କରନ୍ତୁ"
            )}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
