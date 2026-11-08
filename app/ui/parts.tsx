'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useCountUp, useInView } from './hooks';
import { MISSIONS, PROJECTS, THEME_LABEL, type ProjectMeta } from './projects';

/* Cabeçalho de página / secção */
export function PageHead({ kicker, title, intro, as = 'h2' }: { kicker: string; title: ReactNode; intro?: ReactNode; as?: 'h1' | 'h2' }) {
  const H = as;
  return (
    <header className="max-w-3xl" data-reveal>
      <p className="kicker">{kicker}</p>
      <H className={`mt-3 text-ink text-balance ${as === 'h1' ? 'h-display' : 'h-section'}`}>{title}</H>
      {intro && <p className="mt-5 text-[18px] leading-relaxed text-muted-foreground text-pretty">{intro}</p>}
    </header>
  );
}

/* Cartão de projeto */
export function ProjectCard({ p, size = 'md', delay = 0, animate = true }: { p: ProjectMeta; size?: 'md' | 'lg'; delay?: number; animate?: boolean }) {
  const { lang, t } = useLang();
  return (
    <Link
      href={`/projetos/${p.id}`}
      data-reveal={animate ? '' : undefined}
      style={{ ['--delay' as any]: `${delay}ms` }}
      className="group flex flex-col h-full rounded-xl bg-card border border-line overflow-hidden hover:border-petrol/40 hover:shadow-[0_18px_40px_-24px_rgba(14,90,107,0.45)] transition-[border-color,box-shadow] duration-300"
    >
      <div className={`photo ${size === 'lg' ? 'aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[320px]' : 'aspect-[16/10]'}`}>
        <img src={p.image} alt="" loading="lazy" />
      </div>
      <div className={size === 'lg' ? 'p-7' : 'p-6'}>
        <div className="flex items-center justify-between gap-3 text-[12px] font-semibold uppercase tracking-[0.1em]">
          <span className="text-petrol truncate">{THEME_LABEL[p.theme][lang]}</span>
          <span className="text-muted-foreground shrink-0">{p.year}</span>
        </div>
        <h3 className={`mt-3 font-serif font-medium text-ink leading-tight group-hover:text-petrol transition-colors ${size === 'lg' ? 'text-[2rem]' : 'text-[1.45rem]'}`}>
          {p.title[lang]}
        </h3>
        <p className="mt-1.5 text-[14px] text-muted-foreground flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          {p.place[lang]}
        </p>
        <p className={`mt-3 leading-relaxed text-muted-foreground ${size === 'lg' ? 'text-[16px]' : 'text-[15px] line-clamp-3'}`}>{p.summary[lang]}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-petrol">
          {t('Ver projeto', 'View project')}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/* Indicadores com contagem */
function Figure({ to, label, run, delay }: { to: number; label: string; run: boolean; delay: number }) {
  const v = useCountUp(to, run);
  return (
    <div className="bg-card px-6 py-7" data-reveal style={{ ['--delay' as any]: `${delay}ms` }}>
      <p className="font-serif text-[3rem] leading-none text-petrol tabular-nums">{v}</p>
      <p className="mt-3 text-[15px] leading-snug text-muted-foreground">{label}</p>
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
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-xl overflow-hidden">
      {data.map((d, i) => (
        <Figure key={d.label} to={d.to} label={d.label} run={inView} delay={i * 80} />
      ))}
    </div>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-[15px] font-semibold text-petrol">
      {children}
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
