import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudy from './CaseStudy';
import { PROJECTS, byId } from '../../ui/projects';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = byId(params.id);
  if (!p) return {};
  return {
    title: p.title.pt,
    description: p.summary.pt,
    openGraph: { title: `${p.title.pt} · Hugo Barros`, description: p.summary.pt, images: [p.image] },
  };
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  if (!byId(params.id)) notFound();
  return <CaseStudy id={params.id} />;
}
