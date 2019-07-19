<template>
  <div class="return-content">
    <div class="title">
      <h1>您当前可获得全部返水</h1>
      <el-button class="search">一键查询</el-button>
      <el-button type="info" class="get">一键领取</el-button>
    </div>
    <div class="sumUp">
      <div class="betSumUp sumUpItem">
        <h2>投注总金额</h2>
        <span>￥{{totalBet}}</span>
      </div>
      <div class="returnSumUp sumUpItem">
        <h2>返水总金额</h2>
        <span>￥{{totalReturn}}</span>
      </div>
    </div>
    <div class="returnList">
      <div class="returnItem" v-for="(item, index) in returnList" :key="index">
        <div class="detailTitle">
          <span class="platName">{{item.gameprovider}}{{item.gamecategory | getName }}</span>
          <span>返水 {{item.waterRatio}}</span>
        </div>
        <div class="content">
          <div>投注金额：{{item.betTotal}}<a href="javascript: void(0);" @click="fechData(item.gameprovider)">查询</a></div>
          <div>返水金额：{{item.waterAmount}}<a href="javascript: void(0);" @click="getReturn(item.gameprovider, item.gamecategory)">领取</a></div>
        </div>
      </div>
    </div>
    <div class="prompt">
      <warm-prompt :title="'温馨提示'">
        <template slot="base-query">
          <ul>
            <li>提款前，您必须至少完成100%存款额的投注！</li>
            <li>最低提款：RMB 1.00。</li>
            <li>服务费用：免费。</li>
            <li>处理时间：3-10分钟。</li>
            <li>相关部门审阅并核实后，系统会把取款资金从您的游戏账户转账到您指定的银行账户！</li>
            <li>如出现存款失败, 请联系在线客服获取帮助。<a href="javascript: void (0);" style="color: #409eff;font-size: 14px"> 联系线上客服</a></li>
          </ul>
        </template>
      </warm-prompt>
    </div>
  </div>
</template>

<script>
import WarmPrompt from '@/views/memberCenter/wedgit/WarmPrompt'
import { PATH_SELECTWATER_CLIENT, PATH_GETWATER_CLIENT } from '@/service/member/member_center.url'
export default {
  name: 'return_water',
  components: {
    WarmPrompt
  },
  data () {
    return {
      returnList: [
        {platformName: 'AG电子', proportion: '0.8%', betAmount: '2000.00', returnAmount: '160.00'},
        {platformName: 'AG电子', proportion: '0.8%', betAmount: '2000.00', returnAmount: '160.00'},
        {platformName: 'AG电子', proportion: '0.8%', betAmount: '2000.00', returnAmount: '160.00'},
        {platformName: 'AG电子', proportion: '0.8%', betAmount: '2000.00', returnAmount: '160.00'},
        {platformName: 'AG电子', proportion: '0.8%', betAmount: '2000.00', returnAmount: '160.00'},
        {platformName: 'AG电子', proportion: '0.8%', betAmount: '2000.00', returnAmount: '160.00'}
      ],
      totalBet: '0.00',
      totalReturn: '0.00'
    }
  },
  mounted () {
    this.fechData()
  },
  filters: {
    getName (value) {
      let name
      switch (value) {
        case 'slot':
          name = '电子'
      }
      return name
    }
  },
  methods: {
    fechData (p) {
      let payload = {
        gameprovider: p
      }
      this.post(PATH_SELECTWATER_CLIENT, payload).then(res => {
        // console.log(res)
        this.totalBet = parseFloat(res.data.validbetTotal).toFixed(2)
        this.totalReturn = parseFloat(res.data.backwaterAmount).toFixed(2)
        this.returnList = res.data.eachGameTotals
      }, err => {
        this.$message.error(err)
      })
    },
    getReturn (p, c) {
      let payload = {
        gameprovider: p,
        gamecategory: c
      }
      this.post(PATH_GETWATER_CLIENT, payload).then(res => {
        // console.log(res)
      }, err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.return-content{
  margin: 20px auto;
  // width: 1350px;
  height: auto;
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  position: relative;
  .title{
    h1{
      font-size: 25px;
      color: #67757C;
      line-height: 50px;
      text-align: center;
      font-family: "Microsoft YaHei",serif;
    }
    .search{
      display: inline-block;
      position: absolute;
      right: 120px;
      top: 10px;
    }
    .get{
      display: inline-block;
      position: absolute;
      right: 20px;
      top: 10px;
    }
  }
  .sumUp{
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .sumUpItem{
      width: 49%;
      text-align: center;
      line-height: 64px;
      h2{
        background-color: #F0F0F0;
        font-size: 25px;
        color: #67757C;
        font-family: "Microsoft YaHei",serif;
      }
      span{
        display: inline-block;
        font-size: 35px;
        color: #67757C;
        font-family: "Microsoft YaHei",serif;
        line-height: 84px;
      }
    }
  }
  .returnList{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .returnItem{
      border: 1px solid #C9D0E2;
      width: 49%;
      line-height: 64px;
      margin-bottom: 20px;
      .detailTitle{
        padding-left: 20px;
        background-color: #F0F0F0;
      }
      .content{
        padding: 20px;
        line-height: 35px;
        div{
          font-size: 18px;
          a{
            display: inline-block;
            float: right;
          }
        }
      }
    }
  }
  .prompt{
    width: fit-content;
    margin: 0 auto;
  }
}
</style>
