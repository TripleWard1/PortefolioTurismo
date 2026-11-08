'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { useLang } from './LanguageContext';
import { AREAS, PROJECTS, type Theme } from './projects';
import { SCOPE } from './profile';
import { TONE } from './viz/palette';

/* Áreas de competência: separadores à esquerda, detalhe no tom da área à direita */
export default function Competences() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<Theme>('europeu');
  const area = AREAS.find((a) => a.id === active)!;
  const tone = TONE[active];
  const scope = SCOPE[active];
  const related = PROJECTS.filter((p) => p.theme === active);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10" data-reveal>
      <div className="lg:col-span-4" role="tablist" aria-label={t('Áreas de competência', 'Areas of expertise')} aria-orientation="vertical">
        {AREAS.map((a, i) => {
          const on = a.id === active;
          return (
            <button
              key={a.id}
              role="tab"
              id={`tab-${a.id}`}
              aria-selected={on}
              aria-controls="area-panel"
              onClick={() => setActive(a.id)}
              className={`w-full text-left flex items-baseline gap-4 py-5 border-b border-line transition-colors ${i === 0 ? 'border-t' : ''}`}
            >
              <span className="em text-[1.5rem] leading-none w-8 shrink-0 transition-colors" style={{ color: on ? TONE[a.id].deep : '#c7c7cc' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`flex-1 text-[1.125rem] md:text-[1.25rem] font-semibold tracking-[-0.02em] transition-colors ${on ? 'text-ink' : 'text-mute hover:text-ink'}`}>
                {a.label[lang]}
              </span>
              <span className="t-label text-mute tabular-nums">{PROJECTS.filter((p) => p.theme === a.id).length}</span>
            </button>
          );
        })}
      </div>

      <div
        id="area-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className="lg:col-span-8 rounded-4xl p-6 md:p-10 transition-colors duration-500"
        style={{ background: tone.tint }}
      >
        <div key={active} className="animate-[fadeUp_.5s_cubic-bezier(.22,1,.36,1)]">
          <p className="t-label inline-flex items-center gap-2" style={{ color: tone.deep }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: tone.deep }} />
            {area.label[lang]}
          </p>
          <p className="mt-5 text-[clamp(1.375rem,1.1rem+0.9vw,1.875rem)] leading-[1.3] font-medium tracking-[-0.025em] text-ink text-pretty">{scope.intro[lang]}</p>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {scope.items.map((it) => (
              <li key={it.pt} className="flex items-start gap-3 text-[15px] text-ink/80">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-white grid place-items-center shrink-0">
                  <Check className="w-3 h-3" style={{ color: tone.deep }} strokeWidth={2.5} />
                </span>
                {it[lang]}
              </li>
            ))}
          </ul>

          <p className="mt-10 t-label text-ink/50">{t('Projetos nesta área', 'Projects in this area')}</p>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {related.map((p) => (
              <li key={p.id}>
                <Link href={`/projetos/${p.id}`} className="group flex items-center gap-3 rounded-2xl bg-white/70 hover:bg-white p-2 pr-4 transition-colors">
                  <span className="media w-14 h-14 rounded-xl shrink-0">
                    <img src={p.image} alt="" loading="lazy" className={p.logo ? '!object-contain p-1.5' : ''} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-medium text-ink truncate">{p.title[lang]}</span>
                    <span className="block t-label text-mute truncate">{p.outcome[lang]}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-mute shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
