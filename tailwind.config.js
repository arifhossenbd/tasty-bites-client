/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        yesterYear: ["Yesteryear", "cursive"],
      }
    },
  },
  plugins: [require('daisyui')],
}