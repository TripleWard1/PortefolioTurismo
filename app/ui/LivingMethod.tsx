'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { Split } from './parts';
import { byId, type L } from './projects';
import { METHOD } from './profile';
import { TONE } from './viz/palette';

/* Metodologia viva (nível 3 do Living Site, desenhada em código).
   A história: um projeto entra pelo território, ganha estratégia, segue como candidatura
   e chega ao resultado; depois o projeto seguinte faz o mesmo caminho.
   Cada volta é um projeto real e termina no seu resultado real.
   Começa vazio, entra uma vez a 30% visível, repete sem parar, pausa fora do ecrã
   e mostra a imagem final quando o movimento está reduzido. */

const ROUNDS: { id: string; name: string; outcome: L }[] = [
  { id: 'smart-tourism', name: 'Smart Tourism', outcome: { pt: 'Finalista europeu', en: 'European finalist' } },
  { id: 'braga-after-dark', name: 'Braga After Dark', outcome: { pt: 'Roteiro oficial', en: 'Official itinerary' } },
  { id: 'small-retail-braga', name: 'Small Retail', outcome: { pt: 'Finalista 2026', en: '2026 finalist' } },
  { id: 'experiencias-sustentaveis', name: 'Experiências', outcome: { pt: '29 experiências', en: '29 experiences' } },
];

const X = [128, 376, 624, 872];
const Y = 268;
const W = 190;
const H = 200;
// Tempos de cada volta (segundos)
const START = 1.0;
const HOP = 1.1;
const GAP = 2.0;
const OUTCOME_AT = START + 2 * GAP + HOP + 0.25;
const ROUND = 9.4;

const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const out = (x: number) => 1 - Math.pow(1 - x, 3);
const clamp = (x: number) => Math.max(0, Math.min(1, x));
const wire = (i: number) => {
  const a = X[i] + W / 2;
  const b = X[i + 1] - W / 2;
  const m = (a + b) / 2;
  return `M${a} ${Y} C${m} ${Y - 46} ${m} ${Y - 46} ${b} ${Y}`;
};

/* Ícones de traço simples, desenhados à mão para o diagrama */
const ICONS = [
  // território: marcador de mapa
  'M0 -22c-9 0-16 7-16 16 0 12 16 26 16 26s16-14 16-26c0-9-7-16-16-16zm0 10a6 6 0 1 1 0 12 6 6 0 0 1 0-12z',
  // estratégia: alvo
  'M0 -22a22 22 0 1 0 0.01 0zM0 -12a12 12 0 1 0 0.01 0zM0 -3a3 3 0 1 0 0.01 0z',
  // candidatura: documento
  'M-14 -22h20l10 10v34h-30zM6 -22v10h10M-8 0h16M-8 8h16M-8 -8h8',
  // resultado: bandeira
  'M-12 22v-44M-12 -20c8 -6 16 6 26 0v20c-10 6 -18 -6 -26 0',
];

