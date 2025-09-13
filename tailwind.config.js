/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './content/**/*.{json,md}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0d1117',
        'bg-alt': '#161b22',
        text: '#c9d1d9',
        accent: '#58a6ff',
        border: '#30363d'
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
};
