'use client';
import {
  X, Target, Globe, Smartphone, Sparkles, CheckCircle, Briefcase,
  LineChart, Compass, QrCode, FileText, PlayCircle, Layers, Zap,
  Cpu, BarChart3, Search, Map, Quote, Calendar, Users, ArrowRight, Languages, FileDown
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

  const current = projectConfig[projectType];

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
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-0 md:p-8 overflow-hidden font-sans animate-in fade-in duration-700">
      {/* Backdrop: Gradiente profundo para isolar o conteúdo */}
      <div
        className="absolute inset-0 bg-[#020617]/98 backdrop-blur-3xl"
        onClick={onClose}
      />

      {/* Main Container: Look de "Canvas" editorial */}
      <div className="relative w-full max-w-[1750px] h-full md:h-[92vh] bg-[#020617] md:rounded-[3rem] shadow-[0_0_120px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden border border-white/5">
        
        {/* Watermark: Animada e sutil */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <img
            src={current.watermark}
            className="w-full h-full object-cover scale-110 animate-slow-zoom blur-[1px]"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
        </div>

        {/* Header: Flutuante e Minimalista */}
        <header className="relative flex items-center justify-between px-10 md:px-20 py-12 z-50">
          <div className="flex items-center gap-20">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_12px_#3b82f6]" />
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">
                  {current.tag}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-black text-white/90 tracking-tight uppercase italic leading-none">
                {current.headerTitle}
              </h2>
            </div>

            <nav className="hidden xl:flex items-center gap-2 bg-white/[0.02] p-1.5 rounded-2xl border border-white/5 backdrop-blur-2xl">
              <NavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={Target} label="Conceito" />
              <NavButton active={activeTab === 'pillars'} onClick={() => setActiveTab('pillars')} icon={Layers} label={current.pillarTabLabel} />
              <NavButton active={activeTab === 'media'} onClick={() => setActiveTab('media')} icon={PlayCircle} label="Visuals" />
            </nav>
          </div>

          <button
            onClick={onClose}
            className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-500 group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>
        </header>

        {/* Main Content: Custom scrollbar integrada */}
        <main className="relative flex-1 overflow-y-auto z-10 px-10 md:px-20 custom-scrollbar scroll-smooth">
          {activeTab === 'overview' && (
            <div className="pb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="mb-28 mt-8">
                {/* Hero Typo: Proporções áureas */}
                <h1 className="text-[70px] md:text-[140px] leading-[0.75] font-serif font-black text-white tracking-tighter uppercase mb-20 italic">
                  {current.hero}
                </h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  <div className="lg:col-span-7">
                    <div className="relative">
                      <div className="absolute -left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-transparent opacity-50" />
                      <p className="text-3xl md:text-5xl text-slate-100 font-light leading-[1.3] tracking-tight font-serif italic">
                        {current.description}
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                     <div className="p-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3.5rem] shadow-3xl shadow-blue-900/20 -rotate-1 hover:rotate-0 transition-all duration-700">
                        <Quote className="w-10 h-10 text-white/30 mb-6" />
                        <p className="text-2xl md:text-3xl font-serif italic text-white font-bold leading-tight tracking-tight">
                          {current.quote}
                        </p>
                     </div>
                  </div>
                </div>
              </div>

              {/* Grid de Métricas: Design ultra-clean */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <SummaryCard icon={Search} title="Curadoria" desc="Filtragem estratégica de ativos para maximizar a autenticidade do destino." />
                <SummaryCard icon={Globe} title="Global" desc="Posicionamento de marca alinhado com standards internacionais de excelência." />
                <div className="p-12 border border-white/5 rounded-[3.5rem] flex flex-col justify-center items-center bg-white/[0.01] text-center group hover:bg-white/[0.03] transition-all">
                   <div className="w-2 h-2 bg-blue-500 rounded-full mb-4 animate-pulse" />
                   <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.6em]">Consultoria Estratégica</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pillars' && (
            <div className="pb-32 animate-in fade-in slide-in-from-right-8 duration-700 pt-8">
              <div className="max-w-4xl mb-24">
                <h3 className="text-6xl font-serif font-black text-white italic mb-8 uppercase tracking-tighter">
                  {current.pillarTitle}
                </h3>
                <p className="text-2xl text-slate-400 font-light leading-relaxed">
                  {current.pillarDesc}
                </p>
              </div>

              <div className={isVisitBraga ? 'grid grid-cols-1 md:grid-cols-2 gap-10' : 'grid grid-cols-1 gap-6'}>
                {current.pillars.map((item: any, i: number) => (
                    <div key={i} className="group flex items-center gap-12 p-12 bg-white/[0.01] border border-white/5 rounded-[4rem] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-blue-500 mb-2">0{i + 1}</span>
                        <div className="w-0.5 h-12 bg-gradient-to-b from-blue-500 to-transparent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-3xl font-serif font-black text-white uppercase italic tracking-tight group-hover:text-blue-500 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-slate-400 mt-3 text-xl font-light leading-relaxed max-w-3xl">
                          {item.desc || (item.items && item.items.join(' • '))}
                        </p>
                      </div>
                      <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center group-hover:bg-blue-600 group-hover:rotate-6 transition-all duration-500">
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="pb-32 animate-in fade-in zoom-in-95 duration-700 pt-10">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                  {current.gallery?.map((img: string, idx: number) => (
                    <div key={idx} className="relative rounded-[2.5rem] overflow-hidden border border-white/5 group bg-slate-950 shadow-2xl">
                      <img
                        src={img}
                        className="w-full h-auto object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s]"
                        alt=""
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-10 flex items-end">
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Asset Ref. 0{idx+1}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {current.videoEmbed && (
                   <div className="mt-12 rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl bg-black">
                      {current.videoEmbed}
                   </div>
                )}
            </div>
          )}
        </main>

        {/* Footer: Minimalista e Editorial */}
        <footer className="relative px-10 md:px-20 py-8 bg-[#020617] border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center z-50 gap-6">
          <div className="flex items-center gap-6">
            {/* Logo simplificado e menor */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent flex items-center justify-center border border-white/10 shadow-sm">
              <span className="text-white/80 font-serif font-bold text-lg italic tracking-tighter">HB</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-blue-500/60 uppercase tracking-[0.8em] mb-0.5">
                Strategy & Design
              </span>
              <h3 className="text-xl font-serif font-black text-white/40 uppercase italic tracking-widest leading-none">
                Hugo Barros
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Botão Principal mais fino e elegante */}
            {current.link && (
              <button
                onClick={() => window.open(current.link, '_blank')}
                className="group px-6 py-3.5 bg-white/[0.03] hover:bg-white text-white/50 hover:text-black border border-white/5 rounded-xl transition-all duration-500 ease-out"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">
                    {current.labelLink}
                  </span>
                  <FileDown className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </div>
              </button>
            )}

            {/* Divisor subtil entre o botão principal e os idiomas */}
            <div className="h-4 w-[1px] bg-white/10 mx-2 hidden md:block" />

            {/* Idiomas em estilo ultra-minimalista */}
            <div className="flex gap-1.5">
              {[
                { link: current.linkEN, label: 'EN' },
                { link: current.linkES, label: 'ES' },
                { link: current.linkFR, label: 'FR' },
                { link: current.linkLowCost, label: 'LC' }
              ].map((item, i) => item.link && (
                <button
                  key={i}
                  onClick={() => window.open(item.link, '_blank')}
                  className="w-10 h-10 flex items-center justify-center bg-transparent text-white/20 border border-transparent hover:border-white/10 hover:text-white rounded-lg transition-all duration-300"
                >
                  <span className="text-[8px] font-black tracking-tighter">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </footer>
        </div>
    </div>
  );
}

// --- SUB-COMPONENTES REFINADOS (O QUE FALTA NO TEU CÓDIGO) ---

function NavButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
        active
          ? 'bg-blue-600 text-white shadow-[0_10px_25px_rgba(37,99,235,0.4)] scale-105'
          : 'text-white/40 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

function SummaryCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[3.5rem] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-700 group">
      <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-blue-600 transition-all duration-500 group-hover:rotate-6">
        <Icon className="w-8 h-8 text-blue-500 group-hover:text-white transition-colors" />
      </div>
      <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] mb-4">
        {title}
      </h4>
      <p className="text-slate-300 text-xl font-light leading-relaxed font-serif italic">
        {desc}
      </p>
    </div>
  );
}