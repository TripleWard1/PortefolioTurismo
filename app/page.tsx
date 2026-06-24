'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, MapPin, Plus, Globe } from 'lucide-react';

import Hero from './ui/Hero';
import Navbar from './ui/Navbar';
import ChapterOverlay from './ui/ChapterOverlay';
import ProgressRail from './ui/ProgressRail';
import Contact from './ui/Contact';
import CommandPalette from './ui/CommandPalette';
import ProjectIndex from './ui/ProjectIndex';
import { neighbours, getProject } from './ui/projects';
import { useLang } from './ui/LanguageContext';

export default function Page() {
  const { t, lang } = useLang();
  const [overlay, setOverlay] = useState({ isOpen: false, projectType: 'smart-tourism' });
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Abrir/fechar dossier com deep-link partilhável (#projeto/<id>)
  const openProject = (id: string, push = true) => {
    setOverlay({ isOpen: true, projectType: id });
    const hash = '#projeto/' + id;
    if (push) window.history.pushState({ id }, '', hash);
    else window.history.replaceState({ id }, '', hash);
  };
  const open = (id: string) => openProject(id, true);
  const closeOverlay = () => {
    setOverlay((o) => ({ ...o, isOpen: false }));
    if (window.location.hash.startsWith('#projeto/')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };
  const navProject = (id: string) => openProject(id, false);
  const goToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Sincroniza estado <-> URL (links partilhados + botão voltar)
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash;
      const id = h.startsWith('#projeto/') ? decodeURIComponent(h.slice('#projeto/'.length)) : '';
      if (id && getProject(id)) setOverlay({ isOpen: true, projectType: id });
      else setOverlay((o) => ({ ...o, isOpen: false }));
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  // Bloqueia scroll de fundo com o dossier aberto
  useEffect(() => {
    if (overlay.isOpen) document.body.style.overflow = 'hidden';
    else if (!paletteOpen) document.body.style.overflow = '';
  }, [overlay.isOpen, paletteOpen]);

  // Atalhos globais: ⌘K palette · ‹ › navegar dossiers · Esc fechar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if (paletteOpen) return;
      if (overlay.isOpen) {
        if (e.key === 'Escape') closeOverlay();
        else if (e.key === 'ArrowRight') navProject(neighbours(overlay.projectType).next.id);
        else if (e.key === 'ArrowLeft') navProject(neighbours(overlay.projectType).prev.id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [overlay.isOpen, overlay.projectType, paletteOpen]);

  const nb = neighbours(overlay.projectType);

  /* ---- Dados ---- */
  const positioning = [
    {
      id: 'smart-tourism',
      n: '01',
      title: 'Smart Tourism',
      location: t('Bruxelas / Braga', 'Brussels / Braga'),
      image: 'https://i.imgur.com/SvJ4bdR.jpeg',
      description: t(
        'Defesa da candidatura de Braga ao título de European Capital of Smart Tourism junto da Comissão Europeia.',
        'Defense of Braga’s candidacy for the European Capital of Smart Tourism title before the European Commission.'
      ),
      status: t('Finalista UE', 'EU Finalist'),
    },
    {
      id: 'small-retail-braga',
      n: '02',
      title: 'Small Retail',
      location: t('Candidatura 2026', '2026 Candidacy'),
      image:
        'https://transition-pathways.europa.eu/sites/default/files/styles/time_dependent_full/public/discussion_form_post/2025-12/ECOSR%20-%20Thumbnail_0.jpg?itok=1-QARVo7',
      description: t(
        'Dossiê técnico para a Capital Europeia do Comércio, focado na sustentabilidade do retalho local.',
        'Technical dossier for the European Capital of Small Retail, focused on local retail sustainability.'
      ),
      status: t('Económico', 'Economic'),
    },
    {
      id: 'braga-after-dark',
      n: '03',
      title: 'After Dark',
      location: t('Rede URBACT', 'URBACT Network'),
      image: 'https://i.imgur.com/mgdxHtt.jpeg',
      description: t(
        'Primeiro roteiro oficial e estratégia de governação para a vida noturna de Braga na rede europeia.',
        'First official roadmap and governance strategy for Braga’s nightlife within the European network.'
      ),
      status: t('Estratégico', 'Strategic'),
    },
    {
      id: 'music-cities-awards',
      n: '04',
      title: 'Music Cities',
      location: t('Arkansas, EUA', 'Arkansas, USA'),
      image: 'https://static.wixstatic.com/media/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg',
      description: t(
        'Posicionamento de Braga como referência mundial em políticas de música, com final global nos EUA.',
        'Positioning Braga as a global reference in music policy, with the global final in the USA.'
      ),
      status: t('Mundial', 'Worldwide'),
    },
  ];

  const fairs = [
    {
      id: 'fiets-wandelbeurs-gante',
      title: 'Fiets en Wandelbeurs',
      location: t('Gante, Bélgica', 'Ghent, Belgium'),
      image: 'https://i.imgur.com/tg4YOqy.png',
      tag: t('Turismo Ativo', 'Active Tourism'),
    },
    {
      id: 'expovacaciones-bilbao',
      title: 'ExpoVacaciones',
      location: t('Bilbao, Espanha', 'Bilbao, Spain'),
      image: 'https://i.imgur.com/JL0PcZe.png',
      tag: t('Estratégia Ibérica', 'Iberian Strategy'),
    },
    {
      id: 'b-travel-barcelona',
      title: 'B-Travel Barcelona',
      location: t('Barcelona, Espanha', 'Barcelona, Spain'),
      image: 'https://i.imgur.com/09Tm1r9.png',
      tag: t('Sul da Europa', 'Southern Europe'),
    },
  ];

  const digital = [
    {
      id: 'visit-braga',
      title: t('Portal Visit Braga', 'Visit Braga Portal'),
      location: t('Braga, Portugal', 'Braga, Portugal'),
      image: 'https://i.imgur.com/e0wCEWM.jpeg',
      description: t(
        'Conceção de UX e arquitetura de dados para a principal plataforma turística da cidade.',
        "UX design and data architecture for the city's main tourism platform."
      ),
      status: t('Conversão', 'Conversion'),
    },
    {
      id: 'systemeu-salamanca',
      title: 'SYSTEMEU',
      location: t('Salamanca / Braga', 'Salamanca / Braga'),
      image: 'https://imgur.com/SeyCGBk.jpg',
      description: t(
        'Redes de inovação inter-regionais para a transferência de conhecimento tecnológico.',
        'Inter-regional innovation networks for the transfer of technological knowledge.'
      ),
      status: t('Europeia', 'European'),
    },
  ];

  const heritage = [
    {
      id: 'cidade-bracvs',
      title: t('A Cidade do Bracvs', 'The City of Bracvs'),
      image: 'https://i.imgur.com/NRTWHRW.png',
      desc: t(
        'Roteiro lúdico-educativo para crianças e famílias, aproximando as novas gerações do património romano de Braga.',
        'Playful-educational itinerary for children and families, bringing new generations closer to Braga’s Roman heritage.'
      ),
      tag: t('Educação & Família', 'Education & Family'),
      year: '2025',
    },
    {
      id: 'roteiro-3-dias',
      title: t('Descobrir Braga em 3 Dias', 'Discover Braga in 3 Days'),
      image: 'https://i.imgur.com/yWtlcEL.png',
      desc: t(
        'Coordenação editorial e estrutural do guia oficial da cidade, otimizando fluxos turísticos e experiência do utilizador.',
        "Editorial and structural coordination of the city's official guide, optimizing tourist flows and user experience."
      ),
      tag: t('Coordenação Editorial', 'Editorial Coordination'),
      year: '2025',
    },
    {
      id: 'mapa-turistico-braga',
      title: t('Novo Mapa Territorial', 'New Territorial Map'),
      image: 'https://i.imgur.com/P54M1Ko.png',
      desc: t(
        'Desenvolvimento técnico e design de informação para o suporte cartográfico oficial da cidade.',
        'Technical development and information design for the city’s official cartographic support.'
      ),
      tag: t('Cartografia Técnica', 'Technical Cartography'),
      year: '2024',
    },
    {
      id: 'experiencias-sustentaveis',
      title: t('Experiências Sustentáveis', 'Sustainable Experiences'),
      image:
        'https://www.cm-braga.pt/archive/cache/img/sz800x600/CMB17012025SERGIOFREITAS3022624430274.jpg',
      desc: t(
        'Liderança técnica na conceção de 29 experiências turísticas, unindo identidade local e sustentabilidade.',
        'Technical leadership in designing 29 tourism experiences, combining local identity and sustainability.'
      ),
      tag: t('Gestão de Produto', 'Product Management'),
      year: '2025',
    },
  ];

  const metrics = [
    { v: '12', label: t('Dossiers estratégicos', 'Strategic dossiers') },
    { v: '04', label: t('Candidaturas europeias', 'European candidacies') },
    { v: '29', label: t('Experiências sustentáveis', 'Sustainable experiences') },
    { v: '2024-26', label: t('Horizonte de mandato', 'Mandate horizon') },
  ];

  return (
    <main className="relative min-h-screen bg-[var(--paper)] overflow-hidden">
      {/* REDE DE SEGURANÇA: variáveis de cor garantidas mesmo sem globals.css */}
      <style jsx global>{`
        :root {
          --ink: #0a1424;
          --ink-soft: #111d33;
          --ink-deep: #070d18;
          --paper: #f5f6f8;
          --paper-warm: #fbfcfd;
          --primary: #0a5cff;
          --sky: #2f80ff;
          --accent: #00c3ff;
        }
      `}</style>

      <div className="relative z-10">
        <Navbar onOpenPalette={() => setPaletteOpen(true)} />
        <ProgressRail />
        <Hero />

        {/* ============================================================ */}
        {/* FAIXA DE IMPACTO                                            */}
        {/* ============================================================ */}
        <section className="relative bg-[var(--ink)] text-white overflow-hidden">
          <div className="absolute inset-0 grid-dots text-white/[0.04]" />
          <div
            data-reveal="stagger"
            data-reveal-step="80"
            className="max-w-[1320px] mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-px relative z-10"
          >
            {metrics.map((m, i) => (
              <div key={i} className="relative px-6 py-4 lg:py-2">
                <div className="font-playfair text-3xl md:text-4xl font-black tracking-tight text-white">
                  {m.v}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 mt-2 leading-tight">
                  {m.label}
                </div>
                {i < metrics.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* CAPÍTULO 01 - POSICIONAMENTO GLOBAL                         */}
        {/* ============================================================ */}
        <section id="arquivo" className="relative py-24 md:py-28 overflow-hidden bg-[var(--paper)]">
          <div className="absolute inset-0 grid-dots text-slate-900/[0.05]" />
          <div className="max-w-[1320px] mx-auto px-6 relative z-10">
            <header data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-7 bg-[var(--primary)]" />
                  <span className="eyebrow text-[var(--primary)]">
                    {t('Capítulo 01 - Posicionamento', 'Chapter 01 - Positioning')}
                  </span>
                </div>
                <h2 className="display font-playfair font-black text-[var(--ink)] text-balance">
                  {t('Posicionamento', 'Global')}{' '}
                  <span className="italic font-light text-[var(--primary)]">
                    {t('Global.', 'Positioning.')}
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-slate-500 leading-relaxed border-l-2 border-slate-200 pl-5">
                  {t(
                    'Reforçar a presença de Braga no mapa das decisões europeias - transformando potencial em influência direta.',
                    'Strengthening Braga’s presence on the European decision-making map - turning potential into direct influence.'
                  )}
                </p>
              </div>
            </header>

            {/* Grelha de projetos compactos */}
            <div
              data-reveal="stagger"
              data-reveal-step="100"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {positioning.map((p) => (
                <article
                  key={p.id}
                  onClick={() => open(p.id)}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.2s] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                    <span className="absolute top-4 left-4 font-mono text-[10px] font-bold text-white/90 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full">
                      {p.n}
                    </span>
                    <span className="absolute top-4 right-4 font-mono text-[9px] font-bold uppercase tracking-widest text-white bg-black/30 backdrop-blur-md px-3 py-1 rounded-full">
                      {p.location}
                    </span>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-playfair text-2xl md:text-3xl font-black text-white leading-none tracking-tight">
                        {p.title}
                        <span className="text-[var(--sky)]">.</span>
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-[15px] text-slate-500 leading-relaxed flex-1">
                        {p.description}
                      </p>
                      <span className="shrink-0 px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--primary)]">
                        {p.status}
                      </span>
                    </div>
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        {t('Abrir dossier', 'Open dossier')}
                      </span>
                      <span className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)] transition-all duration-500">
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Representação internacional (feiras) */}
            <div data-reveal className="mt-20">
              <div className="flex items-center gap-3 mb-6">
                <span className="eyebrow text-slate-400">
                  {t('Representação Internacional', 'International Representation')}
                </span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {fairs.map((f) => (
                  <article
                    key={f.id}
                    onClick={() => open(f.id)}
                    className="group relative h-44 rounded-2xl overflow-hidden cursor-pointer border border-slate-200"
                  >
                    <img
                      src={f.image}
                      alt={f.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.2s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)]/90 via-[var(--ink)]/40 to-transparent" />
                    <div className="relative h-full p-6 flex flex-col justify-center">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--sky)] mb-2">
                        {f.tag}
                      </span>
                      <h4 className="font-playfair text-2xl font-bold text-white leading-tight">
                        {f.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2 text-white/60">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="font-mono text-[10px] uppercase tracking-widest">
                          {f.location}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CAPÍTULO 02 - ECOSSISTEMA DIGITAL                           */}
        {/* ============================================================ */}
        <section id="capitulo-02" className="relative py-24 md:py-28 overflow-hidden bg-[var(--ink)]">
          <div className="absolute inset-0 grid-dots text-[var(--sky)]/[0.06]" />
          <div className="max-w-[1320px] mx-auto px-6 relative z-10">
            <header data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-7 bg-[var(--sky)]" />
                  <span className="eyebrow text-[var(--sky)]">
                    {t('Capítulo 02 - Digital', 'Chapter 02 - Digital')}
                  </span>
                </div>
                <h2 className="display font-playfair font-black text-white text-balance">
                  {t('Ecossistema', 'Digital')}{' '}
                  <span className="italic font-light text-[var(--sky)]">
                    {t('Digital.', 'Ecosystem.')}
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-white/45 leading-relaxed border-l-2 border-white/15 pl-5">
                  {t(
                    'Infraestrutura tecnológica e governação de dados para suportar a nova economia urbana.',
                    'Technological infrastructure and data governance to support the new urban economy.'
                  )}
                </p>
              </div>
            </header>

            <div
              data-reveal="stagger"
              data-reveal-step="120"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {digital.map((p) => (
                <article
                  key={p.id}
                  onClick={() => open(p.id)}
                  className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-[var(--ink-deep)] transition-all duration-500 hover:-translate-y-1.5"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-[1.4s]"
                  />
                  {/* Scrim uniforme: garante leitura mesmo com imagens claras */}
                  <div className="absolute inset-0 bg-[var(--ink-deep)]/70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink-deep)] via-[var(--ink-deep)]/30 to-transparent" />
                  <div className="relative h-full p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[var(--sky)] bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                        {p.location}
                      </span>
                      <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[var(--primary)] transition-all duration-500">
                        <ArrowUpRight className="w-4 h-4 text-white group-hover:rotate-45 transition-transform" />
                      </span>
                    </div>
                    <div>
                      <h3 className="font-playfair text-4xl font-black text-white leading-none tracking-tight mb-4">
                        {p.title}
                        <span className="text-[var(--sky)]">.</span>
                      </h3>
                      <div className="flex items-end justify-between gap-4">
                        <p className="text-white/70 text-[15px] leading-relaxed max-w-xs">
                          {p.description}
                        </p>
                        <span className="shrink-0 font-playfair text-lg italic font-bold text-[var(--sky)] border-l border-white/15 pl-4">
                          {p.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CAPÍTULO 03 - HERANÇA & FUTURO                              */}
        {/* ============================================================ */}
        <section id="estratégia" className="relative py-24 md:py-32 overflow-hidden bg-[var(--paper-warm)]">
          <div className="absolute inset-0 grid-dots text-slate-900/[0.05]" />
          <div className="max-w-[1320px] mx-auto px-6 relative z-10">
            <header data-reveal className="mb-20 max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-7 bg-[var(--primary)]" />
                <span className="eyebrow text-[var(--primary)]">
                  {t('Capítulo 03 - Produto & Identidade', 'Chapter 03 - Product & Identity')}
                </span>
              </div>
              <h2 className="display font-playfair font-black text-[var(--ink)] text-balance">
                {t('Herança &', 'Heritage &')}{' '}
                <span className="italic font-light text-[var(--primary)]">
                  {t('Futuro.', 'Future.')}
                </span>
              </h2>
              <p className="text-slate-500 leading-relaxed mt-5">
                {t(
                  'Produtos editoriais e experiências que ligam o património milenar de Braga às novas gerações.',
                  'Editorial products and experiences linking Braga’s millennial heritage to new generations.'
                )}
              </p>
            </header>

            <div className="space-y-24 md:space-y-32">
              {heritage.map((p, idx) => (
                <div
                  key={p.id}
                  data-reveal="fade"
                  onClick={() => open(p.id)}
                  className={`group flex flex-col ${
                    idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } items-center gap-10 lg:gap-16 cursor-pointer`}
                >
                  {/* Imagem */}
                  <div className="lg:w-7/12 w-full relative">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.4s] ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/30 to-transparent" />
                      <span className="absolute top-5 left-5 font-mono text-[9px] font-bold text-white bg-black/30 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-widest">
                        {p.year}
                      </span>
                    </div>
                  </div>

                  {/* Texto */}
                  <div className="lg:w-5/12 w-full space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] font-bold text-[var(--primary)]">
                        0{idx + 1} / 04
                      </span>
                      <span className="h-px flex-1 bg-slate-200" />
                      <span className="eyebrow text-slate-400">{p.tag}</span>
                    </div>
                    <h3 className="h1 font-playfair font-bold text-[var(--ink)] text-balance">
                      {p.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">{p.desc}</p>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] transition-all duration-500">
                        <Plus className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:rotate-90 transition-all duration-500" />
                      </span>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                          {t('Explorar', 'Explore')}
                        </span>
                        <span className="text-[13px] font-bold text-slate-800">
                          {t('Dossier completo', 'Full dossier')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Nota institucional de fecho */}
            <div
              data-reveal
              className="mt-28 rounded-3xl bg-[var(--ink)] text-white p-10 md:p-14 relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 opacity-10">
                <Globe className="w-64 h-64 text-[var(--sky)] -mr-16 -mt-16" />
              </div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <span className="eyebrow text-[var(--sky)]">
                    {t('Estratégia Territorial', 'Territorial Strategy')}
                  </span>
                  <p className="font-playfair text-2xl md:text-3xl font-medium leading-snug mt-4 text-balance">
                    {t(
                      'Cada projeto é uma peça da mesma visão: consolidar Braga como referência europeia de turismo inteligente e território.',
                      'Every project is a piece of the same vision: consolidating Braga as a European reference in smart tourism and territory.'
                    )}
                  </p>
                </div>
                <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
                  {[t('Networking', 'Networking'), t('Inovação', 'Innovation'), t('Governação', 'Governance')].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="font-mono px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProjectIndex onOpenProject={open} />

        <Contact />
      </div>

      <ChapterOverlay
        isOpen={overlay.isOpen}
        projectType={overlay.projectType}
        onClose={closeOverlay}
        onPrev={() => navProject(nb.prev.id)}
        onNext={() => navProject(nb.next.id)}
        prevTitle={lang === 'pt' ? nb.prev.pt : nb.prev.en}
        nextTitle={lang === 'pt' ? nb.next.pt : nb.next.en}
      />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenProject={open}
        onGoSection={goToSection}
      />
    </main>
  );
}