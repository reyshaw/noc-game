<template>
  <div class="Content">
    <step :stepNumber="1" :titleContent="titleContent1" :showMore="bankList.length < 15" v-if="bankList">
      <div class="banklist">
        <div :class="{backSelect:true,active:active === index}" v-for="(item, index) in bankList" :key="index" @click="handleSelect(index)">
          <img :src="'http://172.16.135.103/ui/gfx_frontend/banker/bank_'+item.bankCode.toLowerCase()+'.png'" alt="">
        </div>
      </div>
<!--      <bank-select v-for="(item, index) in bankList" :key="index" :bankCode="item.bankCode" :bankName="item.bankName" ></bank-select>-->
    </step>
    <step :stepNumber="2" :titleContent="titleContent2">
      <submit-form @deposit="handleDeposit" :currentBank="currentBank"></submit-form>
    </step>
  </div>
</template>

<script>
import Step from '../../children/Step'
import BankSelect from '../../children/BankSelect'
import SubmitForm from '../../children/SubmitForm'
import { PATH_ONLINEBANKING_PAY } from '@/service/member/member_center.url'

export default {
  name: 'online_deposit',
  components: {
    Step,
    BankSelect,
    SubmitForm
  },
  data () {
    return {
      titleContent1: '请选择您需要使用的银行',
      titleContent2: '请填写存款金额',
      bankList: [],
      currentBank: {},
      active: 0
    }
  },
  props: {
    zxlist: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () {
    this.getBankList()
  },
  methods: {
    getBankList () {
      this.zxlist.map(obj => {
        obj.list.map(obj1 => {
          obj1.onOrOffFlag = obj.onOrOffFlag
          this.bankList.push(obj1)
        })
      })
      this.currentBank = this.bankList[0]
    },
    handleSelect (i) {
      this.active = i
      this.currentBank = this.bankList[i]
    },
    handleDeposit (form) { // 点击存款
      if (this.currentBank.payId) {
        if (form.amount) {
          let payload = {
            acounmt: form.amount,
            payId: this.currentBank.payId,
            terminalType: 0,
            userType: 1,
            bankCode: this.currentBank.bankCode,
            investAmount: form.offerAmount
          }
          const newTab = window.open()
          this.post(PATH_ONLINEBANKING_PAY, payload).then(res => {
            if (res.status) {
              if (res.data.type === 1) {
                if (res.data) {
                  const div = document.createElement('div')
                  div.innerHTML = res.data.data // html code
                  newTab.document.body.appendChild(div)
                  newTab.document.forms.actform.submit()
                }
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
        } else {
          this.$message('请输入存款金额')
        }
      } else {
        this.$message('请选择您使用的银行')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .Content{
    margin: 0 auto;
    // width: 1350px;
    height: auto;
    background-color: white;
    border-radius: 5px;
    padding: 15px;
    .banklist{
      display: flex;
      .backSelect{
        border: 1px solid #C2C2C2;
        padding: 10px 15px;
        border-radius: 5px;
        margin: 5px;
        width: 177px;
        height: 38px;
        cursor: pointer;
        text-align: center;
      }
      .active{
        border: 2px solid #4DC033;
        position: relative;
        &:before{
          content: "✔";
          color: white;
          position: absolute;
          bottom: 0;
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
