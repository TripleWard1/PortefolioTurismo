'use client';
import {
  X, Target, Globe, Smartphone, Sparkles, CheckCircle, Briefcase,
  LineChart, Compass, QrCode, FileText, PlayCircle, Layers, Zap,
  Cpu, BarChart3, Search, Map, Quote, Calendar, ArrowUpRight,Users, ArrowRight, Languages, FileDown
} from 'lucide-react';
import { useEffect, useState, ReactNode } from 'react';

// --- ESTE BLOCO ABAIXO É O QUE CORRIGE O ERRO ---
interface Pillar {
  title: string;
  desc?: string;
  icon: any;
  items?: string[];
}

interface ProjectData {
  watermark: string;
  tag: string;
  headerTitle: string;
  hero: React.ReactNode;
  description: React.ReactNode;
  pillarTabLabel: string;
  pillarTitle: string;
  pillarDesc: string;
  pillars: any[];
  quote: string;
  // Propriedades opcionais com "?" para o TypeScript não reclamar
  link?: string;
  labelLink?: string;
  videoUrl?: string;
  videoEmbed?: React.ReactNode; 
  gallery?: string[];
  linkEN?: string;
  labelLinkEN?: string;
  linkES?: string;
  labelLinkES?: string;
  linkFR?: string;
  labelLinkFR?: string;
  linkLowCost?: string;
  labelLowCost?: string;
}

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  projectType?: string;
}

