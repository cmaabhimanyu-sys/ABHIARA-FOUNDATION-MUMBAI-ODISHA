import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-300 ${
        language === "od"
          ? "border-[#F5A623]/60 bg-[#F5A623]/10 text-[#F5A623]"
          : "border-gray-300 bg-gray-50 text-[#555] hover:border-[#F5A623]/60 hover:text-[#F5A623]"
      } ${className}`}
      aria-label={language === "en" ? "Switch to Odia" : "Switch to English"}
      title={language === "en" ? "ଓଡ଼ିଆରେ ପଢ଼ନ୍ତୁ" : "Read in English"}
    >
      <span className="font-mono text-[9px] tracking-wider uppercase font-bold">
        {language === "en" ? "EN" : "ଓଡ଼"}
      </span>
      <span className="text-[10px] opacity-40">|</span>
      <span className="font-mono text-[9px] tracking-wider uppercase opacity-50">
        {language === "en" ? "ଓଡ଼" : "EN"}
      </span>
    </button>
  );
}
