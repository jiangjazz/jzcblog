# blog
---

## 说明
测试moongdb的一个项目
---

## 第三方包功能解析
```
express: web 框架
express-session: session 中间件
connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
connect-flash: 页面通知提示的中间件，基于 session 实现
ejs: 模板
express-formidable: 接收表单及文件的上传中间件
config-lite: 读取配置文件
marked: markdown 解析
moment: 时间格式化
mongolass: mongodb 驱动
objectid-to-timestamp: 根据 ObjectId 生成时间戳
sha1: sha1 加密，用于密码加密
winston: 日志
express-winston: 基于 winston 的用于 express 的日志中间件
```
---

## 其他说明

### mongodb启动说明
```
./mongod --dbpath=/XXXX/myblog/db --port=27017
配置指定db在项目文件
配置hosts 指定localhost为127.0.0.1
```