/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#6B2737",
          secondary: "#C8803C",
          bg: "#F5ECD7",
          light: "#F9F3E8",
        },
      },
    },
  },
  plugins: [],
};