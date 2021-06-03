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
        <memberIntro :trueName.sync="memberName"></memberIntro>
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
            <span class="informationTxt">{{ autherCn }} | {{ autherEn }}</span>
            <!-- <span
              v-for="i in contactInfoList"
              v-bind:key="i.name"
              class="informationContact"
            > -->
            <!-- <img :src="i.icon" alt="">
            <div>{{i.name}}</div> -->
            <!-- </span> -->
          </div>
          <div class="informationContect" style="text-align: center">
            <img
              src="../../assets/github.png"
              alt=""
              width="15px"
              height="15px"
            />
            <a
              href="https://github.com/zhouhaoyiu"
              title="GitHub → https://github.com/zhouhaoyiu"
              rel="noopener"
              target="_blank"
            >
              Github
            </a>
            <span class="contectQQ">
              <img
                src="../../assets/QQ.png"
                alt=""
                width="17px"
                height="17px"
              />
              <a
                href="https://github.com/zhouhaoyiu"
                title="648921469"
                rel="noopener"
                target="_blank"
              >
                QQ
              </a>
              <div class="code">
                <img
                  src="../../assets/QQcode.png"
                  alt=""
                  width="200rem"
                  height="260rem"
                />
              </div>
            </span>
          </div>
        </div>
        <div class="members">
          <div class="memberContent">
            <div
              class="member"
              @click="memberName = i.trueName"
              v-for="i in Member"
              v-bind:key="i.trueName"
            >
              <span>{{ i.trueName }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import memberIntro from '../../components/memberIntro'
export default {
  data () {
    return {
      autherEn: 'Mystic Zhou',
      autherCn: '周浩宇',
      memberName: '',
      contactInfoList: [
        {
          icon: '',
          name: ''
        },
        {

        }
      ],
      members: [
        {
          trueName: '周浩宇'
        },
        {
          trueName: '任天易'
        },
        {
          trueName: '杨贵晶'
        },
        {
          trueName: '喻德能'
        },
        {
          trueName: '姚毓炜'
        },
        {
          trueName: '王子杰'
        }
      ]
    }
  },
  computed: {
    Member () {
      let array = this.members
      array = array.sort((a, b) => a.trueName.localeCompare(b.trueName, 'zh'))
      return array
    }
  },
  components: {
    memberIntro
  }
}
</script>

<style lang='less'>
a:hover,
a:link,
a:visited,
a:active,
a:focus {
  color: #333;
  text-decoration: none;
}
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
    .Info {
      width: 75%;
      background: green;
      height: 46rem;
      background: url(../../assets/infoBk.png) no-repeat 100% 100%;
      // background: transparent;
      // background-position: bottom;
      background-size: cover;
      border-radius: 10px;
      box-shadow: 0 6px 6px rgba(0, 0, 0, 0.5);
    }
    .sideBar {
      margin-left: auto;
      width: 25%;
      // background: white;
      .auther {
        height: 13rem;
        margin: auto;
        width: 93%;
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.5);
        // background: blue;
        // display: flex;
        // flex-direction: column;
        background: url(../../assets/sakura.jpg) no-repeat 100% 100%;
        background-size: cover;
        background-position: bottom;
        border-radius: 10px;
        .autherImg {
          width: 100%;
          height: 7rem;
          // background: goldenrod;
          display: flex;
          img {
            box-sizing: border-box;
            border-radius: 100%;
            margin: 2rem auto;
          }
        }
        .information {
          width: 100%;
          height: 2rem;
          display: flex;
          .informationTxt {
            margin: auto;
            color: #777777;
          }
        }
        .informationContect {
          .contectQQ:hover .code {
            display: block;
          }
          .code {
            display: none;
          }
        }
      }
      .members {
        position: relative;
        height: 30rem;
        width: 93%;
        margin: 3rem auto;
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.5);
        border-radius: 10px; // background: blue;
        background: url(../../assets/memberBk.png) no-repeat 100% 100%;

        // background-position: bottom;
        background-size: cover;
        .memberContent {
          position: absolute;
          width: 50%;
          // height: 10rem;
          top: 30%;
          // background: green;
          left: 25%;
          .member {
            box-sizing: border-box;
            padding-bottom: 1rem;
            // background: gold;
            width: max-content;
            margin: auto;
          }
        }
      }
    }
  }
}
</style>
