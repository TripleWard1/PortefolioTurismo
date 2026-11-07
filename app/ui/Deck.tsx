'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';
import { useLang } from './LanguageContext';
import { buildSlides } from './slides';

/**
 * Portefólio em capítulos de ecrã inteiro.
 *  - Desktop: modo apresentação (roda, setas, espaço, PageUp/Down, 1–9, F, gestos).
 *  - Mobile e ecrãs baixos: capítulos empilhados com as mesmas entradas.
 */
export default function Deck({ onOpen, paused }: { onOpen: (id: string) => void; paused: boolean }) {
  const { t, lang, toggleLang } = useLang();
  const [modo, setModo] = useState<'deck' | 'pilha' | null>(null);
  const [i, setI] = useState(0);
  const [abertura, setAbertura] = useState<'mostra' | 'sai' | 'fim'>('mostra');
  const [cheio, setCheio] = useState(false);
  const [rato, setRato] = useState(true);
  const [vistos, setVistos] = useState<Set<number>>(new Set());
  const raiz = useRef<HTMLDivElement>(null);
  const bloqueio = useRef(0);
  const acum = useRef(0);
  const toque = useRef<{ x: number; y: number } | null>(null);

  const total = 10;
  const ir = useCallback((n: number) => setI(Math.max(0, Math.min(total - 1, n))), []);
  const seguinte = useCallback(() => setI((v) => Math.min(total - 1, v + 1)), []);
  const anterior = useCallback(() => setI((v) => Math.max(0, v - 1)), []);
  const slides = useMemo(() => buildSlides(onOpen, seguinte, t), [onOpen, seguinte, t]);
  const pronto = abertura !== 'mostra';

  // Modo conforme o ecrã
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 620px)');
    const set = () => setModo(mq.matches ? 'deck' : 'pilha');
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  // Abertura (uma vez por sessão)
  useEffect(() => {
    let visto = false;
    try {
      visto = sessionStorage.getItem('hb-abertura') === '1';
    } catch {}
    if (visto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setAbertura('fim');
    const a = setTimeout(() => {
      setAbertura('sai');
      try {
        sessionStorage.setItem('hb-abertura', '1');
      } catch {}
    }, 1900);
    const b = setTimeout(() => setAbertura('fim'), 2700);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  // Capítulo no endereço (#missoes, …) - partilhável
  useEffect(() => {
    const h = window.location.hash.slice(1);
    const k = slides.findIndex((s) => s.id === h);
    if (k > 0) {
      setI(k);
      if (modo === 'pilha') document.getElementById(`c-${h}`)?.scrollIntoView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modo]);
  useEffect(() => {
    if (modo !== 'deck' || paused) return;
    const id = slides[i].id;
    const alvo = i === 0 ? window.location.pathname : `#${id}`;
    if (!window.location.hash.startsWith('#projeto/')) window.history.replaceState(null, '', alvo);
  }, [i, modo, paused, slides]);

  // Teclado
  useEffect(() => {
    if (modo !== 'deck' || paused) return;
    const k = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.metaKey || e.ctrlKey || e.altKey) return;
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        seguinte();
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        anterior();
      } else if (e.key === 'Home') ir(0);
      else if (e.key === 'End') ir(total - 1);
      else if (/^[1-9]$/.test(e.key)) ir(Number(e.key) - 1);
      else if (e.key === '0') ir(9);
      else if (e.key.toLowerCase() === 'f') alternaCheio();
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [modo, paused, seguinte, anterior, ir]);

  // Roda / trackpad: primeiro esgota o scroll interno do capítulo
  useEffect(() => {
    const el = raiz.current;
    if (modo !== 'deck' || !el) return;
    let limpa = 0;
    const roda = (e: WheelEvent) => {
      if (paused) return;
      e.preventDefault();
      const c = el.querySelector<HTMLElement>('.d.on .d-conteudo');
      const dir = Math.sign(e.deltaY);
      if (c && c.scrollHeight > c.clientHeight + 4) {
        const podeDescer = c.scrollTop + c.clientHeight < c.scrollHeight - 2;
        const podeSubir = c.scrollTop > 2;
        if ((dir > 0 && podeDescer) || (dir < 0 && podeSubir)) {
          c.scrollTop += e.deltaY;
          return;
        }
      }
      acum.current += e.deltaY;
      clearTimeout(limpa);
      limpa = window.setTimeout(() => (acum.current = 0), 180);
      const agora = Date.now();
      if (Math.abs(acum.current) > 45 && agora > bloqueio.current) {
        bloqueio.current = agora + 900;
        acum.current = 0;
        if (dir > 0) seguinte();
        else anterior();
      }
    };
    el.addEventListener('wheel', roda, { passive: false });
    return () => el.removeEventListener('wheel', roda);
  }, [modo, paused, seguinte, anterior]);

  // Esconde o cursor parado (como numa apresentação)
  useEffect(() => {
    if (modo !== 'deck') return;
    let id = 0;
    const mexe = () => {
      setRato(true);
      clearTimeout(id);
      id = window.setTimeout(() => setRato(false), 2600);
    };
    mexe();
    window.addEventListener('mousemove', mexe);
    return () => {
      window.removeEventListener('mousemove', mexe);
      clearTimeout(id);
    };
  }, [modo]);

  // Modo pilha: cada capítulo anima ao entrar no ecrã
  useEffect(() => {
    if (modo !== 'pilha') return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            const k = Number((e.target as HTMLElement).dataset.k);
            setVistos((v) => (v.has(k) ? v : new Set(v).add(k)));
          }
        }),
      { threshold: 0.12 }
    );
    raiz.current?.querySelectorAll('.d').forEach((d) => io.observe(d));
    return () => io.disconnect();
  }, [modo]);

  useEffect(() => {
    const on = () => setCheio(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);
  function alternaCheio() {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen().catch(() => {});
  }

  const ativo = (k: number) => pronto && (modo === 'deck' ? k === i : vistos.has(k));
  const deck = modo === 'deck';

  return (
    <>
      {/* ABERTURA */}
      {abertura !== 'fim' && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[900] bg-bg flex items-end transition-opacity duration-700"
          style={{ opacity: abertura === 'sai' ? 0 : 1 }}
        >
          <div className="pad w-full pb-[12vh]">
            <div className="sobre mb-6" style={{ animation: 'entra .8s var(--ease) .1s both' }}>
              {t('Município de Braga · Portefólio', 'Municipality of Braga · Portfolio')}
            </div>
            <div className="overflow-hidden">
              <div className="marca" style={{ animation: 'sobe 1s cubic-bezier(.2,.7,.2,1) .25s both' }}>
                Hugo Barros<span className="text-v">.</span>
              </div>
            </div>
            <div className="mt-10 h-[3px] bg-ln rounded overflow-hidden max-w-[640px]">
              <div className="h-full bg-v origin-left" style={{ animation: 'enche 1.5s cubic-bezier(.65,0,.35,1) .3s both' }} />
            </div>
          </div>
        </div>
      )}

      {/* Barra superior (mobile) */}
      {modo === 'pilha' && (
        <header className="fixed top-0 inset-x-0 z-[300] bg-bg/85 backdrop-blur-md border-b border-ln">
          <div className="pad h-14 flex items-center justify-between">
            <span className="font-semibold tracking-[-0.03em] text-[17px]">
              Hugo Barros<span className="text-v">.</span>
            </span>
            <div className="flex items-center gap-4 text-[13px]">
              <button onClick={toggleLang} className="font-mono tracking-[0.1em]" aria-label={t('Mudar idioma', 'Change language')}>
                <span className={lang === 'pt' ? 'text-tx' : 'text-tx3'}>PT</span>
                <span className="text-tx3"> / </span>
                <span className={lang === 'en' ? 'text-tx' : 'text-tx3'}>EN</span>
              </button>
              <a href="#c-contacto" className="h-9 px-3.5 rounded-[3px] bg-v text-white inline-flex items-center font-medium">
                {t('Contacto', 'Contact')}
              </a>
            </div>
          </div>
        </header>
      )}

      <div
        ref={raiz}
        className={`${deck ? 'deck' : 'pilha'} ${modo ? '' : 'opacity-0'} ${deck && !rato ? '[&_*]:!cursor-none cursor-none' : ''}`}
        onTouchStart={(e) => deck && (toque.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchEnd={(e) => {
          if (!deck || !toque.current || paused) return;
          const dx = e.changedTouches[0].clientX - toque.current.x;
          const dy = e.changedTouches[0].clientY - toque.current.y;
          const d = Math.abs(dx) > Math.abs(dy) ? -dx : -dy;
          if (Math.abs(d) > 60) d > 0 ? seguinte() : anterior();
          toque.current = null;
        }}
      >
        {slides.map((s, k) => (
          <section
            key={s.id}
            id={`c-${s.id}`}
            data-k={k}
            aria-hidden={deck ? k !== i : undefined}
            aria-label={`${s.label[lang]} · ${k + 1} / ${total}`}
            className={`d ${ativo(k) ? 'on' : ''} ${deck && k < i ? 'antes' : ''} ${s.fundo ? 'com-fundo' : ''}`}
          >
            {s.fundo && <div className="d-fundo" style={{ backgroundImage: `url(${s.fundo})` }} />}
            <div className="d-conteudo">{s.corpo(ativo(k))}</div>
          </section>
        ))}
      </div>

      {/* Barra inferior (modo apresentação) */}
      {deck && (
        <>
          <div className="fixed top-0 inset-x-0 z-[300] pad h-[72px] flex items-center justify-between pointer-events-none">
            <button onClick={() => ir(0)} className="pointer-events-auto font-semibold tracking-[-0.03em] text-[17px] text-tx2 hover:text-tx">
              Hugo Barros<span className="text-v">.</span>
            </button>
            <div className={`text-[12px] text-tx3 transition-opacity duration-500 ${rato ? 'opacity-80' : 'opacity-0'}`}>
              {t('Roda ou ↓ avançar · ↑ recuar · F ecrã inteiro', 'Scroll or ↓ next · ↑ back · F full screen')}
            </div>
            <div className="pointer-events-auto flex items-center gap-5">
              <button onClick={toggleLang} className="font-mono text-[12px] tracking-[0.1em]" aria-label={t('Mudar idioma', 'Change language')}>
                <span className={lang === 'pt' ? 'text-tx' : 'text-tx3 hover:text-tx2'}>PT</span>
                <span className="text-tx3"> / </span>
                <span className={lang === 'en' ? 'text-tx' : 'text-tx3 hover:text-tx2'}>EN</span>
              </button>
              <button onClick={() => ir(total - 1)} className="h-9 px-4 rounded-[3px] bg-v text-white text-[13px] font-medium hover:bg-[#e01e1e] transition-colors">
                {t('Contacto', 'Contact')}
              </button>
            </div>
          </div>

          <nav className="fixed bottom-0 inset-x-0 z-[300] pad pb-[26px] flex items-center gap-[22px] text-[13px] text-tx3" aria-label={t('Capítulos', 'Chapters')}>
            <span className="hidden xl:block w-[180px] truncate text-tx2">{slides[i].label[lang]}</span>
            <div className="flex-1 flex gap-1.5">
              {slides.map((s, k) => (
                <button
                  key={s.id}
                  onClick={() => ir(k)}
                  title={s.label[lang]}
                  aria-label={`${k + 1}. ${s.label[lang]}`}
                  aria-current={k === i ? 'step' : undefined}
                  className="group flex-1 py-2"
                >
                  <span className={`block h-[3px] rounded-sm transition-colors duration-500 ${k <= i ? 'bg-tx' : 'bg-ln group-hover:bg-tx3'} ${k === i ? '!bg-v' : ''}`} />
                </button>
              ))}
            </div>
            <span className="font-mono tnum text-[13px]">
              {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1">
              <button onClick={anterior} disabled={i === 0} aria-label={t('Capítulo anterior', 'Previous chapter')} className="w-9 h-9 grid place-items-center rounded-[3px] hover:bg-sup disabled:opacity-30">
                <ChevronUp className="w-4 h-4" />
              </button>
              <button onClick={seguinte} disabled={i === total - 1} aria-label={t('Capítulo seguinte', 'Next chapter')} className="w-9 h-9 grid place-items-center rounded-[3px] hover:bg-sup disabled:opacity-30">
                <ChevronDown className="w-4 h-4" />
              </button>
              <button onClick={alternaCheio} aria-label={t('Ecrã inteiro', 'Full screen')} className="w-9 h-9 grid place-items-center rounded-[3px] hover:bg-sup">
                {cheio ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
