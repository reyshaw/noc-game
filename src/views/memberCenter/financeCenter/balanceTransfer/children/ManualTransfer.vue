<template>
  <div class="Content">
    <div class="reference">
      <div class="connect"></div>
      <step :stepNumber="1" titleContent="来源账户">
        <div class="platformList">
          <div
            v-for="(item, index) in referencePlatform"
            :class="{checkedPlatform:activeIndex === index, platformItem:true}"
            :key="index"
            v-loading="isloading[index]"
            @click="handleCheck(item, index, 0)">
            <div class="logo"><img src="http://www.wzsky.net/img2016/uploadimg/20161019/1032510.jpg" alt=""></div>
            <div class="container">
              <div class="platformName">{{item.cnName}}</div>
              <div class="gameAmount">
                <span :class="{gameBalance:true, orange:amountStatus[index]}" @click="getBalance(item, index, 1)">{{item.amount||'查看余额'}}</span>
                <span class="status">{{item.status ? item.status+'...' : ''}}</span>
              </div>
              <i @click="getBalance(item, index, 1)" :class="{iconfont:true, icongengxin1:true, balanceLoading:isloading[index]}"></i>
            </div>
          </div>
        </div>
      </step>
      <step :stepNumber="2" titleContent="目标账户">
        <div class="platformList">
          <div
          v-for="(item, index) in referencePlatform"
          :class="{platformItem:true,checkedPlatform:activeIndex1 === index}"
          :key="index"
          @click="handleCheck(item, index, 1)">
            <div class="logo"><img src="http://www.wzsky.net/img2016/uploadimg/20161019/1032510.jpg" alt=""></div>
            <div class="container">
              <div class="platformName">{{item.cnName}}</div>
              <div class="gameAmount">
                <span :class="{gameBalance:true, orange:amountStatus[index]}" @click="getBalance(item, index, 0)">{{item.amount||'查看余额'}}</span>
                <span class="status">{{item.status ? item.status+'...' : ''}}</span>
              </div>
              <i @click="getBalance(item, index, 0)" :class="{iconfont:true, icongengxin1:true, balanceLoading:isloading[index]}"></i>
            </div>
          </div>
        </div>
      </step>
      <step :stepNumber="3" titleContent="请填写转换金额">
        <div class="addAmount">
          <div class="couponList">
            <div
              :class="{coupon:true,choose: activeCoupon === index}"
              v-for="(item, index) in promotionList" :key="index"
              @click="selectCoupon(item,index)">
              <div class="give">￥{{item.give}}</div>
              <div class="sumup">
                <span>优惠券</span>
                <span>存{{item.sumup}}送</span>
              </div>
            </div>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="转账额度">
              <el-input v-model.trim.number="form.balance" size="mini" placeholder="*范围1-50000元" style="width: 215px">
                <template slot="append">元</template>
              </el-input>
              <el-tag v-if="codeAmount" style="margin-left: 10px;" class="el-icon-warning" type="warning">您选择该优惠后需要完成{{this.codeAmount}}的有效投注</el-tag>
            </el-form-item>
            <el-form-item>
              <el-button type="info" size="mini">重置</el-button>
              <el-button type="success" size="mini" @click="handleTransfer">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </step>
    </div>
  </div>
</template>

<script>
import { PATH_GAMEPLATFORM_PAY,
  PATH_BALANCE_PAY,
  PATH_WALLATTOTRANSFOR_PAY,
  PATH_TRANSFOR_PAY,
  PATH_TRANSFORTOWALLAT_PAY,
  PATH_WALLATBALANCE_PAY
} from '@/service/member/member_center.url'

import Step from '../../children/Step'

