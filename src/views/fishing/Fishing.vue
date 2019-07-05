<template>
  <div class="wrapper">
    <div class="aquarium">
      <div class="fishGroup">
        <div class="fish_wrap left_right_2"><div class="x"><div class="y"><div class="fish_box"><div class="fish_1"></div></div></div></div></div>
        <div class="fish_wrap left_right_2"><div class="x"><div class="y"><div class="fish_box"><div class="fish_1"></div></div></div></div></div>
        <div class="fish_wrap left_right_2"><div class="x"><div class="y"><div class="fish_box"><div class="fish_1"></div></div></div></div></div>
        <div class="fish_wrap left_right_2"><div class="x"><div class="y"><div class="fish_box"><div class="fish_1"></div></div></div></div></div>
      </div>
      <div class="fishGroup">
        <div class="fish_wrap right_left_4"><div class="x"><div class="y"><div class="fish_box"><div class="fish_2"></div></div></div></div></div>
        <div class="fish_wrap right_left_4"><div class="x"><div class="y"><div class="fish_box"><div class="fish_2"></div></div></div></div></div>
        <div class="fish_wrap right_left_4"><div class="x"><div class="y"><div class="fish_box"><div class="fish_2"></div></div></div></div></div>
        <div class="fish_wrap right_left_4"><div class="x"><div class="y"><div class="fish_box"><div class="fish_2"></div></div></div></div></div>
      </div>
      <div class="fishGroup">
        <div class="fish_wrap right_left_4"><div class="x"><div class="y"><div class="fish_box"><div class="fish_2"></div></div></div></div></div>
        <div class="fish_wrap right_left_4"><div class="x"><div class="y"><div class="fish_box"><div class="fish_2"></div></div></div></div></div>
        <div class="fish_wrap right_left_4"><div class="x"><div class="y"><div class="fish_box"><div class="fish_2"></div></div></div></div></div>
        <div class="fish_wrap right_left_4"><div class="x"><div class="y"><div class="fish_box"><div class="fish_2"></div></div></div></div></div>
      </div>
      <div class="fishGroup">
        <div class="fish_wrap left_right_3"><div class="x"><div class="y"><div class="fish_box"><div class="fish_6"></div></div></div></div></div>
        <div class="fish_wrap left_right_3"><div class="x"><div class="y"><div class="fish_box"><div class="fish_6"></div></div></div></div></div>
      </div>
      <div class="fishGroup">
        <div class="fish_wrap left_right_1"><div class="x"><div class="y"><div class="fish_box"><div class="fish_7"></div></div></div></div></div>
        <div class="fish_wrap left_right_1"><div class="x"><div class="y"><div class="fish_box"><div class="fish_7"></div></div></div></div></div>
      </div>
      <div class="fish_wrap right_left_3"><div class="x"><div class="y"><div class="fish_box"><div class="fish_8"></div></div></div></div></div>
      <div class="fish_wrap right_left_1"><div class="x"><div class="y"><div class="fish_box"><div class="fish_9"></div></div></div></div></div>
      <div class="fish_wrap right_left_2"><div class="x"><div class="y"><div class="fish_box"><div class="fish_10"></div></div></div></div></div>
    </div>
    <div class="content">
      <div class="slogn"></div>
      <div class="main">
        <div class="tortoise"></div>
        <div class="shark"></div>
        <div class="octopus"></div>
        <div class="saltedfish"></div>
        <div class="fishCard" v-for="(item, index) in fishGame" :key="index" @mouseenter="cardBubbly(index)">
          <div class="title">
            <img :src="'http://172.16.135.103/ui/gfx_frontend/fishing_game/text_' + (index+1) + '.png'" alt="">
          </div>
          <div class="logo">
            <img :src="'http://172.16.135.103/ui/gfx_frontend/fishing_game/' + item.imgUrl + '_logo.png'" alt="">
          </div>
          <div class="fish" ref="fish">
            <img :src="'http://172.16.135.103/ui/gfx_frontend/fishing_game/fish_' + (index+1) + '.png'" alt="">
          </div>
          <button class="start" @click="enterGame(3187, 0)" @mousedown="mousedown" @mouseup="mouseup">立即游戏</button>
          <div class="layer">
            <canvas width="200" ref="layer" height="400"></canvas>
          </div>
        </div>
      </div>
    </div>
    <canvas id="demo" width="1920" height="2437"></canvas>
    <div class="fishbox">
      <div class="flowFish"></div>
    </div>
    <div class="sharkbox">
      <div class="flowShark"></div>
    </div>
  </div>
