'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from './LanguageContext';
import { BRASS, TONE } from './viz/palette';

/* Ecrã de entrada (uma vez por sessão), sóbrio:
   o anel do monograma desenha-se, o nome aparece letra a letra, uma linha fina marca o
   progresso e, no fim, o ecrã abre-se ao meio. Esc ou "Saltar" terminam de imediato. */
const NAME = 'Hugo Barros';
const DRAW_MS = 1700; // anel e linha
const OPEN_AT = 2300; // o ecrã abre-se
const END_AT = 3300;

export default function Intro() {
  const { t } = useLang();
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<'run' | 'open'>('run');
  const [p, setP] = useState(0);
  const timers = useRef<number[]>([]);

  const finish = () => {
    timers.current.forEach(clearTimeout);
    document.documentElement.classList.remove('intro-on', 'intro-run');
    document.documentElement.style.overflow = '';
    setShow(false);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains('intro-seen') || !root.classList.contains('intro-on')) {
      setShow(false);
      return;
    }
    try {
      sessionStorage.setItem('hb-intro', '1');
    } catch {}
    root.style.overflow = 'hidden';
    root.classList.add('intro-run');

    const list = timers.current;
    list.push(
      window.setTimeout(() => {
        setPhase('open');
        root.classList.remove('intro-on'); // a abertura começa a entrar
        root.style.overflow = '';
      }, OPEN_AT),
      window.setTimeout(finish, END_AT)
    );
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && finish();
    window.addEventListener('keydown', esc);

    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / DRAW_MS);
      setP(1 - Math.pow(1 - k, 3));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      list.forEach(clearTimeout);
      window.removeEventListener('keydown', esc);
      cancelAnimationFrame(raf);
      root.style.overflow = '';
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!show) return null;
  const open = phase === 'open';
  const R = 46;
  const C = 2 * Math.PI * R;
  const half = 'absolute inset-x-0 h-1/2 bg-[#141312] overflow-hidden transition-transform duration-[1000ms] ease-[cubic-bezier(.76,0,.24,1)]';

  return (
    <div id="intro" aria-hidden className={`fixed inset-0 z-[900] text-white ${open ? 'pointer-events-none' : ''}`}>
      {/* Duas metades que se abrem */}
      <div className={`${half} top-0 ${open ? '-translate-y-full' : ''}`}>
        <div className="grain absolute inset-0" />
      </div>
      <div className={`${half} bottom-0 ${open ? 'translate-y-full' : ''}`}>
        <div className="grain absolute inset-0" />
      </div>

      {/* Conteúdo central */}
      <div className={`absolute inset-0 grid place-items-center transition-all duration-500 ${open ? 'opacity-0 scale-95' : 'opacity-100'}`}>
        <div className="flex flex-col items-center">
          <div className="relative w-28 h-28">
            <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
              <defs>
                <linearGradient id="intro-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={TONE.europeu.glow} />
                  <stop offset="35%" stopColor={TONE.internacional.glow} />
                  <stop offset="70%" stopColor={TONE.produto.glow} />
                  <stop offset="100%" stopColor={TONE.digital.glow} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <circle cx="50" cy="50" r={R} fill="none" stroke="url(#intro-ring)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p)} />
            </svg>
            <span className="absolute inset-0 grid place-items-center em text-[2.75rem] leading-none intro-fade" style={{ ['--d' as any]: '250ms' }}>
              hb
            </span>
          </div>

          <p className="mt-8 flex overflow-hidden text-[clamp(1.5rem,1rem+1.6vw,2.25rem)] font-semibold tracking-[-0.035em] leading-none pb-1">
            {NAME.split('').map((ch, i) => (
              <span key={i} className="inline-block intro-letter" style={{ ['--i' as any]: i }}>
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </p>
          <p className="mt-3 em text-[1.0625rem] intro-fade" style={{ color: BRASS, ['--d' as any]: '900ms' }}>
            {t('projetos de turismo', 'tourism projects')}
          </p>

          <div className="mt-10 w-40 h-px bg-white/10 overflow-hidden">
            <div className="h-full bg-white/70 origin-left" style={{ transform: `scaleX(${p})` }} />
          </div>
        </div>
      </div>

      <button
        onClick={finish}
        tabIndex={-1}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 t-label text-white/40 hover:text-white transition-all ${open ? 'opacity-0' : ''}`}
        aria-label={t('Saltar introdução', 'Skip intro')}
      >
        {t('Saltar', 'Skip')}
      </button>
    </div>
  );
}
