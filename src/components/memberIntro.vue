<template>
  <div class="zhy" v-if="trueName == '周浩宇'">
    <div class="photoContent">
      <img class="photo" src="../assets/zhy.jpg" alt="" />
    </div>
    <div v-for="i in Info" v-bind:key="i.myName" class="introduceContent">
      <div class="introduce">
        <div>
          <span>姓名：{{ i.myName }}</span>
        </div>
        <div>
          <span>昵称：{{ i.nickName }}</span>
        </div>
        <div>
          <span>生日：{{ i.birth }}</span>
        </div>
        <div>
          <span>住址：{{ i.address }}</span>
        </div>
      </div>
    </div>
    <div class="information"></div>
  </div>
</template>

<script>
import Canvas from '../views/canvas-nest.min.js'
export default {
  name: 'memberIntro',
  props: {
    trueName: String
  },
  components: {
    Canvas
  },
  computed: {
    Info () {
      let info = []
      if (this.trueName === '周浩宇') {
        info.push({
          myName: '周浩宇',
          nickName: `Mystic Zhou`,
          birth: '2000-06-24',
          address: '山西太原'
        })
      }
      return info
    }
  }

}
</script>

<style lang="less">
canvas {
  background: transparent;
  opacity: 0;
}
.zhy {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .photoContent {
    position: relative;
    width: 40%;
    // background: purple;
    height: 25rem;
    .photo {
      position: absolute;
      top: 10%;
      left: 30%;
      width: 15rem;
      height: 20rem;
    }
  }
  .introduceContent {
    position: relative;
    width: 60%;
    height: 25rem;
    // background: green;
    .introduce {
      position: absolute;
      // background: purple;
      top: 20%;
      left: 20%;
      font-size: 1.5rem;
    }
    .introduce div {
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      margin-bottom: 2rem;
    }
  }
  .information {
    width: 100%;
    height: 21rem;
    // background: gold;
  }
}
</style>
