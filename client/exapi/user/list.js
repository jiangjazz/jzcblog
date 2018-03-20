/*
 * @Author: Janzen 
 * @Date: 2018-03-20 10:48:33 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-03-20 10:54:18
 */
/**
 * 用户列表
 */
const router = require('express').Router()

const {
  DBInsertOne,
  DBFind
} = require('../../../modules/db')

router.route('/list')
  /**
   * 查询 用户列表数据
   * page
   * pagemount
   * sort
   */
  .post((req, res) => {
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

module.exports = router
