const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        myGr: { dark: "#35825C", light: "#6ACF9D", disabled: "#CAEABF" },
        myPr: { dark: "#9540A6", light: "#B37ECF" },
        myAw: "#F9F7F5",
        myRe: "#d62b36",
      },
    },
  },
  variants: {
    extend: {},
  },

  plugins: [],
};
