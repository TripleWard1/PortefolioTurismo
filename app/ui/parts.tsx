'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useCountUp, useInView } from './hooks';
import { MISSIONS, PROJECTS, THEME_LABEL, type ProjectMeta } from './projects';

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
      <div className={`media rounded-3xl ${ratio} ${p.logo ? '!bg-white ring-1 ring-inset ring-line' : ''}`}>
        <img src={p.image} alt="" loading="lazy" className={p.logo ? '!object-contain p-[12%]' : ''} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="t-label text-mute">{THEME_LABEL[p.theme][lang]}</p>
          <h3 className={`mt-1 text-ink font-semibold tracking-[-0.025em] ${large ? 'text-[1.75rem] leading-tight' : 'text-[1.25rem] leading-snug'}`}>{p.title[lang]}</h3>
          {large && <p className="mt-2 text-[1.0625rem] leading-relaxed text-mute max-w-xl text-pretty">{p.summary[lang]}</p>}
        </div>
        <span className="t-label text-mute shrink-0 pt-0.5 tabular-nums">{p.year}</span>
      </div>
    </Link>
  );
}

/* Indicadores com contagem */
function Figure({ to, label, run, delay }: { to: number; label: string; run: boolean; delay: number }) {
  const v = useCountUp(to, run);
  return (
    <div className="pt-6 border-t border-ink" data-reveal style={{ ['--delay' as any]: `${delay}ms` }}>
      <p className="text-[clamp(3rem,2rem+3vw,4.5rem)] font-semibold leading-none tracking-[-0.05em] text-ink tabular-nums">{v}</p>
      <p className="mt-3 t-label text-mute max-w-[14rem]">{label}</p>
    </div>
  );
}

export function Figures() {
  const { t } = useLang();
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const data = [
    { to: PROJECTS.length, label: t('projetos documentados', 'documented projects') },
    { to: 29, label: t('experiências turísticas concebidas', 'tourism experiences designed') },
    { to: MISSIONS.length, label: t('missões internacionais, em 3 países', 'international missions, in 3 countries') },
    { to: 2, label: t('candidaturas a capitais europeias', 'bids for European capital titles') },
  ];
  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
      {data.map((d, i) => (
        <Figure key={d.label} to={d.to} label={d.label} run={inView} delay={i * 80} />
      ))}
    </div>
  );
}
