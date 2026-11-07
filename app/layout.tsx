import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import { LanguageProvider } from './ui/LanguageContext';
import ScrollReveal from './ui/ScrollReveal';

const serif = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Hugo Barros — Portefólio · Município de Braga',
  description:
    'Portefólio de Hugo Barros, Técnico Superior de Inovação e Desenvolvimento Turístico no Município de Braga: candidaturas europeias, promoção internacional, inovação digital e produto turístico.',
  icons: { icon: 'https://i.imgur.com/Dx42oze.png' },
  openGraph: {
    title: 'Hugo Barros — Portefólio · Município de Braga',
    description: 'Candidaturas europeias, promoção internacional e produto turístico para Braga.',
    images: ['https://i.imgur.com/SvJ4bdR.jpeg'],
    type: 'website',
    locale: 'pt_PT',
  },
  twitter: { card: 'summary_large_image' },
  themeColor: '#0f2540',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={`${serif.variable} ${sans.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
          <ScrollReveal />
        </LanguageProvider>
        <GoogleAnalytics gaId="G-C9ZYJ5XB1E" />
      </body>
    </html>
  );
}
