'use client';

import { useState } from 'react';
import { ArrowRight, ArrowUpRight, MapPin, PlusIcon, Globe } from 'lucide-react';

import Hero from './ui/Hero';
import Navbar from './ui/Navbar';
import ChapterOverlay from './ui/ChapterOverlay';
import ProgressRail from './ui/ProgressRail';
import Contact from './ui/Contact';
import { useLang } from './ui/LanguageContext';

export default function Page() {
  const { t } = useLang();
  const [overlayData, setOverlayData] = useState<any>({
    isOpen: false,
    projectType: 'smart-tourism',
  });

  const open = (projectType: string) =>
    setOverlayData({ isOpen: true, projectType });

  return (
    <main className="relative min-h-screen bg-[var(--paper)] overflow-hidden">
      {/* -------------------------------------------------------------- */}
      {/* REDE DE SEGURANÇA: garante que as variáveis de cor existem      */}
      {/* mesmo que o globals.css novo não esteja ativo. Sem isto, as     */}
      {/* superfícies escuras (var(--ink)) ficavam transparentes.        */}
      {/* -------------------------------------------------------------- */}
      <style jsx global>{`
        :root {
          --ink: #0a1424;
          --ink-soft: #111d33;
          --paper: #f6f7f9;
          --paper-warm: #fbfcfd;
          --primary: #0a5cff;
          --sky: #2f80ff;
          --accent: #00c3ff;
        }
      `}</style>

      {/* Background decorativo global */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-200/40 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-slate-300/50 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <ProgressRail />
        <Hero />

        {/* ================================================================ */}
        {/* CAPÍTULO 01 — POSICIONAMENTO GLOBAL                              */}
        {/* ================================================================ */}
        <section
          id="arquivo"
          className="relative py-24 md:py-32 overflow-hidden border-b border-slate-200"
          style={{ backgroundColor: '#f8fafc' }}
        >
          {/* Grelha cartográfica de fundo */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.13]"
              style={{
                backgroundImage: 'radial-gradient(#0f172a 1.5px, transparent 1.5px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          </div>

          <div className="max-w-[1440px] mx-auto px-6 relative z-10">
            {/* Header */}
            <div
              data-reveal
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end"
            >
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-8 bg-[var(--primary)]" />
                  <span className="font-mono text-[11px] font-black tracking-[0.4em] uppercase text-[var(--primary)]">
                    {t('Capítulo 01 / Estratégia', 'Chapter 01 / Strategy')}
                  </span>
                </div>
                <h2 className="text-6xl md:text-[100px] font-playfair font-black text-slate-900 leading-[0.85] tracking-tighter text-balance">
                  {t('Posicionamento', 'Global')} <br />
                  <span className="text-[var(--primary)] italic font-light">
                    {t('Global.', 'Positioning.')}
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-4 pb-4">
                <p className="text-slate-500 text-lg font-light leading-relaxed border-l-2 border-slate-200 pl-6">
                  {t(
                    'Reforçar a presença de Braga no mapa das decisões europeias, transformando potencial em influência direta.',
                    'Strengthening Braga’s presence on the European decision-making map, transforming potential into direct influence.'
                  )}
                </p>
              </div>
            </div>

            {/* Grelha de projetos */}
            <div
              data-reveal="stagger"
              data-reveal-step="120"
              className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14"
            >
              {[
                {
                  id: 'smart-tourism',
                  title: 'Smart Tourism',
                  location: t('Bruxelas / Braga', 'Brussels / Braga'),
                  image: 'https://i.imgur.com/SvJ4bdR.jpeg',
                  description: t(
                    'Defesa estratégica da candidatura de Braga ao título de European Capital of Smart Tourism junto da Comissão Europeia.',
                    'Strategic defense of Braga’s candidacy for the European Capital of Smart Tourism title before the European Commission.'
                  ),
                  metrics: { label: t('Status', 'Status'), value: t('Nível Alto', 'High Level') },
                },
                {
                  id: 'small-retail-braga',
                  title: 'Small Retail',
                  location: t('Candidatura 2026', '2026 Candidacy'),
                  image:
                    'https://transition-pathways.europa.eu/sites/default/files/styles/time_dependent_full/public/discussion_form_post/2025-12/ECOSR%20-%20Thumbnail_0.jpg?itok=1-QARVo7',
                  description: t(
                    'Desenvolvimento do dossiê técnico para a Capital Europeia do Comércio, focando na sustentabilidade do retalho local.',
                    'Development of the technical dossier for the European Capital of Small Retail, focusing on local retail sustainability.'
                  ),
                  metrics: { label: t('Impacto', 'Impact'), value: t('Económico', 'Economic') },
                },
                {
                  id: 'braga-after-dark',
                  title: 'After Dark',
                  location: t('Rede URBACT', 'URBACT Network'),
                  image: 'https://i.imgur.com/mgdxHtt.jpeg',
                  description: t(
                    'Criação do primeiro roteiro oficial e estratégia de governação para a vida noturna de Braga dentro da rede europeia.',
                    'Creation of the first official roadmap and governance strategy for Braga’s nightlife within the European network.'
                  ),
                  metrics: { label: t('Foco', 'Focus'), value: t('Estratégico', 'Strategic') },
                },
                {
                  id: 'music-cities-awards',
                  title: 'Music Cities',
                  location: t('Arkansas, EUA', 'Arkansas, USA'),
                  image:
                    'https://static.wixstatic.com/media/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg',
                  description: t(
                    'Posicionamento de Braga como referência mundial em políticas de música, culminando na final global nos Estados Unidos.',
                    'Positioning Braga as a global reference in music policies, culminating in the global final in the United States.'
                  ),
                  metrics: { label: t('Alcance', 'Reach'), value: t('Mundial', 'Worldwide') },
                },
              ].map((p) => (
                <div
                  key={p.id}
                  className="group cursor-pointer relative"
                  onClick={() => open(p.id)}
                >
                  <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--ink)] border border-white/5 shadow-2xl transition-all duration-700 hover:shadow-blue-900/20 group-hover:-translate-y-3">
                    {/* Marca de registo cartográfica */}
                    <div className="absolute top-7 left-7 z-20 w-5 h-5 border-l border-t border-[var(--sky)]/40 group-hover:w-8 group-hover:h-8 transition-all duration-700 pointer-events-none" />

                    {/* Imagem */}
                    <div className="relative aspect-[16/10] overflow-hidden m-2 rounded-[2rem]">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />

                      <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[var(--ink)]/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
                        <span className="font-mono text-[9px] font-black text-[var(--sky)] uppercase tracking-[0.2em]">
                          {p.location}
                        </span>
                      </div>

                      <div className="absolute bottom-10 left-10 overflow-hidden">
                        <h3 className="text-5xl lg:text-7xl font-playfair font-black text-white leading-[0.9] tracking-tighter transition-all duration-700 group-hover:tracking-normal">
                          {p.title}
                          <span className="inline-block w-2 h-2 rounded-full bg-[var(--primary)] ml-2 shadow-[0_0_15px_var(--primary)]" />
                        </h3>
                        <div className="h-[1px] w-0 bg-white/30 mt-4 group-hover:w-full transition-all duration-1000 delay-100" />
                      </div>
                    </div>

                    <div className="px-10 py-12 bg-[var(--ink)] relative">
                      <div className="flex flex-col gap-10 relative z-10">
                        <div className="flex justify-between items-start gap-8">
                          <p className="text-white/50 text-[17px] font-light leading-relaxed max-w-[90%] group-hover:text-white/70 transition-colors flex-1">
                            {p.description}
                          </p>
                          <div className="flex flex-col items-end border-r border-[var(--primary)]/40 pr-8 shrink-0">
                            <span className="font-mono text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">
                              {p.metrics.label}
                            </span>
                            <span className="text-2xl font-playfair font-black text-white italic leading-none group-hover:text-[var(--sky)] transition-colors">
                              {p.metrics.value}
                            </span>
                          </div>
                        </div>
                        <div className="relative h-[1px] w-full bg-white/10 overflow-hidden">
                          <div className="absolute top-0 left-0 h-full bg-[var(--primary)] w-0 group-hover:w-full transition-all duration-[2s]" />
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

            {/* Continuar */}
            <div className="mt-32 flex flex-col items-center">
              <div className="h-24 w-[1px] bg-gradient-to-b from-slate-300 to-transparent mb-10" />
              <button
                onClick={() =>
                  document.getElementById('capitulo-02')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="flex items-center gap-6 group"
              >
                <span className="font-mono text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 group-hover:text-slate-900 transition-colors">
                  {t('Continuar para Ecossistema Digital', 'Continue to Digital Ecosystem')}
                </span>
                <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-700 shadow-xl">
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-2" />
                </div>
              </button>
            </div>

            {/* Presença Institucional */}
            <div className="mt-64">
              <div
                data-reveal
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24"
              >
                <div className="lg:col-span-7">
                  <h4 className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-[var(--primary)] mb-8 flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-[var(--primary)]" /> Global Networking
                  </h4>
                  <h3 className="text-6xl md:text-8xl font-playfair font-bold text-slate-900 tracking-tighter leading-[0.9]">
                    {t('Presença', 'Institutional')} <br />
                    <span className="italic font-light text-slate-400">
                      {t('Institucional.', 'Presence.')}
                    </span>
                  </h3>
                </div>
                <div className="lg:col-span-5 lg:pb-4">
                  <p className="text-slate-500 text-lg font-light leading-relaxed border-l-2 border-[var(--primary)] pl-8">
                    {t(
                      'Curadoria estratégica e representação técnica em certames europeus, posicionando Braga como destino de excelência em mercados de alto valor.',
                      'Strategic curation and technical representation at European events, positioning Braga as a destination of excellence in high-value markets.'
                    )}
                  </p>
                </div>
              </div>

              <div
                data-reveal="stagger"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {/* Intro card */}
                <div className="bg-[var(--ink)] rounded-[3rem] p-12 flex flex-col justify-between text-white relative overflow-hidden group transition-all duration-700 hover:shadow-2xl hover:shadow-blue-900/40">
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-[var(--primary)]/20 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 border border-white/5">
                      <Globe className="w-10 h-10 text-[var(--sky)]" />
                    </div>
                    <p className="text-4xl font-playfair font-medium leading-tight">
                      {t('Expansão e', 'Expansion and')} <br />
                      <span className="text-[var(--sky)] italic">
                        {t('Estratégia', 'Territorial Strategy')}
                      </span>{' '}
                      {t('Territorial.', '')}
                    </p>
                  </div>
                  <div className="mt-20 relative z-10 flex flex-wrap gap-2">
                    {[t('Networking', 'Networking'), t('Promoção', 'Promotion'), t('Mercados', 'Markets')].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="font-mono px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-200 backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="w-64 h-64 border border-[var(--sky)] rounded-full -mr-32 -mb-32" />
                  </div>
                </div>

                {/* Feiras */}
                {[
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
                ].map((inst) => (
                  <div
                    key={inst.id}
                    onClick={() => open(inst.id)}
                    className="group relative h-[500px] bg-slate-100 rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-700 hover:shadow-2xl border border-slate-200"
                  >
                    <img
                      src={inst.image}
                      alt={inst.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent h-20 w-full -translate-y-full group-hover:animate-scan z-20 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
                    <div className="absolute top-8 left-8 w-6 h-6 border-l border-t border-[var(--sky)]/50 group-hover:w-10 group-hover:h-10 transition-all duration-700 z-30" />
                    <div className="absolute top-8 right-8 w-6 h-6 border-r border-t border-[var(--sky)]/50 group-hover:w-10 group-hover:h-10 transition-all duration-700 z-30" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end z-30">
                      <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                        <div className="flex items-center gap-3">
                          <div className="h-px w-8 bg-[var(--sky)] group-hover:w-12 transition-all duration-700" />
                          <span className="font-mono text-[var(--sky)] text-[10px] font-black uppercase tracking-[0.4em]">
                            {inst.tag}
                          </span>
                        </div>
                        <h5 className="text-4xl lg:text-5xl font-playfair font-bold text-white leading-[1.1]">
                          {inst.title}
                        </h5>
                        <div className="flex items-center justify-between pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[var(--sky)]" />
                            <span className="font-mono text-white text-[10px] font-black uppercase tracking-widest">
                              {inst.location}
                            </span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 backdrop-blur-md flex items-center justify-center border border-[var(--sky)]/50 group-hover:bg-[var(--primary)] transition-colors">
                            <PlusIcon className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Costura para o capítulo escuro seguinte */}
          <div
            className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-0"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--ink))' }}
          />
        </section>

        {/* ================================================================ */}
        {/* CAPÍTULO 02 — ECOSSISTEMA DIGITAL                                */}
        {/* ================================================================ */}
        <section
          id="capitulo-02"
          className="relative py-32 overflow-hidden"
          style={{ backgroundColor: 'var(--ink)' }}
        >
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage: 'radial-gradient(#3b82f6 1.5px, transparent 1.5px)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          <div className="max-w-[1440px] mx-auto px-6 relative z-10">
            <div
              data-reveal
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end"
            >
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-8 bg-[var(--sky)]" />
                  <span className="font-mono text-[11px] font-black tracking-[0.4em] uppercase text-[var(--sky)]">
                    {t('Capítulo 02 / Digital', 'Chapter 02 / Digital')}
                  </span>
                </div>
                <h2 className="text-6xl md:text-[100px] font-playfair font-black text-white leading-[0.85] tracking-tighter text-balance">
                  {t('Ecossistema', 'Digital')} <br />
                  <span className="text-[var(--sky)] italic font-light">
                    {t('Digital.', 'Ecosystem.')}
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-4 pb-4">
                <p className="text-slate-400 text-lg font-light leading-relaxed border-l-2 border-blue-900/50 pl-6">
                  {t(
                    'Criação de infraestrutura tecnológica e governação de dados para suportar a nova economia urbana.',
                    'Creation of technological infrastructure and data governance to support the new urban economy.'
                  )}
                </p>
              </div>
            </div>

            <div data-reveal="stagger" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                {
                  id: 'visit-braga',
                  title: t('Portal Visit Braga', 'Visit Braga Portal'),
                  location: t('Braga, Portugal', 'Braga, Portugal'),
                  image: 'https://i.imgur.com/e0wCEWM.jpeg',
                  description: t(
                    'Conceção de UX e arquitetura de dados para a principal plataforma turística da cidade.',
                    "UX design and data architecture for the city's main tourism platform."
                  ),
                  metrics: { label: t('Foco', 'Focus'), value: t('Conversão', 'Conversion') },
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
                  metrics: { label: t('Rede', 'Network'), value: t('Europeia', 'European') },
                },
              ].map((p) => (
                <div
                  key={p.id}
                  className="group cursor-pointer relative"
                  onClick={() => open(p.id)}
                >
                  <div className="relative h-[600px] overflow-hidden rounded-[2.5rem] bg-[#070d18] border border-white/5 shadow-2xl transition-all duration-700 hover:shadow-blue-500/10 group-hover:-translate-y-2">
                    <div className="absolute inset-0">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover opacity-60 transition-transform duration-[3s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070d18] via-[#070d18]/40 to-transparent" />
                    </div>

                    <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
                      <div className="flex justify-between items-start">
                        <div className="px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                          <span className="font-mono text-[9px] font-black text-[var(--sky)] uppercase tracking-widest">
                            {p.location}
                          </span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-[var(--primary)] transition-all duration-500">
                          <ArrowUpRight className="text-white w-5 h-5 group-hover:rotate-45 transition-transform" />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-5xl lg:text-6xl font-playfair font-black text-white leading-none tracking-tighter">
                          {p.title}
                          <span className="text-[var(--sky)]">.</span>
                        </h3>

                        <div className="flex flex-col xl:flex-row justify-between items-end gap-6">
                          <p className="text-white/70 text-lg font-light leading-relaxed max-w-sm">
                            {p.description}
                          </p>
                          <div className="flex flex-col items-end border-r-2 border-[var(--primary)]/50 pr-6 shrink-0">
                            <span className="font-mono text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">
                              {p.metrics.label}
                            </span>
                            <span className="text-2xl font-playfair font-bold text-white italic">
                              {p.metrics.value}
                            </span>
                          </div>
                        </div>

                        <div className="relative h-[1px] w-full bg-white/10 overflow-hidden">
                          <div className="absolute top-0 left-0 h-full bg-[var(--primary)] w-0 group-hover:w-full transition-all duration-[2s]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-24 flex flex-col items-center">
              <div className="h-24 w-[1px] bg-gradient-to-b from-blue-900 to-transparent mb-10" />
              <button
                onClick={() =>
                  document.getElementById('estratégia')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="flex items-center gap-6 group"
              >
                <span className="font-mono text-[12px] font-black uppercase tracking-[0.5em] text-slate-500 group-hover:text-white transition-colors">
                  {t('Continuar para Herança & Futuro', 'Continue to Heritage & Future')}
                </span>
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-700">
                  <ArrowRight className="w-5 h-5 text-white group-hover:text-slate-900 transition-transform group-hover:translate-x-2" />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* CAPÍTULO 03 — HERANÇA & FUTURO                                   */}
        {/* ================================================================ */}
        <section
          id="estratégia"
          className="py-40 relative overflow-hidden"
          style={{ backgroundColor: '#fcfcf9' }}
        >
          {/* Costura a partir do capítulo escuro */}
          <div
            className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-0"
            style={{ background: 'linear-gradient(to bottom, var(--ink), transparent)' }}
          />

          <div
            className="absolute inset-0 opacity-[0.22] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#1e293b 1.5px, transparent 1.5px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="absolute right-[-5%] top-1/4 pointer-events-none opacity-[0.03] select-none">
            <h2 className="text-[25vw] font-playfair font-black rotate-90 origin-center leading-none">
              HERITAGE
            </h2>
          </div>

          <div className="max-w-[1440px] mx-auto px-6 relative z-10">
            <div data-reveal className="flex flex-col items-center text-center mb-40">
              <div className="inline-block px-6 py-2 border border-slate-200 bg-white/50 backdrop-blur-sm rounded-full mb-10 shadow-sm">
                <span className="font-mono text-[10px] font-black tracking-[0.5em] uppercase text-slate-500">
                  {t('Capítulo 03 / Produto & Identidade', 'Chapter 03 / Product & Identity')}
                </span>
              </div>
              <h2 className="text-7xl md:text-[140px] font-playfair font-black text-slate-900 leading-[0.8] tracking-tighter text-balance">
                {t('Herança &', 'Heritage &')} <br />
                <span className="text-[var(--primary)] italic font-light">
                  {t('Futuro.', 'Future.')}
                </span>
              </h2>
            </div>

            <div className="space-y-64">
              {[
                {
                  id: 'cidade-bracvs',
                  title: t('A Cidade do Bracvs', 'The City of Bracvs'),
                  image: 'https://i.imgur.com/NRTWHRW.png',
                  desc: t(
                    'Roteiro lúdico-educativo para crianças e famílias. Conteúdos concebidos para aproximar as novas gerações do património romano de Braga.',
                    'Playful-educational itinerary for children and families. Content designed to bring new generations closer to Braga’s Roman heritage.'
                  ),
                  align: 'left',
                  tag: t('Educação & Família', 'Education & Family'),
                  year: '2025',
                  coord: '41.5503° N, 8.4200° W',
                },
                {
                  id: 'roteiro-3-dias',
                  title: t('Descobrir Braga em 3 Dias', 'Discover Braga in 3 Days'),
                  image: 'https://i.imgur.com/yWtlcEL.png',
                  desc: t(
                    'Coordenação editorial, factual e estrutural do guia oficial da cidade. Foco na otimização de fluxos turísticos e experiência do utilizador.',
                    "Editorial, factual, and structural coordination of the city's official guide. Focus on optimizing tourist flows and user experience."
                  ),
                  align: 'right',
                  tag: t('Coordenação Editorial', 'Editorial Coordination'),
                  year: '2025',
                  coord: '41.5450° N, 8.4260° W',
                },
                {
                  id: 'mapa-turistico-braga',
                  title: t('Novo Mapa Territorial', 'New Territorial Map'),
                  image: 'https://i.imgur.com/P54M1Ko.png',
                  desc: t(
                    'Desenvolvimento técnico e design de informação para o suporte cartográfico oficial, unindo precisão geográfica e identidade visual.',
                    'Technical development and information design for official cartographic support, merging geographical precision and visual identity.'
                  ),
                  align: 'left',
                  tag: t('Cartografia Técnica', 'Technical Cartography'),
                  year: '2024',
                  coord: '41.5480° N, 8.4300° W',
                },
                {
                  id: 'experiencias-sustentaveis',
                  title: t('Experiências Sustentáveis', 'Sustainable Experiences'),
                  image:
                    'https://www.cm-braga.pt/archive/cache/img/sz800x600/CMB17012025SERGIOFREITAS3022624430274.jpg',
                  desc: t(
                    'Liderança técnica na conceção de 29 experiências turísticas. Estruturação de produtos que unem a identidade local às melhores práticas de sustentabilidade.',
                    'Technical leadership in the design of 29 tourist experiences. Structuring products that combine local identity with best sustainability practices.'
                  ),
                  align: 'right',
                  tag: t('Gestão de Produto', 'Product Management'),
                  year: '2025',
                  coord: '41.5510° N, 8.4280° W',
                },
              ].map((p, idx) => (
                <div
                  key={p.id}
                  data-reveal="fade"
                  className={`flex flex-col ${
                    p.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } items-center gap-20 group relative`}
                  onClick={() => open(p.id)}
                >
                  <div className="lg:w-7/12 relative cursor-pointer">
                    <div
                      className={`absolute -top-10 ${
                        p.align === 'right' ? '-right-10' : '-left-10'
                      } w-40 h-40 border border-[var(--primary)]/20 rounded-full flex items-center justify-center animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    >
                      <div className="w-1 h-1 bg-[var(--primary)] rounded-full" />
                      <div className="absolute inset-0 border-t-2 border-[var(--primary)] rounded-full" />
                    </div>
                    <div
                      className={`absolute -top-4 ${
                        p.align === 'right' ? 'left-0' : 'right-0'
                      } z-20`}
                    >
                      <span className="font-mono text-[9px] text-[var(--primary)] bg-white/80 px-2 py-1 backdrop-blur-sm border border-blue-100 opacity-0 group-hover:opacity-100 transition-all duration-700">
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
                        <span className="font-mono text-[10px] font-black text-white tracking-widest uppercase">
                          {p.year}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`absolute -bottom-16 ${
                        p.align === 'right' ? '-left-16' : '-right-16'
                      } text-[200px] font-playfair font-black leading-none pointer-events-none select-none transition-all duration-1000 text-transparent bg-clip-text bg-gradient-to-b from-slate-200/50 to-transparent group-hover:from-blue-200 group-hover:scale-110 z-0`}
                    >
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="lg:w-5/12 space-y-10 relative">
                    <div className="absolute -left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--primary)]/30 to-transparent hidden lg:block" />
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-[var(--primary)] group-hover:w-20 transition-all duration-700" />
                        <span className="font-mono text-[11px] font-black text-[var(--primary)] uppercase tracking-[0.3em]">
                          {p.tag}
                        </span>
                      </div>
                      <h3 className="text-6xl lg:text-[80px] font-playfair font-bold text-slate-900 tracking-tighter leading-[0.85]">
                        {p.title.split(' ').map((word: string, i: number) => (
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
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-100 group-hover:bg-[var(--primary)] transition-colors duration-700" />
                      <p className="text-slate-500 text-xl font-light leading-relaxed max-w-md">
                        {p.desc}
                      </p>
                    </div>
                    <button className="flex items-center gap-6 group/btn pt-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-500 group-hover/btn:border-[var(--primary)] group-hover/btn:scale-110">
                          <PlusIcon className="w-6 h-6 text-slate-400 group-hover/btn:text-[var(--primary)] group-hover/btn:rotate-90 transition-all duration-500" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping scale-75 opacity-0 group-hover/btn:opacity-100" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/btn:text-[var(--primary)] transition-colors">
                          {t('Explorar', 'Explore')}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {t('Projecto Completo', 'Full Project')}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </div>

      <ChapterOverlay
        isOpen={overlayData.isOpen}
        projectType={overlayData.projectType}
        onClose={() => setOverlayData({ ...overlayData, isOpen: false })}
      />
    </main>
  );
}