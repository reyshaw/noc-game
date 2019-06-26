<template>
  <div class="record-wrapper">
    <!--筛选部分-->
    <filter-condition>
      <template slot="base-query">
        <ul>
          <li><span>交易号：</span>
            <el-input placeholder="请输入交易号" v-model="extraData.orderNo" size="mini" style="width: 150px;"></el-input>
          </li>
          <li>类型：
            <el-select v-model="extraData.type" placeholder="请选择" size="mini" style="width: 100px" key="type1">
              <el-option label="全部类型" value=""></el-option>
              <el-option
                v-for="(type, index) in CONFIG.TYPE"
                :key="index"
                :label="type.label"
                :value="type.value">
              </el-option>
            </el-select>
          </li>
          <li>状态：
            <el-select v-model="extraData.status" placeholder="请选择" size="mini" style="width: 100px" key="status1">
              <el-option label="全部状态" value=""></el-option>
              <el-option
                v-for="(status, index) in CONFIG.STATUS"
                :key="index"
                :label="status.label"
                :value="status.value">
              </el-option>
            </el-select>
          </li>
          <li>时间：
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
            <el-button type="success" @click="fetchList(false)" size="mini">查询结果</el-button>
          </li>
        </ul>
      </template>
    </filter-condition>
    <!--主要内容-->
    <main>
      <el-scrollbar :native="false" :style="{height: tableData.length > 16 ? '550px' : ''}">
        <el-table
          :data="tableData"
          border
          v-loading="loading">
          <el-table-column prop="orderNo" label="交易号"></el-table-column>
          <el-table-column prop="time" label="创建时间"></el-table-column>
          <el-table-column prop="type" label="全部类型">
            <template slot="header" slot-scope="scope">
              <el-select v-model="extraData.type" placeholder="请选择" size="mini" key="type2">
                <el-option label="全部类型" value=""></el-option>
                <el-option
                  v-for="(type, index) in CONFIG.TYPE"
                  :key="index*2"
                  :label="type.label"
                  :value="type.value">
                </el-option>
              </el-select>
            </template>
            <template slot-scope="scope">
              {{CONFIG.TYPE[scope.row.type] && CONFIG.TYPE[scope.row.type].label}}
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额"></el-table-column>
          <el-table-column prop="actualAmount" label="账户余额"></el-table-column>
          <el-table-column prop="status" label="全部状态">
            <template slot="header" slot-scope="scope">
              <el-select v-model="extraData.status" placeholder="请选择" size="mini" key="status2">
                <el-option label="全部状态" value=""></el-option>
                <el-option
                  v-for="(status, index) in CONFIG.STATUS"
                  :key="index"
                  :label="status.label"
                  :value="status.value">
                </el-option>
              </el-select>
            </template>
            <template slot-scope="scope">
              {{CONFIG.STATUS[scope.row.status] && CONFIG.STATUS[scope.row.status].label}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a href="javascript:void(0)" @click="showDetail(scope.row)" v-if="scope.row.status < 2">详细</a>
              <span v-else>&#45;&#45;</span>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <pagination
        @page-num-change="onPageNumChange"
        @page-size-change="onPageSizeChange"
        :total="total">
      </pagination>
    </main>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="30%">
      <h1>存款详情<span @click="dialogVisible=false" class="close"></span></h1>
      <div class="dialog-detail">
        <div class="content">
          <el-row>
            <el-col :span="24">存款详细： {{currentRow.orderNo}}</el-col>
            <el-col :span="24">创建时间： {{currentRow.time}}</el-col>
            <el-col :span="24">描<span style="visibility: hidden;">二个</span>述：  {{currentRow.desc}}</el-col>
            <el-col :span="24">流水单号：{{currentRow.last5Num}}(后5位)</el-col>
          </el-row>
          <div class="info">
            <h2>其他</h2>
            <el-row>
              <el-col :span="24">微信账号：{{currentRow.accountNumber}}</el-col> <!--存款姓名-->
              <el-col :span="24">存款金额：￥{{currentRow.amount}}</el-col>
              <el-col :span="24">优惠金额: ￥{{(currentRow.actualAmount - currentRow.amount).toFixed(2)}}</el-col>
              <el-col :span="24">实际到账：￥{{currentRow.actualAmount}}</el-col>
              <el-col :span="24">当前状态：{{CONFIG.STATUS[currentRow.status]}}</el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FilterCondition from '@/views/memberCenter/wedgit/FilterCondition'
import Pagination from '@/components/noc-pagination'
import pickerMix from '@/mixins/picker.mix'
import pageMix from '@/mixins/page.mix'
import {PATH_LIST_CAPITAL} from '@/service/member/member_center.url'
export default {
  name: 'fund_record',
  mixins: [pickerMix, pageMix],
  components: {
    FilterCondition,
    Pagination
  },
  data () {
    return {
      listURL: PATH_LIST_CAPITAL,
      CONFIG: {
        TYPE: [
          {value: 0, label: '存款'},
          {value: 1, label: '取款'},
          {value: 2, label: '转账'},
          {value: 3, label: '返水'},
          {value: 4, label: '优惠'},
          {value: 5, label: '红包'},
          {value: 6, label: '筹码'},
          {value: 7, label: '优惠券'}
        ],
        STATUS: [
          {value: 0, label: '待处理'},
          {value: 1, label: '处理中'},
          {value: 2, label: '成功'},
          {value: 3, label: '失败'},
          {value: 4, label: '拒绝'},
          {value: 5, label: '已发放'},
          {value: 6, label: '待支付'}
        ]
      },
      extraData: {
        orderNo: '', // 交易号
        type: '', // 类型
        status: '' // 状态
        // beginTime: '', // 开始时间
        // endTime: '' // 结束时间
      },
      currentRow: {}
    }
  },
  created () {
    // Object.assign(this.payload, this.extraData)
    this.fetchList()
  },
  methods: {
    showDetail (item) {
      this.dialogVisible = true
      this.currentRow = item
    }
  }
}
</script>

<style scoped lang="scss">
  .close {
    position: relative;
    margin: 3px;
    background: white;
    cursor: pointer;
    box-sizing: border-box;
  }
  .close:hover::before, .close:hover::after {
    background: red;
  }
  .close:before {
    position: absolute;
    content: '';
    width: 1px;
    height: 20px;
    background: #666666;
    transform: rotate(45deg);
    top: 5px;
    left: 15px;
  }
  .close:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 20px;
    background: #666666;
    transform: rotate(-45deg);
    top: 5px;
    left: 15px;
  }
  .el-dialog {
    overflow: hidden;
    h1 {
      position: absolute;
      height: 40px;
      background: #2457bf;
      color: #fff;
      text-indent: 15px;
      width: 100%;
      left: 0;
      top: 0;
      line-height: 40px;
      span {
        display: inline-block;
        float: right;
        border-radius: 50%;
        background: none;
        width: 30px;
        height: 30px;
        background: #fff;
        margin-right: -60px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .dialog-detail {
      position: absolute;
      top: 40px;
      background-color: #fff;
      left: 0;
      width: 100%;
      .content {
        width: 60%;
        height: auto;
        margin: 15px auto;
        margin-bottom: 50px;
        .el-row {
          line-height: 22px;
          font-size: 16px;
          .el-col {
            font-size: 14px;
            line-height: 25px;
            color: #636262;
          }
        }
        .info {
          border: 1px solid lightgray;
          border-radius: 5px;
          margin: 15px auto;
          text-indent: 15px;
          h2 {
            height: 35px;
            line-height: 35px;
            border-bottom: 1px solid lightgray;
            font-size: 14px;
          }
          .el-row {
            padding: 10px 0;
            .el-col {
              margin-top: 2px;
            }
          }
        }
      }
    }
  }
</style>
