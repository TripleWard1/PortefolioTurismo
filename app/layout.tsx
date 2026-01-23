import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from './ui/LanguageContext';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '700', '900'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Hugo Barros | Portfolio Estratégico',
  description:
    'Estratégia de destino, inovação territorial e desenvolvimento turístico — Município de Braga.',
  icons: {
    icon: 'https://imgur.com/Dx42oze.png',
  },
  openGraph: {
    title: 'Hugo Barros | Território & Inovação',
    description: 'Arquitetura de estratégia urbana e turismo inteligente.',
    images: ['https://i.imgur.com/SvJ4bdR.jpeg'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body
        className={`
          ${inter.variable} 
          ${playfair.variable} 
          font-sans 
          antialiased 
          bg-[#fcfdfe] 
          text-slate-900 
          selection:bg-blue-600 
          selection:text-white
        `}
      >
        <LanguageProvider>
          {/* Camada de Fundo Dinâmica */}
          <div
            className="mesh-bg fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* Conteúdo Principal */}
          <div className="relative z-10">
            {children}
          </div>
        </LanguageProvider>

        {/* Google Analytics - Inserido corretamente no final do body */}
        <GoogleAnalytics gaId="G-C9ZYJ5XB1E" />
      </body>
    </html>
  );
}