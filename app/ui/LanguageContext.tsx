'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  // 1. ADICIONAR ESTA LINHA NA INTERFACE
  t: (pt: any, en: any) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('pt');

  const toggleLang = () => {
    setLang((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  // 2. ADICIONAR A LÓGICA DA FUNÇÃO T AQUI
  const t = (pt: any, en: any) => (lang === 'pt' ? pt : en);

  return (
    // 3. ADICIONAR O 't' NO VALUE DO PROVIDER
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLang must be used within a LanguageProvider');
  }
  return context;
}