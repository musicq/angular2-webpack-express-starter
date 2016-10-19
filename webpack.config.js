/**
 * @author musicq
 * @create 2016-9-23
 */

switch (process.env.NODE_ENV) {
	case 'prod':
	case 'production':
		// 格式不好控制，但是可以用 vim/emacs 这些终端编辑器来编辑
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
