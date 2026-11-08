'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { LangSwitch, Monogram, NAV } from './Header';
import LocalTime from './LocalTime';
import { Split } from './parts';
import { AREAS } from './projects';
import { ROLE } from './profile';
import { BRASS, NIGHT, TONE } from './viz/palette';

export const EMAIL = 'hugo.barros@cm-braga.pt';
export const LINKEDIN = 'https://www.linkedin.com/in/hugo-abreu-barros/';

export default function Footer() {
  const { t, lang } = useLang();
  const path = usePathname();
  // A página inicial e a de contacto já terminam com um convite ao contacto
  const showCta = path !== '/' && path !== '/contacto';
  const head = 'mb-2 t-label';
  const link = 'text-[15px] text-white/60 hover:text-white w-fit transition-colors';

  return (
    <footer className="relative mt-32 overflow-hidden text-white" style={{ background: NIGHT }}>
      <div className="grain absolute inset-0" aria-hidden />

      {/* Convite */}
      {showCta && (
        <div className="relative wrap pt-24 md:pt-28 pb-16 flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/10" data-reveal>
          <h2 className="t-hero !text-[clamp(2.5rem,1.4rem+4.2vw,5.25rem)] max-w-[14ch]">
            <Split parts={[t('Tem um projeto', 'Have a project'), { em: t('em mente', 'in mind'), color: BRASS }, '?']} />
          </h2>
          <Link
            href="/contacto"
            className="group relative w-40 h-40 md:w-44 md:h-44 shrink-0 rounded-full bg-white text-ink grid place-items-center transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:scale-105"
          >
            <span className="text-center">
              <ArrowUpRight className="w-6 h-6 mx-auto transition-transform duration-500 group-hover:rotate-45" />
              <span className="mt-2 block t-label">{t('Falar comigo', 'Get in touch')}</span>
            </span>
          </Link>
        </div>
      )}

      {/* Colunas */}
      <div className={`relative wrap ${showCta ? 'pt-16' : 'pt-24'} pb-14 grid grid-cols-2 md:grid-cols-12 gap-10`}>
        <div className="col-span-2 md:col-span-4">
          <div className="flex items-center gap-4">
            <Monogram light size={48} />
            <div>
              <p className="text-[1.125rem] font-semibold tracking-[-0.02em]">Hugo Barros</p>
              <p className="em text-[15px]" style={{ color: BRASS }}>
                {t('projetos de turismo', 'tourism projects')}
              </p>
            </div>
          </div>
          <p className="mt-6 text-[15px] text-white/55 max-w-xs leading-relaxed">{ROLE[lang]}</p>
        </div>

        <nav className="md:col-span-2 flex flex-col gap-2" aria-label={t('Rodapé', 'Footer')}>
          <p className={head} style={{ color: BRASS }}>
            {t('Navegação', 'Navigation')}
          </p>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={link}>
              {n[lang]}
            </Link>
          ))}
        </nav>

        <div className="md:col-span-3 flex flex-col gap-2">
          <p className={head} style={{ color: BRASS }}>
            {t('Áreas', 'Areas')}
          </p>
          {AREAS.map((a) => (
            <Link key={a.id} href={`/projetos?area=${a.id}`} className={`${link} inline-flex items-center gap-2.5`}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: TONE[a.id].glow }} />
              {a.label[lang]}
            </Link>
          ))}
        </div>

        <div className="col-span-2 md:col-span-3 flex flex-col gap-2">
          <p className={head} style={{ color: BRASS }}>
            {t('Contacto', 'Contact')}
          </p>
          <a href={`mailto:${EMAIL}`} className={`${link} break-all`}>
            {EMAIL}
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-1`}>
            LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <p className="mt-3 t-label text-white/45 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9FD1A9]" />
            Braga · <LocalTime />
          </p>
        </div>
      </div>

      {/* Nome em grande, com reflexo */}
      <div className="relative wrap" aria-hidden>
        <p data-reveal className="wm overflow-hidden whitespace-nowrap leading-[1.05] pb-[0.06em] font-semibold tracking-[-0.06em] text-[clamp(3rem,0.4rem+12.6vw,12rem)] select-none" style={{ color: 'transparent' }}>
          {'Hugo Barros'.split('').map((ch, i) => (
            <span key={i} style={{ ['--i' as any]: i, backgroundImage: 'linear-gradient(180deg, #ffffff 25%, rgba(255,255,255,0.2) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </p>
        <p
          className="flex items-end whitespace-nowrap leading-[1.05] font-semibold tracking-[-0.06em] text-[clamp(3rem,0.4rem+12.6vw,12rem)] select-none -mt-[0.1em] h-[0.42em] overflow-hidden"
          style={{
            transform: 'scaleY(-1)',
            color: 'rgba(255,255,255,0.07)',
            WebkitMaskImage: 'linear-gradient(0deg, #000 0%, transparent 70%)',
            maskImage: 'linear-gradient(0deg, #000 0%, transparent 70%)',
          }}
        >
          Hugo Barros
        </p>
      </div>

      {/* Barra final */}
      <div className="relative border-t border-white/10">
        <div className="wrap py-6 flex flex-wrap items-center justify-between gap-4 t-label text-white/45">
          <span>© {new Date().getFullYear()} Hugo Barros</span>
          <div className="flex items-center gap-3">
            <LangSwitch light />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="h-9 pl-4 pr-3 rounded-full ring-1 ring-inset ring-white/15 text-white/70 hover:text-white hover:bg-white/10 inline-flex items-center gap-2 transition-colors"
            >
              {t('Voltar ao topo', 'Back to top')}
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
