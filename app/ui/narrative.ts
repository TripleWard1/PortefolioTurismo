// Narrativa de cada projeto em três tempos: o desafio, a resposta e o impacto.
// Escrita a partir do conteúdo dos dossiers, em PT e EN.

import type { L } from './projects';

export interface Story {
  challenge: L;
  response: L;
  impact: L;
}

export const STORY: Record<string, Story> = {
  'smart-tourism': {
    challenge: {
      pt: 'Provar perante a Comissão Europeia e um júri internacional que Braga já funciona como destino inteligente: acessível, sustentável, digital e com património vivo.',
      en: 'Prove to the European Commission and an international jury that Braga already works as a smart destination: accessible, sustainable, digital and with a living heritage.',
    },
    response: {
      pt: 'Integração na equipa técnica que preparou e defendeu a candidatura em Bruxelas, convertendo políticas municipais e dados dispersos em evidência comparável à escala europeia.',
      en: 'Joining the technical team that prepared and defended the bid in Brussels, turning municipal policies and scattered data into evidence comparable at European level.',
    },
    impact: {
      pt: 'Braga entrou no grupo restrito de cidades finalistas e ganhou lugar na rede europeia de destinos inteligentes, com acesso direto à troca de boas práticas.',
      en: 'Braga joined the small group of finalist cities and earned a place in the European smart destinations network, with direct access to good-practice exchange.',
    },
  },
  'small-retail-braga': {
    challenge: {
      pt: 'Demonstrar que o comércio de proximidade pode ser um motor de cidade mais sustentável, digital e coesa.',
      en: 'Show that local retail can drive a more sustainable, digital and cohesive city.',
    },
    response: {
      pt: 'Liderança técnica e editorial do dossier estratégico: um modelo de distrito comercial digital, logística urbana partilhada e valorização das Lojas com História.',
      en: 'Technical and editorial lead on the strategic dossier: a digital retail district model, shared urban logistics and support for historic shops.',
    },
    impact: {
      pt: 'Candidatura submetida à Comissão Europeia e Braga finalista da European Capital of Small Retail 2026.',
      en: 'Bid submitted to the European Commission, with Braga a finalist for European Capital of Small Retail 2026.',
    },
  },
  'braga-after-dark': {
    challenge: {
      pt: 'Dar à noite de Braga uma narrativa própria, capaz de atrair visitantes sem comprometer a segurança, a inclusão e a qualidade de vida de quem cá vive.',
      en: 'Give Braga’s night a story of its own, attracting visitors without compromising safety, inclusion and residents’ quality of life.',
    },
    response: {
      pt: 'Conceção e curadoria do primeiro roteiro cultural e gastronómico oficial da noite, no âmbito da rede europeia URBACT Cities After Dark.',
      en: 'Designing and curating the first official cultural and food itinerary for the night, within the European URBACT Cities After Dark network.',
    },
    impact: {
      pt: 'Uma ferramenta de gestão da economia noturna que afirma Braga como destino ativo a qualquer hora, e que sustentou a candidatura aos Music Cities Awards.',
      en: 'A night-time economy management tool that positions Braga as a destination alive at any hour, and the basis for the Music Cities Awards bid.',
    },
  },
  'music-cities-awards': {
    challenge: {
      pt: 'Levar uma estratégia local de economia noturna a um palco mundial, perante especialistas em música e urbanismo.',
      en: 'Take a local night-time economy strategy to a global stage, before experts in music and urban planning.',
    },
    response: {
      pt: 'Redação estratégica e submissão da candidatura, adaptando o Braga After Dark a uma narrativa internacional que une património milenar e energia criativa.',
      en: 'Strategic writing and submission of the bid, adapting Braga After Dark into an international story that joins ancient heritage and creative energy.',
    },
    impact: {
      pt: 'Braga no top 3 mundial e representada oficialmente no Arkansas, nos Estados Unidos.',
      en: 'Braga in the global top 3 and officially represented in Arkansas, United States.',
    },
  },
  'fiets-wandelbeurs-gante': {
    challenge: {
      pt: 'Apresentar a nova marca territorial de Braga a um mercado exigente e especializado em ciclismo e caminhada.',
      en: 'Introduce Braga’s new territorial brand to a demanding market specialised in cycling and walking.',
    },
    response: {
      pt: 'Representação técnica e institucional do Município, com narrativa e materiais bilingues que ligam património e turismo ativo.',
      en: 'Technical and institutional representation of the Municipality, with a bilingual story and materials linking heritage and active tourism.',
    },
    impact: {
      pt: 'Contacto direto com operadores e público do Benelux e Braga posicionada como destino de turismo ativo e sustentável.',
      en: 'Direct contact with Benelux operators and travellers, positioning Braga as an active and sustainable destination.',
    },
  },
  'expovacaciones-bilbao': {
    challenge: {
      pt: 'Reforçar a notoriedade de Braga num mercado de proximidade qualificado, no ano de Capital Portuguesa da Cultura.',
      en: 'Raise Braga’s profile in a qualified nearby market, in its year as Portuguese Capital of Culture.',
    },
    response: {
      pt: 'Representação institucional no País Basco e na Cantábria, com promoção dos eventos âncora da cidade e articulação com entidades regionais.',
      en: 'Institutional representation in the Basque Country and Cantabria, promoting the city’s flagship events and working with regional bodies.',
    },
    impact: {
      pt: 'Braga afirmada como destino cultural de excelência no Norte de Portugal junto do mercado do norte de Espanha.',
      en: 'Braga established as a leading cultural destination in Northern Portugal for the northern Spanish market.',
    },
  },
  'b-travel-barcelona': {
    challenge: {
      pt: 'Ganhar espaço numa das feiras de turismo mais relevantes do Sul da Europa, junto do público catalão.',
      en: 'Stand out at one of Southern Europe’s most relevant tourism fairs, in front of the Catalan public.',
    },
    response: {
      pt: 'Representação do Município no stand do Turismo do Porto e Norte de Portugal, em contacto direto com visitantes e profissionais durante três dias.',
      en: 'Representing the Municipality on the Porto and North of Portugal stand, in direct contact with visitors and professionals over three days.',
    },
    impact: {
      pt: 'Braga apresentada como cidade milenar de identidade forte e presente nas rotas turísticas internacionais.',
      en: 'Braga presented as an ancient city with a strong identity, firmly on international travel routes.',
    },
  },
  'visit-braga': {
    challenge: {
      pt: 'Transformar uma oferta cultural, histórica e comercial muito vasta numa experiência digital simples para quem visita.',
      en: 'Turn a vast cultural, historical and commercial offer into a simple digital experience for visitors.',
    },
    response: {
      pt: 'Colaboração no novo portal com reengenharia de conteúdos e simplificação do percurso do utilizador.',
      en: 'Contributing to the new portal through content re-engineering and a simpler user journey.',
    },
    impact: {
      pt: 'Uma presença online à altura da projeção internacional da cidade, que serve de montra oficial do destino.',
      en: 'An online presence that matches the city’s international profile and acts as the destination’s official showcase.',
    },
  },
  'systemeu-salamanca': {
    challenge: {
      pt: 'Posicionar Braga num dos principais encontros europeus de inovação e transferência de tecnologia.',
      en: 'Position Braga at one of Europe’s main innovation and technology-transfer gatherings.',
    },
    response: {
      pt: 'Representação institucional no SystemEU Summit e contacto com universidades, centros de investigação e a Startup Braga.',
      en: 'Institutional representation at the SystemEU Summit, engaging with universities, research centres and Startup Braga.',
    },
    impact: {
      pt: 'Novas sinergias em sustentabilidade tecnológica e governação urbana, com Braga reforçada como polo de inovação regional.',
      en: 'New synergies in technological sustainability and urban governance, strengthening Braga as a regional innovation hub.',
    },
  },
  'cidade-bracvs': {
    challenge: {
      pt: 'Tornar o património romano de Braga compreensível e apelativo para crianças e famílias.',
      en: 'Make Braga’s Roman heritage clear and appealing for children and families.',
    },
    response: {
      pt: 'Conceção de conteúdos e revisão editorial: estrutura narrativa, seleção de pontos de interesse e validação final de produção.',
      en: 'Content design and editorial review: story structure, choice of points of interest and final production sign-off.',
    },
    impact: {
      pt: 'Um roteiro lúdico-educativo que junta rigor histórico e linguagem acessível, e um novo produto para famílias.',
      en: 'A playful, educational itinerary that combines historical accuracy and accessible language, and a new product for families.',
    },
  },
  'roteiro-3-dias': {
    challenge: {
      pt: 'Garantir que o guia oficial da cidade é rigoroso na história e útil no terreno.',
      en: 'Make sure the official city guide is historically accurate and useful on the ground.',
    },
    response: {
      pt: 'Coordenação da edição e controlo de qualidade editorial, com validação técnica de dados e normas de acessibilidade.',
      en: 'Coordinating the edition and editorial quality control, with technical data checks and accessibility standards.',
    },
    impact: {
      pt: 'Um guia oficial que organiza três dias de visita e mantém a informação atual através de uma camada digital.',
      en: 'An official guide that organises a three-day visit and keeps information current through a digital layer.',
    },
  },
  'mapa-turistico-braga': {
    challenge: {
      pt: 'Reestruturar a cartografia turística do território de acordo com a nova identidade visual do destino.',
      en: 'Rebuild the territory’s tourist cartography in line with the destination’s new visual identity.',
    },
    response: {
      pt: 'Desenvolvimento técnico e design de informação, com hierarquia clara de pontos de interesse e gestão multilingue.',
      en: 'Technical development and information design, with a clear hierarchy of points of interest and multilingual management.',
    },
    impact: {
      pt: 'O mapa oficial de Braga: uma ferramenta de orientação e promoção que une rigor cartográfico e leitura imediata.',
      en: 'Braga’s official map: an orientation and promotion tool that pairs cartographic accuracy with instant readability.',
    },
  },
  'experiencias-sustentaveis': {
    challenge: {
      pt: 'Estruturar uma oferta turística comercializável que traduza a identidade local e as boas práticas de sustentabilidade.',
      en: 'Build a market-ready tourism offer that reflects local identity and sustainability good practice.',
    },
    response: {
      pt: 'Coordenação técnica do ciclo completo: articulação com mais de 30 operadores, apoio na interpretação da legislação e supervisão de marketing e FAM trips.',
      en: 'Technical coordination of the full cycle: working with more than 30 operators, guidance on tourism legislation and oversight of marketing and FAM trips.',
    },
    impact: {
      pt: '29 experiências validadas e prontas para o mercado, que posicionam Braga como destino sustentável e inclusivo.',
      en: '29 validated, market-ready experiences that position Braga as a sustainable and inclusive destination.',
    },
  },
};
