import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      // Paleta monocromática
      colors: {
        ink: '#1d1d1f', // texto e elementos principais
        mute: '#6e6e73', // texto secundário
        soft: '#f5f5f7', // superfícies
        line: '#e8e8ed', // divisórias
        night: '#0b0b0c', // secção escura
      },
      borderRadius: { '4xl': '2rem' },
    },
  },
  plugins: [],
};

export default config;
