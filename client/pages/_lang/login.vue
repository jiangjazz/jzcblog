<template>
  <section>
    <hr />
    <el-form :model="ruleForm" :rules="rules" :ref="ref" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
export default {
  data () {
    return {
      ref: 'newArticleForm',
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // submit
    onSubmit() {
      this.$refs[this.ref].validate(valid => {
        console.log(valid)
        if (valid) {
          console.log('提交成功')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

