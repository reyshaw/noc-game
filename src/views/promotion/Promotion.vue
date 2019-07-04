<template>
  <div class="wrapper">
    <header class="header">
      <div class="img"></div>
    </header>
    <main class="content">
      <nav class="category">
        <ol>
          <li v-for="(li, idx) in promCategory" :key="idx" :class="{active: idx === currentMenu}" v-pointer @click="onMenu(li.dictKey, idx)">{{li.dictVal}}</li>
          <li>
            <el-input placeholder="请输入活动名称" v-model="postData.promotionTitle">
              <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
            </el-input>
          </li>
        </ol>
      </nav>
      <article class="list">
        <ul>
          <li v-for="(li, idx) in promList" :key="idx">
            <img src="../../assets/imgs/prom/prom-demo.jpg" alt="活动图片"><!--require(li.imgUrl)-->
            <p>
              <strong>{{li.promotionTitle}}</strong>
              <span>活动时间:{{li.promotionStartTime}}-{{li.promotionEndTime}}<strong ref="detail" v-pointer @click="onDetail(li)">活动详情 &gt;</strong></span>
            </p>
            {{li.label}}
          </li>
        </ul>
        <div class="no-result" v-if="showNoresult">没有数据了</div>
        <div class="panelFoot" ref="panelFoot">
          <div class="loading" v-if="loadingGame">
            <div class="loadingPoint">
              <span class="leftPoint points"></span>
              <span class="rightPoint points"></span>
            </div>
            <div class="loadingTips" v-text="'正在加载更多'">
            </div>
          </div>
        </div>
      </article>
    </main>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="1200px"
      :before-close="handleClose">
      <div class="dialog-content">
        <h1>{{currentActivity.promotionTitle}}</h1>
        <p class="date">活动时间：{{currentActivity.promotionStartTime || 'xxxx-xx-xx'}}到{{currentActivity.promotionEndTime || 'xxxx-xx-xx'}}</p>
        <div class="top-banner">
          <div class="left"></div>
          <div class="right">
            <h2>其他活动</h2>
            <ul>
              <li v-for="item in 4" :key="item">
                <p></p>
                <p>优惠升级 报喜不断</p>
              </li>
            </ul>
            <div class="spread">
              <div class="img"></div>
              <div class="download">
                <p>宣传单</p>
                <p>东方传奇 巅峰让利</p>
                <p><button>下载</button></p>
              </div>
            </div>
            <button class="join">我要参与</button>
          </div>
        </div>
        <div class="items">
          <p>优惠活动条款：</p>
          <p>1.需将电脑版CQ9电子图标放在电子类二级导航栏第一顺位</p>
          <p>2.需将手机版CQ9电子图标放在电子类第一顺位</p>
          <p>3.需将电脑版/手机版CQ9电子《东方发发发》《东方传奇》两款游戏顺放第一，第二位</p>
          <p>4.当CQ9电子累计有效投注达到活动规定数额后，CQ9电子在原有我司实际占成的基础上再给予不同%优惠</p>
          <p>5.运营商网站上的测试账户不包括在每月营业额的计算中 </p>
          <p>6.所有被发现作弊或篡改的经营者将自动取消资格参加此促销活动 </p>
        </div>
        <div class="activity-content">
          <p>活动详情：</p>
          <p>当CQ9电子累计有效投注达到活动规定数额后，CQ9电子在原有我司实际占成的基础上再给予不同%优惠，具体标准如下：</p>
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>CQ9电子当月有效投注</th>
                <th>CQ9电子享受我司实际占成优惠% </th>
                <th>活动有效期</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>1000</td>
              <td>50% </td>
              <td>90天</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {PATH_ACTI_LIST} from '@/service/member/urls'
