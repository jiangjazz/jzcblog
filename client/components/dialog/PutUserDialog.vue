/*
 * @Author: Janzen 
 * @Date: 2018-03-20 16:47:19 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-03-20 17:09:30
 */
<template>
  <el-dialog title="新增用户" :visible="putUserDialog" width="600" :before-close="handleClose">
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
    },
    // 1: new 2: modify
    isNewUser: {
      type: Boolean,
      default() {
        return true
      }
    },
    // isNewUser = 2 时，必要参数
    updateUserMsg: {
      default() {
        return {}
      }
    }
  },
  data() {
    console.log(this.updateUserMsg)
    return {
      ref: 'putUserDialog',
      // form: {
      //   // name
      //   name: '',
      //   // desc
      //   desc: ''
      // },
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
    ...mapState('dialog', ['putUserDialog']),
    form() {
      let formData = {
        // name
        name: '',
        // desc
        desc: ''
      }
      if (!this.isNewUser) {
        formData.name = this.updateUserMsg.name
        formData.desc = this.updateUserMsg.desc
      }
      return formData
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$store.commit('dialog/visiblePutUserDialog', false)
    },
    // 关闭
    handleClose() {
      // init data
      this.$refs[this.ref].resetFields()
      this.closeDialog()
    },
    // 新增用户
    newUser() {
      this.$store.dispatch('users/addUser', this.form).then(res => {
        console.log('新增用户提交 成功', res)
        if (res.code === 0) {
          this.handleClose()
          this.successFn(res)
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 修改用户
    updateUser() {
      this.$store.dispatch('users/updateUser', {
        ...this.form,
        id: this.updateUserMsg._id
      }).then(res => {
        console.log('修改用户提交 成功', res)
        if (res.code === 0) {
          this.handleClose()
          this.successFn(res)
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 确定
    onSure() {
      this.$refs[this.ref].validate(valid => {
        console.log(valid)
        if (valid) {
          switch(this.isNewUser) {
            // 修改
            case false:
              this.updateUser()
              break
            // 新增
            case true:
            default :
              this.newUser()
              break
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
