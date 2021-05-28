<!--  -->
<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
      <h2 style="">欢迎来到北六414</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin()" class="login-btn" type="primary"
        >登录</el-button
      >
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
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 登录请求
    handleLogin () {
      // this.$http.post('login', this.formdata)
      //   .then((res) => {
      //     console.log(res)
      //   })
      if (this.formdata.username === 'zhy') {
        console.log('yes')
        localStorage.setItem('token', this.formdata.username)
        this.$message.success('登陆成功')
        this.$router.push({ name: 'index' })
      } else {
        this.$message.error('登陆失败')
        console.log('no')
      }
    }
  },

  created () {
    //
  },
  components: {
  },
  computed: {},
  watch: {},
  mounted () { },
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
  display:flex;
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
</style>
