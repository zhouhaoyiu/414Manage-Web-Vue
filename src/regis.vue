<!--  -->
<template>
  <div class="login-wrap">
    <el-form
      :rules="rules"
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
      <h2 style="">欢迎来到北六414</h2>
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model.lazy="formdata.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          show-password
          v-model.lazy="formdata.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="truename">
        <el-input
          v-model.lazy="formdata.truename"
          placeholder="请输入真实姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input
          v-model.lazy="formdata.nickname"
          placeholder="请输入用户昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input
          v-model.lazy="formdata.address"
          placeholder="请输入地址"
        ></el-input>
      </el-form-item>
      <el-button @click.prevent="check()" class="login-btn" type="primary"
        >检查输入
      </el-button>
      <el-button  @click.prevent="handleRegis()" class="login-btn" type="primary"
        >注册</el-button
      >
      <!-- <el-button v-if="!disable" @click.prevent="handleLogin()" class="login-btn" type="primary"
        >登录</el-button
      > -->
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  props: {

  },
  data() {
    return {
      disabled: true,
      formdata: {
        username: '',
        password: '',
        truename: '',
        nickname: '',
        address: ''
      },
      checked: true,
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        truename: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
      }
    }
  },
  methods: {
    check() {
      let reg = /^[0-9]+$/
      let regChinese = /[^\u4e00-\u9fa5]/g
      console.log(regChinese.test(this.formdata.truename))
      if (regChinese.test(this.formdata.truename)) {
        this.$message({
          message: '真实姓名必须为汉字',
          type: 'error',
          duration: 1000
        })
      } else {
        if (reg.test(this.formdata.username)) {
          this.$message({
            message: '用户名不能为纯数字',
            type: 'error',
            duration: 1000
          })
        }
        if (reg.test(this.formdata.nickname)) {
          setTimeout(() => {
            this.$message({
              message: '昵称不能为纯数字',
              type: 'error',
              duration: 1000
            })
          }, 1000)
        }
        if (reg.test(this.formdata.address)) {
          setTimeout(() => {
            this.$message({
              message: '地址不能为纯数字',
              type: 'error',
              duration: 1000
            })
          }, 2000)
        }
      }
    },
    async handleRegis() {
      let res = await this.$axios({
        method: 'get',
        url: 'http://localhost:8091/user/searchUser',
        params: {
          trueName: this.formdata.truename,
          userName: this.formdata.username
        }
      })
      console.log(res)
      if (res.data.message === 'success') {
        let response = await this.$axios({
          method: 'get',
          url: 'http://localhost:8091/user/register',
          params: {
            trueName: this.formdata.truename,
            nickName: this.formdata.nickname,
            address: this.formdata.address,
            userName: this.formdata.username,
            passWord: this.formdata.password
          }
        })
        if (response.data.code === '1000') {
          this.$router.push({ name: 'index' })
          this.$message({
            message: response.data.message,
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message({
            message: response.data.message,
            type: 'error',
            duration: 1000
          })
        }
        this.disabled = true
        setTimeout(() => {
          this.disabled = false
        }, 500)
      } else {
        this.$message({
          message: '用户名或真实姓名已经存在',
          type: 'error',
          duration: 1000
        })
      }
    }
  },

  created() {
    //
  },
  components: {
  },
  computed: {
  },
  watch: {
    formdata: {
      handler: function () {
        if (this.formdata.username === '' || this.formdata.password === '' || this.formdata.truename === '' || this.formdata.nickname === '' || this.formdata.address === '') {
          this.disabled = true
        } else {
          this.disabled = false
        }
      },
      deep: true
      // immediate: true
    }
  },
  mounted() {
    const token = sessionStorage.getItem('token')
    if (token) {
      this.$router.push({ name: 'index' })
    }
  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }
}
</script>

<style lang="less">
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-wrap .login-btn {
  width: 100%;
}
.el-button + .el-button {
  margin-left: 0rem;
  margin-top: 1rem;
}
</style>
