// Registo central - fonte única de verdade para o portefólio, a tabela de
// missões e a navegação entre dossiers.

export type Theme = 'europeu' | 'digital' | 'produto' | 'internacional';
export type L = { pt: string; en: string };

export interface ProjectMeta {
  id: string;
  title: L;
  theme: Theme;
  image: string;
  year: string;
  place: L;
  summary: L;
  status: L;
  /** A imagem é um logótipo: mostra-se inteira, sem cortes */
  logo?: boolean;
}

export interface Area {
  id: Theme;
  label: L;
  description: L;
}

/* Áreas de atuação - ordem de apresentação no site */
export const AREAS: Area[] = [
  {
    id: 'europeu',
    label: { pt: 'Candidaturas e Redes Europeias', en: 'European Candidacies & Networks' },
    description: {
      pt: 'Preparação e defesa de candidaturas a títulos europeus e participação em redes de cooperação urbana.',
      en: 'Preparing and defending bids for European titles and taking part in urban cooperation networks.',
    },
  },
  {
    id: 'internacional',
    label: { pt: 'Promoção Internacional', en: 'International Promotion' },
    description: {
      pt: 'Representação institucional do Município em feiras e mercados emissores estratégicos.',
      en: 'Institutional representation of the Municipality at fairs and in strategic source markets.',
    },
  },
  {
    id: 'digital',
    label: { pt: 'Inovação e Ecossistema Digital', en: 'Innovation & Digital Ecosystem' },
    description: {
      pt: 'Plataformas digitais de destino e redes de transferência de conhecimento e inovação.',
      en: 'Digital destination platforms and knowledge-transfer and innovation networks.',
    },
  },
  {
    id: 'produto',
    label: { pt: 'Produto Turístico e Património', en: 'Tourism Product & Heritage' },
    description: {
      pt: 'Roteiros, cartografia, publicações oficiais e experiências turísticas sustentáveis.',
      en: 'Itineraries, cartography, official publications and sustainable tourism experiences.',
    },
  },
];

export const THEME_LABEL: Record<Theme, L> = Object.fromEntries(
  AREAS.map((a) => [a.id, a.label])
) as Record<Theme, L>;

export const PROJECTS: ProjectMeta[] = [
  {
    id: 'smart-tourism',
    title: { pt: 'Smart Tourism', en: 'Smart Tourism' },
    theme: 'europeu',
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
    image: 'https://i.imgur.com/e0wCEWM.jpeg',
    logo: true,
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

export interface Mission {
  id: string; // projeto associado
  city: L;
  country: L;
  event: string;
  year: string;
  lat: number;
  lon: number;
}

export const BRAGA = { lat: 41.5454, lon: -8.4265 };

export const MISSIONS: Mission[] = [
  { id: 'smart-tourism', city: { pt: 'Bruxelas', en: 'Brussels' }, country: { pt: 'Bélgica', en: 'Belgium' }, event: 'European Capital of Smart Tourism', year: '2024—26', lat: 50.8503, lon: 4.3517 },
  { id: 'fiets-wandelbeurs-gante', city: { pt: 'Gante', en: 'Ghent' }, country: { pt: 'Bélgica', en: 'Belgium' }, event: 'Fiets en Wandelbeurs', year: '2025', lat: 51.0543, lon: 3.7174 },
  { id: 'expovacaciones-bilbao', city: { pt: 'Bilbao', en: 'Bilbao' }, country: { pt: 'Espanha', en: 'Spain' }, event: 'ExpoVacaciones', year: '2024—25', lat: 43.263, lon: -2.935 },
  { id: 'b-travel-barcelona', city: { pt: 'Barcelona', en: 'Barcelona' }, country: { pt: 'Espanha', en: 'Spain' }, event: 'B-Travel', year: '2026', lat: 41.3874, lon: 2.1686 },
  { id: 'systemeu-salamanca', city: { pt: 'Salamanca', en: 'Salamanca' }, country: { pt: 'Espanha', en: 'Spain' }, event: 'Startup OLÉ & SystemEU Summit', year: '2024—25', lat: 40.9701, lon: -5.6635 },
  { id: 'music-cities-awards', city: { pt: 'Arkansas', en: 'Arkansas' }, country: { pt: 'EUA', en: 'USA' }, event: 'Music Cities Awards', year: '2025', lat: 34.7465, lon: -92.2896 },
];

export const byId = (id: string) => PROJECTS.find((p) => p.id === id);
export const getProject = byId;

export function neighbours(id: string): { prev: ProjectMeta; next: ProjectMeta } {
  const i = PROJECTS.findIndex((p) => p.id === id);
  const len = PROJECTS.length;
  const safe = i < 0 ? 0 : i;
  return {
    prev: PROJECTS[(safe - 1 + len) % len]!,
    next: PROJECTS[(safe + 1) % len]!,
  };
}

export function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371;
  const r = (d: number) => (d * Math.PI) / 180;
  const h = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lon - a.lon) / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

/* Missões com a distância a Braga, já calculada */
export const MISSION_POINTS = MISSIONS.map((m) => ({ ...m, km: distanceKm(BRAGA, m) }));
