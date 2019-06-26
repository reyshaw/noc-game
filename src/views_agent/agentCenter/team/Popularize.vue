<template>
  <div class="box">
    <h1>推广地址:
      <input type="text" placeholder="http://" v-model="searchText"/>
      <i class="iconfont iconfangdajing" v-pointer @click="onSearch"></i>
    </h1>
    <ul>
      <li v-for="(item, idx) in glimpse" :key="idx">
        <div>
          <h1>{{item.label}}
            <a href="javascript: void(0)"
               v-if="idx===glimpse.length-1"
               :class="idx===glimpse.length-1 ? 'link' : ''"
               :data-clipboard-text="idx===glimpse.length-1 ? item.value : ''"
               @click="handleCopy('.link')">复制</a>
          </h1>
          <p>{{item.value}}</p>
        </div>
      </li>
    </ul>
    <div class="qr-box">
      <h1>推广二维码</h1>
      <div class="img">
        <div class="left" :class="imgSize===0 ? '' : (imgSize===1?'medium':'big')"></div>
        <div class="right" :class="{'medium': imgSize===1}">
          <p>图片尺寸</p>
          <p><input type="radio" v-model="imgSize" :value="0" /> 小: 96 * 96</p>
          <p><input type="radio" v-model="imgSize" :value="1" /> 中: 256 * 256</p>
          <p><input type="radio" v-model="imgSize" :value="2" /> 大: 400 * 400</p>
        </div>
      </div>
      <div class="btns">
        <button v-pointer @click="onPrint">打印二维码</button>
        <button v-pointer>下载二维码</button>
      </div>
      <div class="text">
        <p>使用推广二维码</p>
        <p>1. 按需选择【推广二维码】的图片尺寸；</p>
        <p>2.【下载二维码图片】可保存图片至电脑上或通过电脑上的QQ、微信等方式发送至手机上，也可直接发到论坛，贴吧，朋友圈.... 里推广了。</p>
        <p>3. 如需打印二维码，可直接点击【打印】按钮，打印尺寸请在点击【打印】按钮后弹出的打印设置中自行设置。</p>
      </div>
    </div>
  </div>
</template>

<script>
import handleCopy from '@/assets/scripts/clipboard'
export default {
  name: 'Popularize',
  data () {
    return {
      searchText: '',
      imgSize: 1,
      glimpse: [
        {label: '今日点击数', value: '678'},
        {label: '昨日点击数', value: '29368'},
        {label: '本月总点击', value: '29368'},
        {label: '今日注册人数', value: '18'},
        {label: '昨日注册人数', value: '573'},
        {label: '本月注册总数', value: '573'},
        {label: '今日转化率', value: '3%'},
        {label: '昨日转换率', value: '5%'},
        {label: '本月转化率', value: '4.3%'},
        {label: '我的推荐码', value: 'RXRTY'},
        {label: '推广地址', value: 'http://www.ogbaowang.com/'}
      ]
    }
  },
  methods: {
    handleCopy,
    onSearch () {
      console.log(1111)
    },
    onPrint () {
      console.log(this.imgSize)
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  background: #fff;
  margin: 10px 20px;
  border-radius: 5px;
  padding-bottom: 20px;
  box-sizing: border-box;
  h1 {
    height: 50px;
    line-height: 50px;
    text-align: right;
    margin-right: 20px;
    font-size: 14px;
    color: #222;
    position: relative;
    input {
      width: 160px;
      height: 30px;
      margin-left: 20px;
      text-indent: 15px;
      font-size: 14px;
      border: 1px solid #767676;
      border-radius: 3px;
    }
    i {
      font-size: 16px;
      position: absolute;
      right: 0;
      width: 30px;
      text-align: center;
      height: 30px;
      line-height: 30px;
      top: 10px;
    }
  }
  ul {
    width: 95%;
    margin-left: 20px;
    display: flex;
    flex-wrap: wrap;
    color: #636262;
    font-size: 14px;
    padding-bottom: 20px;
    li {
      flex: 1 0 16%;
      height: 107px;
      border-bottom: 6px solid #8897bd;
      box-sizing: border-box;
      margin: 20px 0 0 0.6%;
      div {
        width: 100%;
        height: 98px;
        border: 1px solid #8897bd;
        box-sizing: border-box;
        h1 {
          font-size:14px;
          color: #636262;
          text-align: left;
          text-indent: 10px;
          a {
            float: right;
            color: #3b84fb;
            font-size: 14px;
            display: none;
          }
        }
        p {
          font-size: 25px;
          color: #636262;
          text-align: center;
          line-height: 30px;
        }
      }
      &:last-child {
        flex: 1 1 32.7%;
        margin-left: 0.6%;
      }
      &:hover {
        div h1 a {
          display: inline;
        }
      }
    }
  }
  .qr-box {
    width: 445px;
    background: #d7e2f7;
    border: 1px solid #afcbfa;
    border-radius: 5px;
    margin-left: 25px;
    box-sizing: border-box;
    padding: 0 20px;
    h1 {
      text-align: left;
      color: #222;
      font-size: 14px;
      font-weight: bold;
    }
    .img {
      width: 100%;
      .left {
        width: 96px;
        height: 96px;
        background: blue;
        display: inline-block;
        border-radius: 10px;
        &.medium {
          width: 256px;
          height: 256px;
        }
        &.big {
          width: 400px;
          height: 400px;
        }
      }
      .right {
        display: inline-block;
        font-size: 14px;
        color: #636262;
        p {
          line-height: 25px;
          margin-left: 20px;
          font-size: 14px;
          input{
            width: 16px;
            height: 16px;
          }
        }
        &.medium {
          position: relative;
          top: -80px;
        }
      }
    }
    .btns {
      width: 100%;
      text-align: center;
      button {
        width: 140px;
        height: 33px;
        line-height: 33px;
        font-size: 14px;
        color: #fff;
        outline: none;
        border: 1px solid #2b5fb5;
        border-radius: 5px;
        background: #2b5fb5;
        margin: 15px;
      }
    }
    .text {
      p {
        font-size: 14px;
        color: #636262;
        margin: 10px;
        line-height: 22px;
      }
    }
  }
}
</style>
