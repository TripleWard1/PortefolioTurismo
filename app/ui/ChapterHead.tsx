'use client';

import type { ReactNode } from 'react';

export default function ChapterHead({
  n,
  label,
  title,
  accent,
  children,
  tone = 'dark',
  className = '',
}: {
  n: string;
  label: string;
  title: ReactNode;
  accent: ReactNode;
  children?: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const muted = tone === 'dark' ? 'text-[var(--fg-3)]' : 'text-ink/45';
  const body = tone === 'dark' ? 'text-[var(--fg-2)]' : 'text-ink/65';
  const head = tone === 'dark' ? 'text-bone' : 'text-ink';
  const rule = tone === 'dark' ? 'bg-[var(--line-2)]' : 'bg-ink/15';
  return (
    <header className={`grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 items-end ${className}`}>
      <div className="lg:col-span-8">
        <div data-reveal className={`flex items-center gap-3 label mb-7 ${muted}`}>
          <span className="text-ember tabular">{n}</span>
          <span className={`w-6 h-px ${rule}`} />
          {label}
        </div>
        <h2 data-reveal className={`display text-balance ${head}`}>
          {title} <em className="text-ember">{accent}</em>
        </h2>
      </div>
      {children && (
        <p data-reveal className={`lg:col-span-4 text-[17px] leading-relaxed text-pretty ${body}`}>
          {children}
        </p>
      )}
    </header>
  );
}
