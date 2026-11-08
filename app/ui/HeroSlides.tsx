'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { Split } from './parts';
import { THEME_LABEL, byId, type L } from './projects';
import { BRASS, NIGHT, TONE } from './viz/palette';

/* Abertura: mensagem e provas à esquerda; à direita um baralho de fotografias nítidas
   (mostradas perto do tamanho real, sem ampliação) que avança em profundidade. */
const SLIDES: { img: string; city: L; id: string; pos?: string }[] = [
  { img: 'https://i.imgur.com/GBs8DY7.jpeg', city: { pt: 'Bruxelas', en: 'Brussels' }, id: 'smart-tourism', pos: '55% 50%' },
  { img: 'https://i.imgur.com/u8hgUWi.png', city: { pt: 'Barcelona', en: 'Barcelona' }, id: 'b-travel-barcelona', pos: '40% 40%' },
  { img: 'https://i.imgur.com/ZCSF2lK.jpeg', city: { pt: 'Braga', en: 'Braga' }, id: 'braga-after-dark', pos: '50% 50%' },
  { img: 'https://i.imgur.com/eiRaC5f.png', city: { pt: 'Gante', en: 'Ghent' }, id: 'fiets-wandelbeurs-gante', pos: '45% 40%' },
  { img: 'https://i.imgur.com/EgopK0E.png', city: { pt: 'Salamanca', en: 'Salamanca' }, id: 'systemeu-salamanca', pos: '50% 45%' },
  { img: 'https://i.imgur.com/to9jbOB.jpeg', city: { pt: 'Braga', en: 'Braga' }, id: 'braga-after-dark', pos: '50% 50%' },
];
const DURATION = 5200;

