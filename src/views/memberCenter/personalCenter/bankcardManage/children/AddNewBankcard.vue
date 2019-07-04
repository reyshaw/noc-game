<template>
  <div class="transferPromoteForm">
    <div class="title">绑定银行卡</div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item prop="memberRealName" label="持卡人姓名：">
        <el-input v-model="form.cardName" size="mini" style="width: 195px" placeholder="请输入持卡人姓名" :disabled="!!samePeopleStatus"></el-input>
      </el-form-item>
      <el-form-item prop="account" label="发卡银行：">
<!--        <el-select v-model="form.account" placeholder="请绑定银行卡号" size="mini">-->
<!--          <el-option v-for="(item, index) in bankList" :key="index" :label="item.cnName" :value="item.id"></el-option>-->
<!--        </el-select>-->
        <el-input v-model="form.payName" size="mini" style="width: 195px" placeholder="请输入发卡银行"></el-input>
      </el-form-item>
      <el-form-item prop="bankCardNum" label="银行卡号：">
        <el-input v-model="form.cardNo" placeholder="请输入银行卡号" size="mini" style="width: 195px"></el-input>
      </el-form-item>
      <el-form-item prop="openingBranch" label="开户支行：">
        <el-input v-model="form.bankBranchName" placeholder="请输入开户网点或支行名称" size="mini" style="width: 195px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleBind">立即绑定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { PATH_BANKCARD_ADDCARDS } from '@/service/member/member_center.url'
import { mapGetters } from 'vuex'
export default {
  name: 'add_new_bankcard',
  props: {
    samePeopleStatus: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      form: {
        cardName: '',
        payName: '',
        cardNo: '',
        bankBranchName: ''
      }
    }
  },
  computed: {
    ...mapGetters(['BASE_INFO'])
  },
  mounted () {
    // console.log(111, this.BASE_INFO)
    this.form.cardName = this.BASE_INFO.memberRealName
  },
  methods: {
    handleBind () {
      let { payName, cardNo, bankBranchName, cardName } = this.form
      let payload = {
        payName,
        cardNo,
        cardName,
        bankBranchName
      }
      this.post(PATH_BANKCARD_ADDCARDS, payload).then(res => {
        if (res.status) {
          this.$message({
            type: 'success',
            message: '恭喜您添加成功'
          })
          this.$emit('refreshCardList')
        } else {
          this.$alert(res.msg, '添加失败', {
            confirmButtonText: '确定'
          })
        }
      }, err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.transferPromoteForm{
  .title{
    font-size: 18px;
    margin: 20px 15px;
  }
  .el-form{
    .el-form-item{
    }
  }
}
</style>
