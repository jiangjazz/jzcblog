/*
 * @Author: Janzen 
 * @Date: 2018-03-21 10:17:53 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-03-21 10:25:45
 */
<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <nuxt-link to="/articles">文章列表</nuxt-link>
      </el-menu-item>
      <el-menu-item index="2">
        <nuxt-link to="/articles/new">新增文章</nuxt-link>
      </el-menu-item>
    </el-menu>
    <nuxt-child class="m-articles"></nuxt-child>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  mounted() {
    console.log('articles')
  }
}
</script>

