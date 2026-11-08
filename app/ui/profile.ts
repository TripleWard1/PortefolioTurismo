// Perfil profissional: função, competências, metodologia, distinções e redes.
// Texto institucional em PT e EN. Os factos vêm dos projetos e dossiês.

import type { L, Theme } from './projects';

export const ROLE: L = {
  pt: 'Técnico Superior · Inovação e Desenvolvimento Turístico',
  en: 'Senior Officer · Tourism Innovation and Development',
};
export const ENTITY: L = {
  pt: 'Município de Braga — Divisão de Atividades Económicas e Turismo',
  en: 'Municipality of Braga — Economic Activities and Tourism Division',
};

/* Âmbito de cada área de competência */
export const SCOPE: Record<Theme, { intro: L; items: L[] }> = {
  europeu: {
    intro: {
      pt: 'Preparação, redação e defesa de candidaturas a títulos e redes europeias, em articulação com a Comissão Europeia e parceiros de cooperação urbana.',
      en: 'Preparing, drafting and defending bids for European titles and networks, working with the European Commission and urban cooperation partners.',
    },
    items: [
      { pt: 'Dossiês técnicos de candidatura', en: 'Technical bid dossiers' },
      { pt: 'Defesa presencial perante júris europeus', en: 'In-person defence before European juries' },
      { pt: 'Participação em redes URBACT', en: 'Participation in URBACT networks' },
      { pt: 'Benchmarking e transferência de boas práticas', en: 'Benchmarking and transfer of good practice' },
    ],
  },
  internacional: {
    intro: {
      pt: 'Representação institucional do destino em feiras profissionais e junto de mercados emissores prioritários, com a Entidade Regional de Turismo.',
      en: 'Institutional representation of the destination at trade fairs and in priority source markets, together with the Regional Tourism Board.',
    },
    items: [
      { pt: 'Presença em feiras B2B e B2C', en: 'Presence at B2B and B2C fairs' },
      { pt: 'Posicionamento da marca territorial', en: 'Territorial brand positioning' },
      { pt: 'Inteligência de mercado: Benelux e Espanha', en: 'Market intelligence: Benelux and Spain' },
      { pt: 'Articulação com o Turismo do Porto e Norte', en: 'Coordination with Porto and North Tourism' },
    ],
  },
  digital: {
    intro: {
      pt: 'Plataformas digitais de destino e participação em redes de inovação que aproximam o turismo do ecossistema tecnológico regional.',
      en: 'Digital destination platforms and innovation networks that bring tourism closer to the regional technology ecosystem.',
    },
    items: [
      { pt: 'Experiência de utilizador em plataformas de destino', en: 'User experience for destination platforms' },
      { pt: 'Arquitetura e estratégia de conteúdos', en: 'Content architecture and strategy' },
      { pt: 'Redes inter-regionais de inovação', en: 'Inter-regional innovation networks' },
      { pt: 'Transferência de conhecimento', en: 'Knowledge transfer' },
    ],
  },
  produto: {
    intro: {
      pt: 'Conceção de produto turístico e de publicações oficiais que qualificam a experiência do visitante e valorizam o património.',
      en: 'Designing tourism products and official publications that improve the visitor experience and enhance heritage.',
    },
    items: [
      { pt: 'Roteiros temáticos e experiências', en: 'Themed itineraries and experiences' },
      { pt: 'Coordenação editorial de guias oficiais', en: 'Editorial coordination of official guides' },
      { pt: 'Cartografia e design de informação', en: 'Cartography and information design' },
      { pt: 'Articulação com operadores locais', en: 'Coordination with local operators' },
    ],
  },
};

/* Metodologia de trabalho, ilustrada com um projeto em cada fase */
export const METHOD: { title: L; text: L; example: string }[] = [
  {
    title: { pt: 'Diagnóstico', en: 'Assessment' },
    text: {
      pt: 'Leitura do território, dos mercados e das boas práticas europeias que servem de referência.',
      en: 'Reading the territory, the markets and the European good practice that serves as a benchmark.',
    },
    example: 'systemeu-salamanca',
  },
  {
    title: { pt: 'Estratégia', en: 'Strategy' },
    text: {
      pt: 'Definição do posicionamento, dos públicos-alvo e do modelo de governação do projeto.',
      en: 'Defining positioning, target audiences and the project’s governance model.',
    },
    example: 'braga-after-dark',
  },
  {
    title: { pt: 'Candidatura e financiamento', en: 'Bids and funding' },
    text: {
      pt: 'Redação técnica, construção de parcerias e defesa perante júris e entidades financiadoras.',
      en: 'Technical writing, partnership building and defence before juries and funders.',
    },
    example: 'smart-tourism',
  },
  {
    title: { pt: 'Implementação', en: 'Delivery' },
    text: {
      pt: 'Execução com parceiros locais, comunicação ao visitante e acompanhamento de resultados.',
      en: 'Delivery with local partners, visitor communication and monitoring of results.',
    },
    example: 'experiencias-sustentaveis',
  },
];

/* Distinções obtidas pelos projetos */
export const RECOGNITION: { title: L; award: string; body: L; year: string; id: string }[] = [
  {
    title: { pt: 'Finalista', en: 'Finalist' },
    award: 'European Capital of Smart Tourism',
    body: { pt: 'Comissão Europeia', en: 'European Commission' },
    year: '2024—26',
    id: 'smart-tourism',
  },
  {
    title: { pt: 'Top 3 mundial', en: 'Global top 3' },
    award: 'Music Cities Awards',
    body: { pt: 'Music Cities Events', en: 'Music Cities Events' },
    year: '2025',
    id: 'music-cities-awards',
  },
  {
    title: { pt: 'Finalista', en: 'Finalist' },
    award: 'European Capital of Small Retail 2026',
    body: { pt: 'Comissão Europeia', en: 'European Commission' },
    year: '2025—26',
    id: 'small-retail-braga',
  },
];

/* Redes e parceiros institucionais */
export const NETWORKS: { name: string; note: L }[] = [
  { name: 'Comissão Europeia', note: { pt: 'Títulos Smart Tourism e Small Retail', en: 'Smart Tourism and Small Retail titles' } },
  { name: 'URBACT', note: { pt: 'Rede Cities After Dark', en: 'Cities After Dark network' } },
  { name: 'SystemEU', note: { pt: 'Rede de inovação inter-regional', en: 'Inter-regional innovation network' } },
  { name: 'Music Cities Events', note: { pt: 'Políticas de música e economia noturna', en: 'Music policy and night-time economy' } },
  { name: 'Turismo do Porto e Norte', note: { pt: 'Promoção em feiras internacionais', en: 'Promotion at international fairs' } },
  { name: 'InvestBraga', note: { pt: 'Plataforma Visit Braga', en: 'Visit Braga platform' } },
];
