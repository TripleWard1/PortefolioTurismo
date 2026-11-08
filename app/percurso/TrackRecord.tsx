'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLang } from '../ui/LanguageContext';
import { PageHead } from '../ui/parts';
import AtlasMap, { MISSION_POINTS } from '../ui/AtlasMap';
import Gantt from '../ui/viz/Gantt';

export default function TrackRecord() {
  const { t, lang } = useLang();
  const [hot, setHot] = useState<string | null>(null);


  return (
    <div className="wrap pt-12 md:pt-16">
      <PageHead
        as="h1"
        kicker={t('Percurso', 'Track record')}
        title={t('Missões internacionais e cronologia', 'International missions and timeline')}
        intro={t(
          'Onde Braga foi representada e como o trabalho se distribuiu entre 2024 e 2026.',
          'Where Braga was represented and how the work unfolded between 2024 and 2026.'
        )}
      />

      {/* Mapa + lista */}
      <section className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8" data-reveal>
          <AtlasMap hot={hot} setHot={setHot} />
        </div>
        <ol className="lg:col-span-4 rounded-xl bg-card border border-line divide-y divide-line" onMouseLeave={() => setHot(null)} data-reveal>
          {MISSION_POINTS.map((m, i) => (
            <li key={m.id}>
              <Link
                href={`/projetos/${m.id}`}
                onMouseEnter={() => setHot(m.id)}
                onFocus={() => setHot(m.id)}
                className={`group flex items-start gap-4 px-5 py-4 transition-colors ${hot === m.id ? 'bg-petrol/[0.06]' : ''}`}
              >
                <span className="text-[13px] font-semibold text-petrol w-5 pt-1">{i + 1}</span>
                <span className="flex-1 min-w-0">
                  <span className="block font-serif text-[1.3rem] leading-tight text-ink group-hover:text-petrol transition-colors">
                    {m.city[lang]}, {m.country[lang]}
                  </span>
                  <span className="block mt-1 text-[14px] text-muted-foreground">{m.event}</span>
                </span>
                <span className="text-right text-[13px] text-muted-foreground shrink-0 pt-1">
                  {m.year}
                  <br />
                  {m.km.toLocaleString('pt-PT')} km
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Cronologia */}
      <section className="mt-24">
        <PageHead
          kicker={t('Cronologia', 'Timeline')}
          title={t('2024 — 2026, projeto a projeto', '2024 — 2026, project by project')}
          intro={t('Cada barra é um projeto, do ano em que começou ao ano em que terminou; a cor indica a área.', 'Each bar is a project, from the year it began to the year it ended; colour shows the area.')}
        />
        <div className="mt-10" data-reveal>
          <Gantt />
        </div>
      </section>
    </div>
  );
}
