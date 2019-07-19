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
            归属代理: <el-input style="width: 150px;" placeholder="请输入归属代理" size="mini" v-model="memberManage.agentBelongs"></el-input>
          </li>
          <li>
            成员账号: <el-input style="width: 150px;" placeholder="请输入成员账号" size="mini" v-model="memberManage.memberAccount"></el-input>
          </li>
          <li>
            <el-button type="success" @click="fetchList" size="mini">查询结果</el-button>
          </li>
          <li class="right">
            <el-button type="success" size="mini" @click="dialogFormVisible=true">新增成员</el-button>
          </li>
        </ul>
      </template>
    </filter-condition>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column prop="date" label="成员账号"></el-table-column>
      <el-table-column prop="name" label="成员昵称"></el-table-column>
      <el-table-column prop="name" label="归属代理"></el-table-column>
      <el-table-column prop="name" label="VIP等级"></el-table-column>
      <el-table-column prop="name" label="账号余额"></el-table-column>
      <el-table-column prop="name" label="账号积分"></el-table-column>
      <el-table-column prop="name" label="存款金额"></el-table-column>
      <el-table-column prop="name" label="存款次数"></el-table-column>
      <el-table-column prop="name" label="取款金额"></el-table-column>
      <el-table-column prop="name" label="取款次数"></el-table-column>
      <el-table-column prop="date" label="注册时间"></el-table-column>
    </el-table>
    <pagination
      @page-num-change="onPageNumChange"
      @page-size-change="onPageSizeChange"
      :total="total">
    </pagination>
    <!--对话框-->
    <el-dialog :visible.sync="dialogFormVisible" class="team-dialog" width="400px">
      <h1>新增成员</h1>
      <el-form :model="form">
        <el-form-item label="成员账号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="成员昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickName" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="代理归属" :label-width="formLabelWidth">
          <el-input v-model="form.agent" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="会员等级" :label-width="formLabelWidth">
          <el-input v-model="form.grade" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="层级归属" :label-width="formLabelWidth">
          <el-input v-model="form.level" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" :label-width="formLabelWidth">
          <el-input v-model="form.pwd" autocomplete="off" size="mini" type="password"></el-input>
        </el-form-item>
        <el-form-item label="账户启用状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status">
          </el-switch>
        </el-form-item>
        <el-form-item label="账户投注状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.betFlag">
          </el-switch>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FilterCondition from '@/views/memberCenter/wedgit/FilterCondition'
import Pagination from '@/components/noc_pagination'
import pickerMix from '@/mixins/picker.mix'
import pageMix from '@/mixins/page.mix'
export default {
  name: 'Management_Member',
  mixins: [pickerMix, pageMix],
  components: {
    FilterCondition,
    Pagination
  },
  data () {
    return {
      memberManage: {
        agentBelongs: '', // 代理归属
        memberAccount: '' // 成员账号
      },
      form: {
        name: '',
        nickName: '',
        agent: '',
        grade: '',
        level: '',
        pwd: '',
        status: false,
        betFlag: false
      },
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
