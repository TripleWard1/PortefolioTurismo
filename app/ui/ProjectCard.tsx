'use client';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({
  title,
  image,
  description,
  category,
  impactText,
  impactValues = [0.4, 0.7, 0.5, 0.9],
  onClick,
}: any) {
  return (
    <div
      onClick={onClick}
      className="group relative h-[440px] w-full rounded-[1.5rem] overflow-hidden cursor-pointer transition-all duration-1000 bg-[#FDFDFD] border border-slate-100 hover:shadow-[0_40px_90px_-25px_rgba(0,0,0,0.06)]"
    >
      {/* 1. TRATAMENTO DE IMAGEM: Estilo "Minimal Ghost" */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={image}
          className="w-full h-full object-cover grayscale opacity-[0.15] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] cubic-bezier(0.23, 1, 0.32, 1)"
          alt={title}
        />
        {/* Camada de luz que suaviza a transição */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent opacity-100 group-hover:opacity-40 transition-opacity duration-1000" />
      </div>

      {/* 2. HEADER: Micro-labels */}
      <div className="absolute top-7 left-7 right-7 z-10 flex justify-between items-center text-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
          <span className="text-[8px] font-black uppercase tracking-[0.5em] opacity-40 group-hover:opacity-100 transition-opacity">
            {category}
          </span>
        </div>
        
        <div className="w-8 h-8 rounded-full border border-slate-200/60 flex items-center justify-center bg-white/40 backdrop-blur-sm group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-700 shadow-sm">
          <ArrowUpRight size={14} className="group-hover:text-white transition-colors" />
        </div>
      </div>

      {/* 3. CONTEÚDO: Tipografia de Estúdio */}
      <div className="absolute bottom-9 left-9 right-9 z-10">
        <div className="space-y-3 mb-8">
          <h3 className="text-2xl md:text-[28px] font-black leading-[1.1] tracking-[-0.04em] text-slate-900 uppercase italic transition-all duration-700 group-hover:text-blue-700">
            {title}
          </h3>
          <p className="text-[13px] text-slate-400 font-medium leading-relaxed max-w-[80%] line-clamp-2 group-hover:text-slate-600 transition-colors duration-500 italic font-serif">
            {description}
          </p>
        </div>

        {/* 4. DATA BAR: O detalhe final */}
        <div className="flex items-end justify-between border-t border-slate-100 pt-6">
          <div className="flex flex-col gap-1">
            <span className="text-[7px] font-black uppercase tracking-[0.6em] text-slate-300">
              Metric Impact
            </span>
            <span className="text-[10px] font-bold text-slate-900/40 group-hover:text-slate-900 transition-colors">
              {impactText || 'Performance Data'}
            </span>
          </div>

          <div className="flex gap-[3px] items-end h-4 mb-1">
            {impactValues.map((val: number, i: number) => (
              <div
                key={i}
                className="w-[1.5px] rounded-full bg-slate-100 group-hover:bg-blue-600/40 transition-all duration-1000"
                style={{
                  height: `${val * 100}%`,
                  transitionDelay: `${i * 40}ms`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}