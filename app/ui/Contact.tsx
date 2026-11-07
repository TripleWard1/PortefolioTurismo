'use client';

import { useState } from 'react';
import { ArrowUp, Check, Copy, Linkedin, Mail } from 'lucide-react';
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
    <footer id="contacto" className="relative bg-navy text-white overflow-hidden">
      <img src="https://i.imgur.com/GBs8DY7.jpeg" alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/90 to-navy" />

      <div className="relative wrap pt-24 md:pt-32 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-7" data-reveal>
          <p className="eyebrow text-gold-soft flex items-center gap-3">
            <span className="rule" />
            {t('Contacto', 'Contact')}
          </p>
          <h2 className="mt-6 font-serif font-medium text-[clamp(2.8rem,1.6rem+4.5vw,5.4rem)] leading-[1] tracking-[-0.02em]">
            {t('Vamos', 'Let’s')} <em className="text-gold-soft">{t('conversar', 'talk')}</em>
          </h2>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/70 text-pretty">
            {t(
              'Disponível para cooperação institucional, redes europeias, candidaturas e projetos de desenvolvimento turístico.',
              'Available for institutional cooperation, European networks, candidacies and tourism development projects.'
            )}
          </p>
        </div>
        <div className="lg:col-span-5 space-y-3" data-reveal style={{ ['--reveal-delay' as any]: '120ms' }}>
          <div className="flex items-stretch border border-white/20 bg-white/[0.04]">
            <a href={`mailto:${EMAIL}`} className="flex-1 min-w-0 flex items-center gap-4 px-5 py-5 hover:bg-white/[0.06] transition-colors">
              <Mail className="w-5 h-5 text-gold-soft shrink-0" />
              <span className="min-w-0">
                <span className="block text-[12px] text-white/55">{t('Email institucional', 'Institutional email')}</span>
                <span className="block text-[16px] font-medium truncate">{EMAIL}</span>
              </span>
            </a>
            <button onClick={copy} aria-label={t('Copiar email', 'Copy email')} className="w-16 border-l border-white/20 grid place-items-center hover:bg-white/[0.06]">
              {copied ? <Check className="w-4 h-4 text-gold-soft" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 border border-white/20 bg-white/[0.04] px-5 py-5 hover:bg-white/[0.08] transition-colors"
          >
            <Linkedin className="w-5 h-5 text-gold-soft" />
            <span>
              <span className="block text-[12px] text-white/55">LinkedIn</span>
              <span className="block text-[16px] font-medium">Hugo Abreu Barros</span>
            </span>
          </a>
          <p aria-live="polite" className={`text-[13px] text-gold-soft transition-opacity ${copied ? 'opacity-100' : 'opacity-0'}`}>
            {t('Email copiado.', 'Email copied.')}
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="wrap py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <p className="font-serif text-[1.3rem]">Hugo Barros</p>
            <p className="mt-2 text-[14px] text-white/60 leading-relaxed max-w-sm">
              {t(
                'Técnico Superior · Inovação e Desenvolvimento Turístico. Divisão de Atividades Económicas e Turismo, Município de Braga.',
                'Senior Officer · Tourism Innovation & Development. Economic Activities and Tourism Division, Municipality of Braga.'
              )}
            </p>
          </div>
          <nav className="md:col-span-5 grid grid-cols-2 grid-rows-3 grid-flow-col gap-x-8 gap-y-2 content-start" aria-label={t('Rodapé', 'Footer')}>
            {NAV.map((s) => (
              <button key={s.id} onClick={() => goTo(s.id)} className="text-left text-[14px] text-white/70 hover:text-white w-fit">
                {s[lang]}
              </button>
            ))}
          </nav>
          <div className="md:col-span-2 flex md:justify-end items-start">
            <button onClick={() => goTo('top')} className="text-[14px] text-white/70 hover:text-white inline-flex items-center gap-2">
              <ArrowUp className="w-4 h-4" />
              {t('Topo', 'Top')}
            </button>
          </div>
        </div>
        <div className="wrap pb-8 text-[13px] text-white/45 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Hugo Barros</span>
          <span>{t('Portefólio profissional · Município de Braga', 'Professional portfolio · Municipality of Braga')}</span>
        </div>
      </div>
    </footer>
  );
}
