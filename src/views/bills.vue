<template>
  <div>
    <div v-for="i in bills" v-bind:key="i.id">
      <span class="billId">{{ i.id }}</span>
      <span class="eventName">{{ i.event }}</span>
      <span class="billAmount">{{ i.amount }}</span>
      <span class="billDate">{{ i.eventDate }}</span>
      <span>提交人：{{ i.submitterUserName }}</span>
    </div>
    <div>
      <el-input v-model="formdata.event" placeholder="请输入账单名称"></el-input>
      <el-radio-group v-model="formdata.amountCode">
        <el-radio :label="1">支出</el-radio>
        <el-radio :label="2">收入</el-radio>
        <el-radio :label="3">无金额</el-radio>
      </el-radio-group>
      <el-input
        disabled
        v-if="formdata.amountCode === 3"
        v-model="amount"
        type="number"
      ></el-input>
      <el-input
        v-else
        v-model="formdata.amount"
        type="number"
        placeholder="请输入金额 0-10000元"
      ></el-input>
      <div class="block">
        <el-date-picker
          v-model="formdata.eventDate"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        <div>
          <el-button :disabled="disabled" type="primary" @click="submit"
            >提交信息</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disabled: true,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
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
  methods: {
    async handleMounted () {
      let response = await this.$axios({
        method: 'get',
        url: 'http://localhost:8091/bill/getAllBills'
      })
      console.log(response)
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
      console.log(this.bills)
    },
    async submit () {
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
      let sentEventDate = this.formdata.eventDate.getFullYear() + '-' + (this.formdata.eventDate.getMonth() + 1) + '-' + (this.formdata.eventDate.getDate() + 1)
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
    }
  },
  mounted () {
    this.handleMounted()
  },
  computed: {
    amount: {
      get: function () {
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
    amountCode () {
      if (this.formdata.amountCode === 3) {
        console.log('amount change')
        this.formdata.amount = 0
      } else {
        this.formdata.amount = null
      }
    },
    amount () {
      console.log('amount chang')
      if (this.formdata.amount >= 10000) {
        this.formdata.amount = 10000
      }
      if (this.formdata.amount < 0) {
        this.formdata.amount = 0.1
      }
    },
    formdata: {
      handler: function () {
        if (this.formdata.event === '' || this.formdata.amountCode === null || this.formdata.amount === null || this.formdata.eventDate === '') {
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
</style>
