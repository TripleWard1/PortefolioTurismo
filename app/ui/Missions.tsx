'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useInView } from './hooks';
import ChapterHead from './ChapterHead';
import { BRAGA, MISSIONS, byId, distanceKm, bySection } from './projects';

/* Projeção equiretangular centrada na Europa ocidental */
const W = 1000;
const H = 640;
const LON0 = -13, LON1 = 13, LAT0 = 34, LAT1 = 56;
const px = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
const py = (lat: number) => H - ((lat - LAT0) / (LAT1 - LAT0)) * H;

export default function Missions({ onOpen }: { onOpen: (id: string) => void }) {
  const { t, lang } = useLang();
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const [hot, setHot] = useState<string | null>(null);
  const fairs = bySection('missoes');

  const bx = px(BRAGA.lon);
  const by = py(BRAGA.lat);

  const points = MISSIONS.map((m) => {
    const off = m.lon < LON0; // fora do enquadramento (Arkansas)
    const x = off ? 24 : px(m.lon);
    const y = off ? by + 150 : py(m.lat);
    const mx = (bx + x) / 2;
    const my = (by + y) / 2 - Math.hypot(x - bx, y - by) * 0.32;
    return { ...m, x, y, off, d: `M${bx},${by} Q${mx},${my} ${x},${y}`, km: distanceKm(BRAGA, m) };
  });

  const active = hot ? byId(hot) : null;

  return (
    <section id="missoes" className="relative bg-granite py-28 md:py-40 overflow-hidden">
      <div className="wrap">
        <ChapterHead
          n="02"
          label={t('Missões internacionais', 'International missions')}
          title={t('Braga', 'Braga')}
          accent={t('em movimento.', 'in motion.')}
        >
          {t(
            'Feiras, cimeiras e júris internacionais. Cada linha parte de Braga e chega a uma decisão, um mercado ou uma rede.',
            'Fairs, summits and international juries. Every line leaves Braga and lands on a decision, a market or a network.'
          )}
        </ChapterHead>

        <div ref={ref} className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* MAPA */}
          <div className="lg:col-span-8 relative rounded-[28px] border border-[var(--line)] bg-night overflow-hidden">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label={t('Mapa das missões a partir de Braga', 'Map of missions from Braga')}>
              <defs>
                <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="rgba(237,231,218,0.07)" />
                </pattern>
                <radialGradient id="glow">
                  <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width={W} height={H} fill="url(#dots)" />

              {/* Graticula */}
              {Array.from({ length: 6 }, (_, i) => -10 + i * 5).map((lon) => (
                <g key={`lon${lon}`}>
                  <line x1={px(lon)} x2={px(lon)} y1={0} y2={H} stroke="rgba(237,231,218,0.06)" />
                  <text x={px(lon) + 6} y={H - 12} fill="rgba(237,231,218,0.28)" fontSize="11" fontFamily="var(--font-mono)">
                    {Math.abs(lon)}°{lon < 0 ? 'W' : lon > 0 ? 'E' : ''}
                  </text>
                </g>
              ))}
              {[35, 40, 45, 50, 55].map((lat) => (
                <g key={`lat${lat}`}>
                  <line x1={0} x2={W} y1={py(lat)} y2={py(lat)} stroke="rgba(237,231,218,0.06)" />
                  <text x={10} y={py(lat) - 6} fill="rgba(237,231,218,0.28)" fontSize="11" fontFamily="var(--font-mono)">
                    {lat}°N
                  </text>
                </g>
              ))}

              <circle cx={bx} cy={by} r="120" fill="url(#glow)" />

              {/* Arcos */}
              {points.map((p, i) => {
                const on = hot === p.id;
                return (
                  <path
                    key={p.id}
                    d={p.d}
                    fill="none"
                    stroke={on ? '#ff5a1f' : 'rgba(237,231,218,0.38)'}
                    strokeWidth={on ? 2 : 1}
                    strokeDasharray={p.off ? '4 6' : undefined}
                    pathLength={1}
                    style={{
                      strokeDasharray: p.off ? undefined : 1,
                      strokeDashoffset: p.off ? undefined : inView ? 0 : 1,
                      opacity: p.off && !inView ? 0 : 1,
                      transition: `stroke-dashoffset 1.6s cubic-bezier(.16,1,.3,1) ${i * 140}ms, stroke .3s, stroke-width .3s, opacity 1s ${i * 140}ms`,
                    }}
                  />
                );
              })}

              {/* Cidades */}
              {points.map((p, i) => {
                const on = hot === p.id;
                // Gante e Bruxelas ficam a 50 km: etiquetas em lados opostos
                const left = p.id === 'fiets-wandelbeurs-gante' || p.x > W - 180;
                return (
                  <g
                    key={p.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHot(p.id)}
                    onMouseLeave={() => setHot(null)}
                    onClick={() => onOpen(p.id)}
                    style={{ opacity: inView ? 1 : 0, transition: `opacity .6s ${600 + i * 140}ms` }}
                  >
                    <circle cx={p.x} cy={p.y} r="18" fill="transparent" />
                    <circle cx={p.x} cy={p.y} r={on ? 7 : 4.5} fill={on ? '#ff5a1f' : '#ede7da'} style={{ transition: 'r .3s, fill .3s' }} />
                    <text
                      x={left ? p.x - 14 : p.x + 14}
                      y={p.y + (p.id === 'fiets-wandelbeurs-gante' ? -8 : 4)}
                      textAnchor={left ? 'end' : 'start'}
                      fill={on ? '#ff8a5c' : 'rgba(237,231,218,0.8)'}
                      fontSize="15"
                      fontFamily="var(--font-display)"
                      fontStyle="italic"
                    >
                      {p.off ? `← ${p.city[lang]}` : p.city[lang]}
                    </text>
                    <text
                      x={left ? p.x - 14 : p.x + 14}
                      y={p.y + (p.id === 'fiets-wandelbeurs-gante' ? 8 : 20)}
                      textAnchor={left ? 'end' : 'start'}
                      fill="rgba(237,231,218,0.35)"
                      fontSize="10"
                      fontFamily="var(--font-mono)"
                      letterSpacing="1.5"
                    >
                      {p.km.toLocaleString('pt-PT')} KM
                    </text>
                  </g>
                );
              })}

              {/* Braga */}
              <g>
                <circle cx={bx} cy={by} r="10" fill="none" stroke="#ff5a1f" strokeOpacity="0.6">
                  <animate attributeName="r" values="8;26" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle cx={bx} cy={by} r="6" fill="#ff5a1f" />
                <text x={bx - 14} y={by + 5} textAnchor="end" fill="#ede7da" fontSize="22" fontFamily="var(--font-display)">
                  Braga
                </text>
              </g>
            </svg>

            {/* Pré-visualização */}
            <div
              className={`pointer-events-none absolute right-4 bottom-4 w-[42%] max-w-[260px] rounded-2xl overflow-hidden border border-[var(--line-2)] bg-slab transition-all duration-500 ease-out hidden sm:block ${
                active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              {active && (
                <>
                  <img src={active.image} alt="" className="w-full aspect-[16/10] object-cover" />
                  <div className="p-3.5">
                    <div className="label-sm text-ember">{active.status[lang]}</div>
                    <div className="font-display text-xl text-bone leading-tight mt-1.5">{active.title[lang]}</div>
                  </div>
                </>
              )}
            </div>
            <div className="absolute left-4 top-4 label-sm text-[var(--fg-3)] flex items-center gap-2">
              <span className="live-dot" /> {t('Origem: Braga, 41.55° N', 'Origin: Braga, 41.55° N')}
            </div>
          </div>

          {/* LISTA */}
          <ol className="lg:col-span-4 flex flex-col" onMouseLeave={() => setHot(null)}>
            {points.map((p, i) => {
              const proj = byId(p.id)!;
              const on = hot === p.id;
              return (
                <li key={p.id} data-reveal style={{ ['--reveal-delay' as any]: `${i * 70}ms` }}>
                  <button
                    onMouseEnter={() => setHot(p.id)}
                    onFocus={() => setHot(p.id)}
                    onClick={() => onOpen(p.id)}
                    className="group w-full text-left py-5 border-b border-[var(--line)] flex items-center gap-5"
                  >
                    <span className={`label tabular w-6 transition-colors ${on ? 'text-ember' : 'text-[var(--fg-3)]'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className={`block font-display text-[1.9rem] leading-none transition-all duration-500 ${on ? 'italic text-ember translate-x-1' : 'text-bone'}`}>
                        {p.city[lang]}
                      </span>
                      <span className="block mt-2 text-[13px] text-[var(--fg-3)] truncate">{proj.title[lang]}</span>
                    </span>
                    <span className="label-sm text-[var(--fg-3)] tabular text-right">
                      {p.km.toLocaleString('pt-PT')}
                      <br />
                      km
                    </span>
                    <ArrowUpRight className={`w-4 h-4 shrink-0 transition-all duration-500 ${on ? 'text-ember rotate-45' : 'text-[var(--fg-3)]'}`} />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Feiras - cartões */}
        <div className="mt-20 md:mt-28">
          <div data-reveal className="flex items-end justify-between gap-6 mb-8">
            <h3 className="h2 text-bone">
              {t('Feiras &', 'Fairs &')} <em className="text-ember">{t('mercados.', 'markets.')}</em>
            </h3>
            <span className="hidden md:block label text-[var(--fg-3)]">{t('Representação institucional', 'Institutional representation')}</span>
          </div>
          <div data-reveal="stagger" data-reveal-step="110" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fairs.map((f) => (
              <button
                key={f.id}
                data-cursor={t('Abrir', 'Open')}
                onClick={() => onOpen(f.id)}
                className="group relative aspect-[4/5] rounded-[24px] overflow-hidden bg-slab text-left"
              >
                <img
                  src={f.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-700 ease-out group-hover:-translate-y-2">
                  <span className="label-sm text-ember">{f.status[lang]}</span>
                  <h4 className="mt-3 font-display text-[2rem] leading-[0.95] text-bone">{f.title[lang]}</h4>
                  <div className="mt-3 flex items-center justify-between label-sm text-[var(--fg-2)]">
                    <span>{f.place[lang]}</span>
                    <span className="tabular">{f.year}</span>
                  </div>
                  <p className="mt-0 max-h-0 overflow-hidden opacity-0 text-[14px] text-[var(--fg-2)] leading-relaxed transition-all duration-700 ease-out group-hover:max-h-32 group-hover:opacity-100 group-hover:mt-4">
                    {f.summary[lang]}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
