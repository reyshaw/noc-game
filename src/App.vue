<template>
  <el-scrollbar
    :native="false"
    ref="scollElement"
    style="height: 100%;width: 100%">
    <div
      id="app"
      v-loading.fullscreen.lock="LOADING"
      element-loading-text="已经在拼命加载了"
      element-loading-spinner="el-icon-loading"
      element-loading-customClass="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      >
      <router-view/>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'App',
  computed: mapGetters(['LOADING', 'TOKEN', 'CONFIG']),
  async created () { // 刷新一定经过这里
    if (this.TOKEN) {
      this.SET_POLLING(true) // 刷新调用轮询接口
    }
  },
  updated () { // 切换不同模块时触发
    this.$nextTick(() => {
      if (this.$refs.scollElement) { // 滚动元素跳转到顶部
        this.$refs.scollElement.wrap.scrollTop = 0
      }
    })
  },
  methods: mapActions(['SET_POLLING'])
}
</script>

<style lang="scss">
#app {
  .loading{
    color: white;
  }
}

</style>
