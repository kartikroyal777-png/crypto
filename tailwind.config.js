/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#121212',
          800: '#1e1e1e',
          700: '#2d2d2d',
          600: '#3c3c3c',
          500: '#555555',
          400: '#888888',
          300: '#bbbbbb',
          200: '#eeeeee',
          100: '#f5f5f5',
        },
      }
    },
  },
  plugins: [],
}
