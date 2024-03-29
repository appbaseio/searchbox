import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import builtins from 'rollup-plugin-node-builtins';
import babel from 'rollup-plugin-babel';
import flow from 'rollup-plugin-flow';
import pkg from './package.json';

const minify = process.env.MINIFY;
const format = process.env.FORMAT;
const es = format === 'es';
const umd = format === 'umd';
const cjs = format === 'cjs';

let output;

if (es) {
  output = { file: 'dist/@appbaseio/searchbase.es.js', format: 'es' };
} else if (umd) {
  if (minify) {
    output = {
      file: 'dist/@appbaseio/searchbase.umd.min.js',
      format: 'umd'
    };
  } else {
    output = { file: 'dist/@appbaseio/searchbase.umd.js', format: 'umd' };
  }
} else if (cjs) {
  output = { file: 'dist/@appbaseio/searchbase.cjs.js', format: 'cjs' };
} else if (format) {
  throw new Error(`invalid format specified: "${format}".`);
} else {
  throw new Error('no format specified. --environment FORMAT:xxx');
}

export default {
  input: 'src/index.js',
  output: {
    name: umd ? 'Searchbase' : '@appbaseio/searchbase',
    ...output
  },
  external: umd
    ? Object.keys(pkg.peerDependencies || {})
    : [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        ...[
          '@babel/runtime/regenerator',
          '@babel/runtime/helpers/asyncToGenerator',
          '@babel/runtime/helpers/extends',
          '@babel/runtime/helpers/defineProperty',
          '@babel/runtime/helpers/createClass'
        ]
      ],
  plugins: [
    umd
      ? resolve({
          preferBuiltins: false,
          browser: true
        })
      : {},
    umd
      ? commonjs({
          include: '../../node_modules/**'
        })
      : {},
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        ['@babel/preset-env', { loose: true, modules: false }],
        '@babel/preset-flow'
      ],
      plugins: [
        '@babel/plugin-transform-flow-strip-types',
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }]
      ]
    }),
    umd ? builtins() : {},
    umd
      ? replace({
          'process.env.NODE_ENV': JSON.stringify(
            minify ? 'production' : 'development'
          )
        })
      : null,
    minify ? terser() : null,
    flow()
  ].filter(Boolean)
};
