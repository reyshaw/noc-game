<template>
  <div class="wrapper">
    <filter-condition>
      <template slot="base-query">
        <ul>
          <li>
            操作时间:
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
            操作类型:
            <el-select v-model="depositClaim.optType" size="mini" style="width: 100px;">
              <el-option :value="0" label="全部"></el-option>
              <el-option :value="1" label="存款"></el-option>
              <el-option :value="2" label="取款"></el-option>
            </el-select>
          </li>
          <li>
            状态:
            <el-select v-model="depositClaim.status" size="mini" style="width: 100px;">
              <el-option :value="0" label="全部"></el-option>
              <el-option :value="1" label="待处理"></el-option>
              <el-option :value="2" label="处理中"></el-option>
              <el-option :value="3" label="成功"></el-option>
              <el-option :value="4" label="拒绝"></el-option>
              <el-option :value="5" label="待支付"></el-option>
            </el-select>
          </li>
          <li>
            成员账号: <el-input style="width: 150px;" placeholder="请输入成员账号" size="mini" v-model="depositClaim.memberAccount"></el-input>
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
      <el-table-column prop="date" label="成员账号"></el-table-column>
      <el-table-column prop="name" label="交易号"></el-table-column>
      <el-table-column prop="name" label="操作时间"></el-table-column>
      <el-table-column prop="name" label="操作类型"></el-table-column>
      <el-table-column prop="name" label="金额"></el-table-column>
      <el-table-column prop="name" label="账号余额"></el-table-column>
      <el-table-column prop="name" label="状态"></el-table-column>
      <el-table-column prop="name" label="操作"></el-table-column>
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
import Pagination from '@/components/noc_pagination'
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
      depositClaim: {
        optType: 0, // 操作类型
        status: 0, // 状态
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
