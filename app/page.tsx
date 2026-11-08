'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './ui/LanguageContext';
import { SectionHead, TextLink } from './ui/parts';
import HeroSlides from './ui/HeroSlides';
import Competences from './ui/Competences';
import MissionStrip from './ui/MissionStrip';
import { PROJECTS, THEME_LABEL, byId } from './ui/projects';
import { ENTITY, METHOD, NETWORKS, RECOGNITION, ROLE } from './ui/profile';
import { BRASS, NIGHT, TONE } from './ui/viz/palette';
import { EMAIL, LINKEDIN } from './ui/Footer';

const PORTRAIT = 'https://i.imgur.com/Dx42oze.jpeg';
const FEATURED = ['smart-tourism', 'braga-after-dark', 'visit-braga', 'cidade-bracvs'];

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
      <HeroSlides />

      {/* ───────────── Perfil ───────────── */}
      <section id="perfil" className="wrap py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <figure className="lg:col-span-5" data-reveal>
            <div className="relative rounded-4xl bg-sand p-3">
              <div className="media rounded-3xl aspect-[4/5]">
                <div className="px" data-parallax="0.06">
                  <img src={PORTRAIT} alt="Hugo Barros" className="object-[60%_20%]" />
                </div>
              </div>
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 t-label">
              <span className="text-ink">Hugo Barros</span>
              <span className="text-mute text-right">{t('Município de Braga', 'Municipality of Braga')}</span>
            </figcaption>
          </figure>

          <div className="lg:col-span-7" data-reveal style={{ ['--delay' as any]: '100ms' }}>
            <p className="t-label text-mute">{t('Perfil', 'Profile')}</p>
            <p className="mt-5 text-[clamp(1.75rem,1.1rem+2.2vw,3rem)] leading-[1.12] font-medium tracking-[-0.035em] text-ink text-balance">
              {t('Projetos que ligam', 'Projects that connect')} <span className="em" style={{ color: TONE.europeu.deep }}>{t('política pública', 'public policy')}</span>,{' '}
              <span className="em" style={{ color: TONE.internacional.deep }}>{t('financiamento europeu', 'European funding')}</span> {t('e', 'and')}{' '}
              <span className="em" style={{ color: TONE.digital.deep }}>{t('mercado turístico', 'the tourism market')}</span>.
            </p>
            <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.75] text-mute max-w-2xl">
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
            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5">
              {[
                { k: t('Função atual', 'Current role'), v: ROLE[lang] },
                { k: t('Entidade', 'Organisation'), v: ENTITY[lang] },
                { k: t('Âmbito', 'Scope'), v: t('Portugal, Espanha, Bélgica e EUA', 'Portugal, Spain, Belgium and USA') },
              ].map((f) => (
                <div key={f.k} className="border-t border-ink pt-4">
                  <dt className="t-label text-mute">{f.k}</dt>
                  <dd className="mt-1 text-[14px] leading-snug text-ink">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ───────────── Competências (secção imersiva) ───────────── */}
      <Competences />

      {/* ───────────── Projetos em destaque ───────────── */}
      <section className="wrap py-24 md:py-36">
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
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center rounded-4xl p-4 md:p-6 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]"
                style={{ background: tone.tint }}
              >
                <div className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
                  <div className={`media rounded-3xl aspect-[16/10] ${p.logo ? '!bg-white' : ''}`}>
                    {p.logo ? (
                      <img src={p.image} alt="" loading="lazy" className="!object-contain p-[14%]" />
                    ) : (
                      <div className="px" data-parallax="0.05">
                        <img src={p.image} alt="" loading="lazy" />
                      </div>
                    )}
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
      <section className="bg-sand py-24 md:py-32">
        <div className="wrap">
          <SectionHead
            label={t('Metodologia', 'Approach')}
            title={
              <>
                {t('Do diagnóstico', 'From assessment')} <span className="em" style={{ color: TONE.produto.deep }}>{t('à implementação', 'to delivery')}</span>.
              </>
            }
            intro={t(
              'Um processo em quatro fases, aplicado de forma consistente em projetos de escala local e europeia.',
              'A four-stage process, applied consistently to projects at local and European scale.'
            )}
          />
          <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {METHOD.map((m, i) => {
              const ex = byId(m.example)!;
              const tone = TONE[ex.theme];
              return (
                <li key={m.example} className="rounded-4xl bg-white/70 p-7 flex flex-col" data-reveal style={{ ['--delay' as any]: `${i * 80}ms` }}>
                  <p className="em text-[3.25rem] leading-none" style={{ color: tone.deep }}>
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-8 text-[1.25rem] font-semibold tracking-[-0.025em] text-ink">{m.title[lang]}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mute text-pretty">{m.text[lang]}</p>
                  <Link href={`/projetos/${ex.id}`} className="group mt-auto pt-6 inline-flex items-center gap-1.5 t-label text-ink">
                    <span className="text-mute">{t('Exemplo', 'Example')}:</span>
                    <span className="underline decoration-1 underline-offset-4 decoration-ink/25 group-hover:decoration-ink">{ex.title[lang]}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ───────────── Distinções e redes (secção escura) ───────────── */}
      <section className="py-24 md:py-36 text-white" style={{ background: NIGHT }}>
        <div className="wrap">
          <p className="t-label inline-flex items-center gap-2" style={{ color: BRASS }} data-reveal>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: BRASS }} />
            {t('Distinções', 'Recognition')}
          </p>
          <h2 className="mt-4 t-h2 text-white max-w-3xl text-balance" data-reveal>
            {t('Reconhecimento', 'Recognised')} <span className="em" style={{ color: BRASS }}>{t('europeu e internacional', 'in Europe and beyond')}</span>.
          </h2>

          <ul className="mt-14 border-t border-white/15">
            {RECOGNITION.map((r, i) => (
              <li key={r.id} className="border-b border-white/15" data-reveal style={{ ['--delay' as any]: `${i * 80}ms` }}>
                <Link href={`/projetos/${r.id}`} className="group py-8 md:py-10 grid grid-cols-12 gap-4 items-baseline">
                  <span className="col-span-12 md:col-span-4 em text-[clamp(2.25rem,1.6rem+2.4vw,4rem)] leading-none text-white transition-colors duration-500 group-hover:text-[#C9B08A]">
                    {r.title[lang]}
                  </span>
                  <span className="col-span-9 md:col-span-6">
                    <span className="block text-[1.25rem] font-semibold tracking-[-0.02em] text-white">{r.award}</span>
                    <span className="mt-1 block t-label text-white/55">{r.body[lang]}</span>
                  </span>
                  <span className="col-span-3 md:col-span-2 flex items-center justify-end gap-3 t-label text-white/55 tabular-nums">
                    {r.year}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8" data-reveal>
            <p className="lg:col-span-3 t-label" style={{ color: BRASS }}>
              {t('Redes e parceiros', 'Networks and partners')}
            </p>
            <ul className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden">
              {NETWORKS.map((n) => (
                <li key={n.name} className="px-6 py-6" style={{ background: NIGHT }}>
                  <p className="text-[1.0625rem] font-semibold tracking-[-0.015em] text-white">{n.name}</p>
                  <p className="mt-1 t-label text-white/50">{n.note[lang]}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────── Representação internacional ───────────── */}
      <section className="py-24 md:py-36">
        <div className="wrap">
          <SectionHead
            label={t('Representação internacional', 'International representation')}
            title={
              <>
                {t('Seis missões,', 'Six missions,')} <span className="em" style={{ color: TONE.internacional.deep }}>{t('três países', 'three countries')}</span>.
              </>
            }
            intro={t(
              'Feiras profissionais, cimeiras e júris internacionais em que o destino foi representado, de Bruxelas ao Arkansas.',
              'Trade fairs, summits and international juries where the destination was represented, from Brussels to Arkansas.'
            )}
            action={<TextLink href="/percurso">{t('Consultar o percurso', 'See the track record')}</TextLink>}
          />
        </div>
        <div className="mt-10" data-reveal>
          <MissionStrip />
        </div>
      </section>

      {/* ───────────── Contacto (secção imersiva) ───────────── */}
      <section className="-mb-32 py-24 md:py-36 text-white" style={{ background: TONE.internacional.dark }}>
        <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-10 items-end" data-reveal>
          <div className="lg:col-span-8">
            <p className="t-label inline-flex items-center gap-2" style={{ color: TONE.internacional.glow }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: TONE.internacional.glow }} />
              {t('Contacto', 'Contact')}
            </p>
            <h2 className="mt-5 t-hero !text-[clamp(2.75rem,1.4rem+4.6vw,5.75rem)] text-white text-balance">
              {t('Cooperação', 'Institutional')} <span className="em" style={{ color: TONE.internacional.glow }}>{t('institucional', 'cooperation')}</span>.
            </h2>
            <p className="mt-6 t-lead text-white/70 max-w-xl text-pretty">
              {t(
                'Disponível para parcerias em redes europeias, candidaturas conjuntas, júris, conferências e novos projetos de desenvolvimento turístico.',
                'Available for partnerships in European networks, joint bids, juries, conferences and new tourism development projects.'
              )}
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link href="/contacto" className="h-14 px-6 rounded-full bg-white text-ink text-[15px] font-medium inline-flex items-center justify-between gap-3 hover:bg-[#F2E6DF] transition-colors">
              {t('Enviar pedido', 'Send a request')} <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a href={`mailto:${EMAIL}`} className="h-14 px-6 rounded-full ring-1 ring-inset ring-white/25 text-white text-[15px] font-medium inline-flex items-center justify-between gap-3 hover:bg-white/10 transition-colors">
              {EMAIL}
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="h-14 px-6 rounded-full ring-1 ring-inset ring-white/25 text-white text-[15px] font-medium inline-flex items-center justify-between gap-3 hover:bg-white/10 transition-colors">
              LinkedIn <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
