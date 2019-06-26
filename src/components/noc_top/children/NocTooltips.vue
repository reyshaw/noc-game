<template>
  <div class="wrapper">
    <div class="scroll">
      <div class="msg">
        <i class="iconfont icongonggao"></i>
        <span>最新公告 ： </span>
      </div>
      <vue-seamless :data="listData" :class-option="{singleHeight: 45,waitTime: 5000}" class="seamless-warp">
        <ul class="item">
          <li v-for="(item, index) in listData" :key="index">
            <span class="title" v-text="item.title"></span><span class="date" v-text="item.date"></span>
          </li>
        </ul>
      </vue-seamless>
    </div>
    <div class="homeLogin" v-if="!TOKEN">
      <div><input type="text" v-model="memberAccount" placeholder="会员账号"><span class="forgetPwd" @click="showNotice">忘记?</span></div>
      <div><input type="password" v-model="memberPassword" placeholder="登录密码"><span class="forgetPwd" @click="showNotice">忘记?</span></div>
      <div class="verifyCode" v-if="USER_CONFIG.showVerify">
        <input type="text" ref="verifyInput" v-model="verifyCode" @blur="ifFocus = false" @focus="focus" v-focus="ifFocus" placeholder="请输入验证码">
        <div class="verifyCodeImg"><img :src="imgUrl" alt="验证码" @click="updateImgUrl"></div>
      </div>
      <button @click="loginNow">立即登录</button>
      <button @click="jumpTo('register')">免费注册</button>
    </div>
    <div class="memberDetails" v-if="TOKEN">
      <ul>
        <!--<li>{{memberInfo.memberRealName}}</li>--> <!--memberAccount-->
        <li v-for="(shortcut, idx) in shortcuts" :key="idx">
          <a href="javascript:void(0);" @click="jumpTo(`${shortcut.route}`)">{{shortcut.label}}
            <span class="badge" v-if="shortcut.label==='我的消息'">{{20}}</span>
          </a>
        </li>
        <li>
          <el-popover
            placement="bottom"
            width="400"
            trigger="hover">
            <div class="walletPanel">
              <div class="balance">
                <div>现金余额：{{this.cash}}</div>
                <div>优惠余额：{{this.discount}}</div>
                <div>积分余额：{{this.points}}</div>
              </div>
              <div class="recycle"><span>一键回收</span><i class="iconfont iconhuishou"></i></div>
              <div class="platformList">
                <div class="platform" v-for="(item, index) in platformList" :key="index">
                  <span>{{item.cnName}}：<a href="javascript: void(0);" ref="balance" @click="loadBalance(item,index)">点击查看</a></span>
                  <i class="el-icon-refresh" @click="loadBalance(item,index)"></i>
                  <i class="iconfont iconhuishou"></i>
                </div>
              </div>
            </div>
            <a slot="reference" href="javascript:void(0);" @mouseover="getPlatform">我的钱包<i class="el-icon-caret-bottom"></i></a>
          </el-popover>
        </li>
        <li><a href="javascript:void(0);" @click="logOut">退出</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import vueSeamless from 'vue-seamless-scroll'
import {
  PATH_VERIFYCODE_IMAGE
  // PATH_MEMBERLOGIN_LOGIN
} from '@/service/member/urls.js'
import {
  PATH_GAMEPLATFORM_PAY,
  PATH_BALANCE_PAY,
  PATH_WALLATBALANCE_PAY
} from '@/service/member/member_center.url.js'
import {getUUID} from '@/assets/scripts/utils'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import CONFIG from './nocTooltips.config'

