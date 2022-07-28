/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'Helvetica', 'Arial'],
        'roboto-italic': ['Roboto Italic', 'Helvetica', 'Arial'],
        'roboto-bold': ['Roboto Bold', 'Helvetica', 'Arial'],
        'nunito-black': ['Nunito Black', 'Helvetica', 'Arial'],
        'nunito-bold': ['Nunito bold', 'Helvetica', 'Arial']
      }
    },
  },
  plugins: [],
}
