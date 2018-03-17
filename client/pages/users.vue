<template>
  <section class="page-users">
    <h2>用户列表</h2>
    <hr />
    <el-table :data="userList" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="desc" label="描述">
      </el-table-column>
    </el-table>

    <Pagination
      :size="userListSize"
      :total="userListCount">
    </Pagination>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import Pagination from '@/components/public/Pagination'

export default {
  name: 'userList',
  components: {
    Pagination
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('users', ['userList', 'userListCount', 'userListSize'])
  },
  methods: {
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

