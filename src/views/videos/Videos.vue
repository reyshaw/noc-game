<template>
  <div class="wrapper">
    <div class="banner">
      <div class="block">
        <slider :imgURLS="imgURLS"></slider>
      </div>
    </div>
    <div class="content">
      <div class="panel">
        <div class="room" v-for="(item, index) in platformList" :key="index">
          <div class="bak">
            <div class="beauty"><img :src="'http://172.16.135.103/ui/gfx_frontend/live_game/box'+(index+1)+'.png'" alt=""></div>
            <div class="titleBak"><img :src="'http://172.16.135.103/ui/gfx_frontend/live_game/low.png'" alt=""></div>
          </div>
          <div class="layer">
            <div class="logo">
              <img src="http://172.16.135.103/ui/gfx_frontend/live_game/logo.png" alt="">
            </div>
            <div class="intro">
              {{item.intro}}
            </div>
            <div class="operate">
              <button @click="enterGame(item.games[0].gameId, platformIdList[index])">立即游戏</button>
              <button>试玩体验</button>
            </div>
          </div>
          <div class="titleContent">
            <div class="CNtitle">{{item.cnName}} 主播厅</div>
            <div class="title">{{item.cnName}} CASINO</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gameMix from '@/mixins/game.mix'
import Slider from '@/components/slider'

export default {
  name: 'videos',
  mixins: [gameMix],
  components: {
    Slider
  },
  data () {
    return {
      platformList: [
      ],
      imgURLS: [
        'http://172.16.135.103/ui/gfx_frontend/live_game/banner.png',
        'http://172.16.135.103/ui/gfx_frontend/live_game/banner.png',
        'http://172.16.135.103/ui/gfx_frontend/live_game/banner.png',
        'http://172.16.135.103/ui/gfx_frontend/live_game/banner.png',
        'http://172.16.135.103/ui/gfx_frontend/live_game/banner.png'
      ]
    }
  },
  created () {
    this.getPlatformUrl('live')
  }
}
</script>

<style scoped lang="scss">
  .wrapper{
    width: 100%;
    .banner{
      width: 100%;
      .el-carousel__item{
        background-color: #13101b;
      }
    }
    .content{
      width: 100%;
      height: auto;
      overflow: hidden;
      background: url("../../assets/imgs/video/bg.png") center center no-repeat;
      .panel{
        width: 1220px;
        margin: 0 auto;
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        .room{
          animation: rotation .5s linear alternate;
          position: relative;
          margin-bottom: 25px;
          &:hover .layer{
            visibility: visible;
            opacity: 0.8;
          }
          &:hover .bak{
            filter: blur(5px);
          }
          .bak{
            .beauty{
              width: 294px;
              height: 405px;
            }
            .titleBak{
              width: 294px;
              height: 114px;
            }
          }
        }
      }
      .layer{
        transition: .2s ease-in-out;
        visibility:hidden;
        opacity: 0;
        width: 294px;
        height: 519px;
        position: absolute;
        top: 0;
        border: 1px solid #DFE9B2;
        background: rgba(0, 0, 0, .5);
        z-index: 2;
        .logo{
          text-align: center;
          margin-top: 50px;
        }
        .intro{
          width: 220px;
          color: #DFE9B2;
          font-size: 14px;
          margin: 20px auto;
        }
        .operate{
          overflow: hidden;
          margin-top: 20px;
          button{
            cursor: pointer;
            width: 120px;
            background: transparent;
            border: 2px solid #DFE9B2;
            color: #DFE9B2;
            margin: 20px auto;
            line-height: 25px;
            display: block;
            outline: none;
            &:hover{
              color: orange;
            }
          }
        }
      }
      .titleContent{
        z-index: 3;
        position: absolute;
        width: 294px;
        height: 114px;
        bottom: 0;
        text-align: center;
        color: #DFE9B2;
        .CNtitle{
          margin-top: 10px;
          line-height: 45px;
          font-size: 26px;
        }
        .title{
          line-height: 45px;
          font-size: 24px;
        }
      }
    }
  }
  @keyframes rotation{
    0% {-webkit-transform: rotateY(-180deg);}
    25% {-webkit-transform: rotateY(-90deg);}
    50% {-webkit-transform: rotateY(0deg);}
    75% {-webkit-transform: rotateY(-30deg);}
    100% {-webkit-transform: rotateY(0deg);}
  }
</style>
