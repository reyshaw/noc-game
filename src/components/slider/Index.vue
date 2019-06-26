<template>
  <section>
    <el-carousel indicator-position="inside" id="home-el-carousel" :height="_height + 'px'">
      <el-carousel-item v-for="(img, idx) in imgURLS" :key="idx">
        <div :style="{backgroundImage: `url(${img})`}"></div><!--{{ img }}-->
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script>
export default {
  name: 'Index',
  props: {
    _height: {
      type: String,
      default: '550'
    }
  },
  data () {
    return {
      imgURLS: [
        '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/4ab57e5f-220e-45e1-92cd-e5d9652eb2d4.jpg',
        '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/7c3960e7-8f47-4c5c-8490-71d6b6bf998b.jpg',
        '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/af9e7e4e-af5b-4236-8084-0d73be0d76a7.png',
        '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/e74edb5e-f2d3-4350-a559-a542fdcc8e1e.jpg',
        '//preciousmetal.com.cn/v19/uploads/images/interim/o00102/097bbe13-fc8b-4190-865c-94d7592afe61.jpg'
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  section{
    .el-carousel__item {
      div {
        color: #475669;
        font-size: 18px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        height: 100%;
        margin: 0;
        /*&.banner-0 {
          background-image: url('../../assets/imgs/home/banner/banner_0.jpg');
        }
        &.banner-1 {
          background-image: url('../../assets/imgs/home/banner/banner_1.jpg');
        }
        &.banner-2 {
          background-image: url('../../assets/imgs/home/banner/banner_2.jpg');
        }
        &.banner-3 {
          background-image: url('../../assets/imgs/home/banner/banner_3.jpg');
        }
        &.banner-4 {
          background-image: url('../../assets/imgs/home/banner/banner_4.jpg');
        }*/
      }
    }
  }
</style>
