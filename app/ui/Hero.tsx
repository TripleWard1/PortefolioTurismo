'use client';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useLang } from './LanguageContext'; // Caminho corrigido: ambos na mesma pasta (app/ui/)

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* BACKGROUND: Camada de Imagem com Fade */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.imgur.com/SvJ4bdR.jpeg"
          alt="Braga Strategic View"
          className="w-full h-full object-cover opacity-100 blur-[8px]"
        />

        {/* 1. Escurecimento para leitura */}
        <div className="absolute inset-0 bg-slate-900/20" />

        {/* 2. O SEGREDO DO MERGE */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-transparent" />

        {/* 3. MÁSCARA DE SAÍDA (Fade Out) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(241, 243, 245, 0) 60%, rgba(241, 243, 245, 1) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* FOTO CENTRALIZADA */}
        <div className="relative mb-4 animate-reveal z-10">
          <div className="relative p-8 flex justify-center items-center">
            <div className="absolute inset-0 rounded-full border-[3px] border-blue-500/60 shadow-[0_0_40px_rgba(37,99,235,0.4)] animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-3 rounded-full border border-white/40" />
            <div className="absolute inset-0 rounded-full animate-[spin_15s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-blue-600 rounded-full shadow-[0_0_25px_#2563eb] border-2 border-white" />
            </div>
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border-[10px] border-white shadow-2xl bg-white flex items-center justify-center overflow-hidden z-10">
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
            <div className="absolute bottom-10 right-10 md:bottom-14 md:right-14 bg-blue-600 p-3 rounded-2xl shadow-2xl border-2 border-white z-20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="relative mb-12 group cursor-default">
          <h2 className="text-5xl md:text-7xl font-playfair font-bold tracking-tight text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-none">
            Hugo <span className="italic font-light text-blue-400">Barros</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4 opacity-80">
            <div className="h-[1px] w-8 bg-blue-500" />
            <span className="text-[10px] uppercase tracking-[0.6em] text-white font-medium">
              {t('Senior Economic and Tourism Development Officer', 'Senior Economic and Tourism Development Officer')}
            </span>
            <div className="h-[1px] w-8 bg-blue-500" />
          </div>
        </div>

        <h1 className="text-5xl md:text-[6.2rem] font-playfair font-black tracking-tighter leading-[0.9] mb-8 text-slate-900 drop-shadow-sm">
          {t('Estratégia em Ação:', 'Strategy in Action:')} <br />
          <span className="italic font-light text-blue-600">
            {t('O Impacto no Território.', 'The Impact on the Territory.')}
          </span>
        </h1>

        <div className="max-w-2xl mx-auto space-y-8">
          <p className="text-lg md:text-xl text-slate-800 font-medium leading-relaxed px-4">
            {t('Portefólio de', 'Portfolio of')}{' '}
            <span className="font-bold text-slate-900">
              {t('projetos e governação de destino', 'projects and destination governance')}
            </span>
            .
            <br className="hidden md:block" />
            {t('Conheça as estratégias elaboradas para consolidar Braga como uma', 'Discover the strategies designed to consolidate Braga as a')}{' '}
            <span className="font-bold text-slate-900 border-b-2 border-blue-600/40">
              {t('referência de valor', 'reference of value')}
            </span>
            .
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-2">
            <button className="group relative px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-4 transition-all hover:bg-blue-700 hover:-translate-y-1 shadow-xl">
              {t('CONSULTAR PORTEFÓLIO TÉCNICO', 'VIEW TECHNICAL PORTFOLIO')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-left border-l-4 border-blue-600 pl-6 hidden sm:block">
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.15em] mb-0.5">
                Hugo Barros
              </p>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                {t('Direção de Estratégia', 'Strategy Directorate')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="w-[2px] h-10 bg-gradient-to-b from-blue-600 to-transparent opacity-40" />
      </div>
    </section>
  );
}