export default function HeroSlides() {
  const { t, lang } = useLang();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = SLIDES.length;

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setI((v) => (v + 1) % n), DURATION);
    return () => clearTimeout(id);
  }, [i, paused, n]);

  useEffect(() => {
    SLIDES.forEach((s) => {
      const im = new Image();
      im.src = s.img;
    });
  }, []);

  const s = SLIDES[i];
  const p = byId(s.id)!;
  const tone = TONE[p.theme];

  const proofs = [
    { k: t('Finalista europeu', 'European finalist'), v: 'European Capital of Smart Tourism', id: 'smart-tourism' },
    { k: t('Top 3 mundial', 'Global top 3'), v: 'Music Cities Awards', id: 'music-cities-awards' },
    { k: t('Finalista 2026', '2026 finalist'), v: 'European Capital of Small Retail', id: 'small-retail-braga' },
  ];

  return (
    <section data-hero className="relative -mt-20 overflow-hidden text-white" style={{ background: NIGHT }}>
      {/* Luz ambiente no tom do projeto da fotografia */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -right-[10%] top-[-20%] w-[70vw] h-[70vw] max-w-[1100px] max-h-[1100px] rounded-full blur-3xl opacity-60 tone-shift" style={{ background: `radial-gradient(circle, ${tone.deep}, transparent 62%)` }} />
        <div className="absolute -left-[15%] bottom-[-30%] w-[50vw] h-[50vw] rounded-full blur-3xl opacity-30" style={{ background: `radial-gradient(circle, ${BRASS}, transparent 65%)` }} />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative wrap pt-32 md:pt-36 pb-14 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center min-h-[100svh] md:min-h-[760px] lg:max-h-[1000px]">
        {/* Mensagem */}
        <div className="lg:col-span-7">
          <p className="hero-in t-label inline-flex items-center gap-2.5 rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/10 pl-2 pr-3.5 py-1.5" style={{ ['--d' as any]: '100ms' }}>
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[#9FD1A9] animate-ping opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-[#9FD1A9]" />
            </span>
            <span className="text-white/80">{t('Portefólio 2024-2026 · Disponível para cooperação', 'Portfolio 2024-2026 · Open to partnerships')}</span>
          </p>

          <h1 className="mt-7 t-hero !text-[clamp(2.75rem,1.1rem+5.2vw,6rem)] !leading-[0.98] text-white">
            <Split auto delay={200} parts={[t('Projetos que levam destinos', 'Projects that take destinations'), { em: t('mais longe', 'further'), color: '#E9DCC4' }, '.']} />
          </h1>

          <p className="hero-in mt-8 t-lead text-white/70 max-w-xl text-pretty" style={{ ['--d' as any]: '650ms' }}>
            {t(
              'Sou Hugo Barros e trabalho onde a estratégia encontra o terreno: candidaturas europeias, promoção internacional e produto turístico. Aqui estão treze projetos, de Bruxelas ao Arkansas.',
              'I’m Hugo Barros and I work where strategy meets the ground: European bids, international promotion and tourism product. Here are thirteen projects, from Brussels to Arkansas.'
            )}
          </p>

          <div className="hero-in mt-10 flex flex-wrap gap-3" style={{ ['--d' as any]: '780ms' }}>
            <Link href="/projetos" className="group h-[52px] pl-6 pr-2 rounded-full bg-white text-ink text-[15px] font-medium inline-flex items-center gap-3 hover:bg-[#F1EBE0] transition-colors">
              {t('Explorar os projetos', 'Explore the projects')}
              <span className="w-9 h-9 rounded-full bg-ink text-white grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/percurso" className="h-[52px] px-6 rounded-full ring-1 ring-inset ring-white/25 text-white text-[15px] font-medium inline-flex items-center hover:bg-white/10 transition-colors">
              {t('Ver o percurso', 'See the track record')}
            </Link>
          </div>

          {/* Provas */}
          <ul className="hero-in mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px rounded-3xl overflow-hidden bg-white/10 ring-1 ring-inset ring-white/10" style={{ ['--d' as any]: '900ms' }}>
            {proofs.map((pr) => (
              <li key={pr.id} style={{ background: 'rgba(20,19,18,0.6)' }}>
                <Link href={`/projetos/${pr.id}`} className="group block px-5 py-4 h-full hover:bg-white/[0.04] transition-colors">
                  <span className="block em text-[1.375rem] leading-tight" style={{ color: BRASS }}>
                    {pr.k}
                  </span>
                  <span className="mt-1 block t-label text-white/60 group-hover:text-white/85 transition-colors">{pr.v}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Baralho de fotografias */}
        <div className="lg:col-span-5 hero-in" style={{ ['--d' as any]: '400ms' }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="relative mx-auto w-full max-w-[460px] aspect-[4/5]" style={{ perspective: 1600 }}>
            {SLIDES.map((sl, k) => {
              const d = (k - i + n) % n; // 0 = à frente
              const leaving = d === n - 1;
              const visible = d < 3 || leaving;
              return (
                <Link
                  key={sl.img}
                  href={`/projetos/${sl.id}`}
                  tabIndex={d === 0 ? 0 : -1}
                  aria-hidden={d !== 0}
                  className="absolute inset-0 rounded-[28px] overflow-hidden bg-black/40 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
                  style={{
                    zIndex: leaving ? 5 : 4 - d,
                    transform: leaving
                      ? 'translate3d(-55%, 6%, 0) rotate(-12deg) scale(0.9)'
                      : `translate3d(${d * 7}%, ${-d * 5}%, ${-d * 80}px) rotate(${d * 4}deg) scale(${1 - d * 0.06})`,
                    opacity: !visible ? 0 : leaving ? 0 : 1 - d * 0.18,
                    filter: d === 0 || leaving ? 'none' : `brightness(${0.75 - d * 0.12})`,
                    transition: 'transform 1100ms cubic-bezier(.22,1,.36,1), opacity 900ms ease, filter 900ms ease',
                    pointerEvents: d === 0 ? 'auto' : 'none',
                  }}
                >
                  <img src={sl.img} alt="" className="w-full h-full object-cover" style={{ objectPosition: sl.pos }} draggable={false} />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.7)_100%)]" />
                </Link>
              );
            })}

            {/* Legenda da fotografia da frente */}
            <div className="absolute left-5 right-5 bottom-5 z-10 flex items-end justify-between gap-4 pointer-events-none">
              <div key={s.img} className="animate-[fadeUp_.7s_cubic-bezier(.22,1,.36,1)]">
                <p className="t-label" style={{ color: tone.glow }}>
                  {THEME_LABEL[p.theme][lang]}
                </p>
                <p className="mt-1 em text-[2rem] leading-none text-white">{s.city[lang]}</p>
                <p className="mt-1.5 text-[14px] text-white/75">{p.title[lang]}</p>
              </div>
              <span className="w-10 h-10 rounded-full bg-white text-ink grid place-items-center shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Controlos */}
          <div className="mt-10 mx-auto max-w-[460px] flex items-center gap-4">
            <button onClick={() => setI((v) => (v - 1 + n) % n)} aria-label={t('Fotografia anterior', 'Previous photo')} className="w-10 h-10 rounded-full ring-1 ring-inset ring-white/20 grid place-items-center text-white/80 hover:bg-white hover:text-ink transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex-1 flex gap-1.5" role="tablist" aria-label={t('Fotografias', 'Photographs')}>
              {SLIDES.map((sl, k) => (
                <button key={sl.img} role="tab" aria-selected={k === i} aria-label={sl.city[lang]} onClick={() => setI(k)} className="relative flex-1 h-6">
                  <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full bg-white/20 overflow-hidden">
                    <span
                      key={k === i ? `on-${i}` : 'off'}
                      className={`absolute inset-y-0 left-0 bg-white ${k < i ? 'w-full' : k === i ? (paused ? 'w-full' : 'hero-bar') : 'w-0'}`}
                      style={{ ['--dur' as any]: `${DURATION}ms` }}
                    />
                  </span>
                </button>
              ))}
            </div>
            <button onClick={() => setI((v) => (v + 1) % n)} aria-label={t('Fotografia seguinte', 'Next photo')} className="w-10 h-10 rounded-full ring-1 ring-inset ring-white/20 grid place-items-center text-white/80 hover:bg-white hover:text-ink transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
