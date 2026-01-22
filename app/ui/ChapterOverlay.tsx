'use client';
import {
  X, Target, Smartphone, CheckCircle, Briefcase,
  LineChart, Compass, Globe, Sparkles, Activity,ChevronRight, QrCode, ShieldCheck, FileText, PlayCircle, Layers, Zap,
  Cpu, BarChart3, Monitor, Maximize2, Hexagon, Fingerprint, TrendingUp, Award, Search, Map, Quote, Calendar, ArrowUpRight,Users, ArrowRight, Languages, FileDown
} from 'lucide-react';
import React, { useEffect, useState, isValidElement, ReactNode } from 'react';

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

  // --- NOVAS PROPRIEDADES ADICIONADAS PARA CORRIGIR O ERRO ---
  officialNetwork?: string;
  externalLink?: string;
  externalSource?: string;
  externalLinkLabel?: string;
  acreditacao?: string;
  hideMainBtn?: boolean;
  stats?: { label: string; value: string }[];
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isVisitBraga = projectType === 'visit-braga';

  // Adicionamos a tipagem : Record<string, ProjectData> aqui
  const projectConfig: Record<string, ProjectData> = {
// --- FIM DO BLOCO DE CORREÇÃO ---
'visit-braga': {
  watermark: 'https://images.unsplash.com/photo-1626202114254-47709a34938a?q=80&w=2000',
  tag: 'Gestão de Destino // 2024 — 2025',
  headerTitle: 'Portal Visit Braga: Estratégia Digital',
  
  officialNetwork: 'Município de Braga / InvestBraga',
  externalLink: 'https://visitbraga.travel',
  externalSource: 'VisitBraga.travel',
  externalLinkLabel: 'Explorar Portal',
  acreditacao: 'Marca Territorial: Visit Braga / Divisão de Economia e Turismo - Município de Braga',
  hideMainBtn: false, 
  link: 'https://visitbraga.travel',

  stats: [
    { label: "Promoção de Destino", value: "Estratégica" },
    { label: "Alcance do Mercado", value: "Internacional" },
    { label: "Hub de Informação", value: "Multicanal" }
],

  hero: (
    <div className="space-y-4">
      <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Lançamento 2025</span>
      <h1 className="text-6xl md:text-[96px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
        Visit <br />
        <span className="text-blue-600 font-serif">Braga.</span>
      </h1>
    </div>
  ),

  description: (
    <div className="space-y-6">
      <p>
        A colaboração no desenvolvimento do novo portal Visit Braga centrou-se na <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">reengenharia de conteúdos</span>, visando uma comunicação direta e eficiente com o turista moderno.
      </p>
      <p className="text-white/40 text-lg leading-relaxed">
        O foco principal foi a simplificação da jornada do utilizador (User Journey), transformando a vasta oferta cultural, histórica e comercial de Braga num ecossistema digital intuitivo. Este trabalho permitiu elevar o padrão de promoção do território, alinhando a presença online com o prestígio internacional crescente da cidade.
      </p>
    </div>
  ),

  pillarTabLabel: 'Estratégia de Promoção',
  pillarTitle: 'Pilares da Experiência Digital',
  pillarDesc: 'O novo portal foi estruturado para ser a porta de entrada principal da cidade, otimizando a forma como o destino comunica com o mundo.',
  
  pillars: [
    { 
      title: 'Promoção Global', 
      desc: 'Desenvolvimento de uma estratégia multilingue e SEO focada em captar o interesse de mercados emissores estratégicos para a região.', 
      icon: Globe 
    },
    { 
      title: 'Dinamização de Agenda', 
      desc: 'Implementação de sistemas de atualização em tempo real para eventos e notícias, garantindo que o visitante tenha sempre a informação mais recente.', 
      icon: Calendar 
    },
    { 
      title: 'Curadoria de Oferta', 
      desc: 'Criação de roteiros temáticos que ligam o património milenar à oferta hoteleira e comercial contemporânea de Braga.', 
      icon: Map 
    },
    { 
      title: 'Interface Inovadora', 
      desc: 'Foco total na experiência mobile e numa interface limpa, reduzindo a fricção entre a curiosidade do turista e a reserva do destino.', 
      icon: Sparkles 
    },
  ],

  quote: "Uma montra digital de excelência que reflete a ambição e a modernidade de Braga como destino europeu de referência.",
  
  gallery: [], 

  videoEmbed: (
    <div className="w-full max-w-5xl mx-auto animate-in zoom-in-95 duration-1000">
      <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-[2.5rem] border border-white/20 bg-black shadow-2xl">
        <iframe
          className="absolute inset-0 w-full h-full"
          allow="fullscreen; autoplay"
          allowFullScreen
          src="https://streamable.com/e/pmp04s"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  ),
},
    'smart-tourism': {
      watermark: 'https://i.imgur.com/GBs8DY7.jpeg',
      tag: 'European Shortlisted City // 2024 — 2026',
      headerTitle: 'European Capital of Smart Tourism',
      // Chaves para o Footer Dinâmico
      officialNetwork: 'European Capital of Smart Tourism Network',
  externalLink: 'https://smart-tourism-capital.ec.europa.eu/winners-and-finalists/cities-2026/braga-shortlisted-2026-european-capital-smart-tourism-competition_en',
  externalSource: 'Comissão Europeia',
  externalLinkLabel: 'Portal de Finalista 2026',
  acreditacao: 'European Commission Recognition / Smart Tourism Network', // Novo nome para Chancela
  hideMainBtn: true, // Adicionado para esconder o botão de "Documentação Integral" aqui
      
      hero: (
        <div className="space-y-4">
          <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full">Finalista Europeu</span>
          <h1 className="text-6xl md:text-[96px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            Shortlisted <br />
            <span className="text-blue-600">Smart Tourism</span>
          </h1>
        </div>
      ),
      description: (
        <div className="space-y-6">
          <p>
            A integração na equipa técnica responsável pela <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">defesa da candidatura em Bruxelas</span> marcou um ponto de viragem na estratégia turística da região. Este processo não foi apenas uma apresentação formal, mas um exame rigoroso de políticas públicas, inovação e sustentabilidade.
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            O culminar deste esforço resultou na seleção de Braga como uma das poucas finalistas europeias, garantindo um assento de destaque na prestigiada Rede Europeia de Destinos Inteligentes. Esta posição permite o intercâmbio direto de boas práticas com as cidades mais inovadoras do mundo, consolidando um ecossistema focado no visitante e no residente.
          </p>
        </div>
      ),
      pillarTabLabel: 'Eixos Estratégicos',
      pillarTitle: 'Missão em Bruxelas',
      pillarDesc: 'Um compromisso institucional que alinha a governança local com os mais altos padrões de excelência da União Europeia.',
      pillars: [
        { title: 'Defesa no Júri Europeu', desc: 'Representação institucional de alto nível e defesa técnica perante a Comissão Europeia e o Júri Internacional, focada na resiliência e inovação do destino.', icon: Globe },
        { title: 'Acesso à Rede Europeia', desc: 'Entrada direta num ecossistema de elite, promovendo o networking internacional e a visibilidade de Braga como referência em turismo sustentável.', icon: Compass },
        { title: 'Consolidação de Evidências', desc: 'Transformação de dados brutos e políticas municipais em casos de estudo de sucesso, reconhecidos pela sua capacidade de transferência para outras capitais.', icon: CheckCircle },
        { title: 'Diplomacia Urbana', desc: 'Articulação transversal entre stakeholders e a Smart Tourism Secretariat, alinhando a cidade com as prioridades da UE.', icon: Users },
      ],
      quote: "A distinção europeia valida a nossa infraestrutura; a nossa visão define o futuro dos destinos inteligentes.",
      gallery: [
        'https://i.imgur.com/1t5plh4.jpeg', 'https://i.imgur.com/cpFeHQk.jpeg',
        'https://i.imgur.com/HecgfPz.jpeg', 'https://i.imgur.com/GBs8DY7.jpeg',
        'https://i.imgur.com/AM6Z3uu.jpeg', 'https://i.imgur.com/FFH12zK.jpeg',
      ],
    },
    'cidade-bracvs': {
      watermark: 'https://visitbraga.travel/wp-content/uploads/2025/07/guia-infantil.jpg',
      tag: 'Educação & Património // 2024 — 2025',
      headerTitle: 'A Cidade do Bracvs: Roteiro Educativo',
      
      // Chaves para o Footer Dinâmico
      officialNetwork: 'Município de Braga // Divisão de Educação',
      externalLink: 'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-Infantil-CMB-Visit-Braga.pdf',
      externalSource: 'VisitBraga.travel',
      externalLinkLabel: 'Visualizar PDF Oficial',
      acreditacao: 'Divisão de Economia e Turismo - Municipio de Braga / LKCOM',
      hideMainBtn: false, 
      link: 'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-Infantil-CMB-Visit-Braga.pdf',
    
      // Métricas Institucionais Dinâmicas (Stats)
      stats: [
        { label: "Educação Patrimonial", value: "Novos Públicos" },
        { label: "Interpretação", value: "Lúdico-Pedagógica" },
        { label: "Valorização", value: "Identidade Local" }
      ],
    
      hero: (
        <div className="space-y-4">
          <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full">Publicação Editorial</span>
          <h1 className="text-6xl md:text-[96px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            Cidade do <br />
            <span className="text-blue-600">Bracvs.</span>
          </h1>
        </div>
      ),
    
      description: (
        <div className="space-y-6">
          <p>
            A conceção de conteúdos e revisão editorial desta <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">publicação lúdico-educativa</span> representou um desafio de tradução cultural para as novas gerações.
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            O projeto foca-se na aproximação das famílias ao património histórico de Braga através de uma narrativa envolvente. O meu papel foi transversal: desde a definição da estrutura narrativa e seleção de pontos de interesse, até à validação final de produção e maquetagem, garantindo que o rigor histórico coexistisse com uma linguagem acessível e dinâmica.
          </p>
        </div>
      ),
    
      pillarTabLabel: 'Contributos Técnicos',
      pillarTitle: 'Eixos de Intervenção',
      pillarDesc: 'O meu papel foi transversal, garantindo a coesão entre a narrativa histórica, a pedagogia infantil e o design editorial.',
      
      pillars: [
        { 
          title: 'Conceção de Conteúdos', 
          desc: 'Definição da estrutura narrativa, seleção estratégica de pontos de interesse e criação de mecânicas de jogos interativos.', 
          icon: Map 
        },
        { 
          title: 'Revisão Editorial', 
          desc: 'Adaptação de linguagem para o público infantojuvenil com validação rigorosa de dados históricos e arqueológicos.', 
          icon: Search 
        },
        { 
          title: 'Coordenação Criativa', 
          desc: 'Articulação entre os departamentos de Turismo, Educação e Design para assegurar a coerência visual e textual da obra.', 
          icon: Layers 
        },
        { 
          title: 'Estratégia de Família', 
          desc: 'Enquadramento do roteiro no contexto de turismo criativo, reforçando a oferta de lazer educativo da cidade.', 
          icon: Users 
        },
      ],
    
      quote: "Aproximar as novas gerações do património através de uma narrativa interativa e lúdica.",
      
      gallery: [
        'https://visitbraga.travel/wp-content/uploads/2025/07/guia-infantil.jpg',
        'https://i.imgur.com/K5ZnO4x.png',
        'https://i.imgur.com/L4RnX9W.png',
      ],
    },
    'braga-after-dark': {
      watermark: 'https://i.imgur.com/mgdxHtt.jpeg',
      tag: 'Curadoria & Eventos // 2024 — 2025',
      headerTitle: 'Braga After Dark: Economia Noturna',
      
      // Chaves para o Footer Dinâmico
      officialNetwork: 'URBACT Cities After Dark Network',
      externalLink: 'https://visitbraga.travel/wp-content/uploads/2025/06/Roteiro-Braga-After-Dark.pdf',
      externalSource: 'VisitBraga.travel',
      externalLinkLabel: 'Roteiro Braga After Dark',
      acreditacao: 'URBACT European Program',
      hideMainBtn: false, 
      link: 'https://visitbraga.travel/wp-content/uploads/2025/06/Roteiro-Braga-After-Dark.pdf',
    
      // Métricas Institucionais Dinâmicas (Stats)
      stats: [
        { label: "Rede Europeia", value: "URBACT" },
        { label: "Economia Noturna", value: "Planeamento" },
        { label: "Governação", value: "Sustentável" }
      ],
    
      hero: (
        <div className="space-y-4">
          <span className="text-indigo-400 font-black tracking-[0.5em] uppercase text-[10px] bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Cidades Europeias</span>
          <h1 className="text-6xl md:text-[96px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            After <br />
            <span className="text-blue-600">Dark.</span>
          </h1>
        </div>
      ),
    
      description: (
        <div className="space-y-6">
          <p>
            A conceção e curadoria do <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">roteiro cultural e gastronómico</span> oficial da noite de Braga marca a nossa integração no projeto europeu **URBACT Cities After Dark**.
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            Este trabalho não é apenas um guia, mas uma ferramenta estratégica para a gestão da economia noturna. O foco reside na criação de uma narrativa que equilibra a vibração cultural com a sustentabilidade urbana, promovendo a segurança, a inclusão e a mobilidade ecológica, garantindo que Braga se afirme como um destino dinâmico 24 horas por dia.
          </p>
        </div>
      ),
    
      pillarTabLabel: 'Eixos do Roteiro',
      pillarTitle: 'Momentos da Experiência Noturna',
      pillarDesc: 'O guia estrutura a oferta da cidade em três momentos chave, integrando a governança noturna com as melhores práticas europeias.',
      
      pillars: [
        { 
          title: 'Braga by Sunset', 
          desc: 'Valorização do património monumental durante o "golden hour" e dinamização estratégica de esplanadas e espaços abertos.', 
          icon: Sparkles 
        },
        { 
          title: 'Braga by Night', 
          desc: 'Promoção da identidade gastronómica e dos vinhos locais, reforçando a economia de restauração no centro histórico.', 
          icon: Globe 
        },
        { 
          title: 'Braga by Dark', 
          desc: 'Exploração da cultura vibrante e dos espaços de diversão, garantindo uma noite segura e diversificada para todos.', 
          icon: Zap 
        },
        { 
          title: 'Responsabilidade', 
          desc: 'Foco em mobilidade ecológica, segurança inclusiva e economia circular dentro do ecossistema noturno da cidade.', 
          icon: Target 
        },
      ],
    
      quote: "Promover uma noite vibrante, inclusiva e sustentável através de uma gestão estratégica da economia noturna.",
      
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
      watermark: 'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-3-Dias-PT.webp',
      tag: 'Coordenação Editorial // 2024 — 2025',
      headerTitle: 'Roteiro Oficial: Descobrir Braga',
      
      // Chaves para o Footer Dinâmico
      officialNetwork: 'Município de Braga // Posto de Turismo',
      externalLink: 'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-Descobrir-Braga-em-3-Dias-Portugues.pdf',
      externalSource: 'VisitBraga.travel',
      externalLinkLabel: 'Edição Digital (PDF)',
      acreditacao: 'Divisão de Economia e Turismo - Municipio de Braga / LKCOM',
      hideMainBtn: false, 
      link: 'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-Descobrir-Braga-em-3-Dias-Portugues.pdf',
      
      // Adicionado link da versão Inglesa (EN)
      linkEN: 'https://visitbraga.travel/wp-content/uploads/2025/07/CMB_roteiro3diasEN_capa-e-miolo_spreads_200250722_VC2_Baixa-Qualidade-WEBSITE.pdf',
      labelLinkEN: 'English Version (PDF)',
    
      stats: [
        { label: "Capacidade de Resposta", value: "Bilingue" },
        { label: "Rigor Histórico", value: "Validado" },
        { label: "Planeamento", value: "Otimizado" }
      ],
    
      hero: (
        <div className="space-y-4">
          <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Guia de Referência</span>
          <h1 className="text-6xl md:text-[96px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            Braga em <br />
            <span className="text-blue-600">3 Dias.</span>
          </h1>
        </div>
      ),
    
      description: (
        <div className="space-y-6">
          <p>
            A coordenação da edição e a <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">garantia de qualidade editorial</span> deste guia oficial representou um exercício de rigor factual e otimização da experiência do utilizador.
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            O foco principal foi elevar o padrão informativo do Município, garantindo que a transição entre o conteúdo histórico e a utilidade prática no terreno fosse perfeita. O trabalho incluiu a validação técnica de dados, a implementação de normas de acessibilidade e a integração de camadas digitais para manter a relevância da informação em tempo real.
          </p>
        </div>
      ),
    
      pillarTabLabel: 'UX Editorial',
      pillarTitle: 'Eixos de Coordenação',
      pillarDesc: 'Foco absoluto na utilidade do conteúdo, garantindo uma ferramenta robusta tanto para o turista ocasional como para o visitante cultural.',
      
      pillars: [
        { title: 'Fact-Checking', desc: 'Validação rigorosa de toponímia e estilos arquitetónicos.', icon: Search },
        { title: 'UX Writing', desc: 'Inclusão de métricas práticas como tempos médios de visita e PMR.', icon: Map },
        { title: 'Qualidade Final', desc: 'Revisão linguística profunda sob o AO90 e rigor técnico.', icon: CheckCircle },
        { title: 'Camada Digital', desc: 'Implementação estratégica de QR Codes para atualização dinâmica.', icon: QrCode },
      ],
    
      quote: "O guia essencial para uma imersão completa na história e cultura bracarense, desenhado para a máxima utilidade no terreno.",
      
      gallery: [
        'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-3-Dias-PT.webp',
        'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-3-Dias.webp',
      ],
    
      videoEmbed: (
        <div className="w-full max-w-md mx-auto animate-in zoom-in-95 duration-1000">
          <div className="relative w-full h-0 pb-[177.77%] overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/20">
            <iframe
              className="absolute inset-0 w-full h-full"
              allow="fullscreen"
              allowFullScreen
              src="https://streamable.com/e/5qyf9a"
            />
          </div>
        </div>
      ),
    },
    'mapa-turistico-braga': {
      watermark: 'https://visitbraga.travel/wp-content/uploads/2025/11/Captura-de-ecra-2025-11-05-120931.png',
      tag: 'Cartografia & Design // 2024 — 2025',
      headerTitle: 'Novo Mapa Turístico Oficial de Braga',
      
      officialNetwork: 'Município de Braga // Divisão de Turismo',
      externalLink: 'https://visitbraga.travel/wp-content/uploads/2025/11/Mapa_Turistico_Oficial_De_Braga_Portugues.pdf',
      externalSource: 'VisitBraga.travel',
      externalLinkLabel: 'Visualizar Mapa (PDF)',
      acreditacao: 'Divisão de Economia e Turismo - Municipio de Braga / Hund',
      hideMainBtn: false, 
      link: 'https://visitbraga.travel/wp-content/uploads/2025/11/Mapa_Turistico_Oficial_De_Braga_Portugues.pdf',
    
      // Adicionando os novos links multilingue
      linkEN: 'https://visitbraga.travel/wp-content/uploads/2025/10/Official_Tourist_Map_Of_Braga_EN.pdf',
      linkES: 'https://visitbraga.travel/wp-content/uploads/2025/11/Plano_Turistico_Oficial_De_Braga_Espanol.pdf',
      linkFR: 'https://visitbraga.travel/wp-content/uploads/2025/10/Carte_Touristique_Officielle_de_Braga_FR.pdf',
      linkLowCost: 'https://visitbraga.travel/wp-content/uploads/2025/11/Mapa_Turistico_Oficial_LOW_COST.pdf',
    
      stats: [
        { label: "Capacidade de Resposta", value: "PT / EN / ES / FR" },
        { label: "Toponímia", value: "Rigorosa" },
        { label: "Qualificação", value: "Experiência de Destino" }
      ],
    
      hero: (
        <div className="space-y-4">
          <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Infraestrutura de Informação</span>
          <h1 className="text-6xl md:text-[96px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            City <br />
            <span className="text-blue-600">Mapping.</span>
          </h1>
        </div>
      ),
    
      description: (
        <div className="space-y-6">
          <p>
            O desenvolvimento técnico deste <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">novo suporte cartográfico oficial</span> representa a união entre a precisão geográfica e o design de informação contemporâneo.
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            Este projeto multidisciplinar focou-se na reestruturação total da cartografia do território, otimizando a experiência do visitante através de uma hierarquização clara de pontos de interesse. Cada detalhe foi desenhado para servir como a ferramenta definitiva de orientação e promoção do destino Braga.
          </p>
        </div>
      ),
    
      pillarTabLabel: 'Eixos do Projeto',
      pillarTitle: 'Contributo Estratégico',
      pillarDesc: 'Da estruturação de conteúdos à ilustração patrimonial, o foco incidiu na clareza informativa e na eficiência da jornada do visitante.',
      
      pillars: [
        { title: 'Arquitetura de Informação', desc: 'Hierarquização inteligente de monumentos e serviços organizados por categorias cromáticas.', icon: Layers },
        { title: 'Desenvolvimento Cartográfico', desc: 'Produção técnica com rigor toponímico absoluto e foco prioritário em zonas pedonais.', icon: Compass },
        { title: 'Representação Patrimonial', desc: 'Criação de ilustrações vetoriais de ícones como a Sé e o Bom Jesus (UNESCO).', icon: Map },
        { title: 'Gestão Multilingue', desc: 'Adaptação gráfica e funcional para quatro idiomas (PT, EN, ES, FR), garantindo coerência visual.', icon: Languages },
      ],
    
      quote: "Uma ferramenta contemporânea que combina o rigor da cartografia técnica com a nova identidade visual do destino Braga.",
      
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
      tag: 'Missão Internacional // 2025',
      headerTitle: 'Braga na Fiets en Wandelbeurs — Bélgica',
      
      // Chaves para o Footer Dinâmico
      officialNetwork: 'Visit Braga // Mercado Benelux',
      externalLink: 'https://www.fietsenwandelbeurs.be/',
      externalSource: 'Official Event Site',
      externalLinkLabel: 'Website do Evento',
      acreditacao: 'Divisão de Economia e Turismo - Municipio de Braga',
      hideMainBtn: true, // Escondido porque é uma representação presencial
      link: '',
    
      // Métricas Institucionais Dinâmicas (Stats)
      stats: [
        { label: "Mercado", value: "Benelux" },
        { label: "Segmento", value: "Hike & Bike" },
        { label: "Foco", value: "B2B / B2C" }
      ],
    
      hero: (
        <div className="space-y-4">
          <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Promoção Global</span>
          <h1 className="text-6xl md:text-[96px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            Global <br />
            <span className="text-blue-600">Promotion.</span>
          </h1>
        </div>
      ),
    
      description: (
        <div className="space-y-6">
          <p>
            A representação técnica e institucional do Município de Braga na Bélgica focou-se no posicionamento da <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">nova marca territorial</span> perante o exigente mercado Benelux.
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            Esta missão estratégica visou afirmar Braga como um destino de referência para o turismo ativo e sustentável. Através de uma narrativa coerente e materiais bilingues de alta qualidade, promovemos a convergência entre o património histórico e as novas dinâmicas de exploração do território, captando o interesse de operadores e do público final especializado em ciclismo e caminhadas.
          </p>
        </div>
      ),
    
      pillarTabLabel: 'Eixos de Atuação',
      pillarTitle: 'Estratégia de Mercado',
      pillarDesc: 'Foco na geração de leads qualificados e na afirmação de Braga como destino de elite para o mercado de turismo de natureza.',
      
      pillars: [
        { 
          title: 'Desenvolvimento de Negócio', 
          desc: 'Reuniões técnicas com operadores e DMCs para a negociação de fam trips e integração de Braga em novas rotas de programação cultural.', 
          icon: Briefcase 
        },
        { 
          title: 'Afirmação de Marca', 
          desc: 'Apresentação da nova identidade territorial, garantindo uma narrativa institucional forte e coerente nos mercados internacionais.', 
          icon: Globe 
        },
        { 
          title: 'Curadoria de Conteúdos', 
          desc: 'Seleção estratégica de percursos pedestres e cicláveis (Bike & Hike) com elevada afinidade ao perfil de consumo do mercado belga.', 
          icon: Compass 
        },
        { 
          title: 'Análise & Reporting', 
          desc: 'Recolha de métricas de atendimento e feedback qualitativo de mercado para suporte direto à decisão estratégica do Município.', 
          icon: LineChart 
        },
      ],
    
      quote: "Uma presença estratégica que une a promoção do património à nova dinâmica de turismo ativo e sustentável de Braga.",
      
      gallery: [
        'https://i.imgur.com/tg4YOqy.png',
        'https://i.imgur.com/0dqZKA5.png',
        'https://i.imgur.com/eiRaC5f.png',
        'https://i.imgur.com/yAm0gSC.png',
      ],
    },
    'expovacaciones-bilbao': {
      watermark: 'https://i.imgur.com/JL0PcZe.png',
      tag: 'Missão Estratégica // 2024 — 2025',
      headerTitle: 'Braga na ExpoVacaciones — Bilbao',
      
      // Chaves para o Footer Dinâmico
      officialNetwork: 'Visit Braga // Porto e Norte de Portugal',
      externalLink: 'https://expovacaciones.bilbaookke.eu/',
      externalSource: 'Bilbao Exhibition Centre',
      externalLinkLabel: 'Website da Expo',
      acreditacao: 'Divisão de Economia e Turismo - Municipio de Braga / TPNP',
      hideMainBtn: true, 
      link: '',
    
      // Métricas Institucionais Dinâmicas (Stats)
      stats: [
        { label: "Inteligência de Mercado", value: "Espanha (Norte)" },
        { label: "Promoção Estratégica", value: "Património & Cultura" },
        { label: "Dinâmicas de Fluxo", value: "Turismo Transfronteiriço" }
      ],
    
      hero: (
        <div className="space-y-4">
          <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Mercado de Proximidade</span>
          <h1 className="text-6xl md:text-[96px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            Strategic <br />
            <span className="text-blue-600">Market.</span>
          </h1>
        </div>
      ),
    
      description: (
        <div className="space-y-6">
          <p>
            A representação institucional no mercado espanhol, com foco no País Basco e Cantábria, centrou-se na afirmação de Braga como <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">Capital Portuguesa da Cultura 2025</span>.
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            Esta presença em Bilbao foi fundamental para consolidar Braga como um destino de excelência no Norte de Portugal perante um mercado de proximidade altamente qualificado. O trabalho envolveu a promoção ativa dos eventos âncora da cidade e a articulação estratégica com entidades regionais, garantindo que a autenticidade e competitividade de Braga fossem comunicadas de forma impactante.
          </p>
        </div>
      ),
    
      pillarTabLabel: 'Eixos Estratégicos',
      pillarTitle: 'Presença em Bilbao',
      pillarDesc: 'Reforço da notoriedade cultural e recolha de inteligência competitiva num dos mercados emissores mais importantes para o destino.',
      
      pillars: [
        { 
          title: 'Promoção Cultural', 
          desc: 'Divulgação prioritária da Capital Portuguesa da Cultura 2025 e de grandes eventos como a Braga Romana e as Festas de São João.', 
          icon: Globe 
        },
        { 
          title: 'Inteligência de Mercado', 
          desc: 'Recolha sistemática de insights e perceções do público espanhol sobre o destino para ajuste contínuo da estratégia promocional municipal.', 
          icon: BarChart3 
        },
        { 
          title: 'Networking Sectorial', 
          desc: 'Articulação transversal com o Turismo do Porto e Norte e estabelecimento de contactos de alto nível com operadores e entidades do setor.', 
          icon: Briefcase 
        },
        { 
          title: 'Atendimento Técnico', 
          desc: 'Qualificação de potenciais visitantes através de informação personalizada sobre roteiros, logística e experiências diferenciadoras no território.', 
          icon: Map 
        },
      ],
    
      quote: "Uma oportunidade fundamental para ouvir o mercado e afirmar Braga como um destino cultural, competitivo e autêntico.",
      
      gallery: [
        'https://i.imgur.com/JL0PcZe.png',
        'https://i.imgur.com/6wtSxjp.png',
        'https://i.imgur.com/zhIXUOY.png',
        'https://i.imgur.com/C4uKurT.png',
        'https://i.imgur.com/FexeN3Z.png',
      ],
    },
    'experiencias-sustentaveis': {
      watermark: 'https://www.cm-braga.pt/archive/cache/img/sz800x600/CMB17012025SERGIOFREITAS3022624430274.jpg',
      tag: 'Gestão de Produto // 2024 — 2025',
      headerTitle: 'Experiências Turísticas Sustentáveis',
      
      // Chaves para o Footer Dinâmico
      officialNetwork: 'Unidade de Turismo // Rede de Operadores Locais',
      externalLink: 'https://www.cm-braga.pt',
      externalSource: 'Município de Braga',
      externalLinkLabel: 'Portal Institucional',
      acreditacao: 'Divisão de Economia e Turismo - Municipio de Braga / INNOTUR',
      hideMainBtn: false, 
      link: 'https://www.cm-braga.pt',
    
      // Métricas Institucionais Dinâmicas (Stats)
      stats: [
        
        { label: "Coordenação", value: "Desenvolvimento de Produto" },
        { label: "Experiências", value: "29 Ativas" },
        { label: "Parceiros", value: "30+ Entidades" },
        
      ],
    
      hero: (
        <div className="space-y-4">
          <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Desenvolvimento de Produto</span>
          <h1 className="text-6xl md:text-[96px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            Experiências <br />
            <span className="text-blue-600 font-serif">Sustentáveis.</span>
          </h1>
        </div>
      ),
    
      description: (
        <div className="space-y-6">
          <p>
            A liderança técnica na conceção e validação deste <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">portefólio de 29 experiências</span> comercializáveis marca um novo patamar na oferta turística da região.
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            O projeto focou-se na estruturação de produtos que unem a identidade local às melhores práticas de sustentabilidade. Coordenei o ciclo completo: desde a articulação com mais de 30 operadores e a assessoria na interpretação da legislação turística, até à supervisão de consultoria externa para marketing e FAM Trips, garantindo um ecossistema de oferta robusto, legalmente validado e pronto para o mercado global.
          </p>
        </div>
      ),
    
      pillarTabLabel: 'Eixos do Projeto',
      pillarTitle: 'Gestão e Estruturação Técnica',
      pillarDesc: 'Coordenação transversal assegurando a viabilidade legal, a qualidade operacional e a atratividade comercial do produto.',
      
      pillars: [
        { 
          title: 'Gestão de Stakeholders', 
          desc: 'Articulação direta com mais de 30 operadores locais, gerindo todo o ciclo de submissão, revisão técnica e validação das propostas de experiência.', 
          icon: Users 
        },
        { 
          title: 'Consultoria Técnica', 
          desc: 'Assessoria estratégica na interpretação normativa (RNAAT/RNAVT) e apoio à formalização legal da atividade dos operadores parceiros.', 
          icon: Search 
        },
        { 
          title: 'Supervisão de Projetos', 
          desc: 'Coordenação da consultora externa INNOTUR na execução de FAM Trips, estratégias de marketing e produção de ativos digitais de alta qualidade.', 
          icon: Layers 
        },
        { 
          title: 'Dossier de Mercado', 
          desc: 'Estruturação de preçários e modelos logísticos para a contratação da entidade operadora centralizadora, garantindo a viabilidade comercial.', 
          icon: CheckCircle 
        },
      ],
    
      quote: "Um portefólio validado e pronto para o mercado, que posiciona Braga como um destino sustentável, inclusivo e maduro.",
      
      gallery: [
        'https://i.imgur.com/rKEHbnY.jpeg',
        'https://www.cm-braga.pt/archive/cache/img/sz800x600/CMB17012025SERGIOFREITAS3022624430274.jpg',
        'https://i.imgur.com/hDIq0Mw.jpeg',
        'https://i.imgur.com/xJSS7g7.jpeg',
        'https://i.imgur.com/ICKrhp6.jpeg',
      ],
    },
    'small-retail-braga': {
      watermark: 'https://transition-pathways.europa.eu/sites/default/files/styles/time_dependent_full/public/discussion_form_post/2025-12/ECOSR%20-%20Thumbnail_0.jpg?itok=1-QARVo7',
      tag: 'Estratégia Europeia // 2025 — 2026',
      headerTitle: 'European Capital of Small Retail',
      
      // Chaves para o Footer Dinâmico
      officialNetwork: 'European Commission // Transition Pathways',
      externalLink: 'https://transition-pathways.europa.eu/retail/events/european-capitals-small-retail-awards-ceremony-2026',
      externalSource: 'Comissão Europeia',
      externalLinkLabel: 'Portal do Evento 2026',
      acreditacao: 'ECoSR Secretariat',
      hideMainBtn: false, 
      link: 'https://transition-pathways.europa.eu/retail/events/european-capitals-small-retail-awards-ceremony-2026',
    
      // Métricas Institucionais Dinâmicas (Stats)
      stats: [
        { label: "Impacto Territorial", value: "Escala Europeia" },
        { label: "Dinamização", value: "Comércio Local" },
        { label: "Reconhecimento", value: "Finalista 2026" }
      ],
    
      hero: (
        <div className="space-y-4">
          <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Candidatura Europeia</span>
          <h1 className="text-6xl md:text-[96px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            Small <br />
            <span className="text-blue-600">Retail.</span>
          </h1>
        </div>
      ),
    
      description: (
        <div className="space-y-6">
          <p>
            A liderança técnica e editorial na construção da <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">estratégia europeia de Braga</span> para o comércio de proximidade marca um compromisso com o futuro urbano sustentável.
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            Este projeto unifica as dimensões da sustentabilidade, digitalização e coesão social num dossier estratégico submetido à Comissão Europeia. O meu papel incidiu na articulação de um modelo de Distrito Comercial Digital, na integração de soluções de logística urbana partilhada e na valorização do património vivo das Lojas com História, transformando políticas públicas em indicadores de impacto e resiliência económica.
          </p>
        </div>
      ),
    
      pillarTabLabel: 'Eixos da Candidatura',
      pillarTitle: 'Pilares de Desenvolvimento Urbano',
      pillarDesc: 'A candidatura foi estruturada em quatro grandes vetores que alinham o ecossistema comercial de Braga com as prioridades do Green Deal e da Década Digital Europeia.',
      
      pillars: [
        { 
          title: 'Digitalização & Inovação', 
          desc: 'Desenvolvimento do modelo de Distrito Comercial Digital, focado na capacitação tecnológica e na criação de ecossistemas de dados para pequenos comerciantes.', 
          icon: Smartphone 
        },
        { 
          title: 'Sustentabilidade Verde', 
          desc: 'Integração de logística urbana de última milha, estratégias de pedonalização e economia circular aplicadas ao centro histórico.', 
          icon: Globe 
        },
        { 
          title: 'Inclusão & Sociedade', 
          desc: 'Valorização do património imaterial através do programa Lojas com História e modelos de governança participativa para o comércio local.', 
          icon: Users 
        },
        { 
          title: 'Robustez Estratégica', 
          desc: 'Tratamento rigoroso de dados económicos, construção de indicadores de performance e redação técnica do dossier em inglês institucional de alto nível.', 
          icon: FileText 
        },
      ],
    
      quote: "Transformar Braga num laboratório europeu de comércio de proximidade, colocando as pessoas no centro da inovação económica e tecnológica.",
      
      gallery: [
        'https://transition-pathways.europa.eu/sites/default/files/styles/time_dependent_full/public/discussion_form_post/2025-12/ECOSR%20-%20Thumbnail_0.jpg?itok=1-QARVo7',
        ],
    },
    'music-cities-awards': {
      watermark: 'https://static.wixstatic.com/media/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg/v1/fill/w_719,h_719,q_90,enc_avif,quality_auto/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg',
      tag: 'International Awards // Arkansas, USA 2025',
      headerTitle: 'Music Cities Awards: Braga After Dark',
      
      // Chaves para o Footer Dinâmico
      officialNetwork: 'Music Cities Events // Night-Time Economy',
      externalLink: 'https://www.musiccitiesevents.com/2025-nominees?pgid=mbys9xbd1-c14d419a-28c9-44cd-af38-31558691727d',
      externalSource: 'Music Cities Events',
      externalLinkLabel: 'Official Nominees Page',
      acreditacao: 'Music City Awards / Music Diplomacy',
      hideMainBtn: false, 
      link: 'https://www.musiccitiesevents.com/2025-nominees?pgid=mbys9xbd1-c14d419a-28c9-44cd-af38-31558691727d',
    
      // Métricas Institucionais Dinâmicas (Stats)
      stats: [
        { label: "Mérito Internacional", value: "Global Top 3" },
        { label: "Palco Estratégico", value: "Arkansas, USA" },
        { label: "Especialização", value: "Night-Time Economy" }
      ],
    
      hero: (
        <div className="space-y-4">
          <span className="text-purple-400 font-black tracking-[0.5em] uppercase text-[10px] bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">Reconhecimento Global</span>
          <h1 className="text-6xl md:text-[96px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            Music <br />
            <span className="text-purple-600 font-serif">Cities.</span>
          </h1>
        </div>
      ),
    
      description: (
        <div className="space-y-6">
          <p>
            A redação estratégica e submissão da candidatura de Braga aos <span className="text-white font-bold italic underline decoration-purple-500 underline-offset-8 text-2xl">Music Cities Awards</span> representou um marco na diplomacia cultural da cidade.
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            Este projeto foi um exercício de storytelling institucional de alto nível, onde a estratégia de economia noturna "Braga After Dark" foi adaptada para o palco mundial. A narrativa fundiu o património milenar de Braga com a sua vitalidade jovem e criativa, culminando na seleção da cidade como finalista global e na sua representação oficial em Arkansas, EUA, consolidando a marca Braga perante um júri internacional de peritos em música e urbanismo.
          </p>
        </div>
      ),
    
      pillarTabLabel: 'Processo Criativo',
      pillarTitle: 'Estratégia de Candidatura',
      pillarDesc: 'Sintetizar a vitalidade de Braga numa proposta competitiva para um júri transatlântico, focada na inovação e no impacto social.',
      
      pillars: [
        { 
          title: 'Impacto Transatlântico', 
          desc: 'Adaptação rigorosa da narrativa urbana para o contexto global, assegurando a competitividade de Braga perante cidades de todo o mundo.', 
          icon: Globe 
        },
        { 
          title: 'Storytelling Urbano', 
          desc: 'Construção de uma tese estratégica que funde a identidade histórica com a visão contemporânea de "Night Economy".', 
          icon: FileText 
        },
        { 
          title: 'Visão de Futuro', 
          desc: 'Desenvolvimento de planos para a institucionalização de políticas públicas focadas na cultura noturna e na sustentabilidade social.', 
          icon: Zap 
        },
        { 
          title: 'Advocacy & Pitch', 
          desc: 'Preparação técnica bilingue (PT/EN) orientada para a defesa da candidatura e comunicação com stakeholders globais.', 
          icon: Cpu 
        },
      ],
    
      quote: "Braga After Dark: elevando a economia noturna da cidade mais antiga de Portugal ao reconhecimento global no palco internacional do Arkansas.",
      
      gallery: [
        'https://static.wixstatic.com/media/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg/v1/fill/w_719,h_719,q_90,enc_avif,quality_auto/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg',
      ],
    },
    'systemeu-salamanca': {
      watermark: 'https://i.imgur.com/SeyCGBk.png',
      tag: 'Missão Tecnológica // Salamanca 2024 — 2025',
      headerTitle: 'Startup OLÉ & SystemEU Summit',
      
      // Chaves para o Footer Dinâmico
      officialNetwork: 'SystemEU European Network // Startup OLÉ',
      externalLink: 'https://startupole.eu/',
      externalSource: 'Startup OLÉ Official',
      externalLinkLabel: 'Website do Summit',
      acreditacao: 'Município de Braga / Startup Braga',
      hideMainBtn: true, 
      link: 'https://startupole.eu/',
    
      // Métricas Institucionais Dinâmicas (Stats)
      stats: [
        { label: "Ecossistema", value: "Inovação & Talento" },
        { label: "Rede Estratégica", value: "System EU" },
        { label: "Fomento", value: "Economia Regional" }
      ],
    
      hero: (
        <div className="space-y-4">
          <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Inovação Europeia</span>
          <h1 className="text-6xl md:text-[96px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            SystemEU <br />
            <span className="text-blue-600 font-serif">Summit.</span>
          </h1>
        </div>
      ),
    
      description: (
        <div className="space-y-6">
          <p>
            A representação institucional do <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">Município de Braga</span> em Salamanca consolidou a cidade no maior palco de inovação e transferência de tecnologia entre ecossistemas europeus.
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            Esta missão no SystemEU Summit visou posicionar Braga como um hub de referência na inovação sistémica. Através de um networking estratégico com universidades e centros de investigação de elite, reforçámos o papel da cidade e da Startup Braga como motores de desenvolvimento regional, identificando sinergias críticas em sustentabilidade tecnológica e governação urbana para uma Europa mais integrada e resiliente.
          </p>
        </div>
      ),
    
      pillarTabLabel: 'Atuação Internacional',
      pillarTitle: 'Diplomacia de Inovação',
      pillarDesc: 'Articulação entre o ecossistema local e as redes europeias para acelerar a transferência de conhecimento e tecnologia.',
      
      pillars: [
        { 
          title: 'Networking Estratégico', 
          desc: 'Estabelecimento de ligações diretas com redes europeias de inovação e stakeholders de topo do empreendedorismo tecnológico.', 
          icon: Globe 
        },
        { 
          title: 'Posicionamento Urbano', 
          desc: 'Promoção ativa do Município e da Startup Braga como catalisadores de talento e investimento em setores de alto valor acrescentado.', 
          icon: Cpu 
        },
        { 
          title: 'Sinergias Tecnológicas', 
          desc: 'Identificação de oportunidades em inovação urbana e sustentabilidade para aplicação direta no ecossistema local.', 
          icon: Zap 
        },
        { 
          title: 'Colaboração Regional', 
          desc: 'Reforço da cooperação entre ecossistemas de inovação vizinhos, promovendo a coesão territorial ibérica e europeia.', 
          icon: Users 
        },
      ],
    
      quote: "Consolidar Braga no ecossistema europeu de inovação, transformando parcerias internacionais em impacto local e crescimento económico.",
      
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

     
  const current = projectConfig?.[projectType] || projectConfig?.['smart-tourism'] || {};

  const metrics = current.stats || [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveTab('overview');
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen || !current) return null;

  const renderHero = () => {
    const heroContent = current.hero || "Project Overview";
    if (isValidElement(heroContent)) return heroContent;
    if (typeof heroContent === 'string') {
      return heroContent.split(" ").map((word: string, i: number) => (
        <span key={i} className={i % 2 !== 0 ? "text-blue-500 block" : "block text-white"}>
          {word}
        </span>
      ));
    }
    return <span className="text-white">{String(heroContent)}</span>;
  };

  return (
    <>
      {/* 1. LIGHTBOX: Corrigido e integrado no fluxo de renderização */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300 p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[2001]">
            <X size={40} strokeWidth={1} />
          </button>
          <img 
            src={selectedImage} 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 object-contain border border-white/10"
            alt="Project view"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      {/* 2. MODAL PRINCIPAL */}
      <div className="fixed inset-0 z-[600] flex items-center justify-center overflow-hidden animate-in fade-in duration-700 font-sans">
        
        {/* BACKGROUND & WATERMARK */}
        <div className="absolute inset-0 bg-[#1e293b] z-0" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-blue-900/20 via-transparent to-black/40" />
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-[0.25]">
          <img 
            src={current.watermark || current.gallery?.[0]} 
            className="w-full h-full object-cover blur-[10px]"
            alt=""
          />
          <div className="absolute inset-0 bg-slate-900/40" />
        </div>

        <div className="relative w-full h-full flex flex-col z-10 text-white overflow-hidden">
          
          {/* HEADER */}
          <header className="flex items-center justify-between px-12 py-8 z-[100] border-b border-white/10 backdrop-blur-xl bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-blue-400 font-bold text-[10px] tracking-[0.4em] uppercase mb-1">Dossier Estratégico</span>
                <h2 className="text-xl font-black uppercase tracking-tight text-white italic">{current.headerTitle}</h2>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <nav className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                {['overview', 'pillars', 'media'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-8 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${
                      activeTab === tab ? 'bg-white text-slate-900 shadow-xl' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {tab === 'overview' ? 'Visão Geral' : tab === 'pillars' ? 'Eixos' : 'Media'}
                  </button>
                ))}
              </nav>
              <button onClick={onClose} className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all">
                <X size={20} />
              </button>
            </div>
          </header>

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto px-12 py-16 custom-scrollbar-dark">
          {activeTab === 'overview' && (
    <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
      <div className="lg:col-span-8 space-y-16">
        <div className="animate-in slide-in-from-left duration-700">
          {renderHero()}
        </div>
        
        <div className="flex gap-12">
          <div className="w-1.5 bg-blue-600 rounded-full shrink-0" />
          <div className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-4xl">
            {current.description}
          </div>
        </div>

        {/* SECÇÃO DE MÉTRICAS: Só aparece se existirem métricas no config do projeto */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {metrics.map((m: any, i: number) => (
              <div key={i} className="p-10 bg-white/[0.03] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] transition-colors group">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-4 group-hover:text-blue-300 transition-colors">
                  {m.label}
                </span>
                <div className="text-4xl font-black tracking-tighter text-white">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

                <div className="lg:col-span-4 space-y-8">
                  <div className="p-12 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-[3.5rem]">
                    <Quote className="text-blue-500/20 w-12 h-12 mb-8" />
                    <p className="text-3xl font-bold italic text-white/90 mb-12">"{current.quote}"</p>
                    <div className="flex items-center gap-5 pt-10 border-t border-white/10">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center font-black italic shadow-lg shadow-blue-500/20">HB</div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-wider">Unidade de Missão</span>
                        <span className="text-[10px] text-white/30 uppercase font-bold">Turismo Inteligente</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pillars' && (
              <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {current.pillars?.map((pillar, idx) => (
                    <div key={idx} className="p-10 bg-white/[0.03] border border-white/10 rounded-[2.5rem] group hover:bg-blue-600/10 transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-8"><pillar.icon className="text-blue-500" size={28} /></div>
                      <h4 className="text-xl font-bold mb-4">{pillar.title}</h4>
                      <p className="text-white/40 leading-relaxed">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

{activeTab === 'media' && (
  <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
    <div className="flex flex-col gap-12">
      
      {/* 1. VÍDEO (Se existir) */}
      {current.videoEmbed && (
        <div className="w-full">
          {current.videoEmbed}
        </div>
      )}

      {/* 2. GALERIA DE FOTOS (Com clique para ampliar) */}
      {current.gallery && current.gallery.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {current.gallery.map((img, idx) => (
            <div 
              key={idx} 
              // ESTA LINHA RECUPERA O ZOOM:
              onClick={() => setSelectedImage(img)} 
              className="group relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 cursor-zoom-in"
            >
              {/* Overlay de hover para indicar que é clicável */}
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 z-10 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                  <Maximize2 size={20} className="text-white" />
                </div>
              </div>
              
              <img 
                src={img} 
                alt="" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}
          </main>

          {/* FOOTER BREAKER INTEGRADO */}
          <footer className="px-12 py-4 relative mt-32 overflow-visible">
            <div className="absolute inset-0 bg-[#0a1120] z-0" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent z-20" />
            <div className="absolute top-0 left-0 w-full h-full border-t border-white/[0.05] pointer-events-none z-10" />

            <div className="relative z-30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-6 flex-1">
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-black italic text-white tracking-tighter">HB<span className="text-blue-500">.</span></span>
                  <span className="text-[7px] text-white/30 uppercase tracking-[0.4em] mt-1 font-bold whitespace-nowrap">Portfolio Estratégico</span>
                </div>
                {current.officialNetwork && (
                  <div className="hidden xl:flex items-center border-l border-white/10 ml-6 pl-6">
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.1em] italic leading-none">{current.officialNetwork}</span>
                  </div>
                )}
              </div>

              <div className="hidden lg:flex flex-1 justify-center items-center relative">
                <div className="flex items-center gap-8 cursor-default absolute -top-16">
                  <span className="text-[15px] font-black uppercase tracking-[0.6em] bg-gradient-to-r from-blue-600 via-white to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(37,99,235,0.3)]">Hugo</span>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-900 opacity-75 blur-[2px]" />
                    <div className="relative w-28 h-28 rounded-full border-[4px] border-[#0a1120] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-[#0a1120] transition-transform duration-700 hover:scale-105">
                      <img src="https://i.imgur.com/Dx42oze.jpeg" alt="Hugo Barros" className="w-full h-full object-cover object-top scale-110" />
                    </div>
                    <div className="absolute bottom-3 right-3 w-4 h-4 bg-blue-500 border-4 border-[#0a1120] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] z-20" />
                  </div>
                  <span className="text-[15px] font-black uppercase tracking-[0.6em] bg-gradient-to-l from-blue-600 via-white to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(37,99,235,0.3)]">Barros</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 flex-1">
  {current.acreditacao && (
    <div className="hidden xl:flex flex-col items-end leading-none border-r border-slate-700/50 pr-4">
      <span className="text-[7px] text-slate-500 uppercase font-black tracking-[0.3em] mb-1">Acreditação</span>
      <span className="text-[9px] text-slate-400 font-light italic leading-none">{current.acreditacao}</span>
    </div>
  )}

  {/* CÁPSULA DE IDIOMAS E MAPA SIMPLIFICADO */}
  <div className="flex items-center gap-3 bg-white/[0.03] p-1.5 pl-4 rounded-full border border-white/10 backdrop-blur-md min-w-fit">
    <div className="flex flex-col items-start leading-none pr-3 border-r border-white/10">
      <span className="text-[6px] font-black text-blue-400 uppercase tracking-widest">Available</span>
      <span className="text-[8px] font-bold text-white/40 uppercase">Versions</span>
    </div>
    
    <div className="flex items-center gap-1.5">
      {current.linkFR && (
        <button onClick={() => window.open(current.linkFR, '_blank')} className="group flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/5 hover:bg-blue-600 transition-all duration-300">
          <span className="text-[9px] font-black text-white/70 group-hover:text-white">FR</span>
        </button>
      )}

      {current.linkES && (
        <button onClick={() => window.open(current.linkES, '_blank')} className="group flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/5 hover:bg-blue-600 transition-all duration-300">
          <span className="text-[9px] font-black text-white/70 group-hover:text-white">ES</span>
        </button>
      )}

      {current.linkEN && (
        <button onClick={() => window.open(current.linkEN, '_blank')} className="group flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/5 hover:bg-blue-600 transition-all duration-300">
          <span className="text-[9px] font-black text-white/70 group-hover:text-white">EN</span>
        </button>
      )}
    </div>

    {/* BOTÃO MAPA SIMPLIFICADO (DENTRO DA MESMA CÁPSULA) */}
    {current.linkLowCost && (
      <button 
        onClick={() => window.open(current.linkLowCost, '_blank')}
        className="group flex flex-shrink-0 items-center gap-2 h-8 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 hover:bg-blue-600 transition-all duration-300"
      >
        <span className="text-[8px] font-black text-blue-400 group-hover:text-white uppercase">Simplificado</span>
        <ArrowUpRight size={10} className="text-blue-400 group-hover:text-white" />
      </button>
    )}
  </div>

  {/* BOTÃO PRINCIPAL (PT) - SEMPRE VISÍVEL */}
  {(current.externalLink || current.link) && (
    <button 
      onClick={() => window.open(current.externalLink || current.link, '_blank')}
      className="group relative h-12 pl-6 pr-1 flex flex-shrink-0 items-center gap-4 overflow-hidden rounded-full bg-blue-600 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] active:scale-95"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-pulse group-hover:hidden" />
      <div className="flex flex-col items-start leading-none relative z-10">
        <span className="text-[8px] font-black text-blue-100 uppercase tracking-[0.25em] mb-0.5 opacity-80">
          {current.externalLinkLabel || 'Explorar'}
        </span>
        <span className="text-[11px] text-white font-black tracking-wider uppercase">
          {current.externalSource || 'Aceder Agora'}
        </span>
      </div>
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center relative z-10 shadow-xl group-hover:bg-slate-900 transition-colors duration-300">
        <ArrowUpRight size={18} className="text-blue-600 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
      </div>
    </button>
  )}
</div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}