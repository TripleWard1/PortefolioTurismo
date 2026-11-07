// Registo central - fonte única de verdade para cartões, mapa de missões,
// índice, command palette e navegação ‹ › do dossier.

export type Theme = 'europeu' | 'digital' | 'produto' | 'internacional';
export type L = { pt: string; en: string };

export interface ProjectMeta {
  id: string;
  title: L;
  theme: Theme;
  sectionId: string;
  image: string;
  year: string;
  place: L;
  summary: L;
  status: L;
}

export const THEMES: { id: Theme | 'todos'; pt: string; en: string }[] = [
  { id: 'todos', pt: 'Todos', en: 'All' },
  { id: 'europeu', pt: 'Europeu', en: 'European' },
  { id: 'internacional', pt: 'Missões', en: 'Missions' },
  { id: 'digital', pt: 'Digital', en: 'Digital' },
  { id: 'produto', pt: 'Produto', en: 'Product' },
];

export const THEME_LABEL: Record<Theme, L> = {
  europeu: { pt: 'Europeu', en: 'European' },
  digital: { pt: 'Digital', en: 'Digital' },
  produto: { pt: 'Produto', en: 'Product' },
  internacional: { pt: 'Missão', en: 'Mission' },
};

export const PROJECTS: ProjectMeta[] = [
  {
    id: 'smart-tourism',
    title: { pt: 'Smart Tourism', en: 'Smart Tourism' },
    theme: 'europeu',
    sectionId: 'posicionamento',
    image: 'https://i.imgur.com/SvJ4bdR.jpeg',
    year: '2024—26',
    place: { pt: 'Bruxelas · Braga', en: 'Brussels · Braga' },
    summary: {
      pt: 'Defesa da candidatura de Braga ao título de European Capital of Smart Tourism junto da Comissão Europeia.',
      en: 'Defending Braga’s candidacy for European Capital of Smart Tourism before the European Commission.',
    },
    status: { pt: 'Finalista UE', en: 'EU Finalist' },
  },
  {
    id: 'small-retail-braga',
    title: { pt: 'Small Retail', en: 'Small Retail' },
    theme: 'europeu',
    sectionId: 'posicionamento',
    image:
      'https://transition-pathways.europa.eu/sites/default/files/styles/time_dependent_full/public/discussion_form_post/2025-12/ECOSR%20-%20Thumbnail_0.jpg?itok=1-QARVo7',
    year: '2025—26',
    place: { pt: 'Candidatura 2026', en: '2026 Candidacy' },
    summary: {
      pt: 'Dossiê técnico para a Capital Europeia do Comércio, focado na sustentabilidade do retalho local.',
      en: 'Technical dossier for the European Capital of Small Retail, focused on local retail sustainability.',
    },
    status: { pt: 'Económico', en: 'Economic' },
  },
  {
    id: 'braga-after-dark',
    title: { pt: 'After Dark', en: 'After Dark' },
    theme: 'europeu',
    sectionId: 'posicionamento',
    image: 'https://i.imgur.com/mgdxHtt.jpeg',
    year: '2024—25',
    place: { pt: 'Rede URBACT', en: 'URBACT Network' },
    summary: {
      pt: 'Primeiro roteiro oficial e estratégia de governação para a vida noturna de Braga na rede europeia.',
      en: 'First official roadmap and governance strategy for Braga’s nightlife within the European network.',
    },
    status: { pt: 'Estratégico', en: 'Strategic' },
  },
  {
    id: 'music-cities-awards',
    title: { pt: 'Music Cities', en: 'Music Cities' },
    theme: 'europeu',
    sectionId: 'posicionamento',
    image: 'https://static.wixstatic.com/media/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg',
    year: '2025',
    place: { pt: 'Arkansas, EUA', en: 'Arkansas, USA' },
    summary: {
      pt: 'Posicionamento de Braga como referência mundial em políticas de música, com final global nos EUA.',
      en: 'Positioning Braga as a global reference in music policy, with the global final in the USA.',
    },
    status: { pt: 'Mundial', en: 'Worldwide' },
  },
  {
    id: 'fiets-wandelbeurs-gante',
    title: { pt: 'Fiets en Wandelbeurs', en: 'Fiets en Wandelbeurs' },
    theme: 'internacional',
    sectionId: 'missoes',
    image: 'https://i.imgur.com/tg4YOqy.png',
    year: '2025',
    place: { pt: 'Gante, Bélgica', en: 'Ghent, Belgium' },
    summary: {
      pt: 'Posicionamento da nova marca territorial de Braga perante o exigente mercado Benelux.',
      en: 'Positioning Braga’s new territorial brand before the demanding Benelux market.',
    },
    status: { pt: 'Turismo Ativo', en: 'Active Tourism' },
  },
  {
    id: 'expovacaciones-bilbao',
    title: { pt: 'ExpoVacaciones', en: 'ExpoVacaciones' },
    theme: 'internacional',
    sectionId: 'missoes',
    image: 'https://i.imgur.com/JL0PcZe.png',
    year: '2024—25',
    place: { pt: 'Bilbao, Espanha', en: 'Bilbao, Spain' },
    summary: {
      pt: 'Afirmação de Braga, Capital Portuguesa da Cultura 2025, no País Basco e na Cantábria.',
      en: 'Establishing Braga, 2025 Portuguese Capital of Culture, in the Basque Country and Cantabria.',
    },
    status: { pt: 'Estratégia Ibérica', en: 'Iberian Strategy' },
  },
  {
    id: 'b-travel-barcelona',
    title: { pt: 'B-Travel Barcelona', en: 'B-Travel Barcelona' },
    theme: 'internacional',
    sectionId: 'missoes',
    image: 'https://i.imgur.com/09Tm1r9.png',
    year: '2026',
    place: { pt: 'Barcelona, Espanha', en: 'Barcelona, Spain' },
    summary: {
      pt: 'Representação do Município numa das feiras de turismo mais relevantes do Sul da Europa.',
      en: 'Representing the Municipality at one of Southern Europe’s most relevant tourism fairs.',
    },
    status: { pt: 'Sul da Europa', en: 'Southern Europe' },
  },
  {
    id: 'visit-braga',
    title: { pt: 'Portal Visit Braga', en: 'Visit Braga Portal' },
    theme: 'digital',
    sectionId: 'digital',
    image: 'https://i.imgur.com/e0wCEWM.jpeg',
    year: '2024—25',
    place: { pt: 'Braga, Portugal', en: 'Braga, Portugal' },
    summary: {
      pt: 'Conceção de UX e arquitetura de conteúdos para a principal plataforma turística da cidade.',
      en: 'UX design and content architecture for the city’s main tourism platform.',
    },
    status: { pt: 'Conversão', en: 'Conversion' },
  },
  {
    id: 'systemeu-salamanca',
    title: { pt: 'SYSTEMEU', en: 'SYSTEMEU' },
    theme: 'digital',
    sectionId: 'digital',
    image: 'https://i.imgur.com/SeyCGBk.jpg',
    year: '2024—25',
    place: { pt: 'Salamanca · Braga', en: 'Salamanca · Braga' },
    summary: {
      pt: 'Redes de inovação inter-regionais para a transferência de conhecimento tecnológico.',
      en: 'Inter-regional innovation networks for the transfer of technological knowledge.',
    },
    status: { pt: 'Europeia', en: 'European' },
  },
  {
    id: 'cidade-bracvs',
    title: { pt: 'A Cidade do Bracvs', en: 'The City of Bracvs' },
    theme: 'produto',
    sectionId: 'heranca',
    image: 'https://i.imgur.com/NRTWHRW.png',
    year: '2025',
    place: { pt: 'Educação & Família', en: 'Education & Family' },
    summary: {
      pt: 'Roteiro lúdico-educativo para crianças e famílias, aproximando as novas gerações do património romano de Braga.',
      en: 'A playful, educational itinerary for children and families, bringing new generations closer to Braga’s Roman heritage.',
    },
    status: { pt: 'Educação', en: 'Education' },
  },
  {
    id: 'roteiro-3-dias',
    title: { pt: 'Descobrir Braga em 3 Dias', en: 'Discover Braga in 3 Days' },
    theme: 'produto',
    sectionId: 'heranca',
    image: 'https://i.imgur.com/yWtlcEL.png',
    year: '2025',
    place: { pt: 'Coordenação Editorial', en: 'Editorial Coordination' },
    summary: {
      pt: 'Coordenação editorial e estrutural do guia oficial da cidade, otimizando fluxos turísticos e experiência do visitante.',
      en: 'Editorial and structural coordination of the city’s official guide, optimising tourist flows and visitor experience.',
    },
    status: { pt: 'Editorial', en: 'Editorial' },
  },
  {
    id: 'mapa-turistico-braga',
    title: { pt: 'Novo Mapa Territorial', en: 'New Territorial Map' },
    theme: 'produto',
    sectionId: 'heranca',
    image: 'https://i.imgur.com/P54M1Ko.png',
    year: '2024',
    place: { pt: 'Cartografia Técnica', en: 'Technical Cartography' },
    summary: {
      pt: 'Desenvolvimento técnico e design de informação para o suporte cartográfico oficial da cidade.',
      en: 'Technical development and information design for the city’s official cartographic support.',
    },
    status: { pt: 'Cartografia', en: 'Cartography' },
  },
  {
    id: 'experiencias-sustentaveis',
    title: { pt: 'Experiências Sustentáveis', en: 'Sustainable Experiences' },
    theme: 'produto',
    sectionId: 'heranca',
    image:
      'https://www.cm-braga.pt/archive/cache/img/sz800x600/CMB17012025SERGIOFREITAS3022624430274.jpg',
    year: '2025',
    place: { pt: 'Gestão de Produto', en: 'Product Management' },
    summary: {
      pt: 'Liderança técnica na conceção de 29 experiências turísticas, unindo identidade local e sustentabilidade.',
      en: 'Technical leadership in designing 29 tourism experiences, combining local identity and sustainability.',
    },
    status: { pt: 'Produto', en: 'Product' },
  },
];

