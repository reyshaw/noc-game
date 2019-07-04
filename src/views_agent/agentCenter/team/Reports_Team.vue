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
            游戏类型: <el-button size="mini" type="info" icon="el-icon-edit" style="background: #909399;" @click="dialogFormVisible=true">选取</el-button>
          </li>
          <li>
            代理账号: <el-input style="width: 150px;" placeholder="请输入代理账号" size="mini" v-model="team.agentBelongs"></el-input>
          </li>
          <li>
            成员账号: <el-input style="width: 150px;" placeholder="请输入成员账号" size="mini" v-model="team.memberAccount"></el-input>
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
      <el-table-column prop="date" label="代理账号"></el-table-column>
      <el-table-column prop="name" label="会员数"></el-table-column>
      <el-table-column prop="name" label="注单量"></el-table-column>
      <el-table-column prop="name" label="投注额"></el-table-column>
      <el-table-column prop="name" label="会员输赢"></el-table-column>
      <el-table-column prop="name" label="有效投注额"></el-table-column>
      <el-table-column prop="name" label="奖池输赢"></el-table-column>
      <el-table-column prop="name" label="我的盈亏"></el-table-column>
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
      team: {
        gameTypes: [], // 游戏类型
        agentBelongs: '', // 归属代理
        memberAccount: '' // 成员账号
      },
      form: {
        name: '',
        nickName: '',
        agent: '',
        grade: '',
        level: '',
        pwd: '',
        status: false,
        betFlag: false
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
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
