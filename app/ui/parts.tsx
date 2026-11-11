'use client';

import Link from 'next/link';
import { useEffect, useRef, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { TONE } from './viz/palette';
import { THEME_LABEL, type ProjectMeta } from './projects';

/* Cabeçalho de secção */
export function SectionHead({ label, title, intro, action }: { label: string; title: ReactNode; intro?: ReactNode; action?: ReactNode }) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6" data-reveal>
      <div className="max-w-2xl">
        <p className="t-label text-mute">{label}</p>
        <h2 className="mt-3 t-h2 text-ink text-balance">{title}</h2>
        {intro && <p className="mt-4 t-lead text-mute text-pretty">{intro}</p>}
      </div>
      {action}
    </header>
  );
}

/* Ligação de texto com seta */
export function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`group t-label inline-flex items-center gap-1 shrink-0 ${light ? 'text-white' : 'text-ink'}`}>
      <span className="underline decoration-1 underline-offset-4 decoration-current/30 group-hover:decoration-current transition-colors">{children}</span>
      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

/* Cartão de projeto: imagem sobre o tom da área, área, título, resumo e função */
export function ProjectCard({ p, ratio = 'aspect-[4/3]', delay = 0 }: { p: ProjectMeta; ratio?: string; delay?: number }) {
  const { lang, t } = useLang();
  const tone = TONE[p.theme];
  return (
    <Link href={`/projetos/${p.id}`} data-reveal style={{ ['--delay' as any]: `${delay}ms` }} className="group flex flex-col h-full">
      <div className={`media rounded-3xl ${ratio}`} style={{ background: tone.tint }}>
        <img src={p.image} alt="" loading="lazy" className={p.logo ? '!object-contain p-[12%]' : ''} />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 t-label text-ink">{p.outcome[lang]}</span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="t-label inline-flex items-center gap-2 min-w-0" style={{ color: tone.deep }}>
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tone.deep }} />
          <span className="truncate">{THEME_LABEL[p.theme][lang]}</span>
        </p>
        <span className="t-label text-mute shrink-0 tabular-nums">{p.year}</span>
      </div>
      <h3 className="mt-2 text-[1.3125rem] leading-snug text-ink font-semibold tracking-[-0.025em]">{p.title[lang]}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-mute line-clamp-3 text-pretty">{p.summary[lang]}</p>
      <p className="mt-auto pt-4 t-label text-ink/70">
        <span className="text-mute">{t('Função', 'Role')}:</span> {p.role[lang]}
      </p>
    </Link>
  );
}

/* Título com entrada palavra a palavra. Partes em itálico serifado com { em }. */
type Part = string | { em: string; color?: string };
export function Split({ parts, auto = false, delay = 0 }: { parts: Part[]; auto?: boolean; delay?: number }) {
  let i = 0;
  const words = (text: string, em?: boolean, color?: string) =>
    text
      .split(' ')
      .filter(Boolean)
      .map((w) => {
        const k = i++;
        return (
          <span key={k} className={`sw ${em ? 'em' : ''}`} style={color ? { color } : undefined}>
            <span style={{ ['--i' as any]: k }}>{w}</span>
          </span>
        );
      });
  const out: ReactNode[] = [];
  parts.forEach((p, n) => {
    const ws = typeof p === 'string' ? words(p) : words(p.em, true, p.color);
    ws.forEach((w, j) => {
      // espaço entre palavras, exceto antes de pontuação colada
      const nextIsPunct = typeof parts[n + 1] === 'string' && /^[.,;:]/.test(parts[n + 1] as string) && j === ws.length - 1;
      out.push(w);
      if (!nextIsPunct) out.push(' ');
    });
  });
  return (
    <span className={auto ? 'sw-anim' : undefined} style={auto ? { ['--d' as any]: `${delay}ms` } : undefined}>
      {out}
    </span>
  );
}

/* Frase que acende palavra a palavra enquanto atravessa o ecrã (scroll normal, nada preso).
   Mesmas partes que Split: texto simples ou { em } em itálico serifado. */
export function WordLight({ parts }: { parts: Part[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const words = Array.from(host.querySelectorAll<HTMLElement>('.w'));
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      words.forEach((w) => w.classList.add('on'));
      return;
    }
    let queued = false;
    let visible = false;
    const tick = () => {
      queued = false;
      const r = host.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 quando o início entra a 85% do ecrã; 1 quando o fim chega a 45%
      const k = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.85 - vh * 0.45 + r.height)));
      const n = Math.floor(k * (words.length + 1));
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    };
    const on = () => {
      if (visible && !queued) {
        queued = true;
        requestAnimationFrame(tick);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) on();
    });
    io.observe(host);
    window.addEventListener('scroll', on, { passive: true });
    tick();
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', on);
    };
  }, [JSON.stringify(parts)]); // eslint-disable-line react-hooks/exhaustive-deps

  const out: ReactNode[] = [];
  let i = 0;
  parts.forEach((p, n) => {
    const text = typeof p === 'string' ? p : p.em;
    const ws = text.split(' ').filter(Boolean);
    ws.forEach((w, j) => {
      out.push(
        <span key={i++} className={`w ${typeof p === 'string' ? '' : 'em'}`} style={typeof p !== 'string' && p.color ? { color: p.color } : undefined}>
          {w}
        </span>
      );
      const nextIsPunct = typeof parts[n + 1] === 'string' && /^[.,;:?]/.test(parts[n + 1] as string) && j === ws.length - 1;
      if (!nextIsPunct) out.push(' ');
    });
  });
  return (
    <span ref={ref} className="wl" data-xray="Frase que acende · scroll com requestAnimationFrame" data-xray-tool="code">
      {out}
    </span>
  );
}
