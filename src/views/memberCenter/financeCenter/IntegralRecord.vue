<template>
  <div class="record-wrapper">
    <!--筛选部分-->
    <filter-condition>
      <template slot="base-query">
        <ul>
          <li><span>交易号：</span><el-input type="text" placeholder="请输入交易号" v-model="extraData.orderNo" size="mini" style="width: 150px;"></el-input></li>
          <li><span>类型：</span>
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
          <li><span>操作时间：</span>
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
      <el-scrollbar :native="false">
        <el-table
          :data="tableData"
          border
          v-loading="loading">
          <el-table-column prop="orderNo" label="交易号"></el-table-column>
          <el-table-column prop="createTime" label="操作时间"></el-table-column>
          <el-table-column prop="type" label="操作类型">
            <template slot-scope="scope">
              {{CONFIG.TYPE[Number(scope.row.type)].label}}
            </template>
          </el-table-column>
          <el-table-column prop="integral" label="积分数"></el-table-column>
          <el-table-column prop="alterIntegral" label="剩余积分"></el-table-column>
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
import pickerMix from '@/mixins/picker.mix'
import pageMix from '@/mixins/page.mix'
import {PATH_LIST_INTEGRAL} from '@/service/member/member_center.url'
export default {
  name: 'integral_record',
  mixins: [pickerMix, pageMix],
  components: {
    FilterCondition,
    Pagination
  },
  data () {
    return {
      listURL: PATH_LIST_INTEGRAL,
      CONFIG: {
        TYPE: [
          {value: 0, label: '消耗'},
          {value: 1, label: '获取'}
        ]
      },
      extraData: {
        orderNo: '', // 交易号
        type: '' // 类型
      }
    }
  },
  created () {
    this.fetchList()
  }
}
</script>

<style scoped lang="scss">
</style>
