<template>
  <div class="Content">
    <step :stepNumber="1" :titleContent="titleContent1" :showMore="payList.length < 15" v-if="payList">
      <bank-select v-for="(item, index) in payList" :key="index" :bankCode="item.scanCode" :payName="item.payName||item.nickName" @select="handleSelect(index)"></bank-select>
    </step>
    <step v-if="showType === 0" :stepNumber="2" :titleContent="titleContent2">
      <submit-form @deposit="onlineDeposit"></submit-form>
    </step>
    <step v-if="showType === 1"  :stepNumber="2" :titleContent="titleContent3">
      <img :src="QRCodeImg" alt="二维码显示失败请联系客服">
    </step>
    <step v-if="showType === 1"  :stepNumber="3" :titleContent="titleContent4">
      <deposit-info-form @deposit="offlineDeposit"></deposit-info-form>
    </step>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="520px">
      <div class="title">请使用支付宝扫码支付</div>
      <vue-qrcode
        :value="qrcodeUrl"
        v-if="qrcodeUrl"
        :options="{ size: 170 }"></vue-qrcode>
      <img :src="qrCodeImg" alt="二维码">
      <div class="foot">二维码有效时间仅为2分钟，过期请重新获取二维码</div>
    </el-dialog>
  </div>
</template>

<script>
import Step from '../../children/Step'
import BankSelect from '../../children/BankSelect'
import { PATH_SCANPAY_PAY, PATH_OFFLINESCANPAY_PAY } from '@/service/member/member_center.url'
import SubmitForm from '../../children/SubmitForm'
import DepositInfoForm from '../../children/DepositInfoForm'
import VueQrcode from '@xkeshi/vue-qrcode'
import { mapState } from 'vuex'
import { formatDate } from '@/assets/scripts/utils'

export default {
  name: 'scan-pay',
  components: {
    DepositInfoForm,
    Step,
    BankSelect,
    SubmitForm,
    VueQrcode
  },
  data () {
    return {
      account: 'ogwistest001',
      titleContent1: '请选择您需要使用的方式',
      titleContent2: '请填写存款金额',
      titleContent3: '扫码支付',
      titleContent4: '请填写存款金额',
      payList: [
      ],
      currentPay: {},
      form: {
        amount: ''
      },
      showType: 0,
      QRCodeImg: '',
      dialogVisible: false,
      downloadButton: false,
      qrcodeUrl: '',
      qrCodeImg: ''
    }
  },
  props: {
    smlist: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    ...mapState(['memberInfo'])
  },
  mounted () {
  },
  watch: {
    smlist (val) {
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
      console.log(1, this.payList)
    },
    handleSelect (i) { // 选择支付渠道
      this.currentPay = this.payList[i]
      console.log(this.currentPay)
      if (this.payList[i].onOrOffFlag === '0') {
        this.showType = 1
        this.QRCodeImg = this.payList[i].qrCodeUrl
      } else {
        this.showType = 0
      }
    },
    onlineDeposit (acounmt) { // 线上支付
      if (acounmt) {
        if (this.currentPay.payId) {
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
              if (res.data.status === 1) {
                if (res.data.type === '1') {
                  if (res.data) {
                    this.openLayer()
                    const div = document.createElement('div')
                    div.innerHTML = res.data.data // html code
                    console.log(res.data.data)
                    newTab.document.body.appendChild(div)
                    newTab.document.forms.actform.submit()
                  }
                } else if (res.data.type === '2') {
                  newTab.close()
                  this.qrcodeUrl = res.data.data
                  console.log(res.data.data)
                  this.dialogVisible = true
                } else if (res.data.type === '3') {
                  newTab.close()
                  this.qrCodeImg = res.data.data
                  console.log(res.data.data)
                  this.dialogVisible = true
                } else if (res.data.type === '4') {
                  console.log(res.data.data)
                  newTab.location.href = res.data.data
                }
              } else {
                newTab.close()
                this.$message(res.data.msg)
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
        } else {
          this.$message({
            type: 'warning',
            message: '请选择存款方式'
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '存款金额不能为空'
        })
      }
    },
    offlineDeposit (form) {
      let payload = {
        amount: form.amount, // 支付金额
        nickname: form.nickName, // 昵称
        note: form.thirdAccount, // 对账订单号
        payId: this.currentPay.payId, // 线下支付商编号
        userType: 1, // 会员角色(1=会员, 2=厅主, 3=股东
        payMode: 0, // 支付类型(0账单支付 1购买额度)
        realname: this.memberInfo.memberRealName, // 存款账号
        depositTime: formatDate(form.time)// 存款时间
      }
      this.post(PATH_OFFLINESCANPAY_PAY, payload).then(res => {
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: '您的信息已经被记录，请等待客服确认后打款'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '系统错误请联系管理员'
          })
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
