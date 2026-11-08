'use client';

import Link from 'next/link';
import { useLang } from '../ui/LanguageContext';
import { SectionHead } from '../ui/parts';
import { AREAS, MISSION_POINTS, PROJECTS, byId } from '../ui/projects';
import { ENTITY, RECOGNITION, ROLE, SCOPE } from '../ui/profile';
import { BRASS, NIGHT, TONE, yearSpan } from '../ui/viz/palette';

export default function TrackRecord() {
  const { t, lang } = useLang();

  // Cronologia: projetos agrupados pelo ano em que começaram
  const years = Array.from(new Set(PROJECTS.map((p) => yearSpan(p.year)[0]))).sort();
  const byYear = years.map((y) => ({ y, items: PROJECTS.filter((p) => yearSpan(p.year)[0] === y) }));

  return (
    <>
      <header data-hero className="relative -mt-16 flex flex-col min-h-[78svh] md:min-h-[560px] md:h-[78svh] md:max-h-[860px] overflow-hidden text-white" style={{ background: NIGHT }}>
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <div data-parallax="-0.2" className="absolute inset-0" style={{ ['--px-scale' as any]: 1.15 }}>
            <img src="https://i.imgur.com/AM6Z3uu.jpeg" alt="" className="w-full h-full object-cover object-[50%_45%] hero-kb" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,18,0.5)_0%,rgba(20,19,18,0.1)_30%,rgba(20,19,18,0.35)_60%,rgba(20,19,18,0.9)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,19,18,0.6)_0%,rgba(20,19,18,0.25)_45%,transparent_75%)]" />
        </div>
        <div className="relative flex-1 w-full wrap flex flex-col justify-end pt-28 pb-12 md:pb-16">
          <p className="hero-in t-label inline-flex items-center gap-2" style={{ color: BRASS }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: BRASS }} />
            {t('Percurso', 'Track record')}
          </p>
          <h1 className="hero-in mt-4 t-hero text-white max-w-[15ch]" style={{ ['--d' as any]: '120ms' }}>
            {t('Percurso', 'Career and')} <span className="em text-[#E9DCC4]">{t('profissional', 'track record')}</span>.
          </h1>
          <p className="hero-in mt-6 t-lead text-white/75 max-w-2xl text-pretty" style={{ ['--d' as any]: '240ms' }}>
            {t(
              'Função atual, missões de representação internacional, distinções obtidas e cronologia dos projetos desde 2024.',
              'Current role, international representation missions, recognition received and the timeline of projects since 2024.'
            )}
          </p>
        </div>
      </header>

    <div className="wrap">

      {/* Função atual */}
      <section className="mt-16 rounded-4xl bg-mist p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10" data-reveal>
        <div className="lg:col-span-5">
          <p className="t-label text-mute inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4D6A55]" />
            {t('Função atual', 'Current role')}
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.035em] text-ink text-balance">{ROLE[lang]}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-mute">{ENTITY[lang]}</p>
        </div>
        <div className="lg:col-span-7">
          <p className="t-label text-mute">{t('Responsabilidades', 'Responsibilities')}</p>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {AREAS.map((a) => (
              <li key={a.id} className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2">
                <span className="sm:col-span-5 text-[15px] font-semibold text-ink inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: TONE[a.id].deep }} />
                  {a.label[lang]}
                </span>
                <span className="sm:col-span-7 text-[15px] leading-relaxed text-mute">{SCOPE[a.id].intro[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-28 md:mt-40">
        <SectionHead
          label={t('Representação internacional', 'International representation')}
          title={
            <>
              {t('Missões em', 'Missions in')} <span className="em">{t('três países', 'three countries')}</span>.
            </>
          }
          intro={t(
            'Feiras profissionais, cimeiras e júris internacionais em que o destino foi representado.',
            'Trade fairs, summits and international juries where the destination was represented.'
          )}
        />
      <ol className="mt-12 space-y-4">
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
      </section>

      {/* Distinções */}
      <section className="mt-28 md:mt-40">
        <SectionHead label={t('Distinções', 'Recognition')} title={<>{t('Reconhecimento', 'Recognised')} <span className="em">{t('europeu e internacional', 'in Europe and beyond')}</span>.</>} />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECOGNITION.map((r) => {
            const tone = TONE[byId(r.id)!.theme];
            return (
              <Link key={r.id} href={`/projetos/${r.id}`} className="group rounded-4xl p-7 md:p-8 flex flex-col min-h-[240px]" style={{ background: tone.tint }} data-reveal>
                <p className="em text-[2.25rem] leading-none text-ink">{r.title[lang]}</p>
                <p className="mt-auto pt-10 text-[1.125rem] font-semibold tracking-[-0.02em] text-ink group-hover:underline underline-offset-4">{r.award}</p>
                <p className="mt-1 t-label" style={{ color: tone.deep }}>
                  {r.body[lang]} · {r.year}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-28 md:mt-40">
        <SectionHead label={t('Cronologia', 'Timeline')} title={<>{t('Projetos por', 'Projects by')} <span className="em">{t('ano de início', 'start year')}</span>.</>} />
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
    </>
  );
}
