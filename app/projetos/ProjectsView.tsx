'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useLang } from '../ui/LanguageContext';
import { PageHead, ProjectCard } from '../ui/parts';
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
    <div className="wrap pt-12 md:pt-16">
      <PageHead
        as="h1"
        kicker={t('Projetos', 'Projects')}
        title={area ? area.label[lang] : t('Todos os projetos', 'All projects')}
        intro={
          area
            ? area.description[lang]
            : t(
                'Candidaturas europeias, promoção internacional, inovação digital e produto turístico. Cada projeto tem uma página com o enquadramento, os eixos de intervenção, o registo fotográfico e os documentos.',
                'European bids, international promotion, digital innovation and tourism product. Each project has a page with its context, areas of intervention, photo record and documents.'
              )
        }
      />

      <div className="mt-10 flex flex-col xl:flex-row xl:items-center gap-4 xl:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={t('Filtrar por área', 'Filter by area')}>
          {tabs.map((tb) => {
            const on = filter === tb.id;
            return (
              <button
                key={tb.id}
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(tb.id)}
                className={`h-10 px-4 rounded-full border text-[14px] inline-flex items-center gap-2 transition-colors ${
                  on ? 'bg-ink border-ink text-cream' : 'bg-card border-line text-ink hover:border-petrol/50'
                }`}
              >
                {tb.label}
                <span className={`text-[12px] ${on ? 'text-cream/60' : 'text-muted'}`}>{tb.n}</span>
              </button>
            );
          })}
        </div>
        <label className="relative block xl:w-72">
          <span className="sr-only">{t('Pesquisar projetos', 'Search projects')}</span>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('Pesquisar…', 'Search…')}
            className="w-full h-10 pl-10 pr-9 rounded-full border border-line bg-card text-[14px] placeholder:text-muted outline-none focus:border-petrol"
          />
          {q && (
            <button onClick={() => setQ('')} aria-label={t('Limpar', 'Clear')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink">
              <X className="w-4 h-4" />
            </button>
          )}
        </label>
      </div>

      <p className="mt-6 text-[14px] text-muted" aria-live="polite">
        {t(`${visible.length} de ${PROJECTS.length} projetos`, `${visible.length} of ${PROJECTS.length} projects`)}
      </p>

      {visible.length ? (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((p, i) => (
            <ProjectCard key={`${filter}-${p.id}`} p={p} delay={(i % 3) * 80} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-line bg-card py-16 text-center">
          <p className="font-serif text-2xl">{t('Nenhum projeto encontrado.', 'No projects found.')}</p>
          <button
            onClick={() => {
              setQ('');
              setFilter('todos');
            }}
            className="mt-3 text-[14px] font-semibold text-petrol underline underline-offset-4"
          >
            {t('Limpar filtros', 'Clear filters')}
          </button>
        </div>
      )}
    </div>
  );
}
