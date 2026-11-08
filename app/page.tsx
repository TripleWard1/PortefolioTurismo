'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './ui/LanguageContext';
import { Figures, ProjectCard, SectionHead, TextLink } from './ui/parts';
import { AREAS, MISSION_POINTS, PROJECTS, byId } from './ui/projects';
import { EMAIL } from './ui/Footer';
import Globe from './ui/fx/Globe';

const HERO = 'https://i.imgur.com/SvJ4bdR.jpeg';
const PORTRAIT = 'https://i.imgur.com/Dx42oze.jpeg';
const FEATURED = ['smart-tourism', 'visit-braga', 'braga-after-dark', 'cidade-bracvs', 'music-cities-awards'];

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

  const [first, second, ...rest] = FEATURED.map((id) => byId(id)!);

  return (
    <>
      {/* ───────────── Apresentação ───────────── */}
      <section className="wrap pt-16 md:pt-24">
        <div data-reveal>
          <p className="t-label text-mute">
            Hugo Barros — {t('Técnico Superior, Município de Braga', 'Senior Officer, Municipality of Braga')}
          </p>
          <h1 className="mt-5 t-hero text-ink max-w-[16ch]">
            {t('Estratégia de destino para Braga.', 'Destination strategy for Braga.')}
          </h1>
          <p className="mt-6 t-lead text-mute max-w-2xl text-pretty">
            {t(
              'Candidaturas europeias, promoção internacional, inovação digital e produto turístico — do dossiê técnico defendido em Bruxelas ao roteiro para famílias no centro histórico.',
              'European bids, international promotion, digital innovation and tourism product — from the technical dossier defended in Brussels to the family itinerary in the historic centre.'
            )}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/projetos" className="h-12 px-6 rounded-full bg-ink text-white text-[15px] font-medium inline-flex items-center hover:bg-black transition-colors">
              {t('Ver projetos', 'View work')}
            </Link>
            <Link href="/contacto" className="h-12 px-6 rounded-full bg-soft text-ink text-[15px] font-medium inline-flex items-center hover:bg-line transition-colors">
              {t('Contacto', 'Contact')}
            </Link>
          </div>
        </div>

        <figure className="mt-16 md:mt-20" data-reveal style={{ ['--delay' as any]: '120ms' }}>
          <Link href="/projetos/smart-tourism" className="group block">
            <div className="media rounded-4xl aspect-[4/3] md:aspect-[21/9]">
              <img src={HERO} alt={t('Comitiva de Braga em Bruxelas', 'Braga delegation in Brussels')} fetchPriority="high" />
            </div>
          </Link>
          <figcaption className="mt-4 t-label text-mute flex justify-between gap-4">
            <span>{t('Bruxelas — European Capital of Smart Tourism', 'Brussels — European Capital of Smart Tourism')}</span>
            <span>{t('Finalista UE, 2026', 'EU finalist, 2026')}</span>
          </figcaption>
        </figure>
      </section>

      {/* ───────────── Números ───────────── */}
      <section className="wrap mt-28 md:mt-36">
        <Figures />
      </section>

      {/* ───────────── Em destaque ───────────── */}
      <section className="wrap mt-28 md:mt-36">
        <SectionHead
          label={t('Projetos em destaque', 'Selected work')}
          title={t('Trabalho recente', 'Recent work')}
          action={<TextLink href="/projetos">{t(`Ver os ${PROJECTS.length} projetos`, `All ${PROJECTS.length} projects`)}</TextLink>}
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-14">
          <div className="md:col-span-7">
            <ProjectCard p={first} large ratio="aspect-[4/3] md:aspect-auto md:h-[clamp(320px,33vw,480px)]" />
          </div>
          <div className="md:col-span-5">
            <ProjectCard p={second} large ratio="aspect-[4/3] md:aspect-auto md:h-[clamp(320px,33vw,480px)]" delay={80} />
          </div>
          {rest.map((p, i) => (
            <div key={p.id} className="md:col-span-4">
              <ProjectCard p={p} delay={i * 80} />
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── Áreas ───────────── */}
      <section className="wrap mt-28 md:mt-36">
        <SectionHead label={t('Áreas de atuação', 'Areas of work')} title={t('Quatro frentes de trabalho', 'Four lines of work')} />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AREAS.map((a, i) => {
            const n = PROJECTS.filter((p) => p.theme === a.id).length;
            return (
              <Link
                key={a.id}
                href={`/projetos?area=${a.id}`}
                data-reveal
                style={{ ['--delay' as any]: `${i * 70}ms` }}
                className="group rounded-3xl bg-soft p-7 flex flex-col min-h-[260px] hover:bg-line/70 transition-colors"
              >
                <span className="t-label text-mute tabular-nums">0{i + 1}</span>
                <h3 className="mt-auto t-h3 text-ink text-balance">{a.label[lang]}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-mute">{a.description[lang]}</p>
                <span className="mt-5 t-label text-ink inline-flex items-center gap-1">
                  {n} {t('projetos', 'projects')}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ───────────── Percurso internacional ───────────── */}
      <section className="mt-28 md:mt-36 bg-night text-white">
        <div className="wrap py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-5" data-reveal>
            <p className="t-label text-white/50">{t('Percurso internacional', 'International track record')}</p>
            <h2 className="mt-3 t-h2 text-balance">{t('Seis missões, três países.', 'Six missions, three countries.')}</h2>
            <ul className="mt-10 border-t border-white/10" onMouseLeave={() => setFocus(null)}>
              {MISSION_POINTS.map((m) => (
                <li key={m.id} className="border-b border-white/10">
                  <Link
                    href={`/projetos/${m.id}`}
                    onMouseEnter={() => setFocus(m.id)}
                    onFocus={() => setFocus(m.id)}
                    className="py-4 flex items-baseline justify-between gap-6"
                  >
                    <span className={`text-[17px] font-medium tracking-[-0.015em] transition-colors ${focus && focus !== m.id ? 'text-white/40' : 'text-white'}`}>
                      {m.city[lang]}
                      <span className="text-white/40 font-normal"> · {m.event}</span>
                    </span>
                    <span className="t-label text-white/40 tabular-nums shrink-0">{m.km.toLocaleString('pt-PT')} km</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <TextLink href="/percurso" light>
                {t('Ver o percurso completo', 'See the full track record')}
              </TextLink>
            </div>
          </div>
          <div className="lg:col-span-7" data-reveal style={{ ['--delay' as any]: '120ms' }}>
            <Globe focus={focus} className="max-w-[600px] mx-auto" ink="255,255,255" accent="255,255,255" />
          </div>
        </div>
      </section>

      {/* ───────────── Sobre ───────────── */}
      <section className="wrap mt-28 md:mt-36 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-5" data-reveal>
          <div className="media rounded-4xl aspect-[4/5]">
            <img src={PORTRAIT} alt="Hugo Barros" className="object-[64%_18%]" />
          </div>
        </div>
        <div className="md:col-span-7" data-reveal style={{ ['--delay' as any]: '100ms' }}>
          <p className="t-label text-mute">{t('Sobre', 'About')}</p>
          <h2 className="mt-3 t-h2 text-ink text-balance">{t('Visão territorial, execução estratégica.', 'Territorial vision, strategic execution.')}</h2>
          <div className="mt-6 space-y-4 t-lead text-mute text-pretty">
            <p>
              {t(
                'Trabalho na Divisão de Atividades Económicas e Turismo do Município de Braga, entre a estratégia de destino, as candidaturas a títulos e redes europeias e o desenvolvimento de produto turístico.',
                'I work in the Economic Activities and Tourism Division of the Municipality of Braga, across destination strategy, bids for European titles and networks, and tourism product development.'
              )}
            </p>
            <p>
              {t(
                'O objetivo é sempre o mesmo: consolidar Braga como referência europeia de turismo inteligente, sustentável e com identidade.',
                'The goal is always the same: consolidating Braga as a European reference for smart, sustainable tourism with a strong identity.'
              )}
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-6">
            {[
              [t('Função', 'Position'), t('Técnico Superior', 'Senior Officer')],
              [t('Entidade', 'Organisation'), t('Município de Braga', 'Municipality of Braga')],
              [t('Divisão', 'Division'), t('Atividades Económicas e Turismo', 'Economic Activities and Tourism')],
              [t('Base', 'Based in'), 'Braga, Portugal'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="t-label text-mute">{k}</dt>
                <dd className="mt-1 text-[15px] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────── Contacto ───────────── */}
      <section className="wrap mt-28 md:mt-36 text-center" data-reveal>
        <p className="t-label text-mute">{t('Contacto', 'Contact')}</p>
        <h2 className="mt-3 t-hero text-ink">{t('Vamos conversar.', 'Let’s talk.')}</h2>
        <a href={`mailto:${EMAIL}`} className="mt-8 inline-block t-lead text-ink underline decoration-1 underline-offset-[6px] decoration-ink/25 hover:decoration-ink transition-colors">
          {EMAIL}
        </a>
      </section>
    </>
  );
}
