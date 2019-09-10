import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    external: ['@appbaseio/searchbase'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      postcss({
        minimize: true
      })
    ]
  }
];
