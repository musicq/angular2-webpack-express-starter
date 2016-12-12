/**
 * @author musicq
 */

const webpack = require('webpack');
const helpers = require('./helpers');

/**
 * Webpack Plugins
 */
const AssetsPlugin = require('assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');

/**
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
	title: 'Angular2 Webpack Express Starter ',
	baseUrl: '/',
	isDevServer: helpers.isWebpackDevServer()
};

module.exports = function(options) {
	let isProd = options.env === 'production';

	return {
		/**
		 * 文件入口
		 */
		entry: {
			polyfills: './src/polyfills.ts',
			vendor: './src/vendor.ts',
			main: './src/main.ts'
		},

		/**
		 * 解析文件名
		 */
		resolve: {
			extensions: ['.ts', '.js', '.json'],

			modules: [helpers.root('src'), helpers.root('node_modules')]
		},

		/**
		 * 对不同模块文件处理
		 */
		module: {
			rules: [
				/**
				 * 处理 ts 文件
				 * - angular2-template-loader 可以使得 ng2 组件内的 templateUrl|styleUrls 像这样使用：
				 *		templateUrl: './app.component.html'
				 *		styleUrls: ['./app.component.css']
				 */
				{
					test: /\.ts$/,
					use: [
						'awesome-typescript-loader',
						'angular2-template-loader',
						'angular2-router-loader'
					],
					exclude: [/\.(spec|e2e)\.ts$/]
				},

				{
				  test: /\.json$/,
				  use: 'json-loader'
				},

				/**
				 * 处理全局 css
				 */
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract({
						fallbackLoader: 'style-loader',
						loader: ['css-loader?modules&importLoaders=1', 'postcss-loader?sourceMap=inline']
					}),
					exclude: [helpers.root('src', 'app')],
				},

				/**
				 * 处理组件内 css
				 */
				{
					test: /\.css$/,
					include: helpers.root('src', 'app'),
					use: ['to-string-loader', 'css-loader?modules&importLoaders=1', 'postcss-loader?sourceMap=inline']
				},

				/**
				 * 处理图片
				 */
				{
					test: /\.(jpg|png|gif)$/,
					use: 'file-loader'
				},

				/**
				 * 处理 html
				 */
				{
					test: /\.html$/,
					use: 'raw-loader',
					exclude: [helpers.root('src', 'index.html')]
				}
			]
		},

		plugins: [
			/**
			 * 资源文件
			 */
			new AssetsPlugin({
				path: helpers.root('dist'),
				filename: 'webpack-assets.json',
				prettyPrint: true
			}),

			/**
			 * 分离 css 文件
			 */
			new ExtractTextPlugin({
				filename: '[name].bundle.css',
				allChunks: true
			}),

			/**
			 * 将 typescript 的类型检查分离出在另一个进程，
			 * 这样在打包 webpack 时候不需要等待
			 */
			new ForkCheckerPlugin(),

			/**
			 * 提取公共部分文件
			 */
			new CommonsChunkPlugin({
				name: ['polyfills', 'vendor'].reverse()
			}),

			new ContextReplacementPlugin(
				// The (\\|\/) piece accounts for path separators in *nix and Windows
				/angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
				helpers.root('src'), // location of your src
				{
					// your Angular Async Route paths relative to this root directory
				}
			),

			/**
			 * 将一些不需要处理的资源拷贝出来
			 */
			new CopyWebpackPlugin([{
				from: 'src/assets',
				to: 'assets'
			}]),

			/**
			 * 为 html 提供一些元数据
			 */
			new HtmlWebpackPlugin({
				template: 'src/index.html',
				title: METADATA.title,
				chunksSortMode: 'dependency',
				metadata: METADATA,
				inject: 'head'
			}),

			/**
			 * angular 有时会在 domready 事件之前运行
			 * 会报 The Selector '' did not match any elements 的错误
			 */
			new ScriptExtHtmlWebpackPlugin({
				defaultAttribute: 'defer'
			}),

			// Fix Angular 2
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)async/,
				helpers.root('node_modules/@angular/core/src/facade/async.js')
			),
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)collection/,
				helpers.root('node_modules/@angular/core/src/facade/collection.js')
			),
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)errors/,
				helpers.root('node_modules/@angular/core/src/facade/errors.js')
			),
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)lang/,
				helpers.root('node_modules/@angular/core/src/facade/lang.js')
			),
			new NormalModuleReplacementPlugin(
				/facade(\\|\/)math/,
				helpers.root('node_modules/@angular/core/src/facade/math.js')
			)
		],

		node: {
			global: true,
			crypto: 'empty',
			process: true,
			module: false,
			clearImmediate: false,
			setImmediate: false
		}

	};
}
