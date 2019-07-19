<template>
  <div class="main member_main">
    <el-row>
      <el-col :span="2">
        <div v-for="(item, index) in sideMenu" :key="index">
          <div class="card">{{item.submenu}}</div>
          <div class="card">
            <ul>
              <li v-for="(i, ind) in item.botmenu" :key="ind">
                <a :class="{active: i.route === route}"
                   href="javascript:void(0);"
                   @click="jumpTo(i.route, i.title)">{{i.title}}</a>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="22">
        <div class="card contentTitle">
          <i class="el-icon-tickets menuIcon"></i>
          <span class="menuTitle">{{TAB_TITLE}}</span>
        </div>
        <div class="operateInterface">
          <router-view />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
import MENU from './memberfunction.config'
export default {
  name: 'member_function',
  data () {
    const _menu = this.$store.state.role === 'member' ? MENU.member : MENU.agent
    const _route = this.$route.name
    return {
      sideMenu: _menu,
      route: _route,
      superRoute: this.proute
    }
  },
  props: ['proute'],
  computed: mapGetters(['TAB_TITLE', 'ROLE']),
  methods: {
    ...mapMutations(['SET_TAB_TITLE']),
    jumpTo (route, title) {
      this.route = route
      this.SET_TAB_TITLE(title)
      this.$router.push({
        name: route
      })
    }
  },
  updated () {
    this.superRoute = this.proute
    this.route = this.superRoute
  }
}
</script>
<style scoped lang="scss">
.main{
  // margin-left: 5.5px;
  margin-top: 10px;
  .el-row {
    display: flex;
    // align-items: stretch;
  }
  .el-col-2{
    background-color: #DCE4FA;
    // padding-bottom: 1000px;
    // margin-bottom: -990px;
    >div {
      background: #ffffff;
      position: relative;
      .card {
        &::before {
          content: "";
          position: absolute;
          left: 0px;
          top: -10px;
          width: 100%;
          height: 10px;
          background: #ffffff;
        }
      }
    }
  }
  .el-col-22{
    // padding-bottom: 1000px;
    // margin-bottom: -990px;
    padding-bottom: 10px;
  }
  .operateInterface{
    background-color: #DCE4FA;
    margin-left: 10px;
    // margin-right: 5.5px;
    text-align: left!important;
    /*min-height: 64.3rem;*/
    // min-height: 750px;
    min-height: calc(100% - 60px);
    overflow: auto;
  }
  .contentTitle{
    margin-left: 10px;
    // margin-right: 5.5px;
    text-align: left!important;
    position: relative;
    padding-left: 10px;
    .menuTitle{
      font-size: 16px;
      margin-left: 27px;
    }
    .menuIcon{
      display: inline-block;
      font-size: 35px;
      position: absolute;
      left: 10px;
      top: 10px;
    }
  }
  .card{
    background-color: #DCE4FA;
    overflow: hidden;
    margin-bottom: 10px;
    font-size: 16px;
    text-align: center;
    font-weight: 700;
    &:not(.contentTitle) {
      padding: 20px 0px;
    }
    &.contentTitle {
      padding: 20px 20px;
    }
    ul{
      li{
        font-weight: 400;
        line-height: 3rem;
        text-align: center;
        a{
          font-size: 14px;
          color: #0A1725;
          &:hover{
            color: #eb844c;
          }
          &.active{
            font-weight: bold;
            border-left: 2px solid #2c3568;
            display: inline-block;
            width: 100%;
            height: 100%;
            background-color: #c4cee8;
          }
        }
      }
    }
  }
}

</style>
<style lang="scss">
  .main.member_main{
    .el-col-22{
      .el-tabs__content{
        padding: 10px 20px;
      }
    }
  }
</style>
