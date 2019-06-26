<template>
  <div class="platformTransfer" ref="platformTransfer">
    <div class="logo"><img src="http://www.wzsky.net/img2016/uploadimg/20161019/1032510.jpg" alt=""></div>
    <div class="container">
      <div class="platformName">{{this.platformName}}</div>
      <div class="amount">
        <span>{{this.amount}}</span>
        <span class="status">{{this.status ? this.status+'...' : ''}}</span>
      </div>
      <i class="iconfont icongengxin1"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'auto_platform',
  props: {
    platformName: {
      type: String,
      default: '游戏平台名称'
    },
    amount: {
      type: String,
      default: '0.00'
    },
    status: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.platformTransfer{
  margin-right: 30px;
  margin-bottom: 30px;
  width: 260px;
  border-radius: 10px;
  padding: 15px;
  border: 1px  solid #333333;
  display: flex;
  .logo{
    width: 80px;
    height: 80px;
    margin-right: 30px;
    img{
      width: 80px;
      height: 80px;
      border-radius: 40px;
      background-color: #eb844c;
    }
  }
  .container {
    position: relative;
    margin-top: 6px;
    span, div {
      line-height: 34px;
      font-size: 14px;
    }
    .amount{
      .status{
        position: absolute;
        right: -70px;
        bottom: -17px;
        color: red;
      }
    }
    .icongengxin1 {
      cursor: pointer;
      font-size: 28px;
      position: absolute;
      right: -70px;
      top: -10px;
    }
  }
}
</style>
