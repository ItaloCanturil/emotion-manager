/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#4CC9F0',
      second: '#E2E2E2'
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('daisyui'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

