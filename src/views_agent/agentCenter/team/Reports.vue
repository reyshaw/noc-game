<template>
  <div class="MCcontainer">
    <el-tabs type="card"  v-model="activeName">
      <el-tab-pane name='team' label="团队报表">
        <team v-if="activeName==='team'"></team>
      </el-tab-pane>
      <!--第二个tab-->
      <el-tab-pane name='member' label="成员报表">
        <member v-if="activeName==='member'"></member>
      </el-tab-pane>
      <el-tab-pane name='deposit_claim' label="存取记录">
        <deposit-claim v-if="activeName==='deposit_claim'"></deposit-claim>
      </el-tab-pane>
      <el-tab-pane name='settlement' label="结算记录">
        <settlement v-if="activeName==='settlement'"></settlement>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Team from './Reports_Team'
import Member from './Reports_Member'
import DepositClaim from './Reports_DepositClaim'
import Settlement from './Reports_Settlement'
export default {
  name: 'Reports',
  components: {
    Team,
    Member,
    DepositClaim,
    Settlement
  },
  data () {
    return {
      activeName: 'team' // 当前激活的tab
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .wrapper {
    width: 96%;
    margin: 0 auto;
    background: #fff;
  }
</style>
