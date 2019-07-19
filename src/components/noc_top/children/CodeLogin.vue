<template>
  <div class="formbox">
    <ul>
      <li><img class="qrCode" src="@/assets/imgs/qrCode.png" alt=""></li>
      <li><span>打开微信 扫描二维码</span></li>
      <li class="qrCodeAdv">
        <div>
          <span class="iconCircle"><i class="iconfont iconweixin"></i></span>
          <span>免输入</span>
        </div>
        <div>
          <span class="iconCircle"><i class="iconfont iconhuojian"></i></span>
          <span>更高效</span>
        </div>
        <div>
          <span class="iconCircle"><i class="iconfont iconrenzhengdunpaianquanbaozhangzhibao"></i></span>
          <span>更安全</span>
        </div>
      </li>
      <li>
        <p class="outLink">
          <a class="forget" href="javascript:void (0);" @click="handleLogin"><i class="iconfont iconleftarrow"></i> 账号登录</a>
          <a class="register" href="javascript:void (0);" @click="jumpTo('register')">新用户注册 <i class="iconfont iconrightarrow"></i></a>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
// import {getUUID} from '@/assets/scripts/utils'
// import { setSessionStorage, getSessionStorage } from '@/assets/scripts/storage'
// import { PATH_VERIFYCODE_IMAGE } from '@/service/member/urls.js'

// import types from '@/store/types'

export default {
  name: 'code_login',
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    ...mapMutations('member', ['SET_LOGIN_DIALOG', 'SET_REGISTER_DIALOG']),
    jumpTo (route) {
      this.$emit('changeLoginStyle', false)
      this.SET_REGISTER_DIALOG(true)
      // this.$router.push('/member/index')
      // this.store.commit(types.SHOWLOGINDIA, false)
    },
    handleLogin () {
      this.SET_LOGIN_DIALOG(true)
      this.$emit('changeLoginStyle', false)
    }
  }
}
</script>

<style scoped lang="scss">
.formbox{
  ul {
    position: relative;
    text-align: center;
    line-height: 70px;
    .qrCode {
      width: 36%
    }
    .qrCodeAdv {
      display: flex;
      padding: 0 60px;
      justify-content: space-evenly;
      margin-top: 93px;

      .iconCircle {
        color: #333;
        padding: 4px;
        border: 1px solid #333;
        border-radius: 20px;
        padding-top: 6px;
      }
    }

    .inputLine {
      position: relative;

      .insideIcon {
        display: block;
        position: absolute;
        left: 125px;
        top: 0;
      }
    }
    .loginTitle {
      font-size: 25px;
      padding-top: 31px;
      color: #3e3e3e;
    }
    .loginInput {
      width: 240px;
      height: 42px;
      border: 1px solid #ccc;
      outline-color: #eb844c;
      padding-left: 40px;
    }
    .loginButton {
      cursor: pointer;
      width: 279px;
      height: 45px;
      border: 1px solid #ccc;
      background-color: #eb844c;
      color: #fff;
      margin-top: 30px;
      outline: none; //消除默认点击蓝色边框效果
    }

    .worning {
      position: absolute;
      left: 120px;
      top: 215px;
    }

    .outLink {
      line-height: 30px;
      font-weight: 700;
      a {
        font-size: 15px;
        display: inline-block;
        padding: 0 25px;
        color: #eb844c;
      }
    }
  }
}
</style>
