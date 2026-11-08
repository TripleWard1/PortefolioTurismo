'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useLang } from '../ui/LanguageContext';
import { EMAIL, LINKEDIN } from '../ui/Footer';
import { ENTITY, ROLE } from '../ui/profile';
import { TONE } from '../ui/viz/palette';

export default function ContactView() {
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);

  const subjects = [
    t('Cooperação institucional', 'Institutional cooperation'),
    t('Redes e candidaturas europeias', 'European networks and bids'),
    t('Promoção e mercados internacionais', 'Promotion and international markets'),
    t('Conferências, júris e comunicações', 'Conferences, juries and talks'),
    t('Outro assunto', 'Other matter'),
  ];
  const [subject, setSubject] = useState(0);
  const [form, setForm] = useState({ name: '', org: '', message: '' });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  // Prepara a mensagem no cliente de email do visitante
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const body = [form.message, '', '—', form.name, form.org].filter((l, i) => i < 3 || l).join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subjects[subject])}&body=${encodeURIComponent(body)}`;
  };

  const field = 'w-full rounded-2xl bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-mute outline-none ring-1 ring-inset ring-line focus:ring-ink/40 transition';

  return (
    <div className="wrap pt-16 md:pt-24">
      <header data-reveal>
        <p className="t-label text-mute">{t('Contacto', 'Contact')}</p>
        <h1 className="mt-4 t-hero text-ink text-balance">
          {t('Contacto', 'Institutional')} <span className="em">{t('institucional', 'contact')}</span>.
        </h1>
        <p className="mt-6 t-lead text-mute max-w-2xl text-pretty">
          {t(
            'Pedidos de cooperação institucional, parcerias em redes europeias, candidaturas conjuntas, convites para conferências e júris.',
            'Requests for institutional cooperation, partnerships in European networks, joint bids, and invitations to conferences and juries.'
          )}
        </p>
      </header>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Formulário */}
        <form onSubmit={submit} className="lg:col-span-7 rounded-4xl bg-mist p-6 md:p-10" data-reveal>
          <p className="t-label" style={{ color: TONE.europeu.deep }}>
            {t('Pedido de contacto', 'Contact request')}
          </p>

          <fieldset className="mt-6">
            <legend className="t-label text-ink/60">{t('Assunto', 'Subject')}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {subjects.map((s, i) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSubject(i)}
                  aria-pressed={subject === i}
                  className={`t-label h-9 px-4 rounded-full transition-colors ${subject === i ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-white/60'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="sr-only">{t('Nome', 'Name')}</span>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t('Nome', 'Name')} className={field} />
            </label>
            <label className="block">
              <span className="sr-only">{t('Entidade', 'Organisation')}</span>
              <input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} placeholder={t('Entidade (opcional)', 'Organisation (optional)')} className={field} />
            </label>
          </div>
          <label className="mt-3 block">
            <span className="sr-only">{t('Mensagem', 'Message')}</span>
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={t('Descreva brevemente o pedido, o enquadramento e os prazos.', 'Briefly describe the request, its context and timeline.')}
              className={`${field} resize-y`}
            />
          </label>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="t-label text-ink/55 max-w-xs">
              {t('A mensagem é preparada no seu cliente de email.', 'The message opens in your email client.')}
            </p>
            <button type="submit" className="h-12 px-6 rounded-full bg-ink text-white text-[15px] font-medium inline-flex items-center gap-2 hover:bg-black transition-colors">
              {t('Preparar email', 'Compose email')} <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Dados de contacto */}
        <aside className="lg:col-span-5" data-reveal style={{ ['--delay' as any]: '100ms' }}>
          <dl className="border-t border-line">
            <div className="py-6 border-b border-line">
              <dt className="t-label text-mute">Email</dt>
              <dd className="mt-2 flex flex-wrap items-center gap-3">
                <a href={`mailto:${EMAIL}`} className="text-[1.25rem] font-semibold tracking-[-0.025em] text-ink break-all hover:underline underline-offset-4">
                  {EMAIL}
                </a>
                <button onClick={copy} className="t-label h-8 px-3 rounded-full bg-soft text-ink inline-flex items-center gap-1.5 hover:bg-line transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? t('Copiado', 'Copied') : t('Copiar', 'Copy')}
                </button>
              </dd>
            </div>
            <div className="py-6 border-b border-line">
              <dt className="t-label text-mute">LinkedIn</dt>
              <dd className="mt-2">
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-[1.25rem] font-semibold tracking-[-0.025em] text-ink">
                  Hugo Abreu Barros
                  <ArrowUpRight className="w-5 h-5 text-mute transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                </a>
              </dd>
            </div>
            <div className="py-6 border-b border-line">
              <dt className="t-label text-mute">{t('Função', 'Role')}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink">{ROLE[lang]}</dd>
            </div>
            <div className="py-6 border-b border-line">
              <dt className="t-label text-mute">{t('Entidade', 'Organisation')}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink">{ENTITY[lang]}</dd>
            </div>
            <div className="py-6 border-b border-line">
              <dt className="t-label text-mute">{t('Localização', 'Location')}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink">Braga, Portugal</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
