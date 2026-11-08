'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { Split } from './parts';
import { ROLE } from './profile';
import { BRASS, NIGHT } from './viz/palette';

/* Abertura: uma mensagem curta e, por trás, uma grelha inclinada de fotografias de terreno
   (adaptada de Tilted Grid Hero) que desliza devagar. As fotografias são textura, sem legendas,
   e aparecem em tamanho pequeno para ficarem sempre nítidas. */
const PHOTOS = [
  'GBs8DY7.jpeg', 'u8hgUWi.png', 'ZCSF2lK.jpeg', 'eiRaC5f.png', 'EgopK0E.png', 'to9jbOB.jpeg',
  'HecgfPz.jpeg', 'C4uKurT.png', 'YCZr9xN.jpeg', 'rKEHbnY.jpeg', 'dYaYXb9.png', 'AM6Z3uu.jpeg',
  'NQnBWix.png', 'JHpp607.jpeg', 'zhIXUOY.png', 'CXrcrml.png', '6wtSxjp.png', 'hijBkTd.png',
  'SeyCGBk.jpg', '2NVOugs.jpeg', 'pd98syS.png', '09Tm1r9.png', 'mgdxHtt.jpeg', 'OkowZdn.jpeg',
].map((f) => `https://i.imgur.com/${f}`);
const COLS = 4;
const columns = Array.from({ length: COLS }, (_, c) => PHOTOS.filter((_, i) => i % COLS === c));

export default function HeroSlides() {
  const { t, lang } = useLang();

  return (
    <section data-hero className="relative -mt-20 overflow-hidden text-white" style={{ background: NIGHT }}>
      {/* Grelha inclinada */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-y-0 right-0 w-full lg:w-[68%] tilt-mask">
          <div className="absolute left-1/2 top-1/2 w-[140%] lg:w-[120%] h-[170%] tilt-plane">
            <div className="grid grid-cols-4 gap-4 h-full">
              {columns.map((col, c) => (
                <div key={c} className="relative overflow-hidden">
                  <div className={`flex flex-col gap-4 ${c % 2 ? 'tilt-down' : 'tilt-up'}`} style={{ ['--dur' as any]: `${70 + c * 9}s` }}>
                    {[...col, ...col].map((src, i) => (
                      <img key={i} src={src} alt="" loading={i < 3 ? 'eager' : 'lazy'} className="w-full aspect-[4/5] object-cover rounded-2xl" draggable={false} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Véus para a leitura do texto */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#141312_0%,#141312_30%,rgba(20,19,18,0.75)_52%,rgba(20,19,18,0.25)_100%)] max-lg:bg-[rgba(20,19,18,0.72)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#141312] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#141312] to-transparent" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative wrap min-h-[max(100svh,640px)] flex flex-col justify-center pt-32 pb-24">
        <div className="max-w-[640px]">
          <p className="hero-in t-label inline-flex items-center gap-3 text-white/70" style={{ ['--d' as any]: '100ms' }}>
            <span className="w-8 h-px" style={{ background: BRASS }} />
            Hugo Barros · {ROLE[lang]}
          </p>

          <h1 className="mt-8 t-hero !text-[clamp(3.25rem,1.4rem+6vw,7rem)] !leading-[0.95] text-white">
            <Split auto delay={200} parts={[t('Turismo com', 'Tourism with'), { em: t('estratégia', 'strategy'), color: '#E9DCC4' }, '.']} />
          </h1>

          <p className="hero-in mt-8 t-lead text-white/70 max-w-md text-pretty" style={{ ['--d' as any]: '600ms' }}>
            {t(
              'Estratégia de destino, financiamento europeu, promoção internacional e produto turístico.',
              'Destination strategy, European funding, international promotion and tourism product.'
            )}
          </p>

          <div className="hero-in mt-10 flex flex-wrap gap-3" style={{ ['--d' as any]: '750ms' }}>
            <Link href="/projetos" className="group h-[52px] pl-6 pr-2 rounded-full bg-white text-ink text-[15px] font-medium inline-flex items-center gap-3 hover:bg-[#F1EBE0] transition-colors">
              {t('Explorar projetos', 'Explore projects')}
              <span className="w-9 h-9 rounded-full bg-ink text-white grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/contacto" className="h-[52px] px-6 rounded-full ring-1 ring-inset ring-white/25 text-white text-[15px] font-medium inline-flex items-center hover:bg-white/10 transition-colors">
              {t('Contacto', 'Contact')}
            </Link>
          </div>
        </div>

        <a href="#perfil" className="hero-in absolute left-[var(--pad)] bottom-8 t-label text-white/50 hover:text-white inline-flex items-center gap-2 transition-colors" style={{ ['--d' as any]: '900ms' }}>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          {t('Descer', 'Scroll')}
        </a>
      </div>
    </section>
  );
}
