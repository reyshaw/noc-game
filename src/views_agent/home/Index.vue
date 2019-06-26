<template>
  <div class="wrapper">
    <section class="home-content">
      <h1></h1>
      <div class="home-banner">
        <slider _height="670"></slider>
      </div>
      <contact></contact>
    </section>
  </div>
</template>

<script>
import Slider from '@/components/slider'
import Contact from './widget/Contact'
import {mapGetters} from 'vuex'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  components: {
    Slider,
    Contact
  },
  computed: mapGetters(['memberInfo', 'SUPER_IDS']),
  methods: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .wrapper {
    section.home-content {
      width: 100%;
      background: linear-gradient(#090937, #00002e);
      height: 870px;
      position: relative;
      h1 {
        height: 65px;
      }
      .home-banner {
        width: 90%;
        margin: 0 auto;
        height: 670px;
        overflow: hidden;
        box-sizing: border-box;
        background: blue;
      }
    }
  }
</style>
