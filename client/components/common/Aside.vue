/*
 * @Author: Janzen 
 * @Date: 2018-06-14 22:45:05 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-06-14 23:48:03
 */
<template>
  <div :class="className">
    <div :class="`${className}-inner`">
      <el-menu :collapse="false" :default-openeds="['/blog']" @open="handleOpen" @close="handleClose">
        <nuxt-link to="/blog">
          <el-menu-item index="1">
            <span slot="title">Object-C简介</span>
          </el-menu-item>
        </nuxt-link>
        <el-submenu index="/blog">
          <template slot="title">
            <span>Object-C学习笔记</span>
          </template>
          <el-menu-item-group title="分组一">
            <nuxt-link to="/blog/basic">
              <el-menu-item index="/blog/basic">
                基础知识
              </el-menu-item>
            </nuxt-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // class
      className: 'm-aside'
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

