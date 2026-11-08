import type { Theme } from '../projects';

/* Tons por área, sempre dessaturados:
   tint  — fundo claro de painéis
   deep  — pormenores de texto e pontos
   dark  — secções imersivas a toda a largura, com texto claro
   glow  — acento claro sobre o fundo escuro */
export const TONE: Record<Theme, { tint: string; deep: string; dark: string; glow: string; name: string }> = {
  europeu: { tint: '#E6ECF1', deep: '#3E5A70', dark: '#1F2D38', glow: '#B9CCDA', name: 'ardósia' },
  internacional: { tint: '#F2E6DF', deep: '#94604B', dark: '#3A2620', glow: '#E3BFAE', name: 'terracota' },
  digital: { tint: '#E5ECE3', deep: '#4D6A55', dark: '#1E2B23', glow: '#B8CDBC', name: 'musgo' },
  produto: { tint: '#F1EBE0', deep: '#86683E', dark: '#33291B', glow: '#DCC6A0', name: 'bronze' },
};

/* Tons de secção: noite (quase preto quente) e latão (acento discreto) */
export const NIGHT = '#141312';
export const BRASS = '#C9B08A';

/* "2024—26" → [2024, 2026]; "2025" → [2025, 2025] */
export function yearSpan(year: string): [number, number] {
  const [a, b] = year.split('—');
  const start = Number(a);
  const end = b ? Number(b.length === 2 ? `20${b}` : b) : start;
  return [start, end];
}
