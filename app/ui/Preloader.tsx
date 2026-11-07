'use client';

import { useEffect, useState } from 'react';
import { lockScroll, unlockScroll } from './hooks';

/**
 * Abertura de cortina: contador 000 → 100 e o nome a subir.
 * Corre uma vez por sessão; quem pede menos movimento salta-a.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [phase, setPhase] = useState<'count' | 'lift' | 'gone'>('count');

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('hb-intro') === '1';
    } catch {}
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reduced) {
      setPhase('gone');
      onDone();
      return;
    }

    lockScroll();
    let locked = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const release = () => {
      if (locked) unlockScroll();
      locked = false;
    };
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      // easeOutQuart
      setN(Math.round((1 - Math.pow(1 - p, 4)) * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        setPhase('lift');
        try {
          sessionStorage.setItem('hb-intro', '1');
        } catch {}
        timers.push(
          setTimeout(() => {
            release();
            onDone();
          }, 350),
          setTimeout(() => setPhase('gone'), 1300)
        );
      }
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      release();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[3000] bg-night flex flex-col justify-between p-[var(--gutter)] transition-transform duration-[1100ms] ease-io"
      style={{ transform: phase === 'lift' ? 'translateY(-100%)' : 'none' }}
    >
      <div className="flex justify-between label text-[var(--fg-3)]">
        <span>Braga · 41.5454° N</span>
        <span>8.4265° W</span>
      </div>

      <div className="overflow-hidden">
        <div
          className="display text-bone transition-transform duration-[900ms] ease-out"
          style={{ transform: n > 8 ? 'none' : 'translateY(100%)' }}
        >
          Hugo <em className="text-ember">Barros</em>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <span className="label text-[var(--fg-3)] max-w-[16rem] leading-relaxed">
          Estratégia de destino
          <br />& inovação turística
        </span>
        <span className="font-display text-[clamp(4rem,12vw,10rem)] leading-none tabular text-bone">
          {String(n).padStart(3, '0')}
        </span>
      </div>
      <div className="absolute left-0 bottom-0 h-[2px] bg-ember" style={{ width: `${n}%` }} />
    </div>
  );
}
