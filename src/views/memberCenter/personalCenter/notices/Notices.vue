<template>
  <div class="MCcontainer">
    <el-tabs type="card" @tab-click="onTabClick">
      <el-tab-pane label="系统消息">
        <notice v-if="currentNotice === '0'" type="0"></notice>
      </el-tab-pane>
      <el-tab-pane label="系统公告">
        <notice v-if="currentNotice === '1'" type="1"></notice>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Notice from './comp/Notices'
export default {
  name: 'deposit',
  components: {
    Notice
  },
  data () {
    return {
      currentNotice: '0' // 当前的tab
    }
  },
  methods: {
    onTabClick (evt) {
      this.currentNotice = evt.index
    }
  }
}
</script>

<style scoped>

</style>
