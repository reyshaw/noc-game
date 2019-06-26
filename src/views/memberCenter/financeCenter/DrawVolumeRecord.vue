<template>
  <div class="record-wrapper">
    <!--筛选部分-->
    <filter-condition>
      <template slot="base-query">
        <ul>
          <li><span>活动名称：</span><input type="text" placeholder="请输入活动名称" v-model="extraData.promName"></li>
          <li><span>领取状态：</span>
            <el-select v-model="extraData.status" placeholder="请选择" size="mini" style="width: 100px" key="type1">
              <el-option label="全部类型" value=""></el-option>
              <el-option
                v-for="(status, index) in CONFIG.STATUS"
                :key="index"
                :label="status.label"
                :value="status.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <el-button type="success" @click="fetchList(false)" size="mini">查询结果</el-button>
          </li>
        </ul>
      </template>
    </filter-condition>
    <!--主要内容-->
    <main>
      <el-scrollbar :native="false">
        <el-table
          :data="tableData"
          border
          v-loading="loading">
          <el-table-column prop="createTime" label="抽奖时间"></el-table-column>
          <el-table-column prop="lotteryType" label="抽奖途径"></el-table-column>
          <el-table-column prop="lotteryTitle" label="抽奖名称"></el-table-column>
          <el-table-column prop="stuffName" label="中奖内容"></el-table-column>
          <el-table-column prop="status" label="领取状态">
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              {{`--`}}
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
  </div>
</template>

<script>
import FilterCondition from '@/views/memberCenter/wedgit/FilterCondition'
import Pagination from '@/components/noc-pagination'
import pageMix from '@/mixins/page.mix'
import {PATH_LIST_LUCKY} from '@/service/member/member_center.url'
export default {
  name: 'draw_volume_record',
  mixins: [pageMix],
  components: {
    FilterCondition,
    Pagination
  },
  data () {
    return {
      listURL: PATH_LIST_LUCKY,
      CONFIG: {
        STATUS: [
          {value: 0, label: '待领取'},
          {value: 1, label: '已领奖'},
          {value: 2, label: '待处理'},
          {value: 3, label: '未中奖'}
        ]
      },
      timeZone: '',
      extraData: {
        promName: '', // 活动名称
        status: '' // 状态
      }
    }
  },
  created () {
    this.fetchList()
  }
}
</script>
