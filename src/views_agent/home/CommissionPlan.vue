<template>
  <div class="contain">
    <n-title em="佣金方案" :content="content" :bottom="bottom"></n-title>
    <div class="table-box">
      <table>
        <thead>
          <tr><th rowspan="2">盈利总额</th><th rowspan="2">有效玩家</th><th colspan="4">退佣比例</th><th rowspan="2">佣金上限</th></tr>
          <tr><th>GD</th><th>DS</th><th>DW</th><th>KG</th></tr>
        </thead>
        <tbody>
          <template  v-for="tableItem in tableData">
            <tr v-for="(tr, idx) in tableItem" :key="Math.floor(Math.random() * 100000) + idx">
              <td :rowspan="tableItem.length" v-if="('totalProfit' in tr)">{{tr.totalProfit}}</td>
              <td :rowspan="tableItem.length"  v-if="('effectiveMembers' in tr)">{{tr.effectiveMembers}}</td>
              <td v-for="(item, key) in tr" :key="key" v-if="!(key==='totalProfit' || key==='effectiveMembers' || key==='commissionLimit')">{{item}}</td>
              <td :rowspan="tableItem.length" v-if="('commissionLimit' in tr)">{{tr.commissionLimit}}</td>
            </tr>
          </template>
            <tr>
              <td class="last" :colspan="Object.keys(tableData[0][0]).length">注：请谨记使用任何不诚实方式骗取代理佣金者将取消代理资格并永久冻结账号，佣金一律不予派发！</td>
            </tr>
        </tbody>
      </table>
    </div>
    <div class="p-box">
      <p>【相应费用】：含您线下玩家获得的返水，优惠等费用;</p>
      <p>【有效玩家】：您线下玩家的有效交易量需达到站长设定的值，该玩家才算有效玩家;</p>
      <p> 计算方式：根据您线下有效玩家产生的盈利总额，按照返佣方案的梯度，计算出各API下各类游戏的返佣，再用返佣总额减去您需承担的一定比例的相应费用，即是您应该获得的返佣金额;</p>
    </div>
    <contact></contact>
  </div>
</template>

<script>
import Contact from './widget/Contact'
import NTitle from './widget/Title'
import tableData from './commissionPlan.config'
export default {
  name: 'commissionPlan',
  components: {
    Contact,
    NTitle
  },
  data () {
    return {
      bottom: '我们提供多梯度返佣,您线下的玩家对公司产生的盈利越多,您能获得的佣金也就越多;',
      content: '以下为示意返佣方案，实际方案，请以您的管理中心显示为准;',
      tableData
    }
  }
}
</script>

<style scoped lang="scss">
  .contain {
    background: linear-gradient(#090937, #00002e);
   /* height: 1250px;*/
    height: auto;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 100px;
    .table-box {
      width: 1200px;
      background: yellow;
      margin: 0 auto;
      table {
        width: 100%;
        background: #3b84fb;
        th {
          border: 1px solid #6ca3fc;
          vertical-align: middle;
          background: #3b84fb;
          color: #fff;
          font-size: 16px;
        }
        td {
          vertical-align: middle;
          text-indent: 20px;
          background: #fff;
          border: 1px solid rgba(108,163,252, 0.3);
          font-size: 14px;
          line-height: 35px;
          &.last {
            background: #3b84fb;
            color: #fff;
            font-size: 16px;
            line-height: 40px;
          }
        }
      }
    }
    .p-box {
      width: 1200px;
      color: #fff;
      margin: 30px auto;
      p {
        font-size: 16px;
        line-height: 35px;
        padding-left: 50px;
        box-sizing: border-box;
      }
    }
  }
</style>
