'use client';

import { useCallback, useEffect, useState } from 'react';

import Preloader from './ui/Preloader';
import Navbar from './ui/Navbar';
import Hero from './ui/Hero';
import { Manifesto, Marquee, Metrics } from './ui/Manifesto';
import Positioning from './ui/Positioning';
import Missions from './ui/Missions';
import Digital from './ui/Digital';
import Heritage from './ui/Heritage';
import ProjectIndex from './ui/ProjectIndex';
import Contact from './ui/Contact';
import Dossier from './ui/Dossier';
import CommandPalette from './ui/CommandPalette';
import { getProject, neighbours } from './ui/projects';
import { goTo } from './ui/sections';

const HASH = '#projeto/';

export default function Page() {
  const [ready, setReady] = useState(false);
  const [dossier, setDossier] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Dossier com deep-link partilhável (#projeto/<id>)
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

  // Imagens externas que falhem desaparecem em vez de mostrar o ícone partido
  useEffect(() => {
    const onErr = (e: Event) => {
      const el = e.target as HTMLElement;
      if (el instanceof HTMLImageElement) el.style.visibility = 'hidden';
    };
    window.addEventListener('error', onErr, true);
    return () => window.removeEventListener('error', onErr, true);
  }, []);

  // Estado <-> URL (links partilhados + botão voltar)
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

  // Atalhos: ⌘K / Ctrl+K · ‹ › entre dossiers · Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if (paletteOpen || !dossier) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') nav(neighbours(dossier).next.id);
      else if (e.key === 'ArrowLeft') nav(neighbours(dossier).prev.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dossier, paletteOpen, close, nav]);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />

      <main>
        <Hero ready={ready} />
        <Marquee />
        <Manifesto />
        <Metrics />
        <Positioning onOpen={open} />
        <Missions onOpen={open} />
        <Digital onOpen={open} />
        <Heritage onOpen={open} />
        <ProjectIndex onOpenProject={open} />
      </main>
      <Contact />

      {dossier && (
        <Dossier
          isOpen
          projectType={dossier}
          onClose={close}
          onPrev={() => nav(neighbours(dossier).prev.id)}
          onNext={() => nav(neighbours(dossier).next.id)}
        />
      )}

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenProject={open}
        onGoSection={(id) => {
          if (dossier) close();
          setTimeout(() => goTo(id), dossier ? 80 : 0);
        }}
      />
    </>
  );
}
