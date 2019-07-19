<template>
  <div class="copyright-wrapper">
    <h2>© 2019 东方游戏, All Rights Reserved.</h2>
  </div>
</template>

<script>
export default {
  name: 'NocCopyright'
}
</script>

<style scoped lang="scss">
.copyright-wrapper {
  width: 100%;
  height: 55px;
  background: url("../../../assets/imgs/icons/copyright.jpg") repeat-x;
  h2 {
    line-height: 55px;
    font-family: "微软雅黑";
    text-align: center;
    background-color: #111111;
    font-size: 14px;
    font-weight: bold;
    color: #EEE480;
  }
}
</style>
