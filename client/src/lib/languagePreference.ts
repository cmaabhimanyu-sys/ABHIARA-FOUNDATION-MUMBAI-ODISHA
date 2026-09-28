export type Language = "en" | "od";

export const LANGUAGE_STORAGE_KEY = "abhiara-lang";

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function normalizeLanguage(value: string | null | undefined): Language {
  return value === "od" ? "od" : "en";
}

export function readStoredLanguage(storage: StorageLike | null): Language {
  if (!storage) return "en";

  try {
    return normalizeLanguage(storage.getItem(LANGUAGE_STORAGE_KEY));
  } catch {
    return "en";
  }
}

export function readLanguageFromSearch(search: string): Language | null {
  const value = new URLSearchParams(search).get("lang");
  return value === "en" || value === "od" ? value : null;
}

export function resolveInitialLanguage(search: string, storage: StorageLike | null): Language {
  return readLanguageFromSearch(search) ?? readStoredLanguage(storage);
}

export function persistLanguage(storage: StorageLike | null, language: Language) {
  if (!storage) return;

  try {
    storage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // The website still works when browser storage is unavailable.
  }
}

export function getDocumentLanguage(language: Language) {
  return language === "od" ? "or" : "en";
}
