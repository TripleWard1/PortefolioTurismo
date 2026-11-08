'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownLeft, FileText, Search } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useScrollLock } from './hooks';
import { PROJECTS, THEME_LABEL } from './projects';
import { NAV } from './Header';

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

type Item = { href: string; label: string; sub: string; image?: string; extra?: string };

/* Pesquisa rápida: ⌘K / Ctrl+K ou o botão no cabeçalho (evento "open-search") */
export default function CommandK() {
  const { t, lang } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  useScrollLock(open);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const o = () => setOpen(true);
    window.addEventListener('keydown', k);
    window.addEventListener('open-search', o);
    return () => {
      window.removeEventListener('keydown', k);
      window.removeEventListener('open-search', o);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setQ('');
    setI(0);
    const id = setTimeout(() => input.current?.focus(), 30);
    return () => clearTimeout(id);
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const all: Item[] = [
      ...PROJECTS.map((p) => ({ href: `/projetos/${p.id}`, label: p.title[lang], sub: `${THEME_LABEL[p.theme][lang]} · ${p.place[lang]} · ${p.year}`, image: p.image, extra: `${p.summary.pt} ${p.summary.en} ${p.status.pt}` })),
      ...NAV.map((n) => ({ href: n.href, label: n[lang], sub: t('Página', 'Page') })),
    ];
    const nq = norm(q.trim());
    return nq ? all.filter((x) => norm(`${x.label} ${x.sub} ${x.extra || ''}`).includes(nq)) : all;
  }, [q, lang, t]);

  useEffect(() => setI(0), [q]);

  const go = (it: Item) => {
    setOpen(false);
    router.push(it.href);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[800] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('Pesquisa', 'Search')}
            className="relative w-full max-w-xl rounded-2xl bg-white border border-line shadow-[0_40px_100px_-30px_rgba(26,29,33,0.55)] overflow-hidden"
            initial={{ y: -12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 border-b border-line">
              <Search className="w-5 h-5 text-ink" />
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setI((v) => Math.min(items.length - 1, v + 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setI((v) => Math.max(0, v - 1));
                  } else if (e.key === 'Enter' && items[i]) go(items[i]);
                  else if (e.key === 'Escape') setOpen(false);
                }}
                placeholder={t('Procurar projetos e páginas…', 'Search projects and pages…')}
                aria-label={t('Procurar', 'Search')}
                className="flex-1 h-16 bg-transparent outline-none text-[1.35rem] placeholder:text-mute"
              />
              <kbd className="text-[11px] text-mute border border-line rounded px-1.5 py-0.5">esc</kbd>
            </div>
            <ul className="max-h-[52vh] overflow-y-auto p-2">
              {items.length === 0 && <li className="px-4 py-10 text-center text-mute">{t('Sem resultados.', 'No results.')}</li>}
              {items.map((it, k) => (
                <li key={it.href}>
                  <button
                    onMouseMove={() => k !== i && setI(k)}
                    onClick={() => go(it)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left ${k === i ? 'bg-ink text-white' : 'text-ink'}`}
                  >
                    <span className="w-12 h-9 rounded-md overflow-hidden shrink-0 bg-soft grid place-items-center">
                      {it.image ? <img src={it.image} alt="" className="w-full h-full object-cover" /> : <FileText className="w-4 h-4 text-ink" />}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block truncate font-medium text-[15px]">{it.label}</span>
                      <span className={`block truncate text-[12px] ${k === i ? 'text-white/70' : 'text-mute'}`}>{it.sub}</span>
                    </span>
                    {k === i && <CornerDownLeft className="w-4 h-4 shrink-0" />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
