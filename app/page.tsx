'use client';

import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './ui/LanguageContext';
import { SectionHead, TextLink } from './ui/parts';
import { MISSION_POINTS, PROJECTS, THEME_LABEL, byId } from './ui/projects';
import { TONE } from './ui/viz/palette';
import { EMAIL, LINKEDIN } from './ui/Footer';

const PORTRAIT = 'https://i.imgur.com/Dx42oze.jpeg';
const FEATURED = ['smart-tourism', 'visit-braga', 'braga-after-dark', 'cidade-bracvs'];

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

  const st = byId('smart-tourism')!;
  const ms = byId('music-cities-awards')!;
  const tr = byId('roteiro-3-dias')!;

  return (
    <>
      {/* ───────────── Apresentação ───────────── */}
      <section className="wrap pt-16 md:pt-24">
        <h1 className="t-hero text-ink max-w-[17ch]" data-reveal>
          {t('Olá, sou o Hugo', 'Hi, I’m Hugo')}
          <span className="inline-block align-middle mx-[0.18em] -mt-[0.12em] h-[0.78em] w-[1.35em] rounded-full overflow-hidden bg-sand">
            <img src={PORTRAIT} alt="" className="w-full h-full object-cover object-[64%_22%]" />
          </span>
          {t('e desenho', 'and I design')} <span className="em">{t('projetos de turismo', 'tourism projects')}</span>.
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end" data-reveal style={{ ['--delay' as any]: '100ms' }}>
          <p className="md:col-span-7 t-lead text-mute text-pretty">
            {t(
              'Estratégia de destino, candidaturas europeias, promoção internacional e produto turístico. Atualmente Técnico Superior de Inovação e Desenvolvimento Turístico no Município de Braga.',
              'Destination strategy, European bids, international promotion and tourism product. Currently Senior Officer for Tourism Innovation and Development at the Municipality of Braga.'
            )}
          </p>
          <div className="md:col-span-5 flex flex-wrap md:justify-end gap-3">
            <Link href="/projetos" className="h-12 px-6 rounded-full bg-ink text-white text-[15px] font-medium inline-flex items-center hover:bg-black transition-colors">
              {t('Ver projetos', 'View work')}
            </Link>
            <Link href="/contacto" className="h-12 px-6 rounded-full bg-soft text-ink text-[15px] font-medium inline-flex items-center hover:bg-line transition-colors">
              {t('Contacto', 'Contact')}
            </Link>
          </div>
        </div>

        {/* Colagem sobre fundo de areia */}
        <div className="mt-16 rounded-4xl bg-sand p-3 md:p-4 grid grid-cols-12 gap-3 md:gap-4" data-reveal style={{ ['--delay' as any]: '160ms' }}>
          <Link href={`/projetos/${st.id}`} className="group col-span-12 md:col-span-7 md:row-span-2">
            <div className="media rounded-3xl h-[280px] md:h-full md:min-h-[520px]">
              <img src={st.image} alt={st.title[lang]} fetchPriority="high" />
            </div>
          </Link>
          {[ms, tr].map((p) => (
            <Link key={p.id} href={`/projetos/${p.id}`} className="group col-span-6 md:col-span-5">
              <div className="media rounded-3xl h-[180px] md:h-[252px]">
                <img src={p.image} alt={p.title[lang]} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── Projetos em destaque ───────────── */}
      <section className="wrap mt-28 md:mt-40">
        <SectionHead
          label={t('Projetos em destaque', 'Selected work')}
          title={
            <>
              {t('Do dossiê europeu', 'From the European dossier')} <span className="em">{t('ao roteiro local', 'to the local itinerary')}</span>.
            </>
          }
          action={<TextLink href="/projetos">{t(`Todos os ${PROJECTS.length} projetos`, `All ${PROJECTS.length} projects`)}</TextLink>}
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
                  <div className={`media rounded-3xl aspect-[16/10] ${p.logo ? 'bg-white' : ''}`}>
                    <img src={p.image} alt="" loading="lazy" className={p.logo ? '!object-contain p-[14%]' : ''} />
                  </div>
                </div>
                <div className={`md:col-span-5 px-2 pb-2 md:px-4 ${flip ? 'md:order-1' : ''}`}>
                  <p className="t-label" style={{ color: tone.deep }}>
                    {THEME_LABEL[p.theme][lang]} · {p.year}
                  </p>
                  <h3 className="mt-3 text-[clamp(1.75rem,1.3rem+1.6vw,2.6rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-ink text-balance">{p.title[lang]}</h3>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/70 text-pretty">{p.summary[lang]}</p>
                  <span className="mt-6 inline-flex items-center gap-2 t-label text-ink">
                    <span className="w-9 h-9 rounded-full bg-white grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                    {t('Ver projeto', 'View project')}
                  </span>
                </div>
              </Link>
            );
          })}
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
          <TextLink href="/percurso">{t('Ver o percurso', 'See the track record')}</TextLink>
        </div>
      </section>

      {/* ───────────── Contacto ───────────── */}
      <section className="wrap mt-28 md:mt-40">
        <div className="rounded-4xl bg-mist px-7 py-14 md:px-14 md:py-20" data-reveal>
          <p className="t-label" style={{ color: TONE.europeu.deep }}>
            {t('Contacto', 'Contact')}
          </p>
          <h2 className="mt-4 t-hero text-ink">
            {t('Vamos', 'Let’s')} <span className="em">{t('conversar', 'talk')}</span>.
          </h2>
          <p className="mt-6 t-lead text-ink/70 max-w-xl text-pretty">
            {t('Para cooperação institucional, redes europeias ou novos projetos de turismo.', 'For institutional cooperation, European networks or new tourism projects.')}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={`mailto:${EMAIL}`} className="h-12 px-6 rounded-full bg-ink text-white text-[15px] font-medium inline-flex items-center hover:bg-black transition-colors">
              {EMAIL}
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="h-12 px-6 rounded-full bg-white text-ink text-[15px] font-medium inline-flex items-center gap-2 hover:bg-soft transition-colors">
              LinkedIn <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
