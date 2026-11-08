'use client';

import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './ui/LanguageContext';
import { SectionHead, TextLink } from './ui/parts';
import Competences from './ui/Competences';
import { MISSION_POINTS, PROJECTS, THEME_LABEL, byId } from './ui/projects';
import { ENTITY, METHOD, NETWORKS, RECOGNITION, ROLE } from './ui/profile';
import { TONE } from './ui/viz/palette';
import { EMAIL, LINKEDIN } from './ui/Footer';

const PORTRAIT = 'https://i.imgur.com/Dx42oze.jpeg';
const FEATURED = ['smart-tourism', 'braga-after-dark', 'visit-braga', 'cidade-bracvs'];
const FIELD = ['smart-tourism', 'music-cities-awards', 'fiets-wandelbeurs-gante'];

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

  return (
    <>
      {/* ───────────── Apresentação ───────────── */}
      <section className="wrap pt-12 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          <div className="lg:col-span-7 flex flex-col" data-reveal>
            <p className="t-label text-mute inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: TONE.digital.deep }} />
              {t('Portefólio profissional', 'Professional portfolio')}
            </p>
            <h1 className="mt-6 t-hero text-ink text-balance">
              {t('Estratégia, financiamento e promoção de', 'Strategy, funding and promotion for')}{' '}
              <span className="em">{t('destinos turísticos', 'tourism destinations')}</span>.
            </h1>
            <p className="mt-8 t-lead text-mute max-w-2xl text-pretty">
              {t(
                'Coordenação técnica de candidaturas europeias, representação institucional em mercados internacionais e desenvolvimento de produto turístico, com projetos apresentados na Bélgica, em Espanha e nos Estados Unidos.',
                'Technical coordination of European bids, institutional representation in international markets and tourism product development, with projects presented in Belgium, Spain and the United States.'
              )}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/projetos" className="h-12 px-6 rounded-full bg-ink text-white text-[15px] font-medium inline-flex items-center hover:bg-black transition-colors">
                {t('Consultar projetos', 'Browse projects')}
              </Link>
              <Link href="/contacto" className="h-12 px-6 rounded-full bg-soft text-ink text-[15px] font-medium inline-flex items-center hover:bg-line transition-colors">
                {t('Contacto institucional', 'Institutional contact')}
              </Link>
            </div>

            <dl className="mt-auto pt-14 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5">
              {[
                { k: t('Função atual', 'Current role'), v: ROLE[lang] },
                { k: t('Entidade', 'Organisation'), v: t('Município de Braga', 'Municipality of Braga') },
                { k: t('Âmbito', 'Scope'), v: t('Portugal, Espanha, Bélgica e EUA', 'Portugal, Spain, Belgium and USA') },
              ].map((f) => (
                <div key={f.k} className="border-t border-line pt-4">
                  <dt className="t-label text-mute">{f.k}</dt>
                  <dd className="mt-1 text-[15px] leading-snug text-ink">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5" data-reveal style={{ ['--delay' as any]: '120ms' }}>
            <figure className="relative h-full rounded-4xl bg-sand p-3 md:p-4">
              <div className="media rounded-3xl aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[560px]">
                <img src={PORTRAIT} alt="Hugo Barros" fetchPriority="high" className="object-[60%_20%]" />
              </div>
              <figcaption className="absolute left-7 right-7 bottom-7 md:left-8 md:right-8 md:bottom-8 rounded-2xl bg-white/90 backdrop-blur-md px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <p className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">Hugo Barros</p>
                <p className="mt-0.5 t-label text-mute">{ENTITY[lang]}</p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Registo de terreno */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6" data-reveal style={{ ['--delay' as any]: '200ms' }}>
          {FIELD.map((id) => {
            const p = byId(id)!;
            return (
              <Link key={id} href={`/projetos/${id}`} className="group block">
                <div className="media rounded-3xl aspect-[3/2]">
                  <img src={p.image} alt={p.title[lang]} />
                </div>
                <p className="mt-3 t-label text-mute">
                  <span className="text-ink">{p.place[lang]}</span> · {p.title[lang]}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ───────────── Perfil ───────────── */}
      <section className="wrap mt-28 md:mt-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10" data-reveal>
          <p className="md:col-span-3 t-label text-mute pt-2">{t('Perfil', 'Profile')}</p>
          <div className="md:col-span-9">
            <p className="text-[clamp(1.625rem,1.1rem+2vw,2.75rem)] leading-[1.18] font-medium tracking-[-0.035em] text-ink text-balance">
              {t('Projetos que ligam', 'Projects that connect')} <span className="em">{t('política pública', 'public policy')}</span>,{' '}
              <span className="em">{t('financiamento europeu', 'European funding')}</span> {t('e', 'and')}{' '}
              <span className="em">{t('mercado turístico', 'the tourism market')}</span>
              {t(
                ', do primeiro diagnóstico à execução no terreno.',
                ', from the initial assessment to delivery on the ground.'
              )}
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-[1.0625rem] leading-[1.7] text-mute">
              <p className="text-pretty">
                {t(
                  'O trabalho desenvolve-se em quatro frentes complementares: candidaturas e redes europeias, promoção internacional do destino, inovação digital e produto turístico. Cada projeto parte de uma leitura rigorosa do território e dos mercados.',
                  'The work spans four complementary fronts: European bids and networks, international destination promotion, digital innovation and tourism product. Each project starts from a rigorous reading of the territory and its markets.'
                )}
              </p>
              <p className="text-pretty">
                {t(
                  'A experiência inclui a defesa de candidaturas perante a Comissão Europeia, a representação institucional em feiras profissionais e a coordenação de produto com mais de trinta parceiros locais.',
                  'Experience includes defending bids before the European Commission, institutional representation at trade fairs and product coordination with more than thirty local partners.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Competências ───────────── */}
      <section className="wrap mt-28 md:mt-40">
        <SectionHead
          label={t('Áreas de competência', 'Areas of expertise')}
          title={
            <>
              {t('Quatro áreas,', 'Four areas,')} <span className="em">{t('um mesmo objetivo', 'one objective')}</span>.
            </>
          }
          intro={t(
            'Selecione uma área para consultar o âmbito de intervenção e os projetos correspondentes.',
            'Select an area to see its scope of work and the corresponding projects.'
          )}
        />
        <div className="mt-12">
          <Competences />
        </div>
      </section>

      {/* ───────────── Projetos em destaque ───────────── */}
      <section className="wrap mt-28 md:mt-40">
        <SectionHead
          label={t('Projetos em destaque', 'Selected work')}
          title={
            <>
              {t('Do dossiê europeu', 'From the European dossier')} <span className="em">{t('ao produto local', 'to the local product')}</span>.
            </>
          }
          action={<TextLink href="/projetos">{t(`Consultar os ${PROJECTS.length} projetos`, `Browse all ${PROJECTS.length} projects`)}</TextLink>}
        />
        <div className="mt-14 space-y-5">
          {FEATURED.map((id, i) => {
            const p = byId(id)!;
            const tone = TONE[p.theme];
            const flip = i % 2 === 1;
            return (
              <Link
                key={p.id}
                href={`/projetos/${p.id}`}
                data-reveal
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center rounded-4xl p-4 md:p-6"
                style={{ background: tone.tint }}
              >
                <div className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
                  <div className={`media rounded-3xl aspect-[16/10] ${p.logo ? '!bg-white' : ''}`}>
                    <img src={p.image} alt="" loading="lazy" className={p.logo ? '!object-contain p-[14%]' : ''} />
                  </div>
                </div>
                <div className={`md:col-span-5 px-2 pb-2 md:px-4 ${flip ? 'md:order-1' : ''}`}>
                  <p className="t-label" style={{ color: tone.deep }}>
                    {THEME_LABEL[p.theme][lang]} · {p.year}
                  </p>
                  <h3 className="mt-3 text-[clamp(1.75rem,1.3rem+1.6vw,2.6rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-ink text-balance">{p.title[lang]}</h3>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/70 text-pretty">{p.summary[lang]}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/10 pt-4">
                    <div>
                      <dt className="t-label text-ink/50">{t('Função', 'Role')}</dt>
                      <dd className="mt-1 text-[14px] leading-snug text-ink">{p.role[lang]}</dd>
                    </div>
                    <div>
                      <dt className="t-label text-ink/50">{t('Resultado', 'Outcome')}</dt>
                      <dd className="mt-1 text-[14px] leading-snug text-ink">{p.outcome[lang]}</dd>
                    </div>
                  </dl>
                  <span className="mt-6 inline-flex items-center gap-2 t-label text-ink">
                    <span className="w-9 h-9 rounded-full bg-white grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                    {t('Consultar projeto', 'View project')}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ───────────── Metodologia ───────────── */}
      <section className="wrap mt-28 md:mt-40">
        <SectionHead
          label={t('Metodologia', 'Approach')}
          title={
            <>
              {t('Do diagnóstico', 'From assessment')} <span className="em">{t('à implementação', 'to delivery')}</span>.
            </>
          }
          intro={t(
            'Um processo em quatro fases, aplicado de forma consistente em projetos de escala local e europeia.',
            'A four-stage process, applied consistently to projects at local and European scale.'
          )}
        />
        <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {METHOD.map((m, i) => {
            const ex = byId(m.example)!;
            return (
              <li key={m.example} className="relative border-t border-ink pt-6" data-reveal style={{ ['--delay' as any]: `${i * 80}ms` }}>
                <span className="absolute -top-[5px] left-0 w-2.5 h-2.5 rounded-full bg-ink" />
                <p className="em text-[2.75rem] leading-none" style={{ color: TONE[ex.theme].deep }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-5 text-[1.25rem] font-semibold tracking-[-0.025em] text-ink">{m.title[lang]}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mute text-pretty">{m.text[lang]}</p>
                <Link href={`/projetos/${ex.id}`} className="group mt-5 inline-flex items-center gap-1.5 t-label text-ink">
                  <span className="text-mute">{t('Exemplo', 'Example')}:</span>
                  <span className="underline decoration-1 underline-offset-4 decoration-ink/25 group-hover:decoration-ink">{ex.title[lang]}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ───────────── Distinções e redes ───────────── */}
      <section className="wrap mt-28 md:mt-40">
        <div className="rounded-4xl bg-sand p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12" data-reveal>
          <div className="lg:col-span-7">
            <p className="t-label" style={{ color: TONE.produto.deep }}>
              {t('Distinções', 'Recognition')}
            </p>
            <h2 className="mt-3 t-h2 text-ink text-balance">
              {t('Reconhecimento', 'Recognised')} <span className="em">{t('europeu e internacional', 'in Europe and beyond')}</span>.
            </h2>
            <ul className="mt-10 border-t border-ink/10">
              {RECOGNITION.map((r) => (
                <li key={r.id} className="border-b border-ink/10">
                  <Link href={`/projetos/${r.id}`} className="group py-5 grid grid-cols-12 gap-4 items-baseline">
                    <span className="col-span-12 sm:col-span-4 em text-[1.75rem] leading-none text-ink">{r.title[lang]}</span>
                    <span className="col-span-9 sm:col-span-6">
                      <span className="block text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink group-hover:underline underline-offset-4">{r.award}</span>
                      <span className="block t-label text-ink/55">{r.body[lang]}</span>
                    </span>
                    <span className="col-span-3 sm:col-span-2 text-right t-label text-ink/55 tabular-nums">{r.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <p className="t-label" style={{ color: TONE.produto.deep }}>
              {t('Redes e parceiros', 'Networks and partners')}
            </p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {NETWORKS.map((n) => (
                <li key={n.name} className="rounded-2xl bg-white/70 px-5 py-4">
                  <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{n.name}</p>
                  <p className="t-label text-mute">{n.note[lang]}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────── Representação internacional ───────────── */}
      <section className="wrap mt-28 md:mt-40">
        <p className="t-label text-mute" data-reveal>
          {t('Representação internacional', 'International representation')}
        </p>
        <p className="mt-6 text-[clamp(2rem,1.2rem+3.2vw,4.25rem)] leading-[1.08] font-semibold tracking-[-0.04em] text-ink text-balance" data-reveal>
          {t('Projetos apresentados em', 'Projects presented in')}{' '}
          {MISSION_POINTS.map((m, i) => (
            <Fragment key={m.id}>
              <Link
                href={`/projetos/${m.id}`}
                className="em underline decoration-1 underline-offset-[0.14em] decoration-ink/20 hover:decoration-current transition-colors"
                style={{ color: TONE.internacional.deep }}
              >
                {m.city[lang]}
              </Link>
              {i < MISSION_POINTS.length - 2 ? ', ' : i === MISSION_POINTS.length - 2 ? t(' e ', ' and ') : '.'}
            </Fragment>
          ))}
        </p>
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-line" data-reveal>
          {MISSION_POINTS.map((m) => (
            <li key={m.id} className="border-b border-line">
              <Link href={`/projetos/${m.id}`} className="py-4 flex items-baseline justify-between gap-4 group">
                <span className="text-[15px] text-ink">
                  {m.city[lang]}
                  <span className="text-mute"> · {m.event}</span>
                </span>
                <span className="t-label text-mute tabular-nums shrink-0">{m.year}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8" data-reveal>
          <TextLink href="/percurso">{t('Consultar o percurso', 'See the track record')}</TextLink>
        </div>
      </section>

      {/* ───────────── Contacto ───────────── */}
      <section className="wrap mt-28 md:mt-40">
        <div className="rounded-4xl bg-mist px-7 py-14 md:px-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end" data-reveal>
          <div className="lg:col-span-8">
            <p className="t-label" style={{ color: TONE.europeu.deep }}>
              {t('Contacto', 'Contact')}
            </p>
            <h2 className="mt-4 t-hero !text-[clamp(2.5rem,1.4rem+4vw,5rem)] text-ink text-balance">
              {t('Cooperação', 'Institutional')} <span className="em">{t('institucional', 'cooperation')}</span>.
            </h2>
            <p className="mt-6 t-lead text-ink/70 max-w-xl text-pretty">
              {t(
                'Disponível para parcerias em redes europeias, candidaturas conjuntas, júris, conferências e novos projetos de desenvolvimento turístico.',
                'Available for partnerships in European networks, joint bids, juries, conferences and new tourism development projects.'
              )}
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link href="/contacto" className="h-12 px-6 rounded-full bg-ink text-white text-[15px] font-medium inline-flex items-center justify-between gap-3 hover:bg-black transition-colors">
              {t('Enviar pedido', 'Send a request')} <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a href={`mailto:${EMAIL}`} className="h-12 px-6 rounded-full bg-white text-ink text-[15px] font-medium inline-flex items-center justify-between gap-3 hover:bg-soft transition-colors">
              {EMAIL}
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="h-12 px-6 rounded-full bg-white text-ink text-[15px] font-medium inline-flex items-center justify-between gap-3 hover:bg-soft transition-colors">
              LinkedIn <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
