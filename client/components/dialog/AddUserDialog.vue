<template>
  <el-dialog title="新增用户" :visible="addUserDialog" width="600" :before-close="handleClose">
    <el-form :ref="ref" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="onSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
    successFn: {
      type: Function,
      default() {
        return () => {}
      }
    }
  },
  data() {
    return {
      ref: 'addUserDialog',
      form: {
        // name
        name: '',
        // desc
        desc: ''
      },
      // 表单验证规则
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('dialog', ['addUserDialog'])
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$store.commit('dialog/visibleAddUserDialog', false)
    },
    // 关闭
    handleClose() {
      // init data
      this.$refs[this.ref].resetFields()
      this.closeDialog()
    },
    // 确定
    onSure() {
      this.$refs[this.ref].validate(valid => {
        console.log(valid)
        if (valid) {
          this.$store.dispatch('users/addUser', this.form)
            .then(res => {
              console.log('新增用户提交 成功', res)
              if (res.code === 0) {
                this.handleClose()
                this.successFn(res)
                this.$message.success(res.msg)
              } else {
                this.$message.error(res.msg)
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
