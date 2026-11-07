import type { Metadata } from 'next';
import TrackRecord from './TrackRecord';

export const metadata: Metadata = {
  title: 'Percurso',
  description: 'Missões internacionais e cronologia dos projetos de Hugo Barros, 2024–2026.',
};

export default function Page() {
  return <TrackRecord />;
}
