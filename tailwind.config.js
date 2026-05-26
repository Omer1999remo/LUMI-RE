/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'warm-gray': '#f5f2ed',
        'charcoal': '#2c2c2c',
        'soft-black': '#1a1a1a',
        'clay': '#c4a484',
        'sage': '#9ca3af',
      },
    },
  },
  plugins: [],
}
