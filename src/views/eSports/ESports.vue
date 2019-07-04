<template>
  <div class="wrapper">
    <div class="content">
      <header>
        <div class="search">
          <!--<el-input placeholder="搜索游戏" v-model="searchText">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>-->
          <input type="text" placeholder="搜索游戏" @blur="onSearch" v-model="searchText">
        </div>
        <div class="switch">
          <i class="iconfont iconcaidanzhengfangxing-" :class="{active: currentSwiper.name!=='3dCover'}" v-pointer @click="showSwiper('3dCover')"></i>
          <i class="iconfont iconfangxing-copy" :class="{active: currentSwiper.name!=='multiRow'}" v-pointer @click="showSwiper('multiRow')"></i>
        </div>
      </header>
      <main>
        <!-- 游戏厂商 bounceInUp zoomOutRight-->
        <transition name="custom-classes-transition"
                    mode="out-in"
                    enter-active-class="animated bounceInUp"
                    leave-active-class="animated zoomOutRight">
          <swiper :options="currentSwiper.option" :ref="currentSwiper.name" @someSwiperEvent="callback" :class="currentSwiper.className" :key="currentSwiper.name">
            <swiper-slide v-for="(item, index) in swiperList" :key="index">
              <img :src="require(`../../assets/imgs/esports/${item}`)" alt="item"  @click="enterGame(2890,0)">
            </swiper-slide>
          </swiper>
        </transition>
        <div class="swiper-button-prev" slot="button-prev" v-if="currentSwiper.name!=='3dCover'"><i class="iconfont iconleftarrow"></i></div>
        <div class="swiper-button-next" slot="button-next" v-if="currentSwiper.name!=='3dCover'"><i class="iconfont iconrightarrow"></i></div>
      </main>

    </div>
  </div>
</template>

<script>
// import GAME_PATH from '@/service/member/game.url'
import {mapGetters} from 'vuex'
import gameMix from '../../mixins/game.mix'
export default {
  name: 'eSport',
  mixins: [gameMix],
  data () {
    const swiper3dOption = {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }
    }
    const swiperMultiOption = {
      slidesPerView: 5,
      slidesPerColumn: 2,
      spaceBetween: 25,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
    return {
      searchText: '', // 搜索关键字
      swiperList: ['esport-1.jpg', 'esport-1.jpg', 'esport-1.jpg', 'esport-1.jpg', 'esport-1.jpg', 'esport-1.jpg', 'esport-1.jpg', 'esport-1.jpg', 'esport-1.jpg', 'esport-1.jpg', 'esport-1.jpg', 'esport-1.jpg', 'esport-1.jpg', 'esport-1.jpg', 'esport-1.jpg'],
      swiper3dOption,
      swiperMultiOption,
      currentSwiper: { // 当前的swiper
        name: '3dCover',
        className: 'box-cover',
        option: swiper3dOption
      }
    }
  },
  computed: {
    ...mapGetters(['SUPER_IDS']),
    swiper () {
      return this.$refs[this.currentSwiper.name].swiper
    }
  },
  created () {
    // this.post(GAME_PATH.PATH_LIST_PROVIDER, {
    //   category: 'ESports', // 游戏类型编码
    //   merchantId: this.SUPER_IDS.merchantId, // 商户id
    //   shareholderId: this.SUPER_IDS.shareholderId, // 股东id
    //   terminalType: CONST.TERMINAL_TYPE // 终端类型(1:pc,2:手机)
    // })
    // // console.log(GAME_PATH.PATH_LIST_PROVIDER)
    this.getPlatformUrl('ESports')
  },
  mounted () {
    this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    callback () {
      // console.log(`call back`)
    },
    showSwiper (currentSwiper) {
      this.currentSwiper.name = currentSwiper
      if (currentSwiper === '3dCover') {
        this.currentSwiper.className = 'box-cover'
        this.currentSwiper.option = this.swiper3dOption
      } else {
        this.currentSwiper.className = 'box-multi-row'
        this.currentSwiper.option = this.swiperMultiOption
      }
    },
    onSearch () {
      if (this.searchText.length) {
        // console.log(this.searchText)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  .wrapper {
    position: relative;
    overflow: hidden;
    .content {
      width: 100%;
      height: 1257px;
      background: url('../../assets/imgs/esports/bg-esport.jpg') no-repeat center center;
    }
    header {
      text-align: center;
      position: absolute;
      top: 522px;
      width: 100%;
      .search {
        width: 400px;
        height: 75px;
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        border: 2px solid #fff;
        border-radius: 55px;
        background: #120220;
        box-shadow: 0 0 3px 3px #fff;
        input {
          width: 80%;
          height: 60px;
          margin-top: 4px;
          background: none;
          outline: none;
          border: none;
          color:#fff;
          font-size: 30px;
        }
      }
      .switch {
        position: relative;
        top: 50px;
        height: 25px;
        box-sizing: border-box;
        display: inline-block;
        i {
          font-size: 25px;
          color: #fff;
          &:last-child {
            font-size: 58px;
            float: right;
            margin-top: -18px;
          }
          &.active {
            color: grey!important;
          }
        }
      }
    }
    main {
      position: relative;
      top: 723px;
    }
  }
  /** 第一个swiper**/
  .box-cover {
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 338px; // 338
      height: 423px; // 403
      background-color: rgba(0,0,0,0);
      img {
        width: 338px;
        height: 403px;
        border: 2px solid #e1e1e1;
        margin-top: 10px;
        border-radius: 5px;
      }
    }
  }
  /** 第二个swiper**/
  .box-multi-row {
    width: 1200px;
    height: 423px;
    .swiper-button-prev, swiper-button-next {
      background-color: #fff!important;
    }
    .swiper {
      width: 1200px;
      overflow: hidden;
    }
    .swiper-slide {
      width: 220px!important;
      height: 198px;
      overflow: hidden;
      border: 2px solid #e1e1e1;
      box-sizing: border-box;
      border-radius: 5px;
      img {
        width: 100%;
      }
    }
  }
  /** 上一个/ 下一个**/
  .swiper-button-next, .swiper-container-rtl .swiper-button-prev, .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
    background: none!important;
    background-color: #fff!important;
    width: 44px;
    border-radius: 50%;
    outline: none;
    i {
      font-size: 45px;
      position: relative;
      top: -2px;
    }
  }
  .swiper-button-next, .swiper-container-rtl .swiper-button-prev{
    right: 50%!important;
    margin-right: -680px;
  }
  .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
    left: 50%!important;
    margin-left: -680px;
  }
  .swiper-slide-active>img {
    box-shadow: 0 0 10px #e1e1e1;
  }
</style>
