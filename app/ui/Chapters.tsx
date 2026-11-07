'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Plus } from 'lucide-react';
import { useLang } from './LanguageContext';
import { AREAS, MISSIONS, PROJECTS, THEME_LABEL, type Theme } from './projects';

type Open = (id: string) => void;
const ofTheme = (th: Theme) => PROJECTS.filter((p) => p.theme === th);

/* --- Cabeçalho de capítulo ----------------------------------------------- */
export function SectionHead({
  n,
  eyebrow,
  title,
  intro,
  dark = false,
  className = '',
}: {
  n: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <header className={`grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-6 items-end ${className}`}>
      <div className="lg:col-span-7" data-reveal>
        <p className={`eyebrow flex items-center gap-3 ${dark ? 'text-gold-soft' : 'text-gold'}`}>
          <span className="rule" />
          {n} · {eyebrow}
        </p>
        <h2 className={`mt-5 display text-balance ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
      </div>
      {intro && (
        <p
          data-reveal
          style={{ ['--reveal-delay' as any]: '120ms' }}
          className={`lg:col-span-5 text-[17px] leading-relaxed text-pretty lg:pb-2 ${dark ? 'text-white/70' : 'text-muted'}`}
        >
          {intro}
        </p>
      )}
    </header>
  );
}

function DossierLink({ dark = false }: { dark?: boolean }) {
  const { t } = useLang();
  return (
    <span className={`inline-flex items-center gap-2 text-[14px] font-semibold ${dark ? 'text-gold-soft' : 'text-navy'}`}>
      {t('Consultar dossier', 'Open dossier')}
      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
    </span>
  );
}

/* --- 01 · Candidaturas europeias (scroll horizontal fixado) -------------- */
export function Candidacies({ onOpen }: { onOpen: Open }) {
  const { t, lang } = useLang();
  const items = ofTheme('europeu');
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [pinned, setPinned] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    const sec = section.current!;
    const tr = track.current!;
    let dist = 0;
    let raf = 0;
    const tick = () => {
      raf = 0;
      if (!mq.matches) return;
      const p = Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / Math.max(1, dist)));
      tr.style.transform = `translate3d(${-p * dist}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setIdx(Math.min(items.length - 1, Math.floor(p * items.length * 0.999)));
    };
    const measure = () => {
      setPinned(mq.matches);
      if (!mq.matches) {
        sec.style.height = '';
        tr.style.transform = '';
        return;
      }
      dist = Math.max(0, tr.scrollWidth - window.innerWidth);
      sec.style.height = `${dist + window.innerHeight}px`;
      tick();
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(tr);
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', measure);
    mq.addEventListener('change', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', measure);
      mq.removeEventListener('change', measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items.length]);

  // Setas (mobile / tablet)
  const scrollBy = (dir: number) => {
    const tr = track.current;
    if (tr) tr.scrollBy({ left: dir * tr.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section id="candidaturas" ref={section} className="relative bg-navy text-white">
      <div className={pinned ? 'sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center pt-20' : 'py-24'}>
        <div
          ref={track}
          className={`flex items-stretch gap-6 will-change-transform ${
            pinned ? 'pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] pr-[10vw]' : 'overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 sm:px-8 scroll-px-5 sm:scroll-px-8 pb-2'
          }`}
        >
          {/* Painel de abertura */}
          <div className="shrink-0 w-[85vw] sm:w-[60vw] lg:w-[30vw] snap-start flex flex-col justify-between pr-4">
            <div>
              <p className="eyebrow text-gold-soft flex items-center gap-3">
                <span className="rule" />
                01 · {t('Candidaturas europeias', 'European candidacies')}
              </p>
              <h2 className="mt-5 display text-white">
                {t('Braga nas', 'Braga in')} <em className="text-gold-soft">{t('decisões europeias', 'European decisions')}</em>
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-white/70 max-w-sm text-pretty">
                {t(
                  'Candidaturas a títulos europeus e participação em redes de cooperação — transformar potencial em influência direta.',
                  'Bids for European titles and participation in cooperation networks — turning potential into direct influence.'
                )}
              </p>
            </div>
            <div className="mt-10 flex items-center gap-5">
              {pinned ? (
                <>
                  <span className="text-[14px] tabular-nums text-white">
                    {String(idx + 1).padStart(2, '0')} <span className="text-white/45">/ {String(items.length).padStart(2, '0')}</span>
                  </span>
                  <span className="relative w-36 h-px bg-white/20 overflow-hidden">
                    <span ref={bar} className="absolute inset-0 bg-gold origin-left" style={{ transform: 'scaleX(0)' }} />
                  </span>
                </>
              ) : (
                <>
                  <button onClick={() => scrollBy(-1)} aria-label={t('Anterior', 'Previous')} className="w-11 h-11 border border-white/30 grid place-items-center hover:bg-white/10">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => scrollBy(1)} aria-label={t('Seguinte', 'Next')} className="w-11 h-11 border border-white/30 grid place-items-center hover:bg-white/10">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {items.map((p, i) => (
            <button
              key={p.id}
              onClick={() => onOpen(p.id)}
              className="group shrink-0 snap-start w-[85vw] sm:w-[60vw] lg:w-[40vw] xl:w-[36vw] text-left bg-navy-2 border border-white/10 hover:border-gold/60 transition-colors flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                <img src={p.image} alt="" loading={i < 2 ? 'eager' : 'lazy'} className="zoom-img w-full h-full object-cover" />
                <span className="absolute left-0 top-0 bg-navy/85 text-gold-soft font-serif text-[1.4rem] px-4 py-2">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="p-6 lg:p-7 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-4 eyebrow !tracking-[0.16em] text-white/55">
                  <span className="text-gold-soft">{p.status[lang]}</span>
                  <span>{p.year}</span>
                </div>
                <h3 className="mt-4 font-serif text-[1.9rem] leading-tight text-white">{p.title[lang]}</h3>
                <p className="mt-1.5 text-[14px] text-white/55 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {p.place[lang]}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-white/70 flex-1">{p.summary[lang]}</p>
                <span className="mt-6 pt-5 border-t border-white/10">
                  <DossierLink dark />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- 02 · Promoção internacional ---------------------------------------- */
export function Promotion({ onOpen }: { onOpen: Open }) {
  const { t, lang } = useLang();
  const fairs = ofTheme('internacional');
  return (
    <section id="promocao" className="bg-paper py-24 md:py-32">
      <div className="wrap">
        <SectionHead
          n="02"
          eyebrow={t('Promoção internacional', 'International promotion')}
          title={
            <>
              {t('Braga nos', 'Braga in')} <em className="text-navy">{t('mercados internacionais', 'international markets')}</em>
            </>
          }
          intro={t(
            'Representação institucional do Município em feiras de turismo e mercados emissores estratégicos.',
            'Institutional representation of the Municipality at tourism fairs and in strategic source markets.'
          )}
        />

        <div data-reveal="stagger" data-reveal-step="120" className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {fairs.map((f) => (
            <button key={f.id} onClick={() => onOpen(f.id)} className="group text-left bg-white border border-line hover:border-navy/40 transition-colors flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-paper-2">
                <img src={f.image} alt="" loading="lazy" className="zoom-img w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between eyebrow !tracking-[0.16em] text-muted">
                  <span className="text-gold">{f.status[lang]}</span>
                  <span>{f.year}</span>
                </div>
                <h3 className="mt-3 font-serif text-[1.6rem] leading-tight text-ink">{f.title[lang]}</h3>
                <p className="mt-1.5 text-[14px] text-muted flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {f.place[lang]}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted flex-1">{f.summary[lang]}</p>
                <span className="mt-5 pt-4 border-t border-line">
                  <DossierLink />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Presença internacional */}
        <div data-reveal className="mt-20">
          <div className="flex items-end justify-between gap-6 pb-5 border-b border-ink/80">
            <h3 className="font-serif text-[1.6rem] text-ink">{t('Presença internacional', 'International presence')}</h3>
            <span className="eyebrow text-muted hidden sm:block">{MISSIONS.length} {t('missões', 'missions')}</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {MISSIONS.map((m) => (
              <li key={m.id} className="border-b border-line">
                <button onClick={() => onOpen(m.id)} className="group w-full text-left py-5 pr-4 flex items-start justify-between gap-4">
                  <span>
                    <span className="block font-serif text-[1.35rem] text-ink group-hover:text-navy transition-colors">
                      {m.city[lang]}
                      <span className="text-muted text-[15px] font-sans"> · {m.country[lang]}</span>
                    </span>
                    <span className="block mt-1 text-[14px] text-muted">
                      {m.event} · {m.year}
                    </span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 mt-2 text-gold transition-transform duration-500 group-hover:rotate-45" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* --- 03 · Inovação digital ----------------------------------------------- */
export function Digital({ onOpen }: { onOpen: Open }) {
  const { t, lang } = useLang();
  const items = ofTheme('digital');
  return (
    <section id="digital" className="bg-navy text-white py-24 md:py-32">
      <div className="wrap">
        <SectionHead
          dark
          n="03"
          eyebrow={t('Inovação e ecossistema digital', 'Innovation & digital ecosystem')}
          title={
            <>
              {t('Infraestrutura para a', 'Infrastructure for the')} <em className="text-gold-soft">{t('nova economia urbana', 'new urban economy')}</em>
            </>
          }
          intro={t(
            'Plataformas digitais de destino e redes de transferência de conhecimento e inovação.',
            'Digital destination platforms and knowledge-transfer and innovation networks.'
          )}
        />
        <div data-reveal="stagger" data-reveal-step="140" className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((p) => (
            <button key={p.id} onClick={() => onOpen(p.id)} className="group text-left">
              <div className="relative aspect-[16/10] overflow-hidden bg-navy-2">
                <img src={p.image} alt="" loading="lazy" className="zoom-img w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <span className="absolute left-6 bottom-5 eyebrow text-gold-soft">{p.place[lang]}</span>
              </div>
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-12 gap-4 border-t border-white/0">
                <h3 className="sm:col-span-5 font-serif text-[2rem] leading-tight">{p.title[lang]}</h3>
                <div className="sm:col-span-7">
                  <p className="text-[15px] leading-relaxed text-white/70">{p.summary[lang]}</p>
                  <span className="mt-4 block">
                    <DossierLink dark />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- 04 · Produto turístico e património (linhas alternadas) ------------- */
export function Heritage({ onOpen }: { onOpen: Open }) {
  const { t, lang } = useLang();
  const items = ofTheme('produto');
  return (
    <section id="patrimonio" className="bg-white py-24 md:py-32">
      <div className="wrap">
        <SectionHead
          n="04"
          eyebrow={t('Produto turístico e património', 'Tourism product & heritage')}
          title={
            <>
              {t('Herança &', 'Heritage &')} <em className="text-navy">{t('futuro', 'future')}</em>
            </>
          }
          intro={t(
            'Produtos editoriais e experiências que ligam o património milenar de Braga às novas gerações.',
            'Editorial products and experiences linking Braga’s two-thousand-year heritage to new generations.'
          )}
        />
        <div className="mt-16 md:mt-20 space-y-20 md:space-y-28">
          {items.map((p, i) => (
            <button
              key={p.id}
              onClick={() => onOpen(p.id)}
              data-reveal
              className={`group w-full text-left grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-paper-2">
                <img src={p.image} alt="" loading="lazy" className="zoom-img w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-4 eyebrow !tracking-[0.16em] text-muted">
                  <span className="text-gold font-serif text-[1.3rem] tracking-normal normal-case">{String(i + 1).padStart(2, '0')}</span>
                  <span className="h-px flex-1 bg-line" />
                  <span>{p.place[lang]}</span>
                </div>
                <h3 className="mt-5 title text-ink text-balance">{p.title[lang]}</h3>
                <p className="mt-4 text-[17px] leading-relaxed text-muted text-pretty">{p.summary[lang]}</p>
                <span className="mt-7 inline-flex items-center gap-3">
                  <span className="w-11 h-11 border border-line grid place-items-center transition-colors duration-500 group-hover:bg-navy group-hover:border-navy">
                    <Plus className="w-4 h-4 text-ink transition-all duration-500 group-hover:text-white group-hover:rotate-90" />
                  </span>
                  <span className="text-[14px] font-semibold text-navy">{t('Dossier completo', 'Full dossier')}</span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Índice completo ----------------------------------------------------- */
export function ProjectIndex({ onOpen }: { onOpen: Open }) {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<Theme | 'todos'>('todos');
  const visible = PROJECTS.filter((p) => filter === 'todos' || p.theme === filter);
  const tabs: { id: Theme | 'todos'; label: string; n: number }[] = [
    { id: 'todos', label: t('Todos', 'All'), n: PROJECTS.length },
    ...AREAS.map((a) => ({ id: a.id, label: a.label[lang], n: ofTheme(a.id).length })),
  ];
  return (
    <section id="indice" className="bg-paper py-24 md:py-32 border-t border-line">
      <div className="wrap">
        <SectionHead
          n="05"
          eyebrow={t('Índice', 'Index')}
          title={
            <>
              {t('Todos os', 'All')} <em className="text-navy">{t('projetos', 'projects')}</em>
            </>
          }
          intro={t(
            `${PROJECTS.length} projetos, organizados por área de atuação. Cada um abre o respetivo dossier.`,
            `${PROJECTS.length} projects, organised by area of work. Each one opens its dossier.`
          )}
        />
        <div data-reveal className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label={t('Filtrar por área', 'Filter by area')}>
          {tabs.map((tb) => {
            const on = filter === tb.id;
            return (
              <button
                key={tb.id}
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(tb.id)}
                className={`h-10 px-4 border text-[14px] inline-flex items-center gap-2 transition-colors ${
                  on ? 'bg-navy border-navy text-white' : 'border-line text-ink hover:border-navy bg-white'
                }`}
              >
                {tb.label}
                <span className={`text-[12px] ${on ? 'text-white/60' : 'text-muted'}`}>{tb.n}</span>
              </button>
            );
          })}
        </div>

        <ul className="mt-8 border-t border-ink/80">
          {visible.map((p) => (
            <li key={p.id} className="border-b border-line">
              <button onClick={() => onOpen(p.id)} className="group w-full text-left py-4 grid grid-cols-[72px_1fr_auto] sm:grid-cols-[96px_1fr_auto] md:grid-cols-[96px_minmax(0,1.6fr)_minmax(0,1fr)_80px_24px] gap-x-5 items-center hover:bg-white transition-colors">
                <span className="aspect-[3/2] overflow-hidden bg-paper-2">
                  <img src={p.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-[1.25rem] leading-snug text-ink group-hover:text-navy transition-colors truncate">{p.title[lang]}</span>
                  <span className="block text-[13px] text-muted truncate">{p.place[lang]}</span>
                </span>
                <span className="hidden md:block text-[14px] text-muted truncate">{THEME_LABEL[p.theme][lang]}</span>
                <span className="hidden md:block text-[14px] text-muted tabular-nums">{p.year}</span>
                <ArrowRight className="w-4 h-4 text-navy transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

