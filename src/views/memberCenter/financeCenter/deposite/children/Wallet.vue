<template>
  <div class="Content">
    <step :stepNumber="1" :titleContent="titleContent1" :showMore="payList.length < 15" v-if="payList">
      <div class="banklist">
        <div :class="{bankSelect:true,active:active === index}" v-for="(item, index) in payList" :key="index" @click="handleSelect(index)">
          <div>
            <img :src="'http://172.16.135.103/ui/gfx_frontend/banker/bank_'+(item.scanCode || item.nickName.split(' ')[0]).toLowerCase()+'.png'" alt="">
            <span>{{item.payName||item.nickName}}</span>
          </div>
        </div>
      </div>
    </step>
    <step :stepNumber="2" :titleContent="titleContent2">
        <submit-form :currentBank="currentPay" @deposit="handleDeposit"></submit-form>
    </step>
  </div>
</template>

<script>
import Step from '../../children/Step'
import BankSelect from '../../children/BankSelect'
import { PATH_SCANPAY_PAY
  // PATH_SELECTPAYCONFIG_PAY
} from '@/service/member/member_center.url'
import SubmitForm from '../../children/SubmitForm'

export default {
  name: 'wallet',
  components: {
    Step,
    BankSelect,
    SubmitForm
  },
  data () {
    return {
      account: 'ogwistest001',
      titleContent1: '请选择您需要使用的方式',
      titleContent2: '请填写存款金额',
      payList: [
      ],
      active: 0,
      currentPay: {},
      form: {
        amount: ''
      }
    }
  },
  props: {
    qblist: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () {
  },
  watch: {
    qblist (val) {
      this.getPayList(val)
    }
  },
  methods: {
    getPayList (val) {
      val.map(obj => {
        obj.list.map(obj1 => {
          obj1.onOrOffFlag = obj.onOrOffFlag
          this.payList.push(obj1)
        })
      })
      this.currentPay = this.payList[0]
    },
    handleSelect (i) { // 选择支付渠道
      this.active = i
      this.currentPay = this.payList[i]
      // console.log(this.currentPay)
    },
    handleDeposit (form) { // 点击支付
      let payload = {
        acounmt: form.amount, // 存款金额
        payId: this.currentPay.payId, // 支付ID从配置项获取
        terminalType: 0, // 终端类型
        userType: 1, // 存款金额
        offerAmount: form.offerAmount // 优惠金额
      }
      const newTab = window.open()
      this.post(PATH_SCANPAY_PAY, payload).then(res => {
        // console.log(res)
        if (res.status) {
          // console.log(1)
          if (res.data.type === '1') {
            // console.log(2)
            if (res.data) {
              this.openLayer()
              // console.log(3)
              const div = document.createElement('div')
              div.innerHTML = res.data.data // html code
              // console.log(res.data.data)
              newTab.document.body.appendChild(div)
              newTab.document.forms.actform.submit()
            }
          } else if (res.data.type === '2') {
            // console.log(res.data.data)
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
        this.$message.error(err)
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
  @import './cardPay.scss'
  // .Content{
  //   margin: 0 auto;
  //   // width: 1350px;
  //   height: auto;
  //   background-color: white;
  //   border-radius: 5px;
  //   padding: 15px;
  //   .banklist{
  //     display: flex;
  //     .bankSelect{
  //       border: 1px solid #C2C2C2;
  //       padding: 10px 15px;
  //       border-radius: 5px;
  //       margin: 5px;
  //       width: 177px;
  //       height: 38px;
  //       cursor: pointer;
  //       text-align: center;
  //       line-height: 36px;
  //       span{
  //         line-height: 22px;
  //         overflow: hidden;
  //         text-overflow:ellipsis;
  //         white-space: nowrap;
  //       }
  //       img{
  //         vertical-align: middle;
  //         height: 35px;
  //       }
  //     }
  //     .active{
  //       border: 2px solid #4DC033;
  //       position: relative;
  //       &:before{
  //         content: "✔";
  //         color: white;
  //         position: absolute;
  //         bottom: -12px;
  //         right: 3px;
  //         z-index: 2;
  //       }
  //       &:after{
  //         display: block;
  //         content: "";
  //         width: 0;
  //         height: 0;
  //         line-height: 0;
  //         border: 15px solid transparent;
  //         border-right: 15px solid #4DC033;
  //         position: absolute;
  //         bottom: -15px;
  //         right: -15px;
  //         transform: rotate(-135deg);
  //       }
  //     }
  //   }
  // }
</style>
