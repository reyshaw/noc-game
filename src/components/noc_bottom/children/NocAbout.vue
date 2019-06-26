<template>
  <div class="about-wrapper">
    <div class="content">
      <div class="column">
        <h2>联系与合作</h2>
        <ul>
          <li v-for="(contact, idx) in contacts" :key="idx"><i :class="['iconfont', contact.icon]"></i>{{contact.label}}</li>
          <li class="last">
            <ol>
              <li v-scale v-pointer v-for="(pay, idx) in payments" :key="idx">
                <img :src="require(`@/assets/imgs/footer/${pay}.png`)" :alt="pay">
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <div class="column">
        <h2>手机平台</h2>
        <div class="app-box">
          <div class="app-logo" v-scale v-pointer>
            <img src="~@/assets/imgs/footer/oggame.png">
          </div>
          <div class="app-desc">
            <p>随时随地，手机投注</p>
            <p>Mobile Betting</p>
            <p>
              <button v-on:click="onTry">试玩体验</button>
              <i class="iconfont iconandroid"></i>
              <i class="iconfont iconiOS"></i>
            </p>
          </div>
        </div>
        <ul>
          <li class="single">本产品支持所有 iOS 和 Android 移动设备</li>
        </ul>
        <h3>东方游戏在 <strong v-scale v-pointer><img src="" alt=""></strong> 的授权下部署</h3>
      </div>
      <div class="column">
        <h2>Q&A</h2>
        <ul>
          <li class="a-box">
            <router-link v-for="(link, idx) in routerLinks"
                         :to="link.url"
                         :target="link.target"
                         :key="idx">{{link.label}}</router-link>
          </li>
        </ul>
        <h4>浏览器</h4>
        <h5>本游戏产品支持以下的浏览器：</h5>
        <ol class="browsers">
          <li v-scale v-pointer v-for="(browser, idx) in browsers" :key="idx">
            <img :src="require(`@/assets/imgs/footer/browser-${browser}.png`)">
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import CONFIG from './nocAbout.config'
export default {
  name: 'noc_about',
  data () {
    return {
      ...CONFIG
    }
  },
  methods: {
    onTry () {
      alert('try')
    }
  }
}
</script>

<style lang="scss" scoped>
.about-wrapper{
  width: 100%;
  height: 399px;
  background: url("../../../assets/imgs/about_bak.png") no-repeat center center;
  background-size: cover;
  .content {
    width: 1200px;
    height: 399px;
    margin: 0 auto;
    .column {
      width: 400px;
      height: 300px;
      float: left;
      box-sizing: border-box;
      margin-top: 50px;
      color: #eee480;
      h2 {
        font-size: 20px;
        font-weight: 500;
        font-family: '微软雅黑'
      }
      h3 {
        margin-top: 15px;
        width: 300px;
        font-size: 14px;
        text-align: center;
        line-height: 60px;
        strong {
          display: inline-block;
          width: 62px;
          height: 62px;
          border-radius: 50%;
          margin: 0 5px;
          background: url("../../../assets/imgs/footer/pagcor.png") no-repeat center center;
          background-size: cover;
          img {
            width: 100%;
          }
        }
      }
      h4 {
        margin-top:20px;
        font-size: 20px;
      }
      h5 {
        margin-top: 15px;
        font-size: 16px;
      }
      .app-box {
        margin-top: 25px;
        width: 315px;
        border-bottom: 1px solid #49473f;
        .app-logo {
          width: 96px;
          height: 96px;
          border-radius: 10px;
          float: left;
          display: inline-block;
          margin-left: 20px;
          margin-right: 20px;
        }
        .app-desc {
          margin-bottom: 20px;
          p {
            font-size: 14px;
            line-height: 21px;
            text-indent: 20px;
            margin-top: 10px;
            button {
              height: 26px;
              width: 84px;
              border-radius: 15px;
              background: none;
              color: #eee480;
              outline: none;
              border: 1px solid #c4b411;
              cursor: pointer;
            }
          }
        }
      }
      .browsers {
        li {
          float: left;
          margin: 15px 3px;
          i {
            font-size: 30px;
          }
        }
      }
      ul {
        width: 315px;
        margin-top: 10px;
        li {
          border-bottom: 1px solid #49473e;
          font-size: 14px;
          height: 49px;
          line-height: 49px;
          font-family: '微软雅黑';
          i {
            width: 50px;
            display: inline-block;
            text-align: center;
          }
          &.last {
            border: none;
          }
          &.single {
            text-align: center;
            margin-top: -10px;
          }
          &.a-box {
            height: 114px;
            line-height: 24px;
            text-align: center;
            a {
              display: inline-block;
              width: 102px;
              color: #eee480;
              font-size: 14px;
              padding-top: 10px;
              &:hover {
                text-decoration: underline;
              }
              &:nth-child(3n) {
                text-align: right;
              }
              &:nth-child(3n-2) {
                text-align: left;
              }
            }
          }
          ol {
            li {
              float: left;
              border: none;
              margin-left: 14px;
            }
          }
        }
      }
      &:last-child {
        padding-left: 84px;
      }
      &:nth-child(2) {
        padding-left: 42px;
      }
    }
  }
}
</style>
