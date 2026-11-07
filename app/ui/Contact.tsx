'use client';

import { useState } from 'react';
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useBragaTime } from './hooks';
import { SECTIONS, goTo } from './sections';

const EMAIL = 'hugo.barros@cm-braga.pt';
const LINKEDIN = 'https://www.linkedin.com/in/hugo-abreu-barros/';

export default function Contact() {
  const { t, lang } = useLang();
  const time = useBragaTime();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer id="contacto" className="relative bg-granite overflow-hidden">
      {/* Brasa de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2 w-[110vw] h-[70vw] max-h-[900px] rounded-full opacity-[0.22] blur-[120px]"
        style={{ background: 'radial-gradient(closest-side, #ff5a1f, transparent)' }}
      />

      <div className="wrap relative pt-28 md:pt-40 pb-10">
        <div data-reveal className="flex items-center gap-3 label text-[var(--fg-3)]">
          <span className="text-ember tabular">06</span>
          <span className="w-6 h-px bg-[var(--line-2)]" />
          {t('Contacto', 'Contact')}
        </div>

        <h2 className="mt-10 mega text-bone">
          <span data-reveal className="block">{t('Vamos', 'Let’s')}</span>
          <span data-reveal className="block italic text-ember pl-[0.6em]" style={{ ['--reveal-delay' as any]: '120ms' }}>
            {t('conversar.', 'talk.')}
          </span>
        </h2>

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <p data-reveal className="lg:col-span-5 lead text-[var(--fg-2)] text-pretty max-w-lg">
            {t(
              'Projetos que desafiem o status quo e promovam impacto sustentável no território. Candidaturas, redes europeias, produto turístico — a porta está aberta.',
              'Projects that challenge the status quo and promote sustainable impact on the territory. Candidacies, European networks, tourism product — the door is open.'
            )}
          </p>

          <div data-reveal className="lg:col-span-7 flex flex-col gap-3">
            {/* Email */}
            <div className="group flex items-stretch rounded-full border border-[var(--line-2)] bg-night/40 backdrop-blur-md overflow-hidden">
              <a
                href={`mailto:${EMAIL}`}
                className="flex-1 flex items-center justify-between gap-4 pl-7 pr-4 py-5 hover:bg-bone hover:text-night transition-colors duration-500"
              >
                <span className="text-[clamp(1.05rem,0.8rem+1vw,1.6rem)] tracking-[-0.01em]">{EMAIL}</span>
                <ArrowUpRight className="w-5 h-5 text-ember transition-transform duration-500 group-hover:rotate-45" />
              </a>
              <button
                onClick={copy}
                aria-label={t('Copiar email', 'Copy email')}
                className="w-20 border-l border-[var(--line-2)] grid place-items-center hover:bg-ember hover:text-night transition-colors"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <span aria-live="polite" className={`label-sm pl-7 transition-opacity ${copied ? 'text-ember opacity-100' : 'opacity-0'}`}>
              {t('Copiado para a área de transferência', 'Copied to clipboard')}
            </span>

            {/* LinkedIn */}
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-full border border-[var(--line-2)] pl-7 pr-4 py-5 hover:border-ember transition-colors duration-500"
            >
              <span className="flex items-center gap-4">
                <span className="label-sm text-[var(--fg-3)]">LinkedIn</span>
                <span className="text-[clamp(1.05rem,0.8rem+1vw,1.6rem)] tracking-[-0.01em] text-bone">Hugo Abreu Barros</span>
              </span>
              <span className="w-11 h-11 rounded-full bg-bone text-night grid place-items-center transition-all duration-500 group-hover:bg-ember">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </a>
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-28 md:mt-40 pt-8 border-t border-[var(--line)] grid grid-cols-2 md:grid-cols-12 gap-8">
          <div className="col-span-2 md:col-span-4">
            <div className="font-display text-3xl text-bone">
              Hugo Barros<em className="text-ember">.</em>
            </div>
            <p className="mt-3 text-[14px] text-[var(--fg-3)] leading-relaxed max-w-xs">
              {t(
                'Técnico Superior · Inovação e Desenvolvimento Turístico. Divisão de Atividades Económicas e Turismo, Município de Braga.',
                'Senior Officer · Tourism Innovation & Development. Economic Activities and Tourism Division, Municipality of Braga.'
              )}
            </p>
          </div>
          <nav className="md:col-span-3 md:col-start-6 flex flex-col gap-2.5" aria-label={t('Rodapé', 'Footer')}>
            <span className="label-sm text-[var(--fg-3)] mb-2">{t('Capítulos', 'Chapters')}</span>
            {SECTIONS.slice(1, 6).map((s) => (
              <button key={s.id} onClick={() => goTo(s.id)} className="text-left text-[15px] text-[var(--fg-2)] hover:text-bone transition-colors w-fit">
                {s.label[lang]}
              </button>
            ))}
          </nav>
          <div className="md:col-span-2 flex flex-col gap-2.5">
            <span className="label-sm text-[var(--fg-3)] mb-2">Braga</span>
            <span className="text-[15px] text-[var(--fg-2)] tabular flex items-center gap-2">
              <span className="live-dot" /> {time}
            </span>
            <span className="text-[15px] text-[var(--fg-2)] tabular">41.55° N, 8.43° W</span>
            <span className="text-[15px] text-[var(--fg-2)]">Portugal</span>
          </div>
          <div className="col-span-2 md:col-span-2 flex md:justify-end items-start">
            <button
              onClick={() => goTo('top')}
              className="group flex items-center gap-3 label text-[var(--fg-2)] hover:text-bone transition-colors"
            >
              {t('Topo', 'Top')}
              <span className="w-11 h-11 rounded-full border border-[var(--line-2)] grid place-items-center group-hover:bg-ember group-hover:border-ember transition-all">
                <ArrowUp className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:text-night" />
              </span>
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-4 label-sm text-[var(--fg-3)]">
          <span>© {new Date().getFullYear()} Hugo Barros</span>
          <span>{t('Portefólio estratégico · Braga', 'Strategic portfolio · Braga')}</span>
        </div>
      </div>

      {/* Assinatura gigante */}
      <div aria-hidden="true" className="relative select-none pointer-events-none overflow-hidden">
        <div className="font-display italic text-center leading-[0.75] tracking-[-0.04em] text-[23vw] outline-text translate-y-[18%]">
          Braga
        </div>
      </div>
    </footer>
  );
}