export default {
  name: 'promotion',
  data () {
    return {
      loadingGame: false, // 加载更多
      showNoresult: false, // 没有更多数据
      dialogVisible: false, // 对话框
      scroll: 0, // 滚动的距离
      currentMenu: 0, // 当前菜单
      currentActivity: '', // 当前活动
      promCategory: [
        {dictVal: '热门活动', dictKey: '0'},
        {dictVal: '最新活动', dictKey: '1'},
        {dictVal: '真人活动', dictKey: '2'},
        {dictVal: '电子活动', dictKey: '3'},
        {dictVal: '体育活动', dictKey: '4'},
        {dictVal: '彩票活动', dictKey: '5'},
        {dictVal: '捕鱼活动', dictKey: '6'},
        {dictVal: '竞技活动', dictKey: '7'},
        {dictVal: '全部活动', dictKey: '8'}
      ], // 菜单列表
      promList: [
        {promotionTitle: '东方传奇 巅峰让利', value: 'activity', promotionStartTime: '2019.05.01', promotionEndTime: '2019.05.30', imgUrl: '../../assets/imgs/prom/prom-demo.jpg'},
        {promotionTitle: '东方传奇 巅峰让利', value: 'activity', promotionStartTime: '2019.05.01', promotionEndTime: '2019.05.30', imgUrl: '../../assets/imgs/prom/prom-demo.jpg'},
        {promotionTitle: '东方传奇 巅峰让利', value: 'activity', promotionStartTime: '2019.05.01', promotionEndTime: '2019.05.30', imgUrl: '../../assets/imgs/prom/prom-demo.jpg'}
      ], // 活动列表
      postData: {
        promotionTitle: '', // 活动主题
        enableStatus: '', // 启用状态
        promotionActivityType: '', // 优惠活动类型 0存送优惠 1有效投注 2推荐好友 3注册优惠 4登录优惠 5救援金 6文本活动
        promotionEndTime: '', // 活动开始时间
        promotionStartTime: '', // 活动结束时间
        pageDomain: {
          pageNum: 1,
          pageSize: 30
        }
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.scrollDs, true)
    this.fetchData()
  },
  mounted () {
    let self = this
    self.setPosition(window.innerWidth)
    window.addEventListener('resize', function () {
      self.setPosition(window.innerWidth)
    }, false)
  },
  methods: {
    onSearch () { // 搜索
      if (this.postData.promotionTitle) {
        this.fetchData()
      }
    },
    onMenu (dictKey, idx) { // 活动菜单
      this.postData.promotionActivityType = dictKey
      this.fetchData()
      this.currentMenu = idx
    },
    handleClose () {
      this.dialogVisible = false
    },
    onDetail (li) {
      this.currentActivity = li
      this.dialogVisible = true
    },
    fetchData () {
      this.loadingGame = true
      this.showNoresult = false
      this.post(PATH_ACTI_LIST, this.postData).then(res => {
        this.promCategory = res.data.filter.gameType
        this.promList = res.data.list
        if (!this.promList.length) {
          this.showNoresult = true
        } else {
          this.showNoresult = false
        }
        this.loadingGame = false
      }, err => {
        this.loadingGame = false
        this.$message.error(err)
      })
    },
    setPosition (width) { // 根据页面宽度设置 活动详情 的位置
      let self = this
      if (width <= 1600) {
        let detail = self.$refs['detail']
        detail.forEach((item, index) => {
          detail[index].style.marginTop = '-20px'
        })
      } else {
        let detail = self.$refs['detail']
        detail.forEach((item, index) => {
          detail[index].style.marginTop = '-2px'
        })
      }
    },
    scrollDs () { // 滚动获取更多游戏
      this.scroll = this.$refs.panelFoot.getBoundingClientRect().top
      if (this.scroll < 750 && this.promList.length === this.postData.pageDomain.pageSize) {
        this.loadingGame = true
      }
    }
  },
  watch: {
    loadingGame (newVal, oldVal) {
      if (newVal) {
        this.postData.pageDomain.pageNum++
        this.fetchData()
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    window.removeEventListener('scroll', this.scrollDs, true)
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @keyframes left
  {
    0% {transform:translate(0px)}
    10% {z-index: 2}
    50% {transform:translate(18px)}
    90% {z-index: 1}
  }
  @keyframes right
  {
    0% {transform:translate(0px)}
    10% {z-index: 1}
    50% {transform:translate(-18px)}
    90% {z-index: 2}
  }
  .wrapper {
    width: 100%;
    height: auto;
    header.header {
      div.img {
        width: 100%;
        height: 400px;
        background: url("../../assets/imgs/prom/banner-bg.jpg") no-repeat center center;
      }
    }
    main.content {
      display: inline-block;
      width: 100%;
      nav, article {
        display: block;
        ol, ul {
          position: relative;
          width: 90%;
          min-width: 1200px;
          height: auto;
          margin: 0 auto;
          display: flex;
        }
        &.category {
          height: 68px;
          border-top: 1px solid #103752;
          border-bottom: 1px solid #103752;
          background: radial-gradient(#03172b -50%, #0f0f39 100%);
          box-sizing: border-box;
          ol {
            height: 68px;
            li {
              line-height: 68px;
              color: #fff;
              font-size: 16px;
              overflow: hidden;
              box-sizing: border-box;
              padding: 0 20px;
              height: 66px;
              &:hover, &.active {
                background: #2e3192;
              }
              &:last-child {
                position: absolute;
                right: 0;
                &:hover {
                  background: none;
                }
              }
            }
          }
          p {
            position: absolute;
            right: 0;
            top: 0;
          }
        }
        &.list {
          background: linear-gradient(#010f1d, #17041b);
          ul {
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
          }
          ul li {
            flex: 0 0 19%;
            border: 1px solid #9e9e9f;
            box-sizing: border-box;
            margin: 20px 0;
            margin-right: 1%;
            height: auto;
            float: left;
            border-radius: 1px;
            position: relative;
            img {
              width: 100%;
            }
            p {
              width: 100%;
              height: 50px;
              background: linear-gradient(bottom, rgba(0,0,0,1), rgba(0,0,1,0.7));
              color: #fff;
              font-size: 14px;
              text-indent: 10px;
              position: absolute;
              bottom: 0;
              box-sizing: border-box;
              padding-top: 5px;
              span {
                display: block;
                font-size: 12px;
                strong {
                  float: right;
                  margin-top: -2px;
                }
              }
              strong {
                font-weight: bold;
                font-size: 14px;
              }
            }
            &:hover {
              border: 1px solid #ffea00;
            }
          }
          .no-result {
            height: 80px;
            line-height: 80px;
            color: #fff;
            text-align: center;
          }
          .panelFoot{
            .loading{
              width: 215px;
              height: 80px;
              text-align: center;
              margin: 0 auto;
              .loadingPoint{
                position: relative;
                .points{
                  display: inline-block;
                  width: 15px;
                  height: 15px;
                  border-radius: 8px;
                }
                .leftPoint{
                  position: absolute;
                  left: 42%;
                  background-color: #b496c2;
                  animation:left 1s;
                  animation-timing-function:linear;
                  animation-iteration-count:infinite;
                }
                .rightPoint{
                  position: absolute;
                  left: 50%;
                  background: #60336a;
                  animation:right 1s;
                  animation-iteration-count:infinite;
                  animation-timing-function:linear;
                }
              }
              .loadingTips{
                padding-top: 30px;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }

  .dialog-content {
    h1 {
      font-size: 32px;
      text-align: center;
      color: #000;
    }
    .date {
      font-size: 20px;
      text-align: center;
      line-height: 35px;
    }
    .top-banner {
      display: inline-block;
      width: 100%;
      .left {
        width: 70%;
        height: 710px;
        background: blue;
        float: left;
      }
      .right {
        width: 28%;
        height: 710px;
        float: right;
        /*background: red;*/
        h2 {
          height: 40px;
          line-height: 40px;
          font-size: 20px;
          text-indent: 20px;
        }
        ul {
          li {
            display: inline-block;
            p {
              float: left;
              margin: 10px;
              &:first-child {
                width: 80px;
                height: 80px;
                background: #3d0335;
                float: left;
              }
            }
          }
        }
        .spread {
          display: inline-block;
          width: 100%;
          border-top: 1px solid #e0e0e0;
          .img {
            background: yellow;
            width: 140px;
            height: 180px;
            margin-top: 20px;
            margin-left:20px;
            float: left;
          }
          .download {
            margin-top: 50px;
            text-indent: 20px;
            p {
              font-size: 15px;
              &:first-child {
                font-size: 18px;
                color: #020202;
                margin-bottom: 30px;
              }
              button {
                width: 100px;
                height: 40px;
                border-radius: 20px;
                outline: none;
                border: none;
                background: #3a82f7;
                color: #fff;
                font-size: 18px;
                margin-top: 15px;
              }
            }
          }
        }
        button.join {
          width: 200px;
          height: 55px;
          border-radius: 30px;
          outline: none;
          border: none;
          background: #df2413;
          color: #fff;
          font-size: 20px;
          display: inline-block;
          margin-left: 60px;
          margin-top: 30px;
        }
      }
    }
    .items, .activity-content {
      box-sizing: border-box;
      text-indent: 100px;
      margin: 10px 0;
      p {
        font-size: 18px;
        color: #020202;
        line-height: 30px;
      }
      table {
        text-align: center;
        border: 1px solid #000;
        margin: 20px auto;
        width: 80%;
      }
    }
  }
</style>
