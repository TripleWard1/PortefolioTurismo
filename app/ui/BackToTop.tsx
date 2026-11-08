'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLang } from './LanguageContext';

/* Voltar ao topo: aparece depois de duas alturas de ecrã */
export default function BackToTop() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 2);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('Voltar ao topo', 'Back to top')}
      className={`fixed right-5 bottom-5 md:right-8 md:bottom-8 z-[410] w-12 h-12 rounded-full bg-ink text-white grid place-items-center shadow-[0_15px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-black ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
