/**
 * @author musicq
 */

switch (process.env.NODE_ENV) {
	case 'prod':
	case 'production':
		console.log(`
------------------------------------------------
|             即将进行生产环境打包             |
------------------------------------------------`);
		module.exports = require('./config/webpack.prod')({env: 'production'});
		break;
	case 'dev':
	case 'development':
	default:
		console.log(`
----------------------------------------------------------
|                 即将进行开发环境配置                   |
|       **请注意开发环境的配置将不输出文件到本地**       |
----------------------------------------------------------`);
		module.exports = require('./config/webpack.dev')({env: 'development'});
}
