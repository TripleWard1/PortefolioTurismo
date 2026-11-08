'use client';

import { useEffect, useRef } from 'react';
import { BRAGA, MISSIONS } from '../projects';
import { LAND } from './landDots';

/* ------------------------------------------------------------------------ */
/*  Globo em Canvas 2D (sem WebGL): continentes em pontos, Braga e as cidades  */
/*  das missões, ligadas por arcos de grande círculo que se desenham ao entrar */
/*  no ecrã, com um pulso a viajar em cada arco. Arrasta-se para rodar; com    */
/*  `focus` roda suavemente até essa cidade.                                   */
/* ------------------------------------------------------------------------ */

type V = [number, number, number];
const RAD = Math.PI / 180;
const toVec = (lat: number, lon: number): V => {
  const la = lat * RAD, lo = lon * RAD;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
};
// Roda em torno do eixo Y (longitude) e depois do eixo X (inclinação)
const rotate = (v: V, lon: number, tilt: number): V => {
  const c = Math.cos(-lon), s = Math.sin(-lon);
  const x = v[0] * c + v[2] * s, z0 = -v[0] * s + v[2] * c;
  const ct = Math.cos(tilt), st = Math.sin(tilt);
  return [x, v[1] * ct - z0 * st, v[1] * st + z0 * ct];
};
// Interpolação esférica entre dois vetores unitários
const slerp = (a: V, b: V, t: number): V => {
  const d = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const w = Math.acos(d);
  if (w < 1e-6) return a;
  const s1 = Math.sin((1 - t) * w) / Math.sin(w), s2 = Math.sin(t * w) / Math.sin(w);
  return [a[0] * s1 + b[0] * s2, a[1] * s1 + b[1] * s2, a[2] * s1 + b[2] * s2];
};

const LAND_V: V[] = [];
for (let i = 0; i < LAND.length; i += 2) LAND_V.push(toVec(LAND[i] / 10, LAND[i + 1] / 10));
const BRAGA_V = toVec(BRAGA.lat, BRAGA.lon);
const CITIES = MISSIONS.map((m) => ({ id: m.id, v: toVec(m.lat, m.lon), lat: m.lat, lon: m.lon }));
// Pontos de cada arco, já elevados acima da superfície
const ARCS = CITIES.map((c) => {
  const pts: V[] = [];
  for (let k = 0; k <= 80; k++) {
    const t = k / 80;
    const p = slerp(BRAGA_V, c.v, t);
    const lift = 1 + 0.14 * Math.sin(Math.PI * t) * Math.min(1, Math.acos(BRAGA_V[0] * c.v[0] + BRAGA_V[1] * c.v[1] + BRAGA_V[2] * c.v[2]) * 1.6);
    pts.push([p[0] * lift, p[1] * lift, p[2] * lift]);
  }
  return { id: c.id, pts };
});

