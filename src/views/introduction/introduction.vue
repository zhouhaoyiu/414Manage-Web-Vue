<template>
  <div class="page">
    <div class="divide">
      <span class="divideText">
        我身在炼狱,留下这份记录,是希望家人和玉姐原谅我此刻的决定，
        但我坚信，你们终会明白我的心情。<br />我亲爱的人，我对你们如此无情，
        只因为民族已到存亡之际， 我辈只能奋不顾身，挽救于万一。<br />
        我的肉体即将陨灭， 灵魂却将与你们同在。 敌人不会了解，
        老鬼老枪不是个人， 而是一种精神， 一种信仰。
      </span>
    </div>
    <div class="main">
      <div class="Info">
        <router-view></router-view>
      </div>
      <div class="sideBar">
        <div class="auther">
          <div class="autherImg">
            <img
              src="../../assets/Mystic.jpg"
              alt=""
              width="70rem"
              height="70rem"
            />
          </div>
          <div class="information">
            <span class="informationTxt">{{ autherEn }}|{{ autherCn }}</span>
            <span v-for="i in contactInfoList" v-bind:key="i.name" class="informationContact">
            <img :src="i.icon" alt="">
            <div>{{i.name}}</div>
            </span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      autherEn: 'Mystic Zhou',
      autherCn: '周浩宇',
      contactInfoList: [
        {
          icon: '',
          name: ''
        },
        {

        }
      ]
    }
  }
}
</script>

<style lang='less'>
.page {
  .divide {
    height: 4rem;
    width: 100%;
    // background: green;
    line-height: 1.3rem;
    text-align: center;

    .divideText {
      opacity: 0;
      transition: all 5s;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-transition: all 5s; /* Safari */
    }
  }
  .divide:hover {
    .divideText {
      opacity: 1;
      color: #777777;
    }
  }
  .main {
    // background: red;
    width: 80%;
    margin: 0 auto;
    display: flex;
    .sideBar {
      margin-left: auto;
      width: 25%;
      background: white;
      .auther {
        height: 10rem;
        margin: auto;
        width: 93%;
        // background: blue;
        // display: flex;
        // flex-direction: column;
        .autherImg{
          width: 100%;
          height: 5rem;
          // background: goldenrod;
          display: flex;
          img {
            box-sizing:border-box ;
            border-radius: 100%;
            margin: 0.2rem auto;
          }
        }
        .information{
          width: 100%;
          height: 2rem;
          background: saddlebrown;
          display: flex;
          .informationTxt{
            margin: auto;
            color: #777777;
          }
        }
      }
    }
  }
}
</style>
