'use client';
import {
  X,
  ChevronRight,
  Target,
  Globe,
  Smartphone,
  Sparkles,
  CheckCircle,
  Briefcase,
  LineChart,
  Compass,
  QrCode,
  FileText,
  ArrowUpRight,
  PlayCircle,
  Layers,
  Zap,
  Cpu,
  BarChart3,
  Search,
  Map,
  Calendar,
  Users,
  Languages,
  ExternalLink,
  FileDown,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  projectType?:
    | 'smart-tourism'
    | 'visit-braga'
    | 'braga-after-dark'
    | 'cidade-bracvs'
    | 'roteiro-3-dias';
}

export default function ChapterOverlay({
  isOpen,
  onClose,
  projectType = 'smart-tourism',
}: OverlayProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'pillars' | 'media'>(
    'overview'
  );

  const isVisitBraga = projectType === 'visit-braga';

  const projectConfig = {
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
      tag: 'Candidaturas // 2026',
      headerTitle: 'Candidatura a European Capital of Smart Tourism',
      hero: (
        <>
          Smart <br />
          <span className="text-blue-600 italic">Tourism.</span>
        </>
      ),
      description: (
        <>
          Liderança técnica no desenho da estratégia e{' '}
          <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8">
            defesa institucional em Bruxelas
          </span>{' '}
          que garantiu a integração de Braga na prestigiada Rede Europeia de
          Smart Tourism.
        </>
      ),
      pillarTabLabel: 'Eixos Estratégicos',
      pillarTitle: 'Eixos Fundamentais da Candidatura',
      pillarDesc:
        'A defesa em Bruxelas baseou-se nos quatro pilares obrigatórios da Comissão Europeia para a excelência turística.',
      pillars: [
        {
          title: 'Acessibilidade',
          desc: 'Garantir que a cidade e os seus serviços digitais são inclusivos para todos.',
          icon: Smartphone,
        },
        {
          title: 'Sustentabilidade',
          desc: 'Gestão de fluxos turísticos e preservação de recursos locais.',
          icon: Globe,
        },
        {
          title: 'Digitalização',
          desc: 'Uso de tecnologia para melhorar a experiência do turista e a gestão do destino.',
          icon: Zap,
        },
        {
          title: 'Herança Cultural',
          desc: 'Promoção do património material e imaterial através de meios inovadores.',
          icon: Sparkles,
        },
      ],
      quote:
        '"Acompanhamento técnico desde a fundação dos dados até à integração na Rede Europeia."',
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
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-0 md:p-6 overflow-hidden font-sans">
      <div
        className="absolute inset-0 bg-[#020617]/98 backdrop-blur-3xl"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[1800px] h-full md:h-[92vh] bg-[#020617] md:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden border border-white/5">
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
          <img
            src={current.watermark}
            className="w-full h-full object-cover saturate-0"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
        </div>

        <header className="relative flex items-center justify-between px-12 py-10 z-50">
          <div className="flex items-center gap-12">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">
                  {current.tag}
                </span>
              </div>
              <h2 className="text-2xl font-serif font-black text-white tracking-tighter uppercase italic">
                {current.headerTitle}
              </h2>
            </div>

            <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-2xl">
              <NavButton
                active={activeTab === 'overview'}
                onClick={() => setActiveTab('overview')}
                icon={Target}
                label="Sumário"
              />
              <NavButton
                active={activeTab === 'pillars'}
                onClick={() => setActiveTab('pillars')}
                icon={Layers}
                label={current.pillarTabLabel}
              />
              <NavButton
                active={activeTab === 'media'}
                onClick={() => setActiveTab('media')}
                icon={PlayCircle}
                label="Media"
              />
            </nav>
          </div>

          <button
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-500/20 transition-all group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>
        </header>

        <main className="relative flex-1 overflow-y-auto z-10 px-12 custom-scrollbar">
          {activeTab === 'overview' && (
            <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="max-w-5xl mb-24 mt-10">
                <h1 className="text-[140px] leading-[0.75] font-serif font-black text-white tracking-tighter uppercase mt-6">
                  {current.hero}
                </h1>
                <p className="text-3xl text-slate-300 font-light leading-relaxed max-w-3xl border-l-4 border-blue-600 pl-10 mt-12">
                  {current.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SummaryCard
                    icon={Search}
                    title="Curadoria"
                    desc="Seleção criteriosa de espaços e momentos que definem a identidade da cidade."
                  />
                  <SummaryCard
                    icon={Globe}
                    title="Impacto"
                    desc="Estratégia alinhada com as melhores práticas europeias de gestão turística."
                  />
                </div>
                <div className="lg:col-span-4 p-12 bg-blue-600 rounded-[3.5rem] flex items-center">
                  <p className="text-3xl font-serif italic text-white font-black leading-tight uppercase">
                    {current.quote}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pillars' && (
            <div className="pb-20 animate-in fade-in slide-in-from-right-12 duration-700">
              <div className="max-w-4xl mb-16 mt-6">
                <h3 className="text-4xl font-serif font-black text-white italic mb-6 uppercase">
                  {current.pillarTitle}
                </h3>
                <p className="text-xl text-slate-400 leading-relaxed border-l-2 border-blue-600 pl-8">
                  {current.pillarDesc}
                </p>
              </div>

              <div
                className={
                  isVisitBraga
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-8'
                    : 'flex flex-col gap-6'
                }
              >
                {current.pillars.map((item: any, i: number) =>
                  isVisitBraga ? (
                    <HorizontalPillarCard
                      key={i}
                      icon={item.icon}
                      title={item.title}
                      items={item.items}
                    />
                  ) : (
                    <div
                      key={i}
                      className="flex items-center gap-10 p-10 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-5xl font-serif font-black text-blue-600/30 group-hover:text-blue-500 transition-colors">
                        0{i + 1}
                      </span>
                      <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center">
                        <item.icon className="w-8 h-8 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-serif font-black text-white uppercase italic tracking-tight">
                          {item.title}
                        </h4>
                        <p className="text-slate-400 mt-1 max-w-2xl text-lg">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="pb-20 animate-in fade-in slide-in-from-right-12 duration-700">
              <div className="max-w-[1400px] mx-auto mt-10">
                {/* Renderização condicional para incluir o VideoEmbed do roteiro de 3 dias */}
                {current.videoEmbed ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-4 max-w-[400px] mx-auto w-full">
                      <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
                        {current.videoEmbed}
                      </div>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {current.gallery?.map((img: string, idx: number) => (
                        <div
                          key={idx}
                          className="group relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5"
                        >
                          <img
                            src={img}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : isVisitBraga && current.videoUrl ? (
                  <div className="rounded-[2.5rem] overflow-hidden border border-white/10 aspect-video relative bg-black shadow-2xl">
                    <iframe
                      src={current.videoUrl}
                      className="absolute inset-0 w-full h-full border-none"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {current.gallery?.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5"
                      >
                        <img
                          src={img}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          alt=""
                        />
                        <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        <footer className="relative px-12 py-10 bg-[#020617] border-t border-white/5 flex justify-between items-center z-50">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center border border-white/20">
              <span className="text-white font-serif font-black text-2xl italic">
                HB
              </span>
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-1">
                Consultoria Estratégica
              </p>
              <h3 className="text-2xl font-serif font-black text-white uppercase italic tracking-tighter">
                Hugo Barros
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Botão PT (Destaque) */}
            {current.link && (
              <button
                onClick={() => window.open(current.link, '_blank')}
                className="group relative px-8 py-5 bg-white text-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="relative flex items-center gap-3 group-hover:text-white transition-colors">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                    {current.labelLink}
                  </span>
                  <FileDown className="w-4 h-4" />
                </div>
              </button>
            )}

            {/* Botões Secundários (EN, ES, FR e Simplificado) */}
            {[
              { link: current.linkEN, label: current.labelLinkEN },
              { link: current.linkES, label: current.labelLinkES },
              { link: current.linkFR, label: current.labelLinkFR },
              { link: current.linkLowCost, label: current.labelLowCost },
            ].map(
              (item, index) =>
                item.link && (
                  <button
                    key={index}
                    onClick={() => window.open(item.link, '_blank')}
                    className="group relative px-8 py-5 bg-white/5 text-white border border-white/10 rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl"
                  >
                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <div className="relative flex items-center gap-3 group-hover:text-white transition-colors">
                      <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                        {item.label}
                      </span>
                      <FileDown className="w-4 h-4" />
                    </div>
                  </button>
                )
            )}
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
      className={`flex items-center gap-3 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
        active
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-slate-400 hover:text-white'
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

function SummaryCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="p-12 bg-white/[0.03] border border-white/5 rounded-[3.5rem] hover:bg-white/[0.05] transition-all group">
      <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4">
        {title}
      </h4>
      <p className="text-slate-400 text-base leading-relaxed">{desc}</p>
    </div>
  );
}

function HorizontalPillarCard({ icon: Icon, title, items }: any) {
  return (
    <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] transition-all group hover:bg-white/[0.04]">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h4 className="text-xl font-serif font-black text-white uppercase italic tracking-tight">
          {title}
        </h4>
      </div>
      <ul className="grid grid-cols-1 gap-3">
        {items.map((item: string, idx: number) => (
          <li
            key={idx}
            className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest"
          >
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
