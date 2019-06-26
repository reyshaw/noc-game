<template>
  <div class="contain">
    <n-title em="代理加盟" :content="content"></n-title>
    <div class="ulbox">
      <ul>
        <li v-for="(adg, idx) in advantages" :key="idx" v-pointer>
          <div><img :src="require(`@/assets/imgs/agent/join/join_${adg.img}`)" :alt="adg.img"></div>
          <p>{{adg.label}}</p>
        </li>
      </ul>
      <div class="rec">还等什么？马上加盟吧。<a href="#">注册加入</a>，开始推广，赚取佣金，简单三步开始成就梦想之旅。</div>
    </div>
    <contact></contact>
  </div>
</template>

<script>
import Contact from './widget/Contact'
import NTitle from './widget/Title'
export default {
  name: 'Join',
  components: {
    Contact,
    NTitle
  },
  data () {
    return {
      content: '如今，网上博彩娱乐已经成为一个极具市场发展前景的热门产业。本公司凭借多年的博彩运营经验，目前已拥有极高的行业知名度和大批忠实用户，具有绝对的品牌优势。合作方式简单，零投资零风险，坐享高额佣金回报。如果您身边有对博彩感兴趣的朋友，请您不要犹豫，赶快加入这个一本万利的行业，充分利用您身边的人脉及网络资源！我们有专业的客服团队全年无休为您提供帮助。',
      advantages: [
        {img: '01.png', label: '高佣金 （代理佣金） 让你轻松月入百万'},
        {img: '02.png', label: '零风险，高回报，时出佣'},
        {img: '03.png', label: '全年度优惠不断，满足各种类型玩家需求'},
        {img: '04.png', label: '取款快速，实力雄厚资金有保障'},
        {img: '05.jpg', label: '营运多年，深受百万玩家信赖'},
        {img: '06.png', label: '拥有体育博彩与线上赌场执照，信誉保证'},
        {img: '07.png', label: '多年大力推广，品牌热度十足，代理可坐享广告品牌效应'},
        {img: '08.png', label: '据信息详尽，可查阅下线投注记录'}
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.contain {
  background: linear-gradient(#090937, #00002e);
  height: 1250px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  .ulbox {
    width: 90%;
    min-width: 1200px;
    height: 890px;
    background: linear-gradient(#0f2065, #081c4a);
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 40px;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 1200px;
      margin: 0 auto;
      li {
        flex: 1 0 280px;
        margin: 10px;
        div {
          width: 100%;
          height: 285px;
          border-radius: 5px;
          overflow: hidden;
          box-sizing: border-box;
          img {
            width: 100%;
          }
        }
        p {
          width: 80%;
          color: #fff;
          font-size: 16px;
          margin: 10px auto;
          text-align: center;
        }
        &:hover {
          margin-top:-2px;
        }
      }
    }
    .rec {
      width: 1200px;
      height: 50px;
      background: #fff;
      margin: 20px auto;
      font-size: 16px;
      text-align: center;
      line-height: 50px;
      color: #091c4c;
      a {
        font-size: 16px;
        color: #03abf2;
      }
    }
  }
}
</style>
