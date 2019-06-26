<template>
  <div class="record-wrapper">
    <!--筛选部分-->
    <filter-condition>
      <template slot="base-query">
        <ul>
          <li><span>流水号：</span><input type="text" placeholder="请输入流水号" v-model="payload.promName"></li>
          <li><span>领取状态：</span>
            <select v-model="payload.status">
              <option value="">全部</option>
              <option v-for="(status, index) in CONFIG.STATUS" :value="status.value" :key="index">{{status.label}}</option>
            </select>
          </li>
          <li>
            <el-button type="success" @click="fetchList" size="mini">查询结果</el-button>
          </li>
        </ul>
      </template>
    </filter-condition>
    <!--主要内容-->
    <main>
      <el-scrollbar :native="false">
        <table class="table-record">
          <thead>
          <tr>
            <th>流水号</th>
            <th>金额</th>
            <th>类型</th>
            <th>发放时间</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{item.serialNumber}}</td>
            <td>{{item.lotteryType}}</td>
            <td>{{item.lotteryTitle}}</td>
            <td>{{item.status}}</td>
            <td>--</td>
          </tr>
          </tbody>
        </table>
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
  name: 'records',
  mixins: [pageMix],
  components: {
    FilterCondition,
    Pagination
  },
  data () {
    return {
      CONFIG: {
        STATUS: [
          {value: 0, label: '全部状态'},
          {value: 1, label: '待领取'},
          {value: 2, label: '已领取'},
          {value: 3, label: '已失效'}
        ]
      }
    }
  },
  created () {
    Object.assign(this.payload, {
      promName: '', // 活动名称
      status: '' // 状态
    })
    this.fetchList()
  },
  methods: {
    fetchList () { // 获取table数据
      this.loading = true
      this.post(PATH_LIST_LUCKY, this.payload).then(res => {
        this.loading = false
        this.tableData = res.data.list
        this.total = res.data.total
      }, err => {
        this.loading = false
        console.log(err)
      })
    }
  }
}
</script>