export default function ChapterOverlay({
  isOpen,
  onClose,
  projectType = 'smart-tourism',
}: OverlayProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'pillars' | 'media'>('overview');

  const isVisitBraga = projectType === 'visit-braga';

  // Adicionamos a tipagem : Record<string, ProjectData> aqui
  const projectConfig: Record<string, ProjectData> = {
// --- FIM DO BLOCO DE CORREÇÃO ---
    'visit-braga': {
      watermark:
        'https://visitbraga.travel/wp-content/uploads/2025/05/visit-braga.jpg',
      tag: 'Gestão de Destino // 2025',
      headerTitle: 'Portal Visit Braga: Promoção e Estratégia',
      hero: (
        <>
          Visit <br />
          <span className="text-blue-600 italic">Braga.</span>
        </>
      ),
      description: (
        <>
          Fiz parte da equipa que{' '}
          <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8">
            elaborou a parte dos conteúdos
          </span>{' '}
          para o novo portal Visit Braga, focada na simplificação da jornada do
          turista e na promoção integrada do território.
        </>
      ),
      link: 'https://visitbraga.travel',
      labelLink: 'visitbraga.travel',
      pillarTabLabel: 'Estratégia de Promoção',
      pillarTitle: 'Pilares da Experiência Digital',
      pillarDesc:
        'O novo portal foi estruturado para ser a porta de entrada principal da cidade, otimizando a forma como o destino comunica com o mundo.',
      pillars: [
        {
          icon: Languages,
          title: 'Promoção Global',
          items: [
            'Conteúdos Multilingue',
            'Estratégia SEO de Destino',
            'Visibilidade Internacional',
          ],
        },
        {
          icon: Calendar,
          title: 'Dinamização',
          items: [
            'Agenda de Eventos Integrada',
            'Newsletter de Visitante',
            'Atualização em Tempo Real',
          ],
        },
        {
          icon: Map,
          title: 'Oferta Local',
          items: [
            'Roteiros Temáticos',
            'Património e Cultura',
            'Apoio ao Comércio e Hotelaria',
          ],
        },
        {
          icon: Sparkles,
          title: 'Inovação',
          items: [
            'Experiência Mobile-First',
            'Interface Intuitiva',
            'Assistente de Destino',
          ],
        },
      ],
      quote:
        '"Afirmar Braga como um destino inteligente e de excelência no panorama internacional."',
      videoUrl: 'https://streamable.com/e/pmp04s?',
    },
    'smart-tourism': {
      watermark: 'https://i.imgur.com/GBs8DY7.jpeg',
      tag: 'Candidaturas Europeias // 2026',
      headerTitle: 'Smart Tourism Capital',
      hero: (
        <div className="space-y-2">
          <span className="text-blue-500 font-medium tracking-widest uppercase text-sm">Braga 2026</span>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-white">
            Smart <span className="italic font-serif text-blue-400">Tourism</span>
          </h1>
        </div>
      ),
      description: (
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-light">
          Liderança técnica na estratégia de <span className="text-white border-b border-blue-500/30">defesa institucional em Bruxelas</span>, consolidando Braga na elite dos destinos inteligentes europeus.
        </p>
      ),
      pillarTabLabel: 'Eixos',
      pillarTitle: 'Pilares Estratégicos',
      pillarDesc: 'Uma abordagem holística baseada nos critérios de excelência da Comissão Europeia.',
      pillars: [
        { title: 'Acessibilidade', desc: 'Inclusividade física e digital.', icon: Smartphone },
        { title: 'Sustentabilidade', desc: 'Preservação do capital natural.', icon: Globe },
        { title: 'Digitalização', desc: 'Gestão inteligente de dados.', icon: Zap },
        { title: 'Herança Cultural', desc: 'Inovação no património vivo.', icon: Sparkles },
      ],
      quote: "A excelência turística nasce da harmonia entre tecnologia e identidade.",
      gallery: [
        'https://i.imgur.com/1t5plh4.jpeg',
        'https://i.imgur.com/cpFeHQk.jpeg',
        'https://i.imgur.com/HecgfPz.jpeg',
        'https://i.imgur.com/GBs8DY7.jpeg',
        'https://i.imgur.com/AM6Z3uu.jpeg',
        'https://i.imgur.com/FFH12zK.jpeg',
      ],
    },
    'cidade-bracvs': {
      watermark:
        'https://visitbraga.travel/wp-content/uploads/2025/07/guia-infantil.jpg',
      tag: 'Educação & Património // 2025',
      headerTitle: 'Roteiro Infantojuvenil: A Cidade do Bracvs',
      hero: (
        <>
          Cidade do <br />
          <span className="text-blue-600 italic">Bracvs.</span>
        </>
      ),
      description: (
        <>
          Concepção de conteúdos e revisão editorial de uma{' '}
          <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8">
            publicação lúdico-educativa
          </span>{' '}
          focada na aproximação das famílias ao património histórico de Braga.
        </>
      ),
      link: 'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-Infantil-CMB-Visit-Braga.pdf',
      labelLink: 'Download do Roteiro',
      pillarTabLabel: 'Contributos Técnicos',
      pillarTitle: 'Eixos de Intervenção',
      pillarDesc:
        'O meu papel foi transversal, desde a definição da narrativa até à validação final de produção e maquetagem.',
      pillars: [
        {
          title: 'Conceção de Conteúdos',
          desc: 'Definição da estrutura narrativa, seleção de pontos de interesse e criação de jogos interativos.',
          icon: Map,
        },
        {
          title: 'Revisão Editorial',
          desc: 'Escrita e adaptação de linguagem para o público infantil e validação rigorosa de dados históricos.',
          icon: Search,
        },
        {
          title: 'Coordenação Criativa',
          desc: 'Articulação entre Turismo, Educação e Design para garantir coerência visual e textual.',
          icon: Layers,
        },
        {
          title: 'Estratégia Família',
          desc: 'Enquadramento do roteiro no contexto de turismo criativo e público escolar.',
          icon: Users,
        },
      ],
      quote:
        '"Aproximar as novas gerações do património através de uma narrativa interativa e lúdica."',
      gallery: [
        'https://visitbraga.travel/wp-content/uploads/2025/07/guia-infantil.jpg',
        'https://i.imgur.com/K5ZnO4x.png',
        'https://i.imgur.com/L4RnX9W.png',
      ],
    },
    'braga-after-dark': {
      watermark: 'https://i.imgur.com/mgdxHtt.jpeg',
      tag: 'Curadoria & Eventos // 2025',
      headerTitle: 'Braga After Dark: Economia e Vida Noturna',
      hero: (
        <>
          After <br />
          <span className="text-blue-600 italic">Dark.</span>
        </>
      ),
      description: (
        <>
          Concepção e curadoria do{' '}
          <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8">
            roteiro cultural e gastronómico
          </span>{' '}
          oficial da noite de Braga, integrado no projeto europeu URBACT Cities
          After Dark.
        </>
      ),
      link: 'https://visitbraga.travel/wp-content/uploads/2025/06/Roteiro-Braga-After-Dark.pdf',
      labelLink: 'Download do Guia',
      pillarTabLabel: 'Eixos do Roteiro',
      pillarTitle: 'Momentos da Experiência Noturna',
      pillarDesc:
        'O guia estrutura a oferta da cidade em três momentos chave, focando na sustentabilidade, segurança e inclusão.',
      pillars: [
        {
          title: 'Braga by Sunset',
          desc: 'Visitas a monumentos ao pôr do sol e dinamização de esplanadas.',
          icon: Sparkles,
        },
        {
          title: 'Braga by Night',
          desc: 'Promoção da gastronomia e vinhos locais nos restaurantes do centro histórico.',
          icon: Globe,
        },
        {
          title: 'Braga by Dark',
          desc: 'Exploração dos espaços de diversão noturna e cultura vibrante.',
          icon: Zap,
        },
        {
          title: 'Responsabilidade',
          desc: 'Foco em mobilidade ecológica, segurança "A Noite é de Todos" e economia circular.',
          icon: Target,
        },
      ],
      quote:
        '"Promover uma noite vibrante, inclusiva e sustentável através do Braga After Dark Fest."',
      gallery: [
        'https://i.imgur.com/mgdxHtt.jpeg',
        'https://i.imgur.com/to9jbOB.jpeg',
        'https://i.imgur.com/2NVOugs.jpeg',
        'https://i.imgur.com/WFOPGd2.jpeg',
        'https://i.imgur.com/JHpp607.jpeg',
        'https://i.imgur.com/rXl3zkj.jpeg',
        'https://i.imgur.com/7Ttw6ak.jpeg',
        'https://i.imgur.com/OkowZdn.jpeg',
        'https://i.imgur.com/ZCSF2lK.jpeg',
        'https://i.imgur.com/YCZr9xN.jpeg',
      ],
    },
    'roteiro-3-dias': {
      watermark:
        'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-3-Dias-PT.webp',
      tag: 'Coordenação Editorial // 2025',
      headerTitle: 'Roteiro Descobrir Braga em 3 Dias',
      hero: (
        <>
          Braga em <br />
          <span className="text-blue-600 italic">3 Dias.</span>
        </>
      ),
      description: (
        <>
          Coordenação da edição e{' '}
          <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8">
            garantia de qualidade editorial
          </span>{' '}
          do guia oficial do Município, otimizando a experiência do utilizador e
          a precisão factual.
        </>
      ),
      link: 'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-Descobrir-Braga-em-3-Dias-Portugues.pdf',
      labelLink: 'Download (PT)',
      linkEN:
        'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-Descobrir-Braga-em-3-Dias-Ingles.pdf',
      labelLinkEN: 'Download (EN)',
      pillarTabLabel: 'UX Editorial',
      pillarTitle: 'Eixos de Coordenação',
      pillarDesc:
        'Foco na transição entre o conteúdo informativo e a utilidade prática no terreno.',
      pillars: [
        {
          title: 'Fact-Checking',
          desc: 'Validação rigorosa de toponímia, estilos arquitetónicos e integração precisa entre texto e mapa.',
          icon: Search,
        },
        {
          title: 'UX Writing',
          desc: 'Inclusão de tempos médios de visita, ícones de acessibilidade (PMR) e dinâmicas de percurso.',
          icon: Map,
        },
        {
          title: 'Qualidade Final',
          desc: 'Revisão linguística (AO90) e eliminação de artefactos técnicos para uma leitura fluida.',
          icon: CheckCircle,
        },
        {
          title: 'Camada Digital',
          desc: 'Implementação de QR Codes para garantir que horários e preços se mantêm sempre atualizados.',
          icon: QrCode,
        },
      ],
      videoEmbed: (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '0px',
            paddingBottom: '177.778%',
          }}
        >
          <iframe
            allow="fullscreen"
            allowFullScreen
            src="https://streamable.com/e/5qyf9a?"
            style={{
              border: 'none',
              width: '100%',
              height: '100%',
              position: 'absolute',
              left: 0,
              top: 0,
              overflow: 'hidden',
            }}
          />
        </div>
      ),
      gallery: [
        'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-3-Dias-PT.webp',
        'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-3-Dias.webp',
      ],
      quote:
        '"O guia essencial para uma imersão completa na história e cultura bracarense."',
    },
    'mapa-turistico-braga': {
      watermark:
        'https://visitbraga.travel/wp-content/uploads/2025/11/Captura-de-ecra-2025-11-05-120931.png',
      tag: 'Cartografia & Design // 2025',
      headerTitle: 'Novo Mapa Turístico Oficial de Braga',
      hero: (
        <>
          City <br />
          <span className="text-blue-600 italic">Mapping.</span>
        </>
      ),
      description: (
        <>
          Desenvolvimento técnico e multidisciplinar do{' '}
          <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8">
            novo suporte cartográfico oficial
          </span>{' '}
          do território, unindo precisão geográfica e design de informação para
          otimizar a experiência do visitante.
        </>
      ),
      // Links de Download
      link: 'https://visitbraga.travel/wp-content/uploads/2025/11/Mapa_Turistico_Oficial_De_Braga_Portugues.pdf',
      labelLink: 'Download (PT)',
      linkEN:
        'https://visitbraga.travel/wp-content/uploads/2025/10/Official_Tourist_Map_Of_Braga_EN.pdf',
      labelLinkEN: 'Download (EN)',
      linkES:
        'https://visitbraga.travel/wp-content/uploads/2025/11/Plano_Turistico_Oficial_De_Braga_Espanol.pdf',
      labelLinkES: 'Download (ES)',
      linkFR:
        'https://visitbraga.travel/wp-content/uploads/2025/10/Carte_Touristique_Officielle_de_Braga_FR.pdf',
      labelLinkFR: 'Download (FR)',
      // Novo link adicionado
      linkLowCost:
        'https://visitbraga.travel/wp-content/uploads/2025/11/Mapa_Turistico_Oficial_LOW_COST.pdf',
      labelLowCost: 'Mapa Simplificado',

      pillarTabLabel: 'Eixos do Projeto',
      pillarTitle: 'Contributo Estratégico',
      pillarDesc:
        'Da estruturação de conteúdos à ilustração patrimonial, o foco incidiu na clareza informativa e na experiência do visitante.',
      pillars: [
        {
          title: 'Arquitetura de Informação',
          desc: 'Hierarquização de monumentos, museus e serviços, organizados por categorias para uma consulta rápida.',
          icon: Layers,
        },
        {
          title: 'Desenvolvimento Cartográfico',
          desc: 'Produção das bases do centro histórico e área urbana com rigor toponímico e foco em zonas pedonais.',
          icon: Compass,
        },
        {
          title: 'Representação Patrimonial',
          desc: 'Criação de ilustrações 2D de ícones como a Sé e o Bom Jesus (UNESCO) para facilitar a orientação visual.',
          icon: Map,
        },
        {
          title: 'Gestão Multilingue',
          desc: 'Adaptação gráfica e funcional para quatro idiomas (PT, EN, ES, FR), garantindo consistência visual.',
          icon: Languages,
        },
      ],
      quote:
        '"Uma ferramenta contemporânea que combina o rigor da cartografia com a identidade visual de Braga."',
      gallery: [
        'https://visitbraga.travel/wp-content/uploads/2025/11/Captura-de-ecra-2025-11-05-120931.png',
        'https://visitbraga.travel/wp-content/uploads/2025/11/Captura-de-ecra-2025-11-05-120519.png',
        'https://visitbraga.travel/wp-content/uploads/2025/10/Mapa-Ingles.png',
        'https://visitbraga.travel/wp-content/uploads/2025/10/Mapa-Frances-2.png',
        'https://visitbraga.travel/wp-content/uploads/2025/11/Captura-de-ecra-2025-11-05-144144-768x724.png',
      ],
    },
    'fiets-wandelbeurs-gante': {
      watermark: 'https://i.imgur.com/tg4YOqy.png',
      tag: 'Representação Institucional // 2025',
      headerTitle: 'Braga na Fiets en Wandelbeurs — Gante',
      hero: (
        <>
          Global <br />
          <span className="text-blue-600 italic">Promotion.</span>
        </>
      ),
      description: (
        <>
          Representação técnica e institucional do Município de Braga na
          Bélgica, focada no posicionamento da{' '}
          <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8">
            nova marca territorial
          </span>{' '}
          perante o mercado Benelux e na promoção de Braga como destino de
          turismo ativo e sustentável.
        </>
      ),
      // Como não há PDF de download direto mencionado além do plano interno,
      // mantemos os botões de ação se decidires colocar o dossier de destino mais tarde.
      pillarTabLabel: 'Eixos de Atuação',
      pillarTitle: 'Estratégia de Mercado',
      pillarDesc:
        'Foco na geração de leads qualificados e na afirmação de Braga como destino de referência para o mercado de ciclismo e caminhadas.',
      pillars: [
        {
          title: 'Desenvolvimento de Negócio',
          desc: 'Reuniões com operadores e DMCs para negociação de fam trips e novas rotas de programação cultural e de natureza.',
          icon: Briefcase,
        },
        {
          title: 'Afirmação de Marca',
          desc: 'Apresentação da nova identidade territorial, garantindo uma narrativa coerente e materiais de suporte bilingues.',
          icon: Globe,
        },
        {
          title: 'Curadoria de Conteúdos',
          desc: 'Seleção estratégica de percursos pedestres e cicláveis (Bike & Hike) com afinidade ao público do Benelux.',
          icon: Compass,
        },
        {
          title: 'Monitorização & Reporting',
          desc: 'Recolha de métricas de atendimento e feedback de mercado para suporte à decisão estratégica do Município.',
          icon: LineChart,
        },
      ],
      quote:
        '"Uma presença estratégica que une a promoção do património à nova dinâmica de turismo ativo e sustentável de Braga."',
      gallery: [
        'https://i.imgur.com/tg4YOqy.png',
        'https://i.imgur.com/0dqZKA5.png',
        'https://i.imgur.com/eiRaC5f.png',
        'https://i.imgur.com/yAm0gSC.png',
      ],
    },
    'expovacaciones-bilbao': {
      watermark: 'https://i.imgur.com/JL0PcZe.png',
      tag: 'Representação Institucional // 2025',
      headerTitle: 'Braga na ExpoVacaciones — Bilbao',
      hero: (
        <>
          Strategic <br />
          <span className="text-blue-600 italic">Market.</span>
        </>
      ),
      description: (
        <>
          Representação institucional no mercado espanhol (País Basco e
          Cantábria), focada na promoção de Braga como{' '}
          <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8">
            Capital Portuguesa da Cultura 2025
          </span>{' '}
          e destino de excelência no Norte de Portugal.
        </>
      ),
      pillarTabLabel: 'Eixos Estratégicos',
      pillarTitle: 'Presença em Bilbao',
      pillarDesc:
        'Consolidação de Braga num mercado estratégico de proximidade, reforçando a notoriedade cultural e patrimonial do território.',
      pillars: [
        {
          title: 'Promoção Cultural',
          desc: 'Divulgação da Capital Portuguesa da Cultura 2025 e eventos âncora como a Braga Romana e o São João.',
          icon: Globe,
        },
        {
          title: 'Inteligência de Mercado',
          desc: 'Recolha de insights e perceções do público espanhol sobre o destino para ajuste da estratégia promocional.',
          icon: BarChart3,
        },
        {
          title: 'Networking Sectorial',
          desc: 'Articulação com o Turismo do Porto e Norte e estabelecimento de contactos com operadores e entidades de turismo.',
          icon: Briefcase, // Certifica-te que importas o Briefcase
        },
        {
          title: 'Atendimento Técnico',
          desc: 'Qualificação de visitantes e prestação de informação personalizada sobre roteiros e experiências diferenciadoras.',
          icon: Map,
        },
      ],
      quote:
        '"Uma oportunidade fundamental para ouvir o mercado e afirmar Braga como um destino cultural, competitivo e autêntico."',
      gallery: [
        'https://i.imgur.com/JL0PcZe.png',
        'https://i.imgur.com/6wtSxjp.png',
        'https://i.imgur.com/zhIXUOY.png',
        'https://i.imgur.com/C4uKurT.png',
        'https://i.imgur.com/FexeN3Z.png',
      ],
    },
    'experiencias-sustentaveis': {
      watermark:
        'https://www.cm-braga.pt/archive/cache/img/sz800x600/CMB17012025SERGIOFREITAS3022624430274.jpg',
      tag: 'Coordenação & Sustentabilidade // 2025',
      headerTitle: 'Experiências Turísticas Sustentáveis',
      hero: (
        <>
          Experiências <br />
          <span className="text-blue-600 italic">Sustentáveis.</span>
        </>
      ),
      description: (
        <>
          Liderança técnica na conceção e validação de um{' '}
          <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8">
            portefólio de 29 experiências
          </span>{' '}
          comercializáveis, focadas na identidade local e nas boas práticas
          ambientais.
        </>
      ),
      pillarTabLabel: 'Eixos do Projeto',
      pillarTitle: 'Gestão e Estruturação Técnica',
      pillarDesc:
        'Coordenação transversal desde a gestão de stakeholders até à validação legal e operacional do produto turístico.',
      pillars: [
        {
          title: 'Gestão de Stakeholders',
          desc: 'Articulação direta com 30+ operadores, gerindo o ciclo de submissão, revisão e validação das propostas.',
          icon: Users,
        },
        {
          title: 'Consultoria Técnica',
          desc: 'Assessoria na interpretação da legislação (RNAAT/RNAVT) e apoio à formalização da atividade dos operadores.',
          icon: Search,
        },
        {
          title: 'Supervisão Externa',
          desc: 'Coordenação da consultora INNOTUR na execução de FAM Trips, marketing e produção de conteúdos vídeo.',
          icon: Layers,
        },
        {
          title: 'Dossier de Mercado',
          desc: 'Estruturação de preçários e logística para a contratação da entidade operadora centralizadora.',
          icon: CheckCircle,
        },
      ],
      quote:
        '"Um portefólio validado e pronto para o mercado, que posiciona Braga como um destino sustentável e inclusivo."',
      gallery: [
        'https://i.imgur.com/rKEHbnY.jpeg',
        'https://www.cm-braga.pt/archive/cache/img/sz800x600/CMB17012025SERGIOFREITAS3022624430274.jpg',
        'https://i.imgur.com/hDIq0Mw.jpeg',
        'https://i.imgur.com/xJSS7g7.jpeg',
        'https://i.imgur.com/ICKrhp6.jpeg',
      ],
    },
    'small-retail-braga': {
      watermark:
        'https://transition-pathways.europa.eu/sites/default/files/styles/time_dependent_full/public/discussion_form_post/2025-12/ECOSR%20-%20Thumbnail_0.jpg?itok=1-QARVo7',
      tag: 'Candidaturas Europeias // 2026',
      headerTitle: 'Braga: European Capital of Small Retail',
      hero: (
        <>
          Small <br />
          <span className="text-blue-600 italic">Retail.</span>
        </>
      ),
      description: (
        <>
          Liderança técnica e editorial na construção da{' '}
          <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8">
            estratégia europeia de Braga
          </span>{' '}
          para o comércio de proximidade, unindo sustentabilidade, digitalização
          e coesão social.
        </>
      ),
      link: 'https://transition-pathways.europa.eu/retail/events/european-capitals-small-retail-awards-ceremony-2026',
      labelLink: 'Official Event Page',
      pillarTabLabel: 'Eixos da Candidatura',
      pillarTitle: 'Pilares de Desenvolvimento Urbano',
      pillarDesc:
        'A candidatura foi estruturada em quatro grandes vetores que alinham o ecossistema comercial de Braga com as prioridades da Comissão Europeia.',
      pillars: [
        {
          title: 'Digitalização & Inovação',
          desc: 'Desenvolvimento do modelo de Distrito Comercial Digital e capacitação tecnológica dos pequenos comerciantes.',
          icon: Smartphone,
        },
        {
          title: 'Sustentabilidade Verde',
          desc: 'Integração de logística urbana partilhada, pedonalização e economia circular no centro histórico.',
          icon: Globe,
        },
        {
          title: 'Inclusão & Sociedade',
          desc: 'Valorização do património vivo através das Lojas com História e programas de governança participativa.',
          icon: Users,
        },
        {
          title: 'Robustez Estratégica',
          desc: 'Tratamento de dados económicos, indicadores de impacto e redação técnica do dossier em inglês institucional.',
          icon: FileText,
        },
      ],
      quote:
        '"Transformar Braga num laboratório europeu de comércio de proximidade, colocando as pessoas no centro da inovação económica."',
      gallery: [
        'https://transition-pathways.europa.eu/sites/default/files/styles/time_dependent_full/public/discussion_form_post/2025-12/ECOSR%20-%20Thumbnail_0.jpg?itok=1-QARVo7',
        'https://i.imgur.com/GBs8DY7.jpeg', // Mantendo consistência com o estilo de candidaturas europeias que já usas
      ],
    },
    'music-cities-awards': {
      watermark:
        'https://static.wixstatic.com/media/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg/v1/fill/w_719,h_719,q_90,enc_avif,quality_auto/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg',
      tag: 'International Awards // Arkansas 2025',
      headerTitle: 'Music Cities Awards: Braga After Dark',
      hero: (
        <>
          Music <br />
          <span className="text-purple-600 italic">Cities.</span>
        </>
      ),
      description: (
        <>
          Redação estratégica e submissão da candidatura de Braga aos{' '}
          <span className="text-white font-bold italic underline decoration-purple-500 underline-offset-8">
            Music Cities Awards
          </span>
          . Um exercício de storytelling institucional que levou a estratégia de
          economia noturna de Braga ao palco mundial em{' '}
          <span className="text-white font-bold">Arkansas, EUA</span>.
        </>
      ),
      link: 'https://www.musiccitiesevents.com/2025-nominees?pgid=mbys9xbd1-c14d419a-28c9-44cd-af38-31558691727d',
      labelLink: 'Official Nominees Page',
      pillarTabLabel: 'Processo Criativo',
      pillarTitle: 'Estratégia de Candidatura',
      pillarDesc:
        'O desafio foi sintetizar a vitalidade de Braga numa proposta competitiva para um júri internacional, culminando na representação da cidade nos Estados Unidos.',
      pillars: [
        {
          title: 'Impacto Transatlântico',
          desc: 'Adaptação da narrativa urbana para o contexto global, assegurando a presença de Braga na cerimónia em Arkansas.',
          icon: Globe,
        },
        {
          title: 'Storytelling Urbano',
          desc: 'Construção de uma narrativa de 500 palavras que funde o património romano com a vitalidade jovem da cidade.',
          icon: FileText,
        },
        {
          title: 'Visão de Futuro',
          desc: 'Desenvolvimento de planos de curto e longo prazo para a institucionalização de políticas de "Night Economy".',
          icon: Zap,
        },
        {
          title: 'Pitch & Discurso',
          desc: 'Preparação do discurso de aceitação bilingue (PT/EN) orientado para o júri e audiência internacional.',
          icon: Cpu,
        },
      ],
      quote:
        '"Braga After Dark: elevando a economia noturna da cidade mais antiga de Portugal ao reconhecimento global no Arkansas."',
      gallery: [
        'https://static.wixstatic.com/media/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg/v1/fill/w_719,h_719,q_90,enc_avif,quality_auto/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg',
      ],
    },
    'systemeu-salamanca': {
      watermark: 'https://i.imgur.com/SeyCGBk.png',
      tag: 'SystemEU Project // Salamanca 2025',
      headerTitle: 'Startup OLÉ & SystemEU Summit',
      hero: (
        <>
          SystemEU <br />
          <span className="text-blue-600 italic">Summit.</span>
        </>
      ),
      description: (
        <>
          Representação institucional do{' '}
          <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8">
            Município de Braga
          </span>{' '}
          em Salamanca, no maior palco de inovação e transferência de tecnologia
          entre ecossistemas europeus.
        </>
      ),
      link: 'https://startupole.eu/',
      labelLink: 'Startup OLÉ Official',
      pillarTabLabel: 'Atuação Internacional',
      pillarTitle: 'Diplomacia de Inovação',
      pillarDesc:
        'A participação no SystemEU Summit visou consolidar Braga como um hub de referência na inovação sistémica e no apoio ao empreendedorismo tecnológico.',
      pillars: [
        {
          title: 'Networking Estratégico',
          desc: 'Estabelecimento de ligações diretas com universidades, centros de investigação e redes europeias de inovação.',
          icon: Globe,
        },
        {
          title: 'Posicionamento Urbano',
          desc: 'Promoção do papel do Município e da Startup Braga como motores de desenvolvimento regional integrado.',
          icon: Cpu,
        },
        {
          title: 'Sinergias Europeias',
          desc: 'Identificação de oportunidades em inovação urbana e sustentabilidade tecnológica para o ecossistema local.',
          icon: Zap,
        },
        {
          title: 'Colaboração Inter-regional',
          desc: 'Reforço da cooperação entre ecossistemas regionais de inovação para uma Europa mais integrada.',
          icon: Users,
        },
      ],
      quote:
        '"Consolidar Braga no ecossistema europeu de inovação, transformando parcerias internacionais em impacto local."',
      gallery: [
        'https://i.imgur.com/SeyCGBk.png',
        'https://i.imgur.com/hijBkTd.png',
        'https://i.imgur.com/CXrcrml.png',
        'https://i.imgur.com/EgopK0E.png',
        'https://i.imgur.com/pd98syS.png',
        'https://i.imgur.com/qjchZu3.png',
      ],
    },
  };

  const current = projectConfig[projectType] || projectConfig['smart-tourism'];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveTab('overview');
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-12 overflow-hidden font-sans animate-in fade-in duration-500">
      {/* Backdrop: Suave e leitoso em vez de escuro */}
      <div
        className="absolute inset-0 bg-slate-100/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Main Container: Branco puro, escala contida e sombras leves */}
      <div className="relative w-full max-w-5xl h-full md:h-[85vh] bg-white md:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header: Compacto e Clean */}
        <header className="relative flex items-center justify-between px-8 py-6 z-50 border-b border-slate-100">
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1 h-1 bg-blue-600 rounded-full" />
                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.3em]">
                  {current.tag}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-serif font-black text-slate-900 tracking-tight uppercase italic leading-none">
                {current.headerTitle}
              </h2>
            </div>

            <nav className="hidden lg:flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-200">
              <NavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={Target} label="Conceito" />
              <NavButton active={activeTab === 'pillars'} onClick={() => setActiveTab('pillars')} icon={Layers} label={current.pillarTabLabel} />
              <NavButton active={activeTab === 'media'} onClick={() => setActiveTab('media')} icon={PlayCircle} label="Visuals" />
            </nav>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 group"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          </button>
        </header>

        {/* Main Content: Respiro e tipografia elegante */}
        <main className="relative flex-1 overflow-y-auto z-10 px-8 md:px-16 py-10 custom-scrollbar-light scroll-smooth bg-white">
          {activeTab === 'overview' && (
            <div className="pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-16 mt-4">
                <h1 className="text-[40px] md:text-[64px] leading-[0.9] font-serif font-black text-slate-900 tracking-tighter uppercase mb-10 italic">
                  {current.hero}
                </h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div className="lg:col-span-7">
                    <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed font-serif italic border-l-2 border-blue-500/20 pl-6">
                      {current.description}
                    </p>
                  </div>
                  <div className="lg:col-span-5">
                     <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] transition-all duration-500">
                        <Quote className="w-6 h-6 text-blue-400/40 mb-4" />
                        <p className="text-lg font-serif italic text-slate-800 font-medium leading-snug">
                          {current.quote}
                        </p>
                     </div>
                  </div>
                </div>
              </div>

              {/* Grid de Métricas: Reduzido */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SummaryCard icon={Search} title="Curadoria" desc="Filtragem estratégica de ativos territoriais." />
                <SummaryCard icon={Globe} title="Global" desc="Posicionamento alinhado com standards mundiais." />
                <div className="p-8 border border-slate-100 rounded-3xl flex flex-col justify-center items-center bg-blue-50/30 text-center">
                   <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em]">Consultoria Estratégica</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pillars' && (
            <div className="pb-20 animate-in fade-in slide-in-from-right-4 duration-500 pt-4">
              <div className="max-w-2xl mb-12">
                <h3 className="text-3xl font-serif font-black text-slate-900 italic mb-4 uppercase tracking-tighter">
                  {current.pillarTitle}
                </h3>
                <p className="text-lg text-slate-500 font-light leading-relaxed">
                  {current.pillarDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {current.pillars.map((item: any, i: number) => (
                    <div key={i} className="group flex items-start gap-6 p-8 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all duration-300">
                      <div className="flex-1">
                        <span className="text-[9px] font-black text-blue-500 mb-1 block">0{i + 1}</span>
                        <h4 className="text-lg font-serif font-black text-slate-900 uppercase italic tracking-tight">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                          {item.desc || (item.items && item.items.join(' • '))}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                        <item.icon size={18} />
                      </div>
                    </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="pb-20 animate-in fade-in zoom-in-95 duration-500 pt-4">
                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                  {current.gallery?.map((img: string, idx: number) => (
                    <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                      <img
                        src={img}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                        alt=""
                      />
                    </div>
                  ))}
                </div>
                {current.videoEmbed && (
                   <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-black">
                      {current.videoEmbed}
                   </div>
                )}
            </div>
          )}
        </main>

        {/* Footer: Compacto e Editorial */}
        <footer className="relative px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center z-50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-serif font-bold italic text-sm">
              HB
            </div>
            <div className="flex flex-col">
              <span className="text-[7px] font-black text-blue-600 uppercase tracking-[0.4em]">Strategy</span>
              <h3 className="text-sm font-serif font-black text-slate-900 uppercase italic tracking-widest leading-none">
                Hugo Barros
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {current.link && (
              <button
                onClick={() => window.open(current.link, '_blank')}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-[9px] font-black uppercase tracking-widest">
                  {current.labelLink}
                </span>
                <ArrowUpRight size={12} />
              </button>
            )}
            
            <div className="flex gap-1 border-l border-slate-200 pl-3">
              {[
                { link: current.linkEN, label: 'EN' },
                { link: current.linkES, label: 'ES' }
              ].map((item, i) => item.link && (
                <button
                  key={i}
                  onClick={() => window.open(item.link, '_blank')}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 text-[8px] font-black"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function NavButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
        active
          ? 'bg-white text-blue-600 shadow-sm'
          : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      <Icon size={12} />
      {label}
    </button>
  );
}

function SummaryCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white transition-all duration-300">
      <Icon className="w-4 h-4 text-blue-500 mb-3" />
      <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
        {title}
      </h4>
      <p className="text-slate-600 text-sm font-serif italic leading-snug">
        {desc}
      </p>
    </div>
  );
}