import type { Metadata } from 'next';
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import { LanguageProvider } from './ui/LanguageContext';
import ScrollReveal from './ui/ScrollReveal';
import Cursor from './ui/Cursor';

const display = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
  adjustFontFallback: false,
});

const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Hugo Barros — Estratégia de Destino · Braga',
  description:
    'Portefólio de Hugo Barros: estratégia de destino, candidaturas europeias e inovação turística no Município de Braga.',
  icons: { icon: 'https://i.imgur.com/Dx42oze.png' },
  openGraph: {
    title: 'Hugo Barros — Território & Inovação',
    description: 'Candidaturas europeias, missões internacionais e produto turístico para Braga.',
    images: ['https://i.imgur.com/SvJ4bdR.jpeg'],
    type: 'website',
    locale: 'pt_PT',
  },
  twitter: { card: 'summary_large_image' },
  themeColor: '#0a0b0c',
  colorScheme: 'dark',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={`${display.variable} ${sans.variable} ${mono.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
          <ScrollReveal />
          <Cursor />
        </LanguageProvider>
        <div className="grain" aria-hidden="true" />
        <GoogleAnalytics gaId="G-C9ZYJ5XB1E" />
      </body>
    </html>
  );
}
