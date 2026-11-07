'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLang } from './LanguageContext';
import { goTo, useScrollLock } from './hooks';

export const NAV = [
  { id: 'perfil', pt: 'Perfil', en: 'Profile' },
  { id: 'areas', pt: 'Áreas de atuação', en: 'Areas of work' },
  { id: 'projetos', pt: 'Projetos', en: 'Projects' },
  { id: 'missoes', pt: 'Missões internacionais', en: 'International missions' },
  { id: 'contacto', pt: 'Contacto', en: 'Contact' },
];

function LangSwitch() {
  const { lang, toggleLang, t } = useLang();
  return (
    <button
      onClick={toggleLang}
      aria-label={t('Mudar idioma para inglês', 'Switch language to Portuguese')}
      className="flex items-center gap-1.5 text-[13px] font-semibold"
    >
      <span className={lang === 'pt' ? 'text-white' : 'text-white/50 hover:text-white/80'}>PT</span>
      <span className="text-white/30">|</span>
      <span className={lang === 'en' ? 'text-white' : 'text-white/50 hover:text-white/80'}>EN</span>
    </button>
  );
}

export default function Navbar() {
  const { lang, t } = useLang();
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const nav = (id: string) => {
    setOpen(false);
    goTo(id);
  };

  return (
    <header className="sticky top-0 z-[400]">
      {/* Barra institucional */}
      <div className="bg-navy-dark text-white">
        <div className="wrap h-9 flex items-center justify-between gap-4">
          <span className="text-[12px] text-white/80 truncate">
            {t('Município de Braga', 'Municipality of Braga')}
            <span className="hidden sm:inline text-white/50">
              {' · '}
              {t('Divisão de Atividades Económicas e Turismo', 'Economic Activities and Tourism Division')}
            </span>
          </span>
          <LangSwitch />
        </div>
      </div>

      {/* Navegação principal */}
      <div className="bg-white border-b border-line">
        <div className="wrap h-[68px] flex items-center justify-between gap-6">
          <button onClick={() => nav('top')} className="flex items-center gap-3 text-left" aria-label={t('Início', 'Home')}>
            <span className="w-10 h-10 rounded bg-navy text-white grid place-items-center font-serif font-semibold text-[15px]">HB</span>
            <span className="leading-tight">
              <span className="block font-serif font-semibold text-[17px] text-ink">Hugo Barros</span>
              <span className="block text-[12px] text-muted">{t('Inovação e Desenvolvimento Turístico', 'Tourism Innovation & Development')}</span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1" aria-label={t('Navegação principal', 'Main navigation')}>
            {NAV.slice(0, 4).map((s) => (
              <button
                key={s.id}
                onClick={() => nav(s.id)}
                aria-current={active === s.id ? 'true' : undefined}
                className={`relative px-3.5 h-[68px] text-[14px] font-medium transition-colors ${
                  active === s.id ? 'text-navy' : 'text-muted hover:text-ink'
                }`}
              >
                {s[lang]}
                <span className={`absolute left-3.5 right-3.5 bottom-0 h-[3px] bg-navy transition-opacity ${active === s.id ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
            <button
              onClick={() => nav('contacto')}
              className="ml-3 h-10 px-5 rounded bg-navy text-white text-[14px] font-semibold hover:bg-navy-dark transition-colors"
            >
              {t('Contactar', 'Get in touch')}
            </button>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded border border-line grid place-items-center text-ink"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu móvel */}
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-[104px] bottom-0 bg-white border-t border-line overflow-y-auto">
          <nav className="wrap py-4 flex flex-col">
            {NAV.map((s) => (
              <button
                key={s.id}
                onClick={() => nav(s.id)}
                className={`text-left py-4 border-b border-line text-[17px] font-medium ${active === s.id ? 'text-navy' : 'text-ink'}`}
              >
                {s[lang]}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
