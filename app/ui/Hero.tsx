'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';

// Logo Visit Braga (fornecido pelo Hugo)
const VISIT_BRAGA = 'https://i.imgur.com/Yakcz6G.png';

export default function Hero() {
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const show = (d: string) =>
    `transition-all duration-[900ms] ${d} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`;

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col bg-[var(--paper)]">
      {/* Fundo - watermark institucional */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://i.imgur.com/SvJ4bdR.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.24] grayscale-[55%] contrast-[0.96]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)]/55 via-[var(--paper)]/45 to-[var(--paper)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,var(--paper)_18%,transparent_62%)]" />
        <div className="absolute -left-40 top-1/3 w-[42vw] h-[42vw] rounded-full bg-[radial-gradient(circle,rgba(10,102,194,0.06),transparent_70%)]" />
      </div>

      {/* Letterhead institucional */}
      <div className={`relative z-10 pt-28 sm:pt-32 px-5 sm:px-10 ${show('delay-0')}`}>
        <div className="max-w-[1320px] mx-auto flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.34em] text-[var(--ink)]/55 font-semibold">
            {t('Município de Braga', 'Municipality of Braga')}
          </span>
          <span className="h-px w-8 bg-[var(--primary)]/45" />
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.34em] text-[var(--primary)] font-semibold">
            {t('Divisão de Atividades Económicas & Turismo', 'Economic Activities & Tourism Division')}
          </span>
        </div>
      </div>

      {/* Conteúdo - assimétrico */}
      <div className="relative z-10 flex-1 flex items-center px-5 sm:px-10 py-10">
        <div className="max-w-[1320px] mx-auto w-full grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Identidade */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className={`flex items-center gap-3 mb-6 ${show('delay-100')}`}>
              <span className="font-mono text-[11px] font-black text-[var(--primary)]">01</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink)]/55 font-semibold">
                {t('Posicionamento', 'Positioning')}
              </span>
            </div>
            <h1
              className={`font-sans font-black tracking-[-0.04em] text-[var(--ink)] leading-[0.9] transition-all duration-1000 delay-150 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
              style={{ fontSize: 'clamp(3rem, 1.8rem + 5vw, 5.8rem)' }}
            >
              Hugo <span className="text-[var(--primary)]">Barros</span>
            </h1>
            <p className={`mt-6 text-lg sm:text-xl font-bold text-[var(--ink)] leading-snug ${show('delay-200')}`}>
              {t('Técnico Superior · Inovação e Desenvolvimento Turístico', 'Senior Officer · Tourism Innovation & Development')}
            </p>
            <p className={`mt-5 max-w-xl text-base sm:text-lg text-[var(--ink)]/70 leading-relaxed ${show('delay-300')}`}>
              {t(
                'Estratégia de destino, candidaturas europeias e inovação turística no Município de Braga.',
                'Destination strategy, European applications and tourism innovation at the Municipality of Braga.'
              )}
            </p>
            <div className={`mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${show('delay-[450ms]')}`}>
              <button
                onClick={() => go('arquivo')}
                className="group px-8 py-4 bg-[var(--ink)] text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-500 hover:bg-[var(--primary)] shadow-[0_20px_50px_-22px_rgba(20,22,28,0.6)]"
              >
                <span className="text-[12px] tracking-wide uppercase">{t('Consultar portefólio', 'View portfolio')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => go('contacto')}
                className="px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 text-[var(--ink)] border border-[var(--ink)]/15 bg-white/60 backdrop-blur-sm hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-all duration-500 text-[12px] tracking-wide uppercase"
              >
                {t('Contacto', 'Contact')}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Retrato - placa institucional */}
          <div
            className={`lg:col-span-5 order-1 lg:order-2 transition-all duration-[1100ms] delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative w-full max-w-[20rem] sm:max-w-sm mx-auto lg:ml-auto lg:mr-0">
              {/* marcas de registo */}
              <div className="absolute -inset-3 pointer-events-none">
                <span className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[var(--primary)]/40" />
                <span className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[var(--primary)]/40" />
                <span className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[var(--primary)]/40" />
                <span className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[var(--primary)]/40" />
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-[var(--ink)]/10 bg-white shadow-[0_40px_90px_-35px_rgba(20,22,28,0.5)]">
                <div className="relative aspect-[4/5]">
                  <img
                    src="https://i.imgur.com/Dx42oze.jpeg"
                    alt="Hugo Barros"
                    className="w-full h-full object-cover object-[64%_18%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/35 via-transparent to-transparent" />
                </div>
                {/* legenda institucional - limpa */}
                <div className="px-5 py-4 bg-white border-t border-[var(--ink)]/8">
                  <span className="font-sans font-bold text-sm text-[var(--ink)] block">Hugo Barros</span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--ink)]/45 mt-1 block">
                    {t('Técnico Superior · Inovação e Desenvolvimento Turístico', 'Senior Officer · Tourism Innovation & Development')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé institucional */}
      <div className={`relative z-10 border-t border-[var(--ink)]/10 bg-[var(--paper-warm)]/70 backdrop-blur-sm ${show('delay-[600ms]')}`}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-10 py-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)] font-bold">
              {t('Divisão de Atividades Económicas e Turismo', 'Economic Activities and Tourism Division')}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink)]/45 mt-1">
              {t('Município de Braga', 'Municipality of Braga')}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block h-9 w-px bg-[var(--ink)]/12" />
            <div className="flex flex-col items-end">
              <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-[var(--ink)]/40 mb-1.5">
                {t('Destino oficial', 'Official destination')}
              </span>
              <img src={VISIT_BRAGA} alt="Visit Braga" className="h- sm:h-20 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}