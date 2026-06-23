'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from './LanguageContext';

// Mapa real das secções (ids existentes em page.tsx)
const SECTIONS = [
  { id: 'arquivo', pt: 'Portefólio', en: 'Portfolio' },
  { id: 'capitulo-02', pt: 'Ecossistema', en: 'Ecosystem' },
  { id: 'estratégia', pt: 'Estratégia', en: 'Strategy' },
  { id: 'contacto', pt: 'Contacto', en: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const { lang, toggleLang } = useLang();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Destaca a secção ativa enquanto se scrolla
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Bloqueia scroll do body quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 px-4 sm:px-6 md:px-12 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-700 px-5 sm:px-8 py-2.5 rounded-2xl border ${
            isScrolled
              ? 'bg-white/90 backdrop-blur-xl border-slate-200/70 shadow-[0_8px_30px_-12px_rgba(10,20,36,0.18)]'
              : 'bg-white/65 backdrop-blur-md border-white/60 shadow-none'
          }`}
        >
          {/* Identidade */}
          <Link href="/" className="group flex items-center gap-4 shrink-0">
            <div className="relative">
              <h1 className="font-playfair text-2xl md:text-3xl tracking-tighter leading-none flex items-center">
                <span className="text-slate-950 font-[900] transition-transform duration-500 group-hover:-translate-y-px">
                  Hugo
                </span>
                <span className="text-[var(--primary)] italic font-light ml-1.5 relative transition-transform duration-500 group-hover:translate-y-px">
                  Barros
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--primary)]/10" />
                </span>
              </h1>
              <div className="hidden sm:flex items-center gap-2 mt-1.5">
                <div className="h-[1px] w-3 bg-[var(--primary)]/40 transition-all duration-500 group-hover:w-6" />
                <span className="font-mono text-[7px] uppercase tracking-[0.55em] text-slate-500 font-bold">
                  {lang === 'pt' ? 'Portefólio Estratégico' : 'Strategic Portfolio'}
                </span>
              </div>
            </div>
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-9">
            {SECTIONS.map((item) => {
              const isActive = active === item.id;
              return (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-[10px] uppercase tracking-[0.3em] font-black transition-all relative group ${
                    isActive
                      ? 'text-[var(--primary)]'
                      : 'text-slate-900 hover:text-[var(--primary)]'
                  }`}
                >
                  {lang === 'pt' ? item.pt : item.en}
                  <span
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-[var(--primary)] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Ações */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Toggle PT/EN */}
            <button
              onClick={toggleLang}
              aria-label={lang === 'pt' ? 'Mudar para inglês' : 'Switch to Portuguese'}
              className="relative flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 w-[70px] h-[32px] transition-all hover:border-blue-300"
            >
              <div
                className={`absolute top-1 bottom-1 w-[30px] rounded-full bg-white shadow-sm border border-slate-200/50 transition-all duration-300 ease-out ${
                  lang === 'en' ? 'translate-x-[30px]' : 'translate-x-0'
                }`}
              />
              <div className="relative z-10 flex justify-between w-full px-2">
                <span
                  className={`text-[9px] font-black transition-colors duration-300 ${
                    lang === 'pt' ? 'text-[var(--primary)]' : 'text-slate-400'
                  }`}
                >
                  PT
                </span>
                <span
                  className={`text-[9px] font-black transition-colors duration-300 ${
                    lang === 'en' ? 'text-[var(--primary)]' : 'text-slate-400'
                  }`}
                >
                  EN
                </span>
              </div>
            </button>

            {/* Badge live */}
            <div className="hidden lg:flex items-center gap-3 px-5 py-2 rounded-xl border border-blue-200/50 bg-blue-50/80 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-blue-900 font-[900]">
                Braga Strategic Hub
              </span>
            </div>

            {/* Botão mobile */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="md:hidden text-slate-950 w-9 h-9 flex items-center justify-center"
            >
              <div className="relative w-5 h-4">
                <span
                  className={`absolute left-0 h-[2.5px] w-5 bg-current rounded-full transition-all duration-300 ${
                    menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-[2.5px] w-5 bg-current rounded-full transition-all duration-300 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-[2.5px] w-5 bg-current rounded-full transition-all duration-300 ${
                    menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer mobile */}
      <div
        className={`fixed inset-0 z-[99] md:hidden transition-all duration-500 ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-[var(--ink)]/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-24 left-4 right-4 rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 transition-all duration-500 ${
            menuOpen ? 'translate-y-0' : '-translate-y-6'
          }`}
        >
          <nav className="flex flex-col divide-y divide-slate-100">
            {SECTIONS.map((item, i) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-4 group"
              >
                <span className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-[var(--primary)] font-bold">
                    0{i + 1}
                  </span>
                  <span className="font-playfair text-2xl text-slate-900 group-hover:text-[var(--primary)] transition-colors">
                    {lang === 'pt' ? item.pt : item.en}
                  </span>
                </span>
                <span className="text-slate-300 group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all">
                  →
                </span>
              </Link>
            ))}
          </nav>
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-blue-900 font-[900]">
              Braga Strategic Hub
            </span>
          </div>
        </div>
      </div>
    </>
  );
}