<template>
  <div class="nocPopuper">
    <div class="popTitle">
      <h1>{{this.adList[active].subTitle}}</h1>
      <h4>活动时间：{{this.startTime}} - {{this.endTime}}</h4>
      <div class="nextBtm" @click="mouseEnter(active+1)"><i class="el-icon-caret-right"></i></div>
    </div>
    <div class="popBanner">
      <div class="swiper">
        <img class="animated fadeIn" :src="'http://172.16.135.103/ui/gfx_frontend/promotions/qr_activity_'+this.imgUrlCode+'.png'" alt="">
      </div>
      <!-- swiper2 Thumbs -->
      <div class="swiperThumbs">
        <h3>其他活动</h3>
        <el-scrollbar
          :native="false"
          style="height: 90%;width: 100%">
        <div class="gallery-thumbs">
          <div class="thumbs" v-for="(item, index) in adList" :key="index">
            <div :class="{smallList:true,active:active===index}" class="animated flipInX faster">
              <img :src="'http://172.16.135.103/ui/gfx_frontend/promotions/qr_activity_small_' + item.imgUrlCode + '.png'" :alt="item.subTitle">
              <div class="info">
                <span class="title">{{item.title}}</span>
                <span class="subTitle">{{item.subTitle}}</span>
                <el-button type="primary">下载</el-button>
              </div>
            </div>
            <div :class="{miniList:true,unactive:active===index}" class="animated" @click="mouseEnter(index)">
              <img :src="'http://172.16.135.103/ui/gfx_frontend/promotions/qr_activity_mini_' + item.imgUrlCode + '.png'" :alt="item.subTitle">
              <span>{{item.subTitle}}</span>
            </div>
          </div>
        </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="popContent">
      <div class="popContainer">
        <p class="title">活动优惠条款：</p>
        <ul  class="title">
          <li><p> 需将电脑版CQ9电子放在电子类二级导航栏的第一顺位</p></li>
          <li><p> 需将电脑版CQ9电子放在电子类二级导航栏的第一顺位</p></li>
          <li><p> 需将电脑版CQ9电子放在电子类二级导航栏的第一顺位</p></li>
          <li><p> 需将电脑版CQ9电子放在电子类二级导航栏的第一顺位</p></li>
          <li><p> 需将电脑版CQ9电子放在电子类二级导航栏的第一顺位</p></li>
          <li><p> 需将电脑版CQ9电子放在电子类二级导航栏的第一顺位</p></li>
          <li><p> 需将电脑版CQ9电子放在电子类二级导航栏的第一顺位</p></li>
        </ul>
        <p class="title">活动详情</p>
        <p>当cq9电子累计有效投注达到活动规定数额后，CQ9电子在原有我司时间占成的基础上再给与不同百分比的优惠，具体标准如下：</p>
      </div>
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
</template>

<script>
export default {
  name: 'noc_popuper',
  data () {
    const startTime = new Date()
    const endTime = new Date()
    return {
      popTitle: '东方传奇 巅峰让利',
      startTime: this.moment(startTime).format('ll'),
      endTime: this.moment(endTime).format('ll'),
      active: 0,
      adList: [
        {imgUrlCode: 'xcd', title: '宣传单', subTitle: '东方传奇 巅峰让利1'},
        {imgUrlCode: 'xcd', title: '宣传单', subTitle: '东方传奇 巅峰让利2'},
        {imgUrlCode: 'xcd', title: '宣传单', subTitle: '东方传奇 巅峰让利3'},
        {imgUrlCode: 'xcd', title: '宣传单', subTitle: '东方传奇 巅峰让利4'},
        {imgUrlCode: 'xcd', title: '宣传单', subTitle: '东方传奇 巅峰让利5'},
        {imgUrlCode: 'xcd', title: '宣传单', subTitle: '东方传奇 巅峰让利6'},
        {imgUrlCode: 'xcd', title: '宣传单', subTitle: '东方传奇 巅峰让利7'},
        {imgUrlCode: 'xcd', title: '宣传单', subTitle: '东方传奇 巅峰让利8'}
      ],
      imgUrlCode: '',
      swiperOptionTop: {
        spaceBetween: 10
      },
      swiperOptionThumbs: {
        direction: 'vertical',
        slidesPerView: 5,
        slidesPerColumn: 1,
        centeredSlides: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        mousewheel: true,
        touchRatio: 0.2,
        slideToClickedSlide: true
      }
    }
  },
  mounted () {
    this.imgUrlCode = this.adList[0].imgUrlCode
  },
  methods: {
    mouseEnter (i) {
      // console.log(i)
      this.active = i
      this.imgUrlCode = this.adList[i].imgUrlCode
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/global";
.nocPopuper{
  .popTitle{
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    overflow: hidden;
    h1{
      margin-top: 20px;
      font-size: 60px;
      line-height: 100px;
      color: $--color-text-primary;
    }
    h4{
      font-size: 20px;
      line-height: 30px;
      padding-bottom: 15px;
    }
    .nextBtm{
      cursor: pointer;
      height: 205px;
      width: 50px;
      background-color: #EBEBEB;
      position: absolute;
      right: -5px;
      top: -25px;
      line-height: 230px;
      i{
        font-size: 30px;
      }
    }
  }
  .popBanner{
    display: flex;
    .swiper, .swiperThumbs{
      height: 708px;
    }
    .swiper{
      width: 72.8%;
    }
    .swiperThumbs{
      width: 27%;
      background-color: #EBEBEB;
      h3{
        font-size: 20px;
        margin-top: 21px;
        margin-left: 17px;
        margin-bottom: 10px;
        color: $--color-text-primary;
      }
    }
    .swiper-container {
      background-color: #EBEBEB;
    }
    .gallery-top {
      height: 100%!important;
    }
    .gallery-thumbs {
      height: 90%!important;
      box-sizing: border-box;
      .thumbs{
        overflow: hidden;
        .miniList{
          cursor: pointer;
          background-color: #EBEBEB;
          padding: 15px 20px;
          img{
            vertical-align: top;
          }
          span{
            font-size: 18px;
            color: $--color-text-primary;
            display: inline-block;
            margin-left: 20px;
            line-height: 30px;
          }
        }
        .smallList{
          display: none;
          border-top: 2px solid #D9D9D9;
          border-bottom: 2px solid #D9D9D9;
          padding: 20px;
          overflow: hidden;
          background-color: #EBEBEB;
          img{
            float: left;
          }
          .info{
            margin-left: 30px;
            float: left;
            span{
              display: block;
              color: $--color-text-primary;
            }
            .title{
              line-height: 40px;
              font-size: 20px;
              font-weight: bold;
            }
            .subTitle{
              line-height: 80px;
              font-size: 20px;
            }
          }
        }
        .active{
          display: block;
        }
        .unactive{
          display: none;
        }
      }
    }
  }
  .popContent{
    width: 100%;
    padding: 80px;
    box-sizing: border-box;
    .popContainer{
      .title{
        display: block;
        margin-bottom: 20px;
      }
      p{
        color: $--color-text-primary;
        font-size: 16px;
        line-height: 25px;
      }
      ul{
        margin-left: 14px;
        list-style-type: decimal;
        li{
          text-indent: 2rem;
        }
      }
    }
    table {
      text-align: center;
      border: 1px solid $--color-text-primary;
      margin: 20px auto;
      width: 80%;
    }
  }
}
</style>
