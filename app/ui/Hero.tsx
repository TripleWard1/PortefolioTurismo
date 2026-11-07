'use client';

import { ArrowDown, ArrowRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { goTo, useCountUp, useInView } from './hooks';
import { MISSIONS, PROJECTS } from './projects';

const COVER = 'https://i.imgur.com/SvJ4bdR.jpeg';
const PORTRAIT = 'https://i.imgur.com/Dx42oze.jpeg';
const VISIT_BRAGA = 'https://i.imgur.com/Yakcz6G.png';

function Figure({ to, label, run }: { to: number; label: string; run: boolean }) {
  const v = useCountUp(to, run);
  return (
    <div className="py-6 lg:py-7 px-5 lg:px-8">
      <p className="font-serif text-[2.6rem] leading-none text-white tabular-nums">{v}</p>
      <p className="mt-2 text-[13px] leading-snug text-white/65">{label}</p>
    </div>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const { t } = useLang();
  const [figRef, figIn] = useInView<HTMLDivElement>(0.2);
  // Entrada em cascata depois da abertura
  const anim = (d: number) => ({
    className: ready ? 'rise' : 'opacity-0',
    style: { ['--d' as any]: `${d}ms` },
  });

  const figures = [
    { to: PROJECTS.length, label: t('projetos documentados', 'documented projects') },
    { to: 29, label: t('experiências turísticas concebidas', 'tourism experiences designed') },
    { to: MISSIONS.length, label: t('missões internacionais', 'international missions') },
    { to: 2, label: t('candidaturas a capitais europeias', 'European capital bids') },
  ];

  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col bg-navy text-white overflow-hidden">
      <div className="absolute inset-0">
        <img src={COVER} alt="" fetchPriority="high" className={`w-full h-full object-cover opacity-45 ${ready ? 'slow-zoom' : ''}`} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
      </div>

      <div className="relative flex-1 wrap w-full pt-32 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <p className={`${anim(150).className} eyebrow text-gold-soft flex flex-wrap items-center gap-3`} style={anim(150).style}>
            <span className="rule" />
            {t('Município de Braga · Turismo', 'Municipality of Braga · Tourism')}
          </p>
          <h1
            className={`${anim(300).className} mt-6 font-serif font-medium text-[clamp(3rem,1.6rem+5.5vw,6.2rem)] leading-[0.98] tracking-[-0.025em]`}
            style={anim(300).style}
          >
            Hugo <em className="text-gold-soft">Barros</em>
          </h1>
          <p className={`${anim(450).className} mt-5 text-[clamp(1.05rem,0.95rem+0.4vw,1.3rem)] font-medium`} style={anim(450).style}>
            {t('Técnico Superior · Inovação e Desenvolvimento Turístico', 'Senior Officer · Tourism Innovation & Development')}
          </p>
          <p className={`${anim(600).className} mt-5 max-w-xl text-[17px] leading-relaxed text-white/75 text-pretty`} style={anim(600).style}>
            {t(
              'Estratégia de destino, candidaturas europeias e inovação turística para o Município de Braga — da Comissão Europeia ao produto turístico local.',
              'Destination strategy, European candidacies and tourism innovation for the Municipality of Braga — from the European Commission to local tourism products.'
            )}
          </p>
          <div className={`${anim(750).className} mt-9 flex flex-wrap gap-3`} style={anim(750).style}>
            <button
              onClick={() => goTo('candidaturas')}
              className="h-12 px-7 bg-white text-navy text-[15px] font-semibold inline-flex items-center gap-2.5 hover:bg-gold-soft transition-colors"
            >
              {t('Ver portefólio', 'View portfolio')}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => goTo('contacto')}
              className="h-12 px-7 border border-white/40 text-white text-[15px] font-medium hover:bg-white/10 transition-colors"
            >
              {t('Contacto', 'Contact')}
            </button>
          </div>
        </div>

        {/* Retrato emoldurado */}
        <div className={`${anim(900).className} lg:col-span-5 hidden md:block`} style={anim(900).style}>
          <figure className="relative w-full max-w-[340px] mx-auto lg:ml-auto lg:mr-0">
            <span className="absolute -inset-3 pointer-events-none" aria-hidden="true">
              <span className="absolute top-0 left-0 w-5 h-5 border-l border-t border-gold" />
              <span className="absolute top-0 right-0 w-5 h-5 border-r border-t border-gold" />
              <span className="absolute bottom-0 left-0 w-5 h-5 border-l border-b border-gold" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-r border-b border-gold" />
            </span>
            <div className="aspect-[4/5] overflow-hidden bg-navy-2">
              <img src={PORTRAIT} alt="Hugo Barros" className="w-full h-full object-cover object-[64%_18%]" />
            </div>
            <figcaption className="bg-white text-ink px-5 py-4 flex items-center justify-between gap-4">
              <span>
                <span className="block font-serif text-[17px]">Hugo Barros</span>
                <span className="block text-[12px] text-muted mt-0.5">{t('Município de Braga', 'Municipality of Braga')}</span>
              </span>
              <span className="block w-[104px] h-[22px] overflow-hidden shrink-0">
                {/* o PNG original tem margens largas: recorte centrado */}
                <img src={VISIT_BRAGA} alt="Visit Braga" className="w-full h-full object-cover scale-[1.38]" />
              </span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Indicadores */}
      <div ref={figRef} className="relative border-t border-white/15 bg-navy/60 backdrop-blur-sm">
        <div className="wrap">
          <div className="grid grid-cols-2 lg:grid-cols-4 -mx-5 lg:-mx-8 divide-x divide-white/15 max-lg:[&>*:nth-child(3)]:!border-l-0 max-lg:[&>*:nth-child(n+3)]:border-t max-lg:[&>*:nth-child(n+3)]:border-white/15">
            {figures.map((x) => (
              <Figure key={x.label} to={x.to} label={x.label} run={figIn && ready} />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => goTo('perfil')}
        aria-label={t('Descer', 'Scroll down')}
        className="hidden lg:flex absolute right-[clamp(1.25rem,0.6rem+2.4vw,2.5rem)] bottom-36 w-11 h-11 border border-white/30 items-center justify-center hover:bg-white/10"
      >
        <ArrowDown className="w-4 h-4" />
      </button>
    </section>
  );
}
