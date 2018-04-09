<template>
  <section>
    <hr />
    <el-form :model="ruleForm" :rules="rules" :ref="ref" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布文章</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      ref: 'newArticleForm',
      ruleForm: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
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

