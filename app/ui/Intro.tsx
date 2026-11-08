'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from './LanguageContext';

/* Ecrã de entrada (uma vez por sessão).
   Fotografias de terreno reveladas em sequência, contador e nome; a última fotografia
   abre até ocupar o ecrã e coincide com a primeira imagem da abertura. */
const PHOTOS = [
  { src: 'https://i.imgur.com/ZCSF2lK.jpeg', city: 'Braga' },
  { src: 'https://i.imgur.com/eiRaC5f.png', city: 'Gante' },
  { src: 'https://i.imgur.com/C4uKurT.png', city: 'Bilbao' },
  { src: 'https://i.imgur.com/dYaYXb9.png', city: 'Barcelona' },
  { src: 'https://i.imgur.com/SvJ4bdR.jpeg', city: 'Bruxelas' },
];
const STEP = 420; // intervalo entre fotografias
const COUNT_MS = 2500; // duração do contador
const EXPAND_AT = 2650; // a última fotografia abre
const FADE_AT = 3450; // o ecrã de entrada desaparece
const END_AT = 4150;
const ROT = [-5, 4, -3, 5, 0];
const NAME = 'Hugo Barros';

export default function Intro() {
  const { t } = useLang();
  const [show, setShow] = useState(true);
  const [shown, setShown] = useState(0); // fotografias visíveis
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'run' | 'expand' | 'fade'>('run');
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

    const T = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
    PHOTOS.forEach((_, i) => T(() => setShown(i + 1), 250 + i * STEP));
    T(() => setPhase('expand'), EXPAND_AT);
    T(() => {
      setPhase('fade');
      root.classList.remove('intro-on'); // a abertura começa a entrar por baixo
      root.style.overflow = '';
    }, FADE_AT);
    T(finish, END_AT);

    // Contador com abrandamento no fim
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / COUNT_MS);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      timers.current.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      root.style.overflow = '';
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!show) return null;
  const city = PHOTOS[Math.max(0, shown - 1)].city;
  const expand = phase !== 'run';

  return (
    <div
      id="intro"
      aria-hidden
      className={`fixed inset-0 z-[900] bg-[#141312] text-white overflow-hidden transition-opacity duration-700 ease-out ${phase === 'fade' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="grain absolute inset-0" />

      {/* Fotografias */}
      <div className="absolute inset-0 grid place-items-center">
        {PHOTOS.map((p, i) => {
          const last = i === PHOTOS.length - 1;
          const on = i < shown;
          const big = last && expand;
          return (
            <div
              key={p.src}
              className="absolute overflow-hidden"
              style={{
                width: big ? '100vw' : 'min(60vw, 340px)',
                height: big ? '100vh' : 'min(78vw, 440px)',
                borderRadius: big ? 0 : 18,
                transform: `rotate(${big ? 0 : ROT[i]}deg) translateY(${on ? 0 : 24}px)`,
                clipPath: on ? 'inset(0% 0% 0% 0% round 18px)' : 'inset(50% 50% 50% 50% round 18px)',
                opacity: on ? (expand && !last ? 0 : 1) : 0,
                transition:
                  'clip-path 900ms cubic-bezier(.22,1,.36,1), transform 900ms cubic-bezier(.22,1,.36,1), opacity 600ms ease, width 900ms cubic-bezier(.76,0,.24,1), height 900ms cubic-bezier(.76,0,.24,1), border-radius 900ms cubic-bezier(.76,0,.24,1)',
                boxShadow: big ? 'none' : '0 30px 60px -20px rgba(0,0,0,0.6)',
                zIndex: i,
              }}
            >
              <img src={p.src} alt="" className="w-full h-full object-cover" style={{ transform: `scale(${on ? 1 : 1.25})`, transition: 'transform 1400ms cubic-bezier(.22,1,.36,1)' }} />
              {big && <div className="absolute inset-0 bg-[rgba(20,19,18,0.35)] transition-opacity duration-700" />}
            </div>
          );
        })}
      </div>

      {/* Moldura de texto */}
      <div className={`absolute inset-0 flex flex-col justify-between p-6 md:p-10 transition-opacity duration-500 ${expand ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-start justify-between t-label">
          <span className="inline-flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-white text-ink grid place-items-center text-[12px] font-semibold">HB</span>
            <span className="text-white/70">{t('Portefólio profissional', 'Professional portfolio')}</span>
          </span>
          <span className="text-white/70 text-right">
            <span key={city} className="inline-block em text-[1.25rem] text-[#E9DCC4] animate-[fadeUp_.5s_cubic-bezier(.22,1,.36,1)]">
              {city}
            </span>
          </span>
        </div>

        <div className="flex items-end justify-between gap-6">
          <span className="em text-[clamp(4rem,2rem+8vw,9rem)] leading-[0.8] tabular-nums text-white">{String(count).padStart(3, '0')}</span>
          <span className="hidden sm:flex overflow-hidden text-[clamp(1.75rem,1rem+2.4vw,3.25rem)] font-semibold tracking-[-0.04em] leading-none pb-1" aria-label={NAME}>
            {NAME.split('').map((ch, i) => (
              <span key={i} className="inline-block intro-letter" style={{ ['--i' as any]: i }}>
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </span>
        </div>
      </div>

      <button
        onClick={finish}
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-10 t-label text-white/50 hover:text-white transition-colors ${expand ? 'opacity-0' : ''}`}
        aria-label={t('Saltar introdução', 'Skip intro')}
        tabIndex={-1}
      >
        {t('Saltar', 'Skip')}
      </button>
    </div>
  );
}
