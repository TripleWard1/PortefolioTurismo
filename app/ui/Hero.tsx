'use client';

import { ArrowRight, ArrowUpRight, ArrowDown, ShieldCheck } from 'lucide-react';
import { useLang } from './LanguageContext';

const CHAPTERS = [
  { n: '01', id: 'arquivo', pt: 'Posicionamento', en: 'Positioning' },
  { n: '02', id: 'capitulo-02', pt: 'Ecossistema', en: 'Ecosystem' },
  { n: '03', id: 'estratégia', pt: 'Herança & Futuro', en: 'Heritage & Future' },
];

const DOMAINS = ['Braga', 'Smart Tourism', 'URBACT', 'Music Cities', 'Small Retail'];

export default function Hero() {
  const { t } = useLang();
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden pt-24 pb-10 px-5 sm:px-6">
      {/* Fundo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 grid-dots text-slate-900/[0.05]" />
        <div className="absolute top-[-15%] right-[-5%] w-[65vw] h-[65vw] bg-[var(--primary)]/15 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-[var(--accent)]/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto w-full">
        {/* MASTHEAD */}
        <div className="rise-in flex items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-8 sm:mb-12">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-slate-500 font-bold truncate">
            Hugo Barros - {t('Portefólio Estratégico', 'Strategic Portfolio')}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">
              Ed. 2026 · Braga
            </span>
          </div>
        </div>

        {/* GRELHA PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* TEXTO */}
          <div className="lg:col-span-7 space-y-7">
            <div className="rise-in flex items-center gap-3" style={{ animationDelay: '0.06s' }}>
              <span className="font-mono text-[11px] font-bold text-[var(--primary)]">№ 01</span>
              <span className="h-px w-6 bg-slate-300" />
              <span className="eyebrow text-slate-400">
                {t('Estratégia de Destino', 'Destination Strategy')}
              </span>
            </div>

            <h1
              className="rise-in display font-playfair font-black text-[var(--ink)] text-balance"
              style={{ animationDelay: '0.13s' }}
            >
              {t('Estratégia em Ação.', 'Strategy in Action.')}
              <span className="block italic font-light text-[var(--primary)] mt-1">
                {t('O impacto no território.', 'Impact on the territory.')}
              </span>
            </h1>

            <p
              className="rise-in text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-xl"
              style={{ animationDelay: '0.21s' }}
            >
              {t(
                'Portefólio de projetos e governação de destino - as estratégias que consolidam Braga como referência europeia de turismo inteligente e território.',
                'A portfolio of projects and destination governance - strategies consolidating Braga as a European reference in smart tourism and territory.'
              )}
            </p>

            <div
              className="rise-in flex flex-col sm:flex-row sm:items-center gap-4"
              style={{ animationDelay: '0.29s' }}
            >
              <button
                onClick={() => go('arquivo')}
                className="group relative px-7 py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-500 hover:bg-[var(--primary)] sm:hover:-translate-y-0.5 shadow-lg overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10 text-[12px] tracking-wide uppercase">
                  {t('Consultar portefólio', 'View portfolio')}
                </span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => go('contacto')}
                className="px-7 py-4 rounded-xl font-bold flex items-center justify-center gap-3 text-slate-700 border border-slate-200 bg-white/60 backdrop-blur-sm hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-all duration-500 text-[12px] tracking-wide uppercase"
              >
                {t('Falar comigo', 'Get in touch')}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Domínios */}
            <div
              className="rise-in flex flex-wrap gap-2 pt-2"
              style={{ animationDelay: '0.37s' }}
            >
              {DOMAINS.map((d) => (
                <span
                  key={d}
                  className="font-mono text-[10px] uppercase tracking-wider text-slate-500 bg-white/70 border border-slate-200 rounded-full px-3 py-1.5"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* RETRATO */}
          <div
            className="rise-in lg:col-span-5 flex justify-center lg:justify-end"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[340px]">
              <div className="absolute -top-3 -left-3 w-7 h-7 border-l-2 border-t-2 border-[var(--primary)]/40 z-20" />
              <div className="absolute -bottom-3 -right-3 w-7 h-7 border-r-2 border-b-2 border-[var(--primary)]/40 z-20" />

              <div className="relative rounded-[1.75rem] overflow-hidden border border-slate-200 shadow-[0_30px_70px_-30px_rgba(10,20,36,0.4)] bg-white">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src="https://i.imgur.com/Dx42oze.jpeg"
                    alt="Hugo Barros"
                    className="w-full h-full object-cover object-top scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/5 to-transparent" />

                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]" />
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-700 font-bold">
                      {t('Disponível', 'Available')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Credencial sobreposta */}
              <div className="absolute -bottom-5 left-4 right-4 bg-[var(--ink)] rounded-2xl p-4 shadow-xl border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="font-playfair text-lg font-bold text-white leading-none">
                    Hugo <span className="italic font-light text-[var(--sky)]">Barros</span>
                  </p>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50 mt-1 truncate">
                    {t('Município de Braga · Turismo', 'Braga Municipality · Tourism')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ÍNDICE */}
        <div
          className="rise-in mt-16 sm:mt-20 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4"
          style={{ animationDelay: '0.5s' }}
        >
          {CHAPTERS.map((c) => (
            <button
              key={c.id}
              onClick={() => go(c.id)}
              className="group flex items-center gap-4 p-3 sm:p-4 rounded-xl hover:bg-white/70 transition-colors text-left"
            >
              <span className="font-mono text-[11px] font-bold text-[var(--primary)]">{c.n}</span>
              <span className="flex-1 text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-slate-700 group-hover:text-[var(--ink)]">
                {t(c.pt, c.en)}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => go('arquivo')}
        aria-label={t('Descer', 'Scroll down')}
        className="hidden sm:flex absolute bottom-5 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border border-slate-300 items-center justify-center hover:border-[var(--primary)] hover:bg-[var(--primary)] transition-all duration-500 group"
      >
        <ArrowDown className="w-4 h-4 text-slate-400 group-hover:text-white animate-bounce" />
      </button>
    </section>
  );
}