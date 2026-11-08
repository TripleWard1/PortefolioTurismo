'use client';

import Link from 'next/link';
import { useLang } from './LanguageContext';
import { NAV } from './Header';
import { AREAS } from './projects';
import { ROLE } from './profile';
import { TONE } from './viz/palette';

export const EMAIL = 'hugo.barros@cm-braga.pt';
export const LINKEDIN = 'https://www.linkedin.com/in/hugo-abreu-barros/';

export default function Footer() {
  const { t, lang } = useLang();
  const col = 'flex flex-col gap-2.5';
  const link = 'text-mute hover:text-ink w-fit transition-colors';
  return (
    <footer className="mt-32 bg-soft">
      <div className="wrap pt-16 pb-12 grid grid-cols-2 md:grid-cols-12 gap-10 t-label">
        <div className="col-span-2 md:col-span-4">
          <p className="text-[1.25rem] font-semibold tracking-[-0.025em] text-ink normal-case">Hugo Barros</p>
          <p className="mt-1 text-mute">{ROLE[lang]}</p>
          <p className="mt-6 text-mute max-w-sm leading-relaxed">
            {t(
              'Estratégia de destino, candidaturas e redes europeias, promoção internacional e desenvolvimento de produto turístico.',
              'Destination strategy, European bids and networks, international promotion and tourism product development.'
            )}
          </p>
        </div>
        <nav className={`md:col-span-2 ${col}`} aria-label={t('Rodapé', 'Footer')}>
          <p className="text-ink mb-1">{t('Navegação', 'Navigation')}</p>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={link}>
              {n[lang]}
            </Link>
          ))}
        </nav>
        <div className={`md:col-span-3 ${col}`}>
          <p className="text-ink mb-1">{t('Áreas', 'Areas')}</p>
          {AREAS.map((a) => (
            <Link key={a.id} href={`/projetos?area=${a.id}`} className={`${link} inline-flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: TONE[a.id].deep }} />
              {a.label[lang]}
            </Link>
          ))}
        </div>
        <div className={`col-span-2 md:col-span-3 ${col}`}>
          <p className="text-ink mb-1">{t('Contacto', 'Contact')}</p>
          <a href={`mailto:${EMAIL}`} className={`${link} break-words`}>
            {EMAIL}
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={link}>
            LinkedIn
          </a>
          <span className="text-mute">Braga, Portugal</span>
        </div>
      </div>
      <div className="wrap pb-10 t-label text-mute flex flex-wrap gap-2 justify-between border-t border-line pt-6">
        <span>© {new Date().getFullYear()} Hugo Barros</span>
        <span>{t('Portefólio profissional · PT / EN', 'Professional portfolio · PT / EN')}</span>
      </div>
    </footer>
  );
}
