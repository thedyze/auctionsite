const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      '100px': '200px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  
  plugins: []
};
