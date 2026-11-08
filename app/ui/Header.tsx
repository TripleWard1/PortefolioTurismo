'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useScrollLock } from './hooks';
import { byId } from './projects';

/* Páginas que abrem com fotografia em ecrã inteiro: o cabeçalho fica transparente por cima */
export function hasDarkHero(path: string) {
  if (path === '/' || path === '/percurso' || path === '/contacto') return true;
  const m = path.match(/^\/projetos\/([^/]+)/);
  return !!m && !!byId(m[1]) && !byId(m[1])!.logo;
}

export const NAV = [
  { href: '/', pt: 'Início', en: 'Home' },
  { href: '/projetos', pt: 'Projetos', en: 'Work' },
  { href: '/percurso', pt: 'Percurso', en: 'Track record' },
  { href: '/contacto', pt: 'Contacto', en: 'Contact' },
];

export function LangSwitch({ light = false }: { light?: boolean }) {
  const { lang, toggleLang, t } = useLang();
  const on = light ? 'text-white' : 'text-ink';
  const off = light ? 'text-white/55' : 'text-mute';
  return (
    <button onClick={toggleLang} aria-label={t('Mudar idioma para inglês', 'Switch language to Portuguese')} className={`t-label h-8 px-2.5 rounded-full transition-colors ${light ? 'hover:bg-white/10' : 'hover:bg-soft'}`}>
      <span className={lang === 'pt' ? on : off}>PT</span>
      <span className={`mx-1 ${light ? 'text-white/30' : 'text-line'}`}>/</span>
      <span className={lang === 'en' ? on : off}>EN</span>
    </button>
  );
}

export default function Header() {
  const { lang, t } = useLang();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(() => hasDarkHero(path));
  useScrollLock(open);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 4);
      // Transparente enquanto a abertura escura ([data-hero]) estiver por baixo do cabeçalho
      const hero = document.querySelector('[data-hero]');
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > 40);
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
    <header
      className={`sticky top-0 z-[400] transition-[background-color,box-shadow,color] duration-500 ${
        light ? 'bg-transparent' : scrolled || open ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_#e8e8ed]' : 'bg-white'
      }`}
    >
      <div className="wrap h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <span className={`w-8 h-8 rounded-full grid place-items-center text-[12px] font-semibold tracking-tight shrink-0 transition-colors ${light ? 'bg-white text-ink' : 'bg-ink text-white'}`}>HB</span>
          <span className="leading-tight min-w-0">
            <span className={`block text-[15px] font-semibold tracking-[-0.02em] transition-colors ${light ? 'text-white' : 'text-ink'}`}>Hugo Barros</span>
            <span className={`hidden sm:block t-label truncate transition-colors ${light ? 'text-white/65' : 'text-mute'}`}>{t('Inovação e Desenvolvimento Turístico', 'Tourism Innovation and Development')}</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label={t('Navegação principal', 'Main navigation')}>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? 'page' : undefined}
              className={`t-label h-8 px-3 rounded-full inline-flex items-center transition-colors ${
                light ? (isActive(n.href) ? 'text-white bg-white/15' : 'text-white/70 hover:text-white') : isActive(n.href) ? 'text-ink bg-soft' : 'text-mute hover:text-ink'
              }`}
            >
              {n[lang]}
            </Link>
          ))}
          <span className={`w-px h-4 mx-2 ${light ? 'bg-white/25' : 'bg-line'}`} />
          <button
            onClick={search}
            aria-label={t('Procurar', 'Search')}
            className={`w-8 h-8 rounded-full grid place-items-center transition-colors ${light ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-mute hover:text-ink hover:bg-soft'}`}
          >
            <Search className="w-4 h-4" />
          </button>
          <LangSwitch light={light} />
        </nav>

        <div className="md:hidden flex items-center gap-1">
          <button onClick={search} aria-label={t('Procurar', 'Search')} className={`w-9 h-9 rounded-full grid place-items-center ${light ? 'text-white' : 'text-ink'}`}>
            <Search className="w-[18px] h-[18px]" />
          </button>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open} className={`w-9 h-9 rounded-full grid place-items-center ${light ? 'text-white' : 'text-ink'}`}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-white" aria-label={t('Navegação principal', 'Main navigation')}>
          <div className="wrap pt-6">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={`block py-3 text-[2rem] font-semibold tracking-[-0.035em] ${isActive(n.href) ? 'text-ink' : 'text-mute'}`}>
                {n[lang]}
              </Link>
            ))}
            <div className="mt-8 pt-6 border-t border-line">
              <LangSwitch />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
