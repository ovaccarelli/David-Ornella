"use client";

import { Language, translations } from "@/_data/translations";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const LanguageContext = createContext({
  language: "it" as Language,
  setLanguage: (() => {}) as (language: Language) => void,
  t: translations.it as (typeof translations)[Language],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("it");

  useEffect(() => {
    const saved = window.localStorage.getItem("wedding-language") as Language | null;
    if (saved && saved in translations) {
      window.queueMicrotask(() => setLanguage(saved));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("wedding-language", language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
