import type { Metadata } from 'next';
import ContactView from './ContactView';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacto institucional: cooperação, redes europeias, candidaturas, conferências e júris.',
};

export default function Page() {
  return <ContactView />;
}
