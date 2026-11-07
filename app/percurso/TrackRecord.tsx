'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../ui/LanguageContext';
import { PageHead } from '../ui/parts';
import AtlasMap, { MISSION_POINTS } from '../ui/AtlasMap';
import { PROJECTS, THEME_LABEL } from '../ui/projects';

export default function TrackRecord() {
  const { t, lang } = useLang();
  const [hot, setHot] = useState<string | null>(null);

  // Cronologia: projetos agrupados pelo ano de início
  const years = Array.from(new Set(PROJECTS.map((p) => p.year.slice(0, 4)))).sort();
  const byYear = years.map((y) => ({ y, items: PROJECTS.filter((p) => p.year.startsWith(y)) }));

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
                  <span className="block mt-1 text-[14px] text-muted">{m.event}</span>
                </span>
                <span className="text-right text-[13px] text-muted shrink-0 pt-1">
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
        <PageHead kicker={t('Cronologia', 'Timeline')} title={t('Projetos por ano de início', 'Projects by start year')} />
        <div className="mt-10 border-t border-line">
          {byYear.map(({ y, items }) => (
            <div key={y} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 border-b border-line">
              <div className="md:col-span-3" data-reveal>
                <p className="font-serif text-[3.2rem] leading-none text-petrol">{y}</p>
                <p className="mt-2 text-[14px] text-muted">
                  {items.length} {items.length === 1 ? t('projeto', 'project') : t('projetos', 'projects')}
                </p>
              </div>
              <ul className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((p, i) => (
                  <li key={p.id} data-reveal style={{ ['--delay' as any]: `${(i % 2) * 70}ms` }}>
                    <Link href={`/projetos/${p.id}`} className="group flex items-center gap-4 rounded-xl bg-card border border-line p-3 pr-4 hover:border-petrol/40 transition-colors">
                      <span className="photo w-20 h-14 rounded-lg shrink-0">
                        <img src={p.image} alt="" loading="lazy" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-serif text-[1.15rem] leading-tight text-ink group-hover:text-petrol transition-colors truncate">{p.title[lang]}</span>
                        <span className="block mt-0.5 text-[13px] text-muted truncate">
                          {THEME_LABEL[p.theme][lang]} · {p.year}
                        </span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-petrol shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
