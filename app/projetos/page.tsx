import { Suspense } from 'react';
import type { Metadata } from 'next';
import ProjectsView from './ProjectsView';

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Projetos de turismo de Hugo Barros, organizados por área de competência.',
};

export default function ProjectsPage() {
  return (
    <Suspense>
      <ProjectsView />
    </Suspense>
  );
}
