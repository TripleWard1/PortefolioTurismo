'use client';

import { useEffect, useState } from 'react';
import { useLang } from './LanguageContext';
import { useScrollLock } from './hooks';

/**
 * Abertura institucional: nome, filete dourado e cortina que sobe.
 * Uma vez por sessão; quem prefere menos movimento salta-a.
 */
export default function Intro({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const [phase, setPhase] = useState<'show' | 'leave' | 'gone'>('show');
  useScrollLock(phase === 'show');

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('hb-intro') === '1';
    } catch {}
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('gone');
      onDone();
      return;
    }
    const a = setTimeout(() => {
      setPhase('leave');
      onDone();
      try {
        sessionStorage.setItem('hb-intro', '1');
      } catch {}
    }, 2100);
    const b = setTimeout(() => setPhase('gone'), 3100);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[1000] bg-navy text-white flex items-center justify-center transition-transform duration-[1000ms] ease-soft"
      style={{ transform: phase === 'leave' ? 'translateY(-100%)' : 'none' }}
    >
      <div className="text-center px-6">
        <p className="eyebrow text-gold-soft rise" style={{ ['--d' as any]: '150ms' }}>
          {t('Município de Braga', 'Municipality of Braga')}
        </p>
        <div className="overflow-hidden mt-5">
          <h1 className="font-serif font-medium text-[clamp(2.6rem,1.6rem+4vw,4.6rem)] leading-none tracking-[-0.02em] rise" style={{ ['--d' as any]: '350ms' }}>
            Hugo Barros
          </h1>
        </div>
        <span
          className="block mx-auto mt-6 h-px w-40 bg-gold origin-center"
          style={{ animation: 'draw 1.1s cubic-bezier(.22,1,.36,1) 700ms both' }}
        />
        <p className="mt-5 text-[15px] text-white/70 rise" style={{ ['--d' as any]: '900ms' }}>
          {t('Inovação e Desenvolvimento Turístico', 'Tourism Innovation & Development')}
        </p>
      </div>
    </div>
  );
}
