/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'git-color': '#0d1117',
        'naranga': '#FF4500',
        'verde': '#00CC00',
      }
    },
  },
  plugins: [],
}
