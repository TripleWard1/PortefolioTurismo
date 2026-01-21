'use client';

import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  PlusIcon,
  Plus,
  Map,
  BarChart3,
  Globe,
  ChevronRight,
} from 'lucide-react';

import Hero from './ui/Hero';
import Navbar from './ui/Navbar';
import ProjectCard from './ui/ProjectCard';
import ChapterOverlay from './ui/ChapterOverlay';
import Contact from './ui/Contact';

export default function Page() {
  const [overlayData, setOverlayData] = useState<any>({
    isOpen: false,
    title: '',
    category: '',
    content: null,
    projectType: 'smart-tourism',
  });

  return (
    <main className="relative min-h-screen bg-[#f1f3f5] overflow-hidden">
      {/* Background Decorativo Global */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-200/40 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-slate-300/50 blur-[130px] rounded-full" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <Hero />

        {/* --------------------------------------------------------------------------- */}
        {/* CAPÍTULO 01: POSICIONAMENTO GLOBAL (Immersive Premium Edition) */}
        {/* --------------------------------------------------------------------------- */}
        <section
          id="arquivo"
          className="relative py-24 overflow-hidden border-b border-slate-200"
          style={{ backgroundColor: '#f8fafc' }}
        >
          {/* Fundo de pontos reforçado para máxima profundidade */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage: `radial-gradient(#0f172a 1.5px, transparent 1.5px)`,
                backgroundSize: '32px 32px',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          </div>

          <div className="max-w-[1440px] mx-auto px-6 relative z-10">
            {/* HEADER ORIGINAL (Preservado) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-8 bg-blue-600" />
                  <span className="text-[11px] font-black tracking-[0.4em] uppercase text-blue-600">
                    Capítulo 01 / Estratégia
                  </span>
                </div>
                <h2 className="text-6xl md:text-[100px] font-playfair font-black text-slate-900 leading-[0.85] tracking-tighter">
                  Posicionamento <br />
                  <span className="text-blue-600 italic font-light">
                    Global.
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-4 pb-4">
                <p className="text-slate-500 text-lg font-light leading-relaxed border-l-2 border-slate-200 pl-6">
                  Reforçar a presença de Braga no mapa das decisões europeias,
                  transformando potencial em influência direta.
                </p>
              </div>
            </div>

            {/* GRELHA DE PROJETOS - CARDS IMERSIVOS REFINADOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
              {[
                {
                  id: 'smart-tourism',
                  title: 'Smart Tourism',
                  location: 'Bruxelas / Braga',
                  image: 'https://i.imgur.com/SvJ4bdR.jpeg',
                  description:
                    'Defesa estratégica da candidatura de Braga ao título de European Capital of Smart Tourism junto da Comissão Europeia.',
                  metrics: { label: 'Status', value: 'Nível Alto' },
                },
                {
                  id: 'small-retail-braga',
                  title: 'Small Retail',
                  location: 'Candidatura 2026',
                  image:
                    'https://transition-pathways.europa.eu/sites/default/files/styles/time_dependent_full/public/discussion_form_post/2025-12/ECOSR%20-%20Thumbnail_0.jpg?itok=1-QARVo7',
                  description:
                    'Desenvolvimento do dossiê técnico para a Capital Europeia do Comércio, focando na sustentabilidade do retalho local.',
                  metrics: { label: 'Impacto', value: 'Económico' },
                },
                {
                  id: 'braga-after-dark',
                  title: 'After Dark',
                  location: 'Rede URBACT',
                  image: 'https://i.imgur.com/mgdxHtt.jpeg',
                  description:
                    'Criação do primeiro roteiro oficial e estratégia de governação para a vida noturna de Braga dentro da rede europeia.',
                  metrics: { label: 'Foco', value: 'Estratégico' },
                },
                {
                  id: 'music-cities-awards',
                  title: 'Music Cities',
                  location: 'Arkansas, EUA',
                  image:
                    'https://static.wixstatic.com/media/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg',
                  description:
                    'Posicionamento de Braga como referência mundial em políticas de música, culminando na final global nos Estados Unidos.',
                  metrics: { label: 'Alcance', value: 'Mundial' },
                },
              ].map((p) => (
                <div
                  key={p.id}
                  className="group cursor-pointer relative"
                  onClick={() =>
                    setOverlayData({ isOpen: true, projectType: p.id })
                  }
                >
                  {/* Card Container com profundidade máxima */}
                  <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/5 shadow-2xl transition-all duration-700 hover:shadow-blue-900/20 group-hover:-translate-y-3">
                    {/* Image Section com Zoom e Overlay cinemático */}
                    <div className="relative aspect-[16/10] overflow-hidden m-2 rounded-[2rem]">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-[3s] cubic-bezier(0.2, 0, 0.2, 1) group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />

                      <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em]">
                          {p.location}
                        </span>
                      </div>

                      <div className="absolute bottom-10 left-10 overflow-hidden">
                        <h3 className="text-5xl lg:text-7xl font-playfair font-black text-white leading-[0.9] tracking-tighter transition-all duration-700 group-hover:tracking-normal">
                          {p.title}
                          <span className="inline-block w-2 h-2 rounded-full bg-blue-600 ml-2 shadow-[0_0_15px_rgba(37,99,235,1)]" />
                        </h3>
                        <div className="h-[1px] w-0 bg-white/30 mt-4 group-hover:w-full transition-all duration-1000 delay-100" />
                      </div>
                    </div>

                    <div className="px-10 py-12 bg-slate-950 relative">
                      <div className="flex flex-col gap-10 relative z-10">
                        <div className="flex justify-between items-start gap-8">
                          <div className="space-y-4 flex-1">
                            <p className="text-slate-400 text-[17px] font-light leading-relaxed max-w-[90%] group-hover:text-slate-300 transition-colors">
                              {p.description}
                            </p>
                          </div>

                          <div className="flex flex-col items-end border-r border-blue-600/40 pr-8">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">
                              {p.metrics.label}
                            </span>
                            <span className="text-2xl font-playfair font-black text-white italic leading-none group-hover:text-blue-400 transition-colors">
                              {p.metrics.value}
                            </span>
                          </div>
                        </div>

                        <div className="relative h-[1px] w-full bg-white/10 overflow-hidden">
                          <div className="absolute top-0 left-0 h-full bg-blue-500 w-0 group-hover:w-full transition-all duration-[2s] cubic-bezier(0.5, 0, 0, 1)" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-10 right-10">
                      <div className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:scale-110 shadow-2xl">
                        <ArrowUpRight className="text-white w-6 h-6 transition-all duration-500 group-hover:text-slate-900 group-hover:rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SEPARATOR / FOOTER (Atualizado com Scroll e Novo Texto) */}
            <div className="mt-32 flex flex-col items-center">
              <div className="h-24 w-[1px] bg-gradient-to-b from-slate-300 to-transparent mb-10" />
              <button
                onClick={() =>
                  document
                    .getElementById('capitulo-02')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="flex items-center gap-6 group"
              >
                <span className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 group-hover:text-slate-900 transition-colors">
                  Continuar para Ecossistema Digital
                </span>
                <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-700 shadow-xl">
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-2" />
                </div>
              </button>
            </div>
          </div>
        </section>
        {/* --------------------------------------------------------------------------- */}
        {/* CAPÍTULO 02: ECOSSISTEMA DIGITAL (Uniform Immersive Grid) */}
        {/* --------------------------------------------------------------------------- */}
        <section
          id="capitulo-02"
          className="relative py-32 overflow-hidden"
          style={{ backgroundColor: '#0f172a' }}
        >
          {/* Fundo de pontos reforçado */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage: `radial-gradient(#3b82f6 1.5px, transparent 1.5px)`,
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          <div className="max-w-[1440px] mx-auto px-6 relative z-10">
            {/* HEADER DO CAPÍTULO */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-8 bg-blue-500" />
                  <span className="text-[11px] font-black tracking-[0.4em] uppercase text-blue-500">
                    Capítulo 02 / Digital
                  </span>
                </div>
                <h2 className="text-6xl md:text-[100px] font-playfair font-black text-white leading-[0.85] tracking-tighter">
                  Ecossistema <br />
                  <span className="text-blue-500 italic font-light">
                    Digital.
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-4 pb-4">
                <p className="text-slate-400 text-lg font-light leading-relaxed border-l-2 border-blue-900/50 pl-6">
                  Criação de infraestrutura tecnológica e governação de dados
                  para suportar a nova economia urbana.
                </p>
              </div>
            </div>

            {/* GRELHA UNIFORME DE PROJETOS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                {
                  id: 'portal-visit-braga',
                  title: 'Portal Visit Braga',
                  location: 'Braga, Portugal',
                  image:
                    'https://visitbraga.travel/wp-content/uploads/2025/05/visit-braga.jpg',
                  description:
                    'Conceção de UX e arquitetura de dados para a principal plataforma turística da cidade.',
                  metrics: { label: 'Foco', value: 'Conversão' },
                },
                {
                  id: 'systemeu-salamanca',
                  title: 'SYSTEMEU',
                  location: 'Salamanca / Braga',
                  image: 'https://imgur.com/SeyCGBk.jpg', // Adicionado .jpg para garantir renderização no card
                  description:
                    'Redes de inovação inter-regionais para a transferência de conhecimento tecnológico.',
                  metrics: { label: 'Rede', value: 'Europeia' },
                },
              ].map((p) => (
                <div
                  key={p.id}
                  className="group cursor-pointer relative"
                  onClick={() =>
                    setOverlayData({ isOpen: true, projectType: p.id })
                  }
                >
                  <div className="relative h-[600px] overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/5 shadow-2xl transition-all duration-700 hover:shadow-blue-500/10 group-hover:-translate-y-2">
                    {/* Image Section */}
                    <div className="absolute inset-0">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover opacity-60 transition-transform duration-[3s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    </div>

                    {/* Conteúdo sobreposto para máxima imersão */}
                    <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
                      <div className="flex justify-between items-start">
                        <div className="px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">
                            {p.location}
                          </span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500">
                          <ArrowUpRight className="text-white w-5 h-5 group-hover:rotate-45 transition-transform" />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-5xl lg:text-6xl font-playfair font-black text-white leading-none tracking-tighter">
                          {p.title}
                          <span className="text-blue-500">.</span>
                        </h3>

                        <div className="flex flex-col xl:flex-row justify-between items-end gap-6">
                          <p className="text-slate-300 text-lg font-light leading-relaxed max-w-sm">
                            {p.description}
                          </p>

                          <div className="flex flex-col items-end border-r-2 border-blue-600/50 pr-6 shrink-0">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                              {p.metrics.label}
                            </span>
                            <span className="text-2xl font-playfair font-bold text-white italic">
                              {p.metrics.value}
                            </span>
                          </div>
                        </div>

                        <div className="relative h-[1px] w-full bg-white/10 overflow-hidden">
                          <div className="absolute top-0 left-0 h-full bg-blue-500 w-0 group-hover:w-full transition-all duration-[2s]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* BOTÃO DE CONTINUIDADE */}
            <div className="mt-24 flex flex-col items-center">
              <div className="h-24 w-[1px] bg-gradient-to-b from-blue-900 to-transparent mb-10" />
              <button
                onClick={() =>
                  document
                    .getElementById('capitulo-03')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="flex items-center gap-6 group"
              >
                <span className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-500 group-hover:text-white transition-colors">
                  Continuar para Governação Urbana
                </span>
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-700">
                  <ArrowRight className="w-5 h-5 text-white group-hover:text-slate-900 transition-transform group-hover:translate-x-2" />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------------------- */}
        {/* CAPÍTULO 03: HERANÇA & FUTURO (Floating Editorial Canvas) */}
        {/* --------------------------------------------------------------------------- */}
        <section
          id="estratégia"
          className="py-40 relative overflow-hidden"
          style={{ backgroundColor: '#fcfcf9' }}
        >
          {/* BACKGROUND TEXTURE: Pontinhos */}
          <div
            className="absolute inset-0 opacity-[0.25] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(#1e293b 1.5px, transparent 1.5px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Elemento Decorativo de Fundo (Grande Texto) */}
          <div className="absolute right-[-5%] top-1/4 pointer-events-none opacity-[0.03] select-none">
            <h2 className="text-[25vw] font-playfair font-black rotate-90 origin-center leading-none">
              HERITAGE
            </h2>
          </div>

          <div className="max-w-[1440px] mx-auto px-6 relative z-10">
            {/* HEADER EDITORIAL */}
            <div className="flex flex-col items-center text-center mb-40">
              <div className="inline-block px-6 py-2 border border-slate-200 bg-white/50 backdrop-blur-sm rounded-full mb-10 shadow-sm">
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-slate-500">
                  Capítulo 03 / Produto & Identidade
                </span>
              </div>
              <h2 className="text-7xl md:text-[140px] font-playfair font-black text-slate-900 leading-[0.8] tracking-tighter">
                Herança & <br />
                <span className="text-blue-600 italic font-light">Futuro.</span>
              </h2>
            </div>

            {/* PROJETOS PRINCIPAIS */}
            <div className="space-y-64">
              {[
                {
                  id: 'cidade-bracvs',
                  title: 'A Cidade do Bracvs',
                  image:
                    'https://visitbraga.travel/wp-content/uploads/2025/07/guia-infantil.jpg',
                  desc: 'Roteiro lúdico-educativo para crianças e famílias. Conteúdos concebidos para aproximar as novas gerações do património romano de Braga.',
                  align: 'left',
                  tag: 'Educação & Família',
                  year: '2025',
                  coord: '41.5503° N, 8.4200° W',
                },
                {
                  id: 'roteiro-3-dias',
                  title: 'Descobrir Braga em 3 Dias',
                  image:
                    'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-3-Dias-PT.webp',
                  desc: 'Coordenação editorial, factual e estrutural do guia oficial da cidade. Foco na otimização de fluxos turísticos e experiência do utilizador.',
                  align: 'right',
                  tag: 'Coordenação Editorial',
                  year: '2025',
                  coord: '41.5450° N, 8.4260° W',
                },
                {
                  id: 'mapa-turistico-braga',
                  title: 'Novo Mapa Territorial',
                  image:
                    'https://visitbraga.travel/wp-content/uploads/2025/11/Captura-de-ecra-2025-11-05-144144-768x724.png',
                  desc: 'Desenvolvimento técnico e design de informação para o suporte cartográfico oficial, unindo precisão geográfica e identidade visual.',
                  align: 'left',
                  tag: 'Cartografia Técnica',
                  year: '2024',
                  coord: '41.5480° N, 8.4300° W',
                },
              ].map((p, idx) => (
                <div
                  key={p.id}
                  className={`flex flex-col ${
                    p.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } items-center gap-20 group relative`}
                  onClick={() =>
                    setOverlayData({ isOpen: true, projectType: p.id })
                  }
                >
                  <div className="lg:w-7/12 relative cursor-pointer">
                    <div
                      className={`absolute -top-10 ${
                        p.align === 'right' ? '-right-10' : '-left-10'
                      } w-40 h-40 border border-blue-600/20 rounded-full flex items-center justify-center animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    >
                      <div className="w-1 h-1 bg-blue-600 rounded-full" />
                      <div className="absolute inset-0 border-t-2 border-blue-600 rounded-full" />
                    </div>
                    <div
                      className={`absolute -top-4 ${
                        p.align === 'right' ? 'left-0' : 'right-0'
                      } z-20`}
                    >
                      <span className="text-[9px] font-mono text-blue-600 bg-white/80 px-2 py-1 backdrop-blur-sm border border-blue-100 opacity-0 group-hover:opacity-100 transition-all duration-700">
                        {p.coord}
                      </span>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl transition-all duration-1000 group-hover:shadow-blue-500/30 group-hover:-translate-y-2 z-10">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2.5s] ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-white/10 opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
                      <div
                        className={`absolute top-8 ${
                          p.align === 'right' ? 'right-8' : 'left-8'
                        } px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full`}
                      >
                        <span className="text-[10px] font-black text-white tracking-widest uppercase">
                          {p.year}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`absolute -bottom-16 ${
                        p.align === 'right' ? '-left-16' : '-right-16'
                      } text-[200px] font-playfair font-black leading-none pointer-events-none select-none transition-all duration-1000
                text-transparent bg-clip-text bg-gradient-to-b from-slate-200/50 to-transparent group-hover:from-blue-200 group-hover:scale-110 z-0`}
                    >
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="lg:w-5/12 space-y-10 relative">
                    <div className="absolute -left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-600/30 to-transparent hidden lg:block" />
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-blue-600 group-hover:w-20 transition-all duration-700" />
                        <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">
                          {p.tag}
                        </span>
                      </div>
                      <h3 className="text-6xl lg:text-[80px] font-playfair font-bold text-slate-900 tracking-tighter leading-[0.85]">
                        {p.title.split(' ').map((word, i) => (
                          <span
                            key={i}
                            className="block group-hover:translate-x-4 transition-transform duration-700"
                            style={{ transitionDelay: `${i * 100}ms` }}
                          >
                            {word}
                          </span>
                        ))}
                      </h3>
                    </div>
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-100 group-hover:bg-blue-600 transition-colors duration-700" />
                      <p className="text-slate-500 text-xl font-light leading-relaxed max-w-md">
                        {p.desc}
                      </p>
                    </div>
                    <button className="flex items-center gap-6 group/btn pt-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-500 group-hover/btn:border-blue-600 group-hover/btn:scale-110">
                          <PlusIcon className="w-6 h-6 text-slate-400 group-hover/btn:text-blue-600 group-hover/btn:rotate-90 transition-all duration-500" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping scale-75 opacity-0 group-hover/btn:opacity-100" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/btn:text-blue-600 transition-colors">
                          Explorar
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          Projecto Completo
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SECCÃO INSTITUCIONAL */}
            <div className="mt-72">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24">
                <div className="lg:col-span-7">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600 mb-8 flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-blue-600" /> Global
                    Networking
                  </h4>
                  <h3 className="text-6xl md:text-8xl font-playfair font-bold text-slate-900 tracking-tighter leading-[0.9]">
                    Presença <br />
                    <span className="italic font-light text-slate-400">
                      Institucional.
                    </span>
                  </h3>
                </div>
                <div className="lg:col-span-5 lg:pb-4">
                  <p className="text-slate-500 text-lg font-light leading-relaxed border-l-2 border-blue-600 pl-8">
                    Curadoria estratégica e representação técnica em certames
                    europeus, posicionando Braga como destino de excelência em
                    mercados de alto valor.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Intro Card - ALTERADO CONFORME PEDIDO */}
                <div className="bg-slate-900 rounded-[3rem] p-12 flex flex-col justify-between text-white relative overflow-hidden group transition-all duration-700 hover:shadow-2xl hover:shadow-blue-900/40">
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 border border-white/5">
                      <Globe className="w-10 h-10 text-blue-400" />
                    </div>
                    <p className="text-4xl font-playfair font-medium leading-tight">
                      Expansão e <br />
                      <span className="text-blue-400 italic">
                        Estratégia
                      </span>{' '}
                      Territorial.
                    </p>
                  </div>
                  <div className="mt-20 relative z-10 flex flex-wrap gap-2">
                    {['Networking', 'Promoção', 'Mercados'].map((t) => (
                      <span
                        key={t}
                        className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-200 backdrop-blur-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="w-64 h-64 border-[1px] border-blue-400 rounded-full -mr-32 -mb-32" />
                  </div>
                </div>

                {/* Feiras */}
                {[
                  {
                    id: 'fiets-wandelbeurs-gante',
                    title: 'Fiets en Wandelbeurs',
                    location: 'Gante, Bélgica',
                    image: 'https://i.imgur.com/tg4YOqy.png',
                    tag: 'Turismo Ativo',
                  },
                  {
                    id: 'expovacaciones-bilbao',
                    title: 'ExpoVacaciones',
                    location: 'Bilbao, Espanha',
                    image: 'https://i.imgur.com/JL0PcZe.png',
                    tag: 'Estratégia Ibérica',
                  },
                ].map((inst) => (
                  <div
                    key={inst.id}
                    onClick={() =>
                      setOverlayData({ isOpen: true, projectType: inst.id })
                    }
                    className="group relative h-[500px] bg-slate-100 rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-700 hover:shadow-2xl border border-slate-200"
                  >
                    <img
                      src={inst.image}
                      alt={inst.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent h-20 w-full -translate-y-full group-hover:animate-scan z-20 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
                    <div className="absolute top-8 left-8 w-6 h-6 border-l border-t border-blue-400/50 group-hover:w-10 group-hover:h-10 transition-all duration-700 z-30" />
                    <div className="absolute top-8 right-8 w-6 h-6 border-r border-t border-blue-400/50 group-hover:w-10 group-hover:h-10 transition-all duration-700 z-30" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end z-30">
                      <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                        <div className="flex items-center gap-3">
                          <div className="h-px w-8 bg-blue-400 group-hover:w-12 transition-all duration-700" />
                          <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em]">
                            {inst.tag}
                          </span>
                        </div>
                        <h5 className="text-4xl lg:text-5xl font-playfair font-bold text-white leading-[1.1]">
                          {inst.title}
                        </h5>
                        <div className="flex items-center justify-between pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-400" />
                            <span className="text-white text-[10px] font-black uppercase tracking-widest">
                              {inst.location}
                            </span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-blue-600/20 backdrop-blur-md flex items-center justify-center border border-blue-400/50 group-hover:bg-blue-600 transition-colors">
                            <PlusIcon className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 border-[0px] group-hover:border-[1px] border-blue-500/30 transition-all duration-500 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </div>{' '}
      {/* Este fecha a div que envolve as secções, se houver uma */}
      <ChapterOverlay
        isOpen={overlayData.isOpen}
        projectType={overlayData.projectType}
        onClose={() => setOverlayData({ ...overlayData, isOpen: false })}
      />
    </main>
  );
}
