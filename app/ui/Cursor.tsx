'use client';

import { useEffect, useRef } from 'react';

/**
 * Cursor de duas camadas (só em ponteiros finos).
 *  - [data-cursor="Texto"] → círculo cheio em brasa com a etiqueta
 *  - a, button, [data-cursor-link] → anel ampliado
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    document.documentElement.classList.add('has-cursor');

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y, raf = 0, shown = false;

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!shown) {
        shown = true;
        rx = x; ry = y;
        ring.current?.classList.remove('is-hidden');
        dot.current?.classList.remove('is-hidden');
      }
    };

    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>('[data-cursor]');
      const link = t.closest('a, button, [role="button"], input, [data-cursor-link]');
      const r = ring.current;
      if (!r) return;
      if (labelled) {
        r.classList.add('is-label');
        r.classList.remove('is-link');
        if (label.current) label.current.textContent = labelled.dataset.cursor || '';
      } else if (link) {
        r.classList.add('is-link');
        r.classList.remove('is-label');
      } else {
        r.classList.remove('is-link', 'is-label');
      }
    };
    const leave = () => {
      shown = false;
      ring.current?.classList.add('is-hidden');
      dot.current?.classList.add('is-hidden');
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring is-hidden hidden [@media(pointer:fine)]:grid" aria-hidden="true">
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot is-hidden hidden [@media(pointer:fine)]:block" aria-hidden="true" />
    </>
  );
}
