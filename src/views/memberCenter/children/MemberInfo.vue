<template>
  <div>
    <div class="headerInfor">
      <div class="userPhoto">
        <img src="../../../assets/imgs/photo.jpg"/>
        <div>
          <h3>更换头像</h3>
        </div>
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
      <div class="totalAmount">
        <div class="h1">
          <h1>账号总余额：<i @click="getBalance" class="el-icon-refresh" :class="{iRotate:loading}" style="font-size: 18px;font-weight: 600;"></i></h1>
          <z-button @click="handleCommand(1)">存款教程</z-button>
        </div>
        <div class="money">{{this.memberBalance.amount || 0 | formatMoney}}</div>
        <div class="pbtn">
          <z-button @click.native="jumpTo('deposit', '存款专区')">存款</z-button>
          <z-button @click.native="jumpTo('withdrawal', '取款专区')">取款</z-button>
          <z-button @click.native="jumpTo('balanceTransfer', '额度转换')">额度转换</z-button>
        </div>
      </div>
      <div class="fundDetails">
        <h1>资金详情：</h1>
        <div>可取金额：￥ 0.00<z-button @click="handleCommand(1)">使用</z-button></div>
        <div>优惠金额：￥ 0.00<z-button @click="handleCommand(1)">使用</z-button></div>
        <div>积分余额：￥ {{memberBalance.integralTotal||0|formatMoney}}<z-button @click.native="handleCommand(7)">兑换</z-button></div>
        <div>红包余额：￥ {{memberBalance.lotteryTotal||0|formatMoney}}<z-button @click.native="handleCommand(4)">使用</z-button></div>
        <div>现金余额：￥ {{memberBalance.cashTotal||0|formatMoney}}<z-button @click.native="handleCommand(1)">使用</z-button></div>
      </div>
      <div class="coupon">
        <h1>筹码/优惠券</h1>
        <div>
          <img src="http://172.16.135.103/ui/gfx_frontend/member_centre/Chip.png"/>
          <div>
            <div>工：{{memberBalance.chipTotal}} 个</div>
            <z-button @click.native="jumpTo('chips', '游戏筹码')">使用</z-button>
          </div>
        </div>
        <div>
          <img src="http://172.16.135.103/ui/gfx_frontend/member_centre/coupon.png"/>
          <div>
            <div>工：{{memberBalance.couponTotal}} 个</div>
            <z-button @click.native="jumpTo('promotionCode', '优惠券')">使用</z-button>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-row>
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
            <el-button size="small" @click="jumpTo('deposit', '存款专区')">存款</el-button>
            <el-button size="small" @click="jumpTo('withdrawal', '取款专区')">取款</el-button>
            <el-button size="small" @click="jumpTo('balanceTransfer', '额度转换')">额度转换</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card">
          <div class="memberCardTitle">
            其他余额：
          </div>
          <ul class="otherBalance">
            <li>
              <span>优惠余额：{{(this.memberBalance.backwaterTotal + this.memberBalance.giveTotal + this.memberBalance.otherTotal)||0|formatMoney}} 元</span>
              <el-dropdown @command="handleCommand" trigger="click" placement="bottom-end">
                <el-button size="small" class="el-dropdown-link">
                  使用
                </el-button>
                // 1 现金金额 2 返水金额 3活动金额 4红包金额 5 筹码 6 其他金额 7 积分金额 8 账户余额 9 抽奖优惠卷 10 存款优惠卷
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="2">返水福利 {{this.memberBalance.backwaterTotal||0|formatMoney}} 元</el-dropdown-item>
                  <el-dropdown-item :command="3">优惠活动 {{this.memberBalance.giveTotal||0|formatMoney}} 元</el-dropdown-item>
                  <el-dropdown-item :command="6">其他优惠 {{this.memberBalance.otherTotal||0|formatMoney}} 元</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li>
              <span>积分余额：{{this.memberBalance.integralTotal||0|formatMoney}} 元</span>
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
      <el-col :span="6">
        <div class="card">
          <div class="memberCardTitle">
            筹码/优惠券：
          </div>
          <ul class="chip">
            <li class="chipImg"></li>
            <li>共：{{this.memberBalance.chipTotal}} 个</li>
            <li><el-button size="small" @click="jumpTo('chips', '游戏筹码')">使用</el-button></li>
          </ul>
          <ul class="coupon">
            <li class="couponImg"></li>
            <li>共：{{this.memberBalance.couponTotal}} 张</li>
            <li><el-button size="small" @click="jumpTo('promotionCode', '优惠券')">使用</el-button></li>
          </ul>
        </div>
      </el-col>
    </el-row> -->
    <el-dialog
      :visible.sync="dialogVisible"
      v-loading="promotionLoading"
      :modal="false"
      width="400px">
      <div class="panelBody">
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
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'member_info',
  components: {
    TransferPromote,
    zButton: {
      template: `<el-button size="mini" style="padding: 5px 25px;border-radius:5px;"><slot></slot></el-button>`
    }
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
      promotionLoading: false,
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
    ...mapMutations(['SET_TAB_TITLE']),
    getBalance () { // 获取所有优惠活动钱包余额
      this.loading = true
      this.post(PATH_WALLATBALANCE_PAY, {}).then(res => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        if (res.status) {
          this.memberBalance = res.data
        } else {
          this.$message({
            type: 'warning',
            message: '系统错误请稍后再试'
          })
        }
      }, err => {
        this.$message.error(err)
      })
    },
    jumpTo (path, title) {
      console.log(path, title)
      this.SET_TAB_TITLE(title)
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
      // console.log(command)
      this.offerType = command
      this.getOfferBalance()
    },
    getOfferBalance () { // 获取单独某个钱包的具体余额
      this.get(PATH_GETOFFER_CLIENT, {type: this.offerType}).then(res => {
        if (res.status && res.data.length && !res.data.filter(obj => obj.amount < 1).length) {
          this.dialogVisible = true
          this.codeList = res.data
        } else {
          this.$message({
            type: 'warning',
            message: '暂无可用优惠(金额小于1元不可用)'
          })
        }
      }, err => {
        this.$message.error(err)
      })
    },
    handleGetOffer () { // 领取优惠金额
      let sourceId
      // console.log(this.codeList)
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
      this.promotionLoading = true
      this.post(PATH_WALLATTOTRANSFOR_PAY, payload).then(res => {
        this.promotionLoading = false
        if (res.status) {
          if (res.status) {
            this.$message({
              type: 'success',
              message: '恭喜您，转额成功'
            })
            this.getBalance()
            this.getOfferBalance()
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
        this.$message.error(err)
      })
    },
    openForm () {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.headerInfor {
  height: 200px;
  background-color: #DCE4FA;
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  h1 {
    font-size: 16px;
    font-weight: 700;
  }
  .userPhoto {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    >div {
      width: 100%;
      height: 100%;
      position: absolute;
      transition:margin-top .5s;
      -moz-transition:margin-top .5s; /* Firefox 4 */
      -webkit-transition:margin-top .5s; /* Safari and Chrome */
      -o-transition:margin-top .5s; /* Opera */
      &:hover {
        margin-top: -35px;
      }
      >h3 {
        width: 100%;
        height: 35px;
        line-height: 35px;
        text-align: center;
        color: #FFFFFF;
        position: absolute;
        bottom: -35px;
        background: rgba(0, 0, 0, .4);
      }
    }
  }
  .loginWelcome {
    width: 150px;
    height: 85%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    >div {
      width: 100%;
    }
  }
  .totalAmount {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    width: 300px;
    height: 85%;
    .h1 {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content:space-between;
      .iRotate {
        -webkit-animation:myRotate 1s linear;
        animation:myRotate 1s linear;
      }
      @-webkit-keyframes myRotate{
        0%{ -webkit-transform: rotate(0deg);}
        100%{ -webkit-transform: rotate(-360deg);}
      }
      @keyframes myRotate{
        0%{ -webkit-transform: rotate(0deg);}
        100%{ -webkit-transform: rotate(-360deg);}
      }
    }
    .money {
      width: 100%;
      color: #FFF;
      font-size: 36px;
      height: 80px;
      padding: 10px;
      border-radius: 5px;
      background-color: #81899d;
      position: relative;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      &::before {
        content: '￥';
        width: 20px;
        height: 20px;
        border-radius: 4px;
        text-align: center;
        line-height: 20px;
        position: absolute;
        top: 5px;
        left: 5px;
        color: #333333;
        font-size: 16px;
        background-color: #dce4fa;
        border:1px solid #737b8c;
      }
    }
    .pbtn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content:space-between;
    }
  }
  .fundDetails {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    width: 220px;
    height: 85%;
    >div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-content: center;
    }
  }
  .coupon {
    width: 160px;
    height: 85%;
    margin-left: 10px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    >div {
      display: flex;
      align-items: center;
      >div>div{
        margin-bottom: 10px;
      }
    }
    img {
      width: 55px;
      margin-right: 20px;
    }
  }
}
// .el-row {
//   display: flex;
//   justify-content: space-around;
//   >div {
//     margin-right: 10px;
//     &:last-child {
//       margin-right: 0;
//     }
//   }
// }
// .card{
//   background-color: #DCE4FA;
//   height: 100px;
//   overflow: hidden;
//   padding: 20px;
//   margin: 0 auto;
//   display: flex;
//   .photo{
//     display: inline-block;
//     width: 50px;
//     height: 50px;
//     margin-top: 17px;
//     overflow: hidden;
//     border-radius: 100px;
//     background: url('../../../assets/imgs/photo.jpg') -15px 0;
//   }
//   .balance{
//     text-align: center;
//     font-size: 4rem;
//     line-height: 145px;
//     position: relative;
//     i{
//       cursor: pointer;
//       font-size: 30px;
//       vertical-align: top;
//       position: absolute;
//       right: 0;
//       top: 60px;
//     }
//   }
//   .memberCardTitle{
//     margin-top: 5px;
//     font-size: 16px;
//     font-weight: 700;
//   }
//   .balanceOperate{
//     display: flex;
//     justify-content: space-around;
//   }
//   .chip,.coupon{
//     display: inline-block;
//     width: 150px;
//     text-align: center;
//     .chipImg{
//       margin: 0 auto;
//       width: 100px;
//       height: 100px;
//       background: url('http://172.16.135.103/ui/gfx_frontend/member_centre/Chip.png') center center no-repeat;
//       background-size: 100%;
//     }
//     .couponImg{
//       margin: 0 auto;
//       width: 120px;
//       height: 120px;
//       background: url('http://172.16.135.103/ui/gfx_frontend/member_centre/coupon.png') center center no-repeat;
//       background-size: 100%;
//     }
//     li{
//       font-size: 14px;
//     }
//     line-height: 32px;
//   }
//   .otherBalance{
//     margin-top: 23px;
//     li{
//       display: flex;
//       margin-top: 8px;
//       justify-content: space-around;
//       span{
//         line-height: 32px;
//         font-size: 14px;
//         width: 164px;
//       }
//     }
//   }
//   .loginWelcome{
//     display: inline-block;
//     margin-left: 23px;
//     &>div{
//       line-height: 18px;
//       // margin-top: 20px;
//     }
//   }
// }
  .el-dialog__body{
    .panelBody{
      padding: 10px;
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
  }
</style>
