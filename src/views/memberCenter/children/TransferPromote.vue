<template>
  <div class="transferPromoteForm">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item prop="promoteType" :label="label1" v-if="diaType !== 1 && diaType !== 7">
        <el-select v-model="form.promoteType" placeholder="请选择优惠额度" size="mini" @change="handleChange">
          <el-option v-for="(item, index) in codeList" :key="index" :label="item.multiples+'倍打码'" :value="item.multiples"></el-option>
        </el-select>
        <div style="position: absolute; top: 30px;">
          {{amount|formatMoney}}元 <i class="el-icon-refresh" @click="refresh" style="cursor: pointer"></i>
        </div>
      </el-form-item>
      <el-form-item label="现金额度：" v-if="diaType === 1">
        {{amount|formatMoney}}元 <i class="el-icon-refresh" @click="refresh" style="cursor: pointer"></i>
      </el-form-item>
      <el-form-item label="积分额度：" v-if="diaType === 7">
        {{amount|formatMoney}}元 <i class="el-icon-refresh" @click="refresh" style="cursor: pointer"></i>
      </el-form-item>
      <el-form-item prop="account" label="转入账户：">
        <el-select v-model="form.account" placeholder="请选择转入账户" size="mini">
          <el-option v-for="(item, index) in platformList" :key="index" :label="item.cnName" :value="item.id+','+item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="account" label="快速兑换：" v-if="diaType === 7">
        <el-button size="mini" v-for="(item, index) in fastCharge" :key="index" @click="$emit('fastChose', item)">{{item}}</el-button>
      </el-form-item>
      <el-form-item prop="amount" label="转入额度：">
        <el-input v-model="form.amount" placeholder="请输入转入账户" size="mini" style="width: 195px"></el-input>
        <span class="addon">元</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { PATH_GAMEPLATFORM_PAY } from '@/service/member/member_center.url'
export default {
  name: 'transfer_promote',
  props: {
    codeList: {
      type: Array,
      default: function () {
        return []
      }
    },
    form: {
      type: Object,
      default: function () {
        return {}
      }
    },
    diaType: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      platformList: [],
      amount: 0,
      label1: '优惠额度：',
      fastCharge: [10, 50, 100, 200]
    }
  },
  watch: {
    codeList: function (newVal, val) {
      if (this.diaType !== 1 && this.diaType !== 7) {
        this.amount = newVal.filter(obj => obj.multiples === this.form.promoteType)[0].amount
      } else {
        this.amount = newVal[0].amount
      }
    },
    diaType: function (newVal, val) {
      switch (newVal) {
        case 4:
          this.label1 = '红包额度：'
          break
        case 1:
          this.label1 = '现金额度：'
          break
        default:
          break
      }
    }
  },
  mounted () {
    this.getPlatform()
    this.amount = this.codeList[0].amount
  },
  methods: {
    getPlatform () { // 获取平台
      this.get(PATH_GAMEPLATFORM_PAY, {}).then(res => {
        this.platformList = res.data
        // console.log(this.platformList)
      }, err => {
        this.$message.error(err)
      })
    },
    handleChange (val) { // 换打码备注显示不同的余额
      this.amount = this.codeList.filter(obj => obj.multiples === val)[0].amount
    },
    refresh () {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped lang="scss">
.el-form{
  .el-form-item{
    position: relative;
    .addon{
      position: absolute;
      top: 0;
      right: 85px;
    }
  }
}
</style>
