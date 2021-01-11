const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      ...defaultTheme.colors,
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
    minWidth: {
      ...defaultTheme.minWidth,
      '3xs': '12rem',
      '2xs': '16rem',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem',
      prose: '65ch',
      'screen-sm': '640px',
      'screen-md': '768px',
      'screen-lg': '1024px',
      'screen-xl': '1280px',
      'screen-2xl': '1536px',
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
      borderColor: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
