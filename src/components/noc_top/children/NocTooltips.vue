<template>
  <div class="noc-tooltips">
    <div class="tooltipsContent">
      <div class="scroll">
        <div class="msg">
          <i class="iconfont icongonggao"></i>
          <span>最新公告 ： </span>
        </div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in listData" :key="index">
            <span @click="showPupper(item.title)" v-pointer>{{item.title+item.date}}</span>
          </swiper-slide>
        </swiper>
      </div>
      <div class="homeLogin" v-if="!TOKEN">
        <div>
          <input type="text" v-model="memberAccount" placeholder="会员账号" @keyup.enter="memberPassword ? loginNow() : pwdfocus = true">
          <span class="forgetPwd" @click="showNotice">忘记?</span>
        </div>
        <div>
          <input type="password" v-model="memberPassword" placeholder="登录密码" v-focus="pwdfocus" @keyup.enter="loginNow">
          <span class="forgetPwd" @click="showNotice">忘记?</span>
        </div>
        <div class="verifyCode" v-if="verifyCodeShowStatus">
          <input type="text" ref="verifyInput" v-model="verifyCode" @blur="ifFocus = false" @focus="focus" v-focus="ifFocus" placeholder="请输入验证码">
          <div class="verifyCodeImg"><img :src="imgUrl" alt="验证码" @click="updateImgUrl"></div>
        </div>
        <button @click="loginNow" @keyup.enter="loginNow">立即登录</button>
        <button @click="jumpTo(`${ROLE}Register`)">免费注册</button>
      </div>
      <div class="memberDetails" v-if="TOKEN">
        <ul>
          <li><span>登录账号：{{BASE_INFO.memberAccount}}</span></li>
          <li v-for="(shortcut, idx) in shortcuts" :key="idx">
            <a href="javascript:void(0);" :class="{active: shortcut.route === jumpRoute}" @click="jumpTo(`${shortcut.route}`)">{{shortcut.label}}
              <span class="badge" v-if="shortcut.label==='我的消息' && MSG_COUNT">{{MSG_COUNT}}</span>
            </a>
          </li>
          <li>
            <el-popover
              placement="bottom"
              width="420"
              trigger="hover">
              <div class="walletPanel">
                <div class="balance">
                  <div>账户总余额：{{this.cash}}</div>
                  <div>优惠余额：{{this.discount}}</div>
                  <div>积分余额：{{this.points}}</div>
                </div>
                <div class="platformList">
                  <div class="platform" v-for="(item, index) in platformList" :key="index">
                    <span>{{item.cnName}}：<a href="javascript: void(0);" ref="balance" @click="loadBalance(item,index)">点击查看</a></span>
                    <i class="el-icon-refresh" :class="{balanceLoading: loading[index]}" @click="loadBalance(item,index)"></i>
                    <i class="iconfont iconhuishou1" :class="{receive: loading1[index]}" @click="handleReceive(item, index)"></i>
                  </div>
                </div>
                <div class="recycle">
                  <el-button size="mini" type="primary" :loading="recoveryLoading" @click="handleRecovery">一键回收</el-button>
                  <el-button class="el-icon-refresh" size="mini" @click="loadAllBalance">一键刷新</el-button>
                </div>
              </div>
              <a slot="reference" href="javascript:void(0);" @mouseover="getPlatform">我的钱包：{{ROLE==='member' ? cash : '我的佣金'}}<i class="el-icon-caret-bottom"></i></a>
            </el-popover>
          </li>
          <li><a href="javascript:void(0);" @click="logOut">退出</a></li>
        </ul>
      </div>
      <noc-dialog
        :dialogVisible = "dialogVisible"
        @closeDialog="dialogVisible=false"
        dialogTitle="最新公告">
        <template
          slot="dialog-content">
          {{this.notice}}
        </template>
      </noc-dialog>
    </div>
  </div>
</template>

