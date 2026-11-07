'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useLang } from './LanguageContext';
import { getDossiers } from './dossiers';
import { PROJECTS, byId, neighbours, THEME_LABEL } from './projects';
import { useScrollLock, useScrollProgress } from './hooks';

interface Props {
  isOpen: boolean;
  projectType: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Dossier({ isOpen, projectType, onClose, onPrev, onNext }: Props) {
  const { lang } = useLang();
  // Fallback para PT quando não há tradução (os dados antigos assumem isto)
  const t = (pt: any, en?: any) => (lang === 'en' && en ? en : pt);
  const dossiers = useMemo(() => getDossiers(t), [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const data = dossiers[projectType] || dossiers['smart-tourism'];
  const meta = byId(projectType) || PROJECTS[0];
  const { next } = neighbours(projectType);
  const index = PROJECTS.findIndex((p) => p.id === meta.id);

  const scroller = useRef<HTMLDivElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const coverImg = useRef<HTMLImageElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeSec, setActiveSec] = useState('sintese');

  useScrollLock(isOpen);

  // Topo + foco ao abrir / mudar de dossier
  useEffect(() => {
    if (!isOpen) return;
    scroller.current?.scrollTo({ top: 0 });
    setLightbox(null);
    setActiveSec('sintese');
    const id = setTimeout(() => dialog.current?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(id);
  }, [isOpen, projectType]);

  // Progresso de leitura (barra) e paralaxe da capa
  useScrollProgress(
    cover,
    (p) => {
      if (coverImg.current) coverImg.current.style.transform = `translate3d(0, ${p * 22}%, 0) scale(${1.08 + p * 0.12})`;
    },
    'exit',
    scroller
  );
  useEffect(() => {
    const s = scroller.current;
    if (!s || !isOpen) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const max = s.scrollHeight - s.clientHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? s.scrollTop / max : 0})`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    s.addEventListener('scroll', on, { passive: true });
    tick();
    return () => s.removeEventListener('scroll', on);
  }, [isOpen, projectType]);

  // Secção ativa no índice lateral
  useEffect(() => {
    const s = scroller.current;
    if (!s || !isOpen) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSec(e.target.id.replace('d-', ''))),
      { root: s, rootMargin: '-40% 0px -55% 0px' }
    );
    s.querySelectorAll('[data-dsec]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isOpen, projectType, lang]);

  const gal: string[] = data.gallery || [];

  // Lightbox: teclado em captura para não navegar o dossier por baixo
  useEffect(() => {
    if (lightbox === null) return;
    const k = (e: KeyboardEvent) => {
      if (!['Escape', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      e.stopImmediatePropagation();
      e.preventDefault();
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % gal.length));
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? i : (i - 1 + gal.length) % gal.length));
    };
    window.addEventListener('keydown', k, true);
    return () => window.removeEventListener('keydown', k, true);
  }, [lightbox, gal.length]);

  if (!isOpen) return null;

  const stats = data.stats || [];
  const mainLink = data.externalLink || data.link;
  const langLinks = [
    data.linkEN && { href: data.linkEN, label: 'English' },
    data.linkES && { href: data.linkES, label: 'Español' },
    data.linkFR && { href: data.linkFR, label: 'Français' },
    data.linkLowCost && { href: data.linkLowCost, label: t('Versão simplificada', 'Simplified version') },
  ].filter(Boolean) as { href: string; label: string }[];

  const sections = [
    { id: 'sintese', label: t('Síntese', 'Synopsis'), show: !!(data.description || data.quote) },
    { id: 'eixos', label: data.pillarTabLabel || t('Eixos', 'Pillars'), show: data.pillars?.length > 0 },
    { id: 'trabalho', label: t('O trabalho', 'The work'), show: !!(data.videoEmbed || gal.length) },
    { id: 'recursos', label: t('Recursos', 'Resources'), show: !!(mainLink || langLinks.length) },
  ].filter((s) => s.show);
  const num = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0');
  const jump = (id: string) =>
    scroller.current?.querySelector(`#d-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const SecHead = ({ id, title }: { id: string; title: string }) => (
    <div className="flex items-baseline gap-4 mb-10 md:mb-14">
      <span className="label text-ember tabular">{num(id)}</span>
      <span className="h-px flex-1 bg-[var(--line)] translate-y-[-4px]" />
      <span className="label text-[var(--fg-3)]">{title}</span>
    </div>
  );

  return (
    <>
      <div
        ref={dialog}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={data.headerTitle}
        className="outline-none dossier-in fixed inset-0 z-[600] bg-night text-bone flex flex-col"
      >
        <style>{`
          @keyframes dossier-in { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0 0 0 0); } }
          .dossier-in { animation: dossier-in 0.9s cubic-bezier(.76,0,.24,1) both; }
          @media (prefers-reduced-motion: reduce) { .dossier-in { animation: none; } }
        `}</style>

        {/* BARRA SUPERIOR */}
        <div className="absolute top-0 inset-x-0 z-30 bg-gradient-to-b from-night via-night/85 to-night/0">
          <div className="wrap h-[72px] flex items-center justify-between gap-4">
            <div className="glass rounded-full h-11 pl-4 pr-5 flex items-center gap-3 min-w-0">
              <span className="label tabular text-ember shrink-0">
                {String(index + 1).padStart(2, '0')}
                <span className="text-[var(--fg-3)]"> / {String(PROJECTS.length).padStart(2, '0')}</span>
              </span>
              <span className="w-px h-4 bg-[var(--line-2)] shrink-0" />
              <span className="label text-[var(--fg-2)] truncate">{THEME_LABEL[meta.theme][lang]}</span>
            </div>
            <div className="glass rounded-full h-11 p-1 flex items-center gap-1 shrink-0">
              <button onClick={onPrev} aria-label={t('Projeto anterior', 'Previous project')} className="w-9 h-9 rounded-full grid place-items-center text-[var(--fg-2)] hover:bg-bone hover:text-night transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={onNext} aria-label={t('Projeto seguinte', 'Next project')} className="w-9 h-9 rounded-full grid place-items-center text-[var(--fg-2)] hover:bg-bone hover:text-night transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                ref={closeBtn}
                onClick={onClose}
                aria-label={t('Fechar dossier', 'Close dossier')}
                className="h-9 pl-4 pr-3 rounded-full bg-bone text-night flex items-center gap-2 hover:bg-ember transition-colors"
              >
                <span className="hidden sm:block text-[13px] font-medium">{t('Fechar', 'Close')}</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="h-px bg-[var(--line)]">
            <div ref={bar} className="h-px bg-ember origin-left" style={{ transform: 'scaleX(0)' }} />
          </div>
        </div>

        {/* SCROLL */}
        <div ref={scroller} className="flex-1 overflow-y-auto overscroll-contain">
          {/* CAPA */}
          <header ref={cover} className="relative h-[92svh] min-h-[620px] overflow-hidden">
            <img
              ref={coverImg}
              key={projectType}
              src={data.watermark || meta.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-60 will-change-transform"
              style={{ transform: 'scale(1.08)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/30" />
            <div className="absolute inset-0 vignette" />
            <div key={projectType} className="relative h-full wrap flex flex-col justify-end pb-10 md:pb-14">
              <div className="rise flex flex-wrap items-center gap-3 mb-7" style={{ ['--d' as any]: '500ms' }}>
                <span className="glass rounded-full px-3.5 py-2 label-sm text-bone flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ember" />
                  {data.tag}
                </span>
              </div>
              <h1 className="rise h1 text-bone max-w-5xl text-balance" style={{ ['--d' as any]: '600ms', fontSize: 'clamp(2.6rem, 1.2rem + 5vw, 6.4rem)' }}>
                {data.headerTitle}
              </h1>
              {stats.length > 0 && (
                <dl className="rise mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--line)] border-y border-[var(--line)] max-w-4xl" style={{ ['--d' as any]: '750ms' }}>
                  {stats.slice(0, 3).map((m, i) => (
                    <div key={i} className="bg-night/60 backdrop-blur-sm px-5 py-4">
                      <dt className="label-sm text-[var(--fg-3)]">{m.label}</dt>
                      <dd className="mt-2 font-display text-[1.8rem] leading-none text-bone">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </header>

          {/* CORPO */}
          <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-x-12 pt-20 md:pt-28">
            {/* Índice lateral */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 space-y-10">
                <nav className="flex flex-col" aria-label={t('Secções do dossier', 'Dossier sections')}>
                  {sections.map((s) => {
                    const on = activeSec === s.id;
                    return (
                      <button key={s.id} onClick={() => jump(s.id)} className="group flex items-center gap-4 py-2.5 text-left">
                        <span className={`label tabular transition-colors ${on ? 'text-ember' : 'text-[var(--fg-3)]'}`}>{num(s.id)}</span>
                        <span className={`h-px transition-all duration-500 ${on ? 'w-10 bg-ember' : 'w-4 bg-[var(--line-2)] group-hover:w-7'}`} />
                        <span className={`text-[15px] transition-colors ${on ? 'text-bone' : 'text-[var(--fg-3)] group-hover:text-[var(--fg-2)]'}`}>{s.label}</span>
                      </button>
                    );
                  })}
                </nav>
                <dl className="space-y-6 pt-8 border-t border-[var(--line)]">
                  <div>
                    <dt className="label-sm text-[var(--fg-3)]">{t('Local', 'Place')}</dt>
                    <dd className="mt-2 text-[14px] text-[var(--fg-2)]">{meta.place[lang]}</dd>
                  </div>
                  <div>
                    <dt className="label-sm text-[var(--fg-3)]">{t('Período', 'Period')}</dt>
                    <dd className="mt-2 text-[14px] text-[var(--fg-2)] tabular">{meta.year}</dd>
                  </div>
                  {data.officialNetwork && (
                    <div>
                      <dt className="label-sm text-[var(--fg-3)]">{t('Rede', 'Network')}</dt>
                      <dd className="mt-2 text-[14px] text-[var(--fg-2)] leading-relaxed">{data.officialNetwork}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </aside>

            <div className="lg:col-span-9 space-y-28 md:space-y-36">
              {/* 01 SÍNTESE */}
              {sections.some((s) => s.id === 'sintese') && (
                <section id="d-sintese" data-dsec className="scroll-mt-28">
                  <SecHead id="sintese" title={t('Síntese', 'Synopsis')} />
                  <div className="dossier-body text-[clamp(1.2rem,1rem+0.6vw,1.5rem)] leading-[1.6] tracking-[-0.005em] max-w-3xl [&_p+p]:mt-6">
                    {data.description}
                  </div>
                  {data.quote && (
                    <figure className="mt-20 md:mt-28 relative pl-0 md:pl-16">
                      <span aria-hidden="true" className="absolute -top-10 left-0 md:-left-2 font-display text-[9rem] leading-none text-ember/80">“</span>
                      <blockquote className="relative font-display italic text-[clamp(1.8rem,1.2rem+2.2vw,3.4rem)] leading-[1.12] tracking-[-0.015em] text-bone text-balance">
                        {data.quote}
                      </blockquote>
                      <figcaption className="mt-8 flex items-center gap-4">
                        <span className="w-10 h-10 rounded-full border border-[var(--line-2)] grid place-items-center font-display italic text-ember">hb</span>
                        <span>
                          <span className="block text-[14px] text-bone">{data.authorTitle || 'Hugo Barros'}</span>
                          <span className="block label-sm text-[var(--fg-3)] mt-1.5">{data.authorSub || t('Estratégia territorial', 'Territorial strategy')}</span>
                        </span>
                      </figcaption>
                    </figure>
                  )}
                  {data.acreditacao && (
                    <div className="mt-16 rounded-2xl border border-[var(--line)] bg-granite p-6 md:p-7 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
                      <span className="label-sm text-ember shrink-0">{t('Acreditação', 'Accreditation')}</span>
                      <span className="text-[15px] text-[var(--fg-2)] leading-relaxed">{data.acreditacao}</span>
                    </div>
                  )}
                </section>
              )}

              {/* 02 EIXOS */}
              {sections.some((s) => s.id === 'eixos') && (
                <section id="d-eixos" data-dsec className="scroll-mt-28">
                  <SecHead id="eixos" title={data.pillarTabLabel || t('Eixos', 'Pillars')} />
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
                    <h2 className="md:col-span-7 h2 text-bone text-balance">{data.pillarTitle}</h2>
                    {data.pillarDesc && <p className="md:col-span-5 text-[16px] text-[var(--fg-2)] leading-relaxed text-pretty">{data.pillarDesc}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)] rounded-[24px] overflow-hidden">
                    {data.pillars.map((p, i) => {
                      const Icon = p.icon;
                      return (
                        <div key={i} className="group relative bg-night p-7 md:p-9 transition-colors duration-500 hover:bg-granite">
                          <div className="flex items-start justify-between mb-10">
                            <span className="w-12 h-12 rounded-full border border-[var(--line-2)] grid place-items-center transition-all duration-500 group-hover:bg-ember group-hover:border-ember">
                              {Icon && <Icon className="w-5 h-5 text-ember transition-colors duration-500 group-hover:text-night" strokeWidth={1.5} />}
                            </span>
                            <span className="font-display text-5xl leading-none outline-text group-hover:[-webkit-text-stroke-color:var(--ember)] transition-all duration-500">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <h3 className="font-display text-[1.75rem] leading-[1.05] text-bone">{p.title}</h3>
                          {p.desc && <p className="mt-3 text-[15px] text-[var(--fg-2)] leading-relaxed">{p.desc}</p>}
                          {p.items && (
                            <ul className="mt-4 space-y-1.5">
                              {p.items.map((it) => (
                                <li key={it} className="text-[14px] text-[var(--fg-2)] flex gap-2">
                                  <span className="text-ember">—</span>
                                  {it}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* 03 TRABALHO */}
              {sections.some((s) => s.id === 'trabalho') && (
                <section id="d-trabalho" data-dsec className="scroll-mt-28">
                  <SecHead id="trabalho" title={t('O trabalho', 'The work')} />
                  {data.videoEmbed && <div className="mb-8">{data.videoEmbed}</div>}
                  {gal.length > 0 && (
                    <div className="columns-1 sm:columns-2 xl:columns-3 gap-4">
                      {gal.map((img, i) => (
                        <button
                          key={img + i}
                          data-cursor={t('Ver', 'View')}
                          onClick={() => setLightbox(i)}
                          className="group relative w-full mb-4 rounded-2xl overflow-hidden bg-slab block break-inside-avoid"
                        >
                          <img src={img} alt="" loading="lazy" className="w-full h-auto block transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]" />
                          <span className="absolute inset-0 bg-night/0 group-hover:bg-night/30 transition-colors duration-500" />
                          <span className="absolute left-3 top-3 glass rounded-full px-2.5 py-1 label-sm text-bone tabular">{String(i + 1).padStart(2, '0')}</span>
                          <span className="absolute right-3 bottom-3 w-10 h-10 rounded-full bg-bone grid place-items-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 [@media(pointer:fine)]:hidden">
                            <Maximize2 className="w-4 h-4 text-night" />
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* 04 RECURSOS */}
              {sections.some((s) => s.id === 'recursos') && (
                <section id="d-recursos" data-dsec className="scroll-mt-28">
                  <SecHead id="recursos" title={t('Recursos', 'Resources')} />
                  {mainLink && (
                    <a
                      href={mainLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex flex-col md:flex-row md:items-center justify-between gap-8 rounded-[28px] border border-[var(--line-2)] p-8 md:p-12 overflow-hidden hover:border-ember transition-colors duration-500"
                    >
                      <span className="absolute inset-0 bg-ember origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-io" />
                      <span className="relative">
                        <span className="block label text-ember group-hover:text-night transition-colors duration-500">
                          {data.externalLinkLabel || t('Recurso oficial', 'Official resource')}
                        </span>
                        <span className="block mt-4 h2 text-bone group-hover:text-night transition-colors duration-500">
                          {data.externalSource || t('Aceder ao recurso', 'Open resource')}
                        </span>
                      </span>
                      <span className="relative shrink-0 w-16 h-16 rounded-full bg-bone grid place-items-center group-hover:bg-night transition-colors duration-500">
                        <ArrowUpRight className="w-6 h-6 text-night group-hover:text-ember group-hover:rotate-45 transition-all duration-500" />
                      </span>
                    </a>
                  )}
                  {langLinks.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {langLinks.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-11 px-5 rounded-full border border-[var(--line-2)] flex items-center gap-2 text-[14px] text-[var(--fg-2)] hover:bg-bone hover:text-night hover:border-bone transition-colors"
                        >
                          {l.label}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </section>
              )}
            </div>
          </div>

          {/* SEGUINTE */}
          <button
            onClick={onNext}
            data-cursor={t('Seguinte', 'Next')}
            className="group relative mt-32 md:mt-44 block w-full h-[70svh] min-h-[440px] overflow-hidden text-left"
          >
            <img src={next.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110 transition-all duration-[1600ms] ease-out group-hover:opacity-60 group-hover:scale-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night" />
            <div className="relative h-full wrap flex flex-col justify-center">
              <span className="label text-[var(--fg-3)] flex items-center gap-3">
                <span className="text-ember tabular">{String(((index + 1) % PROJECTS.length) + 1).padStart(2, '0')}</span>
                <span className="w-6 h-px bg-[var(--line-2)]" />
                {t('Próximo dossier', 'Next dossier')}
              </span>
              <span className="mt-6 flex items-center gap-6 md:gap-10">
                <span className="display text-bone transition-all duration-700 ease-out group-hover:italic group-hover:text-ember group-hover:translate-x-4">
                  {next.title[lang]}
                </span>
                <ArrowRight className="hidden md:block w-14 h-14 text-ember shrink-0 -translate-x-6 opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1} />
              </span>
              <span className="mt-6 max-w-lg text-[16px] text-[var(--fg-2)] leading-relaxed">{next.summary[lang]}</span>
            </div>
          </button>

          <div className="wrap py-8 flex items-center justify-between border-t border-[var(--line)]">
            <span className="font-display text-xl text-bone">
              Hugo Barros<em className="text-ember">.</em>
            </span>
            <button onClick={onClose} className="label text-[var(--fg-3)] hover:text-bone transition-colors flex items-center gap-2">
              <X className="w-3.5 h-3.5" />
              {t('Fechar dossier', 'Close dossier')}
            </button>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox !== null && gal[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('Galeria', 'Gallery')}
          className="fade fixed inset-0 z-[2000] bg-night/95 backdrop-blur-xl flex flex-col"
          onClick={() => setLightbox(null)}
        >
          <div className="wrap h-[72px] flex items-center justify-between shrink-0">
            <span className="label tabular text-bone">
              {String(lightbox + 1).padStart(2, '0')} <span className="text-[var(--fg-3)]">/ {String(gal.length).padStart(2, '0')}</span>
            </span>
            <button onClick={() => setLightbox(null)} aria-label={t('Fechar', 'Close')} className="w-11 h-11 rounded-full bg-bone text-night grid place-items-center hover:bg-ember transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 min-h-0 relative flex items-center justify-center px-4 md:px-24 pb-6">
            <img
              key={gal[lightbox]}
              src={gal[lightbox]}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="scale-in max-w-full max-h-full object-contain rounded-xl"
            />
            {gal.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox - 1 + gal.length) % gal.length);
                  }}
                  aria-label={t('Anterior', 'Previous')}
                  className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass grid place-items-center text-bone hover:bg-bone hover:text-night transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox + 1) % gal.length);
                  }}
                  aria-label={t('Seguinte', 'Next')}
                  className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass grid place-items-center text-bone hover:bg-bone hover:text-night transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          <div className="shrink-0 flex justify-center gap-2 pb-6 px-4 overflow-x-auto no-scrollbar" onClick={(e) => e.stopPropagation()}>
            {gal.map((g, i) => (
              <button
                key={g + i}
                onClick={() => setLightbox(i)}
                aria-label={`${i + 1}`}
                className={`shrink-0 w-14 h-10 rounded-md overflow-hidden transition-all ${i === lightbox ? 'ring-1 ring-ember opacity-100' : 'opacity-40 hover:opacity-80'}`}
              >
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
