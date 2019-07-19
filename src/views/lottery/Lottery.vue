<template>
  <div class="wrapper">
    <div class="content">
      <div class="condition">
        <ul>
          <li v-for="(item, index) in tags" :key="index">
            <span :text="item.title" :class="{active:active===index}" @click="active=index">{{item.title}}</span>
          </li>
        </ul>
      </div>
      <div class="container">
        <!--<div class="setting">
          <span>自定义</span>
          <img src="http://172.16.135.103/ui/gfx_frontend/lottery/setting.png" alt="">
        </div>-->
        <div class="lotterPanel animated flipInX" v-for="(item, index) in lotteryPanelList" :key="index">
          <div class="panel">
            <div class="img">
              <img :src="'http://172.16.135.103/ui/gfx_frontend/lottery/logo_' + item.imgUrl + '.png'" alt="">
            </div>
            <div class="info">
              <div class="title">{{item.gameName}}</div>
              <div class="periods">第 <span>{{item.period}}</span> 期</div>
              <div class="seconds">
                <ul>
                  <li>
                    <span class="day">00 <i>:</i></span>
                    <span>天</span>
                  </li>
                  <li>
                    <span>00 <i>:</i></span>
                    <span>时</span>
                  </li>
                  <li>
                    <span>00 <i>:</i></span>
                    <span>分</span>
                  </li>
                  <li>
                    <span>00</span>
                    <span>秒</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="result"></div>
            <div class="tendency">
              <span>开奖趋势</span>
            </div>
            <div class="vote">
              立即投注
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lottery',
  data () {
    return {
      tags: [
        {title: '所有彩票'},
        {title: '棋牌彩'},
        {title: '即开彩'},
        {title: '时时彩'},
        {title: 'PK0'},
        {title: '六合彩'},
        {title: '快乐十分'},
        {title: 'PC蛋蛋'},
        {title: '十一选五'},
        {title: '快乐8'},
        {title: '快3'}
      ],
      lotteryPanelList: [
        {imgUrl: '0', gameName: '香港六合彩', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '1', gameName: '香港六合彩', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '2', gameName: '北京PK赛车', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '3', gameName: '重庆时时彩', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '4', gameName: '幸运飞艇', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '5', gameName: '三分快3', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '6', gameName: '一分幸运农场', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '7', gameName: '湖南快乐10分', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '8', gameName: '幸运28', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '9', gameName: '三分11选5', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '10', gameName: '三分幸运农场', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '11', gameName: '三分快8', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '12', gameName: '五分赛车', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '13', gameName: '香港六合彩', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '14', gameName: '香港六合彩', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '15', gameName: '香港六合彩', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '16', gameName: '香港六合彩', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '17', gameName: '香港六合彩', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '18', gameName: '香港六合彩', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}},
        {imgUrl: '19', gameName: '香港六合彩', period: '2019-031', hot: true, time: {days: '00', hours: '00', min: '15', sec: '42'}}
      ],
      active: 0
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/styles/global";
.wrapper{
  width: 100%;
  max-width: 1920px;
  height: 1792px;
  background: url("http://172.16.135.103/ui/gfx_frontend/lottery/background.png");
  overflow: hidden;
  .content{
    width: 1500px;
    margin: 0 auto;
    height: fit-content;
    .condition{
      margin: 40px 20px;
      overflow: hidden;
      ul{
        overflow: hidden;
        text-align: center;
        li{
          float: left;
          width: 120px;
          height: 40px;
          span{
            display: inline-block;
            padding: 5px 20px;
            font-size: 15px;
            font-weight: 700;
            position: relative;
            color: #C02897;
            line-height: 19px;
            border: 1px solid transparent;
            border-radius: 5px;
            cursor: pointer;
            transition: .1s ease-in-out;
            &:before {
              content: attr(text);
              position: absolute;
              z-index: 10;
              color: #ffc966;
              mask: linear-gradient(pink -50%, transparent);
            }
            &:hover{
              border-color: #C02897;
            }
          }
          span.active{
            background: white;
          }
        }
      }
    }
    .container{
      margin-top: 40px;
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      position: relative;
      .setting{
        position: absolute;
        top: -82px;
        right: 24px;
        span{
          display: inline-block;
          padding: 5px 20px;
          font-size: 15px;
          font-weight: 700;
          position: relative;
          color: #C02897;
          line-height: 19px;
          border: 1px solid transparent;
          border-radius: 5px;
          cursor: pointer;
          transition: .5s ease-in-out;
          &:before {
            content: attr(text);
            position: absolute;
            z-index: 10;
            color: #ffc966;
            mask: linear-gradient(pink -50%, transparent);
          }
        }
        img{
          position: absolute;
          left: 76px;
          top: 6px;
          vertical-align: sub;
        }
      }
      .lotterPanel{
        width: 364px;
        height: 287px;
        box-sizing: border-box;
        margin-bottom: 20px;
        position: relative;
        transition: .1s ease-in-out;
        .panel{
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 2;
          background: url("http://172.16.135.103/ui/gfx_frontend/lottery/box_1.png") center center no-repeat;
          .img{
            margin: 35px 25px;
            float: left;
          }
          .info{
            margin-top: 35px;
            float: left;
            line-height: 35px;
            .title{
              font-size: 24px;
            }
            .periods{
              font-size: 16px;
              span{
                font-size: 16px;
                color: red;
              }
            }
            .seconds{
              ul{
                overflow: hidden;
                li{
                  float: left;
                  width: 45px;
                  span{
                    width: 35px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    display: block;
                    background: $--color-text-primary;
                    margin: 2.5px;
                    color: white;
                    padding: 0 5px;
                    box-sizing: border-box;
                    position: relative;
                  }
                  span:first-child{
                    font-size: 18px;
                    i{
                      position: absolute;
                      left:39px;
                      font-weight: bold;
                      color: $--color-text-primary;
                      top: 0;
                    }
                  }
                  span:last-child{
                    height: 25px;
                    line-height: 25px;
                  }
                }
              }
            }
          }
          .tendency{
            cursor: pointer;
            position: absolute;
            bottom: 15px;
            left: 20px;
            span{
              display: inline-block;
              padding-left: 30px;
              color: white;
              font-size: 16px;
              background: url("http://172.16.135.103/ui/gfx_frontend/lottery/bt.png") left center no-repeat;
            }
          }
          .vote{
            cursor: pointer;
            position: absolute;
            bottom: 15px;
            right: 30px;
            color: white;
            font-size: 16px;
          }
        }
        &:hover{
          transform: translateY(-5px);
          box-shadow: 15px 0 15px -15px $--color-text-primary,
          -15px 0 15px -15px $--color-text-primary;
        }
        &:before{
          content: '';
          width:80px;
          height: 20px;
          position: absolute;
          bottom: 25px;
          left: 5px;
          transform: rotate(-5deg);
          box-shadow: 0px 27px 11px 3px rgba(0,0,0,.8);
        }
        &:after{
          content: '';
          width:80px;
          height: 20px;
          position: absolute;
          bottom: 25px;
          right: 5px;
          transform: rotate(5deg);
          box-shadow: 0px 27px 8px 3px rgba(0,0,0,.8);
        }
      }
    }
  }
}
</style>
