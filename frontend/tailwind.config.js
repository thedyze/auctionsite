const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      'myGreen': '#34D399',
      'myPurple': '#C4B5FD'
    },
    fontFamily: {
      'logoFont': ['"Denk One"', 'sans-serif'], // Ensure fonts with spaces have " " surrounding it.
    },
    minHeight: {
      '100px': '200px',
    },
    extend: {
      // backgroundImage: {
      //   'img-up1': "src={preview1}",
      // }
    },
  },
  variants: {
    extend: {},
  },

  plugins: []
};
