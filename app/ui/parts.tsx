'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { TONE } from './viz/palette';
import { THEME_LABEL, type ProjectMeta } from './projects';

/* Cabeçalho de secção */
export function SectionHead({ label, title, intro, action }: { label: string; title: ReactNode; intro?: ReactNode; action?: ReactNode }) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6" data-reveal>
      <div className="max-w-2xl">
        <p className="t-label text-mute">{label}</p>
        <h2 className="mt-3 t-h2 text-ink text-balance">{title}</h2>
        {intro && <p className="mt-4 t-lead text-mute text-pretty">{intro}</p>}
      </div>
      {action}
    </header>
  );
}

/* Ligação de texto com seta */
export function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`group t-label inline-flex items-center gap-1 shrink-0 ${light ? 'text-white' : 'text-ink'}`}>
      <span className="underline decoration-1 underline-offset-4 decoration-current/30 group-hover:decoration-current transition-colors">{children}</span>
      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

/* Cartão de projeto: imagem grande, texto por baixo, sem molduras */
export function ProjectCard({ p, ratio = 'aspect-[4/3]', delay = 0, large = false }: { p: ProjectMeta; ratio?: string; delay?: number; large?: boolean }) {
  const { lang } = useLang();
  return (
    <Link href={`/projetos/${p.id}`} data-reveal style={{ ['--delay' as any]: `${delay}ms` }} className="group block">
      <div className={`media rounded-3xl ${ratio} ${p.logo ? 'ring-1 ring-inset ring-line' : ''}`} style={{ background: TONE[p.theme].tint }}>
        <img src={p.image} alt="" loading="lazy" className={p.logo ? '!object-contain p-[12%]' : ''} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="t-label inline-flex items-center gap-2" style={{ color: TONE[p.theme].deep }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: TONE[p.theme].deep }} />
            {THEME_LABEL[p.theme][lang]}
          </p>
          <h3 className={`mt-1 text-ink font-semibold tracking-[-0.025em] ${large ? 'text-[1.75rem] leading-tight' : 'text-[1.25rem] leading-snug'}`}>{p.title[lang]}</h3>
          {large && <p className="mt-2 text-[1.0625rem] leading-relaxed text-mute max-w-xl text-pretty">{p.summary[lang]}</p>}
        </div>
        <span className="t-label text-mute shrink-0 pt-0.5 tabular-nums">{p.year}</span>
      </div>
    </Link>
  );
}
