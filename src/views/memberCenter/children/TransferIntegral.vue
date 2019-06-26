<template>
  <div class="transferPromoteForm">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item prop="promoteType" label="优惠额度：">
        <el-select v-model="form.promoteType" placeholder="请选择优惠额度" size="mini">
          <el-option label="04月05日返水优惠 | 5倍打码" value="1"></el-option>
          <el-option label="04月05日返水优惠 | 5倍打码" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="account" label="转入账户：">
        <el-select v-model="form.account" placeholder="请选择转入账户" size="mini">
          <el-option v-for="(item, index) in platformList" :key="index" :label="item.cnName" :value="item.id+','+item.code"></el-option>
        </el-select>
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
    platformName: {
      type: String,
      default: '游戏平台名称'
    }
  },
  data () {
    return {
      form: {
        promoteType: '',
        account: '',
        amount: ''
      },
      platformList: []
    }
  },
  mounted () {
    this.getPlatform()
  },
  methods: {
    getPlatform () {
      this.get(PATH_GAMEPLATFORM_PAY, {}).then(res => {
        this.platformList = res.data
        console.log(this.platformList)
      }, err => {
        console.log(err)
      })
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
