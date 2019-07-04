<template>
  <div class="formbox">
    <el-form :model="form" size="medium" ref="loginForm" :rules="rules">
      <el-form-item prop="account">
        <el-input v-model="form.account" autocomplete="off" class="inputStyle" placeholder="请输入会员账号">
          <i slot="prefix" class="iconfont iconuser-fill"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" autocomplete="off" class="inputStyle" placeholder="请输入登录密码">
          <i slot="prefix" class="iconfont iconlock-fill"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-input v-model="form.verifyCode" autocomplete="off" class="verifyCodeStyle" placeholder="验证码">
          <i slot="prefix" class="iconfont iconsafety-certificate"></i>
        </el-input>
        <img class="verifyCodeImg" :src="imgUrl" alt="验证码" title="看不清楚？点击换一张" @click="updateImgUrl">
      </el-form-item>
      <el-form-item>
        <el-button class="submitBtn" type="primary" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="outLink">
      <div class="forgetPWD"><a href="javascript: void(0);" @click="forgetPassword">忘记密码</a></div>
      <div class="register"><a href="javascript: void(0);" @click="jumpTo('register')">新用户注册</a></div>
    </div>
    <div><span class="otherWaysTitle">其他方式登录</span></div>
    <div class="otherWays" @click="showWechatLogin">
      <span><i class="iconfont">&#xe7e5;</i></span>
      <span>微信</span>
    </div>
  </div>
</template>

<script>
import {getUUID} from '@/assets/scripts/utils'
import { setSessionStorage } from '@/assets/scripts/storage'
import { PATH_VERIFYCODE_IMAGE, PATH_MEMBERLOGIN_LOGIN } from '@/service/member/urls.js'
import {mapMutations} from 'vuex'

export default {
  name: 'fast_login',
  data () {
    return {
      form: {
        account: '',
        password: '',
        verifyCode: ''
      },
      imgUrl: '',
      dialogVisible: false,
      loginItems: {
        randomlogin: '',
        loginTimestamp: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入您的会员账号', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
          { pattern: /^[a-zA-Z]\w{2,11}$/, message: '英文字母开头的数字、英文字母组合' }
        ],
        password: [
          { required: true, message: '请输入您的会员密码', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入您的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    if (this.$store.state.token) {
      this.$emit('closeDialog')
    } else {
      this.updateImgUrl()
    }
  },
  props: {
  },
  created () {

  },
  methods: {
    ...mapMutations('member', ['SET_LOGIN_DIALOG', 'SET_REGISTER_DIALOG']),
    jumpTo (route) {
      this.SET_REGISTER_DIALOG(true)
      // this.$router.push('/member/register')
    },
    showWechatLogin () {
      this.SET_REGISTER_DIALOG(false)
      this.$emit('changeLoginStyle', true)
    },
    forgetPassword () { // 忘记密码
      this.SET_LOGIN_DIALOG(false)
      this.$alert('将根据您提供的信息核对无异后提供账号', '请联系在线客服', {
        confirmButtonText: '立即联系',
        type: 'warning',
        center: true,
        callback: () => {
          void (0)
        }
      })
      // this.$store.commit(types.SHOWFORGETPWDDIA, true)
      // this.showLD(false)
    },
    updateImgUrl () { // 验证码图片刷新
      this.imgUrl = ''
      this.loginItems.randomlogin = getUUID()
      this.loginItems.loginTimestamp = new Date().getTime()
      setSessionStorage('randomlogin', this.loginItems.randomlogin)
      setSessionStorage('loginTimestamp', this.loginItems.loginTimestamp)
      this.imgUrl = PATH_VERIFYCODE_IMAGE + '?type=char' + '&randomlogin=' + this.loginItems.randomlogin + '&timestamp=' + this.loginItems.loginTimestamp + '&verifyType=1'
    },
    update (bool) { // 忘记密码框显示key状态改变
      this.dialogVisible = bool
    },
    submitForm (formName) { // 表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginNow()
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    loginNow () {
      if (this.form.account && this.form.password) {
        let payload = {
          memberAccount: this.form.account, // 登录账号
          memberPassword: this.form.password, // 登录密码
          verifyCode: this.form.verifyCode // 验证码
        }
        // console.log(payload)
        this.post(PATH_MEMBERLOGIN_LOGIN, payload).then(res => {
          if (res.status) {
            this.showLD(false)
            this.$store.commit('SET_TOKEN', res.data.token)
            this.$store.commit('SET_BASE_INFO', res.data.profile)
            this.$emit('closeDialog')
            this.$message({type: 'success', message: '恭喜您登陆成功'})
            this.$router.push({
              name: 'index'
            })
          } else {
            this.updateImgUrl()
            // this.$message({
            //   type: 'warning',
            //   message: res.msg
            // })
          }
        }, err => {
          this.$message.error(err)
        })
      } else {
        this.updateImgUrl()
        // this.$message({
        //   type: 'warning',
        //   message: '账号密码不能为空'
        // })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.formbox{
  .el-form{
    margin:0 33px;
    .inputStyle{
      width: 300px;
    }
    .verifyCodeStyle{
      width: 215px;
    }
    .verifyCodeImg{
      cursor: pointer;
      vertical-align: top;
      width: 81px;
    }
    .submitBtn{
      width: 100%;
      height: 45px;
    }
  }
  .outLink{
    margin: 0 33px;
    .forgetPWD{
      float: left;
      line-height: 15px;
      a{
        color: #eb844c;
      }
    }
    .register{
      float: right;
      line-height: 15px;
      a{
        color: #eb844c;
      }
    }
  }
  .otherWaysTitle{
    position: relative;
    text-align: center;
    display: inline-block;
    width: 100%;
    color: #eb844c;
    line-height: 54px;
  }
  .otherWaysTitle:before, .otherWaysTitle:after{
    content: '';                 /*CSS伪类用法*/
    position: absolute;         /*定位背景横线的位置*/
    top: 25px;
    background: #eb844c;       /*宽和高做出来的背景横线*/
    width: 28%;
    height: 1px;
  }
  .otherWaysTitle:before{
    left: 38px;
  }
  .otherWaysTitle:after{
    left: 224px;
  }
  .otherWays{
    margin: 20px 0;
    text-align: center;
    span{
      display: block;
      line-height: 18px;
      color: green;
      cursor: pointer;
    }
    .iconfont{
      font-size: 35px;
    }
  }
  .jumpToLogin{
    text-align: right;
    margin-right: 40px;
  }
}
</style>
