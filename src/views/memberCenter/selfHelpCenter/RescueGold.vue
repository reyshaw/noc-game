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
    <warm-prompt :title="'温馨提示'">
      <template slot="base-query">
        <ul>
          <li>每天17点之前统一派发到账（计算您昨天00:00:00到23:59:59的输赢）;</li>
          <li>救援金的有效时间为7天（从派发当天开始计算），规定时间内未领取会自动取消;</li>
          <li>如需帮助请联系客服; 如出现存款失败请联系在线客服获取帮助;<a href="javascript: void (0);" style="color: #409eff;font-size: 14px">点击联系在线客服。</a></li>
        </ul>
      </template>
    </warm-prompt>
  </div>
</template>

<script>
import FilterCondition from '@/views/memberCenter/wedgit/FilterCondition'
import WarmPrompt from '@/views/memberCenter/wedgit/WarmPrompt'
import Pagination from '@/components/noc_pagination'
import pageMix from '@/mixins/page.mix'
import {PATH_LIST_LUCKY} from '@/service/member/member_center.url'

export default {
  name: 'draw_volume_record',
  mixins: [pageMix],
  components: {
    FilterCondition,
    Pagination,
    WarmPrompt
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
        this.$message.error(err)
      })
    }
  }
}
</script>
