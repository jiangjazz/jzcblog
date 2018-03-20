/**
 * 弹窗
 */
import Vue from 'vue'
// 函数名称统计
const DIALOG_ADDUSER_VISIBLE = 'visibleAddUserDialog'
// state数据
export const state = () => ({
  // 用户列表数据
  addUserDialog: false
})
// 同步方法
export const mutations = {
  /**
   * 初始化 页面所有数据
   * @param {boolean} status true/false
   */
  [DIALOG_ADDUSER_VISIBLE](state, status) {
    state.addUserDialog = status
  }
}