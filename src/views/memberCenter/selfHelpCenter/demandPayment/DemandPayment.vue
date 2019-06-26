<template>
  <div class="demand-content">
    <el-tabs type="card">
      <el-tab-pane label="催账申请">
        <apply></apply>
      </el-tab-pane>
      <el-tab-pane label="催账记录">
        <records></records>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Records from './children/Records'
import Apply from './children/Apply'

export default {
  name: 'demand_payment',
  components: {
    Records,
    Apply
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
