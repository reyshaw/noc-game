<template>
  <div class="wrapper">
    <div class="banner  animated zoomIn">
      <div class="block">
        <el-carousel height="416px">
          <el-carousel-item v-for="item in 4" :key="item">
            <img src="http://172.16.135.103/ui/gfx_frontend/table_game/banner.png" alt="" style="width: 100%;height: 100%;min-width: 1650px;">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="content">
      <div class="main">
        <div class="top animated zoomIn"></div>
        <div class="menu animated zoomIn">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in platformList" :key="index">
              <div class="btm">
                <img :src="'http://172.16.135.103/ui/gfx_frontend/table_game/'+ item.code +'_logo.png'" alt="">
                <span>{{item.cnName}}</span>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </div>
        <div class="container">
          <div class="chessPlatform" v-for="(item, index) in gamePicList" :key="index">
            <div class="panel">
              <img :src="'http://172.16.135.103/ui/gfx_frontend/table_game/box'+ (index+1) +'.png'" alt="">
            </div>
            <div class="layer">
              <div class="title">{{item.gameName}}</div>
              <button @click="enterGame(1396, 0)">进入游戏</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import gameMix from '../../mixins/game.mix'

export default {
  name: 'chess',
  components: {
    swiper,
    swiperSlide
  },
  mixins: [gameMix],
  data () {
    return {
      platformList: [
      ],
      gamePicList: [
        {gameName: '血战麻将'},
        {gameName: '加倍斗地主'},
        {gameName: '楚汉德州'},
        {gameName: '抢庄牛牛'},
        {gameName: '斗地主'},
        {gameName: '必下德州'},
        {gameName: '楚汉德州'},
        {gameName: '炸金花'},
        {gameName: '百人牛牛'},
        {gameName: '开心摇摇乐'},
        {gameName: '十三水'},
        {gameName: '通比牛牛'},
        {gameName: '推筒子'}
      ],
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 0,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      platformId: ''
    }
  },
  async created () {
    this.getPlatformUrl('cardgame')
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper{
  .banner{
  }
  .content{
    margin-top: -416px;
    width: 100%;
    min-width: 1650px;
    height: 1745px;
    overflow: hidden;
    background: url("http://172.16.135.103/ui/gfx_frontend/table_game/bg2.png") #0E0F1E center center no-repeat;
    .main{
      position: relative;
      width: 1210px;
      height: 1040px;
      margin: 0 auto;
      margin-top: 664px;
      background: url("http://172.16.135.103/ui/gfx_frontend/table_game/bg1.png") center center no-repeat;
      .top{
        width: 1406px;
        height: 262px;
        background: url("http://172.16.135.103/ui/gfx_frontend/table_game/title.png") center center no-repeat;
        position: absolute;
        top: -387px;
        left: calc(50% - 703px);
        z-index: 3;
      }
      .menu{
        margin: 0 auto;
        width: 1100px;
        height: 179px;
        position: absolute;
        left: calc(50% - 550px);
        top: -115px;
        z-index: 3;
        .swiper-button-prev,.swiper-button-next{
          width: 61px;
          height: 61px;
          top: 33px;
        }
        .swiper-button-prev{
          left: -59px;
          background: url("http://172.16.135.103/ui/gfx_frontend/table_game/left.png") center center no-repeat;
        }
        .swiper-button-next{
          right: -59px;
          background: url("http://172.16.135.103/ui/gfx_frontend/table_game/left.png") center center no-repeat;
          transform: rotateY(180deg)
        }
        .swiper-container{
          height: 167px;
          .swiper-wrapper{
            .swiper-slide{
              .btm{
                transform: translateX(15px);
                width: 240px;
                height: 80px;
                background: url("http://172.16.135.103/ui/gfx_frontend/table_game/button.png");
                text-align: right;
                img{
                  display: inline-block;
                  position: absolute;
                  left: 20px;
                }
                ::after{
                  content: '';
                  display: block;
                  width: 160px;
                  height: 10px;
                  border-radius: 20px;
                  box-shadow: 0px 80px 20px 1px #000;
                  transform: translate(-20px,-20px) ;
                }
                span{
                  display: inline-block;
                  color: white;
                  font-size: 25px;
                  line-height: 80px;
                  padding-right: 20px;
                }
              }
            }
          }
        }
      }
      .container{
        box-sizing: content-box;
        padding: 130px 80px;
        display: flex;
        flex-wrap: wrap;
        .chessPlatform{
          position: relative;
          &:hover .layer{
            opacity: 1;
            visibility: visible;
          }
          .panel{
            width: 210px;
            height: 260px;
          }
          .layer{
            transition: .1s ease-in-out;;
            opacity: 0;
            visibility: hidden;
            width: 186px;
            height: 236px;
            border: 1px solid #ffff00;
            background: rgba(0,0,0,.8);
            position: absolute;
            top: 13px;
            left: 12px;
            box-sizing: content-box;
            text-align: center;
            .title{
              margin-top: 60px;
              font-size: 22px;
              color: #DAE3AE;
            }
            button{
              display: inline-block;
              margin-top: 20px;
              background: transparent;
              border: 2px solid #DAE3AE;
              color: #DAE3AE;
              width: 100px;
              height: 30px;
              cursor: pointer;
              &:hover{
                color: #eb844c;
              }
            }
          }
        }
      }
    }
  }
}
</style>
