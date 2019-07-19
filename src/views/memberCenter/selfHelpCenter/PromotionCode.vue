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
          <el-table-column prop="lotteryTitle" label="优惠券描述"></el-table-column>
          <el-table-column prop="platform" label="使用平台">
            <template slot-scope="scope">
              <span>{{parseInt(scope.row.platform) === 0 ? '全平台' : '全平台'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="expiredEndTime" label="到期时间"></el-table-column>
          <el-table-column
            prop="useFlag"
            label="类型"
            :filters="CONFIG.TYPE"
            :filter-method="filterHandler"
          >
            <template slot-scope="scope">
              <span>{{parseInt(scope.row.useFlag) === 0 ? '未使用' : '已使用'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lotteryAuditing" label="优惠稽核(打码倍数)"></el-table-column>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
              <el-button type="text" :disabled="!!parseInt(scope.row.useFlag)" @click="handleTransfer(scope.row)">使用</el-button>
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
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="30%">
      <h1>使用优惠券<span @click="dialogVisible=false" class="close"></span></h1>
      <transfer-coupon-or-chip
      :form="form"></transfer-coupon-or-chip>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/noc_pagination'
import TransferCouponOrChip from '../children/TransferCouponOrChip'
import pickerMix from '@/mixins/picker.mix'
import pageMix from '@/mixins/page.mix'
import { PATH_GETCOUPON_CLIENT } from '@/service/member/member_center.url'
import GameTypeDialog from '@/views_agent/agentCenter/team/Reports_Comp_Dialog'
export default {
  name: 'promotion_code',
  mixins: [pickerMix, pageMix],
  components: {
    Pagination,
    GameTypeDialog,
    TransferCouponOrChip
  },
  data () {
    return {
      listURL: PATH_GETCOUPON_CLIENT,
      form: {},
      CONFIG: {
        TYPE: [
          {value: '0', text: '未使用'},
          {value: '1', text: '已使用'},
          {value: '2', text: '已过期'}
        ]
      },
      dialogFormVisible: false,
      extraData: {
        type: 1 // 0=筹码, 1=优惠卷
      },
      timeZone: undefined
    }
  },
  created () {
    this.fetchList('')
  },
  methods: {
    filterHandler (value, row) {
      console.log(value, row)
      return row.useFlag === value
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
