/*
 * @Author: Janzen 
 * @Date: 2018-03-20 10:48:33 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-03-20 14:45:35
 */
/**
 * 用户列表
 */
let router = require('express').Router()

let {
  DBFind,
  DBDeleteOne
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
      res.status(200).json(result)
    })
  })
  .delete((req, res) => {
    console.log('删除单个用户列表信息', req.body, req.params, req.query)
    let {
      id
    } = req.body

    DBDeleteOne('users', {
      _id: id
    }, (err, result) => {
      res.status(200).json(result)
    })
  })

module.exports = router
