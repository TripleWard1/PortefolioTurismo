'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useLang } from '../ui/LanguageContext';
import { ProjectCard } from '../ui/parts';
import { AREAS, PROJECTS, THEME_LABEL, type Theme } from '../ui/projects';

type Filter = Theme | 'todos';
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function ProjectsView() {
  const { t, lang } = useLang();
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const fromUrl = params.get('area') as Theme | null;
  const filter: Filter = fromUrl && AREAS.some((a) => a.id === fromUrl) ? fromUrl : 'todos';
  const [q, setQ] = useState('');

  const setFilter = (f: Filter) => router.replace(f === 'todos' ? path : `${path}?area=${f}`, { scroll: false });

  const visible = useMemo(() => {
    const nq = norm(q.trim());
    return PROJECTS.filter(
      (p) =>
        (filter === 'todos' || p.theme === filter) &&
        (!nq || norm(`${p.title[lang]} ${p.place[lang]} ${p.summary[lang]} ${THEME_LABEL[p.theme][lang]}`).includes(nq))
    );
  }, [filter, q, lang]);

  const tabs: { id: Filter; label: string; n: number }[] = [
    { id: 'todos', label: t('Todos', 'All'), n: PROJECTS.length },
    ...AREAS.map((a) => ({ id: a.id, label: a.label[lang], n: PROJECTS.filter((p) => p.theme === a.id).length })),
  ];
  const area = AREAS.find((a) => a.id === filter);

  return (
    <div className="wrap pt-16 md:pt-24">
      <header data-reveal>
        <p className="t-label text-mute">{t('Projetos', 'Work')}</p>
        <h1 className="mt-4 t-hero text-ink">
          {area ? area.label[lang] : <>{t('Todos os', 'All')} <span className="em">{t('projetos', 'projects')}</span>.</>}
        </h1>
        <p className="mt-6 t-lead text-mute max-w-2xl text-pretty">
          {area
            ? area.description[lang]
            : t(
                'Treze projetos de turismo, entre candidaturas europeias, promoção internacional, inovação digital e produto turístico.',
                'Thirteen tourism projects, across European bids, international promotion, digital innovation and tourism product.'
              )}
        </p>
      </header>

      <div className="mt-14 flex flex-col lg:flex-row lg:items-center gap-4 justify-between border-b border-line pb-6">
        <div className="flex flex-wrap gap-1" role="tablist" aria-label={t('Filtrar por área', 'Filter by area')}>
          {tabs.map((tb) => {
            const on = filter === tb.id;
            return (
              <button
                key={tb.id}
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(tb.id)}
                className={`t-label h-9 px-4 rounded-full transition-colors ${on ? 'bg-ink text-white' : 'text-mute hover:text-ink hover:bg-soft'}`}
              >
                {tb.label}
                <span className={`ml-1.5 tabular-nums ${on ? 'text-white/50' : 'text-mute/70'}`}>{tb.n}</span>
              </button>
            );
          })}
        </div>
        <label className="relative block lg:w-64">
          <span className="sr-only">{t('Pesquisar projetos', 'Search projects')}</span>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mute" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('Pesquisar', 'Search')}
            className="w-full h-10 pl-10 pr-9 rounded-full bg-soft text-[15px] text-ink placeholder:text-mute outline-none focus:bg-white focus:ring-1 focus:ring-ink/20 transition"
          />
          {q && (
            <button onClick={() => setQ('')} aria-label={t('Limpar', 'Clear')} className="absolute right-3 top-1/2 -translate-y-1/2 text-mute hover:text-ink">
              <X className="w-4 h-4" />
            </button>
          )}
        </label>
      </div>

      {visible.length ? (
        <motion.div layout className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard p={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-12 rounded-3xl bg-soft py-20 text-center">
          <p className="t-h3 text-ink">{t('Nenhum projeto encontrado.', 'No projects found.')}</p>
          <button
            onClick={() => {
              setQ('');
              setFilter('todos');
            }}
            className="mt-3 t-label text-ink underline underline-offset-4"
          >
            {t('Limpar filtros', 'Clear filters')}
          </button>
        </div>
      )}
    </div>
  );
}
