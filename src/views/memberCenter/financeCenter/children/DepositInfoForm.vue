<template>
  <div class="submitForm">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item prop="account" label="存款账户">
        {{memberInfo.memberAccount}}
      </el-form-item>
      <el-form-item prop="amount" label="存款金额">
        <div class="input">
          <input v-model.trim.number="form.amount" type="text" :placeholder="`存款范围${this.currentBank.minimumTransactionLimit}~${this.currentBank.maximumTransactionLimit}`" @blur="getOffer">
          <div class="addon">.5</div>
        </div>
        <div class="promote" v-if="form.offerAmount && accept === 'accept'">
          <i class="el-icon-success"></i>
          <span>优惠￥{{this.form.offerAmount | formatMoney}}</span>
        </div>
      </el-form-item>
      <el-form-item prop="grants" label="优惠赠款">
        <input type="radio" v-model="accept" id="accept2" name="drone" value="accept" @click="handleAccept">
        <label for="accept2">接受</label>
        <input type="radio" v-model="accept" id="refuse2" name="drone" value="refuse" checked  @click="handleAccept">
        <label for="refuse2">拒绝</label>
      </el-form-item>
      <el-form-item prop="thirdAccount" label="存款微信账号">
        <input  :style="InputStyle" v-model.trim.number="form.thirdAccount" type="text" placeholder="请输入存款微信账号">
      </el-form-item>
      <el-form-item prop="nickName" label="存款微信昵称">
        <input  :style="InputStyle" v-model.trim="form.nickName" type="text" placeholder="请输入存款微信昵称">
      </el-form-item>
      <el-form-item prop="orderNumber" label="存款订单号">
        <input  :style="InputStyle" v-model.trim="form.orderNumber" type="text" placeholder="请输入存款订单号">
      </el-form-item>
      <el-form-item prop="time" label="存款时间">
        <el-date-picker
          size="mini"
          :style="InputStyle"
          v-model="form.time"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="mini" @click="handleDeposit()">立即存款</el-button>
      </el-form-item>
    </el-form>
    <warm-prompt :title="'温馨提示'">
      <template slot="base-query">
        <ul>
          <li>单笔储值最低 <span style="color: red"> CNY10 </span> 元，最高 <span style="color: red"> CNY1,000,000 </span> 元，并须视各家银行转款上限而定。</li>
          <li>请保留好转账单据作为核对证明。</li>
          <li>建议您使用UC浏览器、Firefox或Google Chrome等浏览器浏览。</li>
          <li>存款后未到账等情况，请前往自助催账进行催账申诉。</li>
          <li>如出现存款失败, 请联系在线客服获取帮助。<a href="javascript: void (0);" style="color: #409eff;font-size: 14px">联系线上客服</a></li>
        </ul>
      </template>
    </warm-prompt>
  </div>
</template>

<script>
import WarmPrompt from '@/views/memberCenter/wedgit/WarmPrompt'
import {PATH_DEPOSITOFFER_PAY} from '@/service/member/member_center.url'
import { mapState } from 'vuex'

export default {
  name: 'deposit_info_form',
  components: {
    WarmPrompt
  },
  props: {
    currentBank: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      accept: 'accept',
      form: {
        amount: '',
        thirdAccount: '',
        nickName: '',
        orderNumber: '',
        time: '',
        offerAmount: 0
      },
      radio: '',
      InputStyle: 'width:193px;height:24px;',
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  computed: {
    ...mapState({
      memberInfo: 'baseInfo'
    })
  },
  methods: {
    handleDeposit () {
      this.$emit('deposit', this.form)
    },
    getOffer () {
      // console.log(this.currentBank)
      if (this.form.amount && Object.keys(this.currentBank).length) {
        const payload = {
          amount: this.form.amount,
          isOnline: parseInt(this.currentBank.onOrOffFlag)
        }
        this.get(PATH_DEPOSITOFFER_PAY, payload).then(res => {
          this.form.offerAmount = res.data.discountAmount * 10 / 10
        }, err => {
          this.$message.error(err)
        })
      } else {
        this.form.offerAmount = 0
      }
    },
    handleAccept () {
      if (Object.keys(this.currentBank).length) {
        this.getOffer()
      } else {
        this.$message({
          type: 'warning',
          message: '请选择银行来获取对应的优惠金额'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.submitForm{
  display: flex;
  justify-content: space-evenly;
  .el-form{
    width: 480px;
    margin-top: 27px;
    .el-form-item{
      margin-bottom: 0px;
      .input{
        margin-top: 9px;
        float: left;
        display: flex;
        height: 24px;
        .addon{
          line-height: 24px;
          font-family: "Microsoft YaHei";
          background-color: #999;
          color: #fff;
          display: inline-block;
          padding: 0 5px;
        }
      }
    }
    i,span{
      display: inline-block;
    }
    i{
      color: #4DC033;
      font-size: 25px;
      margin: 0 15px;
      vertical-align: middle;
    }
    span{
      font-size: 16px;
      vertical-align: middle;
    }
  }
  .reminder{
    padding: 20px 30px;
    border: 1px solid #C2C2C2;
    border-radius: 5px;
    width: 550px;
    height: 180px;
    transform: translateX(20px);
    .reminderTitle{
      font-size: 18px;
      font-weight: 700;
      font-family: "Microsoft YaHei";
      margin-bottom: 10px;
    }
    ul{
      list-style-type: unset;
      li{
        font-size: 18px;
        line-height: 18px;
        margin-bottom: 10px;
        .valPoint{
          color: red;
        }
      }
      li a,li span{
        font-size: 18px;
        line-height: 18px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
