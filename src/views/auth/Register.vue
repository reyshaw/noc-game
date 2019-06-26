<template>
  <div class="wrapper">
    <div class="bak" ref="bak"></div>
    <div class="contentWrapper" ref="contentWrapper">
      <div class="content">
        <div>
          <ul class="titleWrapper">
            <li class="title" @click="tabChange($event,'register')">欢迎注册</li>
            <li class="title" @click="tabChange($event,'login')">登录</li>
            <li class="registerSub"><img src="../../assets/imgs/registerSub.png" alt=""></li>
          </ul>
        </div>
        <el-form v-if="showRegister" label-width="80px" :rules="rules" ref="registerForm" :model="form">
          <div v-for="(item, index) in registerItems" :key="index" v-if="item.ifShow">
            <el-form-item :prop="item.key">
              <el-input
                size="medium"
                :class="item.key"
                v-if="item.key !== 'memberDateBirth'"
                :type="item.key === 'memberConfirmPassword'||item.key === 'withdrawalPassword'||item.key === 'memberPassword'? ifShow ? 'password' : 'text' : 'text'"
                :style="item.key === 'registerCode' ? 'width:220px' : 'width:430px'"
                v-model="form[item.key]"
                :placeholder="item.placeholder">
                <i slot="prefix" :class="'iconfont '+item.icon"></i>
                <i @click="ifShow = !ifShow" v-if="item.key === 'withdrawalPassword'" slot="suffix" class="iconfont iconyincang"></i>
              </el-input>
              <el-date-picker
                size="medium"
                style="width: 430px"
                v-model="form.memberDateBirth"
                v-if="item.key === 'memberDateBirth'"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <div v-if="item.key === 'registerCode'" class="imgArea" @click="updateImgUrl()"><img :src="imgUrl" alt="验证码" ></div>
            </el-form-item>
            <el-form-item v-if="(item.key === 'memberMobile' && showPhoneCode) || (item.key === 'memberEmail' && showEmailCode)" :prop="item.key+'Code'">
              <el-input
                size="medium"
                :class="item.key+'verify'"
                style="width: 430px"
                v-model="form[item.codeType+'VerifyCode']"
                :placeholder="item.subplaceholder">
                <i slot="prefix" :class="'iconfont '+item.subIcon"></i>
                <i type="text" slot="append" @click="sendVerifyCode($event,item.key,form[item.key])" style="cursor: pointer">发送验证码</i>
              </el-input>
            </el-form-item>
          </div>
          <el-form-item prop="agreement">
            <el-checkbox v-model="form.agreement">已阅读并同意《用户服务协议》</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="submit" type="danger" @click="submitForm('registerForm')">立即注册</el-button>
          </el-form-item>
        </el-form>
        <el-form v-if="!showRegister" ref="loginForm" :model="loginForm" label-width="80px">
          <el-form-item>
            <el-input v-model="loginForm.account"  placeholder="请输入用户名" size="medium" style="width: 430px">
              <i slot="prefix" class="iconfont iconuser-fill"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.password" placeholder="请输入密码" size="medium" style="width: 431px">
              <i slot="prefix" class="iconfont iconlock-fill"></i>
            </el-input>
          </el-form-item>
          <el-form-item v-if="verifyCodeShowStatus">
            <el-input v-model="loginForm.verifyCode" placeholder="请输入验证码" size="medium" style="width: 250px">
              <i slot="prefix" class="iconfont iconlock-fill"></i>
            </el-input>
            <div class="imgArea" @click="updateImgUrl()"><img :src="imgUrl" alt="验证码" ></div>
          </el-form-item>
          <el-form-item>
            <el-button class="submit" type="text" style="color: white;float: right;margin-right: 80px">忘记密码？</el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="submit" type="danger" @click="loginNow()">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="reminder" ref="reminder">
        <i class="title">温馨提示</i>
        <p>标记有*者为必填项目。</p>
        <p>取款密码为取款金额时的凭证，请会员务必填写牢记。</p>
        <p>温馨提示：注册时如遇到同名或注册不了等其它问题请联系在线客服，我们会第一时间为您解决好！</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  PATH_REGISTER_MEMBER,
  PATH_VERIFYCODE_IMAGE,
  PATH_MEMBERLOGIN_LOGIN,
  PATH_SEND_EMAIL
} from '@/service/member/urls.js'
import {formatDate, getUUID} from '@/assets/scripts/utils'
// import { setSessionStorage } from '@/assets/scripts/storage'
import {mapState} from 'vuex'
// import types from '@/store/share.types'

