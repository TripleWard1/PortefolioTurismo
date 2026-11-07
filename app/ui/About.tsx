'use client';

import { useLang } from './LanguageContext';

export default function About() {
  const { t } = useLang();
  const facts = [
    { k: t('Função', 'Position'), v: t('Técnico Superior', 'Senior Officer') },
    { k: t('Entidade', 'Organisation'), v: t('Município de Braga', 'Municipality of Braga') },
    { k: t('Unidade orgânica', 'Department'), v: t('Divisão de Atividades Económicas e Turismo', 'Economic Activities and Tourism Division') },
    { k: t('Áreas', 'Areas'), v: t('Estratégia de destino · Candidaturas europeias · Produto turístico', 'Destination strategy · European bids · Tourism product') },
  ];
  return (
    <section id="perfil" className="bg-paper py-24 md:py-32">
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow text-gold flex items-center gap-3">
            <span className="rule" />
            {t('Perfil', 'Profile')}
          </p>
          <p className="mt-6 font-serif text-[clamp(1.7rem,1.2rem+1.6vw,2.5rem)] leading-[1.2] text-navy text-balance">
            {t(
              '“O valor real nasce da interseção entre visão territorial e execução estratégica.”',
              '“Real value is born where territorial vision meets strategic execution.”'
            )}
          </p>
        </div>
        <div className="lg:col-span-7" data-reveal style={{ ['--reveal-delay' as any]: '120ms' }}>
          <div className="space-y-5 text-[17px] leading-[1.8] text-muted text-pretty">
            <p>
              {t(
                'Trabalho na Divisão de Atividades Económicas e Turismo do Município de Braga, onde acompanho a estratégia de destino, as candidaturas a títulos e redes europeias e o desenvolvimento de produto turístico.',
                'I work in the Economic Activities and Tourism Division of the Municipality of Braga, covering destination strategy, bids for European titles and networks, and tourism product development.'
              )}
            </p>
            <p>
              {t(
                'Do dossiê técnico defendido em Bruxelas ao roteiro infantil sobre a Braga romana, cada projeto procura o mesmo objetivo: consolidar Braga como referência europeia de turismo inteligente, sustentável e com identidade.',
                'From the technical dossier defended in Brussels to the children’s itinerary on Roman Braga, every project pursues the same goal: consolidating Braga as a European reference for smart, sustainable tourism with a strong identity.'
              )}
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {facts.map((f) => (
              <div key={f.k} className="py-4 border-t border-line">
                <dt className="eyebrow text-muted !tracking-[0.16em]">{f.k}</dt>
                <dd className="mt-2 text-[16px] text-ink leading-snug">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
