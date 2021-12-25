const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
    },
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
      html: {
        light: colors.red[300],
        default: colors.red[400],
        dark: colors.red[500],
      },
      a11y: {
        light: colors.zinc[300],
        default: colors.zinc[400],
        dark: colors.zinc[500],
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
      outline: ['focus-visible'],
      ringColor: ['focus-visible', 'dark'],
      ringOpacity: ['focus-visible'],
      ringWidth: ['focus-visible'],
    },
  },
  plugins: [require('@tailwindcss/typography'), 'postcss-focus-visible'],
};
