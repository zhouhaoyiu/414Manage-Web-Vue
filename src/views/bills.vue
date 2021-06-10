<template>
  <div class="bill">

    <div class="getBill">
      <div class="total">
        <div class="totalIn">
          <span>总收入{{ totalIn }}元</span>
        </div>
        <div class="totalOut">
          <span>总支出{{ totalOut }}元</span>
        </div>
        <div class="totalNumber">
          <span style="color: rgb(0, 165, 0)" v-if="totalNumber > 0"
            >净收入{{ totalNumber }}元</span
          >
          <span style="color: red" v-if="totalNumber < 0"
            >净支出{{ -totalNumber }}元</span
          >
        </div>
      </div>
      <div v-show="page ==2" id="myChart"></div>
      <div v-show="page==1" class="bill" v-for="i in currentBills" v-bind:key="i.id">
        <div>
          <span class="eventName">{{ i.event }}</span>
          <span class="billAmount">{{ i.amount }}</span>
          <span class="billAmount">{{ i.amount }}</span>
          <span class="billDate">{{ i.eventDate }}</span>
          <span class="billUser">{{ i.submitterTrueName }}</span>
        </div>
      </div>
      <div style="position: absolute; bottom: 0.5rem; left: 45%">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pagesSize"
          :total="total"
          @current-change="pageChange"
        >
        </el-pagination>
      </div>
        <el-radio-group v-model="page">
          <el-radio-button label="1">详细信息</el-radio-button>
          <el-radio-button label="2">统计图表</el-radio-button>
        </el-radio-group>
      <div class="searchRadio">
        <el-radio-group v-model="searchDiabled">
          <el-radio-button label="true">查看所有</el-radio-button>
          <el-radio-button label="false">按月查看</el-radio-button>
        </el-radio-group>

        <el-date-picker
          class="searchDate"
          v-model="searchEventDate"
          v-if="searchDiabled === 'false'"
          type="month"
          format="yyyy 年 MM 月 "
          value-format="yyyy-MM"
        >
          placeholder="选择月" >
        </el-date-picker>
      </div>
    </div>
    <div class="addBill" v-if="role === 2">
      <div>
        <span>账单名称</span>
        <el-input
          style="width: 400px"
          v-model="formdata.event"
          placeholder="请输入账单名称"
        ></el-input>
      </div>

      <div>
        <span>账单类型</span>
        <el-radio-group v-model="formdata.amountCode">
          <el-radio :label="1">支出</el-radio>
          <el-radio :label="2">收入</el-radio>
          <el-radio :label="3">无金额</el-radio>
        </el-radio-group>
      </div>

      <div>
        <span>账单金额</span>
        <el-input
          style="width: 220px"
          disabled
          v-if="formdata.amountCode === 3"
          v-model.lazy="amount"
          type="number"
        ></el-input>
        <el-input
          v-else
          style="width: 220px"
          v-model="formdata.amount"
          type="number"
          placeholder="请输入金额 0-10000元"
        ></el-input>
      </div>
      <div class="block">
        <span>账单日期</span>
        <el-date-picker
          style="width: 400px"
          v-model="formdata.eventDate"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <div class="btn">
        <el-button
          class="submit"
          :disabled="disabled"
          type="primary"
          @click="submit"
          >提交信息</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  data() {
    return {
      trueData: [],
      trueDate: [],
      trueInfo: [],
      page: 2,
      totalNumber: 0,
      totalIn: 0,
      totalOut: 0,
      pages: 1,
      pagesSize: 7,
      searchEventDate: '',
      role: this.$store.state.role,
      searchDiabled: true,
      disabled: true,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      formdata: {
        event: '',
        amountCode: 1,
        amount: null,
        eventDate: '',
        userName: this.$store.state.userName
      },
      bills: []
    }
  },
  created() {
    window.addEventListener('beforeunload', () => {
      this.searchDiabled = true
    })
  },
  methods: {

    pageChange(val) {
      this.pages = val
    },
    async handleMounted() {
      let response = await this.$axios({
        method: 'get',
        url: 'http://localhost:8091/bill/getAllBills'
      })
      this.bills = response.data.bill
      for (let i in this.bills) {
        if (this.bills[i].amountCode === 2) {
          this.bills[i].amount = `收入${this.bills[i].amount}元`
        } else if (this.bills[i].amountCode === 3) {
          this.bills[i].amount = `无支出`
        } else {
          this.bills[i].amount = `支出${this.bills[i].amount}元`
        }
      }
      this.totalNumber = 0
      this.totalIn = 0
      this.totalOut = 0
      for (let i in response.data.bill) {
        if (response.data.bill[i].amountCode === 1) {
          this.totalNumber = this.totalNumber - Number(response.data.bill[i].amount.slice(2, -1))
          this.totalOut = this.totalOut + Number(response.data.bill[i].amount.slice(2, -1))
        } else {
          this.totalNumber = this.totalNumber + Number(response.data.bill[i].amount.slice(2, -1))
          this.totalIn = this.totalIn + Number(response.data.bill[i].amount.slice(2, -1))
        }
      }

      this.trueData = []
      this.trueDate = []
      this.trueInfo = []
      for (let i in this.bills) {
        this.trueDate.push(this.bills[i].eventDate)
        this.trueInfo.push(this.bills[i].event)
        if (this.bills[i].amountCode === 1) {
          this.trueData.push(-Number(this.bills[i].amount.slice(2, -1)))
        }
        if (this.bills[i].amountCode === 2) {
          this.trueData.push(Number(this.bills[i].amount.slice(2, -1)))
        }
      }
    },
    async submit() {
      let sentEvent = this.formdata.event
      let sentAmount = this.formdata.amount
      let sentamountCode = this.formdata.amountCode
      let sentSubmitterId = this.$store.state.id
      let sentSubmitterTrueName = this.$store.state.trueName
      let sentSubmitterUserName = this.$store.state.userName
      if (this.formdata.amount === '0') {
        sentamountCode = 3
      } else {
        this.formdata.amount = Number(this.formdata.amount)
      }
      let sentEventDate = this.formdata.eventDate.getFullYear() + '-' + (this.formdata.eventDate.getMonth() + 1) + '-' + (this.formdata.eventDate.getDate())
      let response = await this.$axios({
        method: 'get',
        url: 'http://localhost:8091/bill/setBill',
        params: {
          event: sentEvent,
          amount: sentAmount,
          amountCode: sentamountCode,
          eventDate: sentEventDate,
          submitterId: sentSubmitterId,
          submitterTrueName: sentSubmitterTrueName,
          submitterUserName: sentSubmitterUserName
        }
      })
      console.log(response)
      if (response.data.code === '10010') {
        this.handleMounted()
        this.formdata.event = ''
        this.formdata.amountCode = 1
        this.formdata.amount = null
        this.formdata.eventDate = ''
      }
      if (response.data.code === '10011') {
        this.$message.error(response.data.message)
      }
    },
    async getBillByDate() {
      let response = await this.$axios({
        method: 'get',
        url: 'http://localhost:8091/bill/getBillsByDate',
        params: {
          eventDate: `${this.searchEventDate}%`
        }
      })
      this.bills = response.data.bill
      for (let i in this.bills) {
        if (this.bills[i].amountCode === 2) {
          this.bills[i].amount = `收入${this.bills[i].amount}元`
        } else if (this.bills[i].amountCode === 3) {
          this.bills[i].amount = `无支出`
        } else {
          this.bills[i].amount = `支出${this.bills[i].amount}元`
        }
      }
      this.totalNumber = 0
      this.totalIn = 0
      this.totalOut = 0
      for (let i in response.data.bill) {
        if (response.data.bill[i].amountCode === 1) {
          this.totalNumber = this.totalNumber - Number(response.data.bill[i].amount.slice(2, -1))
          this.totalOut = this.totalOut + Number(response.data.bill[i].amount.slice(2, -1))
        } else {
          this.totalNumber = this.totalNumber + Number(response.data.bill[i].amount.slice(2, -1))
          this.totalIn = this.totalIn + Number(response.data.bill[i].amount.slice(2, -1))
        }
      }
      this.trueData = []
      this.trueDate = []
      this.trueInfo = []
      for (let i in this.bills) {
        this.trueDate.push(this.bills[i].eventDate)
        this.trueInfo.push(this.bills[i].event)
        if (this.bills[i].amountCode === 1) {
          this.trueData.push(-Number(this.bills[i].amount.slice(2, -1)))
        }
        if (this.bills[i].amountCode === 2) {
          this.trueData.push(Number(this.bills[i].amount.slice(2, -1)))
        }
      }
    },
    getDate() {
      return this.trueDate
    },
    getData() {
      return this.trueData
    },
    getTInfo() {
      // console.log(this.trueInfo)
      return this.trueInfo
    },
    async createEcharts() {
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: await this.getDate()
        },
        yAxis: {},
        series: [{
          name: await this.getTInfo(),
          // name: '?????',
          type: 'bar',
          data: await this.getData(),
          label: {
            show: true
          }
        }]
      })
    }
  },
  mounted() {
    this.handleMounted()
    let todey = new Date()
    this.searchEventDate = `${todey.getFullYear()}-0${todey.getMonth() + 1}`
  },
  computed: {
    total() {
      return this.bills.length
    },
    currentBills() {
      let list = this.bills.slice() || []
      let size = this.pagesSize
      let page = this.pages - 1
      return list.splice(page * size, size)
    },

    amount: {
      get: function () {
        console.log(this.formdata)
        return this.formdata.amount
      },
      set: function (val) {
        this.amount = val
      }
    },
    amountCode: {
      get: function () {
        return this.formdata.amountCode
      },
      set: function (val) {
        this.amountCode = val
      }
    }
  },
  watch: {
    searchDiabled: {
      handler: async function (val) {
        if (val === 'true') {
          val = true
        }
        if (val === 'false') {
          val = false
        }
        if (val === true || val === 'true') {
          await this.handleMounted()
          this.createEcharts()
        }
        if (val === false || val === 'false') {
          await this.getBillByDate()
          this.createEcharts()
        }
      },
      deep: true,
      immediate: true
    },

    searchEventDate: {
      handler: async function (val) {
        if (this.searchDiabled === false || this.searchDiabled === 'false') {
          await this.getBillByDate()
          this.createEcharts()
        }
      }
    },
    amountCode() {
      if (this.formdata.amountCode === 3) {
        this.formdata.amount = 0
      } else {
        this.formdata.amount = null
      }
    },
    amount() {
      if (this.formdata.amount >= 10000) {
        this.formdata.amount = 10000
      }
      if (this.formdata.amount < 0) {
        this.formdata.amount = 0.1
      }
    },
    formdata: {
      handler: function () {
        if (this.formdata.event === '' || this.formdata.amountCode === null || this.formdata.amount === '' || this.formdata.amount === null || this.formdata.eventDate === '') {
          this.disabled = true
        } else {
          this.disabled = false
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
.bill {
  .getBill {
    position: relative;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    // background: green;
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    height: 50rem;
    margin-top: 2rem;
    #myChart{
      width: 800px;
      height:300px;
      canvas{
        width: 100%;
        height: 100%;
      }
    }
    .total {
      position: absolute;
      top: 3rem;
      left: 5rem;
      .totalIn {
        color: rgb(0, 165, 0);
      }
      .totalOut {
        color: red;
      }
      div {
        font-family: "KaiTi" !important;
        font-size: 1.7rem;
        height: max-content;
        margin: 0.2rem;
      }
    }
    .searchRadio {
      position: absolute;
      top: 16rem;
      left: 5rem;
      .el-input__prefix, .el-input__suffix{
        height: 3.7rem;
      }
    }
    .searchDate {
      position: absolute;
      width: 12.2rem;
      top: 3.5rem;
      left: 0.5rem;
      display: flex;
      flex-direction: column;
    }
    .bill {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);

      font-family: "KaiTi" !important;
      background: rgba(156, 156, 156, 0.322);
      border-radius: 1rem;
      width: 50%;
      margin: 0.85rem auto;
      height: 4rem;
      position: relative;
      // line-height: 4rem;
      .eventName {
        position: absolute;
        top: 0.6rem;
        font-size: 1.7rem;
      }
      .billAmount {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        font-size: 1.4rem;
      }
      .billDate {
        position: absolute;
        right: 0.5rem;
        top: 3.5rem;
      }
      .billUser {
        position: absolute;
        left: 1rem;
        bottom: 0.3rem;
      }
    }
    div {
      height: 4rem;
    }
  }
  .addBill {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
  }
  div {
    outline: none;
    padding: 0.5rem;
    margin: auto;
  }
}
</style>
