import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap py-28 text-center">
      <p className="kicker">404</p>
      <h1 className="mt-3 h-section">Página não encontrada</h1>
      <p className="mt-4 text-muted-foreground">O endereço pode ter mudado. / This page could not be found.</p>
      <Link href="/projetos" className="mt-8 inline-flex h-12 px-6 rounded-lg bg-petrol text-white font-semibold items-center">
        Ver projetos
      </Link>
    </div>
  );
}
