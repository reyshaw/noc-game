<template>
  <div class="wrapper">
    <section class="home-content">
      <h1></h1>
      <div class="home-banner">
        <h2>佣金支付</h2>
        <p>系统可提供每月多次返佣，代理佣金每期依照方案清算后，代理业绩归零并重新开始新一期计算；</p>
        <p>每期佣金与代理确认金额并结算后，佣金将发放至代理账户的“我的佣金”里；</p>
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
  name: 'commissionPay',
  data () {
    return {
    }
  },
  components: {
    Slider,
    Contact
  },
  computed: mapGetters(['CONFIG', 'SUPER_IDS']),
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
        min-width: 1200px;
        margin: 0 auto;
        height: 670px;
        overflow: hidden;
        box-sizing: border-box;
        background: url("../../assets/imgs/agent/pay-bg.jpg") no-repeat center center;
        color: #fff;
        text-indent: 30px;
        h2 {
          margin-top: 500px;
          font-size: 35px;
          margin-bottom: 20px;
        }
        p {
          font-size: 25px;
          line-height: 40px;
          text-indent: 35px;
        }
      }
    }
  }
</style>
