# angular2-webpack-express-starter

这个项目是一个使用 `webpack2` 打包的，前端基于 `angular2`，后端使用 `express` 的快速启动脚手架项目。
参考 [@AngularClass 的 angular2-webpack-starter](https://angularclass.github.io/angular2-webpack-starter/)

## 安装

```
# 下载项目
git clone https://github.com/musicq/angular2-webpack-express-starter.git

# 安装
npm install

# 启动
npm start
```

# 内容
## 目录结构

我在组织目录结构中可能和一些其他的项目目录结构有一点区别，我这里有一个 `pages` 文件夹，这个文件夹用来存放网站的页面的。因为很多，包括[官方的目录结构](https://angular.cn/docs/ts/latest/guide/style-guide.html#!#04-06)中都没有关于每个页面的描述（可能是我没理解透彻组件化思想）。但是我觉得，一个单页应用是由许多页面组成的，每一个页面都是由多个组件构成的，所以组件其实是为页面服务的，他应该可定制，够灵活。所以我觉得应该有一个 `pages` 文件夹来存放应用的页面。

```
angular2-webpack-express-starter/
	|-api/
		|-example.js					* api 接口
	|-bin/
		|-www							* node 服务启动文件
	|-config/							* 配置文件存放位置
		|-empty.js
		|-helpers.js					* 配置文件的一些辅助方法
		|-webpack.common.js 			* webpack 打包的通用配置
		|-webpack.dev.js				* webpack 开发环境配置
		|-webpack.prod.js				* webpack 生产环境配置
	|-dist/								* 生产环境打包代码
		|-...
	|-routes/							* 路由文件夹
		|-router.js						* 路由入口文件
	|-src/								* 源文件存放位置，将这里的文件压缩合并输出到 dist 文件夹
		|-app/							* 网站内容存放文件夹
			|-core/						* 核心模块存放文件夹
				|-core.module.ts		* 核心模块
			|-components/				* 组件文件夹
			|-pages/					* 存放页面文件夹
				|-home/					* 首页存放文件夹
					|-home.page.ts		* 首页组件
					|-home.page.html 	* 首页模板
					|-home.page.css		* 首页样式
					|-home.routing.ts	* 首页路由文件
					|-home.module.ts	* 首页模块
				|-+login/				* 登录模块
				|-+404/					* 404模块
				|-+example/				* 示例模块
			|-shared/					* 共享模块
				|-shared.module.ts 		*存放公用内容模块
			|-assets/					* 静态资源文件
				|-css/					* 站点公共样式
				|-images/				* 站点公用资源
		|-index.html					* 网站首页
		|-polyfills.ts					* polyfill 文件
		|-vendor.ts						* 第三方内容文件
		|-main.ts						* angular2 入口
	|-package.json						* package.json 文件
	|-tsconfig.json						* typescript 配置
	|-tslint.json						* typescript lint 配置
	|-server.js							* node 服务器文件
	|-postcss.config.js 				* postcss 插件
	|-process.yml						* pm2 启动配置
		
```

## 命令

- **`npm start`** ：启动应用。他实际是同时运行了 `npm run server` 和`npm run server`这两个命令。
- **`npm run start:hmr`** ：启动 webpack 打包 angular2 源码并启动 `3000` 端口。
- **`npm run server`** ：启动 node 服务，端口 `4000`。
- **`npm run build:prod`** ：打包应用用于生产环境。
- **`npm run lint`** ：检查代码书写是否规范。
- **`npm run server:prod`** ：正式环境启动应用。



### 说明

我没有写测试的东西，测试在工程化应用中占有很重要的地位，详细的 angular2 测试可以查看[官方的文档](https://angular.cn/docs/ts/latest/guide/testing.html)。