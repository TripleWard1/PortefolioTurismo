'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useScrollLock } from './hooks';

export const NAV = [
  { href: '/', pt: 'Início', en: 'Home' },
  { href: '/projetos', pt: 'Projetos', en: 'Projects' },
  { href: '/percurso', pt: 'Percurso', en: 'Track record' },
  { href: '/contacto', pt: 'Contacto', en: 'Contact' },
];

export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, toggleLang, t } = useLang();
  return (
    <button onClick={toggleLang} aria-label={t('Mudar idioma para inglês', 'Switch language to Portuguese')} className={`text-[13px] font-semibold ${className}`}>
      <span className={lang === 'pt' ? 'text-ink' : 'text-muted/70 hover:text-ink'}>PT</span>
      <span className="text-line mx-1.5">/</span>
      <span className={lang === 'en' ? 'text-ink' : 'text-muted/70 hover:text-ink'}>EN</span>
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
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const isActive = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));

  return (
    <header className={`sticky top-0 z-[400] bg-cream/90 backdrop-blur-md transition-shadow ${scrolled ? 'shadow-[0_1px_0_#ddd6c8]' : ''}`}>
      <div className="wrap h-[72px] flex items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-3 shrink-0">
          <span className="font-serif text-[22px] font-medium text-ink tracking-[-0.01em]">Hugo Barros</span>
          <span className="hidden md:inline text-[13px] text-muted">{t('Turismo · Município de Braga', 'Tourism · Municipality of Braga')}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label={t('Navegação principal', 'Main navigation')}>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? 'page' : undefined}
              className={`relative px-3.5 py-2 text-[15px] transition-colors ${isActive(n.href) ? 'text-ink' : 'text-muted hover:text-ink'}`}
            >
              {n[lang]}
              <span className={`absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] bg-petrol transition-transform origin-left duration-300 ${isActive(n.href) ? 'scale-x-100' : 'scale-x-0'}`} />
            </Link>
          ))}
          <span className="w-px h-5 bg-line mx-3" />
          <LangSwitch />
        </nav>

        <div className="lg:hidden flex items-center gap-4">
          <LangSwitch />
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open} className="w-10 h-10 grid place-items-center rounded-md border border-line">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-cream border-t border-line" aria-label={t('Navegação principal', 'Main navigation')}>
          <div className="wrap py-4">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={`block py-4 border-b border-line font-serif text-[1.6rem] ${isActive(n.href) ? 'text-petrol' : 'text-ink'}`}>
                {n[lang]}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
