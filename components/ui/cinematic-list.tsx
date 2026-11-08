"use client";

// Adaptado de "Cinematic List": cada linha expande ao passar o rato e revela a
// fotografia do projeto em fundo, com o título a subir e o local a entrar.
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CinematicItem {
  id: string;
  index: string;
  title: string;
  location: string;
  meta?: string;
  src: string;
  href: string;
}

function CinematicListItem({ index, title, location, meta, src, href }: CinematicItem) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex w-full flex-col justify-center overflow-hidden border-b border-border",
        // Altura: arranque rápido, fim lento (quart)
        "transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
        // Mobile: altura fixa / Desktop: expande ao passar o rato
        "h-24 md:h-28 md:hover:h-[380px] focus-visible:md:h-[380px]"
      )}
    >
      {/* Fotografia */}
      <div className="absolute inset-0 z-0 h-full w-full opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
        <img src={src} alt="" loading="lazy" className="h-full w-full object-cover scale-110 transition-transform duration-1000 ease-out group-hover:scale-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex w-full items-center justify-between gap-4 px-4 sm:px-8">
        <div className="flex min-w-0 items-center gap-5 md:gap-10">
          <span className="text-sm font-medium tabular-nums text-muted-foreground transition-colors duration-500 group-hover:text-white/70">{index}</span>
          <div className="flex min-w-0 flex-col">
            <h3
              className={cn(
                "truncate font-serif text-2xl text-foreground md:text-5xl tracking-[-0.02em]",
                "transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                "group-hover:-translate-y-2 group-hover:text-white"
              )}
            >
              {title}
            </h3>
            <span className="block truncate text-xs font-medium uppercase tracking-widest text-muted-foreground group-hover:text-white/75 md:hidden">{location}</span>
            {meta && <span className="hidden text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-white/75 md:block">{meta}</span>}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-4 md:gap-8">
          <span className="hidden translate-y-8 text-sm font-semibold uppercase tracking-widest text-transparent opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:text-white group-hover:opacity-100 md:block">
            {location}
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-500 group-hover:scale-110 group-hover:border-white group-hover:bg-white group-hover:text-ink">
            <MoveRight className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-45" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CinematicList({ items, className }: { items: CinematicItem[]; className?: string }) {
  return (
    <div className={cn("flex w-full flex-col border-t border-border", className)}>
      {items.map((item) => (
        <CinematicListItem key={item.id} {...item} />
      ))}
    </div>
  );
}
