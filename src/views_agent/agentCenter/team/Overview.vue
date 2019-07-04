<template>
  <div class="box">
    <ul>
      <li v-for="(item, idx) in overview" :key="idx">
        <h2><span><i :class="[`iconfont ${item.icon}`]"></i></span><strong>{{item.label}}</strong></h2>
        <h3 :class="idx === 3 ? (item.count > 0 ? 'win' : 'lose') : ''">{{item.count}}{{idx === 3 ? '' : '人'}}</h3>
      </li>
    </ul>
    <ul>
      <li v-for="(team, idx) in teams" :key="idx" class="no-border">
        <h4>{{team.name}}</h4>
        <p v-for="(item, index) in team.detail" :key="index">{{item.label}}：{{item.count}}{{idx === 0 ? '人': ''}}</p>
      </li>
    </ul>
    <ul>
      <li v-for="(link, index) in links" :key="index" class="wrap">
        <button v-pointer :data-clipboard-text="link.label" :class="`btn${index}`">
          <span>推广地址:{{link.label}}</span>
          <a href="javascript:void(0)" @click="handleCopy(`.btn${index}`)">复制</a>
          <a href="javascript:void(0)" @click="handleDownloadQRcode(link.qrAddr)">下载二维码</a>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import handleCopy from '@/assets/scripts/clipboard'
import CONFIG from './overview.config'
// import store from '@/store/share.store'
export default {
  name: 'Overview',
  data () {
    return {
      ...CONFIG
    }
  },
  methods: {
    handleCopy, // 复制
    handleDownloadQRcode (img) { // 下载Qr图片
      // console.log(img)
    }
  },
  beforeRouteEnter (to, from, next) {
    // store.commit('SET_TAB_TITLE', '团队概况')
    next(vm => {
      vm.$emit('change-highlight', to)
    })
  }
}
</script>

<style scoped lang="scss">
.box {
  box-sizing: border-box;
  padding: 20px 15px;
  background: #fff;
  margin: 10px 25px;
  border-radius: 5px;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 1;
      margin: 10px;
      border: 1px solid #cbd1e3;
      h2 {
        height: 70px;
        display: inline-block;
        width: 100%;
        span {
          display: inline-block;
          width: 80px;
          height: 50px;
          background: #8897bd;
          margin-top: 10px;
          text-align: center;
          line-height: 50px;
          i {
            font-size: 35px;
            color: #fff;
          }
        }
        strong {
          float: right;
          font-size: 14px;
          color: #636262;
          margin-top: 10px;
          margin-right: 10px;
        }
      }
      h3 {
        font-size: 35px;
        line-height: 60px;
        text-indent: 10px;
        color: #636262;
        margin-bottom: 8px;
        &.win {
          color: #84d078;
        }
        &.lose {
          color: #ce5656
        }
      }
      h4 {
        height: 55px;
        border-bottom: 3px solid #dbe1f0;
        line-height: 55px;
        color: #636262;
        font-size: 18px;
        text-indent: 10px;
        margin-bottom: 30px;
      }
      p {
        font-size: 14px;
        color: #636262;
        text-indent: 10px;
        line-height: 25px;
      }
      &.no-border {
        border: none;
      }
      &.wrap {
        flex: 1 0 25%;
        margin: 10px 0;
        box-sizing: border-box;
        border:none;
      }
      button {
        height: 55px;
        margin-left: 10px;
        width: 95%;
        border: none;
        outline: none;
        background: #8897bd;
        span {
          font-size: 14px;
          color: #fff;
        }
        a {
          color: #fff;
          margin: 0 10px;
          display: none;
        }
        &:hover {
          background: #4b5879;
          a {
            display: inline;
          }
          span {
            display: none;
          }
        }
      }
    }
    &:last-child {
      margin-top: 30px;
    }
  }
}
</style>