export default {
  name: 'online_deposit',
  components: {
    Step
  },
  data () {
    return {
      referencePlatform: [
        {cnName: '钱包余额', id: '0', code: 'qbye', amount: '查看余额', status: ''}
      ],
      activeIndex: '', // 选中的平台
      activeIndex1: '', // 选中的平台
      isloading: [], // 加载状态
      amountStatus: [], // 资金显示状态
      activeCoupon: '', // 优惠券选用状态
      codeAmount: '', // 所需打码量
      form: {
        reference: '',
        object: '',
        balance: '',
        promoteType: ''
      },
      promotionList: [
        { label: 0, sumup: 100, give: '50' },
        { label: 0, sumup: 200, give: '150' },
        { label: 0, sumup: 300, give: '300' },
        { label: 0, sumup: 500, give: '600' },
        { label: 0, sumup: 800, give: '800' }
      ]
    }
  },
  mounted () {
    this.getPlatform()
  },
  methods: {
    selectCoupon (i, ind) {
      this.activeCoupon = ind
      this.codeAmount = i.sumup * 7.5
    },
    handleCheck (item, i, a) {
      if (a) {
        this.activeIndex1 = i
        this.form.object = item // 拿到目标账户
        console.log(this.form)
      } else {
        this.activeIndex = i
        this.form.reference = item // 拿到来源账户
        console.log(this.form)
      }
    },
    getPlatform () {
      this.get(PATH_GAMEPLATFORM_PAY, {}).then(res => { // 查询所有平台列表
        res.data.map(obj => {
          this.referencePlatform.push(obj)
        })
        console.log(this.referencePlatform)
      }, err => {
        console.log(err)
      })
    },
    getBalance (item, i, ind) {
      console.log(item)
      let path = ''
      let payload = {}
      if (i === 0) {
        path = PATH_WALLATBALANCE_PAY // 查询平台余额
      } else {
        path = PATH_BALANCE_PAY // 查询钱包余额
        payload = {
          toProviderCode: item.code,
          toProvidersId: item.id
        }
      }
      this.isloading[i] = true // 刷新按钮选择开始
      this.$set(this.referencePlatform[i], 'status', '正在加载中') // 状态提示开始
      console.log(this.referencePlatform)
      this.post(path, payload).then(res => {
        this.$set(this.isloading, i, false) // 刷新按钮选择结束
        this.$set(this.referencePlatform[i], 'status', '') // 状态提示开始
        this.$set(this.amountStatus, i, true) // 刷新按钮选择结束
        if (i === 0) { // 判断是否是钱包余额还是平台余额
          this.$set(this.referencePlatform[i], 'amount', parseFloat(res.data.amount).toFixed(2))
        } else {
          this.$set(this.referencePlatform[i], 'amount', parseFloat(res.data).toFixed(2))
        }
      }, err => {
        console.log(err)
      })
    },
    handleTransfer () {
      let payload = {}
      let path = ''
      if (this.form.balance) {
        if (this.form.object) {
          if (this.form.reference) {
            if (this.form.object.code !== this.form.reference.code) {
              if (this.form.reference.id === '0') {
                payload = {
                  balance: this.form.balance,
                  toProviderCode: this.form.object.code,
                  toProvidersId: this.form.object.id,
                  walletType: 8
                }
                path = PATH_WALLATTOTRANSFOR_PAY
                this.sendPost(payload, path)
              } else if (this.form.object.id === '0') {
                payload = {
                  balance: this.form.balance,
                  toProviderCode: this.form.reference.code,
                  toProvidersId: this.form.reference.id
                }
                path = PATH_TRANSFORTOWALLAT_PAY
                this.sendPost(payload, path)
              } else {
                payload = {
                  balance: this.form.balance,
                  toProviderCode: this.form.object.code,
                  toProvidersId: this.form.object.id + '',
                  fromProviderCode: this.form.reference.code,
                  fromProvidersId: this.form.reference.id + ''
                }
                path = PATH_TRANSFOR_PAY
                this.sendPost(payload, path)
              }
            } else {
              this.$message('不能在同一账户之间互转')
            }
          } else {
            this.$message('请选择来源账户')
          }
        } else {
          this.$message('请选择目标账户')
        }
      } else {
        this.$message('请输入转账额度')
      }
    },
    sendPost (payload, path) {
      console.log(payload, path)
      this.post(path, payload).then(res => {
        if (res.code === 1) {
          this.$message('恭喜您转额成功')
          this.referencePlatform.map(obj => {
            if (obj.id === this.form.reference.id) {
              obj.amount = (parseFloat(obj.amount) - parseFloat(this.form.balance)).toFixed(2)
            }
            if (obj.id === this.form.object.id) {
              obj.amount = (parseFloat(obj.amount) + parseFloat(this.form.balance)).toFixed(2)
            }
          })
        }
      }, err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .Content{
    .StepContent{
      width: 93%;
    }
    .reference{
      margin: 10px auto;
      width: 1350px;
      height: auto;
      background-color: white;
      border-radius: 5px;
      padding: 15px;
      position: relative;
      .connect{
        width: 75px;
        height: 288px;
        background: url("http://172.16.135.103/ui/gfx_frontend/member_centre/conversion.png") center center no-repeat;
        position: absolute;
        right: 32px;
        top: 160px;
      }
      .platformList{
        display: flex;
        flex-wrap: wrap;
        .platformItem{
          cursor: pointer;
          width: 220px;
          height: 80px;
          margin-right: 40px;
          margin-bottom: 20px;
          padding: 13px;
          box-sizing: border-box;
          border-radius: 5px;
          border: 1px solid #999999;
          position: relative;
          overflow: hidden;
          .logo{
            width: 50px;
            height: 50px;
            border-radius: 25px;
            overflow: hidden;
            float: left;
            img{
              width: 50px;
              height: 50px;
            }
          }
          .container{
            margin-top: 1px;
            margin-left: 5px;
            float: left;
            span, div {
              line-height: 22px;
              font-size: 15px;
            }
            .gameAmount{
              .gameBalance{
                color: #666666;
                &:hover{
                  color: #eb844c;
                }
              }
              .orange{
                color: #eb844c;
              }
              .status{
                position: absolute;
                right: 12px;
                bottom: 2px;
                color: red;
              }
            }
            .icongengxin1 {
              cursor: pointer;
              font-size: 28px;
              position: absolute;
              right: 5px;
              top: 5px;
            }
            .balanceLoading{
              color: #3e3e3e;
              animation: rotate 2s infinite;
            }
          }
        }
        .platformItem:nth-child(4n){
          margin-right: 0;
        }
        .checkedPlatform{
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
      .addAmount{
        .couponList{
          display: flex;
          margin-bottom: 20px;
          flex-wrap: wrap;
          .coupon{
            width: 142px;
            height: 84px;
            padding: 20px 3px;
            box-sizing: border-box;
            margin-right: 20px;
            display: flex;
            background: url("http://172.16.135.103/ui/gfx_frontend/member_centre/coupon_1.png") center center no-repeat;
            cursor: pointer;
            .sumup{
              margin-top: 10px;
              margin-left: 10px;
              span{
                display: block;
                font-size: 13px;
                color: white;
              }
              span:last-child{
                font-size: 11px;
              }
            }
            .give{
              font-size: 200%;
              line-height: 56px;
              font-weight: bold;
              letter-spacing: -1px;
              background: linear-gradient(#B0C3F4, #fff 60%, #B0C3F4);
              -webkit-background-clip: text;
              color: transparent;
            }
          }
          .choose{
            background: url("http://172.16.135.103/ui/gfx_frontend/member_centre/coupon_2.png") center center no-repeat;
          }
        }
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
