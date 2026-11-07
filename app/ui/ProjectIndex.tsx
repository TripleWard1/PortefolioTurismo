'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import ChapterHead from './ChapterHead';
import { PROJECTS, THEMES, THEME_LABEL, type Theme } from './projects';

export default function ProjectIndex({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<Theme | 'todos'>('todos');
  const [hover, setHover] = useState<string | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0 });

  const visible = PROJECTS.filter((p) => filter === 'todos' || p.theme === filter);
  const countFor = (id: Theme | 'todos') =>
    id === 'todos' ? PROJECTS.length : PROJECTS.filter((p) => p.theme === id).length;

  // Pré-visualização com inércia a seguir o cursor
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    const loop = () => {
      const s = pos.current;
      s.cx += (s.x - s.cx) * 0.14;
      s.cy += (s.y - s.cy) * 0.14;
      if (preview.current) preview.current.style.transform = `translate3d(${s.cx}px, ${s.cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const r = list.current?.getBoundingClientRect();
    if (!r) return;
    pos.current.x = e.clientX - r.left;
    pos.current.y = e.clientY - r.top;
  };

  return (
    <section id="indice" className="relative bg-night py-28 md:py-40">
      <div className="wrap">
        <ChapterHead
          n="05"
          label={t('Índice', 'Index')}
          title={t('Todos os', 'Every')}
          accent={t('dossiers.', 'dossier.')}
        >
          {t(
            `${PROJECTS.length} dossiers estratégicos. Filtre por domínio, ou prima ⌘K para pesquisar.`,
            `${PROJECTS.length} strategic dossiers. Filter by domain, or press ⌘K to search.`
          )}
        </ChapterHead>

        {/* Filtros */}
        <div data-reveal className="mt-14 flex flex-wrap gap-2" role="tablist" aria-label={t('Filtrar por domínio', 'Filter by domain')}>
          {THEMES.map((th) => {
            const on = filter === th.id;
            return (
              <button
                key={th.id}
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(th.id)}
                className={`h-11 px-5 rounded-full flex items-center gap-3 text-[14px] transition-all duration-300 border ${
                  on ? 'bg-bone text-night border-bone' : 'text-[var(--fg-2)] border-[var(--line-2)] hover:border-bone hover:text-bone'
                }`}
              >
                {lang === 'pt' ? th.pt : th.en}
                <span className={`label-sm tabular ${on ? 'text-night/50' : 'text-[var(--fg-3)]'}`}>{countFor(th.id)}</span>
              </button>
            );
          })}
        </div>

        {/* Lista */}
        <div ref={list} className="relative mt-10" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
          <div className="hidden md:grid grid-cols-12 gap-6 pb-4 label-sm text-[var(--fg-3)] border-b border-[var(--line-2)]">
            <span className="col-span-1">N.º</span>
            <span className="col-span-6">{t('Projeto', 'Project')}</span>
            <span className="col-span-2">{t('Domínio', 'Domain')}</span>
            <span className="col-span-2">{t('Local', 'Place')}</span>
            <span className="col-span-1 text-right">{t('Ano', 'Year')}</span>
          </div>

          {visible.map((p, i) => {
            const on = hover === p.id;
            const dim = hover && !on;
            return (
              <button
                key={p.id}
                onPointerEnter={() => setHover(p.id)}
                onFocus={() => setHover(p.id)}
                onBlur={() => setHover(null)}
                onClick={() => onOpenProject(p.id)}
                className="fade group relative w-full grid grid-cols-12 gap-x-6 gap-y-2 items-center py-6 md:py-7 border-b border-[var(--line)] text-left"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="absolute inset-0 bg-bone origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out hidden md:block" />
                <span className={`relative col-span-2 md:col-span-1 label tabular transition-colors ${on ? 'md:text-night text-ember' : 'text-[var(--fg-3)]'}`}>
                  {String(PROJECTS.indexOf(p) + 1).padStart(2, '0')}
                </span>
                <span
                  className={`relative col-span-10 md:col-span-6 font-display text-[clamp(1.8rem,1.2rem+1.8vw,3rem)] leading-none transition-all duration-500 ${
                    on ? 'md:text-night md:translate-x-3 italic' : dim ? 'text-[var(--fg-3)]' : 'text-bone'
                  }`}
                >
                  {p.title[lang]}
                </span>
                <span className={`relative col-start-3 col-span-5 md:col-start-auto md:col-span-2 label-sm transition-colors ${on ? 'md:text-night/60 text-[var(--fg-2)]' : 'text-[var(--fg-3)]'}`}>
                  {THEME_LABEL[p.theme][lang]}
                </span>
                <span className={`relative hidden md:block md:col-span-2 text-[14px] transition-colors ${on ? 'text-night/70' : 'text-[var(--fg-3)]'}`}>
                  {p.place[lang]}
                </span>
                <span className={`relative col-span-5 md:col-span-1 flex items-center justify-end gap-3 label-sm tabular transition-colors ${on ? 'md:text-night text-[var(--fg-2)]' : 'text-[var(--fg-3)]'}`}>
                  {p.year}
                  <ArrowUpRight className={`w-4 h-4 transition-transform duration-500 ${on ? 'rotate-45 md:text-ember' : ''}`} />
                </span>
              </button>
            );
          })}

          {/* Pré-visualização flutuante */}
          <div
            ref={preview}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 hidden [@media(pointer:fine)]:block"
          >
            <div
              className="relative w-[300px] aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out bg-slab"
              style={{
                opacity: hover ? 1 : 0,
                transform: hover ? 'scale(1) rotate(-3deg)' : 'scale(0.6) rotate(0deg)',
              }}
            >
              {PROJECTS.map((p) => (
                <img
                  key={p.id}
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                  style={{ opacity: hover === p.id ? 1 : 0 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
