<template>
  <div>
    <el-row>
    <!--第一块-->
     <el-col :span="6">
       <div class="card">
         <div class="photo">
         </div>
         <div class="loginWelcome">
           <h1 class="memberCardTitle">尊敬的会员下午好！</h1>
           <div class="accountinfo">
             <div><span>我的商户：</span><span>{{memberInfo.memberRealName}}</span></div>
             <div><span>我的等级：</span><span>{{memberInfo.layeringId}}</span></div>
           </div>
           <div class="loginTime">
             <div>我最近的登录时间</div>
             <div>{{memberInfo.loginTime}}</div>
           </div>
           <div class="loginLocation">
             <div>我最近的登录地址</div>
             <div>{{memberInfo.loginCity}}</div>
           </div>
         </div>
       </div>
     </el-col>
      <!--第二块-->
      <el-col :span="6">
        <div class="card" v-loading="loading">
          <div class="memberCardTitle">
            账户总余额：
          </div>
          <div class="balance">
            ￥{{this.memberBalance.amount || 0 | formatMoney}}
            <i @click="getBalance" class="el-icon-refresh"></i>
          </div>
          <div class="balanceOperate">
            <el-button size="small" @click="jumpTo('deposit')">存款</el-button>
            <el-button size="small" @click="jumpTo('withdrawal')">取款</el-button>
            <el-button size="small" @click="jumpTo('balanceTransfer')">额度转换</el-button>
          </div>
        </div>
      </el-col>
      <!--第三块-->
      <el-col :span="6">
        <div class="card">
          <div class="memberCardTitle">
            其他余额：
          </div>
          <ul class="otherBalance">
            <li>
              <span>优惠余额：{{this.memberBalance.giveTotal||0|formatMoney}} 元</span>
              <el-dropdown @command="handleCommand" trigger="click" placement="bottom-end">
                <el-button size="small" class="el-dropdown-link">
                  使用
                </el-button>
<!--                // 1 现金金额 2 返水金额 3活动金额 4红包金额 5 筹码 6 其他金额 7 积分金额 8 账户余额 9 抽奖优惠卷 10 存款优惠卷-->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="2">返水福利 0.00 元</el-dropdown-item>
                  <el-dropdown-item :command="3">优惠活动 0.00 元</el-dropdown-item>
                  <el-dropdown-item :command="6">其他优惠 0.00 元</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li>
              <span>积分余额：{{this.memberBalance.amount||0|formatMoney}} 元</span>
              <el-button size="small" @click="handleCommand(7)">兑换</el-button>
            </li>
            <li>
              <span>红包余额：{{this.memberBalance.lotteryTotal||0|formatMoney}} 元</span>
              <el-button size="small" @click="handleCommand(4)">使用</el-button>
            </li>
            <li>
              <span>现金余额：{{this.memberBalance.cashTotal||0|formatMoney}} 元</span>
              <el-button size="small" @click="handleCommand(1)">使用</el-button>
            </li>
          </ul>
        </div>
      </el-col>
      <!--第四块-->
      <el-col :span="6">
        <div class="card">
          <div class="memberCardTitle">
            筹码/优惠券：
          </div>
          <ul class="chip">
            <li class="chipImg"></li>
            <li>额度：{{this.memberBalance.chipTotal||0|formatMoney}}</li>
            <li><el-button size="small" @click="jumpTo('chips')">使用</el-button></li>
          </ul>
          <ul class="coupon">
            <li class="couponImg"></li>
            <li>共：999张</li>
            <li><el-button size="small" @click="jumpTo('promotionCode')">使用</el-button></li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible"
      :modal="false"
      width="400px">
      <div class="title" @click="dialogVisible = false"><i class="el-icon-close"></i></div>
      <transfer-promote
        :codeList="codeList"
        @refresh="getOfferBalance"
        @fastChose="fastChose"
        :diaType="offerType"
        :form="form">
      </transfer-promote>
      <div class="command" style="text-align: center">
        <el-button size="mini" @click="dialogVisible = false">重 置</el-button>
        <el-button size="mini" type="primary" @click="handleGetOffer">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TransferPromote from './TransferPromote'
