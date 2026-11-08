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
  /** Função desempenhada no projeto */
  role: L;
  /** Resultado ou marco principal */
  outcome: L;
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
      pt: 'Candidaturas a títulos europeus e redes de cooperação que põem a cidade lado a lado com as melhores da Europa.',
      en: 'Bids for European titles and cooperation networks that put the city side by side with Europe’s best.',
    },
  },
  {
    id: 'internacional',
    label: { pt: 'Promoção Internacional', en: 'International Promotion' },
    description: {
      pt: 'Representação institucional em feiras e mercados emissores, onde o destino se apresenta a operadores e viajantes.',
      en: 'Institutional representation at fairs and in source markets, where the destination meets operators and travellers.',
    },
  },
  {
    id: 'digital',
    label: { pt: 'Inovação e Ecossistema Digital', en: 'Innovation & Digital Ecosystem' },
    description: {
      pt: 'Plataformas digitais e redes de inovação que aproximam o turismo do conhecimento e da tecnologia.',
      en: 'Digital platforms and innovation networks that bring tourism closer to knowledge and technology.',
    },
  },
  {
    id: 'produto',
    label: { pt: 'Produto Turístico e Património', en: 'Tourism Product & Heritage' },
    description: {
      pt: 'Roteiros, cartografia, guias oficiais e experiências que transformam património em visita.',
      en: 'Itineraries, maps, official guides and experiences that turn heritage into a visit.',
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
    year: '2024-26',
    place: { pt: 'Bruxelas · Braga', en: 'Brussels · Braga' },
    summary: {
      pt: 'Candidatura de Braga a European Capital of Smart Tourism, defendida perante a Comissão Europeia em Bruxelas.',
      en: 'Braga’s bid for European Capital of Smart Tourism, defended before the European Commission in Brussels.',
    },
    status: { pt: 'Finalista UE', en: 'EU Finalist' },
    role: { pt: 'Coordenação técnica e defesa da candidatura', en: 'Technical coordination and bid defence' },
    outcome: { pt: 'Finalista europeu', en: 'European finalist' },
  },
  {
    id: 'small-retail-braga',
    title: { pt: 'Small Retail', en: 'Small Retail' },
    theme: 'europeu',
    image:
      'https://transition-pathways.europa.eu/sites/default/files/styles/time_dependent_full/public/discussion_form_post/2025-12/ECOSR%20-%20Thumbnail_0.jpg?itok=1-QARVo7',
    year: '2025-26',
    place: { pt: 'Braga, Portugal', en: 'Braga, Portugal' },
    summary: {
      pt: 'Dossier técnico da candidatura de Braga a European Capital of Small Retail, centrado no futuro do comércio de proximidade.',
      en: 'Technical dossier for Braga’s European Capital of Small Retail bid, focused on the future of local retail.',
    },
    status: { pt: 'Económico', en: 'Economic' },
    role: { pt: 'Liderança técnica e editorial do dossier', en: 'Technical and editorial lead on the dossier' },
    outcome: { pt: 'Finalista 2026', en: '2026 finalist' },
  },
  {
    id: 'braga-after-dark',
    title: { pt: 'Braga After Dark', en: 'Braga After Dark' },
    theme: 'europeu',
    image: 'https://i.imgur.com/mgdxHtt.jpeg',
    year: '2024-25',
    place: { pt: 'Braga, Portugal', en: 'Braga, Portugal' },
    summary: {
      pt: 'O primeiro roteiro oficial da noite de Braga, criado no âmbito da rede europeia URBACT Cities After Dark.',
      en: 'Braga’s first official night-time itinerary, created within the European URBACT Cities After Dark network.',
    },
    status: { pt: 'Estratégico', en: 'Strategic' },
    role: { pt: 'Conceção e curadoria do roteiro', en: 'Itinerary design and curation' },
    outcome: { pt: 'Primeiro roteiro oficial da noite', en: 'First official night-time itinerary' },
  },
  {
    id: 'music-cities-awards',
    title: { pt: 'Music Cities Awards', en: 'Music Cities Awards' },
    theme: 'europeu',
    image: 'https://static.wixstatic.com/media/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg',
    year: '2025',
    place: { pt: 'Arkansas, EUA', en: 'Arkansas, USA' },
    summary: {
      pt: 'A estratégia noturna de Braga levada a concurso mundial, com final no Arkansas, nos Estados Unidos.',
      en: 'Braga’s night-time strategy taken to a global competition, with the final in Arkansas, United States.',
    },
    status: { pt: 'Mundial', en: 'Worldwide' },
    role: { pt: 'Redação e submissão da candidatura', en: 'Bid writing and submission' },
    outcome: { pt: 'Top 3 mundial', en: 'Global top 3' },
  },
  {
    id: 'fiets-wandelbeurs-gante',
    title: { pt: 'Fiets en Wandelbeurs', en: 'Fiets en Wandelbeurs' },
    theme: 'internacional',
    image: 'https://i.imgur.com/tg4YOqy.png',
    year: '2025',
    place: { pt: 'Gante, Bélgica', en: 'Ghent, Belgium' },
    summary: {
      pt: 'A nova marca territorial de Braga apresentada ao mercado Benelux de ciclismo e caminhada.',
      en: 'Braga’s new territorial brand presented to the Benelux cycling and walking market.',
    },
    status: { pt: 'Turismo Ativo', en: 'Active Tourism' },
    role: { pt: 'Representação institucional', en: 'Institutional representation' },
    outcome: { pt: 'Entrada no mercado Benelux', en: 'Entry into the Benelux market' },
  },
  {
    id: 'expovacaciones-bilbao',
    title: { pt: 'ExpoVacaciones', en: 'ExpoVacaciones' },
    theme: 'internacional',
    image: 'https://i.imgur.com/JL0PcZe.png',
    year: '2024-25',
    place: { pt: 'Bilbao, Espanha', en: 'Bilbao, Spain' },
    summary: {
      pt: 'Braga, Capital Portuguesa da Cultura 2025, promovida no País Basco e na Cantábria.',
      en: 'Braga, 2025 Portuguese Capital of Culture, promoted in the Basque Country and Cantabria.',
    },
    status: { pt: 'Estratégia Ibérica', en: 'Iberian Strategy' },
    role: { pt: 'Representação institucional', en: 'Institutional representation' },
    outcome: { pt: 'Promoção no norte de Espanha', en: 'Promotion in northern Spain' },
  },
  {
    id: 'b-travel-barcelona',
    title: { pt: 'B-Travel Barcelona', en: 'B-Travel Barcelona' },
    theme: 'internacional',
    image: 'https://i.imgur.com/09Tm1r9.png',
    year: '2026',
    place: { pt: 'Barcelona, Espanha', en: 'Barcelona, Spain' },
    summary: {
      pt: 'Braga numa das feiras de turismo mais relevantes do Sul da Europa, no stand do Porto e Norte.',
      en: 'Braga at one of Southern Europe’s most relevant tourism fairs, on the Porto and North stand.',
    },
    status: { pt: 'Sul da Europa', en: 'Southern Europe' },
    role: { pt: 'Representação institucional', en: 'Institutional representation' },
    outcome: { pt: 'Presença no mercado catalão', en: 'Presence in the Catalan market' },
  },
  {
    id: 'visit-braga',
    title: { pt: 'Portal Visit Braga', en: 'Visit Braga Portal' },
    theme: 'digital',
    image: 'https://i.imgur.com/e0wCEWM.jpeg',
    logo: true,
    year: '2024-25',
    place: { pt: 'Braga, Portugal', en: 'Braga, Portugal' },
    summary: {
      pt: 'Conteúdos e percurso do utilizador repensados para o portal oficial de turismo da cidade.',
      en: 'Content and user journey rethought for the city’s official tourism portal.',
    },
    status: { pt: 'Conversão', en: 'Conversion' },
    role: { pt: 'Reengenharia de conteúdos e percurso do utilizador', en: 'Content re-engineering and user journey' },
    outcome: { pt: 'Plataforma oficial do destino', en: 'Official destination platform' },
  },
  {
    id: 'systemeu-salamanca',
    title: { pt: 'SYSTEMEU', en: 'SYSTEMEU' },
    theme: 'digital',
    image: 'https://i.imgur.com/SeyCGBk.jpg',
    year: '2024-25',
    place: { pt: 'Salamanca · Braga', en: 'Salamanca · Braga' },
    summary: {
      pt: 'Braga no encontro europeu de inovação e transferência de tecnologia, em Salamanca.',
      en: 'Braga at the European innovation and technology-transfer summit in Salamanca.',
    },
    status: { pt: 'Europeia', en: 'European' },
    role: { pt: 'Representação institucional', en: 'Institutional representation' },
    outcome: { pt: 'Cooperação inter-regional', en: 'Inter-regional cooperation' },
  },
  {
    id: 'cidade-bracvs',
    title: { pt: 'A Cidade do Bracvs', en: 'The City of Bracvs' },
    theme: 'produto',
    image: 'https://i.imgur.com/NRTWHRW.png',
    year: '2025',
    place: { pt: 'Braga, Portugal', en: 'Braga, Portugal' },
    summary: {
      pt: 'Um roteiro lúdico-educativo que leva crianças e famílias ao encontro da Braga romana.',
      en: 'A playful, educational itinerary that brings children and families to Roman Braga.',
    },
    status: { pt: 'Educação', en: 'Education' },
    role: { pt: 'Conceção de conteúdos e revisão editorial', en: 'Content design and editorial review' },
    outcome: { pt: 'Novo produto para famílias', en: 'New product for families' },
  },
  {
    id: 'roteiro-3-dias',
    title: { pt: 'Descobrir Braga em 3 Dias', en: 'Discover Braga in 3 Days' },
    theme: 'produto',
    image: 'https://i.imgur.com/yWtlcEL.png',
    year: '2025',
    place: { pt: 'Braga, Portugal', en: 'Braga, Portugal' },
    summary: {
      pt: 'O guia oficial para descobrir Braga em três dias, com rigor histórico e utilidade no terreno.',
      en: 'The official guide to discovering Braga in three days, accurate in history and useful on the ground.',
    },
    status: { pt: 'Editorial', en: 'Editorial' },
    role: { pt: 'Coordenação editorial e controlo de qualidade', en: 'Editorial coordination and quality control' },
    outcome: { pt: 'Guia oficial da cidade', en: 'Official city guide' },
  },
  {
    id: 'mapa-turistico-braga',
    title: { pt: 'Novo Mapa Territorial', en: 'New Territorial Map' },
    theme: 'produto',
    image: 'https://i.imgur.com/P54M1Ko.png',
    year: '2024',
    place: { pt: 'Braga, Portugal', en: 'Braga, Portugal' },
    summary: {
      pt: 'O novo mapa turístico oficial de Braga, entre o rigor cartográfico e o design de informação.',
      en: 'Braga’s new official tourist map, between cartographic accuracy and information design.',
    },
    status: { pt: 'Cartografia', en: 'Cartography' },
    role: { pt: 'Desenvolvimento técnico e design de informação', en: 'Technical development and information design' },
    outcome: { pt: 'Cartografia oficial', en: 'Official cartography' },
  },
  {
    id: 'experiencias-sustentaveis',
    title: { pt: 'Experiências Sustentáveis', en: 'Sustainable Experiences' },
    theme: 'produto',
    image:
      'https://www.cm-braga.pt/archive/cache/img/sz800x600/CMB17012025SERGIOFREITAS3022624430274.jpg',
    year: '2025',
    place: { pt: 'Braga, Portugal', en: 'Braga, Portugal' },
    summary: {
      pt: '29 experiências turísticas sustentáveis, desenhadas com mais de 30 operadores locais.',
      en: '29 sustainable tourism experiences, designed with more than 30 local operators.',
    },
    status: { pt: 'Produto', en: 'Product' },
    role: { pt: 'Coordenação técnica do portefólio', en: 'Technical coordination of the portfolio' },
    outcome: { pt: '29 experiências, 30+ parceiros', en: '29 experiences, 30+ partners' },
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
  { id: 'smart-tourism', city: { pt: 'Bruxelas', en: 'Brussels' }, country: { pt: 'Bélgica', en: 'Belgium' }, event: 'European Capital of Smart Tourism', year: '2024-26', lat: 50.8503, lon: 4.3517 },
  { id: 'fiets-wandelbeurs-gante', city: { pt: 'Gante', en: 'Ghent' }, country: { pt: 'Bélgica', en: 'Belgium' }, event: 'Fiets en Wandelbeurs', year: '2025', lat: 51.0543, lon: 3.7174 },
  { id: 'expovacaciones-bilbao', city: { pt: 'Bilbao', en: 'Bilbao' }, country: { pt: 'Espanha', en: 'Spain' }, event: 'ExpoVacaciones', year: '2024-25', lat: 43.263, lon: -2.935 },
  { id: 'b-travel-barcelona', city: { pt: 'Barcelona', en: 'Barcelona' }, country: { pt: 'Espanha', en: 'Spain' }, event: 'B-Travel', year: '2026', lat: 41.3874, lon: 2.1686 },
  { id: 'systemeu-salamanca', city: { pt: 'Salamanca', en: 'Salamanca' }, country: { pt: 'Espanha', en: 'Spain' }, event: 'Startup OLÉ & SystemEU Summit', year: '2024-25', lat: 40.9701, lon: -5.6635 },
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
