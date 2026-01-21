'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-700 px-8 py-2.5 rounded-2xl border ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-slate-200/60 shadow-lg shadow-slate-900/5'
            : 'bg-white/70 backdrop-blur-md border-white/50 shadow-none'
        }`}
      >
        {/* Identidade de Alto Impacto (Estática e Dinâmica) */}
        <Link href="/" className="group flex items-center">
          <div className="flex flex-col relative overflow-hidden">
            <h1 className="font-playfair text-xl md:text-2xl tracking-tighter leading-none flex items-center">
              {/* Hugo: Peso Black para destaque imediato */}
              <span className="text-slate-950 font-[900] transition-colors duration-300 group-hover:text-blue-700">
                Hugo
              </span>

              {/* Barros: Itálico Azul com Kerning Ajustado */}
              <span className="text-blue-600 italic font-light ml-2 relative">
                Barros
                {/* Linha de base fixa para autoridade visual */}
                <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-blue-600/20" />
                {/* Linha de destaque no hover */}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-blue-600 transition-all duration-500 group-hover:w-full" />
              </span>
            </h1>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-[8px] uppercase tracking-[0.6em] text-slate-950 font-[900]">
                Portefólio Estratégico
              </span>
              <div className="h-[2px] w-4 bg-blue-600/30 group-hover:w-8 group-hover:bg-blue-600 transition-all duration-500" />
            </div>

            {/* Brilho interno contido (overflow-hidden no pai resolve o problema de sair fora) */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
          </div>
        </Link>

        {/* Links de Navegação */}
        <div className="hidden md:flex items-center gap-10">
          {['Portefólio', 'Estratégia', 'Ecossistema', 'Contacto'].map(
            (item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-900 hover:text-blue-700 transition-all relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </div>

        {/* Badge de Status */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-3 px-5 py-2 rounded-xl border border-blue-200/50 bg-blue-50/80 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-blue-900 font-[900]">
              Braga Strategic Hub
            </span>
          </div>

          <button className="md:hidden text-slate-950">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
      `}</style>
    </nav>
  );
}
