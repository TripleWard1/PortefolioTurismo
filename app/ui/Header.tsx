'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Search } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useScrollLock } from './hooks';
import { AREAS } from './projects';
import { TONE } from './viz/palette';
import { EMAIL } from './Footer';

export const NAV = [
  { href: '/', pt: 'Início', en: 'Home' },
  { href: '/projetos', pt: 'Projetos', en: 'Work' },
  { href: '/percurso', pt: 'Percurso', en: 'Track record' },
  { href: '/contacto', pt: 'Contacto', en: 'Contact' },
];

/* Páginas que abrem com uma abertura escura: o cabeçalho começa em modo claro sobre ela */
export function hasDarkHero(path: string) {
  return path === '/' || path === '/percurso' || path === '/contacto' || /^\/projetos\/[^/]+/.test(path);
}

/* Monograma: as iniciais em serifada itálica, dentro de um anel com os quatro tons das áreas */
export function Monogram({ light = false, size = 40 }: { light?: boolean; size?: number }) {
  return (
    <span className="relative grid place-items-center shrink-0 rounded-full" style={{ width: size, height: size }}>
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 210deg, ${TONE.europeu.glow}, ${TONE.internacional.glow}, ${TONE.produto.glow}, ${TONE.digital.glow}, ${TONE.europeu.glow})`,
          opacity: light ? 0.9 : 1,
        }}
      />
      <span className={`absolute inset-[2px] rounded-full transition-colors duration-500 ${light ? 'bg-[#141312]' : 'bg-ink'}`} />
      <span className="relative em text-white leading-none" style={{ fontSize: size * 0.46 }}>
        hb
      </span>
    </span>
  );
}

export function LangSwitch({ light = false }: { light?: boolean }) {
  const { lang, toggleLang, t } = useLang();
  return (
    <button
      onClick={toggleLang}
      aria-label={t('Mudar idioma para inglês', 'Switch language to Portuguese')}
      className={`relative t-label h-9 w-[68px] rounded-full grid grid-cols-2 items-center transition-colors ${light ? 'bg-white/10 text-white' : 'bg-soft text-ink'}`}
    >
      <span
        className={`absolute top-1 bottom-1 w-[30px] rounded-full transition-transform duration-300 ${light ? 'bg-white/20' : 'bg-white shadow-sm'}`}
        style={{ transform: `translateX(${lang === 'pt' ? 4 : 34}px)` }}
        aria-hidden
      />
      <span className={`relative ${lang === 'pt' ? '' : 'opacity-50'}`}>PT</span>
      <span className={`relative ${lang === 'en' ? '' : 'opacity-50'}`}>EN</span>
    </button>
  );
}

export default function Header() {
  const { lang, t } = useLang();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(() => hasDarkHero(path));
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useScrollLock(open);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      // Transparente enquanto a abertura escura ([data-hero]) estiver por baixo do cabeçalho
      const hero = document.querySelector('[data-hero]');
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > 48);
      // Esconde ao descer, mostra ao subir
      setHidden(y > 240 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 240) setHidden(false);
      lastY.current = y;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [path]);

  const light = overHero && !open;
  const isActive = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));
  const search = () => window.dispatchEvent(new Event('open-search'));

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[999] focus:rounded-full focus:bg-ink focus:text-white focus:px-4 focus:py-2 t-label">
        {t('Saltar para o conteúdo', 'Skip to content')}
      </a>
      <header
        className={`sticky top-0 z-[400] h-20 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="wrap h-full flex items-center">
          <div
            className={`w-full flex items-center justify-between gap-4 rounded-full pl-2 pr-2 py-2 transition-[background-color,box-shadow,border-color] duration-500 border ${
              light
                ? 'bg-white/[0.06] backdrop-blur-xl border-white/15 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]'
                : 'bg-white/80 backdrop-blur-xl border-black/[0.06] shadow-[0_12px_40px_-24px_rgba(0,0,0,0.35)]'
            }`}
          >
            {/* Marca */}
            <Link href="/" className="flex items-center gap-3 min-w-0 pr-2" aria-label="Hugo Barros, início">
              <Monogram light={light} />
              <span className="leading-tight min-w-0">
                <span className={`block text-[15px] font-semibold tracking-[-0.02em] transition-colors ${light ? 'text-white' : 'text-ink'}`}>Hugo Barros</span>
                <span className={`hidden sm:block em text-[14px] leading-tight truncate transition-colors ${light ? 'text-[#E9DCC4]' : 'text-mute'}`}>
                  {t('projetos de turismo', 'tourism projects')}
                </span>
              </span>
            </Link>

            {/* Navegação com indicador deslizante */}
            <nav className="hidden md:flex items-center gap-0.5 relative" aria-label={t('Navegação principal', 'Main navigation')}>
              {NAV.map((n) => {
                const on = isActive(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    aria-current={on ? 'page' : undefined}
                    className={`relative t-label h-10 px-4 rounded-full inline-flex items-center transition-colors ${
                      light ? (on ? 'text-ink' : 'text-white/75 hover:text-white') : on ? 'text-white' : 'text-mute hover:text-ink'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-full ${light ? 'bg-white' : 'bg-ink'}`}
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                    <span className="relative">{n[lang]}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1.5">
              <button
                onClick={search}
                aria-label={t('Procurar (Ctrl K)', 'Search (Ctrl K)')}
                className={`w-10 h-10 rounded-full grid place-items-center transition-colors ${light ? 'text-white/85 hover:bg-white/10' : 'text-ink hover:bg-soft'}`}
              >
                <Search className="w-[17px] h-[17px]" />
              </button>
              <span className="hidden md:block">
                <LangSwitch light={light} />
              </span>
              <Link
                href="/contacto"
                className={`hidden lg:inline-flex h-10 pl-4 pr-3 rounded-full items-center gap-1.5 t-label transition-colors ${
                  light ? 'bg-[#E9DCC4] text-ink hover:bg-white' : 'bg-ink text-white hover:bg-black'
                }`}
              >
                {t('Propor cooperação', 'Propose a partnership')}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Menu"
                aria-expanded={open}
                className={`md:hidden w-10 h-10 rounded-full grid place-items-center ${light ? 'bg-white/10 text-white' : 'bg-ink text-white'}`}
              >
                <span className="relative w-4 h-3" aria-hidden>
                  <span className={`absolute left-0 right-0 h-[1.5px] bg-current rounded transition-all duration-300 ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
                  <span className={`absolute left-0 right-0 h-[1.5px] bg-current rounded transition-all duration-300 ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu móvel em ecrã inteiro */}
      <div
        className={`md:hidden fixed inset-0 z-[390] text-white transition-[clip-path] duration-700 ease-[cubic-bezier(.76,0,.24,1)] ${open ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)] pointer-events-none'}`}
        style={{ background: '#141312' }}
        aria-hidden={!open}
      >
        <div className="grain absolute inset-0" />
        <nav className="relative wrap pt-28 pb-10 h-full flex flex-col" aria-label={t('Navegação principal', 'Main navigation')}>
          <ul>
            {NAV.map((n, i) => (
              <li key={n.href} className="overflow-hidden">
                <Link
                  href={n.href}
                  tabIndex={open ? 0 : -1}
                  className={`flex items-baseline gap-4 py-2 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                  style={{ transitionDelay: open ? `${150 + i * 60}ms` : '0ms' }}
                >
                  <span className="em text-[1.25rem] text-white/40 w-8">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`text-[2.75rem] font-semibold tracking-[-0.04em] leading-tight ${isActive(n.href) ? 'text-white' : 'text-white/55'}`}>{n[lang]}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <Link key={a.id} href={`/projetos?area=${a.id}`} tabIndex={open ? 0 : -1} className="t-label rounded-full px-3.5 py-1.5 ring-1 ring-inset ring-white/15 text-white/75 inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: TONE[a.id].glow }} />
                {a.label[lang]}
              </Link>
            ))}
          </div>
          <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between gap-4">
            <a href={`mailto:${EMAIL}`} tabIndex={open ? 0 : -1} className="t-label text-white/70 break-all">
              {EMAIL}
            </a>
            <LangSwitch light />
          </div>
        </nav>
      </div>
    </>
  );
}
