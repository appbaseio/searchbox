import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default [
	{
		input: 'src/index.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' },
			{
				name: 'searchbox',
				file: pkg.browser,
				format: 'umd'
			}
		],
		external: ['immediate'],
		plugins: [resolve(), commonjs(), terser()]
	}
];
