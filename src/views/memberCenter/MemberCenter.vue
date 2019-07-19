<template>
  <div class="wrapper">
    <div class="content">
      <div>
        <member-info v-if="ROLE==='member'"></member-info>
        <member-function :proute="proute"></member-function>
      </div>
    </div>
  </div>
</template>

<script>
import MemberInfo from './children/MemberInfo'
import MemberFunction from './children/MemberFunction'
import store from '@/store'
import {mapGetters} from 'vuex'
export default {
  name: 'member_center',
  components: {
    MemberInfo,
    MemberFunction
  },
  data () {
    return {
      proute: ''
    }
  },
  computed: mapGetters(['ROLE']),
  beforeRouteEnter (to, from, next) { // 没有登录不让进
    if (!store.state.token) {
      next(`/${store.state.role}/index`)
    } else {
      next()
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.proute = to.name
    next()
  }
}
</script>

<style scoped lang="scss">
.wrapper{
  font-size: 14px;
  background-color: #0A1725;
  overflow: hidden;
  .content{
    max-width: 1200px;
    min-width: 960px;
    background-color: #fff;
    margin: 50px auto;
    padding: 20px / 16px * 1rem 0px;
    >div {
      margin: 0px 20px / 16px * 1rem;
    }
  }
}
</style>
