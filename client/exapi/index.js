/*
 * @Author: Janzen 
 * @Date: 2018-03-20 10:49:57 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-03-26 10:18:27
 */
const express = require('express')
// Create express router
let router = express.Router()
let app = express()
let request = require('request')
const j = request.jar()
request = request.defaults({
  jar: j
})

let {
  DBFind
} = require('../../modules/db')

// 通用
router.use((req, res, next) => {
  console.log('总是被触发')
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

/**
 * 登陆 设置用户uid session
 */
router.post('/login', (req, res) => {
  console.log('进入login', req.body)
  let {
    uid,
    usermsg
  } = req.body
  req.session.uid = uid
  req.session.usermsg = usermsg
  res.status(200).json({
    success: '设置uid session成功'
  })
})

// 用户模块
router.use('/users', require('./user/index'))

// Export the server middleware
module.exports = {
  path: '/exapi',
  handler: router
}
