'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLang } from './LanguageContext';
import { goTo, useScrollLock } from './hooks';

export const NAV = [
  { id: 'perfil', pt: 'Perfil', en: 'Profile' },
  { id: 'candidaturas', pt: 'Candidaturas', en: 'Candidacies' },
  { id: 'promocao', pt: 'Promoção', en: 'Promotion' },
  { id: 'digital', pt: 'Digital', en: 'Digital' },
  { id: 'patrimonio', pt: 'Património', en: 'Heritage' },
  { id: 'indice', pt: 'Projetos', en: 'Projects' },
];

/* Transparente sobre o hero; papel sólido com filete de progresso ao descer */
export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  useScrollLock(open);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.6);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    [...NAV.map((n) => n.id), 'contacto'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const nav = (id: string) => {
    setOpen(false);
    goTo(id);
  };
  const light = !solid && !open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[400] transition-[background-color,box-shadow,color] duration-500 ${
        light ? 'bg-transparent text-white' : 'bg-paper/95 backdrop-blur-md text-ink shadow-[0_1px_0_var(--line)]'
      }`}
    >
      <div className="wrap h-[76px] flex items-center justify-between gap-6">
        <button onClick={() => nav('top')} className="flex items-center gap-3 text-left" aria-label={t('Início', 'Home')}>
          <span
            className={`w-10 h-10 grid place-items-center font-serif text-[15px] border transition-colors ${
              light ? 'border-white/40' : 'border-navy bg-navy text-white'
            }`}
          >
            HB
          </span>
          <span className="leading-tight hidden sm:block">
            <span className="block font-serif text-[18px]">Hugo Barros</span>
            <span className={`block text-[11px] tracking-[0.14em] uppercase ${light ? 'text-white/65' : 'text-muted'}`}>
              {t('Município de Braga', 'Municipality of Braga')}
            </span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-7" aria-label={t('Navegação principal', 'Main navigation')}>
          {NAV.map((s) => (
            <button
              key={s.id}
              onClick={() => nav(s.id)}
              className={`relative py-2 text-[14px] transition-opacity ${active === s.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
            >
              {s[lang]}
              <span
                className={`absolute left-0 right-0 -bottom-0.5 h-px bg-gold origin-left transition-transform duration-500 ${
                  active === s.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={toggleLang} className="text-[13px] font-semibold tracking-[0.08em]" aria-label={t('Mudar idioma', 'Change language')}>
            <span className={lang === 'pt' ? '' : 'opacity-45'}>PT</span>
            <span className="opacity-30 mx-1.5">/</span>
            <span className={lang === 'en' ? '' : 'opacity-45'}>EN</span>
          </button>
          <button
            onClick={() => nav('contacto')}
            className={`hidden md:inline-flex h-10 px-5 items-center text-[14px] font-medium border transition-colors ${
              light ? 'border-white/50 hover:bg-white hover:text-navy' : 'border-navy bg-navy text-white hover:bg-navy-2'
            }`}
          >
            {t('Contacto', 'Contact')}
          </button>
          <button onClick={() => setOpen((v) => !v)} className="lg:hidden w-10 h-10 grid place-items-center" aria-label="Menu" aria-expanded={open}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div ref={bar} className={`h-px bg-gold origin-left transition-opacity ${light ? 'opacity-0' : 'opacity-100'}`} style={{ transform: 'scaleX(0)' }} />

      {/* Menu móvel */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[77px] bottom-0 bg-paper transition-[opacity,transform] duration-500 ease-soft ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        <nav className="wrap py-6 flex flex-col">
          {[...NAV, { id: 'contacto', pt: 'Contacto', en: 'Contact' }].map((s, i) => (
            <button
              key={s.id}
              tabIndex={open ? 0 : -1}
              onClick={() => nav(s.id)}
              className="flex items-baseline gap-4 py-4 border-b border-line text-left"
            >
              <span className="text-[12px] text-gold font-semibold">{String(i + 1).padStart(2, '0')}</span>
              <span className={`font-serif text-[1.6rem] ${active === s.id ? 'text-navy' : 'text-ink'}`}>{s[lang]}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
