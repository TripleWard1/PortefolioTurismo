'use client';

import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useBragaTime, useScrollProgress } from './hooks';
import { goTo } from './sections';

const VISIT_BRAGA = 'https://i.imgur.com/Yakcz6G.png';
const COVER = 'https://i.imgur.com/SvJ4bdR.jpeg';
const PORTRAIT = 'https://i.imgur.com/Dx42oze.jpeg';

export default function Hero({ ready }: { ready: boolean }) {
  const { t } = useLang();
  const time = useBragaTime();
  const root = useRef<HTMLElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  // Paralaxe: a imagem afunda e o texto dissolve à medida que se desce
  useScrollProgress(
    root,
    (p) => {
      if (img.current) img.current.style.transform = `translate3d(0, ${p * 30}%, 0) scale(${1.05 + p * 0.25})`;
      if (content.current) {
        content.current.style.opacity = String(1 - p * 1.6);
        content.current.style.transform = `translate3d(0, ${p * -12}%, 0)`;
      }
    },
    'exit'
  );

  const In = ready ? 'is-in' : '';

  return (
    <section id="top" ref={root} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-night">
      {/* Imagem */}
      <div ref={img} className="absolute inset-0 will-change-transform" style={{ transform: 'scale(1.05)' }}>
        <img
          src={COVER}
          alt=""
          fetchPriority="high"
          className={`w-full h-full object-cover transition-all duration-[2400ms] ease-out ${
            ready ? 'opacity-[0.42] scale-100' : 'opacity-0 scale-110'
          }`}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/20 to-night" />
      <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/30 to-transparent" />
      <div className="absolute inset-0 vignette" />

      <div ref={content} className="relative z-10 h-full wrap flex flex-col pt-28 pb-6 will-change-transform">
        {/* Cabeçalho institucional */}
        <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 label text-[var(--fg-2)] ${ready ? 'rise' : 'opacity-0'}`} style={{ ['--d' as any]: '200ms' }}>
          <span>{t('Município de Braga', 'Municipality of Braga')}</span>
          <span className="w-8 h-px bg-ember" />
          <span className="text-[var(--fg-3)]">{t('Divisão de Atividades Económicas & Turismo', 'Economic Activities & Tourism Division')}</span>
        </div>

        {/* Nome */}
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <h1 className={`lg:col-span-9 mega text-bone ${In}`}>
              <span className="line-mask">
                <span style={{ ['--d' as any]: '100ms' }}>Hugo</span>
              </span>
              <span className="line-mask">
                <span style={{ ['--d' as any]: '220ms' }} className="italic text-ember pl-[0.5em]">
                  Barros<span className="text-bone not-italic">.</span>
                </span>
              </span>
            </h1>

            {/* Retrato + selo */}
            <div className={`hidden lg:block lg:col-span-3 pb-4 ${ready ? 'rise' : 'opacity-0'}`} style={{ ['--d' as any]: '650ms' }}>
              <div className="relative ml-auto w-full max-w-[260px]">
                <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden border border-[var(--line-2)]">
                  <img src={PORTRAIT} alt="Hugo Barros" className="w-full h-full object-cover object-[64%_18%] grayscale-[25%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
                  <div className="absolute left-4 right-4 bottom-4">
                    <span className="block text-[15px] font-medium text-bone">Hugo Barros</span>
                    <span className="block label-sm text-[var(--fg-2)] mt-1.5 leading-relaxed">
                      {t('Técnico Superior', 'Senior Officer')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => goTo('manifesto')}
                  aria-label={t('Descer', 'Scroll down')}
                  className="group absolute -left-12 -top-12 w-[104px] h-[104px] rounded-full bg-night/80 backdrop-blur-md border border-[var(--line-2)] grid place-items-center"
                >
                  <svg viewBox="0 0 100 100" className="absolute inset-0 spin-slow">
                    <defs>
                      <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                    </defs>
                    <text className="fill-[var(--fg-2)]" style={{ fontSize: 8.4, letterSpacing: '0.24em', fontFamily: 'var(--font-mono)' }}>
                      <textPath href="#circ">{t('ESTRATÉGIA · TERRITÓRIO · INOVAÇÃO · ', 'STRATEGY · TERRITORY · INNOVATION · ')}</textPath>
                    </text>
                  </svg>
                  <ArrowDown className="w-5 h-5 text-ember transition-transform duration-500 group-hover:translate-y-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Linha de rodapé */}
        <div
          className={`grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-5 items-end pt-5 border-t border-[var(--line)] ${ready ? 'rise' : 'opacity-0'}`}
          style={{ ['--d' as any]: '500ms' }}
        >
          <p className="col-span-2 md:col-span-5 lead text-[var(--fg)] text-pretty max-w-md">
            {t(
              'Estratégia de destino, candidaturas europeias e inovação turística para Braga.',
              'Destination strategy, European candidacies and tourism innovation for Braga.'
            )}
          </p>
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <span className="label-sm text-[var(--fg-3)]">{t('Coordenadas', 'Coordinates')}</span>
            <span className="label text-[var(--fg-2)] tabular">41.55° N · 8.43° W</span>
          </div>
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <span className="label-sm text-[var(--fg-3)]">{t('Hora local', 'Local time')}</span>
            <span className="label text-[var(--fg-2)] tabular flex items-center gap-2">
              <span className="live-dot" /> {time || '--:--'}
            </span>
          </div>
          <div className="col-span-2 md:col-span-3 flex items-center justify-between md:justify-end gap-5">
            <button onClick={() => goTo('manifesto')} className="flex items-center gap-3 label text-[var(--fg-2)] hover:text-bone transition-colors">
              <span className="relative w-px h-8 bg-[var(--line-2)] overflow-hidden">
                <span className="absolute inset-x-0 top-0 h-1/2 bg-ember scroll-cue" />
              </span>
              {t('Descer', 'Scroll')}
            </button>
            <span className="h-12 px-5 rounded-full bg-bone flex items-center shrink-0" title="Visit Braga">
              <img src={VISIT_BRAGA} alt="Visit Braga" className="h-9 w-auto object-contain" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
