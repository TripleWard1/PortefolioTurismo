import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import { LanguageProvider } from './ui/LanguageContext';
import Header from './ui/Header';
import Footer from './ui/Footer';
import Reveal from './ui/Reveal';
import Parallax from './ui/Parallax';
import Intro from './ui/Intro';
import BackToTop from './ui/BackToTop';
import CommandK from './ui/CommandK';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
// Serifada em itálico, só para palavras de destaque nos títulos
const serif = Instrument_Serif({ subsets: ['latin'], variable: '--font-serif', display: 'swap', weight: '400', style: ['normal', 'italic'], adjustFontFallback: false });

export const metadata: Metadata = {
  title: { default: 'Hugo Barros | Projetos de turismo', template: '%s · Hugo Barros' },
  description:
    'Portefólio profissional de Hugo Barros: estratégia de destino, candidaturas e redes europeias, promoção internacional, inovação digital e produto turístico.',
  icons: { icon: 'https://i.imgur.com/Dx42oze.png' },
  openGraph: {
    title: 'Hugo Barros | Projetos de turismo',
    description: 'Estratégia de destino, candidaturas europeias, promoção internacional e produto turístico.',
    images: ['https://i.imgur.com/SvJ4bdR.jpeg'],
    type: 'website',
    locale: 'pt_PT',
  },
  twitter: { card: 'summary_large_image' },
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        {/* Decide antes do primeiro desenho se o ecrã de entrada aparece (uma vez por sessão) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var d=document.documentElement;if(sessionStorage.getItem('hb-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro-seen')}else{d.classList.add('intro-on')}}catch(e){document.documentElement.classList.add('intro-seen')}",
          }}
        />
      </head>
      <body className={`${sans.variable} ${serif.variable} font-sans antialiased`}>
        <LanguageProvider>
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <Reveal />
          <Parallax />
          <Intro />
          <BackToTop />
          <CommandK />
        </LanguageProvider>
        <GoogleAnalytics gaId="G-C9ZYJ5XB1E" />
      </body>
    </html>
  );
}
