'use client';

import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import ChapterHead from './ChapterHead';
import { bySection, type ProjectMeta } from './projects';

function SpotCard({ p, i, onOpen }: { p: ProjectMeta; i: number; onOpen: (id: string) => void }) {
  const { t, lang } = useLang();
  const el = useRef<HTMLButtonElement>(null);

  const move = (e: React.PointerEvent) => {
    const n = el.current;
    if (!n || e.pointerType !== 'mouse') return;
    const r = n.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    n.style.setProperty('--mx', `${x * 100}%`);
    n.style.setProperty('--my', `${y * 100}%`);
    n.style.transform = `perspective(1400px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 6}deg)`;
  };
  const leave = () => {
    if (el.current) el.current.style.transform = '';
  };

  return (
    <button
      ref={el}
      data-cursor={t('Abrir', 'Open')}
      onPointerMove={move}
      onPointerLeave={leave}
      onClick={() => onOpen(p.id)}
      className={`group relative w-full text-left rounded-[28px] overflow-hidden bg-slab border border-[var(--line)] transition-transform duration-500 ease-out ${
        i === 0 ? 'aspect-[4/5] sm:aspect-[16/12] lg:aspect-auto lg:h-[680px]' : 'aspect-[4/5] lg:aspect-auto lg:h-[560px]'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <img
        src={p.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-55 transition-all duration-[1400ms] ease-out group-hover:opacity-75 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/75 to-night/35" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(520px circle at var(--mx,50%) var(--my,50%), rgba(255,90,31,0.22), transparent 60%)' }}
      />
      <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="glass rounded-full px-3.5 py-2 label-sm text-bone">{p.place[lang]}</span>
          <span className="label tabular text-[var(--fg-3)]">{p.year}</span>
        </div>
        <div>
          <span className="label text-ember">{p.status[lang]}</span>
          <h3 className="mt-4 h1 text-bone">{p.title[lang]}</h3>
          <div className="mt-6 flex items-end justify-between gap-6">
            <p className="max-w-md text-[16px] text-[var(--fg-2)] leading-relaxed text-pretty">{p.summary[lang]}</p>
            <span className="shrink-0 w-14 h-14 rounded-full bg-bone grid place-items-center transition-all duration-500 group-hover:bg-ember group-hover:scale-110">
              <ArrowUpRight className="w-5 h-5 text-night transition-transform duration-500 group-hover:rotate-45" />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Digital({ onOpen }: { onOpen: (id: string) => void }) {
  const { t } = useLang();
  const items = bySection('digital');
  return (
    <section id="digital" className="relative bg-night py-28 md:py-40 overflow-hidden">
      <div className="wrap relative">
        <ChapterHead
          n="03"
          label={t('Ecossistema digital', 'Digital ecosystem')}
          title={t('Infraestrutura', 'Infrastructure')}
          accent={t('invisível.', 'unseen.')}
        >
          {t(
            'Tecnologia e governação de conteúdos para a nova economia urbana — onde a curiosidade do visitante se converte em visita.',
            'Technology and content governance for the new urban economy — where visitor curiosity turns into a visit.'
          )}
        </ChapterHead>
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {items.map((p, i) => (
            <div key={p.id} data-reveal className={i === 0 ? 'lg:col-span-7' : 'relative lg:col-span-5 lg:mt-40'}>
              {i === 1 && (
                <div aria-hidden="true" className="hidden lg:block pointer-events-none absolute -top-36 right-0 display italic outline-text select-none">
                  digital
                </div>
              )}
              <SpotCard p={p} i={i} onOpen={onOpen} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
