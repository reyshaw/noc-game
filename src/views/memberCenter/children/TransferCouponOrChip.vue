<template>
  <div class="transferPromoteForm">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item prop="account" label="转入账户：">
        <el-select v-model="form.account" placeholder="请选择转入账户" size="mini">
          <el-option v-for="(item, index) in platformList" :key="index" :label="item.cnName" :value="item.id+','+item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="account" label="使用额度：">
        <span>12元</span>
      </el-form-item>
      <el-form-item prop="amount" label="温馨提示：">
        <span>使用该优惠券需要满足12的有效投注额度</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { PATH_GAMEPLATFORM_PAY } from '@/service/member/member_center.url'
export default {
  name: 'transfer_coupen_or_chip',
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
