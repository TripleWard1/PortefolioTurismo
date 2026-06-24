'use client';
import {
  Mail,
  Linkedin,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Circle,
  Briefcase,
  MessagesSquare,
} from 'lucide-react';
import { useLang } from './LanguageContext';

export default function Contact() {
  const { t } = useLang();

  return (
    <section
      id="contacto"
      className="relative py-16 md:py-24 px-6 overflow-hidden bg-white"
    >
      {/* Background de Alta Precisão */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--primary)]/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Título Minimalista e Posicionado no Topo */}
        <div className="mb-12 flex items-center gap-4">
          <h3 className="text-sm uppercase tracking-[0.3em] font-black text-[var(--ink)]">
            {t('Contacto', 'Contact')}
          </h3>
          <div className="h-[1px] flex-1 bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Coluna 01: Foto e Mensagem (7 Colunas) */}
          <div className="lg:col-span-7 space-y-12">
            <div className="flex flex-col md:flex-row gap-10 items-start md:items-end">
              {/* Fotografia de Grande Destaque */}
              <div className="relative shrink-0">
                <div className="absolute -inset-4 bg-[var(--primary)]/10 rounded-[2rem] -z-10 blur-xl opacity-60" />

                <div className="relative w-48 h-64 md:w-64 md:h-80 rounded-[2rem] overflow-hidden border-[6px] border-white shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src="https://i.imgur.com/Dx42oze.jpeg"
                    alt="Hugo Barros"
                    className="w-full h-full object-cover object-top scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                </div>

                {/* Badge Flutuante na Foto */}
                <div className="absolute -bottom-4 -right-4 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-800">
                  <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Online
                  </span>
                </div>
              </div>

              {/* Título ao lado da foto no Desktop */}
              <div className="space-y-6 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--primary)]/10 rounded-full border border-[var(--primary)]/20">
                  <MessagesSquare className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--primary)]">
                    {t('Novos Pontos de Contacto', 'New Contact Points')}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-playfair font-black text-[var(--ink)] leading-[0.9] tracking-tighter">
                  {t('Expandir', 'Expanding')} <br />
                  <span className="text-[var(--primary)] italic font-light">
                    {t('perspetivas.', 'perspectives.')}
                  </span>
                </h2>
              </div>
            </div>

            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-xl border-l-2 border-[var(--primary)]/20 pl-6">
              {t(
                'Acredito que o valor real nasce da interseção entre visão territorial e execução estratégica. Mantenho-me atento a projetos que desafiem o status quo e promovam impacto sustentável.',
                'I believe true value is born from the intersection of territorial vision and strategic execution. I stay attentive to projects that challenge the status quo and promote sustainable impact.'
              )}
            </p>

            {/* Badges de Credibilidade */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all duration-500">
                <Briefcase className="w-5 h-5 text-[var(--primary)]" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                    {t('Vínculo', 'Affiliation')}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">
                    {t('Município de Braga', 'Braga Municipality')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                    {t('Foco', 'Focus')}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">
                    {t('Estratégia Territorial', 'Territorial Strategy')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 02: Interface de Contacto (5 Colunas) */}
          <div className="lg:col-span-5 relative lg:mt-24">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--primary)]/10 to-[var(--primary)]/10 rounded-[3rem] -z-10 blur-2xl opacity-60" />

            <div className="space-y-4">
              {/* Card de Email */}
              <a
                href="mailto:hugo.barros@cm-braga.pt"
                className="group block p-[1px] rounded-[2rem] bg-gradient-to-b from-slate-200 to-transparent hover:from-[var(--sky)] transition-all duration-500 shadow-sm"
              >
                <div className="bg-white rounded-[1.9rem] p-6 flex items-center justify-between group-hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-[var(--primary)] uppercase tracking-widest mb-0.5">
                        {t('Ligar Visões', 'Connecting Visions')}
                      </p>
                      <p className="text-base md:text-lg font-bold text-[var(--ink)] lowercase">
                        hugo.barros@cm-braga.pt
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[var(--primary)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </a>

              {/* Card LinkedIn */}
              <a
                href="https://www.linkedin.com/in/hugo-abreu-barros/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-[1px] rounded-[2rem] bg-gradient-to-b from-slate-200 to-transparent hover:from-[var(--primary)] transition-all duration-500 shadow-sm"
              >
                <div className="bg-white rounded-[1.9rem] p-6 flex items-center justify-between group-hover:bg-[var(--primary)]/[0.06] transition-colors">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                      <Linkedin className="w-5 h-5 text-white fill-current" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-[var(--primary)] uppercase tracking-widest mb-0.5">
                        Networking
                      </p>
                      <p className="text-base md:text-lg font-bold text-[var(--ink)]">
                        Hugo Abreu Barros
                      </p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[10px] font-bold text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                    {t('Conectar', 'Connect')}
                  </div>
                </div>
              </a>

              {/* Info de Localização Suave */}
              <div className="p-8 flex items-center gap-6 text-slate-400 border border-transparent border-t-slate-100">
                <MapPin className="w-5 h-5" />
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                    {t('Localização', 'Location')}
                  </p>
                  <p className="text-sm font-medium text-slate-600">
                    {t('Braga, Portugal - Disponibilidade Global', 'Braga, Portugal - Global Availability')}
                  </p>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <Circle
                      key={i}
                      className={`w-1.5 h-1.5 fill-current ${
                        i === 3 ? 'text-[var(--sky)]' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé Integrado */}
        <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <h4 className="font-playfair text-2xl font-black text-[var(--ink)] tracking-tighter">
              Hugo Barros
            </h4>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">
              {t('Territorial Strategy & Impact', 'Territorial Strategy & Impact')}
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 text-right">
            <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <span className="hover:text-[var(--primary)] cursor-pointer transition-colors">
                {t('Curadoria', 'Curation')}
              </span>
              <span className="hover:text-[var(--primary)] cursor-pointer transition-colors">
                {t('Inovação', 'Innovation')}
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-300">
              © 2026 - STRATEGIC PORTFOLIO
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}