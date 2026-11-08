'use client';

import { useEffect, useState } from 'react';
import { useLang } from './LanguageContext';

/* Abertura curta (~1 s), uma vez por visita. */
export default function Opening() {
  const { t } = useLang();
  const [state, setState] = useState<'show' | 'hide' | 'done'>('show');

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('hb-open') === '1';
    } catch {}
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setState('done');
    try {
      sessionStorage.setItem('hb-open', '1');
    } catch {}
    const a = setTimeout(() => setState('hide'), 1050);
    const b = setTimeout(() => setState('done'), 1600);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  if (state === 'done') return null;
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[1000] bg-cream grid place-items-center transition-opacity duration-500"
      style={{ opacity: state === 'hide' ? 0 : 1 }}
    >
      <div className="text-center">
        <p className="font-serif text-[clamp(2rem,1.4rem+2.4vw,3.2rem)] text-ink" style={{ animation: 'ab-texto .6s cubic-bezier(.22,1,.36,1) both' }}>
          Hugo Barros
        </p>
        <span className="block mx-auto mt-4 h-px w-28 bg-petrol origin-left" style={{ animation: 'ab-linha .8s cubic-bezier(.22,1,.36,1) .15s both' }} />
        <p className="mt-4 text-[13px] tracking-[0.12em] uppercase text-muted-foreground" style={{ animation: 'ab-texto .6s cubic-bezier(.22,1,.36,1) .25s both' }}>
          {t('Município de Braga · Turismo', 'Municipality of Braga · Tourism')}
        </p>
      </div>
    </div>
  );
}
