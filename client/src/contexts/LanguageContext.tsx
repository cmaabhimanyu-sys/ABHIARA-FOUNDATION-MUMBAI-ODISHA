import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  getDocumentLanguage,
  persistLanguage,
  resolveInitialLanguage,
  type Language,
} from "@/lib/languagePreference";

export type { Language } from "@/lib/languagePreference";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (en: string, od: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";

    const selected = resolveInitialLanguage(window.location.search, window.localStorage);
    persistLanguage(window.localStorage, selected);
    return selected;
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    persistLanguage(typeof window !== "undefined" ? window.localStorage : null, lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((previous) => {
      const next = previous === "en" ? "od" : "en";
      persistLanguage(typeof window !== "undefined" ? window.localStorage : null, next);
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = getDocumentLanguage(language);
  }, [language]);

  const t = useCallback(
    (english: string, odia: string) => (language === "en" ? english : odia),
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
