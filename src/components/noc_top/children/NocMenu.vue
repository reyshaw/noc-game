<template>
  <div class="wrapper">
    <div class="menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#f4cd20">
        <el-menu-item v-for="(item, index) in menu"
                      :key="index"
                      :index="index+''"
                      @click="jumpTo(item)">
          <a href="javascript:void(0);">{{item.label}}</a>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import types from '@/store/share.types'
import {mapGetters} from 'vuex'
import CONFIG from './nocMenu.config'
export default {
  name: 'noc_menu',
  data () {
    let _index = this.$store.state.role === 'member' ? '0' : '1'
    return {
      ...CONFIG,
      activeIndex: _index
    }
  },
  computed: {
    ...mapGetters(['ROLE']),
    menu: function () { return this.ROLE === 'member' ? this.member_menu : this.agent_menu }
  },
  created () { // preLink 和 link的需要单独处理 (暂未处理)
    let _routeName = this.$route.name
    let _index = this.menu.findIndex(ele => ele.value === _routeName)
    if (_index > -1) {
      this.activeIndex = _index + ''
    }
  },
  methods: {
    jumpTo (item) {
      console.log(item)
      if (item.type === 'link') {
        window.open(item.value)
      } else if (item.type === 'preLink') {
        if (this.$store.state.token) {
          window.open(item.value)
        } else {
          this.$message({
            type: 'warning',
            message: '请先登录'
          })
          this.$store.commit(types.SHOWLOGINDIA, true)
        }
      } else if (item.type === 'route') {
        this.$router.push({
          name: item.value
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.menu{
  .el-menu-demo{
    border: 0;
  }
  ul{
    li{
      &:hover{
        color: #f4cd20!important;
        background-color: transparent!important;
      }
      a{
        font-size: 15px;
        font-family: '微软雅黑';
      }
    }
  }
}
</style>
