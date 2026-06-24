'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { PROJECTS, THEMES, THEME_LABEL, type Theme } from './projects';

export default function ProjectIndex({
  onOpenProject,
}: {
  onOpenProject: (id: string) => void;
}) {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<Theme | 'todos'>('todos');

  const visible = PROJECTS.filter((p) => filter === 'todos' || p.theme === filter);
  const countFor = (id: Theme | 'todos') =>
    id === 'todos' ? PROJECTS.length : PROJECTS.filter((p) => p.theme === id).length;

  return (
    <section id="indice" className="relative py-24 md:py-28 overflow-hidden bg-[var(--paper-warm)]">
      <div className="absolute inset-0 grid-dots text-slate-900/[0.04]" />
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-7 bg-[var(--primary)]" />
              <span className="eyebrow text-[var(--primary)]">{t('Índice', 'Index')}</span>
            </div>
            <h2 className="display font-playfair font-black text-[var(--ink)] text-balance">
              {t('Todos os', 'All')}{' '}
              <span className="italic font-light text-[var(--primary)]">
                {t('Projetos.', 'Projects.')}
              </span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm leading-relaxed">
            {t(
              'Doze dossiers estratégicos. Filtre por domínio para navegar o portefólio.',
              'Twelve strategic dossiers. Filter by domain to navigate the portfolio.'
            )}
          </p>
        </div>

        {/* Filtros */}
        <div data-reveal className="flex flex-wrap gap-2 mb-10">
          {THEMES.map((th) => {
            const isActive = filter === th.id;
            return (
              <button
                key={th.id}
                onClick={() => setFilter(th.id)}
                className={`group flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-[var(--primary)]/40 hover:text-[var(--primary)]'
                }`}
              >
                {lang === 'pt' ? th.pt : th.en}
                <span
                  className={`font-mono text-[9px] ${
                    isActive ? 'text-white/60' : 'text-slate-400'
                  }`}
                >
                  {countFor(th.id)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Lista */}
        <div data-reveal="stagger" data-reveal-step="60" className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {visible.map((p, i) => (
            <button
              key={p.id}
              onClick={() => onOpenProject(p.id)}
              className="group flex items-center gap-4 p-3 rounded-2xl bg-white border border-slate-200 hover:border-[var(--primary)]/30 hover:shadow-[var(--shadow-soft)] transition-all duration-400 text-left"
            >
              <span className="font-mono text-[10px] font-bold text-slate-300 w-6 shrink-0 text-center">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={p.image}
                  alt=""
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-playfair text-lg font-bold text-[var(--ink)] truncate group-hover:text-[var(--primary)] transition-colors">
                  {lang === 'pt' ? p.pt : p.en}
                </h3>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
                  {THEME_LABEL[p.theme][lang === 'pt' ? 'pt' : 'en']}
                </span>
              </div>
              <span className="shrink-0 w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)] transition-all duration-400">
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:rotate-45 transition-all duration-400" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}