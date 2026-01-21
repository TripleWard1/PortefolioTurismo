'use client';
import { ArrowUpRight, Target, BarChart3 } from 'lucide-react';

export default function ProjectCard({
  title,
  tags,
  image,
  description,
  category, // <--- Esta prop tem que estar aqui
  impactText,
  impactValues = [0.4, 0.7, 0.5, 0.9],
  onClick,
}: any) {
  return (
    <div
      onClick={onClick}
      className="group relative h-[600px] w-full rounded-[3.5rem] overflow-hidden cursor-pointer transition-all duration-700 bg-slate-950 border border-white/10 hover:-translate-y-4 hover:shadow-[0_40px_90px_rgba(0,0,0,0.3)]"
    >
      {/* Camada 1: Imagem */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-700" />
      </div>

      {/* Camada 2: Meta-dados (Topo) */}
      <div className="absolute top-10 left-10 right-10 flex justify-between items-start z-10">
        <div className="flex flex-wrap gap-2 max-w-[75%]">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black uppercase rounded-full tracking-widest group-hover:bg-blue-600 group-hover:border-transparent transition-all duration-500"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:rotate-45 transition-all duration-500 shadow-2xl">
          <ArrowUpRight className="w-6 h-6" />
        </div>
      </div>

      {/* Camada 3: Conteúdo Principal */}
      <div className="absolute bottom-12 left-12 right-12 z-10 transition-transform duration-500 group-hover:-translate-y-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:bg-white transition-colors duration-500">
            <Target className="w-4 h-4 text-white group-hover:text-blue-600" />
          </div>
          <span className="text-[11px] uppercase font-black tracking-[0.4em] text-blue-400 group-hover:text-white transition-colors">
            {category}
          </span>
        </div>

        <h3 className="text-4xl md:text-5xl font-playfair font-black mb-6 text-white leading-[1.1] drop-shadow-2xl">
          {title}
        </h3>

        <p className="text-white/70 text-base font-medium leading-relaxed group-hover:text-white transition-all duration-700 line-clamp-3 group-hover:line-clamp-none">
          {description}
        </p>

        {/* Footer: Dinâmico para cada projeto */}
        <div className="mt-8 pt-8 border-t border-white/10 group-hover:border-white/20 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">
              {impactText || 'Análise de Impacto Territorial'}
            </span>
          </div>
          <div className="flex gap-1.5 items-end h-4">
            {impactValues.map((val: number, i: number) => (
              <div
                key={i}
                className="w-1.5 bg-blue-500 rounded-full animate-pulse"
                style={{
                  height: `${val * 100}%`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
