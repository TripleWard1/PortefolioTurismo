'use client';

import Link from 'next/link';
import { useLang } from '../ui/LanguageContext';
import { SectionHead } from '../ui/parts';
import { MISSION_POINTS, PROJECTS, byId } from '../ui/projects';
import { TONE, yearSpan } from '../ui/viz/palette';

export default function TrackRecord() {
  const { t, lang } = useLang();

  // Cronologia: projetos agrupados pelo ano em que começaram
  const years = Array.from(new Set(PROJECTS.map((p) => yearSpan(p.year)[0]))).sort();
  const byYear = years.map((y) => ({ y, items: PROJECTS.filter((p) => yearSpan(p.year)[0] === y) }));

  return (
    <div className="wrap pt-16 md:pt-24">
      <header data-reveal>
        <p className="t-label text-mute">{t('Percurso', 'Track record')}</p>
        <h1 className="mt-4 t-hero text-ink max-w-[15ch]">
          {t('Representação', 'International')} <span className="em">{t('internacional', 'representation')}</span>.
        </h1>
        <p className="mt-6 t-lead text-mute max-w-2xl text-pretty">
          {t(
            'Feiras, cimeiras e júris internacionais, e a cronologia dos projetos desde 2024.',
            'Fairs, summits and international juries, and the timeline of projects since 2024.'
          )}
        </p>
      </header>

      <ol className="mt-16 space-y-4">
        {MISSION_POINTS.map((m, i) => {
          const p = byId(m.id)!;
          const tone = TONE[p.theme];
          return (
            <li key={m.id} data-reveal style={{ ['--delay' as any]: `${(i % 2) * 60}ms` }}>
              <Link href={`/projetos/${m.id}`} className="group grid grid-cols-12 gap-4 md:gap-8 items-center rounded-4xl p-3 md:p-4" style={{ background: tone.tint }}>
                <div className="col-span-4 md:col-span-3">
                  <div className="media rounded-2xl aspect-[4/3]">
                    <img src={p.image} alt="" loading="lazy" />
                  </div>
                </div>
                <div className="col-span-8 md:col-span-6">
                  <p className="em text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-none text-ink">{m.city[lang]}</p>
                  <p className="mt-2 text-[15px] text-ink/70">
                    {m.event} · {m.country[lang]}
                  </p>
                </div>
                <div className="hidden md:block md:col-span-3 text-right pr-4">
                  <p className="t-label" style={{ color: tone.deep }}>
                    {m.year}
                  </p>
                  <p className="mt-1 t-label text-ink/50 tabular-nums">
                    {m.km.toLocaleString('pt-PT')} km {t('de Braga', 'from Braga')}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      <section className="mt-28 md:mt-40">
        <SectionHead label={t('Cronologia', 'Timeline')} title={t('Projetos por ano de início', 'Projects by start year')} />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {byYear.map(({ y, items }) => (
            <div key={y} data-reveal>
              <p className="em text-[3.5rem] leading-none text-ink">{y}</p>
              <ul className="mt-6 border-t border-line">
                {items.map((p) => (
                  <li key={p.id} className="border-b border-line">
                    <Link href={`/projetos/${p.id}`} className="py-3.5 flex items-center gap-3 group">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: TONE[p.theme].deep }} />
                      <span className="text-[15px] text-ink group-hover:underline underline-offset-4">{p.title[lang]}</span>
                      <span className="ml-auto t-label text-mute tabular-nums">{p.year}</span>
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
