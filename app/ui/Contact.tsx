'use client';

import { useState } from 'react';
import { ArrowUp, Building2, Check, Copy, Linkedin, Mail } from 'lucide-react';
import { useLang } from './LanguageContext';
import { goTo } from './hooks';
import { NAV } from './Navbar';

const EMAIL = 'hugo.barros@cm-braga.pt';
const LINKEDIN = 'https://www.linkedin.com/in/hugo-abreu-barros/';

export default function Contact() {
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <>
      <section id="contacto" className="bg-surface border-t border-line py-20 md:py-24">
        <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-10">
          <header className="lg:col-span-5">
            <p className="eyebrow text-accent">{t('Contacto', 'Contact')}</p>
            <h2 className="mt-3 font-serif font-semibold text-ink text-[clamp(1.9rem,1.4rem+1.6vw,2.6rem)] leading-tight">
              {t('Vamos conversar', 'Let’s talk')}
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-muted text-pretty">
              {t(
                'Disponível para cooperação institucional, redes europeias, candidaturas e projetos de desenvolvimento turístico.',
                'Available for institutional cooperation, European networks, candidacies and tourism development projects.'
              )}
            </p>
          </header>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 rounded-lg border border-line bg-white p-6 flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-4 min-w-0">
                <span className="w-11 h-11 rounded bg-navy text-white grid place-items-center shrink-0">
                  <Mail className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] text-muted">{t('Email institucional', 'Institutional email')}</span>
                  <a href={`mailto:${EMAIL}`} className="block font-semibold text-[17px] text-ink hover:text-navy break-all">
                    {EMAIL}
                  </a>
                </span>
              </div>
              <button
                onClick={copy}
                className="h-10 px-4 rounded border border-line text-[14px] font-medium text-ink inline-flex items-center gap-2 hover:border-navy"
              >
                {copied ? <Check className="w-4 h-4 text-navy" /> : <Copy className="w-4 h-4" />}
                {copied ? t('Copiado', 'Copied') : t('Copiar', 'Copy')}
              </button>
            </div>

            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-line bg-white p-6 flex items-center gap-4 hover:border-navy transition-colors"
            >
              <span className="w-11 h-11 rounded bg-[#0a66c2] text-white grid place-items-center shrink-0">
                <Linkedin className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-[13px] text-muted">LinkedIn</span>
                <span className="block font-semibold text-ink">Hugo Abreu Barros</span>
              </span>
            </a>

            <div className="rounded-lg border border-line bg-white p-6 flex items-center gap-4">
              <span className="w-11 h-11 rounded bg-surface text-navy grid place-items-center shrink-0">
                <Building2 className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-[13px] text-muted">{t('Entidade', 'Organisation')}</span>
                <span className="block font-semibold text-ink">{t('Município de Braga', 'Municipality of Braga')}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-navy-dark text-white">
        <div className="wrap py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <p className="font-serif font-semibold text-xl">Hugo Barros</p>
            <p className="mt-2 text-[14px] text-white/70 leading-relaxed max-w-sm">
              {t(
                'Técnico Superior · Inovação e Desenvolvimento Turístico. Divisão de Atividades Económicas e Turismo, Município de Braga.',
                'Senior Officer · Tourism Innovation & Development. Economic Activities and Tourism Division, Municipality of Braga.'
              )}
            </p>
          </div>
          <nav className="md:col-span-4 grid grid-cols-2 grid-rows-3 grid-flow-col gap-x-6 gap-y-2 content-start" aria-label={t('Rodapé', 'Footer')}>
            {NAV.map((s) => (
              <button key={s.id} onClick={() => goTo(s.id)} className="text-left text-[14px] text-white/75 hover:text-white w-fit">
                {s[lang]}
              </button>
            ))}
          </nav>
          <div className="md:col-span-3 flex md:justify-end items-start">
            <button onClick={() => goTo('top')} className="text-[14px] text-white/75 hover:text-white inline-flex items-center gap-2">
              <ArrowUp className="w-4 h-4" />
              {t('Voltar ao topo', 'Back to top')}
            </button>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="wrap py-5 text-[13px] text-white/55 flex flex-wrap justify-between gap-2">
            <span>© {new Date().getFullYear()} Hugo Barros</span>
            <span>{t('Portefólio profissional', 'Professional portfolio')}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