export default {
  name: 'register',
  data () {
    let validatePWD = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'))
      } else if (value !== this.form.memberPassword) {
        callback(new Error('两次输入的密码必须一致'))
      } else {
        callback()
      }
    }
    let agreement = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请在仔细阅读并同意用户服务协议后进行注册'))
      } else {
        callback()
      }
    }
    return {
      scroll: 0, // 滚动长度
      showRegister: true,
      registerItemsStr: [], // 未处理的配置项数据
      registerItems: [], // 处理后的配置项数据
      showEmailCode: false, // 处理后的配置项数据
      showPhoneCode: false, // 处理后的配置项数据
      verifyType: '', // 显示的验证码种类
      verifyCodeShowStatus: false, // 是否显示验证码唯一标识
      verifyPlace: 0, // 登录验证码还是注册验证码
      form: { // 表单数据
        inviteCode: '',
        memberAccount: '',
        memberConfirmPassword: '',
        memberDateBirth: '',
        memberEmail: '',
        memberMobile: '',
        memberPassword: '',
        memberRealName: '',
        promotionCode: '5466oRak',
        withdrawalPassword: '',
        agreement: true,
        phoneVerifyCode: '', // 手机验证码
        emailVerifyCode: '', // 邮箱验证码
        registerCode: '' // 图片证码
      },
      loginForm: {
        account: '',
        password: '',
        verifyCode: ''
      },
      imgUrl: '',
      ifShow: true,
      headers: {
        timestamp: '',
        randomemail: '',
        randomregister: ''
      },
      register: {
        random: '',
        timestamp: ''
      },
      rules: { // 验证规则
        memberAccount: [
          { required: true, message: '请输入您的会员账号', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
          { pattern: /^[a-zA-Z]\w{2,11}$/, message: '英文字母开头的数字、英文字母组合' }
        ],
        memberPassword: [
          { required: true, message: '请输入您的密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        memberConfirmPassword: [
          { validator: validatePWD, trigger: 'blur' }
        ],
        memberMobile: [
          { required: true, message: '输入您的手机号码', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的11位手机号码' }
        ],
        memberRealName: [
          { required: true, message: '请输入您的真实姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9\u4e00-\u9fa5\\·]{1,10})$/, message: '请输入正确的姓名' }
        ],
        memberDateBirth: [
          { required: true, message: '请选择您的出生日期', trigger: 'blur' }
        ],
        withdrawalPassword: [
          { required: true, message: '请输入您的取款密码', trigger: 'blur' },
          { pattern: /^[0-9]{6}$/, message: '6位数字' }
        ],
        memberEmail: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        promotionCode: [
          { required: false, message: '请输入推广码', trigger: 'blur' }
        ],
        inviteCode: [
          { required: false, message: '请输入邀请码', trigger: 'blur' }
        ],
        agreement: [
          { validator: agreement, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.updateImgUrl()
  },
  computed: {
    ...mapState(['defaultConfig'])
  },
  mounted () {
    window.addEventListener('scroll', this.scrollDs, true)
    this.getConfig()
  },
  methods: {
    scrollDs () { // 0.1 背景滚动变化
      this.scroll = this.$refs.reminder.getBoundingClientRect().top
      this.$refs.bak.style.backgroundSize = 'auto ' + (-Math.round((this.scroll / 1372).toFixed(2) * 33) / 2.5 + 85) + '%'
      this.$refs.contentWrapper.style.backgroundColor = 'rgba(16, 16, 25, ' + ((-0.5 + this.scroll / 1372).toFixed(1)) + ')'
    },
    updateImgUrl () { // 0.2 图像验证码更新
      this.imgUrl = ''
      this.headers.randomregister = getUUID()
      this.headers.timestamp = new Date().getTime()
      this.imgUrl = PATH_VERIFYCODE_IMAGE + '?type=char' + '&randomregister=' + this.headers.randomregister + '&timestamp=' + this.headers.timestamp + '&verifyType=' + this.verifyPlace
    },

    tabChange (e, type) { // 0.3 登录注册切换
      if (type === 'register') {
        e.target.parentElement.childNodes[4].style.left = '140px'
        this.verifyPlace = 0
        this.updateImgUrl()
        this.showRegister = true
      } else {
        e.target.parentElement.childNodes[4].style.left = '320px'
        this.verifyPlace = 1
        this.showRegister = false
        this.updateImgUrl()
      }
    },
    getConfig () { // 1 获取注册配置参数
      this.registerItemsStr = this.defaultConfig.list[0].registerItemsStr
      this.verifyCodeShowStatus = !this.defaultConfig.filter.verifyCodelist[0].verifyCodeShowStatus
      this.verifyType = this.defaultConfig.filter.verifyCodelist[0].verifyCodeMode
      console.log(this.verifyType, this.verifyCodeShowStatus)
      this.transformDate()
    },
    transformDate () { // 2 转换成v-for的key
      this.registerItemsStr.map(str => {
        let nObj = {}
        nObj.required = str.split(':')[0] === '1'
        nObj.ifShow = true
        const b = str.split(':')[1]
        switch (b) {
          case '0' :
            nObj.key = 'memberAccount'
            nObj.placeholder = '请输入账号'
            nObj.icon = 'iconusername'
            break
          case '1' :
            nObj.key = 'memberPassword'
            nObj.placeholder = '请设置6至12位登录密码'
            nObj.icon = 'iconlock-fill'
            break
          case '2' :
            nObj.key = 'memberConfirmPassword'
            nObj.placeholder = '请再次输入登录密码'
            nObj.icon = 'iconlock-fill'
            break
          case '3' :
            nObj.key = 'memberRealName'
            nObj.placeholder = '请输入真实姓名'
            nObj.icon = 'iconuser-circle'
            break
          case '4' :
            nObj.key = 'memberDateBirth'
            nObj.placeholder = '请输入出生日期'
            nObj.icon = 'iconcalendaralt-fill'
            break
          case '5' :
            nObj.key = 'memberMobile'
            nObj.codeType = 'phone'
            nObj.placeholder = '请输入手机号码'
            nObj.subplaceholder = '请输入短信验证码'
            nObj.icon = 'iconmobile-alt'
            nObj.subIcon = 'iconcommentdots-fill'
            let itemKeys = []
            this.registerItemsStr.map((obj) => {
              itemKeys.push(obj.split(':')[0])
              itemKeys.push(obj.split(':')[1])
            })
            nObj.hasCode = itemKeys.indexOf('10') > -1
            break
          case '6' :
            nObj.key = 'memberEmail'
            nObj.codeType = 'email'
            nObj.placeholder = '请输入电子邮箱'
            nObj.subplaceholder = '请输入邮箱验证码'
            nObj.icon = 'el-icon-edit'
            nObj.subIcon = 'iconmail-fill'
            let itemKeys1 = []
            this.registerItemsStr.map((obj) => {
              itemKeys1.push(obj.split(':')[0])
              itemKeys1.push(obj.split(':')[1])
            })
            nObj.hasCode = itemKeys1.indexOf('11') > -1
            break
          case '7' :
            nObj.key = 'withdrawalPassword'
            nObj.placeholder = '请输入取款密码'
            nObj.icon = 'iconkey'
            break
          case '8' :
            nObj.key = 'promotionCode'
            nObj.placeholder = '推广码'
            nObj.icon = 'iconqrcode'
            break
          case '9' :
            nObj.key = 'inviteCode'
            nObj.placeholder = '邀请码'
            nObj.icon = 'iconuserplus-fill'
            break
          case '10' :
            this.showEmailCode = true
            nObj.ifShow = false
            nObj.key = 'emailVerifyCode'
            nObj.placeholder = '邮箱验证'
            nObj.icon = 'icon-bangding'
            break
          case '11' :
            this.showPhoneCode = true
            nObj.ifShow = false
            nObj.key = 'phoneVerifyCode'
            nObj.placeholder = '手机验证'
            nObj.icon = 'icon-bangding'
            break
          case '12' :
            if (this.verifyType === '1' || this.verifyType === '2' || this.verifyType === '0') {
              nObj.key = 'registerCode'
              nObj.placeholder = '请输入图像验证码'
              nObj.icon = 'iconVerification_code'
            }
            break
          default:
            nObj.key = ''
            nObj.placeholder = ''
            nObj.icon = ''
            break
        }
        this.registerItems.push(nObj)
      })
      this.registerItems.map(obj => {
        if (this.rules[obj.key]) {
          this.rules[obj.key][0].required = obj.required
        }
      })
    },
    sendEmailCode () { // 3.1 发送邮件
      let payload = {
        toEmail: this.form.memberEmail,
        useType: '1'
      }
      let header = {
        randomemail: getUUID(),
        timestamp: new Date().getTime() // 携带时间戳
      }
      this.post(PATH_SEND_EMAIL, payload, header).then(res => {
        console.log(res)
      }, err => {
        console.log(err)
      })
    },
    sendVerifyCode (e, code, path) { // 3.2发送验证码倒计时
      if (path) {
        if (code === 'memberEmail') {
          this.sendEmailCode()
        }
        e.target.style.pointerEvents = 'none'
        e.target.style.color = '#ccc'
        let time = 60
        e.target.innerText = '已发送，再次发送请等待' + time + '秒'
        this.sendEmailTimer = setInterval(() => {
          if (time > 0) {
            time -= 1
            e.target.innerText = '已发送，再次发送请等待' + time + '秒'
          } else {
            e.target.innerText = '发送验证码'
            clearInterval(this.sendEmailTimer)
            e.target.style.pointerEvents = 'auto'
            e.target.style.color = '#0099cc'
          }
        }, 1000)
      } else {
        this.$message('发送对象不能为空')
      }
    },
    submitForm (formName) { // 4 表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.hanleRegister()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    hanleRegister () { // 5 注册发起
      const payload = {
        ...this.form,
        memberDateBirth: formatDate(this.form.memberDateBirth)
      }
      this.post(PATH_REGISTER_MEMBER, payload, this.headers).then(res => { // 获取配置参数
        switch (res.code) {
          case 1:
            this.$message('恭喜您，注册成功！')
            this.$router.push({
              name: 'index',
              params: 'login'
            })
            // this.memberInfo = res.data.profile
            this.$store.dispatch('SET_LOGIN', Object.assign(res.data.profile, {token: res.data.token}))
            break
          default:
            this.$message(res.msg)
            break
        }
        this.updateImgUrl()
      }, err => {
        console.log(err)
      })
    },
    loginNow () {
      if (this.loginForm.account && this.loginForm.password) {
        let payload = {
          memberAccount: this.loginForm.account, // 登录账号
          memberPassword: this.loginForm.password, // 登录密码
          verifyCode: this.loginForm.verifyCode // 验证码
        }
        console.log(payload)
        let header = {
          randomregister: this.headers.randomregister,
          timestamp: this.headers.timestamp
        }
        this.post(PATH_MEMBERLOGIN_LOGIN, payload, header).then(res => {
          if (res.code === 1) {
            this.$store.commit('SET_TOKEN', res.data.token)
            this.$store.commit('SET_BASE_INFO', res.data.profile)
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
          console.log(err)
        })
      } else {
        this.updateImgUrl()
        // this.$message({
        //   type: 'warning',
        //   message: '账号密码不能为空'
        // })
      }
    }
  },
  beforeRouteLeave (to, from, next) { // 离开路由删除滚动事件监听
    // removeSessionStorage()
    window.removeEventListener('scroll', this.scrollDs, true)
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper{
  min-width: 290px;
  font-size: 14px;
  overflow: hidden;
  .bak{
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 1400px;
    background: url("../../assets/imgs/registerBak.jpg") #050400 center center no-repeat;
    background-position: center 0px;
    background-size: auto 71%;
  }
  .contentWrapper{
    overflow: hidden;
    background-color: rgba(24, 24, 36, 0.5);
    top: 250px;
    left: calc(50% - 300px);
    .content{
      border: 1px solid rgba(81, 92, 123, 0.5);
      border-radius: 5px;
      width: 600px;
      background-color: rgba(0, 0, 0, 0.5);
      margin: 50px auto;
      .titleWrapper{
        border-bottom: 1px solid #ccc;
        display: flex;
        line-height: 50px;
        justify-content: center;
        position: relative;
        .title{
          width: 180px;
          text-align: center;
          font-size: 16px;
          color: white;
          cursor: pointer;
        }
        .registerSub{
          position: absolute;
          top: 22px;
          left: 140px;
          img{
            width: 150px;
          }
        }
      }
      .el-form{
        margin-top: 50px;
        overflow: hidden;
        .imgArea{
          vertical-align: top;
          margin-left: 10px;
          width: 191px;
          display: inline-block;
          height: 48px;
          background-color: #000;
          border-radius: 2px;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
          img{
            width: 118px;
            vertical-align: middle;
            border-radius: 2px;
          }
        }
        .el-input{
          .el-input__inner{
            height: 45px;
          }
        }
        .el-button--danger{
          background-color: #fb4354;
          width: 430px;
          height: 50px;
          span{
            font-size: 16px;
          }
        }
      }
    }
    .reminder{
      border: 1px solid rgba(81, 92, 123, 0.5);
      border-radius: 5px;
      width: 440px;
      margin: 0 auto;
      margin-bottom: 50px;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 30px 80px;
      text-align: left;
      color: white;
      height: 160px;
      line-height: 25px;
      font-size: 15px;
      p{
        margin-top: 15px;
      }
      .title{
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>
