'use client';

import { useEffect, useRef } from 'react';

/* ------------------------------------------------------------------------ */
/*  Curvas de nível generativas (ruído de Perlin 3D + marching squares).      */
/*  Um mapa topográfico vivo, desenhado a azul-petróleo sobre o creme.        */
/*  Pausa fora do ecrã e com "reduzir movimento" fica numa imagem fixa.       */
/* ------------------------------------------------------------------------ */

// Ruído de Perlin melhorado (Ken Perlin, 2002)
const P = new Uint8Array(512);
(() => {
  const p = Array.from({ length: 256 }, (_, i) => i);
  let s = 42;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) P[i] = p[i & 255];
})();
const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + t * (b - a);
const grad = (h: number, x: number, y: number, z: number) => {
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
};
function noise(x: number, y: number, z: number) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
  x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
  const u = fade(x), v = fade(y), w = fade(z);
  const A = P[X] + Y, AA = P[A] + Z, AB = P[A + 1] + Z, B = P[X + 1] + Y, BA = P[B] + Z, BB = P[B + 1] + Z;
  return lerp(
    lerp(lerp(grad(P[AA] & 15, x, y, z), grad(P[BA] & 15, x - 1, y, z), u), lerp(grad(P[AB] & 15, x, y - 1, z), grad(P[BB] & 15, x - 1, y - 1, z), u), v),
    lerp(lerp(grad(P[AA + 1] & 15, x, y, z - 1), grad(P[BA + 1] & 15, x - 1, y, z - 1), u), lerp(grad(P[AB + 1] & 15, x, y - 1, z - 1), grad(P[BB + 1] & 15, x - 1, y - 1, z - 1), u), v),
    w
  );
}

export default function ContourField({ className = '', color = '14,90,107', levels = 14, cell = 12 }: { className?: string; color?: string; levels?: number; cell?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, cols = 0, rows = 0, raf = 0, visible = true, t = Math.random() * 10, last = 0;
    let field = new Float32Array(0);

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / cell) + 1;
      rows = Math.ceil(h / cell) + 1;
      field = new Float32Array(cols * rows);
    };

    const draw = () => {
      const sc = 0.0042;
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++) {
          const x = i * cell * sc, y = j * cell * sc;
          field[j * cols + i] = noise(x, y, t) + 0.45 * noise(x * 2.1, y * 2.1, t * 1.3 + 7);
        }
      ctx.clearRect(0, 0, w, h);
      for (let l = 0; l < levels; l++) {
        const iso = -0.75 + (1.5 * l) / (levels - 1);
        const major = l % 4 === 0;
        ctx.strokeStyle = `rgba(${color},${major ? 0.34 : 0.16})`;
        ctx.lineWidth = major ? 1.1 : 0.8;
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++)
          for (let i = 0; i < cols - 1; i++) {
            const a = field[j * cols + i], b = field[j * cols + i + 1], c = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
            const idx = (a > iso ? 8 : 0) | (b > iso ? 4 : 0) | (c > iso ? 2 : 0) | (d > iso ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x0 = i * cell, y0 = j * cell;
            const top = () => [x0 + cell * ((iso - a) / (b - a)), y0];
            const right = () => [x0 + cell, y0 + cell * ((iso - b) / (c - b))];
            const bottom = () => [x0 + cell * ((iso - d) / (c - d)), y0 + cell];
            const left = () => [x0, y0 + cell * ((iso - a) / (d - a))];
            const seg = (p: number[], q: number[]) => {
              ctx.moveTo(p[0], p[1]);
              ctx.lineTo(q[0], q[1]);
            };
            switch (idx) {
              case 1: case 14: seg(left(), bottom()); break;
              case 2: case 13: seg(bottom(), right()); break;
              case 3: case 12: seg(left(), right()); break;
              case 4: case 11: seg(top(), right()); break;
              case 6: case 9: seg(top(), bottom()); break;
              case 7: case 8: seg(left(), top()); break;
              case 5: seg(left(), top()); seg(bottom(), right()); break;
              case 10: seg(top(), right()); seg(left(), bottom()); break;
            }
          }
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 40) return; // ~25 fps chega para um movimento lento
      last = now;
      t += 0.0035;
      draw();
    };

    resize();
    draw();
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    if (!reduced) raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [color, levels, cell]);

  return <canvas ref={ref} aria-hidden="true" className={`block w-full h-full ${className}`} />;
}
