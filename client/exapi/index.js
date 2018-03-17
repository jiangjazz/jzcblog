const express = require('express')
let request = require('request')
const j = request.jar()
request = request.defaults({
  jar: j
})
const {
  DBInsertOne,
  DBFind
} = require('../../modules/db')


// Create express router
const router = express.Router()

let app = express()

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
  res.status(200).json({success: '设置uid session成功'})
})

// test api
router.post('/addmsg', (req, res) => {
  console.log('插入信息', req.body)
  DBInsertOne('users', req.body, (err, result) => {
    res.status(200).json({
      code: 0,
      data: result
    })
  })
})

/**
 * 获取用户列表数据
 * page
 * pagemount
 * sort
 */
router.post('/users/list', (req, res) => {
  console.log('获取用户列表信息')
  let {
    page,
    pagemount,
    sort
  } = req.body

  DBFind('users', {}, {
    page,
    pagemount,
    sort: {
      type: sort
    }
  }, (err, result) => {
    res.status(200).json({
      code: 0,
      data: result
    })
  })
})

// Export the server middleware
module.exports = {
  path: '/exapi',
  handler: router
}