import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      // Hex para os modificadores de opacidade funcionarem (bg-petrol/10)
      colors: {
        cream: '#f4f1ea',
        ink: '#1a1d21',
        line: '#ddd6c8',
        petrol: '#0e5a6b',
        'petrol-dark': '#0a4351',
        // Tokens shadcn usados pelos componentes de components/ui, ligados à identidade do site
        background: '#f4f1ea',
        foreground: '#1a1d21',
        muted: { DEFAULT: '#ebe6db', foreground: '#5e6166' },
        card: { DEFAULT: '#fbfaf6', foreground: '#1a1d21' },
        popover: { DEFAULT: '#fbfaf6', foreground: '#1a1d21' },
        primary: { DEFAULT: '#0e5a6b', foreground: '#fbfaf6' },
        destructive: { DEFAULT: '#b4442f', foreground: '#fbfaf6' },
        border: '#ddd6c8',
        input: '#ddd6c8',
        ring: '#0e5a6b',
        chart: { 1: '#0e5a6b', 2: '#4f9a94', 3: '#c08a3e', 4: '#4a5560', 5: '#8a5a44' },
      },
    },
  },
  // Container queries (@container, @2xl:…) usadas pelos componentes de components/ui
  plugins: [require('@tailwindcss/container-queries')],
};

export default config;
