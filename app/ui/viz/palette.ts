import type { Theme } from '../projects';

/* Tons suaves por área: um fundo claro (tint) e um tom profundo e dessaturado (deep)
   para pequenos pormenores de texto. Nunca cores fortes. */
export const TONE: Record<Theme, { tint: string; deep: string; name: string }> = {
  europeu: { tint: '#E6ECF1', deep: '#3E5A70', name: 'névoa' },
  internacional: { tint: '#F2E6DF', deep: '#94604B', name: 'argila' },
  digital: { tint: '#E5ECE3', deep: '#4D6A55', name: 'salva' },
  produto: { tint: '#F1EBE0', deep: '#86683E', name: 'areia' },
};

/* "2024—26" → [2024, 2026]; "2025" → [2025, 2025] */
export function yearSpan(year: string): [number, number] {
  const [a, b] = year.split('—');
  const start = Number(a);
  const end = b ? Number(b.length === 2 ? `20${b}` : b) : start;
  return [start, end];
}
