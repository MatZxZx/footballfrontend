/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C2DD8D',
        secondary: '#247855',
        focus: '#58C6CD',
        error: '#B81212'
      },
      fontFamily: {
        poppins: 'Poppins'
      },
      backgroundColor: {
        focus: '#58C6CD',
        secondary: '#247855',
        error: '#B81212',
        card: '#181818'
      },
      fontSize: {
        xxs: '0.6rem'
      }
    },
  },
  plugins: [],
}