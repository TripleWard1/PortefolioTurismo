'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLang } from '../ui/LanguageContext';
import { SectionHead } from '../ui/parts';
import { MISSION_POINTS } from '../ui/projects';
import Globe from '../ui/fx/Globe';
import Gantt from '../ui/viz/Gantt';

export default function TrackRecord() {
  const { t, lang } = useLang();
  const [focus, setFocus] = useState<string | null>(null);

  return (
    <div className="wrap pt-16 md:pt-24">
      <header data-reveal>
        <p className="t-label text-mute">{t('Percurso', 'Track record')}</p>
        <h1 className="mt-4 t-hero text-ink max-w-[14ch]">{t('Onde Braga foi representada.', 'Where Braga was represented.')}</h1>
        <p className="mt-6 t-lead text-mute max-w-2xl text-pretty">
          {t(
            'Seis missões internacionais e a cronologia dos projetos entre 2024 e 2026.',
            'Six international missions and the timeline of projects between 2024 and 2026.'
          )}
        </p>
      </header>

      <section className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 rounded-4xl bg-soft p-6 md:p-10" data-reveal>
          <Globe focus={focus} className="max-w-[560px] mx-auto" ink="29,29,31" accent="29,29,31" />
        </div>
        <ol className="lg:col-span-5 border-t border-line" onMouseLeave={() => setFocus(null)} data-reveal>
          {MISSION_POINTS.map((m) => (
            <li key={m.id} className="border-b border-line">
              <Link
                href={`/projetos/${m.id}`}
                onMouseEnter={() => setFocus(m.id)}
                onFocus={() => setFocus(m.id)}
                className="py-5 flex items-start justify-between gap-6"
              >
                <span className={`transition-opacity ${focus && focus !== m.id ? 'opacity-40' : ''}`}>
                  <span className="block text-[1.25rem] font-semibold tracking-[-0.025em] text-ink">
                    {m.city[lang]}, {m.country[lang]}
                  </span>
                  <span className="block mt-1 t-label text-mute">{m.event}</span>
                </span>
                <span className="t-label text-mute text-right tabular-nums shrink-0">
                  {m.year}
                  <br />
                  {m.km.toLocaleString('pt-PT')} km
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-28 md:mt-36">
        <SectionHead
          label={t('Cronologia', 'Timeline')}
          title={t('2024 — 2026, projeto a projeto.', '2024 — 2026, project by project.')}
          intro={t('Cada barra é um projeto, do ano em que começou ao ano em que terminou.', 'Each bar is a project, from the year it began to the year it ended.')}
        />
        <div className="mt-12" data-reveal>
          <Gantt />
        </div>
      </section>
    </div>
  );
}
