<template>
 <div>
   <TopBar></TopBar>
 </div>
</template>

<script>
import TopBar from '../components/TopBar'
export default {
  data: function () {
    return {
      token: localStorage.getItem('token')
    }
  },
  components: {
    TopBar
  },
  beforeCreate () {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({ name: 'login' })
    }
  },
  methods: {
    handleSignout () {
      // 清除token
      localStorage.clear()
      // 提示消息
      this.$message.success('退出成功')
      // 回到登陆页面
      this.$router.push({ name: 'login' })
    },
    handleIndex () {
      this.$router.push({ name: 'index' })
    }
  }
}

</script>

<style>

</style>
