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
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

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

module.exports = function(evn) {
	return webpackMerge(commonConfig({env: ENV}), {
		/**
		 * Switch loaders to debug mode.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#debug
		 */
		debug: false,

		/**
		 * Developer tool to enhance debugging
		 *
		 * See: http://webpack.github.io/docs/configuration.html#devtool
		 * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
		 */
		devtool: 'source-map',

		/**
		 * Options affecting the output of the compilation.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output
		 */
		output: {

			/**
			 * The output directory as absolute path (required).
			 *
			 * See: http://webpack.github.io/docs/configuration.html#output-path
			 */
			path: helpers.root('dist'),

			/**
			 * 插入文件的访问路径
			 * Example:
			 * [webpack.config.js] publicPaht: '/dist'
			 * [index.html] <script src="/dist/a.js"></script>
			 */
			publicPath: '/',

			/**
			 * Specifies the name of each output file on disk.
			 * IMPORTANT: You must not specify an absolute path here!
			 *
			 * See: http://webpack.github.io/docs/configuration.html#output-filename
			 */
			filename: '[name].[chunkhash].bundle.js',

			/**
			 * The filename of the SourceMaps for the JavaScript files.
			 * They are inside the output.path directory.
			 *
			 * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
			 */
			sourceMapFilename: '[name].[chunkhash].bundle.map',

			/**
			 * The filename of non-entry chunks as relative path
			 * inside the output.path directory.
			 *
			 * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
			 */
			chunkFilename: '[id].[chunkhash].chunk.js'

		},

		htmlLoader: {
			minimize: false // workaround for ng2
		},

		plugins: [
			/**
			 * Plugin: NoErrorsPlugin
			 * Description: 出现错误立刻终止程序
			 */
			new NoErrorsPlugin(),

			/**
			 * Plugin: WebpackMd5Hash
			 * Description: Plugin to replace a standard webpack chunkhash with md5.
			 *
			 * See: https://www.npmjs.com/package/webpack-md5-hash
			 */
			new WebpackMd5Hash(),

			/**
			 * Plugin: DedupePlugin
			 * Description: Prevents the inclusion of duplicate code into your bundle
			 * and instead applies a copy of the function at runtime.
			 *
			 * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
			 * See: https://github.com/webpack/docs/wiki/optimization#deduplication
			 */
			new DedupePlugin(),

			/**
			 * Plugin: UglifyJsPlugin
			 * Description: Minimize all JavaScript output of chunks.
			 * Loaders are switched into minimizing mode.
			 *
			 * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
			 */
			new UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
				mangle: {
					keep_fnames: true
				}
			}),

			/**
			 * Plugin: NormalModuleReplacementPlugin
			 * Description: Replace resources that matches resourceRegExp with newResource
			 *
			 * See: http://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
			 */
			new NormalModuleReplacementPlugin(
				/angular2-hmr/,
				helpers.root('config/modules/angular2-hmr-prod.js')
			),

			/**
			 * Plugin: ExtractTextPlugin
			 * 分离 css 文件生成一个单独文件，引入页面
			 */
			new ExtractTextPlugin('[name].[hash].css'),

			/**
			 * Plugin: DefinePlugin
			 * Description: Define free variables.
			 * Useful for having development builds with debug logging or adding global constants.
			 *
			 * Environment helpers
			 *
			 * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
			 */
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
				mangle: { screw_ie8 : true, keep_fnames: true }, //prod
				compress: { screw_ie8: true }, //prod
				comments: false //prod
			}),
		],

		/**
		 * Static analysis linter for TypeScript advanced options configuration
		 * Description: An extensible linter for the TypeScript language.
		 *
		 * See: https://github.com/wbuchwalter/tslint-loader
		 */
		tslint: {
			emitErrors: true,
			failOnHint: true,
			resourcePath: 'src'
		},

		/**
		 * Html loader advanced options
		 *
		 * See: https://github.com/webpack/html-loader#advanced-options
		 */
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

		/**
		 * Include polyfills or mocks for various node stuff
		 * Description: Node configuration
		 *
		 * See: https://webpack.github.io/docs/configuration.html#node
		 */
		node: {
			global: 'window',
			crypto: 'empty',
			process: false,
			module: false,
			clearImmediate: false,
			setImmediate: false
		}

	});
}
