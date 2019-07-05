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
          <el-table-column prop="lotteryTitle" label="活动名称"></el-table-column>
          <el-table-column prop="totalGiftAmount" label="面值额度">
            <template slot-scope="scope">
              <span>￥{{scope.row.totalGiftAmount | formatMoney}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="expiredEndTime" label="到期时间"></el-table-column>
          <el-table-column
            prop="type"
            label="全部类型"
            :filters="CONFIG.TYPE"
            :filter-method="filterHandler"
          >
            <template slot-scope="scope">
              <span>{{parseInt(scope.row.useFlag) === 0 ? '未使用' : '已使用'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lotteryAuditing" label="筹码稽核(打码倍数)"></el-table-column>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
              <el-button type="text" :disabled="!!parseInt(scope.row.useFlag)">使用</el-button>
            </template>
          </el-table-column>
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
import { PATH_GETCOUPON_CLIENT } from '@/service/member/member_center.url'
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
      listURL: PATH_GETCOUPON_CLIENT,
      CONFIG: {
        TYPE: [
          {value: '0', text: '未使用'},
          {value: '1', text: '已使用'},
          {value: '2', text: '已过期'}
        ]
      },
      extraData: {
        type: 0 // 0=筹码, 1=优惠卷
      },
      dialogFormVisible: false,
      timeZone: undefined
    }
  },
  created () {
    this.fetchList('')
  },
  methods: {
    filterHandler (value, row) {
      return row.tag === value
    },
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
