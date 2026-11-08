'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../LanguageContext';
import { AREAS, PROJECTS } from '../projects';
import { AREA_COLOR, yearSpan } from './palette';

const Y0 = 2024;
const Y1 = 2027; // fim do eixo (exclusivo)
const pos = (y: number) => ((y - Y0) / (Y1 - Y0)) * 100;

/**
 * Cronologia em formato Gantt: cada projeto ocupa os anos em que decorreu,
 * agrupado por área, com uma linha "hoje".
 */
export default function Gantt({ compact = false }: { compact?: boolean }) {
  const { lang, t } = useLang();
  const [hoje, setHoje] = useState<number | null>(null);
  const [hot, setHot] = useState<string | null>(null);

  useEffect(() => {
    const d = new Date();
    const y = d.getFullYear() + (d.getMonth() + d.getDate() / 31) / 12;
    if (y >= Y0 && y < Y1) setHoje(pos(y));
  }, []);

  const groups = AREAS.map((a) => ({
    a,
    items: PROJECTS.filter((p) => p.theme === a.id).sort((x, y) => yearSpan(x.year)[0] - yearSpan(y.year)[0]),
  }));
  let row = 0;

  return (
    <div className="rounded-3xl bg-soft p-5 md:p-8 overflow-hidden">
      {/* Eixo */}
      <div className="grid grid-cols-[minmax(0,9rem)_1fr] md:grid-cols-[minmax(0,15rem)_1fr] gap-4 pb-3 border-b border-line">
        <span className="t-label text-mute">{t('Projeto', 'Project')}</span>
        <div className="relative h-4">
          {[2024, 2025, 2026].map((y) => (
            <span key={y} className="absolute top-0 t-label text-mute tabular-nums" style={{ left: `${pos(y)}%` }}>
              {y}
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Grelha dos anos + hoje */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-[minmax(0,9rem)_1fr] md:grid-cols-[minmax(0,15rem)_1fr] gap-4">
          <span />
          <div className="relative">
            {[2025, 2026].map((y) => (
              <span key={y} className="absolute top-0 bottom-0 w-px bg-line" style={{ left: `${pos(y)}%` }} />
            ))}
            {hoje !== null && (
              <span className="absolute top-0 bottom-0 w-px bg-ink" style={{ left: `${hoje}%` }}>
                <span className="absolute -top-0 left-1.5 text-[11px] font-semibold text-ink whitespace-nowrap">{t('hoje', 'today')}</span>
              </span>
            )}
          </div>
        </div>

        {groups.map(({ a, items }) => (
          <div key={a.id} className="relative pt-5">
            <p className="t-label text-ink mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: AREA_COLOR[a.id] }} />
              {a.label[lang]}
            </p>
            {items.map((p) => {
              const [s, e] = yearSpan(p.year);
              const left = pos(s);
              const width = pos(e + 1) - left;
              const k = row++;
              const on = hot === p.id;
              return (
                <Link
                  key={p.id}
                  href={`/projetos/${p.id}`}
                  onMouseEnter={() => setHot(p.id)}
                  onMouseLeave={() => setHot(null)}
                  className={`grid grid-cols-[minmax(0,9rem)_1fr] md:grid-cols-[minmax(0,15rem)_1fr] gap-4 items-center ${compact ? 'py-1' : 'py-1.5'} rounded-md transition-colors ${on ? 'bg-white' : ''}`}
                >
                  <span className={`truncate text-[14px] transition-colors ${on ? 'text-ink font-medium' : 'text-ink/80'}`}>{p.title[lang]}</span>
                  <span className="relative h-6">
                    <motion.span
                      className="absolute top-0 h-full rounded-full flex items-center px-2.5 text-[11px] font-medium text-white overflow-hidden whitespace-nowrap"
                      style={{ left: `${left}%`, width: `${width}%`, background: AREA_COLOR[a.id], transformOrigin: 'left', opacity: hot && !on ? 0.45 : 1 }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 + k * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="hidden md:inline truncate">{p.place[lang]}</span>
                    </motion.span>
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
