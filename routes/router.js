/**
 * @author musicq
 * @description 路由器
 */

const app = require('express')();
// 引入路由
const exampleApi = require('../api/example');

// 示例路由
app.use('/example', exampleApi);

module.exports = app;
