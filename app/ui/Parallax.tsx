'use client';

import { useEffect } from 'react';

/* Parallax discreto: elementos com [data-parallax="0.1"] deslocam-se ligeiramente
   em relação ao scroll normal da página. Não altera a velocidade do scroll. */
export default function Parallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const f = Number(el.dataset.parallax) || 0.08;
        const scale = Number(getComputedStyle(el).getPropertyValue('--px-scale')) || 1.12;
        // Nunca desloca mais do que a margem criada pela escala, para não mostrar as bordas
        const max = ((scale - 1) / 2) * r.height - 1;
        const y = Math.max(-max, Math.min(max, (r.top + r.height / 2 - vh / 2) * -f));
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale})`;
      });
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    const mo = new MutationObserver(on);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
