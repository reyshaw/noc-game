<template>
  <div class="wrapper">
   <!-- <section class="home-content">
      <div class="home-banner">
        <el-carousel indicator-position="inside" id="home-el-carousel" height="550px">
          <el-carousel-item v-for="item in 4" :key="item">
            <div :class="`banner-${item}`">{{ item }}</div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style scoped lang="scss">
  .wrapper {
    section.home-content {
      width: 100%;
      height: auto;
      background: url("../../assets/imgs/home/index-bg.png") no-repeat center;
      background-position-y: 547px;

      .home-banner {
        width: 100%;
        height: 550px;
        overflow: hidden;
        box-sizing: border-box;

        .el-carousel__item {
          div {
            color: #475669;
            font-size: 18px;
            background: url('../../assets/imgs/home/banner/banner_1.png') no-repeat center center;
            background-size: cover;
            height: 552px;
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
    }
  }
</style>
