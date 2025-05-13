/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F5F5',
        primary: '#6750A4',
        secondary: '#625B71',
      },
    },
  },
  plugins: [],
};
