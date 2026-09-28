import { describe, expect, it, vi } from "vitest";
import {
  getDocumentLanguage,
  LANGUAGE_STORAGE_KEY,
  normalizeLanguage,
  persistLanguage,
  readLanguageFromSearch,
  readStoredLanguage,
  resolveInitialLanguage,
} from "./languagePreference";

describe("language preference", () => {
  it("uses English when no valid saved language exists", () => {
    expect(normalizeLanguage(null)).toBe("en");
    expect(normalizeLanguage("unknown")).toBe("en");
    expect(normalizeLanguage("en")).toBe("en");
  });

  it("restores a saved Odia preference", () => {
    const storage = { getItem: vi.fn(() => "od"), setItem: vi.fn() };
    expect(readStoredLanguage(storage)).toBe("od");
    expect(storage.getItem).toHaveBeenCalledWith(LANGUAGE_STORAGE_KEY);
  });

  it("falls back to English when browser storage is unavailable", () => {
    const storage = {
      getItem: vi.fn(() => {
        throw new Error("blocked");
      }),
      setItem: vi.fn(),
    };
    expect(readStoredLanguage(storage)).toBe("en");
  });

  it("stores the selected language", () => {
    const storage = { getItem: vi.fn(), setItem: vi.fn() };
    persistLanguage(storage, "od");
    expect(storage.setItem).toHaveBeenCalledWith(LANGUAGE_STORAGE_KEY, "od");
  });

  it("accepts only English or Odia from the language query", () => {
    expect(readLanguageFromSearch("?lang=od")).toBe("od");
    expect(readLanguageFromSearch("?lang=en")).toBe("en");
    expect(readLanguageFromSearch("?lang=unknown")).toBeNull();
  });

  it("uses a valid language query before the saved preference", () => {
    const storage = { getItem: vi.fn(() => "en"), setItem: vi.fn() };
    expect(resolveInitialLanguage("?lang=od", storage)).toBe("od");
    expect(resolveInitialLanguage("", storage)).toBe("en");
  });

  it("uses the correct HTML language code", () => {
    expect(getDocumentLanguage("en")).toBe("en");
    expect(getDocumentLanguage("od")).toBe("or");
  });
});
