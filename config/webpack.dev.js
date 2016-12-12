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
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
	host: HOST,
	port: PORT,
	ENV: ENV,
	HMR: HMR
});

module.exports = function() {
	console.log(`
----------------------------------------------------------
|                 即将进行开发环境配置                   |
|       **请注意开发环境的配置将不输出文件到本地**       |
----------------------------------------------------------`);

	return webpackMerge(commonConfig({env: ENV}), {

		devtool: 'cheap-module-source-map',

		/**
		 * 文件输出配置
		 */
		output: {
			// 输出路径
			path: helpers.root('dist'),
			// 输出每一个文件的名称
			filename: '[name].bundle.js',
			// map 文件名称
			sourceMapFilename: '[name].map',
			// The filename of non-entry chunks as relative path
			chunkFilename: '[id].chunk.js',

			library: 'ac_[name]',
			libraryTarget: 'var'
		},

		plugins: [
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

			new LoaderOptionsPlugin({
				debug: true,
				options: {}
			}),
		],

		devServer: {
			port: METADATA.port,
			host: METADATA.host,
			compress: true,
			historyApiFallback: true,
			watchOptions: {
				aggregateTimeout: 300,
				poll: 1000
			},
			contentBase: helpers.root('dist'),
			// 将 node 服务转接到 4000 端口
			// 这样就可以同时获得 webpack-dev-server 的实时刷新
			// 也能同时调试接口
			proxy: {
				'/api': {
					target: 'http://localhost:4000'
				}
			}
		},

		node: {
			global: true,
			crypto: 'empty',
			process: true,
			module: false,
			clearImmediate: false,
			setImmediate: false
		}
	});
}
