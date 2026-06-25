'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useLang } from './LanguageContext';

const SECTIONS = [
  { id: 'arquivo', pt: 'Portefólio', en: 'Portfolio' },
  { id: 'impacto', pt: 'Impacto', en: 'Impact' },
  { id: 'contacto', pt: 'Contacto', en: 'Contact' },
];

export default function Navbar({ onOpenPalette }: { onOpenPalette?: () => void }) {
  const [active, setActive] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useLang();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[100] bg-white border-b border-black/[0.08] border-t-[3px] border-t-[var(--primary)] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1340px] mx-auto pl-3 pr-3 sm:pl-4 sm:pr-4 h-[56px] flex items-center gap-2.5">
          {/* Logo + identidade */}
          <Link href="/" className="shrink-0 flex items-center gap-2.5 group">
            <span className="relative w-9 h-9 rounded-[11px] bg-[var(--primary)] grid place-items-center text-white font-black italic text-[13px] tracking-tight shadow-sm overflow-hidden">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white/10" />
              <span className="relative">HB</span>
            </span>
            <span className="hidden lg:flex flex-col leading-none">
              <span className="font-sans font-bold text-[14px] text-[var(--ink)] tracking-[-0.01em]">Hugo Barros</span>
              <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-[var(--ink)]/45 mt-1">
                {lang === 'pt' ? 'Atividades Económicas & Turismo' : 'Economic Activities & Tourism'}
              </span>
            </span>
          </Link>

          {/* Pesquisa - estilo LinkedIn */}
          <button
            onClick={onOpenPalette}
            className="hidden sm:flex items-center gap-2 h-9 px-3.5 rounded-full bg-[var(--ink)]/[0.05] hover:bg-[var(--ink)]/[0.08] transition-colors w-full max-w-[260px] text-left"
            aria-label={lang === 'pt' ? 'Pesquisar' : 'Search'}
          >
            <Search className="w-4 h-4 text-[var(--ink)]/55 shrink-0" />
            <span className="text-[13px] text-[var(--ink)]/55 flex-1 truncate">
              {lang === 'pt' ? 'Pesquisar projetos…' : 'Search projects…'}
            </span>
            <kbd className="font-mono text-[9px] font-semibold text-[var(--ink)]/40 bg-white/70 rounded px-1 py-0.5">⌘K</kbd>
          </button>

          <div className="flex-1" />

          {/* Navegação */}
          <nav className="hidden md:flex items-stretch h-[56px]">
            {SECTIONS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`group relative flex items-center px-4 text-[13px] font-semibold transition-colors ${
                    isActive ? 'text-[var(--ink)]' : 'text-[var(--ink)]/55 hover:text-[var(--ink)]'
                  }`}
                >
                  {lang === 'pt' ? item.pt : item.en}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[var(--primary)] transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <span className="hidden md:block h-6 w-px bg-black/10 mx-1.5" />

          {/* Idioma */}
          <button onClick={toggleLang} aria-label="PT / EN" className="hidden sm:flex items-center gap-1 font-mono text-[10px] font-black px-1.5">
            <span className={lang === 'pt' ? 'text-[var(--primary)]' : 'text-[var(--ink)]/35'}>PT</span>
            <span className="text-[var(--ink)]/20">/</span>
            <span className={lang === 'en' ? 'text-[var(--primary)]' : 'text-[var(--ink)]/35'}>EN</span>
          </button>

          {/* CTA */}
          <button
            onClick={() => go('contacto')}
            className="hidden md:inline-flex items-center h-9 px-5 rounded-full bg-[var(--primary)] hover:bg-[#004182] text-white font-bold text-[13px] transition-colors"
          >
            {lang === 'pt' ? 'Contacto' : 'Contact'}
          </button>

          {/* Mobile */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="md:hidden w-9 h-9 flex items-center justify-center text-[var(--ink)] ml-auto"
          >
            <div className="relative w-5 h-4">
              <span className={`absolute left-0 h-[2.5px] w-5 bg-current rounded-full transition-all duration-300 ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-[2.5px] w-5 bg-current rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 h-[2.5px] w-5 bg-current rounded-full transition-all duration-300 ${menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Drawer mobile */}
      <div className={`fixed inset-0 z-[99] md:hidden transition-all duration-500 ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-[var(--ink)]/50 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-[68px] left-3 right-3 rounded-xl bg-white border border-black/10 shadow-2xl p-5 transition-all duration-500 ${menuOpen ? 'translate-y-0' : '-translate-y-6'}`}>
          <button
            onClick={onOpenPalette}
            className="w-full flex items-center gap-2 h-10 px-3.5 rounded-full bg-[var(--ink)]/[0.05] mb-4"
          >
            <Search className="w-4 h-4 text-[var(--ink)]/55" />
            <span className="text-[13px] text-[var(--ink)]/55">{lang === 'pt' ? 'Pesquisar projetos…' : 'Search projects…'}</span>
          </button>
          <nav className="flex flex-col divide-y divide-black/[0.06]">
            {SECTIONS.map((item, i) => (
              <button key={item.id} onClick={() => go(item.id)} className="flex items-center justify-between py-3.5 group text-left">
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[var(--primary)] font-bold">0{i + 1}</span>
                  <span className="font-sans font-bold text-lg text-[var(--ink)] group-hover:text-[var(--primary)] transition-colors">
                    {lang === 'pt' ? item.pt : item.en}
                  </span>
                </span>
                <span className="text-[var(--ink)]/30 group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all">→</span>
              </button>
            ))}
          </nav>
          <button
            onClick={() => go('contacto')}
            className="mt-5 w-full inline-flex items-center justify-center py-3 rounded-full bg-[var(--primary)] hover:bg-[#004182] text-white font-bold text-[14px] transition-colors"
          >
            {lang === 'pt' ? 'Contacto' : 'Contact'}
          </button>
        </div>
      </div>
    </>
  );
}