'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { NAV } from './Header';

export const EMAIL = 'hugo.barros@cm-braga.pt';
export const LINKEDIN = 'https://www.linkedin.com/in/hugo-abreu-barros/';

export default function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="bg-ink text-cream mt-24">
      <div className="wrap py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="font-serif text-[1.6rem]">Hugo Barros</p>
          <p className="mt-3 text-[15px] leading-relaxed text-cream/65 max-w-sm">
            {t(
              'Técnico Superior de Inovação e Desenvolvimento Turístico. Divisão de Atividades Económicas e Turismo, Município de Braga.',
              'Senior Officer for Tourism Innovation and Development. Economic Activities and Tourism Division, Municipality of Braga.'
            )}
          </p>
        </div>
        <nav className="md:col-span-3 flex flex-col gap-2.5" aria-label={t('Rodapé', 'Footer')}>
          <span className="text-[12px] uppercase tracking-[0.12em] text-cream/45 mb-1">{t('Páginas', 'Pages')}</span>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-[15px] text-cream/80 hover:text-cream w-fit">
              {n[lang]}
            </Link>
          ))}
        </nav>
        <div className="md:col-span-4 flex flex-col gap-2.5">
          <span className="text-[12px] uppercase tracking-[0.12em] text-cream/45 mb-1">{t('Contacto', 'Contact')}</span>
          <a href={`mailto:${EMAIL}`} className="text-[15px] text-cream/80 hover:text-cream w-fit">
            {EMAIL}
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-[15px] text-cream/80 hover:text-cream inline-flex items-center gap-1 w-fit">
            LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="wrap py-5 text-[13px] text-cream/45 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Hugo Barros</span>
          <span>Braga, Portugal</span>
        </div>
      </div>
    </footer>
  );
}
