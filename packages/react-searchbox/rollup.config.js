import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';

import pkg from './package.json';
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/index.js',
  external: [
    'downshift',
    '@emotion/core',
    '@emotion/styled',
    '@appbaseio/searchbase'
  ],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs(),
    terser(),
    visualizer(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
