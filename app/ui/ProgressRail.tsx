'use client';

import { useEffect, useState } from 'react';

// Secções reais existentes em page.tsx
const CHAPTERS = [
  { id: 'arquivo', label: 'Posicionamento' },
  { id: 'capitulo-02', label: 'Ecossistema' },
  { id: 'estratégia', label: 'Herança' },
  { id: 'contacto', label: 'Contacto' },
];

export default function ProgressRail() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0) setProgress((window.scrollY / h) * 100);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = CHAPTERS.findIndex((c) => c.id === e.target.id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="fixed left-5 xl:left-10 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-start select-none">
      <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-slate-400 mb-4 [writing-mode:vertical-rl] rotate-180 mix-blend-difference text-white/70">
        Índice
      </span>

      <div className="relative h-64 w-[1px]">
        <div className="absolute inset-0 w-[1px] bg-slate-400/30" />
        <div
          className="absolute top-0 left-0 w-[1px] bg-gradient-to-b from-[var(--primary)] to-[var(--accent)] transition-all duration-150 ease-out"
          style={{ height: `${progress}%` }}
        />

        <div className="absolute -left-[5px] top-0 h-full flex flex-col justify-between py-1">
          {CHAPTERS.map((c, i) => {
            const isActive = i === active;
            return (
              <button
                key={c.id}
                onClick={() => goTo(c.id)}
                className="group relative flex items-center"
                aria-label={`Ir para ${c.label}`}
              >
                <span
                  className={`relative z-10 w-[11px] h-[11px] rounded-full border backdrop-blur-md transition-all duration-500 ${
                    isActive
                      ? 'bg-[var(--primary)] border-[var(--primary)] scale-110 shadow-[0_0_14px_rgba(176, 138, 69,0.7)]'
                      : 'bg-white/40 border-slate-400/50 group-hover:border-[var(--primary)]'
                  }`}
                />
                <span
                  className={`absolute left-6 flex items-center leading-none whitespace-nowrap transition-all duration-500 ${
                    isActive
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] font-bold mr-2 ${
                      isActive ? 'text-[var(--primary)]' : 'text-slate-400'
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                      isActive ? 'text-[var(--primary)]' : 'text-slate-500'
                    }`}
                  >
                    {c.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <span className="font-mono text-[9px] tracking-widest text-slate-400 mt-4 mix-blend-difference text-white/70">
        {String(Math.round(progress)).padStart(2, '0')}%
      </span>
    </div>
  );
}