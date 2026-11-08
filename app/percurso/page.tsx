import type { Metadata } from 'next';
import TrackRecord from './TrackRecord';

export const metadata: Metadata = {
  title: 'Percurso',
  description: 'Função atual, representação internacional, distinções e cronologia dos projetos de Hugo Barros.',
};

export default function Page() {
  return <TrackRecord />;
}
