'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';

const CREDENTIALS = [
  'European Capital of Smart Tourism',
  'Green Destinations · Platinum',
  'URBACT · Braga After Dark',
  'Visit Braga',
];

export default function Hero() {
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const show = (delay: string) =>
    `transition-all duration-[900ms] ${delay} ${
      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`;

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col bg-[var(--paper)]">
      {/* FUNDO — foto institucional como atmosfera calma no topo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden">
          <img
            src="https://i.imgur.com/SvJ4bdR.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.22] grayscale-[55%] contrast-[0.96]"
          />
          <div className="absolute inset-0 bg-[var(--primary)]/[0.05] mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)]/45 via-[var(--paper)]/72 to-[var(--paper)]" />
        </div>
        {/* clareira radial atrás do emblema */}
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[72vw] max-w-[760px] aspect-square rounded-full bg-[radial-gradient(circle,var(--paper)_32%,transparent_72%)]" />
      </div>

      {/* LETTERHEAD */}
      <div className={`relative z-10 pt-24 sm:pt-28 px-5 sm:px-8 ${show('delay-0')}`}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.42em] text-[var(--ink)]/45">
            {t('Município de Braga', 'Municipality of Braga')}
          </p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="h-px w-10 sm:w-16 bg-[var(--primary)]/40" />
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.36em] text-[var(--primary)]">
              {t('Atividades Económicas & Turismo', 'Economy & Tourism')}
            </span>
            <span className="h-px w-10 sm:w-16 bg-[var(--primary)]/40" />
          </div>
        </div>
      </div>

      {/* ROSTO */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-6 py-12">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
          {/* Emblema */}
          <div
            className={`relative mb-10 transition-all duration-[1100ms] ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] rounded-full bg-[radial-gradient(circle,rgba(176,138,69,0.12),transparent_68%)]" />
            <div className="absolute inset-0 -m-7 sm:-m-9 rounded-full border border-[var(--primary)]/15" />
            <div className="absolute inset-0 -m-4 sm:-m-5 rounded-full border border-dashed border-[var(--primary)]/20 animate-spin-slow" />
            {[0, 90, 180, 270].map((deg) => (
              <span
                key={deg}
                className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-[var(--primary)]/55"
                style={{
                  transform: `translate(-50%,-50%) rotate(${deg}deg) translateY(calc(-50% - 1.25rem)) translateY(-50%)`,
                }}
              />
            ))}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[var(--paper-warm)] shadow-[0_25px_60px_-22px_rgba(40,30,12,0.45)] ring-1 ring-[var(--primary)]/30">
              <img
                src="https://i.imgur.com/Dx42oze.jpeg"
                alt="Hugo Barros"
                className="w-full h-full object-cover object-top scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/12 to-transparent" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 h-7 rounded-full bg-[var(--ink)] border-2 border-[var(--paper-warm)] flex items-center justify-center shadow-lg">
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--sky)]">
                {t('Disponível', 'Available')}
              </span>
            </div>
          </div>

          {/* Nome */}
          <h1
            className={`font-sans font-black tracking-[-0.045em] text-[var(--ink)] leading-[0.95] transition-all duration-1000 delay-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{ fontSize: 'clamp(2.7rem, 1.7rem + 4vw, 4.6rem)' }}
          >
            Hugo <span className="text-[var(--primary)]">Barros</span>
          </h1>

          <div className={`mt-5 flex items-center justify-center gap-3 ${show('delay-200')}`}>
            <span className="h-px w-5 bg-[var(--ink)]/20" />
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[var(--ink)]/55">
              {t('Técnico Superior de Turismo', 'Senior Tourism Officer')}
            </p>
            <span className="h-px w-5 bg-[var(--ink)]/20" />
          </div>

          <p className={`mt-7 max-w-xl text-base sm:text-lg text-[var(--ink)]/70 font-light leading-relaxed ${show('delay-300')}`}>
            {t(
              'Governação de destino, inovação e projetos europeus que consolidam Braga como referência de turismo inteligente e território.',
              'Destination governance, innovation and European projects consolidating Braga as a reference in smart tourism and territory.'
            )}
          </p>

          <div className={`mt-9 flex flex-col sm:flex-row items-center gap-4 ${show('delay-[450ms]')}`}>
            <button
              onClick={() => go('arquivo')}
              className="group px-8 py-4 bg-[var(--ink)] text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-500 hover:bg-[var(--primary)] shadow-[0_20px_50px_-22px_rgba(40,30,12,0.6)]"
            >
              <span className="text-[12px] tracking-wide uppercase">
                {t('Consultar portefólio', 'View portfolio')}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => go('contacto')}
              className="px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 text-[var(--ink)]/80 border border-[var(--ink)]/15 bg-white/60 backdrop-blur-sm hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-all duration-500 text-[12px] tracking-wide uppercase"
            >
              {t('Falar comigo', 'Get in touch')}
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CREDENCIAIS */}
      <div className={`relative z-10 border-t border-[var(--ink)]/10 bg-[var(--paper-warm)]/70 backdrop-blur-sm ${show('delay-[600ms]')}`}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--ink)]/35 hidden sm:inline">
            {t('Reconhecimentos', 'Recognitions')}
          </span>
          {CREDENTIALS.map((c, i) => (
            <div key={c} className="flex items-center gap-6">
              {i > 0 && <span className="hidden sm:block w-1 h-1 rounded-full bg-[var(--primary)]/40" />}
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]/55">
                {c}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}