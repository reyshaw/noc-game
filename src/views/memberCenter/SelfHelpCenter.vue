<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'selfHelp_center',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper{
  font-size: 14px;
  background-color: #0A1725;
  .content{
    width: 1600px;
    background-color: #fff;
    margin: 50px auto;
    padding: 26px;
  }
}
</style>
