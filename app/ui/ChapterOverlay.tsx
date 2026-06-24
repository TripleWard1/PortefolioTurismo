'use client';
import {
  X, Target, Smartphone, CheckCircle, Briefcase,
  LineChart, Compass, Globe, Sparkles, Activity, ChevronRight, QrCode, ShieldCheck, FileText, PlayCircle, Layers, Zap,
  Cpu, BarChart3, Monitor, Maximize2, Hexagon, Fingerprint, TrendingUp, Award, Search, Map, Quote, Calendar, ArrowUpRight, Users, ArrowRight, Languages, FileDown
} from 'lucide-react';
import React, { useEffect, useState, isValidElement, ReactNode } from 'react';
import { useLang } from './LanguageContext'; // Adicionado para ouvir o botão da Navbar

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
  
  // ADICIONADAS PARA O FOOTER DINÂMICO
  authorTitle?: string;
  authorSub?: string;
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

  // --- LÓGICA DE IDIOMA INTEGRADA ---
  const { lang } = useLang(); 

  // Esta função garante que se não houver tradução, o site não parte e usa PT
  const t = (pt: any, en?: any) => (lang === 'en' && en ? en : pt);

  const isVisitBraga = projectType === 'visit-braga';

  // Adicionamos a tipagem : Record<string, ProjectData> aqui
  const projectConfig: Record<string, ProjectData> = {
// --- FIM DO BLOCO DE CORREÇÃO ---
'visit-braga': {
  watermark: 'https://i.imgur.com/e0wCEWM.jpeg',
  tag: t('Gestão de Destino // 2024 — 2025', 'Destination Management // 2024 — 2025'),
  headerTitle: t('Portal Visit Braga: Estratégia Digital', 'Visit Braga Portal: Digital Strategy'),
  
  officialNetwork: 'Município de Braga / InvestBraga',
  externalLink: 'https://visitbraga.travel',
  externalSource: 'VisitBraga.travel',
  externalLinkLabel: t('Explorar Portal', 'Explore Portal'),
  acreditacao: t('Marca Territorial: Visit Braga / Divisão de Economia e Turismo - Município de Braga', 'Territorial Brand: Visit Braga / Economy and Tourism Department - Municipality of Braga'),
  hideMainBtn: false, 
  link: 'https://visitbraga.travel',

  stats: [
    { label: t("Promoção de Destino", "Destination Promotion"), value: t("Estratégica", "Strategic") },
    { label: t("Alcance do Mercado", "Market Reach"), value: t("Internacional", "International") },
    { label: t("Hub de Informação", "Information Hub"), value: t("Multichannel", "Multichannel") }
  ],

  hero: (
    <div className="space-y-4">
      <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
        {t('Lançamento 2025', '2025 Launch')}
      </span>
      <h1 className="text-4xl md:text-[58px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
        Visit <br />
        <span className="text-blue-600 font-serif">Braga.</span>
      </h1>
    </div>
  ),

  description: (
    <div className="space-y-6">
      <p>
        {t(
          <>A colaboração no desenvolvimento do novo portal Visit Braga centrou-se na <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">reengenharia de conteúdos</span>, visando uma comunicação direta e eficiente com o turista moderno.</>,
          <>Collaboration on the development of the new Visit Braga portal focused on <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">content reengineering</span>, aiming for direct and efficient communication with the modern tourist.</>
        )}
      </p>
      <p className="text-white/40 text-lg leading-relaxed">
        {t(
          "O foco principal foi a simplificação da jornada do utilizador (User Journey), transformando a vasta oferta cultural, histórica e comercial de Braga num ecossistema digital intuitivo. Este trabalho permitiu elevar o padrão de promoção do território, alinhando a presença online com o prestígio internacional crescente da cidade.",
          "The main focus was simplifying the User Journey, transforming Braga’s vast cultural, historical, and commercial offerings into an intuitive digital ecosystem. This work raised the territory's promotional standards, aligning its online presence with the city’s growing international prestige."
        )}
      </p>
    </div>
  ),

  pillarTabLabel: t('Estratégia de Promoção', 'Promotion Strategy'),
  pillarTitle: t('Pilares da Experiência Digital', 'Digital Experience Pillars'),
  pillarDesc: t(
    'O novo portal foi estruturado para ser a porta de entrada principal da cidade, otimizando a forma como o destino comunica com o mundo.',
    'The new portal was structured to be the city’s main gateway, optimizing how the destination communicates with the world.'
  ),
  
  pillars: [
    { 
      title: t('Promoção Global', 'Global Promotion'), 
      desc: t('Desenvolvimento de uma estratégia multilingue e SEO focada em captar o interesse de mercados emissores estratégicos para a região.', 'Development of a multilingual and SEO strategy focused on capturing interest from strategic source markets for the region.'), 
      icon: Globe 
    },
    { 
      title: t('Dinamização de Agenda', 'Agenda Revitalization'), 
      desc: t('Implementação de sistemas de atualização em tempo real para eventos e notícias, garantindo que o visitante tenha sempre a informação mais recente.', 'Implementation of real-time update systems for events and news, ensuring visitors always have the latest information.'), 
      icon: Calendar 
    },
    { 
      title: t('Curadoria de Oferta', 'Offer Curatorship'), 
      desc: t('Criação de roteiros temáticos que ligam o património milenar à oferta hoteleira e comercial contemporânea de Braga.', 'Creation of thematic itineraries linking millennial heritage to Braga’s contemporary hotel and commercial offerings.'), 
      icon: Map 
    },
    { 
      title: t('Interface Inovadora', 'Innovative Interface'), 
      desc: t('Foco total na experiência mobile e numa interface limpa, reduzindo a fricção entre a curiosidade do turista e a reserva do destino.', 'Total focus on mobile experience and a clean interface, reducing friction between tourist curiosity and destination booking.'), 
      icon: Sparkles 
    },
  ],

  quote: t(
    "Uma montra digital de excelência que reflete a ambição e a modernidade de Braga como destino europeu de referência.",
    "A digital showcase of excellence reflecting Braga’s ambition and modernity as a leading European destination."
  ),
  
  gallery: [], 

  videoEmbed: (
    <div className="w-full max-w-md mx-auto animate-in zoom-in-95 duration-1000">
      <div className="relative w-full h-0 pb-[177.77%] overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/20">
        <iframe
          className="absolute inset-0 w-full h-full"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          scrolling="no"
          src="https://www.instagram.com/reel/DMqLs9yMpRQ/embed"
        />
      </div>
    </div>
  ),
},
'smart-tourism': {
  watermark: 'https://i.imgur.com/GBs8DY7.jpeg',
  tag: t('European Shortlisted City // 2024 — 2026', 'European Shortlisted City // 2024 — 2026'),
  headerTitle: t('European Capital of Smart Tourism', 'European Capital of Smart Tourism'),
  
  // Chaves para o Footer Dinâmico
  officialNetwork: t('European Capital of Smart Tourism Network', 'European Capital of Smart Tourism Network'),
  externalLink: 'https://smart-tourism-capital.ec.europa.eu/winners-and-finalists/cities-2026/braga-shortlisted-2026-european-capital-smart-tourism-competition_en',
  externalSource: t('Comissão Europeia', 'European Commission'),
  externalLinkLabel: t('Portal de Finalista 2026', '2026 Finalist Portal'),
  acreditacao: t('European Commission Recognition / Smart Tourism Network', 'European Commission Recognition / Smart Tourism Network'), 
  hideMainBtn: true, 
  
  stats: [
    { label: t("Posicionamento", "Positioning"), value: t("Elite Europeia", "European Elite") },
    { label: t("Missão em Bruxelas", "Mission in Brussels"), value: t("Defesa Técnica", "Technical Defense") },
    { label: t("Reconhecimento", "Recognition"), value: t("EU Shortlisted", "EU Shortlisted") }
  ],    

  hero: (
    <div className="space-y-4">
      <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
        {t('Finalista Europeu', 'European Finalist')}
      </span>
      <h1 className="text-4xl md:text-[58px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
        Shortlisted <br />
        <span className="text-blue-600">Smart Tourism</span>
      </h1>
    </div>
  ),

  description: (
    <div className="space-y-6">
      <p>
        {t(
          <>A integração na equipa técnica responsável pela <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">defesa da candidatura em Bruxelas</span> marcou um ponto de viragem na estratégia turística da região. Este processo não foi apenas uma apresentação formal, mas um exame rigoroso de políticas públicas, inovação e sustentabilidade.</>,
          <>Joining the technical team responsible for the <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">candidacy defense in Brussels</span> marked a turning point in the region's tourism strategy. This process was not merely a formal presentation, but a rigorous examination of public policy, innovation, and sustainability.</>
        )}
      </p>
      <p className="text-white/40 text-lg leading-relaxed">
        {t(
          "O culminar deste esforço resultou na seleção de Braga como uma das poucas finalistas europeias, garantindo um assento de destaque na prestigiada Rede Europeia de Destinos Inteligentes. Esta posição permite o intercâmbio direto de boas práticas com as cidades mais inovadoras do mundo, consolidando um ecossistema focado no visitante e no residente.",
          "The culmination of this effort resulted in Braga’s selection as one of the few European finalists, securing a prominent seat in the prestigious European Network of Smart Destinations. This position enables the direct exchange of best practices with the world's most innovative cities, consolidating an ecosystem focused on both visitors and residents."
        )}
      </p>
    </div>
  ),

  pillarTabLabel: t('Eixos Estratégicos', 'Strategic Pillars'),
  pillarTitle: t('Missão em Bruxelas', 'Mission in Brussels'),
  pillarDesc: t(
    'Um compromisso institucional que alinha a governança local com os mais altos padrões de excelência da União Europeia.',
    'An institutional commitment that aligns local governance with the European Union’s highest standards of excellence.'
  ),

  pillars: [
    { 
      title: t('Defesa no Júri Europeu', 'European Jury Defense'), 
      desc: t('Representação institucional de alto nível e defesa técnica perante a Comissão Europeia e o Júri Internacional, focada na resiliência e inovação do destino.', 'High-level institutional representation and technical defense before the European Commission and International Jury, focused on destination resilience and innovation.'), 
      icon: Globe 
    },
    { 
      title: t('Acesso à Rede Europeia', 'European Network Access'), 
      desc: t('Entrada direta num ecossistema de elite, promovendo o networking internacional e a visibilidade de Braga como referência em turismo sustentável.', 'Direct entry into an elite ecosystem, promoting international networking and Braga’s visibility as a benchmark for sustainable tourism.'), 
      icon: Compass 
    },
    { 
      title: t('Consolidação de Evidências', 'Evidence Consolidation'), 
      desc: t('Transformação de dados brutos e políticas municipais em casos de estudo de sucesso, reconhecidos pela sua capacidade de transferência para outras capitais.', 'Transforming raw data and municipal policies into successful case studies, recognized for their transferability to other capitals.'), 
      icon: CheckCircle 
    },
    { 
      title: t('Diplomacia Urbana', 'Urban Diplomacy'), 
      desc: t('Articulação transversal entre stakeholders e a Smart Tourism Secretariat, alinhando a cidade com as prioridades da UE.', 'Cross-cutting articulation between stakeholders and the Smart Tourism Secretariat, aligning the city with EU priorities.'), 
      icon: Users 
    },
  ],

  quote: t(
    "A distinção europeia valida a nossa infraestrutura; a nossa visão define o futuro dos destinos inteligentes.",
    "The European distinction validates our infrastructure; our vision defines the future of smart destinations."
  ),

  gallery: [
    'https://i.imgur.com/1t5plh4.jpeg', 'https://i.imgur.com/cpFeHQk.jpeg',
    'https://i.imgur.com/HecgfPz.jpeg', 'https://i.imgur.com/GBs8DY7.jpeg',
    'https://i.imgur.com/AM6Z3uu.jpeg', 'https://i.imgur.com/FFH12zK.jpeg',
  ],
},
'cidade-bracvs': {
  watermark: 'https://i.imgur.com/NRTWHRW.png',
  tag: t('Educação & Património // 2024 — 2025', 'Education & Heritage // 2024 — 2025'),
  headerTitle: t('A Cidade do Bracvs: Roteiro Educativo', 'The City of Bracvs: Educational Itinerary'),
  
  // Chaves para o Footer Dinâmico
  officialNetwork: t('Município de Braga // Divisão de Educação', 'Municipality of Braga // Education Department'),
  externalLink: 'https://cmbraga-my.sharepoint.com/:b:/g/personal/hugo_barros_cm-braga_pt/IQBTExVPkalaQLtE4HFUCNb2AezN7qLyt-8BYhUh2XWT23o?e=7xvekq',
  externalSource: 'VisitBraga.travel',
  externalLinkLabel: t('Visualizar PDF Oficial', 'View Official PDF'),
  acreditacao: t('Divisão de Economia e Turismo - Municipio de Braga / LKCOM', 'Economy and Tourism Department - Municipality of Braga / LKCOM'),
  hideMainBtn: false, 
  link: 'https://visitbraga.travel/wp-content/uploads/2025/07/Roteiro-Infantil-CMB-Visit-Braga.pdf',

  // Métricas Institucionais Dinâmicas (Stats)
  stats: [
    { label: t("Educação Patrimonial", "Heritage Education"), value: t("Novos Públicos", "New Audiences") },
    { label: t("Interpretação", "Interpretation"), value: t("Lúdico-Pedagógica", "Playful-Pedagogical") },
    { label: t("Valorização", "Valorization"), value: t("Identidade Local", "Local Identity") }
  ],

  hero: (
    <div className="space-y-4">
      <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
        {t('Publicação Editorial', 'Editorial Publication')}
      </span>
      <h1 className="text-4xl md:text-[58px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
        {t(
          <>Cidade do <br /><span className="text-blue-600">Bracvs.</span></>,
          <>The City of <br /><span className="text-blue-600">Bracvs.</span></>
        )}
      </h1>
    </div>
  ),

  description: (
    <div className="space-y-6">
      <p>
        {t(
          <>A conceção de conteúdos e revisão editorial desta <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">publicação lúdico-educativa</span> representou um desafio de tradução cultural para as novas gerações.</>,
          <>The content creation and editorial review of this <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">playful-educational publication</span> represented a challenge of cultural translation for the new generations.</>
        )}
      </p>
      <p className="text-white/40 text-lg leading-relaxed">
        {t(
          "O projeto foca-se na aproximação das famílias ao património histórico de Braga através de uma narrativa envolvente. O meu papel foi transversal: desde a definição da estrutura narrativa e seleção de pontos de interesse, até à validação final de produção e maquetagem, garantindo que o rigor histórico coexistisse com uma linguagem acessível e dinâmica.",
          "The project focuses on bringing families closer to Braga's historical heritage through an engaging narrative. My role was cross-functional: from defining the narrative structure and selecting strategic points of interest to final production validation and layout, ensuring that historical accuracy coexisted with accessible and dynamic language."
        )}
      </p>
    </div>
  ),

  pillarTabLabel: t('Contributos Técnicos', 'Technical Contributions'),
  pillarTitle: t('Eixos de Intervenção', 'Areas of Intervention'),
  pillarDesc: t(
    'O meu papel foi transversal, garantindo a coesão entre a narrativa histórica, a pedagogia infantil e o design editorial.',
    'My role was cross-functional, ensuring cohesion between the historical narrative, children’s pedagogy, and editorial design.'
  ),
  
  pillars: [
    { 
      title: t('Conceção de Conteúdos', 'Content Conception'), 
      desc: t('Definição da estrutura narrativa, seleção estratégica de pontos de interesse e criação de mecânicas de jogos interativos.', 'Definition of the narrative structure, strategic selection of points of interest, and creation of interactive game mechanics.'), 
      icon: Map 
    },
    { 
      title: t('Revisão Editorial', 'Editorial Review'), 
      desc: t('Adaptação de linguagem para o público infantojuvenil com validação rigorosa de dados históricos e arqueológicos.', 'Adapting language for children and youth with rigorous validation of historical and archaeological data.'), 
      icon: Search 
    },
    { 
      title: t('Coordenação Criativa', 'Creative Coordination'), 
      desc: t('Articulação entre os departamentos de Turismo, Educação e Design para assegurar a coerência visual e textual da obra.', 'Liaising between Tourism, Education, and Design departments to ensure the visual and textual coherence of the work.'), 
      icon: Layers 
    },
    { 
      title: t('Estratégia de Família', 'Family Strategy'), 
      desc: t('Enquadramento do roteiro no contexto de turismo criativo, reforçando a oferta de lazer educativo da cidade.', 'Framing the itinerary within the context of creative tourism, strengthening the city’s educational leisure offerings.'), 
      icon: Users 
    },
  ],

  quote: t(
    "Aproximar as novas gerações do património através de uma narrativa interativa e lúdica.",
    "Bringing new generations closer to heritage through an interactive and playful narrative."
  ),
  
  gallery: [
    'https://i.imgur.com/NRTWHRW.png',
    'https://i.imgur.com/K5ZnO4x.png',
    'https://i.imgur.com/L4RnX9W.png',
  ],
},
'braga-after-dark': {
  watermark: 'https://i.imgur.com/mgdxHtt.jpeg',
  tag: t('Curadoria & Eventos // 2024 — 2025', 'Curatorship & Events // 2024 — 2025'),
  headerTitle: t('Braga After Dark: Economia Noturna', 'Braga After Dark: Night-time Economy'),
  
  // Chaves para o Footer Dinâmico
  officialNetwork: 'URBACT Cities After Dark Network',
  externalLink: 'https://visitbraga.travel/wp-content/uploads/2025/06/Roteiro-Braga-After-Dark.pdf',
  externalSource: 'VisitBraga.travel',
  externalLinkLabel: t('Roteiro Braga After Dark', 'Braga After Dark Itinerary'),
  acreditacao: 'URBACT European Program',
  hideMainBtn: false, 
  link: 'https://visitbraga.travel/wp-content/uploads/2025/06/Roteiro-Braga-After-Dark.pdf',

  // Métricas Institucionais Dinâmicas (Stats)
  stats: [
    { label: t("Rede Europeia", "European Network"), value: "URBACT" },
    { label: t("Economia Noturna", "Night Economy"), value: t("Planeamento", "Planning") },
    { label: t("Governação", "Governance"), value: t("Sustentável", "Sustainable") }
  ],

  hero: (
    <div className="space-y-4">
      <span className="text-indigo-400 font-black tracking-[0.5em] uppercase text-[10px] bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
        {t('Cidades Europeias', 'European Cities')}
      </span>
      <h1 className="text-4xl md:text-[58px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
        After <br />
        <span className="text-blue-600">Dark.</span>
      </h1>
    </div>
  ),

  description: (
    <div className="space-y-6">
      <p>
        {t(
          <>A conceção e curadoria do <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">roteiro cultural e gastronómico</span> oficial da noite de Braga marca a nossa integração no projeto europeu **URBACT Cities After Dark**.</>,
          <>The design and curatorship of Braga’s official <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">cultural and gastronomic itinerary</span> marks our integration into the European project **URBACT Cities After Dark**.</>
        )}
      </p>
      <p className="text-white/40 text-lg leading-relaxed">
        {t(
          "Este trabalho não é apenas um guia, mas uma ferramenta estratégica para a gestão da economia noturna. O foco reside na criação de uma narrativa que equilibra a vibração cultural com a sustentabilidade urbana, promovendo a segurança, a inclusão e a mobilidade ecológica, garantindo que Braga se afirme como um destino dinâmico 24 horas por dia.",
          "This work is not just a guide, but a strategic tool for managing the night-time economy. The focus lies in creating a narrative that balances cultural vibrancy with urban sustainability, promoting safety, inclusion, and ecological mobility, ensuring that Braga establishes itself as a dynamic 24-hour destination."
        )}
      </p>
    </div>
  ),

  pillarTabLabel: t('Eixos do Roteiro', 'Itinerary Pillars'),
  pillarTitle: t('Momentos da Experiência Noturna', 'Night-time Experience Moments'),
  pillarDesc: t(
    'O guia estrutura a oferta da cidade em três momentos chave, integrando a governança noturna com as melhores práticas europeias.',
    'The guide structures the city’s offerings into three key moments, integrating night-time governance with European best practices.'
  ),
  
  pillars: [
    { 
      title: 'Braga by Sunset', 
      desc: t('Valorização do património monumental durante o "golden hour" e dinamização estratégica de esplanadas e espaços abertos.', 'Showcasing monumental heritage during the "golden hour" and strategically boosting terraces and open spaces.'), 
      icon: Sparkles 
    },
    { 
      title: 'Braga by Night', 
      desc: t('Promoção da identidade gastronómica e dos vinhos locais, reforçando a economia de restauração no centro histórico.', 'Promoting gastronomic identity and local wines, strengthening the restaurant economy in the historical center.'), 
      icon: Globe 
    },
    { 
      title: 'Braga by Dark', 
      desc: t('Exploração da cultura vibrante e dos espaços de diversão, garantindo uma noite segura e diversificada para todos.', 'Exploring vibrant culture and entertainment spaces, ensuring a safe and diverse night for everyone.'), 
      icon: Zap 
    },
    { 
      title: t('Responsabilidade', 'Responsibility'), 
      desc: t('Foco em mobilidade ecológica, segurança inclusiva e economia circular dentro do ecossistema noturno da cidade.', 'Focus on green mobility, inclusive safety, and circular economy within the city’s night-time ecosystem.'), 
      icon: Target 
    },
  ],

  quote: t(
    "Promover uma noite vibrante, inclusiva e sustentável através de uma gestão estratégica da economia noturna.",
    "Promoting a vibrant, inclusive, and sustainable night through strategic management of the night-time economy."
  ),
  
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
  watermark: 'https://i.imgur.com/yWtlcEL.png',
  tag: t('Coordenação Editorial // 2024 — 2025', 'Editorial Coordination // 2024 — 2025'),
  headerTitle: t('Roteiro Oficial: Descobrir Braga', 'Official Guide: Discover Braga'),
  
  // Chaves para o Footer Dinâmico
  officialNetwork: t('Município de Braga // Posto de Turismo', 'Municipality of Braga // Tourist Office'),
  externalLink: t(
    'https://cmbraga-my.sharepoint.com/:b:/g/personal/hugo_barros_cm-braga_pt/IQAREwUp6GmPRotJifBAMTJ6AXpADZ6zTx2vddXtgOrWovA?e=KIFubd',
    'https://cmbraga-my.sharepoint.com/:b:/g/personal/hugo_barros_cm-braga_pt/IQAWCOx-0ki2SofmrdgKzurbAaLxBTL6L9PPUOqBbgaV6Dc?e=A8FAAe'
  ),
  externalSource: 'VisitBraga.travel',
  externalLinkLabel: t('Edição Digital (PDF)', 'Digital Edition (PDF)'),
  acreditacao: t('Divisão de Economia e Turismo - Municipio de Braga / LKCOM', 'Economy and Tourism Department - Municipality of Braga / LKCOM'),
  hideMainBtn: false, 
  link: t(
    'https://cmbraga-my.sharepoint.com/:b:/g/personal/hugo_barros_cm-braga_pt/IQAREwUp6GmPRotJifBAMTJ6AXpADZ6zTx2vddXtgOrWovA?e=KIFubd',
    'https://cmbraga-my.sharepoint.com/:b:/g/personal/hugo_barros_cm-braga_pt/IQAWCOx-0ki2SofmrdgKzurbAaLxBTL6L9PPUOqBbgaV6Dc?e=A8FAAe'
  ),
  
  // Links de backup (Mantidos conforme o teu original)
  linkEN: 'https://cmbraga-my.sharepoint.com/:b:/g/personal/hugo_barros_cm-braga_pt/IQAWCOx-0ki2SofmrdgKzurbAaLxBTL6L9PPUOqBbgaV6Dc?e=A8FAAe',
  labelLinkEN: 'English Version (PDF)',

  stats: [
    { label: t("Capacidade de Resposta", "Responsiveness"), value: t("Bilingue", "Bilingual") },
    { label: t("Rigor Histórico", "Historical Rigor"), value: t("Validado", "Validated") },
    { label: t("Planeamento", "Planning"), value: t("Otimizado", "Optimized") }
  ],

  hero: (
    <div className="space-y-4">
      <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
        {t('Guia de Referência', 'Reference Guide')}
      </span>
      <h1 className="text-4xl md:text-[58px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
        {t(
          <>Braga em <br /><span className="text-blue-600">3 Dias.</span></>,
          <>Braga in <br /><span className="text-blue-600">3 Days.</span></>
        )}
      </h1>
    </div>
  ),

  description: (
    <div className="space-y-6">
      <p>
        {t(
          <>A coordenação da edição e a <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">garantia de qualidade editorial</span> deste guia oficial representou um exercício de rigor factual e otimização da experiência do utilizador.</>,
          <>Editorial coordination and <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">quality assurance</span> of this official guide represented an exercise in factual rigor and user experience optimization.</>
        )}
      </p>
      <p className="text-white/40 text-lg leading-relaxed">
        {t(
          "O foco principal foi elevar o padrão informativo do Município, garantindo que a transição entre o conteúdo histórico e a utilidade prática no terreno fosse perfeita. O trabalho incluiu a validação técnica de dados, a implementação de normas de acessibilidade e a integração de camadas digitais para manter a relevância da informação em tempo real.",
          "The main focus was to raise the Municipality's informative standards, ensuring a seamless transition between historical content and practical on-the-ground utility. The work included technical data validation, implementation of accessibility standards, and the integration of digital layers to maintain real-time information relevance."
        )}
      </p>
    </div>
  ),

  pillarTabLabel: t('UX Editorial', 'Editorial UX'),
  pillarTitle: t('Eixos de Coordenação', 'Coordination Pillars'),
  pillarDesc: t(
    'Foco absoluto na utilidade do conteúdo, garantindo uma ferramenta robusta tanto para o turista ocasional como para o visitante cultural.',
    'Absolute focus on content utility, ensuring a robust tool for both the casual tourist and the cultural visitor.'
  ),
  
  pillars: [
    { 
      title: 'Fact-Checking', 
      desc: t('Validação rigorosa de toponímia e estilos arquitetónicos.', 'Rigorous validation of toponymy and architectural styles.'), 
      icon: Search 
    },
    { 
      title: 'UX Writing', 
      desc: t('Inclusão de métricas práticas como tempos médios de visita e PMR.', 'Inclusion of practical metrics such as average visit times and PRM accessibility.'), 
      icon: Map 
    },
    { 
      title: t('Qualidade Final', 'Final Quality'), 
      desc: t('Revisão linguística profunda sob o AO90 e rigor técnico.', 'Deep linguistic review under the AO90 agreement and technical rigor.'), 
      icon: CheckCircle 
    },
    { 
      title: t('Camada Digital', 'Digital Layer'), 
      desc: t('Implementação estratégica de QR Codes para atualização dinâmica.', 'Strategic implementation of QR Codes for dynamic updates.'), 
      icon: QrCode 
    },
  ],

  quote: t(
    "O guia essencial para uma imersão completa na história e cultura bracarense, desenhado para a máxima utilidade no terreno.",
    "The essential guide for a complete immersion in Braga's history and culture, designed for maximum utility on the ground."
  ),
  
  gallery: [
    'https://i.imgur.com/S2u20iH.png',
    'https://i.imgur.com/JPfjvIt.png',
    'https://i.imgur.com/Rp78zAC.png',
  ],

  videoEmbed: (
    <div className="w-full max-w-md mx-auto animate-in zoom-in-95 duration-1000">
      <div className="relative w-full h-0 pb-[177.77%] overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/20">
        <iframe
          className="absolute inset-0 w-full h-full"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          scrolling="no"
          src="https://www.instagram.com/reel/DMvVPZeICA8/embed"
        />
      </div>
    </div>
  ),
},
'mapa-turistico-braga': {
  watermark: 'https://i.imgur.com/P54M1Ko.png',
  tag: t('Cartografia & Design // 2024 — 2025', 'Cartography & Design // 2024 — 2025'),
  headerTitle: t('Novo Mapa Turístico Oficial de Braga', 'Braga’s New Official Tourist Map'),
  
  officialNetwork: t('Município de Braga // Divisão de Turismo', 'Municipality of Braga // Tourism Department'),
  externalLink: t(
    'https://cmbraga-my.sharepoint.com/:b:/g/personal/hugo_barros_cm-braga_pt/IQAUDJgQjgbuS7hLwJrLFGd9AXOszioW1Wd72Fm0Uz1qGok?e=vPgIYp',
    'https://cmbraga-my.sharepoint.com/:b:/g/personal/hugo_barros_cm-braga_pt/IQBfSu4RZgIcTolEh_oDtex7ATmrMQ0ghEWlEweeXAmfPBk?e=Ky4KWo'
  ),
  externalSource: 'VisitBraga.travel',
  externalLinkLabel: t('Visualizar Mapa (PDF)', 'View Map (PDF)'),
  acreditacao: t('Divisão de Economia e Turismo - Municipio de Braga / Hund', 'Economy and Tourism Department - Municipality of Braga / Hund'),
  hideMainBtn: false, 
  link: t(
    'https://cmbraga-my.sharepoint.com/:b:/g/personal/hugo_barros_cm-braga_pt/IQAUDJgQjgbuS7hLwJrLFGd9AXOszioW1Wd72Fm0Uz1qGok?e=vPgIYp',
    'https://visitbraga.travel/wp-content/uploads/2025/10/Official_Tourist_Map_Of_Braga_EN.pdf'
  ),

  // Adicionando os novos links multilingue (Mantidos como referência técnica)
  linkEN: 'https://cmbraga-my.sharepoint.com/:b:/g/personal/hugo_barros_cm-braga_pt/IQBfSu4RZgIcTolEh_oDtex7ATmrMQ0ghEWlEweeXAmfPBk?e=ibbD9E',
  linkES: 'https://cmbraga-my.sharepoint.com/:b:/g/personal/hugo_barros_cm-braga_pt/IQA7PR3KFBAgRqkcOm2RwPORAWRH7GsjYujWggZO5PtY4YY?e=EzPmjX',
  linkFR: 'https://cmbraga-my.sharepoint.com/:b:/g/personal/hugo_barros_cm-braga_pt/IQC3oBO70YCmRr49_aaQasyfAUtt7I1gg8QDbJ1O6DccRIw?e=QHuy7t',
  linkLowCost: 'https://cmbraga-my.sharepoint.com/:b:/g/personal/hugo_barros_cm-braga_pt/IQAJnzALpwUqR4GcMbhvAWuyAdjCK4w9OQ_mz1y_zQIjzL8?e=5upf9g',

  stats: [
    { label: t("Capacidade de Resposta", "Responsiveness"), value: "PT / EN / ES / FR" },
    { label: t("Toponímia", "Toponymy"), value: t("Rigorosa", "Rigorous") },
    { label: t("Qualificação", "Qualification"), value: t("Experiência de Destino", "Destination Experience") }
  ],

  hero: (
    <div className="space-y-4">
      <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
        {t('Infraestrutura de Informação', 'Information Infrastructure')}
      </span>
      <h1 className="text-4xl md:text-[58px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
        City <br />
        <span className="text-blue-600">Mapping.</span>
      </h1>
    </div>
  ),

  description: (
    <div className="space-y-6">
      <p>
        {t(
          <>O desenvolvimento técnico deste <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">novo suporte cartográfico oficial</span> representa a união entre a precisão geográfica e o design de informação contemporâneo.</>,
          <>The technical development of this <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">new official cartographic support</span> represents the union between geographical precision and contemporary information design.</>
        )}
      </p>
      <p className="text-white/40 text-lg leading-relaxed">
        {t(
          "Este projeto multidisciplinar focou-se na reestruturação total da cartografia do território, otimizando a experiência do visitante através de uma hierarquização clara de pontos de interesse. Cada detalhe foi desenhado para servir como a ferramenta definitiva de orientação e promoção do destino Braga.",
          "This multidisciplinary project focused on the complete restructuring of the territory's cartography, optimizing the visitor experience through a clear hierarchy of points of interest. Every detail was designed to serve as the ultimate tool for orientation and promotion of the Braga destination."
        )}
      </p>
    </div>
  ),

  pillarTabLabel: t('Eixos do Projeto', 'Project Pillars'),
  pillarTitle: t('Contributo Estratégico', 'Strategic Contribution'),
  pillarDesc: t(
    'Da estruturação de conteúdos à ilustração patrimonial, o foco incidiu na clareza informativa e na eficiência da jornada do visitante.',
    'From content structuring to heritage illustration, the focus was on informative clarity and the efficiency of the visitor journey.'
  ),
  
  pillars: [
    { 
      title: t('Arquitetura de Informação', 'Information Architecture'), 
      desc: t('Hierarquização inteligente de monumentos e serviços organizados por categorias cromáticas.', 'Intelligent hierarchy of monuments and services organized by chromatic categories.'), 
      icon: Layers 
    },
    { 
      title: t('Desenvolvimento Cartográfico', 'Cartographic Development'), 
      desc: t('Produção técnica com rigor toponímico absoluto e foco prioritário em zonas pedonais.', 'Technical production with absolute toponymic rigor and a priority focus on pedestrian zones.'), 
      icon: Compass 
    },
    { 
      title: t('Representação Patrimonial', 'Heritage Representation'), 
      desc: t('Criação de ilustrações vetoriais de ícones como a Sé e o Bom Jesus (UNESCO).', 'Creation of vector illustrations of icons such as the Cathedral and Bom Jesus (UNESCO).'), 
      icon: Map 
    },
    { 
      title: t('Gestão Multilingue', 'Multilingual Management'), 
      desc: t('Adaptação gráfica e funcional para quatro idiomas (PT, EN, ES, FR), garantindo coerência visual.', 'Graphic and functional adaptation for four languages (PT, EN, ES, FR), ensuring visual coherence.'), 
      icon: Languages 
    },
  ],

  quote: t(
    "Uma ferramenta contemporânea que combina o rigor da cartografia técnica com a nova identidade visual do destino Braga.",
    "A contemporary tool that combines the rigor of technical cartography with the new visual identity of the Braga destination."
  ),
  
  gallery: [
    'https://i.imgur.com/P54M1Ko.png',
    'https://i.imgur.com/pXB2EtP.png',
    'https://i.imgur.com/e9g7BBJ.png',
    'https://i.imgur.com/NVwoMGm.png',
  ],
},
'fiets-wandelbeurs-gante': {
  watermark: 'https://i.imgur.com/tg4YOqy.png',
  tag: t('Missão Internacional // 2025', 'International Mission // 2025'),
  headerTitle: t('Braga na Fiets en Wandelbeurs — Bélgica', 'Braga at Fiets en Wandelbeurs — Belgium'),
  
  // Chaves para o Footer Dinâmico
  officialNetwork: t('Visit Braga // Mercado Benelux', 'Visit Braga // Benelux Market'),
  externalLink: 'https://www.fietsenwandelbeurs.be/',
  externalSource: 'Official Event Site',
  externalLinkLabel: t('Website do Evento', 'Event Website'),
  acreditacao: t('Divisão de Economia e Turismo - Municipio de Braga', 'Economy and Tourism Department - Municipality of Braga'),
  hideMainBtn: true, 
  link: '',

  // Métricas Institucionais Dinâmicas (Stats)
  stats: [
    { label: t("Mercado", "Market"), value: "Benelux" },
    { label: t("Segmento", "Segment"), value: "Hike & Bike" },
    { label: t("Foco", "Focus"), value: "B2B / B2C" }
  ],

  hero: (
    <div className="space-y-4">
      <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
        {t('Promoção Global', 'Global Promotion')}
      </span>
      <h1 className="text-4xl md:text-[58px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
        Global <br />
        <span className="text-blue-600">Promotion.</span>
      </h1>
    </div>
  ),

  description: (
    <div className="space-y-6">
      <p>
        {t(
          <>A representação técnica e institucional do Município de Braga na Bélgica focou-se no posicionamento da <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">nova marca territorial</span> perante o exigente mercado Benelux.</>,
          <>The technical and institutional representation of the Municipality of Braga in Belgium focused on positioning the <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">new territorial brand</span> before the demanding Benelux market.</>
        )}
      </p>
      <p className="text-white/40 text-lg leading-relaxed">
        {t(
          "Esta missão estratégica visou afirmar Braga como um destino de referência para o turismo ativo e sustentável. Através de uma narrativa coerente e materiais bilingues de alta qualidade, promovemos a convergência entre o património histórico e as novas dinâmicas de exploração do território, captando o interesse de operadores e do público final especializado em ciclismo e caminhadas.",
          "This strategic mission aimed to establish Braga as a leading destination for active and sustainable tourism. Through a coherent narrative and high-quality bilingual materials, we promoted the convergence between historical heritage and new territorial exploration dynamics, capturing the interest of operators and a specialized audience in cycling and hiking."
        )}
      </p>
    </div>
  ),

  pillarTabLabel: t('Eixos de Atuação', 'Action Pillars'),
  pillarTitle: t('Estratégia de Mercado', 'Market Strategy'),
  pillarDesc: t(
    'Foco na geração de leads qualificados e na afirmação de Braga como destino de elite para o mercado de turismo de natureza.',
    'Focus on generating qualified leads and establishing Braga as an elite destination for the nature tourism market.'
  ),
  
  pillars: [
    { 
      title: t('Desenvolvimento de Negócio', 'Business Development'), 
      desc: t('Reuniões técnicas com operadores e DMCs para a negociação de fam trips e integração de Braga em novas rotas de programação cultural.', 'Technical meetings with operators and DMCs for negotiating fam trips and integrating Braga into new cultural programming routes.'), 
      icon: Briefcase 
    },
    { 
      title: t('Afirmação de Marca', 'Brand Assertion'), 
      desc: t('Apresentação da nova identidade territorial, garantindo uma narrativa institucional forte e coerente nos mercados internacionais.', 'Presentation of the new territorial identity, ensuring a strong and coherent institutional narrative in international markets.'), 
      icon: Globe 
    },
    { 
      title: t('Curadoria de Conteúdos', 'Content Curatorship'), 
      desc: t('Seleção estratégica de percursos pedestres e cicláveis (Bike & Hike) com elevada afinidade ao perfil de consumo do mercado belga.', 'Strategic selection of hiking and cycling routes (Bike & Hike) with high affinity for the Belgian market consumption profile.'), 
      icon: Compass 
    },
    { 
      title: t('Análise & Reporting', 'Analysis & Reporting'), 
      desc: t('Recolha de métricas de atendimento e feedback qualitativo de mercado para suporte direto à decisão estratégica do Município.', 'Collection of service metrics and qualitative market feedback for direct support of the Municipality\'s strategic decision-making.'), 
      icon: LineChart 
    },
  ],

  quote: t(
    "Uma presença estratégica que une a promoção do património à nova dinâmica de turismo ativo e sustentável de Braga.",
    "A strategic presence that unites heritage promotion with Braga's new active and sustainable tourism dynamics."
  ),
  
  gallery: [
    'https://i.imgur.com/tg4YOqy.png',
    'https://i.imgur.com/0dqZKA5.png',
    'https://i.imgur.com/eiRaC5f.png',
    'https://i.imgur.com/yAm0gSC.png',
  ],
},
'expovacaciones-bilbao': {
  watermark: 'https://i.imgur.com/JL0PcZe.png',
  tag: t('Missão Estratégica // 2024 — 2025', 'Strategic Mission // 2024 — 2025'),
  headerTitle: t('Braga na ExpoVacaciones — Bilbao', 'Braga at ExpoVacaciones — Bilbao'),
  
  // Chaves para o Footer Dinâmico
  officialNetwork: t('Visit Braga // Porto e Norte de Portugal', 'Visit Braga // Porto and North of Portugal'),
  externalLink: 'https://expovacaciones.bilbaookke.eu/',
  externalSource: 'Bilbao Exhibition Centre',
  externalLinkLabel: t('Website da Expo', 'Expo Website'),
  acreditacao: t('Divisão de Economia e Turismo - Municipio de Braga / TPNP', 'Economy and Tourism Department - Municipality of Braga / TPNP'),
  hideMainBtn: true, 
  link: '',

  // Métricas Institucionais Dinâmicas (Stats)
  stats: [
    { label: t("Inteligência de Mercado", "Market Intelligence"), value: t("Espanha (Norte)", "Spain (North)") },
    { label: t("Promoção Estratégica", "Strategic Promotion"), value: t("Património & Cultura", "Heritage & Culture") },
    { label: t("Dinâmicas de Fluxo", "Flow Dynamics"), value: t("Turismo Transfronteiriço", "Cross-border Tourism") }
  ],

  hero: (
    <div className="space-y-4">
      <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
        {t('Mercado de Proximidade', 'Proximity Market')}
      </span>
      <h1 className="text-4xl md:text-[58px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
        Strategic <br />
        <span className="text-blue-600">Market.</span>
      </h1>
    </div>
  ),

  description: (
    <div className="space-y-6">
      <p>
        {t(
          <>A representação institucional no mercado espanhol, com foco no País Basco e Cantábria, centrou-se na afirmação de Braga como <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">Capital Portuguesa da Cultura 2025</span>.</>,
          <>Institutional representation in the Spanish market, focusing on the Basque Country and Cantabria, centered on establishing Braga as the <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">2025 Portuguese Capital of Culture</span>.</>
        )}
      </p>
      <p className="text-white/40 text-lg leading-relaxed">
        {t(
          "Esta presença em Bilbao foi fundamental para consolidar Braga como um destino de excelência no Norte de Portugal perante um mercado de proximidade altamente qualificado. O trabalho envolveu a promoção ativa dos eventos âncora da cidade e a articulação estratégica com entidades regionais, garantindo que a autenticidade e competitividade de Braga fossem comunicadas de forma impactante.",
          "This presence in Bilbao was fundamental to consolidating Braga as a destination of excellence in the North of Portugal before a highly qualified proximity market. The work involved actively promoting the city's anchor events and strategic coordination with regional entities, ensuring that Braga's authenticity and competitiveness were communicated with high impact."
        )}
      </p>
    </div>
  ),

  pillarTabLabel: t('Eixos Estratégicos', 'Strategic Pillars'),
  pillarTitle: t('Presença em Bilbao', 'Presence in Bilbao'),
  pillarDesc: t(
    'Reforço da notoriedade cultural e recolha de inteligência competitiva num dos mercados emissores mais importantes para o destino.',
    'Strengthening cultural awareness and gathering competitive intelligence in one of the most important source markets for the destination.'
  ),
  
  pillars: [
    { 
      title: t('Promoção Cultural', 'Cultural Promotion'), 
      desc: t('Divulgação prioritária da Capital Portuguesa da Cultura 2025 e de grandes eventos como a Braga Romana e as Festas de São João.', 'Priority promotion of the 2025 Portuguese Capital of Culture and major events such as Braga Romana and the São João Festivities.'), 
      icon: Globe 
    },
    { 
      title: t('Inteligência de Mercado', 'Market Intelligence'), 
      desc: t('Recolha sistemática de insights e perceções do público espanhol sobre o destino para ajuste contínuo da estratégia promocional municipal.', 'Systematic collection of insights and perceptions from the Spanish public regarding the destination for continuous adjustment of the municipal promotional strategy.'), 
      icon: BarChart3 
    },
    { 
      title: t('Networking Sectorial', 'Sector Networking'), 
      desc: t('Articulação transversal com o Turismo do Porto e Norte e estabelecimento de contactos de alto nível com operadores e entidades do setor.', 'Cross-functional coordination with Porto and North of Portugal Tourism and establishing high-level contacts with operators and sector entities.'), 
      icon: Briefcase 
    },
    { 
      title: t('Atendimento Técnico', 'Technical Support'), 
      desc: t('Qualificação de potenciais visitantes através de informação personalizada sobre roteiros, logística e experiências diferenciadoras no território.', 'Qualifying potential visitors through personalized information about itineraries, logistics, and distinctive experiences within the territory.'), 
      icon: Map 
    },
  ],

  quote: t(
    "Uma oportunidade fundamental para ouvir o mercado e afirmar Braga como um destino cultural, competitivo e autêntico.",
    "A fundamental opportunity to listen to the market and establish Braga as a cultural, competitive, and authentic destination."
  ),

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
      tag: t('Gestão de Produto // 2024 — 2025', 'Product Management // 2024 — 2025'),
      headerTitle: t('Experiências Turísticas Sustentáveis', 'Sustainable Tourism Experiences'),
      
      // Chaves para o Footer Dinâmico
      officialNetwork: t('Unidade de Turismo // Rede de Operadores Locais', 'Tourism Unit // Local Operators Network'),
      externalLink: 'https://www.cm-braga.pt',
      externalSource: t('Município de Braga', 'Municipality of Braga'),
      externalLinkLabel: t('Portal Institucional', 'Institutional Portal'),
      acreditacao: 'Divisão de Economia e Turismo - Municipio de Braga / INNOTUR',
      hideMainBtn: false, 
      link: 'https://www.cm-braga.pt',
    
      // Métricas Institucionais Dinâmicas (Stats)
      stats: [
        { label: t("Coordenação", "Coordination"), value: t("Desenvolvimento de Produto", "Product Development") },
        { label: t("Experiências", "Experiences"), value: t("29 Ativas", "29 Active") },
        { label: t("Parceiros", "Partners"), value: t("30+ Entidades", "30+ Entities") },
      ],
    
      hero: (
        <div className="space-y-4">
          <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            {t('Desenvolvimento de Produto', 'Product Development')}
          </span>
          <h1 className="text-4xl md:text-[58px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            {t(
              <>Experiências <br /><span className="text-blue-600 font-serif">Turísticas.</span></>,
              <>Touristic <br /><span className="text-blue-600 font-serif">Experiences.</span></>
            )}
          </h1>
        </div>
      ),
    
      description: (
        <div className="space-y-6">
          <p>
            {t(
              <>A liderança técnica na conceção e validação deste <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">portefólio de 29 experiências</span> comercializáveis marca um novo patamar na oferta turística da região.</>,
              <>Technical leadership in the design and validation of this <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">portfolio of 29 marketable experiences</span> marks a new level in the region's tourism offer.</>
            )}
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            {t(
              "O projeto focou-se na estruturação de produtos que unem a identidade local às melhores práticas de sustentabilidade. Coordenei o ciclo completo: desde a articulação com mais de 30 operadores e a assessoria na interpretação da legislação turística, até à supervisão de consultoria externa para marketing e FAM Trips, garantindo um ecossistema de oferta robusto, legalmente validado e pronto para o mercado global.",
              "The project focused on structuring products that bridge local identity with sustainability best practices. I coordinated the full cycle: from liaising with over 30 operators and advising on tourism legislation interpretation, to supervising external consultancy for marketing and FAM Trips, ensuring a robust, legally validated offer ecosystem ready for the global market."
            )}
          </p>
        </div>
      ),
    
      pillarTabLabel: t('Eixos do Projeto', 'Project Pillars'),
      pillarTitle: t('Gestão e Estruturação Técnica', 'Technical Management & Structuring'),
      pillarDesc: t(
        'Coordenação transversal assegurando a viabilidade legal, a qualidade operacional e a atratividade comercial do produto.',
        'Cross-functional coordination ensuring legal viability, operational quality, and commercial attractiveness of the product.'
      ),
      
      pillars: [
        { 
          title: t('Gestão de Stakeholders', 'Stakeholder Management'), 
          desc: t('Articulação direta com mais de 30 operadores locais, gerindo todo o ciclo de submissão, revisão técnica e validação das propostas de experiência.', 'Direct coordination with over 30 local operators, managing the entire submission cycle, technical review, and validation of experience proposals.'), 
          icon: Users 
        },
        { 
          title: t('Consultoria Técnica', 'Technical Consultancy'), 
          desc: t('Assessoria estratégica na interpretação normativa (RNAAT/RNAVT) e apoio à formalização legal da atividade dos operadores parceiros.', 'Strategic advice on regulatory interpretation (RNAAT/RNAVT) and support for the legal formalization of partner operators\' activities.'), 
          icon: Search 
        },
        { 
          title: t('Supervisão de Projetos', 'Project Supervision'), 
          desc: t('Coordenação da consultora externa INNOTUR na execução de FAM Trips, estratégias de marketing e produção de ativos digitais de alta qualidade.', 'Coordination of the external consultant INNOTUR in executing FAM Trips, marketing strategies, and high-quality digital asset production.'), 
          icon: Layers 
        },
        { 
          title: t('Dossier de Mercado', 'Market Dossier'), 
          desc: t('Estruturação de preçários e modelos logísticos para a contratação da entidade operadora centralizadora, garantindo a viabilidade comercial.', 'Structuring pricing and logistics models for hiring the centralizing operating entity, ensuring commercial viability.'), 
          icon: CheckCircle 
        },
      ],
    
      quote: t(
        "Um portefólio validado e pronto para o mercado, que posiciona Braga como um destino sustentável, inclusivo e maduro.",
        "A validated, market-ready portfolio that positions Braga as a sustainable, inclusive, and mature destination."
      ),
      
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
      tag: t('Estratégia Europeia // 2025 — 2026', 'European Strategy // 2025 — 2026'),
      headerTitle: t('European Capital of Small Retail', 'European Capital of Small Retail'),
      
      // Chaves para o Footer Dinâmico
      officialNetwork: 'European Commission // Transition Pathways',
      externalLink: 'https://transition-pathways.europa.eu/retail/events/european-capitals-small-retail-awards-ceremony-2026',
      externalSource: t('Comissão Europeia', 'European Commission'),
      externalLinkLabel: t('Portal do Evento 2026', '2026 Event Portal'),
      acreditacao: 'ECoSR Secretariat',
      hideMainBtn: false, 
      link: 'https://transition-pathways.europa.eu/retail/events/european-capitals-small-retail-awards-ceremony-2026',
    
      // Métricas Institucionais Dinâmicas (Stats)
      stats: [
        { label: t("Impacto Territorial", "Territorial Impact"), value: t("Escala Europeia", "European Scale") },
        { label: t("Dinamização", "Revitalization"), value: t("Comércio Local", "Local Retail") },
        { label: t("Reconhecimento", "Recognition"), value: t("Finalista 2026", "2026 Finalist") }
      ],
    
      hero: (
        <div className="space-y-4">
          <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            {t('Candidatura Europeia', 'European Candidacy')}
          </span>
          <h1 className="text-4xl md:text-[58px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            Small <br />
            <span className="text-blue-600">Retail.</span>
          </h1>
        </div>
      ),
    
      description: (
        <div className="space-y-6">
          <p>
            {t(
              <>A liderança técnica e editorial na construção da <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">estratégia europeia de Braga</span> para o comércio de proximidade marca um compromisso com o futuro urbano sustentável.</>,
              <>Technical and editorial leadership in building <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">Braga’s European strategy</span> for local retail marks a commitment to a sustainable urban future.</>
            )}
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            {t(
              "Este projeto unifica as dimensões da sustentabilidade, digitalização e coesão social num dossier estratégico submetido à Comissão Europeia. O meu papel incidiu na articulação de um modelo de Distrito Comercial Digital, na integração de soluções de logística urbana partilhada e na valorização do património vivo das Lojas com História, transformando políticas públicas em indicadores de impacto e resiliência económica.",
              "This project unifies the dimensions of sustainability, digitalization, and social cohesion into a strategic dossier submitted to the European Commission. My role focused on articulating a Digital Business District model, integrating shared urban logistics solutions, and valuing the living heritage of 'Lojas com História', transforming public policies into indicators of impact and economic resilience."
            )}
          </p>
        </div>
      ),
    
      pillarTabLabel: t('Eixos da Candidatura', 'Candidacy Pillars'),
      pillarTitle: t('Pilares de Desenvolvimento Urbano', 'Urban Development Pillars'),
      pillarDesc: t(
        'A candidatura foi estruturada em quatro grandes vetores que alinham o ecossistema comercial de Braga com as prioridades do Green Deal e da Década Digital Europeia.',
        'The candidacy was structured into four major vectors that align Braga’s commercial ecosystem with the priorities of the Green Deal and the European Digital Decade.'
      ),
      
      pillars: [
        { 
          title: t('Digitalização & Inovação', 'Digitalization & Innovation'), 
          desc: t('Desenvolvimento do modelo de Distrito Comercial Digital, focado na capacitação tecnológica e na criação de ecossistemas de dados para pequenos comerciantes.', 'Development of the Digital Business District model, focused on technological capacity building and the creation of data ecosystems for small retailers.'), 
          icon: Smartphone 
        },
        { 
          title: t('Sustentabilidade Verde', 'Green Sustainability'), 
          desc: t('Integração de logística urbana de última milha, estratégias de pedonalização e economia circular aplicadas ao centro histórico.', 'Integration of last-mile urban logistics, pedestrianization strategies, and circular economy applied to the historical center.'), 
          icon: Globe 
        },
        { 
          title: t('Inclusão & Sociedade', 'Inclusion & Society'), 
          desc: t('Valorização do património imaterial através do programa Lojas com História e modelos de governança participativa para o comércio local.', 'Valorization of intangible heritage through the "Lojas com História" program and participatory governance models for local retail.'), 
          icon: Users 
        },
        { 
          title: t('Robustez Estratégica', 'Strategic Robustness'), 
          desc: t('Tratamento rigoroso de dados económicos, construção de indicadores de performance e redação técnica do dossier em inglês institucional de alto nível.', 'Rigorous processing of economic data, construction of performance indicators, and technical writing of the dossier in high-level institutional English.'), 
          icon: FileText 
        },
      ],
    
      quote: t(
        "Transformar Braga num laboratório europeu de comércio de proximidade, colocando as pessoas no centro da inovação económica e tecnológica.",
        "Transforming Braga into a European laboratory for local retail, placing people at the center of economic and technological innovation."
      ),
      
      gallery: [
        'https://transition-pathways.europa.eu/sites/default/files/styles/time_dependent_full/public/discussion_form_post/2025-12/ECOSR%20-%20Thumbnail_0.jpg?itok=1-QARVo7',
        ],
    },
    'music-cities-awards': {
      watermark: 'https://static.wixstatic.com/media/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg/v1/fill/w_719,h_719,q_90,enc_avif,quality_auto/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg',
      tag: t('International Awards // Arkansas, USA 2025', 'International Awards // Arkansas, USA 2025'),
      headerTitle: t('Music Cities Awards: Braga After Dark', 'Music Cities Awards: Braga After Dark'),
      
      // Chaves para o Footer Dinâmico
      officialNetwork: 'Music Cities Events // Night-Time Economy',
      externalLink: 'https://www.musiccitiesevents.com/2025-nominees?pgid=mbys9xbd1-c14d419a-28c9-44cd-af38-31558691727d',
      externalSource: 'Music Cities Events',
      externalLinkLabel: t('Página Oficial de Nomeados', 'Official Nominees Page'),
      acreditacao: 'Music City Awards / Music Diplomacy',
      hideMainBtn: false, 
      link: 'https://www.musiccitiesevents.com/2025-nominees?pgid=mbys9xbd1-c14d419a-28c9-44cd-af38-31558691727d',
    
      // Métricas Institucionais Dinâmicas (Stats)
      stats: [
        { label: t("Mérito Internacional", "International Merit"), value: t("Top 3 Global", "Global Top 3") },
        { label: t("Palco Estratégico", "Strategic Stage"), value: "Arkansas, USA" },
        { label: t("Especialização", "Specialization"), value: "Night-Time Economy" }
      ],
    
      hero: (
        <div className="space-y-4">
          <span className="text-purple-400 font-black tracking-[0.5em] uppercase text-[10px] bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            {t('Reconhecimento Global', 'Global Recognition')}
          </span>
          <h1 className="text-4xl md:text-[58px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            Music <br />
            <span className="text-purple-600 font-serif">Cities.</span>
          </h1>
        </div>
      ),
    
      description: (
        <div className="space-y-6">
          <p>
            {t(
              <>A redação estratégica e submissão da candidatura de Braga aos <span className="text-white font-bold italic underline decoration-purple-500 underline-offset-8 text-2xl">Music Cities Awards</span> representou um marco na diplomacia cultural da cidade.</>,
              <>The strategic writing and submission of Braga’s candidacy for the <span className="text-white font-bold italic underline decoration-purple-500 underline-offset-8 text-2xl">Music Cities Awards</span> represented a milestone in the city’s cultural diplomacy.</>
            )}
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            {t(
              "Este projeto foi um exercício de storytelling institucional de alto nível, onde a estratégia de economia noturna \"Braga After Dark\" foi adaptada para o palco mundial. A narrativa fundiu o património milenar de Braga com a sua vitalidade jovem e criativa, culminando na seleção da cidade como finalista global e na sua representação oficial em Arkansas, EUA, consolidando a marca Braga perante um júri internacional de peritos em música e urbanismo.",
              "This project was a high-level institutional storytelling exercise, where the \"Braga After Dark\" night-time economy strategy was adapted for the global stage. The narrative merged Braga’s ancient heritage with its youthful and creative vitality, culminating in the city’s selection as a global finalist and its official representation in Arkansas, USA, solidifying the Braga brand before an international jury of music and urban planning experts."
            )}
          </p>
        </div>
      ),
    
      pillarTabLabel: t('Processo Criativo', 'Creative Process'),
      pillarTitle: t('Estratégia de Candidatura', 'Candidacy Strategy'),
      pillarDesc: t(
        'Sintetizar a vitalidade de Braga numa proposta competitiva para um júri transatlântico, focada na inovação e no impacto social.',
        'Synthesizing Braga’s vitality into a competitive proposal for a transatlantic jury, focused on innovation and social impact.'
      ),
      
      pillars: [
        { 
          title: t('Impacto Transatlântico', 'Transatlantic Impact'), 
          desc: t('Adaptação rigorosa da narrativa urbana para o contexto global, assegurando a competitividade de Braga perante cidades de todo o mundo.', 'Rigorous adaptation of the urban narrative for a global context, ensuring Braga’s competitiveness among cities worldwide.'), 
          icon: Globe 
        },
        { 
          title: t('Storytelling Urbano', 'Urban Storytelling'), 
          desc: t('Construção de uma tese estratégica que funde a identidade histórica com a visão contemporânea de \"Night Economy\".', 'Development of a strategic thesis merging historical identity with a contemporary vision of \"Night Economy\".'), 
          icon: FileText 
        },
        { 
          title: t('Visão de Futuro', 'Future Vision'), 
          desc: t('Desenvolvimento de planos para a institucionalização de políticas públicas focadas na cultura noturna e na sustentabilidade social.', 'Development of plans for the institutionalization of public policies focused on night culture and social sustainability.'), 
          icon: Zap 
        },
        { 
          title: t('Advocacy & Pitch', 'Advocacy & Pitch'), 
          desc: t('Preparação técnica bilingue (PT/EN) orientada para a defesa da candidatura e comunicação com stakeholders globais.', 'Bilingual technical preparation (PT/EN) oriented towards candidacy defense and communication with global stakeholders.'), 
          icon: Cpu 
        },
      ],
    
      quote: t(
        "Braga After Dark: elevando a economia noturna da cidade mais antiga de Portugal ao reconhecimento global no palco internacional do Arkansas.",
        "Braga After Dark: elevating the night economy of Portugal's oldest city to global recognition on the international stage in Arkansas."
      ),
    
      gallery: [
        'https://static.wixstatic.com/media/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg/v1/fill/w_719,h_719,q_90,enc_avif,quality_auto/214dbc_25ced84144eb414c945f6072bd97b0c4~mv2.jpg',
      ],
    },
    'systemeu-salamanca': {
      watermark: 'https://i.imgur.com/SeyCGBk.png',
      tag: t('Missão Tecnológica // Salamanca 2024 — 2025', 'Tech Mission // Salamanca 2024 — 2025'),
      headerTitle: t('Startup OLÉ & SystemEU Summit', 'Startup OLÉ & SystemEU Summit'),
      
      // Chaves para o Footer Dinâmico
      officialNetwork: 'SystemEU European Network // Startup OLÉ',
      externalLink: 'https://startupole.eu/',
      externalSource: 'Startup OLÉ Official',
      externalLinkLabel: t('Website do Summit', 'Summit Website'),
      acreditacao: t('Município de Braga / Startup Braga', 'Municipality of Braga / Startup Braga'),
      hideMainBtn: true, 
      link: 'https://startupole.eu/',
    
      // Métricas Institucionais Dinâmicas (Stats)
      stats: [
        { label: t("Ecossistema", "Ecosystem"), value: t("Inovação & Talento", "Innovation & Talent") },
        { label: t("Rede Estratégica", "Strategic Network"), value: "System EU" },
        { label: t("Fomento", "Development"), value: t("Economia Regional", "Regional Economy") }
      ],
    
      hero: (
        <div className="space-y-4">
          <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            {t('Inovação Europeia', 'European Innovation')}
          </span>
          <h1 className="text-4xl md:text-[58px] font-black tracking-tighter text-white uppercase italic leading-[0.85]">
            SystemEU <br />
            <span className="text-blue-600 font-serif">Summit.</span>
          </h1>
        </div>
      ),
    
      description: (
        <div className="space-y-6">
          <p>
            {t(
              <>A representação institucional do <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">Município de Braga</span> em Salamanca consolidou a cidade no maior palco de inovação e transferência de tecnologia entre ecossistemas europeus.</>,
              <>The institutional representation of the <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8 text-2xl">Municipality of Braga</span> in Salamanca consolidated the city on the largest stage for innovation and technology transfer among European ecosystems.</>
            )}
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            {t(
              "Esta missão no SystemEU Summit visou posicionar Braga como um hub de referência na inovação sistémica. Através de um networking estratégico com universidades e centros de investigação de elite, reforçámos o papel da cidade e da Startup Braga como motores de desenvolvimento regional, identificando sinergias críticas em sustentabilidade tecnológica e governação urbana para uma Europa mais integrada e resiliente.",
              "This mission at the SystemEU Summit aimed to position Braga as a leading hub for systemic innovation. Through strategic networking with elite universities and research centers, we strengthened the role of the city and Startup Braga as drivers of regional development, identifying critical synergies in technological sustainability and urban governance for a more integrated and resilient Europe."
            )}
          </p>
        </div>
      ),
    
      pillarTabLabel: t('Atuação Internacional', 'International Action'),
      pillarTitle: t('Diplomacia de Inovação', 'Innovation Diplomacy'),
      pillarDesc: t(
        'Articulação entre o ecossistema local e as redes europeias para acelerar a transferência de conhecimento e tecnologia.',
        'Articulation between the local ecosystem and European networks to accelerate knowledge and technology transfer.'
      ),
      
      pillars: [
        { 
          title: t('Networking Estratégico', 'Strategic Networking'), 
          desc: t('Estabelecimento de ligações diretas com redes europeias de inovação e stakeholders de topo do empreendedorismo tecnológico.', 'Establishing direct links with European innovation networks and top-tier technological entrepreneurship stakeholders.'), 
          icon: Globe 
        },
        { 
          title: t('Posicionamento Urbano', 'Urban Positioning'), 
          desc: t('Promoção ativa do Município e da Startup Braga como catalisadores de talento e investimento em setores de alto valor acrescentado.', 'Active promotion of the Municipality and Startup Braga as catalysts for talent and investment in high-value-added sectors.'), 
          icon: Cpu 
        },
        { 
          title: t('Sinergias Tecnológicas', 'Tech Synergies'), 
          desc: t('Identificação de oportunidades em inovação urbana e sustentabilidade para aplicação direta no ecossistema local.', 'Identification of opportunities in urban innovation and sustainability for direct application within the local ecosystem.'), 
          icon: Zap 
        },
        { 
          title: t('Colaboração Regional', 'Regional Collaboration'), 
          desc: t('Reforço da cooperação entre ecossistemas de inovação vizinhos, promovendo a coesão territorial ibérica e europeia.', 'Strengthening cooperation between neighboring innovation ecosystems, promoting Iberian and European territorial cohesion.'), 
          icon: Users 
        },
      ],
    
      quote: t(
        "Consolidar Braga no ecossistema europeu de inovação, transformando parcerias internacionais em impacto local e crescimento económico.",
        "Consolidating Braga within the European innovation ecosystem, transforming international partnerships into local impact and economic growth."
      ),
      
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
      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300 p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <button
            aria-label="Fechar imagem"
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[2001]"
          >
            <X size={32} strokeWidth={1} />
          </button>
          <img
            src={selectedImage}
            className="max-w-full max-h-[88vh] rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 object-contain border border-white/10"
            alt="Project view"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* MODAL — Dossier Reader */}
      <div className="fixed inset-0 z-[600] flex flex-col bg-[var(--ink)] text-white animate-in fade-in duration-400 font-sans">
        {/* Textura de fundo */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_-10%,rgba(10,92,255,0.14),transparent_55%)]" />
        </div>

        {/* HEADER */}
        <header className="relative z-20 shrink-0 border-b border-white/10 bg-[var(--ink)]/70 backdrop-blur-xl px-5 md:px-10 lg:px-14">
          <div className="flex items-center justify-between gap-3 h-16 md:h-20">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--sky)] hidden md:inline">
                {t('Dossier', 'Dossier')}
              </span>
              <span className="hidden md:block h-4 w-px bg-white/15" />
              <h2 className="text-sm md:text-base font-bold uppercase tracking-wide text-white truncate">
                {current.headerTitle}
              </h2>
            </div>

            <div className="flex items-center gap-2 md:gap-5 shrink-0">
              {/* Tabs desktop */}
              <nav className="hidden sm:flex items-center gap-1">
                {(['overview', 'pillars', 'media'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-3 md:px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                      activeTab === tab ? 'text-white' : 'text-white/35 hover:text-white/70'
                    }`}
                  >
                    {tab === 'overview'
                      ? t('Visão Geral', 'Overview')
                      : tab === 'pillars'
                      ? t('Eixos', 'Pillars')
                      : 'Media'}
                    {activeTab === tab && (
                      <span className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-[var(--primary)] rounded-full" />
                    )}
                  </button>
                ))}
              </nav>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-[var(--ink)] transition-all"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Tabs mobile (segunda linha) */}
          <nav className="flex sm:hidden items-center gap-1 pb-2.5">
            {(['overview', 'pillars', 'media'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 relative px-2 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors rounded-lg ${
                  activeTab === tab ? 'bg-white/10 text-white' : 'text-white/35'
                }`}
              >
                {tab === 'overview'
                  ? t('Visão', 'Overview')
                  : tab === 'pillars'
                  ? t('Eixos', 'Pillars')
                  : 'Media'}
              </button>
            ))}
          </nav>
        </header>

        {/* CONTEÚDO */}
        <main className="relative z-10 flex-1 overflow-y-auto custom-scrollbar-dark">
          <div className="max-w-6xl mx-auto px-5 md:px-10 lg:px-14 py-8 md:py-14">
            {/* ---------------- VISÃO GERAL ---------------- */}
            {activeTab === 'overview' && (
              <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                {/* BANNER DE CAPA */}
                <div className="relative h-52 sm:h-64 md:h-80 rounded-2xl overflow-hidden mb-10 border border-white/10 bg-[var(--ink-deep)]">
                  {(current.watermark || current.gallery?.[0]) && (
                    <img
                      src={current.watermark || current.gallery?.[0]}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)]/60 to-transparent" />

                  {current.tag && (
                    <span className="absolute top-5 left-5 md:top-6 md:left-6 inline-flex items-center font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[var(--sky)] bg-[var(--ink)]/60 border border-[var(--sky)]/20 rounded-full px-3 py-1.5 backdrop-blur-md">
                      {current.tag}
                    </span>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                    <div className="font-playfair">{renderHero()}</div>
                  </div>
                </div>

                {/* CORPO */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                  <div className="lg:col-span-7 space-y-8">
                    <div className="flex gap-5 md:gap-6">
                      <div className="w-1 rounded-full bg-gradient-to-b from-[var(--primary)] to-[var(--accent)] shrink-0" />
                      <div className="text-base md:text-xl text-white/70 font-light leading-relaxed">
                        {current.description}
                      </div>
                    </div>

                    {current.quote && (
                      <figure className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                        <Quote className="text-[var(--primary)]/40 w-7 h-7 md:w-8 md:h-8 mb-4" />
                        <blockquote className="font-playfair text-lg md:text-2xl italic font-medium text-white/90 leading-snug">
                          {current.quote}
                        </blockquote>
                        <figcaption className="flex items-center gap-4 mt-6 pt-5 border-t border-white/10">
                          <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center font-black italic text-white text-sm shrink-0">
                            HB
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-wider text-white">
                              {current.authorTitle || t('Unidade de Missão', 'Mission Unit')}
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                              {current.authorSub || t('Estratégia Territorial', 'Territorial Strategy')}
                            </span>
                          </div>
                        </figcaption>
                      </figure>
                    )}
                  </div>

                  {/* Ficha técnica */}
                  <aside className="lg:col-span-5">
                    <div className="lg:sticky lg:top-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                        {t('Ficha técnica', 'Project facts')}
                      </span>

                      {metrics.length > 0 && (
                        <dl className="mt-5">
                          {metrics.map((m: any, i: number) => (
                            <div
                              key={i}
                              className="flex items-baseline justify-between gap-4 py-3.5 border-b border-white/10 first:pt-0"
                            >
                              <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                                {m.label}
                              </dt>
                              <dd className="text-sm font-bold text-white text-right">{m.value}</dd>
                            </div>
                          ))}
                        </dl>
                      )}

                      {current.officialNetwork && (
                        <div className="mt-6">
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--sky)]">
                            {t('Rede', 'Network')}
                          </span>
                          <p className="text-sm text-white/70 mt-1.5 leading-relaxed">
                            {current.officialNetwork}
                          </p>
                        </div>
                      )}

                      {current.acreditacao && (
                        <div className="mt-5">
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--sky)]">
                            {t('Acreditação', 'Accreditation')}
                          </span>
                          <p className="text-sm text-white/70 mt-1.5 leading-relaxed italic">
                            {current.acreditacao}
                          </p>
                        </div>
                      )}
                    </div>
                  </aside>
                </div>
              </div>
            )}

            {/* ---------------- EIXOS ---------------- */}
            {activeTab === 'pillars' && (
              <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                {(current.pillarTitle || current.pillarDesc) && (
                  <div className="max-w-3xl mb-10 md:mb-12">
                    {current.pillarTabLabel && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--sky)] flex items-center gap-3 mb-4">
                        <span className="w-8 h-px bg-[var(--sky)]/50" />
                        {current.pillarTabLabel}
                      </span>
                    )}
                    {current.pillarTitle && (
                      <h3 className="font-playfair text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
                        {current.pillarTitle}
                      </h3>
                    )}
                    {current.pillarDesc && (
                      <p className="text-white/50 text-base md:text-lg font-light leading-relaxed">
                        {current.pillarDesc}
                      </p>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                  {current.pillars?.map((pillar: any, idx: number) => (
                    <div
                      key={idx}
                      className="group flex gap-5 md:gap-6 py-7 md:py-8 border-t border-white/10 hover:border-[var(--sky)]/30 transition-colors"
                    >
                      <span className="font-mono text-sm font-bold text-[var(--sky)] pt-1 w-7 shrink-0">
                        0{idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          {pillar.icon && (
                            <pillar.icon className="text-[var(--sky)] w-5 h-5 shrink-0" />
                          )}
                          <h4 className="text-lg font-bold text-white">{pillar.title}</h4>
                        </div>
                        <p className="text-white/50 leading-relaxed">{pillar.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------- MEDIA ---------------- */}
            {activeTab === 'media' && (
              <div className="animate-in fade-in duration-500 flex flex-col gap-8 md:gap-10">
                {current.videoEmbed && <div className="w-full">{current.videoEmbed}</div>}

                {current.gallery && current.gallery.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                    {current.gallery.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5 cursor-zoom-in"
                      >
                        <span className="absolute top-3 left-3 z-20 font-mono text-[9px] text-white/70 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--primary)]/0 group-hover:bg-[var(--primary)]/20 transition-colors">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                            <Maximize2 size={18} className="text-white" />
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

                {!current.videoEmbed && (!current.gallery || current.gallery.length === 0) && (
                  <div className="flex flex-col items-center justify-center py-24 md:py-28 text-center">
                    <PlayCircle className="w-10 h-10 text-white/15 mb-5" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/30">
                      {t('Sem media disponível', 'No media available')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* FOOTER SLIM */}
        <footer className="relative z-20 shrink-0 flex items-center justify-between gap-3 px-5 md:px-10 lg:px-14 h-14 md:h-16 border-t border-white/10 bg-[var(--ink-deep)]">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-base font-black italic text-white tracking-tighter">
              HB<span className="text-[var(--sky)]">.</span>
            </span>
            <span className="hidden md:block h-4 w-px bg-white/15" />
            <span className="hidden md:inline font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">
              {t('Portefólio Estratégico', 'Strategic Portfolio')}
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {(current.linkFR || current.linkES || current.linkEN || current.linkLowCost) && (
              <div className="hidden md:flex items-center gap-1.5">
                {current.linkFR && (
                  <button
                    onClick={() => window.open(current.linkFR, '_blank')}
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[var(--primary)] transition-all font-mono text-[9px] font-bold text-white/70 hover:text-white"
                  >
                    FR
                  </button>
                )}
                {current.linkES && (
                  <button
                    onClick={() => window.open(current.linkES, '_blank')}
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[var(--primary)] transition-all font-mono text-[9px] font-bold text-white/70 hover:text-white"
                  >
                    ES
                  </button>
                )}
                {current.linkEN && (
                  <button
                    onClick={() => window.open(current.linkEN, '_blank')}
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[var(--primary)] transition-all font-mono text-[9px] font-bold text-white/70 hover:text-white"
                  >
                    EN
                  </button>
                )}
                {current.linkLowCost && (
                  <button
                    onClick={() => window.open(current.linkLowCost, '_blank')}
                    className="h-8 px-3 flex items-center rounded-full bg-[var(--sky)]/10 border border-[var(--sky)]/20 hover:bg-[var(--primary)] transition-all font-mono text-[8px] font-bold uppercase text-[var(--sky)] hover:text-white"
                  >
                    Simplificado
                  </button>
                )}
              </div>
            )}

            {(current.externalLink || current.link) && (
              <button
                onClick={() => window.open(current.externalLink || current.link, '_blank')}
                className="group flex items-center gap-2.5 md:gap-3 h-9 md:h-10 pl-4 md:pl-5 pr-1.5 rounded-full bg-[var(--primary)] hover:shadow-[0_0_24px_rgba(10,92,255,0.5)] transition-all"
              >
                <span className="flex flex-col items-start leading-none">
                  <span className="font-mono text-[7px] font-bold uppercase tracking-[0.2em] text-blue-100/80 hidden sm:block">
                    {current.externalLinkLabel || t('Explorar', 'Explore')}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-white">
                    {current.externalSource || t('Aceder', 'Access')}
                  </span>
                </span>
                <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center">
                  <ArrowUpRight
                    size={15}
                    className="text-[var(--primary)] group-hover:rotate-45 transition-transform duration-500"
                  />
                </span>
              </button>
            )}
          </div>
        </footer>
      </div>
    </>
  );
}