<template>
  <div class="BTContent">
    <div class="button">
      <el-button class="recycle" size="small" @click="handleRecovery" v-loading="recoveryLoading"><i class="iconfont iconhuishou"></i>一键回收</el-button>
      <el-button class="toggle" size="small" @click="handleExchange">{{this.showAuto ? '切换至手动换额' : '切换至自动换额'}}</el-button>
    </div>
    <auto-transfer v-if="showAuto"></auto-transfer>
    <manual-transfer v-if="!showAuto"></manual-transfer>
  </div>
</template>

<script>
import AutoTransfer from './children/AutoTransfer'
import ManualTransfer from './children/ManualTransfer'
import { PATH_RECOVERY_PAY } from '@/service/member/member_center.url'

export default {
  name: 'balance_transfer',
  components: {
    AutoTransfer,
    ManualTransfer
  },
  data () {
    return {
      showAuto: false,
      recoveryLoading: false
    }
  },
  methods: {
    handleRecovery () { // 一键回收
      // console.log(1)
      this.$notify.success({
        title: '获取数据',
        message: '目前正在回收余额请勿频繁操作'
      })
      this.recoveryLoading = true
      this.get(PATH_RECOVERY_PAY, {}).then(res => {
        this.recoveryLoading = false
        if (res.status) {
          this.$message({
            type: 'success',
            message: '恭喜您回收成功'
          })
        } else {
          this.$message({
            type: 'success',
            message: res.msg
          })
        }
      }, err => {
        this.recoveryLoading = false
        this.$message.error(err)
        this.$notify.success({
          title: '回收失败',
          message: '部分平台正在维护，请移步手动回收'
        })
      })
    },
    handleExchange () { // 切换页面
      this.showAuto = !this.showAuto
    }
  }
}
</script>

<style scoped lang="scss">
.BTContent{
  .button{
    margin-top: 10px;
    text-align: right;
    button{
      line-height: 12px;
    }
    .recycle{
      .iconhuishou{
        padding-right: 5px;
        vertical-align: middle;
      }
    }
    .toggle{
      margin-right: 40px;
    }
  }
}
</style>
