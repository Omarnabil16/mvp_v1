/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0A0A0A',
          lighter: '#141414',
          card: '#1A1A1A'
        },
        brand: {
          red: '#FF3333',
          purple: '#B624FF',
          orange: '#FF6B24',
          cyan: '#24FFF3',
          pink: '#FF24B6'
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    }
  },
  plugins: []
};