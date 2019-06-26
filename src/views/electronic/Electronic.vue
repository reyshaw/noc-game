<template>
  <div class="wrapper">
    <div class="banner">
      <div class="block">
        <el-carousel height="400px">
          <el-carousel-item v-for="item in 4" :key="item">
            <img src="../../assets/imgs/electric/banner.png" alt="" style="width: 100%;height: 100%;min-width: 1650px;">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="content">
      <div class="tray"><img src="../../assets/imgs/electric/layer.png" alt="" style="width: 100%;height: 100%;min-width: 1650px;"></div>
      <div class="container">
        <div class="hotGameIcon">
          <p><img src="../../assets/imgs/electric/hotGameTitle.gif" alt=""></p>
          <p><img src="../../assets/imgs/electric/lightLine.gif" alt=""></p>
        </div>
        <div class="hotGame">
          <ul>
            <li v-for="(item, index) in hotGames" :key="index" :style="'animation-delay: '+index+'00ms;animation-fill-mode: backwards!important;'">
              <div class="layer">
                <button class="enterGame gameJump" @click="enterGame(item.gameId)">进入游戏</button>
                <button class="tryGame gameJump">试玩体验</button>
              </div>
              <p><img style="width: 105px;" class="imgs" :src="item.gameImageUrl" alt="游戏图片"></p>
              <p class="gameName"><span>{{item.cnname || item.name}}</span></p>
            </li>
          </ul>
        </div>
        <div class="gamePanel">
          <div class="panelHead">
            <div class="platformList">
<!--              <vue-seamless :class-option="optionSwitch1" class="seamless-wrap3">-->
<!--                <i slot="left-switch" class="el-icon-arrow-left"></i>-->
<!--                <i slot="right-switch" class="el-icon-arrow-right"></i>-->
<!--                <ul class="item">-->
<!--                  <li v-for="(item, index) in platformList" :key="index" :class="{active:active === index}" @click="changePlatform(item.id, index)">-->
<!--                    <img src="" alt="">-->
<!--                    <span>{{item.name}}</span>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </vue-seamless>-->
              <swiper :options="swiperOption">
                <swiper-slide v-for="(item, index) in platformList" :key="index">
                  <div :class="{active: active===index, btm:true}" @click="changePlatform(item.id, index)">
                    <img :src="'http://172.16.135.103/ui/gfx_frontend/slot_games/'+ item.name +'_logo.png'" alt="">
                    <span>{{item.name.toUpperCase()}} 电子</span>
                    <span>{{item.name.toUpperCase()}} CASINO</span>
                  </div>
                </swiper-slide>
              </swiper>
              <div class="swiper-button-prev" slot="button-prev"><i class="iconfont iconlaydate-prev-m"></i></div>
              <div class="swiper-button-next" slot="button-next"><i class="iconfont iconlaydate-prev-m"></i></div>
            </div>
            <div class="condition">
              <div class="filter">
                <a href="javascript: void(0);" v-for="(item, index) in gameFilter" :key="index">{{item}}</a>
              </div>
              <div class="search">
                <input type="text">
                <button>搜索</button>
              </div>
            </div>
          </div>
          <div class="panelBody">
            <ul>
              <li v-for="(item, index) in panelGames" :key="index">
                <div class="layer">
                  <button class="enterGame gameJump" @click="enterGame(item.gameId)">进入游戏</button>
                  <button class="tryGame gameJump">试玩体验</button>
                </div>
                <p class="gamePic"><img style="width: 166px" :src="item.gameImageUrl" alt="游戏图片"></p>
                <p class="gameName"><span>{{item.cnname||item.name}}</span></p>
              </li>
            </ul>
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
          </div>
        </div>
      </div>
    </div>
    <div class="promote">
      <div class="jackpot">
        <count-to :value="367888995563.25" :start="366888995563.25" :time="20000000"></count-to>
        <div class="jackpotTitle"><span>中奖名称</span></div>
        <el-carousel :interval="2000" arrow="always" indicator-position="none" height="135px">
          <el-carousel-item  v-for="(item, index) in listData" :key="index">
            <p>恭喜会员{{item.memberName}}</p>
            <p>在{{item.platform}}平台</p>
            <p>{{item.game}}游戏中喜中大奖</p>
            <div class="jackpotBtm">
              <p><span>中奖金额</span><span>投注：{{item.bet}}</span></p>
              <p><span>{{item.val}}</span><span>大厅：{{item.platform}}</span></p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from './children/CountTo'
