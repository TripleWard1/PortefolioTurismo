'use client';

import Link from 'next/link';
import { useLang } from './LanguageContext';
import { NAV } from './Header';

export const EMAIL = 'hugo.barros@cm-braga.pt';
export const LINKEDIN = 'https://www.linkedin.com/in/hugo-abreu-barros/';

export default function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="mt-32 border-t border-line">
      <div className="wrap py-12 grid grid-cols-2 md:grid-cols-12 gap-8 t-label">
        <div className="col-span-2 md:col-span-6">
          <p className="text-ink font-semibold">Hugo Barros</p>
          <p className="mt-2 text-mute max-w-sm leading-relaxed">
            {t(
              'Técnico Superior de Inovação e Desenvolvimento Turístico, Município de Braga.',
              'Senior Officer for Tourism Innovation and Development, Municipality of Braga.'
            )}
          </p>
        </div>
        <nav className="md:col-span-3 flex flex-col gap-2" aria-label={t('Rodapé', 'Footer')}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-mute hover:text-ink w-fit transition-colors">
              {n[lang]}
            </Link>
          ))}
        </nav>
        <div className="md:col-span-3 flex flex-col gap-2">
          <a href={`mailto:${EMAIL}`} className="text-mute hover:text-ink w-fit transition-colors">
            {EMAIL}
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-mute hover:text-ink w-fit transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="wrap pb-10 t-label text-mute flex justify-between">
        <span>© {new Date().getFullYear()} Hugo Barros</span>
        <span>Braga, Portugal</span>
      </div>
    </footer>
  );
}
