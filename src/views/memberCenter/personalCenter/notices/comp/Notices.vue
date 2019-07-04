<template>
  <div class="wrapper">
    <!--表格主体-->
    <div class="msgList">
      <el-main>
        <h1>消息列表</h1>
        <el-table
          v-if="tableData.length"
          :show-header="false"
          :data="tableData"
          @selection-change="onSelectionChange"
          :row-class-name="tableRowClassName"
          max-height="860"
          size="small"
          ref="multipleTable"
          @row-click="clickTable"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="65">
          </el-table-column>
          <el-table-column
            type="expand"
            style="line-height: 50px"
            width="50">
            <template slot-scope="scope">
              <el-row :gutter="20">
                <el-col :span="16" :offset="2"><span class="normalFont context">{{scope.row.content}}</span></el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="内容"
            min-width="550">
            <template slot-scope="scope">
              <el-row :gutter="10">
                <el-col :span="24"><span class="normalFont title">{{scope.row.title}}</span></el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24"><span class="normalFont context omit">{{scope.row.content.substr(0,100)}}</span></el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="readStatus"
            label="未读"
            width="25px">
            <template slot-scope="scope">
              <div v-show="scope.row.readStatus === 0" class="spot"></div>
            </template>
          </el-table-column>
          <el-table-column
            prop="time"
            min-width="150"
            label="時間">
            <template slot-scope="scope">
              <el-row  type="flex" justify="end">
                <el-col :span="24"><span class="normalFont context">{{scope.row.releaseTime}}</span></el-col>
              </el-row>
              <el-row type="flex" justify="end">
                <el-col :span="8"><i class="el-icon-delete delIcon" @click.stop="delMsg(scope)" style="font-size: 18px;text-align: left; position: relative; top: -8px;"></i></el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @page-num-change="onPageNumChange"
          @page-size-change="onPageSizeChange"
          :total="total">
          <ul>
            <!--<li><input type="checkbox" style="margin-left: -6px;width: 16px;height: 16px;border-color: #5a6576;"></li>-->
            <!--<li>
              <el-select v-model="batch_status" placeholder="批量操作" size="mini">
                <el-option v-for="(item, index) in CONFIG.BATCHSTATUS" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </li>
            <li><el-button size="mini" @click="onBatch">确定</el-button></li>-->
          </ul>
        </pagination>
      </el-main>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/noc-pagination'
import pageMix from '@/mixins/page.mix'
import {
  PATH_LIST_MSG,
  PATH_LIST_PUBLIC,
  PATH_MSG_READ,
  PATH_PUBLIC_READ,
  PATH_MSG_DELETE,
  PATH_PUBLIC_DELETE
} from '@/service/member/member_center.url'
export default {
  name: 'notices',
  mixins: [pageMix],
  components: {
    Pagination
  },
  props: {
    type: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      batch_status: 0, // 默认为标记为已读
      CONFIG: {
        BATCHSTATUS: [{value: 0, label: '标为已读'}, {value: 1, label: '删除'}]
      },
      showDelete: false,
      listUrl: '', // 请求列表路径
      readUrl: '', // 修改状态路径
      delUrl: '' // 删除
    }
  },
  created () {
    if (String(this.type) === '0') {
      this.listUrl = PATH_LIST_MSG
      this.readUrl = PATH_MSG_READ
      this.delUrl = PATH_MSG_DELETE
    } else {
      this.listUrl = PATH_LIST_PUBLIC
      this.readUrl = PATH_PUBLIC_READ
      this.delUrl = PATH_PUBLIC_DELETE
    }
    this.fetchList()
  },
  methods: {
    onBatch () { // 批量操作
      let path = this.readUrl
      if (this.batch_status === 1) { // 删除
        path = this.delUrl
      }
      this.post(path, {id: this.multipleSelection.join(','), ids: this.multipleSelection.join(',')}).then(resolve => {
        this.fetchList()
      })
    },
    clickTable (row, column, e) { // 阅读
      if (row.readStatus === 0) {
        this.post(this.readUrl, {id: row.id, ids: row.id}).then(resolve => {
          if (resolve.status) {
            this.$message.success('已阅读')
            row.readStatus = false
          }
        })
      }
      this.$refs.multipleTable.toggleRowExpansion(row)
    },
    tableRowClassName ({row, rowIndex}) {
      row.index = rowIndex
      if (row.isread) {
        return 'isnotread-row'
      }
      return ''
    },
    delMsg (scope) { // 删除
      this.post(this.delUrl, {id: scope.row.id, ids: scope.row.id}).then(resolve => {
        if (resolve.status) {
          this.$message.success('删除成功!')
          this.tableData.splice(scope.row.index, 1)
          this.total--
        }
      })
    },
    fetchList () {
      this.post(this.listUrl, this.payload).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      }, err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    background: none;
  }
  .el-main{
    width: 100%;
    h1 {
      background: #fff;
      margin-top: -20px;
      height: 40px;
      line-height: 40px;
      text-indent: 20px;
      border-bottom: 1px solid #d8d8d8;
    }
    .normalFont{
      font-family: "Microsoft YaHei";
    }
    .title{
      font-size: 16px;
      font-weight: 700;
    }
    .context{
      font-size: 14px;
    }
    .subTitle{
      font-size: 14px;
      color: #5a6576;
      font-weight: 700;
    }
    .omit{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .spot{
      width: 10px;
      height: 10px;
      background-color: orangered;
      border-radius: 5px;
    }
    .delIcon{
      visibility: hidden;
    }
    .el-table__body tr:hover{
      cursor: pointer;
      .delIcon{
        visibility: visible;
      }
    }
  }
</style>
<style lang="scss">
  tr.isnotread-row{
    background-color: #f8f8f8;
  }
</style>
