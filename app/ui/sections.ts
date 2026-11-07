import type { L } from './projects';

export interface SectionMeta {
  id: string;
  n: string;
  label: L;
  image: string;
}

/* Ordem narrativa da página - usada pela navbar, menu e palette */
export const SECTIONS: SectionMeta[] = [
  { id: 'manifesto', n: '00', label: { pt: 'Manifesto', en: 'Manifesto' }, image: 'https://i.imgur.com/GBs8DY7.jpeg' },
  { id: 'posicionamento', n: '01', label: { pt: 'Posicionamento', en: 'Positioning' }, image: 'https://i.imgur.com/SvJ4bdR.jpeg' },
  { id: 'missoes', n: '02', label: { pt: 'Missões', en: 'Missions' }, image: 'https://i.imgur.com/tg4YOqy.png' },
  { id: 'digital', n: '03', label: { pt: 'Digital', en: 'Digital' }, image: 'https://i.imgur.com/e0wCEWM.jpeg' },
  { id: 'heranca', n: '04', label: { pt: 'Herança', en: 'Heritage' }, image: 'https://i.imgur.com/NRTWHRW.png' },
  { id: 'indice', n: '05', label: { pt: 'Índice', en: 'Index' }, image: 'https://i.imgur.com/P54M1Ko.png' },
  { id: 'contacto', n: '06', label: { pt: 'Contacto', en: 'Contact' }, image: 'https://i.imgur.com/Dx42oze.jpeg' },
];

export const goTo = (id: string) => {
  if (id === 'top') return window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};
