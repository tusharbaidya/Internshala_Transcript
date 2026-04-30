/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f7f6f3',
          100: '#eeeae3',
          200: '#ddd5c6',
          300: '#c8b9a3',
          400: '#b09880',
          500: '#9d7f67',
          600: '#8f6f59',
          700: '#775c4b',
          800: '#614c41',
          900: '#4e3f37',
          950: '#2a2019',
        },
        moss: {
          400: '#7a9e7e',
          500: '#5d8463',
          600: '#4a6b50',
        },
        clay: {
          400: '#c47c5a',
          500: '#a85f3d',
          600: '#8a4c30',
        },
        slate: {
          750: '#2d3748',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
