<template>
  <div class="bankCard">
    <div class="bankIndenty">
      <img :src="bankImg" alt="">
      <span class="">{{this.bankName}}</span>
      <el-checkbox :value="setDefaultValue" @change="setDefaultOption()">首 选</el-checkbox>
    </div>
    <div class="bankAccount">{{formatBackAccount(this.bankAccount)}}</div>
    <a class="unbind" href="javascirpt: void(0)" @click="handleUnbind">解绑</a>
  </div>
</template>

<script>
export default {
  name: 'bank_card',
  props: {
    bankImg: {
      type: String,
      default: ''
    },
    bankName: {
      type: String,
      default: ''
    },
    bankAccount: {
      type: String,
      default: ''
    },
    setDefault: {
      type: Number,
      default: 0
    }
  },
  computed: {
    setDefaultValue () {
      return !!this.setDefault
    }
  },
  data () {
    return {
    }
  },
  methods: {
    formatBackAccount (backAccount) {
      return backAccount.substr(0, 4) + '**** ****' + backAccount.substr(15, 4)
    },
    handleUnbind () {
      this.$emit('unbind')
    },
    setDefaultOption () {
      if (this.setDefault !== 1) {
        this.$emit('setDefaultCard')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bankCard{
  margin-right: 30px;
  margin-bottom: 30px;
  position:relative;
  width: 355px;
  height: 205px;
  padding: 10px;
  border-radius: 5px;
  background: url("http://172.16.135.103/ui/gfx_frontend/banker/bank_credit_card_bg.png") center center no-repeat;
  .bankIndenty{
    line-height: 48px;
    font-family: "Microsoft YaHei";
    img{
      display: inline-block;
      vertical-align: middle;
      width: 50px;
      height: 50px;
    }
    span{
      font-family: "Microsoft YaHei";
      font-size: 18px;
    }
    .el-checkbox{
      display: inline-block;
      float: right;
      margin-right: 20px;
    }
  }
  .bankAccount{
    font-size: 35px;
    text-align: center;
    line-height: 50px;
    color: white;
    margin-top: 20px;
  }
  .unbind{
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
.bankCard:nth-child(3n){
  margin-right: 0;
}
</style>
