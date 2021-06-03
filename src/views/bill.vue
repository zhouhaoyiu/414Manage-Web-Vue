<template>
  <div style="background-color: #ffffff">
    <div class="topInfo">
      <img class="topImage" src="../assets/top.jpg" alt="" />
      <img class="topLogo" src="../assets/scLogo.png" alt="" />
      <div class="topInfo">
        <button
          disabled
          class="topInfoItem"
          v-for="i in dataList"
          v-bind:key="i.text"
        >
          {{ i.text }}
        </button>
      </div>
    </div>
    <mid></mid>
  </div>
</template>

<script>
import mid from '../components/mid'
export default {
  data () {
    return {
      dataList: [{
        text: `湖南省"双一流"高水平特色学院`
      },
      {
        text: `全国毕业生就业工作50强院校`
      },
      {
        text: `教育部和卫生部第一批卓越医生教育培养试点`
      },
      {
        text: `具有硕士研究生招生资格`
      }
      ]
    }
  },
  components: {
    mid
  }
}
</script>

<style lang='less'>
.topInfo {
  width: 100%;
  height: 35rem;

  .topImage {
    position: absolute;
    width: 90%;
    height: 20rem;
    left: 5%;
    margin: auto;
  }
  .topLogo {
    position: absolute;
    width: 6rem;
    height: 6rem;
    border-radius: 10rem;
    top: 21rem;
    left: 48%;
  }
  .topInfo {
    position: absolute;
    width: 90%;
    height: 5rem;
    left: 5%;
    top: 30rem;
    .topInfoItem {
      display: block;
      padding: 0.2rem 0.6rem;
      background: #b2d6ec;
      outline: none;
      border: #d2e7f3 solid 0.1rem;
      border-radius: 10rem;
      color: #185e99;
      margin-bottom: 0.4rem;
    }
  }
}
</style>