</template>

<script>
import gameMix from '@/mixins/game.mix'

export default {
  name: 'fishing',
  mixins: [gameMix],
  data () {
    return {
      fishGame: [
        {imgUrl: 'ag'},
        {imgUrl: 'dmg'},
        {imgUrl: 'bg'},
        {imgUrl: 'cq9'},
        {imgUrl: 'jdb'},
        {imgUrl: 'jdb'},
        {imgUrl: 'jdb'},
        {imgUrl: 'bbin'},
        {imgUrl: 'bbin'},
        {imgUrl: 'fg'},
        {imgUrl: 'fg'},
        {imgUrl: 'fg'},
        {imgUrl: 'fg'},
        {imgUrl: 'fg'},
        {imgUrl: 'fg'}
      ]
    }
  },
  created () {
    this.getPlatformUrl('fish')
  },
  mounted () {
    this.bakBubbly()
  },
  methods: {
    cardBubbly (i) {
      // // console.log(this.$refs.layer[i])
      window.bubbly({
        canvas: this.$refs.layer[i],
        blur: 30,
        colorStart: 'transparent',
        colorStop: 'transparent',
        radiusFunc: () => 5 + Math.random() * 15,
        angleFunc: () => -Math.PI / 2,
        velocityFunc: () => Math.random() * 30,
        bubbleFunc: () => `rgba(255, 255, 255, ${Math.random() * 0.2})`,
        bubbles: 15
      })
    },
    bakBubbly () {
      window.bubbly({
        canvas: document.getElementById('demo'),
        blur: 15,
        colorStart: 'transparent',
        colorStop: 'transparent',
        radiusFunc: () => 5 + Math.random() * 15,
        angleFunc: () => -Math.PI / 2,
        velocityFunc: () => Math.random() * 5,
        bubbleFunc: () => `rgba(255, 255, 255, ${Math.random() * 0.3})`,
        bubbles: 30
      })
    },
    mousedown (e) {
      let _btn = e.target
      _btn.style.boxShadow = 'none'
      _btn.style.transform = 'translate(-65px, 1px)'
    },
    mouseup (e) {
      let _btn = e.target
      _btn.style.boxShadow = '1px 1px 4px 1px rgba(0,0,0,.5)'
      _btn.style.transform = 'translate(-65px, -1px)'
    }
  }
}
</script>

