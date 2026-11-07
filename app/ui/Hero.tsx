'use client';

import { ArrowRight, Mail } from 'lucide-react';
import { useLang } from './LanguageContext';
import { goTo } from './hooks';
import { MISSIONS, PROJECTS } from './projects';

const PORTRAIT = 'https://i.imgur.com/Dx42oze.jpeg';
const VISIT_BRAGA = 'https://i.imgur.com/Yakcz6G.png';

export default function Hero() {
  const { t } = useLang();

  const facts = [
    { k: t('Função', 'Position'), v: t('Técnico Superior', 'Senior Officer') },
    { k: t('Entidade', 'Organisation'), v: t('Município de Braga', 'Municipality of Braga') },
    {
      k: t('Unidade orgânica', 'Department'),
      v: t('Divisão de Atividades Económicas e Turismo', 'Economic Activities and Tourism Division'),
    },
    { k: t('Localização', 'Location'), v: 'Braga, Portugal' },
  ];

  const figures = [
    { v: String(PROJECTS.length), l: t('projetos documentados', 'documented projects') },
    { v: '29', l: t('experiências turísticas concebidas', 'tourism experiences designed') },
    { v: String(MISSIONS.length), l: t('missões internacionais', 'international missions') },
    { v: '2', l: t('candidaturas a capitais europeias', 'European capital bids') },
  ];

  return (
    <section id="perfil" className="bg-white">
      <div className="wrap pt-14 md:pt-20 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-7">
          <p className="eyebrow text-accent">{t('Portefólio profissional', 'Professional portfolio')}</p>
          <h1 className="mt-4 font-serif font-semibold text-ink text-[clamp(2.5rem,1.6rem+3.4vw,4rem)] leading-[1.05] tracking-[-0.01em]">
            Hugo Barros
          </h1>
          <p className="mt-3 text-[clamp(1.1rem,1rem+0.4vw,1.3rem)] font-medium text-navy">
            {t('Técnico Superior · Inovação e Desenvolvimento Turístico', 'Senior Officer · Tourism Innovation & Development')}
          </p>
          <div className="mt-7 space-y-4 text-[17px] leading-relaxed text-muted max-w-2xl text-pretty">
            <p>
              {t(
                'Trabalho na estratégia de destino, nas candidaturas europeias e na inovação turística do Município de Braga — da preparação de dossiês técnicos para a Comissão Europeia à conceção de produto turístico, cartografia e publicações oficiais.',
                'I work on destination strategy, European candidacies and tourism innovation at the Municipality of Braga — from preparing technical dossiers for the European Commission to designing tourism products, cartography and official publications.'
              )}
            </p>
            <p>
              {t(
                'Acredito que o valor real nasce da interseção entre visão territorial e execução estratégica. Este portefólio reúne os projetos em que participei, organizados por área de atuação.',
                'I believe real value is born where territorial vision meets strategic execution. This portfolio brings together the projects I have worked on, organised by area of work.'
              )}
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => goTo('projetos')}
              className="h-12 px-6 rounded bg-navy text-white font-semibold text-[15px] inline-flex items-center gap-2 hover:bg-navy-dark transition-colors"
            >
              {t('Consultar projetos', 'View projects')}
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="mailto:hugo.barros@cm-braga.pt"
              className="h-12 px-6 rounded border border-line text-ink font-semibold text-[15px] inline-flex items-center gap-2 hover:border-navy hover:text-navy transition-colors"
            >
              <Mail className="w-4 h-4" />
              hugo.barros@cm-braga.pt
            </a>
          </div>
        </div>

        {/* Ficha */}
        <aside className="lg:col-span-5">
          <div className="rounded-lg border border-line overflow-hidden bg-white">
            <div className="grid grid-cols-5">
              <div className="col-span-2 bg-surface">
                <img
                  src={PORTRAIT}
                  alt="Hugo Barros"
                  className="w-full h-full object-cover object-[64%_18%] aspect-[4/5]"
                />
              </div>
              <dl className="col-span-3 p-5 sm:p-6 flex flex-col justify-center gap-4">
                {facts.map((f) => (
                  <div key={f.k}>
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.06em] text-muted">{f.k}</dt>
                    <dd className="mt-1 text-[15px] text-ink leading-snug">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="border-t border-line px-5 sm:px-6 py-4 flex items-center justify-between gap-4 bg-surface">
              <span className="text-[13px] text-muted">{t('Marca oficial de destino', 'Official destination brand')}</span>
              <span className="block w-[160px] h-[30px] overflow-hidden">
                {/* o PNG original tem margens largas: recorte centrado */}
                <img src={VISIT_BRAGA} alt="Visit Braga" className="w-full h-full object-cover scale-[1.38]" />
              </span>
            </div>
          </div>
        </aside>
      </div>

      {/* Indicadores */}
      <div className="border-y border-line bg-surface">
        <div className="wrap">
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border-x border-line">
            {figures.map((f) => (
              <li key={f.l} className="bg-surface px-5 sm:px-7 py-7">
                <p className="font-serif font-semibold text-[2.5rem] leading-none text-navy">{f.v}</p>
                <p className="mt-2 text-[14px] text-muted leading-snug">{f.l}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
