'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, CornerDownLeft, FolderOpen, Hash, Languages, X } from 'lucide-react';
import { useLang } from './LanguageContext';
import { PROJECTS, THEME_LABEL } from './projects';

interface Props {
  open: boolean;
  onClose: () => void;
  onOpenProject: (id: string) => void;
  onGoSection: (id: string) => void;
}

type Item =
  | { kind: 'project'; id: string; label: string; sub: string }
  | { kind: 'section'; id: string; label: string }
  | { kind: 'action'; id: 'lang'; label: string };

export default function CommandPalette({ open, onClose, onOpenProject, onGoSection }: Props) {
  const { lang, t, toggleLang } = useLang();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const sections: Item[] = [
    { kind: 'section', id: 'top', label: t('Início', 'Home') },
    { kind: 'section', id: 'arquivo', label: t('Posicionamento Global', 'Global Positioning') },
    { kind: 'section', id: 'indice', label: t('Índice de Projetos', 'Project Index') },
    { kind: 'section', id: 'capitulo-02', label: t('Ecossistema Digital', 'Digital Ecosystem') },
    { kind: 'section', id: 'estratégia', label: t('Herança & Futuro', 'Heritage & Future') },
    { kind: 'section', id: 'contacto', label: t('Contacto', 'Contact') },
  ];

  const projectItems: Item[] = PROJECTS.map((p) => ({
    kind: 'project',
    id: p.id,
    label: lang === 'pt' ? p.pt : p.en,
    sub: THEME_LABEL[p.theme][lang === 'pt' ? 'pt' : 'en'],
  }));

  const actions: Item[] = [
    { kind: 'action', id: 'lang', label: t('Alternar idioma (PT / EN)', 'Switch language (PT / EN)') },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = [...projectItems, ...sections, ...actions];
    if (!q) return all;
    return all.filter((it) => it.label.toLowerCase().includes(q));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, lang]);

  // Reset ao abrir
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 40);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const run = (it: Item) => {
    onClose();
    if (it.kind === 'project') onOpenProject(it.id);
    else if (it.kind === 'section') {
      if (it.id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
      else onGoSection(it.id);
    } else if (it.kind === 'action' && it.id === 'lang') toggleLang();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[active]) run(filtered[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Auto-scroll do item ativo
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  let runningIdx = -1;
  const group = (kind: Item['kind'], title: string) => {
    const items = filtered.filter((it) => it.kind === kind);
    if (items.length === 0) return null;
    return (
      <div className="px-2 pt-3">
        <div className="px-3 pb-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400">
          {title}
        </div>
        {items.map((it) => {
          runningIdx += 1;
          const idx = runningIdx;
          const isActive = idx === active;
          return (
            <button
              key={`${it.kind}-${it.id}`}
              data-idx={idx}
              onMouseEnter={() => setActive(idx)}
              onClick={() => run(it)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                isActive ? 'bg-[var(--primary)] text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span
                className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                  isActive ? 'bg-white/20' : 'bg-slate-100'
                }`}
              >
                {it.kind === 'project' ? (
                  <FolderOpen className="w-3.5 h-3.5" />
                ) : it.kind === 'section' ? (
                  <Hash className="w-3.5 h-3.5" />
                ) : (
                  <Languages className="w-3.5 h-3.5" />
                )}
              </span>
              <span className="flex-1 text-sm font-medium truncate">{it.label}</span>
              {it.kind === 'project' && (
                <span
                  className={`font-mono text-[9px] uppercase tracking-widest ${
                    isActive ? 'text-white/70' : 'text-slate-400'
                  }`}
                >
                  {it.sub}
                </span>
              )}
              {isActive && <CornerDownLeft className="w-3.5 h-3.5 opacity-80" />}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[1500] flex items-start justify-center px-4 pt-[12vh] animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[var(--ink)]/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-[0_30px_90px_-20px_rgba(10,20,36,0.5)] border border-slate-200 overflow-hidden animate-in zoom-in-95 slide-in-from-top-2 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 border-b border-slate-100">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder={t('Pesquisar projetos, secções…', 'Search projects, sections…')}
            className="flex-1 py-4 bg-transparent outline-none text-[15px] text-[var(--ink)] placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Lista */}
        <div ref={listRef} className="max-h-[52vh] overflow-y-auto pb-3">
          {filtered.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-slate-400">
              {t('Sem resultados', 'No results')}
            </div>
          ) : (
            <>
              {group('project', t('Projetos', 'Projects'))}
              {group('section', t('Secções', 'Sections'))}
              {group('action', t('Ações', 'Actions'))}
            </>
          )}
        </div>

        {/* Rodapé com dicas */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200">↑↓</kbd>
              {t('navegar', 'navigate')}
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200">↵</kbd>
              {t('abrir', 'open')}
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200">esc</kbd>
              {t('fechar', 'close')}
            </span>
          </div>
          <span className="font-playfair text-xs italic text-slate-400">Atlas</span>
        </div>
      </div>
    </div>
  );
}