<style scoped lang="scss">
  .wrapper{
    width: 100%;
    max-width: 1920px;
    height: 2437px;
    background: url("http://172.16.135.103/ui/gfx_frontend/fishing_game/background_03.png") center center no-repeat;
    overflow-y: hidden;
    .content{
      width: 1206px;
      height: fit-content;
      margin: 0 auto;
      position: relative;
      .slogn{
        width: 513px;
        height: 173px;
        position: absolute;
        top: 350px;
        left: calc(50% - 256px);
        background: url("http://172.16.135.103/ui/gfx_frontend/fishing_game/title.png") center center no-repeat;
        animation: showlogo 1s, logoMove 5s linear 1s infinite;
      }
      .main{
        width: 1206px;
        height: 1380px;
        position: absolute;
        box-sizing: border-box;
        padding: 60px 40px;
        top: 600px;
        left: 50%;
        transform: translate(-603px);
        background: url("http://172.16.135.103/ui/gfx_frontend/fishing_game/bg.png") center center no-repeat;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .tortoise{
          width: 412px;
          height: 490px;
          background: url("http://172.16.135.103/ui/gfx_frontend/fishing_game/tortoise.png") center center no-repeat;
          position: absolute;
          left: -250px;
          top: -15px;
        }
        .shark{
          width: 316px;
          height: 501px;
          background: url("http://172.16.135.103/ui/gfx_frontend/fishing_game/shark.png") center center no-repeat;
          position: absolute;
          bottom: -125px;
          left: -364px;
        }
        .octopus{
          width: 210px;
          height: 229px;
          background: url("http://172.16.135.103/ui/gfx_frontend/fishing_game/octopus.png") center center no-repeat;
          position: absolute;
          top: 400px;
          right: -300px;
          animation: logoMove 2s linear infinite;
        }
        .saltedfish{
          width: 481px;
          height: 298px;
          background: url("http://172.16.135.103/ui/gfx_frontend/fishing_game/saltedfish.png") center center no-repeat;
          position: absolute;
          bottom: -340px;
          right: -240px;
          animation: logoMove 2s linear infinite;
        }
        .fishCard{
          width: 200px;
          height: 400px;
          background: url("http://172.16.135.103/ui/gfx_frontend/fishing_game/bg1.png") center center no-repeat;
          text-align: center;
          position: relative;
          overflow: hidden;
          &:hover .layer{
            display: block;
          }
          &:hover .fish{
            transition: .1s ease-in-out;
            animation: logoMove 2s linear infinite;
          }
          .layer{
            display: none;
            width: 200px;
            height: 400px;
            position: absolute;
            top: 0;
            background-color: rgba(0, 0, 0, .5);
          }
          .title{
            width: 100%;
            position: absolute;
            top: 40px;
            text-align: center;
            z-index: 3;
          }
          .logo{
            width: 100%;
            position: absolute;
            top: 120px;
            text-align: center;
            z-index: 3;
            height: 69px;
            line-height: 69px;
            img{
              vertical-align: middle;
            }
          }
          .fish{
            position: absolute;
            bottom: -2px;
            z-index: 2;
          }
          .start{
            cursor: pointer;
            width: 130px;
            height: 35px;
            border: 1px solid transparent;
            border-radius: 2px;
            outline: none;
            background: url("http://172.16.135.103/ui/gfx_frontend/fishing_game/button.png") center center no-repeat;
            display: inline-block;
            position: absolute;
            bottom: 20px;
            transform: translateX(-65px);
            box-shadow: 1px 1px 4px 1px rgba(0,0,0,.5);
            z-index: 3;
          }
        }
      }
    }
    .fishbox {
      width: 200px;
      height: 200px;
      /*background-color: rgba(0,0,0,0.4);*/
      position: absolute;
      left: 0;
      top: 0;
      animation: run 20s linear infinite;
      animation-direction: normal;
    }

    .flowFish {
      width: 174px;
      height: 126px;
      position: absolute;
      left: 35%;
      top: 0;
      background: url("http://172.16.135.103/ui/gfx_frontend/fishing_game/fish8.png") no-repeat left top;
      /*transition:all 0.8s steps(8) ;*/
      animation: active1 0.8s steps(8) infinite;
    }

    .sharkbox {
      width: 509px;
      height: 270px;
      animation: run2 20s linear infinite;
      position: absolute;
      left: 0;
      top: 0;
    }

    .flowShark {
      width: 509px;
      height: 270px;
      background: url(http://172.16.135.103/ui/gfx_frontend/fishing_game/shark1.png) no-repeat;
      animation: active2 1s steps(8) infinite;
    }
    .aquarium {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 0;
    }

    .fish_box {
      display: inline-block;
    }

    .fishGroup .fish_wrap:nth-child(2) .fish_box {
      -webkit-transform: translate(-100%, -50%);
      transform: translate(-100%, -50%);
    }

    .fishGroup .fish_wrap:nth-child(3) .fish_box {
      -webkit-transform: translate(-150%, 25%);
      transform: translate(-150%, 25%);
    }

    .fishGroup .fish_wrap:nth-child(4) .fish_box {
      -webkit-transform: translate(-250%, 65%);
      transform: translate(-250%, 65%);
    }

    .fishGroup .fish_wrap:nth-child(5) .fish_box {
      -webkit-transform: translate(-320%, -25%);
      transform: translate(-320%, -25%);
    }

    .left_right_1 {
      position: absolute;
      width: 100%;
      height: 70%;
    }

    .left_right_1 .x {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-animation: left_right_1_x 70s linear infinite;
      animation: left_right_1_x 70s linear infinite;
    }
    .left_right_1 .y {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-animation: left_right_1_y 1.5s ease infinite;
      animation: left_right_1_y 1.5s ease infinite;
    }

    .left_right_2 {
      position: absolute;
      width: 100%;
      height: 70%;
    }

    .left_right_2 .x {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-animation: left_right_2_x 25s linear infinite;
      animation: left_right_2_x 25s linear infinite;
    }
    .left_right_2 .y {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-animation: left_right_2_y 25s ease-in-out infinite;
      animation: left_right_2_y 25s ease-in-out infinite;
    }

    .left_right_3 {
      position: absolute;
      width: 100%;
      height: 70%;
    }

    .left_right_3 .x {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-animation: left_right_3_x 60s linear infinite;
      animation: left_right_3_x 60s linear infinite;
    }
    .left_right_3 .y {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-animation: left_right_3_y 60s ease-in-out infinite;
      animation: left_right_3_y 60s ease-in-out infinite;
    }
    .right_left_1 {
      position: absolute;
      width: 100%;
      height: 100%;
      transforM: scaleX(-1);
    }

    .right_left_1 .x {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 70%;
      -webkit-animation: right_left_1_x 25s linear infinite;
      animation: right_left_1_x 25s linear infinite;
    }
    .right_left_1 .y {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-animation: right_left_1_y 25s ease-in-out infinite;
      animation: right_left_1_y 25s ease-in-out infinite;
    }

    .right_left_2 {
      position: absolute;
      width: 100%;
      height: 70%;
      transforM: scaleX(-1);
    }

    .right_left_2 .x {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 70%;
      -webkit-animation: right_left_2_x 30s linear infinite;
      animation: right_left_2_x 30s linear infinite;
    }

    .right_left_2 .y {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-animation: right_left_2_y 30s ease-in-out infinite;
      animation: right_left_2_y 30s ease-in-out infinite;
    }

    .right_left_3 {
      position: absolute;
      width: 100%;
      height: 100%;
      transforM: scaleX(-1);
    }

    .right_left_3 .x {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-animation: right_left_3_x 35s linear infinite;
      animation: right_left_3_x 35s linear infinite;
    }

    .right_left_3 .y {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-animation: right_left_3_y 35s ease-in-out infinite;
      animation: right_left_3_y 35s ease-in-out infinite;
    }

    .right_left_4 {
      position: absolute;
      width: 100%;
      height: 70%;
      transforM: scaleX(-1);
    }

    .right_left_4 .x {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-animation: right_left_4_x 50s linear infinite;
      animation: right_left_4_x 50s linear infinite;
    }

    .right_left_4 .y {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-animation: right_left_4_y 50s ease-in-out infinite;
      animation: right_left_4_y 50s ease-in-out infinite;
    }

    .fish_1 {
      background: url(http://172.16.135.103/ui/gfx_frontend/fishing_game/flowFish1.png) no-repeat 0 0;
      width: 55px;
      height: 37px;
      -webkit-animation: fish_1_play 0.5s steps(4) infinite;
      animation: fish_1_play 0.5s steps(4) infinite;
    }

    .fish_2 {
      background: url(http://172.16.135.103/ui/gfx_frontend/fishing_game/flowFish2.png) no-repeat 0 0;
      width: 78px;
      height: 64px;
      -webkit-animation: fish_2_play 0.5s steps(4) infinite;
      animation: fish_2_play 0.5s steps(4) infinite;
    }

    .fish_6 {
      background: url(http://172.16.135.103/ui/gfx_frontend/fishing_game/flowFish6.png) no-repeat 0 0;
      width: 105px;
      height: 79px;
      -webkit-animation: fish_6_play 1.5s steps(8) infinite;
      animation: fish_6_play 1.5s steps(8) infinite;
    }
    .fish_7 {
      background: url(http://172.16.135.103/ui/gfx_frontend/fishing_game/flowFish7.png) no-repeat 0 0;
      width: 92px;
      height: 151px;
      -webkit-animation: fish_7_play 1s steps(6) infinite;
      animation: fish_7_play 1s steps(6) infinite;
    }

    .fish_8 {
      background: url(http://172.16.135.103/ui/gfx_frontend/fishing_game/flowFish8.png) no-repeat 0 0;
      width: 174px;
      height: 126px;
      -webkit-animation: fish_8_play 1s steps(8) infinite;
      animation: fish_8_play 1s steps(8) infinite;
    }

    .fish_9 {
      background: url(http://172.16.135.103/ui/gfx_frontend/fishing_game/flowFish9.png) no-repeat 0 0;
      width: 166px;
      height: 183px;
      -webkit-animation: fish_9_play 1s steps(8) infinite;
      animation: fish_9_play 1s steps(8) infinite;
    }

    .fish_10 {
      background: url(http://172.16.135.103/ui/gfx_frontend/fishing_game/flowFish10.png) no-repeat 0 0;
      width: 178px;
      height: 187px;
      -webkit-animation: fish_10_play 1s steps(6) infinite;
      animation: fish_10_play 1s steps(6) infinite;
    }
  }
  @keyframes showlogo
  {
    0% {
      opacity: 0;
      -webkit-transform: scale(0, 0);
      -moz-transform: scale(0, 0);
      transform: scale(0, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1, 1);
      -moz-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }
  @keyframes logoMove
  {
    0%, 100%, 50% {
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      transform: translateY(0);
    }
    25% {
      -webkit-transform: translateY(-13px);
      -moz-transform: translateY(-13px);
      transform: translateY(-13px);
    }
    75% {
      -webkit-transform: translateY(13px);
      -moz-transform: translateY(13px);
      transform: translateY(13px);
    }
  }
  @keyframes active1 {
    0% {
    }

    100% {
      background-position: left -1008px;
    }
  }

  @keyframes active2 {
    0% {
    }

    100% {
      background-position: left -2160px;
    }
  }

  @keyframes run {
    0% {
    }

    15% {
      transform: translate(600px,0px) rotate(45deg);
    }

    50% {
      transform: translate(600px,350px) rotate(135deg);
    }

    75% {
      transform: translate(50px,300px) rotate(235deg);
    }

    100% {
      transform: translate(0px,0px) rotate(360deg);
    }
  }

  @keyframes run2 {
    0% {
      transform: translateX(-600px);
    }

    100% {
      transform: translateX(2000px);
    }
  }
  @-webkit-keyframes left_right_1_x {
    0% {
      left: 0%;
    }
    100% {
      left: 150%;
    }
  }

  @-webkit-keyframes left_right_1_y {
    0% {
      top: 15%;
    }
    30% {
      top: 16%;
    }
    50% {
      top: 15%;
    }
    70% {
      top: 16%;
    }
    100% {
      top: 15%;
    }
  }

  @-webkit-keyframes left_right_2_x {
    0% {
      left: 0%;
    }
    100% {
      left: 150%;
    }
  }

  @-webkit-keyframes left_right_2_y {
    0% {
      top: 25%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    25% {
      -webkit-transform: rotateZ(-20deg);
      transform: rotateZ(-20deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    50% {
      top: 0%;
    }
    75% {
      -webkit-transform: rotateZ(10deg);
      transform: rotateZ(10deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    100% {
      top: 50%;
      -webkit-transform: rotateZ(10deg);
      transform: rotateZ(10deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
  }

  @-webkit-keyframes left_right_3_x {
    0% {
      left: 0%;
    }
    100% {
      left: 150%;
    }
  }

  @-webkit-keyframes left_right_3_y {
    0% {
      top: 50%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    25% {
      top: 80%;
      -webkit-transform: rotateZ(40deg);
      transform: rotateZ(40deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    38% {
      top: 80%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
    }
    50% {
      top: 80%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
    }
    75% {
      -webkit-transform: rotateZ(40deg);
      transform: rotateZ(40deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    100% {
      top: 25%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
  }

  @-webkit-keyframes right_left_1_x {
    0% {
      left: 0%;
    }
    100% {
      left: 150%;
    }
  }

  @-webkit-keyframes right_left_1_y {
    0% {
      top: 75%;
    }
    100% {
      top: 75%;
    }
  }

  @-webkit-keyframes right_left_2_x {
    0% {
      left: 0%;
    }
    100% {
      left: 100%;
    }
  }

  @-webkit-keyframes right_left_2_y {
    0% {
      top: 100%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    25% {
      -webkit-transform: rotateZ(-20deg);
      transform: rotateZ(-20deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    50% {
      top: 0%;
    }
    75% {
      -webkit-transform: rotateZ(20deg);
      transform: rotateZ(20deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    100% {
      top: 100%;
      -webkit-transform: rotateZ(90deg);
      transform: rotateZ(90deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
  }

  @-webkit-keyframes right_left_3_x {
    0% {
      left: 0%;
    }
    100% {
      left: 100%;
    }
  }

  @-webkit-keyframes right_left_3_y {
    0% {
      top: 50%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    25% {
      -webkit-transform: rotateZ(20deg);
      transform: rotateZ(20deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    50% {
      top: 90%;
    }
    75% {
      -webkit-transform: rotateZ(-20deg);
      transform: rotateZ(-20deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    100% {
      top: 50%;
      -webkit-transform: rotateZ(-50deg);
      transform: rotateZ(-50deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
  }

  @-webkit-keyframes right_left_4_x {
    0% {
      left: 0%;
    }
    100% {
      left: 100%;
    }
  }

  @-webkit-keyframes right_left_4_y {
    0% {
      top: 50%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    25% {
      -webkit-transform: rotateZ(20deg);
      transform: rotateZ(20deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    50% {
      top: 90%;
    }
    75% {
      -webkit-transform: rotateZ(-20deg);
      transform: rotateZ(-20deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    100% {
      top: 50%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
  }

  @-webkit-keyframes fish_1_play {
    0% {
      background-position: 0 0
    }
    100% {
      background-position: 0 -148px
    }
  }

  @-webkit-keyframes fish_2_play {
    0% {
      background-position: 0 0
    }
    100% {
      background-position: 0 -256px
    }
  }

  @-webkit-keyframes fish_6_play {
    0% {
      background-position: 0 0
    }
    100% {
      background-position: 0 -632px
    }
  }

  @-webkit-keyframes fish_7_play {
    0% {
      background-position: 0 0
    }
    100% {
      background-position: 0 -906px
    }
  }

  @-webkit-keyframes fish_8_play {
    0% {
      background-position: 0 0
    }
    100% {
      background-position: 0 -1008px
    }
  }

  @-webkit-keyframes fish_9_play {
    0% {
      background-position: 0 0
    }
    100% {
      background-position: 0 -1464px
    }
  }

  @-webkit-keyframes fish_10_play {
    0% {
      background-position: 0 0
    }
    100% {
      background-position: 0 -1122px
    }
  }

  @keyframes left_right_1_x {
    0% {
      left: 0%;
    }
    100% {
      left: 150%;
    }
  }

  @keyframes left_right_1_y {
    0% {
      top: 15%;
    }
    30% {
      top: 16%;
    }
    50% {
      top: 15%;
    }
    70% {
      top: 16%;
    }
    100% {
      top: 15%;
    }
  }

  @keyframes left_right_2_x {
    0% {
      left: 0%;
    }
    100% {
      left: 150%;
    }
  }

  @keyframes left_right_2_y {
    0% {
      top: 25%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    25% {
      -webkit-transform: rotateZ(-20deg);
      transform: rotateZ(-20deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    50% {
      top: 0%;
    }
    75% {
      -webkit-transform: rotateZ(10deg);
      transform: rotateZ(10deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    100% {
      top: 50%;
      -webkit-transform: rotateZ(10deg);
      transform: rotateZ(10deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
  }

  @keyframes left_right_3_x {
    0% {
      left: 0%;
    }
    100% {
      left: 150%;
    }
  }

  @keyframes left_right_3_y {
    0% {
      top: 50%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    25% {
      top: 80%;
      -webkit-transform: rotateZ(40deg);
      transform: rotateZ(40deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    38% {
      top: 80%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
    }
    50% {
      top: 80%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
    }
    75% {
      -webkit-transform: rotateZ(40deg);
      transform: rotateZ(40deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    100% {
      top: 25%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
  }

  @keyframes right_left_1_x {
    0% {
      left: 0%;
    }
    100% {
      left: 150%;
    }
  }

  @keyframes right_left_1_y {
    0% {
      top: 75%;
    }
    100% {
      top: 75%;
    }
  }

  @keyframes right_left_2_x {
    0% {
      left: 0%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes right_left_2_y {
    0% {
      top: 100%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    25% {
      -webkit-transform: rotateZ(-20deg);
      transform: rotateZ(-20deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    50% {
      top: 0%;
    }
    75% {
      -webkit-transform: rotateZ(20deg);
      transform: rotateZ(20deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    100% {
      top: 100%;
      -webkit-transform: rotateZ(90deg);
      transform: rotateZ(90deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
  }

  @keyframes right_left_3_x {
    0% {
      left: 0%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes right_left_3_y {
    0% {
      top: 50%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    25% {
      -webkit-transform: rotateZ(20deg);
      transform: rotateZ(20deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    50% {
      top: 90%;
    }
    75% {
      -webkit-transform: rotateZ(-20deg);
      transform: rotateZ(-20deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    100% {
      top: 50%;
      -webkit-transform: rotateZ(-50deg);
      transform: rotateZ(-50deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
  }

  @keyframes right_left_4_x {
    0% {
      left: 0%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes right_left_4_y {
    0% {
      top: 50%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    25% {
      -webkit-transform: rotateZ(20deg);
      transform: rotateZ(20deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    50% {
      top: 90%;
    }
    75% {
      -webkit-transform: rotateZ(-20deg);
      transform: rotateZ(-20deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
    100% {
      top: 50%;
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -webkit-transform-origin: 0% 0%;
      transform-origin: 0% 0%;
    }
  }

  @keyframes fish_1_play {
    0% {
      background-position: 0 0
    }
    100% {
      background-position: 0 -148px
    }
  }

  @keyframes fish_2_play {
    0% {
      background-position: 0 0
    }
    100% {
      background-position: 0 -256px
    }
  }

  @keyframes fish_6_play {
    0% {
      background-position: 0 0
    }
    100% {
      background-position: 0 -632px
    }
  }

  @keyframes fish_7_play {
    0% {
      background-position: 0 0
    }
    100% {
      background-position: 0 -906px
    }
  }

  @keyframes fish_8_play {
    0% {
      background-position: 0 0
    }
    100% {
      background-position: 0 -1008px
    }
  }

  @keyframes fish_9_play {
    0% {
      background-position: 0 0
    }
    100% {
      background-position: 0 -1464px
    }
  }

  @keyframes fish_10_play {
    0% {
      background-position: 0 0
    }
    100% {
      background-position: 0 -1122px
    }
  }

</style>
