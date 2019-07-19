<template>
  <div class="record-wrapper">
    <!--筛选部分-->
    <filter-condition>
      <template slot="base-query">
        <ul>
          <li><span>活动名称：</span><el-input placeholder="请输入活动名称" v-model="extraData.promName" style="width: 150px;" size="mini"></el-input></li>
          <li><span>优惠金状态：</span>
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
          <el-table-column prop="preferentialTime" label="参与时间"></el-table-column>
          <el-table-column prop="preferentialWay" label="参与途径"></el-table-column>
          <el-table-column prop="preferentialName" label="活动名称"></el-table-column>
          <el-table-column prop="preferentialMoney" label="优惠金额"></el-table-column>
          <el-table-column prop="preferentialStatus" label="优惠金状态">
            <template slot-scope="scope">
              {{CONFIG.STATUS[scope.row.preferentialStatus].label}}
            </template>
          </el-table-column>
          <el-table-column prop="preferentialAudit" label="优惠稽核"></el-table-column>
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
import Pagination from '@/components/noc_pagination'
import pageMix from '@/mixins/page.mix'
import {PATH_LIST_DISCOUNT} from '@/service/member/member_center.url'

export default {
  name: 'promotion_record',
  mixins: [pageMix],
  components: {
    FilterCondition,
    Pagination
  },
  data () {
    return {
      listURL: PATH_LIST_DISCOUNT,
      CONFIG: {
        STATUS: [
          {value: 0, label: '未开始'},
          {value: 1, label: '进行中'},
          {value: 2, label: '已完成'},
          {value: 3, label: '已取消'}
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
