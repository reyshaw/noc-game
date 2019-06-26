<template>
  <div class="MCcontainer">
    <el-tabs type="card"  v-model="activeName">
      <el-tab-pane name='member' label="成员管理">
        <manage-member v-if="activeName==='member'"></manage-member>
      </el-tab-pane>
      <!--第二个tab-->
      <el-tab-pane name='sub' label="下线管理">
        <manage-sub v-if="activeName==='sub'"></manage-sub>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ManageMember from './Management_Member'
import ManageSub from './Management_Sub'
// import store from '@/store/share.store'
export default {
  name: 'Management',
  components: {
    ManageMember,
    ManageSub
  },
  data () {
    return {
      activeName: 'member' // 当前激活的tab
    }
  },
  beforeRouteEnter (to, from, next) {
    // store.commit('SET_PERSONAL_CENTER_MENU_NAME', '团队管理')
    next()
  }
}
</script>

<style scoped lang="scss">
 .wrapper {
   width: 96%;
   margin: 0 auto;
   background: #fff;
   border: 1px solid #cbd1e3;
   border-radius: 5px;
 }
</style>
