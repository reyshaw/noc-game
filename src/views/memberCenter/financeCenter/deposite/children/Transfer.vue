<template>
  <div class="Content" v-loading="loading">
    <step :stepNumber="1" :titleContent="titleContent1" :showMore="payList.length < 15" v-if="payList">
      <div class="banklist">
        <div :class="{bankSelect:true,active:active === index}" v-for="(item, index) in payList" :key="index" @click="handleSelect(index)">
          <img :src="'http://172.16.135.103/ui/gfx_frontend/banker/bank_'+item.nameCode+'.png'" alt="">
          <span>{{item.name}}</span>
        </div>
      </div>
    </step>
    <step :stepNumber="2" :titleContent="titleContent2" :showMore="bankList.length < 15" v-if="bankList">
      <div class="banklist">
        <div :class="{bankSelect:true,active:active1 === index}" v-for="(item, index) in bankList" :key="index" @click="handleSelect(index,1)">
          <img :src="'http://172.16.135.103/ui/gfx_frontend/banker/bank_'+item.bankCode.toLowerCase()+'.png'" alt="">
        </div>
      </div>
    </step>
    <step :stepNumber="3" :titleContent="titleContent3">
      <bank-info :bankInfo="currentBank"></bank-info>
    </step>
    <step :stepNumber="4" :titleContent="titleContent4">
      <transfer-info-form :currentBank="currentBank" @deposit="handleDeposit"></transfer-info-form>
    </step>
  </div>
</template>

<script>
import Step from '../../children/Step'
import BankSelect from '../../children/BankSelect'
import BankInfo from '../../children/BankInfo'
import { PATH_OFFLINEBANKPAY_PAY } from '@/service/member/member_center.url'
import TransferInfoForm from '../../children/TransferInfoForm'
import { formatDate } from '@/assets/scripts/utils'

export default {
  name: 'transfer',
  components: {
    Step,
    BankSelect,
    BankInfo,
    TransferInfoForm
  },
  data () {
    return {
      account: 'ogwistest001',
      titleContent1: '请选择您需要使用的转账方式',
      titleContent2: '请选择您需要使用的银行',
      titleContent3: '请查看转入账号信息',
      titleContent4: '请填写存款信息',
      payList: [
      ],
      bankList: [
      ],
      loading: false,
      currentPay: {},
      currentBank: {},
      form: {
        amount: ''
      },
      active: '',
      active1: ''
    }
  },
  props: {
    zzlist: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () {
    // this.getOnlinePayConfig()
  },
  watch: {
    zzlist (val, newval) {
      // console.log(val, newval)
      this.getPayList(val)
    }
  },
  methods: {
    getPayList (val) { // 获取支付渠道从zzlist
      val.map(obj => {
        this.payList.push(obj)
      })
      // console.log('payList', this.payList)
    },
    getBankList (val) { // 获取银行列表
      // console.log('val', val)
      val.list.map(obj => {
        obj.onOrOffFlag = val.onOrOffFlag
        this.bankList.push(obj)
      })
      // console.log('bankList', this.bankList)
    },
    handleSelect (i, ind) { // 选择支付渠道
      if (ind) {
        this.active1 = i
        this.currentBank = this.bankList[i]
      } else {
        this.active = i
        this.currentPay = this.payList[i]
        this.getBankList(this.currentPay)
      }
    },
    handleDeposit (form) { // 点击支付
      let payload = {
        acounmt: form.amount,
        bankCard: this.currentBank.accountNo,
        bankName: this.currentBank.pay_name,
        payId: this.currentBank.payId,
        note: this.currentBank.note,
        payMode: 2, // 2 = 会员支付
        username: this.currentBank.userName,
        depositBank: form.depositBank,
        depositName: form.depositName,
        depositTime: formatDate(form.depositTime),
        investAmount: form.offerAmount,
        userType: 1
      }
      this.loading = true
      this.post(PATH_OFFLINEBANKPAY_PAY, payload).then(res => {
        this.loading = false
        if (res.status) {
          // console.log(res)
          this.$message({
            type: 'success',
            message: res.msg
          })
        }
      }, err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .Content{
    margin: 0 auto;
    width: 1350px;
    height: auto;
    background-color: white;
    border-radius: 5px;
    padding: 15px;
    .banklist{
      display: flex;
      .bankSelect{
        border: 1px solid #C2C2C2;
        padding: 10px 15px;
        border-radius: 5px;
        margin: 5px;
        width: 177px;
        height: 38px;
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        span{
          font-size: 16px;
          line-height: 22px;
        }
        img{
          vertical-align: middle;
          height: 35px;
        }
      }
      .active{
        border: 2px solid #4DC033;
        position: relative;
        &:before{
          content: "✔";
          color: white;
          position: absolute;
          bottom: -12px;
          right: 3px;
          z-index: 2;
        }
        &:after{
          display: block;
          content: "";
          width: 0;
          height: 0;
          line-height: 0;
          border: 15px solid transparent;
          border-right: 15px solid #4DC033;
          position: absolute;
          bottom: -15px;
          right: -15px;
          transform: rotate(-135deg);
        }
      }
    }
  }
</style>
