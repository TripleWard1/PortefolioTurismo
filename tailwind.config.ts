import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      // Hex (e não CSS vars) para os modificadores de opacidade funcionarem: bg-navy/60
      colors: {
        paper: '#f5f3ee',
        'paper-2': '#ebe7de',
        ink: '#13202f',
        muted: '#5d6875',
        navy: '#0f2540',
        'navy-2': '#173253',
        gold: '#b8955a',
        'gold-soft': '#d9c193',
        line: 'rgba(19, 32, 47, 0.12)',
      },
      transitionTimingFunction: { soft: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};

export default config;