export default {
  name: 'noc_tooltips',
  components: {
    vueSeamless
  },
  data () {
    return {
      ifFocus: false, // 是否聚焦
      memberAccount: 'double1', // 设置默认
      memberPassword: '123123', // 默认密码
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
      oneTime: false
    }
  },
  computed: {
    ...mapGetters(['TOKEN', 'memberInfo', 'ROLE']), // 'GET_MSG_COUNT'
    ...mapGetters({
      USER_CONFIG: 'CONFIG'
    }),
    shortcuts () { // 登录栏的快捷入口
      return this.ROLE === 'member' ? CONFIG.member_shortCut : CONFIG.agent_shortCut
    }
  },
  created () {
    this.updateImgUrl()
    this.getVerifyCode()
  },
  methods: {
    ...mapActions(['SET_LOGIN', 'SET_LOGOUT', 'SET_CONFIG']),
    ...mapMutations(['SET_LOADING']),
    async getVerifyCode () { // 1 获取验证码配置项
      // await this.SET_CONFIG()
      // if (this.USER_CONFIG.showVerify) { // 是否显示验证码 &&  // 显示哪种种验证码 0-7
      //   switch (this.USER_CONFIG.verifyType) {
      //     case '0': // 字母验证码
      //     case '1': // 文字验证码
      //     case '2': // 数字计算验证码
      //       this.updateImgUrl()
      //       break
      //     default:
      //       break
      //   }
      // } else {
      //   this.imgUrl = ''
      // }
    },
    focus (e) {
      e.currentTarget.select()
    },
    updateImgUrl () { // 3.1 图像验证码
      this.ifFocus = true
      this.imgUrl = ''
      this.headers = {
        randomlogin: getUUID(),
        timestamp: new Date().getTime() + '' + Math.floor(Math.random() * 10000 * Math.random() * 10) // 可以封装函数, 无限随机
      }
      this.imgUrl = PATH_VERIFYCODE_IMAGE + '?type=char' + '&randomlogin=' + this.headers.randomlogin + '&timestamp=' + this.headers.timestamp + '&verifyType=' + (this.ROLE === 0 ? '1' : 3)
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
      if (this.memberAccount && this.memberPassword) {
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
          console.log(err)
        })
      }
      this.post(PATH_WALLATBALANCE_PAY, {}).then(res => {
        this.cash = parseFloat(res.data.amount).toFixed(2)
        this.discount = parseFloat(res.data.giveTotal).toFixed(2)
        this.points = parseFloat(res.data.integralTotal).toFixed(2)
      }, err => {
        console.log(err)
      })
    },
    loadBalance (item, i) { // 6.2 用户各平台账户余额panel余额加载
      let payload = {
        toProviderCode: item.code,
        toProvidersId: item.id
      }
      this.post(PATH_BALANCE_PAY, payload).then(res => {
        this.platformList[i].platformBalance = res.data
        this.$refs.balance[i].innerHTML = parseFloat(res.data).toFixed(2)
      }, err => {
        console.log(err)
      })
    },
    logOut () { // 7用户登出
      let self = this
      self.SET_LOGOUT().then((res) => {
        console.log(res)
        self.$message.success('退出成功')
        setTimeout(function () {
          const route = self.ROLE === 'member' ? 'index' : 'agent_index'
          self.$router.push({name: route})
          self.updateImgUrl()
        }, 500)
      })
    },
    jumpTo (path) { // 8 路由跳转公共方法
      this.$router.push({
        name: path
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .wrapper{
    height: 45px;
    line-height: 45px;
    min-width: 1650px;
    background-color: #3d0335;
    display: flex;
    justify-content: center;
    overflow: hidden;
    .msg{
      i{
        vertical-align: top;
      }
      text-align: left;
    }
    .memberDetails{
      width: 672px;
      ul{
        display: flex;
        li{
          position: relative;
          margin: 0 17px;
          .badge{
            position: absolute;
            line-height: 12px;
            right: -18px;
            top: 13px;
            background-color: red;
            padding: 2px;
            border-radius: 20px;
          }
          a{
            color: #ccc;
            &:hover{
              color: #fff;
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
    .scroll{
      width: 825px;
      display: flex;
      text-align: left;
      .seamless-warp {
        height: 229px;
        overflow: hidden;
        .title{
          cursor: pointer;
        }
      }
      .date{
        margin-left: 20px;
      }
    }
  }
  .el-popover{
    .walletPanel{
      line-height: 28px;
      .balance{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #999999;
      }
      .recycle{
        border-bottom: 1px solid #999999;
        text-align: right;
        padding-right: 20px;
        font-size: 20px;
        i{
          vertical-align: middle;
          font-size: 20px;
        }
      }
      .platformList{
        display: flex;
        flex-wrap: wrap;
        .platform{
          border-bottom: 1px dashed #999999;
          width: calc(50% - 2px);
          border-right: 1px dashed #999999;
          border-left: 1px dashed #999999;
          span{
            text-indent: 1em;
            display: inline-block;
            width: 73%;
            border-right: 1px dashed #999999;
          }
          i{
            cursor: pointer;
            vertical-align: baseline;
            font-size: 18px;
          }
        }
        .platform:nth-child(2n){
          border-right: none;
        }
        .platform:nth-child(2n-1){
          border-left: none;
          border-right: none;
        }
        .platform:nth-last-child(1){
          border-bottom: none;
        }
        .platform:nth-last-child(2){
          border-bottom: none;
        }
      }
    }
  }
</style>
