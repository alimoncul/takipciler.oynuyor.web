/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-primary': '#3b82f6',
        'game-secondary': '#6366f1',
        'game-accent': '#8b5cf6',
      }
    },
  },
  plugins: [],
}