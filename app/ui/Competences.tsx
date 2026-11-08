'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { AREAS, PROJECTS, type Theme } from './projects';
import { SCOPE } from './profile';
import { TONE } from './viz/palette';

/* Fotografia de cada área */
const PHOTO: Record<Theme, string> = {
  europeu: 'https://i.imgur.com/HecgfPz.jpeg',
  internacional: 'https://i.imgur.com/u8hgUWi.png',
  digital: 'https://i.imgur.com/SeyCGBk.jpg',
  produto: 'https://i.imgur.com/rKEHbnY.jpeg',
};

/* Áreas de competência: secção a toda a largura, cuja cor acompanha a área escolhida */
export default function Competences() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<Theme>('europeu');
  const tone = TONE[active];
  const scope = SCOPE[active];
  const related = PROJECTS.filter((p) => p.theme === active);

  return (
    <section className="tone-shift text-white py-24 md:py-32" style={{ background: tone.dark }}>
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <p className="t-label inline-flex items-center gap-2 tone-shift" style={{ color: tone.glow }}>
            <span className="w-1.5 h-1.5 rounded-full tone-shift" style={{ background: tone.glow }} />
            {t('Áreas de competência', 'Areas of expertise')}
          </p>
          <h2 className="mt-4 t-h2 text-white text-balance">
            {t('Quatro áreas,', 'Four areas,')} <span className="em tone-shift" style={{ color: tone.glow }}>{t('um mesmo objetivo', 'one objective')}</span>.
          </h2>

          <div className="mt-10" role="tablist" aria-label={t('Áreas de competência', 'Areas of expertise')} aria-orientation="vertical">
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
                  className={`w-full text-left flex items-baseline gap-4 py-4 border-b border-white/15 ${i === 0 ? 'border-t' : ''}`}
                >
                  <span className="em text-[1.375rem] leading-none w-8 shrink-0 transition-colors duration-500" style={{ color: on ? tone.glow : 'rgba(255,255,255,0.3)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`flex-1 text-[1.125rem] md:text-[1.25rem] font-semibold tracking-[-0.02em] transition-colors duration-500 ${on ? 'text-white' : 'text-white/45 hover:text-white/80'}`}>
                    {a.label[lang]}
                  </span>
                  <span className={`t-label tabular-nums transition-colors ${on ? 'text-white/70' : 'text-white/30'}`}>{PROJECTS.filter((p) => p.theme === a.id).length}</span>
                </button>
              );
            })}
          </div>

          <div id="area-panel" role="tabpanel" aria-labelledby={`tab-${active}`} key={active} className="mt-8 animate-[fadeUp_.6s_cubic-bezier(.22,1,.36,1)]">
            <p className="text-[1.0625rem] leading-relaxed text-white/80 text-pretty">{scope.intro[lang]}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {scope.items.map((it) => (
                <li key={it.pt} className="t-label rounded-full px-3.5 py-1.5 ring-1 ring-inset ring-white/20 text-white/85">
                  {it[lang]}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7" data-reveal style={{ ['--delay' as any]: '120ms' }}>
          <div className="relative rounded-4xl overflow-hidden aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[640px] bg-black/20">
            {AREAS.map((a) => (
              <img
                key={a.id}
                src={PHOTO[a.id]}
                alt=""
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out ${a.id === active ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'}`}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

            <div key={active} className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4 rounded-3xl bg-white/10 backdrop-blur-xl ring-1 ring-inset ring-white/15 p-2 animate-[fadeUp_.6s_cubic-bezier(.22,1,.36,1)]">
              <p className="px-3 pt-2 pb-1 t-label text-white/60">{t('Projetos nesta área', 'Projects in this area')}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {related.map((p) => (
                  <li key={p.id}>
                    <Link href={`/projetos/${p.id}`} className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 hover:bg-white/10 transition-colors">
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-medium text-white truncate">{p.title[lang]}</span>
                        <span className="block t-label text-white/60 truncate">{p.outcome[lang]}</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-white/50 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
