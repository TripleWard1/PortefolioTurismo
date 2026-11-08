'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, ExternalLink, FileText, Link2, X } from 'lucide-react';
import { useLang } from '../../ui/LanguageContext';
import { getDossiers } from '../../ui/dossiers';
import { PROJECTS, THEME_LABEL, byId, neighbours } from '../../ui/projects';
import { useScrollLock } from '../../ui/hooks';
import dynamic from 'next/dynamic';
// Só no browser: o slider gera formas e paisagens no cliente (evita diferenças na hidratação)
const SteppedMorphSlider = dynamic(() => import('@/components/ui/stepped-morph-slider'), {
  ssr: false,
  loading: () => <div className="aspect-[16/10] rounded-xl bg-muted animate-pulse" />,
});

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="h-section text-ink !text-[clamp(1.6rem,1.3rem+0.9vw,2.1rem)] mb-6">{children}</h2>;
}

export default function CaseStudy({ id }: { id: string }) {
  const { lang } = useLang();
  // Sem tradução, usa o PT
  const t = (pt: any, en?: any) => (lang === 'en' && en ? en : pt);
  const data = useMemo(() => getDossiers(t)[id], [lang, id]); // eslint-disable-line react-hooks/exhaustive-deps
  const meta = byId(id)!;
  const { prev, next } = neighbours(id);
  const index = PROJECTS.findIndex((p) => p.id === id);
  const gal: string[] = data?.gallery || [];
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  useScrollLock(lightbox !== null);
  const art = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: art, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [active, setActive] = useState('contexto');
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-35% 0px -60% 0px' });
    document.querySelectorAll('[data-sec]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [id, lang]);

  useEffect(() => {
    if (lightbox === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % gal.length));
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? i : (i - 1 + gal.length) % gal.length));
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [lightbox, gal.length]);

  if (!data) return null;

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

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <article ref={art} className="wrap pt-8 md:pt-12">
      <motion.div className="fixed left-0 right-0 top-[76px] h-[3px] bg-petrol origin-left z-[390]" style={{ scaleX: progress }} aria-hidden="true" />
      {/* Navegação */}
      <nav className="flex flex-wrap items-center justify-between gap-4 text-[14px]" aria-label={t('Localização', 'Breadcrumb')}>
        <div className="flex items-center gap-2 text-muted-foreground min-w-0">
          <Link href="/projetos" className="hover:text-petrol inline-flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            {t('Projetos', 'Projects')}
          </Link>
          <span>/</span>
          <Link href={`/projetos?area=${meta.theme}`} className="hover:text-petrol truncate">
            {THEME_LABEL[meta.theme][lang]}
          </Link>
        </div>
        <span className="text-muted-foreground">
          {t('Projeto', 'Project')} {index + 1} {t('de', 'of')} {PROJECTS.length}
        </span>
      </nav>

      {/* Cabeçalho */}
      <header className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end" data-reveal>
        <div className="lg:col-span-8">
          <p className="kicker">
            {THEME_LABEL[meta.theme][lang]} · {meta.year}
          </p>
          <h1 className="mt-3 font-serif font-medium text-[clamp(2.2rem,1.5rem+2.8vw,3.9rem)] leading-[1.05] tracking-[-0.02em] text-ink text-balance">
            {data.headerTitle}
          </h1>
          <p className="mt-5 text-[19px] leading-relaxed text-muted-foreground max-w-2xl text-pretty">{meta.summary[lang]}</p>
        </div>
        <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
          <button onClick={share} className="h-10 px-4 rounded-full border border-line bg-card text-[14px] inline-flex items-center gap-2 hover:border-petrol/50">
            {copied ? <Check className="w-4 h-4 text-petrol" /> : <Link2 className="w-4 h-4" />}
            {copied ? t('Link copiado', 'Link copied') : t('Copiar link', 'Copy link')}
          </button>
          {mainLink && (
            <a href={mainLink} target="_blank" rel="noopener noreferrer" className="h-10 px-4 rounded-full bg-petrol text-white text-[14px] inline-flex items-center gap-2 hover:bg-petrol-dark">
              <FileText className="w-4 h-4" />
              {t('Documento oficial', 'Official document')}
            </a>
          )}
        </div>
      </header>

      <div className="photo mt-10 rounded-2xl aspect-[16/9] md:aspect-[21/9]" data-reveal>
        <img src={data.watermark || meta.image} alt="" />
      </div>

      {/* Ficha rápida */}
      <dl className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-line border border-line rounded-xl overflow-hidden" data-reveal>
        {facts.map((f) => (
          <div key={f.k} className="bg-card px-5 py-4">
            <dt className="text-[12px] uppercase tracking-[0.1em] text-muted-foreground">{f.k}</dt>
            <dd className="mt-1.5 text-[15px] text-ink leading-snug">{f.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-8 space-y-16">
          <section id="contexto" data-sec data-reveal className="scroll-mt-28">
            <H2>{t('Contexto', 'Context')}</H2>
            <div className="case-body text-[18px] leading-[1.75]">{data.description}</div>
            {data.quote && (
              <blockquote className="mt-10 border-l-[3px] border-petrol pl-6">
                <p className="font-serif italic text-[1.5rem] leading-snug text-ink">«{data.quote}»</p>
              </blockquote>
            )}
          </section>

          {data.pillars?.length > 0 && (
            <section id="eixos" data-sec data-reveal className="scroll-mt-28">
              <H2>{data.pillarTabLabel || t('Eixos de intervenção', 'Areas of intervention')}</H2>
              {data.pillarTitle && <h3 className="text-[1.15rem] font-semibold text-ink">{data.pillarTitle}</h3>}
              {data.pillarDesc && <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">{data.pillarDesc}</p>}
              <ol className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.pillars.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <li key={i} className="rounded-xl bg-card border border-line p-6">
                      <div className="flex items-center justify-between">
                        <span className="w-10 h-10 rounded-lg bg-petrol/10 text-petrol grid place-items-center">
                          {Icon && <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />}
                        </span>
                        <span className="font-serif text-[1.4rem] text-line">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h4 className="mt-4 text-[17px] font-semibold text-ink leading-snug">{p.title}</h4>
                      {p.desc && <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.desc}</p>}
                      {p.items && (
                        <ul className="mt-3 space-y-1 text-[14px] text-muted-foreground list-disc pl-5">
                          {p.items.map((it) => (
                            <li key={it}>{it}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

          {(data.videoEmbed || gal.length > 0) && (
            <section id="registo" data-sec data-reveal className="scroll-mt-28">
              <H2>{t('Registo do trabalho', 'Record of the work')}</H2>
              {data.videoEmbed && <div className="mb-6">{data.videoEmbed}</div>}
              {gal.length > 1 && (
                // Stepped Morph Slider: cada fotografia numa janela em degraus, que se transforma na seguinte
                <div className="rounded-2xl border border-line bg-card p-3 md:p-5 mb-5">
                  <SteppedMorphSlider
                    slides={gal.map((img, i) => ({ image: img, title: `${meta.title[lang]} · ${i + 1}/${gal.length}`, seed: i * 7 + 3 }))}
                    aspect={16 / 10}
                    columns={8}
                    autoplay={0}
                    background="#fbfaf6"
                    ink="#1a1d21"
                    muted="#5e6166"
                    accent="#0e5a6b"
                  />
                </div>
              )}
              {gal.length > 0 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {gal.map((img, i) => (
                    <button
                      key={img + i}
                      onClick={() => setLightbox(i)}
                      aria-label={`${t('Ampliar imagem', 'Enlarge image')} ${i + 1}`}
                      className="photo aspect-[4/3] rounded-md border border-line"
                    >
                      <img src={img} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-6">
            <nav className="hidden lg:block" aria-label={t('Nesta página', 'On this page')}>
              <p className="text-[12px] uppercase tracking-[0.1em] font-semibold text-muted-foreground mb-3">{t('Nesta página', 'On this page')}</p>
              <ul className="border-l border-line">
                {[
                  { id: 'contexto', label: t('Contexto', 'Context'), show: true },
                  { id: 'eixos', label: data.pillarTabLabel || t('Eixos', 'Pillars'), show: data.pillars?.length > 0 },
                  { id: 'registo', label: t('Registo do trabalho', 'Record of the work'), show: !!(data.videoEmbed || gal.length) },
                ]
                  .filter((s) => s.show)
                  .map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`-ml-px block border-l-2 pl-4 py-1.5 text-[14px] transition-colors ${active === s.id ? 'border-petrol text-petrol font-medium' : 'border-transparent text-muted-foreground hover:text-ink'}`}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
            {(data.stats || []).length > 0 && (
              <div className="rounded-xl bg-card border border-line p-6" data-reveal>
                <h2 className="text-[12px] uppercase tracking-[0.1em] font-semibold text-muted-foreground">{t('Em síntese', 'At a glance')}</h2>
                <dl className="mt-4 divide-y divide-line">
                  {data.stats!.map((s) => (
                    <div key={s.label} className="py-3 first:pt-0 last:pb-0">
                      <dt className="text-[13px] text-muted-foreground">{s.label}</dt>
                      <dd className="mt-0.5 font-serif text-[1.3rem] text-petrol leading-tight">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {(mainLink || langLinks.length > 0) && (
              <div className="rounded-xl bg-card border border-line p-6" data-reveal>
                <h2 className="text-[12px] uppercase tracking-[0.1em] font-semibold text-muted-foreground">{t('Documentos e ligações', 'Documents & links')}</h2>
                <div className="mt-4 space-y-2.5">
                  {mainLink && (
                    <a href={mainLink} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 rounded-lg bg-petrol text-white px-4 py-3 hover:bg-petrol-dark">
                      <FileText className="w-5 h-5 shrink-0 mt-0.5" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-semibold leading-snug">{data.externalLinkLabel || t('Recurso oficial', 'Official resource')}</span>
                        {data.externalSource && <span className="block text-[13px] text-white/70 truncate">{data.externalSource}</span>}
                      </span>
                      <ExternalLink className="w-4 h-4 shrink-0 mt-1" />
                    </a>
                  )}
                  {langLinks.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-lg border border-line px-4 py-2.5 text-[14px] hover:border-petrol/50 hover:text-petrol">
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

      {/* Projeto anterior / seguinte */}
      <nav className="mt-24 pt-10 border-t border-line grid grid-cols-1 md:grid-cols-2 gap-5" aria-label={t('Outros projetos', 'Other projects')}>
        {[
          { p: prev, label: t('Projeto anterior', 'Previous project'), dir: 'prev' },
          { p: next, label: t('Projeto seguinte', 'Next project'), dir: 'next' },
        ].map(({ p, label, dir }) => (
          <Link key={dir} href={`/projetos/${p.id}`} className={`group flex items-center gap-5 rounded-xl bg-card border border-line p-4 hover:border-petrol/40 ${dir === 'next' ? 'md:flex-row-reverse md:text-right' : ''}`}>
            <span className="photo w-28 h-20 rounded-lg shrink-0">
              <img src={p.image} alt="" loading="lazy" />
            </span>
            <span className="min-w-0">
              <span className={`text-[13px] text-muted-foreground inline-flex items-center gap-1.5 ${dir === 'next' ? 'md:flex-row-reverse' : ''}`}>
                {dir === 'prev' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                {label}
              </span>
              <span className="block mt-1 font-serif text-[1.35rem] text-ink group-hover:text-petrol transition-colors truncate">{p.title[lang]}</span>
            </span>
          </Link>
        ))}
      </nav>

      {/* Galeria ampliada */}
      {lightbox !== null && gal[lightbox] && (
        <div role="dialog" aria-modal="true" aria-label={t('Galeria', 'Gallery')} className="fixed inset-0 z-[700] bg-ink/95 flex flex-col" onClick={() => setLightbox(null)}>
          <div className="wrap h-16 flex items-center justify-between shrink-0 text-cream">
            <span className="text-[14px]">
              {lightbox + 1} / {gal.length}
            </span>
            <button onClick={() => setLightbox(null)} className="h-10 px-4 rounded-full border border-cream/25 inline-flex items-center gap-2 text-[14px] hover:bg-cream/10">
              <X className="w-4 h-4" />
              {t('Fechar', 'Close')}
            </button>
          </div>
          <div className="flex-1 min-h-0 relative flex items-center justify-center px-4 md:px-20 pb-8">
            <img src={gal[lightbox]} alt="" onClick={(e) => e.stopPropagation()} className="max-w-full max-h-full object-contain rounded-lg" />
            {gal.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox - 1 + gal.length) % gal.length);
                  }}
                  aria-label={t('Imagem anterior', 'Previous image')}
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/10 text-cream grid place-items-center hover:bg-cream/20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox + 1) % gal.length);
                  }}
                  aria-label={t('Imagem seguinte', 'Next image')}
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/10 text-cream grid place-items-center hover:bg-cream/20"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
