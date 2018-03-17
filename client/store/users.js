/**
 * users模块
 */
import Vue from 'vue'
// 函数名称统计
const USERS_DATA_RESET = 'resetUsersModule'
const USERS_LIST_GET = 'getUserList'
// state数据
export const state = () => ({
  // 用户列表数据
  userList: [],
  // 用户总数
  userListCount: 0,
  // 用户列表每页数据个数
  userListSize: 5
})
// 同步方法
export const mutations = {
  /**
   * 初始化 页面所有数据
   */
  [USERS_DATA_RESET](state) {
    state.userList = []
    state.userListCount = 0
  },
  /**
   * 用户列表数据
   */
  [USERS_LIST_GET](state, { list = [], count = 0 }) {
    state.userList = list
    state.userListCount = count
  }
}
// getters数据

// action
export const actions = {
  /**
   * 获取 用户列表
   * @param {object} data
   * data = {
   *  sort->排列顺序 default: 1 options: 1/-1
   *  page->页数 default: 1
   * }
   */
  async getUsersList({
    commit,
    state
  }, {
    sort = 1,
    page = 1
  }) {
    Vue.prototype.$http.post('/exapi/users/list', {
      pagemount: state.userListSize,
      sort,
      page
    })
    .then(res => {
      console.log('获取 用户列表请求成功', res)
      if (res.code === 0) {
        commit(USERS_LIST_GET, res.data)
      }
    })
  }
}
