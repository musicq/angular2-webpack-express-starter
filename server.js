const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api_router = require('./routes/router');

const app = express();


/***************************************************************************/
/*                              middle ware                                */
/***************************************************************************/
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * 路由
 */
app.use('/api', api_router);

app.use(express.static(path.join(__dirname, 'dist')));

/**
 * 配置环境
 *
 * NODE_ENV 变量:
 * [development | dev] 开发环境
 * [stageing] 测试环境
 * [production | prod] 正式环境
 */
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') {
  console.log('开发环境');
} else {

  (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod')
      ? console.log('正式环境')
      : console.log('测试环境');

  // 除开发环境外，其他环境（正式、测试）全都为下面入口
  // `**` 使得匹配到的全部路径都发送到 angular2 来启动程序
  app.get('**', (req, res) => {
    res.sendFile('/dist/index.html', { root: __dirname });
  });

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

// development 错误处理
// 将错误打印出来
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// 生产环境 错误处理
// 不打印错误
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