import {
  PATH_GAMEPLIST_GAME,
  PATH_GAMEPROVIDERSLIST_GAME,
  PATH_HOTGAMES_GAME,
  PATH_TAGLIST_GAME,
  PATH_LOGINURL_GAME
} from '@/service/member/urls.js'
import {mapGetters} from 'vuex'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'electronic',
  components: {
    CountTo,
    swiper,
    swiperSlide
  },
  computed: {
    ...mapGetters(['SUPER_IDS', 'TOKEN'])
  },
  data () {
    return {
      // merchantId: this.SUPER_IDS.merchantId,
      // shareholderId: this.SUPER_IDS.shareholderId,
      listData: [
        {memberName: '1零四章', platform: 'CQ9', game: '疯狂的猴子', bet: '20000', val: '100000'},
        {memberName: '2零四章', platform: 'CQ9', game: '疯狂的猴子', bet: '20000', val: '100000'},
        {memberName: '3零四章', platform: 'CQ9', game: '疯狂的猴子', bet: '20000', val: '100000'},
        {memberName: '4零四章', platform: 'CQ9', game: '疯狂的猴子', bet: '20000', val: '100000'},
        {memberName: '5零四章', platform: 'CQ9', game: '疯狂的猴子', bet: '20000', val: '100000'},
        {memberName: '6零四章', platform: 'CQ9', game: '疯狂的猴子', bet: '20000', val: '100000'},
        {memberName: '7零四章', platform: 'CQ9', game: '疯狂的猴子', bet: '20000', val: '100000'},
        {memberName: '7零四章', platform: 'CQ9', game: '疯狂的猴子', bet: '20000', val: '100000'}
      ],
      hotGames: [
        {imgUrl: 'https://og-middleware.s3.amazonaws.com/images/og/oglive.png', gameName: 'og视讯'},
        {imgUrl: 'https://og-middleware.s3.amazonaws.com/images/og/oglive.png', gameName: 'og视讯'},
        {imgUrl: 'https://og-middleware.s3.amazonaws.com/images/og/oglive.png', gameName: 'og视讯'},
        {imgUrl: 'https://og-middleware.s3.amazonaws.com/images/og/oglive.png', gameName: 'og视讯'},
        {imgUrl: 'https://og-middleware.s3.amazonaws.com/images/og/oglive.png', gameName: 'og视讯'},
        {imgUrl: 'https://og-middleware.s3.amazonaws.com/images/og/oglive.png', gameName: 'og视讯'},
        {imgUrl: 'https://og-middleware.s3.amazonaws.com/images/og/oglive.png', gameName: 'og视讯'},
        {imgUrl: 'https://og-middleware.s3.amazonaws.com/images/og/oglive.png', gameName: 'og视讯'},
        {imgUrl: 'https://og-middleware.s3.amazonaws.com/images/og/oglive.png', gameName: 'og视讯'}
      ],
      platformList: [],
      gameFilter: ['全部游戏', '热门游戏', '最新游戏'],
      panelGames: [],
      platformIdList: [],
      platformId: '',
      pageDomain: {
        pageNum: 0,
        pageSize: 24
      },
      loadingGame: false,
      active: 0,
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 0,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  created () {
    this.getPlatform()
    this.getHotGames()
    this.gameTags()
    window.addEventListener('scroll', this.scrollDs, true)
  },
  watch: {
    loadingGame (newVal, oldVal) {
      if (newVal) {
        this.getGameList()
      }
    }
  },
  methods: {
    scrollDs () { // 滚动获取更多游戏
      this.scroll = this.$refs.panelFoot.getBoundingClientRect().top
      if (this.scroll < 750) {
        this.loadingGame = true
      }
    },
    getHotGames () {
      let payload = {
        providerId: 4,
        gameType: 'rng',
        merchantId: this.SUPER_IDS.merchantId,
        shareholderId: this.SUPER_IDS.shareholderId,
        terminalType: '1',
        pageDomain: {
          pageNum: 1,
          pageSize: 9
        }
      }
      this.post(PATH_HOTGAMES_GAME, payload).then(res => {
        this.hotGames = res.data
      }, err => {
        console.log(err)
      })
    },
    gameTags () {
      let payload = {
        providerId: 4,
        merchantId: this.SUPER_IDS.merchantId,
        shareholderId: this.SUPER_IDS.shareholderId,
        terminalType: '1'
      }
      this.post(PATH_TAGLIST_GAME, payload).then(res => {
        console.log(res)
      }, err => {
        console.log(err)
      })
    },
    getPlatform () { // 获取游戏平台方法
      let payload = {
        category: 'rng',
        merchantId: this.SUPER_IDS.merchantId,
        shareholderId: this.SUPER_IDS.shareholderId,
        terminalType: '1'
      }
      this.post(PATH_GAMEPROVIDERSLIST_GAME, payload).then((res) => {
        this.platformList = res.data
        this.platformId = this.platformList[0].id
        this.getGameList()
      }, err => {
        console.log(err)
      })
    },
    changePlatform (id, i) {
      this.platformId = id
      this.active = i
      this.panelGames = []
      this.pageDomain = {
        pageNum: 0,
        pageSize: 24
      }
      this.getGameList()
    },
    getGameList () { // 获取游戏方法
      this.pageDomain = {
        ...this.pageDomain,
        pageNum: this.pageDomain.pageNum + 1
      }
      let payload = {
        category: 'rng',
        merchantId: this.SUPER_IDS.merchantId,
        providerId: this.platformId,
        shareholderId: this.SUPER_IDS.shareholderId,
        terminalType: '1',
        pageDomain: this.pageDomain
      }
      this.post(PATH_GAMEPLIST_GAME, payload).then((res) => {
        if (res.data.length > 0) {
          this.panelGames = this.panelGames.concat(res.data)
          console.log(this.panelGames)
          this.loadingGame = false
        } else {
          this.$refs.panelFoot.innerHTML = '<div class="loadingTips" style="text-align: center; color: #fff;line-height: 80px;">没有更多游戏了</div>'
        }
      }, err => {
        console.log(err)
      })
    },
    enterGame (gameId) { // 进游戏方法
      if (this.TOKEN) {
        let payload = {
          gameId,
          merchantId: this.SUPER_IDS.merchantId,
          shareholderId: this.SUPER_IDS.shareholderId,
          terminalType: '1',
          providerId: this.platformId
        }
        this.post(PATH_LOGINURL_GAME, payload).then((res) => {
          if (res.code === 200) {
            window.open(res.data, '_blank')
          }
        }, err => {
          console.log(err)
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请先登录'
        })
        // this.$store.commit(types.SHOWLOGINDIA, true)
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
.wrapper{
  position: relative;
  width: 100%;
  .banner{
    width: 100%;
    .el-carousel__item{
      background-color: #13101b;
    }
  }
  .content{
    width: 100%;
    overflow: hidden;
    background: url("../../assets/imgs/electric/bg5.png") 0 0 no-repeat, linear-gradient(#140523, #140523);
    background-size: 100%;
    .container{
      width: 1200px;
      margin: 35px auto;
      overflow: hidden;
      .hotGameIcon{
        float: left;
        text-align: center;
        margin-right: 20px;
        p:last-child{
          line-height: 68px;
        }
      }
      .hotGame{
        height: 170px;
        ul{
          display: flex;
          justify-content: space-between;
          li{
            animation: leftIn  .5s linear ;
            text-align: center;
            position: relative;
            img{
              transition: .1s ease-in-out;
            }
            p:last-child{
              line-height: 35px;
              color: white;
              width: 105px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              span{
                font-size: 18px;
              }
            }
            .layer{
              visibility: hidden;
              opacity: 0;
              transition: .1s ease-in-out;
              position: absolute;
              width: 105px;
              height: 105px;
              background-color: rgba(0, 0, 0, 0.75);
              button{
                cursor: pointer;
                width: 80px;
                height: 20px;
                border: 1px solid #AEB790;
                color: #AEB790;
                line-height: 20px;
                outline: none;
                background-color: transparent;
                &:hover{
                  color: #eb7f01;
                }
              }
              .enterGame{
                position: absolute;
                left: 10px;
                top: 30px;
              }
              .tryGame{
                position: absolute;
                left: 10px;
                top: 60px;
              }
            }
          }
          li:hover .layer{
            visibility: visible;
            opacity: 1;
            display: block;
            z-index: 999;
          }
          li:hover p:last-child{
            color:#ffd800;
            border-bottom: 1px solid #ffd800;
          }
          li:hover img{
            filter: blur(1px);
          }
        }
      }
      .gamePanel{
        .panelHead{
          width: 1200px;
          height: 134px;
          overflow: hidden;
          background: url("../../assets/imgs/electric/panelHead.png") center center no-repeat;
          .platformList{
            width: 100%;
            overflow: hidden;
            background-color: #000;
            margin-top: 10px;
            position: relative;
            .swiper-button-prev,.swiper-button-next{
              width: 61px;
              height: 61px;
              top: 33px;
              i{
                color: white;
                font-size: 50px;
                &:hover{
                  color: yellow;
                }
              }
            }
            .swiper-button-prev{
              left: 0;
              background: transparent;
            }
            .swiper-button-next{
              right: 0;
              background: transparent;
              transform: rotateY(180deg)
            }
            .swiper-container{
              width: 94%;
              height: 75px;
              .swiper-wrapper{
                .swiper-slide{
                  .btm{
                    cursor: pointer;
                    transform: translate(15px, 11px);
                    width: 175px;
                    height: 52px;
                    border: 1px solid transparent;
                    box-sizing: border-box;
                    padding: 10px;
                    border-radius: 5px;
                    background: #182D42;
                    img{
                      display: inline-block;
                      position: absolute;
                      left: 10px;
                    }
                    span{
                      display: inline-block;
                      color: white;
                      font-size: 16px;
                      line-height: 16px;
                      transform: translateX(50px);
                    }
                    &:hover{
                      background: #010F1D;
                    }
                  }
                  .active{
                    background: #010F1D;
                    border: 1px solid yellow;
                  }
                }
              }
            }
          }
          .condition{
            overflow: hidden;
            .filter{
              margin: 8px 35px;
              line-height: 25px;
              float: left;
              a{
                color: white;
                display: inline-block;
                font-size: 14px;
                text-align: center;
                width: 75px;
              }
            }
            .search{
              position: relative;
              margin-top: 3px;
              margin-right: 35px;
              float: right;
              background: #000;
              padding: 5px;
              input{
                height: 21px;
                width: 180px;
                outline: none;
                padding-left: 5px;
              }
              button{
                cursor: pointer;
                position: relative;
                width: 60px;
                height: 25px;
                margin-left: -4px;
                background-color: #d83c3c;
                outline: none;
                border: none;
                color: white;
                font-family: "Microsoft YaHei";
                vertical-align: bottom;
              &::before{
                position: absolute;
                left: -10px;
                top: 50%;
                transform: translateY(-50%);
                content: "";
                width: 0;
                height: 0;
                border: 5px solid transparent;
                border-right: 5px solid #d83c3c;
              }
              }
            }
          }
        }
        .panelBody{
          width: 100%;
          background: linear-gradient(#0e1b29, #20122e);
          overflow: hidden;
          ul{
            margin: 35px;
            display: flex;
            flex-wrap: wrap;
            li:nth-child(6n){
              margin-right: 0;
            }
            li{
              position: relative;
              height: 206px;
              margin-right: 25px;
              p{
                width: 166px;
                overflow: hidden;
                img{
                    background: #000;
                }
              }
              .gamePic{
                height: 166px;
                animation: rotation .5s linear alternate;
                box-shadow: 0 0 8px rgba(0, 0, 0, .8);
                img{
                  box-shadow: 0 0 8px rgba(0, 0, 0, 1) inset;
                  transition: .2s ease-in-out;
                }
                &:before{
                  content:"";
                  position:absolute;
                  width:100%;
                  height:166px;
                  -webkit-box-shadow:0 0 10px rgba(0, 0, 0, 1) inset;
                  -moz-box-shadow:0 0 10px rgba(0, 0, 0, 1) inset;
                  -o-box-shadow:0 0 10px rgba(0, 0, 0, 1) inset;
                }
              }
              p:last-child{
                line-height: 35px;
                color: white;
                text-overflow: ellipsis;
                white-space: nowrap;
                span{
                  font-size: 18px;
                }
              }
              .layer{
                visibility: hidden;
                opacity: 0;
                transition: .1s ease-in-out;
                position: absolute;
                width: 166px;
                height: 166px;
                background-color: rgba(0, 0, 0, 0.75);
                button{
                  cursor: pointer;
                  width: 140px;
                  height: 35px;
                  border: 1px solid #AEB790;
                  color: #AEB790;
                  line-height: 20px;
                  outline: none;
                  background-color: transparent;
                  &:hover{
                    color: #eb7f01;
                  }
                }
                .enterGame{
                  position: absolute;
                  left: 12px;
                  top: 40px;
                }
                .tryGame{
                  position: absolute;
                  left: 12px;
                  top: 80px;
                }
              }
            }
            li:hover .layer{
              visibility: visible;
              opacity: 1;
              z-index: 999;
            }
            li:hover p:last-child{
              color:#ffd800;
            }
            li:hover img{
              filter: blur(1px);
              transform: scale(1.1);
            }
          }
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
  .promote{
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(34%);
    z-index: 9;
    width: 320px;
    height: 356px;
    background: url("../../assets/imgs/electric/Layer804.png");
    background-size: cover;
    .jackpot{
      .el-carousel{
        margin-top: 10px;
        .el-carousel__container{
          .el-carousel__item{
            p{
              font-size: 15px;
              color: #fff;
              text-align: center;
              line-height: 23px;
              span{
                font-size: 15px;
              }
            }
            div{
              margin-top: 15px;
              p{
                span{
                  display: inline-block;
                }
                span:first-child{
                  margin-right: 25px;
                }
              }
              p:last-child{
                span:first-child{
                  width: 75px;
                }
              }
            }
          }
        }
      }
      .jackpotTitle{
        margin-top: 50px;
        margin-left: 130px;
        span{
          font-size: 15px;
          color: white;
        }
      }
    }
  }
}
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

@keyframes rotation{
  0% {-webkit-transform: rotate(8deg);}
  20% {-webkit-transform: rotate(-6deg);}
  40% {-webkit-transform: rotate(4deg);}
  60% {-webkit-transform: rotate(-2deg);}
  80% {-webkit-transform: rotate(0deg);}
}

@keyframes leftIn {
  from { transform: translateX(-50px); opacity: 0;  }
  to { transform: translateX(0px); opacity: 1;  }
}
</style>
