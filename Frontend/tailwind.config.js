/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7EBC6E',
        secondary: 'rgba(126,188,110,0.75)',
      },
      boxShadow: {
        'custom-green': '0 4px 10px rgba(126,188,110,0.75)',
        'custom-violet': '0 4px 10px #A294F9'
      }
    },
  },
  plugins: [],
}