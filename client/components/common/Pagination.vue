<template>
  <el-pagination
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="size"
    layout="total, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default() {
        return 5
      }
    },
    total: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  computed: {
    // 当前页码
    currentPage() {
      let {page} = this.$route.query
      return Number(page) || 1
    }
  },
  methods: {
    // 分页组件触发改变
    handleCurrentChange(val) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: val
        }
      })
      console.log(`%c当前页：${val}`, 'background: yellow; color: black;')
    }
  }
}
</script>

