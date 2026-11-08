'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Mail } from 'lucide-react';
import { useLang } from './ui/LanguageContext';
import { Figures, PageHead } from './ui/parts';
import { MISSION_POINTS } from './ui/AtlasMap';
import { AREAS, PROJECTS, byId, THEME_LABEL, type Theme } from './ui/projects';
import { EMAIL } from './ui/Footer';
import ContourField from './ui/fx/ContourField';
import Globe from './ui/fx/Globe';
import { Marquee, WordCycle } from './ui/fx/Motion';
import AreaBar from './ui/viz/AreaBar';
import Gantt from './ui/viz/Gantt';
import { yearSpan } from './ui/viz/palette';
import { useMedia } from './ui/hooks';
import { TiltedGridHero } from '@/components/ui/tilted-grid-hero';
import { ProximityLetters } from '@/components/ui/variable-text-proximity';
import { FocusRail } from '@/components/ui/focus-rail';
import { MetroMapGallery, type MetroLine, type MetroStation } from '@/components/ui/metro-map-gallery';
import ArrowFillButton from '@/components/ui/arrow-fill-button';

const PORTRAIT = 'https://i.imgur.com/Dx42oze.jpeg';
const NETWORKS = [
  'Comissão Europeia',
  'European Capital of Smart Tourism',
  'European Capital of Small Retail',
  'URBACT · Cities After Dark',
  'Music Cities Awards',
  'SystemEU',
  'Visit Braga',
  'Fiets en Wandelbeurs',
  'ExpoVacaciones',
  'B-Travel',
];
const LINE_ORDER: Theme[] = ['europeu', 'internacional', 'digital', 'produto'];
// Ordem pela qual os projetos aparecem no carrossel em destaque
const RAIL = ['smart-tourism', 'braga-after-dark', 'visit-braga', 'cidade-bracvs', 'music-cities-awards', 'experiencias-sustentaveis', 'b-travel-barcelona', 'mapa-turistico-braga', 'systemeu-salamanca', 'small-retail-braga', 'roteiro-3-dias', 'fiets-wandelbeurs-gante', 'expovacaciones-bilbao'];

