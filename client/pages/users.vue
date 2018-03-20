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
          <el-button type="danger" @click="deleteOneUser(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :size="userListSize"
      :total="userListCount" />
    <AddUserDialog 
      :successFn="loadData"/>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import Pagination from '@/components/public/Pagination'
import AddUserDialog from '@/components/dialog/AddUserDialog'

export default {
  name: 'userList',
  components: {
    Pagination,
    AddUserDialog
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('users', ['userList', 'userListCount', 'userListSize'])
  },
  methods: {
    // 新增用户
    addUser() {
      this.$store.commit('dialog/visibleAddUserDialog', true)
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

