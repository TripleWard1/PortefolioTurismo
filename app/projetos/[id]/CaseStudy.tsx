'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Link2, X } from 'lucide-react';
import { useLang } from '../../ui/LanguageContext';
import { getDossiers } from '../../ui/dossiers';
import { THEME_LABEL, byId, neighbours } from '../../ui/projects';
import { STORY } from '../../ui/narrative';
import { Split } from '../../ui/parts';
import { useScrollLock } from '../../ui/hooks';
import { TONE } from '../../ui/viz/palette';

export default function CaseStudy({ id }: { id: string }) {
  const { lang } = useLang();
  // Sem tradução, usa o PT
  const t = (pt: any, en?: any) => (lang === 'en' && en ? en : pt);
  const data = useMemo(() => getDossiers(t)[id], [lang, id]); // eslint-disable-line react-hooks/exhaustive-deps
  const meta = byId(id)!;
  const story = STORY[id];
  const { prev, next } = neighbours(id);
  const tone = TONE[meta.theme];
  const gal: string[] = data?.gallery || [];
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  useScrollLock(lightbox !== null);

  // Galeria ampliada: teclado e gesto de deslizar
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
  const touchX = useRef<number | null>(null);

  if (!data) return null;

  const mainLink = data.externalLink || data.link;
  const links = [
    mainLink && { href: mainLink, label: data.externalLinkLabel || t('Documento oficial', 'Official document'), sub: data.externalSource },
    data.linkEN && { href: data.linkEN, label: t('Versão inglesa', 'English version') },
    data.linkES && { href: data.linkES, label: t('Versão espanhola', 'Spanish version') },
    data.linkFR && { href: data.linkFR, label: t('Versão francesa', 'French version') },
    data.linkLowCost && { href: data.linkLowCost, label: t('Versão simplificada', 'Simplified version') },
  ].filter(Boolean) as { href: string; label: string; sub?: string }[];

  const facts = [
    { k: t('Função', 'Role'), v: meta.role[lang] },
    { k: t('Resultado', 'Outcome'), v: meta.outcome[lang] },
    { k: t('Período', 'Period'), v: meta.year },
    { k: t('Local', 'Location'), v: meta.place[lang] },
  ];

  const cover = data.watermark || meta.image;
  const pics = gal.length ? gal : [meta.image];
  const storyImg = (i: number) => pics[(i + 1) % pics.length];
  const chapters = [
    story && { id: 'historia', label: t('História', 'Story') },
    { id: 'enquadramento', label: t('Enquadramento', 'Background') },
    data.pillars?.length > 0 && { id: 'eixos', label: t('Eixos', 'Pillars') },
    (gal.length > 0 || data.videoEmbed) && { id: 'registo', label: t('Registo', 'Gallery') },
    links.length > 0 && { id: 'documentacao', label: t('Documentação', 'Documents') },
  ].filter(Boolean) as { id: string; label: string }[];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <article>
      <ReadingProgress color={tone.glow} />

      {/* ───────────── Abertura ───────────── */}
      <header data-hero className="relative -mt-20 flex flex-col min-h-[92svh] md:min-h-[640px] md:h-[92svh] md:max-h-[1000px] overflow-hidden text-white" style={{ background: tone.dark }}>
        {meta.logo ? (
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute -right-32 -top-32 w-[720px] h-[720px] rounded-full opacity-50 blur-3xl" style={{ background: `radial-gradient(circle, ${tone.deep}, transparent 65%)` }} />
            <div className="grain absolute inset-0" />
          </div>
        ) : (
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            <div data-parallax="-0.2" className="absolute inset-0" style={{ ['--px-scale' as any]: 1.1 }}>
              <img src={cover} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,18,0.55)_0%,rgba(20,19,18,0.05)_30%,rgba(20,19,18,0.35)_60%,rgba(20,19,18,0.92)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,19,18,0.6)_0%,rgba(20,19,18,0.2)_50%,transparent_80%)]" />
            <div className="grain absolute inset-0" />
          </div>
        )}

        <div className="relative flex-1 w-full wrap flex flex-col justify-end pt-32 pb-8 md:pb-10">
          <div className={meta.logo ? 'grid grid-cols-1 lg:grid-cols-12 gap-10 items-end' : ''}>
            <div className={meta.logo ? 'lg:col-span-7' : ''}>
              <Link href="/projetos" className="hero-in t-label text-white/70 hover:text-white flex items-center gap-1.5 transition-colors w-fit">
                <ArrowLeft className="w-4 h-4" />
                {t('Todos os projetos', 'All projects')}
              </Link>
              <p className="hero-in mt-8 t-label flex items-center gap-2 w-fit" style={{ color: tone.glow, ['--d' as any]: '100ms' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: tone.glow }} />
                {THEME_LABEL[meta.theme][lang]}
              </p>
              <h1 className="mt-4 t-hero !text-[clamp(2.5rem,1.3rem+4.4vw,5.25rem)] text-white max-w-[18ch]">
                <Split auto delay={150} parts={[data.headerTitle]} />
              </h1>
              <p className="hero-in mt-6 t-lead text-white/75 max-w-2xl text-pretty" style={{ ['--d' as any]: '500ms' }}>
                {meta.summary[lang]}
              </p>
            </div>
            {meta.logo && (
              <div className="hero-in lg:col-span-5 rounded-4xl bg-white aspect-[4/3] grid place-items-center p-[12%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]" style={{ ['--d' as any]: '300ms' }}>
                <img src={cover} alt="" className="max-w-full max-h-full object-contain" />
              </div>
            )}
          </div>

          {/* Ficha em vidro */}
          <dl className="hero-in mt-10 grid grid-cols-2 md:grid-cols-4 rounded-3xl bg-white/10 backdrop-blur-xl ring-1 ring-inset ring-white/15 overflow-hidden" style={{ ['--d' as any]: '650ms' }}>
            {facts.map((f, i) => (
              <div key={f.k} className={`px-5 py-4 md:px-6 md:py-5 ${i > 0 ? 'md:border-l border-white/10' : ''} ${i % 2 === 1 ? 'border-l md:border-l' : ''} ${i > 1 ? 'border-t md:border-t-0' : ''} border-white/10`}>
                <dt className="t-label text-white/55">{f.k}</dt>
                <dd className="mt-1 text-[14px] md:text-[15px] leading-snug text-white">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Navegação por capítulos */}
      <ChapterNav chapters={chapters} color={tone.glow} />

      {/* ───────────── História: desafio, resposta, impacto ───────────── */}
      {story && (
        <section id="historia" className="py-24 md:py-32" style={{ background: tone.tint }}>
          <div className="wrap space-y-20 md:space-y-28">
            {[
              { k: t('O desafio', 'The challenge'), v: story.challenge[lang] },
              { k: t('A resposta', 'The response'), v: story.response[lang] },
              { k: t('O impacto', 'The impact'), v: story.impact[lang] },
            ].map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <div key={s.k} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  <div className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`} data-reveal>
                    <p className="flex items-baseline gap-4">
                      <span className="em text-[clamp(3.5rem,2.4rem+3vw,5.5rem)] leading-none" style={{ color: tone.deep }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="t-label text-ink/60">{s.k}</span>
                    </p>
                    <p className="mt-6 text-[clamp(1.375rem,1.05rem+1.1vw,2.125rem)] leading-[1.3] font-medium tracking-[-0.025em] text-ink text-pretty">{s.v}</p>
                  </div>
                  <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`} data-reveal style={{ ['--delay' as any]: '120ms' }}>
                    <button onClick={() => gal.length && setLightbox((i + 1) % gal.length)} className="group media block w-full rounded-4xl aspect-[4/3] cursor-zoom-in" aria-label={t('Ampliar imagem', 'Enlarge image')}>
                      <div className="px" data-parallax="0.05">
                        <img src={storyImg(i)} alt="" loading="lazy" />
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ───────────── Em síntese e citação ───────────── */}
      <section className="relative overflow-hidden text-white py-24 md:py-32" style={{ background: tone.dark }}>
        <div className="grain absolute inset-0" aria-hidden />
        <div className="relative wrap">
          {(data.stats || []).length > 0 && (
            <dl className="grid grid-cols-1 sm:grid-cols-3 border-y border-white/15" data-reveal>
              {data.stats!.map((s, i) => (
                <div key={s.label} className={`py-8 sm:px-8 ${i > 0 ? 'border-t sm:border-t-0 sm:border-l border-white/15' : 'sm:pl-0'}`}>
                  <dt className="t-label text-white/55">{s.label}</dt>
                  <dd className="mt-3 em text-[clamp(2rem,1.5rem+1.6vw,3rem)] leading-[1.05]" style={{ color: tone.glow }}>
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          {data.quote && (
            <blockquote className="mt-20 max-w-5xl" data-reveal>
              <span className="block em text-[6rem] leading-[0.5] h-10" style={{ color: tone.glow }} aria-hidden>
                “
              </span>
              <p className="text-[clamp(1.75rem,1.1rem+2.4vw,3.25rem)] leading-[1.15] font-medium tracking-[-0.035em] text-white text-balance">{data.quote}</p>
              {data.officialNetwork && <footer className="mt-6 t-label text-white/55">{data.officialNetwork}</footer>}
            </blockquote>
          )}
        </div>
      </section>

      {/* ───────────── Enquadramento ───────────── */}
      <section id="enquadramento" className="wrap py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28" data-reveal>
              <p className="t-label inline-flex items-center gap-2" style={{ color: tone.deep }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: tone.deep }} />
                {t('Enquadramento', 'Background')}
              </p>
              <h2 className="mt-4 t-h2 text-ink">
                <Split parts={[t('O projeto', 'The project'), { em: t('em detalhe', 'in detail'), color: tone.deep }, '.']} />
              </h2>
              <button onClick={copyLink} className="mt-8 t-label h-9 px-4 rounded-full bg-soft text-ink inline-flex items-center gap-2 hover:bg-line transition-colors">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                {copied ? t('Ligação copiada', 'Link copied') : t('Copiar ligação', 'Copy link')}
              </button>
            </div>
          </aside>
          <div className="lg:col-span-8" data-reveal>
            <div className="prose-case dropcap text-[1.1875rem] leading-[1.75] tracking-[-0.01em]">{data.description}</div>
          </div>
        </div>
      </section>

      {/* ───────────── Eixos ───────────── */}
      {data.pillars?.length > 0 && (
        <section id="eixos" className="bg-soft py-24 md:py-32">
          <div className="wrap">
            <header className="max-w-2xl" data-reveal>
              <p className="t-label" style={{ color: tone.deep }}>
                {data.pillarTabLabel || t('Eixos de intervenção', 'Areas of intervention')}
              </p>
              <h2 className="mt-4 t-h2 text-ink">
                <Split parts={[t('Como foi', 'How it was'), { em: t('construído', 'built'), color: tone.deep }, '.']} />
              </h2>
              {data.pillarDesc && <p className="mt-5 t-lead text-mute text-pretty">{data.pillarDesc}</p>}
            </header>
            <ol className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <li
                    key={i}
                    className="group rounded-4xl bg-white p-7 md:p-9 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.2)]"
                    data-reveal
                    style={{ ['--delay' as any]: `${(i % 2) * 90}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-12 h-12 rounded-2xl grid place-items-center transition-colors duration-500" style={{ background: tone.tint, color: tone.deep }}>
                        {Icon && <Icon className="w-5 h-5" strokeWidth={1.75} />}
                      </span>
                      <span className="em text-[2rem] leading-none text-ink/15">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="mt-8 text-[1.375rem] font-semibold tracking-[-0.025em] text-ink">{p.title}</h3>
                    {p.desc && <p className="mt-3 text-[15px] leading-relaxed text-mute text-pretty">{p.desc}</p>}
                    {p.items && (
                      <ul className="mt-4 space-y-1.5">
                        {p.items.map((it) => (
                          <li key={it} className="flex gap-2.5 text-[15px] text-mute">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tone.deep }} />
                            {it}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      {/* ───────────── Registo fotográfico ───────────── */}
      {(data.videoEmbed || gal.length > 0) && (
        <section id="registo" className="py-24 md:py-32">
          <div className="wrap flex items-end justify-between gap-6" data-reveal>
            <div>
              <p className="t-label" style={{ color: tone.deep }}>
                {t('Registo fotográfico', 'Photo record')}
              </p>
              <h2 className="mt-4 t-h2 text-ink">
                <Split parts={[t('No', 'On the'), { em: t('terreno', 'ground'), color: tone.deep }, '.']} />
              </h2>
            </div>
            {gal.length > 0 && <GalleryArrows targetId="gal-strip" />}
          </div>
          {data.videoEmbed && <div className="wrap mt-10">{data.videoEmbed}</div>}
          {gal.length > 0 && (
            <div id="gal-strip" className="strip mt-10 overflow-x-auto snap-x snap-mandatory no-scrollbar">
              <ul className="flex gap-4 w-max">
                {gal.map((img, i) => (
                  <li key={img + i} className="snap-start shrink-0">
                    <button
                      onClick={() => setLightbox(i)}
                      aria-label={`${t('Ampliar imagem', 'Enlarge image')} ${i + 1}`}
                      className={`group media block rounded-3xl h-[300px] md:h-[440px] cursor-zoom-in ${i % 3 === 0 ? 'w-[82vw] md:w-[620px]' : 'w-[64vw] md:w-[360px]'}`}
                    >
                      <img src={img} alt="" loading="lazy" />
                      <span className="absolute left-4 bottom-4 t-label text-white/90 bg-black/30 backdrop-blur px-2.5 py-1 rounded-full tabular-nums">
                        {String(i + 1).padStart(2, '0')} / {String(gal.length).padStart(2, '0')}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* ───────────── Documentação ───────────── */}
      {links.length > 0 && (
        <section id="documentacao" className="wrap pb-24 md:pb-32">
          <div className="rounded-4xl p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" style={{ background: tone.tint }} data-reveal>
            <div className="lg:col-span-5">
              <p className="t-label" style={{ color: tone.deep }}>
                {t('Documentação', 'Documents')}
              </p>
              <h2 className="mt-3 t-h3 text-ink">{t('Consultar as fontes oficiais do projeto.', 'See the project’s official sources.')}</h2>
            </div>
            <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {links.map((l, i) => (
                <li key={l.href} className={i === 0 && links.length % 2 === 1 ? 'sm:col-span-2' : ''}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between gap-4 rounded-2xl px-5 py-4 transition-colors ${i === 0 ? 'bg-ink text-white hover:bg-black' : 'bg-white text-ink hover:bg-white/70'}`}
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
        </section>
      )}

      {/* ───────────── Projeto seguinte ───────────── */}
      <nav aria-label={t('Outros projetos', 'Other projects')} className="relative -mb-32">
        <Link href={`/projetos/${next.id}`} className="group relative block overflow-hidden text-white" style={{ background: TONE[next.theme].dark }}>
          <div className="absolute inset-0" aria-hidden>
            <img src={next.image} alt="" loading="lazy" className={`w-full h-full transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04] ${next.logo ? 'object-contain p-[20%] opacity-20' : 'object-cover opacity-45'}`} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,18,0.2),rgba(20,19,18,0.85))]" />
            <div className="grain absolute inset-0" />
          </div>
          <div className="relative wrap py-24 md:py-36">
            <p className="t-label" style={{ color: TONE[next.theme].glow }}>
              {t('Projeto seguinte', 'Next project')} · {THEME_LABEL[next.theme][lang]}
            </p>
            <p className="mt-5 flex items-end justify-between gap-6">
              <span className="t-hero !text-[clamp(2.5rem,1.4rem+4.4vw,5.5rem)] max-w-[16ch]">{next.title[lang]}</span>
              <span className="shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-full bg-white text-ink grid place-items-center transition-transform duration-500 group-hover:rotate-[-45deg]">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </span>
            </p>
            <p className="mt-5 t-lead text-white/70 max-w-2xl text-pretty">{next.summary[lang]}</p>
          </div>
        </Link>
        <div className="absolute top-6 right-0 left-0">
          <div className="wrap flex justify-end">
            <Link href={`/projetos/${prev.id}`} className="t-label text-white/60 hover:text-white inline-flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              {t('Anterior', 'Previous')}: {prev.title[lang]}
            </Link>
          </div>
        </div>
      </nav>

      {/* Galeria ampliada */}
      {lightbox !== null && gal[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('Galeria', 'Gallery')}
          className="fixed inset-0 z-[700] bg-black/95 flex flex-col"
          onClick={() => setLightbox(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) setLightbox((lightbox + (dx < 0 ? 1 : -1) + gal.length) % gal.length);
            touchX.current = null;
          }}
        >
          <div className="wrap h-16 flex items-center justify-between shrink-0 text-white t-label">
            <span className="tabular-nums">
              {lightbox + 1} / {gal.length}
            </span>
            <button onClick={() => setLightbox(null)} aria-label={t('Fechar', 'Close')} className="w-9 h-9 rounded-full grid place-items-center hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 min-h-0 relative flex items-center justify-center px-4 md:px-20 pb-10">
            <img key={lightbox} src={gal[lightbox]} alt="" onClick={(e) => e.stopPropagation()} className="max-w-full max-h-full object-contain rounded-xl animate-[fadeUp_.4s_cubic-bezier(.22,1,.36,1)]" />
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

/* Barra de progresso de leitura */
function ReadingProgress({ color }: { color: string }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="fixed top-0 left-0 right-0 z-[450] h-[3px] origin-left pointer-events-none" style={{ transform: `scaleX(${p})`, background: color }} aria-hidden />;
}

/* Capítulos: pílula flutuante que indica a secção atual */
function ChapterNav({ chapters, color }: { chapters: { id: string; label: string }[]; color: string }) {
  const [active, setActive] = useState('');
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const on = () => {
      const first = document.getElementById(chapters[0]?.id);
      setVisible(!!first && first.getBoundingClientRect().top < window.innerHeight * 0.6 && document.documentElement.scrollHeight - window.scrollY - window.innerHeight > 500);
      let cur = '';
      chapters.forEach((c) => {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = c.id;
      });
      setActive(cur);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [chapters]);
  if (chapters.length < 2) return null;
  return (
    <nav
      aria-label="Capítulos"
      className={`hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-[420] items-center gap-1 rounded-full bg-white/80 backdrop-blur-xl p-1.5 ring-1 ring-black/5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {chapters.map((c) => {
        const on = active === c.id;
        return (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={`t-label h-9 px-4 rounded-full inline-flex items-center gap-2 transition-colors ${on ? 'bg-ink text-white' : 'text-mute hover:text-ink'}`}
          >
            {on && <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />}
            {c.label}
          </a>
        );
      })}
    </nav>
  );
}

/* Setas da faixa de fotografias */
function GalleryArrows({ targetId }: { targetId: string }) {
  const go = (dir: number) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollBy({ left: dir * Math.min(640, el.clientWidth * 0.8), behavior: 'smooth' });
  };
  return (
    <div className="hidden sm:flex gap-2 shrink-0">
      <button onClick={() => go(-1)} aria-label="Anterior" className="w-11 h-11 rounded-full ring-1 ring-inset ring-line grid place-items-center text-ink hover:bg-ink hover:text-white hover:ring-ink transition-colors">
        <ArrowLeft className="w-4 h-4" />
      </button>
      <button onClick={() => go(1)} aria-label="Seguinte" className="w-11 h-11 rounded-full ring-1 ring-inset ring-line grid place-items-center text-ink hover:bg-ink hover:text-white hover:ring-ink transition-colors">
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
