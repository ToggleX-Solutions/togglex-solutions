/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'togglex': {
          'black': '#000000',
          'yellow': '#FFD700',
          'gray': '#1A1A1A',
        },
      },
    },
  },
  plugins: [],
} 