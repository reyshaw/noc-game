<template>
  <div>
    <el-tabs type="card" @tab-click="onTabClick" class="bgf">
      <el-tab-pane :label="tab.label" v-for="(tab, index) in depoList" :key="index"></el-tab-pane>
    </el-tabs>
    <div class="desc">
      {{currentText}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DepositTutorial',
  data () {
    return {
      currentText: '',
      depoList: [
        {value: 0, label: '在线支付'},
        {value: 1, label: '转账支付'},
        {value: 2, label: '扫码支付'},
        {value: 3, label: '钱包支付'},
        {value: 4, label: '点卡支付'}
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  div {
    .desc {
      box-sizing: border-box;
      padding: 0 20px;
    }
  }
</style>
