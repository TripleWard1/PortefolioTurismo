import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap py-32 text-center">
      <p className="t-label text-mute">404</p>
      <h1 className="mt-4 t-h2 text-ink">Página não encontrada</h1>
      <p className="mt-4 text-mute">O endereço pode ter mudado. / This page could not be found.</p>
      <Link href="/projetos" className="mt-8 inline-flex h-12 px-6 rounded-full bg-ink text-white text-[15px] font-medium items-center">
        Ver projetos
      </Link>
    </div>
  );
}
