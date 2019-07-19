<template>
  <section>
<!--    <el-carousel indicator-position="inside" id="home-el-carousel" :height="_height + 'px'">-->
<!--      <el-carousel-item v-for="(img, idx) in imgURLS" :key="idx">-->
<!--        <div :style="{backgroundImage: `url(${img})`}"></div>&lt;!&ndash;{{ img }}&ndash;&gt;-->
<!--      </el-carousel-item>-->
<!--    </el-carousel>-->
    <swiper :options="swiperOption">
      <swiper-slide  v-for="(img, idx) in imgURLS" :key="idx">
        <!-- <img ref="bannerImg" :src="img" alt="banner"/> -->
        <div class="bannerImg" :style="'background:url('+ img +') center center no-repeat'"></div>
      </swiper-slide>
      <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
    </swiper>
  </section>
</template>

<script>
export default {
  name: 'Index',
  props: {
    imgURLS: {
      type: Array,
      default () {
        return [
          '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/4ab57e5f-220e-45e1-92cd-e5d9652eb2d4.jpg',
          '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/7c3960e7-8f47-4c5c-8490-71d6b6bf998b.jpg',
          '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/af9e7e4e-af5b-4236-8084-0d73be0d76a7.png',
          '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/e74edb5e-f2d3-4350-a559-a542fdcc8e1e.jpg',
          '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/097bbe13-fc8b-4190-865c-94d7592afe61.jpg'
        ]
      }
    }
  },
  data () {
    return {
      // imgURLS: [
      //   '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/4ab57e5f-220e-45e1-92cd-e5d9652eb2d4.jpg',
      //   '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/7c3960e7-8f47-4c5c-8490-71d6b6bf998b.jpg',
      //   '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/af9e7e4e-af5b-4236-8084-0d73be0d76a7.png',
      //   '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/e74edb5e-f2d3-4350-a559-a542fdcc8e1e.jpg',
      //   '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/097bbe13-fc8b-4190-865c-94d7592afe61.jpg'
      // ],
      swiperOption: {
        effect: 'fade',
        loop: true,
        autoplay: true,
        delay: 5000, // 1秒切换一次
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet (index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`
          }
        }
        // on: {
        //   slideChangeTransitionEnd () {
        //   }
        // }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  section{
    width: 100%;
    .swiper-slide{
      .bannerImg{
        width: 100%;
        height: 450px;
        background-size: cover!important;
      }
    }
  }
  /*.swiper-slide-active{*/
  /*  img{*/
  /*    transform: scale(1.05);*/
  /*    transition: 5s linear;*/
  /*  }*/
  /*}*/
</style>
