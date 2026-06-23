'use client';
import { ArrowRight, ShieldCheck, ArrowDown } from 'lucide-react';
import { useLang } from './LanguageContext';

export default function Hero() {
  const { t } = useLang();

  const goToPortfolio = () =>
    document.getElementById('arquivo')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16">
      {/* FUNDO — imagem com profundidade e fade de saída */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.imgur.com/SvJ4bdR.jpeg"
          alt="Braga Strategic View"
          className="w-full h-full object-cover blur-[8px] scale-105"
        />
        <div className="absolute inset-0 bg-[var(--ink)]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/55 via-transparent to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(246,247,249,0) 58%, var(--paper) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* META — linha de dossier cartográfico (assinatura discreta) */}
        <div className="rise-in flex items-center gap-3 sm:gap-5 mb-8 [animation-delay:80ms]">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/70">
            41.5503° N
          </span>
          <span className="h-[1px] w-6 bg-white/30" />
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/90 font-bold">
            {t('Dossier Estratégico', 'Strategic Dossier')}
          </span>
          <span className="h-[1px] w-6 bg-white/30" />
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/70">
            8.4200° W
          </span>
        </div>

        {/* RETRATO */}
        <div className="relative mb-6 animate-reveal z-10 [animation-delay:120ms]">
          <div className="relative p-8 flex justify-center items-center">
            <div className="absolute inset-0 rounded-full border-[3px] border-[var(--sky)]/55 shadow-[0_0_40px_rgba(10,92,255,0.4)] animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-3 rounded-full border border-white/40" />
            <div className="absolute inset-0 rounded-full animate-[spin_15s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[var(--primary)] rounded-full shadow-[0_0_25px_var(--primary)] border-2 border-white" />
            </div>
            <div className="relative w-52 h-52 md:w-72 md:h-72 rounded-full border-[10px] border-white shadow-2xl bg-white flex items-center justify-center overflow-hidden z-10">
              <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-slate-50">
                <img
                  src="https://imgur.com/Dx42oze.png"
                  alt="Hugo Barros"
                  style={{
                    maskImage:
                      'linear-gradient(to bottom, transparent 0%, black 15%)',
                    WebkitMaskImage:
                      'linear-gradient(to bottom, transparent 0%, black 15%)',
                  }}
                  className="w-full h-full object-cover object-top scale-[1.05] translate-y-4"
                />
              </div>
            </div>
            <div className="absolute bottom-9 right-9 md:bottom-14 md:right-14 bg-[var(--primary)] p-3 rounded-2xl shadow-2xl border-2 border-white z-20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* NOME + FUNÇÃO */}
        <div className="relative mb-10 group cursor-default rise-in [animation-delay:200ms]">
          <h2 className="text-5xl md:text-7xl font-playfair font-bold tracking-tight text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-none">
            Hugo <span className="italic font-light text-[var(--sky)]">Barros</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4 opacity-90">
            <div className="h-[1px] w-8 bg-[var(--sky)]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-white font-medium">
              {t(
                'Senior Economic and Tourism Development Officer',
                'Senior Economic and Tourism Development Officer'
              )}
            </span>
            <div className="h-[1px] w-8 bg-[var(--sky)]" />
          </div>
        </div>

        {/* TÍTULO PRINCIPAL */}
        <h1 className="text-5xl md:text-[6.2rem] font-playfair font-black tracking-tighter leading-[0.9] mb-8 text-slate-900 drop-shadow-sm text-balance rise-in [animation-delay:280ms]">
          {t('Estratégia em Ação:', 'Strategy in Action:')} <br />
          <span className="italic font-light text-[var(--primary)]">
            {t('O Impacto no Território.', 'The Impact on the Territory.')}
          </span>
        </h1>

        <div className="max-w-2xl mx-auto space-y-9 rise-in [animation-delay:360ms]">
          <p className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed px-4 text-balance">
            {t('Portefólio de', 'Portfolio of')}{' '}
            <span className="font-bold text-slate-900">
              {t('projetos e governação de destino', 'projects and destination governance')}
            </span>
            .
            <br className="hidden md:block" />
            {t(
              'Conheça as estratégias elaboradas para consolidar Braga como uma',
              'Discover the strategies designed to consolidate Braga as a'
            )}{' '}
            <span className="font-bold text-slate-900 border-b-2 border-[var(--primary)]/40">
              {t('referência de valor', 'reference of value')}
            </span>
            .
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-2">
            <button
              onClick={goToPortfolio}
              className="group relative px-9 py-5 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-4 transition-all duration-500 hover:bg-[var(--primary)] hover:-translate-y-1 shadow-xl overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10 text-[13px] tracking-wide">
                {t('CONSULTAR PORTEFÓLIO TÉCNICO', 'VIEW TECHNICAL PORTFOLIO')}
              </span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-left border-l-4 border-[var(--primary)] pl-6 hidden sm:block">
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.15em] mb-0.5">
                Hugo Barros
              </p>
              <p className="font-mono text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest">
                {t('Direção de Estratégia', 'Strategy Directorate')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* INDICADOR DE SCROLL */}
      <button
        onClick={goToPortfolio}
        aria-label={t('Continuar', 'Scroll down')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
          {t('Explorar', 'Explore')}
        </span>
        <div className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] transition-all duration-500">
          <ArrowDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors animate-bounce" />
        </div>
      </button>
    </section>
  );
}