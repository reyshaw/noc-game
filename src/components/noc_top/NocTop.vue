<template>
  <div class="topWrapper">
    <div class="content">
      <div class="logo" @click="jumpTo('index')" >
<!--  <embed src="../../../static/flash/LogoAnime_4-1.swf" quality="high" type="application/x-shockwave-flash" width="200" height="100">-->
<!--       <object @click="jumpTo('index')"-->
<!--                type="application/x-shockwave-flash"-->
<!--                data="~@/assets/media/logo.mp4"-->
<!--                width="240" height="170"-->
<!--                id="flash_logo"-->
<!--                style="visibility: visible;position:absolute;top: -20px;z-index: 0">-->
<!--          <param name="wmode" value="transparent">-->
<!--          <param name="quality" value="high">-->
<!--        </object>-->
<!--        logo动图-->
        <video autoplay loop muted style="width: 240px; height: 127px;">
          <source src="~@/assets/media/logo.mp4" type="video/mp4"/>
          浏览器不支持 video 标签，建议升级浏览器。
          <source src="~@/assets/media/logo.mp4" type="video/webm"/>
          浏览器不支持 video 标签，建议升级浏览器。
        </video>
        <span class="subLogo" v-hidden>旗舰店</span>
      </div>
<!--      顶部小菜单、在线客服，语言切换等-->
      <top-tooltips></top-tooltips>
      <div class="mainMenu" style="float: right;">
<!--        目录菜单-->
        <noc-menu></noc-menu>
      </div>
      <!--        右侧边栏-->
      <!--<right-sidebar></right-sidebar>-->
    </div>
<!--    快速登录（用户信息）条-->
    <noc-tooltips></noc-tooltips>
<!--    快速注册（登录）弹窗-->
    <el-dialog
      width="380px"
      :modal="false"
      ref="loginDialog"
      :visible.sync="dialogFlag">
      <div class="loginDialog">
        <i class="el-icon-close dialogCloese" @click="closeLoginDia"></i>
        <div class="dialogTitle"><span>{{dialogType === 'register' ? '快速注册' : '会员登录'}}</span></div>
        <fast-register v-if="dialogType === 'register'"></fast-register>
        <fast-login v-if="dialogType === 'login'" @changeLoginStyle="changeLoginStyle"></fast-login>
        <!-- <code-login v-if="dialogType === 'qrCodeLogin'" @changeLoginStyle="changeLoginStyle"></code-login> -->
        <code-login v-if="showqrCodeLogin" @changeLoginStyle="changeLoginStyle"></code-login>
      </div>
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
import RightSidebar from './children/RightSidebar'
import { setLocalStorage } from '@/assets/scripts/storage'
import ForgetPassword from '@/components/noc_top/children/ForgetPassword'
import {mapMutations, mapGetters} from 'vuex'
export default {
  name: 'noc_top',
  components: {
    NocMenu, // 目录菜单
    TopTooltips, // 顶部快捷功能菜单
    FastRegister, // 快速注册弹窗内部表单组件
    FastLogin, // 快速登录弹窗内部表单组件
    ForgetPassword, // 忘记密码弹窗内部表单组件
    CodeLogin, // 二维码快速登录弹窗内部表单组件
    NocTooltips, // 登录信息条
    RightSidebar // 右侧边栏
  },
  data () {
    return {
      // dialogType: 'login', // 弹窗类型
      dialogVisible: false, // 弹窗显示控制key
      showForgetPwdDia: false,
      showqrCodeLogin: false // 是不是显示扫码登录
    }
  },
  computed: {
    ...mapGetters('member', ['LOGIN_DIALOG', 'REGISTER_DIALOG']),
    dialogFlag () { // 是否显示弹框
      return this.LOGIN_DIALOG || this.REGISTER_DIALOG || this.showqrCodeLogin
    },
    dialogType () { // 登录或注册类型
      let result = ''
      if (this.LOGIN_DIALOG) {
        result = 'login'
      } else if (this.REGISTER_DIALOG) {
        result = 'register'
      } else {
        result = 'qrCodeLogin'
      }
      return result
    }
  },
  methods: {
    ...mapMutations('member', {
      showFPD: 'SHOWFORGETPWDDIA',
      showLD: 'SET_LOGIN_DIALOG'
    }),
    update () {
      this.showFPD(false)
    },
    closeLoginDia () { // 关闭弹框
      this.showLD(false)
      this.showqrCodeLogin = false
    },
    jumpTo (path) { // 路由跳转
      this.$router.push({
        name: path
      })
    },
    changeLoginStyle (flag) {
      this.showqrCodeLogin = flag
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
  width: 100%;
  min-width: 1650px;
  background: url("../../../src/assets/imgs/top_muen_bak.png");
  color: #ccc;
  font-style: normal;
  font-size: 12px;
  position: relative;
  line-height: 50px;
  /* position: -webkit-sticky; !* Safari *!
  position: sticky; */
  top: 0;
  .content{
    width: 80%;
    min-width: 1200px;
    margin: 0 auto;
    /*overflow: hidden;*/
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
      margin-left: -40px;
      img{
        width: 137px;
        margin-top: 13px;
      }
      .subLogo{
        color: #d82329;
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
      float: right;
      margin-bottom: 18px;
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
  .loginDialog{
    width: 100%;
    margin-top: 10px;
    background: white;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

</style>
