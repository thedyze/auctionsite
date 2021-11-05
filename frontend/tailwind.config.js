const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
