'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CornerDownLeft, Hash, Languages, Mail, Search } from 'lucide-react';
import { useLang } from './LanguageContext';
import { PROJECTS, THEME_LABEL } from './projects';
import { SECTIONS } from './sections';
import { useScrollLock } from './hooks';

interface Props {
  open: boolean;
  onClose: () => void;
  onOpenProject: (id: string) => void;
  onGoSection: (id: string) => void;
}

type Item =
  | { kind: 'project'; id: string; label: string; sub: string; image: string; n: string }
  | { kind: 'section'; id: string; label: string; n: string }
  | { kind: 'action'; id: 'lang' | 'mail'; label: string };

// Pesquisa tolerante a acentos (“heranca” encontra “Herança”)
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function CommandPalette({ open, onClose, onOpenProject, onGoSection }: Props) {
  const { lang, t, toggleLang } = useLang();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  useScrollLock(open);

  const all = useMemo<Item[]>(
    () => [
      ...PROJECTS.map((p, i) => ({
        kind: 'project' as const,
        id: p.id,
        label: p.title[lang],
        sub: `${THEME_LABEL[p.theme][lang]} · ${p.place[lang]}`,
        image: p.image,
        n: String(i + 1).padStart(2, '0'),
      })),
      { kind: 'section', id: 'top', label: t('Início', 'Home'), n: '—' },
      ...SECTIONS.map((s) => ({ kind: 'section' as const, id: s.id, label: s.label[lang], n: s.n })),
      { kind: 'action', id: 'lang', label: t('Switch to English', 'Mudar para português') },
      { kind: 'action', id: 'mail', label: t('Enviar email', 'Send an email') },
    ],
    [lang, t]
  );

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return all;
    return all.filter((it) => norm(it.label + ('sub' in it ? ' ' + it.sub : '')).includes(q));
  }, [query, all]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActive(0);
    const id = setTimeout(() => inputRef.current?.focus(), 40);
    return () => clearTimeout(id);
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const run = (it: Item) => {
    onClose();
    if (it.kind === 'project') onOpenProject(it.id);
    else if (it.kind === 'section') onGoSection(it.id);
    else if (it.id === 'lang') toggleLang();
    else window.location.href = 'mailto:hugo.barros@cm-braga.pt';
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

  if (!open) return null;

  let idx = -1;
  const group = (kind: Item['kind'], title: string) => {
    const items = filtered.filter((it) => it.kind === kind);
    if (!items.length) return null;
    return (
      <div className="px-2 pt-4">
        <div className="px-3 pb-2 label-sm text-[var(--fg-3)]">{title}</div>
        {items.map((it) => {
          idx += 1;
          const i = idx;
          const on = i === active;
          return (
            <button
              key={`${it.kind}-${it.id}`}
              data-idx={i}
              onMouseMove={() => active !== i && setActive(i)}
              onClick={() => run(it)}
              className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-2xl text-left transition-colors ${
                on ? 'bg-bone text-night' : 'text-[var(--fg)]'
              }`}
            >
              {it.kind === 'project' ? (
                <span className="shrink-0 w-12 h-9 rounded-lg overflow-hidden bg-slab">
                  <img src={it.image} alt="" className="w-full h-full object-cover" />
                </span>
              ) : (
                <span className={`shrink-0 w-12 h-9 rounded-lg grid place-items-center ${on ? 'bg-night/10' : 'bg-white/[0.04]'}`}>
                  {it.kind === 'section' ? <Hash className="w-4 h-4" /> : it.id === 'lang' ? <Languages className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </span>
              )}
              <span className="flex-1 min-w-0">
                <span className={`block truncate ${it.kind === 'project' ? 'font-display text-[1.25rem] leading-tight' : 'text-[15px]'}`}>{it.label}</span>
                {it.kind === 'project' && (
                  <span className={`block label-sm mt-1 truncate ${on ? 'text-night/55' : 'text-[var(--fg-3)]'}`}>{it.sub}</span>
                )}
              </span>
              {'n' in it && <span className={`label-sm tabular ${on ? 'text-night/50' : 'text-[var(--fg-3)]'}`}>{it.n}</span>}
              {on && <CornerDownLeft className="w-4 h-4 shrink-0 text-ember" />}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[1500] flex items-start justify-center px-3 sm:px-4 pt-[10vh]" onClick={onClose}>
      <div className="fade absolute inset-0 bg-night/70 backdrop-blur-md" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('Pesquisa', 'Search')}
        className="scale-in relative w-full max-w-2xl rounded-[28px] bg-granite border border-[var(--line-2)] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 px-6 border-b border-[var(--line)]">
          <Search className="w-5 h-5 text-ember shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder={t('Procurar dossiers, capítulos…', 'Search dossiers, chapters…')}
            aria-label={t('Procurar', 'Search')}
            className="flex-1 py-6 bg-transparent outline-none font-display text-[1.6rem] text-bone placeholder:text-[var(--fg-3)]"
          />
          <kbd className="label-sm text-[var(--fg-3)] border border-[var(--line-2)] rounded-full px-2.5 py-1.5">esc</kbd>
        </div>

        <div ref={listRef} className="max-h-[56vh] overflow-y-auto overscroll-contain pb-3">
          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="font-display italic text-3xl text-bone">{t('Nada encontrado.', 'Nothing found.')}</div>
              <div className="mt-3 text-[14px] text-[var(--fg-3)]">{t('Experimente “Braga”, “digital” ou “mapa”.', 'Try “Braga”, “digital” or “map”.')}</div>
            </div>
          ) : (
            <>
              {group('project', t('Dossiers', 'Dossiers'))}
              {group('section', t('Capítulos', 'Chapters'))}
              {group('action', t('Ações', 'Actions'))}
            </>
          )}
        </div>

        <div className="hidden sm:flex items-center justify-between px-6 py-3.5 border-t border-[var(--line)] label-sm text-[var(--fg-3)]">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2"><kbd className="border border-[var(--line-2)] rounded px-1.5 py-0.5">↑↓</kbd>{t('navegar', 'navigate')}</span>
            <span className="flex items-center gap-2"><kbd className="border border-[var(--line-2)] rounded px-1.5 py-0.5">↵</kbd>{t('abrir', 'open')}</span>
          </div>
          <span className="tabular">{filtered.length} {t('resultados', 'results')}</span>
        </div>
      </div>
    </div>
  );
}
