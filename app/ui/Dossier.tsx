'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, FileText, X } from 'lucide-react';
import { useLang } from './LanguageContext';
import { getDossiers } from './dossiers';
import { PROJECTS, THEME_LABEL, byId, neighbours } from './projects';
import { useScrollLock } from './hooks';

interface Props {
  projectType: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-medium tracking-[-0.03em] text-[1.9rem] leading-tight text-tx pb-3 mb-7 border-b border-ln">{children}</h2>;
}

export default function Dossier({ projectType, onClose, onPrev, onNext }: Props) {
  const { lang } = useLang();
  // Fallback para PT quando não há tradução
  const t = (pt: any, en?: any) => (lang === 'en' && en ? en : pt);
  const dossiers = useMemo(() => getDossiers(t), [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const data = dossiers[projectType] || dossiers['smart-tourism'];
  const meta = byId(projectType) || PROJECTS[0];
  const { prev, next } = neighbours(projectType);
  const index = PROJECTS.findIndex((p) => p.id === meta.id);
  const gal: string[] = data.gallery || [];

  const scroller = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  useScrollLock(true);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
    setLightbox(null);
    dialog.current?.focus({ preventScroll: true });
  }, [projectType]);

  // Galeria: teclado em captura para não mudar de dossier por baixo
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

  const mainLink = data.externalLink || data.link;
  const langLinks = [
    data.linkEN && { href: data.linkEN, label: 'English' },
    data.linkES && { href: data.linkES, label: 'Español' },
    data.linkFR && { href: data.linkFR, label: 'Français' },
    data.linkLowCost && { href: data.linkLowCost, label: t('Versão simplificada', 'Simplified version') },
  ].filter(Boolean) as { href: string; label: string }[];

  const facts = [
    { k: t('Área', 'Area'), v: THEME_LABEL[meta.theme][lang] },
    { k: t('Período', 'Period'), v: meta.year },
    { k: t('Local', 'Location'), v: meta.place[lang] },
    data.officialNetwork && { k: t('Rede / parceiro', 'Network / partner'), v: data.officialNetwork },
    data.acreditacao && { k: t('Acreditação', 'Accreditation'), v: data.acreditacao },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <>
      <div
        ref={dialog}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={data.headerTitle}
        className="dossier-in fixed inset-0 z-[600] bg-bg flex flex-col outline-none"
      >
        <style>{`
          @keyframes dossier-in { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
          .dossier-in { animation: dossier-in 0.6s cubic-bezier(.22,1,.36,1) both; }
        `}</style>
        {/* Barra superior */}
        <div className="shrink-0 border-b border-ln bg-bg">
          <div className="wrap h-16 flex items-center justify-between gap-4">
            <nav aria-label={t('Localização', 'Breadcrumb')} className="min-w-0 flex items-center gap-2 text-[14px] text-tx2">
              <button onClick={onClose} className="hover:text-v shrink-0">
                {t('Projetos', 'Projects')}
              </button>
              <ChevronRight className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline truncate">{THEME_LABEL[meta.theme][lang]}</span>
              <ChevronRight className="hidden sm:block w-4 h-4 shrink-0" />
              <span className="text-tx font-medium truncate">{meta.title[lang]}</span>
            </nav>
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden md:inline text-[13px] text-tx2 mr-2">
                {index + 1} {t('de', 'of')} {PROJECTS.length}
              </span>
              <button onClick={onPrev} aria-label={t('Projeto anterior', 'Previous project')} className="w-10 h-10 border border-ln grid place-items-center text-tx hover:border-v/60 hover:text-v">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={onNext} aria-label={t('Projeto seguinte', 'Next project')} className="w-10 h-10 border border-ln grid place-items-center text-tx hover:border-v/60 hover:text-v">
                <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={onClose} className="h-10 px-4 bg-v text-white text-[14px] font-semibold inline-flex items-center gap-2 hover:bg-[#e01e1e]">
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">{t('Fechar', 'Close')}</span>
              </button>
            </div>
          </div>
        </div>

        <div ref={scroller} className="flex-1 overflow-y-auto overscroll-contain">
          {/* Capa */}
          <header className="relative bg-bg text-tx overflow-hidden">
            <img key={projectType} src={data.watermark || meta.image} alt="" className="slow-zoom absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/40" />
            <div key={`h-${projectType}`} className="relative wrap py-16 md:py-24">
              <p className="rise sobre text-v flex items-center gap-3" style={{ ['--d' as any]: '100ms' }}>
                                {THEME_LABEL[meta.theme][lang]} · {meta.year}
              </p>
              <h1
                className="rise mt-5 font-medium text-[clamp(2.2rem,1.2rem+3.4vw,4.6rem)] leading-[1] tracking-[-0.045em] max-w-4xl text-balance"
                style={{ ['--d' as any]: '200ms' }}
              >
                {data.headerTitle}
              </h1>
              <p className="rise mt-4 text-[16px] text-tx2" style={{ ['--d' as any]: '300ms' }}>
                {data.tag}
              </p>
            </div>
          </header>

          <div className="wrap py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Conteúdo */}
            <div className="lg:col-span-8 space-y-14">
              <section>
                <H2>{t('Enquadramento', 'Context')}</H2>
                <div className="dossier-body text-[18px] leading-[1.7] [&_p+p]:mt-5">{data.description}</div>
                {data.quote && (
                  <blockquote className="mt-10 border-l-4 border-v bg-bg px-6 py-5">
                    <p className="font-serif text-[1.3rem] leading-snug text-tx italic">“{data.quote}”</p>
                  </blockquote>
                )}
              </section>

              {data.pillars?.length > 0 && (
                <section>
                  <H2>{data.pillarTabLabel || t('Eixos de intervenção', 'Areas of intervention')}</H2>
                  {data.pillarTitle && <h3 className="font-medium tracking-[-0.02em] text-[1.3rem] text-tx">{data.pillarTitle}</h3>}
                  {data.pillarDesc && <p className="mt-2 text-[16px] leading-relaxed text-tx2">{data.pillarDesc}</p>}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.pillars.map((p, i) => {
                      const Icon = p.icon;
                      return (
                        <div key={i} className="bg-sup border border-ln p-5">
                          <div className="flex items-center gap-3">
                            <span className="w-9 h-9 bg-bg text-v grid place-items-center shrink-0">
                              {Icon && <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />}
                            </span>
                            <h4 className="font-semibold text-[16px] text-tx leading-snug">{p.title}</h4>
                          </div>
                          {p.desc && <p className="mt-3 text-[15px] leading-relaxed text-tx2">{p.desc}</p>}
                          {p.items && (
                            <ul className="mt-3 space-y-1 text-[14px] text-tx2 list-disc pl-5">
                              {p.items.map((it) => (
                                <li key={it}>{it}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {(data.videoEmbed || gal.length > 0) && (
                <section>
                  <H2>{t('Registo do trabalho', 'Record of the work')}</H2>
                  {data.videoEmbed && <div className="mb-6">{data.videoEmbed}</div>}
                  {gal.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {gal.map((img, i) => (
                        <button
                          key={img + i}
                          onClick={() => setLightbox(i)}
                          aria-label={`${t('Ampliar imagem', 'Enlarge image')} ${i + 1}`}
                          className="aspect-[4/3] overflow-hidden bg-sup border border-ln hover:border-v/60"
                        >
                          <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* Ficha lateral */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-6 space-y-6">
                <div className="bg-sup border border-ln">
                  <h2 className="px-5 py-3.5 border-b border-ln bg-bg text-[13px] font-semibold uppercase tracking-[0.06em] text-tx2">
                    {t('Ficha do projeto', 'Project sheet')}
                  </h2>
                  <dl className="divide-y divide-ln">
                    {facts.map((f) => (
                      <div key={f.k} className="px-5 py-3.5">
                        <dt className="text-[13px] text-tx2">{f.k}</dt>
                        <dd className="mt-0.5 text-[15px] text-tx leading-snug">{f.v}</dd>
                      </div>
                    ))}
                    {(data.stats || []).map((s) => (
                      <div key={s.label} className="px-5 py-3.5">
                        <dt className="text-[13px] text-tx2">{s.label}</dt>
                        <dd className="mt-0.5 text-[15px] font-medium text-tx">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {(mainLink || langLinks.length > 0) && (
                  <div className="bg-sup border border-ln">
                    <h2 className="px-5 py-3.5 border-b border-ln bg-bg text-[13px] font-semibold uppercase tracking-[0.06em] text-tx2">
                      {t('Documentos e ligações', 'Documents & links')}
                    </h2>
                    <div className="p-5 space-y-3">
                      {mainLink && (
                        <a
                          href={mainLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 bg-v text-white px-4 py-3 hover:bg-[#e01e1e]"
                        >
                          <FileText className="w-5 h-5 shrink-0 mt-0.5" />
                          <span className="min-w-0">
                            <span className="block text-[15px] font-semibold leading-snug">
                              {data.externalLinkLabel || t('Recurso oficial', 'Official resource')}
                            </span>
                            {data.externalSource && <span className="block text-[13px] text-white/70 truncate">{data.externalSource}</span>}
                          </span>
                          <ExternalLink className="w-4 h-4 shrink-0 mt-1 ml-auto" />
                        </a>
                      )}
                      {langLinks.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between border border-ln px-4 py-2.5 text-[14px] text-tx hover:border-v/60 hover:text-v"
                        >
                          {l.label}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Navegação entre dossiers */}
          <nav className="border-t border-ln bg-bg" aria-label={t('Outros projetos', 'Other projects')}>
            <div className="wrap py-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button onClick={onPrev} className="text-left border border-ln bg-sup p-5 hover:border-v/60">
                <span className="text-[13px] text-tx2 inline-flex items-center gap-1.5">
                  <ArrowLeft className="w-4 h-4" />
                  {t('Projeto anterior', 'Previous project')}
                </span>
                <span className="block mt-1.5 font-medium tracking-[-0.02em] text-[1.15rem] text-tx">{prev.title[lang]}</span>
              </button>
              <button onClick={onNext} className="text-right border border-ln bg-sup p-5 hover:border-v/60">
                <span className="text-[13px] text-tx2 inline-flex items-center gap-1.5">
                  {t('Projeto seguinte', 'Next project')}
                  <ArrowRight className="w-4 h-4" />
                </span>
                <span className="block mt-1.5 font-medium tracking-[-0.02em] text-[1.15rem] text-tx">{next.title[lang]}</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Galeria ampliada */}
      {lightbox !== null && gal[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('Galeria', 'Gallery')}
          className="fixed inset-0 z-[700] bg-black/95 flex flex-col"
          onClick={() => setLightbox(null)}
        >
          <div className="wrap h-16 flex items-center justify-between shrink-0 text-white">
            <span className="text-[14px]">
              {lightbox + 1} / {gal.length}
            </span>
            <button onClick={() => setLightbox(null)} className="h-10 px-4 border border-white/25 inline-flex items-center gap-2 text-[14px] hover:bg-sup/10">
              <X className="w-4 h-4" />
              {t('Fechar', 'Close')}
            </button>
          </div>
          <div className="flex-1 min-h-0 relative flex items-center justify-center px-4 md:px-20 pb-8">
            <img src={gal[lightbox]} alt="" onClick={(e) => e.stopPropagation()} className="max-w-full max-h-full object-contain" />
            {gal.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox - 1 + gal.length) % gal.length);
                  }}
                  aria-label={t('Imagem anterior', 'Previous image')}
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-sup/10 text-white grid place-items-center hover:bg-sup/20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox + 1) % gal.length);
                  }}
                  aria-label={t('Imagem seguinte', 'Next image')}
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-sup/10 text-white grid place-items-center hover:bg-sup/20"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
