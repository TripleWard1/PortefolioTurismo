'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { Split } from './parts';
import { THEME_LABEL, byId } from './projects';
import { TONE } from './viz/palette';

/* Projetos em destaque numa calha com profundidade (adaptado de Focus Rail).
   Navegação por setas, teclado, toque ou arrasto. A roda do rato continua a fazer scroll. */
const IDS = ['smart-tourism', 'braga-after-dark', 'music-cities-awards', 'visit-braga', 'fiets-wandelbeurs-gante', 'cidade-bracvs', 'b-travel-barcelona', 'roteiro-3-dias'];
const SPRING = { type: 'spring', stiffness: 260, damping: 32, mass: 1 } as const;
const wrap = (n: number, len: number) => ((n % len) + len) % len;

export default function ProjectRail() {
  const { t, lang } = useLang();
  const items = IDS.map((id) => byId(id)!);
  const [active, setActive] = useState(0);
  const [gap, setGap] = useState(340);
  const idx = wrap(active, items.length);
  const p = items[idx];
  const tone = TONE[p.theme];

  useEffect(() => {
    const on = () => setGap(window.innerWidth < 640 ? 200 : window.innerWidth < 1024 ? 280 : 340);
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);

  const prev = useCallback(() => setActive((a) => a - 1), []);
  const next = useCallback(() => setActive((a) => a + 1), []);
  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    const power = Math.abs(offset.x) * velocity.x;
    if (power < -8000 || offset.x < -80) next();
    else if (power > 8000 || offset.x > 80) prev();
  };

  return (
    <section
      className="tone-shift relative overflow-hidden text-white py-24 md:py-32 outline-none"
      style={{ background: tone.dark }}
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      }}
      aria-roledescription="carousel"
      aria-label={t('Projetos em destaque', 'Selected work')}
    >
      {/* Ambiente: a fotografia ativa, desfocada */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <AnimatePresence>
          <motion.img
            key={p.id}
            src={p.image}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: p.logo ? 0 : 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-cover blur-3xl scale-125 saturate-[0.8]"
          />
        </AnimatePresence>
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${tone.dark}00 0%, ${tone.dark}cc 70%, ${tone.dark} 100%)` }} />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative wrap">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6" data-reveal>
          <div>
            <p className="t-label inline-flex items-center gap-2 tone-shift" style={{ color: tone.glow }}>
              <span className="w-1.5 h-1.5 rounded-full tone-shift" style={{ background: tone.glow }} />
              {t('Projetos em destaque', 'Selected work')}
            </p>
            <h2 className="mt-4 t-h2 text-white">
              <Split parts={[t('Do dossiê europeu', 'From the European dossier'), { em: t('ao produto local', 'to the local product'), color: tone.glow }, '.']} />
            </h2>
          </div>
          <Link href="/projetos" className="group t-label text-white inline-flex items-center gap-1">
            <span className="underline decoration-1 underline-offset-4 decoration-white/30 group-hover:decoration-white">{t('Consultar os 13 projetos', 'Browse all 13 projects')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </header>
      </div>

      {/* Calha */}
      <motion.div
        className="relative mt-14 h-[340px] sm:h-[400px] lg:h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ perspective: 1400 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={onDragEnd}
      >
        {[-3, -2, -1, 0, 1, 2, 3].map((off) => {
          const abs = active + off;
          const it = items[wrap(abs, items.length)];
          const d = Math.abs(off);
          const center = off === 0;
          return (
            <motion.button
              key={abs}
              type="button"
              tabIndex={center ? -1 : 0}
              aria-label={it.title[lang]}
              onClick={() => off !== 0 && setActive(abs)}
              className={`absolute aspect-[3/4] w-[220px] sm:w-[270px] lg:w-[310px] rounded-3xl overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ${center ? 'z-20' : 'z-10'} ${it.logo ? 'bg-white' : 'bg-black/30'}`}
              initial={false}
              animate={{
                x: off * gap,
                z: -d * 160,
                rotateY: off * -18,
                scale: center ? 1 : 0.86,
                opacity: d > 2 ? 0 : center ? 1 : 1 - d * 0.32,
                filter: `brightness(${center ? 1 : 0.55})`,
              }}
              transition={SPRING}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src={it.image} alt="" draggable={false} className={`w-full h-full pointer-events-none ${it.logo ? 'object-contain p-[14%]' : 'object-cover'}`} />
              <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            </motion.button>
          );
        })}
      </motion.div>

      {/* Informação e controlos */}
      <div className="relative wrap mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8 min-h-[150px]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
              transition={{ duration: 0.35 }}
            >
              <p className="t-label" style={{ color: tone.glow }}>
                {THEME_LABEL[p.theme][lang]} · {p.year}
              </p>
              <h3 className="mt-2 text-[clamp(2rem,1.4rem+2vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.04em]">{p.title[lang]}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="t-label rounded-full px-3.5 py-1.5 bg-white/10 ring-1 ring-inset ring-white/15">{p.role[lang]}</span>
                <span className="t-label rounded-full px-3.5 py-1.5 text-ink" style={{ background: tone.glow }}>
                  {p.outcome[lang]}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="lg:col-span-4 flex items-center lg:justify-end gap-3">
          <div className="flex items-center gap-1 rounded-full bg-white/10 p-1 ring-1 ring-inset ring-white/15 backdrop-blur-md">
            <button onClick={prev} aria-label={t('Anterior', 'Previous')} className="w-11 h-11 rounded-full grid place-items-center text-white/70 hover:bg-white/10 hover:text-white transition">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="min-w-[56px] text-center t-label tabular-nums text-white/60">
              {String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button onClick={next} aria-label={t('Seguinte', 'Next')} className="w-11 h-11 rounded-full grid place-items-center text-white/70 hover:bg-white/10 hover:text-white transition">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <Link href={`/projetos/${p.id}`} className="group h-[52px] px-6 rounded-full bg-white text-ink text-[15px] font-medium inline-flex items-center gap-2 hover:bg-[#F1EBE0] transition-colors">
            {t('Consultar', 'View')}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
