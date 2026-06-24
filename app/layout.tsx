import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from './ui/LanguageContext';
import ScrollReveal from './ui/ScrollReveal';
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

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Hugo Barros | Portfolio Estratégico',
  description:
    'Estratégia de destino, inovação territorial e desenvolvimento turístico — Município de Braga.',
  icons: { icon: 'https://imgur.com/Dx42oze.png' },
  openGraph: {
    title: 'Hugo Barros | Território & Inovação',
    description: 'Arquitetura de estratégia urbana e turismo inteligente.',
    images: ['https://i.imgur.com/SvJ4bdR.jpeg'],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${mono.variable} font-sans antialiased bg-[var(--paper)] text-slate-900`}
      >
        <LanguageProvider>
          <div className="mesh-bg fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />
          <div className="relative z-10">{children}</div>
          <ScrollReveal />
        </LanguageProvider>
        <GoogleAnalytics gaId="G-C9ZYJ5XB1E" />
      </body>
    </html>
  );
}