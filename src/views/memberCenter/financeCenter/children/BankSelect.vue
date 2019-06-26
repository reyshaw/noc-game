<template>
  <div class="backSelect" @click="handleSelect($event)" ref="backSelect">
    <img :src="'http://172.16.135.103/ui/gfx_frontend/banker/bank_'+bankCode.toLowerCase()+'.png'" :alt="bankCode">
    <span style="font-size: 16px">{{this.payName}}</span>
  </div>
</template>

<script>
export default {
  name: 'bank_select',
  props: {
    bankCode: {
      type: String,
      default: ''
    },
    payName: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'bank'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleSelect (e) {
      this.$refs.backSelect.children[0].checked = true
      this.$emit('select')
    }
  }
}
</script>

<style scoped lang="scss">
.backSelect{
  float: left;
  border: 1px solid #C2C2C2;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 5px;
  width: 177px;
  height: 38px;
  cursor: pointer;
  text-align: center;
  &.active{
    border-color: #4DC033;
  }
  input{
    display: inline-block;
    margin: 0 10px;
    margin-top: 13px;
  }
  img{
    width: 140px;
    height: 36px;
  }
  span{
    display: inline-block;
    width: 98px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
