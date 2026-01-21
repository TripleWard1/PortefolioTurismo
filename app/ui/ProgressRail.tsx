'use client';
import { useEffect, useState } from 'react';

export default function ProgressRail() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 h-48 w-[1px] bg-zinc-800 z-50 hidden md:block">
      {/* Barra de progresso ativa */}
      <div
        className="w-full bg-white transition-all duration-150 ease-out"
        style={{ height: `${progress}%` }}
      />

      {/* Indicadores de Capítulos (Dots) */}
      <div className="absolute top-0 -left-[3px] flex flex-col justify-between h-full py-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-[7px] h-[7px] rounded-full border border-zinc-700 bg-[#0a0a0a]"
          />
        ))}
      </div>

      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-tighter text-zinc-500 vertical-text">
        Scroll
      </span>
    </div>
  );
}
