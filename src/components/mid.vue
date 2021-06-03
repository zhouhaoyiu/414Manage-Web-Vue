<template>
  <div class="mid">
    <div class="notice">
      <i
        class="el-icon-chat-dot-square"
        style="
          font-size: 2rem;
          margin-left: 2rem;
          margin-right: 0.5rem;
          margin-top: 0.5rem;
        "
      ></i>
      <span>{{ Title }}{{ info }}</span>
    </div>
    <div class="btnContent">
      <div class="btnItems" v-for="i in btn" v-bind:key="i.name">
        <img :src="i.path" alt="" />
        <span>{{ i.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mid',
  data () {
    return {
      title: 1,
      info: `关于2021年春季课程整体工作安排...`,
      btn: [{
        path: require('../assets/btn.png'),
        name: '学校概况'
      },
      {
        path: require('../assets/btn.png'),
        name: '招生章程'
      },
      {
        path: require('../assets/btn.png'),
        name: '专业介绍'
      },
      {
        path: require('../assets/btn.png'),
        name: '招生计划'
      },
      {
        path: require('../assets/btn.png'),
        name: '历年分数'
      },
      {
        path: require('../assets/btn.png'),
        name: '录取查询'
      },
      {
        path: require('../assets/btn.png'),
        name: '招生动态'
      },
      {
        path: require('../assets/btn.png'),
        name: '二级学院'
      }
      ]
    }
  },
  computed: {
    Title () {
      let Title = ''
      if (this.title === 1) {
        Title = `【重要通知】`
      }
      return Title
    }
  }
}
</script>

<style lang="less">
.mid {
  width: 100%;
  height: 25rem;
  background: #ffffff;
  .notice {
    position: absolute;
    left: 5%;
    width: 90%;
    height: 3rem;
    background: #eeeeee;
    span {
      color: #333;
      text-align: center;
    }
  }
  .btnContent {
    // display: block;
    width: 90%;
    left: 5%;
    height: 100%;
    // background: purple;
    position: absolute;
    margin-top: 5rem;
    display: flex;
    flex-wrap: wrap;
    -wekit-flex-wrap:wrap;
    .btnItems {
      width: 25%;
      float: left;
      display: flex;
      flex-direction: column;
      text-align: center;
    }
  }
}
</style>
