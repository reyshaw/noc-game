<template>
    <div class = 'rightside'>
        <div class = "box" v-for="(item, index) in rightList" :key="index" @mouseenter = 'shownews(index)' @mouseleave="hidenews(index)">
          <div class = 'box-logo' :style="{backgroundImage: 'url(' + item.logo + ')', backgroundSize:'cover'}"></div>
          <div class = 'box-title'>{{item.title}}</div>
          <div class = 'box-news animated' v-if = 'item.IsShow' v-html = 'item.content' ref = "boxNews"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'RightSidebar',
  data () {
    return {
      rightList: [
        {
          title: '代理加盟',
          logo: '//172.16.135.103/ui/gfx_frontend/banker/bank_zfb.png',
          IsShow: false,
          content: '<div class = "proxy"></div>'
        },
        {
          title: '扫描二维码',
          logo: '//172.16.135.103/ui/gfx_frontend/banker/bank_zfb.png',
          IsShow: false,
          content: '<p>BBB</p>'
        },
        {
          title: '支付宝扫码支付',
          logo: '//172.16.135.103/ui/gfx_frontend/banker/bank_zfb.png',
          IsShow: false,
          content: '<p>CCC</p>'
        },
        {
          title: '联系客服',
          logo: '//172.16.135.103/ui/gfx_frontend/banker/bank_zfb.png',
          IsShow: false,
          content: '<p>DDD</p>'
        },
        {
          title: '联络方式',
          logo: '//172.16.135.103/ui/gfx_frontend/banker/bank_zfb.png',
          IsShow: false,
          content: '<p>EEE</p>'
        },
        {
          title: '',
          logo: '//172.16.135.103/ui/gfx_frontend/banker/bank_zfb.png',
          IsShow: false,
          content: '<p>FFF</p>'
        }
      ]
    }
  },
  methods: {
    shownews (index) {
      this.rightList[index].IsShow = true
      /* this.$nextTick(() => {
        console.log(this.$refs.boxNews)
        this.$refs.boxNews.addClass('slideInRight')
      }) */
    },
    hidenews (index) {
      this.rightList[index].IsShow = false
    }
  }
}
</script>

<style scoped lang="scss">
.rightside{
  z-index:9999;
  position:fixed;
  top:0;
  bottom:0;
  right:0;
  width:46px;
  background:#fff;
  padding:5% 3px 0 3px;
  .box{
    border-top: 1px solid #ccc;
    height: 15%;
    position:relative;
    .box-logo{
     height: 25%;
     margin:40% 0;
    }
    .box-title{
      text-align: center;
      height: 40%;
      white-space: pre-wrap;
      line-height:20px;
    }
    .box-news{
      position:absolute;
      top:0;
      left:-120px;
      background:#000;
      color:#fff;
      width:100px;
      height:100px;
      animation: showside 1s;
      animation-fill-mode: forwards;
      z-index:-1;
      overflow:hidden;
      .proxy{
        width: 100px;
        height: 100px;
        background:url('//172.16.135.103/ui/gfx_frontend/Sidebar/qr_proxy_banner.png') no-repeat;
      }
    }
  }
}
@keyframes showside
{
  from {left: 0;}
  to {left: -120px;}
}

@keyframes hideside
{
  from {left: -120px;}
  to {left: 0;}
}
</style>