<script>
import {
  PATH_VERIFYCODE_IMAGE,
  // PATH_MEMBERLOGIN_LOGIN,
  PATH_SELECTMEMCONFIG_LOGIN
} from '@/service/member/urls.js'
import {
  PATH_GAMEPLATFORM_PAY,
  PATH_BALANCE_PAY,
  PATH_WALLATBALANCE_PAY,
  PATH_RECOVERY_PAY
} from '@/service/member/member_center.url.js'
import {getUUID} from '@/assets/scripts/utils'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import CONFIG from './nocTooltips.config'
import NocDialog from '@/components/noc_dialog/NocDialog'

export default {
  name: 'noc_tooltips',
  components: {
    NocDialog
  },
  data () {
    return {
      ifFocus: false, // 是否聚焦
      memberAccount: 'bill', // 设置默认
      memberPassword: '123123', // 默认密码
      verifyCodeShowStatus: false, // 是否显示验证码
      verifyCode: '',
      imgUrl: '',
      headers: {
        loginTimestamp: '',
        randomlogin: ''
      },
      listData: CONFIG.listData,
      cash: '0.00',
      discount: '0.00',
      points: '0.00',
      platformList: [],
      oneTime: false,
      loading: [],
      recoveryLoading: false,
      loading1: [],
      pwdfocus: false,
      jumpRoute: '',
      swiperOption: {
        direction: 'vertical',
        autoplay: true
      },
      notice: '',
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['TOKEN', 'BASE_INFO', 'ROLE', 'MSG_COUNT']),
    ...mapGetters({
      USER_CONFIG: 'CONFIG'
    }),
    shortcuts () { // 登录栏的快捷入口
      return this.ROLE === 'member' ? CONFIG.member_shortCut : CONFIG.agent_shortCut
    }
  },
  created () {
    this.getVerifyCode()
    if (this.TOKEN) {
      this.getBalanceList()
    }
  },
  methods: {
    ...mapActions(['SET_LOGIN', 'SET_LOGOUT', 'SET_CONFIG']),
    ...mapMutations(['SET_LOADING']),
    showPupper (info) {
      this.notice = info
      this.dialogVisible = true
      console.log(1, this.dialogVisible)
    },
    async getVerifyCodeStatus () { // 0.0 获取该会员是否需要验证码
      await this.get(PATH_SELECTMEMCONFIG_LOGIN, {memberAccount: this.memberAccount}).then(res => {
        if (res.status) {
          this.verifyCodeShowStatus = !res.data.verifyCodeShowStatus
        } else {
          this.verifyCodeShowStatus = false
        }
      }, err => {
        console.log(err)
      })
    },
    getVerifyCode () { // 1 获取验证码配置项
      if (this.verifyCodeShowStatus) { // 是否显示验证码 &&  // 显示哪种种验证码 0-7
        switch (this.USER_CONFIG.verifyCodeMode) {
          case 0: // 字母验证码
          case 1: // 文字验证码
          case 2: // 数字计算验证码
            this.updateImgUrl()
            break
          default:
            this.updateImgUrl()
            break
        }
      } else {
        this.imgUrl = ''
      }
    },
    focus (e) {
      e.currentTarget.select()
    },
    updateImgUrl () { // 3.1 图像验证码
      // // console.log(1111111)
      this.ifFocus = true
      this.imgUrl = ''
      this.headers = {
        randomlogin: getUUID(),
        timestamp: new Date().getTime() + '' + Math.floor(Math.random() * 10000 * Math.random() * 10) // 可以封装函数, 无限随机
      }
      this.imgUrl = PATH_VERIFYCODE_IMAGE + '?type=char' + '&randomlogin=' + this.headers.randomlogin + '&timestamp=' + this.headers.timestamp + '&verifyType=' + (this.ROLE === 'agent' ? 1 : 1)
      // // console.log(this.imgUrl)
    },
    showNotice () { // 4 忘记密码联系客服弹窗
      this.$alert('将根据您提供的信息核对无异后提供账号', '请联系在线客服', {
        confirmButtonText: '立即联系',
        type: 'warning',
        center: true,
        callback: () => {
          void (0)
        }
      })
    },
    async loginNow () { // 5 用户登录
      await this.getVerifyCodeStatus()
      // document.documentElement.style.setProperty(`--color-login-bg`,'#F00')
      if (this.memberAccount && this.memberPassword) {
        if (!this.verifyCodeShowStatus || (this.verifyCodeShowStatus && this.verifyCode)) {
          let payload = {
            memberAccount: this.memberAccount, // 登录账号
            memberPassword: this.memberPassword, // 登录密码
            verifyCode: this.verifyCode // 验证码
          }

          let agentPayload = {
            agentAccount: this.memberAccount, // 登录账号
            agentPassword: this.memberPassword, // 登录密码
            loginVerifyCode: this.verifyCode // 验证码
          }
          if (await this.SET_LOGIN({user: this.ROLE === 'member' ? payload : agentPayload, header: this.headers})) {
            this.$message.success('恭喜您登陆成功！')
            this.getBalanceList()
          } else {
            this.updateImgUrl()
          }
        } else {
          this.updateImgUrl()
        }
      } else {
        this.$message({
          type: 'warning',
          message: '账号密码不能为空'
        })
      }
    },
    getPlatform () { // 6.1 用户各平台账户余额panel
      if (!this.oneTime) {
        this.get(PATH_GAMEPLATFORM_PAY, {}).then(res => {
          this.platformList = res.data
          this.oneTime = true
        }, err => {
          this.$message.error(err)
        })
      }
    },
    getBalanceList () {
      this.post(PATH_WALLATBALANCE_PAY, {}).then(res => {
        this.cash = parseFloat(res.data.amount).toFixed(2)
        this.discount = parseFloat(res.data.giveTotal).toFixed(2)
        this.points = parseFloat(res.data.integralTotal).toFixed(2)
      }, err => {
        this.$message.error(err)
      })
    },
    loadBalance (item, i) { // 6.2 用户各平台账户余额panel余额加载
      let payload = {
        toProviderCode: item.code,
        toProvidersId: item.id
      }
      this.$set(this.loading, i, true) // 刷新按钮选择开始
      this.post(PATH_BALANCE_PAY, payload).then(res => {
        this.$set(this.loading, i, false)
        this.platformList[i].platformBalance = res.data
        this.$refs.balance[i].innerHTML = parseFloat(res.data).toFixed(2)
      }, err => {
        this.$message.error(err)
      })
    },
    loadAllBalance () {
      this.platformList.map((obj, index) => {
        this.loadBalance(obj, index)
      })
    },
    handleReceive (item, i) { // 单平台回收
      // console.log(item)
      const payload = {
        providersId: item.id
      }
      const path = PATH_RECOVERY_PAY
      this.$set(this.loading1, i, true) // 刷新按钮选择开始
      this.$notify.success({
        title: '获取数据',
        message: '目前正在回收余额请稍后查看'
      })
      this.get(path, payload).then(res => {
        this.$set(this.loading1, i, false) // 刷新按钮选择开始
        if (res.status) {
          this.$message({
            type: 'success',
            message: '恭喜您回收成功'
          })
        }
      }, err => {
        this.$message.error(err)
        this.$notify.success({
          title: '回收失败',
          message: '目前该平台正在维护'
        })
      })
    },
    handleRecovery () { // 一键回收
      this.recoveryLoading = true
      this.$notify.success({
        title: '获取数据',
        message: '目前正在回收余额请稍后查看'
      })
      this.get(PATH_RECOVERY_PAY, {}).then(res => {
        this.recoveryLoading = false
        if (res.status) {
          this.$message({
            type: 'success',
            message: '恭喜您回收成功'
          })
        } else {
          this.$message({
            type: 'success',
            message: res.msg
          })
        }
      }, err => {
        console.log(err)
        this.recoveryLoading = false
        this.$notify.success({
          title: '回收失败',
          message: '部分平台正在维护，请手动回收资金'
        })
      })
    },
    logOut () { // 7用户登出
      let self = this
      self.SET_LOGOUT().then((res) => {
        self.$message.success('退出成功')
        setTimeout(function () {
          // console.log({path: `/${self.ROLE}/index`})
          self.$router.push({path: `/${self.ROLE}/index`})
          self.updateImgUrl()
        }, 500)
      })
    },
    jumpTo (path) { // 8 路由跳转公共方法
      this.jumpRoute = path
      this.$router.push({
        name: path
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "~@/assets/styles/global";
  .noc-tooltips{
    height: 45px;
    line-height: 45px;
    min-width: 1200px;
    @include color-login-bg;
    overflow: hidden;
    .tooltipsContent{
      width: 80%;
      min-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      overflow: hidden;
    }
    .scroll{
      flex: 1;
      display: flex;
      text-align: left;
      height: 43px;
      .swiper-container{
        margin: 0;
      }
      .date{
        margin-left: 20px;
      }
    }
    .msg{
      i{
        vertical-align: top;
      }
      text-align: left;
    }
    .memberDetails{
      flex: 1;
      overflow: hidden;
      ul{
        float: right;
        display: flex;
        li{
          position: relative;
          margin: 0 10px;
          .badge{
            position: absolute;
            line-height: 12px;
            right: -12px;
            top: 5px;
            background-color: red;
            padding: 2px;
            border-radius: 20px;
          }
          a{
            color: #ccc;
            &:before{
              content: '|';
              color: #691c5e;
              display: inline-block;
              transform: translateX(-10px);
            }
            &:hover{
              color: #fff;
            }
            &.active{
              color: #eb844c;
              &::after {
                content: "";
                height: 2px;
                background-color: #eb844c;
                position: absolute;
                width: 100%;
                bottom: 0px;
              }
            }
          }
        }
      }
    }
    .homeLogin{
      .verifyCode{
        line-height: 40px;
        input{
          width: 115px;
        }
        .verifyCodeImg{
          width: 120px;
          height: 34px;
          border: 1px solid #691c5e;
          display: inline-block;
          vertical-align: top;
          margin-top: 3px;
          overflow: hidden;
          img{
            transform: translateY(-7px);
            cursor: pointer;
            vertical-align: top;
          }
        }
      }
      .forgetPwd{
        cursor: pointer;
      }
      button{
        cursor: pointer;
        height: 36px;
        margin: 0;
        color: #fff;
        padding: 2px 10px;
        outline: none;    //消除默认点击蓝色边框效果
        background-color: #1c0919;
        border: 1px solid #691c5e;
        &:hover{
          background-color: #691c5e;
        }
      }
      div{
        display: inline-block;
        position: relative;
        input{
          padding: 2px 5px;
          width: 204px;
          height: 30px;
          background-color: #1c0919;
          border: 1px solid #691c5e;
          color: #fff;
        }
        span{
          position: absolute;
          right: 10px;
          color: #fff;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
          color: #ccc;
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #ccc;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #ccc;
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
          color: #ccc;
        }
      }
    }

  }
  .el-popover{
    .walletPanel{
      background-color: #2B0630;
      line-height: 30px;
      .balance{
        display: flex;
        justify-content: space-between;
        padding: 10px 20px;
        div{
          color: white;
          font-size: 13px;
        }
      }
      .recycle{
        background-color: #130413;
        text-align: center;
        padding: 10px 20px;
      }
      .platformList{
        background-color: #130413;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        padding: 10px 20px;
        min-height: 300px;
        .platform{
          width: 50%;
          span{
            text-indent: 1em;
            display: inline-block;
            width: 73%;
            color: white;
            a{
              color: #D4A502;
            }
          }
          i{
            cursor: pointer;
            vertical-align: baseline;
            font-size: 18px;
            color: white;
          }
          i.balanceLoading{
            animation: rotate 2s infinite;
          }
          i.receive{
            color: yellow;
          }
        }
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
