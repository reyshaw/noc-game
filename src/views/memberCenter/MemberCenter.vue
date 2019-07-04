<template>
  <div class="wrapper">
    <div class="content">
      <member-info v-if="ROLE==='member'"></member-info>
      <member-function :proute="proute"></member-function>
    </div>
  </div>
</template>

<script>
import MemberInfo from './children/MemberInfo'
import MemberFunction from './children/MemberFunction'
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
  beforeRouteUpdate (to, from, next) {
    // console.log(to.name)
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
    width: 1600px;
    background-color: #fff;
    margin: 50px auto;
    padding: 26px;
  }
}
</style>
