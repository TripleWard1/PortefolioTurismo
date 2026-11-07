'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from './LanguageContext';
import { useInView, useScrollProgress } from './hooks';
import { PROJECTS, MISSIONS } from './projects';

/* --- Faixa de disciplinas ------------------------------------------------- */
export function Marquee() {
  const { t } = useLang();
  const items = [
    'Smart Tourism',
    t('Candidaturas Europeias', 'European Candidacies'),
    t('Economia Noturna', 'Night-time Economy'),
    t('Produto Turístico', 'Tourism Product'),
    t('Cartografia', 'Cartography'),
    t('Ecossistema Digital', 'Digital Ecosystem'),
    t('Diplomacia de Inovação', 'Innovation Diplomacy'),
    t('Património', 'Heritage'),
  ];
  const row = (
    <div className="flex items-center shrink-0">
      {items.map((it) => (
        <span key={it} className="flex items-center">
          <span className="h2 italic text-bone px-8 whitespace-nowrap">{it}</span>
          <svg viewBox="0 0 20 20" className="w-5 h-5 text-ember shrink-0" aria-hidden="true">
            <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee-wrap relative py-8 md:py-10 border-y border-[var(--line)] bg-night overflow-hidden" aria-hidden="true">
      <div className="marquee" style={{ ['--marquee-speed' as any]: '55s' }}>
        {row}
        {row}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-night to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-night to-transparent" />
    </div>
  );
}

/* --- Manifesto com leitura guiada pelo scroll ---------------------------- */
export function Manifesto() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const words = useRef<HTMLSpanElement[]>([]);
  const bar = useRef<HTMLDivElement>(null);

  const text: string = t(
    'Acredito que o valor real nasce da interseção entre visão territorial e execução estratégica. Cada projeto é uma peça da mesma visão — colocar Braga no mapa das decisões europeias e transformar potencial em influência.',
    'I believe real value is born where territorial vision meets strategic execution. Every project is a piece of the same vision — putting Braga on the map of European decisions and turning potential into influence.'
  );
  const tokens = text.split(' ');
  const emphasis = new Set(
    t(['visão', 'territorial', 'Braga', 'influência.'], ['vision', 'territorial', 'Braga', 'influence.'])
  );

  words.current.length = tokens.length;
  // Re-pinta as palavras após troca de idioma
  useEffect(() => {
    window.dispatchEvent(new Event('scroll'));
  }, [lang]);

  useScrollProgress(
    root,
    (p) => {
      const lit = p * 1.25 * tokens.length;
      words.current.forEach((w, i) => {
        if (!w) return;
        const v = Math.min(1, Math.max(0, lit - i));
        w.style.opacity = String(0.14 + v * 0.86);
      });
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
    },
    'pin'
  );

  return (
    <section id="manifesto" ref={root} className="relative h-[220vh] bg-night">
      <div className="sticky top-0 h-[100svh] flex items-center">
        <div className="wrap w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 flex lg:flex-col justify-between gap-6">
            <div className="flex items-center gap-3 label text-[var(--fg-3)]">
              <span className="text-ember tabular">00</span>
              <span className="w-6 h-px bg-[var(--line-2)]" />
              {t('Manifesto', 'Manifesto')}
            </div>
            <div className="hidden lg:block relative w-px h-40 bg-[var(--line)]">
              <div ref={bar} className="absolute inset-0 bg-ember origin-top" style={{ transform: 'scaleY(0)' }} />
            </div>
          </div>
          <p className="lg:col-span-9 font-display text-[clamp(2rem,1rem+3.6vw,4.6rem)] leading-[1.04] tracking-[-0.02em] text-bone text-pretty">
            {tokens.map((w, i) => (
              <span
                key={`${w}-${i}`}
                ref={(el) => {
                  if (el) words.current[i] = el;
                }}
                className={`transition-opacity duration-200 ${emphasis.has(w) ? 'italic text-ember' : ''}`}
                style={{ opacity: 0.14 }}
              >
                {w}{' '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

/* --- Métricas com contagem ----------------------------------------------- */
function Count({ to, run, pad = 2 }: { to: number; run: boolean; pad?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return setV(to);
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 1600);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{String(v).padStart(pad, '0')}</>;
}

export function Metrics() {
  const { t } = useLang();
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const data = [
    { v: PROJECTS.length, label: t('Dossiers estratégicos', 'Strategic dossiers'), note: t('2024 — 2026', '2024 — 2026') },
    { v: 29, label: t('Experiências sustentáveis', 'Sustainable experiences'), note: t('Conceção técnica', 'Technical design') },
    { v: MISSIONS.length, label: t('Cidades em missão', 'Mission cities'), note: t('Europa & EUA', 'Europe & USA') },
    { v: 2, label: t('Candidaturas a capitais europeias', 'European capital bids'), note: t('Smart Tourism · Small Retail', 'Smart Tourism · Small Retail') },
  ];
  return (
    <section aria-label={t('Impacto', 'Impact')} className="relative bg-night">
      <div ref={ref} className="wrap">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)] border-y border-[var(--line)]">
        {data.map((m, i) => (
          <div key={i} className="relative bg-night py-10 md:py-14 px-4 md:px-8 first:pl-0 [&:nth-child(3)]:pl-0 lg:[&:nth-child(3)]:pl-8">
            <div className="font-display text-[clamp(3.6rem,2rem+5vw,7rem)] leading-[0.85] tracking-[-0.03em] text-bone tabular">
              <Count to={m.v} run={inView} />
              <span className="text-ember">.</span>
            </div>
            <div className="mt-4 text-[15px] text-[var(--fg)] leading-snug max-w-[14rem]">{m.label}</div>
            <div className="mt-2 label-sm text-[var(--fg-3)]">{m.note}</div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
