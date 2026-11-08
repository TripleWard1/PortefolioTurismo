'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { useLang } from './LanguageContext';
import { Split } from './parts';
import { Monogram } from './Header';
import LocalTime from './LocalTime';
import { EMAIL, LINKEDIN } from './Footer';
import { ROLE } from './profile';
import { TONE } from './viz/palette';

/* Convite ao contacto no fim da página inicial: áreas de cooperação que abrem o formulário
   já com o assunto escolhido, e um cartão com email, LinkedIn e hora local. */
export default function ContactBlock() {
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);
  const tone = TONE.internacional;

  const topics = [
    { k: t('Cooperação institucional', 'Institutional cooperation'), s: 0 },
    { k: t('Redes e candidaturas europeias', 'European networks and bids'), s: 1 },
    { k: t('Promoção e mercados internacionais', 'Promotion and international markets'), s: 2 },
    { k: t('Conferências, júris e comunicações', 'Conferences, juries and talks'), s: 3 },
  ];

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
    <section className="relative -mb-32 overflow-hidden text-white py-24 md:py-36" style={{ background: tone.dark }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -left-40 -bottom-56 w-[760px] h-[760px] rounded-full blur-3xl opacity-50" style={{ background: `radial-gradient(circle, ${tone.deep}, transparent 65%)` }} />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative wrap grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
        <div className="lg:col-span-7" data-reveal>
          <p className="t-label inline-flex items-center gap-2" style={{ color: tone.glow }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: tone.glow }} />
            {t('Contacto', 'Contact')}
          </p>
          <h2 className="mt-5 t-hero !text-[clamp(2.75rem,1.4rem+4.6vw,5.75rem)] text-white">
            <Split parts={[t('Cooperação', 'Institutional'), { em: t('institucional', 'cooperation'), color: tone.glow }, '.']} />
          </h2>
          <p className="mt-6 t-lead text-white/70 max-w-xl text-pretty">
            {t(
              'Para parcerias, candidaturas conjuntas ou convites, escolha o tema. O formulário abre já preparado.',
              'For partnerships, joint bids or invitations, choose a topic. The form opens ready to go.'
            )}
          </p>

          <ul className="mt-10 border-t border-white/15">
            {topics.map((tp, i) => (
              <li key={tp.s} className="border-b border-white/15">
                <Link href={`/contacto?assunto=${tp.s}`} className="group flex items-center gap-5 py-5">
                  <span className="em text-[1.25rem] w-8 shrink-0 text-white/40 group-hover:text-white transition-colors">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 text-[1.125rem] md:text-[1.375rem] font-medium tracking-[-0.02em] text-white/85 group-hover:text-white transition-all duration-500 group-hover:translate-x-1">
                    {tp.k}
                  </span>
                  <span className="w-10 h-10 rounded-full ring-1 ring-inset ring-white/20 grid place-items-center shrink-0 transition-all duration-500 group-hover:bg-white group-hover:text-ink group-hover:ring-white">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-5 lg:pt-16" data-reveal style={{ ['--delay' as any]: '120ms' }}>
          <div className="rounded-4xl bg-white/[0.06] ring-1 ring-inset ring-white/15 backdrop-blur-xl p-6 md:p-8">
            <div className="flex items-center gap-4">
              <Monogram light size={52} />
              <div className="min-w-0">
                <p className="text-[1.125rem] font-semibold tracking-[-0.02em]">Hugo Barros</p>
                <p className="t-label text-white/60">{ROLE[lang]}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="t-label text-white/55">Email</p>
              <a href={`mailto:${EMAIL}`} className="mt-1 block text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] font-semibold tracking-[-0.02em] break-all hover:underline underline-offset-4">
                {EMAIL}
              </a>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <a href={`mailto:${EMAIL}`} className="h-12 rounded-full bg-white text-ink t-label inline-flex items-center justify-center gap-2 hover:bg-[#F2E6DF] transition-colors">
                  <Mail className="w-4 h-4" />
                  {t('Escrever', 'Write')}
                </a>
                <button onClick={copy} className="h-12 rounded-full ring-1 ring-inset ring-white/25 t-label inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? t('Copiado', 'Copied') : t('Copiar', 'Copy')}
                </button>
              </div>
            </div>

            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="group mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
              <span>
                <span className="block t-label text-white/55">LinkedIn</span>
                <span className="block text-[15px] font-medium">Hugo Abreu Barros</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </a>

            <p className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between t-label text-white/55">
              <span>Braga, Portugal</span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9FD1A9]" />
                <LocalTime /> {t('hora local', 'local time')}
              </span>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
