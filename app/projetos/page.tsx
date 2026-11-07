import { Suspense } from 'react';
import type { Metadata } from 'next';
import ProjectsView from './ProjectsView';

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Todos os projetos de Hugo Barros no Município de Braga, organizados por área de atuação.',
};

export default function ProjectsPage() {
  return (
    <Suspense>
      <ProjectsView />
    </Suspense>
  );
}
