/**
 * @author musicq
 * @create 2016-9-26
 */

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const app = express();

app.use(compression());
app.use(helmet());
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(bodyParser.json());
app.use(cookieParser());

/**
 * 接口全部放在 /api 路径下
 */
app.use('/api', require('./routes/router'));

/**
 * 配置环境
 *
 * NODE_ENV 变量:
 * [development | dev] 开发环境
 * [staging] 测试环境
 * [production | prod] 正式环境
 */
console.log('process.env.NODE_ENV:' + process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') {
	console.log('开发环境');
} else {
	(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod')
		? console.log('正式环境')
		: console.log('测试环境');

	app.use(express.static(path.join(__dirname, 'dist')));
	// 除开发环境外，其他环境（正式、测试）全都为下面入口
	// `**` 使得匹配到的全部路径都发送到 angular2 来启动程序
	app.use('**', express.static(path.join(__dirname, '/dist/index.html')))
}

/**
 * 错误处理
 */

// 捕捉 404 错误
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// 处理错误，返回错误信息
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error  : err
	});
});

module.exports = app;
