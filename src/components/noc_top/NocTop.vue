<template>
  <div class="topWrapper">
    <div class="content">
<!--      <div class="jump"  ></div>-->
      <div class="logo" @click="jumpTo('index')" >
<!--  <embed src="../../../static/flash/LogoAnime_4-1.swf" quality="high" type="application/x-shockwave-flash" width="200" height="100">-->
       <!-- <object @click="jumpTo('index')"
                type="application/x-shockwave-flash"
                data="~@/assets/media/logo.mp4"
                width="240" height="170"
                id="flash_logo"
                style="visibility: visible;position:absolute;top: -20px;z-index: 0">
          <param name="wmode" value="transparent">
          <param name="quality" value="high">
        </object>-->
        <video autoplay loop muted style="width: 240px; height: 127px;">
          <source src="~@/assets/media/logo.mp4" type="video/mp4"/>
          浏览器不支持 video 标签，建议升级浏览器。
          <source src="~@/assets/media/logo.mp4" type="video/webm"/>
          浏览器不支持 video 标签，建议升级浏览器。
        </video>
        <span class="subLogo" v-hidden>旗舰店</span>
      </div>
      <top-tooltips></top-tooltips>
      <div class="mainMenu" style="float: right">
        <noc-menu></noc-menu>
      </div>
    </div>
    <noc-tooltips></noc-tooltips>
    <el-dialog
      width="380px"
      :modal="false"
      ref="loginDialog"
      :visible.sync="showLoginDia"
      v-if='showLoginDia'>
      <i class="el-icon-close dialogCloese" @click="closeLoginDia"></i>
      <div class="dialogTitle"><span>{{dialogType === 'register' ? '快速注册' : '会员登录'}}</span></div>
      <fast-register v-if="dialogType === 'register'"></fast-register>
      <fast-login v-if="dialogType === 'login'" @changeLoginStyle="changeLoginStyle" @closeDialog="closeDialog"></fast-login>
      <code-login v-if="dialogType === 'qrCodeLogin'" @changeLoginStyle="changeLoginStyle" @closeDialog="closeDialog"></code-login>
    </el-dialog>
    <forget-password :dialogVisible = 'showForgetPwdDia' @update="update"></forget-password>
  </div>
</template>

<script>
import NocMenu from './children/NocMenu'
import NocTooltips from './children/NocTooltips'
import TopTooltips from './children/TopTooltips'
import FastRegister from './children/FastRegister'
import CodeLogin from './children/CodeLogin'
import FastLogin from './children/FastLogin'
import { setLocalStorage } from '@/assets/scripts/storage'
import ForgetPassword from '@/components/noc_top/children/ForgetPassword'
// import store from '@/store/share.store'
import {mapMutations} from 'vuex'
export default {
  name: 'noc_top',
  components: {
    NocMenu,
    TopTooltips,
    FastRegister,
    FastLogin,
    ForgetPassword,
    CodeLogin,
    NocTooltips
  },
  data () {
    return {
      dialogType: 'login',
      dialogVisible: false,
      showLoginDia: false,
      showForgetPwdDia: false
    }
  },
  methods: {
    ...mapMutations({
      showFPD: 'SHOWFORGETPWDDIA',
      showLD: 'SHOWLOGINDIA'
    }),
    update () {
      this.showFPD(false)
    },
    closeLoginDia () {
      this.showLD(false)
    },
    closeDialog () {
      this.dialogVisible = false
    },
    jumpTo (path) { // 路由跳转
      this.$router.push({
        name: path
      })
    },
    showLoginDialog () {
      this.dialogVisible = true
      this.dialogType = 'login'
    },
    changeLoginStyle (type) {
      this.dialogType = type
    },
    changeLanguage (ref, key) { // 语言变换
      // ref.target.parentElement.parentElement.parentElement.style.display = 'none'
      this.selectedLang = key
      this.$i18n.locale = this.selectedLang
      setLocalStorage('lang', this.selectedLang)
      location.reload()
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)// 在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.topWrapper{
  z-index: 999;
  width: 100%;
  min-width: 1650px;
  background: url("../../../src/assets/imgs/top_muen_bak.png");
  color: #ccc;
  font-style: normal;
  font-size: 12px;
  line-height: 50px;
  /* position: -webkit-sticky; !* Safari *!
  position: sticky; */
  position:fixed;
  top: 0;
  .content{
    position: relative;
    width: 1650px;
    margin: 0 auto;
    overflow: hidden;
    .jump{
      position: absolute;
      left: 31px;
      cursor: pointer;
      z-index: 2;
    }
    .logo{
      cursor: pointer;
      width: 300px;
      height: 128px;
      float: left;
      overflow: hidden;
      img{
        width: 137px;
        margin-top: 13px;
      }
      .subLogo{
        color: #d82329;
        font-family: '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
        font-weight: 700;
        position: absolute;
        top: 63px;
        left: 215px;
      }
    }
    .mainMenu{
      .fastLink{
        width: 800px;
        text-align: right;
        padding-right: 23px;
        padding-top: 20px;
        a{
          color: #e13e28;
        }
      }
    }
  }
  .el-dialog {
    position: relative;
    .dialogTitle{
      line-height: 78px;
      text-align: center;
      span{
        display: inline-block;
        font-size: 20px;
      }
    }
    .dialogCloese {
      position: absolute;
      right: 0;
      cursor: pointer;
      font-size: 18px;
      display: inline-block;
      padding: 0 10px;
      position: absolute;
    }
  }
}

</style>
