'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { MISSION_POINTS, byId } from './projects';

/* Missões internacionais numa faixa horizontal: scroll nativo com encaixe,
   setas opcionais. Nunca interfere com o scroll vertical da página. */
export default function MissionStrip({ light = false }: { light?: boolean }) {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector('li') as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth || 320) + 16), behavior: 'smooth' });
  };
  const btn = light
    ? 'ring-white/25 text-white hover:bg-white hover:text-ink'
    : 'ring-line text-ink hover:bg-ink hover:text-white hover:ring-ink';

  return (
    <div>
      <div className="wrap flex justify-end gap-2">
        <button onClick={() => go(-1)} aria-label={t('Anterior', 'Previous')} className={`w-11 h-11 rounded-full ring-1 ring-inset grid place-items-center transition-colors ${btn}`}>
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button onClick={() => go(1)} aria-label={t('Seguinte', 'Next')} className={`w-11 h-11 rounded-full ring-1 ring-inset grid place-items-center transition-colors ${btn}`}>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div
        ref={ref}
        className="strip mt-6 overflow-x-auto snap-x snap-mandatory no-scrollbar"
      >
        <ol className="flex gap-4 w-max">
          {MISSION_POINTS.map((m) => {
            const p = byId(m.id)!;
            return (
              <li key={m.id} className="snap-start w-[78vw] sm:w-[340px] lg:w-[380px] shrink-0">
                <Link href={`/projetos/${m.id}`} className="group relative block rounded-4xl overflow-hidden aspect-[4/5] bg-black/10">
                  <img src={p.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,transparent_30%,transparent_50%,rgba(0,0,0,0.75)_100%)]" />
                  <span className="absolute top-5 left-5 right-5 flex justify-between t-label text-white/85">
                    <span>{m.country[lang]}</span>
                    <span className="tabular-nums">{m.year}</span>
                  </span>
                  <span className="absolute left-6 right-6 bottom-6 text-white">
                    <span className="block em text-[2.5rem] leading-none">{m.city[lang]}</span>
                    <span className="mt-2 block text-[15px] text-white/80">{m.event}</span>
                    <span className="mt-1 block t-label text-white/55 tabular-nums">
                      {m.km.toLocaleString('pt-PT')} km {t('de Braga', 'from Braga')}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