export default function Home() {
  const { t, lang } = useLang();
  const router = useRouter();
  const hero = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const narrow = useMedia('(max-width: 767px)');

  // Links antigos (/#projeto/<id>) passam para a página do projeto
  useEffect(() => {
    const h = window.location.hash;
    if (h.startsWith('#projeto/')) {
      const id = decodeURIComponent(h.slice(9));
      if (byId(id)) router.replace(`/projetos/${id}`);
    }
  }, [router]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  /* Mapa de metro: cada área é uma linha, cada projeto uma estação */
  const lines: MetroLine[] = LINE_ORDER.map((id, i) => ({ name: THEME_LABEL[id][lang], tone: (i + 1) as 1 | 2 | 3 | 4 }));
  const stations: MetroStation[] = LINE_ORDER.flatMap((id, line) =>
    PROJECTS.filter((p) => p.theme === id)
      .sort((a, b) => yearSpan(a.year)[0] - yearSpan(b.year)[0])
      .map((p, order) => ({
        id: p.id,
        line,
        order,
        title: p.title[lang],
        label: p.status[lang],
        date: p.year,
        description: p.summary[lang],
        image: p.image,
      }))
  );

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section ref={hero} className="relative">
        <TiltedGridHero
          images={PROJECTS.map((p) => ({ src: p.image, alt: p.title[lang] }))}
          className="h-[860px] md:h-[max(660px,min(100svh-76px,900px))] w-full"
          tileHeight={narrow ? 17 : 25}
          axis={narrow ? 84 : 73}
          curve={76}
          speed={4.5}
          fade={9}
          gap={5}
        >
          <div className="absolute inset-x-0 top-0 h-[60%] opacity-70 [mask-image:linear-gradient(180deg,#000_30%,transparent)] pointer-events-none">
            <ContourField />
          </div>
          <div className="relative z-10 wrap pt-10 md:pt-14 flex flex-col items-center text-center">
            <div className="rise inline-flex items-center gap-3 rounded-full border border-line bg-card/80 backdrop-blur pl-1.5 pr-4 py-1.5" style={{ ['--d' as any]: '80ms' }}>
              <span className="w-8 h-8 rounded-full overflow-hidden">
                <img src={PORTRAIT} alt="" className="w-full h-full object-cover object-[64%_18%]" />
              </span>
              <span className="text-[13px] text-ink">
                {t('Técnico Superior', 'Senior Officer')}
                <span className="text-muted-foreground"> · {t('Município de Braga', 'Municipality of Braga')}</span>
              </span>
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-petrol animate-ping opacity-60 motion-reduce:hidden" />
                <span className="relative w-2 h-2 rounded-full bg-petrol" />
              </span>
            </div>

            <h1
              className="rise mt-6 font-serif text-ink leading-[0.92] tracking-[-0.03em] text-[clamp(3.6rem,1.6rem+7vw,8.4rem)]"
              style={{ ['--d' as any]: '160ms', fontVariationSettings: "'wght' 400, 'opsz' 72" }}
              aria-label="Hugo Barros"
            >
              <ProximityLetters
                label="Hugo Barros"
                containerRef={hero}
                radius={190}
                falloff="gaussian"
                fromFontVariationSettings="'wght' 400, 'opsz' 72"
                toFontVariationSettings="'wght' 680, 'opsz' 72"
              />
            </h1>

            <p className="rise mt-4 font-serif text-[clamp(1.4rem,1.1rem+1.2vw,2.2rem)] text-ink/80" style={{ ['--d' as any]: '260ms' }}>
              {t('Levar Braga a', 'Taking Braga to')}{' '}
              <WordCycle className="italic text-petrol" words={[...MISSION_POINTS.map((m) => m.city[lang]), t('todo o lado', 'everywhere')]} />
            </p>
            <p className="rise mt-4 max-w-xl text-[17px] leading-relaxed text-muted-foreground text-pretty" style={{ ['--d' as any]: '340ms' }}>
              {t(
                'Estratégia de destino, candidaturas europeias, promoção internacional e produto turístico — da Comissão Europeia ao centro histórico.',
                'Destination strategy, European bids, international promotion and tourism product — from the European Commission to the historic centre.'
              )}
            </p>
            <div className="rise mt-7 flex flex-wrap items-center justify-center gap-3" style={{ ['--d' as any]: '420ms' }}>
              <ArrowFillButton
                btnText={t('Explorar projetos', 'Explore projects')}
                href="/projetos"
                onClick={go('/projetos')}
                bgColor="#1a1d21"
                textColor="#f4f1ea"
                fillBgColor="#0e5a6b"
                fillTextColor="#f4f1ea"
                hoverFillBgColor="#0e5a6b"
                hoverFillTextColor="#f4f1ea"
              />
              <a href={`mailto:${EMAIL}`} className="h-12 px-6 rounded-full border border-ink/15 bg-card/80 backdrop-blur text-ink font-semibold text-[15px] inline-flex items-center gap-2 hover:border-petrol/50 transition-colors">
                <Mail className="w-4 h-4" />
                {t('Enviar email', 'Send an email')}
              </a>
            </div>
          </div>
        </TiltedGridHero>

        {/* Redes e eventos */}
        <div className="relative border-y border-line bg-card/60 backdrop-blur py-4">
          <Marquee speed={55} gap={40}>
            {NETWORKS.map((n) => (
              <span key={n} className="flex items-center gap-10 font-serif italic text-[1.15rem] text-ink/70 whitespace-nowrap">
                {n}
                <span className="w-1.5 h-1.5 rounded-full bg-petrol/60" />
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ===================== NÚMEROS ===================== */}
      <section className="wrap mt-20">
        <Figures />
        <div className="mt-8" data-reveal>
          <AreaBar />
        </div>
      </section>

      {/* ===================== EM DESTAQUE (Focus Rail) ===================== */}
      <section className="mt-24 md:mt-32 bg-ink text-cream">
        <div className="wrap pt-16 md:pt-20 flex flex-wrap items-end justify-between gap-6">
          <div data-reveal>
            <p className="kicker !text-[#7fbfb8]">{t('Portefólio', 'Portfolio')}</p>
            <h2 className="mt-3 h-section text-cream">{t('Treze projetos, um de cada vez', 'Thirteen projects, one at a time')}</h2>
            <p className="mt-3 text-[16px] text-cream/65">{t('Arraste, use as setas do teclado ou clique numa capa lateral.', 'Drag, use the arrow keys or click a side cover.')}</p>
          </div>
          <Link href="/projetos" className="group inline-flex items-center gap-2 text-[15px] font-semibold text-cream" data-reveal>
            {t('Ver todos em grelha', 'See them all in a grid')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <FocusRail
          className="bg-ink"
          items={RAIL.map((id) => {
            const p = byId(id)!;
            return {
              id: p.id,
              title: p.title[lang],
              description: p.summary[lang],
              meta: `${THEME_LABEL[p.theme][lang]} · ${p.year}`,
              imageSrc: p.image,
              href: `/projetos/${p.id}`,
            };
          })}
        />
      </section>

      {/* ===================== ÁREAS (Metro Map) ===================== */}
      <section className="wrap mt-24 md:mt-32">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <PageHead
            kicker={t('Áreas de atuação', 'Areas of work')}
            title={t('Quatro linhas, treze estações', 'Four lines, thirteen stations')}
            intro={t(
              'Cada área de atuação é uma linha; cada projeto, uma estação. Passe por uma estação para a pré-visualizar e clique para abrir o projeto.',
              'Each area of work is a line; each project, a station. Hover a station to preview it and click to open the project.'
            )}
          />
          <div className="flex flex-wrap gap-2" data-reveal>
            {AREAS.map((a) => (
              <Link key={a.id} href={`/projetos?area=${a.id}`} className="h-9 px-3.5 rounded-full border border-line bg-card text-[13px] text-ink hover:border-petrol/50 transition-colors">
                {a.label[lang]}
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-line bg-card p-3 md:p-6" data-reveal>
          <MetroMapGallery
            items={stations}
            lines={lines}
            caption={t('Os comboios param em cada projeto. Escolha uma estação.', 'The trains stop at every project. Pick a station.')}
            trainSpeed={70}
            onOpenChange={(id) => id && router.push(`/projetos/${id}`)}
            labels={{ close: t('Fechar', 'Close'), previous: t('Anterior', 'Previous'), next: t('Seguinte', 'Next'), line: t('Linha', 'Line'), station: t('Estação', 'Station') }}
          />
        </div>
      </section>

      {/* ===================== GLOBO ===================== */}
      <section className="relative mt-24 md:mt-32 bg-petrol text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <ContourField color="244,241,234" levels={10} cell={16} />
        </div>
        <div className="relative wrap py-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <p className="kicker !text-cream/70">{t('Percurso internacional', 'International track record')}</p>
            <h2 className="mt-3 h-section text-cream">{t('Seis missões, três países, um ponto de partida', 'Six missions, three countries, one point of departure')}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-cream/75">
              {t('Escolha uma cidade para a encontrar no globo. Arraste o globo para o rodar.', 'Pick a city to find it on the globe. Drag the globe to rotate it.')}
            </p>
            <ul className="mt-8 divide-y divide-cream/15 border-y border-cream/15" onMouseLeave={() => setFocus(null)}>
              {MISSION_POINTS.map((m) => (
                <li key={m.id}>
                  <button
                    onMouseEnter={() => setFocus(m.id)}
                    onFocus={() => setFocus(m.id)}
                    onClick={() => router.push(`/projetos/${m.id}`)}
                    className="group w-full py-3.5 flex items-center gap-4 text-left"
                  >
                    <span className={`w-2 h-2 rounded-full transition-colors ${focus === m.id ? 'bg-cream' : 'bg-cream/30'}`} />
                    <span className="flex-1">
                      <span className={`font-serif text-[1.3rem] transition-colors ${focus === m.id ? 'text-cream' : 'text-cream/85'}`}>{m.city[lang]}</span>
                      <span className="text-cream/55 text-[14px]"> · {m.event}</span>
                    </span>
                    <span className="text-[13px] text-cream/55 tabular-nums">{m.km.toLocaleString('pt-PT')} km</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/percurso" className="group inline-flex items-center gap-2 text-[15px] font-semibold text-cream">
                {t('Ver o percurso completo', 'See the full track record')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Globe focus={focus} className="max-w-[620px] mx-auto" />
          </div>
        </div>
      </section>

      {/* ===================== CRONOLOGIA ===================== */}
      <section className="wrap mt-24 md:mt-32">
        <div className="mb-10">
          <PageHead
            kicker={t('Cronologia', 'Timeline')}
            title={t('2024 — 2026, projeto a projeto', '2024 — 2026, project by project')}
            intro={t('Cada barra é um projeto; a cor indica a área. Clique para abrir.', 'Each bar is a project; colour shows the area. Click to open.')}
          />
        </div>
        <div data-reveal>
          <Gantt compact />
        </div>
      </section>
    </>
  );
}
