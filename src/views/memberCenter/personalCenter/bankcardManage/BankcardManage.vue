<template>
  <div class="BKContent">
    <div class="total">已添加 <span>{{this.bankCardList.length}}</span> 张银行卡</div>
    <div class="bankCards">
      <bank-card
        v-for="(item, index) in bankCardList"
        :key="index"
        :bankImg="'http://172.16.135.103/ui/gfx_frontend/banker/bank_bon1.png'"
        :bankName="item.payName"
        :bankAccount="item.cardNo"
        :setDefault="item.setDefault"
        @unbind="unbindCard(item.cardId)"
        @setDefaultCard="setDefaultCard(item.cardId)">
      </bank-card>
      <div class="addBankCard" @click="addBankCard()">
        <i class="el-icon-plus"></i>
        <span>添加银行卡</span>
      </div>
    </div>
    <el-dialog width="400px" :visible.sync="dialogTableVisible" >
      <add-new-bankcard @refreshCardList="refreshCardList" :samePeopleStatus="samePeopleStatus"></add-new-bankcard>
    </el-dialog>
  </div>
</template>

<script>
import AddNewBankcard from './children/AddNewBankcard'
import BankCard from './children/BankCard'
import {PATH_CARDLIST_PAY,
  PATH_BANKCARD_UNBINDCARDS,
  PATH_BANKCARD_CONFIG,
  PATH_BANKCARD_SETDEFAULT
} from '@/service/member/member_center.url.js'

export default {
  name: 'bankcard_manage',
  components: {
    BankCard,
    AddNewBankcard
  },
  mounted () {
    this.getConfig()
    this.getCardList()
  },
  data () {
    return {
      bankCardList: [],
      bankCardNum: 0,
      sameBankCardNum: 0,
      samePeopleStatus: 0,
      dialogTableVisible: false
    }
  },
  methods: {
    getConfig () { // 获取银行卡配置项
      this.post(PATH_BANKCARD_CONFIG).then(res => {
        this.bankCardNum = res.data[0].bankcardBindingQuantity // 最大银行卡总数
        this.sameBankCardNum = res.data[0].bankcardBindingSameQuantity // 相同银行最大银行卡总数
        this.samePeopleStatus = res.data[0].sameBankcardStatus // 是否可以同名
      }, err => {
        console.log(err)
      })
    },
    getCardList () {
      this.post(PATH_CARDLIST_PAY).then(res => {
        if (res) {
          this.bankCardList = res.data.list
        } else {
          this.bankCardList = []
        }
      }, err => {
        console.log(err)
      })
    },
    addBankCard () {
      if (this.bankCardList.length < this.bankCardNum) {
        this.dialogTableVisible = true
      } else {
        this.$message({
          type: 'warning',
          message: '绑定的银行卡数量超过上限'
        })
      }
    },
    refreshCardList () {
      this.dialogTableVisible = false
      this.getCardList()
    },
    unbindCard (cardId) {
      this.$confirm('确认解绑当前银行卡？', '确认解绑', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '放弃解绑'
      }).then(() => {
        this.post(PATH_BANKCARD_UNBINDCARDS, {cardId: cardId}).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '解绑成功'
            })
          } else {
            this.$alert('请联系客服接触绑定', '解绑失败', {
              confirmButtonText: '确定'
            })
          }
          this.getCardList()
        }, err => {
          console.log(err)
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: action === 'cancel'
            ? '未解绑'
            : '未解绑'
        })
      })
    },
    setDefaultCard (cardId) {
      let payload = {
        cardId,
        setDefault: 1
      }
      this.post(PATH_BANKCARD_SETDEFAULT, payload).then(res => {
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: '恭喜您设置默认银行卡成功'
          })
          this.getCardList()
        } else {
          this.$alert(res.msg, '设置失败', {
            confirmButtonText: '确定'
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
.BKContent{
  width: 1190px;
  min-height: 600px;
  padding: 20px 80px;
  border-radius: 10px;
  background-color: #ffffff;
  margin: 20px auto;
  .total{
    font-size: 18px;
    line-height: 25px;
    margin: 20px 0;
    color: #333333;
    font-family: "Microsoft YaHei";
    span{
      font-family: "Microsoft YaHei";
      font-size: 18px;
      line-height: 25px;
      color: red;
    }
  }
  .bankCards{
    display: flex;
    flex-wrap: wrap;
    .addBankCard{
      cursor: pointer;
      margin-bottom: 30px;
      width: 356px;
      padding: 10px;
      height: 200px;
      border-radius: 5px;
      background: #8393CA;
      text-align: center;
      i{
        display: block;
        font-size: 50px;
        margin-top: 50px;
        font-weight: bold;
        color: white;
      }
      span{
        line-height: 45px;
        font-size: 25px;
        color: white;
      }
    }
  }
}
</style>
