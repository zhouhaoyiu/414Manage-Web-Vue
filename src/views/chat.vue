<template>
  <div class="home">
    <ul>
      <li v-for="item in msgList" :key="item.msg">
        <p>
          <span>{{ item.user }}</span>
          <span>{{ `${new Date(item.dateTime).getFullYear()}-0${new Date(item.dateTime).getMonth()+1}-0${new Date(item.dateTime).getDate()} ${today} `}}</span>
        </p>
        <p>消息：{{item.msg}}</p>
      </li>
    </ul>
    <input type="text" placeholder="请输入消息"  v-model="msg"/>
    <button @click="handleSendBtnClick">发送</button>
  </div>
</template>

<script>
const ws = new WebSocket('ws:/localhost:8000')
export default {
  name: 'chat',
  data () {
    return {
      msg: '',
      username: '',
      msgList: [],
      today: ''
    }
  },
  mounted () {
    let weekday = new Array(7)
    weekday[0] = '周日'
    weekday[1] = '周一'
    weekday[2] = '周二'
    weekday[3] = '周三'
    weekday[4] = '周四'
    weekday[5] = '周五'
    weekday[6] = '周六'
    this.today = weekday[new Date().getDay()]
    this.username = this.$store.state.userName

    if (!this.username) {
      this.$router.push('/login')
      return
    }

    ws.addEventListener('open', this.handleWsOpen.bind(this), false)
    ws.addEventListener('close', this.handleWsClose.bind(this), false)
    ws.addEventListener('error', this.handleWsError.bind(this), false)
    ws.addEventListener('message', this.handleWsMessage.bind(this), false)
  },
  methods: {
    handleSendBtnClick() {
      const msg = this.msg
      if (!msg.trim().length) {
        return
      }

      ws.send(JSON.stringify({
        id: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`,
        user: this.username,
        dateTime: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`,
        msg: this.msg
      }))
      this.msg = ''
    },
    handleWsOpen(e) {
      console.log('FE:WebSocket open', e)
    },
    handleWsClose(e) {
      console.log('FE:WebSocket close', e)
    },
    handleWsError(e) {
      console.log('FE:WebSocket error', e)
    },
    handleWsMessage(e) {
      const msg = JSON.parse(e.data)
      this.msgList.push(msg)
    }
  }
}
</script>

<style lang="less">
.home{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important
}
</style>
