/*
 * @Author: Janzen 
 * @Date: 2018-03-13 15:42:53 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-03-17 11:11:47
 */
/** 
 * 要在 MongoDB 中创建一个数据库，首先我们需要创建一个 MongoClient 对象，然后配置好指定的 URL 和 端口号。
 * 如果数据库不存在，MongoDB 将创建数据库并建立连接。
 * ******************************************************************************************************
 * ******************************************************************************************************
 * 每次对数据库做操作都要连接一次而且做完操作之后一定要关闭数据库。
 * 为什么？因为每一条连接都会对数据库造成一定的压力，如果不释放这些空闲的压力，数据库将会是灾难性的卡。
 * ******************************************************************************************************
 * ******************************************************************************************************
 */
const MongoClient = require('mongodb').MongoClient

const {
  mongoUrl,
  dbName
} = require('../config/backend')()

/**
 * 初始化/链接数据库
 * @param {function} callback 回调函数，接受参数 err db
 */
function _connectDB(callback) {
  // 初始化/链接
  MongoClient.connect(mongoUrl, (err, db) => {
    if (err) {
      callback(err, null)
      return
    }
    console.log('数据库已创建/链接!')
    callback(err, db)
  })
}

/**
 * 插入 单条数据
 * @param {string} collectionName 表单名称
 * @param {json} json 插入数据json
 * @param {function} callback 回调函数，接受参数 err res
 */
function insertOne(collectionName, json, callback) {
  _connectDB(async (err, db) => {
    const checkRepeat = await db.db(dbName).collection(collectionName).find(json).toArray()
    console.log(checkRepeat, Array.isArray(checkRepeat), checkRepeat.length)
    if (Array.isArray(checkRepeat) && checkRepeat.length > 0) {
      callback(err, {
        code: 1,
        msg: '用户已存在'
      })
    } else {
      db.db(dbName).collection(collectionName).insertOne(json, (err, res) => {
        callback(err, res)
      })
    }
    db.close()
  })
}

/**
 * 查询
 * @param {string} collectionName 表单名称
 * @param {json} json 查询条件json
 * @param {*} C callback / 查询条件
 * @param {*} D null / callback
 */
 function find(collectionName, json, C, D) {
  let skipNumber = 0
  let limit = 0
  let callback = undefined
  let dbSort = {}
  if (arguments.length === 3) {
    callback = C
  } else if (arguments.length === 4) {
    let {
      page,
      pagemount,
      sort
    } = C
    skipNumber = page * pagemount || 0
    limit = pagemount || 0
    dbSort = sort || {}
    callback = D
  }
  // else {
  //   throw new Error('find 接受3个或者4个参数')
  // }
  // 查询
  _connectDB((err, db) => {
    db.db(dbName).collection(collectionName).find(json).skip(skipNumber).limit(limit).sort(dbSort).toArray((err, res) => {
      if (err) {
        callback(err, null)
        db.close()
        return
      }
      callback(err, res)
      db.close()
    })
  })
}

exports.insertOne = insertOne
exports.find = find
// MongoClient.connect(mongoUrl, (err, db) => {
//   if (err) throw err
//   console.log('数据库已创建!')
//   // db.close()
//   const dbase = db.db('jzcblog')

//   // dbase.collection('products').aggregate([{
//   //   $lookup: {
//   //     from: 'sites',
//   //     localField: 'status',
//   //     foreignField: 'desc',
//   //     as: 'orderdetails'
//   //   }
//   // }], (err, res) => {
//   //   if (err) throw err
//   //   console.log(res, 999999)
//   //   // console.log(JSON.stringify(res))
//   //   db.close()
//   // })
//   dbase.collection('products').drop((err, delOK) => {
//     if (err) throw err
//     if (delOK) {
//       console.log("集合已删除")
//     } else {
//       console.log("删除失败")
//     }
//     db.close()
//   })
// })
