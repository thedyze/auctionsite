const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'logo': ['"Fredoka One"',]
    },
    extend: {
      backgroundImage: {
        'homebg': "url('src/images/home-top.jpeg')",
      },
      colors: {
        myGr: { dark: "#35825C", light: "#6ACF9D", disabled: "#CAEABF" },
        myPr: { dark: "#9540A6", light: "#B37ECF" },
        myAw: "#F9F7F5",
        myRe: "#d62b36",
      },
      fontFamily: {
        myPtext: ['"Open Sans Condensed"', 'sans-serif'],
        myHtext: ['"Dosis"', 'sans-serif'] // Ensure fonts with spaces have " " surrounding it.
      },
    },
  },
  variants: {
    extend: {},
  },

  plugins: [],
};
