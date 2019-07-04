<template>
  <div class="MCcontainer">
    <el-tabs type="card">
      <el-tab-pane label="在线存款">
        <online-deposit v-if="zxlist.length" :zxlist="zxlist"></online-deposit>
      </el-tab-pane>
      <el-tab-pane label="转账支付">
        <transfer :zzlist="zzlist"></transfer>
      </el-tab-pane>
      <el-tab-pane label="扫码支付">
        <scan-pay :smlist="smlist"></scan-pay>
      </el-tab-pane>
      <el-tab-pane label="钱包支付">
        <wallet :qblist="qblist"></wallet>
      </el-tab-pane>
      <el-tab-pane label="点卡支付">
        <wii-points :dklist="dklist"></wii-points>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OnlineDeposit from './children/OnlineDeposit'
import ScanPay from './children/ScanPay'
import Transfer from './children/Transfer'
import Wallet from './children/Wallet'
import WiiPoints from './children/WiiPoints'
import { PATH_SELECTPAYCONFIG_PAY } from '@/service/member/member_center.url'

export default {
  name: 'deposit',
  components: {
    OnlineDeposit,
    ScanPay,
    Transfer,
    Wallet,
    WiiPoints
  },
  data () {
    return {
      dklist: [],
      qblist: [],
      smlist: [],
      zxlist: [],
      zzlist: []
    }
  },
  mounted () {
    this.getOnlinePayConfig()
  },
  methods: {
    getOnlinePayConfig () { // 获取支付商列表
      this.post(PATH_SELECTPAYCONFIG_PAY, {}).then(res => {
        this.dklist = res.data.dklist
        this.qblist = res.data.qblist
        this.smlist = res.data.smlist
        this.zxlist = res.data.zxlist
        this.zzlist = res.data.zzlist
        // console.log(this.zxlist)
      }, err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
