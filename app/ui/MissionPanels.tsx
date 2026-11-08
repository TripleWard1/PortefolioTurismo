'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { MISSION_POINTS, byId } from './projects';
import { TONE } from './viz/palette';

/* Missões internacionais em painéis que se expandem: o ativo abre e mostra o detalhe,
   os restantes ficam estreitos com o nome da cidade na vertical.
   Em computador abre ao passar o rato ou ao focar; no telemóvel, ao tocar. */
export default function MissionPanels() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);

  return (
    <div className="wrap">
      <ul className="flex flex-col lg:flex-row gap-3 lg:h-[560px]" role="list">
        {MISSION_POINTS.map((m, i) => {
          const p = byId(m.id)!;
          const tone = TONE[p.theme];
          const on = i === active;
          return (
            <li
              key={m.id}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-4xl cursor-pointer transition-[flex-grow,height] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                on ? 'h-[420px] lg:h-auto lg:flex-[5]' : 'h-[72px] lg:h-auto lg:flex-[1]'
              }`}
              style={{ background: tone.dark }}
            >
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-out ${on ? 'opacity-100 scale-100' : 'opacity-50 scale-110 grayscale-[40%]'}`}
              />
              <div className={`absolute inset-0 transition-opacity duration-700 ${on ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 35%, rgba(0,0,0,0.8) 100%)' }} />
              <div className={`absolute inset-0 transition-opacity duration-700 ${on ? 'opacity-0' : 'opacity-100'}`} style={{ background: `linear-gradient(180deg, ${tone.dark}66, ${tone.dark}e6)` }} />

              {/* Estado fechado: cidade na vertical (computador) ou em linha (telemóvel) */}
              <div className={`absolute inset-0 flex lg:flex-col items-center lg:justify-between justify-between px-6 lg:px-0 lg:py-7 text-white transition-opacity duration-500 ${on ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <span className="t-label tabular-nums text-white/60 lg:order-2">{m.year}</span>
                <span className="em text-[1.75rem] leading-none lg:[writing-mode:vertical-rl] lg:rotate-180 lg:order-1">{m.city[lang]}</span>
              </div>

              {/* Estado aberto */}
              <div className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white transition-all duration-700 ${on ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="flex items-center justify-between t-label">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-inset ring-white/15 px-3 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: tone.glow }} />
                    {m.country[lang]}
                  </span>
                  <span className="tabular-nums text-white/80">{m.year}</span>
                </div>
                <div className="flex items-end justify-between gap-6">
                  <div className="min-w-0">
                    <p className="em text-[clamp(2.75rem,2rem+2.6vw,4.5rem)] leading-[0.95]">{m.city[lang]}</p>
                    <p className="mt-3 text-[1.0625rem] font-medium text-white/90">{m.event}</p>
                    <p className="mt-1 t-label text-white/60 tabular-nums">
                      {m.km.toLocaleString('pt-PT')} km {t('de Braga', 'from Braga')}
                    </p>
                  </div>
                  <Link
                    href={`/projetos/${m.id}`}
                    tabIndex={on ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 h-12 pl-5 pr-2 rounded-full bg-white text-ink t-label inline-flex items-center gap-2 hover:bg-[#F1EBE0] transition-colors"
                  >
                    {t('Ver projeto', 'View project')}
                    <span className="w-8 h-8 rounded-full bg-ink text-white grid place-items-center">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Acessibilidade: botão para abrir o painel */}
              {!on && (
                <button className="absolute inset-0" aria-label={`${m.city[lang]}, ${m.event}`} onClick={() => setActive(i)} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
