<template>
  <div>
    <el-tabs type="card" @tab-click="onTabClick" class="bgf">
      <el-tab-pane :label="tab.label" v-for="(tab, index) in quesList" :key="index"></el-tab-pane>
    </el-tabs>
    <div class="desc">
      {{currentText}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Questions',
  data () {
    return {
      currentText: '',
      quesList: [
        {value: 0, label: '注册与登录'},
        {value: 1, label: '真实姓名'},
        {value: 2, label: '银行卡绑定'},
        {value: 3, label: '找回用户名'},
        {value: 4, label: '找回登录密码'},
        {value: 5, label: '优惠活动'},
        {value: 6, label: '技术相关'}
      ]
    }
  },
  created () {
    this.onTabClick({index: 0})
  },
  methods: {
    onTabClick (evt) {
      this.currentText = this.quesList[evt.index].label
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
