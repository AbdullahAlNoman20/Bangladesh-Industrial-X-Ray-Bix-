// FILE: admin/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#C8102E', dark: '#8C0B20', light: '#F4C6CE' },
        ink: { DEFAULT: '#0B1F2A', soft: '#16303F' },
        caution: '#F5C518',
        surface: '#F5F7F8',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      keyframes: {
        loading: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(400%)' } },
      },
      animation: { loading: 'loading 1.2s ease-in-out infinite' },
    },
  },
  plugins: [],
};