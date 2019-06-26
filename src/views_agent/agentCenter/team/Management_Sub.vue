<template>
  <div class="wrapper">
    <filter-condition>
      <template slot="base-query">
        <ul>
          <li>
            注册时间:
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
            归属代理: <el-input style="width: 150px;" placeholder="请输入归属代理" size="mini" v-model="subManage.agentBelongs"></el-input>
          </li>
          <li>
            <el-button type="success" @click="fetchList" size="mini">查询结果</el-button>
          </li>
          <li class="right">
            <el-button type="success" size="mini" @click="dialogFormVisible=true">新增下级</el-button>
          </li>
        </ul>
      </template>
    </filter-condition>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column prop="date" label="代理账号"></el-table-column>
      <el-table-column prop="name" label="代理昵称"></el-table-column>
      <el-table-column prop="name" label="上级代理"></el-table-column>
      <el-table-column prop="name" label="会员数"></el-table-column>
      <el-table-column prop="name" label="下线数"></el-table-column>
      <el-table-column prop="name" label="佣金余额"></el-table-column>
      <el-table-column prop="name" label="推广码"></el-table-column>
      <el-table-column prop="name" label="启用状态"></el-table-column>
      <el-table-column prop="name" label="投注状态"></el-table-column>
      <el-table-column prop="name" label="注册时间"></el-table-column>
      <el-table-column prop="date" label="操作"></el-table-column>
    </el-table>
    <pagination
      @page-num-change="onPageNumChange"
      @page-size-change="onPageSizeChange"
      :total="total">
    </pagination>
    <!--对话框-->
    <el-dialog :visible.sync="dialogFormVisible" class="team-dialog" width="400px">
      <h1>新增下级</h1>
      <el-form :model="form">
        <el-form-item label="代理账号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="代理昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickName" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" :label-width="formLabelWidth">
          <el-input v-model="form.pwd" autocomplete="off" size="mini" type="password"></el-input>
        </el-form-item>
        <el-form-item label="返佣方案" :label-width="formLabelWidth">
<!--          <el-input v-model="form.rebate" autocomplete="off" size="mini" :disabled="true"></el-input>-->
          <el-button size="mini" @click="innerVisible=true">{{form.rebate}}</el-button>
        </el-form-item>
        <el-form-item label="分权设置" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.subFlag" label="1">允许下级开设代理</el-radio>
            <el-radio v-model="form.subFlag" label="2">不允许下级开设代理</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="账户启用状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item label="账户投注状态" :label-width="formLabelWidth">
          <el-switch v-model="form.betFlag"></el-switch>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" size="mini">确 定</el-button>
      </div>
      <el-dialog
        class="team-dialog"
        width="800px"
        title="内层 Dialog"
        append-to-body
        :visible.sync="innerVisible">
        <h1>返佣设置</h1>
        <rebate addType="rebate" editType="rebate"></rebate>
        <div class="dialog-footer">
          <el-button @click="innerVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="innerVisible = false" size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import FilterCondition from '@/views/memberCenter/wedgit/FilterCondition'
import Pagination from '@/components/noc-pagination'
import pickerMix from '@/mixins/picker.mix'
import pageMix from '@/mixins/page.mix'
import Rebate from './Management_Sub_Rebate'
export default {
  name: 'Management_Sub',
  mixins: [pickerMix, pageMix],
  components: {
    FilterCondition,
    Pagination,
    Rebate
  },
  data () {
    return {
      subManage: {
        agentBelongs: '' // 代理归属
      },
      form: {
        name: '', // 账号
        nickName: '', // 昵称
        pwd: '', // 密码
        rebate: '默认方案', // 返佣设置
        subFlag: '1', // 分权设置
        status: false,
        betFlag: false
      },
      innerVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style scoped lang="scss">
  .el-table {
    margin-top: 10px;
    box-sizing: border-box;
  }
</style>
