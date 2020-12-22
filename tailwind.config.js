const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      ...colors,
      react: {
        light: colors.blue[400],
        default: colors.blue[500],
        dark: colors.blue[600],
      },
      css: {
        light: colors.indigo[400],
        default: colors.indigo[500],
        dark: colors.indigo[600],
      },
      draft: {
        light: colors.gray[700],
        default: colors.gray[800],
        dark: colors.gray[900],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
