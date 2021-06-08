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
      <el-button
        :disabled="disabled"
        @click.prevent="handleLogin()"
        class="login-btn"
        type="primary"
        >登录</el-button
      >
      <el-button @click.prevent="handleRegis()" class="login-btn" type="primary"
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
  data () {
    return {
      disabled: true,
      formdata: {
        username: '',
        password: ''
      },
      checked: true,
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 登录请求
    async handleLogin () {
      let response = await this.$axios({
        method: 'get',
        url: 'http://localhost:8091/user/login',
        params: {
          userName: this.formdata.username,
          passWord: this.formdata.password
        }
      })
      console.log(response)
      if (response.data.code === '1000') {
        console.log('yes')
        sessionStorage.setItem('token', this.formdata.username)
        this.$store.state.role = response.data.role
        this.$store.state.trueName = response.data.trueName
        this.$store.state.userName = response.data.userName
        this.$store.state.id = response.data.id
        console.log(this.$store.state.role)
        console.log(this.$store.state.trueName)
        // this.$message.success(response.data.message)
        this.$router.push({ name: 'index' })
      } else {
        this.$message({
          message: response.data.message,
          type: 'error',
          duration: 1000
        })
        console.log('no')
      }
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 500)
    },
    handleRegis() {
      this.$router.push({ name: 'regis' })
    }

  },

  created () {
    //
  },
  components: {
  },
  computed: {
  },
  watch: {
    formdata: {
      handler: function () {
        if (this.formdata.username === '' || this.formdata.password === '') {
          this.disabled = true
        } else {
          this.disabled = false
        }
      },
      deep: true
      // immediate: true
    }
  },
  mounted () {
    const token = sessionStorage.getItem('token')
    if (token) {
      this.$router.push({ name: 'index' })
    }
  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }
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
.el-button+.el-button{
  margin-left: 0rem;
  margin-top: 1rem;
}
</style>
