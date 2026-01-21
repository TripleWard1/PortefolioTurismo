'use client';
import {
  X, Target, Globe, Smartphone, Sparkles, CheckCircle, Briefcase,
  LineChart, Compass, QrCode, ShieldCheck, FileText, PlayCircle, Layers, Zap,
  Cpu, BarChart3, Monitor, Maximize2, Hexagon, Fingerprint, TrendingUp, Award, Search, Map, Quote, Calendar, ArrowUpRight,Users, ArrowRight, Languages, FileDown
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

 // Garantia de que o objeto existe para não quebrar o render
 const current = projectConfig?.[projectType] || projectConfig?.['smart-tourism'] || {};

 useEffect(() => {
   if (isOpen) {
     document.body.style.overflow = 'hidden';
     setActiveTab('overview');
   } else {
     document.body.style.overflow = 'unset';
   }
 }, [isOpen]);

 if (!isOpen || !current) return null;

 // Função segura para renderizar o Hero com efeito de cor alternada
 const renderHero = () => {
   const text = current.hero || "Project Overview";
   if (typeof text !== 'string') return text;
   
   return text.split(" ").map((word: string, i: number) => (
     <span key={i} className={i % 2 !== 0 ? "text-blue-600 block" : "block"}>
       {word}
     </span>
   ));
 };

 return (
   <div className="fixed inset-0 z-[600] flex items-center justify-center overflow-hidden animate-in fade-in duration-700 font-sans">
     
     {/* 1. BACKGROUND: Slate Ultra-Dark */}
     <div className="absolute inset-0 bg-slate-950 z-0" />
     
     {/* 2. EFEITOS DE LUZ: Glow Blue Neon */}
     <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full z-[1]" />
     <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full z-[1]" />

     <div className="relative w-full h-full flex flex-col z-10 text-white overflow-hidden">
       
       {/* HEADER: Floating Glassmorphism */}
       <header className="flex items-center justify-between px-8 md:px-16 py-10 z-[100]">
         <div className="flex flex-col">
           <div className="flex items-center gap-3 mb-2">
             <span className="w-8 h-[1px] bg-blue-600" />
             <span className="text-blue-500 font-black text-[10px] tracking-[0.5em] uppercase">
               Confidential // Archive 2026
             </span>
           </div>
           <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">
             {current.headerTitle || 'Project Details'}
           </h2>
         </div>

         <div className="flex items-center gap-12">
           <nav className="hidden lg:flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
             {[
               { id: 'overview', label: 'Concept' },
               { id: 'pillars', label: current.pillarTabLabel || 'Strategy' },
               { id: 'media', label: 'Visuals' }
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-full ${
                   activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white'
                 }`}
               >
                 {tab.label}
               </button>
             ))}
           </nav>

           <button
             onClick={onClose}
             className="group w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"
           >
             <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
           </button>
         </div>
       </header>

       {/* MAIN CONTENT */}
       <main className="flex-1 overflow-y-auto px-8 md:px-20 py-10 custom-scrollbar-dark">
         
         {activeTab === 'overview' && (
           <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
             
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
               {/* Lado Esquerdo: Tipografia Brutalista */}
               <div className="lg:col-span-8 flex flex-col gap-12">
                 <h1 className="text-7xl md:text-[130px] font-black uppercase italic leading-[0.8] tracking-tighter">
                   {renderHero()}
                 </h1>
                 
                 <div className="relative p-1 border-l-4 border-blue-600 pl-10">
                   <p className="text-2xl md:text-4xl text-white/80 font-light leading-snug italic max-w-3xl">
                     {current.description}
                   </p>
                 </div>
               </div>

               {/* Lado Direito: Citação com Profundidade */}
               <div className="lg:col-span-4 relative group">
                 <div className="absolute inset-0 bg-blue-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                 <div className="relative p-12 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-sm overflow-hidden">
                   <Quote className="text-blue-600 w-16 h-16 mb-8 opacity-40" />
                   <p className="text-2xl md:text-3xl font-black italic tracking-tight leading-tight mb-10">
                     "{current.quote}"
                   </p>
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-black italic text-xs">HB</div>
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Strategic Direction</span>
                   </div>
                 </div>
               </div>
             </div>

             {/* Grid de Features (Substituindo KPIs) */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <FeatureCard icon={Monitor} title="User Experience" label="Optimized Flow" />
                <FeatureCard icon={Cpu} title="Architecture" label="Future-Proof Tech" />
                <FeatureCard icon={Zap} title="Performance" label="High Efficiency" />
             </div>
           </div>
         )}

         {activeTab === 'pillars' && (
           <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-right-10 duration-700">
              <div className="mb-24 flex flex-col gap-6">
                 <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-xs">Structural Pillars</span>
                 <h3 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter">{current.pillarTitle}</h3>
                 <p className="text-2xl text-white/50 font-light italic max-w-3xl leading-relaxed">{current.pillarDesc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {current.pillars?.map((item: any, i: number) => (
                   <div key={i} className="group p-12 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-blue-600 transition-all duration-500">
                     <div className="flex justify-between items-center mb-16">
                        <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center">
                           <item.icon size={28} className="text-white" />
                        </div>
                        <span className="text-6xl font-black opacity-5 group-hover:opacity-20 transition-opacity">0{i+1}</span>
                     </div>
                     <h4 className="text-3xl font-black uppercase italic mb-6 group-hover:translate-x-3 transition-transform">{item.title}</h4>
                     <p className="text-white/40 group-hover:text-white/90 text-lg font-light leading-relaxed">
                       {item.desc || (item.items && item.items.join(' • '))}
                     </p>
                   </div>
               ))}
              </div>
           </div>
         )}

         {activeTab === 'media' && (
           <div className="max-w-7xl mx-auto animate-in zoom-in-95 duration-700">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
                 {current.gallery?.map((img: string, idx: number) => (
                   <div key={idx} className="relative group overflow-hidden rounded-[3rem] border border-white/10 bg-white/5">
                     <img src={img} className="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt="" />
                     <div className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <Maximize2 className="text-white w-10 h-10 translate-y-4 group-hover:translate-y-0 transition-transform" />
                     </div>
                   </div>
                 ))}
              </div>
           </div>
         )}
       </main>

       {/* FOOTER: Black Edition */}
       <footer className="px-8 md:px-16 py-12 bg-black border-t border-white/5 flex flex-col md:flex-row items-center justify-between z-[200] gap-10">
          <div className="flex items-center gap-8">
             <div className="text-5xl font-black italic tracking-tighter text-blue-600">HB</div>
             <div className="flex flex-col">
               <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-1">Elite Case Study</span>
               <span className="text-lg font-bold text-white uppercase italic tracking-widest">Hugo Barros // © 2026</span>
             </div>
          </div>
          
          <div className="flex items-center gap-6">
            {current.link && (
              <button 
                onClick={() => window.open(current.link, '_blank')}
                className="px-12 py-6 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all flex items-center gap-4 rounded-xl active:scale-95"
              >
                Review Full Case <ArrowUpRight size={18} />
              </button>
            )}
          </div>
       </footer>
     </div>
   </div>
 );
}

// Sub-componente de Feature para evitar repetição
function FeatureCard({ icon: Icon, title, label }: any) {
 return (
   <div className="p-10 bg-white/5 border border-white/10 rounded-[2rem] flex items-center gap-8 hover:bg-white/10 transition-colors group">
     <div className="w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
       <Icon size={24} />
     </div>
     <div className="flex flex-col">
       <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{label}</span>
       <h5 className="text-xl font-black uppercase italic tracking-tight">{title}</h5>
     </div>
   </div>
 );
}