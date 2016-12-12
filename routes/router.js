/**
 * @author musicq
 * @description 路由器
 */

const app = require('express')();

// 示例路由
app.use('/example', require('../api/example'));

module.exports = app;
