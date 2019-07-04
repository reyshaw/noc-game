<template>
  <div class="cardInfo" v-if="Object.keys(bankInfo).length">
    <div class="title">
      <img :src="'http://172.16.135.103/ui/gfx_frontend/banker/bank_'+ this.bankCode.toLowerCase() +'.png'" alt="">
    </div>
    <ul>
      <li>
        <span class="label">网银账号：</span>
        <span class="content bankCard">{{this.bankCard}}</span>
        <a class="bankCard" href="javascript: void (0);"  :data-clipboard-text="bankCard" @click="handleCopy('.bankCard')">复制</a>
      </li>
      <li>
        <span class="label" >网银姓名：</span>
        <span class="content bankName">{{this.bankName}}</span>
        <a class="bankName" href="javascript: void (0);" :data-clipboard-text="bankName" @click="handleCopy('.bankName')">复制</a>
      </li>
      <li>
        <span class="label">附言编码：</span>
        <span class="content" >{{this.rmkCode}}</span>
        <a class="rmkCode" href="javascript: void (0);" :data-clipboard-text="rmkCode" @click="handleCopy('.rmkCode')">复制</a>
      </li>
    </ul>
  </div>
</template>

<script>
import handleCopy from '@/assets/scripts/clipboard'

export default {
  name: 'bank_info',
  props: {
    bankInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  created () {
    // console.log(this.BankInfo)
  },
  watch: {
    'bankInfo': {
      handler: function (newVal, oldVal) {
        this.bankCard = newVal.accountNo
        this.bankName = newVal.userName
        this.branchName = newVal.pay_name
        this.rmkCode = newVal.note
        this.bankCode = newVal.bankCode
        // console.log(newVal)
      },
      deep: true
    }
  },
  data () {
    return {
      bankCard: '',
      bankName: '',
      branchName: '',
      bankCode: '',
      rmkCode: ''
    }
  },
  methods: {
    handleCopy
  }
}
</script>

<style scoped lang="scss">
.cardInfo{
  width: 350px;
  border: 1px solid #CAD1E2;
  border-radius: 5px;
  .title{
    padding: 10px 20px;
    border-bottom: 1px solid #CAD1E2;
  }
  ul{
    padding: 20px;
    li{
      line-height: 25px;
      .content{
        display: inline-block;
        width: 190px
      }
    }
  }
}
</style>
