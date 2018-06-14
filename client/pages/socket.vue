<template>
  <section class="container">
    <div>
      <app-logo/>
    </div>
    {{userNumber}}
    <input type="text" v-model="message" @keyup.enter="sendMsg" />
    <el-button @click="sendMsg"> 发 送 </el-button>
    <el-input type="textarea" v-model="msg" disabled="" />
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import socket from '~/plugins/socket.io.js'

export default {
  data() {
    return {
      userNumber: 0,
      message: '',
      msg: ''
    }
  },
  components: {
    AppLogo
  },
  methods: {
    sendMsg() {
      console.log(123123, this.message)
      let _this = this
      socket.emit('message', { text: _this.message })
      this.message = ''
    }
  },
  mounted() {
    const _this = this
    socket.on('message', function(data) {
      console.log(data, 18181818)
      alert(data.text)
    })

    socket.on('users', function(data) {
      console.log('Got update from the server', data)
      _this.userNumber = data.number
      console.log(this, _this)
    })

    socket.on('push message', function(data) {
      console.log(7777777, data)
      _this.msg += data.text
    })
  }
}
</script>
