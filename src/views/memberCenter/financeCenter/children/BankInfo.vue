<template>
  <div class="cardInfo">
    <div class="title">
      <img src="http://172.16.135.103/ui/gfx_frontend/banker/bank_hboc.png" alt="">
    </div>
    <ul>
      <li><span class="label">网银账号：</span><span class="content">{{this.bankCard}}</span><a href="javascript: void (0);">复制</a></li>
      <li><span class="label">银行名称：</span><span class="content">{{this.bankName}}</span><a href="javascript: void (0);">复制</a></li>
      <li><span class="label">开户支行：</span><span class="content">{{this.branchName}}</span><a href="javascript: void (0);">复制</a></li>
      <li><span class="label">附言编码：</span><span class="content">{{this.rmkCode}}</span><a href="javascript: void (0);">复制</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'bank_info',
  props: {
    bankCard: {
      type: String,
      default: '6227 0012 5321 0804 688'
    },
    bankCode: {
      type: String,
      default: ''
    },
    bankName: {
      type: String,
      default: '张天翼'
    },
    branchName: {
      type: String,
      default: '江苏南京秦淮河南岸支行'
    },
    rmkCode: {
      type: String,
      default: 'ERTCGY'
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
.cardInfo{
  width: 350px;
  border: 1px solid #CAD1E2;
  border-radius: 5px;
  .title{
    padding: 10px 20px;
    border-bottom: 1px solid #CAD1E2;
  }
  ul{
    padding: 20px;
    li{
      line-height: 25px;
      .content{
        display: inline-block;
        width: 190px
      }
    }
  }
}
</style>
