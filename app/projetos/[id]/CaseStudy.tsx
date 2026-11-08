'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLang } from '../../ui/LanguageContext';
import { getDossiers } from '../../ui/dossiers';
import { THEME_LABEL, byId, neighbours } from '../../ui/projects';
import { useScrollLock } from '../../ui/hooks';
import { TONE } from '../../ui/viz/palette';

export default function CaseStudy({ id }: { id: string }) {
  const { lang } = useLang();
  // Sem tradução, usa o PT
  const t = (pt: any, en?: any) => (lang === 'en' && en ? en : pt);
  const data = useMemo(() => getDossiers(t)[id], [lang, id]); // eslint-disable-line react-hooks/exhaustive-deps
  const meta = byId(id)!;
  const { prev, next } = neighbours(id);
  const gal: string[] = data?.gallery || [];
  const [lightbox, setLightbox] = useState<number | null>(null);
  useScrollLock(lightbox !== null);

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
  const links = [
    mainLink && { href: mainLink, label: data.externalLinkLabel || t('Documento oficial', 'Official document'), sub: data.externalSource },
    data.linkEN && { href: data.linkEN, label: 'English' },
    data.linkES && { href: data.linkES, label: 'Español' },
    data.linkFR && { href: data.linkFR, label: 'Français' },
    data.linkLowCost && { href: data.linkLowCost, label: t('Versão simplificada', 'Simplified version') },
  ].filter(Boolean) as { href: string; label: string; sub?: string }[];
  const facts = [
    { k: t('Função', 'Role'), v: meta.role[lang] },
    { k: t('Resultado', 'Outcome'), v: meta.outcome[lang] },
    { k: t('Área', 'Area'), v: THEME_LABEL[meta.theme][lang] },
    { k: t('Período', 'Period'), v: meta.year },
    { k: t('Local', 'Location'), v: meta.place[lang] },
    data.officialNetwork && { k: t('Rede', 'Network'), v: data.officialNetwork },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <article className="wrap pt-10 md:pt-14">
      <Link href="/projetos" className="t-label text-mute hover:text-ink inline-flex items-center gap-1.5 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {t('Projetos', 'Work')}
      </Link>

      {/* Título e capa, sobre o tom da área */}
      <div className="mt-8 rounded-4xl p-3 md:p-4" style={{ background: TONE[meta.theme].tint }}>
        <header className="px-4 pt-8 pb-10 md:px-8 md:pt-12 md:pb-14" data-reveal>
          <p className="t-label inline-flex items-center gap-2" style={{ color: TONE[meta.theme].deep }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: TONE[meta.theme].deep }} />
            {THEME_LABEL[meta.theme][lang]} · {meta.year}
          </p>
          <h1 className="mt-4 t-hero !text-[clamp(2.5rem,1.4rem+4vw,4.75rem)] text-ink max-w-[20ch] text-balance">{data.headerTitle}</h1>
          <p className="mt-6 t-lead text-ink/70 max-w-2xl text-pretty">{meta.summary[lang]}</p>
        </header>
        <div className={`media rounded-3xl aspect-[4/3] md:aspect-[16/8] ${meta.logo ? 'bg-white' : ''}`} data-reveal style={{ ['--delay' as any]: '100ms' }}>
          <img src={data.watermark || meta.image} alt="" className={meta.logo ? '!object-contain p-[12%]' : ''} />
        </div>
      </div>

      {/* Ficha */}
      <dl className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6" data-reveal>
        {facts.map((f) => (
          <div key={f.k} className="border-t border-line pt-4">
            <dt className="t-label text-mute">{f.k}</dt>
            <dd className="mt-1 text-[15px] text-ink leading-snug">{f.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-14">
        {/* Lateral */}
        <aside className="lg:col-span-4 lg:order-2">
          <div className="lg:sticky lg:top-24 space-y-10">
            {(data.stats || []).length > 0 && (
              <div data-reveal>
                <p className="t-label text-mute">{t('Em síntese', 'At a glance')}</p>
                <dl className="mt-4 divide-y divide-line border-y border-line">
                  {data.stats!.map((s) => (
                    <div key={s.label} className="py-4">
                      <dt className="t-label text-mute">{s.label}</dt>
                      <dd className="mt-1 text-[1.125rem] font-semibold tracking-[-0.02em] text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {links.length > 0 && (
              <div data-reveal>
                <p className="t-label text-mute">{t('Documentação', 'Documentation')}</p>
                <ul className="mt-4 space-y-2">
                  {links.map((l, i) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center justify-between gap-4 rounded-2xl px-5 py-4 transition-colors ${i === 0 ? 'bg-ink text-white hover:bg-black' : 'bg-soft text-ink hover:bg-line'}`}
                      >
                        <span className="min-w-0">
                          <span className="block text-[15px] font-medium">{l.label}</span>
                          {l.sub && <span className={`block t-label truncate ${i === 0 ? 'text-white/60' : 'text-mute'}`}>{l.sub}</span>}
                        </span>
                        <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>

        {/* Conteúdo */}
        <div className="lg:col-span-8 lg:order-1 space-y-20">
          <section data-reveal>
            <h2 className="t-h3 text-ink">{t('Enquadramento', 'Background')}</h2>
            <div className="mt-5 prose-case text-[1.1875rem] leading-[1.7] tracking-[-0.01em]">{data.description}</div>
            {data.quote && (
              <blockquote className="mt-12 border-l-2 border-ink pl-6">
                <p className="text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-snug font-medium tracking-[-0.025em] text-ink text-balance">“{data.quote}”</p>
              </blockquote>
            )}
          </section>

          {data.pillars?.length > 0 && (
            <section data-reveal>
              <h2 className="t-h3 text-ink">{data.pillarTabLabel || t('Eixos de intervenção', 'Areas of intervention')}</h2>
              {data.pillarDesc && <p className="mt-3 text-[1.0625rem] leading-relaxed text-mute max-w-2xl">{data.pillarDesc}</p>}
              <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                {data.pillars.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <li key={i} className="border-t border-line pt-5">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-soft text-ink grid place-items-center shrink-0">
                          {Icon && <Icon className="w-4 h-4" strokeWidth={1.75} />}
                        </span>
                        <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">{p.title}</h3>
                      </div>
                      {p.desc && <p className="mt-3 text-[15px] leading-relaxed text-mute">{p.desc}</p>}
                      {p.items && (
                        <ul className="mt-3 space-y-1 text-[15px] text-mute list-disc pl-5">
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
            <section data-reveal>
              <h2 className="t-h3 text-ink">{t('Registo fotográfico', 'Photo record')}</h2>
              {data.videoEmbed && <div className="mt-6">{data.videoEmbed}</div>}
              {gal.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {gal.map((img, i) => (
                    <button
                      key={img + i}
                      onClick={() => setLightbox(i)}
                      aria-label={`${t('Ampliar imagem', 'Enlarge image')} ${i + 1}`}
                      className={`group media rounded-2xl ${i === 0 && gal.length % 2 === 1 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}
                    >
                      <img src={img} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      {/* Projeto anterior / seguinte */}
      <nav className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-6" aria-label={t('Outros projetos', 'Other projects')}>
        {[
          { p: prev, label: t('Anterior', 'Previous') },
          { p: next, label: t('Seguinte', 'Next') },
        ].map(({ p, label }) => (
          <Link key={label} href={`/projetos/${p.id}`} className="group block">
            <div className="media rounded-3xl aspect-[16/9]">
              <img src={p.image} alt="" loading="lazy" />
            </div>
            <p className="mt-4 t-label text-mute">{label}</p>
            <p className="mt-1 text-[1.25rem] font-semibold tracking-[-0.025em] text-ink">{p.title[lang]}</p>
          </Link>
        ))}
      </nav>

      {/* Galeria ampliada */}
      {lightbox !== null && gal[lightbox] && (
        <div role="dialog" aria-modal="true" aria-label={t('Galeria', 'Gallery')} className="fixed inset-0 z-[700] bg-black/95 flex flex-col" onClick={() => setLightbox(null)}>
          <div className="wrap h-16 flex items-center justify-between shrink-0 text-white t-label">
            <span className="tabular-nums">
              {lightbox + 1} / {gal.length}
            </span>
            <button onClick={() => setLightbox(null)} aria-label={t('Fechar', 'Close')} className="w-9 h-9 rounded-full grid place-items-center hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 min-h-0 relative flex items-center justify-center px-4 md:px-20 pb-10">
            <img src={gal[lightbox]} alt="" onClick={(e) => e.stopPropagation()} className="max-w-full max-h-full object-contain rounded-xl" />
            {gal.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox - 1 + gal.length) % gal.length);
                  }}
                  aria-label={t('Imagem anterior', 'Previous image')}
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox + 1) % gal.length);
                  }}
                  aria-label={t('Imagem seguinte', 'Next image')}
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20"
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
