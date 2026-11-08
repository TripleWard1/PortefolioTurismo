'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, LayoutGrid, List, Search, X } from 'lucide-react';
import { useLang } from '../ui/LanguageContext';
import { ProjectCard } from '../ui/parts';
import { AREAS, PROJECTS, THEME_LABEL, type Theme } from '../ui/projects';
import { TONE } from '../ui/viz/palette';

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
  const [view, setView] = useState<'grid' | 'list'>('grid');

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
    <div>
      <section className="tone-shift -mt-20 pt-36 md:pt-44 pb-10" style={{ background: area ? TONE[area.id].tint : '#F4F1EC' }}>
      <div className="wrap">
      <header data-reveal>
        <p className="t-label inline-flex items-center gap-2 tone-shift" style={{ color: area ? TONE[area.id].deep : '#6e6e73' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: area ? TONE[area.id].deep : '#1d1d1f' }} />
          {t('Projetos', 'Work')}
        </p>
        <h1 className="mt-4 t-hero text-ink">
          {area ? area.label[lang] : <>{t('Todos os', 'All')} <span className="em">{t('projetos', 'projects')}</span>.</>}
        </h1>
        <p className="mt-6 t-lead text-mute max-w-2xl text-pretty">
          {area
            ? area.description[lang]
            : t(
                'Treze projetos entre 2024 e 2026, da candidatura europeia ao roteiro no terreno. Filtre por área, pesquise por palavra ou mude para a vista em lista.',
                'Thirteen projects from 2024 to 2026, from European bids to itineraries on the ground. Filter by area, search by keyword or switch to the list view.'
              )}
        </p>
      </header>

      <div className="mt-14 flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div className="flex flex-wrap gap-1" role="tablist" aria-label={t('Filtrar por área', 'Filter by area')}>
          {tabs.map((tb) => {
            const on = filter === tb.id;
            return (
              <button
                key={tb.id}
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(tb.id)}
                className={`t-label h-9 px-4 rounded-full transition-colors ${on ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink hover:bg-white/60'}`}
              >
                {tb.label}
                <span className={`ml-1.5 tabular-nums ${on ? 'text-white/50' : 'text-mute/70'}`}>{tb.n}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
        <label className="relative block flex-1 lg:w-64">
          <span className="sr-only">{t('Pesquisar projetos', 'Search projects')}</span>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mute" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('Pesquisar', 'Search')}
            className="w-full h-10 pl-10 pr-9 rounded-full bg-white/70 text-[15px] text-ink placeholder:text-mute outline-none focus:bg-white focus:ring-1 focus:ring-ink/20 transition"
          />
          {q && (
            <button onClick={() => setQ('')} aria-label={t('Limpar', 'Clear')} className="absolute right-3 top-1/2 -translate-y-1/2 text-mute hover:text-ink">
              <X className="w-4 h-4" />
            </button>
          )}
        </label>
          <div className="flex rounded-full bg-white/60 p-1" role="group" aria-label={t('Modo de visualização', 'View mode')}>
            {([
              ['grid', LayoutGrid, t('Grelha', 'Grid')],
              ['list', List, t('Lista', 'List')],
            ] as const).map(([v, Icon, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={view === v}
                aria-label={label}
                className={`w-8 h-8 rounded-full grid place-items-center transition-colors ${view === v ? 'bg-white text-ink shadow-sm' : 'text-mute hover:text-ink'}`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>
      </section>

      <div className="wrap pb-8">

      {visible.length && view === 'list' ? (
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="t-label text-mute border-b border-line">
                <th className="py-3 pr-4 font-normal">{t('Projeto', 'Project')}</th>
                <th className="py-3 pr-4 font-normal">{t('Área', 'Area')}</th>
                <th className="py-3 pr-4 font-normal">{t('Função', 'Role')}</th>
                <th className="py-3 pr-4 font-normal">{t('Resultado', 'Outcome')}</th>
                <th className="py-3 font-normal text-right">{t('Período', 'Period')}</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => (
                <tr key={p.id} className="group border-b border-line hover:bg-soft/60 transition-colors">
                  <td className="py-4 pr-4">
                    <Link href={`/projetos/${p.id}`} className="flex items-center gap-3">
                      <span className="media w-12 h-12 rounded-xl shrink-0" style={{ background: TONE[p.theme].tint }}>
                        <img src={p.image} alt="" loading="lazy" className={p.logo ? '!object-contain p-1' : ''} />
                      </span>
                      <span>
                        <span className="block text-[15px] font-semibold text-ink">{p.title[lang]}</span>
                        <span className="block t-label text-mute">{p.place[lang]}</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-mute opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </td>
                  <td className="py-4 pr-4 t-label">
                    <span className="inline-flex items-center gap-2" style={{ color: TONE[p.theme].deep }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: TONE[p.theme].deep }} />
                      {THEME_LABEL[p.theme][lang]}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-[14px] text-ink/80">{p.role[lang]}</td>
                  <td className="py-4 pr-4 text-[14px] text-ink/80">{p.outcome[lang]}</td>
                  <td className="py-4 t-label text-mute text-right tabular-nums whitespace-nowrap">{p.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : visible.length ? (
        <motion.div layout className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
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
    </div>
  );
}
