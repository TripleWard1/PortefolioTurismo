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
      className="group relative h-[600px] w-full rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-700 bg-white border border-slate-200 hover:border-blue-200 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)]"
    >
      {/* Imagem de Fundo: Tratamento Editorial */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out opacity-80"
          alt={title}
        />
        {/* Overlay de Claridade: Gradiente do branco para o transparente */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white" />
      </div>

      {/* Conteúdo Superior: Badge de Categoria (High Contrast) */}
      <div className="absolute top-10 left-10 z-10">
        <span className="px-5 py-2 bg-white/80 backdrop-blur-md border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-[0.4em] rounded-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-sm">
          {category}
        </span>
      </div>

      {/* Ícone de Ação: Minimalista e Escuro */}
      <div className="absolute top-10 right-10 z-10">
        <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-600 group-hover:bg-blue-50 group-hover:rotate-45 transition-all duration-500">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      {/* Conteúdo Principal: Tipografia Dark Grafite */}
      <div className="absolute bottom-12 left-12 right-12 z-10">
        {/* Título: O ponto focal. Letras pesadas e escuras */}
        <h3 className="text-4xl md:text-5xl font-serif font-black mb-6 text-slate-900 leading-[0.9] uppercase italic tracking-tighter group-hover:text-blue-700 transition-colors duration-500">
          {title}
        </h3>

        {/* Descrição: Cinza profundo para legibilidade máxima */}
        <p className="text-slate-600 text-lg font-light leading-relaxed mb-10 line-clamp-2 max-w-[90%] font-serif italic group-hover:text-slate-900 transition-colors">
          {description}
        </p>

        {/* Footer: Design de Infográfico de Luxo */}
        <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Indicador de Status Visual */}
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              <div className="absolute w-4 h-4 bg-blue-600/20 rounded-full animate-ping" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 group-hover:text-slate-900 transition-colors">
              {impactText || 'Strategic Data'}
            </span>
          </div>

          {/* Data Visualization: Barras Finas e Elegantes */}
          <div className="flex gap-1.5 items-end h-6">
            {impactValues.map((val: number, i: number) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-slate-200 group-hover:bg-blue-600 transition-all duration-700"
                style={{
                  height: `${val * 100}%`,
                  transitionDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Borda de Interação (Sombra Interna Sutil) */}
      <div className="absolute inset-0 border-[12px] border-transparent group-hover:border-white/20 transition-all duration-700 pointer-events-none" />
    </div>
  );
}