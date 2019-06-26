<template>
  <div class="wrapper">
    <filter-condition>
      <template slot="base-query">
        <ul>
          <li>
            时间:
            <el-date-picker
              size="mini"
              v-model="timeZone"
              :picker-options="pickerOptions"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </li>
          <li>
            事件名称: <el-input style="width: 150px;" placeholder="请输入事件名称" size="mini" v-model="settlement.event"></el-input>
          </li>
          <li>
            满足返佣条件:
            <el-select v-model="settlement.rebateFlag" size="mini" style="width: 100px;">
              <el-option :value="0" label="全部"></el-option>
              <el-option :value="1" label="是"></el-option>
              <el-option :value="2" label="否"></el-option>
            </el-select>
          </li>
          <li>
            代理账号: <el-input style="width: 150px;" placeholder="请输入代理账号" size="mini" v-model="settlement.agentBelongs"></el-input>
          </li>
          <li>
            成员账号: <el-input style="width: 150px;" placeholder="请输入成员账号" size="mini" v-model="settlement.memberAccount"></el-input>
          </li>
          <li>
            <el-button type="success" @click="fetchList" size="mini">查询结果</el-button>
          </li>
        </ul>
      </template>
    </filter-condition>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column prop="date" label="事件名称"></el-table-column>
      <el-table-column prop="name" label="代理账号"></el-table-column>
      <el-table-column prop="name" label="有效会员"></el-table-column>
      <el-table-column prop="name" label="盈利金额"></el-table-column>
      <el-table-column prop="name" label="有效投注"></el-table-column>
      <el-table-column prop="name" label="游戏平台返佣金额" width="120"></el-table-column>
      <el-table-column prop="name" label="是否满足返佣条件" width="120"></el-table-column>
      <el-table-column prop="name" label="应获佣金"></el-table-column>
      <el-table-column prop="name" label="扣除费用"></el-table-column>
      <el-table-column prop="name" label="可获佣金"></el-table-column>
      <el-table-column prop="date" label="团队佣金"></el-table-column>
      <el-table-column prop="date" label="我的佣金"></el-table-column>
    </el-table>
    <pagination
      @page-num-change="onPageNumChange"
      @page-size-change="onPageSizeChange"
      :total="total">
    </pagination>
  </div>
</template>

<script>
import FilterCondition from '@/views/memberCenter/wedgit/FilterCondition'
import Pagination from '@/components/noc-pagination'
import pickerMix from '@/mixins/picker.mix'
import pageMix from '@/mixins/page.mix'
export default {
  name: 'Management_Member',
  mixins: [pickerMix, pageMix],
  components: {
    FilterCondition,
    Pagination
  },
  data () {
    return {
      settlement: {
        event: '', // 事件名称
        rebateFlag: 0, // 是否满足返佣条件
        agentBelongs: '', // 代理归属
        memberAccount: '' // 成员账号
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style scoped lang="scss">
  .el-table {
    margin-top: 10px;
    box-sizing: border-box;
  }
</style>
