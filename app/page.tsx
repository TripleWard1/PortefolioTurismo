'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Briefcase, Globe2, Landmark, Mail, MonitorSmartphone } from 'lucide-react';
import { useLang } from './ui/LanguageContext';
import { Figures, PageHead, ProjectCard, TextLink } from './ui/parts';
import AtlasMap, { MISSION_POINTS } from './ui/AtlasMap';
import { AREAS, PROJECTS, byId, type Theme } from './ui/projects';
import { EMAIL } from './ui/Footer';

const PORTRAIT = 'https://i.imgur.com/Dx42oze.jpeg';
const FEATURED = ['smart-tourism', 'visit-braga', 'experiencias-sustentaveis'];
const ICONS: Record<Theme, typeof Globe2> = { europeu: Landmark, internacional: Globe2, digital: MonitorSmartphone, produto: Briefcase };

export default function Home() {
  const { t, lang } = useLang();
  const router = useRouter();

  // Links antigos (/#projeto/<id>) passam para a página do projeto
  useEffect(() => {
    const h = window.location.hash;
    if (h.startsWith('#projeto/')) {
      const id = decodeURIComponent(h.slice(9));
      if (byId(id)) router.replace(`/projetos/${id}`);
    }
  }, [router]);

  const [big, ...rest] = FEATURED.map((id) => byId(id)!);

  return (
    <>
      {/* Apresentação */}
      <section className="wrap pt-12 md:pt-20 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7" data-reveal>
          <p className="kicker">{t('Portefólio profissional', 'Professional portfolio')}</p>
          <h1 className="mt-4 h-display text-ink">Hugo Barros</h1>
          <p className="mt-3 font-serif italic text-[clamp(1.3rem,1.1rem+0.8vw,1.75rem)] text-petrol">
            {t('Inovação e Desenvolvimento Turístico', 'Tourism Innovation & Development')}
          </p>
          <p className="mt-6 text-[18px] leading-relaxed text-muted max-w-xl text-pretty">
            {t(
              'Técnico Superior no Município de Braga. Trabalho na estratégia de destino, nas candidaturas a títulos e redes europeias, na promoção internacional e no desenvolvimento de produto turístico.',
              'Senior Officer at the Municipality of Braga. I work on destination strategy, bids for European titles and networks, international promotion and tourism product development.'
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projetos" className="h-12 px-6 rounded-lg bg-petrol text-white font-semibold text-[15px] inline-flex items-center gap-2 hover:bg-petrol-dark transition-colors">
              {t('Ver projetos', 'View projects')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`mailto:${EMAIL}`} className="h-12 px-6 rounded-lg border border-line bg-card text-ink font-semibold text-[15px] inline-flex items-center gap-2 hover:border-petrol/50 transition-colors">
              <Mail className="w-4 h-4" />
              {t('Enviar email', 'Send an email')}
            </a>
          </div>
        </div>
        <figure className="lg:col-span-5" data-reveal style={{ ['--delay' as any]: '120ms' }}>
          <div className="photo rounded-2xl aspect-[4/5] max-w-[440px] mx-auto lg:ml-auto">
            <img src={PORTRAIT} alt="Hugo Barros" className="object-[64%_18%]" />
          </div>
          <figcaption className="mt-3 max-w-[440px] mx-auto lg:ml-auto text-[13px] text-muted flex justify-between">
            <span>{t('Município de Braga', 'Municipality of Braga')}</span>
            <span>{t('Divisão de Atividades Económicas e Turismo', 'Economic Activities & Tourism')}</span>
          </figcaption>
        </figure>
      </section>

      <section className="wrap">
        <Figures />
      </section>

      {/* Em destaque */}
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

      {/* Áreas */}
      <section className="mt-24 md:mt-32 bg-card border-y border-line py-20 md:py-24">
        <div className="wrap">
          <PageHead
            kicker={t('Áreas de atuação', 'Areas of work')}
            title={t('O trabalho em quatro áreas', 'The work in four areas')}
            intro={t('Cada área reúne os projetos correspondentes, com dossier completo.', 'Each area brings together its projects, each with a full dossier.')}
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden">
            {AREAS.map((a, i) => {
              const Icon = ICONS[a.id];
              const n = PROJECTS.filter((p) => p.theme === a.id).length;
              return (
                <Link
                  key={a.id}
                  href={`/projetos?area=${a.id}`}
                  data-reveal
                  style={{ ['--delay' as any]: `${i * 80}ms` }}
                  className="group bg-card p-7 md:p-9 flex gap-6 hover:bg-cream transition-colors"
                >
                  <span className="w-12 h-12 rounded-lg bg-petrol/10 text-petrol grid place-items-center shrink-0">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </span>
                  <span className="flex-1">
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="font-serif text-[1.5rem] leading-tight text-ink group-hover:text-petrol transition-colors">{a.label[lang]}</span>
                      <span className="text-[13px] text-muted shrink-0">
                        {n} {t('projetos', 'projects')}
                      </span>
                    </span>
                    <span className="block mt-2 text-[15px] leading-relaxed text-muted">{a.description[lang]}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-petrol">
                      {t('Ver projetos', 'View projects')}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Percurso */}
      <section className="wrap mt-24 md:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-4">
          <PageHead
            kicker={t('Percurso internacional', 'International track record')}
            title={t('Braga representada em seis missões', 'Braga represented on six missions')}
            intro={t(
              'Da Comissão Europeia, em Bruxelas, ao júri dos Music Cities Awards, nos Estados Unidos.',
              'From the European Commission in Brussels to the Music Cities Awards jury in the United States.'
            )}
          />
          <ul className="mt-6 text-[15px] text-muted space-y-1.5" data-reveal>
            {MISSION_POINTS.map((m) => (
              <li key={m.id} className="flex justify-between gap-4 border-b border-line pb-1.5">
                <span className="text-ink">{m.city[lang]}</span>
                <span>{m.km.toLocaleString('pt-PT')} km</span>
              </li>
            ))}
          </ul>
          <div className="mt-6" data-reveal>
            <TextLink href="/percurso">{t('Ver o percurso completo', 'See the full track record')}</TextLink>
          </div>
        </div>
        <div className="lg:col-span-8" data-reveal>
          <AtlasMap />
        </div>
      </section>

      {/* Contacto */}
      <section className="wrap mt-24 md:mt-32">
        <div className="rounded-2xl bg-petrol text-white px-8 py-12 md:px-14 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" data-reveal>
          <div className="lg:col-span-8">
            <h2 className="font-serif text-[clamp(1.9rem,1.4rem+1.6vw,2.75rem)] leading-tight">
              {t('Cooperação institucional, redes europeias ou novos projetos?', 'Institutional cooperation, European networks or new projects?')}
            </h2>
            <p className="mt-3 text-[17px] text-white/75">{t('Fale comigo diretamente.', 'Get in touch directly.')}</p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
            <Link href="/contacto" className="h-12 px-6 rounded-lg bg-white text-petrol font-semibold text-[15px] inline-flex items-center gap-2 hover:bg-cream transition-colors">
              {t('Contacto', 'Contact')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
