'use client';

import Link from 'next/link';
import { ArrowRight, Linkedin, Mail } from 'lucide-react';
import { useLang } from './LanguageContext';
import { NAV } from './Header';
import { AREAS } from './projects';
import { WordmarkRevealFooter } from '@/components/ui/wordmark-reveal-footer';

export const EMAIL = 'hugo.barros@cm-braga.pt';
export const LINKEDIN = 'https://www.linkedin.com/in/hugo-abreu-barros/';

export default function Footer() {
  const { t, lang } = useLang();
  return (
    <div className="mt-28">
      {/* Chamada para contacto, logo acima do rodapé */}
      <section className="wrap">
        <div className="rounded-[28px] border border-line bg-card px-7 py-10 md:px-12 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center" data-reveal>
          <h2 className="lg:col-span-8 font-serif text-[clamp(1.8rem,1.3rem+1.8vw,2.9rem)] leading-[1.08] text-ink text-balance">
            {t('Cooperação institucional, redes europeias ou um novo projeto?', 'Institutional cooperation, European networks or a new project?')}
          </h2>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link href="/contacto" className="group h-12 pl-6 pr-5 rounded-full bg-ink text-cream font-semibold text-[15px] inline-flex items-center gap-3 hover:bg-petrol transition-colors">
              {t('Falar comigo', 'Get in touch')}
              <span className="w-6 h-6 rounded-full bg-cream/15 grid place-items-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <WordmarkRevealFooter
        className="mt-16"
        wordmark="Hugo Barros"
        brand={{
          name: 'Hugo Barros',
          blurb: t(
            'Técnico Superior de Inovação e Desenvolvimento Turístico. Divisão de Atividades Económicas e Turismo, Município de Braga.',
            'Senior Officer for Tourism Innovation and Development. Economic Activities and Tourism Division, Municipality of Braga.'
          ),
        }}
        columns={[
          { title: t('Páginas', 'Pages'), links: NAV.map((n) => ({ label: n[lang], href: n.href })) },
          { title: t('Áreas', 'Areas'), links: AREAS.map((a) => ({ label: a.label[lang], href: `/projetos?area=${a.id}` })) },
          {
            title: t('Contacto', 'Contact'),
            links: [
              { label: EMAIL, href: `mailto:${EMAIL}` },
              { label: 'LinkedIn', href: LINKEDIN },
            ],
          },
        ]}
        status={{ label: t('Disponível para cooperação institucional', 'Open to institutional cooperation'), tone: 'ok' }}
        offices={[
          { city: 'Braga', timeZone: 'Europe/Lisbon' },
          { city: t('Bruxelas', 'Brussels'), timeZone: 'Europe/Brussels' },
        ]}
        socials={[
          { label: 'LinkedIn', href: LINKEDIN, icon: <Linkedin className="w-4 h-4" /> },
          { label: 'Email', href: `mailto:${EMAIL}`, icon: <Mail className="w-4 h-4" /> },
        ]}
      />
    </div>
  );
}
