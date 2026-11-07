'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

/* Bloqueio de scroll com contador - vários modais podem pedir/libertar sem
   se pisarem (menu, palette, dossier, lightbox). */
let locks = 0;
export function lockScroll() {
  locks += 1;
  if (locks === 1) {
    const sb = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (sb > 0) document.body.style.paddingRight = `${sb}px`;
  }
}
export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockScroll();
    return unlockScroll;
  }, [active]);
}

export function usePrefersReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setR(m.matches);
    const on = () => setR(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return r;
}

/* Progresso de scroll de um elemento (0 → 1 enquanto atravessa o viewport),
   escrito diretamente numa CSS var para não re-renderizar o React. */
export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  onProgress: (p: number, el: HTMLElement) => void,
  mode: 'through' | 'pin' | 'exit' = 'through',
  scroller?: RefObject<HTMLElement>
) {
  const cb = useRef(onProgress);
  cb.current = onProgress;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = scroller?.current || window;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = scroller?.current ? scroller.current.clientHeight : window.innerHeight;
      const p =
        mode === 'pin'
          ? -r.top / Math.max(1, r.height - vh)
          : mode === 'exit'
          ? -r.top / Math.max(1, r.height)
          : (vh - r.top) / (vh + r.height);
      cb.current(Math.min(1, Math.max(0, p)), el);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    root.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      root.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, mode, scroller]);
}

/* Dispara uma vez quando o elemento entra no viewport */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) return setInView(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/* Hora local de Braga, atualizada ao minuto */
export function useBragaTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('pt-PT', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Lisbon',
    });
    const set = () => setTime(fmt.format(new Date()));
    set();
    const id = setInterval(set, 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}
