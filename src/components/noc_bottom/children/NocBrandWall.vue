<template>
  <div class="brandwall-container">
    <div class="content">
      <div class="left" v-hidden>
        <ul>
          <li>
            <img src="~@/assets/imgs/footer/jdb.png" alt="">
            <img src="~@/assets/imgs/footer/bg.png" alt="">
            <img src="~@/assets/imgs/footer/bbin.png" alt="">
          </li>
          <li>
            <img src="~@/assets/imgs/footer/allbet.png" alt="">
            <img src="~@/assets/imgs/footer/fy.png" alt="">
            <img src="~@/assets/imgs/footer/ag.png" alt="">
          </li>
          <li>
            <img src="~@/assets/imgs/footer/fg.png" alt="">
            <img src="~@/assets/imgs/footer/sg.png" alt="">
            <img src="~@/assets/imgs/footer/ky.png" alt="">
          </li>
        </ul>
      </div>
      <div class="right" v-hidden>
        <ul>
          <li>
            <img src="~@/assets/imgs/footer/lebo.png" alt="">
            <img src="~@/assets/imgs/footer/sunbet.png" alt="">
            <img src="~@/assets/imgs/footer/pragmaticplay.png" alt="">
          </li>
          <li>
            <img src="~@/assets/imgs/footer/vg.png" alt="">
            <img src="~@/assets/imgs/footer/hat.png" alt="">
            <img src="~@/assets/imgs/footer/playgo.png" alt="">
            <img src="~@/assets/imgs/footer/dz.png" alt="">
          </li>
          <li>
            <img src="~@/assets/imgs/footer/ebet.png" alt="">
            <img src="~@/assets/imgs/footer/pg.png" alt="" style="margin-left:-15px;">
            <img src="~@/assets/imgs/footer/cmd368.png" alt="" style="margin-left:-15px;">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'noc_brand_wall'
}
</script>

<style lang="scss" scoped>
.brandwall-container {
  width: 100%;
  height: 325px;
  margin-top: 173px;
  background: url("../../../assets/imgs/icons/brand_wall_bg.jpg") repeat-x;
  .content {
    width: 1200px;
    height: 325px;
    background: url("../../../assets/imgs/footer/brand.jpg") no-repeat center center;
    margin: 0 auto;
    margin-top: -2px;
    div {
      width: 430px;
      height: 325px;
      float: left;
      ul {
        width: 430px;
        margin-top: 60px;
        li {
          img {
            margin-left: 35px;
          }
        }
      }
      &.right {
        float: right;
        ul {
          li {
            img {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
