# angular2-webpack-express-starter
Angular2 with webpack and express starter.

## 下载

```
git clone https://github.com/musicq/angular2-webpack-express-starter.git
```

## 安装

```
npm install
```

## 启动

### 安装 nodemon 来启动 node 服务
开发环境启动依赖 nodemon，需要全局安装一下

```
npm install nodemon -g
```

### 启动程序

```
npm start
```

**启动前端**

```
start:hmr
```

**启动后端**

使用的 node 版本为 v4.5.0+

_直接启动_

```
node --use_strict bin/www
```

_使用 pm2 启动_

```
pm2 start process.yml
```


测试环境地址：http://localhost:3000

正式环境地址：http://localhost:4000

