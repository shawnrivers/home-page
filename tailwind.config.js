const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'mouse-hover': { raw: '(hover:hover) and (pointer: fine)' },
      },
    },
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
    },
    colors: {
      ...colors,
      react: {
        light: colors.sky[400],
        default: colors.sky[500],
        dark: colors.sky[600],
      },
      css: {
        light: colors.violet[400],
        default: colors.violet[500],
        dark: colors.violet[600],
      },
      html: {
        light: colors.red[400],
        default: colors.red[500],
        dark: colors.red[600],
      },
      a11y: {
        light: colors.orange[400],
        default: colors.orange[500],
        dark: colors.orange[600],
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
