module.exports = {
  purge: [
    './src/**/*.js',
  ],
  theme: {
    extend: {
      screens: {
        xs: '425px'
      },
      colors: {
        pink: {
          '100': '#ffdfe9',
          '200': '#ff9fbe',
          '300': '#ff6093',
          '400': '#ff6093',
          '500': '#ff2a6f',
          '600': '#df0048',
          '700': '#9f0034',
          '800': '#60001f',
          '900': '#20000a'
        }
      }
    }
  },
  variants: {},
  plugins: []
};
