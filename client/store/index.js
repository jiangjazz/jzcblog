/**
 * 全局store
 */
import Vue from 'vue'

// 函数名称统计
const G_SET_UID = 'setUid'
const SET_LANG = 'setLang'

// state数据
export const state = () => ({
  uid: null,
  locales: ['en', 'cn'],
  locale: 'en'
})

// 同步方法
export const mutations = {
  [SET_LANG] (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  /**
   * 设置用户个人id
   * @param {obj} uid -> 个人id
   */
  [G_SET_UID](state, uid) {
    state.uid = uid
  }
}

// 异步方法
export const actions = {
  /**
   * 特殊方法
   * 从服务器端传输数据到客户端
   */
  nuxtServerInit({
    commit
  }, {
    req,
    redirect,
    params,
    path,
    query,
    Url
  }) {
    console.log('服务器初始化')
    // console.log(req.session)
    if (req.session) {
      // 判定是否存在个人uid
      if (req.session.uid) {
        console.log('目前用户id是', req.session.uid)
        commit(G_SET_UID, req.session.uid)
      }
    }
  }
}
