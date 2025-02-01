/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        spicy: {
          pink: '#EC4899',
          teal: '#2DD4BF',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      dropShadow: {
        'glow': '0 0 10px rgba(236, 72, 153, 0.5)',
      },
    },
  },
  plugins: [],
};
