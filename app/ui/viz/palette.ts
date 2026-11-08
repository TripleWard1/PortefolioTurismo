import type { Theme } from '../projects';

/* As quatro áreas em tons de cinzento (do preto ao cinzento médio) */
export const AREA_COLOR: Record<Theme, string> = {
  europeu: '#1d1d1f',
  internacional: '#48484a',
  digital: '#6e6e73',
  produto: '#8e8e93',
};

/* "2024—26" → [2024, 2026]; "2025" → [2025, 2025] */
export function yearSpan(year: string): [number, number] {
  const [a, b] = year.split('—');
  const start = Number(a);
  const end = b ? Number(b.length === 2 ? `20${b}` : b) : start;
  return [start, end];
}
