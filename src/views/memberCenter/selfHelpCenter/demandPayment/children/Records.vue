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
      <el-scrollbar :native="false"> <!-- style="height: 520px;"-->
        <el-table
          :data="tableData"
          border
          v-loading="loading">
          <el-table-column prop="describe" label="序号"></el-table-column>
          <el-table-column prop="time" label="存款姓名"></el-table-column>
          <el-table-column prop="time" label="订单号"></el-table-column>
          <el-table-column prop="time" label="昵称"></el-table-column>
          <el-table-column
            prop="type"
            label="全部状态"
            :filters="CONFIG.STATUS"
            :filter-method="filterHandler"
          ></el-table-column>
          <el-table-column prop="audit" label="存款时间"></el-table-column>
          <el-table-column prop="operate" label="存款金额"></el-table-column>
          <el-table-column prop="operate" label="创建时间"></el-table-column>
          <el-table-column prop="operate" label="更新时间"></el-table-column>
          <el-table-column prop="operate" label="备注"></el-table-column>
        </el-table>
      </el-scrollbar>
      <!--<el-scrollbar :native="false">
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
            <td>&#45;&#45;</td>
          </tr>
          </tbody>
        </table>
      </el-scrollbar>-->
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
          {value: 0, label: '全部状态', text: '全部状态'},
          {value: 1, label: '待领取', text: '待领取'},
          {value: 2, label: '已领取', text: '已领取'},
          {value: 3, label: '已失效', text: '已失效'}
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
        this.$message.error(err)
      })
    },
    filterHandler (value, row) {
      return row.tag === value
    }
  }
}
</script>
