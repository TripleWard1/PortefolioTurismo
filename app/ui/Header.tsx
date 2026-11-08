'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useScrollLock } from './hooks';

export const NAV = [
  { href: '/', pt: 'Início', en: 'Home' },
  { href: '/projetos', pt: 'Projetos', en: 'Work' },
  { href: '/percurso', pt: 'Percurso', en: 'Track record' },
  { href: '/contacto', pt: 'Contacto', en: 'Contact' },
];

export function LangSwitch() {
  const { lang, toggleLang, t } = useLang();
  return (
    <button onClick={toggleLang} aria-label={t('Mudar idioma para inglês', 'Switch language to Portuguese')} className="t-label h-8 px-2.5 rounded-full hover:bg-soft transition-colors">
      <span className={lang === 'pt' ? 'text-ink' : 'text-mute'}>PT</span>
      <span className="text-line mx-1">/</span>
      <span className={lang === 'en' ? 'text-ink' : 'text-mute'}>EN</span>
    </button>
  );
}

export default function Header() {
  const { lang, t } = useLang();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useScrollLock(open);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 4);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const isActive = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));
  const search = () => window.dispatchEvent(new Event('open-search'));

  return (
    <header className={`sticky top-0 z-[400] transition-[background-color,box-shadow] duration-300 ${scrolled || open ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_#e8e8ed]' : 'bg-white'}`}>
      <div className="wrap h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <span className="w-8 h-8 rounded-full bg-ink text-white grid place-items-center text-[12px] font-semibold tracking-tight shrink-0">HB</span>
          <span className="leading-tight min-w-0">
            <span className="block text-[15px] font-semibold tracking-[-0.02em] text-ink">Hugo Barros</span>
            <span className="hidden sm:block t-label text-mute truncate">{t('Inovação e Desenvolvimento Turístico', 'Tourism Innovation and Development')}</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label={t('Navegação principal', 'Main navigation')}>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? 'page' : undefined}
              className={`t-label h-8 px-3 rounded-full inline-flex items-center transition-colors ${isActive(n.href) ? 'text-ink bg-soft' : 'text-mute hover:text-ink'}`}
            >
              {n[lang]}
            </Link>
          ))}
          <span className="w-px h-4 bg-line mx-2" />
          <button onClick={search} aria-label={t('Procurar', 'Search')} className="w-8 h-8 rounded-full grid place-items-center text-mute hover:text-ink hover:bg-soft transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <LangSwitch />
        </nav>

        <div className="md:hidden flex items-center gap-1">
          <button onClick={search} aria-label={t('Procurar', 'Search')} className="w-9 h-9 rounded-full grid place-items-center text-ink">
            <Search className="w-[18px] h-[18px]" />
          </button>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open} className="w-9 h-9 rounded-full grid place-items-center text-ink">
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
