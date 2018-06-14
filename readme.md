# JzcBlog

---

## 前言
```
挖坑，深坑，慢慢填
环境需求 redis-server mongodb
```
---
结构说明：

--client 浏览器端文件
--config 项目配置
--modules 后端 api
--socket-io socket-io 文件（若使用则需要在此文件夹npm install并启动服务）

---

## 启动步骤
### 常规启动
```
- step1: npm install (安装基础包文件)
- step2: 启动redis-server
- step3: 启动mongodb
```
### socket
```
- step1: cd socket-io && npm install
- node ./app.js
```

---

## v1.0.4
```
新增
- 后端
- socket-io
```
---
## v1.0.3
```
新增
- 后端
- 添加了updateOne方法
- 前端
- 添加了 增/删/改 用户的方法，在/users路由下实现
修改
- 整理了express api结构，分为对应文件处理router
```
---
## v1.0.2
```
新增功能
- 后端
- 增加了数据库搜索+分页方法
- 前端
- 添加了路由 /users ，简便实现了分页查询功能
```
---
## v1.0.1
```
- 添加了scss语法支持，目录 /client/assets/scss/
```