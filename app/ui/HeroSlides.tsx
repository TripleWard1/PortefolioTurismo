'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import type { L } from './projects';
import { Split } from './parts';

/* Abertura em ecrã inteiro: fotografias de terreno em transição lenta,
   com um véu neutro apenas para garantir a leitura do texto. */
const SLIDES: { img: string; city: L; event: string; id: string; pos?: string }[] = [
  { img: 'https://i.imgur.com/SvJ4bdR.jpeg', city: { pt: 'Bruxelas', en: 'Brussels' }, event: 'European Capital of Smart Tourism', id: 'smart-tourism', pos: '50% 40%' },
  { img: 'https://i.imgur.com/ZCSF2lK.jpeg', city: { pt: 'Braga', en: 'Braga' }, event: 'Braga After Dark · URBACT', id: 'braga-after-dark', pos: '50% 60%' },
  { img: 'https://i.imgur.com/dYaYXb9.png', city: { pt: 'Barcelona', en: 'Barcelona' }, event: 'B-Travel', id: 'b-travel-barcelona', pos: '60% 35%' },
  { img: 'https://i.imgur.com/eiRaC5f.png', city: { pt: 'Gante', en: 'Ghent' }, event: 'Fiets en Wandelbeurs', id: 'fiets-wandelbeurs-gante', pos: '50% 40%' },
  { img: 'https://i.imgur.com/C4uKurT.png', city: { pt: 'Bilbao', en: 'Bilbao' }, event: 'ExpoVacaciones', id: 'expovacaciones-bilbao', pos: '50% 50%' },
];
const DURATION = 6500;

export default function HeroSlides() {
  const { t, lang } = useLang();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setI((v) => (v + 1) % SLIDES.length), DURATION);
    return () => clearTimeout(id);
  }, [i, paused]);

  // Pré-carrega as restantes fotografias depois da primeira
  useEffect(() => {
    SLIDES.slice(1).forEach((s) => {
      const im = new Image();
      im.src = s.img;
    });
  }, []);

  const s = SLIDES[i];

  return (
    <section data-hero className="relative -mt-16 flex flex-col min-h-[100svh] md:min-h-[640px] md:h-[100svh] md:max-h-[1100px] overflow-hidden bg-[#141312] text-white">
      {/* Fotografias */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div data-parallax="-0.25" className="absolute inset-0 will-change-transform" style={{ ['--px-scale' as any]: 1.15 }}>
          {SLIDES.map((sl, k) => (
            <img
              key={sl.img}
              src={sl.img}
              alt=""
              fetchPriority={k === 0 ? 'high' : 'low'}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1600ms] ease-out ${k === i ? 'opacity-100 hero-kb' : 'opacity-0'}`}
              style={{ objectPosition: sl.pos }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,18,0.55)_0%,rgba(20,19,18,0.1)_28%,rgba(20,19,18,0.25)_55%,rgba(20,19,18,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,19,18,0.55)_0%,rgba(20,19,18,0.2)_45%,transparent_70%)]" />
        <div className="absolute inset-0 md:hidden bg-[rgba(20,19,18,0.3)]" />
        <div className="grain absolute inset-0" />
      </div>

      {/* Conteúdo */}
      <div className="relative flex-1 w-full wrap flex flex-col justify-end pt-28 pb-10 md:pb-14">
        <p className="t-label text-white/70 inline-flex items-center gap-2 hero-in" style={{ ['--d' as any]: '100ms' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9B08A]" />
          {t('Hugo Barros · Portefólio profissional', 'Hugo Barros · Professional portfolio')}
        </p>
        <h1 className="mt-6 t-hero !text-[clamp(2.75rem,1.2rem+5vw,5.75rem)] text-white max-w-[17ch]">
          <Split auto delay={200} parts={[t('Estratégia, financiamento e promoção de', 'Strategy, funding and promotion for'), { em: t('destinos turísticos', 'tourism destinations'), color: '#E9DCC4' }, '.']} />
        </h1>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end hero-in" style={{ ['--d' as any]: '700ms' }}>
          <div className="lg:col-span-7">
            <p className="t-lead text-white/75 max-w-2xl text-pretty">
              {t(
                'Candidaturas europeias, representação institucional em mercados internacionais e desenvolvimento de produto turístico.',
                'European bids, institutional representation in international markets and tourism product development.'
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projetos" className="h-12 px-6 rounded-full bg-white text-ink text-[15px] font-medium inline-flex items-center gap-2 hover:bg-[#F1EBE0] transition-colors">
                {t('Consultar projetos', 'Browse projects')} <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/contacto" className="h-12 px-6 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-inset ring-white/25 text-white text-[15px] font-medium inline-flex items-center hover:bg-white/20 transition-colors">
                {t('Contacto institucional', 'Institutional contact')}
              </Link>
            </div>
          </div>

          {/* Legenda e progresso */}
          <div className="lg:col-span-5 lg:justify-self-end w-full lg:max-w-sm" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <Link href={`/projetos/${s.id}`} className="group block">
              <p key={s.img} className="em text-[2rem] leading-none text-white animate-[fadeUp_.8s_cubic-bezier(.22,1,.36,1)]">
                {s.city[lang]}
              </p>
              <p className="mt-2 t-label text-white/65 inline-flex items-center gap-1.5">
                {s.event}
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </Link>
            <div className="mt-5 flex gap-1.5" role="tablist" aria-label={t('Fotografias', 'Photographs')}>
              {SLIDES.map((sl, k) => (
                <button
                  key={sl.img}
                  role="tab"
                  aria-selected={k === i}
                  aria-label={sl.city[lang]}
                  onClick={() => setI(k)}
                  className="relative flex-1 h-6 group"
                >
                  <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full bg-white/25 overflow-hidden">
                    <span
                      key={k === i ? `on-${i}` : 'off'}
                      className={`absolute inset-y-0 left-0 bg-white ${k < i ? 'w-full' : k === i ? (paused ? 'w-full' : 'hero-bar') : 'w-0'}`}
                      style={{ ['--dur' as any]: `${DURATION}ms` }}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
