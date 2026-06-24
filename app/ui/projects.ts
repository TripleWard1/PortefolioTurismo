// Registo central dos projetos - fonte única de verdade para o Command Palette,
// o Índice filtrável e a navegação ‹ › do overlay. Os dados pesados de cada
// dossier continuam no ChapterOverlay; aqui ficam só os metadados de navegação.

export type Theme = 'europeu' | 'digital' | 'produto' | 'internacional';

export interface ProjectMeta {
  id: string;
  pt: string;
  en: string;
  theme: Theme;
  sectionId: string; // capítulo onde vive (para scroll)
  image: string;
}

export const THEMES: { id: Theme | 'todos'; pt: string; en: string }[] = [
  { id: 'todos', pt: 'Todos', en: 'All' },
  { id: 'europeu', pt: 'Europeu', en: 'European' },
  { id: 'digital', pt: 'Digital', en: 'Digital' },
  { id: 'produto', pt: 'Produto', en: 'Product' },
  { id: 'internacional', pt: 'Internacional', en: 'International' },
];

export const THEME_LABEL: Record<Theme, { pt: string; en: string }> = {
  europeu: { pt: 'Europeu', en: 'European' },
  digital: { pt: 'Digital', en: 'Digital' },
  produto: { pt: 'Produto', en: 'Product' },
  internacional: { pt: 'Internacional', en: 'International' },
};

export const PROJECTS: ProjectMeta[] = [
  {
    id: 'smart-tourism',
    pt: 'Smart Tourism',
    en: 'Smart Tourism',
    theme: 'europeu',
    sectionId: 'arquivo',
    image: 'https://i.imgur.com/SvJ4bdR.jpeg',
  },
  {
    id: 'small-retail-braga',
    pt: 'Small Retail',
    en: 'Small Retail',
    theme: 'europeu',
    sectionId: 'arquivo',
    image:
      'https://transition-pathways.europa.eu/sites/default/files/styles/time_dependent_full/public/discussion_form_post/2025-12/ECOSR%20-%20Thumbnail_0.jpg?itok=1-QARVo7',
  },
  {
    id: 'braga-after-dark',
    pt: 'After Dark',
    en: 'After Dark',
    theme: 'europeu',
    sectionId: 'arquivo',
    image: 'https://i.imgur.com/mgdxHtt.jpeg',
  },
  {
    id: 'music-cities-awards',
    pt: 'Music Cities',
    en: 'Music Cities',
    theme: 'europeu',
    sectionId: 'arquivo',
    image:
      'https://static.wixstatic.com/media/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg',
  },
  {
    id: 'fiets-wandelbeurs-gante',
    pt: 'Fiets en Wandelbeurs',
    en: 'Fiets en Wandelbeurs',
    theme: 'internacional',
    sectionId: 'arquivo',
    image: 'https://i.imgur.com/tg4YOqy.png',
  },
  {
    id: 'expovacaciones-bilbao',
    pt: 'ExpoVacaciones',
    en: 'ExpoVacaciones',
    theme: 'internacional',
    sectionId: 'arquivo',
    image: 'https://i.imgur.com/JL0PcZe.png',
  },
  {
    id: 'b-travel-barcelona',
    pt: 'B-Travel Barcelona',
    en: 'B-Travel Barcelona',
    theme: 'internacional',
    sectionId: 'arquivo',
    image: 'https://i.imgur.com/09Tm1r9.png',
  },
  {
    id: 'visit-braga',
    pt: 'Portal Visit Braga',
    en: 'Visit Braga Portal',
    theme: 'digital',
    sectionId: 'capitulo-02',
    image: 'https://i.imgur.com/e0wCEWM.jpeg',
  },
  {
    id: 'systemeu-salamanca',
    pt: 'SYSTEMEU',
    en: 'SYSTEMEU',
    theme: 'digital',
    sectionId: 'capitulo-02',
    image: 'https://imgur.com/SeyCGBk.jpg',
  },
  {
    id: 'cidade-bracvs',
    pt: 'A Cidade do Bracvs',
    en: 'The City of Bracvs',
    theme: 'produto',
    sectionId: 'estratégia',
    image: 'https://i.imgur.com/NRTWHRW.png',
  },
  {
    id: 'roteiro-3-dias',
    pt: 'Descobrir Braga em 3 Dias',
    en: 'Discover Braga in 3 Days',
    theme: 'produto',
    sectionId: 'estratégia',
    image: 'https://i.imgur.com/yWtlcEL.png',
  },
  {
    id: 'mapa-turistico-braga',
    pt: 'Novo Mapa Territorial',
    en: 'New Territorial Map',
    theme: 'produto',
    sectionId: 'estratégia',
    image: 'https://i.imgur.com/P54M1Ko.png',
  },
  {
    id: 'experiencias-sustentaveis',
    pt: 'Experiências Sustentáveis',
    en: 'Sustainable Experiences',
    theme: 'produto',
    sectionId: 'estratégia',
    image:
      'https://www.cm-braga.pt/archive/cache/img/sz800x600/CMB17012025SERGIOFREITAS3022624430274.jpg',
  },
];

export const PROJECT_IDS = PROJECTS.map((p) => p.id);

export function getProject(id: string): ProjectMeta | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function neighbours(id: string): { prev: ProjectMeta; next: ProjectMeta } {
  const i = PROJECTS.findIndex((p) => p.id === id);
  const len = PROJECTS.length;
  const safe = i < 0 ? 0 : i;
  return {
    prev: PROJECTS[(safe - 1 + len) % len]!,
    next: PROJECTS[(safe + 1) % len]!,
  };
}