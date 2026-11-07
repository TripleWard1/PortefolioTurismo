'use client';

import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { useLang } from './LanguageContext';
import ChapterHead from './ChapterHead';
import { bySection } from './projects';

/**
 * Capítulo 04 - secção clara (pedra/papel) para quebrar o ritmo noturno.
 * À esquerda, uma janela fixa troca de imagem conforme o bloco de texto ativo.
 */
export default function Heritage({ onOpen }: { onOpen: (id: string) => void }) {
  const { t, lang } = useLang();
  const items = bySection('heranca');
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    blocks.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <section id="heranca" className="relative bg-paper text-ink py-28 md:py-40">
      <div className="wrap">
        <ChapterHead
          tone="light"
          n="04"
          label={t('Produto & identidade', 'Product & identity')}
          title={t('Herança &', 'Heritage &')}
          accent={t('futuro.', 'future.')}
        >
          {t(
            'Produtos editoriais e experiências que ligam o património milenar de Braga às novas gerações.',
            'Editorial products and experiences linking Braga’s two-thousand-year heritage to new generations.'
          )}
        </ChapterHead>

        <div className="mt-16 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Janela fixa */}
          <div className="hidden lg:block lg:col-span-6">
            <div className="sticky top-[14vh] h-[72vh] rounded-[28px] overflow-hidden bg-ink/10">
              {items.map((p, i) => (
                <img
                  key={p.id}
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-[1100ms] ease-out"
                  style={{
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? 'scale(1)' : 'scale(1.08)',
                    clipPath: active === i ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
                  }}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 p-6 flex justify-between items-end bg-gradient-to-t from-black/50 to-transparent">
                <span className="label text-bone tabular">
                  {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
                <span className="flex gap-1.5">
                  {items.map((_, i) => (
                    <span key={i} className={`h-1 rounded-full transition-all duration-500 ${active === i ? 'w-8 bg-ember' : 'w-2 bg-bone/50'}`} />
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="lg:col-span-6">
            {items.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  blocks.current[i] = el;
                }}
                data-i={i}
                className="lg:min-h-[72vh] flex flex-col justify-center py-10 lg:py-0 border-t border-ink/10 first:border-0"
              >
                <div className="lg:hidden mb-6 rounded-[22px] overflow-hidden aspect-[16/11] bg-ink/10">
                  <img src={p.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div
                  className={`transition-all duration-700 ease-out ${
                    active === i ? 'lg:opacity-100 lg:translate-y-0' : 'lg:opacity-30 lg:translate-y-2'
                  }`}
                >
                  <div className="flex items-center gap-4 label text-ink/45">
                    <span className="text-ember tabular">{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-px w-8 bg-ink/20" />
                    <span>{p.place[lang]}</span>
                    <span className="ml-auto tabular">{p.year}</span>
                  </div>
                  <h3 className="mt-6 h1 text-ink text-balance">{p.title[lang]}</h3>
                  <p className="mt-6 text-[18px] leading-relaxed text-ink/65 max-w-lg text-pretty">{p.summary[lang]}</p>
                  <button
                    onClick={() => onOpen(p.id)}
                    className="group mt-9 inline-flex items-center gap-4"
                  >
                    <span className="w-14 h-14 rounded-full border border-ink/20 grid place-items-center transition-all duration-500 group-hover:bg-ink group-hover:border-ink">
                      <Plus className="w-5 h-5 text-ink transition-all duration-500 group-hover:rotate-90 group-hover:text-bone" />
                    </span>
                    <span className="text-left">
                      <span className="block label-sm text-ink/45">{t('Explorar', 'Explore')}</span>
                      <span className="block mt-1.5 text-[15px] font-medium text-ink">{t('Dossier completo', 'Full dossier')}</span>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
