import type { Theme } from '../projects';

/* Paleta categórica das quatro áreas - harmonizada com o creme e o petróleo */
export const AREA_COLOR: Record<Theme, string> = {
  europeu: '#0e5a6b',
  internacional: '#4f9a94',
  digital: '#c08a3e',
  produto: '#4a5560',
};

/* "2024—26" → [2024, 2026]; "2025" → [2025, 2025] */
export function yearSpan(year: string): [number, number] {
  const [a, b] = year.split('—');
  const start = Number(a);
  const end = b ? Number(b.length === 2 ? `20${b}` : b) : start;
  return [start, end];
}
