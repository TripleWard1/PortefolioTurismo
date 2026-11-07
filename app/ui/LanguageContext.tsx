'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: <A, B>(pt: A, en: B) => A | B;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const KEY = 'hb-lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('pt');

  // Recupera a preferência (ou o idioma do browser) sem bloquear o render
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Language | null;
      if (saved === 'pt' || saved === 'en') setLang(saved);
      else if (!navigator.language.toLowerCase().startsWith('pt')) setLang('en');
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en';
    try {
      localStorage.setItem(KEY, lang);
    } catch {}
  }, [lang]);

  const toggleLang = useCallback(() => setLang((p) => (p === 'pt' ? 'en' : 'pt')), []);
  const t = useCallback(<A, B>(pt: A, en: B) => (lang === 'pt' ? pt : en), [lang]);

  return <LanguageContext.Provider value={{ lang, toggleLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider');
  return ctx;
}
