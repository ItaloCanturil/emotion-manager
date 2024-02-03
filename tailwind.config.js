/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#D4ADFC',
      second: '#E2E2E2',
      'emo-bg-gray': '#f6fff8',
      ...colors,
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('daisyui'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
