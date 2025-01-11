/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/index.css",
    "./src/**/*.{css}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
      },
      backgroundColor: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
      }
    },
  },
  plugins: [],
};
