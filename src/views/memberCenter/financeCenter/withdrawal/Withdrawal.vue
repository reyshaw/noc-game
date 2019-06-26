<template>
  <div class="WDContent">
    <el-tabs type="card">
      <div class="container">
        <step :stepNumber="1" :titleContent="titleContent1">
          <div class="submitForm">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="可取余额">
                {{this.drawableBalance}}
              </el-form-item>
              <el-form-item label="取款银行">
                <el-select v-model="form.bankCard" placeholder="请选择取款银行卡" size="mini" :style="inputStyle">
                  <el-option
                    v-for="item in options.backCardList"
                    :key="item.cardId"
                    :label="item.payName + ' ' + item.cardNo"
                    :value="item.cardId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="取款金额">
                <el-input v-model.number="form.withdrawalAmount" placeholder="请输入取款金额" size="mini" :style="inputStyle"></el-input>
              </el-form-item>
              <el-form-item label="取款密码">
                <el-input v-model="form.withdrawPassword" placeholder="请输入取款密码" size="mini" :style="inputStyle"></el-input>
                <a href="javascript: void(0);">忘记密码？</a>
                <a href="javascript: void(0);">设置取款密码</a>
              </el-form-item>
              <el-form-item>
                <el-button type="success" size="small" @click="handleWithdraw">立即取款</el-button>
              </el-form-item>
            </el-form>
            <warm-prompt :title="'温馨提示'">
              <template slot="base-query">
                <ul>
                  <li>提款前，您必须至少完成100%存款额的投注！</li>
                  <li>最低提款：RMB 1.00。</li>
                  <li>服务费用：免费。</li>
                  <li>处理时间：3-10分钟。</li>
                  <li>相关部门审阅并核实后，系统会把取款资金从您的游戏账户转账到您指定的银行账户！</li>
                  <li>如出现存款失败, 请联系在线客服获取帮助。<a href="javascript: void (0);" style="color: #409eff;font-size: 14px"> 联系线上客服</a></li>
                </ul>
              </template>
            </warm-prompt>
          </div>
        </step>
      </div>
    </el-tabs>
  </div>
</template>

<script>
import Step from '../children/Step'
import { PATH_CARDLIST_PAY, PATH_WITHDRAW_PAY, PATH_WALLATBALANCE_PAY } from '@/service/member/member_center.url'
import WarmPrompt from '@/views/memberCenter/wedgit/WarmPrompt'
import { mapState } from 'vuex'

export default {
  name: 'withdrawal',
  components: {
    Step,
    WarmPrompt
  },
  data () {
    return {
      drawableBalance: '0.00',
      titleContent1: '请填写取款金额',
      inputStyle: 'width: 260px;',
      form: {
        bankCard: '',
        withdrawalAmount: '',
        withdrawPassword: ''
      },
      options: {
        backCardList: []
      }
    }
  },
  computed: {
    ...mapState(['memberInfo'])
  },
  mounted () {
    this.getBankList()
    this.getBalance()
  },
  methods: {
    getBalance () { // 获取可用余额
      this.post(PATH_WALLATBALANCE_PAY, {}).then(res => {
        this.drawableBalance = parseFloat(res.data.amount).toFixed(2)
      }, err => {
        console.log(err)
      })
    },
    getBankList () { // 获取银行卡列表
      this.post(PATH_CARDLIST_PAY).then(res => {
        if (res) {
          this.options.backCardList = res.data.list
          this.options.backCardList.map(obj => {
            if (obj.setDefault === 1) {
              this.form.bankCard = obj.cardId
            }
          })
        } else {
          this.$alert('您未没绑定取款银卡信息，请绑定后进行尝试', '暂时无法提款', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push({
                name: 'bankcardManage'
              })
            }
          })
        }
      }, err => {
        console.log(err)
      })
    },
    handleWithdraw () {
      if (this.form.bankCard) {
        if (this.form.withdrawalAmount) {
          if (this.form.withdrawPassword) {
            let bankCode = ''
            let bankName = ''
            this.options.backCardList.map(obj => {
              console.log(obj.cardId === this.form.bankCard)
              if (obj.cardId === this.form.bankCard) {
                bankCode = obj.cardNo
                bankName = obj.payName
              }
            })
            let payload = {
              bankCode,
              bankName,
              cardName: this.memberInfo.memberRealName,
              money: this.form.withdrawalAmount,
              withdrawPassword: this.form.withdrawPassword
            }
            this.post(PATH_WITHDRAW_PAY, payload).then(res => {
              if (res) {
                this.$message({
                  type: 'success',
                  message: '恭喜您取款申请已发起，请稍后注意查询您的账户！'
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
          } else {
            this.$message('请输入取款密码')
          }
        } else {
          this.$message('请输入金额')
        }
      } else {
        this.$message('请选择可用的银行卡')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  margin: 0 auto;
  width: 1350px;
  height: auto;
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  .submitForm{
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