export default function LivingMethod() {
  const { t, lang } = useLang();
  const host = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const [step, setStep] = useState(-1);
  const [built, setBuilt] = useState(false);
  const [round, setRound] = useState(0);
  const stepRef = useRef(-1);
  const roundRef = useRef(0);

  const r = ROUNDS[round];
  const accent = TONE[byId(r.id)!.theme].deep;

  useEffect(() => {
    const el = host.current;
    const root = svg.current;
    if (!el || !root) return;
    const q = <T extends Element>(s: string) => Array.from(root.querySelectorAll<T>(s));
    const wires = q<SVGPathElement>('[data-wire]');
    const cards = q<SVGGElement>('[data-card]');
    const rings = q<SVGRectElement>('[data-ring]');
    const tickBg = q<SVGCircleElement>('[data-tickbg]');
    const ticks = q<SVGPathElement>('[data-tick]');
    const beats = q<SVGGElement>('[data-beat]');
    const packet = root.querySelector<SVGCircleElement>('[data-packet]')!;
    const trail = root.querySelector<SVGCircleElement>('[data-trail]')!;
    const chip = root.querySelector<SVGGElement>('[data-chip]')!;
    const badge = root.querySelector<SVGGElement>('[data-badge]')!;

    const setStepSafe = (s: number) => {
      if (stepRef.current !== s) {
        stepRef.current = s;
        setStep(s);
      }
    };

    // Chegada a cada nó: anel que cresce, cartão que pulsa, visto que se desenha, batida própria
    const land = (i: number, k: number) => {
      const c = cards[i];
      if (k >= 0 && k < 0.7) {
        const p = k / 0.7;
        rings[i].setAttribute('opacity', String((1 - p) * 0.8));
        rings[i].setAttribute('transform', `scale(${1 + p * 0.16})`);
        c.style.transform = `scale(${1 + Math.sin(p * Math.PI) * 0.05})`;
      } else {
        rings[i].setAttribute('opacity', '0');
        c.style.transform = '';
      }
      const tk = clamp((k - 0.25) / 0.5);
      tickBg[i].setAttribute('opacity', String(out(tk)));
      ticks[i].setAttribute('stroke-dashoffset', String(1 - out(clamp(tk * 1.3 - 0.3))));
      beats[i].style.setProperty('--b', String(clamp(k / 0.9)));
    };

    const frame = (time: number) => {
      const rn = Math.floor(time / ROUND) % ROUNDS.length;
      const lt = time % ROUND;
      if (rn !== roundRef.current) {
        roundRef.current = rn;
        setRound(rn);
      }

      // Início da volta: o projeto entra no primeiro nó
      chip.style.opacity = String(lt < 0.5 ? lt / 0.5 : lt > ROUND - 0.6 ? (ROUND - lt) / 0.6 : 1);
      land(0, lt - 0.2);
      let s = lt >= 0.2 ? 0 : -1;

      let px: number | null = null;
      let py = 0;
      for (let i = 0; i < 3; i++) {
        const st = START + i * GAP;
        const k = clamp((lt - st) / HOP);
        wires[i].setAttribute('stroke-dashoffset', String(1 - ease(k)));
        if (k > 0 && k < 1) {
          const p = wires[i].getPointAtLength(wires[i].getTotalLength() * ease(k));
          px = p.x;
          py = p.y;
        }
        const arrived = lt - (st + HOP);
        land(i + 1, arrived);
        if (arrived >= 0) s = i + 1;
      }
      setStepSafe(s);

      packet.setAttribute('opacity', px == null ? '0' : '1');
      trail.setAttribute('opacity', px == null ? '0' : '0.18');
      if (px != null) {
        packet.setAttribute('cx', String(px));
        packet.setAttribute('cy', String(py));
        trail.setAttribute('cx', String(px));
        trail.setAttribute('cy', String(py));
      }

      // Resultado
      const b = clamp((lt - OUTCOME_AT) / 0.6);
      badge.style.opacity = String(lt > ROUND - 0.6 ? (ROUND - lt) / 0.6 : out(b));
      badge.style.transform = `translateY(${(1 - out(b)) * 14}px)`;

      // No fim, a volta esvazia-se suavemente
      if (lt > ROUND - 0.6) {
        const f = 1 - (lt - (ROUND - 0.6)) / 0.6;
        wires.forEach((w) => w.setAttribute('stroke-opacity', String(f)));
        tickBg.forEach((c) => c.setAttribute('opacity', String(Math.min(Number(c.getAttribute('opacity')), f))));
        beats.forEach((g) => g.style.setProperty('--b', String(Math.min(Number(g.style.getPropertyValue('--b') || 0), f))));
      } else wires.forEach((w) => w.setAttribute('stroke-opacity', '1'));
    };

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let run = false;
    let acc = 0;
    let last = 0;
    let raf = 0;
    const loop = (now: number) => {
      if (!run) return;
      acc += Math.min(0.05, (now - last) / 1000);
      last = now;
      frame(acc);
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setBuilt(true);
        if (still) {
          frame(OUTCOME_AT + 1.5);
          return;
        }
        if (e.isIntersecting && !run) {
          run = true;
          // espera que a entrada acabe e depois liberta o transform para os pulsos
          window.setTimeout(() => {
            cards.forEach((c) => (c.style.transition = 'opacity .75s, filter .75s'));
            last = performance.now();
            raf = requestAnimationFrame(loop);
          }, acc === 0 ? 1400 : 0);
        } else if (!e.isIntersecting) run = false;
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      run = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="bg-sand py-24 md:py-32 overflow-hidden">
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Texto */}
        <div className="lg:col-span-4" data-reveal>
          <p className="t-label" style={{ color: TONE.produto.deep }}>
            {t('Metodologia', 'Approach')}
          </p>
          <h2 className="mt-4 t-h2 text-ink">
            <Split parts={[t('Do diagnóstico', 'From assessment'), { em: t('à implementação', 'to delivery'), color: TONE.produto.deep }, '.']} />
          </h2>
          <ol className="mt-10 border-t border-ink/10">
            {METHOD.map((m, i) => {
              const on = i === step;
              const done = i < step;
              return (
                <li key={m.example} className="border-b border-ink/10 py-4">
                  <div className="flex items-baseline gap-4">
                    <span className="em text-[1.25rem] w-7 shrink-0 transition-colors duration-500" style={{ color: on || done ? accent : 'rgba(29,29,31,0.3)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className={`text-[1.125rem] font-semibold tracking-[-0.02em] transition-colors duration-500 ${on || done ? 'text-ink' : 'text-ink/40'}`}>{m.title[lang]}</p>
                      <p
                        className={`text-[15px] leading-relaxed text-mute overflow-hidden transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${on ? 'max-h-24 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}
                      >
                        {m.text[lang]}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <Link href={`/projetos/${r.id}`} className="group mt-8 inline-flex items-center gap-2 t-label text-ink">
            <span className="text-mute">{t('Neste momento', 'Now showing')}:</span>
            <span className="underline decoration-1 underline-offset-4 decoration-ink/25 group-hover:decoration-ink">{byId(r.id)!.title[lang]}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Diagrama vivo */}
        <div className="lg:col-span-8" data-reveal style={{ ['--delay' as any]: '120ms' }}>
          <div
            ref={host}
            className="lm-island relative rounded-[28px] overflow-hidden aspect-[1000/560]"
            data-xray="Metodologia viva · SVG e IntersectionObserver"
            data-xray-tool="code"
          >
            <svg ref={svg} viewBox="0 0 1000 560" className="absolute inset-0 w-full h-full" role="img" aria-label={t('Diagrama: território, estratégia, candidatura e resultado de cada projeto', 'Diagram: territory, strategy, bid and outcome of each project')}>
              <defs>
                <filter id="lm-shadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#14213D" floodOpacity="0.12" />
                </filter>
              </defs>

              {/* Fios */}
              {[0, 1, 2].map((i) => (
                <g key={i}>
                  <path d={wire(i)} fill="none" stroke="rgba(20,33,61,0.12)" strokeWidth="2" strokeDasharray="4 6" />
                  <path data-wire d={wire(i)} fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" style={{ transition: 'stroke 0.6s' }} />
                </g>
              ))}
              <circle data-trail r="14" fill={accent} opacity="0" />
              <circle data-packet r="7" fill={accent} opacity="0" />

              {/* Projeto da volta, por cima do primeiro nó */}
              <g data-chip style={{ opacity: 0, transition: 'none' }}>
                <rect x={X[0] - 95} y={Y - H / 2 - 62} width="190" height="42" rx="21" fill="#14213D" />
                <text x={X[0]} y={Y - H / 2 - 35} textAnchor="middle" fontSize="17" fontWeight="600" fill="#fff" letterSpacing="-0.3">
                  {r.name}
                </text>
              </g>

              {/* Nós */}
              {X.map((x, i) => (
                <g key={i} transform={`translate(${x} ${Y})`}>
                  <g
                    data-card
                    className={`lm-node ${built ? 'in' : ''}`}
                    style={{ transitionDelay: `${i * 90}ms`, transformBox: 'fill-box', transformOrigin: 'center' }}
                  >
                    <rect data-ring x={-W / 2} y={-H / 2} width={W} height={H} rx="22" fill="none" stroke={accent} strokeWidth="2" opacity="0" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                    <rect x={-W / 2} y={-H / 2} width={W} height={H} rx="22" fill="#fff" stroke="rgba(20,33,61,0.1)" filter="url(#lm-shadow)" />
                    <path d={ICONS[i]} transform="translate(0 -36) scale(1.3)" fill="none" stroke="#14213D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="0" y={H / 2 - 18} textAnchor="middle" className="em" fontSize="22" fill="rgba(20,33,61,0.45)">
                      {String(i + 1).padStart(2, '0')}
                    </text>

                    {/* Batida própria de cada nó (cresce com --b) */}
                    <g data-beat style={{ ['--b' as any]: 0 }} transform="translate(0 34)">
                      {i === 0 &&
                        [-22, 0, 22].map((dx, k) => (
                          <circle key={k} cx={dx} cy="0" r="5" fill={accent} style={{ opacity: `clamp(0, calc(var(--b) * 3 - ${k}), 1)` as any, transition: 'fill .6s' }} />
                        ))}
                      {i === 1 &&
                        [10, 18, 26].map((h, k) => (
                          <rect key={k} x={-26 + k * 20} y={8 - h} width="12" height={h} rx="3" fill={accent} style={{ transformBox: 'fill-box', transformOrigin: 'bottom', transform: `scaleY(clamp(0, calc(var(--b) * 2.4 - ${k * 0.5}), 1))` as any, transition: 'fill .6s' }} />
                        ))}
                      {i === 2 &&
                        [0, 1, 2].map((k) => (
                          <rect key={k} x="-30" y={-10 + k * 9} width={k === 2 ? 34 : 60} height="4" rx="2" fill={accent} style={{ transformBox: 'fill-box', transformOrigin: 'left', transform: `scaleX(clamp(0, calc(var(--b) * 2.4 - ${k * 0.5}), 1))` as any, transition: 'fill .6s' }} />
                        ))}
                      {i === 3 && <circle cx="0" cy="0" r="9" fill="none" stroke={accent} strokeWidth="2.5" style={{ opacity: 'var(--b)' as any }} />}
                    </g>

                    {/* Visto */}
                    <circle data-tickbg cx={W / 2 - 8} cy={-H / 2 + 8} r="13" fill={accent} opacity="0" />
                    <path data-tick d={`M${W / 2 - 14} ${-H / 2 + 8}l4.5 4.5 8 -9`} fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
                  </g>
                </g>
              ))}

              {/* Resultado da volta, por baixo do último nó */}
              <g data-badge style={{ opacity: 0 }}>
                <rect x={X[3] - 115} y={Y + H / 2 + 22} width="230" height="54" rx="27" fill={accent} style={{ transition: 'fill .6s' }} />
                <text x={X[3]} y={Y + H / 2 + 56} textAnchor="middle" className="em" fontSize="25" fill="#fff">
                  {r.outcome[lang]}
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
