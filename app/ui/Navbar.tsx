'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from './LanguageContext'; // Importação do cérebro do idioma

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Ligação ao estado global de idioma
  const { lang, toggleLang } = useLang();

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
        {/* Identidade Refinada */}
        <Link href="/" className="group flex items-center gap-4">
          <div className="relative">
            <h1 className="font-playfair text-2xl md:text-3xl tracking-tighter leading-none flex items-center">
              <span className="text-slate-950 font-[900] transition-transform duration-500 group-hover:-translate-y-px">
                Hugo
              </span>
              <span className="text-blue-600 italic font-light ml-1.5 relative transition-transform duration-500 group-hover:translate-y-px">
                Barros
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-600/10" />
              </span>
            </h1>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="h-[1px] w-3 bg-blue-600/40 transition-all duration-500 group-hover:w-6" />
              <span className="text-[7px] uppercase tracking-[0.8em] text-slate-500 font-black">
                {lang === 'pt' ? 'Portefólio Estratégico' : 'Strategic Portfolio'}
              </span>
            </div>
          </div>
        </Link>

        {/* Links de Navegação */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: lang === 'pt' ? 'Portefólio' : 'Portfolio', id: 'capitulo-01' },
            { label: lang === 'pt' ? 'Ecossistema' : 'Ecosystem', id: 'capitulo-02' },
            { label: lang === 'pt' ? 'Estratégia' : 'Strategy', id: 'estratégia' },
            { label: lang === 'pt' ? 'Contacto' : 'Contact', id: 'contacto' },
          ].map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-900 hover:text-blue-700 transition-all relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Interface de Ações */}
        <div className="flex items-center gap-6">
          {/* SELETOR DE IDIOMA ESTILO PILL SWITCH */}
          <button 
            onClick={toggleLang}
            className="relative flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 w-[70px] h-[32px] transition-all hover:border-blue-300"
          >
            {/* Slider Indicador */}
            <div 
              className={`absolute top-1 bottom-1 w-[30px] rounded-full bg-white shadow-sm border border-slate-200/50 transition-all duration-300 ease-out ${
                lang === 'en' ? 'translate-x-[30px]' : 'translate-x-0'
              }`}
            />
            <div className="relative z-10 flex justify-between w-full px-2">
              <span className={`text-[9px] font-black transition-colors duration-300 ${lang === 'pt' ? 'text-blue-600' : 'text-slate-400'}`}>PT</span>
              <span className={`text-[9px] font-black transition-colors duration-300 ${lang === 'en' ? 'text-blue-600' : 'text-slate-400'}`}>EN</span>
            </div>
          </button>

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
        :root {
          scroll-behavior: smooth !important;
        }
        html {
          scroll-behavior: smooth !important;
          scroll-padding-top: 100px;
        }
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
      `}</style>
    </nav>
  );
}