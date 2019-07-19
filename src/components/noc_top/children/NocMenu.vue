<template>
  <div class="noc-menu">
    <div class="menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="transparent"
        text-color="#e1e0e0"
        active-text-color="#f4cd20">
        <el-menu-item v-for="(item, index) in menu"
                      :key="index"
                      :index="index+''"
                      @click="jumpTo(item)">
          <a href="javascript:void(0);" @mouseenter="showSubmenu(0, index,item.code)" @mouseleave="hidden=true">{{item.label}}</a>
        </el-menu-item>
      </el-menu>
      <div class="subMenu" :class="{hidden:hidden}" @mouseenter="hidden=false" @mouseleave="hidden=true">
        <ul>
          <li v-for="(item, index) in submenu" :key="index" v-pointer>
<!--            <div class="img" :style="'background: http://172.16.135.103/ui/gfx_frontend/business-logo/\' + item.code + \'-logo.png'"></div>-->
            <img :src="'http://172.16.135.103/ui/gfx_frontend/business-logo/' + item.code + '-logo.png'" alt="logo">
            <span>{{item.cnName}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {PATH_LOBBYYRL_GAME} from '@/service/member/urls.js'
import gameMix from '@/mixins/game.mix'
import {mapGetters, mapMutations} from 'vuex'
import CONFIG from './nocMenu.config'
export default {
  name: 'noc_menu',
  mixins: [gameMix],
  data () {
    let _index = this.$store.state.role === 'member' ? '0' : '1'
    return {
      ...CONFIG,
      activeIndex: _index,
      ind: undefined,
      submenu: []
    }
  },
  computed: {
    ...mapGetters('member', ['GAME_CATEGORIES']),
    ...mapGetters(['ROLE', 'SUPER_IDS']),
    menu: function () { return this.ROLE === 'member' ? this.member_menu : this.agent_menu }
  },
  created () { // preLink 和 link的需要单独处理 (暂未处理)
    let _routeName = this.$route.name
    let _index = this.menu.findIndex(ele => ele.value === _routeName)
    if (_index > -1) {
      this.activeIndex = _index + ''
    }
  },
  mounted () {
    this.fetchProviders()
  },
  methods: {
    ...mapMutations('member', ['SET_LOGIN_DIALOG']),
    fetchProviders () {
      const a = this.GAME_CATEGORIES.map(obj => obj.categoryCode)
      a.map(obj => {
        let payload = {
          category: obj,
          merchantId: this.SUPER_IDS.merchantId,
          shareholderId: this.SUPER_IDS.shareholderId,
          terminalType: '1'
        }
        this.post(PATH_LOBBYYRL_GAME, payload).then(res => {
          this.submenuList[obj] = res.data
        }, err => {
          console.log(err)
        })
      })
      console.log(this.submenuList)
    },
    showSubmenu (c, i, code) {
      if (i) {
        this.ind = i
      }
      if (this.ind > 3 && this.ind < 11) {
        this.submenu = this.submenuList[code]
        this.hidden = !!c
      }
    },
    jumpTo (item) {
      // console.log(item)
      if (item.type === 'link') {
        window.open(item.value)
      } else if (item.type === 'preLink') {
        this.enterGame(item.value.gameId, item.value.providerId)
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
.noc-menu{
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
          font-size: 14px;
          // text-shadow: 1px 1px 0px #212121;
          display: inline-block;
          width: 100%;
          height: 78px;
        }
      }
    }
  }
  .subMenu{
    transition: .2s ease-in-out;
    transform-origin:top center;
    width: 100vw;
    height: 128px;
    background: rgba(0,0,0,.9);
    position: absolute;
    z-index: 2;
    top: 128px;
    left: 0;
    ul{
      margin: 0 auto;
      display: flex;
      justify-content: center;
      li{
        width: 133px;
        margin-top: 15px;
        text-align: center;
        img{
          width: 100px;
        }
        span{
          display: block;
          line-height: 18px;
          margin-top: -20px;
          font-size: 18px;
          /*font-weight: bold;*/
        }
      }
    }
  }
  .hidden{
    transition: .5s ease-in-out;
    transform: scale(1,0);
    transform-origin:top center;
  }
}
</style>
