var resolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')
var babel = require('rollup-plugin-babel')

const pkg = require('./package.json')

module.exports = [
	// browser-friendly UMD build
	{
		input: './src/index.js',
		output: {
			name: pkg.name,
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			resolve(),
			commonjs(),
			babel({
				exclude: ['./node_modules/**']
			})
		]
	},

	{
		input: './src/index.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
		plugins: [
			babel({
				exclude: ['./node_modules/**']
			})
		]
	}
];