import {
  PATH_WALLATBALANCE_PAY,
  PATH_GETOFFER_CLIENT,
  PATH_WALLATTOTRANSFOR_PAY
} from '@/service/member/member_center.url'
import { mapState } from 'vuex'
export default {
  name: 'member_info',
  components: {
    TransferPromote
  },
  data () {
    return {
      visible1: false,
      memberBalance: {
        amount: '',
        cashTotal: '',
        chipTotal: '',
        giveTotal: '',
        integralTotal: '',
        lotteryTotal: ''
      },
      dialogVisible: false,
      loading: false,
      codeList: [],
      form: {
        promoteType: 1,
        account: '',
        amount: ''
      },
      offerType: 0
    }
  },
  computed: {
    ...mapState({
      memberInfo: 'baseInfo'
    })
  },
  created () {
    this.getBalance()
  },
  filters: {
    format (value) {
      let name
      switch (value) {
        case 'slot':
          name = '电子'
      }
      return name
    }
  },
  methods: {
    getBalance () { // 获取所有优惠活动钱包余额
      this.loading = true
      this.post(PATH_WALLATBALANCE_PAY, {}).then(res => {
        this.loading = false
        if (res) {
          this.memberBalance = res.data
        } else {
          this.$message({
            type: 'warning',
            message: '系统错误请稍后再试'
          })
        }
      }, err => {
        console.log(err)
      })
    },
    jumpTo (path) {
      this.$router.push({
        name: path
      })
    },
    fastChose (amount) {
      this.form.amount = amount
    },
    handleCommand (command) { // 切换不同优惠钱包兑换优惠
      this.form = { // 1 现金金额 2 返水金额 3活动金额 4红包金额 5 筹码 6 其他金额 7 积分金额 8 账户余额 9 抽奖优惠卷 10 存款优惠卷
        promoteType: 1,
        account: '',
        amount: ''
      }
      console.log(command)
      this.offerType = command
      this.getOfferBalance()
    },
    getOfferBalance () { // 获取单独某个钱包的具体余额
      this.get(PATH_GETOFFER_CLIENT, {type: this.offerType}).then(res => {
        if (res && res.code === 1) {
          this.dialogVisible = true
          this.codeList = res.data
        }
      }, err => {
        console.log(err)
      })
    },
    handleGetOffer () { // 领取优惠金额
      let sourceId
      console.log(this.codeList)
      if (this.offerType !== 1 && this.offerType !== 7) {
        sourceId = this.codeList.filter(obj => obj.multiples === this.form.promoteType)[0].multipleBalanceId
      } else {
        sourceId = this.codeList[0].multipleBalanceId
      }
      let payload = {
        balance: this.form.amount,
        toProviderCode: this.form.account.split(',')[1],
        toProvidersId: this.form.account.split(',')[0],
        sourceId,
        walletType: this.offerType
      }
      this.post(PATH_WALLATTOTRANSFOR_PAY, payload).then(res => {
        if (res) {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '恭喜您，转额成功'
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.msg
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.msg
          })
        }
      }, err => {
        console.log(err)
      })
    },
    openForm () {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.card{
  background-color: #DCE4FA;
  width: 343px;
  height: 200px;
  overflow: hidden;
  padding: 23px;
  margin: 0 auto;
  .photo{
    display: inline-block;
    width: 164px;
    height: 164px;
    margin-top: 17px;
    overflow: hidden;
    border-radius: 100px;
    background: url('../../../assets/imgs/photo.jpg') -15px 0;
  }
  .balance{
    text-align: center;
    font-size: 4rem;
    line-height: 145px;
    position: relative;
    i{
      cursor: pointer;
      font-size: 30px;
      vertical-align: top;
      position: absolute;
      right: 0;
      top: 60px;
    }
  }
  .memberCardTitle{
    margin-top: 5px;
    font-size: 16px;
    font-weight: 700;
  }
  .balanceOperate{
    display: flex;
    justify-content: space-around;
  }
  .chip,.coupon{
    display: inline-block;
    width: 150px;
    text-align: center;
    .chipImg{
      margin: 0 auto;
      width: 100px;
      height: 100px;
      background: url('http://172.16.135.103/ui/gfx_frontend/member_centre/Chip.png') center center no-repeat;
      background-size: 100%;
    }
    .couponImg{
      margin: 0 auto;
      width: 120px;
      height: 120px;
      background: url('http://172.16.135.103/ui/gfx_frontend/member_centre/coupon.png') center center no-repeat;
      background-size: 100%;
    }
    li{
      font-size: 14px;
    }
    line-height: 32px;
  }
  .otherBalance{
    margin-top: 23px;
    li{
      display: flex;
      margin-top: 8px;
      justify-content: space-around;
      span{
        line-height: 32px;
        font-size: 14px;
        width: 164px;
      }
    }
  }
  .loginWelcome{
    display: inline-block;
    margin-left: 23px;
    &>div{
      line-height: 18px;
      margin-top: 20px;
    }
  }
}
  .el-dialog__body{
    .title{
      text-align: right;
      cursor: pointer;
      margin-bottom: 30px;
      i{
        font-size: 15px;
      }
    }
    .command{
      margin-bottom: 15px;
    }
  }
</style>