/* Missões no mapa - coordenadas reais (lat, lon) */
export const BRAGA = { lat: 41.5454, lon: -8.4265 };

export interface Mission {
  id: string; // projeto associado
  city: L;
  lat: number;
  lon: number;
}

export const MISSIONS: Mission[] = [
  { id: 'smart-tourism', city: { pt: 'Bruxelas', en: 'Brussels' }, lat: 50.8503, lon: 4.3517 },
  { id: 'fiets-wandelbeurs-gante', city: { pt: 'Gante', en: 'Ghent' }, lat: 51.0543, lon: 3.7174 },
  { id: 'expovacaciones-bilbao', city: { pt: 'Bilbao', en: 'Bilbao' }, lat: 43.263, lon: -2.935 },
  { id: 'b-travel-barcelona', city: { pt: 'Barcelona', en: 'Barcelona' }, lat: 41.3874, lon: 2.1686 },
  { id: 'systemeu-salamanca', city: { pt: 'Salamanca', en: 'Salamanca' }, lat: 40.9701, lon: -5.6635 },
  { id: 'music-cities-awards', city: { pt: 'Arkansas', en: 'Arkansas' }, lat: 34.7465, lon: -92.2896 },
];

export function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

export const byId = (id: string) => PROJECTS.find((p) => p.id === id);
export const getProject = byId;
export const bySection = (s: string) => PROJECTS.filter((p) => p.sectionId === s);

export function neighbours(id: string): { prev: ProjectMeta; next: ProjectMeta } {
  const i = PROJECTS.findIndex((p) => p.id === id);
  const len = PROJECTS.length;
  const safe = i < 0 ? 0 : i;
  return {
    prev: PROJECTS[(safe - 1 + len) % len]!,
    next: PROJECTS[(safe + 1) % len]!,
  };
}
