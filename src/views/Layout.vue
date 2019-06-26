<template>
  <div class="layoutWrapper">
    <noc-top></noc-top>
    <div class="content" :style="{top: !loginForm ? '128px' : '173px'}">
      <router-view />
    </div>
    <noc-bottom :style="{marginTop: !loginForm ? '-45px' : 0}"></noc-bottom>
  </div>
</template>

<script>
import NocTop from '@/components/noc_top/NocTop'
import NocBottom from '@/components/noc_bottom/NocBottom'
import {mapGetters} from 'vuex'
export default {
  name: 'layout',
  data () {
    return {
      loginForm: true // 是否显示登录栏，默认是
    }
  },
  created () {
    if (this.$route.name === 'register' || this.$route.name === 'login') { // 登录和注册两个页面不显示
      this.loginForm = false
    }
  },
  computed: mapGetters(['TAB_TITLE']),
  components: {
    NocTop,
    NocBottom
  },
  watch: {
    'TAB_TITLE': (val) => { // 点击侧边滚动到顶部
      // console.log(val)
    }
  },
  beforeRouteEnter (to, from, next) {
    // console.log(to)
    next()
  }
}
</script>

<style scoped lang="scss">
  .layoutWrapper {
    .content {
      position: relative;
      overflow: hidden;
      top: 173px;
    }
  }
</style>
