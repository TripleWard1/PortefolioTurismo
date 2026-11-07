import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      // Hex para os modificadores de opacidade funcionarem (bg-v/20)
      colors: {
        bg: '#0b0b0a',
        sup: '#161513',
        sup2: '#1e1c1a',
        tx: '#f2eee7',
        tx2: '#c9c3b8',
        tx3: '#8e887e',
        ln: 'rgba(242, 238, 231, 0.14)',
        v: '#ff2a2a',
      },
      transitionTimingFunction: { soft: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
    },
  },
  plugins: [],
};

export default config;
