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
      <el-form-item prop="verifyCode" v-if="verifyCodeShowStatus">
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
// import { setSessionStorage } from '@/assets/scripts/storage'
import { PATH_VERIFYCODE_IMAGE, PATH_SELECTMEMCONFIG_LOGIN } from '@/service/member/urls.js'
import {mapMutations, mapActions, mapGetters} from 'vuex'

export default {
  name: 'fast_login',
  data () {
    return {
      form: {
        account: 'bill',
        password: '123123',
        verifyCode: ''
      },
      imgUrl: '',
      dialogVisible: false,
      verifyCodeShowStatus: false,
      headers: {
        randomlogin: '',
        timestamp: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入您的会员账号', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
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
  computed: {
    ...mapGetters(['ROLE'])
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
    ...mapActions(['SET_LOGIN', 'SET_LOGOUT', 'SET_CONFIG']),
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
      this.headers = {
        randomlogin: getUUID(),
        timestamp: new Date().getTime() + '' + Math.floor(Math.random() * 10000 * Math.random() * 10) // 可以封装函数, 无限随机
      }
      // setSessionStorage('randomlogin', this.headers.randomlogin)
      // setSessionStorage('loginTimestamp', this.headers.loginTimestamp)
      this.imgUrl = PATH_VERIFYCODE_IMAGE + '?type=char' + '&randomlogin=' + this.headers.randomlogin + '&timestamp=' + this.headers.timestamp + '&verifyType=1'
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
    async getVerifyCodeStatus () { // 0.0 获取该会员是否需要验证码
      await this.get(PATH_SELECTMEMCONFIG_LOGIN, {memberAccount: this.form.account}).then(res => {
        if (res.status) {
          this.verifyCodeShowStatus = !res.data.verifyCodeShowStatus
        } else {
          this.verifyCodeShowStatus = false
        }
      }, err => {
        console.log(err)
      })
    },
    async loginNow () {
      await this.getVerifyCodeStatus()
      if (!this.verifyCodeShowStatus || (this.verifyCodeShowStatus && this.form.verifyCode)) {
        let payload = {
          memberAccount: this.form.account, // 登录账号
          memberPassword: this.form.password, // 登录密码
          verifyCode: this.form.verifyCode // 验证码
        }

        let agentPayload = {
          agentAccount: this.form.account, // 登录账号
          agentPassword: this.form.password, // 登录密码
          loginVerifyCode: this.form.verifyCode // 验证码
        }
        console.log(this.headers)
        if (await this.SET_LOGIN({user: this.ROLE === 'member' ? payload : agentPayload, header: this.headers})) {
          this.$message.success('恭喜您登陆成功！')
          this.SET_LOGIN_DIALOG(false)
        } else {
          this.updateImgUrl()
        }
      } else {
        this.updateImgUrl()
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
      width: 174px;
    }
    .verifyCodeImg{
      cursor: pointer;
      vertical-align: top;
      width: 125px;
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
        color: #409EFF;
      }
    }
    .register{
      float: right;
      line-height: 15px;
      a{
        color: #409EFF;
      }
    }
  }
  .otherWaysTitle{
    position: relative;
    text-align: center;
    display: inline-block;
    width: 100%;
    color: #409EFF;
    line-height: 54px;
  }
  .otherWaysTitle:before, .otherWaysTitle:after{
    content: '';                 /*CSS伪类用法*/
    position: absolute;         /*定位背景横线的位置*/
    top: 25px;
    background: #409EFF;       /*宽和高做出来的背景横线*/
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
