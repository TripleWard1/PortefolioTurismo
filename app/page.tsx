'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './ui/LanguageContext';
import { SectionHead, Split, TextLink, WordLight } from './ui/parts';
import HeroSlides from './ui/HeroSlides';
import ProjectRail from './ui/ProjectRail';
import Competences from './ui/Competences';
import LivingMethod from './ui/LivingMethod';
import MissionPanels from './ui/MissionPanels';
import ContactBlock from './ui/ContactBlock';
import { byId } from './ui/projects';
import { ENTITY, NETWORKS, RECOGNITION, ROLE } from './ui/profile';
import { TONE } from './ui/viz/palette';

const PORTRAIT = 'https://i.imgur.com/Dx42oze.jpeg';
/* Fotografia de cada distinção */
const AWARD_IMG: Record<string, string> = {
  'smart-tourism': 'https://i.imgur.com/GBs8DY7.jpeg',
};

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
          <figure className="lg:col-span-5 relative" data-reveal>
            <div className="media rounded-4xl aspect-[4/5]">
              <div className="px" data-parallax="0.06">
                <img src={PORTRAIT} alt="Hugo Barros" className="object-[60%_20%]" />
              </div>
            </div>
            <figcaption className="absolute left-4 right-4 bottom-4 rounded-2xl bg-white/85 backdrop-blur-md px-5 py-4 flex items-center justify-between gap-4">
              <span>
                <span className="block text-[15px] font-semibold tracking-[-0.015em] text-ink">Hugo Barros</span>
                <span className="block t-label text-mute">{ROLE[lang]}</span>
              </span>
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: TONE.digital.deep }} />
            </figcaption>
          </figure>

          <div className="lg:col-span-7" data-reveal style={{ ['--delay' as any]: '100ms' }}>
            <p className="t-label text-mute">{t('Perfil', 'Profile')}</p>
            <p className="mt-5 text-[clamp(1.875rem,1.1rem+2.6vw,3.5rem)] leading-[1.08] font-medium tracking-[-0.04em] text-ink">
              <WordLight
                parts={[
                  t('Projetos que ligam', 'Projects that connect'),
                  { em: t('política pública', 'public policy'), color: TONE.europeu.deep },
                  ',',
                  { em: t('financiamento europeu', 'European funding'), color: TONE.internacional.deep },
                  t('e', 'and'),
                  { em: t('mercado turístico', 'the tourism market'), color: TONE.digital.deep },
                  '.',
                ]}
              />
            </p>
            <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5">
              {[
                { k: t('Entidade', 'Organisation'), v: ENTITY[lang] },
                { k: t('Âmbito', 'Scope'), v: t('Portugal, Espanha, Bélgica e EUA', 'Portugal, Spain, Belgium and USA') },
                { k: t('Parceiros', 'Partners'), v: t('Comissão Europeia, URBACT, redes de inovação e operadores locais', 'European Commission, URBACT, innovation networks and local operators') },
              ].map((f) => (
                <div key={f.k} className="border-t border-ink pt-4">
                  <dt className="t-label text-mute">{f.k}</dt>
                  <dd className="mt-1 text-[14px] leading-snug text-ink">{f.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10">
              <TextLink href="/percurso">{t('Consultar o percurso completo', 'See the full track record')}</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Projetos em destaque (calha) ───────────── */}
      <ProjectRail />

      {/* ───────────── Metodologia viva ───────────── */}
      <LivingMethod />

      {/* ───────────── Competências (secção imersiva) ───────────── */}
      <Competences />

      {/* ───────────── Distinções (lista cinematográfica) ───────────── */}
      <section className="py-24 md:py-36">
        <div className="wrap">
          <SectionHead
            label={t('Distinções', 'Recognition')}
            title={<Split parts={[t('Reconhecimento', 'Recognised'), { em: t('europeu e internacional', 'in Europe and beyond'), color: TONE.produto.deep }, '.']} />}
          />
          <ul className="mt-14 border-t border-line" data-reveal>
            {RECOGNITION.map((r, i) => (
              <li key={r.id} className="border-b border-line">
                <Link
                  href={`/projetos/${r.id}`}
                  className="group relative flex items-center overflow-hidden rounded-3xl my-2 h-28 md:h-32 md:hover:h-[380px] transition-[height] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                >
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden>
                    <img src={AWARD_IMG[r.id] || byId(r.id)!.image} alt="" loading="lazy" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1200ms] ease-out" />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
                  </span>
                  <span className="relative z-10 w-full px-2 md:px-8 grid grid-cols-12 gap-4 items-center">
                    <span className="hidden md:block col-span-1 t-label text-mute tabular-nums group-hover:text-white/70 transition-colors">{String(i + 1).padStart(2, '0')}</span>
                    <span className="col-span-12 md:col-span-4 em text-[clamp(2rem,1.4rem+2.4vw,3.75rem)] leading-none text-ink group-hover:text-white transition-colors duration-500">{r.title[lang]}</span>
                    <span className="col-span-10 md:col-span-5 transition-transform duration-700 group-hover:-translate-y-1">
                      <span className="block text-[1.125rem] font-semibold tracking-[-0.02em] text-ink group-hover:text-white transition-colors duration-500">{r.award}</span>
                      <span className="block t-label text-mute group-hover:text-white/70 transition-colors">
                        {r.body[lang]} · {r.year}
                      </span>
                    </span>
                    <span className="col-span-2 flex justify-end">
                      <span className="w-11 h-11 rounded-full ring-1 ring-inset ring-line grid place-items-center text-mute transition-all duration-500 group-hover:bg-white group-hover:text-ink group-hover:ring-white group-hover:scale-110">
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Redes e parceiros em faixa contínua */}
        <div className="mt-20 marquee-wrap overflow-hidden border-y border-line py-7 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]" aria-label={t('Redes e parceiros', 'Networks and partners')}>
          <ul className="marquee flex w-max items-center">
            {[...NETWORKS, ...NETWORKS].map((n, i) => (
              <li key={i} className="flex items-center gap-10 pr-10" aria-hidden={i >= NETWORKS.length}>
                <span className="whitespace-nowrap">
                  <span className="text-[1.375rem] font-semibold tracking-[-0.025em] text-ink">{n.name}</span>
                  <span className="ml-3 em text-[1.25rem] text-mute">{n.note[lang]}</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: TONE.produto.deep }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Representação internacional ───────────── */}
      <section className="bg-mist py-24 md:py-36">
        <div className="wrap">
          <SectionHead
            label={t('Representação internacional', 'International representation')}
            title={<Split parts={[t('Seis missões,', 'Six missions,'), { em: t('três países', 'three countries'), color: TONE.europeu.deep }, '.']} />}
            action={<TextLink href="/percurso">{t('Consultar o percurso', 'See the track record')}</TextLink>}
          />
        </div>
        <div className="mt-12" data-reveal>
          <MissionPanels />
        </div>
      </section>

      {/* ───────────── Contacto ───────────── */}
      <ContactBlock />
    </>
  );
}
