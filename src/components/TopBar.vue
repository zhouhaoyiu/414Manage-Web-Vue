<template>
  <div class="Main">
    <div class="title">
      <div @click="goIndex()" class="txt">
        <span>{{ title }}</span>
      </div>
    </div>
    <div class="btnContent">
      <div
        class="btnItems"
        v-for="(i, index) in truePageList"
        :class="{ show: selectBtn == index }"
        @click="selectBtn = index"
        v-bind:key="i.name"
      >
        <button class="btnText" @click="goPage(i.path)">{{ i.name }}</button>
      </div>
    </div>
    <div class="loginOut">
      <span>欢迎您，{{$store.state.trueName}}{{roleName}}</span>
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
  watch: {
    role: {
      handler: function () {
        if (this.role === 2) {
          this.roleName = `管理员`
        } else {
          this.roleName = `访客`
        }
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      role: this.$store.state.role,
      roleName: '',
      selectBtn: null,
      count: 0,
      token: localStorage.getItem('token'),
      title: '北辰园六号楼414宿舍',

      pageList: [
        {
          name: `成员介绍`,
          path: '/introduction',
          needRole: 1
        },
        {
          name: '照片墙',
          path: '/photo',
          needRole: 1
        },
        {
          name: '账单',
          path: '/bills',
          needRole: 2
        }
        // {
        //   name: '谷',
        //   path: '/bills',
        //   needRole: 2
        // }

      ]
    }
  },
  methods: {
    goIndex () {
      this.selectBtn = -1
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
    },
    changeBtn (index) {
      this.selectBtn = index
    },

    beforeEnter: function (el) {
      el.style.color = 'red'
    },
    enter: function (el, done) {
      el.style.color = 'red'
      done()
    },
    afterEnter: function (el) {
      el.style.color = 'red'
    }
  },
  computed: {
    truePageList () {
      let list = []
      let listOld = this.pageList || []
      for (let i in listOld) {
        if (listOld[i].needRole <= this.$store.state.role) {
          list.push(listOld[i])
        }
      }
      return list
    }
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
  height: 4rem;
  background-color: transparent;
  line-height: 3.9rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
  // display: flex;
  .title {
    position: absolute;
    // background: #f56c6c;
    font-size: 1.3rem;
    left: 15%;
    height: 4rem;
    line-height: 4rem;
    .txt {
      margin: auto;
      cursor: pointer;
    }
  }
  .btnContent {
    position: absolute;
    display: flex;
    left: 32%;
    .btnItems {
      font-size: 1.2rem;
      cursor: pointer;
      border: 0.1rem solid transparent;
      box-sizing: border-box;
      width: 8rem;
      height: 3.9rem;
      // background: blue;
      text-align: center;
    }
    .btnItems:hover .btnText {
      color: rgb(49, 112, 250);
    }
    .show {
      button {
        color: rgb(49, 112, 250);
        border-bottom: 0.15rem solid rgb(49, 112, 250);
      }
    }
    .btnText {
      transition: color 2s;
      -webkit-transition: color 0.5s; /* Safari */
      width: 8rem;
      height: 3.9rem;
      border: none;
      background: none;
      font-size: 1rem;
    }
  }
  .loginOut {
    position: absolute;
    left: 82%;
    width: 20rem;
    // background-color: black;
    .loginOutBtn {
      background: #f56c6c;
      color: white;
      margin-left: 2rem;
      padding: 0.2rem 0.8rem;
      font-size: 1rem;
      border: 0.1rem solid #f56c6c;
      border-radius: 3rem;
    }
  }
}
// .Main::after {
//   content: "阅读有风险 参考需谨慎";
//   display: block;
//   text-align: center;
//   line-height: 30px;
//   color: #666;
//   position: absolute;
//   top:4rem;
//   left: 0;
//   right: 0;
//   z-index: 999;
// }
</style>
