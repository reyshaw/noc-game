<template>
  <div class="wrapper">
    <filter-condition>
      <template slot="base-query">
        <ul>
          <li>
            <el-select v-model="member.timeType" size="mini" style="width: 100px;">
              <el-option :value="0" label="投注时间"></el-option>
              <el-option :value="1" label="派彩时间"></el-option>
            </el-select>
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
            游戏类型:
            <el-button size="mini"
                       type="info"
                       icon="el-icon-edit"
                       style="background: #909399;"
                       v-model="member.gameTypes"
                       @click="dialogFormVisible=true">选取</el-button>
          </li>
          <li>
            状态:
            <el-select v-model="member.status" size="mini" style="width: 100px;">
              <el-option :value="0" label="全部"></el-option>
              <el-option :value="1" label="待结算"></el-option>
              <el-option :value="2" label="已结算"></el-option>
              <el-option :value="3" label="取消"></el-option>
            </el-select>
          </li>
          <li>
            成员账号: <el-input style="width: 150px;" placeholder="请输入成员账号" size="mini" v-model="member.memberAccount"></el-input>
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
      <el-table-column prop="name" label="游戏类型"></el-table-column>
      <el-table-column prop="name" label="游戏名称"></el-table-column>
      <el-table-column prop="name" label="注单号"></el-table-column>
      <el-table-column prop="name" label="投注时间"></el-table-column>
      <el-table-column prop="name" label="派彩时间"></el-table-column>
      <el-table-column prop="name" label="投注额"></el-table-column>
      <el-table-column prop="name" label="有效投注额"></el-table-column>
      <el-table-column prop="name" label="派彩"></el-table-column>
      <el-table-column prop="name" label="状态"></el-table-column>
    </el-table>
    <pagination
      @page-num-change="onPageNumChange"
      @page-size-change="onPageSizeChange"
      :total="total">
    </pagination>
    <!--对话框-->
    <game-type-dialog
      :dialogFormVisible="dialogFormVisible"
      @cancel="handleDialog('cancel')"
      @confirm="handleDialog('confirm', arguments)">
    </game-type-dialog>
  </div>
</template>

<script>
import FilterCondition from '@/views/memberCenter/wedgit/FilterCondition'
import Pagination from '@/components/noc-pagination'
import pickerMix from '@/mixins/picker.mix'
import pageMix from '@/mixins/page.mix'
import GameTypeDialog from './Reports_Comp_Dialog'
export default {
  name: 'Management_Member',
  mixins: [pickerMix, pageMix],
  components: {
    FilterCondition,
    Pagination,
    GameTypeDialog
  },
  data () {
    return {
      member: {
        timeType: 0, // 时间类型
        gameTypes: [], // 游戏类型
        status: 0, // 状态
        memberAccount: '' // 成员账号
      },
      dialogFormVisible: false,
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
  },
  methods: {
    handleDialog (type) {
      if (type === 'cancel') {
        this.dialogFormVisible = false
      } else {
        // console.log(type, arguments[1][0])
      }
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
