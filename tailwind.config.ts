import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      // Paleta: neutros e tons por área
      colors: {
        ink: '#1d1d1f', // texto e elementos principais
        mute: '#6e6e73', // texto secundário
        soft: '#f5f5f7', // superfícies
        line: '#e8e8ed', // divisórias
        night: '#0b0b0c', // secção escura
        // Tons suaves (por área)
        mist: '#E6ECF1',
        clay: '#F2E6DF',
        sage: '#E5ECE3',
        sand: '#F1EBE0',
      },
      borderRadius: { '4xl': '2rem' },
      // Opacidades intermédias usadas no texto sobre fotografia e fundos escuros
      opacity: { 12: '0.12', 15: '0.15', 35: '0.35', 45: '0.45', 55: '0.55', 65: '0.65', 85: '0.85' },
    },
  },
  plugins: [],
};

export default config;
