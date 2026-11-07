'use client';

import { useCallback, useEffect, useState } from 'react';
import Deck from './ui/Deck';
import Dossier from './ui/Dossier';
import { getProject, neighbours } from './ui/projects';

const HASH = '#projeto/';

export default function Page() {
  const [dossier, setDossier] = useState<string | null>(null);

  // Dossier com link partilhável (#projeto/<id>)
  const openProject = useCallback((id: string, push = true) => {
    setDossier(id);
    const h = HASH + id;
    if (push) window.history.pushState({ id }, '', h);
    else window.history.replaceState({ id }, '', h);
  }, []);
  const open = useCallback((id: string) => openProject(id, true), [openProject]);
  const nav = useCallback((id: string) => openProject(id, false), [openProject]);
  const close = useCallback(() => {
    setDossier(null);
    if (window.location.hash.startsWith(HASH)) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // Estado <-> URL (links partilhados + botão voltar do browser)
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash;
      const id = h.startsWith(HASH) ? decodeURIComponent(h.slice(HASH.length)) : '';
      setDossier(id && getProject(id) ? id : null);
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  // Teclado no dossier: Esc fecha, ← → navegam
  useEffect(() => {
    if (!dossier) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') nav(neighbours(dossier).next.id);
      else if (e.key === 'ArrowLeft') nav(neighbours(dossier).prev.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dossier, close, nav]);

  // Imagens externas indisponíveis ficam com o fundo neutro do cartão
  useEffect(() => {
    const onErr = (e: Event) => {
      if (e.target instanceof HTMLImageElement) e.target.style.visibility = 'hidden';
    };
    window.addEventListener('error', onErr, true);
    return () => window.removeEventListener('error', onErr, true);
  }, []);

  return (
    <>
      <main>
        <Deck onOpen={open} paused={!!dossier} />
      </main>
      {dossier && (
        <Dossier
          projectType={dossier}
          onClose={close}
          onPrev={() => nav(neighbours(dossier).prev.id)}
          onNext={() => nav(neighbours(dossier).next.id)}
        />
      )}
    </>
  );
}
