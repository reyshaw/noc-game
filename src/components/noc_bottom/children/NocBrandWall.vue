<template>
  <div class="brandwall-container">
    <div class="content">
      <div class="left" v-hidden>
        <ul>
          <li>
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/jdb.png" alt="">
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/bg.png" alt="">
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/bbin.png" alt="">
          </li>
          <li>
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/allbet.png" alt="">
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/fy.png" alt="">
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/ag.png" alt="">
          </li>
          <li>
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/fg.png" alt="">
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/sg.png" alt="">
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/ky.png" alt="">
          </li>
        </ul>
      </div>
      <div class="right" v-hidden>
        <ul>
          <li>
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/lebo.png" alt="">
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/sunbet.png" alt="">
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/pragmaticplay.png" alt="">
          </li>
          <li>
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/vg.png" alt="">
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/hat.png" alt="">
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/playgo.png" alt="">
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/dz.png" alt="">
          </li>
          <li>
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/ebet.png" alt="">
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/pg.png" alt="" style="margin-left:-15px;">
            <img src="http://172.16.135.103/ui/gfx_frontend/footer/cmd368.png" alt="" style="margin-left:-15px;">
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
  background: url("../../../assets/imgs/icons/brand_wall_bg.jpg") repeat-x;
  .content {
    width: 1200px;
    height: 325px;
    background: url("http://172.16.135.103/ui/gfx_frontend/footer/brand.jpg") no-repeat center center;
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
