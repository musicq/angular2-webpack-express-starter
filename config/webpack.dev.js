/**
 * @author musicq
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '3000';
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
	host: HOST,
	port: PORT,
	ENV: ENV,
	HMR: HMR
});

module.exports = function(env) {
	return webpackMerge(commonConfig({env: ENV}), {
		/**
		 * 一些元数据，用来在 index.html 中访问并配置
		 */
		metadata: METADATA,

		/**
		 * 启动加载器的 debug 模式
		 */
		debug: true,

		/**
		 * debug 工具模式
		 */
		devtool: 'cheap-module-eval-source-map',

		/**
		 * 文件输出配置
		 */
		output: {
			// 输出路径
			path: helpers.root('dist'),
			// 输出每一个文件的名称
			filename: '[name].js',
			// map 文件名称
			sourceMapFilename: '[name].map',
			// The filename of non-entry chunks as relative path
			chunkFilename: '[id].chunk.js',

			library: 'ac_[name]',
			libraryTarget: 'var'
		},

		plugins: [
			/**
			 * 分离 css 文件
			 */
			new ExtractTextPlugin('[name].css'),
			/**
			 * definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
			 */
			new DefinePlugin({
				'ENV': JSON.stringify(METADATA.ENV),
				'HMR': METADATA.HMR,
				'process.env': {
					'ENV': JSON.stringify(METADATA.ENV),
					'NODE_ENV': JSON.stringify(METADATA.ENV),
					'HMR': METADATA.HMR
				}
			}),

			new NamedModulesPlugin()
		],

		/**
		 * Static analysis linter for TypeScript advanced options configuration
		 * Description: An extensible linter for the TypeScript language.
		 *
		 * See: https://github.com/wbuchwalter/tslint-loader
		 */
		tslint: {
			emitErrors: false,
			failOnHint: false,
			resourcePath: 'src'
		},

		/**
		 * Webpack Development Server configuration
		 * Description: The webpack-dev-server is a little node.js Express server.
		 * The server emits information about the compilation state to the client,
		 * which reacts to those events.
		 *
		 * See: https://webpack.github.io/docs/webpack-dev-server.html
		 */
		devServer: {
			port: METADATA.port,
			host: METADATA.host,
			historyApiFallback: true,
			stats: 'minimal',
			watchOptions: {
				aggregateTimeout: 300,
				poll: 1000
			},
			outputPath: helpers.root('dist'),
			// 将 node 服务转接到 4000 端口
			// 这样就可以同时获得 webpack-dev-server 的实时刷新
			// 也能同时调试接口
			proxy: {
				'/api': {
					target: 'http://localhost:4000'
				}
			}
		},

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

	});
}
