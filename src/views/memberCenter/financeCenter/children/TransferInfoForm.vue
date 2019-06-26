<template>
  <div class="submitForm">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item prop="account" label="存款账户">
        {{this.account}}
      </el-form-item>
      <el-form-item prop="amount" label="存款金额">
        <div class="input">
          <input v-model.trim.number="form.amount" type="text" placeholder="存款范围10.00~1000000.00">
          <div class="addon">.5</div>
        </div>
        <i class="el-icon-success"></i>
        <span>优惠￥4.23</span>
      </el-form-item>
      <el-form-item prop="grants" label="优惠赠款">
        <input type="radio" id="accept" name="grants" value="huey" checked>
        <label for="accept">接受</label>
        <input type="radio" id="refuse" name="grants" value="huey" checked>
        <label for="refuse">拒绝</label>
      </el-form-item>
      <el-form-item prop="person" label="存款人">
        <input v-model.trim.number="form.person" type="text" placeholder="请输入存款微信账号">
      </el-form-item>
      <el-form-item prop="bankName" label="存款银行">
        <input v-model.trim="form.bankName" type="text" placeholder="请输入存款微信昵称">
      </el-form-item>
      <el-form-item prop="time" label="存款时间">
        <el-date-picker
          size="mini"
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

export default {
  name: 'transfer_info_form',
  components: {
    WarmPrompt
  },
  props: {
  },
  data () {
    return {
      account: 'ogwistest001',
      form: {
        amount: '',
        person: '',
        bankName: '',
        time: ''
      },
      radio: '',
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
  methods: {
    handleDeposit () {
      this.$emit('deposit', this.form)
    }
  }
}
</script>

<style scoped lang="scss">
.submitForm{
  display: flex;
  justify-content: space-evenly;
  .el-form{
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
      font-family: "Microsoft YaHei";
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
