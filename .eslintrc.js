module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb-base/legacy',
    'react-app',
    'prettier',
    'plugin:flowtype-errors/recommended'
  ],
  plugins: ['jest', 'prettier'],
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true
  },
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': ['error'],
    indent: 0,
    'no-tabs': 0,
    'eol-last': ['error', 'always'],
    'no-underscore-dangle': 0,
    // allow specifying true explicitly for boolean props
    "react/jsx-boolean-value": 0,
  }
};
