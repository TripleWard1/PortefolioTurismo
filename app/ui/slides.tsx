'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Check, Copy, Linkedin, Mail } from 'lucide-react';
import { useLang } from './LanguageContext';
import AtlasMap, { MISSION_POINTS } from './AtlasMap';
import { AREAS, PROJECTS, THEME_LABEL, type ProjectMeta, type Theme, type L } from './projects';

export interface Slide {
  id: string;
  label: L;
  fundo?: string;
  corpo: (ativo: boolean) => ReactNode;
}

const EMAIL = 'hugo.barros@cm-braga.pt';
const LINKEDIN = 'https://www.linkedin.com/in/hugo-abreu-barros/';
const PORTRAIT = 'https://i.imgur.com/Dx42oze.jpeg';
const ofTheme = (th: Theme) => PROJECTS.filter((p) => p.theme === th);

/* --- Peças ---------------------------------------------------------------- */
function Contador({ valor, ativo, duracao = 1400 }: { valor: number; ativo: boolean; duracao?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!ativo) return setV(0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setV(valor);
    let raf = 0;
    const t0 = performance.now();
    const passo = (t: number) => {
      const k = Math.min(1, (t - t0) / duracao);
      setV(Math.round(valor * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [ativo, valor, duracao]);
  return <>{String(v).padStart(2, '0')}</>;
}

function Cabeca({ sobre, titulo, className = 'e1' }: { sobre: string; titulo: ReactNode; className?: string }) {
  return (
    <>
      <div className={`sobre mb-[clamp(14px,1.6vw,26px)] ${className}`}>{sobre}</div>
      <h2 className="tit e2 max-w-[16em] mb-[clamp(26px,3.2vw,52px)]">{titulo}</h2>
    </>
  );
}

function Cartao({ p, onOpen, k, grande = false }: { p: ProjectMeta; onOpen: (id: string) => void; k: number; grande?: boolean }) {
  const { lang, t } = useLang();
  return (
    <button onClick={() => onOpen(p.id)} className={`cartao group text-left e${Math.min(7, k + 3)}`} aria-label={`${p.title[lang]} — ${t('abrir dossier', 'open dossier')}`}>
      <div className={`cartao-img ${grande ? 'lg:!aspect-[2/1]' : ''}`}>
        <img src={p.image} alt="" loading="lazy" />
      </div>
      <div className="mt-[18px] flex items-center justify-between gap-3 font-mono text-[11px] tracking-[0.14em] uppercase text-tx3">
        <span className="text-v truncate">{p.status[lang]}</span>
        <span className="shrink-0 tnum">{p.year}</span>
      </div>
      <h3 className={`mt-2.5 font-medium tracking-[-0.03em] leading-[1.05] ${grande ? 'text-[clamp(26px,2.4vw,40px)]' : 'text-[clamp(21px,1.7vw,30px)]'}`}>
        {p.title[lang]}
      </h3>
      <p className={`mt-2 text-tx2 leading-[1.4] ${grande ? 'text-[clamp(15px,1.15vw,19px)] max-w-[30em]' : 'text-[15px] line-clamp-2'}`}>
        {grande ? p.summary[lang] : p.place[lang]}
      </p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-tx opacity-70 group-hover:opacity-100 group-hover:text-v transition-colors">
        {t('Dossier', 'Dossier')} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
}

function ProjetosCapitulo({ n, th, titulo, onOpen, grande = false }: { n: string; th: Theme; titulo: string; onOpen: (id: string) => void; grande?: boolean }) {
  const { lang } = useLang();
  const items = ofTheme(th);
  const area = AREAS.find((a) => a.id === th)!;
  const cols = grande ? 'lg:grid-cols-2' : items.length === 3 ? 'lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4';
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 items-end">
        <div className="lg:col-span-8">
          <Cabeca sobre={`${n} · ${area.label[lang]}`} titulo={titulo} />
        </div>
        <p className="e3 lg:col-span-4 text-tx2 text-[clamp(15px,1.15vw,19px)] leading-[1.4] mb-[clamp(26px,3.2vw,52px)]">{area.description[lang]}</p>
      </div>
      <div className={`grid grid-cols-1 ${cols} gap-x-[clamp(14px,1.6vw,28px)] gap-y-10`}>
        {items.map((p, k) => (
          <Cartao key={p.id} p={p} onOpen={onOpen} k={k} grande={grande} />
        ))}
      </div>
    </div>
  );
}

/* --- Capítulos ------------------------------------------------------------ */
function Capa({ seguinte }: { seguinte: () => void }) {
  const { t } = useLang();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
      <div className="lg:col-span-9">
        <div className="sobre e1 mb-[clamp(18px,2vw,30px)] flex flex-wrap gap-x-3 gap-y-2 leading-tight">
          <span>{t('Município de Braga', 'Municipality of Braga')}</span>
          <span>· {t('Turismo', 'Tourism')}</span>
          <span>· 2024—2026</span>
        </div>
        <h1 className="marca e2">
          Hugo
          <br />
          Barros<span className="text-v">.</span>
        </h1>
        <p className="lema e3 mt-[clamp(18px,2vw,32px)] max-w-[22em] text-[clamp(22px,2.3vw,40px)]">
          {t(
            'Estratégia de destino para Braga, da Comissão Europeia ao produto turístico local.',
            'Destination strategy for Braga, from the European Commission to local tourism products.'
          )}
        </p>
        <div className="e4 mt-[clamp(28px,5vh,64px)] flex flex-wrap items-center gap-x-8 gap-y-4">
          <button onClick={seguinte} className="h-12 px-6 rounded-[4px] bg-v text-white font-medium text-[15px] inline-flex items-center gap-2.5 hover:bg-[#e01e1e] transition-colors">
            {t('Explorar o portefólio', 'Explore the portfolio')}
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-tx3 text-[clamp(14px,1.05vw,17px)]">
            {t('Técnico Superior · Inovação e Desenvolvimento Turístico', 'Senior Officer · Tourism Innovation & Development')}
          </span>
        </div>
      </div>
      <figure className="e5 hidden lg:block lg:col-span-3">
        <div className="aspect-[4/5] rounded-[6px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,.9),0_0_0_1px_var(--l)]">
          <img src={PORTRAIT} alt="Hugo Barros" className="w-full h-full object-cover object-[64%_18%]" />
        </div>
        <figcaption className="mt-3 font-mono text-[11px] tracking-[0.14em] uppercase text-tx3">Hugo Barros · {t('Braga', 'Braga')}</figcaption>
      </figure>
    </div>
  );
}

function Perfil() {
  const { t } = useLang();
  const pontos = [
    [t('Estratégia de destino.', 'Destination strategy.'), t('Posicionamento de Braga e coordenação de conteúdos e plataformas oficiais.', 'Positioning Braga and coordinating official content and platforms.')],
    [t('Candidaturas e redes europeias.', 'European bids and networks.'), t('Dossiês técnicos para títulos europeus e participação em redes de cooperação.', 'Technical dossiers for European titles and work within cooperation networks.')],
    [t('Produto turístico.', 'Tourism product.'), t('Roteiros, cartografia, publicações oficiais e experiências sustentáveis.', 'Itineraries, cartography, official publications and sustainable experiences.')],
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-[clamp(30px,5vw,96px)] items-center">
      <div>
        <Cabeca sobre={t('Perfil', 'Profile')} titulo={t('Do dossiê europeu ao roteiro infantil.', 'From the European dossier to the children’s itinerary.')} />
        <ol className="grid gap-[clamp(14px,1.8vw,26px)]">
          {pontos.map(([b, x], k) => (
            <li key={b} className={`e${k + 3} relative pl-[52px] text-[clamp(17px,1.4vw,23px)] leading-[1.35] text-tx2 max-w-[34em]`}>
              <span className="absolute left-0 top-[0.3em] font-mono text-[14px] text-v">{String(k + 1).padStart(2, '0')}</span>
              <b className="font-medium text-tx">{b}</b> {x}
            </li>
          ))}
        </ol>
      </div>
      <div className="e4 border-l border-ln pl-[clamp(24px,3vw,54px)]">
        <p className="lema text-[clamp(24px,2.4vw,40px)] text-tx">
          {t(
            '«O valor real nasce da interseção entre visão territorial e execução estratégica.»',
            '“Real value is born where territorial vision meets strategic execution.”'
          )}
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ln pt-6">
          {[
            [t('Função', 'Position'), t('Técnico Superior', 'Senior Officer')],
            [t('Entidade', 'Organisation'), t('Município de Braga', 'Municipality of Braga')],
            [t('Divisão', 'Division'), t('Atividades Económicas e Turismo', 'Economic Activities & Tourism')],
            [t('Base', 'Based in'), 'Braga, Portugal'],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-tx3">{k}</dt>
              <dd className="mt-1.5 text-[15px] text-tx">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function Numeros({ ativo }: { ativo: boolean }) {
  const { t } = useLang();
  const nums: [number, string][] = [
    [PROJECTS.length, t('dossiers de projeto documentados', 'documented project dossiers')],
    [29, t('experiências turísticas sustentáveis concebidas', 'sustainable tourism experiences designed')],
    [MISSION_POINTS.length, t('missões internacionais, em 3 países', 'international missions, in 3 countries')],
    [2, t('candidaturas a capitais europeias', 'bids for European capital titles')],
  ];
  return (
    <div>
      <Cabeca sobre={t('Em números', 'In numbers')} titulo={t('O trabalho, medido.', 'The work, measured.')} />
      <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-ln">
        {nums.map(([v, l], k) => (
          <div key={l} className={`e${k + 3} pt-[22px] px-[clamp(12px,1.6vw,28px)] border-l border-ln first:border-0 first:pl-0 [&:nth-child(3)]:max-lg:border-0 [&:nth-child(3)]:max-lg:pl-0 max-lg:[&:nth-child(n+3)]:mt-6`}>
            <b className={`num block text-[clamp(56px,6vw,110px)] ${k === 0 ? 'text-v' : ''}`}>
              <Contador valor={v} ativo={ativo} />
            </b>
            <span className="block mt-3 text-[clamp(14px,1.1vw,18px)] text-tx2 max-w-[14em]">{l}</span>
          </div>
        ))}
      </div>
      <p className="e7 mt-[clamp(30px,5vh,60px)] text-[clamp(18px,1.6vw,26px)] leading-[1.3] text-tx2 max-w-[30em]">
        <b className="font-medium text-tx">{t('Cada projeto tem um dossier', 'Every project has a dossier')}</b>{' '}
        {t('com enquadramento, eixos de intervenção, registo fotográfico e documentos oficiais.', 'with context, areas of intervention, photo record and official documents.')}
      </p>
    </div>
  );
}

function Missoes({ ativo, onOpen }: { ativo: boolean; onOpen: (id: string) => void }) {
  const { t, lang } = useLang();
  const [hot, setHot] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-[clamp(28px,4vw,80px)] items-center">
      <div>
        <Cabeca sobre={t('02 · Missões internacionais', '02 · International missions')} titulo={t('Seis missões, um ponto de partida.', 'Six missions, one point of departure.')} />
        <ul className="border-t border-ln" onMouseLeave={() => setHot(null)}>
          {MISSION_POINTS.map((m, k) => {
            const on = hot === m.id;
            return (
              <li key={m.id} className="linha border-b border-ln" style={{ ['--d' as any]: `${0.5 + k * 0.08}s` }}>
                <button
                  onMouseEnter={() => setHot(m.id)}
                  onFocus={() => setHot(m.id)}
                  onClick={() => onOpen(m.id)}
                  className="w-full text-left py-3 grid grid-cols-[1fr_auto_auto] gap-4 items-center"
                >
                  <span className="min-w-0">
                    <span className={`block text-[clamp(17px,1.35vw,22px)] font-medium tracking-[-0.02em] transition-colors ${on ? 'text-v' : 'text-tx'}`}>
                      {m.city[lang]} <span className="text-tx3 font-normal">· {m.country[lang]}</span>
                    </span>
                    <span className="block text-[13px] text-tx3 truncate">{m.event}</span>
                  </span>
                  <span className="font-mono text-[12px] text-tx3 tnum">{m.km.toLocaleString('pt-PT')} km</span>
                  <ArrowUpRight className={`w-4 h-4 transition-all ${on ? 'text-v rotate-45' : 'text-tx3'}`} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="e4 rounded-[6px] overflow-hidden bg-sup shadow-[0_0_0_1px_var(--l)]">
        <AtlasMap ativo={ativo} hot={hot} setHot={setHot} onOpen={onOpen} />
      </div>
    </div>
  );
}

function Indice({ onOpen }: { onOpen: (id: string) => void }) {
  const { t, lang } = useLang();
  const [f, setF] = useState<Theme | 'todos'>('todos');
  const lista = PROJECTS.filter((p) => f === 'todos' || p.theme === f);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 items-end">
        <div className="lg:col-span-7">
          <Cabeca sobre={t('Índice', 'Index')} titulo={t('Todos os dossiers.', 'Every dossier.')} />
        </div>
        <div className="e3 lg:col-span-5 flex flex-wrap gap-2 mb-[clamp(20px,2.6vw,40px)] lg:justify-end" role="tablist">
          {[{ id: 'todos' as const, label: t('Todos', 'All') }, ...AREAS.map((a) => ({ id: a.id, label: a.label[lang] }))].map((x) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={f === x.id}
              onClick={() => setF(x.id)}
              className={`h-9 px-3.5 rounded-[3px] text-[13px] transition-colors ${f === x.id ? 'bg-tx text-bg' : 'bg-sup text-tx2 hover:text-tx'}`}
            >
              {x.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-[2px] text-[clamp(13px,1.02vw,16px)]" role="table">
        <div role="row" className="linha grid grid-cols-[40px_minmax(0,1.6fr)_minmax(0,1.2fr)_minmax(0,1fr)_70px] gap-3 px-4 pb-1.5 text-tx3 text-[0.86em] max-md:hidden" style={{ ['--d' as any]: '0.4s' }}>
          <span role="columnheader">N.º</span>
          <span role="columnheader">{t('Projeto', 'Project')}</span>
          <span role="columnheader">{t('Área', 'Area')}</span>
          <span role="columnheader">{t('Local', 'Location')}</span>
          <span role="columnheader" className="text-right">{t('Ano', 'Year')}</span>
        </div>
        {lista.map((p, k) => (
          <button
            key={`${f}-${p.id}`}
            role="row"
            onClick={() => onOpen(p.id)}
            className="linha group text-left grid grid-cols-[40px_minmax(0,1fr)_auto] md:grid-cols-[40px_minmax(0,1.6fr)_minmax(0,1.2fr)_minmax(0,1fr)_70px] gap-3 items-center px-4 py-[11px] bg-sup rounded-[3px] hover:bg-v transition-colors"
            style={{ ['--d' as any]: `${0.45 + k * 0.05}s` }}
          >
            <span role="cell" className="font-mono text-[12px] text-tx3 group-hover:text-white/80 tnum">{String(PROJECTS.indexOf(p) + 1).padStart(2, '0')}</span>
            <span role="cell" className="font-medium text-tx group-hover:text-white truncate">{p.title[lang]}</span>
            <span role="cell" className="text-tx2 group-hover:text-white/90 truncate max-md:hidden">{THEME_LABEL[p.theme][lang]}</span>
            <span role="cell" className="text-tx2 group-hover:text-white/90 truncate max-md:hidden">{p.place[lang]}</span>
            <span role="cell" className="text-tx2 group-hover:text-white text-right tnum">{p.year}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Contacto() {
  const { t } = useLang();
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <div className="max-w-[1100px]">
      <div className="sobre e1 mb-[clamp(14px,1.6vw,26px)]">{t('Contacto', 'Contact')}</div>
      <h2 className="e2 font-medium tracking-[-0.05em] leading-[0.98] text-[clamp(44px,6vw,104px)] max-w-[12em]">
        {t('Vamos conversar', 'Let’s talk')}
        <span className="text-v">.</span>
      </h2>
      <p className="lema e3 mt-[clamp(18px,2vw,32px)] max-w-[24em] text-[clamp(20px,2vw,34px)]">
        {t(
          'Cooperação institucional, redes europeias e projetos de desenvolvimento turístico.',
          'Institutional cooperation, European networks and tourism development projects.'
        )}
      </p>
      <div className="e4 mt-[clamp(30px,6vh,72px)] flex flex-wrap gap-3">
        <div className="flex items-stretch rounded-[4px] overflow-hidden bg-sup shadow-[0_0_0_1px_var(--l)]">
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 px-5 h-14 text-[clamp(15px,1.2vw,19px)] hover:bg-sup2 transition-colors">
            <Mail className="w-5 h-5 text-v" />
            {EMAIL}
          </a>
          <button onClick={copiar} aria-label={t('Copiar email', 'Copy email')} className="w-14 border-l border-ln grid place-items-center hover:bg-sup2 transition-colors">
            {copiado ? <Check className="w-4 h-4 text-v" /> : <Copy className="w-4 h-4 text-tx2" />}
          </button>
        </div>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="h-14 px-5 rounded-[4px] bg-v text-white inline-flex items-center gap-3 text-[clamp(15px,1.2vw,19px)] font-medium hover:bg-[#e01e1e] transition-colors">
          <Linkedin className="w-5 h-5" />
          LinkedIn
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
      <p aria-live="polite" className={`mt-3 text-[13px] text-v transition-opacity ${copiado ? 'opacity-100' : 'opacity-0'}`}>
        {t('Email copiado.', 'Email copied.')}
      </p>
      <div className="e5 mt-[clamp(28px,6vh,80px)] text-[clamp(20px,1.8vw,30px)] font-medium">{t('Obrigado.', 'Thank you.')}</div>
      <div className="e6 mt-2 text-[13px] text-tx3">
        © {new Date().getFullYear()} Hugo Barros · {t('Divisão de Atividades Económicas e Turismo, Município de Braga', 'Economic Activities and Tourism Division, Municipality of Braga')}
      </div>
    </div>
  );
}

/* --- Sequência ------------------------------------------------------------ */
export function buildSlides(onOpen: (id: string) => void, seguinte: () => void, t: <A, B>(a: A, b: B) => A | B): Slide[] {
  return [
    { id: 'inicio', label: { pt: 'Início', en: 'Home' }, fundo: 'https://i.imgur.com/SvJ4bdR.jpeg', corpo: () => <Capa seguinte={seguinte} /> },
    { id: 'perfil', label: { pt: 'Perfil', en: 'Profile' }, corpo: () => <Perfil /> },
    { id: 'numeros', label: { pt: 'Em números', en: 'In numbers' }, fundo: 'https://i.imgur.com/GBs8DY7.jpeg', corpo: (a) => <Numeros ativo={a} /> },
    {
      id: 'candidaturas',
      label: { pt: 'Candidaturas europeias', en: 'European bids' },
      corpo: () => <ProjetosCapitulo n="01" th="europeu" titulo={t('Braga nas decisões europeias.', 'Braga in European decisions.')} onOpen={onOpen} />,
    },
    { id: 'missoes', label: { pt: 'Missões internacionais', en: 'International missions' }, corpo: (a) => <Missoes ativo={a} onOpen={onOpen} /> },
    {
      id: 'promocao',
      label: { pt: 'Promoção internacional', en: 'International promotion' },
      corpo: () => <ProjetosCapitulo n="03" th="internacional" titulo={t('Braga nos mercados internacionais.', 'Braga in international markets.')} onOpen={onOpen} />,
    },
    {
      id: 'digital',
      label: { pt: 'Inovação digital', en: 'Digital innovation' },
      corpo: () => <ProjetosCapitulo n="04" th="digital" titulo={t('Infraestrutura para a nova economia urbana.', 'Infrastructure for the new urban economy.')} onOpen={onOpen} grande />,
    },
    {
      id: 'patrimonio',
      label: { pt: 'Produto e património', en: 'Product & heritage' },
      corpo: () => <ProjetosCapitulo n="05" th="produto" titulo={t('Do património milenar às novas gerações.', 'From ancient heritage to new generations.')} onOpen={onOpen} />,
    },
    { id: 'indice', label: { pt: 'Índice', en: 'Index' }, corpo: () => <Indice onOpen={onOpen} /> },
    { id: 'contacto', label: { pt: 'Contacto', en: 'Contact' }, fundo: 'https://i.imgur.com/mgdxHtt.jpeg', corpo: () => <Contacto /> },
  ];
}
