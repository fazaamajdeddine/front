/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      rotate: {
        'y-180': 'rotateY(180deg)',
        'y-360': 'rotateY(360deg)',
      },
    },
  },
  plugins: [],
}
