'use client';
import { ArrowUpRight, BarChart3 } from 'lucide-react';

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
      className="group relative h-[550px] w-full rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-700 bg-[#020617] border border-white/5 hover:border-white/20 hover:shadow-2xl"
    >
      {/* Imagem de Fundo: Tratamento monocromático sutil */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-50 group-hover:scale-105 transition-all duration-[1.2s] ease-out"
          alt={title}
        />
        {/* Gradiente mais suave para não "afogar" a imagem em preto */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/20 via-[#020617]/80 to-[#020617]" />
      </div>

      {/* Conteúdo Superior: Badge de Categoria */}
      <div className="absolute top-8 left-8 z-10">
        <span className="px-4 py-1.5 bg-white/[0.03] backdrop-blur-md border border-white/10 text-blue-500 text-[9px] font-black uppercase tracking-[0.4em] rounded-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all duration-500">
          {category}
        </span>
      </div>

      {/* Ícone de Ação: Pequeno e elegante no canto */}
      <div className="absolute top-8 right-8 z-10">
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-white group-hover:border-white group-hover:rotate-45 transition-all duration-500">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Conteúdo Principal: Alinhamento e Tipografia */}
      <div className="absolute bottom-10 left-10 right-10 z-10">
        {/* Título: Serifado para look Premium */}
        <h3 className="text-3xl md:text-4xl font-serif font-black mb-4 text-white leading-tight uppercase italic tracking-tighter">
          {title}
        </h3>

        {/* Descrição: Mais curta e clara */}
        <p className="text-slate-400 text-base font-light leading-relaxed mb-8 line-clamp-2 group-hover:text-slate-200 transition-colors duration-500">
          {description}
        </p>

        {/* Footer: Indicadores de impacto ultra-minimalistas */}
        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white/70 transition-colors">
              {impactText || 'Impact Analysis'}
            </span>
          </div>

          {/* Gráfico de Barras Minimal */}
          <div className="flex gap-1 items-end h-4">
            {impactValues.map((val: number, i: number) => (
              <div
                key={i}
                className="w-[2px] bg-blue-500/30 group-hover:bg-blue-500 transition-all duration-700"
                style={{
                  height: `${val * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}