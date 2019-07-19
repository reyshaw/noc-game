<template>
  <div class="loginWrapper">
    <!--视频背景-->
    <div class="video-container">
      <div class="filter"></div>
      <video autoplay loop muted class="fillWidth" :canplay="canplay">
        <source src="@/assets/media/dragon.mp4" type="video/mp4"/>
        浏览器不支持 video 标签，建议升级浏览器。
        <source src="@/assets/media/dragon.mp4" type="video/webm"/>
        浏览器不支持 video 标签，建议升级浏览器。
      </video>
      <div class="poster hidden" v-if="!canplay">
        <img src="@/assets/imgs/dragon_logo.jpg" alt="">
      </div>
    </div>
    <!--登录窗口-->
    <div class="loginBox">
      <fast-login v-if="dialogType === 'login'" @changeLoginStyle="changeLoginStyle"></fast-login>
      <code-login v-if="dialogType === 'qrCodeLogin'" @changeLoginStyle="changeLoginStyle"></code-login>
      <!--      <ul v-if="accountLogin">-->
      <!--        <li><h2 class="loginTitle">会员登录</h2></li>-->
      <!--        <li class="inputLine"><input v-model.trim="userName" class="loginInput" type="text"><i class="iconfont insideIcon">&#xe612;</i></li>-->
      <!--        <li class="inputLine"><input v-model.trim="userPwd" class="loginInput" type="text"><i class="iconfont insideIcon icon-yaochi"></i></li>-->
      <!--        <li v-if="loginValidate"><span class="worning"><i class="el-icon-warning"><span>{{warningWord}}</span></i></span></li>-->
      <!--        <li><button class="loginButton" @click="handleLogin" @mousedown="mouseClick($event, 'down')" @mouseup="mouseClick($event, 'up')">登录</button></li>-->
      <!--        <li>-->
      <!--          <p class="outLink">-->
      <!--            <a class="forget" href="javascript:void (0);" @click="dialogVisible = true">忘了密码</a>-->
      <!--            <a class="register" href="javascript:void (0);" @click="jumpTo('register')">新用户注册</a>-->
      <!--          </p>-->
      <!--        </li>-->
      <!--        <li><span class="otherWaysTitle">其他方式登录</span></li>-->
      <!--        <li class="otherWays" @click="accountLogin = !accountLogin">-->
      <!--          <span><i class="iconfont">&#xe7e5;</i></span>-->
      <!--          <span>微信</span>-->
      <!--        </li>-->
      <!--      </ul>-->
      <!--      <ul v-if="!accountLogin">-->
      <!--        <li><h2 class="loginTitle">二维码登录</h2></li>-->
      <!--        <li><img class="qrCode" src="@/assets/imgs/qrCode.png" alt=""></li>-->
      <!--        <li><span>打开微信 扫描二维码</span></li>-->
      <!--        <li class="qrCodeAdv">-->
      <!--          <div>-->
      <!--            <span class="iconCircle"><i class="iconfont icon-weixin"></i></span>-->
      <!--            <span>免输入</span>-->
      <!--          </div>-->
      <!--          <div>-->
      <!--            <span class="iconCircle"><i class="iconfont icon-huojian"></i></span>-->
      <!--            <span>更高效</span>-->
      <!--          </div>-->
      <!--          <div>-->
      <!--            <span class="iconCircle"><i class="iconfont icon-renzhengdunpaianquanbaozhangzhibao"></i></span>-->
      <!--            <span>更安全</span>-->
      <!--          </div>-->
      <!--        </li>-->
      <!--        <li>-->
      <!--          <p class="outLink">-->
      <!--            <a class="forget" href="javascript:void (0);" @click="accountLogin = !accountLogin"><i class="iconfont icon-leftarrow"></i> 账号登录</a>-->
      <!--            <a class="register" href="javascript:void (0);" @click="jumpTo('register')">新用户注册 <i class="iconfont icon-rightarrow"></i></a>-->
      <!--          </p>-->
      <!--        </li>-->
      <!--      </ul>-->
    </div>
  </div>
</template>

<script>
import FastLogin from '@/components/noc_top/children/FastLogin'
import CodeLogin from '@/components/noc_top/children/CodeLogin'
export default {
  name: 'login',
  components: {
    FastLogin,
    CodeLogin
  },
  data () {
    return {
      canplay: true, // 动画播放控制
      dialogType: 'login', // 动画播放控制
      autoStyle: '', // 布局控制
      diaForm: {
        userName: '',
        verificationCode: ''
      }, // 布局控制
      loginValidate: false, // 登录验证
      accountLogin: true, // 账号二维码切换登录模式建
      userName: '', // 用户名
      userPwd: '', // 密码
      warningWord: '' // 提示语
    }
  },
  methods: {
    jumpTo (path) { // 路由跳转
      this.$router.push({
        name: path
      })
    },
    changeLoginStyle (type) {
      this.dialogType = type
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .loginWrapper{
    position: relative;
    .video-container {
      position: relative;
      height: 80vh;
      overflow: hidden;
    }

    .video-container .poster img,
    .video-container video {
      width: 100%;
      min-width: 1650px;
      z-index: 0;
      top: -18.5%;
      position: absolute;
    }

    .video-container .filter {
      width: 90%;
      min-width: 1650px;
      z-index: 1;
      position: absolute;
      top: -18.5%;
      background: rgba(0, 0, 0, 0.4);
    }
    .loginBox{
      width: 366px;
      padding: 78px 65px;
      position: absolute;
      left: 50%;
      transform: translate(220px,0);
      margin-left: 20px;
      top: 40px;
      background: url('../../assets/imgs/cbg.png');
    }
  }
</style>