export default function Globe({
  focus,
  className = '',
  ink = '244,241,234',
  accent = '255,255,255',
}: {
  focus?: string | null;
  className?: string;
  ink?: string;
  accent?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const focusRef = useRef<string | null>(null);
  focusRef.current = focus ?? null;

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let size = 0, raf = 0, visible = false, revealed = 0, start = 0, last = 0;
    // Começa centrado entre Braga e a Europa central
    const st = { lon: 2 * RAD, tilt: 38 * RAD, vlon: 0 };
    let drag: { x: number; y: number; lon: number; tilt: number } | null = null;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (now - last < 1000 / 45) return;
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      if (!start) start = now;
      revealed = reduced ? 1 : Math.min(1, (now - start) / 1800);

      // Movimento: foco > arrasto > rotação automática
      const f = CITIES.find((c) => c.id === focusRef.current);
      if (f && !drag) {
        let d = f.lon * RAD - st.lon;
        d = Math.atan2(Math.sin(d), Math.cos(d));
        st.lon += d * 0.08;
        st.tilt += (Math.max(15, Math.min(55, f.lat)) * RAD - st.tilt) * 0.08;
      } else if (!drag && !reduced) {
        st.lon += 0.00012 * dt;
        st.tilt += (38 * RAD - st.tilt) * 0.02;
      }
      draw(now);
    };

    const draw = (now: number) => {
      const r = size * 0.45, cx = size / 2, cy = size / 2;
      ctx.clearRect(0, 0, size, size);

      // Esfera
      const g = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r);
      g.addColorStop(0, `rgba(${ink},0.10)`);
      g.addColorStop(1, `rgba(${ink},0.02)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(${ink},0.28)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Continentes
      for (const v of LAND_V) {
        const p = rotate(v, st.lon, st.tilt);
        if (p[2] <= 0) continue;
        ctx.fillStyle = `rgba(${ink},${0.22 + p[2] * 0.7})`;
        const s = 1.3 + p[2] * 1.5;
        ctx.fillRect(cx + p[0] * r - s / 2, cy - p[1] * r - s / 2, s, s);
      }

      // Arcos
      const fId = focusRef.current;
      ARCS.forEach((a, i) => {
        const prog = Math.max(0, Math.min(1, revealed * 1.6 - i * 0.1));
        if (prog <= 0) return;
        const on = fId === a.id;
        const n = Math.floor(a.pts.length * prog);
        ctx.strokeStyle = `rgba(${on ? accent : ink},${on ? 0.95 : 0.6})`;
        ctx.lineWidth = on ? 2.2 : 1.2;
        ctx.beginPath();
        let pen = false;
        for (let k = 0; k < n; k++) {
          const p = rotate(a.pts[k], st.lon, st.tilt);
          // visível se à frente da esfera ou fora do seu contorno
          const front = p[2] > 0 || p[0] * p[0] + p[1] * p[1] > 1;
          const x = cx + p[0] * r, y = cy - p[1] * r;
          if (front) {
            if (pen) ctx.lineTo(x, y);
            else ctx.moveTo(x, y);
            pen = true;
          } else pen = false;
        }
        ctx.stroke();
        // Pulso a viajar
        if (prog >= 1 && !reduced) {
          const t = ((now / 2600 + i * 0.17) % 1) * (a.pts.length - 1);
          const p = rotate(a.pts[Math.floor(t)], st.lon, st.tilt);
          if (p[2] > 0 || p[0] * p[0] + p[1] * p[1] > 1) {
            ctx.fillStyle = `rgba(${accent},0.95)`;
            ctx.beginPath();
            ctx.arc(cx + p[0] * r, cy - p[1] * r, on ? 3.2 : 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // Cidades
      CITIES.forEach((c) => {
        const p = rotate(c.v, st.lon, st.tilt);
        if (p[2] <= 0) return;
        const on = fId === c.id;
        ctx.fillStyle = `rgba(${on ? accent : ink},1)`;
        ctx.beginPath();
        ctx.arc(cx + p[0] * r, cy - p[1] * r, on ? 5 : 3.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Braga (com pulsação)
      const b = rotate(BRAGA_V, st.lon, st.tilt);
      if (b[2] > 0) {
        const bx = cx + b[0] * r, by = cy - b[1] * r;
        const k = reduced ? 0 : (now / 1800) % 1;
        ctx.strokeStyle = `rgba(${accent},${0.8 * (1 - k)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(bx, by, 6 + k * 16, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `rgba(${accent},1)`;
        ctx.beginPath();
        ctx.arc(bx, by, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = `500 ${Math.max(13, size * 0.028)}px var(--font-sans), system-ui, sans-serif`;
        ctx.textAlign = 'right';
        ctx.fillText('Braga', bx - 12, by + 5);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.15 });
    io.observe(canvas);
    raf = requestAnimationFrame(frame);

    const down = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY, lon: st.lon, tilt: st.tilt };
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      st.lon = drag.lon - (e.clientX - drag.x) / (size * 0.6);
      st.tilt = Math.max(-0.2, Math.min(1.2, drag.tilt + (e.clientY - drag.y) / (size * 0.9)));
    };
    const up = () => (drag = null);
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
    };
  }, [ink, accent]);

  return (
    <div className={`relative aspect-square ${className}`}>
      <canvas
        ref={ref}
        role="img"
        aria-label="Globo com Braga e as cidades das missões internacionais"
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
      />
    </div>
  );
}
