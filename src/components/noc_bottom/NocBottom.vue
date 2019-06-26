<template>
  <div class="bottomWrapper">
    <noc-brand-wall />
    <noc-about />
    <noc-copyright />
  </div>
</template>

<script>
import NocAbout from './children/NocAbout'
import NocBrandWall from './children/NocBrandWall'
import NocCopyright from './children/NocCopyright'
export default {
  name: 'noc_bottom',
  components: {
    NocAbout,
    NocBrandWall,
    NocCopyright
  }
}
</script>

<style lang="scss" scoped>
  /*.bottomWrapper{
    min-width: 1650px;
    .copyRight{
      text-align: center;
      line-height: 50px;
      background-color: #111111;
      color: #ffffff;
      font-size: 14px;
      font-weight: bold;
      color: #EEE480;
    }
  } */
</style>
