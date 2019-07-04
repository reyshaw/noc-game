<template>
  <div class="record-wrapper">
    <!--筛选部分-->
    <filter-condition>
      <template slot="base-query">
        <ul>
          <li>
            <el-select v-model="extraData.timeType" placeholder="请选择" size="mini" style="width: 100px" key="type1">
              <el-option
                v-for="(timeType, index) in CONFIG.TIMETYPE"
                :key="index"
                :label="timeType.label"
                :value="timeType.value">
              </el-option>
            </el-select>
          </li>
          <li>
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
          <li class="right">
            游戏类型：<el-button type="success" @click="dialogFormVisible=true" size="mini">选取</el-button>
          </li>
        </ul>
      </template>
    </filter-condition>
    <!--主要内容-->
    <header class="intotal">
      <ul>
        <li>总共： {{this.tableData.length}}笔</li>
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
          <el-table-column prop="gameprovider" label="游戏类型"></el-table-column>
          <el-table-column prop="gamename" label="游戏名称"></el-table-column>
          <el-table-column prop="bettingcode" label="注单号"></el-table-column>
          <el-table-column prop="bettingdate" label="投注时间"></el-table-column>
          <el-table-column prop="settledate" label="派彩时间"></el-table-column>
          <el-table-column prop="bettingamount" label="投注额"></el-table-column>
          <el-table-column prop="validbet" label="有效投注额"></el-table-column>
          <el-table-column prop="winloseamount" label="派彩"></el-table-column>
          <el-table-column prop="winloseresult" label="类型">
            <template slot="header" slot-scope="scope">
              <el-select v-model="extraData.winloseresult" placeholder="请选择" size="mini" key="type2">
                <el-option label="全部类型" value=""></el-option>
                <el-option
                  v-for="(type, index) in CONFIG.TYPE"
                  :key="index*2"
                  :label="type.label"
                  :value="type.value">
                </el-option>
              </el-select>
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
import FilterCondition from '@/views/memberCenter/wedgit/FilterCondition'
import Pagination from '@/components/noc-pagination'
import pickerMix from '@/mixins/picker.mix'
import pageMix from '@/mixins/page.mix'
import {PATH_LIST_BET} from '@/service/member/member_center.url'
import GameTypeDialog from '@/views_agent/agentCenter/team/Reports_Comp_Dialog'
export default {
  name: 'bet_record',
  mixins: [pickerMix, pageMix],
  components: {
    FilterCondition,
    Pagination,
    GameTypeDialog
  },
  data () {
    return {
      listURL: PATH_LIST_BET,
      CONFIG: {
        TIMETYPE: [
          {value: 0, label: '投注时间'},
          {value: 1, label: '派彩时间'}
        ],
        GAMETYPE: [
          {value: 0, label: 'OG游戏'},
          {value: 1, label: 'AG游戏'},
          {value: 2, label: 'PT游戏'},
          {value: 3, label: 'MG游戏'},
          {value: 4, label: 'BG游戏'}
        ]
      },
      dialogFormVisible: false,
      extraData: {
        timeType: 0, // 投注时间， 派彩时间
        winloseresult: '' // 5表示待结算的
      }
    }
  },
  created () {
    this.fetchList()
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
