/*
 * @Author: Janzen 
 * @Date: 2018-06-14 22:16:06 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-06-14 22:58:54
 */
<template>
  <div class="client-blog">
    <!-- 头部区域 -->
    <Header></Header>
    <!-- 头部区域 end-->
    <!-- 主体部分 -->
    <div class="client-blog-main">
      <!-- 侧边栏 -->
      <Aside></Aside>
      <!-- 侧边栏 -->
      <!-- 内容区域 -->
      <nuxt class="client-blog-content" />
      <!-- 内容区域 end-->
    </div>
    <!-- 主体部分 end-->
  </div>
</template>
<script>
import Header from '~/components/common/Header'
import Aside from '~/components/common/Aside'
export default {
  components: {
    Header,
    Aside
  }
}
</script>
