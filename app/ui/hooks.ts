'use client';

import { useEffect, useRef, useState } from 'react';

/* Bloqueio de scroll com contador (intro, menu móvel, dossier, galeria) */
let locks = 0;
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    locks += 1;
    if (locks === 1) {
      const sb = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (sb > 0) document.body.style.paddingRight = `${sb}px`;
    }
    return () => {
      locks = Math.max(0, locks - 1);
      if (locks === 0) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, [active]);
}

export const goTo = (id: string) => {
  if (id === 'top') return window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

/* Dispara uma vez quando o elemento entra no viewport */
export function useInView<T extends HTMLElement>(threshold = 0.3) {
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

/* Contagem progressiva para os indicadores */
export function useCountUp(to: number, run: boolean, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setV(to);
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to, ms]);
  return v;
}
