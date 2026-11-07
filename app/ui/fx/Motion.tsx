'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { PROJECTS } from '../projects';
import { useLang } from '../LanguageContext';

/* Palavras que se sucedem (ex.: cidades das missões).
   Todas ocupam a mesma célula de grelha: a largura é a da palavra mais longa,
   por isso a frase não salta. */
export function WordCycle({ words, ms = 2200, className = '' }: { words: string[]; ms?: number; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), ms);
    return () => clearInterval(id);
  }, [words.length, ms]);
  return (
    <span className={`inline-grid align-bottom overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`} aria-live="polite">
      {words.map((w, k) => (
        <span
          key={w}
          aria-hidden={k !== i}
          className="[grid-area:1/1] whitespace-nowrap transition-[transform,opacity] duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ transform: `translateY(${k === i ? 0 : k === (i - 1 + words.length) % words.length ? -100 : 100}%)`, opacity: k === i ? 1 : 0 }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

/* Faixa contínua (texto ou imagens). Pausa ao passar o rato.
   Cada cópia leva o espaçamento à direita para o ciclo ser perfeito. */
export function Marquee({ children, speed = 60, reverse = false, gap = 16, className = '' }: { children: ReactNode; speed?: number; reverse?: boolean; gap?: number; className?: string }) {
  const copy = (hidden: boolean) => (
    <div className="flex shrink-0" style={{ gap, paddingRight: gap }} aria-hidden={hidden || undefined}>
      {children}
    </div>
  );
  return (
    <div className={`group/mq overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] ${className}`}>
      <div className="flex w-max group-hover/mq:[animation-play-state:paused]" style={{ animation: `marquee ${speed}s linear infinite ${reverse ? 'reverse' : ''}` }}>
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}

/* Arquivo visual: duas filas de fotografias dos projetos em sentidos opostos */
export function PhotoRiver() {
  const { lang } = useLang();
  const half = Math.ceil(PROJECTS.length / 2);
  const rows = [PROJECTS.slice(0, half), PROJECTS.slice(half)];
  return (
    <div className="space-y-4">
      {rows.map((row, r) => (
        <Marquee key={r} speed={70 + r * 12} reverse={r === 1} gap={16}>
          {row.map((p) => (
            <Link key={p.id} href={`/projetos/${p.id}`} className="group relative block w-[300px] md:w-[360px] shrink-0">
              <span className="photo block aspect-[16/10] rounded-xl">
                <img src={p.image} alt="" loading="lazy" />
              </span>
              <span className="absolute left-3 bottom-3 rounded-full bg-cream/95 px-3 py-1 text-[12px] font-medium text-ink opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {p.title[lang]}
              </span>
            </Link>
          ))}
        </Marquee>
      ))}
    </div>
  );
}

/* Entrada com framer-motion */
export function Rise({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
