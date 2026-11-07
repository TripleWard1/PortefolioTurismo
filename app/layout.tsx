import type { Metadata } from 'next';
import { Newsreader, Schibsted_Grotesk } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import { LanguageProvider } from './ui/LanguageContext';
import Header from './ui/Header';
import Footer from './ui/Footer';
import Opening from './ui/Opening';
import Reveal from './ui/Reveal';

const serif = Newsreader({ subsets: ['latin'], variable: '--font-serif', display: 'swap', weight: ['400', '500', '600'], style: ['normal', 'italic'] });
const sans = Schibsted_Grotesk({ subsets: ['latin'], variable: '--font-sans', display: 'swap', weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: { default: 'Hugo Barros — Portefólio', template: '%s · Hugo Barros' },
  description:
    'Portefólio de Hugo Barros, Técnico Superior de Inovação e Desenvolvimento Turístico no Município de Braga: candidaturas europeias, promoção internacional, inovação digital e produto turístico.',
  icons: { icon: 'https://i.imgur.com/Dx42oze.png' },
  openGraph: {
    title: 'Hugo Barros — Portefólio',
    description: 'Estratégia de destino, candidaturas europeias e produto turístico para Braga.',
    images: ['https://i.imgur.com/SvJ4bdR.jpeg'],
    type: 'website',
    locale: 'pt_PT',
  },
  twitter: { card: 'summary_large_image' },
  themeColor: '#f4f1ea',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={`${serif.variable} ${sans.variable} font-sans antialiased`}>
        <LanguageProvider>
          <Opening />
          <Header />
          <main>{children}</main>
          <Footer />
          <Reveal />
        </LanguageProvider>
        <GoogleAnalytics gaId="G-C9ZYJ5XB1E" />
      </body>
    </html>
  );
}
