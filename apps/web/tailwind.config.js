/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      colors: {
        willow: {
          50: "#f8f8ed",
          100: "#eff0d7",
          200: "#dee2b4",
          300: "#c8cf87",
          400: "#b7c06f",
          500: "#949f43",
          600: "#737e32",
          700: "#58612a",
          800: "#484e26",
          900: "#3d4324",
          950: "#20240f",
        },
        "hit-pink": {
          50: "#fef4ee",
          100: "#fce6d8",
          200: "#f9c9af",
          300: "#f5a883",
          400: "#ef7448",
          500: "#eb5124",
          600: "#dc381a",
          700: "#b72817",
          800: "#92221a",
          900: "#751f19",
          950: "#3f0c0b",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
