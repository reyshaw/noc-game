<template>
  <div class="record-wrapper">
    <!--主要内容-->
    <header class="intotal">
      <ul>
        <li>总共： 2笔</li>
        <li>投注额： ￥0.00元</li>
        <li>有效投注额： ￥0.00元</li>
        <li>派彩： ￥0.00元</li>
      </ul>
      <span><input type="checkbox">只查阅结算注单</span>
    </header>
    <main>
      <el-scrollbar :native="false"> <!-- style="height: 520px;"-->
        <el-table
          :data="tableData"
          border
          v-loading="loading">
          <el-table-column prop="describe" label="面值额度"></el-table-column>
          <el-table-column prop="time" label="到期时间"></el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            :filters="CONFIG.TYPE"
            :filter-method="filterHandler"
          ></el-table-column>
          <el-table-column prop="audit" label="筹码稽核"></el-table-column>
          <el-table-column prop="operate" label="操作"></el-table-column>
        </el-table>
      </el-scrollbar>
    </main>
    <!--分页-->
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
import Pagination from '@/components/noc-pagination'
import pickerMix from '@/mixins/picker.mix'
import pageMix from '@/mixins/page.mix'
import { PATH_GETCHIPRECORD_CLIENT } from '@/service/member/member_center.url'
import GameTypeDialog from '@/views_agent/agentCenter/team/Reports_Comp_Dialog'
export default {
  name: 'chips',
  mixins: [pickerMix, pageMix],
  components: {
    Pagination,
    GameTypeDialog
  },
  data () {
    return {
      listURL: PATH_GETCHIPRECORD_CLIENT,
      CONFIG: {
        TYPE: [
          {value: 0, text: '全部'},
          {value: 1, text: '未使用'},
          {value: 2, text: '已使用'},
          {value: 3, text: '已过期'}
        ]
      },
      dialogFormVisible: false,
      timeZone: undefined
    }
  },
  created () {
    this.fetchList('', 1)
  },
  methods: {
    filterHandler (value, row) {
      return row.tag === value
    },
    handleDialog (type) {
      if (type === 'cancel') {
        this.dialogFormVisible = false
      } else {
        console.log(type, arguments[1][0])
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .intotal {
    width: 100%;
    height: 40px;
    background: #596687;
    margin-bottom: -20px;
    ul {
      li {
        height: 40px;
        float: left;
        line-height: 40px;
        margin-left: 20px;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        font-family: '微软雅黑';
      }
    }
    span {
      display: inline-block;
      float: right;
      color: #fff;
      padding-right: 20px;
      line-height: 40px;
      input {
        margin-right: 6px;
        position: relative;
        top: 3px;
      }
    }
  }
</style>
