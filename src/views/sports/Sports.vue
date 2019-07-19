<template>
  <div class="wrapper">
    <div class="content">
      <div class="title">
        <img src="http://172.16.135.103/ui/gfx_frontend/sport_game/og.png" alt="标题">
      </div>
      <div class="slogn">
        <img src="http://172.16.135.103/ui/gfx_frontend/sport_game/rectangle.png" alt="口号">
      </div>
      <div class="platformList">
        <div class="platform"
             @click="enterGame(item.games[0].gameId, platformIdList[index])"
             @mousemove="enterPlatform"
             v-for="(item, index) in platformList"
             :key="index"
             :style="'background: url(\'http://172.16.135.103/ui/gfx_frontend/sport_game/avia-banner-small.png\') center 100% no-repeat;animation-delay: '+index+'00ms;animation-fill-mode: backwards!important;'">
          <div class="intro">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gameMix from '@/mixins/game.mix'

export default {
  name: 'sports',
  mixins: [gameMix],
  data () {
    return {
      sportList: [
        {code: 'footer', intro: '让球、大小、半全场、波胆、单双、总入球、混合过关等多元竞猜。 每月超过1500场混球赛事，足球、篮球、橄榄球、网球应有尽有！'},
        {code: 'basktball', intro: '让球、大小、半全场、波胆、单双、总入球、混合过关等多元竞猜。 每月超过1500场混球赛事，足球、篮球、橄榄球、网球应有尽有！'},
        {code: 'cmd', intro: '让球、大小、半全场、波胆、单双、总入球、混合过关等多元竞猜。 每月超过1500场混球赛事，足球、篮球、橄榄球、网球应有尽有！'},
        {code: 'tennis', intro: '让球、大小、半全场、波胆、单双、总入球、混合过关等多元竞猜。 每月超过1500场混球赛事，足球、篮球、橄榄球、网球应有尽有！'}
      ]
    }
  },
  created () {
    this.getPlatformUrl('sport')
  },
  methods: {
    enterPlatform (e) {
      let platform = e.target
      platform.style.transformOrigin = parseInt(e.offsetX / 373 * 100) + '% ' + parseInt(e.offsetY / 592 * 100) + '%'
    }
  }
}
</script>

<style scoped lang="scss">
  .wrapper{
    width: 100%;
    background-size: 100%;
    height: 1068px;
    background: url("http://172.16.135.103/ui/gfx_frontend/sport_game/bg.png") no-repeat;
    overflow: hidden;
    .content{
      width: 1600px;
      margin: 0 auto;
      margin-top: 100px;
      text-align: center;
      .slogn{
        width: 1210px;
        margin: 0 auto;
        margin-top: 20px;
        background: url("http://172.16.135.103/ui/gfx_frontend/sport_game/rectangle.png") center center no-repeat;
      }
      .platformList{
        display: flex;
        justify-content: space-evenly;
        .platform{
          /*border: 1px solid;*/
          transition: .1s ease-in-out;
          animation: leftIn  .5s linear ;
          width: 373px;
          height: 592px;
          position: relative;
          -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent 86%, rgba(0, 0, 0, .8));
          box-reflect: below 0 linear-gradient(transparent 86%,rgba(0, 0, 0, .8));
          &:hover{
            transform: scale(1.2);
            z-index: 2;
          }
          .intro{
            position: absolute;
            top: 467px;
            left: 81px;
            text-align: left;
            width: 241px;
            font-size: 15px;
            color: #fff;
          }
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
  }
  @keyframes leftIn {
    from { transform: translateY(-50px); opacity: 0;  }
    to { transform: translateY(0px); opacity: 1;  }
  }
</style>
