interface ChapterProps {
  number: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function Chapter({
  number,
  title,
  description,
  children,
}: ChapterProps) {
  return (
    <section className="relative py-32 border-t border-zinc-100 first:border-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-4">
          <span
            className="text-9xl font-playfair font-black text-transparent leading-none opacity-10"
            style={{ WebkitTextStroke: '1px #1a1a1a' }}
          >
            {number}
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair mt-4 text-zinc-900 leading-tight">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-8 lg:pt-24">
          <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
