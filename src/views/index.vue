<template>
  <div class="page-content">
    <TopBar></TopBar>
    <div class="pageMain">
      <router-view></router-view>
    </div>
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
  mounted () {
    this.handleMounted()
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
    },
    async handleMounted () {

    }
  }
}

</script>

<style lang='less'>
.page-content {
  background: #eee;
  width: 100%;
  height: 100%;
}
.pageMain {
}
</style>
