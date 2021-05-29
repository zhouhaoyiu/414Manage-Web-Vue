<template>
  <div class="Main">
    <div class="title">
      <span @click="goIndex()" class="txt">
        {{ title }}
      </span>
    </div>
    <div class="btnContent">
      <div v-for="i in pageList" v-bind:key="i.name">
        <span style="cursor: pointer" @click="goPage(i.path)"
          >{{ i.name }}
        </span>
      </div>
    </div>
    <div class="loginOut">
      <button @click.prevent="handleSignout()" class="loginOutBtn">
        退出登录
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {

  },
  data () {
    return {
      count: 0,
      token: localStorage.getItem('token'),
      title: '北辰园六号楼414宿舍',

      pageList: [
        {
          name: '成员介绍',
          path: '/introduction'
        }
      ]
    }
  },
  methods: {
    goIndex () {
      this.$router.push('/index')
    },
    goPage (path) {
      this.$router.push(path)
    },
    handleSignout () {
      // 清除token
      localStorage.clear()
      // 提示消息
      this.$message.success('退出成功')
      // 回到登陆页面
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    //
  },
  mounted () {
    //
  }
}
</script>

<style lang='less'>
.Main {
  width: 100%;
  height: 6rem;
  background-color: white;
  line-height: 6rem;
  // display: flex;
  .title {
    position: absolute;

    // background: red;
    font-size: 1.5rem;

    left: 5rem;
    width: 35rem;
    height: 6rem;
    .txt {
      cursor: pointer;
      text-align: center;
    }
  }
  .btnContent {
    position: absolute;
    left: 40rem;

    width: 20rem;
    // background: blue  ;
  }

  .loginOut {
    position: absolute;
    right: 5rem;
    // background-color: black;
    .loginOutBtn {
      background: red;
      color: white;
      padding: 0.1rem 0.8rem;
      font-size: 1.2rem;
      border: 0.1rem solid red;
      border-radius: 3rem;
    }
  }
}
</style>
