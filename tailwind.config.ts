import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      // Hex para os modificadores de opacidade funcionarem (bg-petrol/10)
      colors: {
        cream: '#f4f1ea',
        card: '#fbfaf6',
        ink: '#1a1d21',
        muted: '#5e6166',
        line: '#ddd6c8',
        petrol: '#0e5a6b',
        'petrol-dark': '#0a4351',
      },
    },
  },
  plugins: [],
};

export default config;
