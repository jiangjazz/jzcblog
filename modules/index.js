/*
 * @Author: Janzen 
 * @Date: 2018-03-13 15:42:53 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-03-13 17:44:21
 */
/** 
 * 要在 MongoDB 中创建一个数据库，首先我们需要创建一个 MongoClient 对象，然后配置好指定的 URL 和 端口号。
 * 如果数据库不存在，MongoDB 将创建数据库并建立连接。
 */
const MongoClient = require('mongodb').MongoClient

const {
  mongoUrl
} = require('../config/backend')()

MongoClient.connect(mongoUrl, (err, db) => {
  if (err) throw err
  console.log('数据库已创建!')
  // db.close()
  const dbase = db.db('jzcblog')

  // dbase.collection('products').aggregate([{
  //   $lookup: {
  //     from: 'sites',
  //     localField: 'status',
  //     foreignField: 'desc',
  //     as: 'orderdetails'
  //   }
  // }], (err, res) => {
  //   if (err) throw err
  //   console.log(res, 999999)
  //   // console.log(JSON.stringify(res))
  //   db.close()
  // })
  dbase.collection('products').drop((err, delOK) => {
    if (err) throw err
    if (delOK) {
      console.log("集合已删除")
    } else {
      console.log("删除失败")
    }
    db.close()
  })
})
