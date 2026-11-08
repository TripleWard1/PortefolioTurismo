'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useLang } from '../ui/LanguageContext';
import { EMAIL, LINKEDIN } from '../ui/Footer';

export default function ContactView() {
  const { t } = useLang();
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

  const rows = [
    { k: t('Email', 'Email'), v: EMAIL, href: `mailto:${EMAIL}` },
    { k: 'LinkedIn', v: 'Hugo Abreu Barros', href: LINKEDIN, ext: true },
    { k: t('Entidade', 'Organisation'), v: t('Município de Braga — Divisão de Atividades Económicas e Turismo', 'Municipality of Braga — Economic Activities and Tourism Division') },
  ];

  return (
    <div className="wrap pt-16 md:pt-24">
      <header data-reveal>
        <p className="t-label text-mute">{t('Contacto', 'Contact')}</p>
        <h1 className="mt-4 t-hero text-ink">{t('Vamos conversar.', 'Let’s talk.')}</h1>
        <p className="mt-6 t-lead text-mute max-w-2xl text-pretty">
          {t(
            'Para cooperação institucional, redes europeias, candidaturas ou projetos de desenvolvimento turístico, o email é a via mais rápida.',
            'For institutional cooperation, European networks, bids or tourism development projects, email is the quickest way.'
          )}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={`mailto:${EMAIL}`} className="h-12 px-6 rounded-full bg-ink text-white text-[15px] font-medium inline-flex items-center hover:bg-black transition-colors">
            {t('Enviar email', 'Send an email')}
          </a>
          <button onClick={copy} className="h-12 px-5 rounded-full bg-soft text-ink text-[15px] font-medium inline-flex items-center gap-2 hover:bg-line transition-colors">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? t('Copiado', 'Copied') : t('Copiar endereço', 'Copy address')}
          </button>
        </div>
      </header>

      <dl className="mt-20 border-t border-line" data-reveal>
        {rows.map((r) => (
          <div key={r.k} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-6 border-b border-line">
            <dt className="md:col-span-3 t-label text-mute pt-1">{r.k}</dt>
            <dd className="md:col-span-9">
              {r.href ? (
                <a
                  href={r.href}
                  target={r.ext ? '_blank' : undefined}
                  rel={r.ext ? 'noopener noreferrer' : undefined}
                  className="group inline-flex items-center gap-2 text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold tracking-[-0.025em] text-ink break-all"
                >
                  {r.v}
                  <ArrowUpRight className="w-5 h-5 text-mute transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                </a>
              ) : (
                <span className="text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] font-medium tracking-[-0.02em] text-ink">{r.v}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
