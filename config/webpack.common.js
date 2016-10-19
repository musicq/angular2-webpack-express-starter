/**
 * @author musicq
 * @create 2016-9-23
 */

const webpack = require('webpack');
const helpers = require('./helpers');

/**
 * Webpack Plugins
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

/**
 * postcss plugins
 */
const precss = require('precss');
const autoprefixer = require('autoprefixer');

/**
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
	title: '北方网客户端移动内容管理系统',
	baseUrl: '/',
	isDevServer: helpers.isWebpackDevServer()
};

module.exports = function(options) {
	return {
		/**
		 * static metadata for index.html
		 */
		metadata: METADATA,

		/**
		 * 入口文件
		 */
		entry: {
			polyfills: './src/polyfills',
			vendor: './src/vendor',
			main: './src/main',
		},

		/**
		 * 解析文件名
		 */
		resolve: {
			extensions: ['', '.ts', '.js'],

			// Make sure root is src
			root: helpers.root('src'),
		},

		/**
		 * 加载器
		 */
		module: {
			loaders: [
				{
					test: /\.ts$/,
					loaders: [
						'awesome-typescript-loader',
						'angular2-template-loader',
						// 使 angular2 支持 webpack 1.x 懒加载
						'angular2-router-loader'
					],
					exclude: [/\.(spec|e2e)\.ts$/]
				},
				{
					test: /\.css$/,
					exclude: helpers.root('src', 'app'),
					loader: ExtractTextPlugin.extract('style', 'css?sourceMap', 'postcss')
				},
				{
					test: /\.css$/,
					include: helpers.root('src', 'app'),
					loaders: ['to-string-loader', 'css-loader', 'postcss']
				},
				{
					test: /\.html$/,
					loader: 'raw-loader',
					exclude: [helpers.root('src/index.html')]
				},
				{
					test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
					loader: 'file?name=assets/[name].[hash].[ext]'
				}
			],

			postLoaders: [
				{
					test: /\.js$/,
					loader: 'string-replace-loader',
					query: {
						search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
						replace: 'var sourceMappingUrl = "";',
						flags: 'g'
					}
				}
			]
		},

		/**
		 * postcss 处理
		 */
		postcss: function () {
			return [precss, autoprefixer];
		},

		plugins: [
			/**
			 * 资源文件
			 */
			new AssetsPlugin({
				path: helpers.root(),
				filename: 'webpack-assets.json',
				prettyPrint: true
			}),

			/**
			 * 将 typescript 的类型检查分离出在另一个进程，
			 * 这样在打包 webpack 时候不需要等待
			 */
			new ForkCheckerPlugin(),

			/**
			 * 提取公共部分文件
			 */
			new webpack.optimize.CommonsChunkPlugin({
				name: [ 'main', 'vendor', 'polyfills' ]
			}),

			/**
			 * 将一些不需要处理的资源拷贝出来
			 */
			new CopyWebpackPlugin([{
				from: 'src/assets',
				to: 'assets'
			}]),

			/**
			 * 处理 html
			 */
			new HtmlWebpackPlugin({
				template: 'src/index.html',
				chunksSortMode: 'dependency'
			})
		],

		/*
		 * Include polyfills or mocks for various node stuff
		 * Description: Node configuration
		 *
		 * See: https://webpack.github.io/docs/configuration.html#node
		 */
		node: {
			global: 'window',
			crypto: 'empty',
			process: true,
			module: false,
			clearImmediate: false,
			setImmediate: false
		}

	}

}
