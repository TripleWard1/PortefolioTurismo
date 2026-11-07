'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Briefcase, Globe2, Landmark, Mail, MonitorSmartphone } from 'lucide-react';
import { useLang } from './ui/LanguageContext';
import { Figures, PageHead, ProjectCard, TextLink } from './ui/parts';
import { MISSION_POINTS } from './ui/AtlasMap';
import { AREAS, PROJECTS, byId, type Theme } from './ui/projects';
import { EMAIL } from './ui/Footer';
import ContourField from './ui/fx/ContourField';
import Globe from './ui/fx/Globe';
import { Marquee, PhotoRiver, WordCycle } from './ui/fx/Motion';
import AreaBar from './ui/viz/AreaBar';
import Gantt from './ui/viz/Gantt';
import { AREA_COLOR } from './ui/viz/palette';

const PORTRAIT = 'https://i.imgur.com/Dx42oze.jpeg';
const FEATURED = ['smart-tourism', 'visit-braga', 'experiencias-sustentaveis'];
const ICONS: Record<Theme, typeof Globe2> = { europeu: Landmark, internacional: Globe2, digital: MonitorSmartphone, produto: Briefcase };
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

function Floating({ children, className, delay = 0 }: { children: React.ReactNode; className: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
      transition={
        reduce
          ? { duration: 0.6 }
          : { opacity: { duration: 0.8, delay }, y: { duration: 7, delay, repeat: Infinity, ease: 'easeInOut' } }
      }
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { t, lang } = useLang();
  const router = useRouter();
  const [focus, setFocus] = useState<string | null>(null);

  // Links antigos (/#projeto/<id>) passam para a página do projeto
  useEffect(() => {
    const h = window.location.hash;
    if (h.startsWith('#projeto/')) {
      const id = decodeURIComponent(h.slice(9));
      if (byId(id)) router.replace(`/projetos/${id}`);
    }
  }, [router]);

  const [big, ...rest] = FEATURED.map((id) => byId(id)!);
  const st = byId('smart-tourism')!;
  const ad = byId('braga-after-dark')!;

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent_5%,#000_55%),linear-gradient(0deg,transparent,#000_25%)] [mask-composite:intersect]">
          <ContourField />
        </div>

        <div className="relative wrap pt-12 md:pt-16 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center min-h-[min(86vh,820px)]">
          <div className="lg:col-span-7">
            <motion.p className="kicker flex items-center gap-2.5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-petrol animate-ping opacity-60 motion-reduce:hidden" />
                <span className="relative w-2 h-2 rounded-full bg-petrol" />
              </span>
              {t('Município de Braga · Turismo', 'Municipality of Braga · Tourism')}
            </motion.p>
            <motion.h1
              className="mt-5 font-serif font-medium text-ink text-[clamp(3.2rem,1.8rem+5.6vw,6.6rem)] leading-[0.95] tracking-[-0.03em]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Hugo Barros
            </motion.h1>
            <motion.p
              className="mt-5 font-serif text-[clamp(1.5rem,1.15rem+1.4vw,2.4rem)] leading-[1.15] text-ink/80"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t('Levar Braga a', 'Taking Braga to')}{' '}
              <WordCycle className="italic text-petrol" words={[...MISSION_POINTS.map((m) => m.city[lang]), t('todo o lado', 'everywhere')]} />
            </motion.p>
            <motion.p
              className="mt-6 text-[18px] leading-relaxed text-muted max-w-xl text-pretty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42 }}
            >
              {t(
                'Técnico Superior de Inovação e Desenvolvimento Turístico. Estratégia de destino, candidaturas europeias, promoção internacional e produto turístico — da Comissão Europeia ao centro histórico.',
                'Senior Officer for Tourism Innovation and Development. Destination strategy, European bids, international promotion and tourism product — from the European Commission to the historic centre.'
              )}
            </motion.p>
            <motion.div className="mt-9 flex flex-wrap gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}>
              <Link href="/projetos" className="group h-12 pl-6 pr-5 rounded-full bg-ink text-cream font-semibold text-[15px] inline-flex items-center gap-3 hover:bg-petrol transition-colors">
                {t('Explorar projetos', 'Explore projects')}
                <span className="w-6 h-6 rounded-full bg-cream/15 grid place-items-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
              <a href={`mailto:${EMAIL}`} className="h-12 px-6 rounded-full border border-ink/15 bg-card/70 backdrop-blur text-ink font-semibold text-[15px] inline-flex items-center gap-2 hover:border-petrol/50 transition-colors">
                <Mail className="w-4 h-4" />
                {t('Enviar email', 'Send an email')}
              </a>
            </motion.div>
          </div>

          {/* Colagem */}
          <div className="lg:col-span-5 relative h-[440px] sm:h-[520px] max-w-[520px] w-full mx-auto">
            <Floating className="absolute right-0 top-0 w-[72%] h-[86%]" delay={0.2}>
              <div className="photo w-full h-full rounded-[28px] shadow-[0_40px_80px_-40px_rgba(26,29,33,0.55)]">
                <img src={PORTRAIT} alt="Hugo Barros" className="object-[64%_18%]" />
              </div>
            </Floating>
            <Floating className="absolute left-0 top-[12%] w-[46%]" delay={0.5}>
              <Link href={`/projetos/${st.id}`} className="group block">
                <span className="photo duo block aspect-[4/3] rounded-2xl border-4 border-cream shadow-[0_24px_50px_-28px_rgba(26,29,33,0.6)]">
                  <img src={st.image} alt="" />
                </span>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur border border-line px-3 py-1 text-[12px] font-medium text-ink">
                  {st.status[lang]} · {st.title[lang]} <ArrowUpRight className="w-3 h-3" />
                </span>
              </Link>
            </Floating>
            <Floating className="absolute left-[14%] bottom-0 w-[44%]" delay={0.8}>
              <Link href={`/projetos/${ad.id}`} className="group block">
                <span className="photo duo block aspect-[4/3] rounded-2xl border-4 border-cream shadow-[0_24px_50px_-28px_rgba(26,29,33,0.6)]">
                  <img src={ad.image} alt="" />
                </span>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur border border-line px-3 py-1 text-[12px] font-medium text-ink">
                  URBACT · {ad.title[lang]} <ArrowUpRight className="w-3 h-3" />
                </span>
              </Link>
            </Floating>
          </div>
        </div>

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

      {/* ===================== EM DESTAQUE ===================== */}
      <section className="wrap mt-24 md:mt-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <PageHead kicker={t('Em destaque', 'Featured')} title={t('Três projetos, três frentes de trabalho', 'Three projects, three lines of work')} />
          <div data-reveal>
            <TextLink href="/projetos">{t(`Ver os ${PROJECTS.length} projetos`, `See all ${PROJECTS.length} projects`)}</TextLink>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 lg:row-span-2">
            <ProjectCard p={big} size="lg" />
          </div>
          {rest.map((p, i) => (
            <div key={p.id} className="lg:col-span-5">
              <ProjectCard p={p} delay={(i + 1) * 100} />
            </div>
          ))}
        </div>
      </section>

      {/* ===================== ARQUIVO VISUAL ===================== */}
      <section className="mt-24 md:mt-32">
        <div className="wrap flex flex-wrap items-end justify-between gap-6 mb-10">
          <PageHead
            kicker={t('Arquivo visual', 'Visual archive')}
            title={t('Treze projetos, num relance', 'Thirteen projects at a glance')}
            intro={t('Passe o rato para ver cada fotografia a cores; clique para abrir o projeto.', 'Hover to see each photo in colour; click to open the project.')}
          />
        </div>
        <PhotoRiver />
      </section>

      {/* ===================== ÁREAS ===================== */}
      <section className="wrap mt-24 md:mt-32">
        <PageHead kicker={t('Áreas de atuação', 'Areas of work')} title={t('O trabalho em quatro áreas', 'The work in four areas')} />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {AREAS.map((a, i) => {
            const Icon = ICONS[a.id];
            const items = PROJECTS.filter((p) => p.theme === a.id);
            return (
              <Link
                key={a.id}
                href={`/projetos?area=${a.id}`}
                data-reveal
                style={{ ['--delay' as any]: `${i * 80}ms` }}
                className="group relative rounded-2xl bg-card border border-line p-7 md:p-8 overflow-hidden hover:border-transparent hover:shadow-[0_24px_60px_-30px_rgba(14,90,107,0.5)] transition-[border-color,box-shadow] duration-500"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: AREA_COLOR[a.id] }} />
                <div className="flex items-start justify-between gap-6">
                  <span className="w-12 h-12 rounded-xl grid place-items-center text-white shrink-0" style={{ background: AREA_COLOR[a.id] }}>
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </span>
                  {/* miniaturas dos projetos da área */}
                  <span className="flex -space-x-3">
                    {items.slice(0, 4).map((p) => (
                      <span key={p.id} className="photo duo w-11 h-11 rounded-full border-2 border-card">
                        <img src={p.image} alt="" loading="lazy" />
                      </span>
                    ))}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-[1.65rem] leading-tight text-ink">{a.label[lang]}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted max-w-md">{a.description[lang]}</p>
                <p className="mt-5 text-[14px] text-muted">
                  {items.map((p) => p.title[lang]).join(' · ')}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-petrol">
                  {items.length} {t('projetos', 'projects')}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
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
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
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

      {/* ===================== CONTACTO ===================== */}
      <section className="wrap mt-24 md:mt-32">
        <div className="relative rounded-[28px] bg-ink text-cream overflow-hidden" data-reveal>
          <div className="absolute inset-0 opacity-40 [mask-image:linear-gradient(90deg,transparent,#000_70%)]">
            <ContourField color="79,154,148" levels={9} cell={16} />
          </div>
          <div className="relative px-8 py-14 md:px-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <p className="kicker !text-[#7fbfb8]">{t('Contacto', 'Contact')}</p>
              <h2 className="mt-3 font-serif text-[clamp(2rem,1.4rem+2.2vw,3.4rem)] leading-[1.05]">
                {t('Cooperação institucional, redes europeias ou um novo projeto?', 'Institutional cooperation, European networks or a new project?')}
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
              <Link href="/contacto" className="group h-12 pl-6 pr-5 rounded-full bg-cream text-ink font-semibold text-[15px] inline-flex items-center gap-3 hover:bg-white transition-colors">
                {t('Falar comigo', 'Get in touch')}
                <span className="w-6 h-6 rounded-full bg-ink/10 grid place-items-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
