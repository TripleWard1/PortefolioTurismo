'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Briefcase, Globe2, Landmark, MapPin, MonitorSmartphone, Search, X } from 'lucide-react';
import { useLang } from './LanguageContext';
import { AREAS, MISSIONS, PROJECTS, THEME_LABEL, byId, type Theme } from './projects';

export type Filter = Theme | 'todos';

const ICONS: Record<Theme, typeof Globe2> = {
  europeu: Landmark,
  internacional: Globe2,
  digital: MonitorSmartphone,
  produto: Briefcase,
};

const count = (id: Filter) => (id === 'todos' ? PROJECTS.length : PROJECTS.filter((p) => p.theme === id).length);
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function SectionHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-serif font-semibold text-ink text-[clamp(1.9rem,1.4rem+1.6vw,2.6rem)] leading-tight">{title}</h2>
      {intro && <p className="mt-4 text-[17px] leading-relaxed text-muted text-pretty">{intro}</p>}
    </header>
  );
}

/* --- Áreas de atuação ---------------------------------------------------- */
export function Areas({ onPick }: { onPick: (f: Filter) => void }) {
  const { t, lang } = useLang();
  return (
    <section id="areas" className="bg-white py-20 md:py-24">
      <div className="wrap">
        <SectionHeader
          eyebrow={t('Áreas de atuação', 'Areas of work')}
          title={t('Quatro frentes de trabalho', 'Four lines of work')}
          intro={t(
            'O trabalho desenvolvido organiza-se em quatro áreas. Selecione uma para ver os respetivos projetos.',
            'The work is organised into four areas. Select one to see its projects.'
          )}
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AREAS.map((a, i) => {
            const Icon = ICONS[a.id];
            return (
              <button
                key={a.id}
                onClick={() => onPick(a.id)}
                className="group text-left rounded-lg border border-line bg-white p-6 flex flex-col hover:border-navy hover:shadow-[0_8px_24px_-12px_rgba(18,53,91,0.25)] transition-[border-color,box-shadow]"
              >
                <div className="flex items-center justify-between">
                  <span className="w-11 h-11 rounded bg-surface text-navy grid place-items-center">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-[13px] font-semibold text-muted">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-5 font-serif font-semibold text-[1.25rem] leading-snug text-ink">{a.label[lang]}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted flex-1">{a.description[lang]}</p>
                <span className="mt-5 pt-4 border-t border-line text-[14px] font-semibold text-navy flex items-center justify-between">
                  {count(a.id)} {t('projetos', 'projects')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --- Projetos ------------------------------------------------------------ */
export function Projects({
  filter,
  setFilter,
  onOpen,
}: {
  filter: Filter;
  setFilter: (f: Filter) => void;
  onOpen: (id: string) => void;
}) {
  const { t, lang } = useLang();
  const [q, setQ] = useState('');

  const visible = useMemo(() => {
    const nq = norm(q.trim());
    return PROJECTS.filter(
      (p) =>
        (filter === 'todos' || p.theme === filter) &&
        (!nq || norm(`${p.title[lang]} ${p.place[lang]} ${p.summary[lang]} ${THEME_LABEL[p.theme][lang]}`).includes(nq))
    );
  }, [filter, q, lang]);

  const tabs: { id: Filter; label: string }[] = [
    { id: 'todos', label: t('Todos', 'All') },
    ...AREAS.map((a) => ({ id: a.id, label: a.label[lang] })),
  ];

  return (
    <section id="projetos" className="bg-surface py-20 md:py-24 border-y border-line">
      <div className="wrap">
        <SectionHeader
          eyebrow={t('Projetos', 'Projects')}
          title={t('Portefólio de projetos', 'Project portfolio')}
          intro={t(
            'Cada projeto tem um dossier com o enquadramento, os eixos de intervenção, o registo fotográfico e os documentos oficiais.',
            'Each project has a dossier with its context, areas of intervention, photo record and official documents.'
          )}
        />

        {/* Barra de ferramentas */}
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
                  className={`h-10 px-4 rounded border text-[14px] font-medium inline-flex items-center gap-2 transition-colors ${
                    on ? 'bg-navy border-navy text-white' : 'bg-white border-line text-ink hover:border-navy'
                  }`}
                >
                  {tb.label}
                  <span className={`text-[12px] font-semibold ${on ? 'text-white/70' : 'text-muted'}`}>{count(tb.id)}</span>
                </button>
              );
            })}
          </div>
          <label className="relative block xl:w-72">
            <span className="sr-only">{t('Pesquisar projetos', 'Search projects')}</span>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('Pesquisar projetos…', 'Search projects…')}
              className="w-full h-10 pl-9 pr-9 rounded border border-line bg-white text-[14px] text-ink placeholder:text-muted outline-none focus:border-navy"
            />
            {q && (
              <button onClick={() => setQ('')} aria-label={t('Limpar', 'Clear')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink">
                <X className="w-4 h-4" />
              </button>
            )}
          </label>
        </div>

        <p className="mt-6 text-[14px] text-muted" aria-live="polite">
          {t(`A mostrar ${visible.length} de ${PROJECTS.length} projetos`, `Showing ${visible.length} of ${PROJECTS.length} projects`)}
        </p>

        {/* Grelha */}
        {visible.length ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((p) => (
              <article key={p.id} className="group rounded-lg border border-line bg-white overflow-hidden flex flex-col hover:border-navy hover:shadow-[0_10px_30px_-16px_rgba(18,53,91,0.35)] transition-[border-color,box-shadow]">
                <button onClick={() => onOpen(p.id)} className="text-left flex flex-col flex-1" aria-label={`${p.title[lang]} — ${t('consultar dossier', 'open dossier')}`}>
                  <div className="aspect-[16/10] bg-surface-2 overflow-hidden">
                    <img src={p.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-3 text-[12px] font-semibold uppercase tracking-[0.06em]">
                      <span className="text-accent truncate">{THEME_LABEL[p.theme][lang]}</span>
                      <span className="text-muted shrink-0">{p.year}</span>
                    </div>
                    <h3 className="mt-3 font-serif font-semibold text-[1.35rem] leading-snug text-ink group-hover:text-navy transition-colors">
                      {p.title[lang]}
                    </h3>
                    <p className="mt-1.5 text-[14px] text-muted flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {p.place[lang]}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted flex-1">{p.summary[lang]}</p>
                    <span className="mt-5 pt-4 border-t border-line text-[14px] font-semibold text-navy flex items-center gap-2">
                      {t('Consultar dossier', 'Open dossier')}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-dashed border-line bg-white py-16 text-center">
            <p className="font-serif text-xl text-ink">{t('Nenhum projeto encontrado.', 'No projects found.')}</p>
            <button
              onClick={() => {
                setQ('');
                setFilter('todos');
              }}
              className="mt-3 text-[14px] font-semibold text-navy underline underline-offset-4"
            >
              {t('Limpar filtros', 'Clear filters')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* --- Missões internacionais ---------------------------------------------- */
export function Missions({ onOpen }: { onOpen: (id: string) => void }) {
  const { t, lang } = useLang();
  return (
    <section id="missoes" className="bg-white py-20 md:py-24">
      <div className="wrap">
        <SectionHeader
          eyebrow={t('Missões internacionais', 'International missions')}
          title={t('Representação de Braga no exterior', 'Representing Braga abroad')}
          intro={t(
            'Feiras, cimeiras e júris internacionais em que representei o Município de Braga.',
            'Fairs, summits and international juries where I represented the Municipality of Braga.'
          )}
        />

        {/* Tabela (desktop) */}
        <div className="mt-10 hidden md:block rounded-lg border border-line overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-surface text-[12px] font-semibold uppercase tracking-[0.06em] text-muted">
              <tr>
                <th scope="col" className="px-6 py-3.5">{t('Local', 'Location')}</th>
                <th scope="col" className="px-6 py-3.5">{t('Evento', 'Event')}</th>
                <th scope="col" className="px-6 py-3.5">{t('Área', 'Area')}</th>
                <th scope="col" className="px-6 py-3.5">{t('Ano', 'Year')}</th>
                <th scope="col" className="px-6 py-3.5"><span className="sr-only">{t('Dossier', 'Dossier')}</span></th>
              </tr>
            </thead>
            <tbody>
              {MISSIONS.map((m) => {
                const p = byId(m.id)!;
                return (
                  <tr key={m.id} className="border-t border-line hover:bg-surface/60">
                    <td className="px-6 py-4">
                      <span className="block font-semibold text-ink">{m.city[lang]}</span>
                      <span className="block text-[13px] text-muted">{m.country[lang]}</span>
                    </td>
                    <td className="px-6 py-4 text-[15px] text-ink">{m.event}</td>
                    <td className="px-6 py-4 text-[14px] text-muted">{THEME_LABEL[p.theme][lang]}</td>
                    <td className="px-6 py-4 text-[14px] text-muted whitespace-nowrap">{m.year}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => onOpen(m.id)} className="text-[14px] font-semibold text-navy hover:underline underline-offset-4 inline-flex items-center gap-1.5">
                        {t('Dossier', 'Dossier')}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Lista (mobile) */}
        <ul className="mt-8 md:hidden rounded-lg border border-line divide-y divide-line">
          {MISSIONS.map((m) => (
            <li key={m.id}>
              <button onClick={() => onOpen(m.id)} className="w-full text-left px-5 py-4 flex items-center justify-between gap-4">
                <span>
                  <span className="block font-semibold text-ink">
                    {m.city[lang]}, {m.country[lang]}
                  </span>
                  <span className="block mt-0.5 text-[14px] text-muted">
                    {m.event} · {m.year}
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-navy shrink-0" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

