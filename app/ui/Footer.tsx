'use client';

import Link from 'next/link';
import { useLang } from './LanguageContext';
import { NAV } from './Header';
import { AREAS } from './projects';
import { ROLE } from './profile';
import { BRASS, NIGHT, TONE } from './viz/palette';

export const EMAIL = 'hugo.barros@cm-braga.pt';
export const LINKEDIN = 'https://www.linkedin.com/in/hugo-abreu-barros/';

export default function Footer() {
  const { t, lang } = useLang();
  const col = 'flex flex-col gap-2.5';
  const link = 'text-white/55 hover:text-white w-fit transition-colors';
  return (
    <footer className="relative mt-32 overflow-hidden text-white" style={{ background: NIGHT }}>
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative wrap pt-20 pb-12 grid grid-cols-2 md:grid-cols-12 gap-10 t-label">
        <div className="col-span-2 md:col-span-4">
          <p className="text-[1.25rem] font-semibold tracking-[-0.025em] text-white">Hugo Barros</p>
          <p className="mt-1 text-white/55">{ROLE[lang]}</p>
          <p className="mt-6 text-white/55 max-w-sm leading-relaxed">
            {t(
              'Estratégia de destino, candidaturas e redes europeias, promoção internacional e desenvolvimento de produto turístico.',
              'Destination strategy, European bids and networks, international promotion and tourism product development.'
            )}
          </p>
        </div>
        <nav className={`md:col-span-2 ${col}`} aria-label={t('Rodapé', 'Footer')}>
          <p className="mb-1" style={{ color: BRASS }}>{t('Navegação', 'Navigation')}</p>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={link}>
              {n[lang]}
            </Link>
          ))}
        </nav>
        <div className={`md:col-span-3 ${col}`}>
          <p className="mb-1" style={{ color: BRASS }}>{t('Áreas', 'Areas')}</p>
          {AREAS.map((a) => (
            <Link key={a.id} href={`/projetos?area=${a.id}`} className={`${link} inline-flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: TONE[a.id].glow }} />
              {a.label[lang]}
            </Link>
          ))}
        </div>
        <div className={`col-span-2 md:col-span-3 ${col}`}>
          <p className="mb-1" style={{ color: BRASS }}>{t('Contacto', 'Contact')}</p>
          <a href={`mailto:${EMAIL}`} className={`${link} break-words`}>
            {EMAIL}
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={link}>
            LinkedIn
          </a>
          <span className="text-white/55">Braga, Portugal</span>
        </div>
      </div>

      {/* Nome em grande, revelado letra a letra */}
      <div className="relative wrap">
        <p
          data-reveal
          aria-hidden
          className="wm overflow-hidden whitespace-nowrap leading-[1.05] pb-[0.06em] font-semibold tracking-[-0.06em] text-[clamp(3rem,0.4rem+12.6vw,12rem)] select-none"
          style={{ color: 'transparent' }}
        >
          {'Hugo Barros'.split('').map((ch, i) => (
            <span key={i} style={{ ['--i' as any]: i, backgroundImage: 'linear-gradient(180deg, #ffffff 25%, rgba(255,255,255,0.18) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </p>
      </div>

      <div className="relative wrap py-8 t-label text-white/45 flex flex-wrap gap-2 justify-between border-t border-white/10">
        <span>© {new Date().getFullYear()} Hugo Barros</span>
        <span>{t('Portefólio profissional · PT / EN', 'Professional portfolio · PT / EN')}</span>
      </div>
    </footer>
  );
}
