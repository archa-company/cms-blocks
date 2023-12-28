/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      gridColumn: {
        'span-fif': '50% 1fr',
      },
      screens: {
        'sm-mw': { max: '639px' },
      },
    },
  },
  plugins: [],
};
