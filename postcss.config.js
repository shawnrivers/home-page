module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    'postcss-focus-visible': {},
    autoprefixer: {},
    ...(NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
