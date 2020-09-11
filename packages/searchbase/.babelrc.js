module.exports = {
  //for enabling es6 syntax in test
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  //for supporting flow typed functions
  plugins: ['@babel/plugin-transform-flow-strip-types']
};
