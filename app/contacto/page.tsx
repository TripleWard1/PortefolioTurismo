import type { Metadata } from 'next';
import ContactView from './ContactView';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contactar Hugo Barros, Município de Braga.',
};

export default function Page() {
  return <ContactView />;
}
