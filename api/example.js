/**
 * @author musicq
 * @description 测试路由文件，路由示例
 */

const router = require('express').Router();

/**
 * @method GET
 * @name example-api
 * @description 示例 api，其他 api 请参考此 api 写法
 */
router.get('/example-api', function(req, res) {
	res.status(200).send('hello world');
});

/**
 * @method POST
 * @name example-api
 * @description 示例 api，其他 api 请参考此 api 写法
 */
router.post('/example-api', function(req, res) {
	let body = req.body;
	let params1 = body.params1,
		params2 = body.params2;

	res.status(200).send({
		params1: params1,
		params2: params2
	});
});

module.exports = router;
