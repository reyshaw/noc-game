<template>
  <div class="Content">
    <step :stepNumber="1" :titleContent="titleContent1" :showMore="payList.length < 15" v-if="payList">
      <bank-select v-for="(item, index) in payList" :key="index" :name="'pay'" :bankCode="item.note" :payName="item.name" @select="handleSelect(index)"></bank-select>
    </step>
    <step :stepNumber="2" :titleContent="titleContent2" :showMore="bankList.length < 15" v-if="bankList">
      <bank-select v-for="(item, index) in bankList" :key="index" :bankCode="item.note" :payName="item.pay_name" @select="handleSelect(index)"></bank-select>
    </step>
    <step :stepNumber="3" :titleContent="titleContent3">
      <bank-info></bank-info>
    </step>
    <step :stepNumber="4" :titleContent="titleContent4">
      <transfer-info-form @deposit="handleDeposit"></transfer-info-form>
    </step>
  </div>
</template>

<script>
import Step from '../../children/Step'
import BankSelect from '../../children/BankSelect'
import BankInfo from '../../children/BankInfo'
import { PATH_SCANPAY_PAY } from '@/service/member/member_center.url'
import TransferInfoForm from '../../children/TransferInfoForm'

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
      currentPay: {},
      form: {
        amount: ''
      }
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
      console.log(val, newval)
      this.getPayList(val)
      this.getBankList(val)
    }
  },
  methods: {
    getPayList (val) {
      val.map(obj => {
        this.payList.push(obj)
      })
      console.log('payList', this.payList)
    },
    getBankList (val) {
      val.map(obj => {
        obj.list.map(obj1 => {
          obj1.onOrOffFlag = obj.onOrOffFlag
          this.bankList.push(obj1)
        })
      })
      console.log('bankList', this.bankList)
    },
    handleSelect (i) { // 选择支付渠道
      this.currentPay = this.payList[i]
      console.log(this.currentPay)
    },
    handleDeposit (acounmt) { // 点击支付
      let payload = {
        acounmt,
        payId: this.currentPay.payId,
        terminalType: 0,
        userType: 1
      }
      const newTab = window.open()
      this.post(PATH_SCANPAY_PAY, payload).then(res => {
        console.log(res)
        if (res.code === 1) {
          console.log(1)
          if (res.data.type === '1') {
            console.log(2)
            if (res.data) {
              this.openLayer()
              console.log(3)
              const div = document.createElement('div')
              div.innerHTML = res.data.data // html code
              console.log(res.data.data)
              newTab.document.body.appendChild(div)
              newTab.document.forms.actform.submit()
            }
          } else if (res.data.type === '2') {
            console.log(res.data.data)
            newTab.location.href = res.data.data
          }
        } else if (res.code === 500) {
          newTab.close()
          this.$message('系统错误请联系管理员')
        } else {
          newTab.close()
          this.$message(res.msg)
        }
      }, err => {
        console.log(err)
      })
    },
    openLayer () {
      let _this = this
      this.$alert('请在弹出的新窗口内完成支付', '温馨提示', {
        confirmButtonText: '我已完成支付，立即去打码游戏',
        center: true,
        callback: action => {
          _this.$router.push({
            name: 'balanceTransfer'
          })
        }
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
  }
</style>
