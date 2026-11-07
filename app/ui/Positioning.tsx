'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { bySection } from './projects';

/**
 * Capítulo 01 - galeria horizontal fixada (desktop) / carrossel com snap (mobile).
 * A altura da secção é calculada a partir da largura da pista para que o
 * scroll vertical se traduza 1:1 em deslocamento horizontal.
 */
export default function Positioning({ onOpen }: { onOpen: (id: string) => void }) {
  const { t, lang } = useLang();
  const items = bySection('posicionamento');
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    const sec = section.current!;
    const tr = track.current!;
    let dist = 0;
    let raf = 0;

    const measure = () => {
      const on = mq.matches;
      setPinned(on);
      if (!on) {
        sec.style.height = '';
        tr.style.transform = '';
        return;
      }
      dist = Math.max(0, tr.scrollWidth - window.innerWidth);
      sec.style.height = `${dist + window.innerHeight}px`;
      tick();
    };
    const tick = () => {
      raf = 0;
      if (!mq.matches) return;
      const top = sec.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, -top / Math.max(1, dist)));
      tr.style.transform = `translate3d(${-p * dist}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      // paralaxe interna de cada imagem
      tr.querySelectorAll<HTMLElement>('[data-par]').forEach((el) => {
        const r = el.parentElement!.getBoundingClientRect();
        const c = (r.left + r.width / 2 - window.innerWidth / 2) / window.innerWidth;
        el.style.transform = `translate3d(${c * -12}%,0,0) scale(1.25)`;
      });
      setIdx(Math.min(items.length - 1, Math.round(p * (items.length - 1))));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(tr);
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', measure);
    mq.addEventListener('change', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', measure);
      mq.removeEventListener('change', measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items.length]);

  return (
    <section id="posicionamento" ref={section} className="relative bg-night">
      <div className={pinned ? 'sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center' : 'py-24'}>
        <div
          ref={track}
          className={`flex items-stretch gap-5 md:gap-8 will-change-transform ${
            pinned ? 'pl-[var(--gutter)] pr-[12vw]' : 'overflow-x-auto snap-x snap-mandatory no-scrollbar px-[var(--gutter)] scroll-px-[var(--gutter)] pb-4'
          }`}
        >
          {/* Painel de abertura */}
          <div className="shrink-0 w-[86vw] sm:w-[60vw] lg:w-[34vw] flex flex-col justify-between snap-start py-2 pr-4">
            <div>
              <div className="flex items-center gap-3 label text-[var(--fg-3)] mb-7">
                <span className="text-ember tabular">01</span>
                <span className="w-6 h-px bg-[var(--line-2)]" />
                {t('Posicionamento', 'Positioning')}
              </div>
              <h2 className="display text-bone">
                {t('Braga no', 'Braga on the')}
                <br />
                <em className="text-ember">{t('mapa europeu.', 'European map.')}</em>
              </h2>
              <p className="mt-8 text-[17px] text-[var(--fg-2)] leading-relaxed max-w-sm text-pretty">
                {t(
                  'Reforçar a presença de Braga no mapa das decisões europeias — transformando potencial em influência direta.',
                  'Strengthening Braga’s presence on the map of European decisions — turning potential into direct influence.'
                )}
              </p>
            </div>
            <div className="lg:hidden flex items-center gap-3 label text-[var(--fg-3)] mt-8">
              <span className="w-8 h-px bg-ember" />
              {t('Deslize para o lado', 'Swipe sideways')} →
            </div>
            <div className="hidden lg:flex items-center gap-4 label text-[var(--fg-3)] mt-10">
              <span className="tabular text-bone">
                {String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <span className="relative w-32 h-px bg-[var(--line-2)] overflow-hidden">
                <span ref={bar} className="absolute inset-0 bg-ember origin-left" style={{ transform: 'scaleX(0)' }} />
              </span>
              {t('Deslize', 'Scroll')} →
            </div>
          </div>

          {items.map((p, i) => (
            <article
              key={p.id}
              data-cursor={t('Abrir', 'Open')}
              onClick={() => onOpen(p.id)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen(p.id))}
              role="button"
              tabIndex={0}
              aria-label={`${p.title[lang]} — ${t('abrir dossier', 'open dossier')}`}
              className="group relative shrink-0 snap-center w-[86vw] sm:w-[70vw] lg:w-[56vw] h-[70svh] lg:h-[74svh] min-h-[460px] rounded-[28px] overflow-hidden bg-slab cursor-pointer"
            >
              <img
                data-par
                src={p.image}
                alt=""
                loading={i < 2 ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover opacity-70 transition-[opacity,filter] duration-700 group-hover:opacity-90 grayscale-[30%] group-hover:grayscale-0"
                style={{ transform: 'scale(1.25)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-night/10" />

              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-[clamp(5rem,3rem+6vw,10rem)] leading-[0.75] outline-text group-hover:[-webkit-text-stroke-color:var(--ember)] transition-all duration-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="glass rounded-full px-3.5 py-2 label-sm text-bone flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember" />
                    {p.status[lang]}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
                  <div className="md:col-span-8">
                    <div className="label text-[var(--fg-2)] mb-4 flex items-center gap-3">
                      <span>{p.place[lang]}</span>
                      <span className="w-1 h-1 rounded-full bg-[var(--fg-3)]" />
                      <span className="tabular">{p.year}</span>
                    </div>
                    <h3 className="h1 text-bone transition-transform duration-700 ease-out group-hover:translate-x-2">
                      {p.title[lang]}
                      <em className="text-ember">.</em>
                    </h3>
                  </div>
                  <div className="md:col-span-4 flex md:flex-col items-end md:items-end justify-between gap-5">
                    <p className="text-[15px] text-[var(--fg-2)] leading-relaxed md:text-right text-pretty line-clamp-3">
                      {p.summary[lang]}
                    </p>
                    <span className="shrink-0 w-14 h-14 rounded-full border border-[var(--line-2)] grid place-items-center transition-all duration-500 group-hover:bg-ember group-hover:border-ember">
                      <ArrowUpRight className="w-5 h-5 text-bone transition-transform duration-500 group-hover:rotate-45 group-hover:text-night" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
