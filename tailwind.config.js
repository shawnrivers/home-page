const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-parkinsans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-source-code-pro)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        gray: colors.zinc,
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('@tailwindcss/typography')],
};
