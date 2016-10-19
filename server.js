/**
 * @author musicq
 * @create 2016-9-26
 */

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const api_router = require('./routes/router');

const app = express();


/***************************************************************************/
/*                              middle ware                                */
/***************************************************************************/
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, sign');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('X-Powered-By', 'iBeaconCS');
  req.method === 'OPTIONS' ? res.send(200) : next();
});
app.use((req, res, next) => {
  let logData = {
    time   : new Date(),
    spdy   : req.spdyVersion,
    path   : req.path,
    headers: req.headers,
    method : req.method,
    params : req.params,
    body   : req.body,
    remote : req.connection.remoteAddress,
    status : res.statusCode
  };
  let strLogData = JSON.stringify(logData);

  console.log('**************************************************');
  console.log('LOG : ' + strLogData);
  console.log('**************************************************');

  next();
});

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
