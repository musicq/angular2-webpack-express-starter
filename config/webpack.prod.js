/**
 * @author musicq
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
	host: HOST,
	port: PORT,
	ENV: ENV,
	HMR: false
});

module.exports = function() {
	console.log(`
------------------------------------------------
|             即将进行生产环境打包             |
------------------------------------------------`);

	return webpackMerge(commonConfig({env: ENV}), {

		devtool: 'source-map',

		/**
		 * Options affecting the output of the compilation.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output
		 */
		output: {
			path: helpers.root('dist'),
			publicPath: '/',
			filename: '[name].[chunkhash].bundle.js',
			sourceMapFilename: '[name].[chunkhash].bundle.map',
			chunkFilename: '[id].[chunkhash].chunk.js'
		},

		plugins: [
			/**
			 * Plugin: WebpackMd5Hash
			 * Description: Plugin to replace a standard webpack chunkhash with md5.
			 *
			 * See: https://www.npmjs.com/package/webpack-md5-hash
			 */
			new WebpackMd5Hash(),

			new DefinePlugin({
				'ENV': JSON.stringify(METADATA.ENV),
				'HMR': METADATA.HMR,
				'process.env': {
					'ENV': JSON.stringify(METADATA.ENV),
					'NODE_ENV': JSON.stringify(METADATA.ENV),
					'HMR': METADATA.HMR,
				}
			}),

			/**
			 * Plugin: UglifyJsPlugin
			 * Description: Minimize all JavaScript output of chunks.
			 * Loaders are switched into minimizing mode.
			 *
			 * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
			 */
            new UglifyJsPlugin({
				// beautify: true, //debug
				// mangle: false, //debug
				// dead_code: false, //debug
				// unused: false, //debug
				// deadCode: false, //debug
				// compress: {
				//   screw_ie8: true,
				//   keep_fnames: true,
				//   drop_debugger: false,
				//   dead_code: false,
				//   unused: false
				// }, // debug
				// comments: true, //debug


				beautify: false, //prod
				output: {
					comments: false
				}, //prod
				mangle: {
					screw_ie8: true
				}, //prod
				compress: {
					screw_ie8: true,
					warnings: false,
					conditionals: true,
					unused: true,
					comparisons: true,
					sequences: true,
					dead_code: true,
					evaluate: true,
					if_return: true,
					join_vars: true,
					negate_iife: false // we need this for lazy v8
				},
			}),

            /**
			 * Plugin: NormalModuleReplacementPlugin
			 * Description: Replace resources that matches resourceRegExp with newResource
			 *
			 * See: http://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
			 */
			new NormalModuleReplacementPlugin(
				/angular2-hmr/,
				helpers.root('config/empty.js')
			),

			new NormalModuleReplacementPlugin(
				/zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
				helpers.root('config/empty.js')
			),

			new LoaderOptionsPlugin({
				minimize: true,
				debug: false,
				options: {

					/**
					 * Html loader advanced options
					 *
					 * See: https://github.com/webpack/html-loader#advanced-options
					 */
					// TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
					htmlLoader: {
						minimize: true,
						removeAttributeQuotes: false,
						caseSensitive: true,
						customAttrSurround: [
							[/#/, /(?:)/],
							[/\*/, /(?:)/],
							[/\[?\(?/, /(?:)/]
						],
						customAttrAssign: [/\)?\]?=/]
					},

				}
			}),
		],

		node: {
			global: true,
			crypto: 'empty',
			process: false,
			module: false,
			clearImmediate: false,
			setImmediate: false
		}
	});
}
