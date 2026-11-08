'use client';

import { useState } from 'react';
import { ArrowUpRight, Building2, Check, Copy, Linkedin, Mail, MapPin } from 'lucide-react';
import { useLang } from '../ui/LanguageContext';
import { PageHead } from '../ui/parts';
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

  return (
    <div className="wrap pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5">
        <PageHead
          as="h1"
          kicker={t('Contacto', 'Contact')}
          title={t('Vamos conversar', 'Let’s talk')}
          intro={t(
            'Para cooperação institucional, redes europeias, candidaturas ou projetos de desenvolvimento turístico, o email é a via mais rápida.',
            'For institutional cooperation, European networks, candidacies or tourism development projects, email is the quickest way.'
          )}
        />
      </div>

      <div className="lg:col-span-7 space-y-4 lg:pt-10">
        <div className="rounded-xl bg-card border border-line p-6 md:p-7 flex flex-wrap items-center justify-between gap-5" data-reveal>
          <div className="flex items-center gap-4 min-w-0">
            <span className="w-12 h-12 rounded-lg bg-petrol text-white grid place-items-center shrink-0">
              <Mail className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] text-muted-foreground">{t('Email institucional', 'Institutional email')}</p>
              <a href={`mailto:${EMAIL}`} className="block font-serif text-[1.45rem] text-ink hover:text-petrol break-all">
                {EMAIL}
              </a>
            </div>
          </div>
          <button onClick={copy} className="h-10 px-4 rounded-full border border-line text-[14px] inline-flex items-center gap-2 hover:border-petrol/50">
            {copied ? <Check className="w-4 h-4 text-petrol" /> : <Copy className="w-4 h-4" />}
            {copied ? t('Copiado', 'Copied') : t('Copiar', 'Copy')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-card border border-line p-6 flex items-center gap-4 hover:border-petrol/40" data-reveal>
            <span className="w-12 h-12 rounded-lg bg-[#0a66c2] text-white grid place-items-center shrink-0">
              <Linkedin className="w-5 h-5" />
            </span>
            <span className="flex-1">
              <span className="block text-[13px] text-muted-foreground">LinkedIn</span>
              <span className="block font-semibold text-ink">Hugo Abreu Barros</span>
            </span>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-petrol" />
          </a>
          <div className="rounded-xl bg-card border border-line p-6 flex items-center gap-4" data-reveal style={{ ['--delay' as any]: '80ms' }}>
            <span className="w-12 h-12 rounded-lg bg-petrol/10 text-petrol grid place-items-center shrink-0">
              <Building2 className="w-5 h-5" />
            </span>
            <span>
              <span className="block text-[13px] text-muted-foreground">{t('Entidade', 'Organisation')}</span>
              <span className="block font-semibold text-ink">{t('Município de Braga', 'Municipality of Braga')}</span>
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-line p-6 flex items-start gap-4 text-[15px] text-muted-foreground" data-reveal>
          <MapPin className="w-5 h-5 text-petrol shrink-0 mt-0.5" />
          <p>
            {t(
              'Divisão de Atividades Económicas e Turismo, Município de Braga, Portugal.',
              'Economic Activities and Tourism Division, Municipality of Braga, Portugal.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
