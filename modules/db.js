/*
 * @Author: Janzen 
 * @Date: 2018-03-13 15:42:53 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-03-20 14:45:08
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
const ObjectID = require('mongodb').ObjectID
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
    try {
      const checkRepeat = await db.db(dbName).collection(collectionName).find(json).toArray()
      console.log(checkRepeat, Array.isArray(checkRepeat), checkRepeat.length)
      if (Array.isArray(checkRepeat) && checkRepeat.length > 0) {
        callback(err, {
          code: 1,
          msg: '用户已存在'
        })
      } else {
        db.db(dbName).collection(collectionName).insertOne(json, (err, res) => {
          callback(err, {
            code: 0,
            data: res,
            msg: '新增成功'
          })
        })
      }
    } catch (error) {
      console.error(error.message)
      callback(err, null)
    }
    db.close()
  })
}

/**
 * 查询 (不包含 _id 查询)
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
    skipNumber = (page - 1) * pagemount || 0
    limit = pagemount || 0
    dbSort = sort || {}
    callback = D
  }
  // else {
  //   throw new Error('find 接受3个或者4个参数')
  // }
  console.log('查询开始')
  // 查询
  _connectDB(async (err, db) => {
    try {
      const totalArray = await db.db(dbName).collection(collectionName).find(json).toArray()
      const resArray = await db.db(dbName).collection(collectionName).find(json).skip(skipNumber).limit(limit).sort(dbSort).toArray()
      callback(err, {
        code: 0,
        data: {
          list: resArray,
          count: totalArray.length,
          limit
        }
      })
    } catch (error) {
      console.error(error.message)
      callback(err, null)
    }
    db.close()
  })
}

function deleteOne(collectionName, json, callback) {
  _connectDB(async (err, db) => {
    // db.db(dbName).collection(collectionName).deleteOne(json, (err, res) => {
    //   if (err) {
    //     callback(err, null)
    //   } else {
    //     callback(err, res)
    //   }
    //   db.close()
    // })
    let {_id, ...otherJson} = json
    if (_id) {
      otherJson._id = ObjectID(_id)
    }
    try {
      const findRes = await db.db(dbName).collection(collectionName).find(otherJson).toArray()
      if (findRes.length === 0) {
        callback(err, {
          code: 1,
          msg: '查无此数据'
        })
      } else {
        const delResult = await db.db(dbName).collection(collectionName).deleteOne(otherJson)
        callback(err, {
          code: 0,
          msg: '删除成功',
          data: delResult.result
        })
      }
      // const delResult = await db.db(dbName).collection(collectionName).deleteOne(otherJson)
      // console.log(json, findRes, delResult)
      // if (Array.isArray(checkRepeat) && checkRepeat.length > 0) {
      //   callback(err, {
      //     code: 1,
      //     msg: '用户已存在'
      //   })
      // } else {
      //   db.db(dbName).collection(collectionName).insertOne(json, (err, res) => {
      //     callback(err, res)
      //   })
      // }
    } catch (error) {
      console.error(error.message)
      callback(err, null)
    }
    db.close()
  })
}

exports.DBInsertOne = insertOne
exports.DBFind = find
exports.DBDeleteOne = deleteOne
