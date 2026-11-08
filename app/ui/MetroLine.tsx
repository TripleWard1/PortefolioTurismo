'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { MISSION_POINTS, byId } from './projects';
import { TONE } from './viz/palette';

/* Missões como estações de uma linha (adaptado de Metro Map Gallery).
   A linha preenche-se com o scroll normal da página; nada é bloqueado. */
export default function MetroLine() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      const p = Math.max(0, Math.min(1, (mid - r.top) / r.height));
      setProgress(p);
      const nodes = Array.from(el.querySelectorAll<HTMLElement>('[data-node]'));
      setReached(nodes.reduce((acc, n, i) => (n.getBoundingClientRect().top < mid ? i : acc), -1));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ol ref={ref} className="relative mt-16">
      {/* Linha */}
      <span className="absolute top-0 bottom-0 left-[15px] md:left-1/2 w-[2px] -translate-x-1/2 bg-line rounded-full" aria-hidden />
      <span
        className="absolute top-0 left-[15px] md:left-1/2 w-[2px] -translate-x-1/2 rounded-full origin-top"
        style={{ height: `${progress * 100}%`, background: `linear-gradient(180deg, ${TONE.europeu.deep}, ${TONE.internacional.deep}, ${TONE.digital.deep})` }}
        aria-hidden
      />

      {MISSION_POINTS.map((m, i) => {
        const p = byId(m.id)!;
        const tone = TONE[p.theme];
        const right = i % 2 === 1;
        const on = i <= reached;
        return (
          <li key={m.id} className="relative grid grid-cols-[30px_1fr] md:grid-cols-2 gap-x-6 md:gap-x-20 pb-16 md:pb-24 last:pb-0">
            {/* Estação */}
            <span
              data-node
              className="absolute left-[15px] md:left-1/2 top-8 -translate-x-1/2 w-[30px] h-[30px] rounded-full grid place-items-center transition-all duration-500"
              style={{ background: on ? tone.deep : '#fff', boxShadow: `0 0 0 2px ${on ? tone.deep : '#e8e8ed'}${on ? `, 0 0 0 8px ${tone.tint}` : ''}` }}
              aria-hidden
            >
              <span className="w-2 h-2 rounded-full transition-colors duration-500" style={{ background: on ? '#fff' : '#c7c7cc' }} />
            </span>

            <div className={`col-start-2 md:col-start-auto ${right ? 'md:col-start-2' : 'md:text-right'}`}>
              <div
                className={`transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${on ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-3'}`}
              >
                <p className="t-label tabular-nums" style={{ color: tone.deep }}>
                  {m.year} · {m.country[lang]}
                </p>
                <p className="mt-2 em text-[clamp(2.5rem,1.6rem+3vw,4.25rem)] leading-none text-ink">{m.city[lang]}</p>
                <p className="mt-3 text-[15px] text-mute">{m.event}</p>
                <p className="mt-1 t-label text-mute tabular-nums">
                  {m.km.toLocaleString('pt-PT')} km {t('de Braga', 'from Braga')}
                </p>
              </div>
            </div>

            <div className={`col-start-2 mt-6 md:mt-0 ${right ? 'md:col-start-1 md:row-start-1' : 'md:col-start-2'}`}>
              <Link href={`/projetos/${m.id}`} className="group relative block rounded-4xl overflow-hidden aspect-[16/11]" style={{ background: tone.tint }}>
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.04] ${on ? 'scale-100 opacity-100' : 'scale-[1.08] opacity-70'}`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute left-5 bottom-5 right-5 flex items-center justify-between text-white">
                  <span className="text-[15px] font-semibold">{p.title[lang]}</span>
                  <span className="w-9 h-9 rounded-full bg-white text-ink grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </span>
              </Link>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
