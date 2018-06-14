/*
 * @Author: Janzen 
 * @Date: 2018-03-20 16:47:14 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-06-14 22:28:50
 */
<template>
  <section class="page-users">
    <h2>用户列表</h2>
    <hr />
    <div>
      <el-button type="primary" @click="addUser">新增用户</el-button>
    </div>
    <hr />
    <el-table :data="userList" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="desc" label="描述">
      </el-table-column>
      <el-table-column label="操作">
        <template prop="_id" slot-scope="scope">
          <el-button type="primary" @click="updateUser(scope.row)">更新</el-button>
          <el-button type="danger" @click="deleteOneUser(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :size="userListSize"
      :total="userListCount" />
    <PutUserDialog
      :isNewUser="isNewUser"
      :successFn="loadData"
      :updateUserMsg="updateUserMsg"
      />
  </section>
</template>
<script>
import { mapState } from 'vuex'
import Pagination from '~/components/common/Pagination'
import PutUserDialog from '~/components/dialog/PutUserDialog'

export default {
  name: 'userList',
  components: {
    Pagination,
    PutUserDialog
  },
  data() {
    return {
      // 是否新增用户
      isNewUser: true,
      // 修改用户的id
      updateUserMsg: {}
    }
  },
  computed: {
    ...mapState('users', ['userList', 'userListCount', 'userListSize'])
  },
  methods: {
    // 新增用户
    addUser() {
      // init 弹窗相关数据
      this.isNewUser = true
      this.modifyId = ''
      // 打开弹窗
      this.$store.commit('dialog/visiblePutUserDialog', true)
    },
    // 修改用户
    updateUser(obj) {
      // init 弹窗相关数据
      this.isNewUser = false
      this.updateUserMsg = obj
      // 打开弹窗
      this.$store.commit('dialog/visiblePutUserDialog', true)
    },
    // 删除单条数据
    deleteOneUser(id) {
      console.log(id)
      this.$store.dispatch('users/deleteOneUser', {id})
        .then(res => {
          console.log('删除单条数据 成功', res)
          if (res.code === 0) {
            this.loadData()
            this.$message.success(res.msg)
          }
        })
    },
    // 加载数据
    loadData() {
      let {
        page = 1,
        sort = 1
      } = this.$route.query

      this.$store.dispatch('users/getUsersList', {
        page,
        sort
      })
    }
  },
  mounted() {
    this.loadData()
  },
  watch: {
    '$route' (to, from) {
      // 监控路由变化读取数据
      let { page = 1, sort = 1 } = to.query
      let fromPage = from.query.page || 1
      let fromSort = from.query.sort || 1
      if ( (page !== fromPage) || (sort !==fromSort) ) {
        this.loadData()
      }
    }
  }
}
</script>

