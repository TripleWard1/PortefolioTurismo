'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang } from '../LanguageContext';
import { AREAS, PROJECTS } from '../projects';
import { AREA_COLOR } from './palette';

/* Distribuição dos projetos pelas quatro áreas, numa barra segmentada */
export default function AreaBar() {
  const { lang, t } = useLang();
  const total = PROJECTS.length;
  const data = AREAS.map((a) => ({ ...a, n: PROJECTS.filter((p) => p.theme === a.id).length }));
  return (
    <figure>
      <div className="flex h-3 rounded-full overflow-hidden bg-line/60 gap-[3px]" role="img" aria-label={t('Distribuição dos projetos por área', 'Projects by area')}>
        {data.map((a, i) => (
          <motion.span
            key={a.id}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ background: AREA_COLOR[a.id], width: `${(a.n / total) * 100}%`, transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
      <figcaption className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
        {data.map((a) => (
          <Link key={a.id} href={`/projetos?area=${a.id}`} className="group flex items-start gap-2.5">
            <span className="mt-1.5 w-2.5 h-2.5 rounded-full shrink-0" style={{ background: AREA_COLOR[a.id] }} />
            <span className="text-[14px] leading-snug">
              <span className="text-ink group-hover:text-petrol transition-colors">{a.label[lang]}</span>
              <span className="text-muted-foreground"> · {a.n}</span>
            </span>
          </Link>
        ))}
      </figcaption>
    </figure>
  );
}
