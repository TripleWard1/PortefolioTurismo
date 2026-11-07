'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { useLang } from './LanguageContext';
import { SECTIONS, goTo } from './sections';
import { useBragaTime, useScrollLock } from './hooks';

export default function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { lang, toggleLang, t } = useLang();
  const [active, setActive] = useState<string>('');
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hover, setHover] = useState(0);
  const time = useBragaTime();
  useScrollLock(menuOpen);

  // Capítulo ativo
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: '-50% 0px -50% 0px' }
    );
    ['top', ...SECTIONS.map((s) => s.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Esconde ao descer, mostra ao subir + progresso global
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 400);
        last = y;
      }
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [menuOpen]);

  const current = SECTIONS.find((s) => s.id === active);
  const nav = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => goTo(id), menuOpen ? 450 : 0);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[500] transition-transform duration-700 ease-out ${
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            scrolled && !menuOpen ? 'opacity-100' : 'opacity-0'
          } bg-gradient-to-b from-night/90 via-night/60 to-transparent backdrop-blur-[2px]`}
        />
        <div className="wrap relative h-[76px] flex items-center gap-4">
          {/* Monograma */}
          <button onClick={() => nav('top')} className="group flex items-center gap-3 shrink-0" aria-label="Início">
            <span className="relative w-10 h-10 rounded-full border border-[var(--line-2)] grid place-items-center overflow-hidden">
              <span className="font-display italic text-[17px] text-bone leading-none transition-transform duration-500 group-hover:-translate-y-8">
                hb
              </span>
              <span className="absolute font-display italic text-[17px] text-ember leading-none translate-y-8 transition-transform duration-500 group-hover:translate-y-0">
                hb
              </span>
            </span>
            <span className="hidden sm:flex flex-col items-start leading-none">
              <span className="text-[14px] font-medium tracking-[-0.01em] text-bone">Hugo Barros</span>
              <span className="label-sm text-[var(--fg-3)] mt-1.5">{t('Turismo · Braga', 'Tourism · Braga')}</span>
            </span>
          </button>

          {/* Capítulo atual */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="h-5 overflow-hidden">
              <div
                key={current?.id || 'top'}
                className="rise flex items-center gap-3 label text-[var(--fg-2)]"
              >
                {current ? (
                  <>
                    <span className="text-ember tabular">{current.n}</span>
                    <span className="w-6 h-px bg-[var(--line-2)]" />
                    <span>{current.label[lang]}</span>
                  </>
                ) : (
                  <span className="flex items-center gap-2.5">
                    <span className="live-dot" />
                    Braga {time}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 md:hidden" />

          {/* Ações */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onOpenPalette}
              className="hidden sm:flex items-center gap-2.5 h-10 pl-3.5 pr-2 rounded-full border border-[var(--line)] hover:border-[var(--line-2)] bg-white/[0.02] transition-colors"
              aria-label={t('Pesquisar', 'Search')}
            >
              <Search className="w-3.5 h-3.5 text-[var(--fg-2)]" />
              <span className="text-[13px] text-[var(--fg-2)]">{t('Procurar', 'Search')}</span>
              <kbd className="label-sm text-[var(--fg-3)] border border-[var(--line)] rounded-full px-2 py-1">⌘K</kbd>
            </button>
            <button
              onClick={onOpenPalette}
              className="sm:hidden w-10 h-10 rounded-full border border-[var(--line)] grid place-items-center"
              aria-label={t('Pesquisar', 'Search')}
            >
              <Search className="w-4 h-4 text-[var(--fg-2)]" />
            </button>

            <button
              onClick={toggleLang}
              aria-label={t('Mudar para inglês', 'Switch to Portuguese')}
              className="relative h-10 w-[72px] rounded-full border border-[var(--line)] hover:border-[var(--line-2)] label flex items-center transition-colors"
            >
              <span
                className="absolute top-1 bottom-1 w-[32px] rounded-full bg-bone transition-transform duration-500 ease-out"
                style={{ transform: `translateX(${lang === 'pt' ? 4 : 34}px)` }}
              />
              <span className={`relative w-1/2 text-center transition-colors ${lang === 'pt' ? 'text-night' : 'text-[var(--fg-3)]'}`}>PT</span>
              <span className={`relative w-1/2 text-center transition-colors ${lang === 'en' ? 'text-night' : 'text-[var(--fg-3)]'}`}>EN</span>
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className="group h-10 pl-4 pr-3 rounded-full bg-bone text-night flex items-center gap-3 hover:bg-ember transition-colors duration-300"
            >
              <span className="hidden sm:block text-[13px] font-medium">{menuOpen ? t('Fechar', 'Close') : 'Menu'}</span>
              <span className="relative w-4 h-3">
                <span className={`absolute left-0 right-0 h-[1.5px] bg-current transition-all duration-500 ease-out ${menuOpen ? 'top-[5px] rotate-45' : 'top-0.5'}`} />
                <span className={`absolute left-0 right-0 h-[1.5px] bg-current transition-all duration-500 ease-out ${menuOpen ? 'top-[5px] -rotate-45' : 'top-2'}`} />
              </span>
            </button>
          </div>
        </div>
        {/* Progresso de leitura */}
        <div ref={bar} className="absolute inset-x-0 bottom-0 h-px bg-ember origin-left" style={{ transform: 'scaleX(0)' }} />
      </header>

      {/* MENU EM ECRÃ INTEIRO */}
      <div
        className={`fixed inset-0 z-[450] bg-granite transition-[clip-path] duration-[900ms] ease-io ${
          menuOpen ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)] pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="wrap h-full pt-28 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <nav className="lg:col-span-7 flex flex-col justify-center" onMouseLeave={() => setHover(0)}>
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => nav(s.id)}
                onMouseEnter={() => setHover(i)}
                className="group flex items-baseline gap-5 py-1.5 text-left border-b border-[var(--line)] last:border-0"
              >
                <span className="label tabular text-[var(--fg-3)] w-8 group-hover:text-ember transition-colors">{s.n}</span>
                <span className="overflow-hidden block">
                  <span
                    className="block h1 text-bone transition-all duration-700 ease-out group-hover:italic group-hover:translate-x-3 group-hover:text-ember"
                    style={{
                      transform: menuOpen ? undefined : 'translateY(110%)',
                      transitionDelay: menuOpen ? `${180 + i * 50}ms` : '0ms',
                    }}
                  >
                    {s.label[lang]}
                  </span>
                </span>
                {active === s.id && <span className="label-sm text-ember ml-auto">{t('Aqui', 'Here')}</span>}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center">
            <div className="relative aspect-[4/5] w-full max-w-md ml-auto rounded-[28px] overflow-hidden bg-slab">
              {SECTIONS.map((s, i) => (
                <img
                  key={s.id}
                  src={s.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-[900ms] ease-out"
                  style={{ opacity: hover === i ? 1 : 0, transform: hover === i ? 'scale(1)' : 'scale(1.08)' }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
              <span className="absolute left-5 bottom-5 label text-bone">
                {SECTIONS[hover].n} — {SECTIONS[hover].label[lang]}
              </span>
            </div>
          </div>

          <div className="lg:col-span-12 flex flex-wrap items-end justify-between gap-4 pt-6 border-t border-[var(--line)]">
            <a
              href="mailto:hugo.barros@cm-braga.pt"
              tabIndex={menuOpen ? 0 : -1}
              className="group flex items-center gap-2 text-bone text-lg"
            >
              hugo.barros@cm-braga.pt
              <ArrowUpRight className="w-4 h-4 text-ember transition-transform group-hover:rotate-45" />
            </a>
            <div className="flex items-center gap-6 label text-[var(--fg-3)]">
              <a
                href="https://www.linkedin.com/in/hugo-abreu-barros/"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={menuOpen ? 0 : -1}
                className="hover:text-bone transition-colors"
              >
                LinkedIn ↗
              </a>
              <span className="flex items-center gap-2">
                <span className="live-dot" /> Braga {time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
